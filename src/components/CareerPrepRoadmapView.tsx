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
  Square,
  CheckCheck,
  Tag,
  Compass,
  ShieldCheck,
  CircuitBoard,
  Terminal,
  Plus,
  Edit2,
  Trash2,
  X,
  Check
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
import { MASTER_ENGINEERING_DOMAINS, SUPER_DOMAINS, getDomainForCareerPrepTrack } from '../data/domainsData';
import { SuperDomainId } from '../types';
import { NitGoaStrategySection } from './NitGoaStrategySection';
import { ClassificationMatrixSection } from './ClassificationMatrixSection';
import { EceEeeCareersView } from './EceEeeCareersView';

interface CareerTrackFormData {
  number: number;
  title: string;
  tagline: string;
  whyLearn: string;
  companiesText: string;
  rolesText: string;
  tasksText: string;
  domainName: string;
}

const BLANK_CAREER_TRACK_FORM: CareerTrackFormData = {
  number: 1,
  title: '',
  tagline: '',
  whyLearn: '',
  companiesText: 'Qualcomm, NVIDIA, Intel, AMD',
  rolesText: 'RTL Engineer, ASIC Engineer',
  tasksText: 'Digital Logic & Gate-level synthesis\nSequential Circuits & State Machines\nFormal Verification & CDC Rules',
  domainName: 'Digital RTL & ASIC'
};

