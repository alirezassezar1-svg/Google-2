import fs from 'node:fs';

const records = JSON.parse(fs.readFileSync('scripts/catA_F_done.json', 'utf8'));

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
    detailedExplanation: item.detailedExplanation || `${item.name} is a leading technology in ${item.category}. ${item.shortDescription} It is widely adopted for ${item.mainPurpose}`,
    mainPurpose: item.mainPurpose,
    typicalUseCases: item.typicalUseCases || ['Graphics', 'Visualization', 'Tooling'],
    relatedLanguages: item.relatedLanguages || ['JavaScript', 'TypeScript'],
    dependencies: item.dependencies || [],
    runtimeRequirements: item.runtimeRequirements || 'Standard platform runtime',
    buildRequirements: item.buildRequirements || 'None',
    compatibility: {
      browser: item.browser || 'All modern browsers',
      os: item.os || 'Cross-platform',
      offlineCapable: item.offlineCapable !== false
    },
    role: item.role || 'graphics',
    relations: {
      database: item.database || [],
      api: item.api || [],
      complementary: item.complementary || [],
      alternatives: item.alternatives || []
    },
    hostingOptions: item.hosting || ['Any cloud or server'],
    learningDifficulty: item.diff || 2,
    advantages: item.advantages || ['High adoption', 'Strong performance', 'Ecosystem maturity'],
    limitations: item.limitations || ['Requires domain knowledge'],
    knownConstraints: item.constraints || ['GPU or environment requirements'],
    securityNotes: item.security || 'Keep dependencies updated and sanitize inputs.',
    docsUrl: item.docsUrl || 'https://developer.mozilla.org',
    repoUrl: item.repoUrl || '',
    license: item.license || 'Open Source',
    verifiedDate: '2026-03-01',
    catalogVersion: '1.0.0',
    isVerified: true
  });
}

