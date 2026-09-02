import React, { useMemo } from 'react';
import { 
  Activity, 
  BookOpen, 
  Building2, 
  Wrench, 
  Rocket, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  TrendingUp,
  GraduationCap,
  Cpu,
  Library,
  Star,
  Zap,
  Target
} from 'lucide-react';
import { initialCurriculum } from '../data/curriculumData';
import { initialCompanies } from '../data/companiesData';
import { initialTools } from '../data/toolsData';
import { flagshipProjects } from '../data/projectsData';
import { initialInstitutions } from '../data/institutionsData';
import { initialCareerPrepTracks } from '../data/careerPrepData';
import { flatEncyclopediaDocs } from '../data/encyclopediaData';
import { 
  getCheckedSubtopics, 
  getCompaniesOverrides, 
  getCheckedToolSkills, 
  getDailyHabitsLog, 
  getInstitutionsOverrides, 
  getCheckedCareerTasks,
  getStudiedEncyclopediaDocs,
  getBookmarkedEncyclopediaDocs
} from '../utils/storage';

interface DashboardOverviewProps {
  onNavigate: (tab: any) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const checkedSubtopics = getCheckedSubtopics();
  const companiesOverrides = getCompaniesOverrides();
  const checkedTools = getCheckedToolSkills();
  const habitsLog = getDailyHabitsLog();
  const studiedDocs = getStudiedEncyclopediaDocs();
  const bookmarkedDocs = getBookmarkedEncyclopediaDocs();

