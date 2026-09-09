import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  FileText, 
  Check, 
  Plus, 
  Trash2, 
  Award, 
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Edit2,
  X
} from 'lucide-react';
import { WeeklyMilestone, SundayAuditLog } from '../types';
import { 
  getStoredMilestones, 
  saveStoredMilestones, 
  resetStoredMilestones,
  getWeeklyMilestoneChecks,
  saveWeeklyMilestoneChecks,
  getSundayAuditLogs,
  saveSundayAuditLogs
} from '../utils/storage';

interface MilestoneFormData {
  week: number;
  month: number;
  phase: string;
  title: string;
  coreGoalsText: string;
  deliverable: string;
  exitGate: string;
}

const BLANK_MILESTONE_FORM: MilestoneFormData = {
  week: 1,
  month: 1,
  phase: 'Phase 1: Foundations',
  title: '',
  coreGoalsText: '',
  deliverable: '',
  exitGate: ''
};

interface WeeklyPlannerViewProps {
  onNavigate?: (tab: any) => void;
}

export const WeeklyPlannerView: React.FC<WeeklyPlannerViewProps> = ({ onNavigate }) => {
  const [milestones, setMilestones] = useState<WeeklyMilestone[]>(() => getStoredMilestones());
  const [checks, setChecks] = useState<Record<number, boolean>>(() => getWeeklyMilestoneChecks());
  const [auditLogs, setAuditLogs] = useState<SundayAuditLog[]>(() => getSundayAuditLogs());

  const [activeTab, setActiveTab] = useState<'timeline' | 'sunday_audit'>('timeline');
  const [monthFilter, setMonthFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Done' | 'Pending'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Add / Edit Milestone State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingWeek, setEditingWeek] = useState<number | null>(null);
  const [formData, setFormData] = useState<MilestoneFormData>(BLANK_MILESTONE_FORM);

  // Sunday audit form
  const [hoursLogged, setHoursLogged] = useState<number>(18);
  const [topicsDone, setTopicsDone] = useState<number>(4);
  const [repoCommitsUrl, setRepoCommitsUrl] = useState<string>('github.com/your-username/silicon-workspace');
  const [blockersFaced, setBlockersFaced] = useState<string>('Setup timing violation on multiplier path');
  const [nextCommitment, setNextCommitment] = useState<string>('Tapeout prep and Cocotb regression suite');

  const toggleWeekCheck = (weekNum: number) => {
    const updated = { ...checks, [weekNum]: !checks[weekNum] };
    setChecks(updated);
    saveWeeklyMilestoneChecks(updated);
  };

  const handleOpenAdd = () => {
    setEditingWeek(null);
    const maxWeek = milestones.reduce((max, m) => Math.max(max, m.week), 0);
    setFormData({
      week: maxWeek + 1,
      month: Math.ceil((maxWeek + 1) / 4),
      phase: 'Phase 2: Core Engineering',
      title: '',
      coreGoalsText: '',
      deliverable: '',
      exitGate: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: WeeklyMilestone, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingWeek(m.week);
    setFormData({
      week: m.week,
      month: m.month,
      phase: m.phase,
      title: m.title,
      coreGoalsText: (m.coreGoals || []).join('\n'),
      deliverable: m.deliverable,
      exitGate: m.exitGate
    });
    setIsModalOpen(true);
  };

  const handleDeleteMilestone = (weekNum: number, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete Week ${weekNum}: "${title}"?`)) {
      const updated = milestones.filter(m => m.week !== weekNum);
      setMilestones(updated);
      saveStoredMilestones(updated);
    }
  };

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.deliverable.trim()) {
      alert('Please fill in Milestone Title and Deliverable.');
      return;
    }

    const goalsList = formData.coreGoalsText
      .split('\n')
      .map(g => g.trim())
      .filter(Boolean);

    let updatedList: WeeklyMilestone[];

    if (editingWeek !== null) {
      updatedList = milestones.map(m => {
        if (m.week === editingWeek) {
          return {
            ...m,
            week: formData.week,
            month: formData.month,
            phase: formData.phase,
            title: formData.title.trim(),
            coreGoals: goalsList.length > 0 ? goalsList : m.coreGoals,
            deliverable: formData.deliverable.trim(),
            exitGate: formData.exitGate.trim()
          };
        }
        return m;
      });
    } else {
      const newMilestone: WeeklyMilestone = {
        week: formData.week,
        month: formData.month,
        phase: formData.phase,
        title: formData.title.trim(),
        coreGoals: goalsList.length > 0 ? goalsList : ['Complete assigned modules', 'Run validation tests'],
        deliverable: formData.deliverable.trim(),
        exitGate: formData.exitGate.trim()
      };
      updatedList = [...milestones, newMilestone].sort((a, b) => a.week - b.week);
    }

    setMilestones(updatedList);
    saveStoredMilestones(updatedList);
    setIsModalOpen(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset milestone roadmap to default 20-week silicon mastery plan?')) {
      const def = resetStoredMilestones();
      setMilestones(def);
      setChecks({});
      saveWeeklyMilestoneChecks({});
    }
  };

  const handleLogAudit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentWeekNum = Object.keys(checks).length + 1;
    const newLog: SundayAuditLog = {
      id: `audit-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      week: currentWeekNum,
      hoursLogged,
      topicsDone,
      repoCommitsUrl,
      blockersFaced,
      nextWeekCommitment: nextCommitment,
      status: hoursLogged >= 16 ? 'Passed' : 'Action Needed'
    };

    const updated = [newLog, ...auditLogs];
    setAuditLogs(updated);
    saveSundayAuditLogs(updated);
  };

  const handleDeleteAudit = (id: string) => {
    const updated = auditLogs.filter((l) => l.id !== id);
    setAuditLogs(updated);
    saveSundayAuditLogs(updated);
  };

  // Calculations
  const completedWeeks = Object.values(checks).filter(Boolean).length;
  const totalWeeks = milestones.length;
  const progressPercent = totalWeeks > 0 ? Math.round((completedWeeks / totalWeeks) * 100) : 0;

  const months = useMemo(() => {
    const set = new Set<string>();
    milestones.forEach((m) => set.add(`Month ${m.month}`));
    return ['All', ...Array.from(set).sort()];
  }, [milestones]);

  const filteredMilestones = useMemo(() => {
    return milestones.filter((m) => {
      if (monthFilter !== 'All' && `Month ${m.month}` !== monthFilter) return false;
      const isDone = !!checks[m.week];
      if (statusFilter === 'Done' && !isDone) return false;
      if (statusFilter === 'Pending' && isDone) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = m.title.toLowerCase().includes(q);
        const matchesPhase = m.phase.toLowerCase().includes(q);
        const matchesDeliv = m.deliverable.toLowerCase().includes(q);
        const matchesGate = m.exitGate.toLowerCase().includes(q);
        const matchesGoals = m.coreGoals.some((g) => g.toLowerCase().includes(q));
        if (!matchesTitle && !matchesPhase && !matchesDeliv && !matchesGate && !matchesGoals) return false;
      }
      return true;
    });
  }, [milestones, monthFilter, statusFilter, checks, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>20-Week Master Roadmap</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
              5 Months • 20 Exit Gates
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            20-Week Master Plan &amp; Sunday Exit Gates
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Unforgiving week-by-week silicon roadmap from Digital Logic &amp; Verilog foundations to RV32I Core tapeout, UVM regressions, and physical design sign-off.
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 relative z-10 bg-neutral-800/80 rounded-xl p-3 border border-neutral-700/50 max-w-xl">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-neutral-300">Curriculum Road Completion</span>
            <span className="text-cyan-400 font-mono">{completedWeeks} / {totalWeeks} Weeks Cleared ({progressPercent}%)</span>
          </div>
          <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
            activeTab === 'timeline'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          20-Week Master Timeline ({milestones.length} Weeks)
        </button>
        <button
          onClick={() => setActiveTab('sunday_audit')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
            activeTab === 'sunday_audit'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Sunday Exit Gate Scorecard ({auditLogs.length} Audits)
        </button>
      </div>

      {activeTab === 'timeline' ? (
        <>
          {/* Filters Bar */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search weekly milestones, exit gates, deliverables..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <button
                  onClick={handleOpenAdd}
                  className="px-2.5 sm:px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Milestone</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-2.5 sm:px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Plan</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 pt-1 border-t border-neutral-100">
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 rounded-lg p-2 focus:ring-1 focus:ring-neutral-900 cursor-pointer"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 rounded-lg p-2 focus:ring-1 focus:ring-neutral-900 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending Only</option>
                <option value="Done">Cleared Only</option>
              </select>
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-4">
            {filteredMilestones.map((m) => {
              const isDone = !!checks[m.week];

              return (
                <div
                  key={m.week}
                  className={`bg-white border rounded-2xl p-6 shadow-xs space-y-4 transition-all ${
                    isDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-neutral-900 text-white">
                          Week {m.week}
                        </span>
                        <span className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                          Month {m.month} • {m.phase}
                        </span>
                        {isDone && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Gate Cleared
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                        {m.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => toggleWeekCheck(m.week)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                          isDone
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                        }`}
                      >
                        {isDone ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Cleared</span>
                          </>
                        ) : (
                          <>
                            <Circle className="w-3.5 h-3.5 text-neutral-400" />
                            <span>Mark Cleared</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-0.5 border-l border-neutral-200 pl-1.5 ml-0.5">
                        <button
                          onClick={(e) => handleOpenEdit(m, e)}
                          title="Edit Milestone"
                          className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteMilestone(m.week, m.title, e)}
                          title="Delete Milestone"
                          className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Core Goals List */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Target Objectives:
                    </span>
                    <ul className="space-y-1 text-xs text-neutral-700 list-disc list-inside">
                      {m.coreGoals.map((g, idx) => (
                        <li key={idx}>{g}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverable & Exit Gate */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-neutral-100">
                    <div className="bg-neutral-50 rounded-xl p-3 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Tangible Deliverable:
                      </span>
                      <p className="font-semibold text-neutral-900">{m.deliverable}</p>
                    </div>

                    <div className="bg-neutral-50 rounded-xl p-3 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Sunday Exit Gate:
                      </span>
                      <p className="font-semibold text-rose-700">{m.exitGate}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Sunday Audit Scorecard */
        <div className="space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
            <div className="max-w-2xl space-y-1">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-rose-600" />
                <span>Sunday Audit Exit Gate Entry</span>
              </h2>
              <p className="text-xs text-neutral-500">
                Rule 6: Every Sunday evening at 20:00, execute the code review and log verification metrics. No skipping.
              </p>
            </div>

            <form onSubmit={handleLogAudit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Hours Logged This Week
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hoursLogged}
                  onChange={(e) => setHoursLogged(parseInt(e.target.value) || 0)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Topics / Modules Cleared
                </label>
                <input
                  type="number"
                  min="0"
                  value={topicsDone}
                  onChange={(e) => setTopicsDone(parseInt(e.target.value) || 0)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  GitHub Commit / Repo URL
                </label>
                <input
                  type="text"
                  value={repoCommitsUrl}
                  onChange={(e) => setRepoCommitsUrl(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Primary Blocker Encountered
                </label>
                <input
                  type="text"
                  value={blockersFaced}
                  onChange={(e) => setBlockersFaced(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-neutral-700 mb-1">
                  Next Week&apos;s Binding Commitment
                </label>
                <input
                  type="text"
                  value={nextCommitment}
                  onChange={(e) => setNextCommitment(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold cursor-pointer transition-colors"
                >
                  Log Sunday Audit Sign-off
                </button>
              </div>
            </form>
          </div>

          {/* Past Logs */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-900">
              Audit History ({auditLogs.length} Records)
            </h3>

            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900">Week {log.week} Audit</span>
                      <span className="text-neutral-400 font-mono">{log.date}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        log.status === 'Passed' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                    <p className="text-neutral-600">
                      <strong>Hours:</strong> {log.hoursLogged}h • <strong>Topics:</strong> {log.topicsDone} • <strong>Commitment:</strong> {log.nextWeekCommitment}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteAudit(log.id)}
                    className="text-neutral-400 hover:text-rose-600 self-start sm:self-center cursor-pointer p-1"
                    title="Delete log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Milestone Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-neutral-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-neutral-900 text-white rounded-xl">
                  {editingWeek !== null ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-900">
                    {editingWeek !== null ? `Edit Week ${editingWeek} Milestone` : 'Add Weekly Milestone'}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Set target week, phase, objectives, tangible deliverable, and Sunday exit gate.
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
            <form onSubmit={handleSaveMilestone} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-800">
                    Week Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={52}
                    required
                    value={formData.week}
                    onChange={(e) => {
                      const w = parseInt(e.target.value) || 1;
                      setFormData({ ...formData, week: w, month: Math.ceil(w / 4) });
                    }}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-800">
                    Month
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-800">
                    Phase Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Phase 2: Core RTL"
                    value={formData.phase}
                    onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-neutral-800">
                  Milestone Focus Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asynchronous FIFO Architecture & CDC Formal Proof"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-neutral-800 block">
                  Target Objectives (One objective per line)
                </label>
                <textarea
                  rows={3}
                  placeholder={"Read Cummins CDC paper sections 1-4\nDerive Gray code 2-flop synchronizer\nSimulate pointer depth under backpressure in ModelSim"}
                  value={formData.coreGoalsText}
                  onChange={(e) => setFormData({ ...formData, coreGoalsText: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-y font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-neutral-800">
                  Tangible Deliverable <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Synthesizable async_fifo.sv with CDC constraint file"
                  value={formData.deliverable}
                  onChange={(e) => setFormData({ ...formData, deliverable: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-neutral-800">
                  Sunday Exit Gate Condition <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zero CDC metastability warnings under 100k random transactions"
                  value={formData.exitGate}
                  onChange={(e) => setFormData({ ...formData, exitGate: e.target.value })}
                  className="w-full px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-xl text-xs text-rose-950 focus:outline-none focus:ring-1 focus:ring-rose-500"
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
                  <span>{editingWeek !== null ? 'Save Changes' : 'Create Milestone'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
