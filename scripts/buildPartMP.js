import fs from 'node:fs';

const records = JSON.parse(fs.readFileSync('scripts/catA_L_done.json', 'utf8'));

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
    detailedExplanation: item.detailedExplanation || `${item.name} is a key technology in ${item.category}. ${item.shortDescription} It is widely adopted for ${item.mainPurpose}`,
    mainPurpose: item.mainPurpose,
    typicalUseCases: item.typicalUseCases || ['Content', 'AI', 'Testing', 'DevOps'],
    relatedLanguages: item.relatedLanguages || ['Python', 'JavaScript', 'TypeScript'],
    dependencies: item.dependencies || [],
    runtimeRequirements: item.runtimeRequirements || 'Standard platform runtime',
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
    advantages: item.advantages || ['Battle-tested', 'Broad adoption', 'Comprehensive documentation'],
    limitations: item.limitations || ['Configuration and maintenance overhead'],
    knownConstraints: item.constraints || ['Standard environment setup required'],
    securityNotes: item.security || 'Enforce principle of least privilege, input validation, and security monitoring.',
    docsUrl: item.docsUrl || 'https://developer.mozilla.org',
    repoUrl: item.repoUrl || '',
    license: item.license || 'Open Source',
    verifiedDate: '2026-03-01',
    catalogVersion: '1.0.0',
    isVerified: true
  });
}

