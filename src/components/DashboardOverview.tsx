import React, { useMemo, useState } from 'react';
import { 
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
  Target,
  Compass,
  Layers,
  Tag,
  CircuitBoard,
  Terminal,
  Briefcase
} from 'lucide-react';
import { initialCurriculum } from '../data/curriculumData';
import { initialCompanies } from '../data/companiesData';
import { initialTools } from '../data/toolsData';
import { flagshipProjects } from '../data/projectsData';
import { initialInstitutions } from '../data/institutionsData';
import { initialCareerPrepTracks } from '../data/careerPrepData';
import { flatEncyclopediaDocs } from '../data/encyclopediaData';
import { MASTER_ENGINEERING_DOMAINS, SUPER_DOMAINS } from '../data/domainsData';
import { SuperDomainId } from '../types';
import { NitGoaStrategySection } from './NitGoaStrategySection';
import { ClassificationMatrixSection } from './ClassificationMatrixSection';
import { 
  getCheckedSubtopics, 
  getCompaniesOverrides, 
  getCheckedToolSkills, 
  getDailyHabitsLog, 
  getInstitutionsOverrides, 
  getCheckedCareerTasks,
  getStudiedEncyclopediaDocs,
  getBookmarkedEncyclopediaDocs,
  getStoredCurriculum
} from '../utils/storage';

interface DashboardOverviewProps {
  onNavigate: (tab: any) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const [selectedSuperDomain, setSelectedSuperDomain] = useState<SuperDomainId>('all');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');
  const [showNitStrategy, setShowNitStrategy] = useState<boolean>(true);
  const [showClassificationMatrix, setShowClassificationMatrix] = useState<boolean>(false);
  const checkedSubtopics = getCheckedSubtopics();
  const companiesOverrides = getCompaniesOverrides();
  const checkedTools = getCheckedToolSkills();
  const habitsLog = getDailyHabitsLog();
  const studiedDocs = getStudiedEncyclopediaDocs();
  const bookmarkedDocs = getBookmarkedEncyclopediaDocs();
  const curriculum = useMemo(() => getStoredCurriculum(), []);

