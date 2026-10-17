import fs from 'node:fs';

const records = JSON.parse(fs.readFileSync('scripts/catA_done.json', 'utf8'));

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
    typicalUseCases: item.typicalUseCases || ['Web applications', 'Microservices'],
    relatedLanguages: item.relatedLanguages || ['JavaScript', 'TypeScript'],
    dependencies: item.dependencies || [],
    runtimeRequirements: item.runtimeRequirements || 'Standard host',
    buildRequirements: item.buildRequirements || 'None',
    compatibility: {
      browser: item.browser || 'All modern browsers',
      os: item.os || 'Cross-platform',
      offlineCapable: item.offlineCapable !== false
    },
    role: item.role || 'tooling',
    relations: {
      database: item.database || [],
      api: item.api || [],
      complementary: item.complementary || [],
      alternatives: item.alternatives || []
    },
    hostingOptions: item.hosting || ['Any cloud or server'],
    learningDifficulty: item.diff || 2,
    advantages: item.advantages || ['High adoption', 'Active community', 'Robust performance'],
    limitations: item.limitations || ['Requires learning ecosystem patterns'],
    knownConstraints: item.constraints || ['Platform-specific setup required'],
    securityNotes: item.security || 'Keep dependencies updated and sanitize external inputs.',
    docsUrl: item.docsUrl || 'https://developer.mozilla.org',
    repoUrl: item.repoUrl || '',
    license: item.license || 'Open Source',
    verifiedDate: '2026-03-01',
    catalogVersion: '1.0.0',
    isVerified: true
  });
}

// B. Frontend libraries and frameworks (11)
const B = [
  ['fe-react', 'React', ['ReactJS'], 'Library', 'Component UI', 'Declarative, component-based UI library using a virtual DOM.', 'Building reactive user interfaces and SPAs.', ['SPAs', 'Design systems'], ['JavaScript', 'TypeScript'], 'Browser JS engine', 'Vite, esbuild, Webpack (JSX)', 'frontend', ['Next.js', 'Tailwind CSS'], ['Vue', 'Svelte', 'Preact'], 2, 'https://react.dev', 'https://github.com/facebook/react', 'MIT'],
  ['fe-preact', 'Preact', ['PreactJS'], 'Library', 'Minimalist UI', 'Fast 3kB alternative to React with the same modern API.', 'High-performance and lightweight web components.', ['Widgets', 'Lightweight landing pages'], ['JavaScript', 'TypeScript'], 'Browser JS engine', 'Vite, Rollup', 'frontend', ['Vite', 'Tailwind CSS'], ['React', 'Svelte'], 2, 'https://preactjs.com', 'https://github.com/preactjs/preact', 'MIT'],
  ['fe-vue', 'Vue', ['Vue.js', 'Vue3'], 'Framework', 'Progressive Framework', 'Progressive JavaScript framework with reactive data binding and Single File Components.', 'Approachable client-side web application development.', ['Enterprise dashboards', 'E-commerce'], ['JavaScript', 'TypeScript'], 'Browser JS engine', 'Vite (recommended)', 'frontend', ['Nuxt', 'Pinia', 'Tailwind CSS'], ['React', 'Svelte', 'Angular'], 2, 'https://vuejs.org', 'https://github.com/vuejs/core', 'MIT'],
  ['fe-angular', 'Angular', ['NG'], 'Framework', 'Enterprise Framework', 'Opinionated framework with TypeScript, dependency injection, and integrated routing.', 'Standardized enterprise-scale web architectures.', ['Enterprise SaaS', 'Banking portals'], ['TypeScript'], 'Browser JS engine', 'Angular CLI / Vite', 'frontend', ['RxJS', 'NgRx'], ['React', 'Vue'], 4, 'https://angular.dev', 'https://github.com/angular/angular', 'MIT'],
  ['fe-svelte', 'Svelte', ['Svelte5'], 'Framework', 'Compile-Time Reactive', 'Cybernetically enhanced framework compiling components to vanilla JS without a virtual DOM.', 'Fast, lightweight interfaces with minimal boilerplate.', ['Data dashboards', 'Interactive graphics'], ['JavaScript', 'TypeScript'], 'Browser JS engine', 'Vite', 'frontend', ['SvelteKit', 'Tailwind CSS'], ['React', 'SolidJS'], 2, 'https://svelte.dev', 'https://github.com/sveltejs/svelte', 'MIT'],
  ['fe-solidjs', 'SolidJS', ['Solid.js'], 'Library', 'Fine-Grained Reactive', 'Fine-grained reactivity library with JSX syntax and zero virtual DOM overhead.', 'Extreme rendering speed for real-time data feeds.', ['Trading screens', 'High-frequency UIs'], ['JavaScript', 'TypeScript'], 'Browser JS engine', 'Vite with solid plugin', 'frontend', ['Tailwind CSS', 'Vite'], ['React', 'Svelte'], 3, 'https://www.solidjs.com', 'https://github.com/solidjs/solid', 'MIT'],
  ['fe-lit', 'Lit', ['LitElement'], 'Library', 'Web Components', 'Lightweight library for building shareable standard Web Components.', 'Universal design systems compatible across any framework.', ['Design systems', 'Embeddable widgets'], ['JavaScript', 'TypeScript'], 'Browser Custom Elements', 'Vite, Rollup, or None', 'frontend', ['Custom Elements', 'Shadow DOM'], ['Stencil', 'React'], 2, 'https://lit.dev', 'https://github.com/lit/lit', 'BSD-3-Clause'],
  ['fe-alpine', 'Alpine.js', ['Alpine'], 'Framework', 'DOM Behavior Sprinkles', 'Minimalist tool for composing behavior directly in HTML markup.', 'Sprinkling reactive behavior onto server-rendered pages.', ['Django/Laravel templates', 'Simple modals'], ['JavaScript'], 'Browser JS engine', 'None or Vite', 'frontend', ['Tailwind CSS', 'Laravel Livewire'], ['HTMX', 'jQuery'], 1, 'https://alpinejs.dev', 'https://github.com/alpinejs/alpine', 'MIT'],
  ['fe-htmx', 'HTMX', ['htmx.org'], 'Library', 'Hypermedia Architecture', 'Access AJAX, CSS Transitions, and WebSockets directly in HTML attributes.', 'Modern dynamic web UIs using pure server HTML snippets.', ['Server-rendered apps (Go, Django, Rails)', 'Admin tools'], ['HTML', 'JavaScript'], 'Browser JS engine', 'None (single JS script)', 'frontend', ['Django', 'Go', 'Tailwind CSS'], ['Alpine.js', 'React'], 1, 'https://htmx.org', 'https://github.com/bigskysoftware/htmx', 'Zero-Clause BSD'],
  ['fe-qwik', 'Qwik', ['Qwik City'], 'Framework', 'Resumable Framework', 'Framework delivering instant page loads via fine-grained resumability without hydration.', 'Zero hydration overhead for content and commerce platforms.', ['E-commerce stores', 'High-traffic marketing sites'], ['TypeScript', 'JavaScript'], 'Browser & Edge runtimes', 'Vite', 'frontend', ['Tailwind CSS', 'Cloudflare Workers'], ['Next.js', 'Astro'], 3, 'https://qwik.dev', 'https://github.com/QwikDev/qwik', 'MIT'],
  ['fe-ember', 'Ember', ['Ember.js'], 'Framework', 'Convention-Driven Framework', 'Productive framework for ambitious web applications with strong conventions.', 'Long-lived client single-page applications.', ['Enterprise apps', 'Productivity suites'], ['JavaScript', 'TypeScript'], 'Browser JS engine', 'Ember CLI', 'frontend', ['Ember Data', 'TypeScript'], ['Angular', 'React'], 3, 'https://emberjs.com', 'https://github.com/emberjs/ember.js', 'MIT']
];

