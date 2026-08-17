import React, { useState } from 'react';
import { 
  Rocket, 
  CheckSquare, 
  Copy, 
  Check, 
  Cpu, 
  Layers, 
  Activity, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  ChevronRight,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  RotateCcw
} from 'lucide-react';
import { FlagshipProject } from '../types';
import { 
  getStoredProjects, 
  saveStoredProjects, 
  resetStoredProjects 
} from '../utils/storage';

const BLANK_PROJECT: FlagshipProject = {
  id: '',
  name: '',
  targetWeek: 'Weeks 5-8',
  purpose: '',
  prerequisites: 'Digital Design Fundamentals, Verilog HDL, Basic Computer Architecture',
  architectureFlow: '',
  steps: [
    'Write RTL specification & interface protocols',
    'Develop synthesizable Verilog / SystemVerilog modules',
    'Write randomized testbench & assertions',
    'Verify timing closure & synthesize with Yosys/OpenLane'
  ],
  validation: 'Cocotb randomized stimulus + SVA formal properties + waveform analysis in GTKWave.',
  metrics: '0 timing violations @ 200MHz, 100% statement & branch coverage, <5k logic cell area.',
  githubEvidence: 'Synthesizable SystemVerilog code, automated cocotb test suite with CI workflow, waveform screenshots',
  demoRequirement: 'Live simulation trace demonstration showing correct pipeline execution without stall hazards',
  resumeBullet: 'Designed and verified high-throughput custom hardware accelerator achieving zero-overhead pipeline execution and 100% functional branch coverage.',
  jageshwarComparison: 'Demonstrates industry-grade RTL verification and hardware-software co-design competence'
};

