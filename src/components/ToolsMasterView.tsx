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

export const ToolsMasterView: React.FC = () => {
  const [tools, setTools] = useState<EDATool[]>(() => getStoredTools());
  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>(() => getCheckedToolSkills());
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

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

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
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

                  <div className="text-right">
                    <span className="text-xs font-bold text-neutral-900">
                      {masteredCount}/{toolSkills.length}
                    </span>
                    <span className="text-[10px] text-neutral-500 block">Skills Mastered</span>
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
    </div>
  );
};