// M. Content management systems (8)
const M = [
  ['cms-wordpress', 'WordPress', ['WP'], 'Platform', 'Open-Source Web Publishing CMS', 'The world’s most popular CMS powering over 40% of the web with themes, plugins, and REST API.', 'Content blogs, corporate marketing websites, and e-commerce stores.', ['Blogging', 'Corporate sites', 'WooCommerce'], ['PHP', 'SQL', 'JavaScript'], 'PHP 8.0+ and MySQL / MariaDB', 'None', 'backend', ['PHP', 'MySQL', 'Apache/Nginx'], ['Drupal', 'Ghost', 'Strapi'], 1, 'https://wordpress.org/documentation/', 'https://github.com/WordPress/WordPress', 'GPL-2.0'],
  ['cms-drupal', 'Drupal', ['Drupal10'], 'Platform', 'Enterprise Content Architecture', 'Open-source modular CMS and digital experience framework built for complex enterprise content.', 'Government portals, universities, and high-complexity multi-site architectures.', ['Enterprise content', 'Higher education portals'], ['PHP', 'SQL'], 'PHP 8.2+ and PostgreSQL / MySQL', 'Composer', 'backend', ['PHP', 'PostgreSQL', 'Symfony'], ['WordPress', 'Strapi'], 4, 'https://www.drupal.org/docs', 'https://github.com/drupal/drupal', 'GPL-2.0'],
  ['cms-ghost', 'Ghost', ['Ghost CMS'], 'Platform', 'Modern Independent Publishing', 'Modern open source platform for independent journalists, creators, and media businesses.', 'Subscription newsletters, developer blogs, and digital publications.', ['Newsletters', 'Publications', 'Technical blogs'], ['JavaScript'], 'Node.js 18+ and MySQL', 'Ghost CLI', 'backend', ['Node.js', 'MySQL', 'Nginx'], ['WordPress', 'Substack'], 2, 'https://ghost.org/docs/', 'https://github.com/TryGhost/Ghost', 'MIT'],
  ['cms-strapi', 'Strapi', ['Strapi v5'], 'Platform', 'Open-Source Headless CMS', 'Leading open-source headless CMS that is 100% JavaScript/TypeScript and fully customizable.', 'Headless content APIs consumed by Next.js, Nuxt, and mobile applications.', ['Next.js blogs', 'Multi-channel content delivery'], ['TypeScript', 'JavaScript'], 'Node.js 18+ and PostgreSQL / SQLite', 'Strapi CLI', 'backend', ['Node.js', 'PostgreSQL', 'Next.js'], ['Directus', 'Payload', 'Contentful'], 2, 'https://docs.strapi.io', 'https://github.com/strapi/strapi', 'Community Edition (MIT)'],
  ['cms-directus', 'Directus', ['Directus API'], 'Platform', 'Instant REST+GraphQL Data Engine', 'Open-source data engine that wraps any SQL database with instant real-time REST and GraphQL APIs.', 'Headless CMS, internal business dashboards, and BaaS over existing SQL databases.', ['Headless APIs', 'Internal database backoffices'], ['TypeScript', 'SQL'], 'Node.js 18+ and any SQL DB', 'Docker / npm', 'backend', ['PostgreSQL', 'MySQL', 'Docker'], ['Strapi', 'PocketBase'], 2, 'https://docs.directdirectus.io', 'https://github.com/directus/directus', 'BRL / Commercial'],
  ['cms-payload', 'Payload', ['Payload CMS'], 'Platform', 'Code-First TypeScript Headless CMS', 'The code-first headless CMS built with Next.js, React, and TypeScript with native MongoDB / Postgres.', 'Modern TypeScript developers wanting complete programmatic control without config portals.', ['Next.js websites', 'TypeScript SaaS content'], ['TypeScript'], 'Node.js 18+ (Next.js integrated)', 'Next.js build', 'backend', ['Next.js', 'PostgreSQL', 'TypeScript'], ['Strapi', 'Sanity'], 2, 'https://payloadcms.com/docs', 'https://github.com/payloadcms/payload', 'MIT'],
  ['cms-shopify', 'Shopify', ['Shopify API'], 'Platform', 'Hosted Commerce Platform', 'Global hosted commerce platform powering online stores with Storefront API and Liquid templates.', 'Commercial e-commerce storefronts, inventory management, and checkout flows.', ['E-commerce stores', 'Headless commerce frontends'], ['Liquid', 'GraphQL', 'JavaScript'], 'Managed cloud platform', 'Theme CLI / Hydrogen (Vite)', 'service', ['Hydrogen', 'GraphQL', 'Stripe'], ['WooCommerce', 'BigCommerce'], 2, 'https://shopify.dev/docs', '', 'Commercial SaaS'],
  ['cms-woocommerce', 'WooCommerce', ['Woo'], 'Platform', 'Open-Source WordPress Commerce', 'Customizable, open-source commerce platform built on WordPress with thousands of extensions.', 'Self-hosted e-commerce stores with full data control and payment gateway choices.', ['Custom online stores', 'Digital product sales'], ['PHP', 'SQL', 'JavaScript'], 'PHP 8.0+ on WordPress and MySQL', 'None', 'backend', ['WordPress', 'PHP', 'MySQL'], ['Shopify', 'Magento'], 2, 'https://woocommerce.com/documentation/', 'https://github.com/woocommerce/woocommerce', 'GPL-3.0']
];

M.forEach(m => {
  add({
    id: m[0], name: m[1], aliases: m[2], type: m[3], category: 'M. Content management systems', categoryCode: 'M', subcategory: m[4],
    shortDescription: m[5], mainPurpose: m[6], typicalUseCases: m[7], relatedLanguages: m[8], runtimeRequirements: m[9], buildRequirements: m[10],
    role: m[11], complementary: m[12], alternatives: m[13], diff: m[14], docsUrl: m[15], repoUrl: m[16], license: m[17]
  });
});

