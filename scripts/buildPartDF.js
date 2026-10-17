import fs from 'node:fs';

const records = JSON.parse(fs.readFileSync('scripts/catABC_done.json', 'utf8'));

function add(item) {
  records.push({
    id: item.id,
    name: item.name,
    aliases: item.aliases || [],
    type: item.type,
    category: item.category,
    categoryCode: item.categoryCode,
    subcategory: item.subcategory,
    shortDescription: item.shortDescription,
    detailedExplanation: item.detailedExplanation || `${item.name} is a proven technology in ${item.category}. ${item.shortDescription} It is widely adopted for ${item.mainPurpose}`,
    mainPurpose: item.mainPurpose,
    typicalUseCases: item.typicalUseCases || ['Web applications', 'APIs'],
    relatedLanguages: item.relatedLanguages || ['JavaScript', 'TypeScript'],
    dependencies: item.dependencies || [],
    runtimeRequirements: item.runtimeRequirements || 'Standard platform runtime',
    buildRequirements: item.buildRequirements || 'None',
    compatibility: {
      browser: item.browser || 'All modern browsers',
      os: item.os || 'Cross-platform',
      offlineCapable: item.offlineCapable !== false
    },
    role: item.role || 'backend',
    relations: {
      database: item.database || [],
      api: item.api || [],
      complementary: item.complementary || [],
      alternatives: item.alternatives || []
    },
    hostingOptions: item.hosting || ['Any cloud or server'],
    learningDifficulty: item.diff || 2,
    advantages: item.advantages || ['Battle-tested', 'Active ecosystem', 'Strong documentation'],
    limitations: item.limitations || ['Requires domain familiarity'],
    knownConstraints: item.constraints || ['Platform-specific setup required'],
    securityNotes: item.security || 'Enforce authentication, input validation, and secure headers.',
    docsUrl: item.docsUrl || 'https://developer.mozilla.org',
    repoUrl: item.repoUrl || '',
    license: item.license || 'Open Source',
    verifiedDate: '2026-03-01',
    catalogVersion: '1.0.0',
    isVerified: true
  });
}

