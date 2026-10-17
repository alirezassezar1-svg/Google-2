import React, { useState, useEffect } from 'react';
import { TECH_CATALOG, TECH_MAP } from './data/catalog.ts';
import { CATEGORIES } from './data/categories.ts';
import { TechRecord, StackSelection, ProjectRecord } from './types.ts';
import { Language } from './i18n/translations.ts';
import {
  getProjects,
  saveProject,
  deleteProject,
  getFavorites,
  toggleFavorite,
  getRecentHistory,
  recordHistory
} from './services/storage.ts';

import { Header } from './components/Header.tsx';
import { Navigation, ActiveModule } from './components/Navigation.tsx';
import { TechDrawer } from './components/TechDrawer.tsx';

import { OverviewView } from './views/OverviewView.tsx';
import { ExplorerView } from './views/ExplorerView.tsx';
import { CategoriesView } from './views/CategoriesView.tsx';
import { CompareView } from './views/CompareView.tsx';
import { StackBuilderView } from './views/StackBuilderView.tsx';
import { ArchMapView } from './views/ArchMapView.tsx';
import { AdvisorView } from './views/AdvisorView.tsx';
import { CompatibilityView } from './views/CompatibilityView.tsx';
import { GlossaryView } from './views/GlossaryView.tsx';
import { ProjectsView } from './views/ProjectsView.tsx';
import { ImportExportView } from './views/ImportExportView.tsx';
import { SettingsView } from './views/SettingsView.tsx';

