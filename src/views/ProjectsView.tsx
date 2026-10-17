import React, { useState } from 'react';
import {
  BookmarkCheck,
  Plus,
  Trash2,
  Copy,
  Download,
  Calendar,
  AlertTriangle,
  FolderOpen,
  ExternalLink,
  Globe,
  Play,
  Edit2,
  Check,
  X,
  Share2,
  Sparkles
} from 'lucide-react';
import { ProjectRecord, StackSelection, TechRecord } from '../types.ts';
import { DICT, Language } from '../i18n/translations.ts';
import { downloadFile, getLivePlaygroundUrl } from '../services/storage.ts';

interface ProjectsViewProps {
  projects: ProjectRecord[];
  catalogMap: Map<string, TechRecord>;
  lang: Language;
  onOpenInStackBuilder: (stack: StackSelection) => void;
  onDeleteProject: (id: string) => void;
  onDuplicateProject: (project: ProjectRecord) => void;
  onNavigateToBuilder: () => void;
  onSaveProject?: (project: ProjectRecord) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  catalogMap,
  lang,
  onOpenInStackBuilder,
  onDeleteProject,
  onDuplicateProject,
  onNavigateToBuilder,
  onSaveProject
}) => {
  const t = DICT[lang];

  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [editingLiveUrlProjId, setEditingLiveUrlProjId] = useState<string | null>(null);
  const [tempLiveUrl, setTempLiveUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const sharedAppUrl = 'https://ais-pre-johyjo7uv3ccqmalywwytk-17774190120.europe-west3.run.app';
  const devAppUrl = 'https://ais-dev-johyjo7uv3ccqmalywwytk-17774190120.europe-west3.run.app';

  const handleExportProject = (project: ProjectRecord) => {
    const jsonStr = JSON.stringify(project, null, 2);
    downloadFile(jsonStr, `${project.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`, 'application/json');
  };

  const handleCopyLink = (url: string, key: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(key);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const handleStartEditLiveUrl = (project: ProjectRecord) => {
    setEditingLiveUrlProjId(project.id);
    setTempLiveUrl(project.liveUrl || getLivePlaygroundUrl(project.stack));
  };

  const handleSaveLiveUrl = (project: ProjectRecord) => {
    if (onSaveProject) {
      onSaveProject({
        ...project,
        liveUrl: tempLiveUrl.trim() || undefined,
        updatedAt: new Date().toISOString()
      });
    }
    setEditingLiveUrlProjId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Live Deployment Links Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/40 via-indigo-950/30 to-slate-900 border border-sky-500/30 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sky-400">
            <Globe className="w-5 h-5 flex-shrink-0 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-100">
              {lang === 'fa' ? 'لینک‌های زنده و آنلاین پروژه‌ها' : 'Live Deployments & Interactive Environments'}
            </h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Online & Ready
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {lang === 'fa'
            ? 'تمام پروژه‌ها و استک‌های ساخته‌شده قابلیت اجرای زنده از طریق سندباکس ابری (StackBlitz) یا استقرار روی سرور زنده را دارند.'
            : 'All configured architecture projects support instant execution in cloud sandboxes or direct production live links.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Main App Shared Live Link */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between gap-3">
            <div className="truncate">
              <span className="text-[10px] text-sky-400 uppercase font-mono block">
                {lang === 'fa' ? 'لینک زنده استودیو تک اطلس (اشتراکی)' : 'Tech Atlas Studio Shared Live URL'}
              </span>
              <span className="text-xs font-mono text-slate-200 truncate block">
                {sharedAppUrl}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => handleCopyLink(sharedAppUrl, 'shared')}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Copy link"
              >
                {copiedLink === 'shared' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href={sharedAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition font-bold"
                title="Open live link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Development Live Link */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between gap-3">
            <div className="truncate">
              <span className="text-[10px] text-indigo-400 uppercase font-mono block">
                {lang === 'fa' ? 'لینک زنده توسعه تعاملی' : 'Interactive Development Live URL'}
              </span>
              <span className="text-xs font-mono text-slate-200 truncate block">
                {devAppUrl}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => handleCopyLink(devAppUrl, 'dev')}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Copy link"
              >
                {copiedLink === 'dev' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href={devAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-slate-950 transition font-bold"
                title="Open live link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Title & Create New */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>{t.projectsTitle}</span>
            <span className="text-xs font-mono font-normal text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
              {projects.length} Saved in IndexedDB
            </span>
          </h2>
          <p className="text-xs text-slate-400">{t.projectsSubtitle}</p>
        </div>

        <button
          onClick={onNavigateToBuilder}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>{t.newProject}</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-card space-y-3">
          <BookmarkCheck className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-200">{t.noProjectsYet}</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {lang === 'en'
              ? 'Create a project using the Stack Builder or generate one using the Project Advisor.'
              : 'یک پروژه جدید در بخش سازنده استک طراحی کرده یا از مشاور پروژه استک پیشنهادی را ذخیره نمایید.'}
          </p>
          <button
            onClick={onNavigateToBuilder}
            className="px-4 py-2 rounded-lg bg-sky-500 text-slate-950 font-semibold text-xs transition hover:bg-sky-400"
          >
            {t.navStackBuilder}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map(proj => {
            const stackValues = Object.entries(proj.stack).filter(([_, id]) => Boolean(id));
            const liveUrlToUse = proj.liveUrl || getLivePlaygroundUrl(proj.stack);
            const isEditing = editingLiveUrlProjId === proj.id;

            return (
              <div
                key={proj.id}
                className="p-5 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between space-y-4 hover:border-sky-500/30 transition group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-400 transition">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {proj.description || 'Custom technology architecture'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onDuplicateProject(proj)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
                        title={t.duplicateProject}
                        aria-label="Duplicate project"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleExportProject(proj)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition"
                        title={t.exportProject}
                        aria-label="Export project"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setProjectToDelete(proj.id)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                        title="Delete project"
                        aria-label="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Components Badges */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      Stack Components ({stackValues.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {stackValues.map(([tier, id]) => {
                        const item = catalogMap.get(id as string);
                        return (
                          <span
                            key={tier}
                            className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-[11px] text-slate-300 font-medium"
                          >
                            {item?.name || id}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes if any */}
                  {proj.notes && (
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 italic">
                      "{proj.notes}"
                    </div>
                  )}

                  {/* Dedicated Live Link Box */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" />
                        <span>{t.liveLink || 'لینک زنده و دمو'}</span>
                        {proj.liveUrl && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                            Custom
                          </span>
                        )}
                      </span>

                      {!isEditing && (
                        <button
                          onClick={() => handleStartEditLiveUrl(proj)}
                          className="text-[10px] text-slate-400 hover:text-sky-400 flex items-center gap-1 transition"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>{proj.liveUrl ? (lang === 'fa' ? 'ویرایش لینک' : 'Edit') : (lang === 'fa' ? 'افزودن لینک سفارشی' : 'Add Link')}</span>
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-2 pt-1">
                        <input
                          type="url"
                          value={tempLiveUrl}
                          onChange={e => setTempLiveUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-sky-500 text-xs text-slate-200 outline-none font-mono"
                          autoFocus
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingLiveUrlProjId(null)}
                            className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[11px] hover:bg-slate-700 transition"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleSaveLiveUrl(proj)}
                            className="px-3 py-1 rounded bg-sky-500 text-slate-950 text-[11px] font-bold hover:bg-sky-400 transition flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            <span>{t.saveLiveUrl || 'ذخیره'}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2 pt-0.5">
                        <span className="text-[11px] font-mono text-slate-400 truncate max-w-[240px]">
                          {liveUrlToUse}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopyLink(liveUrlToUse, proj.id)}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200 transition"
                            title="Copy link"
                          >
                            {copiedLink === proj.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>

                          <a
                            href={liveUrlToUse}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>
                              {proj.liveUrl
                                ? (lang === 'fa' ? 'مشاهده لینک زنده' : 'Open Live Demo')
                                : (lang === 'fa' ? 'اجرای زنده در سندباکس' : 'Launch Sandbox')}
                            </span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3" />
                    {new Date(proj.updatedAt).toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => onOpenInStackBuilder(proj.stack)}
                    className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold transition"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Open in Stack Builder</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-slate-900 border border-rose-500/40 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <h3 className="text-base font-bold text-slate-100">Delete Project?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.deleteProjectConfirm}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setProjectToDelete(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (projectToDelete) {
                    onDeleteProject(projectToDelete);
                    setProjectToDelete(null);
                  }
                }}
                className="px-4 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
