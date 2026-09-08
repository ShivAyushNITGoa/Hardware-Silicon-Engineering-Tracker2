import React, { useState } from 'react';
import { 
  X, 
  ArrowRightLeft, 
  Check, 
  DollarSign, 
  Flame, 
  Terminal, 
  BookOpen, 
  Briefcase,
  AlertTriangle,
  Sparkles,
  Layers
} from 'lucide-react';
import { ALL_SUBDOMAINS } from '../data/classificationData';
import { SUBDOMAIN_DOSSIERS } from '../data/subdomains/dossierData';

interface SubdomainComparatorModalProps {
  initialLeftId?: string;
  initialRightId?: string;
  onClose: () => void;
  onSelectDossier?: (id: string) => void;
}

export const SubdomainComparatorModal: React.FC<SubdomainComparatorModalProps> = ({
  initialLeftId = 'frontend',
  initialRightId = 'backend',
  onClose,
  onSelectDossier
}) => {
  const [leftId, setLeftId] = useState<string>(initialLeftId);
  const [rightId, setRightId] = useState<string>(initialRightId);

  const leftSubdomain = ALL_SUBDOMAINS.find(s => s.id === leftId) || ALL_SUBDOMAINS[0];
  const rightSubdomain = ALL_SUBDOMAINS.find(s => s.id === rightId) || ALL_SUBDOMAINS[1];

  const leftDossier = SUBDOMAIN_DOSSIERS[leftId];
  const rightDossier = SUBDOMAIN_DOSSIERS[rightId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Head-to-Head Subdomain Comparator</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Comparative Semiconductor Analysis
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subdomain Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-50 border-b border-neutral-200">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Select Subdomain A (Left):
            </label>
            <select
              value={leftId}
              onChange={(e) => setLeftId(e.target.value)}
              className="w-full text-xs font-semibold bg-white border border-neutral-300 rounded-lg p-2.5 text-neutral-900 focus:ring-2 focus:ring-indigo-500"
            >
              {ALL_SUBDOMAINS.map(s => (
                <option key={s.id} value={s.id}>
                  {s.domainName} &bull; {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Select Subdomain B (Right):
            </label>
            <select
              value={rightId}
              onChange={(e) => setRightId(e.target.value)}
              className="w-full text-xs font-semibold bg-white border border-neutral-300 rounded-lg p-2.5 text-neutral-900 focus:ring-2 focus:ring-indigo-500"
            >
              {ALL_SUBDOMAINS.map(s => (
                <option key={s.id} value={s.id}>
                  {s.domainName} &bull; {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Card Overview */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-4 shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                  {leftSubdomain.domainName}
                </span>
                <h4 className="text-base font-bold text-neutral-900">{leftSubdomain.name}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">{leftSubdomain.tagline}</p>
              </div>

              {/* Jobs & Roles */}
              <div className="space-y-1 pt-2 border-t border-neutral-100">
                <span className="text-xs font-bold text-neutral-700">Primary Job Titles:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {leftSubdomain.jobs.map(j => (
                    <span key={j.id} className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-800 text-[11px] font-medium">
                      {j.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compensation Tier */}
              {leftDossier && (
                <div className="space-y-1.5 pt-2 border-t border-neutral-100 bg-neutral-50 p-3 rounded-lg border border-neutral-200/70">
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Compensation Ladder:</span>
                  </span>
                  <div className="text-xs text-neutral-700 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Entry (0-2 Yrs):</span>
                      <strong className="font-mono text-neutral-900">{leftDossier.compensationLadder[0].indiaCTC}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Mid (2-5 Yrs):</span>
                      <strong className="font-mono text-neutral-900">{leftDossier.compensationLadder[1].indiaCTC}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Senior / Lead:</span>
                      <strong className="font-mono text-neutral-900">{leftDossier.compensationLadder[2].indiaCTC}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Silicon Failure Stakes */}
              {leftDossier && (
                <div className="space-y-1 pt-2 border-t border-neutral-100 text-xs">
                  <span className="font-bold text-neutral-800 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-600" />
                    <span>Tapeout Failure Risk:</span>
                  </span>
                  <p className="text-neutral-600 leading-relaxed text-[11px]">
                    {leftDossier.siliconFailureCaseStudy.failureMode}
                  </p>
                </div>
              )}

              {onSelectDossier && (
                <button
                  onClick={() => onSelectDossier(leftId)}
                  className="w-full py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer transition-colors text-center"
                >
                  Inspect Full {leftSubdomain.name.split(' ')[0]} Dossier
                </button>
              )}
            </div>

            {/* Right Card Overview */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-4 shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                  {rightSubdomain.domainName}
                </span>
                <h4 className="text-base font-bold text-neutral-900">{rightSubdomain.name}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">{rightSubdomain.tagline}</p>
              </div>

              {/* Jobs & Roles */}
              <div className="space-y-1 pt-2 border-t border-neutral-100">
                <span className="text-xs font-bold text-neutral-700">Primary Job Titles:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {rightSubdomain.jobs.map(j => (
                    <span key={j.id} className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-800 text-[11px] font-medium">
                      {j.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compensation Tier */}
              {rightDossier && (
                <div className="space-y-1.5 pt-2 border-t border-neutral-100 bg-neutral-50 p-3 rounded-lg border border-neutral-200/70">
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Compensation Ladder:</span>
                  </span>
                  <div className="text-xs text-neutral-700 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Entry (0-2 Yrs):</span>
                      <strong className="font-mono text-neutral-900">{rightDossier.compensationLadder[0].indiaCTC}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Mid (2-5 Yrs):</span>
                      <strong className="font-mono text-neutral-900">{rightDossier.compensationLadder[1].indiaCTC}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Senior / Lead:</span>
                      <strong className="font-mono text-neutral-900">{rightDossier.compensationLadder[2].indiaCTC}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Silicon Failure Stakes */}
              {rightDossier && (
                <div className="space-y-1 pt-2 border-t border-neutral-100 text-xs">
                  <span className="font-bold text-neutral-800 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-600" />
                    <span>Tapeout Failure Risk:</span>
                  </span>
                  <p className="text-neutral-600 leading-relaxed text-[11px]">
                    {rightDossier.siliconFailureCaseStudy.failureMode}
                  </p>
                </div>
              )}

              {onSelectDossier && (
                <button
                  onClick={() => onSelectDossier(rightId)}
                  className="w-full py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer transition-colors text-center"
                >
                  Inspect Full {rightSubdomain.name.split(' ')[0]} Dossier
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-neutral-50 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
