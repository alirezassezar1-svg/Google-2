import type {
  TechRecord,
  StackSelection,
  CompatibilityFinding,
  CompatibilityRule,
  AdvisorAnswers,
  AdvisorRecommendation
} from '../types.ts';

export const COMPATIBILITY_RULES: CompatibilityRule[] = [
  {
    id: 'RULE-STATIC-HOST-SERVER-RUNTIME',
    title: 'Static Hosting Cannot Execute Persistent Server Runtimes',
    severity: 'error',
    evidenceStatus: 'verified',
    check: (selectedIds: string[], catalog: Map<string, TechRecord>) => {
      const isStaticHost = selectedIds.some(id =>
        ['host-gh-pages', 'host-cf-pages'].includes(id)
      );
      const serverFrameworks = selectedIds.filter(id => {
        const item = catalog.get(id);
        return (
          item &&
          item.role === 'backend' &&
          ['Framework'].includes(item.type) &&
          !id.includes('hono') // Hono can run at edge
        );
      });

      if (isStaticHost && serverFrameworks.length > 0) {
        const names = serverFrameworks
          .map(id => catalog.get(id)?.name || id)
          .join(', ');
        return {
          ruleId: 'RULE-STATIC-HOST-SERVER-RUNTIME',
          title: 'Static Hosting Incompatible with Persistent Backend Framework',
          severity: 'error',
          affectedTechIds: ['host-gh-pages', ...serverFrameworks],
          affectedTechNames: ['Static Hosting (GitHub/Cloudflare Pages)', names],
          reason: `Static CDN hosts only serve pre-built client assets (HTML/CSS/JS) and cannot execute continuous background server processes like ${names}.`,
          suggestedResolution:
            'Switch hosting to a VPS (DigitalOcean), Docker container, or managed serverless runtime (Vercel, AWS, Cloudflare Workers), or generate a purely static client-side bundle.',
          evidenceStatus: 'verified'
        };
      }
      return null;
    }
  },
  {
    id: 'RULE-CLIENT-STORAGE-CENTRALIZED',
    title: 'Client-Only Storage Cannot Act as Shared Multi-User Database',
    severity: 'warning',
    evidenceStatus: 'verified',
    check: (selectedIds: string[], catalog: Map<string, TechRecord>) => {
      const hasClientDb = selectedIds.some(id =>
        ['db-indexeddb', 'db-localstorage'].includes(id)
      );
      const hasCloudDb = selectedIds.some(id => {
        const item = catalog.get(id);
        return (
          item &&
          ['db-postgres', 'db-mysql', 'db-mongodb', 'db-supabase', 'db-firebase'].includes(
            id
          )
        );
      });
      const hasMultiUser = selectedIds.some(id => {
        const item = catalog.get(id);
        return item && (item.role === 'backend' || item.categoryCode === 'D' || item.categoryCode === 'K');
      });

      if (hasClientDb && !hasCloudDb && hasMultiUser) {
        return {
          ruleId: 'RULE-CLIENT-STORAGE-CENTRALIZED',
          title: 'Local Browser Storage Sandboxed to Single Client',
          severity: 'warning',
          affectedTechIds: ['db-indexeddb'],
          affectedTechNames: ['IndexedDB / localStorage'],
          reason:
            'IndexedDB and localStorage are partitioned by origin inside individual browsers. They cannot synchronize data between different users without an external cloud backend or sync gateway.',
          suggestedResolution:
            'Pair IndexedDB with a backend sync service like CouchDB/PouchDB, Supabase, Firebase, or a dedicated REST/WebSocket sync endpoint.',
          evidenceStatus: 'verified'
        };
      }
      return null;
    }
  },
  {
    id: 'RULE-PHP-RUNTIME-REQUIREMENT',
    title: 'PHP Frameworks Require PHP Execution Environment',
    severity: 'error',
    evidenceStatus: 'verified',
    check: (selectedIds: string[], catalog: Map<string, TechRecord>) => {
      const phpFrameworks = selectedIds.filter(id =>
        ['be-laravel', 'be-symfony', 'be-codeigniter', 'cms-wordpress'].includes(id)
      );
      const hasPhp = selectedIds.some(id =>
        ['lang-php', 'rt-php'].includes(id)
      );
      const hasConflictingRuntime = selectedIds.some(id =>
        ['rt-nodejs', 'rt-deno', 'rt-bun', 'rt-jvm'].includes(id)
      );

      if (phpFrameworks.length > 0 && !hasPhp && hasConflictingRuntime) {
        const names = phpFrameworks.map(id => catalog.get(id)?.name || id).join(', ');
        return {
          ruleId: 'RULE-PHP-RUNTIME-REQUIREMENT',
          title: 'PHP Framework Selected without PHP Runtime',
          severity: 'error',
          affectedTechIds: phpFrameworks,
          affectedTechNames: [names],
          reason: `${names} requires a PHP interpreter (PHP-FPM, Apache mod_php, or PHP CLI 8.x) to execute, but only non-PHP runtimes are present in the stack.`,
          suggestedResolution:
            'Add the PHP Language & Runtime to the architecture, or configure a container environment with PHP installed.',
          evidenceStatus: 'verified'
        };
      }
      return null;
    }
  },
  {
    id: 'RULE-RAW-SQL-BROWSER-RESTRICTION',
    title: 'Browsers Cannot Direct-Connect to SQL Databases Over TCP',
    severity: 'warning',
    evidenceStatus: 'verified',
    check: (selectedIds: string[], catalog: Map<string, TechRecord>) => {
      const hasSqlDb = selectedIds.some(id =>
        ['db-postgres', 'db-mysql', 'db-sqlserver', 'db-oracle'].includes(id)
      );
      const hasFrontend = selectedIds.some(id => {
        const item = catalog.get(id);
        return item && item.categoryCode === 'B';
      });
      const hasBackend = selectedIds.some(id => {
        const item = catalog.get(id);
        return item && (item.categoryCode === 'D' || item.categoryCode === 'C');
      });

      if (hasSqlDb && hasFrontend && !hasBackend) {
        return {
          ruleId: 'RULE-RAW-SQL-BROWSER-RESTRICTION',
          title: 'Direct Client-to-SQL Connection Not Supported in Browsers',
          severity: 'warning',
          affectedTechIds: ['db-postgres', 'db-mysql'],
          affectedTechNames: ['Relational SQL Database'],
          reason:
            'Web browsers do not expose raw TCP socket APIs to connect directly to standard PostgreSQL or MySQL server ports (5432 / 3306).',
          suggestedResolution:
            'Introduce a backend API framework (Express, FastAPI, NestJS), a serverless ORM gateway (Prisma/Drizzle), or an HTTP layer like PostgREST / Supabase.',
          evidenceStatus: 'verified'
        };
      }
      return null;
    }
  },
  {
    id: 'RULE-SWIFTUI-PLATFORM-CONSTRAINT',
    title: 'SwiftUI Native Compilation Bound to Apple Toolchain',
    severity: 'info',
    evidenceStatus: 'verified',
    check: (selectedIds: string[], catalog: Map<string, TechRecord>) => {
      const hasSwiftUI = selectedIds.some(id =>
        ['mob-swiftui', 'mob-uikit'].includes(id)
      );
      if (hasSwiftUI) {
        return {
          ruleId: 'RULE-SWIFTUI-PLATFORM-CONSTRAINT',
          title: 'SwiftUI Requires macOS and Xcode Toolchain',
          severity: 'info',
          affectedTechIds: ['mob-swiftui'],
          affectedTechNames: ['SwiftUI'],
          reason:
            'Building and signing native Apple applications with SwiftUI requires an Apple development machine (macOS) with Xcode installed.',
          suggestedResolution:
            'Ensure CI/CD pipelines use macOS runners (e.g. GitHub Actions macos-latest) for native compilation and signing.',
          evidenceStatus: 'verified'
        };
      }
      return null;
    }
  },
  {
    id: 'RULE-DOCKER-ON-SHARED-CPANEL',
    title: 'Traditional Shared Hosting Incompatible with Docker Containers',
    severity: 'error',
    evidenceStatus: 'verified',
    check: (selectedIds: string[], catalog: Map<string, TechRecord>) => {
      const hasSharedHost = selectedIds.some(id =>
        ['host-shared', 'host-cpanel'].includes(id)
      );
      const hasDocker = selectedIds.some(id =>
        ['host-docker', 'host-k8s'].includes(id)
      );

      if (hasSharedHost && hasDocker) {
        return {
          ruleId: 'RULE-DOCKER-ON-SHARED-CPANEL',
          title: 'Shared cPanel Hosting Does Not Support Docker Engine',
          severity: 'error',
          affectedTechIds: ['host-shared', 'host-docker'],
          affectedTechNames: ['Shared Hosting', 'Docker'],
          reason:
            'Standard multi-tenant shared hosting platforms do not provide the root access or kernel cgroups required to run the Docker daemon.',
          suggestedResolution:
            'Upgrade to a Virtual Private Server (VPS like DigitalOcean/Hetzner) or a managed container service (Google Cloud Run, AWS ECS).',
          evidenceStatus: 'verified'
        };
      }
      return null;
    }
  }
];

