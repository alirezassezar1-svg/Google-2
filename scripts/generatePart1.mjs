import fs from 'node:fs';

const items = [];

function add(item) {
  items.push({
    id: item.id,
    name: item.name,
    aliases: item.aliases || [],
    type: item.type,
    category: item.category,
    categoryCode: item.categoryCode,
    subcategory: item.subcategory,
    shortDescription: item.shortDescription,
    detailedExplanation: item.detailedExplanation || item.shortDescription,
    mainPurpose: item.mainPurpose,
    typicalUseCases: item.typicalUseCases || [],
    relatedLanguages: item.relatedLanguages || [],
    dependencies: item.dependencies || [],
    runtimeRequirements: item.runtimeRequirements || 'Standard host',
    buildRequirements: item.buildRequirements || 'None',
    compatibility: {
      browser: 'All modern standards-compliant browsers',
      os: 'Cross-platform (Linux, macOS, Windows)',
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
    advantages: item.advantages || ['Widely adopted', 'Rich community support', 'Production-tested'],
    limitations: item.limitations || ['Requires domain familiarity'],
    knownConstraints: item.constraints || ['Platform-specific configuration required'],
    securityNotes: item.security || 'Ensure regular security audits and keep dependencies updated.',
    docsUrl: item.docsUrl || 'https://developer.mozilla.org',
    repoUrl: item.repoUrl || '',
    license: item.license || 'Open Source',
    verifiedDate: '2026-03-01',
    catalogVersion: '1.0.0',
    isVerified: true
  });
}

// Read Cat A
const catAData = JSON.parse(fs.readFileSync('scripts/catA.json', 'utf8'));
catAData.forEach(c => items.push(c));

// Category B: Frontend libraries and frameworks (11)
const catB = [
  { id: 'fe-react', name: 'React', aliases: ['ReactJS', 'React.js'], type: 'Library', subcategory: 'Component UI Library', short: 'A declarative, component-based JavaScript library for building user interfaces with a virtual DOM.', purpose: 'Creating dynamic, reactive single-page applications and interactive web user interfaces.', cases: ['SPAs', 'Component libraries', 'Dashboard interfaces'], langs: ['JavaScript', 'TypeScript'], runtime: 'Browser JavaScript engine', build: 'Vite, Webpack, esbuild (JSX transpilation required)', role: 'frontend', comp: ['Next.js', 'Tailwind CSS', 'Redux / Zustand', 'Vitest'], alts: ['Vue', 'Svelte', 'Preact', 'SolidJS'], diff: 2, docs: 'https://react.dev', repo: 'https://github.com/facebook/react', lic: 'MIT' },
  { id: 'fe-preact', name: 'Preact', aliases: ['PreactJS'], type: 'Library', subcategory: 'Lightweight Component Library', short: 'Fast 3kB alternative to React with the same modern API and thin virtual DOM.', purpose: 'High-performance, resource-constrained web interfaces where minimal bundle size is critical.', cases: ['Performance-critical landing pages', 'Embedded widgets', 'Low-bandwidth applications'], langs: ['JavaScript', 'TypeScript'], runtime: 'Browser JavaScript engine', build: 'Vite, Webpack, Rollup', role: 'frontend', comp: ['Vite', 'Tailwind CSS', 'HTMX'], alts: ['React', 'Svelte', 'SolidJS'], diff: 2, docs: 'https://preactjs.com', repo: 'https://github.com/preactjs/preact', lic: 'MIT' },
  { id: 'fe-vue', name: 'Vue', aliases: ['Vue.js', 'Vue3'], type: 'Framework', subcategory: 'Progressive Reactive Framework', short: 'The progressive JavaScript framework featuring reactive data binding and Single File Components (SFCs).', purpose: 'Approachable yet scalable client-side web application development.', cases: ['Enterprise admin panels', 'E-commerce frontends', 'Progressive web applications'], langs: ['JavaScript', 'TypeScript'], runtime: 'Browser JavaScript engine', build: 'Vite (recommended) or Vue CLI', role: 'frontend', comp: ['Nuxt', 'Pinia', 'Tailwind CSS', 'Vue Router'], alts: ['React', 'Svelte', 'Angular'], diff: 2, docs: 'https://vuejs.org', repo: 'https://github.com/vuejs/core', lic: 'MIT' },
  { id: 'fe-angular', name: 'Angular', aliases: ['Angular2+', 'NG'], type: 'Framework', subcategory: 'Batteries-Included Enterprise Framework', short: 'Opinionated web application framework with TypeScript by default, dependency injection, and integrated routing.', purpose: 'Large-scale enterprise applications requiring standardized structure and tooling.', cases: ['Enterprise internal systems', 'Banking portals', 'Complex multi-tier web platforms'], langs: ['TypeScript'], runtime: 'Browser JavaScript engine', build: 'Angular CLI / Vite integration', role: 'frontend', comp: ['RxJS', 'NgRx', 'TypeScript'], alts: ['React', 'Vue', 'Svelte'], diff: 4, docs: 'https://angular.dev', repo: 'https://github.com/angular/angular', lic: 'MIT' },
  { id: 'fe-svelte', name: 'Svelte', aliases: ['Svelte5'], type: 'Framework', subcategory: 'Compile-Time Reactive Framework', short: 'Cybernetically enhanced web framework that compiles components to tiny vanilla JavaScript without a virtual DOM.', purpose: 'High-speed, lightweight web interfaces with minimal boilerplate and run-time overhead.', cases: ['Interactive data visualizations', 'Performance-sensitive websites', 'Fast dashboards'], langs: ['JavaScript', 'TypeScript'], runtime: 'Browser JavaScript engine', build: 'Vite with @sveltejs/vite-plugin-svelte', role: 'frontend', comp: ['SvelteKit', 'Tailwind CSS', 'Vite'], alts: ['React', 'Vue', 'SolidJS'], diff: 2, docs: 'https://svelte.dev', repo: 'https://github.com/sveltejs/svelte', lic: 'MIT' },
  { id: 'fe-solidjs', name: 'SolidJS', aliases: ['Solid.js', 'Solid'], type: 'Library', subcategory: 'Fine-Grained Reactive Library', short: 'Simple and performant library for building user interfaces with fine-grained reactivity and JSX, without virtual DOM.', purpose: 'Extreme frontend rendering performance with familiar React-like JSX syntax.', cases: ['High-frequency real-time dashboards', 'Fintech tickers', 'Resource-efficient web tools'], langs: ['JavaScript', 'TypeScript'], runtime: 'Browser JavaScript engine', build: 'Vite with vite-plugin-solid', role: 'frontend', comp: ['Tailwind CSS', 'Vite', 'TypeScript'], alts: ['React', 'Svelte', 'Preact'], diff: 3, docs: 'https://www.solidjs.com', repo: 'https://github.com/solidjs/solid', lic: 'MIT' },
  { id: 'fe-lit', name: 'Lit', aliases: ['LitElement', 'LitHTML'], type: 'Library', subcategory: 'Standard Web Components Library', short: 'Fast, lightweight library that makes it easy to build shareable, framework-independent Web Components.', purpose: 'Universal design systems and micro-frontends compatible with any web framework.', cases: ['Enterprise design systems', 'Universal embeddable widgets', 'Cross-framework UI libraries'], langs: ['JavaScript', 'TypeScript'], runtime: 'Browser JavaScript engine with Custom Elements support', build: 'Vite, Rollup, or none (can run native ES modules)', role: 'frontend', comp: ['Custom Elements', 'Shadow DOM', 'Vite'], alts: ['Stencil', 'Fast', 'React'], diff: 2, docs: 'https://lit.dev', repo: 'https://github.com/lit/lit', lic: 'BSD-3-Clause' },
  { id: 'fe-alpine', name: 'Alpine.js', aliases: ['Alpine'], type: 'Framework', subcategory: 'Minimalist Declarative DOM Framework', short: 'Rugged, minimal tool for composing behavior directly in your HTML markup, like Tailwind for JavaScript.', purpose: 'Sprinkling reactive behavior onto server-rendered HTML pages without heavy single-page app complexity.', cases: ['WordPress enhancement', 'Laravel/Django template interactions', 'Marketing sites with light toggles'], langs: ['JavaScript'], runtime: 'Browser JavaScript engine', build: 'None required (can load via script tag) or Vite', role: 'frontend', comp: ['Tailwind CSS', 'Laravel Livewire', 'HTML5'], alts: ['HTMX', 'jQuery', 'Vue'], diff: 1, docs: 'https://alpinejs.dev', repo: 'https://github.com/alpinejs/alpine', lic: 'MIT' },
  { id: 'fe-htmx', name: 'HTMX', aliases: ['htmx.org'], type: 'Library', subcategory: 'Hypermedia-Driven Architecture', short: 'Gives access to AJAX, CSS Transitions, WebSockets and Server Sent Events directly in HTML attributes.', purpose: 'Building modern, dynamic user interfaces using pure hypermedia and server HTML snippets.', cases: ['Server-centric web applications (Django, Go, Rails, PHP)', 'Internal admin tools', 'Lean SaaS'], langs: ['HTML', 'JavaScript'], runtime: 'Browser JavaScript engine', build: 'Zero build step required (single JS file)', role: 'frontend', comp: ['Go', 'Python/Django', 'Laravel', 'Tailwind CSS'], alts: ['React', 'Alpine.js', 'Vue'], diff: 1, docs: 'https://htmx.org', repo: 'https://github.com/bigskysoftware/htmx', lic: 'Zero-Clause BSD' },
  { id: 'fe-qwik', name: 'Qwik', aliases: ['Qwik City'], type: 'Framework', subcategory: 'Resumable Framework', short: 'Framework designed for instant page loads via resumability instead of client-side hydration.', purpose: 'Zero hydration overhead on e-commerce and media-heavy websites.', cases: ['Large e-commerce storefronts', 'Content sites needing perfect Core Web Vitals'], langs: ['TypeScript', 'JavaScript'], runtime: 'Browser and Node/Edge runtime', build: 'Vite', role: 'frontend', comp: ['Tailwind CSS', 'TypeScript', 'Cloudflare Workers'], alts: ['Next.js', 'Astro', 'React'], diff: 3, docs: 'https://qwik.dev', repo: 'https://github.com/QwikDev/qwik', lic: 'MIT' },
  { id: 'fe-ember', name: 'Ember', aliases: ['Ember.js'], type: 'Framework', subcategory: 'Convention-Driven Web Framework', short: 'Productive, battle-tested JavaScript framework for building ambitious web applications with strong conventions.', purpose: 'Large, long-lived client-side single-page applications with predictable structure.', cases: ['Enterprise SaaS platforms', 'Large legacy SPAs', 'Collaborative productivity suites'], langs: ['JavaScript', 'TypeScript'], runtime: 'Browser JavaScript engine', build: 'Ember CLI / Embroider', role: 'frontend', comp: ['Ember Data', 'TypeScript'], alts: ['Angular', 'React', 'Vue'], diff: 3, docs: 'https://emberjs.com', repo: 'https://github.com/emberjs/ember.js', lic: 'MIT' }
];

catB.forEach(b => {
  add({
    id: b.id,
    name: b.name,
    aliases: b.aliases,
    type: b.type,
    category: 'B. Frontend libraries and frameworks',
    categoryCode: 'B',
    subcategory: b.subcategory,
    shortDescription: b.short,
    detailedExplanation: `${b.name} is a leading frontend technology. ${b.short} It is widely utilized for ${b.purpose}`,
    mainPurpose: b.purpose,
    typicalUseCases: b.cases,
    relatedLanguages: b.langs,
    runtimeRequirements: b.runtime,
    buildRequirements: b.build,
    role: b.role,
    relations: { complementary: b.comp, alternatives: b.alts },
    learningDifficulty: b.diff,
    docsUrl: b.docs,
    repoUrl: b.repo,
    license: b.lic
  });
});

console.log('Categories A & B added. Total:', items.length);

fs.writeFileSync('scripts/catAB.json', JSON.stringify(items, null, 2));
