import type { ProjectRecord, TechRecord } from '../types.ts';

const DB_NAME = 'TechAtlasDB';
const DB_VERSION = 1;

interface StorageState {
  projects: ProjectRecord[];
  favorites: string[];
  history: string[];
  settings: Record<string, any>;
}

// Memory fallback in case IndexedDB is restricted in iframe/private browsing
const memoryStore: StorageState = {
  projects: [
    {
      id: 'proj-offline-pwa',
      name: 'Tech Atlas Studio (Offline-First Map)',
      description: 'Single-file local intelligence workspace using IndexedDB and Web Crypto API.',
      stack: {
        language: 'lang-typescript',
        frontend: 'fe-react',
        runtime: 'rt-browser-engines',
        buildTool: 'bt-vite',
        database: 'db-indexeddb',
        apiProtocol: 'net-rest',
        hosting: 'host-cloudflare-pages',
        testing: 'qa-vitest'
      },
      notes: 'Runs 100% offline from local browser and persistent IndexedDB.',
      tags: ['Offline', 'PWA', 'Intelligence'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      liveUrl: 'https://ais-pre-johyjo7uv3ccqmalywwytk-17774190120.europe-west3.run.app',
      repoUrl: 'https://github.com/google/tech-atlas-studio'
    },
    {
      id: 'proj-modern-saas',
      name: 'Modern Cloud Enterprise SaaS',
      description: 'Production-ready full-stack application with Next.js, Postgres, and Docker.',
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
      },
      notes: 'Optimized for high-scale multi-tenant enterprise workflows.',
      tags: ['FullStack', 'Next.js', 'PostgreSQL'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      liveUrl: 'https://stackblitz.com/edit/nextjs?file=app/page.tsx',
      repoUrl: 'https://github.com/vercel/next.js'
    },
    {
      id: 'proj-ai-workspace',
      name: 'AI Intelligence & Data Analytics Portal',
      description: 'Interactive analytics dashboard with Vite, React, and Python AI microservices.',
      stack: {
        language: 'lang-python',
        frontend: 'fe-react',
        backend: 'be-fastapi',
        runtime: 'rt-python',
        buildTool: 'bt-vite',
        database: 'db-redis',
        apiProtocol: 'net-rest',
        hosting: 'host-aws',
        testing: 'qa-pytest'
      },
      notes: 'Fast API inference pipeline with real-time reactive UI.',
      tags: ['AI', 'FastAPI', 'React'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      liveUrl: 'https://stackblitz.com/edit/vitejs-vite-react?file=src/App.tsx',
      repoUrl: 'https://github.com/tiangolo/fastapi'
    },
    {
      id: 'proj-static-docs',
      name: 'High-Performance Content & Docs Portal',
      description: 'Ultra-fast static documentation site with zero-JS by default using Astro.',
      stack: {
        language: 'lang-typescript',
        frontend: 'fe-react',
        backend: 'fs-astro',
        runtime: 'rt-browser-engines',
        buildTool: 'bt-vite',
        database: 'db-indexeddb',
        apiProtocol: 'net-graphql',
        hosting: 'host-gh-pages',
        testing: 'qa-playwright'
      },
      notes: 'Lighthouse 100/100 score with islands architecture.',
      tags: ['Static', 'Astro', 'Docs'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      liveUrl: 'https://stackblitz.com/edit/github-withastro-astro?file=src/pages/index.astro',
      repoUrl: 'https://github.com/withastro/astro'
    }
  ],
  favorites: ['lang-typescript', 'fe-react', 'db-postgres', 'db-indexeddb'],
  history: ['lang-typescript', 'fe-react', 'fs-nextjs', 'db-postgres'],
  settings: {
    language: 'fa', // Default to Persian or English based on user locale
    theme: 'dark'
  }
};

/**
 * Generates an active, interactive live playground link for any stack configuration
 */
export function getLivePlaygroundUrl(stack: Partial<import('../types.ts').StackSelection>): string {
  const backend = stack.backend || '';
  const frontend = stack.frontend || '';

  if (backend.includes('nextjs') || backend.includes('next')) {
    return 'https://stackblitz.com/edit/nextjs?file=app/page.tsx';
  }
  if (backend.includes('nuxt') || frontend.includes('vue')) {
    return 'https://stackblitz.com/edit/nuxt-starter?file=app.vue';
  }
  if (backend.includes('svelte') || frontend.includes('svelte')) {
    return 'https://stackblitz.com/edit/sveltejs-kit-template-default?file=src/routes/+page.svelte';
  }
  if (backend.includes('astro')) {
    return 'https://stackblitz.com/edit/github-withastro-astro?file=src/pages/index.astro';
  }
  if (backend.includes('remix')) {
    return 'https://stackblitz.com/edit/remix-run-remix?file=app/routes/_index.tsx';
  }
  if (frontend.includes('react')) {
    return 'https://stackblitz.com/edit/vitejs-vite-react?file=src/App.tsx';
  }
  if (frontend.includes('vue')) {
    return 'https://stackblitz.com/edit/vitejs-vite-vue?file=src/App.vue';
  }
  if (backend.includes('express') || backend.includes('nest') || backend.includes('fastify')) {
    return 'https://stackblitz.com/edit/node-express-starter?file=index.js';
  }
  return 'https://stackblitz.com/edit/vitejs-vite-react?file=src/App.tsx';
}

let dbInstance: IDBDatabase | null = null;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (dbInstance) return resolve(dbInstance);
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB not supported in current environment'));
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('projects')) {
        db.createObjectStore('projects', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('favorites')) {
        db.createObjectStore('favorites', { keyPath: 'techId' });
      }
      if (!db.objectStoreNames.contains('history')) {
        db.createObjectStore('history', { keyPath: 'techId' });
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function getProjects(): Promise<ProjectRecord[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('projects', 'readonly');
      const store = tx.objectStore('projects');
      const req = store.getAll();
      req.onsuccess = () => {
        if (req.result && req.result.length > 0) {
          resolve(req.result);
        } else {
          // Seed initial projects
          memoryStore.projects.forEach(p => saveProject(p));
          resolve(memoryStore.projects);
        }
      };
      req.onerror = () => resolve(memoryStore.projects);
    });
  } catch (err) {
    return memoryStore.projects;
  }
}

export async function saveProject(project: ProjectRecord): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('projects', 'readwrite');
      const store = tx.objectStore('projects');
      const req = store.put(project);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    const idx = memoryStore.projects.findIndex(p => p.id === project.id);
    if (idx >= 0) {
      memoryStore.projects[idx] = project;
    } else {
      memoryStore.projects.push(project);
    }
  }
}

