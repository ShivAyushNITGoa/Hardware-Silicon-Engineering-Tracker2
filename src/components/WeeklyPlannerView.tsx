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
  AlertCircle
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

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
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
    </div>
  );
};
