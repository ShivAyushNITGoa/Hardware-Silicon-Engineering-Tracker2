import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  Share2, 
  PlusSquare, 
  Wifi, 
  WifiOff, 
  X, 
  RefreshCw,
  Cpu,
  Sparkles
} from 'lucide-react';

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
  const [installing, setInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    setInstalling(true);
    try {
      const success = await onInstall();
      if (success) {
        setInstallSuccess(true);
      }
    } finally {
      setInstalling(false);
    }
  };

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: boolean }).MSStream;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7 text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Silicon Icon */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Cpu className="w-6 h-6 text-white" />
          </div>
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

        {/* Value Prop Benefits */}
        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 mb-6 space-y-2.5">
          <div className="flex items-start gap-2.5 text-xs text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><strong>Native App Experience:</strong> Full-screen standalone window without browser URL bars or distractions.</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>100% Offline Access:</strong> Access all 15 study modules, 80+ company direct links, STA/Q-format calculators, and interview whiteboards anywhere.</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span><strong>Instant Launch:</strong> Opens in &lt;100ms from your desktop dock, Windows taskbar, or mobile home screen.</span>
          </div>
        </div>

        {/* State Content */}
        {isInstalled || installSuccess ? (
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
              className="mt-2 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : isInstallable ? (
          <div className="space-y-4">
            <button
              onClick={handleInstallClick}
              disabled={installing}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform active:scale-[0.98] disabled:opacity-50"
            >
              {installing ? (
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
              <Smartphone className="w-4 h-4 text-cyan-400" /> How to install on iOS Safari:
            </p>
            <ol className="text-xs text-neutral-300 space-y-2 list-decimal list-inside">
              <li className="flex items-center gap-2">
                <span>1. Tap the <strong>Share</strong> button</span>
                <Share2 className="w-4 h-4 text-blue-400 inline" />
                <span>at the bottom of Safari</span>
              </li>
              <li className="flex items-center gap-2">
                <span>2. Scroll down and tap <strong>Add to Home Screen</strong></span>
                <PlusSquare className="w-4 h-4 text-emerald-400 inline" />
              </li>
              <li>3. Tap <strong>Add</strong> in the top-right corner</li>
            </ol>
          </div>
        ) : (
          <div className="bg-neutral-800/60 border border-neutral-700/60 rounded-xl p-4 text-xs text-neutral-300 space-y-2">
            <p className="font-medium text-neutral-200 flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-cyan-400" /> How to install on Desktop / Mobile:
            </p>
            <p>
              In Chrome, Edge, or Brave: Click the <strong>Install icon</strong> (<Download className="w-3.5 h-3.5 inline text-cyan-400" />) located in the right side of the address bar, or open the browser menu (⋮) and select <strong>"Install Silicon & Hardware Engineering Tracker..."</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