export function evaluateStackCompatibility(
  selectedIds: string[],
  catalog: Map<string, TechRecord>
): CompatibilityFinding[] {
  const findings: CompatibilityFinding[] = [];
  for (const rule of COMPATIBILITY_RULES) {
    const finding = rule.check(selectedIds, catalog);
    if (finding) {
      findings.push(finding);
    }
  }
  return findings;
}

export function recommendStackFromAdvisor(answers: AdvisorAnswers): AdvisorRecommendation {
  // Deterministic scoring engine based on architectural inputs
  const isOffline = answers.offlineReq === 'offline-first';
  const isZeroBuild = answers.buildTolerance === 'zero-build';
  const isMobile = answers.formFactor === 'mobile';
  const isPythonAi = answers.appType === 'ai-data';

  if (isOffline && isZeroBuild) {
    return {
      presetNameEn: 'Self-Contained Offline Intelligence PWA',
      presetNameFa: 'وب‌اپلیکیشن مستقل آفلاین (بدون نیاز به ساخت)',
      stack: {
        language: 'lang-javascript',
        frontend: 'fe-alpine',
        runtime: 'rt-browser-engines',
        database: 'db-indexeddb',
        apiProtocol: 'net-http',
        hosting: 'host-gh-pages',
        securityNotes: 'qa-webcrypto'
      } as any,
      matchScore: 98,
      reasoningEn: [
        'Vanilla HTML5 and JavaScript execute directly in the browser sandbox without any build step.',
        'IndexedDB provides asynchronous structured client-side storage for offline persistence.',
        'GitHub Pages or Cloudflare Pages provides free zero-maintenance static asset distribution.',
        'Web Crypto API provides local SHA-256 integrity verification.'
      ],
      reasoningFa: [
        'استفاده از HTML5 و جاوااسکریپت خالص که بدون نیاز به بیلد مستقیماً در مرورگر اجرا می‌شوند.',
        'پایگاه داده IndexedDB ذخیره‌سازی ساختاریافته و کاملاً آفلاین را در دستگاه کاربر تضمین می‌کند.',
        'هاستینگ گیت‌هاب پیجز یا کلودفلر توزیع رایگان و بدون نگهداری سرور را ممکن می‌سازد.',
        'وب کریپتو اعتبارسنجی یکپارچگی داده‌ها را به صورت محلی انجام می‌دهد.'
      ],
      alternativesEn: [
        'Vite + React (if build tools become acceptable)',
        'SQLite Wasm (if complex SQL queries are needed client-side)'
      ],
      alternativesFa: [
        'ترکیب Vite و React در صورت پذیرش مرحله بیلد',
        'موتور SQLite مبتنی بر وب‌اسمبلی برای کوئری‌های پیچیده SQL'
      ],
      setupCommands: [
        '# Create single-file index.html directly',
        'touch index.html',
        '# Open directly in browser or serve with: npx serve .'
      ],
      serverlessFeasibility: '100% Feasible. Requires zero servers; runs entirely on client device.',
      deploymentStepsEn: [
        '1. Place index.html in GitHub repository root',
        '2. Enable GitHub Pages in repository settings',
        '3. Application is live globally with HTTPS enabled'
      ],
      deploymentStepsFa: [
        '۱. فایل index.html را در ریشه ریپازیتوری قرار دهید',
        '۲. گیت‌هاب پیجز را از بخش تنظیمات فعال کنید',
        '۳. برنامه به صورت سراسری با HTTPS فعال در دسترس خواهد بود'
      ],
      paidVsFreeBreakdown: '100% Free. Zero hosting costs, zero database costs, zero subscription fees.',
      risksAndLimitationsEn: [
        'Data remains inside the user browser and is not shared across devices without export/import.',
        'Browser clearing storage could remove unsaved IndexedDB data if quota is evicted.'
      ],
      risksAndLimitationsFa: [
        'داده‌ها در مرورگر کاربر باقی مانده و بدون خروجی گرفتن بین دستگاه‌ها همگام نمی‌شوند.',
        'پاک‌کردن دیتای مرورگر توسط کاربر ممکن است باعث حذف اطلاعات ذخیره‌شده شود.'
      ]
    };
  }

  if (isPythonAi) {
    return {
      presetNameEn: 'Python AI & Numerical Intelligence Stack',
      presetNameFa: 'استک هوش مصنوعی و محاسبات داده پایتون',
      stack: {
        language: 'lang-python',
        frontend: 'fe-react',
        backend: 'be-fastapi',
        runtime: 'rt-python',
        buildTool: 'pm-uv',
        database: 'db-postgres',
        apiProtocol: 'net-sse',
        hosting: 'host-do',
        testing: 'qa-vitest',
        aiIntegration: 'ai-pytorch'
      } as any,
      matchScore: 96,
      reasoningEn: [
        'FastAPI provides high-throughput async endpoints and native streaming support (SSE) for model tokens.',
        'PyTorch delivers production-grade neural network inference and fine-tuning.',
        'PostgreSQL with pgvector stores structured records and high-dimensional semantic embeddings.',
        'uv provides 10-100x faster dependency resolution than standard pip.'
      ],
      reasoningFa: [
        'فریم‌ورک FastAPI اندپوینت‌های ناهمگام سریع با پشتیبانی توکن‌های استریم هوش مصنوعی فراهم می‌کند.',
        'پایتورچ استنتاج شبکه‌های عصبی و یادگیری عمیق را به صورت بهینه مدیریت می‌نماید.',
        'پستگرسکیوال با افزونه pgvector داده‌های متنی و بردارهای معنایی را نگهداری می‌کند.',
        'ابزار uv مدیریت پکیج‌های پایتون را ۱۰ تا ۱۰۰ برابر سریع‌تر از pip انجام می‌دهد.'
      ],
      alternativesEn: ['Django (if monolithic admin required)', 'LangChain / Ollama for local LLM pipelines'],
      alternativesFa: ['جنگو در صورت نیاز به پنل ادمین یکپارچه', 'اولاما برای اجرای مدل‌های محلی'],
      setupCommands: [
        'uv venv && source .venv/bin/activate',
        'uv add fastapi uvicorn torch numpy pydantic',
        'uvicorn main:app --reload --port 8000'
      ],
      serverlessFeasibility: 'Partially feasible. Large PyTorch weights (>1GB) require dedicated containers or GPUs.',
      deploymentStepsEn: [
        '1. Package application into Docker container with CUDA base image',
        '2. Deploy container to DigitalOcean App Platform or AWS ECS',
        '3. Connect managed PostgreSQL database'
      ],
      deploymentStepsFa: [
        '۱. بسته‌بندی برنامه در ایمیج داکر با پشتیبانی CUDA',
        '۲. استقرار کانتینر روی سرور ابری یا سرور مجازی',
        '۳. اتصال پایگاه داده مدیریت‌شده پستگرس'
      ],
      paidVsFreeBreakdown: 'Free locally with Ollama/CPU; ~$12-$40/mo for VPS with GPU inference.',
      risksAndLimitationsEn: [
        'GPU memory consumption requires monitoring under concurrent inference requests.',
        'Python cold starts can be higher in traditional serverless environments.'
      ],
      risksAndLimitationsFa: [
        'مصرف حافظه گرافیکی در درخواست‌های همزمان نیازمند پایش مستمر است.',
        'راه‌اندازی اولیه در محیط‌های بدون سرور سنتی ممکن است با تأخیر همراه باشد.'
      ]
    };
  }

  if (isMobile) {
    return {
      presetNameEn: 'Cross-Platform Native Mobile Stack (Flutter)',
      presetNameFa: 'استک موبایل چندسکویی با فلاتر',
      stack: {
        language: 'lang-dart',
        frontend: 'mob-flutter',
        backend: 'be-nestjs',
        runtime: 'rt-nodejs',
        buildTool: 'pm-pub',
        database: 'db-postgres',
        apiProtocol: 'net-rest',
        hosting: 'host-do',
        testing: 'qa-vitest'
      } as any,
      matchScore: 94,
      reasoningEn: [
        'Flutter compiles to native ARM machine code for iOS and Android with 60/120fps UI performance.',
        'Dart provides null-safe static typing and fast hot reload during development.',
        'NestJS backend provides structured modular REST endpoints and enterprise dependency injection.',
        'PostgreSQL handles ACID transactions reliably for mobile user accounts.'
      ],
      reasoningFa: [
        'فلاتر کدها را به باینری نیتیو ARM برای اندروید و iOS با کارایی بالا کامپایل می‌کند.',
        'زبان دارت امنیت نال و بازخورد سریع توسعه (Hot Reload) را ارائه می‌دهد.',
        'بک‌اند نست‌جی‌اس معماری ساختاریافته و مقیاس‌پذیر برای ارائه وب‌سرویس‌ها فراهم می‌کند.',
        'پستگرس تراکنش‌های حساب‌های کاربری را با اطمینان ذخیره می‌نماید.'
      ],
      alternativesEn: ['React Native with Expo', 'Kotlin Multiplatform (KMP)'],
      alternativesFa: ['ری‌اکت نیتیو با اکسپو', 'کاتلین مولتی‌پلتفرم'],
      setupCommands: [
        'flutter create my_mobile_app',
        'cd my_mobile_app && flutter run',
        'npm i -g @nestjs/cli && nest new backend-api'
      ],
      serverlessFeasibility: 'Client app runs natively on phone; backend can run serverless.',
      deploymentStepsEn: [
        '1. Build release APK/AAB via flutter build appbundle',
        '2. Build iOS archive via flutter build ipa with Xcode',
        '3. Submit to Google Play Console and Apple App Store'
      ],
      deploymentStepsFa: [
        '۱. ساخت فایل خروجی اندروید با دستور flutter build appbundle',
        '۲. ساخت بسته انتشار iOS با استفاده از Xcode',
        '۳. ثبت و انتشار در گوگل پلی و اپ استور اپل'
      ],
      paidVsFreeBreakdown: 'Free tools; $25 one-time Google Play fee; $99/year Apple Developer account.',
      risksAndLimitationsEn: [
        'Platform signing certificates and store review policies apply.',
        'Building iOS app requires an Apple Mac workstation.'
      ],
      risksAndLimitationsFa: [
        'نیاز به گواهینامه‌های امضای دیجیتال و تأیید فروشگاه‌های نرم‌افزاری وجود دارد.',
        'ساخت نسخه iOS نیازمند سیستم‌عامل مک و ابزار Xcode است.'
      ]
    };
  }

  // Default: Modern Full-Stack TypeScript
  return {
    presetNameEn: 'Modern Full-Stack TypeScript Architecture',
    presetNameFa: 'معماری فول‌استک مدرن با تایپ‌اسکریپت',
    stack: {
      language: 'lang-typescript',
      frontend: 'fe-react',
      backend: 'fs-nextjs',
      runtime: 'rt-nodejs',
      buildTool: 'bt-vite',
      database: 'db-postgres',
      apiProtocol: 'net-rest',
      hosting: 'host-vercel',
      testing: 'qa-vitest',
      monitoring: 'obs-sentry'
    } as any,
    matchScore: 95,
    reasoningEn: [
      'End-to-end TypeScript provides unified types across frontend, API, and database models.',
      'React delivers declarative component composition supported by the largest open-source UI ecosystem.',
      'PostgreSQL ensures ACID compliance, flexible JSONB indexing, and reliable transactions.',
      'Vitest runs tests with instant HMR and full ESM compatibility.'
    ],
    reasoningFa: [
      'استفاده یکپارچه از تایپ‌اسکریپت در فرانت‌اند و بک‌اند مانع از خطاهای ناهماهنگی دیتا می‌شود.',
      'ری‌اکت با جامعه کاربری گسترده و ابزارهای متنوع توسعه رابط کاربری را تسریع می‌کند.',
      'پایگاه داده پستگرس تضمین تراکنش‌های ACID و مقیاس‌پذیری پایدار را به ارمغان می‌آورد.',
      'وای‌تست تست‌های نرم‌افزار را با سرعت فوق‌العاده بالا اجرا می‌نماید.'
    ],
    alternativesEn: ['SvelteKit (for leaner bundles)', 'Go / Gin backend (for extreme CPU throughput)'],
    alternativesFa: ['سوئلت‌کیت برای حجم باندل کمتر', 'بک‌اند با زبان گو برای پردازش‌های سنگین'],
    setupCommands: [
      'npm create vite@latest my-app -- --template react-ts',
      'cd my-app && npm install',
      'npm run dev'
    ],
    serverlessFeasibility: '100% Feasible on Vercel, Netlify, or AWS Lambda.',
    deploymentStepsEn: [
      '1. Push code to GitHub repository',
      '2. Import project in Vercel or Cloudflare Dashboard',
      '3. Configure DATABASE_URL environment variable and deploy'
    ],
    deploymentStepsFa: [
      '۱. ارسال کدها به مخزن گیت‌هاب',
      '۲. اتصال پروژه به داشبورد ورسل یا کلودفلر',
      '۳. تنظیم متغیرهای محیطی دیتابیس و انتشار نهایی'
    ],
    paidVsFreeBreakdown: 'Free tier covers development, staging, and small production; scalable on demand.',
    risksAndLimitationsEn: [
      'Cold starts on serverless database connections require connection pooling (e.g. PgBouncer).',
      'High node_modules dependency depth requires automated security audits.'
    ],
    risksAndLimitationsFa: [
      'اتصال مستقیم به دیتابیس در محیط‌های سرورلس نیازمند استخر اتصال (Connection Pool) است.',
      'وابستگی‌های پکیج نیازمند ممیزی امنیتی خودکار دوره‌ای هستند.'
    ]
  };
}
