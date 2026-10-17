import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Star,
  GitCompare,
  ArrowUpDown,
  ExternalLink,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { TechRecord } from '../types.ts';
import { CATEGORIES } from '../data/categories.ts';
import { DICT, Language } from '../i18n/translations.ts';

interface ExplorerViewProps {
  catalog: TechRecord[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  lang: Language;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  compareList: string[];
  onToggleCompare: (id: string) => void;
  onSelectTech: (tech: TechRecord) => void;
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({
  catalog,
  searchQuery,
  onSearchChange,
  lang,
  favorites,
  onToggleFavorite,
  compareList,
  onToggleCompare,
  onSelectTech
}) => {
  const t = DICT[lang];

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'diff-asc' | 'diff-desc' | 'cat'>('name-asc');
  const [offlineOnly, setOfflineOnly] = useState<boolean>(false);

  const roles = [
    'frontend',
    'backend',
    'fullstack',
    'mobile',
    'desktop',
    'ai',
    'database',
    'infra',
    'tooling'
  ];

  const types = [
    'Language',
    'Framework',
    'Library',
    'Runtime',
    'Database',
    'Build Tool',
    'Package Manager',
    'Protocol',
    'Platform',
    'Service',
    'Storage'
  ];

  const filteredCatalog = useMemo(() => {
    let list = catalog.filter(tech => {
      // Category filter
      if (selectedCategory !== 'ALL' && tech.categoryCode !== selectedCategory) {
        return false;
      }
      // Role filter
      if (selectedRole !== 'ALL' && tech.role !== selectedRole) {
        return false;
      }
      // Type filter
      if (selectedType !== 'ALL' && tech.type !== selectedType) {
        return false;
      }
      // Offline filter
      if (offlineOnly && !tech.compatibility.offlineCapable) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inName = tech.name.toLowerCase().includes(q);
        const inAliases = tech.aliases.some(a => a.toLowerCase().includes(q));
        const inDesc = tech.shortDescription.toLowerCase().includes(q);
        const inPurpose = tech.mainPurpose.toLowerCase().includes(q);
        const inCases = tech.typicalUseCases.some(c => c.toLowerCase().includes(q));
        const inCategory = tech.category.toLowerCase().includes(q);
        if (!inName && !inAliases && !inDesc && !inPurpose && !inCases && !inCategory) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'diff-asc') return a.learningDifficulty - b.learningDifficulty;
      if (sortBy === 'diff-desc') return b.learningDifficulty - a.learningDifficulty;
      if (sortBy === 'cat') return a.categoryCode.localeCompare(b.categoryCode);
      return 0;
    });

    return list;
  }, [catalog, selectedCategory, selectedRole, selectedType, offlineOnly, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory('ALL');
    setSelectedRole('ALL');
    setSelectedType('ALL');
    setOfflineOnly(false);
    onSearchChange('');
    setSortBy('name-asc');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>{t.navExplorer}</span>
            <span className="text-xs font-mono font-normal text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
              {filteredCatalog.length} / {catalog.length}
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'en'
              ? 'Filter and inspect verified software specifications across all architectural tiers.'
              : 'کاوش و بررسی مشخصات فنی معتبر در تمام لایه‌های معماری نرم‌افزار.'}
          </p>
        </div>

        {/* Reset button */}
        {(selectedCategory !== 'ALL' || selectedRole !== 'ALL' || selectedType !== 'ALL' || offlineOnly || searchQuery) && (
          <button
            onClick={resetAllFilters}
            className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetFilters}</span>
          </button>
        )}
      </div>

      {/* Granular Filter Bar */}
      <div className="p-4 rounded-xl glass-card space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Category Dropdown */}
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              {t.allCategories}
            </label>
            <select
              aria-label={t.allCategories}
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">{t.allCategories}</option>
              {CATEGORIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.code}. {lang === 'en' ? c.name : c.nameFa}
                </option>
              ))}
            </select>
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              {t.allRoles}
            </label>
            <select
              aria-label={t.allRoles}
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 capitalize"
            >
              <option value="ALL">{t.allRoles}</option>
              {roles.map(r => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Type Dropdown */}
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              {t.allTypes}
            </label>
            <select
              aria-label={t.allTypes}
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">{t.allTypes}</option>
              {types.map(tp => (
                <option key={tp} value={tp}>
                  {tp}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              {t.sortBy}
            </label>
            <select
              aria-label={t.sortBy}
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="name-asc">{t.nameAsc}</option>
              <option value="name-desc">{t.nameDesc}</option>
              <option value="diff-asc">{t.diffAsc}</option>
              <option value="diff-desc">{t.diffDesc}</option>
              <option value="cat">{t.categoryAsc}</option>
            </select>
          </div>
        </div>

        {/* Offline Checkbox */}
        <div className="pt-1 flex items-center justify-between border-t border-slate-800 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={offlineOnly}
              onChange={e => setOfflineOnly(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-sky-500 focus:ring-0"
            />
            <span>{lang === 'en' ? 'Show offline-capable technologies only' : 'تنها نمایش فناوری‌های با قابلیت کارکرد آفلاین'}</span>
          </label>

          <span className="text-[11px] text-slate-500 font-mono">
            Showing {filteredCatalog.length} results
          </span>
        </div>
      </div>

      {/* Empty State */}
      {filteredCatalog.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-card space-y-3">
          <Search className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-200">{t.noResultsFound}</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {lang === 'en'
              ? 'Try relaxing your search terms or clearing role and category filters.'
              : 'عبارت جستجو را تغییر دهید یا فیلترهای دسته و نقش را پاک کنید.'}
          </p>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 rounded-lg bg-sky-500 text-slate-950 font-semibold text-xs transition hover:bg-sky-400"
          >
            {t.clearFilters}
          </button>
        </div>
      ) : (
        /* Results Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCatalog.map(tech => {
            const isFav = favorites.includes(tech.id);
            const inComp = compareList.includes(tech.id);

            return (
              <div
                key={tech.id}
                className="p-4 rounded-xl glass-card flex flex-col justify-between hover:border-sky-500/30 transition group"
              >
                <div>
                  {/* Card Top: Category code & actions */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {tech.categoryCode} · {tech.type}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onToggleFavorite(tech.id)}
                        className={`p-1.5 rounded-md hover:bg-slate-800 transition ${
                          isFav ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title="Star Favorite"
                        aria-label={`Favorite ${tech.name}`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                      </button>

                      <button
                        onClick={() => onToggleCompare(tech.id)}
                        className={`p-1.5 rounded-md hover:bg-slate-800 transition ${
                          inComp ? 'text-sky-400 bg-sky-500/10' : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title={inComp ? t.removeFromCompare : t.addToCompare}
                        aria-label={`Compare ${tech.name}`}
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="mb-2">
                    <h3
                      onClick={() => onSelectTech(tech)}
                      className="text-base font-bold text-slate-100 group-hover:text-sky-400 cursor-pointer transition flex items-center gap-2"
                    >
                      {tech.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="capitalize">{tech.role}</span>
                      <span>·</span>
                      <span className="font-mono text-[10px]">Diff: {tech.learningDifficulty}/5</span>
                      {tech.compatibility.offlineCapable && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-400">Offline</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
                    {tech.shortDescription}
                  </p>
                </div>

                {/* Card Bottom: Open Drawer Button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {tech.license}
                  </span>
                  <button
                    onClick={() => onSelectTech(tech)}
                    className="text-sky-400 hover:text-sky-300 font-medium text-[11px] flex items-center gap-1"
                  >
                    <span>{t.viewDetails}</span>
                    <span className="rtl:rotate-180">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