export const FlagshipProjectsView: React.FC = () => {
  const [projectsList, setProjectsList] = useState<FlagshipProject[]>(() => getStoredProjects());
  const [copiedBulletId, setCopiedBulletId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem('ayush_tracker_project_steps');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<FlagshipProject | null>(null);
  const [formState, setFormState] = useState<FlagshipProject>(BLANK_PROJECT);
  const [formStepsRaw, setFormStepsRaw] = useState<string>('');

  const toggleStep = (key: string) => {
    const nextState = { ...completedSteps, [key]: !completedSteps[key] };
    setCompletedSteps(nextState);
    try {
      localStorage.setItem('ayush_tracker_project_steps', JSON.stringify(nextState));
    } catch (e) {
      console.error(e);
    }
  };

  const copyResumeBullet = (projectId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletId(projectId);
    setTimeout(() => setCopiedBulletId(null), 2000);
  };

  const handleOpenAdd = () => {
    const newProj: FlagshipProject = {
      ...BLANK_PROJECT,
      id: `proj-${Date.now()}`
    };
    setEditingProject(null);
    setFormState(newProj);
    setFormStepsRaw(newProj.steps.join('\n'));
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: FlagshipProject) => {
    setEditingProject(project);
    setFormState({ ...project });
    setFormStepsRaw(project.steps.join('\n'));
    setIsModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) return;

    const parsedSteps = formStepsRaw
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const finalized: FlagshipProject = {
      ...formState,
      name: formState.name.trim(),
      steps: parsedSteps.length > 0 ? parsedSteps : ['Initial architecture & implementation.']
    };

    let updated: FlagshipProject[];
    if (editingProject) {
      updated = projectsList.map(p => p.id === finalized.id ? finalized : p);
    } else {
      updated = [...projectsList, finalized];
    }

    setProjectsList(updated);
    saveStoredProjects(updated);
    setIsModalOpen(false);
  };

  const handleDeleteProject = (projectId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete project "${name}"?`)) {
      const updated = projectsList.filter(p => p.id !== projectId);
      setProjectsList(updated);
      saveStoredProjects(updated);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset engineering projects back to the 4 core silicon flagship specs?')) {
      const reset = resetStoredProjects();
      setProjectsList(reset);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Flagship Engineering Projects
              </h2>
              <p className="text-sm text-neutral-600 mt-0.5">
                Production-level silicon and embedded projects designed to outcompete standard candidates with verified metrics and live demos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-neutral-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-xs text-neutral-500 transition-colors cursor-pointer"
              title="Reset projects to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projectsList.map((project, pIdx) => {
          const stepKeys = project.steps.map((_, idx) => `${project.id}_step_${idx}`);
          const doneCount = stepKeys.filter(k => completedSteps[k]).length;
          const totalCount = project.steps.length;
          const isAllDone = doneCount === totalCount && totalCount > 0;

          return (
            <div key={project.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
              {/* Card Header */}
              <div className="p-5 bg-neutral-50/80 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-900 text-white font-bold">
                      Flagship #{pIdx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900">{project.name}</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
                      {project.targetWeek}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">{project.purpose}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white border border-neutral-200 text-neutral-700">
                    {doneCount}/{totalCount} Milestones Done
                  </span>
                  {isAllDone && (
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      Shipped
                    </span>
                  )}
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-md transition-colors cursor-pointer"
                    title="Edit project"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id, project.name)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-5">
                {/* Architecture Pipeline */}
                <div className="bg-neutral-900 text-white p-4 rounded-xl space-y-1.5">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    Datapath & System Architecture Pipeline
                  </div>
                  <p className="text-xs font-mono text-neutral-200 leading-relaxed">
                    {project.architectureFlow}
                  </p>
                </div>

                {/* Milestone Checklist */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Step-by-Step Development Milestones
                  </div>
                  <div className="space-y-1.5">
                    {project.steps.map((step, idx) => {
                      const key = `${project.id}_step_${idx}`;
                      const isDone = !!completedSteps[key];

                      return (
                        <div
                          key={key}
                          onClick={() => toggleStep(key)}
                          className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-colors ${
                            isDone 
                              ? 'bg-emerald-50/40 border-emerald-200' 
                              : 'bg-white border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          <div className="pt-0.5 flex-shrink-0">
                            {isDone ? (
                              <div className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center">
                                <CheckSquare className="w-3.5 h-3.5" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded border border-neutral-300 hover:border-neutral-500" />
                            )}
                          </div>
                          <span className={`text-xs ${isDone ? 'line-through text-neutral-500' : 'text-neutral-900 font-medium'}`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Validation & Target Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <span className="font-bold text-neutral-900 block mb-1">Testing & Verification Proof:</span>
                    <p className="text-neutral-600">{project.validation}</p>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <span className="font-bold text-neutral-900 block mb-1">Target Quantitative Metrics:</span>
                    <p className="text-neutral-700 font-mono font-medium">{project.metrics}</p>
                  </div>
                </div>

                {/* Resume Bullet Copy Box */}
                <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Ready-to-Paste Resume Bullet
                    </span>
                    <button
                      onClick={() => copyResumeBullet(project.id, project.resumeBullet)}
                      className="text-xs px-2.5 py-1 bg-amber-200/60 hover:bg-amber-200 text-amber-900 font-semibold rounded flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedBulletId === project.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Bullet
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-amber-950 font-medium leading-relaxed italic bg-white/70 p-2.5 rounded border border-amber-200/50">
                    "{project.resumeBullet}"
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    {editingProject ? 'Edit Engineering Project' : 'Add New Flagship Project'}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Define architecture pipeline, development milestones, and verification metrics
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Project Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. RISC-V RV32I 5-Stage Pipelined Processor Core"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Target Timeline</label>
                  <input
                    type="text"
                    value={formState.targetWeek}
                    onChange={(e) => setFormState({ ...formState, targetWeek: e.target.value })}
                    placeholder="e.g. Weeks 5-8"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">Project Purpose & Industry Pitch</label>
                <textarea
                  rows={2}
                  value={formState.purpose}
                  onChange={(e) => setFormState({ ...formState, purpose: e.target.value })}
                  placeholder="Why this project proves elite hardware engineering capability..."
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">Datapath & Architecture Pipeline String</label>
                <textarea
                  rows={2}
                  value={formState.architectureFlow}
                  onChange={(e) => setFormState({ ...formState, architectureFlow: e.target.value })}
                  placeholder="IF (PC Gen) -> ID (Decoder/RegFile) -> EX (ALU/Branch) -> MEM (L1 D-Cache) -> WB"
                  className="w-full text-xs font-mono p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">
                  Step-by-Step Milestones (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={formStepsRaw}
                  onChange={(e) => setFormStepsRaw(e.target.value)}
                  placeholder="Write instruction fetch & decode stages&#10;Implement forwarding unit and hazard detection&#10;Develop Cocotb randomized testbench with 10k random instructions"
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Validation & Testing Methodology</label>
                  <textarea
                    rows={2}
                    value={formState.validation}
                    onChange={(e) => setFormState({ ...formState, validation: e.target.value })}
                    placeholder="Verification suites used (UVM, Cocotb, Verilator, etc.)..."
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Target Quantitative Metrics</label>
                  <textarea
                    rows={2}
                    value={formState.metrics}
                    onChange={(e) => setFormState({ ...formState, metrics: e.target.value })}
                    placeholder="Clock frequency, area, code coverage, CPI..."
                    className="w-full text-xs font-mono p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">Ready-to-Paste Resume Bullet</label>
                <textarea
                  rows={2}
                  value={formState.resumeBullet}
                  onChange={(e) => setFormState({ ...formState, resumeBullet: e.target.value })}
                  placeholder="Engineered X using Y resulting in Z metric improvement..."
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  {editingProject ? 'Save Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
