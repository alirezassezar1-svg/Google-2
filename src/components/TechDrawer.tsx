import React from 'react';
import {
  X,
  ExternalLink,
  GitBranch,
  Star,
  GitCompare,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { TechRecord } from '../types.ts';
import { DICT, Language } from '../i18n/translations.ts';

interface TechDrawerProps {
  tech: TechRecord | null;
  onClose: () => void;
  lang: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isInCompare: boolean;
  onToggleCompare: (id: string) => void;
  onAddToStack: (tech: TechRecord) => void;
}

export const TechDrawer: React.FC<TechDrawerProps> = ({
  tech,
  onClose,
  lang,
  isFavorite,
  onToggleFavorite,
  isInCompare,
  onToggleCompare,
  onAddToStack
}) => {
  if (!tech) return null;
  const t = DICT[lang];

  const difficultyLabels: Record<number, { label: string; desc: string }> = {
    1: { label: 'Introductory (Level 1)', desc: 'Approachable syntax, minimal boilerplate, intuitive concepts.' },
    2: { label: 'Moderate (Level 2)', desc: 'Standard industrial conventions; requires understanding asynchronous or reactive flows.' },
    3: { label: 'Intermediate (Level 3)', desc: 'Strict typing, lifecycle management, or architectural patterns required.' },
    4: { label: 'Advanced (Level 4)', desc: 'Low-level memory management, distributed concurrency, or deep systems knowledge required.' },
    5: { label: 'Specialized (Level 5)', desc: 'Custom bytecode, formal verification, or specialized niche domain architecture.' }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-slate-900 border-l rtl:border-l-0 rtl:border-r border-slate-700/80 h-full flex flex-col shadow-2xl overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tech-drawer-title"
      >
        {/* Drawer Header */}
        <div className="sticky top-0 z-10 glass-panel border-b px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-mono font-bold text-base">
              {tech.categoryCode}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="tech-drawer-title" className="text-lg font-bold text-slate-100">
                  {tech.name}
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {tech.type}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {t.verifiedBadge}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {tech.category} · {tech.subcategory}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(tech.id)}
              className={`p-2 rounded-lg border transition ${
                isFavorite
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle Favorite"
              aria-label="Toggle Favorite"
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-slate-200 transition"
              aria-label="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Action Bar */}
        <div className="bg-slate-850 px-6 py-2.5 border-b border-slate-800 flex flex-wrap items-center gap-2">
          <button
            onClick={() => onToggleCompare(tech.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              isInCompare
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{isInCompare ? t.removeFromCompare : t.addToCompare}</span>
          </button>

          <button
            onClick={() => onAddToStack(tech)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 transition"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.addToStack}</span>
          </button>

          {tech.docsUrl && (
            <a
              href={tech.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300 hover:text-sky-400 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Docs</span>
            </a>
          )}

          {tech.repoUrl && (
            <a
              href={tech.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300 hover:text-sky-400 transition"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          )}
        </div>

        {/* Drawer Content */}
        <div className="p-6 space-y-6 text-xs text-slate-300">
          {/* Main Purpose & Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              Core Purpose & Specification
            </h3>
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              {tech.shortDescription}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {tech.detailedExplanation}
            </p>
          </div>

          {/* Quick Attribute Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <span className="text-[11px] text-slate-500 block">Architectural Role</span>
              <span className="font-medium text-slate-200 capitalize">{tech.role}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">License Model</span>
              <span className="font-medium text-slate-200">{tech.license}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Offline Capable</span>
              <span className={`font-medium ${tech.compatibility.offlineCapable ? 'text-emerald-400' : 'text-amber-400'}`}>
                {tech.compatibility.offlineCapable ? 'Fully Capable' : 'Network Required'}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Runtime Environment</span>
              <span className="font-medium text-slate-200">{tech.runtimeRequirements}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Build Requirements</span>
              <span className="font-medium text-slate-200">{tech.buildRequirements}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Last Verified</span>
              <span className="font-medium text-slate-200 font-mono">{tech.verifiedDate}</span>
            </div>
          </div>

          {/* Learning Difficulty (with subjective scale explanation) */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Learning Difficulty: {difficultyLabels[tech.learningDifficulty]?.label}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(lvl => (
                  <div
                    key={lvl}
                    className={`w-5 h-2 rounded-sm ${
                      lvl <= tech.learningDifficulty
                        ? lvl <= 2 ? 'bg-emerald-500' : lvl <= 3 ? 'bg-sky-500' : 'bg-amber-500'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              {difficultyLabels[tech.learningDifficulty]?.desc}
            </p>
          </div>

          {/* Typical Use Cases */}
          {tech.typicalUseCases.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Typical Use Cases
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.typicalUseCases.map((uc, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700/80 text-[11px]"
                  >
                    {uc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Strengths & Limitations */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <h4 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Key Advantages
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {tech.advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2">
              <h4 className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Limitations & Trade-offs
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {tech.limitations.map((lim, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ecosystem Relationships */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300">Ecosystem Relationships</h4>
            <div className="grid sm:grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-slate-500 block">Complementary Technologies:</span>
                <span className="text-slate-300">
                  {tech.relations.complementary.length > 0 ? tech.relations.complementary.join(', ') : 'None listed'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Common Alternatives:</span>
                <span className="text-slate-300">
                  {tech.relations.alternatives.length > 0 ? tech.relations.alternatives.join(', ') : 'None listed'}
                </span>
              </div>
            </div>
          </div>

          {/* Security & Maintenance Notes */}
          <div className="p-3.5 rounded-xl bg-sky-950/20 border border-sky-500/20 space-y-1.5">
            <h4 className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Security & Maintenance Hygiene
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {tech.securityNotes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