// G. Graphics, animation, and visualization (12)
const G = [
  ['gfx-threejs', 'Three.js', ['ThreeJS'], 'Library', '3D WebGL Library', 'JavaScript 3D library making WebGL approachable for interactive scenes and 3D models.', 'Rendering interactive 3D graphics in the browser.', ['Product 3D viewers', 'Creative websites', 'Data globes'], ['JavaScript'], 'WebGL 2.0 capable browser', 'Vite / bundler', 'graphics', ['WebGPU', 'GLTF', 'Vite'], ['Babylon.js', 'PlayCanvas'], 3, 'https://threejs.org/docs/', 'https://github.com/mrdoob/three.js', 'MIT'],
  ['gfx-babylon', 'Babylon.js', ['Babylon'], 'Framework', 'Full-Featured 3D Engine', 'Powerful, beautiful, simple, and open game and rendering engine in JavaScript.', 'Browser 3D games, architectural walkthroughs, and VR/AR.', ['Web games', 'Metaverse / WebXR', 'CAD viewers'], ['TypeScript', 'JavaScript'], 'WebGL 2.0 / WebGPU browser', 'Vite / Webpack', 'graphics', ['TypeScript', 'WebXR'], ['Three.js', 'PlayCanvas'], 3, 'https://doc.babylonjs.com', 'https://github.com/BabylonJS/Babylon.js', 'Apache-2.0'],
  ['gfx-gsap', 'GSAP', ['GreenSock'], 'Library', 'High-Performance Animation', 'Professional-grade JavaScript animation engine for high-performance web animations.', 'Complex choreographed timelines and scroll-driven effects.', ['Marketing websites', 'Interactive landing pages'], ['JavaScript'], 'Browser', 'None or bundler', 'graphics', ['ScrollTrigger', 'HTML5'], ['Motion', 'Anime.js'], 2, 'https://gsap.com/docs/v3/', 'https://github.com/greensock/GSAP', 'Standard GreenSock License'],
  ['gfx-motion', 'Motion', ['Framer Motion'], 'Library', 'React & Web Animation', 'Production-ready animation and gesture library for React and vanilla JavaScript.', 'Declarative spring animations and layout transitions.', ['SaaS micro-interactions', 'Modal and drawer animations'], ['TypeScript', 'JavaScript'], 'Browser', 'Vite / bundler', 'graphics', ['React', 'Tailwind CSS'], ['GSAP', 'Anime.js'], 2, 'https://motion.dev', 'https://github.com/motiondivision/motion', 'MIT'],
  ['gfx-d3', 'D3.js', ['D3'], 'Library', 'Data-Driven Documents', 'JavaScript library for bespoke data visualization using HTML, SVG, and CSS.', 'Custom scientific charts, networks, and interactive data graphics.', ['Custom financial charts', 'Network graphs', 'Geographic maps'], ['JavaScript'], 'Browser', 'None or bundler', 'graphics', ['SVG', 'HTML5 Canvas'], ['Chart.js', 'Plotly'], 4, 'https://d3js.org', 'https://github.com/d3/d3', 'ISC'],
  ['gfx-chartjs', 'Chart.js', ['ChartJS'], 'Library', 'Canvas Charting Library', 'Simple yet flexible JavaScript charting library for designers and developers.', 'Standard bar, line, radar, and pie charts in web applications.', ['SaaS analytics dashboards', 'Business metrics'], ['JavaScript'], 'Browser Canvas API', 'None or bundler', 'graphics', ['HTML5 Canvas', 'React'], ['D3.js', 'ECharts'], 1, 'https://www.chartjs.org/docs/', 'https://github.com/chartjs/Chart.js', 'MIT'],
  ['gfx-leaflet', 'Leaflet', ['LeafletJS'], 'Library', 'Mobile-Friendly Interactive Maps', 'Leading open-source JavaScript library for mobile-friendly interactive maps.', 'Mapping geographic data and tile-based layers.', ['Store locators', 'Logistics maps', 'GIS visualizations'], ['JavaScript'], 'Browser', 'None or bundler', 'graphics', ['OpenStreetMap', 'GeoJSON'], ['Mapbox GL JS', 'OpenLayers'], 2, 'https://leafletjs.com', 'https://github.com/Leaflet/Leaflet', 'BSD-2-Clause'],
  ['gfx-fabric', 'Fabric.js', ['Fabric'], 'Library', 'Interactive Canvas Object Model', 'Powerful and simple Javascript HTML5 canvas library with interactive object model.', 'Interactive image editors, canvas drawing tools, and vector manipulation.', ['T-shirt design apps', 'Whiteboards', 'Image annotators'], ['JavaScript'], 'Browser Canvas API', 'None or bundler', 'graphics', ['HTML5 Canvas'], ['Konva.js', 'Paper.js'], 2, 'http://fabricjs.com/docs/', 'https://github.com/fabricjs/fabric.js', 'MIT'],
  ['gfx-konva', 'Konva.js', ['Konva'], 'Library', '2D Canvas Framework', 'HTML5 2D canvas library for desktop and mobile applications with high performance.', 'Interactive diagrams, floor plans, and canvas games.', ['Floor plans', 'Architecture diagrams', 'Game boards'], ['JavaScript', 'TypeScript'], 'Browser Canvas API', 'Vite / bundler', 'graphics', ['React Konva', 'Canvas'], ['Fabric.js', 'PixiJS'], 2, 'https://konvajs.org/docs/', 'https://github.com/konvajs/konva', 'MIT'],
  ['gfx-pixijs', 'PixiJS', ['Pixi'], 'Library', 'Fast 2D WebGL Renderer', 'The HTML5 Creation Engine: fastest, most flexible 2D WebGL rendering engine.', 'High-performance 2D games, animations, and particle effects.', ['2D web games', 'Interactive banners', 'Particle systems'], ['JavaScript', 'TypeScript'], 'WebGL capable browser', 'Vite / bundler', 'graphics', ['WebGL', 'WebGPU'], ['Phaser', 'Three.js'], 3, 'https://pixijs.com/8.x/guides', 'https://github.com/pixijs/pixijs', 'MIT'],
  ['gfx-p5js', 'p5.js', ['p5'], 'Library', 'Creative Coding Library', 'JavaScript library for creative coding with a focus on making coding accessible for artists.', 'Generative art, algorithmic visual design, and educational simulations.', ['Generative art', 'Classroom coding', 'Interactive audio-visuals'], ['JavaScript'], 'Browser Canvas / WebGL', 'None or bundler', 'graphics', ['Canvas API'], ['Three.js', 'Paper.js'], 1, 'https://p5js.org/reference/', 'https://github.com/processing/p5.js', 'LGPL-2.1'],
  ['gfx-phaser', 'Phaser', ['Phaser3'], 'Framework', '2D HTML5 Game Framework', 'Fast, free, and fun open-source framework for 2D games for Canvas and WebGL.', 'Building complete 2D desktop and mobile browser games.', ['Arcade games', 'Educational games', 'Platformers'], ['JavaScript', 'TypeScript'], 'Browser Canvas / WebGL', 'Vite / Webpack', 'graphics', ['Web Audio API', 'PixiJS core'], ['PixiJS', 'Babylon.js'], 2, 'https://phaser.io/learn', 'https://github.com/phaserjs/phaser', 'MIT']
];

