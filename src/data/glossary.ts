import { GlossaryTerm } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'term-language',
    termEn: 'Programming Language',
    termFa: 'زبان برنامه‌نویسی',
    definitionEn: 'A formal system of notation and grammar designed to communicate instructions to a computer.',
    definitionFa: 'سیستم رسمی نشانه‌گذاری و گرامر برای انتقال دستورالعمل‌ها به کامپیوتر.',
    example: 'const greet = (name: string): string => `Hello, ${name}`;',
    relatedTechIds: ['lang-typescript', 'lang-python', 'lang-rust', 'lang-go'],
    level: 'beginner'
  },
  {
    id: 'term-library',
    termEn: 'Library',
    termFa: 'کتابخانه',
    definitionEn: 'A collection of reusable prewritten code routines, classes, and utilities that an application calls into. The developer retains control of the execution flow.',
    definitionFa: 'مجموعه‌ای از کدهای از پیش نوشته‌شده، کلاس‌ها و توابع قابل استفاده مجدد که برنامه شما آنها را فرامی‌خواند. جریان اصلی اجرا در دست توسعه‌دهنده است.',
    example: 'import { format } from "date-fns";\nconst formatted = format(new Date(), "yyyy-MM-dd");',
    relatedTechIds: ['fe-react', 'gfx-d3', 'ai-numpy'],
    level: 'beginner'
  },
  {
    id: 'term-framework',
    termEn: 'Framework',
    termFa: 'فریم‌ورک (چارچوب کاری)',
    definitionEn: 'A structured software environment that dictates application flow (Inversion of Control) and provides templates, conventions, and lifecycle hooks for developers to fill in.',
    definitionFa: 'یک بستر ساختاریافته که کنترل جریان برنامه را در دست می‌گیرد (وارونگی کنترل) و چرخه‌های حیات و قواعدی را برای نوشتن کد فراهم می‌آورد.',
    example: 'export default function Page() {\n  return <h1>Hello World</h1>;\n}',
    relatedTechIds: ['fs-nextjs', 'be-nestjs', 'be-laravel', 'fe-angular'],
    level: 'beginner'
  },
  {
    id: 'term-runtime',
    termEn: 'Runtime Environment',
    termFa: 'محیط اجرا (Runtime)',
    definitionEn: 'The software subsystem in which a program executes, providing memory management, standard libraries, I/O interfaces, and process scheduling.',
    definitionFa: 'زیرسیستم نرم‌افزاری که برنامه در آن اجرا می‌شود و مدیریت حافظه، ورودی/خروجی و فراخوانی سیستم را فراهم می‌کند.',
    example: 'node server.js // Node.js provides V8 + libuv for async I/O',
    relatedTechIds: ['rt-nodejs', 'rt-deno', 'rt-bun', 'rt-jvm'],
    level: 'intermediate'
  },
  {
    id: 'term-compiler',
    termEn: 'Compiler',
    termFa: 'کامپایلر',
    definitionEn: 'A program that translates source code written in a high-level language into machine code, bytecode, or another low-level target before execution.',
    definitionFa: 'برنامه‌ای که کد منبع زبان سطح بالا را پیش از اجرا به زبان ماشین یا بایت‌کد ترجمه می‌کند.',
    example: 'rustc main.rs -o my_app // Emits native machine executable',
    relatedTechIds: ['lang-rust', 'lang-c', 'pm-cargo'],
    level: 'intermediate'
  },
  {
    id: 'term-transpiler',
    termEn: 'Transpiler (Source-to-Source Compiler)',
    termFa: 'ترنسپایلر (مبدل مبدأ به مبدأ)',
    definitionEn: 'A specialized compiler that translates source code from one language into another language at a similar level of abstraction (e.g., TypeScript to JavaScript).',
    definitionFa: 'کامپایلری که کدهای یک زبان سطح بالا را به زبانی دیگر در همان سطح انتزاع ترجمه می‌کند (مانند تایپ‌اسکریپت به جاوااسکریپت).',
    example: 'tsc index.ts // Outputs index.js',
    relatedTechIds: ['bt-tsc', 'bt-babel', 'bt-swc'],
    level: 'intermediate'
  },
  {
    id: 'term-bundler',
    termEn: 'Bundler',
    termFa: 'باندلر (بسته‌ساز ماژول)',
    definitionEn: 'A development tool that analyzes an application’s module dependency graph and combines multiple files and assets into optimized bundles for browsers.',
    definitionFa: 'ابزاری که گراف وابستگی ماژول‌های پروژه را بررسی کرده و فایل‌های متعدد را در بسته‌های بهینه‌سازی‌شده برای مرورگر ادغام می‌کند.',
    example: 'vite build // Combines JS, CSS, and assets into dist/',
    relatedTechIds: ['bt-vite', 'bt-webpack', 'bt-rollup', 'bt-esbuild'],
    level: 'intermediate'
  },
  {
    id: 'term-package-manager',
    termEn: 'Package Manager',
    termFa: 'مدیر پکیج',
    definitionEn: 'A system that automates the installation, upgrading, configuration, and removal of third-party software libraries and tools.',
    definitionFa: 'سیستمی برای خودکارسازی فرآیند نصب، به‌روزرسانی، پیکربندی و حذف کتابخانه‌ها و وابستگی‌ها.',
    example: 'pnpm add lodash-es // Resolves dependency tree into node_modules',
    relatedTechIds: ['pm-npm', 'pm-pnpm', 'pm-cargo', 'pm-uv'],
    level: 'beginner'
  },
  {
    id: 'term-api',
    termEn: 'API (Application Programming Interface)',
    termFa: 'رابط برنامه‌نویسی نرم‌افزار (API)',
    definitionEn: 'A documented set of rules, endpoints, and protocols enabling two software applications to communicate and exchange data.',
    definitionFa: 'مجموعه‌ای مستند از قوانین، نقاط انتهایی و پروتکل‌ها که امکان تبادل داده بین دو برنامه نرم‌افزاری را فراهم می‌سازد.',
    example: 'GET /api/v1/users?limit=10 -> { users: [...] }',
    relatedTechIds: ['net-rest', 'net-graphql-proto', 'net-grpc'],
    level: 'beginner'
  },
  {
    id: 'term-sdk',
    termEn: 'SDK (Software Development Kit)',
    termFa: 'کیت توسعه نرم‌افزار (SDK)',
    definitionEn: 'A comprehensive collection of software tools, libraries, documentation, and code samples packaged to facilitate development for a specific platform or service.',
    definitionFa: 'مجموعه‌ای جامع از ابزارها، کتابخانه‌ها، مستندات و نمونه‌کدها برای تسهیل ساخت نرم‌افزار روی یک پلتفرم خاص.',
    example: 'const client = new Stripe(process.env.STRIPE_KEY);',
    relatedTechIds: ['mob-compose', 'mob-flutter', 'db-firebase'],
    level: 'intermediate'
  },
  {
    id: 'term-database',
    termEn: 'Database',
    termFa: 'پایگاه داده (دیتابیس)',
    definitionEn: 'An organized, persistent collection of electronic data managed by a dedicated software system (DBMS) supporting structured querying and indexing.',
    definitionFa: 'مجموعه‌ای سازمان‌یافته و ماندگار از داده‌های الکترونیکی که توسط یک سیستم مدیریتی با قابلیت پرس‌وجو و ایندکس‌گذاری نگهداری می‌شود.',
    example: 'SELECT * FROM users WHERE active = true;',
    relatedTechIds: ['db-postgres', 'db-mysql', 'db-mongodb', 'db-sqlite'],
    level: 'beginner'
  },
  {
    id: 'term-orm',
    termEn: 'ORM (Object-Relational Mapping)',
    termFa: 'نگاشت شیء-رابطه‌ای (ORM)',
    definitionEn: 'A technique that lets you query and manipulate data from a database using an object-oriented paradigm rather than writing raw SQL queries.',
    definitionFa: 'روشی برای پرس‌وجو و تغییر داده‌های پایگاه داده با استفاده از کلاس‌ها و اشیاء به جای نوشتن کوئری‌های خام SQL.',
    example: 'const user = await prisma.user.findUnique({ where: { id: 1 } });',
    relatedTechIds: ['lang-sql', 'db-postgres', 'be-laravel', 'be-django'],
    level: 'intermediate'
  },
  {
    id: 'term-hosting',
    termEn: 'Hosting',
    termFa: 'میزبانی وب (هاستینگ)',
    definitionEn: 'The service of providing compute servers, storage, and networking to make website and application files accessible on the internet.',
    definitionFa: 'ارائه سرورها، فضا و زیرساخت شبکه به منظور در دسترس قرار دادن فایل‌ها و برنامه‌ها روی اینترنت.',
    example: 'Deploying static bundle to GitHub Pages or cloud VM',
    relatedTechIds: ['host-gh-pages', 'host-vercel', 'host-vps', 'host-aws'],
    level: 'beginner'
  },
  {
    id: 'term-serverless',
    termEn: 'Serverless Computing',
    termFa: 'محاسبات بدون سرور (Serverless)',
    definitionEn: 'A cloud execution model where the cloud provider dynamically manages the allocation, provisioning, and scaling of servers, charging only for active compute time.',
    definitionFa: 'مدل ابری که مدیریت سرور، تخصیص منابع و مقیاس‌پذیری را خودکار کرده و فقط به ازای زمان اجرای محاسبات هزینه دریافت می‌کند.',
    example: 'export async function handler(event) { return { statusCode: 200 }; }',
    relatedTechIds: ['host-cf-workers', 'host-vercel', 'host-aws'],
    level: 'intermediate'
  },
  {
    id: 'term-edge',
    termEn: 'Edge Computing',
    termFa: 'محاسبات لبه (Edge Computing)',
    definitionEn: 'Deploying compute logic on servers geographically located close to the end-user to minimize latency and bandwidth consumption.',
    definitionFa: 'اجرای کدها روی سرورهای نزدیک به موقعیت جغرافیایی کاربر نهایی جهت کاهش چشمگیر تأخیر شبکه.',
    example: 'Cloudflare Workers executing routing and geolocation logic globally in <10ms',
    relatedTechIds: ['host-cf-workers', 'be-hono', 'host-cf-pages'],
    level: 'advanced'
  },
  {
    id: 'term-container',
    termEn: 'Container',
    termFa: 'کانتینر (Container)',
    definitionEn: 'A standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably across computing environments.',
    definitionFa: 'واحدی مستقل از نرم‌افزار که کد و تمامی پیش‌نیازهایش را بسته‌بندی کرده و اجرای یکسان آن را روی هر سیستمی تضمین می‌کند.',
    example: 'FROM node:20-alpine\nCOPY . .\nCMD ["node", "server.js"]',
    relatedTechIds: ['host-docker', 'host-k8s'],
    level: 'intermediate'
  },
  {
    id: 'term-vm',
    termEn: 'Virtual Machine (VM)',
    termFa: 'ماشین مجازی (VM)',
    definitionEn: 'A software emulation of a physical computer with its own complete operating system, virtual CPU, memory, and virtual storage running on a hypervisor.',
    definitionFa: 'شبیه‌سازی کامل یک کامپیوتر فیزیکی با سیستم‌عامل، پردازنده و حافظه مجازی که روی لایه هایپروایزر اجرا می‌شود.',
    example: 'Ubuntu 22.04 LTS instance running on DigitalOcean Droplet',
    relatedTechIds: ['host-vps', 'host-aws', 'host-do'],
    level: 'intermediate'
  },
  {
    id: 'term-cicd',
    termEn: 'CI/CD',
    termFa: 'یکپارچه‌سازی و تحویل مداوم (CI/CD)',
    definitionEn: 'Practices that automate the phases of software delivery: Continuous Integration (automated building and testing) and Continuous Deployment (automated releases).',
    definitionFa: 'فرآیند خودکارسازی ساخت، تست و استقرار نرم‌افزار در مراحل مختلف تا رسیدن به محیط عملیاتی.',
    example: '.github/workflows/deploy.yml running test suites on every pull request',
    relatedTechIds: ['host-gh-actions', 'host-cicd', 'vcs-git'],
    level: 'intermediate'
  },
  {
    id: 'term-pwa',
    termEn: 'PWA (Progressive Web App)',
    termFa: 'وب‌اپلیکیشن پیش‌رونده (PWA)',
    definitionEn: 'A website engineered with Service Workers, Web App Manifests, and local caching to deliver an app-like, installable, and offline-capable user experience.',
    definitionFa: 'وب‌سایتی با سرویس ورکر و مانیفست وب که تجربه نصب و کارکرد آفلاین مشابه برنامه‌های نیتیو را در مرورگر فراهم می‌کند.',
    example: 'navigator.serviceWorker.register("/sw.js");',
    relatedTechIds: ['db-indexeddb', 'lang-html', 'lang-javascript'],
    level: 'intermediate'
  },
  {
    id: 'term-ssr',
    termEn: 'SSR (Server-Side Rendering)',
    termFa: 'رندر سمت سرور (SSR)',
    definitionEn: 'Rendering web page HTML dynamically on the server for each incoming client request before delivering it to the browser.',
    definitionFa: 'تولید کدهای HTML صفحات وب روی سرور برای هر درخواست ورودی کاربر پیش از ارسال به مرورگر.',
    example: 'export async function getServerSideProps() { return { props: {} }; }',
    relatedTechIds: ['fs-nextjs', 'fs-nuxt', 'fs-sveltekit'],
    level: 'intermediate'
  },
  {
    id: 'term-ssg',
    termEn: 'SSG (Static Site Generation)',
    termFa: 'تولید سایت استاتیک (SSG)',
    definitionEn: 'Compiling and rendering web page HTML at build time rather than on every user request, resulting in instantly servable static files.',
    definitionFa: 'تولید فایل‌های نهایی HTML در زمان ساخت (Build) پروژه و ذخیره آنها برای تحویل فوری از طریق CDN.',
    example: 'astro build // Generates pre-rendered HTML files in dist/',
    relatedTechIds: ['fs-astro', 'fs-gatsby', 'host-gh-pages'],
    level: 'intermediate'
  },
  {
    id: 'term-csr',
    termEn: 'CSR (Client-Side Rendering)',
    termFa: 'رندر سمت کلاینت (CSR)',
    definitionEn: 'Rendering web pages directly inside the user\'s browser by executing JavaScript that builds the DOM dynamically.',
    definitionFa: 'تولید عناصر صفحه مستقیماً در مرورگر کاربر با اجرای کدهای جاوااسکریپت و دستکاری داینامیک DOM.',
    example: 'createRoot(document.getElementById("root")).render(<App />);',
    relatedTechIds: ['fe-react', 'fe-vue', 'fe-svelte'],
    level: 'beginner'
  },
  {
    id: 'term-hydration',
    termEn: 'Hydration',
    termFa: 'هیدراسیون (آب‌رسانی به DOM)',
    definitionEn: 'The client-side process where framework JavaScript attaches event listeners to pre-rendered HTML markup sent from the server, making it interactive.',
    definitionFa: 'فرآیندی در کلاینت که جاوااسکریپت کنترلرهای رویداد را به HTML رندرشده از سرور متصل می‌کند تا صفحه تعاملی شود.',
    example: 'hydrateRoot(document.getElementById("root"), <App />);',
    relatedTechIds: ['fs-nextjs', 'fe-react', 'fe-qwik'],
    level: 'advanced'
  },
  {
    id: 'term-cors',
    termEn: 'CORS (Cross-Origin Resource Sharing)',
    termFa: 'اشتراک منابع بین مبدأها (CORS)',
    definitionEn: 'A browser security mechanism that uses HTTP headers to allow a server to indicate any origins other than its own from which a browser should permit loading resources.',
    definitionFa: 'سازوکار امنیتی مرورگر که به سرور اجازه می‌دهد مشخص کند چه دامنه‌های دیگری مجاز به دریافت داده‌ها هستند.',
    example: 'Access-Control-Allow-Origin: https://app.example.com',
    relatedTechIds: ['net-http', 'net-rest', 'be-express'],
    level: 'intermediate'
  },
  {
    id: 'term-auth',
    termEn: 'Authentication vs Authorization',
    termFa: 'احراز هویت در برابر مجوزدهی',
    definitionEn: 'Authentication verifies WHO you are (e.g., password, passkey, OTP). Authorization determines WHAT actions and resources you are permitted to access.',
    definitionFa: 'احراز هویت هویت کاربر را اثبات می‌کند، در حالی که مجوزدهی مشخص می‌کند کاربر چه دسترسی‌هایی به منابع دارد.',
    example: 'AuthN: Login with Passkey -> AuthZ: Check if user.role === "admin"',
    relatedTechIds: ['net-oauth2', 'net-oidc', 'db-supabase'],
    level: 'intermediate'
  },
  {
    id: 'term-caching',
    termEn: 'Caching',
    termFa: 'حافظه موقت و کش‌کردن (Caching)',
    definitionEn: 'Storing copies of frequently requested data in high-speed storage layers (RAM, CDN, browser cache) to serve future requests faster.',
    definitionFa: 'ذخیره داده‌های پرتکرار در لایه‌های سریع‌تر حافظه مانند رم یا CDN جهت افزایش چشمگیر سرعت پاسخ‌دهی.',
    example: 'Cache-Control: public, max-age=31536000, immutable',
    relatedTechIds: ['db-redis', 'db-valkey', 'db-memcached'],
    level: 'beginner'
  }
];
