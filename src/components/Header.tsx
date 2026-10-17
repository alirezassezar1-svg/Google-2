import React from 'react';
import { Search, Globe, Moon, Sun, Layers, GitCompare } from 'lucide-react';
import { DICT, Language } from '../i18n/translations.ts';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  compareCount: number;
  onOpenCompare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  compareCount,
  onOpenCompare
}) => {
  const t = DICT[lang];

  return (
    <header className="sticky top-0 z-40 w-full max-w-full glass-panel border-b px-2.5 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-1.5 overflow-hidden">
      {/* Brand */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
          <Layers className="w-4 h-4" />
        </div>
        <h1 className="text-xs sm:text-sm font-bold tracking-tight text-slate-100 hidden xs:block">
          {t.appTitle}
        </h1>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 min-w-0 max-w-[120px] sm:max-w-xs md:max-w-md relative">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 rtl:left-auto rtl:right-2 pointer-events-none" />
          <input
            type="text"
            aria-label={t.searchPlaceholder}
            placeholder={lang === 'en' ? 'Search...' : 'جستجو...'}
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-700/60 rounded-lg pl-6 pr-2 rtl:pl-2 rtl:pr-6 py-1 text-[11px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-all truncate"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {compareCount > 0 && (
          <button
            onClick={onOpenCompare}
            className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/30 text-[10px] font-medium"
            title={t.navCompare}
            aria-label={`${t.navCompare} (${compareCount})`}
          >
            <GitCompare className="w-3 h-3" />
            <span className="w-3.5 h-3.5 rounded-full bg-sky-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
              {compareCount}
            </span>
          </button>
        )}

        <button
          onClick={onToggleLang}
          className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-medium"
          aria-label={`Switch language`}
        >
          <Globe className="w-3 h-3 text-sky-400" />
          <span>{lang === 'en' ? 'FA' : 'EN'}</span>
        </button>

        <button
          onClick={onToggleTheme}
          className="p-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
          aria-label={`Switch theme`}
        >
          {theme === 'dark' ? (
            <Sun className="w-3 h-3 text-amber-400" />
          ) : (
            <Moon className="w-3 h-3 text-indigo-400" />
          )}
        </button>
      </div>
    </header>
  );
};
