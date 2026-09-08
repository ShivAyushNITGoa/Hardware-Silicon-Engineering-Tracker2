import React, { useState } from 'react';
import { 
  Award, 
  Copy, 
  Check, 
  FolderGit2, 
  Cpu, 
  Terminal, 
  Wrench, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { BTECH_CAPSTONE_PROJECTS, CapstoneProjectProposal } from '../data/nitGoaAdvancedData';

export const NitGoaCapstoneAdvisor: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredProjects = BTECH_CAPSTONE_PROJECTS.filter(p => {
    if (selectedTrack === 'all') return true;
    return p.track.toLowerCase() === selectedTrack.toLowerCase();
  });

  const handleCopyResumeBullet = (bullet: string, id: string) => {
    navigator.clipboard.writeText(bullet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>Academic B.Tech Major Project Advisor &bull; 6th-8th Semester</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
            Approved B.Tech Capstone Project Blueprints
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            Production-grade semiconductor projects feasible with NIT Goa EEE Department lab equipment (Basys3 Artix-7, Zynq SoC, Vivado) designed to serve as primary placement talking points.
          </p>
        </div>
      </div>

      {/* Track Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5">
        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Track:</span>
        {['all', 'RTL Design', 'ASIC Verification', 'FPGA Accelerator', 'Open-Source ASIC', 'Embedded Automotive', 'AMS / Power'].map(t => (
          <button
            key={t}
            onClick={() => setSelectedTrack(t)}
            className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              selectedTrack.toLowerCase() === t.toLowerCase()
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {t === 'all' ? 'All Capstones (6)' : t}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredProjects.map((p) => (
          <div 
            key={p.id}
            className="p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-white shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-800">
                  {p.track}
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  6 Credits (Phase 1 &amp; 2)
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                {p.title}
              </h4>

              <p className="text-xs text-neutral-600 leading-relaxed">
                {p.problemStatement}
              </p>

              {/* Hardware & Toolchain */}
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1.5 text-xs">
                <div className="flex items-center gap-1 text-neutral-800 font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Hardware Required:</span>
                  <span className="text-neutral-600 font-normal ml-1">{p.hardwareRequired}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-800 font-semibold">
                  <Wrench className="w-3.5 h-3.5 text-amber-600" />
                  <span>Toolchain:</span>
                  <span className="text-neutral-600 font-normal ml-1">{p.toolchain}</span>
                </div>
              </div>

              {/* Deliverables */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider block">
                  Mandatory Submission Deliverables:
                </span>
                <ul className="space-y-1 text-xs text-neutral-600">
                  {p.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">&bull;</span>
                      <span className="leading-relaxed">{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resume Bullet Point with One-Click Copy */}
              <div className="p-3 rounded-xl bg-neutral-900 text-white space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400 font-semibold">Resume Bullet Example (STAR Format):</span>
                  <button
                    onClick={() => handleCopyResumeBullet(p.resumeBulletExample, p.id)}
                    className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors text-[10px]"
                    title="Copy Resume Bullet"
                  >
                    {copiedId === p.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === p.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-xs text-indigo-300 font-mono leading-relaxed italic">
                  "{p.resumeBulletExample}"
                </div>
              </div>
            </div>

            {/* Department Suitability Tag */}
            <div className="pt-2 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span><strong>NIT Goa Lab Match:</strong> {p.nitGoaSuitability}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