// D. Backend frameworks (18)
const D = [
  ['be-express', 'Express', ['Express.js'], 'Framework', 'Minimal Node HTTP', 'Fast, unopinionated, minimalist web framework for Node.js.', 'REST APIs and HTTP microservices.', ['REST APIs', 'BFF layers'], ['JavaScript', 'TypeScript'], 'Node.js 18+', 'None or tsc', 'backend', ['Node.js', 'MongoDB', 'PostgreSQL'], ['Fastify', 'NestJS', 'Hono'], 2, 'https://expressjs.com', 'https://github.com/expressjs/express', 'MIT'],
  ['be-nestjs', 'NestJS', ['Nest.js'], 'Framework', 'Progressive TypeScript Backend', 'Progressive TypeScript framework with architectural modularity and dependency injection.', 'Enterprise-grade microservices and structured backends.', ['Enterprise APIs', 'Microservices'], ['TypeScript'], 'Node.js 18+', 'Nest CLI / tsc', 'backend', ['TypeScript', 'TypeORM', 'Prisma'], ['Express', 'Spring Boot'], 3, 'https://nestjs.com', 'https://github.com/nestjs/nest', 'MIT'],
  ['be-fastify', 'Fastify', ['Fastify.js'], 'Framework', 'High-Performance Node Framework', 'Extremely fast and low overhead web framework for Node.js with built-in schema validation.', 'High-throughput microservices and JSON APIs.', ['High-load APIs', 'JSON microservices'], ['JavaScript', 'TypeScript'], 'Node.js 18+', 'None or tsc', 'backend', ['TypeBox', 'Pino', 'PostgreSQL'], ['Express', 'Hono'], 2, 'https://fastify.dev', 'https://github.com/fastify/fastify', 'MIT'],
  ['be-hono', 'Hono', ['Hono.dev'], 'Framework', 'Ultrafast Edge Web Standards', 'Ultrafast, lightweight, web standards-based web framework for Cloudflare, Deno, Bun, and Node.', 'Edge APIs and serverless microservices.', ['Edge APIs', 'Cloudflare Workers', 'Lightweight backends'], ['TypeScript', 'JavaScript'], 'Multi-runtime (Cloudflare, Bun, Deno, Node)', 'None or Vite', 'backend', ['Cloudflare Workers', 'TypeScript', 'D1'], ['Express', 'Fastify'], 2, 'https://hono.dev', 'https://github.com/honojs/hono', 'MIT'],
  ['be-koa', 'Koa', ['Koa.js'], 'Framework', 'Expressive HTTP Middleware', 'Expressive HTTP middleware framework for Node.js designed by the team behind Express.', 'Customizable middleware-driven APIs.', ['Lightweight APIs', 'Custom gateways'], ['JavaScript'], 'Node.js 18+', 'None or tsc', 'backend', ['Node.js'], ['Express', 'Fastify'], 2, 'https://koajs.com', 'https://github.com/koajs/koa', 'MIT'],
  ['be-laravel', 'Laravel', ['Laravel11'], 'Framework', 'Elegant PHP Web Framework', 'The PHP Framework for Web Artisans with elegant syntax, Eloquent ORM, and rich ecosystem.', 'Full-featured web applications, robust APIs, and SaaS backends.', ['SaaS platforms', 'E-commerce', 'REST APIs'], ['PHP', 'SQL'], 'PHP 8.2+ with PHP-FPM', 'Composer', 'backend', ['PHP', 'MySQL', 'PostgreSQL', 'Redis'], ['Symfony', 'Django', 'Rails'], 2, 'https://laravel.com/docs', 'https://github.com/laravel/laravel', 'MIT'],
  ['be-symfony', 'Symfony', ['Symfony7'], 'Framework', 'Modular Enterprise PHP', 'Set of reusable PHP components and a framework for building complex enterprise web apps.', 'Modular enterprise systems and long-term maintainable backends.', ['Enterprise systems', 'Reusable components'], ['PHP'], 'PHP 8.2+', 'Composer', 'backend', ['Doctrine ORM', 'PHP', 'MySQL'], ['Laravel', 'Spring Boot'], 3, 'https://symfony.com', 'https://github.com/symfony/symfony', 'MIT'],
  ['be-codeigniter', 'CodeIgniter', ['CI4'], 'Framework', 'Lightweight PHP Framework', 'Powerful PHP framework with a very small footprint, built for developers who need simple toolkits.', 'Small to medium websites on shared hosting.', ['Legacy migrations', 'Lightweight portals'], ['PHP'], 'PHP 8.1+', 'Composer or manual', 'backend', ['MySQL', 'PHP'], ['Laravel', 'Symfony'], 1, 'https://codeigniter.com', 'https://github.com/codeigniter4/CodeIgniter4', 'MIT'],
  ['be-django', 'Django', ['Django5'], 'Framework', 'Batteries-Included Python Framework', 'High-level Python web framework that encourages rapid development and clean, pragmatic design.', 'Data-driven web applications with built-in admin panel and ORM.', ['Content platforms', 'Fintech backends', 'Scientific portals'], ['Python', 'SQL'], 'Python 3.10+', 'pip / uv / poetry', 'backend', ['PostgreSQL', 'Python', 'Redis', 'Celery'], ['FastAPI', 'Flask', 'Rails'], 2, 'https://docs.djangoproject.com', 'https://github.com/django/django', 'BSD-3-Clause'],
  ['be-flask', 'Flask', ['Flask-Py'], 'Framework', 'Lightweight Python Microframework', 'Lightweight WSGI web application microframework for Python with Jinja2 and Werkzeug.', 'Microservices, prototypes, and lightweight data backends.', ['AI model serving', 'Microservices', 'MVPs'], ['Python'], 'Python 3.8+', 'pip / uv', 'backend', ['SQLAlchemy', 'Python'], ['FastAPI', 'Django'], 2, 'https://flask.palletsprojects.com', 'https://github.com/pallets/flask', 'BSD-3-Clause'],
  ['be-fastapi', 'FastAPI', ['FastAPI-Py'], 'Framework', 'Modern Async Python Framework', 'Modern, fast (high-performance) web framework for building APIs with Python based on Pydantic.', 'High-performance AI model APIs and OpenAPI-documented microservices.', ['AI model inference APIs', 'Real-time REST APIs'], ['Python'], 'Python 3.8+ with ASGI (Uvicorn)', 'pip / uv', 'backend', ['Pydantic', 'Uvicorn', 'PostgreSQL', 'PyTorch'], ['Flask', 'Django', 'Express'], 2, 'https://fastapi.tiangolo.com', 'https://github.com/tiangolo/fastapi', 'MIT'],
  ['be-springboot', 'Spring Boot', ['Spring'], 'Framework', 'Enterprise Java Framework', 'Stand-alone, production-grade Spring-based applications that you can just run.', 'Enterprise microservices, transaction processing, and cloud services.', ['Financial systems', 'Enterprise microservices'], ['Java', 'Kotlin'], 'JVM 17+', 'Maven or Gradle', 'backend', ['Java', 'PostgreSQL', 'Kafka', 'Docker'], ['NestJS', 'ASP.NET Core'], 3, 'https://spring.io/projects/spring-boot', 'https://github.com/spring-projects/spring-boot', 'Apache-2.0'],
  ['be-aspnetcore', 'ASP.NET Core', ['ASP.NET'], 'Framework', 'High-Performance .NET Web Framework', 'Cross-platform, high-performance, open-source framework for modern cloud-enabled apps.', 'High-scale web APIs and enterprise cloud services.', ['Enterprise APIs', 'Real-time apps (SignalR)'], ['C#'], '.NET Runtime 8+', '.NET SDK', 'backend', ['C#', 'SQL Server', 'Entity Framework'], ['Spring Boot', 'NestJS'], 3, 'https://learn.microsoft.com/en-us/aspnet/core/', 'https://github.com/dotnet/aspnetcore', 'MIT'],
  ['be-gin', 'Gin', ['Gin-Gonic'], 'Framework', 'High-Speed Go Web Framework', 'HTTP web framework written in Go featuring a Martini-like API with much better performance.', 'Ultra-low latency microservices in Go.', ['Microservices', 'High-throughput APIs'], ['Go'], 'Compiled Go executable', 'go build', 'backend', ['Go', 'PostgreSQL', 'Redis'], ['Echo', 'Fiber', 'Axum'], 2, 'https://gin-gonic.com', 'https://github.com/gin-gonic/gin', 'MIT'],
  ['be-echo', 'Echo', ['Echo-Go'], 'Framework', 'Minimalist Go HTTP Framework', 'High performance, extensible, minimalist Go web framework with fast router.', 'REST APIs and microservices in Go.', ['JSON APIs', 'Microservices'], ['Go'], 'Compiled Go executable', 'go build', 'backend', ['Go', 'PostgreSQL'], ['Gin', 'Fiber'], 2, 'https://echo.labstack.com', 'https://github.com/labstack/echo', 'MIT'],
  ['be-rails', 'Ruby on Rails', ['Rails', 'RoR'], 'Framework', 'Convention-Over-Configuration Framework', 'Full-stack web framework optimized for programmer happiness and sustainable productivity.', 'Fast MVP creation and full-stack monoliths.', ['SaaS products', 'Marketplaces'], ['Ruby', 'SQL'], 'Ruby 3.1+', 'Bundler', 'backend', ['Ruby', 'PostgreSQL', 'Redis'], ['Laravel', 'Django'], 2, 'https://rubyonrails.org', 'https://github.com/rails/rails', 'MIT'],
  ['be-phoenix', 'Phoenix', ['Phoenix Framework'], 'Framework', 'Real-Time Elixir Web Framework', 'Web development framework that doesn’t compromise speed and maintainability on the BEAM.', 'Real-time collaborative applications, LiveView UIs, and chat systems.', ['Real-time collaboration', 'Chat applications'], ['Elixir'], 'Erlang/OTP BEAM', 'Mix', 'backend', ['Elixir', 'PostgreSQL', 'Erlang'], ['Rails', 'Node.js'], 3, 'https://www.phoenixframework.org', 'https://github.com/phoenixframework/phoenix', 'MIT'],
  ['be-axum', 'Axum', ['Axum-rs'], 'Framework', 'Ergonomic Rust Web Framework', 'Modular web application framework that focuses on ergonomics and modularity in the Tokio ecosystem.', 'High-performance, memory-safe network services and microservices.', ['Low-latency APIs', 'Financial microservices'], ['Rust'], 'Compiled Rust executable', 'Cargo', 'backend', ['Rust', 'Tokio', 'Tower'], ['Actix Web', 'Go Gin'], 4, 'https://docs.rs/axum', 'https://github.com/tokio-rs/axum', 'MIT']
];

