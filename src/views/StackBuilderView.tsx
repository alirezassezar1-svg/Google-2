import React, { useState, useMemo } from 'react';
import {
  Cpu,
  Layers,
  Save,
  Download,
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  Globe,
  Play
} from 'lucide-react';
import { TechRecord, StackSelection, ProjectRecord, CompatibilityFinding } from '../types.ts';
import { evaluateStackCompatibility } from '../logic/rules.ts';
import { DICT, Language } from '../i18n/translations.ts';
import { downloadFile, generateCryptoFingerprint, getLivePlaygroundUrl } from '../services/storage.ts';

interface StackBuilderViewProps {
  currentStack: StackSelection;
  onChangeStack: (s: StackSelection) => void;
  catalog: TechRecord[];
  catalogMap: Map<string, TechRecord>;
  lang: Language;
  onSaveProject: (p: ProjectRecord) => void;
}

export const StackBuilderView: React.FC<StackBuilderViewProps> = ({
  currentStack,
  onChangeStack,
  catalog,
  catalogMap,
  lang,
  onSaveProject
}) => {
  const t = DICT[lang];

  const [projectName, setProjectName] = useState('My Custom Architecture');
  const [projectNotes, setProjectNotes] = useState('');
  const [projectLiveUrl, setProjectLiveUrl] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Group technologies by tiers
  const languages = useMemo(() => catalog.filter(t => t.type === 'Language'), [catalog]);
  const frontends = useMemo(() => catalog.filter(t => t.categoryCode === 'B' || t.categoryCode === 'E'), [catalog]);
  const backends = useMemo(() => catalog.filter(t => t.categoryCode === 'D' || t.categoryCode === 'C'), [catalog]);
  const runtimes = useMemo(() => catalog.filter(t => t.categoryCode === 'H'), [catalog]);
  const buildTools = useMemo(() => catalog.filter(t => t.categoryCode === 'I'), [catalog]);
  const databases = useMemo(() => catalog.filter(t => t.categoryCode === 'J'), [catalog]);
  const apiProtocols = useMemo(() => catalog.filter(t => t.categoryCode === 'K'), [catalog]);
  const hostings = useMemo(() => catalog.filter(t => t.categoryCode === 'L'), [catalog]);
  const testings = useMemo(() => catalog.filter(t => t.categoryCode === 'O'), [catalog]);
  const monitorings = useMemo(() => catalog.filter(t => t.categoryCode === 'P'), [catalog]);
  const ais = useMemo(() => catalog.filter(t => t.categoryCode === 'N'), [catalog]);

  // Selected tech IDs
  const selectedTechIds = useMemo(() => {
    return Object.values(currentStack).filter((id): id is string => Boolean(id));
  }, [currentStack]);

  // Real-time rules validation
  const findings: CompatibilityFinding[] = useMemo(() => {
    return evaluateStackCompatibility(selectedTechIds, catalogMap);
  }, [selectedTechIds, catalogMap]);

  const hasErrors = findings.some(f => f.severity === 'error');
  const hasWarnings = findings.some(f => f.severity === 'warning');

  const updateTier = (tier: keyof StackSelection, value: string) => {
    onChangeStack({
      ...currentStack,
      [tier]: value || undefined
    });
  };

  const loadPreset = (presetName: string) => {
    if (presetName === 'offline-pwa') {
      onChangeStack({
        language: 'lang-javascript',
        frontend: 'fe-alpine',
        runtime: 'rt-browser-engines',
        database: 'db-indexeddb',
        apiProtocol: 'net-http',
        hosting: 'host-gh-pages',
        testing: 'qa-webcrypto'
      });
      setProjectName('Offline PWA Stack');
    } else if (presetName === 'fullstack-ts') {
      onChangeStack({
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
      setProjectName('Modern Full-Stack TypeScript');
    } else if (presetName === 'python-ai') {
      onChangeStack({
        language: 'lang-python',
        frontend: 'fe-react',
        backend: 'be-fastapi',
        runtime: 'rt-python',
        buildTool: 'pm-uv',
        database: 'db-postgres',
        apiProtocol: 'net-sse',
        hosting: 'host-do',
        aiIntegration: 'ai-pytorch'
      });
      setProjectName('Python AI & Data Stack');
    } else if (presetName === 'mobile-flutter') {
      onChangeStack({
        language: 'lang-dart',
        frontend: 'mob-flutter',
        backend: 'be-nestjs',
        runtime: 'rt-nodejs',
        buildTool: 'pm-pub',
        database: 'db-postgres',
        apiProtocol: 'net-rest',
        hosting: 'host-do',
        testing: 'qa-vitest'
      });
      setProjectName('Cross-Platform Mobile Flutter');
    }
  };

  const handleSave = async () => {
    const fingerprint = await generateCryptoFingerprint({
      name: projectName,
      stack: currentStack,
      updatedAt: new Date().toISOString()
    });

    const project: ProjectRecord = {
      id: 'proj-' + Date.now().toString(36),
      name: projectName.trim() || 'Untitled Project',
      description: projectNotes.trim() || 'Custom architecture stack',
      stack: { ...currentStack },
      notes: projectNotes,
      tags: ['Custom', 'Stack'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fingerprint,
      liveUrl: projectLiveUrl.trim() || getLivePlaygroundUrl(currentStack)
    };

    onSaveProject(project);
    setShowSaveModal(false);
  };

  const handleExportSVG = () => {
    const svgEl = document.getElementById('architecture-svg');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    downloadFile(source, `architecture-stack-${Date.now()}.svg`, 'image/svg+xml');
  };

  const handleExportJSON = () => {
    const payload = {
      name: projectName,
      stack: currentStack,
      findings,
      exportedAt: new Date().toISOString()
    };
    downloadFile(JSON.stringify(payload, null, 2), `stack-${Date.now()}.json`, 'application/json');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>{t.stackTitle}</span>
            <span className="text-xs font-mono font-normal text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
              {selectedTechIds.length} Layers Active
            </span>
          </h2>
          <p className="text-xs text-slate-400">{t.stackSubtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Live Sandbox Execution Button */}
          <a
            href={getLivePlaygroundUrl(currentStack)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-md shadow-emerald-500/20"
            title="Launch live interactive sandbox on StackBlitz"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>{lang === 'fa' ? 'اجرای زنده در سندباکس' : 'Live Sandbox'}</span>
          </a>

          <button
            onClick={() => {
              setProjectLiveUrl(getLivePlaygroundUrl(currentStack));
              setShowSaveModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition shadow-md shadow-sky-500/20"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{t.saveProject}</span>
          </button>

          <button
            onClick={handleExportSVG}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>SVG</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>JSON</span>
          </button>

          <button
            onClick={() => onChangeStack({})}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs font-medium transition"
            title="Reset stack"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Quick-Buttons */}
      <div className="p-3.5 rounded-xl glass-card flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-medium mr-2 rtl:mr-0 rtl:ml-2">
          {t.loadPreset}:
        </span>
        <button
          onClick={() => loadPreset('offline-pwa')}
          className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition"
        >
          Offline-First PWA
        </button>
        <button
          onClick={() => loadPreset('fullstack-ts')}
          className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition"
        >
          Full-Stack TypeScript
        </button>
        <button
          onClick={() => loadPreset('python-ai')}
          className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition"
        >
          Python AI & Data
        </button>
        <button
          onClick={() => loadPreset('mobile-flutter')}
          className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition"
        >
          Mobile Flutter
        </button>
      </div>

      {/* Real-time Compatibility Banner */}
      <div
        className={`p-4 rounded-xl border transition ${
          hasErrors
            ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
            : hasWarnings
            ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
            : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          {hasErrors ? (
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          ) : hasWarnings ? (
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
          <h3 className="text-xs font-bold uppercase tracking-wider">
            {t.compatibilityStatus}
          </h3>
        </div>

        {findings.length === 0 ? (
          <p className="text-xs text-emerald-300">
            {t.noIssues}
          </p>
        ) : (
          <div className="space-y-3">
            {findings.map(f => (
              <div
                key={f.ruleId}
                className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className={f.severity === 'error' ? 'text-rose-400' : 'text-amber-400'}>
                    {f.title}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {f.ruleId}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{f.reason}</p>
                <p className="text-sky-300 text-[11px] pt-1">
                  <span className="font-semibold">Resolution: </span>
                  {f.suggestedResolution}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Multi-Tier Architectural Selector Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Language */}
        <div className="p-3.5 rounded-xl glass-card space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{t.tierLanguage}</span>
            <span className="text-[10px] text-sky-400 font-mono">Category A</span>
          </label>
          <select
            value={currentStack.language || ''}
            onChange={e => updateTier('language', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="">-- None / Default --</option>
            {languages.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Frontend Framework */}
        <div className="p-3.5 rounded-xl glass-card space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{t.tierFrontend}</span>
            <span className="text-[10px] text-sky-400 font-mono">Categories B/E</span>
          </label>
          <select
            value={currentStack.frontend || ''}
            onChange={e => updateTier('frontend', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="">-- None / Default --</option>
            {frontends.map(t => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.categoryCode})
              </option>
            ))}
          </select>
        </div>

        {/* Backend Framework */}
        <div className="p-3.5 rounded-xl glass-card space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{t.tierBackend}</span>
            <span className="text-[10px] text-sky-400 font-mono">Categories C/D</span>
          </label>
          <select
            value={currentStack.backend || ''}
            onChange={e => updateTier('backend', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="">-- None / Default --</option>
            {backends.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Runtime */}
        <div className="p-3.5 rounded-xl glass-card space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{t.tierRuntime}</span>
            <span className="text-[10px] text-sky-400 font-mono">Category H</span>
          </label>
          <select
            value={currentStack.runtime || ''}
            onChange={e => updateTier('runtime', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="">-- None / Default --</option>
            {runtimes.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Build Tool */}
        <div className="p-3.5 rounded-xl glass-card space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{t.tierBuildTool}</span>
            <span className="text-[10px] text-sky-400 font-mono">Category I</span>
          </label>
          <select
            value={currentStack.buildTool || ''}
            onChange={e => updateTier('buildTool', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="">-- None / Default --</option>
            {buildTools.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Database */}
        <div className="p-3.5 rounded-xl glass-card space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{t.tierDatabase}</span>
            <span className="text-[10px] text-sky-400 font-mono">Category J</span>
          </label>
          <select
            value={currentStack.database || ''}
            onChange={e => updateTier('database', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="">-- None / Default --</option>
            {databases.map(t => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.type})
              </option>
            ))}
          </select>
        </div>

        {/* API Protocol */}
        <div className="p-3.5 rounded-xl glass-card space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{t.tierApiProtocol}</span>
            <span className="text-[10px] text-sky-400 font-mono">Category K</span>
          </label>
          <select
            value={currentStack.apiProtocol || ''}
            onChange={e => updateTier('apiProtocol', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="">-- None / Default --</option>
            {apiProtocols.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hosting */}
        <div className="p-3.5 rounded-xl glass-card space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{t.tierHosting}</span>
            <span className="text-[10px] text-sky-400 font-mono">Category L</span>
          </label>
          <select
            value={currentStack.hosting || ''}
            onChange={e => updateTier('hosting', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="">-- None / Default --</option>
            {hostings.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Testing */}
        <div className="p-3.5 rounded-xl glass-card space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{t.tierTesting}</span>
            <span className="text-[10px] text-sky-400 font-mono">Category O</span>
          </label>
          <select
            value={currentStack.testing || ''}
            onChange={e => updateTier('testing', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="">-- None / Default --</option>
            {testings.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Monitoring */}
        <div className="p-3.5 rounded-xl glass-card space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{t.tierMonitoring}</span>
            <span className="text-[10px] text-sky-400 font-mono">Category P</span>
          </label>
          <select
            value={currentStack.monitoring || ''}
            onChange={e => updateTier('monitoring', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="">-- None / Default --</option>
            {monitorings.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* AI & Data */}
        <div className="p-3.5 rounded-xl glass-card space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{t.tierAi}</span>
            <span className="text-[10px] text-sky-400 font-mono">Category N</span>
          </label>
          <select
            value={currentStack.aiIntegration || ''}
            onChange={e => updateTier('aiIntegration', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="">-- None / Default --</option>
            {ais.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Layered Architecture Diagram (SVG) */}
      <div className="p-5 rounded-2xl glass-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Layered Architectural Dependency Graph</span>
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">Vector SVG View</span>
        </div>

        <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800/80">
          <svg
            id="architecture-svg"
            viewBox="0 0 800 420"
            className="w-full min-w-[700px] h-auto select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="clientGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="apiGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="runtimeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="dataGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="infraGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Connecting Flow Lines */}
            <line x1="400" y1="65" x2="400" y2="125" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="400" y1="145" x2="400" y2="205" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="400" y1="225" x2="400" y2="285" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="400" y1="305" x2="400" y2="365" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />

            {/* Layer 1: Client / UI */}
            <rect x="50" y="20" width="700" height="50" rx="10" fill="url(#clientGrad)" stroke="#38bdf8" strokeWidth="1" />
            <text x="70" y="50" fill="#38bdf8" fontSize="13" fontWeight="bold">CLIENT / UI TIER</text>
            <text x="350" y="50" fill="#f8fafc" fontSize="13" fontWeight="600">
              {currentStack.frontend ? catalogMap.get(currentStack.frontend)?.name : 'Vanilla Client DOM'}
              {currentStack.language ? ` (${catalogMap.get(currentStack.language)?.name})` : ''}
            </text>

            {/* Layer 2: API Protocol */}
            <rect x="50" y="100" width="700" height="50" rx="10" fill="url(#apiGrad)" stroke="#818cf8" strokeWidth="1" />
            <text x="70" y="130" fill="#818cf8" fontSize="13" fontWeight="bold">GATEWAY & PROTOCOL</text>
            <text x="350" y="130" fill="#f8fafc" fontSize="13" fontWeight="600">
              {currentStack.apiProtocol ? catalogMap.get(currentStack.apiProtocol)?.name : 'HTTP/1.1 Standard'}
            </text>

            {/* Layer 3: Runtime / Server */}
            <rect x="50" y="180" width="700" height="50" rx="10" fill="url(#runtimeGrad)" stroke="#06b6d4" strokeWidth="1" />
            <text x="70" y="210" fill="#06b6d4" fontSize="13" fontWeight="bold">COMPUTE / RUNTIME</text>
            <text x="350" y="210" fill="#f8fafc" fontSize="13" fontWeight="600">
              {currentStack.backend ? catalogMap.get(currentStack.backend)?.name : 'Client-Only Execution'}
              {currentStack.runtime ? ` on ${catalogMap.get(currentStack.runtime)?.name}` : ''}
            </text>

            {/* Layer 4: Storage */}
            <rect x="50" y="260" width="700" height="50" rx="10" fill="url(#dataGrad)" stroke="#10b981" strokeWidth="1" />
            <text x="70" y="290" fill="#10b981" fontSize="13" fontWeight="bold">DATA PERSISTENCE</text>
            <text x="350" y="290" fill="#f8fafc" fontSize="13" fontWeight="600">
              {currentStack.database ? catalogMap.get(currentStack.database)?.name : 'Ephemeral / Local Storage'}
            </text>

            {/* Layer 5: Hosting & Infra */}
            <rect x="50" y="340" width="700" height="50" rx="10" fill="url(#infraGrad)" stroke="#f59e0b" strokeWidth="1" />
            <text x="70" y="370" fill="#f59e0b" fontSize="13" fontWeight="bold">CLOUD INFRASTRUCTURE</text>
            <text x="350" y="370" fill="#f8fafc" fontSize="13" fontWeight="600">
              {currentStack.hosting ? catalogMap.get(currentStack.hosting)?.name : 'Static Host / CDN'}
              {currentStack.monitoring ? ` + ${catalogMap.get(currentStack.monitoring)?.name}` : ''}
            </text>
          </svg>
        </div>
      </div>

      {/* Save Project Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Save className="w-4 h-4 text-sky-400" />
              <span>Save Stack to Projects</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Project Notes & Architecture Decisions
                </label>
                <textarea
                  rows={2}
                  value={projectNotes}
                  onChange={e => setProjectNotes(e.target.value)}
                  placeholder="Record trade-offs, target requirements, or deployment steps..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-emerald-400 flex items-center justify-between mb-1">
                  <span>{lang === 'fa' ? 'لینک زنده / سندباکس دمو' : 'Live Demo / Sandbox URL'}</span>
                  <span className="text-[10px] text-slate-400 font-mono">StackBlitz / Custom</span>
                </label>
                <input
                  type="url"
                  value={projectLiveUrl}
                  onChange={e => setProjectLiveUrl(e.target.value)}
                  placeholder="https://stackblitz.com/..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 rounded-lg bg-sky-500 text-slate-950 text-xs font-bold hover:bg-sky-400 transition"
              >
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
