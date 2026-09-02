import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  Terminal, 
  ExternalLink, 
  CheckSquare, 
  Square, 
  Copy, 
  Check, 
  Cpu, 
  Activity, 
  Code2, 
  Layers,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  RotateCcw,
  Search,
  Filter,
  CheckCheck
} from 'lucide-react';
import { ToolItem, ToolSkill } from '../types';
import { 
  getStoredTools, 
  saveStoredTools, 
  resetStoredTools, 
  getCheckedToolSkills, 
  saveCheckedToolSkills 
} from '../utils/storage';

const BLANK_TOOL: ToolItem = {
  id: '',
  name: '',
  category: 'Simulation & Verification',
  description: '',
  coreConcepts: ['RTL Simulation', 'Waveform Analysis', 'Regression'],
  keySkillsToMaster: [
    {
      id: '',
      name: 'Automated Scripting & Regression',
      description: 'Run automated regression runs with exit status checks.'
    }
  ],
  officialUrl: 'https://',
  installOrRunCommand: ''
};

export const ToolsMasterView: React.FC = () => {
  const [toolsList, setToolsList] = useState<ToolItem[]>(() => getStoredTools());
  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>(() => getCheckedToolSkills());
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Mastered' | 'Pending'>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<ToolItem | null>(null);
  const [formState, setFormState] = useState<ToolItem>(BLANK_TOOL);
  const [formConceptsRaw, setFormConceptsRaw] = useState<string>('');
  const [formSkillsRaw, setFormSkillsRaw] = useState<string>('');

  const toggleSkill = (skillId: string) => {
    const nextState = {
      ...checkedSkills,
      [skillId]: !checkedSkills[skillId]
    };
    setCheckedSkills(nextState);
    saveCheckedToolSkills(nextState);
  };

  const toggleAllToolSkills = (tool: ToolItem, shouldCheck: boolean) => {
    const nextState = { ...checkedSkills };
    tool.keySkillsToMaster.forEach(s => {
      nextState[s.id] = shouldCheck;
    });
    setCheckedSkills(nextState);
    saveCheckedToolSkills(nextState);
  };

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleOpenAdd = () => {
    const newTool: ToolItem = {
      ...BLANK_TOOL,
      id: `tool-${Date.now()}`,
      keySkillsToMaster: [
        {
          id: `tskill-${Date.now()}-1`,
          name: 'Core Tool Execution & CLI Flags',
          description: 'Master non-interactive batch simulation and linting flags.'
        },
        {
          id: `tskill-${Date.now()}-2`,
          name: 'Coverage & Assertion Instrumentation',
          description: 'Generate code and branch coverage metrics automatically.'
        }
      ]
    };
    setEditingTool(null);
    setFormState(newTool);
    setFormConceptsRaw(newTool.coreConcepts.join(', '));
    setFormSkillsRaw(
      newTool.keySkillsToMaster.map(s => `${s.name} :: ${s.description}`).join('\n')
    );
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tool: ToolItem) => {
    setEditingTool(tool);
    setFormState({ ...tool });
    setFormConceptsRaw(tool.coreConcepts.join(', '));
    setFormSkillsRaw(
      tool.keySkillsToMaster.map(s => `${s.name} :: ${s.description}`).join('\n')
    );
    setIsModalOpen(true);
  };

  const handleSaveTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) return;

    const parsedConcepts = formConceptsRaw
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const lines = formSkillsRaw.split('\n').map(l => l.trim()).filter(Boolean);
    const parsedSkills: ToolSkill[] = lines.map((line, idx) => {
      const parts = line.split('::').map(p => p.trim());
      const name = parts[0] || `Skill ${idx + 1}`;
      const description = parts[1] || name;
      return {
        id: editingTool?.keySkillsToMaster[idx]?.id || `tskill-${Date.now()}-${idx}`,
        name,
        description
      };
    });

    const finalized: ToolItem = {
      ...formState,
      name: formState.name.trim(),
      coreConcepts: parsedConcepts.length > 0 ? parsedConcepts : ['EDA Toolchain'],
      keySkillsToMaster: parsedSkills.length > 0 ? parsedSkills : [
        { id: `tskill-${Date.now()}-1`, name: 'Execution Proficiency', description: 'Run tool in pipeline.' }
      ]
    };

    let updated: ToolItem[];
    if (editingTool) {
      updated = toolsList.map(t => t.id === finalized.id ? finalized : t);
    } else {
      updated = [...toolsList, finalized];
    }

    setToolsList(updated);
    saveStoredTools(updated);
    setIsModalOpen(false);
  };

  const handleDeleteTool = (toolId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete tool "${name}"?`)) {
      const updated = toolsList.filter(t => t.id !== toolId);
      setToolsList(updated);
      saveStoredTools(updated);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all tools to the standard EDA and silicon toolchain?')) {
      const reset = resetStoredTools();
      setToolsList(reset);
    }
  };

  // Stats
  let totalSkills = 0;
  let doneSkills = 0;
  toolsList.forEach(t => {
    t.keySkillsToMaster.forEach(s => {
      totalSkills += 1;
      if (checkedSkills[s.id]) doneSkills += 1;
    });
  });
  const percent = totalSkills > 0 ? Math.round((doneSkills / totalSkills) * 100) : 0;

  const toolCategories = useMemo(() => {
    return ['All', ...Array.from(new Set(toolsList.map(t => t.category))).sort()];
  }, [toolsList]);

  const filteredTools = useMemo(() => {
    return toolsList.filter(t => {
      const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        t.name.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) || 
        t.coreConcepts.some(c => c.toLowerCase().includes(q)) ||
        t.keySkillsToMaster.some(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) ||
        (t.installOrRunCommand && t.installOrRunCommand.toLowerCase().includes(q));

      const toolDoneCount = t.keySkillsToMaster.filter(s => checkedSkills[s.id]).length;
      const isMastered = toolDoneCount === t.keySkillsToMaster.length && t.keySkillsToMaster.length > 0;
      const matchStatus = filterStatus === 'All' || 
        (filterStatus === 'Mastered' && isMastered) || 
        (filterStatus === 'Pending' && !isMastered);

      return matchCat && matchSearch && matchStatus;
    });
  }, [toolsList, selectedCategory, searchQuery, filterStatus, checkedSkills]);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              <Wrench className="w-6 h-6 text-neutral-800" />
              EDA, Silicon & Embedded Toolchain Mastery
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Industry-standard tool suites required for FPGA, ASIC Verification, RTL Design, and Embedded firmware roles with actionable sub-skills checklists.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-neutral-50 px-4 py-2.5 rounded-lg border border-neutral-200">
              <div>
                <div className="text-xs text-neutral-500 font-medium">Tool Skills Mastered</div>
                <div className="text-lg font-bold text-neutral-900">{doneSkills} / {totalSkills} ({percent}%)</div>
              </div>
              <div className="w-16 bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Tool</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-neutral-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-xs text-neutral-500 transition-colors cursor-pointer"
              title="Reset tools to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search tools, commands, skills (Vivado, vsim, lint)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400"
            />
          </div>

          {/* Category Dropdown on Mobile / Pills on Desktop */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <div className="flex items-center gap-1 text-xs text-neutral-500 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              {toolCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-100">
          <span className="text-[11px] font-semibold text-neutral-500 mr-1">Status:</span>
          {(['All', 'Pending', 'Mastered'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
            >
              {st === 'All' ? `All Tools (${toolsList.length})` : st === 'Pending' ? '🟡 In Progress' : '🟢 Mastered'}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="space-y-5">
        {filteredTools.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-xl p-12 text-center text-neutral-500">
            <Wrench className="w-8 h-8 mx-auto mb-2 text-neutral-400" />
            <p className="text-sm font-semibold">No tools match your filter criteria.</p>
            <p className="text-xs mt-1">Try resetting the search or category filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setFilterStatus('All'); }}
              className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredTools.map(tool => {
            const toolDoneCount = tool.keySkillsToMaster.filter(s => checkedSkills[s.id]).length;
            const toolTotal = tool.keySkillsToMaster.length;
            const allChecked = toolDoneCount === toolTotal && toolTotal > 0;

            return (
              <div key={tool.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                {/* Tool Header */}
                <div className="p-4.5 bg-neutral-50 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-neutral-900">{tool.name}</h3>
                      <span className="text-xs px-2.5 py-0.5 rounded bg-neutral-200 text-neutral-800 font-semibold">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">{tool.description}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => toggleAllToolSkills(tool, !allChecked)}
                      className={`text-xs px-2.5 py-1 rounded font-semibold border transition-colors cursor-pointer inline-flex items-center gap-1 ${
                        allChecked
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                      }`}
                      title={allChecked ? 'Uncheck all skills' : 'Mark all skills done'}
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>{allChecked ? 'All Done' : `${toolDoneCount}/${toolTotal} Done`}</span>
                    </button>

                    {tool.officialUrl && (
                      <a
                        href={tool.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-white font-medium inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" /> Docs
                      </a>
                    )}
                    <button
                      onClick={() => handleOpenEdit(tool)}
                      className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-md transition-colors cursor-pointer"
                      title="Edit tool"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTool(tool.id, tool.name)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                      title="Delete tool"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              {/* Tool Body */}
              <div className="p-5 space-y-4">
                {/* Core Concepts */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Core Concepts Handled
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.coreConcepts.map((concept, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 font-medium">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sub-Skills Checklist */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Actionable Sub-Skills Checklist
                  </div>
                  <div className="divide-y divide-neutral-100 rounded-lg border border-neutral-200 overflow-hidden bg-neutral-50/40">
                    {tool.keySkillsToMaster.map(skill => {
                      const isDone = !!checkedSkills[skill.id];
                      return (
                        <div
                          key={skill.id}
                          onClick={() => toggleSkill(skill.id)}
                          className={`p-3 flex items-start gap-3 cursor-pointer transition-colors ${
                            isDone ? 'bg-indigo-50/30' : 'hover:bg-neutral-50'
                          }`}
                        >
                          <div className="pt-0.5">
                            {isDone ? (
                              <div className="w-4 h-4 rounded bg-indigo-600 text-white flex items-center justify-center">
                                <CheckSquare className="w-3.5 h-3.5" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded border border-neutral-300 hover:border-neutral-500" />
                            )}
                          </div>
                          <div>
                            <span className={`text-xs font-bold ${isDone ? 'text-neutral-500 line-through' : 'text-neutral-900'}`}>
                              {skill.name}
                            </span>
                            <p className="text-xs text-neutral-600 mt-0.5">{skill.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CLI Command Helper */}
                {tool.installOrRunCommand && (
                  <div className="pt-1">
                    <div className="flex items-center justify-between bg-neutral-900 text-neutral-200 px-3 py-2 rounded-lg text-xs font-mono">
                      <div className="flex items-center gap-2 truncate">
                        <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="truncate">{tool.installOrRunCommand}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(tool.installOrRunCommand!)}
                        className="text-neutral-400 hover:text-white transition-colors ml-2 cursor-pointer"
                        title="Copy command"
                      >
                        {copiedCmd === tool.installOrRunCommand ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        }))}
      </div>

      {/* Add / Edit Tool Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    {editingTool ? 'Edit EDA / Embedded Tool' : 'Add New Tool to Stack'}
                  </h3>
                  <p className="text-xs text-neutral-500">Configure sub-skills and run command</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTool} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Tool Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Verilator / OpenROAD / Vivado"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Category</label>
                  <input
                    type="text"
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value as ToolItem['category'] })}
                    placeholder="e.g. Simulation & Verification / ASIC Backend"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">Tool Purpose / Description</label>
                <textarea
                  rows={2}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Primary role in semiconductor engineering workflow..."
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">
                  Core Concepts Handled (comma separated)
                </label>
                <input
                  type="text"
                  value={formConceptsRaw}
                  onChange={(e) => setFormConceptsRaw(e.target.value)}
                  placeholder="e.g. C++ Transpilation, Linting, Waveform Generation"
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">
                  Sub-Skills Checklist (1 per line format: <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-700">Skill Name :: Skill Description</code>)
                </label>
                <textarea
                  rows={3}
                  value={formSkillsRaw}
                  onChange={(e) => setFormSkillsRaw(e.target.value)}
                  placeholder="Fast C++ Model Compilation :: Compile RTL to multithreaded binary&#10;Waveform Trace Dumping :: Dump VCD/FST traces for GTKWave"
                  className="w-full text-xs font-mono p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Official URL / Docs</label>
                  <input
                    type="url"
                    value={formState.officialUrl || ''}
                    onChange={(e) => setFormState({ ...formState, officialUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Install or Run Command</label>
                  <input
                    type="text"
                    value={formState.installOrRunCommand || ''}
                    onChange={(e) => setFormState({ ...formState, installOrRunCommand: e.target.value })}
                    placeholder="e.g. sudo apt install verilator"
                    className="w-full text-xs font-mono p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
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
                  {editingTool ? 'Save Tool' : 'Create Tool'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
