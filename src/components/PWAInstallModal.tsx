import React, { useState } from 'react';
import { X, Wifi, WifiOff, CheckCircle2, Download, RefreshCw, Share2, PlusSquare, Info } from 'lucide-react';
import { GDevelopersIcon } from './BrandLogo';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => Promise<boolean>;
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  onInstall,
  isInstallable,
  isInstalled,
  isOnline
}) => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      const success = await onInstall();
      if (success) {
        setJustInstalled(true);
      }
    } finally {
      setIsInstalling(false);
    }
  };

  const isIOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as any).MSStream;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7 text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5">
          <GDevelopersIcon className="w-12 h-12 rounded-xl shadow-lg shadow-black/30" />
          <div>
            <h2 className="text-lg font-bold text-neutral-100">Install Silicon Career Tracker PWA</h2>
            <p className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
              {isOnline ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5" /> Full Offline & Online Sync Ready
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1">
                  <WifiOff className="w-3.5 h-3.5" /> Offline Mode Active
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 mb-6 space-y-2.5">
          <div className="flex items-start gap-2.5 text-xs text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong>Native App Experience:</strong> Full-screen standalone window without browser URL bars or distractions.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>100% Offline Access:</strong> Access all 15 study modules, 80+ company direct links, and interview whiteboards anywhere.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>
              <strong>Instant Launch:</strong> Opens in &lt;100ms from your desktop dock, Windows taskbar, or mobile home screen.
            </span>
          </div>
        </div>

        {isInstalled || justInstalled ? (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-300">Application Installed Successfully!</p>
              <p className="text-xs text-neutral-400 mt-1">
                You can now launch the app directly from your home screen or application launcher.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : isInstallable ? (
          <div className="space-y-4">
            <button
              onClick={handleInstallClick}
              disabled={isInstalling}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {isInstalling ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Installing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Install Application to Device
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-neutral-500">
              No app store required. Installs in seconds using standard Progressive Web App technologies.
            </p>
          </div>
        ) : isIOS ? (
          <div className="bg-neutral-800/60 border border-neutral-700/60 rounded-xl p-4 space-y-3">
            <p className="text-xs font-medium text-neutral-200 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-cyan-400" /> How to install on iOS Safari:
            </p>
            <ol className="text-xs text-neutral-300 space-y-2 list-decimal list-inside">
              <li className="flex items-center gap-2">
                <span>1. Tap the <strong>Share</strong> button at the bottom of Safari</span>
              </li>
              <li className="flex items-center gap-2">
                <span>2. Scroll down and tap <strong>Add to Home Screen</strong> <PlusSquare className="w-4 h-4 text-emerald-400 inline" /></span>
              </li>
              <li>
                <span>3. Tap <strong>Add</strong> in the top-right corner</span>
              </li>
            </ol>
          </div>
        ) : (
          <div className="bg-neutral-800/60 border border-neutral-700/60 rounded-xl p-4 text-xs text-neutral-300 space-y-2">
            <p className="font-medium text-neutral-200 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-400" /> How to install on Desktop / Mobile:
            </p>
            <p>
              In Chrome, Edge, or Brave: Click the <strong>Install icon</strong> in the right side of the address bar, or open the browser menu (⋮) and select <strong>&quot;Install Silicon &amp; Hardware Engineering Tracker...&quot;</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
