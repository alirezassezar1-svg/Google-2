import React from 'react';
import {
  Compass,
  Grid,
  FolderTree,
  GitCompare,
  Cpu,
  Map as MapIcon,
  Sparkles,
  ShieldAlert,
  BookOpen,
  BookmarkCheck,
  HardDriveDownload,
  Settings
} from 'lucide-react';
import { DICT, Language } from '../i18n/translations.ts';

export type ActiveModule =
  | 'overview'
  | 'explorer'
  | 'categories'
  | 'compare'
  | 'stackBuilder'
  | 'archMap'
  | 'advisor'
  | 'compatibility'
  | 'glossary'
  | 'projects'
  | 'importExport'
  | 'settings';

interface NavigationProps {
  activeModule: ActiveModule;
  onChangeModule: (m: ActiveModule) => void;
  lang: Language;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeModule,
  onChangeModule,
  lang
}) => {
  const t = DICT[lang];

  const modules = [
    { id: 'overview', label: t.navOverview, icon: Compass },
    { id: 'explorer', label: t.navExplorer, icon: Grid },
    { id: 'categories', label: t.navCategories, icon: FolderTree },
    { id: 'compare', label: t.navCompare, icon: GitCompare },
    { id: 'stackBuilder', label: t.navStackBuilder, icon: Cpu },
    { id: 'archMap', label: t.navArchMap, icon: MapIcon },
    { id: 'advisor', label: t.navAdvisor, icon: Sparkles },
    { id: 'compatibility', label: t.navCompatibility, icon: ShieldAlert },
    { id: 'glossary', label: t.navGlossary, icon: BookOpen },
    { id: 'projects', label: t.navProjects, icon: BookmarkCheck },
    { id: 'importExport', label: t.navImportExport, icon: HardDriveDownload },
    { id: 'settings', label: t.navSettings, icon: Settings }
  ] as const;

  return (
    <div className="w-full max-w-full overflow-hidden border-b glass-panel">
      <nav className="w-full max-w-full overflow-x-auto scrollbar-none px-3 lg:px-8 py-1.5 flex items-center gap-1">
        {modules.map(mod => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => onChangeModule(mod.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{mod.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