// N. AI and data science (12)
const N = [
  ['ai-pytorch', 'PyTorch', ['Torch'], 'Framework', 'Deep Learning Tensor Framework', 'Open-source machine learning framework that accelerates the path from research prototyping to production.', 'Training neural networks, fine-tuning LLMs, and computer vision models with dynamic computational graphs.', ['LLM pretraining / fine-tuning', 'Computer vision', 'Research experiments'], ['Python', 'C++'], 'Python 3.9+ with CUDA or ROCm GPU', 'pip / uv / conda', 'ai', ['Python', 'CUDA', 'NumPy'], ['TensorFlow', 'JAX'], 3, 'https://pytorch.org/docs/', 'https://github.com/pytorch/pytorch', 'BSD-3-Clause'],
  ['ai-tensorflow', 'TensorFlow', ['TF', 'TF2'], 'Framework', 'End-to-End Machine Learning', 'End-to-end open source platform for machine learning with high-performance production serving (TFX).', 'Enterprise machine learning pipelines, edge model export (TFLite), and mobile inference.', ['Production serving', 'Edge mobile ML (TFLite)'], ['Python', 'C++'], 'Python 3.9+ or C++ runtime', 'pip / conda', 'ai', ['Keras', 'Python', 'NumPy'], ['PyTorch', 'JAX'], 3, 'https://www.tensorflow.org/guide', 'https://github.com/tensorflow/tensorflow', 'Apache-2.0'],
  ['ai-scikit', 'scikit-learn', ['sklearn'], 'Library', 'Classical Machine Learning', 'Simple and efficient tools for predictive data analysis including regression, classification, clustering.', 'Tabular business analytics, customer churn prediction, and classical statistical ML.', ['Churn classification', 'Customer clustering', 'Feature preprocessing'], ['Python'], 'Python 3.9+', 'pip / uv', 'ai', ['NumPy', 'SciPy', 'pandas'], ['XGBoost', 'LightGBM'], 2, 'https://scikit-learn.org/stable/', 'https://github.com/scikit-learn/scikit-learn', 'BSD-3-Clause'],
  ['ai-huggingface', 'Hugging Face Transformers', ['Transformers'], 'Library', 'Pretrained Model Hub & Library', 'Thousands of pretrained models to perform tasks on texts, vision, and audio with PyTorch and TensorFlow.', 'Deploying state-of-the-art NLP models (BERT, Llama, Whisper) with standardized Python APIs.', ['Sentiment analysis', 'Summarization', 'Speech-to-text'], ['Python'], 'Python 3.8+ with PyTorch', 'pip / uv', 'ai', ['PyTorch', 'Tokenizers', 'Python'], ['LangChain'], 2, 'https://huggingface.co/docs/transformers', 'https://github.com/huggingface/transformers', 'Apache-2.0'],
  ['ai-onnx', 'ONNX Runtime', ['ORT'], 'Runtime', 'Cross-Platform ML Inferencing', 'High-performance inference engine for ONNX models across Linux, Windows, macOS, and Web browsers.', 'Fast, hardware-accelerated model inference in production without full PyTorch/TF dependencies.', ['Low-latency API serving', 'In-browser client ML (ONNX Web)'], ['C++', 'Python', 'JavaScript'], 'Native OS or WebAssembly/WebGPU in browser', 'pip / npm', 'ai', ['ONNX', 'Python', 'WebAssembly'], ['TensorRT', 'OpenVINO'], 3, 'https://onnxruntime.ai/docs/', 'https://github.com/microsoft/onnxruntime', 'MIT'],
  ['ai-opencv', 'OpenCV', ['CV2'], 'Library', 'Open Source Computer Vision', 'Open-source computer vision and machine learning software library with thousands of optimized algorithms.', 'Real-time image and video processing, object detection, face recognition, and camera calibration.', ['Camera feeds', 'Image filters', 'Robotics vision'], ['C++', 'Python', 'Java'], 'C++ / Python environment', 'CMake or pip install opencv-python', 'ai', ['NumPy', 'Python', 'C++'], ['scikit-image', 'Pillow'], 3, 'https://docs.opencv.org', 'https://github.com/opencv/opencv', 'Apache-2.0'],
  ['ai-numpy', 'NumPy', ['np'], 'Library', 'N-Dimensional Array Computing', 'The fundamental package for scientific computing with Python providing fast multi-dimensional arrays.', 'Mathematical vectorization, linear algebra, Fourier transforms, and matrix manipulation.', ['Scientific math', 'Matrix operations', 'Foundation for ML'], ['Python', 'C'], 'Python 3.9+', 'pip / uv', 'ai', ['Python', 'SciPy', 'pandas'], ['PyTorch tensors', 'JAX'], 2, 'https://numpy.org/doc/', 'https://github.com/numpy/numpy', 'BSD-3-Clause'],
  ['ai-pandas', 'pandas', ['pd'], 'Library', 'Data Analysis & Manipulation', 'Fast, powerful, flexible and easy to use open-source data analysis and manipulation tool.', 'Cleaning, transforming, filtering, and joining structured tabular data (DataFrames).', ['CSV/Parquet ingestion', 'Data wrangling', 'Feature engineering'], ['Python'], 'Python 3.9+', 'pip / uv', 'ai', ['NumPy', 'Python', 'Matplotlib'], ['Polars', 'Dask'], 2, 'https://pandas.pydata.org/docs/', 'https://github.com/pandas-dev/pandas', 'BSD-3-Clause'],
  ['ai-jupyter', 'Jupyter', ['Jupyter Notebook', 'JupyterLab'], 'Tool', 'Interactive Computing Notebooks', 'Web-based interactive development environment for notebooks, code, data, and visualizations.', 'Data science exploratory research, academic sharing, and machine learning experiment documentation.', ['Exploratory data analysis', 'ML prototyping', 'Interactive tutorials'], ['Python', 'Julia', 'R'], 'Python environment with jupyterlab', 'pip / uv', 'tooling', ['Python', 'pandas', 'Matplotlib'], ['Google Colab', 'VS Code Notebooks'], 1, 'https://jupyter.org/documentation', 'https://github.com/jupyter/notebook', 'BSD-3-Clause'],
  ['ai-langchain', 'LangChain', ['LangChain Python/TS'], 'Framework', 'LLM Application Orchestration', 'Framework for developing applications powered by large language models (LLMs) with chains and agents.', 'Building RAG (Retrieval Augmented Generation), document Q&A, and tool-calling agents.', ['Document Q&A bots', 'Multi-tool agent workflows'], ['Python', 'TypeScript'], 'Python 3.9+ or Node.js 18+', 'pip or npm', 'ai', ['OpenAI', 'Gemini', 'Vector databases'], ['LlamaIndex', 'Haystack'], 2, 'https://python.langchain.com/docs/', 'https://github.com/langchain-ai/langchain', 'MIT'],
  ['ai-llamaindex', 'LlamaIndex', ['GPT Index'], 'Framework', 'Data Framework for LLM Apps', 'Data framework for LLM applications to ingest, structure, and access private or domain-specific data.', 'Advanced RAG pipelines, semantic document chunking, and knowledge graph querying.', ['Enterprise RAG', 'PDF search engines'], ['Python', 'TypeScript'], 'Python 3.9+ or Node.js', 'pip or npm', 'ai', ['Vector databases', 'Python'], ['LangChain'], 2, 'https://docs.llamaindex.ai', 'https://github.com/run-llama/llama_index', 'MIT'],
  ['ai-ollama', 'Ollama', ['Ollama Local'], 'Tool', 'Local Large Language Models', 'Get up and running with Llama 3, Mistral, Gemma, and other large language models locally.', 'Running privacy-preserving local LLM inference without sending sensitive data to external APIs.', ['Private company chat', 'Local coding copilot', 'Offline AI pipelines'], ['Go', 'C++'], 'macOS, Linux, or Windows with GPU or CPU', 'Native installer', 'tooling', ['Python', 'LangChain', 'Docker'], ['vLLM', 'LocalAI'], 1, 'https://ollama.com', 'https://github.com/ollama/ollama', 'MIT']
];

