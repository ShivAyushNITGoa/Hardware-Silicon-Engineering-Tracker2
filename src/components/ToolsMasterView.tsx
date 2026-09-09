import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  Search, 
  CheckCircle2, 
  Circle, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Edit2, 
  Plus, 
  Trash2, 
  RotateCcw,
  Sparkles,
  Layers,
  Code,
  X
} from 'lucide-react';
import { EDATool } from '../types';
import { 
  getStoredTools, 
  saveStoredTools, 
  resetStoredTools,
  getCheckedToolSkills,
  saveCheckedToolSkills
} from '../utils/storage';

interface ToolFormData {
  name: string;
  category: string;
  licenseType: string;
  description: string;
  standardCommand: string;
  documentationUrl: string;
  skillsText: string;
}

const BLANK_TOOL_FORM: ToolFormData = {
  name: '',
  category: 'Simulation & Verification',
  licenseType: 'Open Source / Academic',
  description: '',
  standardCommand: '',
  documentationUrl: '',
  skillsText: ''
};

export const ToolsMasterView: React.FC = () => {
  const [tools, setTools] = useState<EDATool[]>(() => getStoredTools());
  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>(() => getCheckedToolSkills());
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ToolFormData>(BLANK_TOOL_FORM);

  const toggleSkill = (skillId: string) => {
    const updated = { ...checkedSkills, [skillId]: !checkedSkills[skillId] };
    setCheckedSkills(updated);
    saveCheckedToolSkills(updated);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(BLANK_TOOL_FORM);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: EDATool, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(t.id);
    const skillsLines = (t.keySkillsToMaster || [])
      .map(s => s.name ? `${s.name}: ${s.description || ''}` : '')
      .filter(Boolean)
      .join('\n');

    setFormData({
      name: t.name || '',
      category: t.category || 'Simulation & Verification',
      licenseType: t.licenseType || 'Open Source / Academic',
      description: t.description || '',
      standardCommand: t.standardCommand || '',
      documentationUrl: t.documentationUrl || '',
      skillsText: skillsLines
    });
    setIsModalOpen(true);
  };

  const handleDeleteTool = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete toolchain "${name}"?`)) {
      const updated = tools.filter(t => t.id !== id);
      setTools(updated);
      saveStoredTools(updated);
    }
  };

  const handleSaveTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Please fill in at least the Tool Name and Description.');
      return;
    }

    const parsedSkills = formData.skillsText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map((line, idx) => {
        const parts = line.split(':');
        const skillName = parts[0].trim();
        const skillDesc = parts.slice(1).join(':').trim() || 'Mastery checklist item';
        return {
          id: `${editingId || 'custom-tool'}-skill-${idx}-${Date.now()}`,
          name: skillName,
          description: skillDesc
        };
      });

    let updatedList: EDATool[];

    if (editingId) {
      updatedList = tools.map(t => {
        if (t.id === editingId) {
          return {
            ...t,
            name: formData.name.trim(),
            category: formData.category.trim() as any,
            licenseType: formData.licenseType.trim(),
            description: formData.description.trim(),
            standardCommand: formData.standardCommand.trim() || undefined,
            documentationUrl: formData.documentationUrl.trim() || undefined,
            keySkillsToMaster: parsedSkills.length > 0 ? parsedSkills : t.keySkillsToMaster
          };
        }
        return t;
      });
    } else {
      const newTool: EDATool = {
        id: `custom-tool-${Date.now()}`,
        name: formData.name.trim(),
        category: formData.category.trim() as any,
        licenseType: formData.licenseType.trim(),
        description: formData.description.trim(),
        standardCommand: formData.standardCommand.trim() || undefined,
        documentationUrl: formData.documentationUrl.trim() || undefined,
        keySkillsToMaster: parsedSkills.length > 0 ? parsedSkills : [
          {
            id: `skill-${Date.now()}-1`,
            name: 'Basic Setup & Execution',
            description: 'Run tool in command line or GUI with test inputs'
          }
        ]
      };
      updatedList = [newTool, ...tools];
    }

    setTools(updatedList);
    saveStoredTools(updatedList);
    setIsModalOpen(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset all tools and skills to default industry EDA list?')) {
      const def = resetStoredTools();
      setTools(def);
      setCheckedSkills({});
      saveCheckedToolSkills({});
    }
  };

  // Stats
  let totalSkills = 0;
  let masteredSkills = 0;
  tools.forEach((t) => {
    t.keySkillsToMaster?.forEach((s) => {
      totalSkills += 1;
      if (checkedSkills[s.id]) masteredSkills += 1;
    });
  });
  const overallPercent = totalSkills > 0 ? Math.round((masteredSkills / totalSkills) * 100) : 0;

  const categories = useMemo(() => {
    const set = new Set<string>();
    tools.forEach((t) => set.add(t.category));
    return ['All', ...Array.from(set)];
  }, [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter((t) => {
      if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = t.name.toLowerCase().includes(q);
        const matchesDesc = t.description?.toLowerCase().includes(q);
        const matchesSkills = t.keySkillsToMaster?.some((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesSkills) return false;
      }
      return true;
    });
  }, [tools, categoryFilter, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>Silicon EDA Mastery</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
              {tools.length} Toolchains
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            EDA Toolchains &amp; Practical Simulation Skills
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Hands-on command lines, simulator flags, and physical design scripts across open-source (Verilator, OpenLane, GTKWave, Yosys) and commercial tier EDA tools (Cadence, Synopsys, Vivado, ModelSim).
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 relative z-10 bg-neutral-800/80 rounded-xl p-3 border border-neutral-700/50 max-w-xl">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-neutral-300">Toolchain Proficiency Score</span>
            <span className="text-cyan-400 font-mono">{masteredSkills} / {totalSkills} Skills ({overallPercent}%)</span>
          </div>
          <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search tools, CLI flags, synthesis commands, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-700 p-0.5 rounded cursor-pointer transition-colors"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={handleOpenAdd}
              className="px-2.5 sm:px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Toolchain</span>
            </button>

            <button
              onClick={handleReset}
              className="px-2.5 sm:px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-neutral-100 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                categoryFilter === cat
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredTools.map((tool) => {
          const toolSkills = tool.keySkillsToMaster || [];
          const masteredCount = toolSkills.filter((s) => checkedSkills[s.id]).length;
          const toolPercent = toolSkills.length > 0 ? Math.round((masteredCount / toolSkills.length) * 100) : 0;

          return (
            <div
              key={tool.id}
              className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 rounded">
                        {tool.category}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                        {tool.licenseType || 'Open Source / Academic'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mt-1.5">
                      {tool.name}
                    </h3>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="text-right">
                      <span className="text-xs font-bold text-neutral-900">
                        {masteredCount}/{toolSkills.length}
                      </span>
                      <span className="text-[10px] text-neutral-500 block">Skills Mastered</span>
                    </div>

                    <div className="flex items-center gap-0.5 border-l border-neutral-200 pl-1.5 ml-1">
                      <button
                        onClick={(e) => handleOpenEdit(tool, e)}
                        title="Edit Tool"
                        className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteTool(tool.id, tool.name, e)}
                        title="Delete Tool"
                        className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {tool.description}
                </p>

                {/* Command Cheatsheet / CLI snippet */}
                {tool.standardCommand && (
                  <div className="bg-neutral-950 text-neutral-200 rounded-xl p-3 text-xs font-mono flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-x-auto min-w-0 pr-2">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{tool.standardCommand}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(tool.standardCommand || '')}
                      className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white cursor-pointer shrink-0"
                      title="Copy Command"
                    >
                      {copiedCommand === tool.standardCommand ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                {/* Key Skills Checklist */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Verification &amp; Design Skills:
                  </span>
                  <div className="space-y-1.5">
                    {toolSkills.map((skill) => {
                      const isChecked = !!checkedSkills[skill.id];
                      return (
                        <div
                          key={skill.id}
                          onClick={() => toggleSkill(skill.id)}
                          className={`flex items-start gap-2.5 p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                            isChecked ? 'bg-emerald-50/70 text-emerald-950' : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                          }`}
                        >
                          <button className="mt-0.5 shrink-0 cursor-pointer">
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Circle className="w-4 h-4 text-neutral-400" />
                            )}
                          </button>
                          <div>
                            <span className="font-semibold">{skill.name}</span>
                            <p className="text-[11px] text-neutral-500 mt-0.5">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Documentation link */}
              {tool.documentationUrl && (
                <div className="pt-3 border-t border-neutral-100 flex justify-end">
                  <a
                    href={tool.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-700 hover:text-cyan-900 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Official Documentation</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add / Edit Tool Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-neutral-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-neutral-900 text-white rounded-xl">
                  {editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-900">
                    {editingId ? 'Edit EDA Toolchain' : 'Add EDA Toolchain'}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Configure EDA tool name, category, license, execution command, and mastery checklist.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveTool} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-800">
                    Tool Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cocotb / Verilator / OpenROAD"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-800">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Simulation & Verification"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-800">
                    License / Access Tier
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Open Source / Academic / Commercial"
                    value={formData.licenseType}
                    onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-800">
                    Documentation URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://docs.cocotb.org"
                    value={formData.documentationUrl}
                    onChange={(e) => setFormData({ ...formData, documentationUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-neutral-800">
                  Tool Description &amp; Silicon Industry Relevance <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe where and why this toolchain is deployed in modern silicon workflows..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-y"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-neutral-800 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Standard CLI Command / Run Snippet</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. pytest -v test_alu.py --waves"
                  value={formData.standardCommand}
                  onChange={(e) => setFormData({ ...formData, standardCommand: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 text-cyan-300 font-mono border border-neutral-800 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-neutral-800 block">
                  Key Skills Checklist (One skill per line: <span className="font-mono text-neutral-500">Skill Name: Description</span>)
                </label>
                <textarea
                  rows={4}
                  placeholder={"Clock Generation: Writing @cocotb.test async clock drivers\nConstrained Random: Generating stimulus packets with Scapy"}
                  value={formData.skillsText}
                  onChange={(e) => setFormData({ ...formData, skillsText: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-y font-mono"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingId ? 'Save Changes' : 'Create Toolchain'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
