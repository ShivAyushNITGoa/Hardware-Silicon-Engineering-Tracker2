import React, { useState, useMemo } from 'react';
import { WeeklyMilestoneItem, SundayAuditEntry } from '../types';
import { 
  getStoredMilestones, 
  saveStoredMilestones, 
  resetStoredMilestones, 
  getWeeklyMilestoneChecks, 
  saveWeeklyMilestoneChecks, 
  getSundayAuditLogs, 
  saveSundayAuditLogs 
} from '../utils/storage';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ChevronRight, 
  Flag, 
  Award, 
  Plus, 
  Trash2, 
  CheckSquare, 
  Square,
  Edit3,
  X,
  Save,
  RotateCcw
} from 'lucide-react';

const BLANK_MILESTONE: WeeklyMilestoneItem = {
  week: 1,
  month: 1,
  phase: 'Phase 1: RTL & Verilog Foundations',
  title: '',
  coreGoals: ['Complete RTL exercises', 'Write clean synthesizable Verilog'],
  deliverable: 'Tested and verified RTL repository with automated regression tests',
  targetHours: 20,
  exitGate: 'Synthesize module without latches or timing violations'
};

export const WeeklyPlannerView: React.FC = () => {
  const [milestonesList, setMilestonesList] = useState<WeeklyMilestoneItem[]>(() => getStoredMilestones());
  const [completedWeeks, setCompletedWeeks] = useState<Record<number, boolean>>(() => getWeeklyMilestoneChecks());
  const [auditLogs, setAuditLogs] = useState<SundayAuditEntry[]>(() => getSundayAuditLogs());
  const [activeTab, setActiveTab] = useState<'timeline' | 'sunday-gate'>('timeline');

  // Milestone Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<WeeklyMilestoneItem | null>(null);
  const [formState, setFormState] = useState<WeeklyMilestoneItem>(BLANK_MILESTONE);
  const [formGoalsRaw, setFormGoalsRaw] = useState('');

  // New Audit Form State
  const [newHours, setNewHours] = useState<number>(20);
  const [newTopicsDone, setNewTopicsDone] = useState<number>(5);
  const [newRepoUrl, setNewRepoUrl] = useState<string>('github.com/ayush/');
  const [newBlockers, setNewBlockers] = useState<string>('None');
  const [newNextCommitment, setNewNextCommitment] = useState<string>('Complete hazard forwarding testbench in cocotb');

  const toggleWeek = (weekNum: number) => {
    const updated = { ...completedWeeks, [weekNum]: !completedWeeks[weekNum] };
    setCompletedWeeks(updated);
    saveWeeklyMilestoneChecks(updated);
  };

  const handleOpenAdd = () => {
    const nextWeekNum = milestonesList.length > 0 ? Math.max(...milestonesList.map(m => m.week)) + 1 : 1;
    const newM: WeeklyMilestoneItem = {
      ...BLANK_MILESTONE,
      week: nextWeekNum,
      month: Math.ceil(nextWeekNum / 4),
      title: `Week ${nextWeekNum} Roadmap Target`
    };
    setEditingMilestone(null);
    setFormState(newM);
    setFormGoalsRaw(newM.coreGoals.join('\n'));
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: WeeklyMilestoneItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingMilestone(m);
    setFormState({ ...m });
    setFormGoalsRaw(m.coreGoals.join('\n'));
    setIsModalOpen(true);
  };

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    const parsedGoals = formGoalsRaw
      .split('\n')
      .map(g => g.trim())
      .filter(Boolean);

    const finalized: WeeklyMilestoneItem = {
      ...formState,
      title: formState.title.trim(),
      coreGoals: parsedGoals.length > 0 ? parsedGoals : ['Execute targeted weekly objectives']
    };

    let updated: WeeklyMilestoneItem[];
    if (editingMilestone) {
      updated = milestonesList.map(m => m.week === finalized.week ? finalized : m);
    } else {
      updated = [...milestonesList, finalized].sort((a, b) => a.week - b.week);
    }

    setMilestonesList(updated);
    saveStoredMilestones(updated);
    setIsModalOpen(false);
  };

  const handleDeleteMilestone = (weekNum: number, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete Week ${weekNum} milestone ("${title}")?`)) {
      const updated = milestonesList.filter(m => m.week !== weekNum);
      setMilestonesList(updated);
      saveStoredMilestones(updated);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset milestone roadmap to default 20-week silicon mastery plan?')) {
      const reset = resetStoredMilestones();
      setMilestonesList(reset);
    }
  };

  const handleAddAuditLog = (e: React.FormEvent) => {
    e.preventDefault();
    const currentWeekNum = Object.keys(completedWeeks).length + 1;
    const newEntry: SundayAuditEntry = {
      id: `audit-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      week: currentWeekNum,
      hoursLogged: newHours,
      topicsDone: newTopicsDone,
      repoCommitsUrl: newRepoUrl,
      blockersFaced: newBlockers,
      nextWeekCommitment: newNextCommitment,
      status: newHours >= 16 ? 'Passed' : 'Action Needed'
    };

    const updated = [newEntry, ...auditLogs];
    setAuditLogs(updated);
    saveSundayAuditLogs(updated);
  };

  const handleDeleteAudit = (id: string) => {
    const updated = auditLogs.filter((a) => a.id !== id);
    setAuditLogs(updated);
    saveSundayAuditLogs(updated);
  };

  const completedCount = Object.values(completedWeeks).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / (milestonesList.length || 1)) * 100);

  return (
    <div className="space-y-6" id="weekly-planner-container">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-sm" id="planner-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm font-semibold mb-1">
              <Calendar className="w-4 h-4" />
              <span>20-WEEK SILICON MASTERY EXECUTION PLAN</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Weekly Milestones & Sunday Gate Review</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Strict step-by-step 5-month execution path. Track week-by-week goals and log your mandatory Sunday Audit checks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Roadmap Progress</div>
                <div className="text-xl font-bold text-emerald-400">{progressPercent}%</div>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Weeks Done</div>
                <div className="text-sm font-bold font-mono text-slate-200">
                  <span className="text-emerald-400">{completedCount}</span> / {milestonesList.length} Weeks
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Week</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-slate-700 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-700 text-xs text-slate-400 transition-colors cursor-pointer"
              title="Reset weekly plan to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex gap-2 mt-5 border-t border-slate-800 pt-4">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'timeline'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Milestones Checklist ({milestonesList.length} Weeks)</span>
          </button>
          <button
            onClick={() => setActiveTab('sunday-gate')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'sunday-gate'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Sunday Gate Audit Log ({auditLogs.length})</span>
          </button>
        </div>
      </div>

      {/* 1. Timeline View */}
      {activeTab === 'timeline' && (
        <div className="space-y-4" id="timeline-list">
          {milestonesList.map((m) => {
            const isDone = !!completedWeeks[m.week];

            return (
              <div
                key={m.week}
                className={`p-5 rounded-xl border transition-all ${
                  isDone
                    ? 'bg-emerald-50/40 border-emerald-200 shadow-sm'
                    : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleWeek(m.week)}
                      className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors shrink-0 cursor-pointer"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          Week {m.week} (Month {m.month})
                        </span>
                        <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                          {m.phase}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          Target: {m.targetHours}h
                        </span>
                      </div>

                      <h3
                        className={`text-sm font-bold mt-1 ${
                          isDone ? 'text-emerald-950 line-through' : 'text-slate-900'
                        }`}
                      >
                        {m.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => toggleWeek(m.week)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                      }`}
                    >
                      {isDone ? 'Completed' : 'Mark Complete'}
                    </button>

                    <button
                      onClick={(e) => handleOpenEdit(m, e)}
                      className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit milestone"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => handleDeleteMilestone(m.week, m.title, e)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete milestone"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sub-goals */}
                <div className="mt-3 pl-8 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Core Objectives:</span>
                    <ul className="space-y-1 text-slate-700">
                      {m.coreGoals.map((g, gIdx) => (
                        <li key={gIdx} className="flex items-start gap-1.5">
                          <span className="text-indigo-500 font-bold shrink-0">•</span>
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-100 space-y-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Deliverable:</span>
                      <p className="text-slate-800 font-medium text-[11px] mt-0.5">{m.deliverable}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Weekly Exit Gate:</span>
                      <p className="text-rose-950 font-semibold text-[11px] mt-0.5">{m.exitGate}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Sunday Gate Audit Log View */}
      {activeTab === 'sunday-gate' && (
        <div className="space-y-6" id="sunday-gate-section">
          {/* New Entry Form */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldAlert className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Log Sunday Gate Review Audit</h3>
                <p className="text-xs text-slate-500">Mandatory weekly accountability gate (Rule R6)</p>
              </div>
            </div>

            <form onSubmit={handleAddAuditLog} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Hours Logged This Week:</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={newHours}
                  onChange={(e) => setNewHours(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Topics/Subtopics Completed:</label>
                <input
                  type="number"
                  min="0"
                  value={newTopicsDone}
                  onChange={(e) => setNewTopicsDone(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">GitHub Commit / Repo URL:</label>
                <input
                  type="text"
                  value={newRepoUrl}
                  onChange={(e) => setNewRepoUrl(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono"
                  placeholder="github.com/ayush/..."
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-700 font-medium mb-1">Blockers / Root Causes Analyzed:</label>
                <input
                  type="text"
                  value={newBlockers}
                  onChange={(e) => setNewBlockers(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded"
                  placeholder="e.g. Metastability MTBF calculation timing margin"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Next Week Non-Negotiable Goal:</label>
                <input
                  type="text"
                  value={newNextCommitment}
                  onChange={(e) => setNewNextCommitment(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded"
                  placeholder="e.g. Synthesize UART on Basys 3 FPGA"
                  required
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Sunday Audit Record</span>
                </button>
              </div>
            </form>
          </div>

          {/* Audit Logs Table */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Historical Audit Records ({auditLogs.length})</h3>

            {auditLogs.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                No Sunday Audit records yet. Complete your first week and submit an audit log.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <div key={log.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">Week {log.week} Audit</span>
                        <span className="text-slate-400 font-mono">({log.date})</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.status === 'Passed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {log.status}
                        </span>
                      </div>
                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-800">{log.hoursLogged} Hours Logged</span> • {log.topicsDone} Subtopics Completed • Next: {log.nextWeekCommitment}
                      </div>
                      <div className="font-mono text-[11px] text-indigo-600 truncate max-w-md">
                        {log.repoCommitsUrl}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteAudit(log.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Milestone Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingMilestone ? `Edit Week ${formState.week} Milestone` : 'Add New Roadmap Week'}
                  </h3>
                  <p className="text-xs text-slate-500">Configure weekly deliverables and non-negotiable exit gate</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMilestone} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Week #</label>
                  <input
                    type="number"
                    min="1"
                    value={formState.week}
                    onChange={(e) => setFormState({ ...formState, week: parseInt(e.target.value) || 1 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Month #</label>
                  <input
                    type="number"
                    min="1"
                    value={formState.month}
                    onChange={(e) => setFormState({ ...formState, month: parseInt(e.target.value) || 1 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Target Hours</label>
                  <input
                    type="number"
                    min="1"
                    value={formState.targetHours}
                    onChange={(e) => setFormState({ ...formState, targetHours: parseInt(e.target.value) || 20 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Phase Name</label>
                <input
                  type="text"
                  value={formState.phase}
                  onChange={(e) => setFormState({ ...formState, phase: e.target.value })}
                  placeholder="e.g. Phase 1: RTL & Verilog Foundations"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Week Title / Theme <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Dual-Port Synchronous FIFO & SVA Assertions"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Core Goals / Objectives (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={formGoalsRaw}
                  onChange={(e) => setFormGoalsRaw(e.target.value)}
                  placeholder="Implement parameterized Circular Pointer FIFO&#10;Write SystemVerilog Covergroups for full/empty conditions"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Concrete Deliverable</label>
                <input
                  type="text"
                  value={formState.deliverable}
                  onChange={(e) => setFormState({ ...formState, deliverable: e.target.value })}
                  placeholder="e.g. Clean GitHub commit with passing cocotb regression run"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Non-Negotiable Exit Gate</label>
                <input
                  type="text"
                  value={formState.exitGate}
                  onChange={(e) => setFormState({ ...formState, exitGate: e.target.value })}
                  placeholder="e.g. 100% functional and branch coverage with zero SVA assertion failures"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  {editingMilestone ? 'Save Milestone' : 'Create Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
