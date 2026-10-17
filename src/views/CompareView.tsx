import React from 'react';
import {
  GitCompare,
  Trash2,
  Download,
  FileSpreadsheet,
  Printer,
  Plus,
  CheckCircle2,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { TechRecord } from '../types.ts';
import { DICT, Language } from '../i18n/translations.ts';
import { downloadFile, exportComparisonToCSV } from '../services/storage.ts';

interface CompareViewProps {
  compareIds: string[];
  catalogMap: Map<string, TechRecord>;
  allCatalog: TechRecord[];
  onRemoveFromCompare: (id: string) => void;
  onAddToCompare: (id: string) => void;
  onClearCompare: () => void;
  lang: Language;
  onSelectTech: (tech: TechRecord) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  compareIds,
  catalogMap,
  allCatalog,
  onRemoveFromCompare,
  onAddToCompare,
  onClearCompare,
  lang,
  onSelectTech
}) => {
  const t = DICT[lang];

  const compareTechs = compareIds
    .map(id => catalogMap.get(id))
    .filter((t): t is TechRecord => !!t);

  const handleExportCSV = () => {
    if (compareTechs.length === 0) return;
    const csv = exportComparisonToCSV(compareTechs);
    downloadFile(csv, `tech-comparison-${Date.now()}.csv`, 'text/csv');
  };

  const handleExportJSON = () => {
    if (compareTechs.length === 0) return;
    const jsonStr = JSON.stringify(compareTechs, null, 2);
    downloadFile(jsonStr, `tech-comparison-${Date.now()}.json`, 'application/json');
  };

  const handlePrint = () => {
    window.print();
  };

  const availableToAdd = allCatalog.filter(c => !compareIds.includes(c.id));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Export Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>{t.navCompare}</span>
            <span className="text-xs font-mono font-normal text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
              {compareTechs.length} / 4 Selected
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'en'
              ? 'Evaluate 2 to 4 technologies side-by-side across architecture, runtime, and licensing attributes.'
              : 'مقایسه رو در روی ۲ تا ۴ فناوری از حیث کارکرد، محیط اجرا، سختی یادگیری و الزامات معماری.'}
          </p>
        </div>

        {compareTechs.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.exportCsv}</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.exportJson}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.printReport}</span>
            </button>

            <button
              onClick={onClearCompare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-medium transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.compareClear}</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Add Bar if less than 4 */}
      {compareTechs.length < 4 && (
        <div className="p-3.5 rounded-xl glass-card flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {lang === 'en' ? 'Add technology to comparison table:' : 'افزودن فناوری به جدول مقایسه:'}
          </span>
          <div className="flex items-center gap-2">
            <select
              aria-label="Add technology to compare"
              onChange={e => {
                if (e.target.value) {
                  onAddToCompare(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="" disabled>
                {lang === 'en' ? 'Choose a technology...' : 'انتخاب یک فناوری...'}
              </option>
              {availableToAdd.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.categoryCode} - {t.type})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Empty State */}
      {compareTechs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-card space-y-3">
          <GitCompare className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-200">
            {lang === 'en' ? 'No technologies selected for comparison' : 'هیچ فناوری برای مقایسه انتخاب نشده است'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {lang === 'en'
              ? 'Select 2 to 4 technologies from the Explorer or choose one above to compare attributes.'
              : '۲ تا ۴ فناوری را از کاوشگر یا کادر بالا انتخاب کنید تا جدول مقایسه دقیق آنها نمایش داده شود.'}
          </p>
        </div>
      ) : (
        /* Comparison Table */
        <div className="overflow-x-auto rounded-2xl glass-card border border-slate-800">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="p-4 text-slate-400 font-semibold w-48 min-w-[160px] sticky left-0 rtl:left-auto rtl:right-0 bg-slate-950 z-10">
                  Attribute / Component
                </th>
                {compareTechs.map(tech => (
                  <th key={tech.id} className="p-4 min-w-[240px] max-w-[300px]">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-sm text-slate-100">{tech.name}</span>
                      <button
                        onClick={() => onRemoveFromCompare(tech.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition"
                        title="Remove"
                        aria-label={`Remove ${tech.name}`}
                      >
                        ×
                      </button>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 block w-max">
                      {tech.categoryCode} · {tech.type}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {/* Category */}
              <tr>
                <td className="p-4 font-medium text-slate-400 bg-slate-950/40 sticky left-0 rtl:left-auto rtl:right-0">
                  Primary Category
                </td>
                {compareTechs.map(t => (
                  <td key={t.id} className="p-4">
                    {t.category}
                  </td>
                ))}
              </tr>

              {/* Main Purpose */}
              <tr>
                <td className="p-4 font-medium text-slate-400 bg-slate-950/40 sticky left-0 rtl:left-auto rtl:right-0">
                  Core Purpose
                </td>
                {compareTechs.map(t => (
                  <td key={t.id} className="p-4 font-medium text-slate-200 leading-relaxed">
                    {t.mainPurpose}
                  </td>
                ))}
              </tr>

              {/* Role */}
              <tr>
                <td className="p-4 font-medium text-slate-400 bg-slate-950/40 sticky left-0 rtl:left-auto rtl:right-0">
                  Architectural Role
                </td>
                {compareTechs.map(t => (
                  <td key={t.id} className="p-4 capitalize">
                    {t.role}
                  </td>
                ))}
              </tr>

              {/* Runtime Requirements */}
              <tr>
                <td className="p-4 font-medium text-slate-400 bg-slate-950/40 sticky left-0 rtl:left-auto rtl:right-0">
                  Runtime Requirements
                </td>
                {compareTechs.map(t => (
                  <td key={t.id} className="p-4">
                    {t.runtimeRequirements}
                  </td>
                ))}
              </tr>

              {/* Build Tooling */}
              <tr>
                <td className="p-4 font-medium text-slate-400 bg-slate-950/40 sticky left-0 rtl:left-auto rtl:right-0">
                  Build Requirements
                </td>
                {compareTechs.map(t => (
                  <td key={t.id} className="p-4">
                    {t.buildRequirements}
                  </td>
                ))}
              </tr>

              {/* Offline Capability */}
              <tr>
                <td className="p-4 font-medium text-slate-400 bg-slate-950/40 sticky left-0 rtl:left-auto rtl:right-0">
                  Offline Suitability
                </td>
                {compareTechs.map(t => (
                  <td key={t.id} className="p-4">
                    <span
                      className={`font-semibold ${
                        t.compatibility.offlineCapable ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {t.compatibility.offlineCapable ? 'Fully Offline Capable' : 'Network Connectivity Required'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Learning Difficulty */}
              <tr>
                <td className="p-4 font-medium text-slate-400 bg-slate-950/40 sticky left-0 rtl:left-auto rtl:right-0">
                  Learning Difficulty (1-5)
                </td>
                {compareTechs.map(t => (
                  <td key={t.id} className="p-4">
                    <span className="font-mono font-bold text-sky-400">
                      Level {t.learningDifficulty} / 5
                    </span>
                  </td>
                ))}
              </tr>

              {/* Key Strengths */}
              <tr>
                <td className="p-4 font-medium text-slate-400 bg-slate-950/40 sticky left-0 rtl:left-auto rtl:right-0">
                  Key Strengths
                </td>
                {compareTechs.map(t => (
                  <td key={t.id} className="p-4 space-y-1">
                    {t.advantages.map((adv, idx) => (
                      <div key={idx} className="flex items-start gap-1 text-[11px] text-emerald-300">
                        <span>•</span>
                        <span>{adv}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>

              {/* Limitations */}
              <tr>
                <td className="p-4 font-medium text-slate-400 bg-slate-950/40 sticky left-0 rtl:left-auto rtl:right-0">
                  Known Limitations
                </td>
                {compareTechs.map(t => (
                  <td key={t.id} className="p-4 space-y-1">
                    {t.limitations.map((lim, idx) => (
                      <div key={idx} className="flex items-start gap-1 text-[11px] text-amber-300">
                        <span>•</span>
                        <span>{lim}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>

              {/* License */}
              <tr>
                <td className="p-4 font-medium text-slate-400 bg-slate-950/40 sticky left-0 rtl:left-auto rtl:right-0">
                  License & Governance
                </td>
                {compareTechs.map(t => (
                  <td key={t.id} className="p-4 font-mono text-[11px]">
                    {t.license}
                  </td>
                ))}
              </tr>

              {/* Action row */}
              <tr>
                <td className="p-4 font-medium text-slate-400 bg-slate-950/40 sticky left-0 rtl:left-auto rtl:right-0">
                  Technical Profile
                </td>
                {compareTechs.map(tech => (
                  <td key={tech.id} className="p-4">
                    <button
                      onClick={() => onSelectTech(tech)}
                      className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition"
                    >
                      {t.viewDetails || 'View Profile'}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
