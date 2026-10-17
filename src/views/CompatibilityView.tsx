import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  X,
  Plus,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { TechRecord, CompatibilityFinding } from '../types.ts';
import { evaluateStackCompatibility } from '../logic/rules.ts';
import { DICT, Language } from '../i18n/translations.ts';

interface CompatibilityViewProps {
  catalog: TechRecord[];
  catalogMap: Map<string, TechRecord>;
  lang: Language;
  onSelectTech: (tech: TechRecord) => void;
}

export const CompatibilityView: React.FC<CompatibilityViewProps> = ({
  catalog,
  catalogMap,
  lang,
  onSelectTech
}) => {
  const t = DICT[lang];

  // Default test stack with known interesting attributes
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'host-gh-pages',
    'be-express',
    'db-postgres',
    'lang-javascript'
  ]);

  const findings: CompatibilityFinding[] = useMemo(() => {
    return evaluateStackCompatibility(selectedIds, catalogMap);
  }, [selectedIds, catalogMap]);

  const addComponent = (id: string) => {
    if (!id || selectedIds.includes(id)) return;
    setSelectedIds([...selectedIds, id]);
  };

  const removeComponent = (id: string) => {
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  const availableCatalog = catalog.filter(t => !selectedIds.includes(t.id));

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>{t.labTitle}</span>
            <span className="text-xs font-mono font-normal text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
              Deterministic Rules Engine
            </span>
          </h2>
          <p className="text-xs text-slate-400">{t.labSubtitle}</p>
        </div>

        {selectedIds.length > 0 && (
          <button
            onClick={() => setSelectedIds([])}
            className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Stack</span>
          </button>
        )}
      </div>

      {/* Selector Box */}
      <div className="p-5 rounded-2xl glass-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {t.selectComponents} ({selectedIds.length})
          </label>

          <select
            aria-label="Add component to audit"
            onChange={e => {
              addComponent(e.target.value);
              e.target.value = '';
            }}
            defaultValue=""
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 max-w-xs"
          >
            <option value="" disabled>
              + Add component to audit...
            </option>
            {availableCatalog.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.categoryCode} · {item.type})
              </option>
            ))}
          </select>
        </div>

        {/* Selected Component Badges */}
        <div className="flex flex-wrap gap-2">
          {selectedIds.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">
              No components selected. Choose items above to evaluate compatibility constraints.
            </p>
          ) : (
            selectedIds.map(id => {
              const item = catalogMap.get(id);
              if (!item) return null;
              return (
                <div
                  key={id}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center gap-2 text-xs"
                >
                  <span className="font-mono text-[10px] text-sky-400">{item.categoryCode}</span>
                  <span className="font-semibold text-slate-200">{item.name}</span>
                  <button
                    onClick={() => removeComponent(id)}
                    className="text-slate-500 hover:text-rose-400 transition"
                    title="Remove"
                    aria-label={`Remove ${item.name}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Audit Findings */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200 flex items-center justify-between">
          <span>Audit Findings & Diagnostic Reports</span>
          <span className="text-xs font-mono text-slate-400 font-normal">
            {findings.length} Finding{findings.length === 1 ? '' : 's'}
          </span>
        </h3>

        {findings.length === 0 ? (
          <div className="p-8 text-center rounded-2xl glass-card space-y-2 border-emerald-500/20 bg-emerald-950/10">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-100">Zero Incompatible Conflicts Found</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              All selected technologies pass the active platform rules for runtime execution, hosting constraints, and architectural separation.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {findings.map(f => {
              const isError = f.severity === 'error';
              const isWarning = f.severity === 'warning';

              return (
                <div
                  key={f.ruleId}
                  className={`p-5 rounded-2xl border space-y-3 transition ${
                    isError
                      ? 'bg-rose-950/20 border-rose-500/40'
                      : isWarning
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : 'bg-sky-950/20 border-sky-500/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {isError ? (
                        <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      ) : (
                        <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-slate-100">{f.title}</h4>
                        <span className="text-[10px] font-mono text-slate-400 block">
                          Rule ID: {f.ruleId}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          isError
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : isWarning
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        }`}
                      >
                        {f.severity}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        {f.evidenceStatus}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
                    <div>
                      <span className="text-[11px] text-slate-400 block mb-0.5 font-semibold">
                        Technical Reason:
                      </span>
                      <p className="text-slate-300 leading-relaxed">{f.reason}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[11px] text-sky-400 block mb-0.5 font-semibold">
                        Suggested Resolution:
                      </span>
                      <p className="text-sky-200 leading-relaxed">{f.suggestedResolution}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