export const CareerPrepRoadmapView: React.FC = () => {
  const [tracks, setTracks] = useState<CareerPrepTrack[]>(() => getStoredCareerPrepTracks());
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>(() => getCheckedCareerTasks());
  const [checkedProjects, setCheckedProjects] = useState<Record<string, boolean>>(() => getCheckedCareerProjects());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSuperDomainId, setSelectedSuperDomainId] = useState<SuperDomainId>('all');
  const [selectedDomainId, setSelectedDomainId] = useState<string>('all');
  const [selectedJobRole, setSelectedJobRole] = useState<string>('all');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState<string>('All');
  const [trackStatusFilter, setTrackStatusFilter] = useState<'All' | 'Pending' | 'Done'>('All');
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('All');
  const [projectStatusFilter, setProjectStatusFilter] = useState<'All' | 'Pending' | 'Done'>('All');
  const [directorySearchQuery, setDirectorySearchQuery] = useState('');

  // Add / Edit Career Track State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTrackId, setEditingTrackId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CareerTrackFormData>(BLANK_CAREER_TRACK_FORM);

  const [expandedTrackIds, setExpandedTrackIds] = useState<Record<string, boolean>>({
    'track-digital-design': true,
    'track-rtl-design': true
  });
  const [activeSubTab, setActiveSubTab] = useState<'tracks' | 'ece_eee_report' | 'classification' | 'nit_goa_strategy' | 'projects' | 'directory'>('tracks');

  // Domain-level statistics for Career Roadmap
  const domainStats = useMemo(() => {
    return MASTER_ENGINEERING_DOMAINS.map(domain => {
      const domainTracks = tracks.filter(t => (t.domainId || getDomainForCareerPrepTrack(t.id).id) === domain.id);
      let total = 0;
      let done = 0;
      domainTracks.forEach(t => {
        total += t.tasks.length;
        t.tasks.forEach(task => {
          if (checkedTasks[task.id]) done++;
        });
      });
      const percent = total > 0 ? Math.round((done / total) * 100) : 0;
      return {
        domain,
        trackCount: domainTracks.length,
        total,
        done,
        percent
      };
    });
  }, [tracks, checkedTasks]);

  // Unique job roles across all tracks
  const allJobRoles = useMemo(() => {
    const set = new Set<string>();
    tracks.forEach(t => {
      t.roles.forEach(r => set.add(r));
      if (t.jobSpecificRoles) {
        t.jobSpecificRoles.forEach(r => set.add(r));
      }
    });
    return ['All', ...Array.from(set).sort()];
  }, [tracks]);

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

  // Unique project categories
  const projectCategories = useMemo(() => {
    const set = new Set<string>();
    initialProjectTrackerItems.forEach(p => set.add(p.category));
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Filtered tracks
  const filteredTracks = useMemo(() => {
    return tracks.filter(track => {
      // Super-Domain filter check (VLSI vs Embedded vs Career Strategy)
      if (selectedSuperDomainId !== 'all') {
        const trackDomainObj = MASTER_ENGINEERING_DOMAINS.find(
          d => d.id === (track.domainId || getDomainForCareerPrepTrack(track.id).id)
        );
        if (!trackDomainObj || trackDomainObj.superDomainId !== selectedSuperDomainId) {
          return false;
        }
      }

      // Domain filter check
      if (selectedDomainId !== 'all') {
        const trackDomain = track.domainId || getDomainForCareerPrepTrack(track.id).id;
        if (trackDomain !== selectedDomainId) return false;
      }

      // Job Role filter check
      if (selectedJobRole !== 'all') {
        const hasRole = track.roles.includes(selectedJobRole) || 
          (track.jobSpecificRoles && track.jobSpecificRoles.includes(selectedJobRole)) ||
          track.tasks.some(t => t.jobRole === selectedJobRole);
        if (!hasRole) return false;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        track.title.toLowerCase().includes(q) ||
        track.tagline.toLowerCase().includes(q) ||
        track.whyLearn.toLowerCase().includes(q) ||
        track.roles.some(r => r.toLowerCase().includes(q)) ||
        track.tasks.some(t => t.name.toLowerCase().includes(q)) ||
        track.companies.some(c => c.toLowerCase().includes(q));

      const matchesCompany = 
        selectedCompanyFilter === 'All' || 
        track.companies.includes(selectedCompanyFilter);

      const trackCompleted = track.tasks.filter(t => checkedTasks[t.id]).length;
      const trackTotal = track.tasks.length;
      const isDone = trackTotal > 0 && trackCompleted === trackTotal;

      const matchesStatus = trackStatusFilter === 'All' ||
        (trackStatusFilter === 'Done' && isDone) ||
        (trackStatusFilter === 'Pending' && !isDone);

      return matchesSearch && matchesCompany && matchesStatus;
    });
  }, [tracks, selectedDomainId, selectedJobRole, searchQuery, selectedCompanyFilter, trackStatusFilter, checkedTasks]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return initialProjectTrackerItems.filter(item => {
      const q = projectSearchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      const matchesCategory = projectCategoryFilter === 'All' || item.category === projectCategoryFilter;

      const isChecked = !!checkedProjects[item.id];
      const matchesStatus = projectStatusFilter === 'All' ||
        (projectStatusFilter === 'Done' && isChecked) ||
        (projectStatusFilter === 'Pending' && !isChecked);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projectSearchQuery, projectCategoryFilter, projectStatusFilter, checkedProjects]);

  // Filtered directory
  const filteredDirectory = useMemo(() => {
    const q = directorySearchQuery.toLowerCase().trim();
    if (!q) return completeLearningDirectory;

    return completeLearningDirectory.map(cat => {
      const matchingItems = cat.items.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        cat.category.toLowerCase().includes(q)
      );
      return {
        ...cat,
        items: matchingItems
      };
    }).filter(cat => cat.items.length > 0);
  }, [directorySearchQuery]);

  // Toggle single task check
  const handleToggleTask = (taskId: string) => {
    setCheckedTasks(prev => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      saveCheckedCareerTasks(next);
      return next;
    });
  };

  // Toggle all tasks in a track
  const handleToggleAllTrackTasks = (track: CareerPrepTrack, shouldCheck: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedTasks(prev => {
      const next = { ...prev };
      track.tasks.forEach(t => {
        next[t.id] = shouldCheck;
      });
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

  // Toggle all projects
  const handleToggleAllProjects = (shouldCheck: boolean) => {
    setCheckedProjects(prev => {
      const next = { ...prev };
      filteredProjects.forEach(p => {
        next[p.id] = shouldCheck;
      });
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

  const handleOpenAddTrack = () => {
    setEditingTrackId(null);
    const maxNum = tracks.reduce((max, t) => Math.max(max, t.number || 0), 0);
    setFormData({
      ...BLANK_CAREER_TRACK_FORM,
      number: maxNum + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEditTrack = (track: CareerPrepTrack, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTrackId(track.id);
    setFormData({
      number: track.number,
      title: track.title,
      tagline: track.tagline,
      whyLearn: track.whyLearn,
      companiesText: (track.companies || []).join(', '),
      rolesText: (track.roles || []).join(', '),
      tasksText: (track.tasks || []).map(t => t.name).join('\n'),
      domainName: track.domainName || 'Digital RTL & ASIC'
    });
    setIsModalOpen(true);
  };

  const handleDeleteTrack = (trackId: string, trackTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete career specialization track "${trackTitle}"?`)) {
      const updated = tracks.filter(t => t.id !== trackId);
      setTracks(updated);
      saveStoredCareerPrepTracks(updated);
    }
  };

  const handleSaveTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.whyLearn.trim()) {
      alert('Please fill in Track Title and Why Learn.');
      return;
    }

    const companies = formData.companiesText.split(',').map(c => c.trim()).filter(Boolean);
    const roles = formData.rolesText.split(',').map(r => r.trim()).filter(Boolean);
    const taskLines = formData.tasksText.split('\n').map(l => l.trim()).filter(Boolean);

    let updatedList: CareerPrepTrack[];

    if (editingTrackId) {
      updatedList = tracks.map(t => {
        if (t.id === editingTrackId) {
          const tasks = taskLines.map((line, idx) => {
            const existing = t.tasks[idx];
            return {
              id: existing?.id || `task-${Date.now()}-${idx}`,
              name: line,
              subPart: existing?.subPart,
              jobRole: existing?.jobRole
            };
          });

          return {
            ...t,
            number: formData.number,
            title: formData.title.trim(),
            tagline: formData.tagline.trim(),
            whyLearn: formData.whyLearn.trim(),
            companies: companies.length > 0 ? companies : t.companies,
            roles: roles.length > 0 ? roles : t.roles,
            domainName: formData.domainName.trim(),
            tasks: tasks.length > 0 ? tasks : t.tasks
          };
        }
        return t;
      });
    } else {
      const newTrackId = `track-custom-${Date.now()}`;
      const newTasks = taskLines.map((line, idx) => ({
        id: `task-${Date.now()}-${idx}`,
        name: line
      }));

      const newTrack: CareerPrepTrack = {
        id: newTrackId,
        number: formData.number,
        title: formData.title.trim(),
        tagline: formData.tagline.trim() || 'Core Engineering Track',
        whyLearn: formData.whyLearn.trim(),
        companies: companies.length > 0 ? companies : ['Qualcomm', 'Intel', 'NVIDIA'],
        roles: roles.length > 0 ? roles : ['Silicon Engineer'],
        tasks: newTasks.length > 0 ? newTasks : [{ id: `task-${Date.now()}-1`, name: 'Core Foundations' }],
        studyPlatforms: [],
        domainName: formData.domainName.trim()
      };

      updatedList = [...tracks, newTrack].sort((a, b) => (a.number || 0) - (b.number || 0));
    }

    setTracks(updatedList);
    saveStoredCareerPrepTracks(updatedList);
    setIsModalOpen(false);
  };

  const handleResetTracks = () => {
    if (window.confirm('Reset all career specialization tracks to default curriculum?')) {
      const def = resetStoredCareerPrepTracks();
      setTracks(def);
    }
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
              onClick={() => setActiveSubTab('ece_eee_report')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === 'ece_eee_report'
                  ? 'bg-white text-emerald-900 shadow-2xs'
                  : 'text-neutral-600 hover:text-emerald-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              <span>ECE &amp; EEE Career Report</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-semibold ml-1">
                6 Fields
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('classification')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === 'classification'
                  ? 'bg-white text-indigo-900 shadow-2xs'
                  : 'text-neutral-600 hover:text-indigo-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Domain Classification</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800 font-semibold ml-1">
                Jobs &bull; Skills &bull; Theory
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('nit_goa_strategy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === 'nit_goa_strategy'
                  ? 'bg-white text-indigo-900 shadow-2xs'
                  : 'text-neutral-600 hover:text-indigo-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              <span>NIT Goa EEE &rarr; VLSI Plan</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800 font-semibold ml-1">
                6th Sem
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
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {activeSubTab === 'tracks' && (
              <>
                <button
                  onClick={handleOpenAddTrack}
                  className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Add Track</span>
                </button>
                <button
                  onClick={expandAll}
                  className="px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors cursor-pointer shrink-0"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors cursor-pointer shrink-0"
                >
                  Collapse All
                </button>
                <button
                  onClick={handleResetTracks}
                  title="Reset tracks to default"
                  className="px-2 py-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors cursor-pointer shrink-0"
                >
                  Reset Tracks
                </button>
              </>
            )}

            <button
              onClick={handleResetProgress}
              title="Reset task checkmarks"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-neutral-200 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Checkmarks</span>
              <span className="sm:hidden">Reset Checks</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar (Visible in Tracks Tab) */}
        {activeSubTab === 'tracks' && (
          <div className="pt-2 border-t border-neutral-100 space-y-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
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

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1">
                  <Briefcase className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <select
                    value={selectedJobRole}
                    onChange={e => setSelectedJobRole(e.target.value)}
                    className="bg-transparent text-xs focus:outline-hidden"
                  >
                    <option value="all">All Job-Specific Roles ({allJobRoles.length - 1})</option>
                    {allJobRoles.filter(r => r !== 'All').map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1">
                  <Filter className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <select
                    value={selectedCompanyFilter}
                    onChange={e => setSelectedCompanyFilter(e.target.value)}
                    className="bg-transparent text-xs focus:outline-hidden"
                  >
                    <option value="All">All Companies ({allCompanies.length - 1})</option>
                    {allCompanies.filter(c => c !== 'All').map(company => (
                      <option key={company} value={company}>{company}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Status Filter Chips for Tracks */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-neutral-500 mr-1">Status:</span>
              {(['All', 'Pending', 'Done'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setTrackStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    trackStatusFilter === st
                      ? 'bg-neutral-900 text-white shadow-2xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                  }`}
                >
                  {st === 'All' ? `All Tracks (${tracks.length})` : st === 'Pending' ? '⏳ Pending' : '✅ Completed'}
                </button>
              ))}
              {(selectedDomainId !== 'all' || selectedJobRole !== 'all') && (
                <button
                  onClick={() => { setSelectedDomainId('all'); setSelectedJobRole('all'); }}
                  className="text-[11px] text-neutral-500 hover:text-neutral-900 underline ml-auto"
                >
                  Reset Domain/Role filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* LEVEL 0 & LEVEL 1: DOMAIN & SUBDOMAIN HIERARCHY BAR */}
      {activeSubTab === 'tracks' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-neutral-700" />
                Domains &amp; Subdomains Categorization
              </span>
              <span className="text-[11px] text-neutral-400 font-medium hidden sm:inline">
                (Filter specialization tracks by domain &amp; subdomains)
              </span>
            </div>
            <span className="text-[11px] font-semibold text-neutral-600">
              {selectedSuperDomainId === 'all'
                ? (selectedDomainId === 'all' ? 'All Engineering Domains' : MASTER_ENGINEERING_DOMAINS.find(d => d.id === selectedDomainId)?.name)
                : `${SUPER_DOMAINS.find(s => s.id === selectedSuperDomainId)?.name} ${selectedDomainId !== 'all' ? `• ${MASTER_ENGINEERING_DOMAINS.find(d => d.id === selectedDomainId)?.name}` : ''}`}
            </span>
          </div>

          {/* Level 0: Super-Domains (VLSI vs Embedded vs Career Strategy) */}
          <div className="p-1.5 rounded-xl bg-neutral-100 flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => {
                setSelectedSuperDomainId('all');
                setSelectedDomainId('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedSuperDomainId === 'all'
                  ? 'bg-white text-neutral-900 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Super-Domains ({tracks.length} Tracks)</span>
            </button>

            {SUPER_DOMAINS.map(sd => {
              const isSelected = selectedSuperDomainId === sd.id;
              let IconComp = Cpu;
              if (sd.id === 'embedded') IconComp = Terminal;
              if (sd.id === 'career-strategy') IconComp = Briefcase;

              return (
                <button
                  key={sd.id}
                  onClick={() => {
                    setSelectedSuperDomainId(sd.id);
                    setSelectedDomainId('all');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-neutral-900 text-white shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{sd.name}</span>
                </button>
              );
            })}
          </div>

          {/* Level 1: Subdomains */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedDomainId('all')}
              className={`flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedDomainId === 'all'
                  ? 'bg-neutral-900 border-neutral-900 text-white shadow-xs'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                selectedDomainId === 'all' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700'
              }`}>
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">All Subdomains</div>
                <div className={`text-[11px] mt-0.5 ${selectedDomainId === 'all' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {filteredTracks.length} Available Tracks
                </div>
              </div>
            </button>

            {domainStats
              .filter(({ domain }) => selectedSuperDomainId === 'all' || domain.superDomainId === selectedSuperDomainId)
              .map(({ domain, trackCount, percent }) => {
                const isSelected = selectedDomainId === domain.id;
                let DomainIcon = Cpu;
                if (domain.id === 'verification-dft') DomainIcon = ShieldCheck;
                else if (domain.id === 'physical-design') DomainIcon = Layers;
                else if (domain.id === 'fpga-hardware') DomainIcon = CircuitBoard;
                else if (domain.id === 'embedded-firmware') DomainIcon = Terminal;
                else if (domain.id === 'career-interview') DomainIcon = Briefcase;

                return (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedDomainId(domain.id)}
                    className={`flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 border-neutral-900 text-white shadow-xs ring-2 ring-neutral-900/10'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-neutral-800 text-white' : domain.bgLightColor
                    }`}>
                      <DomainIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-neutral-800'}`} />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight line-clamp-1">{domain.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[11px] ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {trackCount} {trackCount === 1 ? 'Track' : 'Tracks'} &bull; {percent}%
                        </span>
                        <div className={`w-10 h-1.5 rounded-full overflow-hidden ${isSelected ? 'bg-neutral-700' : 'bg-neutral-200'}`}>
                          <div 
                            className={`h-full rounded-full ${isSelected ? 'bg-emerald-400' : 'bg-emerald-600'}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}

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
                          {track.domainName && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200 flex items-center gap-1">
                              <Compass className="w-2.5 h-2.5 text-neutral-600" />
                              {track.domainName}
                            </span>
                          )}
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

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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

                      {/* Edit and Delete Track Actions */}
                      <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleOpenEditTrack(track, e)}
                          className="p-1.5 rounded-md text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                          title="Edit track"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteTrack(track.id, track.title, e)}
                          className="p-1.5 rounded-md text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete track"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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

                        {/* Track Sub-Parts / Modules Breakdown */}
                        {track.subParts && track.subParts.length > 0 && (
                          <div className="pt-2 border-t border-neutral-200/60">
                            <div className="flex items-center gap-1.5 text-neutral-600 font-semibold mb-1 text-xs">
                              <Tag className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Track Sub-Parts &amp; Modules:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {track.subParts.map((sp, idx) => (
                                <span 
                                  key={idx}
                                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-900"
                                >
                                  <span className="opacity-60 mr-1">#{idx + 1}</span>
                                  {sp}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Interactive Tasks Checklist */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                          <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                            <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                            Core Track Milestones &amp; Concepts ({trackCompleted}/{trackTotal})
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleToggleAllTrackTasks(track, trackCompleted !== trackTotal, e)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-600 hover:text-neutral-900 px-2 py-1 rounded border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors cursor-pointer"
                              title={trackCompleted === trackTotal ? 'Uncheck all tasks' : 'Check all tasks'}
                            >
                              <CheckCheck className="w-3 h-3 text-indigo-600" />
                              <span>{trackCompleted === trackTotal ? 'Reset Track' : 'Check All'}</span>
                            </button>
                            <span className="text-[11px] text-neutral-500 font-medium hidden sm:inline">
                              Click to toggle completion
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {track.tasks.map(task => {
                            const isDone = !!checkedTasks[task.id];
                            return (
                              <button
                                key={task.id}
                                onClick={() => handleToggleTask(task.id)}
                                className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                                  isDone
                                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium'
                                    : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                ) : (
                                  <Circle className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <span className={`text-xs block ${isDone ? 'line-through opacity-80' : ''}`}>
                                    {task.name}
                                  </span>
                                  {(task.subPart || task.jobRole) && (
                                    <div className="flex items-center gap-1 mt-1 flex-wrap">
                                      {task.subPart && (
                                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600 font-medium">
                                          {task.subPart}
                                        </span>
                                      )}
                                      {task.jobRole && (
                                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                                          {task.jobRole}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
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

      {/* TAB: ECE & EEE COMPREHENSIVE CAREER REPORT (6 SPECIALIZED FIELDS) */}
      {activeSubTab === 'ece_eee_report' && (
        <div className="space-y-4">
          <EceEeeCareersView 
            onNavigateToCareerPrep={() => setActiveSubTab('tracks')}
          />
        </div>
      )}

      {/* TAB: DOMAIN CLASSIFICATION (FRONTEND / BACKEND / JOBS / SKILLS / KNOWLEDGE) */}
      {activeSubTab === 'classification' && (
        <div className="space-y-4">
          <ClassificationMatrixSection />
        </div>
      )}

      {/* TAB: NIT GOA EEE -> VLSI STRATEGY & ROADMAP */}
      {activeSubTab === 'nit_goa_strategy' && (
        <div className="space-y-4">
          <NitGoaStrategySection />
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
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                {completedProjectsCount} of {initialProjectTrackerItems.length} Completed
              </span>
              <button
                onClick={() => handleToggleAllProjects(completedProjectsCount !== initialProjectTrackerItems.length)}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>{completedProjectsCount === initialProjectTrackerItems.length ? 'Reset All' : 'Check All'}</span>
              </button>
            </div>
          </div>

          {/* Project Search & Filter Toolbar */}
          <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200/80 space-y-2.5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={projectSearchQuery}
                  onChange={e => setProjectSearchQuery(e.target.value)}
                  placeholder="Search project title, concept, or description..."
                  className="w-full pl-9 pr-3 py-1.5 bg-white text-xs border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <select
                  value={projectCategoryFilter}
                  onChange={e => setProjectCategoryFilter(e.target.value)}
                  className="bg-white text-xs border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                >
                  {projectCategories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project Status Filter */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-neutral-200/60">
              <span className="text-[11px] font-semibold text-neutral-500 mr-1">Status:</span>
              {(['All', 'Pending', 'Done'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setProjectStatusFilter(st)}
                  className={`px-2.5 py-0.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    projectStatusFilter === st
                      ? 'bg-neutral-900 text-white shadow-2xs'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200'
                  }`}
                >
                  {st === 'All' ? `All (${initialProjectTrackerItems.length})` : st === 'Pending' ? '⏳ Pending' : '✅ Completed'}
                </button>
              ))}
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 bg-neutral-50 rounded-xl border border-neutral-200">
              <p className="text-sm font-medium">No projects match your current search/status filter.</p>
              <button
                onClick={() => { setProjectSearchQuery(''); setProjectCategoryFilter('All'); setProjectStatusFilter('All'); }}
                className="mt-2 text-xs text-indigo-600 hover:underline font-semibold"
              >
                Reset Project Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredProjects.map(item => {
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
          )}
        </div>
      )}

      {/* TAB 3: COMPLETE FREE LEARNING PLATFORM DIRECTORY */}
      {activeSubTab === 'directory' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-neutral-200/90 shadow-2xs p-5 sm:p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-600" />
                  Complete Free Learning Platform Directory
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Curated official repositories, interactive simulators, universities and industry documentation portals across VLSI, FPGA, UVM &amp; RISC-V.
                </p>
              </div>
            </div>

            {/* Search filter for directory */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={directorySearchQuery}
                onChange={e => setDirectorySearchQuery(e.target.value)}
                placeholder="Search courses, EDA simulators, NPTEL, portals..."
                className="w-full pl-9 pr-3 py-1.5 bg-neutral-50 text-xs border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
              />
              {directorySearchQuery && (
                <button
                  onClick={() => setDirectorySearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {filteredDirectory.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-neutral-200 text-neutral-500">
              <p className="text-sm font-medium">No platforms or courses matched "{directorySearchQuery}".</p>
              <button
                onClick={() => setDirectorySearchQuery('')}
                className="mt-2 text-xs text-indigo-600 hover:underline font-semibold"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDirectory.map((category, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-xl border border-neutral-200/80 shadow-2xs p-4 sm:p-5 space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 pb-2 border-b border-neutral-100">
                    <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{category.category}</span>
                    <span className="text-[10px] text-neutral-400 font-normal ml-auto">
                      {category.items.length} resources
                    </span>
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
          )}
        </div>
      )}

      {/* ADD / EDIT TRACK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  {editingTrackId ? 'Edit Career Track' : 'Add Specialization Track'}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Customize track title, target roles, companies, and milestone tasks.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveTrack} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Track #</label>
                  <input
                    type="number"
                    value={formData.number}
                    onChange={e => setFormData({ ...formData, number: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-neutral-700 mb-1">Domain</label>
                  <input
                    type="text"
                    value={formData.domainName}
                    onChange={e => setFormData({ ...formData, domainName: e.target.value })}
                    placeholder="e.g. Digital RTL & ASIC, Verification, Embedded"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Track Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Digital RTL Architecture & Timing"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Tagline / Summary</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Brief summary of what this track focuses on"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Why Learn? *</label>
                <textarea
                  rows={2}
                  value={formData.whyLearn}
                  onChange={e => setFormData({ ...formData, whyLearn: e.target.value })}
                  placeholder="Explain why mastering this specialization is critical for semiconductor industry..."
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Companies (comma separated)</label>
                  <input
                    type="text"
                    value={formData.companiesText}
                    onChange={e => setFormData({ ...formData, companiesText: e.target.value })}
                    placeholder="Qualcomm, NVIDIA, AMD, Intel"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Target Roles (comma separated)</label>
                  <input
                    type="text"
                    value={formData.rolesText}
                    onChange={e => setFormData({ ...formData, rolesText: e.target.value })}
                    placeholder="RTL Engineer, ASIC Designer"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Milestone Tasks (one task per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.tasksText}
                  onChange={e => setFormData({ ...formData, tasksText: e.target.value })}
                  placeholder="Number Systems&#10;Combinational Circuits&#10;FSM State Encoding"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{editingTrackId ? 'Save Changes' : 'Create Track'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
