import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
  DollarSign,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { AdvisorAnswers, AdvisorRecommendation, StackSelection, TechRecord } from '../types.ts';
import { recommendStackFromAdvisor } from '../logic/rules.ts';
import { DICT, Language } from '../i18n/translations.ts';

interface AdvisorViewProps {
  lang: Language;
  onApplyStackToBuilder: (stack: StackSelection) => void;
  catalogMap: Map<string, TechRecord>;
}

export const AdvisorView: React.FC<AdvisorViewProps> = ({
  lang,
  onApplyStackToBuilder,
  catalogMap
}) => {
  const t = DICT[lang];

  const defaultAnswers: AdvisorAnswers = {
    appType: 'saas-web',
    audience: 'consumer',
    formFactor: 'web',
    offlineReq: 'connected',
    dataArchitecture: 'relational-sql',
    hosting: 'serverless-edge',
    devEnv: 'macos',
    budget: 'free',
    buildTolerance: 'standard-bundler',
    projectOrigin: 'greenfield'
  };

  const [answers, setAnswers] = useState<AdvisorAnswers>(defaultAnswers);
  const [activeStep, setActiveStep] = useState(0);
  const [recommendation, setRecommendation] = useState<AdvisorRecommendation | null>(null);

  const questions = [
    {
      key: 'appType' as keyof AdvisorAnswers,
      titleEn: '1. What are you building?',
      titleFa: '۱. چه نوع برنامه‌ای می‌سازید؟',
      options: [
        { id: 'saas-web', labelEn: 'SaaS Web Application / Portal', labelFa: 'سامانه یا پرتال تحت وب (SaaS)' },
        { id: 'ai-data', labelEn: 'AI & Data Science Tool / Pipeline', labelFa: 'ابزار هوش مصنوعی، مدل و پایپ‌لاین داده' },
        { id: 'mobile-app', labelEn: 'Mobile App (iOS & Android)', labelFa: 'برنامه موبایل برای iOS و اندروید' },
        { id: 'content-site', labelEn: 'Content Portal, Blog or Docs', labelFa: 'وبلاگ، مستندات یا سایت محتوامحور' },
        { id: 'internal-tool', labelEn: 'Internal Business Dashboard / Admin', labelFa: 'سامانه و داشبورد سازمانی داخلی' }
      ]
    },
    {
      key: 'audience' as keyof AdvisorAnswers,
      titleEn: '2. Who will use the application?',
      titleFa: '۲. چه کسانی کاربران اصلی هستند؟',
      options: [
        { id: 'solo', labelEn: 'Solo User / Personal Utility', labelFa: 'کاربر شخصی یا ابزار فردی' },
        { id: 'small-team', labelEn: 'Small Internal Team / Startup', labelFa: 'تیم کوچک استارتاپی یا شرکتی' },
        { id: 'consumer', labelEn: 'Public Consumer Web Audience', labelFa: 'عموم کاربران اینترنت' },
        { id: 'enterprise', labelEn: 'High-Volume B2B Enterprise', labelFa: 'سازمان‌های بزرگ و مقیاس سازمانی' }
      ]
    },
    {
      key: 'formFactor' as keyof AdvisorAnswers,
      titleEn: '3. What is the target delivery form factor?',
      titleFa: '۳. شیوه تحویل و رابط کاربر چیست؟',
      options: [
        { id: 'web', labelEn: 'Standard Browser Web Application', labelFa: 'برنامه وب استاندارد مرورگر' },
        { id: 'pwa', labelEn: 'Installable Offline Progressive Web App (PWA)', labelFa: 'وب‌اپ پیش‌رونده قابل نصب (PWA)' },
        { id: 'mobile', labelEn: 'Native Cross-Platform Mobile (iOS/Android)', labelFa: 'برنامه نیتیو چندسکویی موبایل' },
        { id: 'desktop', labelEn: 'Desktop Utility (macOS / Windows / Linux)', labelFa: 'برنامه دسکتاپ رایانه' },
        { id: 'headless', labelEn: 'Headless API / Background Microservice', labelFa: 'وب‌سرویس و میکروسرویس پس‌زمینه' }
      ]
    },
    {
      key: 'offlineReq' as keyof AdvisorAnswers,
      titleEn: '4. Must the app work offline without internet?',
      titleFa: '۴. آیا برنامه باید کاملاً آفلاین کار کند؟',
      options: [
        { id: 'offline-first', labelEn: 'Offline-First: Must work 100% without internet', labelFa: 'آفلاین اول: کارکرد ۱۰۰٪ بدون نیاز به اینترنت' },
        { id: 'offline-tolerant', labelEn: 'Offline-Tolerant: Cache data and sync when online', labelFa: 'آفلاین منعطف: کش محلی و همگام‌سازی هنگام آنلاین شدن' },
        { id: 'connected', labelEn: 'Always Connected: Network access is assumed', labelFa: 'همواره آنلاین: اینترنت و شبکه الزامی است' }
      ]
    },
    {
      key: 'dataArchitecture' as keyof AdvisorAnswers,
      titleEn: '5. What data architecture is required?',
      titleFa: '۵. معماری ذخیره‌سازی داده چگونه است؟',
      options: [
        { id: 'local-only', labelEn: 'Local-Only: Browser IndexedDB / sandboxed store', labelFa: 'محلی محض: حافظه مرورگر IndexedDB بدون سرور' },
        { id: 'relational-sql', labelEn: 'Relational SQL: Strong ACID schema (PostgreSQL)', labelFa: 'رابطه‌ای SQL: تراکنش‌های قطعی و پایدار (PostgreSQL)' },
        { id: 'document-nosql', labelEn: 'Document NoSQL: Flexible schemas (MongoDB)', labelFa: 'سندی NoSQL: ساختارهای منعطف (MongoDB)' },
        { id: 'realtime-cloud', labelEn: 'Realtime Backend-as-a-Service (Supabase/Firebase)', labelFa: 'سرویس بلادرنگ ابری (Supabase یا Firebase)' }
      ]
    },
    {
      key: 'hosting' as keyof AdvisorAnswers,
      titleEn: '6. Where will the project be deployed?',
      titleFa: '۶. استقرار نهایی در کجا انجام می‌شود؟',
      options: [
        { id: 'static-cdn', labelEn: 'Free Static Host / CDN (GitHub Pages / Cloudflare Pages)', labelFa: 'میزبانی استاتیک رایگان (گیت‌هاب پیجز یا کلودفلر)' },
        { id: 'serverless-edge', labelEn: 'Serverless Platform (Vercel, Netlify, Cloudflare Workers)', labelFa: 'پلتفرم بدون سرور و لبه (Vercel / Workers)' },
        { id: 'vps', labelEn: 'Virtual Private Server / Docker (DigitalOcean / Hetzner)', labelFa: 'سرور مجازی VPS یا داکر' },
        { id: 'cloud-hyperscaler', labelEn: 'Cloud Hyperscaler (AWS, Google Cloud, Azure)', labelFa: 'ابرهای بزرگ سازمانی (AWS، گوگل، مایکروسافت)' }
      ]
    },
    {
      key: 'devEnv' as keyof AdvisorAnswers,
      titleEn: '7. Primary developer workstation environment?',
      titleFa: '۷. سیستم‌عامل محیط توسعه چیست؟',
      options: [
        { id: 'macos', labelEn: 'Apple macOS (Full Apple + Linux compatibility)', labelFa: 'مک‌او‌اس اپل (پشتیبانی کامل از ابزارهای اپل و لینوکس)' },
        { id: 'linux', labelEn: 'Linux (Native container & POSIX tools)', labelFa: 'لینوکس (سازگاری بومی کانتینرها و سرورها)' },
        { id: 'windows', labelEn: 'Windows / WSL (Microsoft & cross-platform)', labelFa: 'ویندوز یا WSL' },
        { id: 'browser-tablet', labelEn: 'Browser-Only / iPad / Cloud Shell', labelFa: 'مرورگر تبلت / آیپد / محیط ابری' }
      ]
    },
    {
      key: 'budget' as keyof AdvisorAnswers,
      titleEn: '8. What is the infrastructure budget?',
      titleFa: '۸. بودجه هزینه زیرساخت و سرور چقدر است؟',
      options: [
        { id: 'free', labelEn: '$0 / Free Tier Only (Zero recurring costs)', labelFa: 'صفر دلار / کاملاً رایگان (بدون هزینه ماهیانه)' },
        { id: 'low', labelEn: 'Low Budget (< $20 / month for VPS/Cloud)', labelFa: 'بودجه محدود (کمتر از ۲۰ دلار در ماه برای VPS)' },
        { id: 'production', labelEn: 'Funded Production / Enterprise Budget', labelFa: 'بودجه تولیدی شرکتی و تجاری' }
      ]
    },
    {
      key: 'buildTolerance' as keyof AdvisorAnswers,
      titleEn: '9. Is a build/compilation step acceptable?',
      titleFa: '۹. آیا مرحله بیلد و کامپایل قابل قبول است؟',
      options: [
        { id: 'zero-build', labelEn: 'Zero Build Step: Open single HTML directly in browser', labelFa: 'بدون مرحله بیلد: اجرای مستقیم تک‌فایل HTML در مرورگر' },
        { id: 'standard-bundler', labelEn: 'Standard Modern Bundler (Vite / npm build)', labelFa: 'باندلرهای مدرن و استاندارد (Vite / npm)' },
        { id: 'heavy-ci', labelEn: 'Multi-Target Native CI/CD Pipeline', labelFa: 'پایپ‌لاین کامل تست و چندهدفه CI/CD' }
      ]
    },
    {
      key: 'projectOrigin' as keyof AdvisorAnswers,
      titleEn: '10. Project origin & status?',
      titleFa: '۱۰. وضعیت شروع پروژه چیست؟',
      options: [
        { id: 'greenfield', labelEn: 'Greenfield: Starting completely from scratch', labelFa: 'پروژه جدید (شروع از صفر)' },
        { id: 'migration', labelEn: 'Migration: Modernizing an existing legacy codebase', labelFa: 'مهاجرت: نوسازی کدبیس قدیمی' },
        { id: 'api-extension', labelEn: 'Extending existing REST/GraphQL backend', labelFa: 'توسعه و افزودن به بک‌اند و وب‌سرویس فعلی' }
      ]
    }
  ];

  const currentQ = questions[activeStep];

  const handleSelectOption = (optId: string) => {
    const updated = {
      ...answers,
      [currentQ.key]: optId
    };
    setAnswers(updated);

    if (activeStep < questions.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Calculate final recommendation
      const rec = recommendStackFromAdvisor(updated);
      setRecommendation(rec);
    }
  };

  const resetWizard = () => {
    setActiveStep(0);
    setRecommendation(null);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>{t.advisorTitle}</span>
          <span className="text-xs font-mono font-normal text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            Rule-Grounded
          </span>
        </h2>
        <p className="text-xs text-slate-400">{t.advisorSubtitle}</p>
      </div>

      {!recommendation ? (
        /* Wizard Steps Card */
        <div className="p-6 rounded-2xl glass-card space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Question {activeStep + 1} of {questions.length}</span>
              <span className="font-mono text-sky-400">{Math.round(((activeStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${((activeStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-100">
              {lang === 'en' ? currentQ.titleEn : currentQ.titleFa}
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map(opt => {
                const isSelected = answers[currentQ.key] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-3.5 rounded-xl border text-left rtl:text-right transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-500/10 border-sky-500 text-sky-200'
                        : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-700/80 text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-medium">
                      {lang === 'en' ? opt.labelEn : opt.labelFa}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-sky-500 bg-sky-500 text-slate-950 font-bold text-[10px]' : 'border-slate-600'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
            <button
              onClick={() => setActiveStep(s => Math.max(s - 1, 0))}
              disabled={activeStep === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>Back</span>
            </button>

            {activeStep === questions.length - 1 && (
              <button
                onClick={() => setRecommendation(recommendStackFromAdvisor(answers))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-sky-500/20"
              >
                <span>{t.generateRecommendation}</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Recommendation Results View */
        <div className="space-y-6">
          {/* Main Recommended Architecture Box */}
          <div className="p-6 rounded-2xl glass-card border-sky-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/20 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-block mb-1">
                  Match Score: {recommendation.matchScore}%
                </span>
                <h3 className="text-xl font-extrabold text-slate-100">
                  {lang === 'en' ? recommendation.presetNameEn : recommendation.presetNameFa}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onApplyStackToBuilder(recommendation.stack)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-sky-500/20"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{t.loadIntoBuilder}</span>
                </button>
                <button
                  onClick={resetWizard}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  title="Recalculate with different answers"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Selected Components Chips */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Recommended Stack Blueprint
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {Object.entries(recommendation.stack).map(([tier, id]) => {
                  if (!id) return null;
                  const item = catalogMap.get(id);
                  return (
                    <div
                      key={tier}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center gap-2"
                    >
                      <span className="text-slate-500 text-[10px] uppercase font-mono">{tier}:</span>
                      <span className="font-semibold text-slate-200">{item?.name || id}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transparent Reasoning */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.whySelected}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 pl-4 rtl:pl-0 rtl:pr-4">
                {(lang === 'en' ? recommendation.reasoningEn : recommendation.reasoningFa).map((r, idx) => (
                  <li key={idx} className="list-disc leading-relaxed">
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Alternatives Considered */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t.alternativesConsidered}
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {(lang === 'en' ? recommendation.alternativesEn : recommendation.alternativesFa).map((alt, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Implementation Roadmap & Terminal Commands */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass-card space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                <span>{t.setupSteps}</span>
              </h4>
              <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 space-y-1 overflow-x-auto">
                {recommendation.setupCommands.map((cmd, idx) => (
                  <div key={idx}>{cmd}</div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-card space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>{t.deploymentRoadmap}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {(lang === 'en' ? recommendation.deploymentStepsEn : recommendation.deploymentStepsFa).map((st, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Financial and Risk Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass-card space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                <span>{t.costBreakdown}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {recommendation.paidVsFreeBreakdown}
              </p>
              <div className="text-[11px] text-slate-400 pt-1">
                <span className="font-semibold text-slate-300">Serverless Feasibility: </span>
                {recommendation.serverlessFeasibility}
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-card space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>{t.risksLimitations}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {(lang === 'en' ? recommendation.risksAndLimitationsEn : recommendation.risksAndLimitationsFa).map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-400">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
