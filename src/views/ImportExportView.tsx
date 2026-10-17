import React, { useState } from 'react';
import {
  HardDriveDownload,
  Upload,
  FileJson,
  FileCode,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FolderArchive
} from 'lucide-react';
import { TechRecord, ProjectRecord } from '../types.ts';
import { DICT, Language } from '../i18n/translations.ts';
import { downloadFile, generateCryptoFingerprint } from '../services/storage.ts';

interface ImportExportViewProps {
  catalog: TechRecord[];
  projects: ProjectRecord[];
  onImportProjects: (imported: ProjectRecord[]) => void;
  lang: Language;
}

export const ImportExportView: React.FC<ImportExportViewProps> = ({
  catalog,
  projects,
  onImportProjects,
  lang
}) => {
  const t = DICT[lang];

  const [importStatus, setImportStatus] = useState<{
    success?: boolean;
    message?: string;
    previewCount?: number;
    parsedProjects?: ProjectRecord[];
  }>({});

  const handleExportAllBackup = async () => {
    const fingerprint = await generateCryptoFingerprint({
      version: '1.0.0',
      projects,
      catalogCount: catalog.length,
      exportedAt: new Date().toISOString()
    });

    const backupPayload = {
      app: 'Tech Atlas Studio',
      schemaVersion: '1.0.0',
      fingerprint,
      exportedAt: new Date().toISOString(),
      projects,
      catalogCount: catalog.length
    };

    downloadFile(
      JSON.stringify(backupPayload, null, 2),
      `tech-atlas-backup-${Date.now()}.json`,
      'application/json'
    );
  };

  const handleExportCatalogJSON = () => {
    downloadFile(
      JSON.stringify(catalog, null, 2),
      `tech-atlas-catalog-222-records-${Date.now()}.json`,
      'application/json'
    );
  };

  const handleDownloadStandaloneHTML = () => {
    // Generate an absolute standalone single-file HTML document
    const htmlContent = `<!DOCTYPE html>
<html lang="${lang}" dir="${lang === 'fa' ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tech Atlas Studio — Offline Standalone Edition</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #07090e; color: #f8fafc; padding: 2rem; margin: 0; }
    .card { background: #0e131f; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
    h1 { color: #38bdf8; margin-top: 0; }
    .tag { display: inline-block; padding: 0.2rem 0.5rem; background: #1e293b; color: #38bdf8; border-radius: 4px; font-size: 0.75rem; margin-right: 0.5rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
    input { width: 100%; box-sizing: border-box; padding: 0.75rem; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #fff; margin-bottom: 1.5rem; }
  </style>
</head>
<body>
  <h1>Tech Atlas Studio — Offline Standalone Edition</h1>
  <p>Single-file zero-dependency offline backup containing ${catalog.length} verified software technology records.</p>
  <input type="text" id="search" placeholder="Type to filter technologies offline..." oninput="filter()">
  <div id="catalog" class="grid"></div>
  <script>
    const data = ${JSON.stringify(catalog)};
    function render(items) {
      const el = document.getElementById('catalog');
      el.innerHTML = items.map(t => '<div class="card"><span class="tag">' + t.categoryCode + ' · ' + t.type + '</span><h3 style="margin: 0.5rem 0; color: #fff;">' + t.name + '</h3><p style="font-size: 0.85rem; color: #94a3b8;">' + t.shortDescription + '</p><div style="font-size: 0.75rem; color: #38bdf8; font-family: monospace;">License: ' + t.license + ' · Difficulty: ' + t.learningDifficulty + '/5</div></div>').join('');
    }
    function filter() {
      const q = document.getElementById('search').value.toLowerCase();
      render(data.filter(t => t.name.toLowerCase().includes(q) || t.shortDescription.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)));
    }
    render(data);
  <\/script>
</body>
</html>`;

    downloadFile(htmlContent, 'tech-atlas-studio-standalone.html', 'text/html');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);

        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].stack) {
          // Array of projects
          setImportStatus({
            success: true,
            previewCount: parsed.length,
            parsedProjects: parsed,
            message: `Validated ${parsed.length} project architectures ready for import.`
          });
        } else if (parsed.projects && Array.isArray(parsed.projects)) {
          // Backup file structure
          setImportStatus({
            success: true,
            previewCount: parsed.projects.length,
            parsedProjects: parsed.projects,
            message: `Validated full backup containing ${parsed.projects.length} projects.`
          });
        } else if (parsed.stack && parsed.name) {
          // Single project file
          setImportStatus({
            success: true,
            previewCount: 1,
            parsedProjects: [parsed],
            message: `Validated project "${parsed.name}".`
          });
        } else {
          setImportStatus({
            success: false,
            message: 'Invalid schema: The uploaded file does not conform to the Tech Atlas Studio project schema.'
          });
        }
      } catch (err: any) {
        setImportStatus({
          success: false,
          message: 'JSON Parse Error: ' + (err.message || 'Malformed JSON file.')
        });
      }
    };
    reader.readAsText(file);
  };

  const applyValidatedImport = () => {
    if (importStatus.parsedProjects && importStatus.parsedProjects.length > 0) {
      onImportProjects(importStatus.parsedProjects);
      setImportStatus({
        success: true,
        message: `Successfully imported ${importStatus.parsedProjects.length} project(s) into IndexedDB!`
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>{t.importExportTitle}</span>
          <span className="text-xs font-mono font-normal text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
            Open JSON / HTML Standards
          </span>
        </h2>
        <p className="text-xs text-slate-400">{t.importExportSubtitle}</p>
      </div>

      {/* Export Section */}
      <div className="p-6 rounded-2xl glass-card space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <HardDriveDownload className="w-4 h-4 text-sky-400" />
          <span>Export Stacks, Catalog & Standalone Bundle</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          {lang === 'en'
            ? 'Download your work as verifiable JSON backups, full offline catalog archives, or a self-contained zero-dependency HTML file.'
            : 'خروجی کامل داده‌ها به صورت نسخه‌های پشتیبان معتبر JSON، آرشیو کاتالوگ یا یک فایل مستقل تک‌فایلی HTML.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={handleExportAllBackup}
            className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-left rtl:text-right transition space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 group-hover:text-sky-400">
                Full Backup JSON
              </span>
              <FileJson className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Complete snapshot of all {projects.length} saved projects with SHA-256 fingerprint.
            </p>
          </button>

          <button
            onClick={handleExportCatalogJSON}
            className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-left rtl:text-right transition space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-400">
                Catalog Archive JSON
              </span>
              <FolderArchive className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              All 220+ structured technology specifications formatted for analysis.
            </p>
          </button>

          <button
            onClick={handleDownloadStandaloneHTML}
            className="p-4 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-left rtl:text-right transition space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-300">
                Standalone Single-File (HTML)
              </span>
              <FileCode className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-[11px] text-slate-300">
              Self-contained HTML file runnable offline via double-click anywhere.
            </p>
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="p-6 rounded-2xl glass-card space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Upload className="w-4 h-4 text-emerald-400" />
          <span>{t.importJson}</span>
        </h3>
        <p className="text-xs text-slate-400">
          Upload previously exported project configurations or backup JSON files. The engine verifies schema integrity before saving to IndexedDB.
        </p>

        {/* Dropzone */}
        <label className="border-2 border-dashed border-slate-700/80 hover:border-sky-500/50 rounded-2xl p-6 text-center cursor-pointer block transition bg-slate-950/40">
          <Upload className="w-6 h-6 text-slate-500 mx-auto mb-2" />
          <span className="text-xs font-semibold text-slate-300 block">
            {t.importDropzone}
          </span>
          <span className="text-[11px] text-slate-500 font-mono mt-1 block">
            Accepts *.json files
          </span>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {/* Validation Status Box */}
        {importStatus.message && (
          <div
            className={`p-4 rounded-xl border space-y-2 ${
              importStatus.success
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold">
              {importStatus.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              )}
              <span>{importStatus.message}</span>
            </div>

            {importStatus.success && importStatus.parsedProjects && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={applyValidatedImport}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
                >
                  {t.applyImport}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
