import React, { useState } from 'react';
import { FlagshipProject, Discipline } from '../types';
import { CircuitBoard, Cpu, FileCode2, Copy, Check, FolderTree, CpuIcon, Sparkles } from 'lucide-react';

interface ProjectsViewProps {
  projects: FlagshipProject[];
  selectedDiscipline: Discipline | 'all';
  selectedField: string;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  selectedDiscipline,
  selectedField
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredProjects = projects.filter((project) => {
    if (selectedDiscipline !== 'all' && project.discipline !== selectedDiscipline) {
      return false;
    }
    if (selectedField !== 'all' && project.field !== selectedField) {
      return false;
    }
    return true;
  });

  const vlsiProjects = filteredProjects.filter((p) => p.discipline === 'vlsi');
  const embeddedProjects = filteredProjects.filter((p) => p.discipline === 'embedded');

  const renderProjectCard = (project: FlagshipProject) => {
    const isVLSI = project.discipline === 'vlsi';

    return (
      <div
        key={project.id}
        className={`bg-neutral-900 border rounded-xl p-5 transition-all shadow-sm ${
          isVLSI
            ? 'border-cyan-900/40 hover:border-cyan-500/50'
            : 'border-emerald-900/40 hover:border-emerald-500/50'
        }`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-neutral-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  isVLSI
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}
              >
                {project.badge}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                Difficulty: {project.difficulty}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-950 text-neutral-400 border border-neutral-800">
                {project.field.replace(/_/g, ' ').toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-neutral-400">
              <span className="text-neutral-500 font-semibold uppercase">Target Roles:</span>
              {project.targetRoles.map((role, idx) => (
                <span key={idx} className="text-neutral-300 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
          {project.summary}
        </p>

        {/* Hardware Specifications Table */}
        {project.hardwareSpecs && (
          <div className="mt-4 bg-neutral-950 p-3.5 rounded-lg border border-neutral-800">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2 flex items-center gap-1.5">
              <CpuIcon className="w-3.5 h-3.5 text-cyan-400" />
              Hardware & Implementation Metrics:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {Object.entries(project.hardwareSpecs).map(([key, val], idx) => (
                <div key={idx} className="bg-neutral-900/70 p-2 rounded border border-neutral-800/80">
                  <span className="text-[10px] text-neutral-500 uppercase font-semibold block">{key}</span>
                  <span className="text-xs font-mono font-medium text-neutral-200">{String(val)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Architectural Highlights */}
        {project.architectureDetails && project.architectureDetails.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
              Architectural Highlights & Innovations:
            </h4>
            <ul className="space-y-1.5">
              {project.architectureDetails.map((detail, idx) => (
                <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 bg-neutral-950 p-2 rounded border border-neutral-800/80">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ready-to-Use Resume Bullet Points */}
        {project.resumeBulletPoints && project.resumeBulletPoints.length > 0 && (
          <div className="mt-4 bg-neutral-950 p-3.5 rounded-lg border border-neutral-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Action-Oriented Resume Bullet Points (Copy & Paste):
              </span>
              <button
                onClick={() => copyToClipboard(project.resumeBulletPoints?.join('\n• ') || '', project.id)}
                className="text-[11px] px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center gap-1 transition-colors"
              >
                {copiedId === project.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Bullets</span>
                  </>
                )}
              </button>
            </div>
            <ul className="space-y-2 text-xs text-neutral-300 font-sans">
              {project.resumeBulletPoints.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommended GitHub Repository Structure */}
        {project.githubStructure && project.githubStructure.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
              <FolderTree className="w-3.5 h-3.5 text-neutral-400" />
              Recommended GitHub Repository File Structure:
            </h4>
            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 font-mono text-[11px] text-neutral-400 space-y-1">
              {project.githubStructure.map((line, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-neutral-600">📁</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <CircuitBoard className="w-5 h-5 text-rose-400" />
          <span>Flagship Portfolio Engineering Projects</span>
          <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
            {filteredProjects.length} Projects
          </span>
        </h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          Production-grade hardware and firmware projects with architectural specifications, verifiable deliverables, and action-oriented resume bullet points.
        </p>
      </div>

      {/* VLSI Section */}
      {(selectedDiscipline === 'all' || selectedDiscipline === 'vlsi') && vlsiProjects.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-cyan-900/50 pb-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>VLSI & Silicon Flagship Projects</span>
                <span className="text-xs font-mono px-2 py-0.2 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {vlsiProjects.length} Projects
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Pipelined RISC-V Processor Core, UVM 1.2 AXI-Stream Crossbar Verification, SkyWater 130nm ASIC Tapeout
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {vlsiProjects.map((project) => renderProjectCard(project))}
          </div>
        </section>
      )}

      {/* Embedded & Firmware Section */}
      {(selectedDiscipline === 'all' || selectedDiscipline === 'embedded') && embeddedProjects.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-emerald-900/50 pb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Embedded & Firmware Flagship Projects</span>
                <span className="text-xs font-mono px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {embeddedProjects.length} Projects
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                FreeRTOS Multi-Tasking IoT Telemetry, Linux Character Device Driver with DMA, Fail-Safe Dual-Bank Bootloader
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {embeddedProjects.map((project) => renderProjectCard(project))}
          </div>
        </section>
      )}
    </div>
  );
};