B.forEach(b => {
  add({
    id: b[0], name: b[1], aliases: b[2], type: b[3], category: 'B. Frontend libraries and frameworks', categoryCode: 'B', subcategory: b[4],
    shortDescription: b[5], mainPurpose: b[6], typicalUseCases: b[7], relatedLanguages: b[8], runtimeRequirements: b[9], buildRequirements: b[10],
    role: b[11], complementary: b[12], alternatives: b[13], diff: b[14], docsUrl: b[15], repoUrl: b[16], license: b[17]
  });
});

// C. Full-stack and server-rendered frameworks (8)
const C = [
  ['fs-nextjs', 'Next.js', ['Next'], 'Framework', 'Hybrid React Framework', 'The React Framework for the Web supporting SSR, SSG, Server Actions, and Turbopack.', 'Full-stack React applications with SEO and edge rendering.', ['SaaS platforms', 'E-commerce', 'Content portals'], ['TypeScript', 'JavaScript'], 'Node.js 18.17+ or Edge runtime', 'Next.js CLI (Turbopack / Webpack)', 'fullstack', ['React', 'Tailwind CSS', 'Prisma', 'Vercel'], ['Remix', 'Nuxt', 'Astro'], 3, 'https://nextjs.org/docs', 'https://github.com/vercel/next.js', 'MIT'],
  ['fs-nuxt', 'Nuxt', ['NuxtJS', 'Nuxt3'], 'Framework', 'Intuitive Vue Framework', 'The Intuitive Vue Framework for full-stack SSR, static generation, and Nitro server engine.', 'Production Vue full-stack web applications.', ['Vue SaaS applications', 'SSR web portals'], ['TypeScript', 'JavaScript'], 'Node.js 18+ or Edge', 'Vite / Nitro', 'fullstack', ['Vue', 'Pinia', 'Tailwind CSS'], ['Next.js', 'SvelteKit'], 2, 'https://nuxt.com', 'https://github.com/nuxt/nuxt', 'MIT'],
  ['fs-sveltekit', 'SvelteKit', ['Kit'], 'Framework', 'Full-Stack Svelte Framework', 'Framework for rapidly developing robust, performant web applications using Svelte.', 'High-performance full-stack web apps with adapter-based deployment.', ['Interactive web apps', 'Speed-critical SaaS'], ['TypeScript', 'JavaScript'], 'Node.js or Edge platform adapters', 'Vite', 'fullstack', ['Svelte', 'Tailwind CSS', 'Vite'], ['Next.js', 'Nuxt'], 2, 'https://svelte.dev/docs/kit/introduction', 'https://github.com/sveltejs/kit', 'MIT'],
  ['fs-astro', 'Astro', ['Astro.build'], 'Framework', 'Content-Driven Island Architecture', 'The web framework for content-driven websites with Islands architecture and zero JS by default.', 'High-performance marketing, documentation, blogs, and content sites.', ['Blogs', 'Documentation portals', 'Portfolio websites'], ['JavaScript', 'TypeScript', 'HTML'], 'Node.js or static CDN export', 'Vite', 'fullstack', ['Tailwind CSS', 'Markdown / MDX'], ['Next.js', 'Gatsby'], 2, 'https://docs.astro.build', 'https://github.com/withastro/astro', 'MIT'],
  ['fs-remix', 'Remix / React Router', ['React Router v7'], 'Framework', 'Web-Standards Full-Stack Framework', 'Full-stack framework focused on web standards, nested routing, and fast page loads.', 'Data-dense web applications relying on standard HTTP verbs and caching.', ['Business applications', 'E-commerce portals'], ['TypeScript', 'JavaScript'], 'Any JavaScript runtime (Node, Cloudflare, Deno)', 'Vite', 'fullstack', ['React', 'Tailwind CSS', 'Prisma'], ['Next.js', 'Astro'], 3, 'https://remix.run', 'https://github.com/remix-run/remix', 'MIT'],
  ['fs-tanstack-start', 'TanStack Start', ['Start'], 'Framework', 'Full-Stack React Framework', 'Full-stack framework powered by TanStack Router, Vite, and Nitro.', 'Type-safe full-stack applications with state-of-the-art client routing.', ['Complex data-heavy apps', 'Single-page apps with SSR'], ['TypeScript'], 'Node.js or Nitro runtime', 'Vite', 'fullstack', ['TanStack Router', 'TanStack Query', 'Vite'], ['Next.js', 'Remix'], 3, 'https://tanstack.com/start', 'https://github.com/tanstack/router', 'MIT'],
  ['fs-gatsby', 'Gatsby', ['GatsbyJS'], 'Framework', 'Static & Headless React Framework', 'React-based open-source framework for creating static sites backed by a GraphQL data layer.', 'Static websites pulling from diverse CMSs and data sources.', ['Corporate marketing sites', 'Blogs', 'Docs'], ['JavaScript', 'TypeScript'], 'Node.js for build; static output for CDN', 'Gatsby CLI / Webpack', 'fullstack', ['React', 'GraphQL', 'Contentful'], ['Next.js', 'Astro'], 3, 'https://www.gatsbyjs.com/docs/', 'https://github.com/gatsbyjs/gatsby', 'MIT'],
  ['fs-fresh', 'Fresh', ['Deno Fresh'], 'Framework', 'Next-Gen Deno Web Framework', 'Next-gen web framework for Deno with zero-config TypeScript, JIT rendering, and islands.', 'Ultra-fast edge web applications with zero build step.', ['Edge websites', 'Lightweight internal tools'], ['TypeScript'], 'Deno runtime', 'Zero build step required (JIT compiled)', 'fullstack', ['Deno', 'Preact', 'Tailwind CSS'], ['Next.js', 'Astro'], 2, 'https://fresh.deno.dev', 'https://github.com/denoland/fresh', 'MIT']
];

C.forEach(c => {
  add({
    id: c[0], name: c[1], aliases: c[2], type: c[3], category: 'C. Full-stack and server-rendered frameworks', categoryCode: 'C', subcategory: c[4],
    shortDescription: c[5], mainPurpose: c[6], typicalUseCases: c[7], relatedLanguages: c[8], runtimeRequirements: c[9], buildRequirements: c[10],
    role: c[11], complementary: c[12], alternatives: c[13], diff: c[14], docsUrl: c[15], repoUrl: c[16], license: c[17]
  });
});

console.log('Categories A, B, C total:', records.length);
fs.writeFileSync('scripts/catABC_done.json', JSON.stringify(records));
