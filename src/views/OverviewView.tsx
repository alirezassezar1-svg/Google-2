import React from 'react';
import {
  Compass,
  Grid,
  GitCompare,
  Cpu,
  Map as MapIcon,
  Sparkles,
  ShieldAlert,
  BookmarkCheck,
  Star,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Database,
  Layers,
  Server
} from 'lucide-react';
import { TechRecord, ProjectRecord } from '../types.ts';
import { DICT, Language } from '../i18n/translations.ts';
import { ActiveModule } from '../components/Navigation.tsx';

interface OverviewViewProps {
  totalTechs: number;
  totalCategories: number;
  projects: ProjectRecord[];
  favorites: string[];
  recentIds: string[];
  catalogMap: Map<string, TechRecord>;
  lang: Language;
  onNavigate: (module: ActiveModule) => void;
  onSelectTech: (tech: TechRecord) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  totalTechs,
  totalCategories,
  projects,
  favorites,
  recentIds,
  catalogMap,
  lang,
  onNavigate,
  onSelectTech
}) => {
  const t = DICT[lang];

  const quickLaunchCards = [
    {
      id: 'explorer' as ActiveModule,
      title: t.navExplorer,
      desc: lang === 'en' ? 'Browse 220+ verified technologies with granular role and runtime filters.' : 'جستجو و فیلتر بیش از ۲۲۰ فناوری معتبر همراه با مشخصات فنی دقیق.',
      icon: Grid,
      color: 'from-sky-500/20 to-sky-600/5 text-sky-400 border-sky-500/30'
    },
    {
      id: 'stackBuilder' as ActiveModule,
      title: t.navStackBuilder,
      desc: lang === 'en' ? 'Assemble project stacks with real-time rule compatibility analysis and SVG diagrams.' : 'ترکیب چندلایه اجزای معماری با اعتبارسنجی لحظه‌ای و دیاگرام SVG.',
      icon: Cpu,
      color: 'from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/30'
    },
    {
      id: 'archMap' as ActiveModule,
      title: t.navArchMap,
      desc: lang === 'en' ? 'Explore interactive architectural layers and technology relationships visually.' : 'کاوش بصری لایه‌های معماری نرم‌افزار، جریان داده و پیوندهای سیستمی.',
      icon: MapIcon,
      color: 'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/30'
    },
    {
      id: 'advisor' as ActiveModule,
      title: t.navAdvisor,
      desc: lang === 'en' ? 'Deterministic 10-step wizard recommending optimal production architectures.' : 'مشاور هوشمند ۱۰ مرحله‌ای برای انتخاب بهترین استک بر اساس نیازمندی‌ها.',
      icon: Sparkles,
      color: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30'
    },
    {
      id: 'compatibility' as ActiveModule,
      title: t.navCompatibility,
      desc: lang === 'en' ? 'Audit any combination of tools against documented platform and runtime rules.' : 'بررسی تداخلات و قوانین سازگاری بین ابزارها و محیط‌های اجرای مختلف.',
      icon: ShieldAlert,
      color: 'from-rose-500/20 to-rose-600/5 text-rose-400 border-rose-500/30'
    },
    {
      id: 'compare' as ActiveModule,
      title: t.navCompare,
      desc: lang === 'en' ? 'Evaluate 2 to 4 technologies side-by-side with CSV and JSON export.' : 'مقایسه عمیق ویژگی‌ها، محدودیت‌ها و لایسنس ۲ تا ۴ فناوری در یک جدول.',
      icon: GitCompare,
      color: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.verifiedOfflineData}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {lang === 'en' ? 'Technology Intelligence & Architecture Map' : 'سامانه هوشمند تحلیل و نقشه‌برداری فناوری‌های نرم‌افزار'}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {lang === 'en'
              ? 'Discover, evaluate, compare, and compose software technologies into verified project architectures. Runs 100% locally with offline persistence in IndexedDB.'
              : 'کشف، ارزیابی، مقایسه و ترکیب فناوری‌های نرم‌افزار در قالب معماری‌های استاندارد و تأییدشده پروژه. کاملاً مستقل و با ذخیره‌سازی محلی IndexedDB.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('stackBuilder')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-semibold text-xs shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition"
            >
              <Cpu className="w-4 h-4" />
              <span>{t.navStackBuilder}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
            <button
              onClick={() => onNavigate('advisor')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.navAdvisor}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl glass-card">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs">{t.statsTotalTechs}</span>
            <Layers className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">{totalTechs}</div>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">100% Curated</span>
        </div>

        <div className="p-4 rounded-xl glass-card">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs">{t.statsCategories}</span>
            <Grid className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">{totalCategories}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Categories A - P</span>
        </div>

        <div className="p-4 rounded-xl glass-card">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs">{t.statsRules}</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">6 Engines</div>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">Deterministic</span>
        </div>

        <div className="p-4 rounded-xl glass-card">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs">{t.statsProjects}</span>
            <BookmarkCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">{projects.length}</div>
          <span className="text-[11px] text-sky-400 mt-1 block">IndexedDB Persistent</span>
        </div>
      </div>

      {/* Quick Launch Workspaces */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-100">{t.quickStart}</h3>
          <p className="text-xs text-slate-400">{t.quickStartSub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLaunchCards.map(c => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                onClick={() => onNavigate(c.id)}
                className={`p-5 rounded-xl border bg-gradient-to-br cursor-pointer transition hover:scale-[1.01] ${c.color}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900/60 border border-slate-700/60 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">{c.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently Viewed & Starred Favorites */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Starred Favorites */}
        <div className="p-5 rounded-xl glass-card space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {t.favoriteTechs}
          </h3>

          {favorites.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">
              {lang === 'en' ? 'No starred technologies yet. Star items in the Explorer!' : 'هنوز موردی نشان نشده است.'}
            </p>
          ) : (
            <div className="space-y-2">
              {favorites.slice(0, 5).map(id => {
                const tech = catalogMap.get(id);
                if (!tech) return null;
                return (
                  <div
                    key={id}
                    onClick={() => onSelectTech(tech)}
                    className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between cursor-pointer transition"
                  >
                    <div>
                      <span className="text-xs font-semibold text-slate-200 block">{tech.name}</span>
                      <span className="text-[11px] text-slate-400">{tech.category}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {tech.type}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recently Viewed */}
        <div className="p-5 rounded-xl glass-card space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            {t.recentlyViewed}
          </h3>

          {recentIds.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">
              {lang === 'en' ? 'Explore technologies to view history.' : 'فناوری‌ها را بررسی کنید تا در تاریخچه قرار گیرند.'}
            </p>
          ) : (
            <div className="space-y-2">
              {recentIds.slice(0, 5).map(id => {
                const tech = catalogMap.get(id);
                if (!tech) return null;
                return (
                  <div
                    key={id}
                    onClick={() => onSelectTech(tech)}
                    className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between cursor-pointer transition"
                  >
                    <div>
                      <span className="text-xs font-semibold text-slate-200 block">{tech.name}</span>
                      <span className="text-[11px] text-slate-400">{tech.subcategory}</span>
                    </div>
                    <span className="text-[10px] text-sky-400 hover:underline">
                      {t.viewDetails}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