export async function deleteProject(id: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('projects', 'readwrite');
      const store = tx.objectStore('projects');
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    memoryStore.projects = memoryStore.projects.filter(p => p.id !== id);
  }
}

export async function getFavorites(): Promise<string[]> {
  try {
    const db = await openDB();
    return new Promise(resolve => {
      const tx = db.transaction('favorites', 'readonly');
      const store = tx.objectStore('favorites');
      const req = store.getAll();
      req.onsuccess = () => {
        if (req.result && req.result.length > 0) {
          resolve(req.result.map((r: any) => r.techId));
        } else {
          resolve(memoryStore.favorites);
        }
      };
      req.onerror = () => resolve(memoryStore.favorites);
    });
  } catch {
    return memoryStore.favorites;
  }
}

export async function toggleFavorite(techId: string): Promise<boolean> {
  const current = await getFavorites();
  const exists = current.includes(techId);
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('favorites', 'readwrite');
      const store = tx.objectStore('favorites');
      if (exists) {
        store.delete(techId);
      } else {
        store.put({ techId, addedAt: new Date().toISOString() });
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    if (exists) {
      memoryStore.favorites = memoryStore.favorites.filter(id => id !== techId);
    } else {
      memoryStore.favorites.push(techId);
    }
  }
  return !exists;
}

export async function getRecentHistory(): Promise<string[]> {
  return memoryStore.history;
}

export function recordHistory(techId: string): void {
  memoryStore.history = [techId, ...memoryStore.history.filter(id => id !== techId)].slice(0, 15);
}

export async function generateCryptoFingerprint(data: any): Promise<string> {
  try {
    const jsonStr = JSON.stringify(data);
    const enc = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-256', enc.encode(jsonStr));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return 'fingerprint-' + Math.random().toString(36).slice(2, 10);
  }
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportComparisonToCSV(techs: TechRecord[]): string {
  const headers = [
    'Technology',
    'Category',
    'Type',
    'Role',
    'Learning Difficulty (1-5)',
    'Runtime Requirements',
    'Build Requirements',
    'License',
    'Official Docs',
    'Offline Capable'
  ];

  const rows = techs.map(t => [
    `"${t.name.replace(/"/g, '""')}"`,
    `"${t.category.replace(/"/g, '""')}"`,
    `"${t.type}"`,
    `"${t.role}"`,
    `"${t.learningDifficulty}"`,
    `"${t.runtimeRequirements.replace(/"/g, '""')}"`,
    `"${t.buildRequirements.replace(/"/g, '""')}"`,
    `"${t.license.replace(/"/g, '""')}"`,
    `"${t.docsUrl}"`,
    `"${t.compatibility.offlineCapable ? 'Yes' : 'No'}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
