// Script to generate the comprehensive technology catalog
import fs from 'node:fs';

const rawCategories = [
  { code: 'A', name: 'Languages and formats', sub: 'Core Syntax & Specifications' },
  { code: 'B', name: 'Frontend libraries and frameworks', sub: 'Client-Side UI Architecture' },
  { code: 'C', name: 'Full-stack and server-rendered frameworks', sub: 'Unified Web Frameworks' },
  { code: 'D', name: 'Backend frameworks', sub: 'Server-Side Application Logic' },
  { code: 'E', name: 'Mobile and desktop development', sub: 'Multiplatform & Native Apps' },
  { code: 'F', name: 'UI, styling, and design systems', sub: 'Styling & Design Components' },
  { code: 'G', name: 'Graphics, animation, and visualization', sub: '2D/3D & Data Visualization' },
  { code: 'H', name: 'Runtime environments and execution engines', sub: 'Execution Engines' },
  { code: 'I', name: 'Build tools and package managers', sub: 'Tooling & Package Ecosystem' },
  { code: 'J', name: 'Databases and data storage', sub: 'Data Stores & State Management' },
  { code: 'K', name: 'API, communication, and networking', sub: 'Protocols & Connectivity' },
  { code: 'L', name: 'Hosting, deployment, and infrastructure', sub: 'Cloud & Orchestration' },
  { code: 'M', name: 'Content management systems', sub: 'Content Platforms & Headless CMS' },
  { code: 'N', name: 'AI and data science', sub: 'Machine Learning & Numerical Computing' },
  { code: 'O', name: 'Testing, security, and quality', sub: 'Verification & Hardening' },
  { code: 'P', name: 'Source control, collaboration, and observability', sub: 'VCS & Telemetry' }
];

export { rawCategories };
