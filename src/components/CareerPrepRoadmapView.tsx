import React, { useState, useMemo } from 'react';
import {
  Cpu,
  Layers,
  CheckCircle2,
  Circle,
  ExternalLink,
  Search,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  BookOpen,
  FolderGit2,
  Building2,
  Briefcase,
  Globe,
  GraduationCap,
  Filter,
  CheckSquare,
  Square
} from 'lucide-react';
import { 
  CareerPrepTrack, 
  initialCareerPrepTracks, 
  initialProjectTrackerItems, 
  completeLearningDirectory,
  ProjectTrackerItem
} from '../data/careerPrepData';
import { 
  getCheckedCareerTasks, 
  saveCheckedCareerTasks, 
  getCheckedCareerProjects, 
  saveCheckedCareerProjects,
  getStoredCareerPrepTracks,
  saveStoredCareerPrepTracks,
  resetStoredCareerPrepTracks
} from '../utils/storage';

export const CareerPrepRoadmapView: React.FC = () => {
  const [tracks, setTracks] = useState<CareerPrepTrack[]>(() => getStoredCareerPrepTracks());
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>(() => getCheckedCareerTasks());
  const [checkedProjects, setCheckedProjects] = useState<Record<string, boolean>>(() => getCheckedCareerProjects());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState<string>('All');
  const [expandedTrackIds, setExpandedTrackIds] = useState<Record<string, boolean>>({
    'track-digital-design': true,
    'track-rtl-design': true
  });
  const [activeSubTab, setActiveSubTab] = useState<'tracks' | 'projects' | 'directory'>('tracks');

  // Calculate stats
  const totalTasks = useMemo(() => {
    return tracks.reduce((acc, t) => acc + t.tasks.length, 0);
  }, [tracks]);

  const completedTasksCount = useMemo(() => {
    let count = 0;
    tracks.forEach(t => {
      t.tasks.forEach(task => {
        if (checkedTasks[task.id]) count++;
      });
    });
    return count;
  }, [tracks, checkedTasks]);

  const progressPercentage = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;

  const completedProjectsCount = useMemo(() => {
    return initialProjectTrackerItems.filter(p => checkedProjects[p.id]).length;
  }, [checkedProjects]);

  // Unique companies list for filter
  const allCompanies = useMemo(() => {
    const set = new Set<string>();
    tracks.forEach(t => t.companies.forEach(c => set.add(c)));
    return ['All', ...Array.from(set).sort()];
  }, [tracks]);

  // Filtered tracks
  const filteredTracks = useMemo(() => {
    return tracks.filter(track => {
      const matchesSearch = 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.whyLearn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.roles.some(r => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
        track.tasks.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        track.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCompany = 
        selectedCompanyFilter === 'All' || 
        track.companies.includes(selectedCompanyFilter);

      return matchesSearch && matchesCompany;
    });
  }, [tracks, searchQuery, selectedCompanyFilter]);

  // Toggle single task check
  const handleToggleTask = (taskId: string) => {
    setCheckedTasks(prev => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      saveCheckedCareerTasks(next);
      return next;
    });
  };

  // Toggle single project check
  const handleToggleProject = (projId: string) => {
    setCheckedProjects(prev => {
      const next = { ...prev, [projId]: !prev[projId] };
      saveCheckedCareerProjects(next);
      return next;
    });
  };

  // Expand / collapse single track
  const toggleTrackExpand = (trackId: string) => {
    setExpandedTrackIds(prev => ({
      ...prev,
      [trackId]: !prev[trackId]
    }));
  };

  // Expand all / Collapse all
  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    tracks.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTrackIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedTrackIds({});
  };

  // Reset all checked tasks
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all checked tasks & projects in the Career Prep Dashboard?')) {
      setCheckedTasks({});
      saveCheckedCareerTasks({});
      setCheckedProjects({});
      saveCheckedCareerProjects({});
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Semiconductor Specialization Master Map</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Semiconductor Career Preparation Dashboard
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Complete structured roadmap for high-demand semiconductor engineering careers: 
            <strong className="text-white font-medium"> ASIC Design</strong>, 
            <strong className="text-white font-medium"> SoC Verification (UVM)</strong>, 
            <strong className="text-white font-medium"> FPGA</strong>, 
            <strong className="text-white font-medium"> Embedded Systems &amp; RTOS</strong>, 
            <strong className="text-white font-medium"> Processor Architecture (RISC-V)</strong>, 
            <strong className="text-white font-medium"> Networking ASIC</strong>, 
            <strong className="text-white font-medium"> Automotive Semiconductor</strong>, and 
            <strong className="text-white font-medium"> Analog / Mixed Signal IC Design</strong>.
          </p>
        </div>

        {/* Floating background decorative badge */}
        <div className="absolute right-6 -bottom-6 opacity-5 pointer-events-none hidden md:block">
          <Layers className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 mb-1">
            <span className="text-xs font-medium">Roadmap Tracks</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-900">
            10 Tracks
          </div>
          <p className="text-[11px] text-neutral-500 mt-0.5">Foundations to Analog IC</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 mb-1">
            <span className="text-xs font-medium">Skill Checkpoints</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-neutral-900">
              {completedTasksCount} / {totalTasks}
            </span>
            <span className="text-xs font-bold text-emerald-600">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 mb-1">
            <span className="text-xs font-medium">Project Tracker</span>
            <FolderGit2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-900">
            {completedProjectsCount} / {initialProjectTrackerItems.length}
          </div>
          <p className="text-[11px] text-neutral-500 mt-0.5">Flagship RTL, UVM &amp; RISC-V</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 mb-1">
            <span className="text-xs font-medium">Free Platforms</span>
            <Globe className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-900">
            25+ Direct
          </div>
          <p className="text-[11px] text-neutral-500 mt-0.5">NPTEL, EDA Playground &amp; UVM</p>
        </div>
      </div>

      {/* Sub-Navigation Tabs & Controls */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-neutral-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Sub-Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-lg shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveSubTab('tracks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === 'tracks'
                  ? 'bg-white text-neutral-900 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>10 Specialization Tracks</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-200 text-neutral-700 ml-1">
                10
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('projects')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === 'projects'
                  ? 'bg-white text-neutral-900 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Project Tracker</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-200 text-neutral-700 ml-1">
                {initialProjectTrackerItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('directory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === 'directory'
                  ? 'bg-white text-neutral-900 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Free Platform Directory</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-200 text-neutral-700 ml-1">
                8 Domains
              </span>
            </button>
          </div>

          {/* Quick Actions (Reset & Expand/Collapse) */}
          <div className="flex items-center gap-2">
            {activeSubTab === 'tracks' && (
              <>
                <button
                  onClick={expandAll}
                  className="px-2.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-2.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors cursor-pointer"
                >
                  Collapse All
                </button>
              </>
            )}

            <button
              onClick={handleResetProgress}
              title="Reset task checkmarks"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-neutral-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Checkmarks</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar (Visible in Tracks Tab) */}
        {activeSubTab === 'tracks' && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2 border-t border-neutral-100">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tracks, roles (e.g. RTL, UVM, FPGA, RISC-V), companies, or concepts..."
                className="w-full pl-9 pr-3 py-1.5 bg-neutral-50 text-xs border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <select
                value={selectedCompanyFilter}
                onChange={e => setSelectedCompanyFilter(e.target.value)}
                className="bg-neutral-50 text-xs border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
              >
                <option value="All">All Target Companies ({allCompanies.length - 1})</option>
                {allCompanies.filter(c => c !== 'All').map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* TAB 1: 10 SPECIALIZATION TRACKS */}
      {activeSubTab === 'tracks' && (
        <div className="space-y-4">
          {filteredTracks.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-neutral-200 text-neutral-500">
              <p className="text-sm font-medium">No tracks matched your search filter "{searchQuery}".</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCompanyFilter('All'); }}
                className="mt-3 px-3 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredTracks.map(track => {
              const isExpanded = !!expandedTrackIds[track.id];
              const trackCompleted = track.tasks.filter(t => checkedTasks[t.id]).length;
              const trackTotal = track.tasks.length;
              const trackPercent = trackTotal > 0 ? Math.round((trackCompleted / trackTotal) * 100) : 0;

              return (
                <div 
                  key={track.id}
                  className="bg-white rounded-xl border border-neutral-200/90 shadow-2xs overflow-hidden transition-all"
                >
                  {/* Summary / Header */}
                  <div 
                    onClick={() => toggleTrackExpand(track.id)}
                    className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/70 select-none transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {track.number}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-sm sm:text-base font-bold text-neutral-900 truncate">
                            {track.title}
                          </h2>
                          {trackPercent === 100 && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3" /> Completed
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                          {track.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Progress Badge */}
                      <div className="text-right hidden sm:block">
                        <div className="text-xs font-bold text-neutral-800">
                          {trackCompleted}/{trackTotal} Done
                        </div>
                        <div className="w-20 bg-neutral-100 rounded-full h-1.5 mt-1 overflow-hidden">
                          <div 
                            className="bg-indigo-600 h-full rounded-full transition-all"
                            style={{ width: `${trackPercent}%` }}
                          />
                        </div>
                      </div>

                      <button
                        className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
                        aria-label={isExpanded ? 'Collapse track' : 'Expand track'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Body Content */}
                  {isExpanded && (
                    <div className="px-4 pb-5 pt-1 sm:px-5 border-t border-neutral-100 space-y-4 animate-in fade-in duration-150">
                      
                      {/* Why Learn & Role Callout */}
                      <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200/70 space-y-3">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                            Why learn?
                          </span>
                          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                            {track.whyLearn}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-200/60 text-xs">
                          <div>
                            <div className="flex items-center gap-1.5 text-neutral-600 font-semibold mb-1">
                              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Hiring Semiconductor Companies:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {track.companies.map((c, i) => (
                                <span 
                                  key={i}
                                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-800"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 text-neutral-600 font-semibold mb-1">
                              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Target Engineering Roles:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {track.roles.map((r, i) => (
                                <span 
                                  key={i}
                                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900"
                                >
                                  {r}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Tasks Checklist */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                            <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                            Core Track Milestones &amp; Concepts ({trackCompleted}/{trackTotal})
                          </span>
                          <span className="text-[11px] text-neutral-500 font-medium">
                            Click to toggle completion
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {track.tasks.map(task => {
                            const isDone = !!checkedTasks[task.id];
                            return (
                              <button
                                key={task.id}
                                onClick={() => handleToggleTask(task.id)}
                                className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                                  isDone
                                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium'
                                    : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                ) : (
                                  <Circle className="w-4 h-4 text-neutral-300 shrink-0" />
                                )}
                                <span className={`text-xs ${isDone ? 'line-through opacity-80' : ''}`}>
                                  {task.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Track Projects (if applicable, e.g. RTL track) */}
                      {track.projects && track.projects.length > 0 && (
                        <div className="bg-indigo-50/50 rounded-xl p-3.5 border border-indigo-100 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950">
                            <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Recommended RTL Projects:</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {track.projects.map((proj, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-indigo-900 bg-white/80 p-2 rounded-lg border border-indigo-100">
                                <Sparkles className="w-3 h-3 text-indigo-600 shrink-0" />
                                <span className="font-semibold">{proj}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Free Study Platforms Direct Links */}
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-2">
                          <Globe className="w-3.5 h-3.5 text-cyan-600" />
                          <span>Free Study Platforms &amp; Course Links:</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {track.studyPlatforms.map((platform, idx) => (
                            <a
                              key={idx}
                              href={platform.url || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group p-2.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 transition-all flex items-start justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-neutral-900 group-hover:text-cyan-700 flex items-center gap-1">
                                  <span>{platform.name}</span>
                                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 shrink-0" />
                                </div>
                                {platform.description && (
                                  <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">
                                    {platform.description}
                                  </p>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: SEMICONDUCTOR PROJECT TRACKER */}
      {activeSubTab === 'projects' && (
        <div className="bg-white rounded-xl border border-neutral-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
            <div>
              <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-indigo-600" />
                Semiconductor Project Tracker
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Crucial hands-on silicon, verification, processor, and embedded builds for your technical portfolio.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg self-start sm:self-auto">
              {completedProjectsCount} of {initialProjectTrackerItems.length} Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {initialProjectTrackerItems.map(item => {
              const isChecked = !!checkedProjects[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => handleToggleProject(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : 'bg-neutral-50 hover:bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleProject(item.id);
                    }}
                    className="mt-0.5 text-neutral-400 hover:text-neutral-900 cursor-pointer"
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-neutral-300 hover:text-neutral-500" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-sm font-bold ${isChecked ? 'line-through opacity-80' : 'text-neutral-900'}`}>
                        {item.name}
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-700 shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: COMPLETE FREE LEARNING PLATFORM DIRECTORY */}
      {activeSubTab === 'directory' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-neutral-200/90 shadow-2xs p-5 sm:p-6 space-y-1">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-600" />
              Complete Free Learning Platform Directory
            </h2>
            <p className="text-xs text-neutral-500">
              Curated official repositories, interactive simulators, universities and industry documentation portals across VLSI, FPGA, UVM &amp; RISC-V.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completeLearningDirectory.map((category, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl border border-neutral-200/80 shadow-2xs p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 pb-2 border-b border-neutral-100">
                  <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{category.category}</span>
                </div>

                <ul className="space-y-2.5">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="group">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/70 hover:border-neutral-300 transition-all"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-neutral-900 group-hover:text-cyan-700 flex items-center gap-1">
                            {item.name}
                            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono group-hover:text-neutral-600">
                            {new URL(item.url).hostname}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-1 leading-snug">
                          {item.description}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
