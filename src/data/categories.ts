export interface CategoryInfo {
  code: string;
  name: string;
  nameFa: string;
  descriptionEn: string;
  descriptionFa: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    code: 'A',
    name: 'Languages and formats',
    nameFa: 'زبان‌ها و قالب‌ها',
    descriptionEn: 'Programming languages, markup standards, query specifications, and binary compilation targets.',
    descriptionFa: 'زبان‌های برنامه‌نویسی، استانداردهای نشانه‌گذاری، مشخصات پرس‌وجو و اهداف کامپایل باینری.',
    icon: 'Code2'
  },
  {
    code: 'B',
    name: 'Frontend libraries and frameworks',
    nameFa: 'کتابخانه‌ها و فریم‌ورک‌های فرانت‌اند',
    descriptionEn: 'Declarative UI rendering, reactive component models, and browser application frameworks.',
    descriptionFa: 'رندرینگ اعلانی رابط کاربری، مدل‌های کامپوننت واکنشی و فریم‌ورک‌های مرورگر.',
    icon: 'Layout'
  },
  {
    code: 'C',
    name: 'Full-stack and server-rendered frameworks',
    nameFa: 'فریم‌ورک‌های فول‌استک و رندر سمت سرور',
    descriptionEn: 'Meta-frameworks combining SSR, SSG, routing, server actions, and edge rendering.',
    descriptionFa: 'متافریم‌ورک‌های یکپارچه ارائه‌دهنده SSR، SSG، مسیریابی و رندرینگ لبه.',
    icon: 'Layers'
  },
  {
    code: 'D',
    name: 'Backend frameworks',
    nameFa: 'فریم‌ورک‌های بک‌اند',
    descriptionEn: 'Server application frameworks, HTTP routing engines, dependency injection, and microservices.',
    descriptionFa: 'فریم‌ورک‌های سرور، موتورهای مسیریابی HTTP، تزریق وابستگی و میکروسرویس‌ها.',
    icon: 'Server'
  },
  {
    code: 'E',
    name: 'Mobile and desktop development',
    nameFa: 'توسعه موبایل و دسکتاپ',
    descriptionEn: 'Cross-platform and native GUI toolkits targeting iOS, Android, macOS, Windows, and Linux.',
    descriptionFa: 'ابزارهای چندسکویی و بومی برای ساخت برنامه‌های iOS، اندروید، مک و ویندوز.',
    icon: 'Smartphone'
  },
  {
    code: 'F',
    name: 'UI, styling, and design systems',
    nameFa: 'طراحی، استایل‌دهی و دیزاین سیستم‌ها',
    descriptionEn: 'CSS frameworks, component primitives, token architectures, and theme engines.',
    descriptionFa: 'فریم‌ورک‌های CSS، اجزای طراحی، سیستم‌های توکن و موتورهای قالب‌بندی.',
    icon: 'Palette'
  },
  {
    code: 'G',
    name: 'Graphics, animation, and visualization',
    nameFa: 'گرافیک، انیمیشن و بصری‌سازی',
    descriptionEn: 'WebGL, WebGPU, 2D canvas, SVG charts, physics, and timeline animation libraries.',
    descriptionFa: 'کتابخانه‌های WebGL، کانوَس دوبعدی، نمودارهای SVG و انیمیشن‌های مبتنی بر زمان.',
    icon: 'Activity'
  },
  {
    code: 'H',
    name: 'Runtime environments and execution engines',
    nameFa: 'محیط‌های اجرا و موتورهای محاسباتی',
    descriptionEn: 'JavaScript V8 runtimes, JVM, CLR, Python interpreters, and WebAssembly virtual machines.',
    descriptionFa: 'محیط‌های اجرای V8، ماشین‌های مجازی JVM و CLR، مفسرهای پایتون و وب‌اسمبلی.',
    icon: 'Cpu'
  },
  {
    code: 'I',
    name: 'Build tools and package managers',
    nameFa: 'ابزارهای ساخت و مدیریت پکیج',
    descriptionEn: 'Bundlers, compilers, task runners, transpilers, and dependency resolution managers.',
    descriptionFa: 'باندلرها، کامپایلرها، تسک‌رانرها و ابزارهای حل و مدیریت وابستگی‌ها.',
    icon: 'Wrench'
  },
  {
    code: 'J',
    name: 'Databases and data storage',
    nameFa: 'پایگاه‌های داده و ذخیره‌سازی داده',
    descriptionEn: 'Relational SQL engines, document stores, key-value caches, and browser client storage.',
    descriptionFa: 'موتورهای رابطه‌ای SQL، پایگاه‌های سندی NoSQL، کش‌های کلید-مقدار و ذخیره‌گاه‌های کلاینت.',
    icon: 'Database'
  },
  {
    code: 'K',
    name: 'API, communication, and networking',
    nameFa: 'ارتباطات، شبکه و پروتکل‌های API',
    descriptionEn: 'Transport protocols, query interfaces, real-time sockets, and authentication standards.',
    descriptionFa: 'پروتکل‌های انتقال داده، سوکت‌های بلادرنگ و استانداردهای احراز هویت.',
    icon: 'Network'
  },
  {
    code: 'L',
    name: 'Hosting, deployment, and infrastructure',
    nameFa: 'میزبانی، استقرار و زیرساخت ابری',
    descriptionEn: 'Static CDNs, serverless platforms, container runtimes, cloud hyperscalers, and CI/CD.',
    descriptionFa: 'شبکه‌های توزیع محتوا، پلتفرم‌های بدون سرور، کانتینرها و ابرهای بزرگ.',
    icon: 'Cloud'
  },
  {
    code: 'M',
    name: 'Content management systems',
    nameFa: 'سیستم‌های مدیریت محتوا (CMS)',
    descriptionEn: 'Headless content APIs, monolithic publishing suites, and modular e-commerce engines.',
    descriptionFa: 'سامانه‌های بدون سر محتوا (Headless CMS)، بسته‌های انتشار و فروشگاه‌سازها.',
    icon: 'FileText'
  },
  {
    code: 'N',
    name: 'AI and data science',
    nameFa: 'هوش مصنوعی و علم داده',
    descriptionEn: 'Deep learning frameworks, tensor mathematics, local model inference, and orchestration.',
    descriptionFa: 'فریم‌ورک‌های یادگیری عمیق، محاسبات تانسوری، استنتاج مدل‌های محلی و پایپ‌لاین‌ها.',
    icon: 'Sparkles'
  },
  {
    code: 'O',
    name: 'Testing, security, and quality',
    nameFa: 'تست، امنیت و تضمین کیفیت',
    descriptionEn: 'Unit and end-to-end test runners, accessibility auditors, vulnerability scanners, and crypto.',
    descriptionFa: 'ابزارهای تست واحد و انتها-به-انتها، اسکنرهای آسیب‌پذیری و استانداردهای وب کریپتو.',
    icon: 'ShieldCheck'
  },
  {
    code: 'P',
    name: 'Source control, collaboration, and observability',
    nameFa: 'کنترل نسخه، همکاری و پایش سیستم (Observability)',
    descriptionEn: 'Version control systems, code hosts, metric collectors, error trackers, and dashboards.',
    descriptionFa: 'سامانه‌های کنترل نسخه، میزبان‌های کد، رهگیری خطا و پایشگرهای سلامت نرم‌افزار.',
    icon: 'GitFork'
  }
];
