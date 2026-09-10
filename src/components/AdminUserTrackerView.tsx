import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Search, 
  RefreshCw, 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Download, 
  ExternalLink,
  Briefcase,
  Sparkles,
  BookOpen,
  X,
  Clock,
  Activity,
  User as UserIcon,
  LogIn
} from 'lucide-react';
import { UserProgressData, fetchAllUsersForAdmin, subscribeToAllUsersForAdmin, ADMIN_EMAIL } from '../lib/firebase';
import { ECE_EEE_PREP_TRACKS } from '../data/eceEeePrepData';

interface AdminUserTrackerViewProps {
  onGoBack?: () => void;
  currentUserEmail?: string | null;
  onLogin?: () => void;
}

export const AdminUserTrackerView: React.FC<AdminUserTrackerViewProps> = ({
  onGoBack,
  currentUserEmail,
  onLogin
}) => {
  const [users, setUsers] = useState<UserProgressData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<UserProgressData | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const isAdmin = currentUserEmail?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllUsersForAdmin();
      setUsers(data);
      setLastRefreshed(new Date());
    } catch (err) {
      console.error('Failed to load users for admin:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
      const unsub = subscribeToAllUsersForAdmin((liveUsers) => {
        setUsers(liveUsers);
        setLastRefreshed(new Date());
        setIsLoading(false);
      });
      return () => unsub();
    } else {
      setIsLoading(false);
    }
  }, [isAdmin]);

  // Filtered users
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      (u.displayName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (u.email?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
    const matchesDomain = 
      selectedDomainFilter === 'all' || u.activeField === selectedDomainFilter;

    return matchesSearch && matchesDomain;
  });

  // Calculate cohort summary stats
  const totalStudents = users.length;
  const activeToday = users.filter(u => {
    if (!u.lastActive) return false;
    const diffHours = (Date.now() - new Date(u.lastActive).getTime()) / (1000 * 60 * 60);
    return diffHours < 24;
  }).length;

  const avgCompletion = totalStudents > 0
    ? Math.round(
        users.reduce((acc, u) => acc + (u.statsSummary?.ecePercent || 0), 0) / totalStudents
      )
    : 0;

  const totalNotesWritten = users.reduce(
    (acc, u) => acc + Object.keys(u.eceEeeNotes || {}).length, 
    0
  );

  const exportCohortReport = () => {
    const payload = {
      generatedAt: new Date().toISOString(),
      admin: ADMIN_EMAIL,
      totalStudents,
      summary: { activeToday, avgCompletion, totalNotesWritten },
      users
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hardware_students_cohort_report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
          <ShieldCheck className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-neutral-900">Admin Multi-User Tracker</h2>
          <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            This module is restricted to designated administrator <strong className="text-neutral-900 font-semibold">{ADMIN_EMAIL}</strong> to monitor student progress, track domain milestones, and review engineering notebooks.
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-600 max-w-md mx-auto text-left space-y-2">
          <div className="font-semibold text-neutral-800">Current Session:</div>
          <div>Logged in as: <span className="font-mono text-neutral-900 font-medium">{currentUserEmail || 'Not signed in'}</span></div>
          <div className="text-[11px] text-neutral-500">
            Click below to sign in with Google using <strong className="text-neutral-700">{ADMIN_EMAIL}</strong>.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onLogin && (
            <button
              onClick={onLogin}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-emerald-400" />
              <span>Sign In with Google</span>
            </button>
          )}

          {onGoBack && (
            <button
              onClick={onGoBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs border border-neutral-200 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Dashboard</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-xs relative overflow-hidden">
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 transition-colors cursor-pointer w-fit mb-3.5 active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-600" />
            <span>Back to Previous Section</span>
          </button>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Multi-User Tracker
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                Admin: {ADMIN_EMAIL}
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                Live Firestore Telemetry
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 tracking-tight">
              Hardware Engineering Cohort &amp; Student Tracker
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl leading-relaxed">
              Real-time monitoring across all enrolled users, milestone completions in the 6 ECE/EEE tracks, curriculum coverage, and private lab journal logs.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200 transition-colors cursor-pointer active:scale-95 disabled:opacity-60"
              title="Refresh student tracking list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Telemetry</span>
            </button>

            <button
              onClick={exportCohortReport}
              disabled={users.length === 0}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white transition-colors cursor-pointer shadow-2xs active:scale-95 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export Cohort Report (.json)</span>
            </button>
          </div>
        </div>

        {/* Aggregate KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-neutral-100">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
            <div className="text-xs text-neutral-500 font-medium flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-neutral-400" />
              <span>Total Tracked Users</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
              {totalStudents}
            </div>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
            <div className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Active in Last 24h</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-950 mt-1">
              {activeToday}
            </div>
          </div>

          <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-200/80">
            <div className="text-xs text-indigo-700 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Cohort Avg Progress</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-indigo-950 mt-1">
              {avgCompletion}%
            </div>
          </div>

          <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200/80">
            <div className="text-xs text-purple-700 font-medium flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-600" />
              <span>Lab Journal Entries</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-950 mt-1">
              {totalNotesWritten}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-neutral-200">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter students by name or email..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-neutral-900 text-neutral-800 placeholder-neutral-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs text-neutral-500 font-medium shrink-0">Domain:</span>
          <select
            value={selectedDomainFilter}
            onChange={(e) => setSelectedDomainFilter(e.target.value)}
            className="text-xs bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 font-medium"
          >
            <option value="all">All Domains ({users.length})</option>
            {ECE_EEE_PREP_TRACKS.map(t => (
              <option key={t.fieldId} value={t.fieldId}>
                {t.fieldTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Telemetry Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs">
        {isLoading ? (
          <div className="py-16 text-center text-xs text-neutral-500 flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 text-neutral-400 animate-spin" />
            <span>Loading registered students telemetry from Firestore...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center text-xs text-neutral-500 space-y-2">
            <Users className="w-8 h-8 text-neutral-300 mx-auto" />
            <div className="font-semibold text-neutral-800">No users found matching query</div>
            <p className="text-neutral-400 max-w-sm mx-auto">
              When students sign in via Google and progress through the tracks, their telemetry will stream here in real-time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-700">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Focus Domain</th>
                  <th className="px-4 py-3">ECE/EEE Progress</th>
                  <th className="px-4 py-3">Curriculum</th>
                  <th className="px-4 py-3">Lab Journal</th>
                  <th className="px-4 py-3">Last Active</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredUsers.map((user) => {
                  const activeTrackMeta = ECE_EEE_PREP_TRACKS.find(t => t.fieldId === user.activeField);
                  const isUserAdmin = user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
                  const notesCount = Object.keys(user.eceEeeNotes || {}).length;

                  return (
                    <tr key={user.uid} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={user.displayName}
                              referrerPolicy="no-referrer"
                              className="w-8 h-8 rounded-full border border-neutral-200 shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-700 font-bold flex items-center justify-center text-xs shrink-0">
                              {(user.displayName || user.email)[0].toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-bold text-neutral-900 truncate flex items-center gap-1.5">
                              <span>{user.displayName || user.email.split('@')[0]}</span>
                              {isUserAdmin && (
                                <span className="px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800 text-[9px] font-bold">
                                  Admin
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-neutral-500 truncate font-mono">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
                          {activeTrackMeta ? activeTrackMeta.fieldTitle.split('&')[0].trim() : 'General'}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="space-y-1 w-32">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-neutral-900">
                              {user.statsSummary?.ecePercent || 0}%
                            </span>
                            <span className="text-neutral-500">
                              {user.statsSummary?.eceCompleted || 0} items
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all"
                              style={{ width: `${user.statsSummary?.ecePercent || 0}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="text-neutral-900 font-semibold text-[11px]">
                          {user.statsSummary?.curriculumDone || 0} Subtopics
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          Curriculum Checked
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${
                          notesCount > 0 ? 'bg-purple-50 text-purple-700 border border-purple-200 font-semibold' : 'text-neutral-400'
                        }`}>
                          <FileText className="w-3 h-3" />
                          <span>{notesCount} entries</span>
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-neutral-500 text-[11px]">
                        {user.lastActive ? new Date(user.lastActive).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'N/A'}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => setSelectedUserForDetail(user)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200 transition-colors cursor-pointer active:scale-95"
                        >
                          <span>Inspect</span>
                          <ExternalLink className="w-3 h-3 text-neutral-500" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Dossier Detail Modal */}
      {selectedUserForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-2xl w-full p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                {selectedUserForDetail.photoURL ? (
                  <img
                    src={selectedUserForDetail.photoURL}
                    alt={selectedUserForDetail.displayName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full border border-neutral-200 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-neutral-200 text-neutral-700 font-bold flex items-center justify-center text-sm">
                    {(selectedUserForDetail.displayName || selectedUserForDetail.email)[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    {selectedUserForDetail.displayName}
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    {selectedUserForDetail.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedUserForDetail(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="text-neutral-500 text-[11px]">Active Focus</div>
                <div className="font-bold text-neutral-900 mt-0.5 truncate">
                  {selectedUserForDetail.activeField || 'Power Electronics'}
                </div>
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-emerald-700 text-[11px]">Track Completed</div>
                <div className="font-bold text-emerald-900 mt-0.5">
                  {selectedUserForDetail.statsSummary?.eceCompleted || 0} items ({selectedUserForDetail.statsSummary?.ecePercent || 0}%)
                </div>
              </div>
              <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-purple-700 text-[11px]">Journal Entries</div>
                <div className="font-bold text-purple-900 mt-0.5">
                  {Object.keys(selectedUserForDetail.eceEeeNotes || {}).length} Domains
                </div>
              </div>
            </div>

            {/* Student's Private Lab Journal Notes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Student Lab Journal &amp; Scratchpad Notes:
              </h4>
              {Object.keys(selectedUserForDetail.eceEeeNotes || {}).length === 0 ? (
                <div className="p-4 bg-neutral-50 rounded-xl text-xs text-neutral-500 text-center">
                  No notes recorded yet by this student.
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {Object.entries(selectedUserForDetail.eceEeeNotes || {}).map(([fieldId, noteText]) => (
                    <div key={fieldId} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
                      <div className="font-bold text-neutral-900 capitalize text-[11px] text-emerald-800">
                        {fieldId.replace(/_/g, ' ')}
                      </div>
                      <div className="font-mono text-neutral-700 whitespace-pre-wrap leading-relaxed text-[11px]">
                        {noteText}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Close Action */}
            <div className="pt-2 border-t border-neutral-100 flex justify-end">
              <button
                onClick={() => setSelectedUserForDetail(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