D.forEach(d => {
  add({
    id: d[0], name: d[1], aliases: d[2], type: d[3], category: 'D. Backend frameworks', categoryCode: 'D', subcategory: d[4],
    shortDescription: d[5], mainPurpose: d[6], typicalUseCases: d[7], relatedLanguages: d[8], runtimeRequirements: d[9], buildRequirements: d[10],
    role: d[11], complementary: d[12], alternatives: d[13], diff: d[14], docsUrl: d[15], repoUrl: d[16], license: d[17]
  });
});

// E. Mobile and desktop development (12)
const E = [
  ['mob-swiftui', 'SwiftUI', ['SwiftUI3'], 'Framework', 'Declarative Apple UI', 'Declarative framework by Apple for building user interfaces across iOS, iPadOS, macOS, watchOS.', 'Native Apple platform applications.', ['iOS apps', 'macOS native utilities'], ['Swift'], 'iOS 15+, macOS 12+', 'Xcode on macOS', 'mobile', ['Swift', 'Combine'], ['UIKit', 'Flutter'], 3, 'https://developer.apple.com/xcode/swiftui/', '', 'Proprietary Apple SDK'],
  ['mob-uikit', 'UIKit', ['UIKit iOS'], 'Framework', 'Imperative Apple UI', 'Core imperative framework providing the window and view architecture for iOS apps.', 'Legacy and fine-grained iOS touch/view systems.', ['iOS apps', 'Complex custom views'], ['Swift', 'Objective-C'], 'iOS OS', 'Xcode on macOS', 'mobile', ['Swift', 'CoreGraphics'], ['SwiftUI'], 3, 'https://developer.apple.com/documentation/uikit', '', 'Proprietary Apple SDK'],
  ['mob-compose', 'Jetpack Compose', ['Compose'], 'Framework', 'Declarative Android UI', 'Android’s recommended modern toolkit for building native UI using declarative Kotlin.', 'Modern Android phone, tablet, and foldable applications.', ['Android apps', 'WearOS'], ['Kotlin'], 'Android 5.0+ (API 21+)', 'Android Studio / Gradle', 'mobile', ['Kotlin', 'Android SDK'], ['Flutter', 'React Native'], 3, 'https://developer.android.com/jetpack/compose', 'https://github.com/androidx/androidx', 'Apache-2.0'],
  ['mob-flutter', 'Flutter', ['FlutterSDK'], 'Framework', 'Multiplatform Canvas UI', 'Google’s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.', 'Fast multiplatform apps with pixel-perfect custom UI.', ['iOS/Android apps', 'Desktop utilities'], ['Dart'], 'Flutter engine (Skia/Impeller)', 'Flutter SDK', 'mobile', ['Dart', 'Android SDK', 'iOS SDK'], ['React Native', 'Capacitor'], 2, 'https://flutter.dev', 'https://github.com/flutter/flutter', 'BSD-3-Clause'],
  ['mob-react-native', 'React Native', ['RN'], 'Framework', 'Native React Multiplatform', 'Framework for building native apps for Android, iOS, and more using React.', 'Cross-platform mobile apps reusing web React skills.', ['Cross-platform mobile apps', 'Enterprise mobile'], ['JavaScript', 'TypeScript'], 'Hermes JS engine on mobile OS', 'Metro bundler / Xcode / Gradle', 'mobile', ['React', 'Expo', 'TypeScript'], ['Flutter', 'SwiftUI'], 3, 'https://reactnative.dev', 'https://github.com/facebook/react-native', 'MIT'],
  ['mob-ionic', 'Ionic', ['Ionic Framework'], 'Framework', 'Web-Based Hybrid Mobile', 'Open-source UI toolkit for building high-performance cross-platform mobile apps with HTML, CSS, and JS.', 'Fast mobile apps using web standard skills.', ['Corporate mobile portals', 'Hybrid mobile apps'], ['TypeScript', 'JavaScript'], 'Webview inside mobile shell', 'Vite / Capacitor CLI', 'mobile', ['Capacitor', 'Angular', 'React'], ['Flutter', 'React Native'], 2, 'https://ionicframework.com', 'https://github.com/ionic-team/ionic-framework', 'MIT'],
  ['mob-capacitor', 'Capacitor', ['CapacitorJS'], 'Tool', 'Native Mobile Bridge', 'Cross-platform native runtime that makes it easy to build native mobile apps with the web.', 'Packaging web apps as iOS/Android apps with access to native APIs.', ['PWA to app store', 'Hybrid mobile'], ['JavaScript', 'TypeScript', 'Swift', 'Kotlin'], 'Android / iOS Webview runtime', 'Capacitor CLI', 'mobile', ['React', 'Vue', 'Ionic'], ['Cordova', 'React Native'], 2, 'https://capacitorjs.com', 'https://github.com/ionic-team/capacitor', 'MIT'],
  ['mob-tauri', 'Tauri', ['Tauri v2'], 'Framework', 'Lightweight Rust Desktop & Mobile', 'Build an optimized, secure, and frontend-independent desktop & mobile application with Rust.', 'Ultra-lightweight desktop applications using system webview and Rust backend.', ['System utilities', 'Lightweight desktop apps'], ['Rust', 'JavaScript', 'TypeScript'], 'OS Webview (WebKitGTK, WebView2, WKWebView)', 'Cargo & npm', 'desktop', ['Rust', 'Vite', 'React'], ['Electron', 'Qt'], 3, 'https://tauri.app', 'https://github.com/tauri-apps/tauri', 'MIT / Apache-2.0'],
  ['mob-electron', 'Electron', ['ElectronJS'], 'Framework', 'Chromium Desktop Apps', 'Build cross-platform desktop apps with JavaScript, HTML, and CSS bundling Chromium and Node.js.', 'Feature-rich desktop apps needing deep OS access and consistent Chromium rendering.', ['VS Code-like editors', 'Slack-like chat apps'], ['JavaScript', 'TypeScript'], 'Bundled Chromium + Node.js', 'Electron Forge / electron-builder', 'desktop', ['Node.js', 'React', 'TypeScript'], ['Tauri', 'Qt'], 2, 'https://www.electronjs.org', 'https://github.com/electron/electron', 'MIT'],
  ['mob-maui', '.NET MAUI', ['MAUI'], 'Framework', 'Unified .NET Multi-Platform UI', '.NET Multi-platform App UI lets you build native apps for Android, iOS, macOS, and Windows from a single codebase.', 'Enterprise desktop and mobile apps in the Microsoft ecosystem.', ['Internal enterprise apps', 'Multi-device line-of-business'], ['C#', 'XAML'], '.NET 8+ runtime', '.NET SDK / Visual Studio', 'mobile', ['C#', '.NET', 'Visual Studio'], ['Flutter', 'Qt'], 3, 'https://dotnet.microsoft.com/apps/maui', 'https://github.com/dotnet/maui', 'MIT'],
  ['mob-qt', 'Qt', ['Qt6'], 'Framework', 'C++ / QML Cross-Platform Framework', 'Cross-platform software development framework for embedded, desktop, and mobile systems.', 'Performance-critical desktop applications, automotive HMIs, and embedded screens.', ['Medical devices', 'Automotive displays', 'Desktop CAD'], ['C++', 'QML', 'Python'], 'Native machine execution with Qt libraries', 'CMake / qmake', 'desktop', ['C++', 'CMake'], ['Tauri', 'Electron'], 4, 'https://www.qt.io', '', 'LGPL-3.0 / Commercial'],
  ['mob-kmp', 'Kotlin Multiplatform', ['KMP'], 'Framework', 'Shared Native Business Logic', 'Open-source technology developed by JetBrains for sharing business logic across iOS, Android, and Desktop.', 'Sharing networking, domain logic, and databases while keeping 100% native UI.', ['Shared mobile logic', 'Multiplatform SDKs'], ['Kotlin'], 'JVM (Android) and Objective-C/Swift bridge (iOS)', 'Gradle / Kotlin compiler', 'mobile', ['Kotlin', 'Compose Multiplatform'], ['Flutter', 'React Native'], 3, 'https://www.jetbrains.com/kotlin-multiplatform/', 'https://github.com/JetBrains/kotlin', 'Apache-2.0']
];

