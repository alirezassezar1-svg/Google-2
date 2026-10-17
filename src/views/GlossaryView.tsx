import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Code2,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossary.ts';
import { TechRecord } from '../types.ts';
import { DICT, Language } from '../i18n/translations.ts';

interface GlossaryViewProps {
  catalogMap: Map<string, TechRecord>;
  lang: Language;
  onSelectTech: (tech: TechRecord) => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({
  catalogMap,
  lang,
  onSelectTech
}) => {
  const t = DICT[lang];

  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(term => {
      if (levelFilter !== 'all' && term.level !== levelFilter) {
        return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchEn = term.termEn.toLowerCase().includes(q) || term.definitionEn.toLowerCase().includes(q);
        const matchFa = term.termFa.toLowerCase().includes(q) || term.definitionFa.toLowerCase().includes(q);
        if (!matchEn && !matchFa) return false;
      }
      return true;
    });
  }, [query, levelFilter]);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>{t.navGlossary}</span>
          <span className="text-xs font-mono font-normal text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
            {GLOSSARY_TERMS.length} Terms Defined
          </span>
        </h2>
        <p className="text-xs text-slate-400">
          {lang === 'en'
            ? 'Bilingual software engineering glossary with definitions, live code examples, and related catalog technologies.'
            : 'واژه‌نامه دوزبانه تخصصی مهندسی نرم‌افزار همراه با تعاریف دقیق، نمونه‌کدهای واقعی و پیوند به فناوری‌های مرتبط.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            aria-label="Search glossary"
            placeholder={lang === 'en' ? 'Search terms, concepts, definitions...' : 'جستجوی اصطلاحات، تعاریف و مفاهیم...'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-medium mr-1 rtl:mr-0 rtl:ml-1">Level:</span>
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-2.5 py-1 rounded-md capitalize transition ${
                levelFilter === lvl
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-700/80'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Term Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTerms.map(term => {
          return (
            <div
              key={term.id}
              className="p-5 rounded-2xl glass-card border border-slate-800 space-y-4 hover:border-sky-500/30 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">
                      {lang === 'en' ? term.termEn : term.termFa}
                    </h3>
                    <span className="text-xs text-sky-400 font-medium block">
                      {lang === 'en' ? term.termFa : term.termEn}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                      term.level === 'beginner'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : term.level === 'intermediate'
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {term.level}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en' ? term.definitionEn : term.definitionFa}
                </p>

                {/* Practical Example */}
                {term.example && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto whitespace-pre">
                    {term.example}
                  </div>
                )}
              </div>

              {/* Related Technologies */}
              {term.relatedTechIds.length > 0 && (
                <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">
                    Related Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {term.relatedTechIds.map(techId => {
                      const tRecord = catalogMap.get(techId);
                      if (!tRecord) return null;
                      return (
                        <button
                          key={techId}
                          onClick={() => onSelectTech(tRecord)}
                          className="px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-[11px] text-slate-300 hover:text-sky-300 transition"
                        >
                          {tRecord.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
