import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  AlertTriangle,
  Key,
  Layers,
  Terminal,
  Server
} from 'lucide-react';
import { FIREBASE_CONFIG, FIRESTORE_DATABASE_ID, getVercelAuthDomainInfo } from '../lib/firebase';

interface VercelAuthGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorInfo?: { code?: string; message: string; domain?: string } | null;
}

export const VercelAuthGuideModal: React.FC<VercelAuthGuideModalProps> = ({
  isOpen,
  onClose,
  errorInfo
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const info = getVercelAuthDomainInfo();
  const currentDomain = errorInfo?.domain || info.currentHostname || 'localhost';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const vercelEnvSnippet = `# Firebase Configuration for Vercel Deployment
VITE_FIREBASE_API_KEY=${FIREBASE_CONFIG.apiKey}
VITE_FIREBASE_AUTH_DOMAIN=${FIREBASE_CONFIG.authDomain}
VITE_FIREBASE_PROJECT_ID=${FIREBASE_CONFIG.projectId}
VITE_FIREBASE_STORAGE_BUCKET=${FIREBASE_CONFIG.storageBucket}
VITE_FIREBASE_MESSAGING_SENDER_ID=${FIREBASE_CONFIG.messagingSenderId}
VITE_FIREBASE_APP_ID=${FIREBASE_CONFIG.appId}
VITE_FIRESTORE_DATABASE_ID=${FIRESTORE_DATABASE_ID}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 text-white">
              <Globe className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg tracking-tight flex items-center gap-2">
                <span>Vercel Deployment &amp; Firebase Auth Guide</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 font-mono font-normal">
                  Production Setup
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Ensure Google Sign-In and Cloud Firestore telemetry work flawlessly on Vercel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-neutral-800 text-xs sm:text-sm">
          {/* Error Alert if triggered by auth failure */}
          {errorInfo && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1.5">
              <div className="font-bold flex items-center gap-2 text-rose-800">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>Authentication Notice ({errorInfo.code || 'Domain Authorization Required'})</span>
              </div>
              <p className="text-xs text-rose-950 leading-relaxed">
                {errorInfo.message}
              </p>
            </div>
          )}

          {/* Step 1: Authorized Domains in Firebase Console */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="font-bold text-neutral-900 flex items-center gap-2 text-sm">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
                <span>Add Your Vercel Domain to Firebase Console</span>
              </div>
              <a
                href={info.consoleAuthUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Open Firebase Settings</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Firebase prevents unauthorized domains from executing Google OAuth popups or redirects. Whenever you deploy to Vercel (e.g. <code className="bg-neutral-200/80 px-1.5 py-0.5 rounded font-mono text-[11px]">my-app.vercel.app</code> or your custom domain), add it to Authorized Domains:
            </p>

            {/* Current Active Domain Copier */}
            <div className="p-3 rounded-lg bg-white border border-indigo-200 space-y-1.5">
              <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Current Hostname to Whitelist:
              </div>
              <div className="flex items-center justify-between gap-2">
                <code className="font-mono text-xs sm:text-sm font-bold text-indigo-950 select-all truncate">
                  {currentDomain}
                </code>
                <button
                  onClick={() => copyToClipboard(currentDomain, 'domain')}
                  className="px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedKey === 'domain' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Copy Domain</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <ol className="list-decimal pl-4 space-y-1 text-xs text-neutral-700">
              <li>In Firebase Console, go to <strong>Authentication &rarr; Settings &rarr; Authorized domains</strong>.</li>
              <li>Click <strong>Add domain</strong>.</li>
              <li>Paste your Vercel domain (e.g. <code>{currentDomain}</code> or <code>*.vercel.app</code>) and click <strong>Save</strong>.</li>
            </ol>
          </div>

          {/* Step 2: SPA Rewrites (vercel.json) */}
          <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-2">
            <div className="font-bold text-neutral-900 flex items-center gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-xs">2</span>
              <span>Single Page App Routing (vercel.json)</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Configured
              </span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We have already included a production-ready <code className="bg-neutral-200 px-1 py-0.5 rounded font-mono">vercel.json</code> in the project root. It instructs Vercel to route all deep links, reloads, and OAuth callback URLs through <code className="bg-neutral-200 px-1 py-0.5 rounded font-mono">index.html</code> so 404 errors will never occur.
            </p>
          </div>

          {/* Step 3: Vercel Environment Variables */}
          <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="font-bold text-neutral-900 flex items-center gap-2 text-sm">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-xs">3</span>
                <span>Vercel Environment Variables (Optional)</span>
              </div>
              <button
                onClick={() => copyToClipboard(vercelEnvSnippet, 'env')}
                className="px-2.5 py-1 rounded-md bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedKey === 'env' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Copy All Env Vars</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              The project automatically loads credentials from <code className="bg-neutral-200 px-1 py-0.5 rounded font-mono">firebase-applet-config.json</code>. If you are deploying via Git without committing JSON configs, simply paste these into your <strong>Vercel Project &rarr; Settings &rarr; Environment Variables</strong>:
            </p>

            <div className="p-3 bg-neutral-900 text-neutral-200 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed border border-neutral-800">
              <pre>{vercelEnvSnippet}</pre>
            </div>
          </div>

          {/* Step 4: Quick Deployment Commands */}
          <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-2">
            <div className="font-bold text-neutral-900 flex items-center gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-xs">4</span>
              <span>Deploying with Vercel CLI or GitHub</span>
            </div>
            <div className="p-2.5 bg-white border border-neutral-200 rounded-lg text-xs font-mono text-neutral-700 flex items-center justify-between">
              <span>npx vercel --prod</span>
              <button
                onClick={() => copyToClipboard('npx vercel --prod', 'cli')}
                className="text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
                title="Copy command"
              >
                {copiedKey === 'cli' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-neutral-500">
              Build Command: <code className="bg-neutral-200 px-1 py-0.2 rounded font-mono">npm run build</code> &bull; Output Directory: <code className="bg-neutral-200 px-1 py-0.2 rounded font-mono">dist</code>
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>App is configured for immediate Vercel compatibility</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