E.forEach(e => {
  add({
    id: e[0], name: e[1], aliases: e[2], type: e[3], category: 'E. Mobile and desktop development', categoryCode: 'E', subcategory: e[4],
    shortDescription: e[5], mainPurpose: e[6], typicalUseCases: e[7], relatedLanguages: e[8], runtimeRequirements: e[9], buildRequirements: e[10],
    role: e[11], complementary: e[12], alternatives: e[13], diff: e[14], docsUrl: e[15], repoUrl: e[16], license: e[17]
  });
});

// F. UI, styling, and design systems (12)
const F = [
  ['ui-tailwind', 'Tailwind CSS', ['Tailwind'], 'Framework', 'Utility-First CSS', 'Utility-first CSS framework packed with classes that can be composed directly in markup.', 'Rapid, bespoke responsive interface styling.', ['SaaS frontends', 'Design systems'], ['CSS'], 'Browser', 'Tailwind CLI / PostCSS / Vite', 'frontend', ['React', 'Vue', 'HTML5'], ['Bootstrap', 'Sass'], 2, 'https://tailwindcss.com', 'https://github.com/tailwindlabs/tailwindcss', 'MIT'],
  ['ui-bootstrap', 'Bootstrap', ['Bootstrap5'], 'Framework', 'Component CSS Framework', 'Powerful, extensible, and feature-packed frontend toolkit for fast prototype styling.', 'Quick prototypes and standard responsive grids.', ['Admin templates', 'Fast prototypes'], ['CSS', 'JavaScript'], 'Browser', 'None or Sass/bundler', 'frontend', ['HTML5', 'JavaScript'], ['Tailwind CSS', 'Bulma'], 1, 'https://getbootstrap.com', 'https://github.com/twbs/bootstrap', 'MIT'],
  ['ui-sass', 'Sass', ['SCSS'], 'Tool', 'CSS Extension Language', 'CSS with superpowers including variables, nesting, mixins, and inheritance.', 'Structured CSS architectures in large frontends.', ['Legacy web apps', 'Corporate themes'], ['CSS'], 'Browser (compiled CSS output)', 'Dart Sass compiler', 'tooling', ['CSS3', 'Vite'], ['PostCSS', 'Less'], 2, 'https://sass-lang.com', 'https://github.com/sass/dart-sass', 'MIT'],
  ['ui-less', 'Less', ['LessCSS'], 'Tool', 'Dynamic Stylesheet Language', 'Backwards-compatible language extension for CSS with variables and mixins.', 'Styling Ant Design and legacy projects.', ['Legacy web styling'], ['CSS'], 'Browser (compiled CSS)', 'lessc compiler', 'tooling', ['CSS3'], ['Sass'], 2, 'https://lesscss.org', 'https://github.com/less/less.js', 'Apache-2.0'],
  ['ui-bulma', 'Bulma', ['BulmaCSS'], 'Framework', 'Modern Flexbox CSS', 'Modern CSS framework based on Flexbox with no JavaScript required.', 'Clean, simple website styling with zero JS dependency.', ['Content websites', 'Dashboards'], ['CSS'], 'Browser', 'None or Sass', 'frontend', ['HTML5'], ['Bootstrap', 'Tailwind CSS'], 1, 'https://bulma.io', 'https://github.com/jgthms/bulma', 'MIT'],
  ['ui-mui', 'Material UI', ['MUI'], 'Library', 'React Material Design', 'Comprehensive React component library implementing Google’s Material Design.', 'Enterprise admin dashboards and productivity tools.', ['Enterprise dashboards', 'Internal portals'], ['TypeScript', 'JavaScript'], 'Browser JS engine', 'Vite / Webpack', 'frontend', ['React', 'Emotion'], ['Ant Design', 'Chakra UI'], 2, 'https://mui.com', 'https://github.com/mui/material-ui', 'MIT'],
  ['ui-chakra', 'Chakra UI', ['Chakra'], 'Library', 'Accessible Modular React UI', 'Simple, modular and accessible component library that gives you the building blocks for React apps.', 'Accessible, composable React applications.', ['Web applications', 'SaaS dashboards'], ['TypeScript', 'JavaScript'], 'Browser JS engine', 'Vite / Webpack', 'frontend', ['React'], ['Material UI', 'shadcn/ui'], 2, 'https://chakra-ui.com', 'https://github.com/chakra-ui/chakra-ui', 'MIT'],
  ['ui-antd', 'Ant Design', ['AntD'], 'Library', 'Enterprise React UI', 'Enterprise-class UI design language and React UI library with hundreds of rich components.', 'Complex enterprise data-entry portals and admin backoffices.', ['Enterprise admin portals', 'Fintech tables'], ['TypeScript', 'JavaScript'], 'Browser JS engine', 'Vite / Webpack', 'frontend', ['React'], ['Material UI', 'PrimeReact'], 2, 'https://ant.design', 'https://github.com/ant-design/ant-design', 'MIT'],
  ['ui-radix', 'Radix UI', ['Radix Primitives'], 'Library', 'Unstyled Accessible Primitives', 'Unstyled, accessible components for building high-quality design systems and web apps in React.', 'Foundation for bespoke, accessible design systems.', ['Design systems', 'Custom component libraries'], ['TypeScript', 'JavaScript'], 'Browser JS engine', 'Vite / bundler', 'frontend', ['React', 'Tailwind CSS', 'shadcn/ui'], ['Headless UI', 'React Aria'], 2, 'https://www.radix-ui.com', 'https://github.com/radix-ui/primitives', 'MIT'],
  ['ui-shadcn', 'shadcn/ui', ['shadcn'], 'Library', 'Copy-Paste Component Architecture', 'Beautifully designed components that you can copy and paste into your apps. Built on Radix and Tailwind.', 'Modern SaaS web applications with full code ownership.', ['Modern SaaS apps', 'Next.js web apps'], ['TypeScript', 'JavaScript'], 'Browser JS engine', 'Tailwind CSS + Vite/Next', 'frontend', ['React', 'Tailwind CSS', 'Radix UI'], ['Chakra UI', 'Material UI'], 2, 'https://ui.shadcn.com', 'https://github.com/shadcn-ui/ui', 'MIT'],
  ['ui-daisyui', 'DaisyUI', ['daisy'], 'Framework', 'Tailwind Component Classes', 'The most popular component library for Tailwind CSS adding clean component classes.', 'Rapid UI prototyping without heavy React abstractions.', ['Static sites', 'Lean web apps'], ['CSS'], 'Browser', 'Tailwind CSS plugin', 'frontend', ['Tailwind CSS', 'HTML5'], ['Flowbite', 'Bootstrap'], 1, 'https://daisyui.com', 'https://github.com/saadeghi/daisyui', 'MIT'],
  ['ui-primereact', 'PrimeReact', ['Prime'], 'Library', 'Rich React UI Suite', 'Rich set of open-source UI components for React with themes and data-table capabilities.', 'Enterprise applications requiring complex spreadsheets and data grids.', ['Enterprise apps', 'Data grid portals'], ['TypeScript', 'JavaScript'], 'Browser JS engine', 'Vite / bundler', 'frontend', ['React'], ['Ant Design', 'Material UI'], 2, 'https://primereact.org', 'https://github.com/primefaces/primereact', 'MIT']
];

F.forEach(f => {
  add({
    id: f[0], name: f[1], aliases: f[2], type: f[3], category: 'F. UI, styling, and design systems', categoryCode: 'F', subcategory: f[4],
    shortDescription: f[5], mainPurpose: f[6], typicalUseCases: f[7], relatedLanguages: f[8], runtimeRequirements: f[9], buildRequirements: f[10],
    role: f[11], complementary: f[12], alternatives: f[13], diff: f[14], docsUrl: f[15], repoUrl: f[16], license: f[17]
  });
});

console.log('Categories A through F total:', records.length);
fs.writeFileSync('scripts/catA_F_done.json', JSON.stringify(records));
