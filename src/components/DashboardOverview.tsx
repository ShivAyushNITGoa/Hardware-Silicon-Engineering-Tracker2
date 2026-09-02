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
  Cpu
} from 'lucide-react';
import { initialCurriculum } from '../data/curriculumData';
import { initialCompanies } from '../data/companiesData';
import { initialTools } from '../data/toolsData';
import { flagshipProjects } from '../data/projectsData';
import { initialInstitutions } from '../data/institutionsData';
import { initialCareerPrepTracks } from '../data/careerPrepData';
import { getCheckedSubtopics, getCompaniesOverrides, getCheckedToolSkills, getDailyHabitsLog, getInstitutionsOverrides, getCheckedCareerTasks } from '../utils/storage';

interface DashboardOverviewProps {
  onNavigate: (tab: any) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const checkedSubtopics = getCheckedSubtopics();
  const companiesOverrides = getCompaniesOverrides();
  const checkedTools = getCheckedToolSkills();
  const habitsLog = getDailyHabitsLog();

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
      <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Strategic Hardware & Silicon Engineering Roadmap
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Ayush's Silicon Career Command Center
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Executing the master roadmap across SystemVerilog, FPGA Architecture, 5-Stage RV32I Processor SoC, Edge-AI Silicon Acceleration, and Indian Semiconductor/Startup Pipelines.
          </p>
        </div>
      </div>

      {/* 4 Main Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Curriculum Progress */}
        <div 
          onClick={() => onNavigate('curriculum')}
          className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:border-neutral-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Curriculum Mastery</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900 mt-2">
            {curriculumStats.percent}%
          </div>
          <div className="text-xs text-neutral-500 mt-0.5">
            {curriculumStats.done} of {curriculumStats.total} Subtopics Ticked
          </div>
          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mt-3">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${curriculumStats.percent}%` }} />
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900 mt-3 group-hover:translate-x-1 transition-transform">
            View All Subtopics <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Company Pipeline */}
        <div 
          onClick={() => onNavigate('companies')}
          className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:border-neutral-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Indian Companies Pipeline</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900 mt-2">
            {companiesStats.total} <span className="text-xs font-medium text-neutral-500">Target Firms</span>
          </div>
          <div className="text-xs text-neutral-500 mt-0.5">
            {companiesStats.applied} Applied &bull; {companiesStats.inInterview} In Assessment/Interview
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900 mt-5 group-hover:translate-x-1 transition-transform">
            Open Pipeline Tracker <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Toolchain Skills */}
        <div 
          onClick={() => onNavigate('tools')}
          className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:border-neutral-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Toolchains & EDA</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900 mt-2">
            {toolsStats.done} / {toolsStats.total}
          </div>
          <div className="text-xs text-neutral-500 mt-0.5">
            Vivado, Questa, Verilator, cocotb, RISC-V GCC
          </div>
          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mt-3">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${toolsStats.percent}%` }} />
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900 mt-3 group-hover:translate-x-1 transition-transform">
            View Tool Skills <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Flagship Projects */}
        <div 
          onClick={() => onNavigate('projects')}
          className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:border-neutral-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Flagship Projects</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Rocket className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900 mt-2">
            4 Deep Builds
          </div>
          <div className="text-xs text-neutral-500 mt-0.5">
            FireGuard v2, RTL IP, RV32I SoC, Edge-AI
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900 mt-5 group-hover:translate-x-1 transition-transform">
            Inspect Architecture & Milestones <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Quick Launchpad to Key Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
        <div 
          onClick={() => onNavigate('career_prep')}
          className="p-4 rounded-xl border border-cyan-200 bg-cyan-50/60 hover:bg-cyan-50 hover:border-cyan-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-900">
            <Cpu className="w-4 h-4 text-cyan-600" />
            <span>Career Prep Roadmap</span>
          </div>
          <p className="text-[11px] text-cyan-950/80 mt-1">
            10 Tracks: ASIC, UVM, FPGA, RISC-V, Embedded, Networking, Analog.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('institutions')}
          className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-800">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>IITs, NITs & Research</span>
          </div>
          <p className="text-[11px] text-indigo-900/80 mt-1">
            {initialInstitutions.length} premier programs: Shakti, CeNSE, DRDO & SPARK.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('planner')}
          className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Calendar className="w-4 h-4 text-slate-600" />
            <span>20-Week Plan & Sunday Gate</span>
          </div>
          <p className="text-[11px] text-neutral-600 mt-1">
            Weekly exit gates & Sunday audit accountability log.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('interviews')}
          className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Interview Whiteboard</span>
          </div>
          <p className="text-[11px] text-neutral-600 mt-1">
            STA, SVA, SystemVerilog & FreeRTOS technical drills.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('calculators')}
          className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
            <Activity className="w-4 h-4 text-amber-600" />
            <span>Silicon Calculators</span>
          </div>
          <p className="text-[11px] text-neutral-600 mt-1">
            Live STA Timing Slack, Q-format, and Gray CDC converters.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('outreach')}
          className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span>DLI & Outreach</span>
          </div>
          <p className="text-[11px] text-neutral-600 mt-1">
            Cold emails, stipend benchmarks & hiring seasons.
          </p>
        </div>
      </div>


      {/* Quick Track Progress Overview */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-neutral-900">
            Roadmap Tracks Velocity
          </h3>
          <button 
            onClick={() => onNavigate('curriculum')}
            className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1"
          >
            Explore all tracks <ArrowRight className="w-3 h-3" />
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
                className="p-3.5 rounded-lg border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-100/60 hover:border-neutral-200 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-neutral-900 truncate max-w-[70%]">{track.name}</span>
                  <span className="font-semibold text-neutral-700">{done}/{total} ({pct}%)</span>
                </div>
                <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-neutral-900 h-full rounded-full" style={{ width: `${pct}%` }} />
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