G.forEach(g => {
  add({
    id: g[0], name: g[1], aliases: g[2], type: g[3], category: 'G. Graphics, animation, and visualization', categoryCode: 'G', subcategory: g[4],
    shortDescription: g[5], mainPurpose: g[6], typicalUseCases: g[7], relatedLanguages: g[8], runtimeRequirements: g[9], buildRequirements: g[10],
    role: g[11], complementary: g[12], alternatives: g[13], diff: g[14], docsUrl: g[15], repoUrl: g[16], license: g[17]
  });
});

// H. Runtime environments and execution engines (11)
const H = [
  ['rt-browser-engines', 'Browser JavaScript Engines', ['Blink', 'Gecko', 'WebKit'], 'Runtime', 'Client-Side Web Execution', 'Browser execution engines parsing HTML/CSS and running JavaScript via JIT compilation.', 'Executing client web applications across desktops and mobile phones.', ['Web browsing', 'PWA execution'], ['JavaScript', 'WebAssembly'], 'Installed web browser', 'None', 'frontend', ['HTML5', 'CSS3'], ['Node.js'], 2, 'https://developer.mozilla.org', '', 'Open Source Standards'],
  ['rt-nodejs', 'Node.js', ['Node'], 'Runtime', 'Server-Side V8 JavaScript', 'JavaScript runtime built on Chrome\'s V8 JavaScript engine for scalable network applications.', 'Powering backend APIs, developer build tools, and microservices.', ['REST APIs', 'Build tooling (Vite/Webpack)', 'CLIs'], ['JavaScript', 'TypeScript'], 'Host OS with Node binary', 'None', 'backend', ['Express', 'TypeScript', 'npm'], ['Deno', 'Bun'], 2, 'https://nodejs.org/docs/', 'https://github.com/nodejs/node', 'MIT'],
  ['rt-deno', 'Deno', ['Deno Land'], 'Runtime', 'Secure TypeScript Runtime', 'Next-generation runtime for JavaScript and TypeScript with secure defaults and built-in tooling.', 'Modern web APIs, edge computing, and single-file scripts without npm bloat.', ['Edge microservices', 'TypeScript scripts', 'Fresh web apps'], ['TypeScript', 'JavaScript'], 'Host OS or Edge (Deno Deploy)', 'None required (native TS execution)', 'backend', ['Fresh', 'Hono', 'TypeScript'], ['Node.js', 'Bun'], 2, 'https://docs.deno.com', 'https://github.com/denoland/deno', 'MIT'],
  ['rt-bun', 'Bun', ['Bun.sh'], 'Runtime', 'Ultrafast All-in-One JS Runtime', 'Fast all-in-one JavaScript runtime, bundler, test runner, and package manager built with Zig.', 'Ultra-fast package installation, fast dev servers, and high-throughput HTTP servers.', ['Fast local dev', 'High-throughput APIs', 'Fast test running'], ['TypeScript', 'JavaScript'], 'Linux, macOS, WSL', 'None required (native TS/JSX)', 'backend', ['Hono', 'Elysia', 'Vite'], ['Node.js', 'Deno'], 2, 'https://bun.sh/docs', 'https://github.com/oven-sh/bun', 'MIT'],
  ['rt-php', 'PHP Runtime', ['PHP-FPM', 'Zend Engine'], 'Runtime', 'Hypertext Preprocessor Engine', 'The official Zend Engine powering PHP execution via CGI, CLI, or FastCGI Process Manager.', 'Executing WordPress, Laravel, Symfony, and dynamic server-rendered sites.', ['PHP-FPM web execution', 'Cron background jobs'], ['PHP'], 'Linux/Windows with PHP-FPM or Apache mod_php', 'None', 'backend', ['Laravel', 'WordPress', 'Nginx'], ['Python Runtime', 'Node.js'], 2, 'https://www.php.net', 'https://github.com/php/php-src', 'PHP License v3.01'],
  ['rt-python', 'Python Runtime', ['CPython'], 'Runtime', 'Python Virtual Machine', 'The reference implementation of Python interpreting bytecode on the CPython virtual machine.', 'Executing AI models, scientific scripts, Django web servers, and automation jobs.', ['AI model inference', 'Data engineering', 'Web backends'], ['Python'], 'CPython 3.10+', 'None', 'backend', ['FastAPI', 'PyTorch', 'pip'], ['PyPy', 'Node.js'], 2, 'https://docs.python.org/3/', 'https://github.com/python/cpython', 'PSF License'],
  ['rt-jvm', 'JVM', ['Java Virtual Machine', 'HotSpot'], 'Runtime', 'Enterprise Virtual Machine', 'Abstract computing machine that enables a computer to run programs written in Java, Kotlin, Scala.', 'Executing enterprise enterprise microservices and big-data workloads.', ['Enterprise banking', 'Apache Spark / Kafka'], ['Java', 'Kotlin', 'Scala'], 'Host OS with OpenJDK 17+', 'javac / build tool', 'backend', ['Java', 'Spring Boot', 'Kafka'], ['.NET Runtime'], 3, 'https://docs.oracle.com/en/java/javase/21/vm/', 'https://github.com/openjdk/jdk', 'GPL-2.0 with Classpath Exception'],
  ['rt-dotnet', '.NET Runtime', ['CoreCLR'], 'Runtime', 'Cross-Platform Managed Runtime', 'High-performance runtime for .NET applications with garbage collection and JIT compilation.', 'Powering ASP.NET Core web APIs, cloud microservices, and desktop applications.', ['ASP.NET Core APIs', 'Azure microservices'], ['C#', 'F#'], 'Linux, macOS, Windows with .NET 8+', 'dotnet build', 'backend', ['C#', 'ASP.NET Core', 'SQL Server'], ['JVM'], 3, 'https://learn.microsoft.com/en-us/dotnet/core/', 'https://github.com/dotnet/runtime', 'MIT'],
  ['rt-wasm', 'WebAssembly Runtimes', ['Wasmtime', 'Wasmer'], 'Runtime', 'Universal Bytecode Virtual Machine', 'Standalone WebAssembly runtimes implementing WASI for fast, sandboxed server execution.', 'Edge computing, isolated plugin systems, and serverless functions.', ['Serverless edge compute', 'Micro-sandboxes'], ['WebAssembly', 'Rust', 'C++'], 'Host OS with Wasmtime / Wasmer', 'wasm-pack or rustc', 'fullstack', ['Rust', 'Wasm', 'Fastly'], ['Docker', 'V8 Isolates'], 3, 'https://wasmtime.dev', 'https://github.com/bytecodealliance/wasmtime', 'Apache-2.0'],
  ['rt-jsc', 'JavaScriptCore', ['JSC'], 'Runtime', 'WebKit JavaScript Engine', 'The JavaScript engine used in WebKit, Safari, and React Native mobile applications.', 'Powering Safari browser and embedded mobile iOS runtimes.', ['Safari browsing', 'iOS React Native'], ['JavaScript'], 'Apple OS / WebKit', 'None', 'frontend', ['WebKit', 'Safari'], ['V8', 'SpiderMonkey'], 3, 'https://developer.apple.com/documentation/javascriptcore', '', 'LGPL / BSD'],
  ['rt-v8', 'V8', ['V8 Engine'], 'Runtime', 'High-Performance Google JS Engine', 'Google’s open source high-performance JavaScript and WebAssembly engine written in C++.', 'Powering Chrome, Edge, Node.js, and Deno.', ['Chrome browsing', 'Node.js runtime core'], ['JavaScript', 'WebAssembly'], 'C++ embedder or Chromium', 'None', 'tooling', ['Chromium', 'Node.js'], ['JavaScriptCore', 'SpiderMonkey'], 3, 'https://v8.dev', 'https://github.com/v8/v8', 'BSD-3-Clause']
];