  // Curriculum Stats
  const curriculumStats = useMemo(() => {
    let total = 0;
    let done = 0;
    let exitTotal = 0;
    let exitDone = 0;

    curriculum.forEach(track => {
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
  }, [curriculum, checkedSubtopics]);

  // Engineering Domain Curriculum Stats
  const domainCurriculumStats = useMemo(() => {
    return MASTER_ENGINEERING_DOMAINS.map(domain => {
      const domainTracks = curriculum.filter(t => t.domainId === domain.id);
      let total = 0;
      let done = 0;
      let exitTotal = 0;
      let exitDone = 0;

      domainTracks.forEach(t => {
        t.topics.forEach(tp => {
          tp.subtopics.forEach(st => {
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
      return {
        domain,
        tracks: domainTracks,
        total,
        done,
        percent,
        exitTotal,
        exitDone
      };
    });
  }, [curriculum, checkedSubtopics]);

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
            Strategic Hardware &amp; Silicon Engineering OS &bull; Curated by Ayush Kumar
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Ayush Kumar's Silicon Career Command Center
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Universal engineering operating system and structured execution roadmap across SystemVerilog, FPGA Architecture, 5-Stage RV32I Processor SoC, Edge-AI Silicon Acceleration, Complete Semiconductor Encyclopedia (336 Modules), and 80+ Semiconductor Company Pipelines.
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
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
      </div>

      {/* NIT Goa EEE -> VLSI Career Strategy Executive Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              NIT Goa EEE &rarr; VLSI Transition Strategy &bull; 6th Semester Onwards
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('nit_goa_report')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200 transition-colors"
            >
              <span>Full Academic Report &amp; Export (.md)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setShowNitStrategy(!showNitStrategy)}
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 underline cursor-pointer"
            >
              {showNitStrategy ? 'Collapse Strategy Box' : 'Expand Strategy Box'}
            </button>
          </div>
        </div>

        {showNitStrategy && (
          <NitGoaStrategySection 
            onNavigateToCurriculum={() => onNavigate('curriculum')}
            onNavigateToCareerPrep={() => onNavigate('career_prep')}
            onNavigateToCompanies={() => onNavigate('companies')}
            onNavigateToTools={() => onNavigate('tools')}
            onNavigateToInterviews={() => onNavigate('interviews')}
            onNavigateToReport={() => onNavigate('nit_goa_report')}
          />
        )}
      </div>

      {/* Engineering Domain & Subdomain Classification (Frontend/Backend Jobs, Skills, Knowledge) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Domain &amp; Subdomain Classification &bull; Frontend &bull; Backend &bull; Embedded
            </span>
          </div>
          <button
            onClick={() => setShowClassificationMatrix(!showClassificationMatrix)}
            className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 underline cursor-pointer"
          >
            {showClassificationMatrix ? 'Collapse Classification Matrix' : 'Expand Classification Matrix (Frontend / Backend)'}
          </button>
        </div>

        {showClassificationMatrix && (
          <ClassificationMatrixSection 
            onNavigateToCurriculum={() => onNavigate('curriculum')}
            onNavigateToCareerPrep={() => onNavigate('career_prep')}
            onNavigateToEncyclopedia={() => onNavigate('encyclopedia')}
            onNavigateToTools={() => onNavigate('tools')}
          />
        )}
      </div>

      {/* Engineering Domain Classification & Curriculum Velocity */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
              <Compass className="w-3.5 h-3.5 text-neutral-700" />
              <span>Hierarchical Architecture &bull; Domain &rarr; Subdomain &rarr; Tracks &rarr; Sub-parts</span>
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              Curriculum Roadmap Tracks Velocity
            </h3>
            <p className="text-xs text-neutral-500">
              Categorized into VLSI Silicon, Embedded Systems, and Academic Strategy &bull; 15 Curated Tracks
            </p>
          </div>
          <button 
            onClick={() => onNavigate('curriculum')}
            className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            Open Full Curriculum View <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Level 0: Super-Domains (VLSI vs Embedded vs Career Strategy) */}
        <div className="p-1.5 rounded-xl bg-neutral-100 flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => {
              setSelectedSuperDomain('all');
              setSelectedDomainFilter('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedSuperDomain === 'all'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Domains ({curriculum.length} Tracks)</span>
          </button>

          {SUPER_DOMAINS.map(sd => {
            const isSelected = selectedSuperDomain === sd.id;
            let IconComp = Cpu;
            if (sd.id === 'embedded') IconComp = Terminal;
            if (sd.id === 'career-strategy') IconComp = Briefcase;

            return (
              <button
                key={sd.id}
                onClick={() => {
                  setSelectedSuperDomain(sd.id);
                  setSelectedDomainFilter('all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{sd.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-700'
                }`}>
                  {sd.subdomainIds.length} Subdomains
                </span>
              </button>
            );
          })}
        </div>

        {/* Level 1: Subdomain Tabs Selector */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedDomainFilter('all')}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              selectedDomainFilter === 'all'
                ? 'bg-neutral-900 border-neutral-900 text-white shadow-xs'
                : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <span>All Subdomains</span>
          </button>

          {domainCurriculumStats
            .filter(({ domain }) => selectedSuperDomain === 'all' || domain.superDomainId === selectedSuperDomain)
            .map(({ domain, percent }) => {
              const isSelected = selectedDomainFilter === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomainFilter(domain.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 border-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span>{domain.shortName}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-neutral-700 text-neutral-200' : 'bg-neutral-200 text-neutral-800'
                  }`}>
                    {percent}%
                  </span>
                </button>
              );
            })}
        </div>

        {/* Domain Sections / Track Velocity Cards */}
        <div className="space-y-4">
          {domainCurriculumStats
            .filter(({ domain }) => {
              if (selectedSuperDomain !== 'all' && domain.superDomainId !== selectedSuperDomain) {
                return false;
              }
              if (selectedDomainFilter !== 'all' && domain.id !== selectedDomainFilter) {
                return false;
              }
              return true;
            })
            .map(({ domain, tracks: dTracks, total, done, percent }) => {
              let DomainIcon = Cpu;
              if (domain.id === 'verification-dft') DomainIcon = ShieldCheck;
              else if (domain.id === 'physical-design') DomainIcon = Layers;
              else if (domain.id === 'fpga-hardware') DomainIcon = CircuitBoard;
              else if (domain.id === 'embedded-firmware') DomainIcon = Terminal;
              else if (domain.id === 'career-interview') DomainIcon = Briefcase;

              return (
                <div 
                  key={domain.id}
                  className="rounded-xl border border-neutral-200/90 bg-neutral-50/40 p-4 space-y-3"
                >
                  {/* Level 1 Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${domain.bgLightColor}`}>
                        <DomainIcon className="w-4 h-4 text-neutral-900" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-neutral-900">
                            {domain.name}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200/80 text-neutral-700">
                            Level 1 Domain &bull; {dTracks.length} {dTracks.length === 1 ? 'Track' : 'Tracks'}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {domain.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-xs font-bold font-mono text-neutral-800">
                          {done} / {total} ({percent}%)
                        </div>
                        <div className="w-24 bg-neutral-200 h-1.5 rounded-full overflow-hidden mt-1">
                          <div 
                            className="bg-emerald-600 h-full rounded-full transition-all" 
                            style={{ width: `${percent}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Level 3: Job-Specific Target Roles Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1 mr-1">
                      <Briefcase className="w-3 h-3 text-neutral-500" />
                      Target Job Roles:
                    </span>
                    {domain.jobSpecificRoles.map((role, idx) => (
                      <span 
                        key={idx} 
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-800"
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  {/* Level 2: Tracks Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                    {dTracks.map(track => {
                      let tTotal = 0;
                      let tDone = 0;
                      track.topics.forEach(tp => {
                        tp.subtopics.forEach(st => {
                          tTotal += 1;
                          if (checkedSubtopics[st.id]) tDone += 1;
                        });
                      });
                      const tPct = tTotal > 0 ? Math.round((tDone / tTotal) * 100) : 0;

                      return (
                        <div 
                          key={track.id}
                          onClick={() => onNavigate('curriculum')}
                          className="p-3 rounded-lg border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-2xs transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-bold text-neutral-900 truncate max-w-[70%] group-hover:text-indigo-600 transition-colors">
                                {track.name}
                              </span>
                              <span className="font-semibold text-neutral-700 font-mono text-[11px]">
                                {tDone}/{tTotal} ({tPct}%)
                              </span>
                            </div>
                            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-neutral-900 h-full rounded-full transition-all group-hover:bg-indigo-600" 
                                style={{ width: `${tPct}%` }} 
                              />
                            </div>
                          </div>

                          <div className="pt-2 mt-2 border-t border-neutral-100 flex items-center justify-between gap-1 text-[11px]">
                            <span className="text-neutral-500 truncate">
                              Focus: {track.currentFocus}
                            </span>
                            {track.subParts && track.subParts.length > 0 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold shrink-0">
                                {track.subParts.length} Sub-parts
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
