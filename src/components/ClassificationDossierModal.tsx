import React, { useState, useEffect } from 'react';
import { 
  X, 
  DollarSign, 
  AlertTriangle, 
  Terminal, 
  HelpCircle, 
  FolderGit2, 
  Copy, 
  Check, 
  ExternalLink, 
  Cpu, 
  Award,
  ChevronRight,
  ShieldAlert,
  Flame,
  Clock,
  Sparkles
} from 'lucide-react';
import { SUBDOMAIN_DOSSIERS, SubdomainDossier } from '../data/subdomains/dossierData';

interface ClassificationDossierModalProps {
  subdomainId: string | null;
  onClose: () => void;
  onNavigateToEncyclopedia?: () => void;
  onNavigateToCurriculum?: () => void;
  onNavigateToTools?: () => void;
}

export const ClassificationDossierModal: React.FC<ClassificationDossierModalProps> = ({
  subdomainId,
  onClose,
  onNavigateToEncyclopedia,
  onNavigateToCurriculum,
  onNavigateToTools
}) => {
  const [activeDossierTab, setActiveDossierTab] = useState<'compensation' | 'failure' | 'commands' | 'whiteboard' | 'portfolio'>('compensation');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!subdomainId) return null;

  const dossier: SubdomainDossier | undefined = SUBDOMAIN_DOSSIERS[subdomainId];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-neutral-900 text-white flex items-start justify-between gap-4 border-b border-neutral-800">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Cpu className="w-3.5 h-3.5" />
              <span>Engineering Dossier &bull; Deep Industrial Analysis</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              {dossier ? dossier.subdomainName : 'Subdomain Industrial Dossier'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Tapeout risks, compensation bands, exact EDA terminal invocations, and whiteboard interview solutions.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white cursor-pointer transition-colors"
            title="Close Dossier (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dossier Navigation Tabs */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 px-4 sm:px-6 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => setActiveDossierTab('compensation')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
              activeDossierTab === 'compensation'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Compensation Ladder</span>
          </button>

          <button
            onClick={() => setActiveDossierTab('failure')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
              activeDossierTab === 'failure'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Silicon Failure Case Study</span>
          </button>

          <button
            onClick={() => setActiveDossierTab('commands')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
              activeDossierTab === 'commands'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Terminal className="w-4 h-4 text-amber-600" />
            <span>EDA Tool Commands</span>
          </button>

          <button
            onClick={() => setActiveDossierTab('whiteboard')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
              activeDossierTab === 'whiteboard'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Whiteboard Derivation</span>
          </button>

          <button
            onClick={() => setActiveDossierTab('portfolio')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
              activeDossierTab === 'portfolio'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FolderGit2 className="w-4 h-4 text-neutral-700" />
            <span>GitHub Proof-of-Work</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!dossier ? (
            <div className="py-12 text-center text-neutral-500">
              <Cpu className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
              <p>Detailed technical dossier is currently being prepared for this subdomain.</p>
            </div>
          ) : (
            <>
              {/* Tab 1: Compensation Ladder */}
              {activeDossierTab === 'compensation' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-indigo-600" />
                        <span>Experience-Based Compensation Progression</span>
                      </h4>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Verified market numbers from semiconductor tier-1 MNCs (Qualcomm, TI, NVIDIA, Intel, AMD, Synopsys, Apple).
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      Market Benchmark: Top 5% Pay
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {dossier.compensationLadder.map((tier, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-white shadow-xs space-y-2.5 hover:border-indigo-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900 px-2 py-0.5 rounded bg-neutral-100">
                            {tier.level}
                          </span>
                          <span className="text-[11px] font-mono font-semibold text-neutral-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {tier.yearsExperience}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs text-neutral-500 font-medium">India Annual CTC:</div>
                          <div className="text-base font-extrabold text-neutral-900 font-mono">
                            {tier.indiaCTC}
                          </div>
                        </div>

                        <div className="space-y-1 pt-1.5 border-t border-neutral-100">
                          <div className="text-xs text-neutral-500 font-medium">US Base Salary:</div>
                          <div className="text-sm font-bold text-indigo-700 font-mono">
                            {tier.usRange}
                          </div>
                        </div>

                        <div className="text-[11px] text-neutral-600 bg-neutral-50 p-2 rounded border border-neutral-200/60 leading-relaxed">
                          <strong className="text-neutral-800">Bonus &amp; RSUs:</strong> {tier.bonusEquity}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Semiconductor Equity Acceleration Note:</span>
                    </div>
                    <p>
                      In fabless semiconductor giants, RSU equity refreshers at L2/L3 frequently double the effective take-home pay during chip release cycles. Specialized physical design and verification engineers consistently command a 20&ndash;35% premium over general software roles.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Silicon Failure Case Study */}
              {activeDossierTab === 'failure' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                      <h4 className="text-sm sm:text-base font-bold text-rose-950">
                        {dossier.siliconFailureCaseStudy.title}
                      </h4>
                    </div>
                    <p className="text-xs text-rose-900 leading-relaxed">
                      <strong>Failure Mode:</strong> {dossier.siliconFailureCaseStudy.failureMode}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
                      <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-rose-600" />
                        <span>1. Physical Root Cause:</span>
                      </div>
                      <p className="text-neutral-700 leading-relaxed">
                        {dossier.siliconFailureCaseStudy.physicalRootCause}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
                      <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-amber-600" />
                        <span>2. Impact at Tapeout &amp; Foundry:</span>
                      </div>
                      <p className="text-neutral-700 leading-relaxed">
                        {dossier.siliconFailureCaseStudy.impactAtTapeout}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
                      <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                        <Terminal className="w-4 h-4 text-indigo-600" />
                        <span>3. Detection Method in EDA / Lab:</span>
                      </div>
                      <p className="text-neutral-700 leading-relaxed">
                        {dossier.siliconFailureCaseStudy.detectionMethod}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/70 space-y-2">
                      <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span>4. Industrial Signoff Mitigation:</span>
                      </div>
                      <p className="text-emerald-900 leading-relaxed">
                        {dossier.siliconFailureCaseStudy.industrialMitigation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: EDA Tool Commands */}
              {activeDossierTab === 'commands' && (
                <div className="space-y-4">
                  <div className="text-xs text-neutral-600">
                    Exact industrial tool invocation commands and batch scripts used by production engineering teams:
                  </div>

                  <div className="space-y-3">
                    {dossier.edaToolCommands.map((cmd, idx) => (
                      <div key={idx} className="rounded-xl border border-neutral-800 bg-neutral-950 text-white overflow-hidden shadow-xs">
                        <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-xs">
                          <span className="font-bold text-indigo-400 font-mono">{cmd.tool}</span>
                          <button
                            onClick={() => handleCopy(cmd.command, `cmd-${idx}`)}
                            className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors text-[11px]"
                            title="Copy Command to Clipboard"
                          >
                            {copiedCmd === `cmd-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedCmd === `cmd-${idx}` ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        <div className="p-3.5 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                          $ {cmd.command}
                        </div>

                        <div className="px-4 py-2.5 bg-neutral-900/60 border-t border-neutral-900 text-neutral-400 text-xs">
                          <strong className="text-neutral-200">Execution Purpose:</strong> {cmd.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Whiteboard Derivation */}
              {activeDossierTab === 'whiteboard' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/60 space-y-2">
                    <span className="text-[11px] uppercase font-bold text-indigo-700 tracking-wider">
                      Technical Whiteboard Problem
                    </span>
                    <h4 className="text-sm font-bold text-neutral-900">
                      {dossier.whiteboardProblem.title}
                    </h4>
                    <p className="text-xs text-neutral-800 leading-relaxed font-medium">
                      {dossier.whiteboardProblem.question}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-neutral-300 bg-neutral-900 text-white font-mono text-xs overflow-x-auto">
                    <div className="text-[11px] text-neutral-400 mb-1 uppercase font-bold">Governing Formula / Mathematical Boundary:</div>
                    <div className="text-amber-300 text-sm font-bold py-1">
                      {dossier.whiteboardProblem.formulaOrSchematic}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2.5">
                    <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Step-by-Step Whiteboard Solution &amp; Derivation:
                    </h5>
                    <ol className="space-y-2 text-xs text-neutral-700 list-decimal pl-4 leading-relaxed">
                      {dossier.whiteboardProblem.stepByStepSolution.map((step, idx) => (
                        <li key={idx} className="pl-1">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-950 text-xs space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Interviewer Elimination Trap:</span>
                    </div>
                    <p className="text-rose-900">
                      {dossier.whiteboardProblem.interviewerTrap}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 5: GitHub Proof-of-Work */}
              {activeDossierTab === 'portfolio' && (
                <div className="space-y-4">
                  <div className="text-xs text-neutral-600">
                    To beat 95% of applicants, upload these 3 verified hardware proof-of-work repositories to your public GitHub:
                  </div>

                  <div className="space-y-3">
                    {dossier.candidateProofOfWork.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-white shadow-xs space-y-2 hover:border-indigo-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs sm:text-sm font-bold text-neutral-900 flex items-center gap-2">
                            <FolderGit2 className="w-4 h-4 text-indigo-600" />
                            <span>{item.title}</span>
                          </h5>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                            Artifact #{idx + 1}
                          </span>
                        </div>

                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-2 border-t border-neutral-100 flex flex-wrap gap-2 items-center">
                          <span className="text-[11px] font-bold text-neutral-500">Key Deliverables:</span>
                          {item.keyDeliverables.map((deliv, dIdx) => (
                            <span key={dIdx} className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-800 text-[11px] font-medium">
                              {deliv}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Quick Actions */}
        <div className="p-3.5 sm:p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-neutral-500 text-xs">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-800 font-mono text-[11px]">Esc</kbd> to close</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToTools && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToTools();
                }}
                className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 font-medium cursor-pointer transition-colors"
              >
                Open EDA Tools View
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold cursor-pointer transition-colors"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