H.forEach(h => {
  add({
    id: h[0], name: h[1], aliases: h[2], type: h[3], category: 'H. Runtime environments and execution engines', categoryCode: 'H', subcategory: h[4],
    shortDescription: h[5], mainPurpose: h[6], typicalUseCases: h[7], relatedLanguages: h[8], runtimeRequirements: h[9], buildRequirements: h[10],
    role: h[11], complementary: h[12], alternatives: h[13], diff: h[14], docsUrl: h[15], repoUrl: h[16], license: h[17]
  });
});

// I. Build tools and package managers (20)
const I = [
  ['bt-vite', 'Vite', ['ViteJS'], 'Build Tool', 'Next-Generation Frontend Tooling', 'Next-generation frontend tooling providing lightning-fast HMR and Rollup production builds.', 'Fast development server and optimized production bundler for web apps.', ['React/Vue/Svelte apps', 'Library bundling'], ['JavaScript', 'TypeScript'], 'Node.js 18+', 'None', 'tooling', ['Rollup', 'esbuild', 'React', 'Vue'], ['Webpack', 'Turbopack'], 2, 'https://vite.dev', 'https://github.com/vitejs/vite', 'MIT'],
  ['bt-webpack', 'Webpack', ['Webpack5'], 'Build Tool', 'Static Module Bundler', 'Static module bundler for modern JavaScript applications with an expansive plugin ecosystem.', 'Large enterprise frontend bundles and legacy asset pipelines.', ['Enterprise SPAs', 'Complex asset pipelines'], ['JavaScript'], 'Node.js 18+', 'webpack.config.js', 'tooling', ['Babel', 'TypeScript'], ['Vite', 'Turbopack'], 4, 'https://webpack.js.org', 'https://github.com/webpack/webpack', 'MIT'],
  ['bt-rollup', 'Rollup', ['RollupJS'], 'Build Tool', 'ES Module Bundler', 'Next-generation JavaScript module bundler compiling small pieces of code into libraries.', 'Authoring npm libraries and production packaging in Vite.', ['Open-source libraries', 'SDK bundling'], ['JavaScript'], 'Node.js 18+', 'rollup.config.js', 'tooling', ['Vite', 'TypeScript'], ['Webpack', 'esbuild'], 3, 'https://rollupjs.org', 'https://github.com/rollup/rollup', 'MIT'],
  ['bt-esbuild', 'esbuild', ['esbuild-rs'], 'Build Tool', 'Extremely Fast JS Bundler', 'An extremely fast JavaScript and CSS bundler written in Go, 10-100x faster than legacy bundlers.', 'Pre-bundling dependencies and lightning-fast compilation.', ['Dependency pre-bundling', 'TypeScript transpilation'], ['Go', 'JavaScript'], 'Native binary via npm', 'None', 'tooling', ['Vite', 'Node.js'], ['Webpack', 'SWC'], 2, 'https://esbuild.github.io', 'https://github.com/evanw/esbuild', 'MIT'],
  ['bt-swc', 'SWC', ['Speedy Web Compiler'], 'Build Tool', 'Rust-Based Web Compiler', 'Super-fast JavaScript / TypeScript compiler written in Rust powering Next.js.', 'Compiling TypeScript and modern JavaScript at native speed.', ['Next.js compilation', 'Jest transform'], ['Rust', 'JavaScript'], 'Native binary via npm', 'None', 'tooling', ['Next.js', 'Turbopack'], ['Babel', 'esbuild'], 2, 'https://swc.rs', 'https://github.com/swc-project/swc', 'Apache-2.0'],
  ['bt-babel', 'Babel', ['BabelJS'], 'Build Tool', 'JavaScript Transpiler', 'The compiler for next-generation JavaScript transforming modern syntax for older browsers.', 'Backwards-compatible JavaScript transpilation.', ['Legacy browser polyfills', 'Custom AST transforms'], ['JavaScript'], 'Node.js 18+', '.babelrc config', 'tooling', ['Webpack', 'Jest'], ['SWC', 'esbuild'], 3, 'https://babeljs.io', 'https://github.com/babel/babel', 'MIT'],
  ['bt-tsc', 'TypeScript Compiler', ['tsc'], 'Build Tool', 'Official Type Checker & Compiler', 'The official TypeScript compiler checking static types and emitting clean JavaScript.', 'Type checking codebases and generating d.ts type definitions.', ['CI type checking', 'Library declaration emission'], ['TypeScript'], 'Node.js 18+', 'tsconfig.json', 'tooling', ['TypeScript', 'Vite'], ['esbuild', 'SWC'], 2, 'https://www.typescriptlang.org/docs/handbook/compiler-options.html', 'https://github.com/microsoft/TypeScript', 'Apache-2.0'],
  ['bt-turbopack', 'Turbopack', ['Turbo'], 'Build Tool', 'Rust Successor to Webpack', 'Incremental bundler optimized for JavaScript and TypeScript, written in Rust by Vercel.', 'Powering fast development builds and page routing in Next.js.', ['Next.js dev server', 'Fast HMR'], ['Rust'], 'Node.js / native binary', 'None', 'tooling', ['Next.js', 'Vercel'], ['Webpack', 'Vite'], 2, 'https://turbo.build/pack', 'https://github.com/vercel/turbo', 'MPL-2.0'],
  ['pm-npm', 'npm', ['Node Package Manager'], 'Package Manager', 'Default Node Package Manager', 'The default package manager for the JavaScript runtime environment Node.js.', 'Managing JavaScript dependencies and publishing packages.', ['Installing npm packages', 'Running npm scripts'], ['JavaScript'], 'Node.js', 'package.json', 'tooling', ['Node.js', 'JavaScript'], ['pnpm', 'Yarn', 'Bun'], 1, 'https://docs.npmjs.com', 'https://github.com/npm/cli', 'Artistic-2.0'],
  ['pm-pnpm', 'pnpm', ['Performant npm'], 'Package Manager', 'Fast Disk-Efficient Package Manager', 'Fast, disk space efficient package manager using hard links and content-addressable storage.', 'Monorepos and disk-efficient Node.js workspaces.', ['Monorepos (pnpm workspaces)', 'Fast CI installs'], ['JavaScript'], 'Node.js 18+', 'pnpm-lock.yaml', 'tooling', ['Node.js', 'Turborepo'], ['npm', 'Yarn'], 2, 'https://pnpm.io', 'https://github.com/pnpm/pnpm', 'MIT'],
  ['pm-yarn', 'Yarn', ['Yarn Berry'], 'Package Manager', 'Safe Deterministic Package Manager', 'Fast, reliable, and secure dependency management for JavaScript applications.', 'Managing frontend and backend Node monorepos.', ['Monorepos', 'Plug\'n\'Play zero-install'], ['JavaScript'], 'Node.js 18+', 'yarn.lock', 'tooling', ['Node.js'], ['pnpm', 'npm'], 2, 'https://yarnpkg.com', 'https://github.com/yarnpkg/berry', 'BSD-2-Clause'],
  ['pm-composer', 'Composer', ['PHP Composer'], 'Package Manager', 'PHP Dependency Manager', 'Tool for dependency management in PHP declaring the library packages your project depends on.', 'Managing PHP libraries, autoloading classes, and installing Laravel packages.', ['Laravel applications', 'Symfony bundles'], ['PHP'], 'PHP CLI 8.0+', 'composer.json', 'tooling', ['PHP', 'Laravel', 'Packagist'], ['pip', 'npm'], 2, 'https://getcomposer.org/doc/', 'https://github.com/composer/composer', 'MIT'],
  ['pm-pip', 'pip', ['Python Package Installer'], 'Package Manager', 'Standard Python Package Manager', 'The package installer for Python downloading and installing packages from PyPI.', 'Installing Python packages and managing virtual environment requirements.', ['Installing requirements.txt', 'Machine learning setups'], ['Python'], 'Python interpreter', 'requirements.txt', 'tooling', ['Python', 'PyPI'], ['uv', 'Poetry'], 1, 'https://pip.pypa.io/en/stable/', 'https://github.com/pypa/pip', 'MIT'],
  ['pm-uv', 'uv', ['uv Python'], 'Package Manager', 'Extremely Fast Rust Python Manager', 'Extremely fast Python package installer and resolver written in Rust by Astral.', 'Replacing pip, pip-tools, and virtualenv with 10-100x speedups.', ['Fast CI Python installs', 'Virtual environment management'], ['Rust', 'Python'], 'Native binary', 'pyproject.toml', 'tooling', ['Python', 'Ruff'], ['pip', 'Poetry'], 1, 'https://docs.astral.sh/uv/', 'https://github.com/astral-sh/uv', 'MIT / Apache-2.0'],
  ['pm-poetry', 'Poetry', ['Python Poetry'], 'Package Manager', 'Python Packaging & Dependency Manager', 'Python packaging and dependency management made easy with deterministic lockfiles.', 'Publishing Python libraries and managing complex application dependencies.', ['Python applications', 'Library distribution'], ['Python'], 'Python 3.8+', 'pyproject.toml / poetry.lock', 'tooling', ['Python', 'PyPI'], ['uv', 'pip'], 2, 'https://python-poetry.org/docs/', 'https://github.com/python-poetry/poetry', 'MIT'],
  ['pm-cargo', 'Cargo', ['Rust Cargo'], 'Package Manager', 'Rust Build Tool & Package Manager', 'The Rust package manager downloading dependencies, compiling packages, and making packages.', 'Compiling Rust code, running tests, and publishing to crates.io.', ['Rust projects', 'Cargo test / bench / clippy'], ['Rust'], 'Rust toolchain', 'Cargo.toml / Cargo.lock', 'tooling', ['Rust', 'crates.io'], ['Go toolchain', 'npm'], 2, 'https://doc.rust-lang.org/cargo/', 'https://github.com/rust-lang/cargo', 'MIT / Apache-2.0'],
  ['pm-maven', 'Maven', ['Apache Maven'], 'Build Tool', 'Java Project Management Tool', 'Software project management and comprehension tool based on the concept of a Project Object Model (POM).', 'Enterprise Java builds, artifact deployment, and standardized multi-module builds.', ['Enterprise Java systems', 'Spring Boot apps'], ['Java'], 'JVM 8+', 'pom.xml', 'tooling', ['Java', 'Spring Boot'], ['Gradle'], 3, 'https://maven.apache.org/guides/', 'https://github.com/apache/maven', 'Apache-2.0'],
  ['pm-gradle', 'Gradle', ['Gradle Build'], 'Build Tool', 'High-Performance Polyglot Build Tool', 'Build automation tool with a Kotlin/Groovy DSL designed for multi-project builds.', 'Building Android mobile apps and high-performance JVM microservices.', ['Android apps', 'Spring Boot microservices'], ['Kotlin', 'Java', 'Groovy'], 'JVM 8+', 'build.gradle.kts', 'tooling', ['Android SDK', 'Kotlin'], ['Maven'], 3, 'https://docs.gradle.org', 'https://github.com/gradle/gradle', 'Apache-2.0'],
  ['pm-nuget', 'NuGet', ['NuGet Package Manager'], 'Package Manager', 'The Package Manager for .NET', 'The official package manager for Microsoft development platform including .NET.', 'Installing and managing .NET libraries and NuGet packages.', ['.NET Core projects', 'C# libraries'], ['C#', '.NET'], '.NET SDK', 'csproj / packages.lock.json', 'tooling', ['.NET', 'C#'], ['Maven', 'npm'], 2, 'https://learn.microsoft.com/en-us/nuget/', 'https://github.com/NuGet/Home', 'Apache-2.0'],
  ['pm-pub', 'Pub', ['Dart Pub'], 'Package Manager', 'Package Manager for Dart & Flutter', 'The package manager for the Dart programming language and Flutter apps.', 'Installing Flutter UI packages, plugins, and Dart dependencies.', ['Flutter mobile apps', 'Dart CLIs'], ['Dart'], 'Dart / Flutter SDK', 'pubspec.yaml / pubspec.lock', 'tooling', ['Flutter', 'Dart'], ['npm', 'Cargo'], 2, 'https://dart.dev/tools/pub', 'https://github.com/dart-lang/pub', 'BSD-3-Clause']
];

I.forEach(i => {
  add({
    id: i[0], name: i[1], aliases: i[2], type: i[3], category: 'I. Build tools and package managers', categoryCode: 'I', subcategory: i[4],
    shortDescription: i[5], mainPurpose: i[6], typicalUseCases: i[7], relatedLanguages: i[8], runtimeRequirements: i[9], buildRequirements: i[10],
    role: i[11], complementary: i[12], alternatives: i[13], diff: i[14], docsUrl: i[15], repoUrl: i[16], license: i[17]
  });
});

console.log('Categories A through I total:', records.length);
fs.writeFileSync('scripts/catA_I_done.json', JSON.stringify(records));