  // Curriculum Stats
  const curriculumStats = useMemo(() => {
    let total = 0;
    let done = 0;
    let exitTotal = 0;
    let exitDone = 0;

    initialCurriculum.forEach(track => {
      track.topics.forEach(topic => {
        topic.subtopics.forEach(st => {
          total += 1;
          if (checkedSubtopics[st.id]) done += 1;
          if (st.isExitGate) {
            exitTotal += 1;
            if (checkedSubtopics[st.id]) exitDone += 1;
          }
        });
      });
    });

    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, percent, exitTotal, exitDone };
  }, [checkedSubtopics]);

  // Encyclopedia Stats
  const encyclopediaStats = useMemo(() => {
    const total = flatEncyclopediaDocs.length;
    const done = flatEncyclopediaDocs.filter(d => studiedDocs[d.path]).length;
    const bookmarked = flatEncyclopediaDocs.filter(d => bookmarkedDocs[d.path]).length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, bookmarked, percent };
  }, [studiedDocs, bookmarkedDocs]);

  // Companies Stats
  const companiesStats = useMemo(() => {
    const total = initialCompanies.length;
    let applied = 0;
    let inInterview = 0;
    let offers = 0;

    initialCompanies.forEach(comp => {
      const status = companiesOverrides[comp.id]?.status || comp.status;
      if (status === 'Applied' || status === 'Online Assessment' || status === 'Technical Interview' || status === 'Offer') {
        applied += 1;
      }
      if (status === 'Technical Interview' || status === 'Online Assessment') {
        inInterview += 1;
      }
      if (status === 'Offer') {
        offers += 1;
      }
    });

    return { total, applied, inInterview, offers };
  }, [companiesOverrides]);

  // Tools Stats
  const toolsStats = useMemo(() => {
    let total = 0;
    let done = 0;
    initialTools.forEach(t => {
      t.keySkillsToMaster.forEach(s => {
        total += 1;
        if (checkedTools[s.id]) done += 1;
      });
    });
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, percent };
  }, [checkedTools]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-5 sm:p-7 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2.5 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Strategic Hardware & Silicon Engineering Roadmap
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Ayush's Silicon Career Command Center
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Executing the master roadmap across SystemVerilog, FPGA Architecture, 5-Stage RV32I Processor SoC, Edge-AI Silicon Acceleration, Complete Semiconductor Encyclopedia (336 Modules), and Indian Semiconductor/Startup Pipelines.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-neutral-400">
            <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 text-neutral-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {curriculumStats.exitDone}/{curriculumStats.exitTotal} Exit Gates Cleared
            </span>
            <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 text-neutral-200">
              <Library className="w-3.5 h-3.5 text-indigo-400" />
              {encyclopediaStats.done}/336 Encyclopedia Modules
            </span>
            <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 text-neutral-200">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              {companiesStats.applied} Applications Active
            </span>
          </div>
        </div>
      </div>

      {/* 5 Main Summary Cards (Responsive Grid: 1 col on phone, 2 on tablet, 3-5 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
        
        {/* Card 1: Curriculum Progress */}
        <div 
          onClick={() => onNavigate('curriculum')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-2xs hover:border-neutral-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Curriculum Mastery</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-neutral-900 mt-2">
              {curriculumStats.percent}%
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">
              {curriculumStats.done} of {curriculumStats.total} Subtopics
            </div>
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mt-3">
              <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: `${curriculumStats.percent}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900 mt-3 group-hover:translate-x-1 transition-transform pt-2 border-t border-neutral-100">
            View All Subtopics <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Encyclopedia Study Progress */}
        <div 
          onClick={() => onNavigate('encyclopedia')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-2xs hover:border-neutral-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Encyclopedia</span>
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Library className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-neutral-900 mt-2">
              {encyclopediaStats.percent}%
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">
              {encyclopediaStats.done} of {encyclopediaStats.total} Modules
            </div>
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mt-3">
              <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${encyclopediaStats.percent}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900 mt-3 group-hover:translate-x-1 transition-transform pt-2 border-t border-neutral-100">
            Study 18 Volumes <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Company Pipeline */}
        <div 
          onClick={() => onNavigate('companies')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-2xs hover:border-neutral-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Company Pipeline</span>
              <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-neutral-900 mt-2">
              {companiesStats.total} <span className="text-xs font-medium text-neutral-500">Firms</span>
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">
              {companiesStats.applied} Applied &bull; {companiesStats.inInterview} In Assessment
            </div>
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mt-3">
              <div className="bg-cyan-600 h-full rounded-full transition-all" style={{ width: `${Math.min(100, Math.round((companiesStats.applied / companiesStats.total) * 100))}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900 mt-3 group-hover:translate-x-1 transition-transform pt-2 border-t border-neutral-100">
            Open Pipeline <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Toolchain Skills */}
        <div 
          onClick={() => onNavigate('tools')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-2xs hover:border-neutral-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">EDA & Toolchains</span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-neutral-900 mt-2">
              {toolsStats.done} / {toolsStats.total}
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">
              Vivado, Questa, Verilator, cocotb
            </div>
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mt-3">
              <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${toolsStats.percent}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900 mt-3 group-hover:translate-x-1 transition-transform pt-2 border-t border-neutral-100">
            View Tool Skills <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 5: Flagship Projects */}
        <div 
          onClick={() => onNavigate('projects')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-2xs hover:border-neutral-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Flagship Projects</span>
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                <Rocket className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-neutral-900 mt-2">
              4 Builds
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">
              FireGuard v2, RV32I SoC, Edge-AI
            </div>
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mt-3">
              <div className="bg-purple-600 h-full rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900 mt-3 group-hover:translate-x-1 transition-transform pt-2 border-t border-neutral-100">
            Inspect Architecture <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Quick Launchpad to Key Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <div 
          onClick={() => onNavigate('encyclopedia')}
          className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-2xs transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
            <Library className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="truncate">Encyclopedia</span>
          </div>
          <p className="text-[11px] text-indigo-950/80 mt-1">
            336 modules: Physics &rarr; RTL &rarr; ASIC.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('career_prep')}
          className="p-3.5 rounded-xl border border-cyan-200 bg-cyan-50/60 hover:bg-cyan-50 hover:border-cyan-300 hover:shadow-2xs transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-900">
            <Cpu className="w-4 h-4 text-cyan-600 shrink-0" />
            <span className="truncate">Career Prep Tracks</span>
          </div>
          <p className="text-[11px] text-cyan-950/80 mt-1">
            10 Tracks: ASIC, UVM, FPGA, RISC-V.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('institutions')}
          className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-2xs transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-800">
            <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="truncate">IITs &amp; Research</span>
          </div>
          <p className="text-[11px] text-indigo-900/80 mt-1">
            {initialInstitutions.length} premier programs: Shakti, CeNSE, DRDO.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('planner')}
          className="p-3.5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-2xs transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Calendar className="w-4 h-4 text-slate-600 shrink-0" />
            <span className="truncate">20-Week Master Plan</span>
          </div>
          <p className="text-[11px] text-neutral-600 mt-1">
            Weekly exit gates & Sunday audit log.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('interviews')}
          className="p-3.5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-2xs transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">Interview Drills</span>
          </div>
          <p className="text-[11px] text-neutral-600 mt-1">
            STA, SVA, SystemVerilog & FreeRTOS.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('calculators')}
          className="p-3.5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-2xs transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
            <Activity className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="truncate">Silicon Calculators</span>
          </div>
          <p className="text-[11px] text-neutral-600 mt-1">
            STA Timing Slack, Q-format & CDC.
          </p>
        </div>
      </div>

      {/* Curriculum Velocity Overview */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-neutral-900">
              Curriculum Roadmap Tracks Velocity
            </h3>
            <p className="text-xs text-neutral-500">Track progress across all 15 technical domains</p>
          </div>
          <button 
            onClick={() => onNavigate('curriculum')}
            className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Explore all <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {initialCurriculum.map(track => {
            let total = 0;
            let done = 0;
            track.topics.forEach(tp => {
              tp.subtopics.forEach(st => {
                total += 1;
                if (checkedSubtopics[st.id]) done += 1;
              });
            });
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;

            return (
              <div 
                key={track.id}
                onClick={() => onNavigate('curriculum')}
                className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-100/70 hover:border-neutral-200 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-neutral-900 truncate max-w-[70%]">{track.name}</span>
                  <span className="font-semibold text-neutral-700 font-mono text-[11px]">{done}/{total} ({pct}%)</span>
                </div>
                <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-neutral-900 h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <div className="text-[11px] text-neutral-500 truncate mt-1.5">
                  Focus: {track.currentFocus}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