export default function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('overview');
  const [lang, setLang] = useState<Language>('fa'); // Persian default as prioritized in prompt
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedTech, setSelectedTech] = useState<TechRecord | null>(null);
  const [compareList, setCompareList] = useState<string[]>(['fe-react', 'fe-vue']);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);

  const [currentStack, setCurrentStack] = useState<StackSelection>({
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
  });

  // Sync RTL / LTR and theme attributes on root
  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }, [theme]);

  // Load persistent IndexedDB state on mount
  useEffect(() => {
    getProjects().then(projs => setProjects(projs));
    getFavorites().then(favs => setFavorites(favs));
    getRecentHistory().then(rec => setRecentIds(rec));
  }, []);

  const handleToggleLang = () => {
    setLang(l => (l === 'en' ? 'fa' : 'en'));
  };

  const handleToggleTheme = () => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectTech = (tech: TechRecord) => {
    setSelectedTech(tech);
    recordHistory(tech.id);
    setRecentIds(prev => [tech.id, ...prev.filter(id => id !== tech.id)].slice(0, 15));
  };

  const handleToggleFavorite = async (id: string) => {
    await toggleFavorite(id);
    const updated = await getFavorites();
    setFavorites(updated);
  };

  const handleToggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(i => i !== id));
    } else {
      if (compareList.length >= 4) {
        setCompareList([...compareList.slice(1), id]);
      } else {
        setCompareList([...compareList, id]);
      }
    }
  };

  const handleAddToStackFromDrawer = (tech: TechRecord) => {
    setSelectedTech(null);
    setActiveModule('stackBuilder');

    if (tech.type === 'Language') {
      setCurrentStack(s => ({ ...s, language: tech.id }));
    } else if (tech.categoryCode === 'B' || tech.categoryCode === 'E') {
      setCurrentStack(s => ({ ...s, frontend: tech.id }));
    } else if (tech.categoryCode === 'C' || tech.categoryCode === 'D') {
      setCurrentStack(s => ({ ...s, backend: tech.id }));
    } else if (tech.categoryCode === 'H') {
      setCurrentStack(s => ({ ...s, runtime: tech.id }));
    } else if (tech.categoryCode === 'I') {
      setCurrentStack(s => ({ ...s, buildTool: tech.id }));
    } else if (tech.categoryCode === 'J') {
      setCurrentStack(s => ({ ...s, database: tech.id }));
    } else if (tech.categoryCode === 'K') {
      setCurrentStack(s => ({ ...s, apiProtocol: tech.id }));
    } else if (tech.categoryCode === 'L') {
      setCurrentStack(s => ({ ...s, hosting: tech.id }));
    } else if (tech.categoryCode === 'O') {
      setCurrentStack(s => ({ ...s, testing: tech.id }));
    } else if (tech.categoryCode === 'P') {
      setCurrentStack(s => ({ ...s, monitoring: tech.id }));
    } else if (tech.categoryCode === 'N') {
      setCurrentStack(s => ({ ...s, aiIntegration: tech.id }));
    }
  };

  const handleSaveProject = async (project: ProjectRecord) => {
    await saveProject(project);
    const updated = await getProjects();
    setProjects(updated);
    setActiveModule('projects');
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id);
    const updated = await getProjects();
    setProjects(updated);
  };

  const handleDuplicateProject = async (project: ProjectRecord) => {
    const dup: ProjectRecord = {
      ...project,
      id: 'proj-' + Date.now().toString(36),
      name: `${project.name} (Copy)`,
      updatedAt: new Date().toISOString()
    };
    await saveProject(dup);
    const updated = await getProjects();
    setProjects(updated);
  };

  const handleImportProjects = async (imported: ProjectRecord[]) => {
    for (const p of imported) {
      await saveProject(p);
    }
    const updated = await getProjects();
    setProjects(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950 overflow-x-hidden max-w-full">
      {/* Top Application Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        searchQuery={searchQuery}
        onSearchChange={q => {
          setSearchQuery(q);
          if (q && activeModule !== 'explorer') {
            setActiveModule('explorer');
          }
        }}
        compareCount={compareList.length}
        onOpenCompare={() => setActiveModule('compare')}
      />

      {/* 12-Module Main Navigation Bar */}
      <Navigation
        activeModule={activeModule}
        onChangeModule={setActiveModule}
        lang={lang}
      />

      {/* Main View Workspace */}
      <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
        {activeModule === 'overview' && (
          <OverviewView
            totalTechs={TECH_CATALOG.length}
            totalCategories={CATEGORIES.length}
            projects={projects}
            favorites={favorites}
            recentIds={recentIds}
            catalogMap={TECH_MAP}
            lang={lang}
            onNavigate={setActiveModule}
            onSelectTech={handleSelectTech}
          />
        )}

        {activeModule === 'explorer' && (
          <ExplorerView
            catalog={TECH_CATALOG}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            lang={lang}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
            onSelectTech={handleSelectTech}
          />
        )}

        {activeModule === 'categories' && (
          <CategoriesView
            catalog={TECH_CATALOG}
            lang={lang}
            onSelectCategoryInExplorer={code => {
              setActiveModule('explorer');
            }}
            onSelectTech={handleSelectTech}
          />
        )}

        {activeModule === 'compare' && (
          <CompareView
            compareIds={compareList}
            catalogMap={TECH_MAP}
            allCatalog={TECH_CATALOG}
            onRemoveFromCompare={handleToggleCompare}
            onAddToCompare={handleToggleCompare}
            onClearCompare={() => setCompareList([])}
            lang={lang}
            onSelectTech={handleSelectTech}
          />
        )}

        {activeModule === 'stackBuilder' && (
          <StackBuilderView
            currentStack={currentStack}
            onChangeStack={setCurrentStack}
            catalog={TECH_CATALOG}
            catalogMap={TECH_MAP}
            lang={lang}
            onSaveProject={handleSaveProject}
          />
        )}

        {activeModule === 'archMap' && (
          <ArchMapView
            catalog={TECH_CATALOG}
            lang={lang}
            onSelectTech={handleSelectTech}
          />
        )}

        {activeModule === 'advisor' && (
          <AdvisorView
            lang={lang}
            onApplyStackToBuilder={recStack => {
              setCurrentStack(recStack);
              setActiveModule('stackBuilder');
            }}
            catalogMap={TECH_MAP}
          />
        )}

        {activeModule === 'compatibility' && (
          <CompatibilityView
            catalog={TECH_CATALOG}
            catalogMap={TECH_MAP}
            lang={lang}
            onSelectTech={handleSelectTech}
          />
        )}

        {activeModule === 'glossary' && (
          <GlossaryView
            catalogMap={TECH_MAP}
            lang={lang}
            onSelectTech={handleSelectTech}
          />
        )}

        {activeModule === 'projects' && (
          <ProjectsView
            projects={projects}
            catalogMap={TECH_MAP}
            lang={lang}
            onOpenInStackBuilder={stk => {
              setCurrentStack(stk);
              setActiveModule('stackBuilder');
            }}
            onDeleteProject={handleDeleteProject}
            onDuplicateProject={handleDuplicateProject}
            onNavigateToBuilder={() => setActiveModule('stackBuilder')}
            onSaveProject={handleSaveProject}
          />
        )}

        {activeModule === 'importExport' && (
          <ImportExportView
            catalog={TECH_CATALOG}
            projects={projects}
            onImportProjects={handleImportProjects}
            lang={lang}
          />
        )}

        {activeModule === 'settings' && (
          <SettingsView
            lang={lang}
            onToggleLang={handleToggleLang}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            catalogCount={TECH_CATALOG.length}
            projectCount={projects.length}
          />
        )}
      </main>

      {/* Global Tech Profile Drawer */}
      <TechDrawer
        tech={selectedTech}
        onClose={() => setSelectedTech(null)}
        lang={lang}
        isFavorite={selectedTech ? favorites.includes(selectedTech.id) : false}
        onToggleFavorite={handleToggleFavorite}
        isInCompare={selectedTech ? compareList.includes(selectedTech.id) : false}
        onToggleCompare={handleToggleCompare}
        onAddToStack={handleAddToStackFromDrawer}
      />

      {/* Clean Global Footer */}
      <footer className="w-full glass-panel border-t px-6 py-4 mt-auto text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-400">Tech Atlas Studio</span>
          <span>·</span>
          <span>The Interactive Map of Software Technology</span>
          <span>·</span>
          <span className="text-emerald-400 font-mono">100% Offline Capable</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span>{TECH_CATALOG.length} Verified Records</span>
          <span>·</span>
          <span>IndexedDB Storage</span>
          <span>·</span>
          <span>SHA-256 Verified</span>
        </div>
      </footer>
    </div>
  );
}