N.forEach(n => {
  add({
    id: n[0], name: n[1], aliases: n[2], type: n[3], category: 'N. AI and data science', categoryCode: 'N', subcategory: n[4],
    shortDescription: n[5], mainPurpose: n[6], typicalUseCases: n[7], relatedLanguages: n[8], runtimeRequirements: n[9], buildRequirements: n[10],
    role: n[11], complementary: n[12], alternatives: n[13], diff: n[14], docsUrl: n[15], repoUrl: n[16], license: n[17]
  });
});

// O. Testing, security, and quality (11)
const O = [
  ['qa-vitest', 'Vitest', ['VitestJS'], 'Tool', 'Blazing Fast Unit Test Runner', 'Next-generation testing framework powered by Vite with native ESM, TypeScript, and Jest-compatible API.', 'Unit and integration testing in modern web applications and libraries.', ['React/Vue component tests', 'Pure logic unit testing'], ['TypeScript', 'JavaScript'], 'Node.js 18+', 'Vite config', 'tooling', ['Vite', 'Testing Library'], ['Jest', 'Mocha'], 2, 'https://vitest.dev/guide/', 'https://github.com/vitest-dev/vitest', 'MIT'],
  ['qa-jest', 'Jest', ['JestJS'], 'Tool', 'Delightful JavaScript Testing', 'Delightful JavaScript testing framework with a focus on simplicity and snapshot testing.', 'Testing enterprise React applications and Node.js microservices.', ['Unit tests', 'Snapshot testing', 'Mocking'], ['JavaScript', 'TypeScript'], 'Node.js', 'jest.config.js', 'tooling', ['Node.js', 'Babel', 'ts-jest'], ['Vitest'], 2, 'https://jestjs.io/docs/getting-started', 'https://github.com/jestjs/jest', 'MIT'],
  ['qa-playwright', 'Playwright', ['Playwright Test'], 'Tool', 'Fast Cross-Browser E2E Testing', 'Reliable end-to-end testing for modern web apps across Chromium, Firefox, and WebKit.', 'Automating browser journeys, regression testing, and visual screenshot verification.', ['Full-journey regression tests', 'Visual regression testing'], ['TypeScript', 'JavaScript', 'Python'], 'Node.js with downloaded browser binaries', 'playwright.config.ts', 'tooling', ['Chromium', 'WebKit', 'GitHub Actions'], ['Cypress', 'Selenium'], 2, 'https://playwright.dev/docs/intro', 'https://github.com/microsoft/playwright', 'Apache-2.0'],
  ['qa-cypress', 'Cypress', ['Cypress.io'], 'Tool', 'Fast Easy Browser Testing', 'Fast, easy and reliable testing for anything that runs in a browser with interactive time-travel.', 'Component testing and end-to-end user flow testing in Chrome and Firefox.', ['Interactive E2E tests', 'Component tests'], ['JavaScript', 'TypeScript'], 'Node.js and browser', 'cypress.config.js', 'tooling', ['React', 'Vue'], ['Playwright', 'Vitest'], 2, 'https://docs.cypress.io', 'https://github.com/cypress-io/cypress', 'MIT'],
  ['qa-axe', 'axe-core', ['Axe'], 'Library', 'Accessibility Testing Engine', 'Accessibility engine for automated Web UI accessibility testing conforming to WCAG standards.', 'Catching accessibility defects (contrast, aria, labels) in CI/CD and developer tools.', ['Automated WCAG compliance', 'Lighthouse audits'], ['JavaScript'], 'Browser or Node (via Playwright/Jest)', 'npm package', 'tooling', ['Playwright', 'Vitest', 'Lighthouse'], ['manual testing'], 2, 'https://www.deque.com/axe/core-documentation/', 'https://github.com/dequelabs/axe-core', 'MPL-2.0'],
  ['qa-eslint', 'ESLint', ['ESLint9'], 'Tool', 'Pluggable JavaScript Linter', 'Pluggable JavaScript linter finding and fixing problems in JavaScript and TypeScript code.', 'Enforcing code quality, preventing common bugs, and standardizing team patterns.', ['CI linting checks', 'IDE live feedback'], ['JavaScript', 'TypeScript'], 'Node.js 18+', 'eslint.config.js', 'tooling', ['TypeScript', 'Prettier'], ['Biome', 'Ruff'], 2, 'https://eslint.org/docs/latest/', 'https://github.com/eslint/eslint', 'MIT'],
  ['qa-prettier', 'Prettier', ['Prettier Code Formatter'], 'Tool', 'Opinionated Code Formatter', 'An opinionated code formatter supporting JavaScript, TypeScript, CSS, HTML, and Markdown.', 'Eliminating all formatting discussions in code reviews with automatic syntax formatting.', ['Pre-commit hooks (Husky)', 'IDE on-save formatting'], ['JavaScript'], 'Node.js', '.prettierrc', 'tooling', ['ESLint', 'Git'], ['Biome'], 1, 'https://prettier.io/docs/en/', 'https://github.com/prettier/prettier', 'MIT'],
  ['qa-snyk', 'Snyk', ['Snyk Security'], 'Service', 'Developer Security Platform', 'Developer security platform integrating directly into dev tools, workflows, and automation pipelines.', 'Scanning open-source dependencies (npm, PyPI, Maven) for known CVE vulnerabilities.', ['CI dependency vulnerability scans', 'Container image scanning'], ['Any'], 'CLI or cloud platform', 'snyk test', 'security', ['GitHub Actions', 'npm'], ['Dependabot', 'Trivy'], 2, 'https://docs.snyk.io', '', 'Commercial Freemium'],
  ['qa-dependabot', 'Dependabot', ['GitHub Dependabot'], 'Tool', 'Automated Dependency Updates', 'Automated dependency update service creating pull requests when packages are vulnerable or outdated.', 'Keeping npm, pip, Cargo, and Docker dependencies continuously updated with minimal manual effort.', ['Automated security PRs', 'Version bump automation'], ['Any'], 'GitHub native platform', '.github/dependabot.yml', 'security', ['GitHub', 'CI/CD'], ['Renovate'], 1, 'https://docs.github.com/en/code-security/dependabot', '', 'Free on GitHub'],
  ['qa-owasp', 'OWASP Top 10 Concepts', ['OWASP'], 'Tool', 'Web Security Standard', 'Standard awareness document for developers representing broad consensus on top security risks.', 'Guiding application threat modeling, input validation, and defensive programming.', ['Security architecture audits', 'Developer training'], ['Any'], 'Mental framework and checklist', 'None', 'security', ['Security headers', 'Input sanitization'], ['Ad-hoc security'], 2, 'https://owasp.org/www-project-top-ten/', '', 'Creative Commons'],
  ['qa-webcrypto', 'Web Crypto API', ['SubtleCrypto'], 'Tool', 'Native Browser Cryptography', 'Standard JavaScript API providing cryptographic primitives (SHA-256, AES-GCM, RSA, ECDSA).', 'Hashing data fingerprints, generating cryptographic keys, and client-side encryption.', ['Data integrity hashing (SHA-256)', 'End-to-end encrypted storage'], ['JavaScript', 'TypeScript'], 'Standard web browser or modern Node.js/Deno/Bun', 'None', 'security', ['IndexedDB', 'PWA'], ['crypto-js (legacy)'], 2, 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API', '', 'W3C Recommendation']
];

O.forEach(o => {
  add({
    id: o[0], name: o[1], aliases: o[2], type: o[3], category: 'O. Testing, security, and quality', categoryCode: 'O', subcategory: o[4],
    shortDescription: o[5], mainPurpose: o[6], typicalUseCases: o[7], relatedLanguages: o[8], runtimeRequirements: o[9], buildRequirements: o[10],
    role: o[11], complementary: o[12], alternatives: o[13], diff: o[14], docsUrl: o[15], repoUrl: o[16], license: o[17]
  });
});

// P. Source control, collaboration, and observability (10)
const P = [
  ['vcs-git', 'Git', ['Git CLI'], 'Tool', 'Distributed Version Control', 'Free and open source distributed version control system designed to handle everything with speed.', 'Tracking code history, branching feature work, and enabling decentralized team collaboration.', ['Code versioning', 'Feature branching', 'Bisecting bugs'], ['C'], 'Local machine operating system', 'None', 'tooling', ['GitHub', 'GitLab'], ['Mercurial', 'SVN'], 2, 'https://git-scm.com/doc', 'https://github.com/git/git', 'GPL-2.0'],
  ['vcs-github', 'GitHub', ['GH'], 'Service', 'World\'s Largest Developer Platform', 'Cloud-based hosting service for Git repositories with issue tracking, pull requests, and CI/CD.', 'Hosting open-source and private repositories, collaborative code reviews, and project management.', ['Code hosting', 'Open source collaboration', 'GitHub Actions CI'], ['Any'], 'Cloud web platform', 'Git CLI / GitHub CLI', 'tooling', ['Git', 'GitHub Actions', 'Dependabot'], ['GitLab', 'Bitbucket'], 1, 'https://docs.github.com', '', 'Freemium Service'],
  ['vcs-gitlab', 'GitLab', ['GitLab CE/EE'], 'Service', 'Complete DevOps Platform', 'Web-based DevOps lifecycle tool that provides Git repository manager, wiki, issue-tracking and CI/CD.', 'Enterprise self-hosted code repositories and integrated end-to-end DevOps pipelines.', ['Self-hosted enterprise Git', 'Integrated CI/CD'], ['Ruby', 'Go', 'Vue'], 'Cloud SaaS or self-hosted Linux server', 'Git CLI', 'tooling', ['Git', 'Docker', 'Kubernetes'], ['GitHub', 'Bitbucket'], 2, 'https://docs.gitlab.com', 'https://gitlab.com/gitlab-org/gitlab', 'MIT / Proprietary'],
  ['vcs-bitbucket', 'Bitbucket', ['Atlassian Bitbucket'], 'Service', 'Atlassian Git Solution', 'Git repository management solution designed for professional teams using Jira and Confluence.', 'Enterprise code hosting tightly integrated with Jira ticketing and Bitbucket Pipelines.', ['Jira-integrated teams', 'Corporate Git hosting'], ['Any'], 'Cloud SaaS or Data Center', 'Git CLI', 'tooling', ['Jira', 'Git'], ['GitHub', 'GitLab'], 2, 'https://support.atlassian.com/bitbucket-cloud/', '', 'Commercial SaaS'],
  ['obs-sentry', 'Sentry', ['Sentry.io'], 'Service', 'Application Performance & Error Tracking', 'Developer-first error tracking and performance monitoring platform with stack traces and breadcrumbs.', 'Capturing unhandled frontend JavaScript errors and backend exceptions with source map resolution.', ['Real-time error alerts', 'Frontend crash reporting', 'Performance profiling'], ['JavaScript', 'Python', 'Go', 'PHP'], 'Any platform with Sentry SDK', 'npm/pip SDK install', 'tooling', ['React', 'Node.js', 'Python'], ['Datadog', 'LogRocket'], 2, 'https://docs.sentry.io', 'https://github.com/getsentry/sentry', 'FSL-1.1-Apache-2.0'],
  ['obs-opentelemetry', 'OpenTelemetry', ['OTel'], 'Tool', 'Vendor-Neutral Observability Standard', 'Collection of APIs, SDKs, and tools to instrument, generate, collect, and export telemetry data.', 'Vendor-neutral traces, metrics, and logs export to Jaeger, Prometheus, or cloud providers.', ['Distributed microservice tracing', 'Metric instrumentation'], ['Go', 'Java', 'Python', 'TypeScript'], 'Any server application runtime', 'OTel SDK', 'tooling', ['Prometheus', 'Grafana', 'Jaeger'], ['Datadog agent', 'New Relic'], 3, 'https://opentelemetry.io/docs/', 'https://github.com/open-telemetry', 'Apache-2.0'],
  ['obs-prometheus', 'Prometheus', ['Prom'], 'Tool', 'Time-Series Metric Monitoring', 'Open-source systems monitoring and alerting toolkit collecting multi-dimensional metrics via pull model.', 'Scraping HTTP metrics, memory consumption, CPU utilization, and alerting on anomalies.', ['Kubernetes metric collection', 'System health alerts'], ['Go'], 'Linux server / Docker / Kubernetes', 'prometheus.yml', 'infra', ['Grafana', 'Kubernetes', 'Alertmanager'], ['Datadog', 'InfluxDB'], 3, 'https://prometheus.io/docs/introduction/overview/', 'https://github.com/prometheus/prometheus', 'Apache-2.0'],
  ['obs-grafana', 'Grafana', ['Grafana Labs'], 'Tool', 'Observability Dashboard Platform', 'Open-source platform for visualizing, querying, and analyzing metrics, logs, and traces from any source.', 'Creating operational NOC dashboards, business performance graphs, and system telemetry views.', ['Kubernetes monitoring dashboards', 'Business KPI graphs'], ['TypeScript', 'Go'], 'Linux server / Docker container / Cloud', 'None (web dashboard config)', 'infra', ['Prometheus', 'PostgreSQL', 'Loki'], ['Kibana', 'Datadog'], 2, 'https://grafana.com/docs/', 'https://github.com/grafana/grafana', 'AGPL-3.0'],
  ['obs-logging', 'Structured Logging', ['JSON Logging'], 'Tool', 'Machine-Readable Log Strategy', 'Practice of emitting logs in structured format (such as JSON) rather than plain unstructured text.', 'Indexing logs in Elasticsearch/Loki and querying specific request IDs across microservices.', ['Microservice log correlation', 'Log ingestion in Loki/Datadog'], ['JSON', 'Any language'], 'Any logging library (Pino, Winston, Zap)', 'None', 'tooling', ['Pino', 'Prometheus', 'Loki'], ['Plain text stdout'], 2, 'https://en.wikipedia.org/wiki/Structured_logging', '', 'Software Pattern'],
  ['obs-reporting', 'Error Reporting & Telemetry', ['Crash Reporting'], 'Tool', 'Client Crash Collection Strategy', 'Architecture for intercepting uncaught runtime exceptions and transmitting payload reports.', 'Maintaining visibility over user-facing bugs, broken third-party scripts, and unhandled rejections.', ['Client exception catching (window.onerror)', 'Automated triage'], ['JavaScript', 'Any language'], 'Browser or native app error boundary', 'None', 'tooling', ['Sentry', 'Web Workers'], ['Silent client crashes'], 2, 'https://developer.mozilla.org/en-US/docs/Web/API/Window/error_event', '', 'Architectural Practice']
];

P.forEach(p => {
  add({
    id: p[0], name: p[1], aliases: p[2], type: p[3], category: 'P. Source control, collaboration, and observability', categoryCode: 'P', subcategory: p[4],
    shortDescription: p[5], mainPurpose: p[6], typicalUseCases: p[7], relatedLanguages: p[8], runtimeRequirements: p[9], buildRequirements: p[10],
    role: p[11], complementary: p[12], alternatives: p[13], diff: p[14], docsUrl: p[15], repoUrl: p[16], license: p[17]
  });
});

console.log('GRAND TOTAL RECORDS (All categories A through P):', records.length);

// Generate clean TypeScript output
const tsContent = `import { TechRecord } from '../types';

export const TECH_CATALOG: TechRecord[] = ${JSON.stringify(records, null, 2)};

export const TECH_MAP = new Map<string, TechRecord>(
  TECH_CATALOG.map(t => [t.id, t])
);
`;

fs.writeFileSync('src/data/catalog.ts', tsContent);
console.log('Saved src/data/catalog.ts successfully!');
