import React, { useState, useMemo } from 'react';
import { 
  Rocket, 
  Search, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  Plus, 
  RotateCcw, 
  Edit2, 
  Trash2, 
  Terminal, 
  Layers, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  Award
} from 'lucide-react';
import { Project } from '../types';
import { getStoredProjects, saveStoredProjects, resetStoredProjects } from '../utils/storage';

export const FlagshipProjectsView: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(() => getStoredProjects());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Shipped' | 'Active'>('All');

  const [stepChecks, setStepChecks] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem('ayush_tracker_project_steps');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const toggleStep = (stepKey: string) => {
    const updated = { ...stepChecks, [stepKey]: !stepChecks[stepKey] };
    setStepChecks(updated);
    try {
      localStorage.setItem('ayush_tracker_project_steps', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const setAllSteps = (project: Project, val: boolean) => {
    const updated = { ...stepChecks };
    project.steps?.forEach((_, idx) => {
      updated[`${project.id}_step_${idx}`] = val;
    });
    setStepChecks(updated);
    try {
      localStorage.setItem('ayush_tracker_project_steps', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset engineering projects back to the 4 core silicon flagship specs?')) {
      const def = resetStoredProjects();
      setProjects(def);
      setStepChecks({});
      localStorage.removeItem('ayush_tracker_project_steps');
    }
  };

  // Overall calculations
  let totalSteps = 0;
  let doneSteps = 0;
  projects.forEach((p) => {
    p.steps?.forEach((_, idx) => {
      totalSteps += 1;
      if (stepChecks[`${p.id}_step_${idx}`]) doneSteps += 1;
    });
  });
  const overallPercent = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const pSteps = p.steps || [];
      const completed = pSteps.length > 0 && pSteps.every((_, idx) => stepChecks[`${p.id}_step_${idx}`]);

      if (statusFilter === 'Shipped' && !completed) return false;
      if (statusFilter === 'Active' && completed) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesPurpose = p.purpose?.toLowerCase().includes(q);
        const matchesArch = p.architectureFlow?.toLowerCase().includes(q);
        const matchesMetrics = p.metrics?.toLowerCase().includes(q);
        if (!matchesName && !matchesPurpose && !matchesArch && !matchesMetrics) return false;
      }
      return true;
    });
  }, [projects, statusFilter, searchQuery, stepChecks]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>Silicon Portfolio Proof-of-Work</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
              {projects.length} Flagship Builds
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Flagship Engineering Projects &amp; Silicon Proof
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Production-grade silicon and embedded projects engineered to dominate technical interviews with verifiable testbench coverage, timing closure, and live hardware demos.
          </p>
        </div>

        {/* Global Progress */}
        <div className="mt-5 relative z-10 bg-neutral-800/80 rounded-xl p-3 border border-neutral-700/50 max-w-xl">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-neutral-300">Total Verification Milestones</span>
            <span className="text-cyan-400 font-mono">{doneSteps} / {totalSteps} Completed ({overallPercent}%)</span>
          </div>
          <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search flagship projects, metrics, architectures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-neutral-100 p-1 rounded-xl">
              {(['All', 'Active', 'Shipped'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setStatusFilter(mode)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    statusFilter === mode ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {filteredProjects.map((proj) => {
          const pSteps = proj.steps || [];
          const doneInProject = pSteps.filter((_, idx) => stepChecks[`${proj.id}_step_${idx}`]).length;
          const projectPercent = pSteps.length > 0 ? Math.round((doneInProject / pSteps.length) * 100) : 0;
          const isComplete = doneInProject === pSteps.length && pSteps.length > 0;

          return (
            <div
              key={proj.id}
              className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5 hover:border-neutral-300 transition-all"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-neutral-100 pb-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 rounded">
                      {proj.targetWeek || 'Target: Weeks 1-8'}
                    </span>
                    {isComplete ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Shipped &amp; Verified
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        In Progress ({projectPercent}%)
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {proj.purpose}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setAllSteps(proj, !isComplete)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    {isComplete ? 'Mark All Incomplete' : 'Mark All Done'}
                  </button>
                </div>
              </div>

              {/* Prerequisites & Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-neutral-50 rounded-xl p-4 space-y-1.5 border border-neutral-100">
                  <span className="font-bold text-neutral-800 uppercase tracking-wider text-[10px]">
                    Prerequisites &amp; Theoretical Tooling:
                  </span>
                  <p className="text-neutral-600 leading-relaxed">
                    {proj.prerequisites}
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-xl p-4 space-y-1.5 border border-neutral-100">
                  <span className="font-bold text-neutral-800 uppercase tracking-wider text-[10px]">
                    Target Metrics &amp; Benchmarks:
                  </span>
                  <p className="text-neutral-600 leading-relaxed font-mono">
                    {proj.metrics}
                  </p>
                </div>
              </div>

              {/* Architecture Flow */}
              {proj.architectureFlow && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Architecture &amp; Subsystem Pipeline:
                  </span>
                  <div className="bg-neutral-950 text-neutral-200 rounded-xl p-3.5 text-xs font-mono leading-relaxed whitespace-pre-wrap">
                    {proj.architectureFlow}
                  </div>
                </div>
              )}

              {/* Implementation Steps Checklist */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Implementation Milestones &amp; RTL Sign-off ({doneInProject}/{pSteps.length}):
                </span>
                <div className="space-y-2">
                  {pSteps.map((step, idx) => {
                    const stepKey = `${proj.id}_step_${idx}`;
                    const isChecked = !!stepChecks[stepKey];

                    return (
                      <div
                        key={idx}
                        onClick={() => toggleStep(stepKey)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                            : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-800'
                        }`}
                      >
                        <button className="mt-0.5 shrink-0 cursor-pointer">
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Circle className="w-4 h-4 text-neutral-400" />
                          )}
                        </button>
                        <span className={`leading-relaxed ${isChecked ? 'line-through opacity-75' : ''}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ATS Resume Proof of Work Bullet */}
              {proj.resumeBullet && (
                <div className="bg-cyan-50/60 border border-cyan-200/70 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800">
                      Tailored ATS Resume Proof of Work Bullet
                    </span>
                    <button
                      onClick={() => copyToClipboard(proj.resumeBullet || '', proj.id)}
                      className="flex items-center gap-1 text-xs text-cyan-800 hover:text-cyan-950 font-semibold cursor-pointer"
                    >
                      {copiedId === proj.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Bullet</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-cyan-950 leading-relaxed font-sans">
                    {proj.resumeBullet}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
