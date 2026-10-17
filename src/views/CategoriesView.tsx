import React from 'react';
import {
  Code2,
  Layout,
  Layers,
  Server,
  Smartphone,
  Palette,
  Activity,
  Cpu,
  Wrench,
  Database,
  Network,
  Cloud,
  FileText,
  Sparkles,
  ShieldCheck,
  GitFork,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/categories.ts';
import { TechRecord } from '../types.ts';
import { DICT, Language } from '../i18n/translations.ts';

interface CategoriesViewProps {
  catalog: TechRecord[];
  lang: Language;
  onSelectCategoryInExplorer: (code: string) => void;
  onSelectTech: (tech: TechRecord) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  catalog,
  lang,
  onSelectCategoryInExplorer,
  onSelectTech
}) => {
  const t = DICT[lang];

  const iconMap: Record<string, any> = {
    Code2,
    Layout,
    Layers,
    Server,
    Smartphone,
    Palette,
    Activity,
    Cpu,
    Wrench,
    Database,
    Network,
    Cloud,
    FileText,
    Sparkles,
    ShieldCheck,
    GitFork
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>{t.navCategories}</span>
          <span className="text-xs font-mono font-normal text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
            16 Taxonomy Domains
          </span>
        </h2>
        <p className="text-xs text-slate-400">
          {lang === 'en'
            ? 'Structured classification of 220+ verified technologies across categories A through P.'
            : 'دسته‌بندی ساختاریافته بیش از ۲۲۰ فناوری معتبر نرم‌افزار در قالب گروه‌های تخصصی A تا P.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map(cat => {
          const Icon = iconMap[cat.icon] || Layers;
          const itemsInCat = catalog.filter(tech => tech.categoryCode === cat.code);

          return (
            <div
              key={cat.code}
              className="p-5 rounded-2xl glass-card border flex flex-col justify-between hover:border-sky-500/30 transition group"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold font-mono">
                      {cat.code}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-100">
                        {lang === 'en' ? cat.name : cat.nameFa}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">
                        {itemsInCat.length} Technologies
                      </span>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                    <Icon className="w-4 h-4 text-sky-400" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {lang === 'en' ? cat.descriptionEn : cat.descriptionFa}
                </p>

                {/* Sample items pill-list */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {itemsInCat.slice(0, 8).map(tech => (
                    <button
                      key={tech.id}
                      onClick={() => onSelectTech(tech)}
                      className="px-2 py-0.5 rounded-md bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border border-slate-800 text-[11px] transition"
                    >
                      {tech.name}
                    </button>
                  ))}
                  {itemsInCat.length > 8 && (
                    <span className="px-1.5 py-0.5 text-[11px] text-slate-500 font-mono">
                      +{itemsInCat.length - 8} more
                    </span>
                  )}
                </div>
              </div>

              {/* View in Explorer button */}
              <div className="pt-3 border-t border-slate-800/80 flex justify-end">
                <button
                  onClick={() => onSelectCategoryInExplorer(cat.code)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition"
                >
                  <span>{lang === 'en' ? `Browse all ${cat.code} in Explorer` : `مشاهده تمام موارد ${cat.code}`}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
