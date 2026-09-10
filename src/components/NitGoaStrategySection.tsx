import React, { useState } from 'react';
import { 
  GraduationCap, 
  Compass, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  Briefcase, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  CircuitBoard,
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  Calendar,
  Zap,
  Building2,
  FileText,
  Copy,
  Download,
  CheckCheck,
  Eye,
  Calculator,
  Award,
  HelpCircle,
  Wrench,
  Flame,
  Clock,
  Plus,
  Edit3,
  Trash2,
  RotateCcw
} from 'lucide-react';
import { 
  NIT_GOA_VLSI_STRATEGY_DATA, 
  AcademicSemesterPlan,
  FULL_NIT_GOA_STRATEGY_REPORT_MD,
  SpecializationTrack
} from '../data/nitGoaRoadmapData';
import { 
  getNitGoaProgress, 
  saveNitGoaProgress, 
  getNitGoaElectives, 
  saveNitGoaElectives,
  getStudentCollegeProfile,
  saveStudentCollegeProfile,
  getStoredNitGoaSemesters,
  saveStoredNitGoaSemesters,
  resetStoredNitGoaSemesters,
  getStoredNitGoaTargetSkills,
  saveStoredNitGoaTargetSkills,
  getStoredNitGoaTargetRoles,
  saveStoredNitGoaTargetRoles,
  resetStoredNitGoaTargets
} from '../utils/storage';
import { 
  NitGoaElectiveModal,
  NitGoaMilestoneModal,
  NitGoaTargetsModal,
  ElectiveFormData,
  MilestoneFormData
} from './NitGoaModals';
import { 
  StudentCollegeProfile,
  UNIVERSAL_COLLEGE_TIERS,
  BRANCH_PIVOT_STRATEGIES,
  UNIVERSAL_LAB_STACKS,
  generateUniversalStrategyReportMd
} from '../data/universalCollegeData';
import { UniversalCollegeSelectorModal } from './UniversalCollegeSelectorModal';
import { UniversalCollegePlaybookView } from './UniversalCollegePlaybookView';
import { NitGoaElectiveCalculator } from './NitGoaElectiveCalculator';
import { NitGoaTimelineGantt } from './NitGoaTimelineGantt';
import { NitGoaCapstoneAdvisor } from './NitGoaCapstoneAdvisor';
import { NitGoaWhiteboardDrill } from './NitGoaWhiteboardDrill';
import { 
  NIT_GOA_LAB_FACILITIES, 
  EEE_ADVANTAGE_MATRIX, 
  EXTENDED_NIT_GOA_COMPANIES 
} from '../data/nitGoaAdvancedData';

export type NitGoaActiveTab = 
  | 'universal_playbook'
  | 'electives' 
  | 'timeline' 
  | 'eee_advantage' 
  | 'capstone' 
  | 'whiteboard' 
  | 'decision_matrix' 
  | 'companies' 
  | 'final_roadmap';

interface NitGoaStrategySectionProps {
  initialTab?: NitGoaActiveTab;
  onNavigateToCurriculum?: () => void;
  onNavigateToCareerPrep?: () => void;
  onNavigateToCompanies?: () => void;
  onNavigateToTools?: () => void;
  onNavigateToInterviews?: () => void;
  onNavigateToReport?: () => void;
}

export const NitGoaStrategySection: React.FC<NitGoaStrategySectionProps> = ({
  initialTab = 'electives',
  onNavigateToCurriculum,
  onNavigateToCareerPrep,
  onNavigateToCompanies,
  onNavigateToTools,
  onNavigateToInterviews,
  onNavigateToReport
}) => {
  const [activeTab, setActiveTab] = useState<NitGoaActiveTab>(initialTab);
  const [studentProfile, setStudentProfile] = useState<StudentCollegeProfile>(() => getStudentCollegeProfile());
  const [isCollegeSelectorOpen, setIsCollegeSelectorOpen] = useState(false);
  const [nitProgress, setNitProgress] = useState<Record<string, boolean>>(() => getNitGoaProgress());
  const [nitElectives, setNitElectives] = useState<Record<string, 'selected' | 'completed' | 'planned'>>(() => getNitGoaElectives());
  const [semesters, setSemesters] = useState<AcademicSemesterPlan[]>(() => getStoredNitGoaSemesters());
  const [targetSkills, setTargetSkills] = useState<string[]>(() => getStoredNitGoaTargetSkills());
  const [targetRoles, setTargetRoles] = useState<string[]>(() => getStoredNitGoaTargetRoles());

  // Modals state
  const [isElectiveModalOpen, setIsElectiveModalOpen] = useState(false);
  const [selectedElectiveSem, setSelectedElectiveSem] = useState<number>(6);
  const [editingElective, setEditingElective] = useState<any>(null);

  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [selectedMilestoneSem, setSelectedMilestoneSem] = useState<number>(6);
  const [editingMilestone, setEditingMilestone] = useState<any>(null);

  const [isTargetsModalOpen, setIsTargetsModalOpen] = useState(false);

  const [expandedSemester, setExpandedSemester] = useState<number>(6);
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [hasCopiedReport, setHasCopiedReport] = useState(false);
  const [showElectiveCalculator, setShowElectiveCalculator] = useState(false);
  const [companyDirectoryCategory, setCompanyDirectoryCategory] = useState<string>('all');

  const availableSemesters = semesters.map(s => ({
    number: s.semesterNumber,
    label: `${s.semesterNumber}th Semester (${s.semester})`
  }));

  // Elective Add / Edit Handlers
  const handleOpenAddElective = (semNum: number) => {
    setSelectedElectiveSem(semNum);
    setEditingElective(null);
    setIsElectiveModalOpen(true);
  };

  const handleOpenEditElective = (semNum: number, elective: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedElectiveSem(semNum);
    setEditingElective(elective);
    setIsElectiveModalOpen(true);
  };

  const handleSaveElective = (semNum: number, data: ElectiveFormData, originalCode?: string) => {
    const learningItems = data.expectedLearningText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const updated = semesters.map(sem => {
      if (sem.semesterNumber === semNum) {
        let updatedElectives;
        if (originalCode) {
          updatedElectives = sem.recommendedElectives.map(el => 
            el.code === originalCode
              ? {
                  ...el,
                  code: data.code,
                  name: data.name,
                  category: data.category,
                  priority: data.priority,
                  reason: data.reason,
                  expectedLearning: learningItems
                }
              : el
          );
        } else {
          updatedElectives = [
            ...sem.recommendedElectives,
            {
              code: data.code,
              name: data.name,
              category: data.category,
              priority: data.priority,
              reason: data.reason,
              expectedLearning: learningItems
            }
          ];
        }
        return { ...sem, recommendedElectives: updatedElectives };
      }
      return sem;
    });

    setSemesters(updated);
    saveStoredNitGoaSemesters(updated);
    setIsElectiveModalOpen(false);
    setEditingElective(null);
  };

  const handleDeleteElective = (semNum: number, code: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = semesters.map(sem => {
      if (sem.semesterNumber === semNum) {
        return {
          ...sem,
          recommendedElectives: sem.recommendedElectives.filter(el => el.code !== code)
        };
      }
      return sem;
    });
    setSemesters(updated);
    saveStoredNitGoaSemesters(updated);
  };

  // Milestone Add / Edit Handlers
  const handleOpenAddMilestone = (semNum: number) => {
    setSelectedMilestoneSem(semNum);
    setEditingMilestone(null);
    setIsMilestoneModalOpen(true);
  };

  const handleOpenEditMilestone = (semNum: number, milestone: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedMilestoneSem(semNum);
    setEditingMilestone(milestone);
    setIsMilestoneModalOpen(true);
  };

  const handleSaveMilestone = (semNum: number, data: MilestoneFormData, originalId?: string) => {
    const updated = semesters.map(sem => {
      if (sem.semesterNumber === semNum) {
        let updatedSkills;
        if (originalId) {
          updatedSkills = sem.timelineSkills.map(sk => 
            sk.id === originalId
              ? {
                  ...sk,
                  title: data.title,
                  description: data.description,
                  category: data.category
                }
              : sk
          );
        } else {
          const newId = `milestone-${semNum}-${Date.now()}`;
          updatedSkills = [
            ...sem.timelineSkills,
            {
              id: newId,
              title: data.title,
              description: data.description,
              category: data.category
            }
          ];
        }
        return { ...sem, timelineSkills: updatedSkills };
      }
      return sem;
    });

    setSemesters(updated);
    saveStoredNitGoaSemesters(updated);
    setIsMilestoneModalOpen(false);
    setEditingMilestone(null);
  };

  const handleDeleteMilestone = (semNum: number, milestoneId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = semesters.map(sem => {
      if (sem.semesterNumber === semNum) {
        return {
          ...sem,
          timelineSkills: sem.timelineSkills.filter(sk => sk.id !== milestoneId)
        };
      }
      return sem;
    });
    setSemesters(updated);
    saveStoredNitGoaSemesters(updated);
  };

  // Target Profile Handlers
  const handleSaveTargets = (skills: string[], roles: string[]) => {
    setTargetSkills(skills);
    setTargetRoles(roles);
    saveStoredNitGoaTargetSkills(skills);
    saveStoredNitGoaTargetRoles(roles);
    setIsTargetsModalOpen(false);
  };

  const handleResetSemestersToDefaults = () => {
    const reset = resetStoredNitGoaSemesters();
    setSemesters(reset);
    const resetTargets = resetStoredNitGoaTargets();
    setTargetSkills(resetTargets.skills);
    setTargetRoles(resetTargets.roles);
  };

  const handleSaveProfile = (newProfile: StudentCollegeProfile) => {
    setStudentProfile(newProfile);
    saveStudentCollegeProfile(newProfile);
  };

  const isNitGoaActive = studentProfile.collegeTierId === 'nit-goa';
  const activeBranch = BRANCH_PIVOT_STRATEGIES.find(b => b.branchId === studentProfile.department) || BRANCH_PIVOT_STRATEGIES[0];
  const activeLab = UNIVERSAL_LAB_STACKS.find(l => l.tierId === studentProfile.labAccessTier) || UNIVERSAL_LAB_STACKS[1];

  const activeReportMd = isNitGoaActive
    ? FULL_NIT_GOA_STRATEGY_REPORT_MD
    : generateUniversalStrategyReportMd(studentProfile);

  const toggleSkill = (skillId: string) => {
    const next = { ...nitProgress, [skillId]: !nitProgress[skillId] };
    setNitProgress(next);
    saveNitGoaProgress(next);
  };

  const cycleElectiveStatus = (code: string) => {
    const current = nitElectives[code] || 'planned';
    let next: 'selected' | 'completed' | 'planned' = 'selected';
    if (current === 'planned') next = 'selected';
    else if (current === 'selected') next = 'completed';
    else if (current === 'completed') next = 'planned';

    const updated = { ...nitElectives, [code]: next };
    setNitElectives(updated);
    saveNitGoaElectives(updated);
  };

  const handleCopyReport = async () => {
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(activeReportMd);
        success = true;
      } catch (err) {
        console.warn('Clipboard writeText failed', err);
      }
    }
    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = activeReportMd;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        console.error('Fallback execCommand copy failed', err);
      }
    }
    setHasCopiedReport(true);
    setTimeout(() => setHasCopiedReport(false), 2500);
  };

  const handleDownloadReport = () => {
    try {
      const blob = new Blob([activeReportMd], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = isNitGoaActive
        ? 'NIT_Goa_EEE_VLSI_Career_Strategy_Report.md'
        : `${studentProfile.collegeName.replace(/[^a-zA-Z0-9]/g, '_')}_Semiconductor_Strategy_Report.md`;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (err) {
      console.warn('Direct file download blocked in sandbox, navigating to report view', err);
    }
    if (onNavigateToReport) {
      onNavigateToReport();
    } else {
      setActiveTab('final_roadmap');
    }
  };

  // Calculate timeline progress
  const totalTimelineSkills = NIT_GOA_VLSI_STRATEGY_DATA.timelinePhases.reduce(
    (acc, phase) => acc + phase.skills.length, 0
  );
  const completedTimelineSkills = NIT_GOA_VLSI_STRATEGY_DATA.timelinePhases.reduce(
    (acc, phase) => acc + phase.skills.filter(s => nitProgress[s.id]).length, 0
  );
  const timelinePercent = totalTimelineSkills > 0 
    ? Math.round((completedTimelineSkills / totalTimelineSkills) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
      {/* Universal Institution & College Switcher Bar */}
      <div className="bg-neutral-950 border-b border-neutral-800 px-4 py-2.5 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs text-neutral-200">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-neutral-400 font-semibold flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Target Institute:</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 font-bold border border-indigo-400/30 flex items-center gap-1">
            <span>{studentProfile.collegeName}</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-medium border border-neutral-700">
            {studentProfile.customDepartmentName || activeBranch.name.split(' (')[0]}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 font-medium border border-emerald-700/60">
            {studentProfile.semester.toUpperCase()} Sem
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 font-medium border border-amber-700/60 hidden sm:inline-block">
            {activeLab.title.split(':')[0]}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Quick preset switch pills */}
          <div className="hidden xl:flex items-center gap-1">
            {UNIVERSAL_COLLEGE_TIERS.slice(0, 5).map(tier => (
              <button
                key={tier.id}
                onClick={() => {
                  const updated: StudentCollegeProfile = {
                    ...studentProfile,
                    collegeTierId: tier.id,
                    collegeName: tier.name
                  };
                  handleSaveProfile(updated);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer border ${
                  studentProfile.collegeTierId === tier.id
                    ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400 border-neutral-700'
                }`}
              >
                {tier.id === 'nit-goa' ? 'NIT Goa' : tier.id === 'tier1-iit' ? 'IITs' : tier.id === 'tier1-nit-bits' ? 'NITs/BITS' : tier.id === 'tier1-iiit' ? 'IIITs' : 'Tier-2/3'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsCollegeSelectorOpen(true)}
            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Wrench className="w-3 h-3" />
            <span>Customize College / Profile</span>
          </button>
        </div>
      </div>

      {/* Executive Academic Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-neutral-900 via-neutral-900 to-indigo-950 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>
                {isNitGoaActive 
                  ? 'NIT Goa EEE → VLSI Career Strategy Report' 
                  : `${studentProfile.collegeName} • ${activeBranch.name.split(' (')[0]} → VLSI Strategy`}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-300 font-normal">
                Active {studentProfile.semester.toUpperCase()} Sem Plan
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5 flex-wrap">
              <span>
                {isNitGoaActive
                  ? 'NIT Goa EEE Transition Strategy • 6th Semester Onwards'
                  : `${studentProfile.collegeName} • ${activeBranch.name.split(' (')[0]} Transition Strategy`}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {isNitGoaActive ? (
                <>
                  Official academic roadmap based on NIT Goa Academic Handbook &amp; Syllabus Portal.
                  Addresses <span className="text-indigo-300 font-semibold"> EE541 Embedded Systems</span> recovery, 
                  prioritizes <span className="text-amber-300 font-semibold"> EE545 FPGA Digital Design</span>, 
                  and maps directly to semiconductor MNC technical recruitment.
                </>
              ) : (
                <>
                  Universal semiconductor roadmap calibrated for <strong className="text-white">{studentProfile.collegeName}</strong> ({activeBranch.name.split(' (')[0]}, {studentProfile.semester} Sem) with <span className="text-amber-300 font-semibold">{activeLab.title.split(':')[0]}</span> resources.
                  Optimized for off-campus &amp; on-campus semiconductor technical recruitment.
                </>
              )}
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col items-start lg:items-end justify-between gap-2 border-t lg:border-t-0 border-neutral-800 pt-3 lg:pt-0">
            <div className="text-left lg:text-right">
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                Academic Roadmap Milestones
              </div>
              <div className="text-lg font-bold text-white font-mono flex items-center gap-1.5">
                <span>{completedTimelineSkills} / {totalTimelineSkills} Skills</span>
                <span className="text-xs text-emerald-400">({timelinePercent}%)</span>
              </div>
            </div>

            <div className="w-32 bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${timelinePercent}%` }}
              />
            </div>

            <div className="flex items-center gap-1.5 mt-1 flex-wrap justify-start lg:justify-end">
              <button
                onClick={() => {
                  if (onNavigateToReport) {
                    onNavigateToReport();
                  } else {
                    setActiveTab('final_roadmap');
                  }
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border shadow-xs ${
                  activeTab === 'final_roadmap'
                    ? 'bg-amber-400 text-neutral-950 border-amber-300'
                    : 'bg-indigo-950/80 hover:bg-indigo-900 text-amber-300 border-indigo-700/80'
                }`}
                title="Open Full 9-Section Report Viewer & Export (.md)"
              >
                <FileText className="w-3 h-3 text-amber-400" />
                <span>View Full Report &amp; Export</span>
              </button>
              <button
                onClick={handleCopyReport}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors border border-neutral-700 shadow-xs"
                title="Copy Full Report Markdown to Clipboard"
              >
                {hasCopiedReport ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{hasCopiedReport ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownloadReport}
                className="px-2.5 py-1 rounded bg-indigo-900/80 hover:bg-indigo-800 text-indigo-100 text-[11px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors border border-indigo-700/80 shadow-xs"
                title="Download Report as .md file"
              >
                <Download className="w-3 h-3" />
                <span>Export .md</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 9: Visual 4-Stage Executive Roadmap Stepper */}
        <div className="mt-5 pt-4 border-t border-neutral-800/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Section 9: Core Progression Pipeline</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Step 1: Current Position */}
            <div className="p-3 rounded-lg bg-neutral-800/90 border border-neutral-700/90 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  <span>Step 1: Current Position</span>
                  <span className="px-1.5 py-0.2 rounded bg-neutral-700 text-neutral-200">Done</span>
                </div>
                <div className="mt-1 text-xs font-bold text-white">
                  {NIT_GOA_VLSI_STRATEGY_DATA.finalRoadmap.currentPosition}
                </div>
              </div>
              <div className="text-[11px] text-neutral-400 mt-2 pt-1.5 border-t border-neutral-700/60">
                1st&ndash;5th Sem electrical &amp; logic foundation + EE541 completed.
              </div>
            </div>

            {/* Step 2: Next */}
            <div className="p-3 rounded-lg bg-indigo-950/70 border border-indigo-600/70 flex flex-col justify-between ring-1 ring-indigo-500/50">
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-indigo-300 tracking-wider">
                  <span>Step 2: Next Immediate</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-400 text-amber-950 font-black animate-pulse">6th Sem</span>
                </div>
                <div className="mt-1 text-xs font-bold text-white">
                  {NIT_GOA_VLSI_STRATEGY_DATA.finalRoadmap.next}
                </div>
              </div>
              <div className="text-[11px] text-indigo-200 mt-2 pt-1.5 border-t border-indigo-800/60">
                EE545 FPGA Based Digital Design + EE560 VLSI Technology.
              </div>
            </div>

            {/* Step 3: Then */}
            <div className="p-3 rounded-lg bg-neutral-800/90 border border-neutral-700/90 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  <span>Step 3: Then (7th&ndash;8th Sem)</span>
                  <span className="px-1.5 py-0.2 rounded bg-neutral-700 text-neutral-300">Upcoming</span>
                </div>
                <div className="mt-1 text-xs font-bold text-white">
                  {NIT_GOA_VLSI_STRATEGY_DATA.finalRoadmap.then}
                </div>
              </div>
              <div className="text-[11px] text-neutral-400 mt-2 pt-1.5 border-t border-neutral-700/60">
                Computer Architecture OE, RISC-V CPU build &amp; UVM testbenches.
              </div>
            </div>

            {/* Step 4: Final Outcome */}
            <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-700/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                  <span>Step 4: Final Target</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500 text-neutral-950 font-bold">Graduation</span>
                </div>
                <div className="mt-1 text-xs font-bold text-emerald-200">
                  {NIT_GOA_VLSI_STRATEGY_DATA.finalRoadmap.finalOutcome}
                </div>
              </div>
              <div className="text-[11px] text-emerald-300/80 mt-2 pt-1.5 border-t border-emerald-800/60">
                Direct semiconductor placement readiness across top tier-1 MNCs.
              </div>
            </div>
          </div>
        </div>

        {/* Academic Profile Chips */}
        <div className="mt-4 pt-3.5 border-t border-neutral-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-200 font-medium border border-neutral-700">
              Branch: <strong className="text-white">B.Tech EEE, NIT Goa</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-200 font-medium border border-neutral-700">
              Current Status: <strong className="text-emerald-300">5th Sem Done &rarr; 6th Sem</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-indigo-950/60 text-indigo-200 font-medium border border-indigo-700/60">
              Direction: <strong className="text-white">EEE + Embedded + SystemVerilog</strong>
            </span>
          </div>

          <button
            onClick={() => setShowFullProfile(!showFullProfile)}
            className="text-xs font-semibold text-indigo-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>{showFullProfile ? 'Hide Academic Sources & Foundation' : 'View NIT Goa Academic Handbook & Foundation'}</span>
            {showFullProfile ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expandable Academic Foundation & Sources Details */}
        {showFullProfile && (
          <div className="mt-4 pt-4 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-neutral-800/80 border border-neutral-700 space-y-2">
              <div className="font-bold text-neutral-200 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>1. Official NIT Goa Academic Sources:</span>
              </div>
              <div className="space-y-1.5 pl-1">
                {NIT_GOA_VLSI_STRATEGY_DATA.sourceReferences.map((ref, idx) => (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-indigo-300 hover:underline hover:text-indigo-200"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    <span className="truncate">{ref.title}</span>
                  </a>
                ))}
              </div>
              <p className="text-[11px] text-neutral-400 italic">
                * Handbooks &amp; Syllabus Portal contain UG curriculum structure, departmental electives, and rules.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-neutral-800/80 border border-neutral-700 space-y-2">
              <div className="font-bold text-neutral-200 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>2. Completed Foundation (1st &ndash; 5th Semester):</span>
              </div>
              <div className="grid grid-cols-1 gap-1 text-[11px] text-neutral-300">
                <div>&bull; <strong>1st&ndash;4th Sem:</strong> Math, Electrical &amp; Electronics Fundamentals, Digital Electronics, C/C++ Programming, Circuit &amp; Control</div>
                <div>&bull; <strong>5th Sem:</strong> Digital Electronics, Analog Electronics, Microprocessors &amp; Microcontrollers + Lab, <strong>EE541 Embedded Systems Design</strong></div>
              </div>
              <div className="text-[11px] text-emerald-300 font-medium">
                Assessment: Foundation is primed for RTL Design, SoC Design, Verification &amp; FPGA Engineering.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Target Graduation Profile & Target Roles Strip (Section 6) */}
      <div className="bg-neutral-50 px-4 sm:px-6 py-3 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-neutral-900 flex items-center gap-1 uppercase tracking-wider text-[11px]">
            <TargetIcon className="w-3.5 h-3.5 text-neutral-700" />
            6. Final Skill Stack:
          </span>
          {targetSkills.slice(0, 5).map((item, idx) => (
            <span 
              key={idx}
              className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-700 font-medium text-[11px]"
            >
              {item}
            </span>
          ))}
          {targetSkills.length > 5 && (
            <span className="text-[11px] text-neutral-500 font-medium">+{targetSkills.length - 5} more</span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-neutral-500 text-[11px] uppercase tracking-wider">Target Roles:</span>
            {targetRoles.map((role, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 font-semibold text-[10px]"
              >
                {role}
              </span>
            ))}
          </div>

          <button
            onClick={() => setIsTargetsModalOpen(true)}
            className="px-2.5 py-1 text-[11px] font-semibold text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-md transition-colors flex items-center gap-1 cursor-pointer shadow-2xs shrink-0"
            title="Edit target graduation skills and roles"
          >
            <Edit3 className="w-3 h-3 text-neutral-500" />
            <span>Edit Targets</span>
          </button>
        </div>
      </div>

      {/* Interactive Navigation Tabs */}
      <div className="flex border-b border-neutral-200 bg-white px-4 sm:px-6 gap-1 sm:gap-2 overflow-x-auto scrollbar-thin">
        <button
          onClick={() => setActiveTab('universal_playbook')}
          className={`py-3 px-2.5 sm:px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'universal_playbook'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/70'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-indigo-600" />
          <span>Universal Playbook (All Colleges)</span>
          <span className="px-1.5 py-0.2 text-[9px] rounded-full bg-indigo-100 text-indigo-800 font-bold">
            Universal
          </span>
        </button>

        <button
          onClick={() => setActiveTab('electives')}
          className={`py-3 px-2.5 sm:px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'electives'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>4. Semester Electives &amp; Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`py-3 px-2.5 sm:px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'timeline'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>5. 18-Month Gantt &amp; Skills</span>
        </button>

        <button
          onClick={() => setActiveTab('eee_advantage')}
          className={`py-3 px-2.5 sm:px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'eee_advantage'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          <span>6. EEE Advantage &amp; Labs</span>
        </button>

        <button
          onClick={() => setActiveTab('capstone')}
          className={`py-3 px-2.5 sm:px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'capstone'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-indigo-600" />
          <span>7. B.Tech Capstones (6)</span>
        </button>

        <button
          onClick={() => setActiveTab('whiteboard')}
          className={`py-3 px-2.5 sm:px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'whiteboard'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>8. Whiteboard Drills</span>
        </button>

        <button
          onClick={() => setActiveTab('decision_matrix')}
          className={`py-3 px-2.5 sm:px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'decision_matrix'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>9. Decision Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('companies')}
          className={`py-3 px-2.5 sm:px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'companies'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>10. Placement Playbook (15 MNCs)</span>
        </button>

        <button
          onClick={() => setActiveTab('final_roadmap')}
          className={`py-3 px-2.5 sm:px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'final_roadmap'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-indigo-600" />
          <span>11. Full Report &amp; Export</span>
        </button>
      </div>

      {/* Tab: Universal College Playbook View */}
      {activeTab === 'universal_playbook' && (
        <div className="p-4 sm:p-6">
          <UniversalCollegePlaybookView 
            currentProfile={studentProfile}
            onOpenSelector={() => setIsCollegeSelectorOpen(true)}
            onNavigateToReport={onNavigateToReport}
            onNavigateToCurriculum={onNavigateToCurriculum}
            onNavigateToTools={onNavigateToTools}
          />
        </div>
      )}

      {/* Tab 1: Semester Electives Roadmap */}
      {activeTab === 'electives' && (
        <div className="p-4 sm:p-6 space-y-5">
          {/* Toggle for Interactive Elective Calculator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-200">
            <div>
              <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-indigo-700" />
                <span>Interactive Elective Basket &amp; Placement Readiness Calculator</span>
              </div>
              <p className="text-[11px] text-indigo-900/80 mt-0.5">
                Simulate your 6th, 7th, 8th semester electives and capstone track to compute dynamic readiness for RTL, DV, and Physical Design.
              </p>
            </div>

            <button
              onClick={() => setShowElectiveCalculator(!showElectiveCalculator)}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 cursor-pointer transition-colors shadow-xs"
            >
              {showElectiveCalculator ? 'Hide Calculator' : 'Launch Interactive Simulator'}
            </button>
          </div>

          {showElectiveCalculator && (
            <div className="animate-in fade-in duration-200">
              <NitGoaElectiveCalculator />
            </div>
          )}

          {/* Recovery Strategy Callout Banner (Section 3) */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>3. EE541 Embedded Systems Design Selection Analysis &bull; Recovery Plan</span>
            </div>
            <p className="text-xs text-amber-950/90 leading-relaxed">
              <strong>Context:</strong> In 5th semester, selected <strong>EE541 Embedded Systems Design</strong> over <strong>EE545 FPGA</strong>. 
              While EE541 built vital SoC understanding, peripheral registers, and hardware/software interaction, the missing area is 
              <strong> FPGA implementation flow &amp; RTL-to-hardware experience</strong>.
            </p>
            <div className="pt-1 flex items-center gap-2 flex-wrap text-xs">
              <span className="font-semibold text-amber-950">Immediate 6th Sem Priority:</span>
              <span className="px-2.5 py-1 rounded bg-amber-200/80 font-bold text-amber-950">
                Take EE545 FPGA Based Digital Design (Top Priority Elective)
              </span>
            </div>
          </div>

          {/* Semesters Cards Action Bar */}
          <div className="flex items-center justify-between gap-2 flex-wrap pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>4. Academic Semesters &amp; Elective Strategy</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenAddElective(expandedSemester || 6)}
                className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Elective</span>
              </button>

              <button
                onClick={() => handleOpenAddMilestone(expandedSemester || 6)}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Milestone</span>
              </button>

              <button
                onClick={handleResetSemestersToDefaults}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                title="Reset semesters and milestones to curriculum defaults"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Semesters Cards (Section 4) */}
          <div className="space-y-4">
            {semesters.map(sem => {
              const isExpanded = expandedSemester === sem.semesterNumber;
              return (
                <div 
                  key={sem.semesterNumber}
                  className="rounded-xl border border-neutral-200 overflow-hidden bg-white"
                >
                  <div 
                    onClick={() => setExpandedSemester(isExpanded ? 0 : sem.semesterNumber)}
                    className="p-4 bg-neutral-50/80 hover:bg-neutral-100/70 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        sem.semesterNumber === 6 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-neutral-200 text-neutral-800'
                      }`}>
                        {sem.semesterNumber}th
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-neutral-900">{sem.semester} Academic Plan</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            sem.status === 'Current / In-Progress'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-neutral-200 text-neutral-700'
                          }`}>
                            {sem.status}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500">
                          {sem.recommendedElectives.length} Elective Options &bull; {sem.mandatoryCourses.length > 0 ? `Mandatory: ${sem.mandatoryCourses.join(', ')}` : 'No general mandatory courses'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-500 hidden sm:inline">
                        {isExpanded ? 'Collapse' : 'Expand Details'}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-neutral-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 sm:p-5 border-t border-neutral-200 space-y-4">
                      {/* Mandatory Courses (if any) */}
                      {sem.mandatoryCourses.length > 0 && (
                        <div className="flex items-center gap-2 text-xs bg-neutral-100 p-2.5 rounded-lg text-neutral-700">
                          <BookmarkCheck className="w-4 h-4 text-neutral-500" />
                          <span><strong>Mandatory Course:</strong> {sem.mandatoryCourses.join(', ')}</span>
                        </div>
                      )}

                      {/* Electives Grid */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                            Recommended Elective Curriculum Selection:
                          </div>
                          <button
                            onClick={() => handleOpenAddElective(sem.semesterNumber)}
                            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Elective to Sem {sem.semesterNumber}</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {sem.recommendedElectives.map(elective => {
                            const currentStatus = nitElectives[elective.code] || 'planned';
                            return (
                              <div 
                                key={elective.code}
                                className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/40 hover:bg-white hover:border-neutral-300 transition-all flex flex-col justify-between space-y-3 relative group"
                              >
                                <div className="space-y-1.5">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-200 text-neutral-900">
                                          {elective.code}
                                        </span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                          elective.priority === 'Top Priority'
                                            ? 'bg-rose-100 text-rose-800'
                                            : elective.priority === 'Recommended'
                                            ? 'bg-indigo-100 text-indigo-800'
                                            : 'bg-neutral-200 text-neutral-700'
                                        }`}>
                                          {elective.priority}
                                        </span>
                                      </div>
                                      <h5 className="text-sm font-bold text-neutral-900 mt-1">
                                        {elective.name}
                                      </h5>
                                    </div>

                                    {/* Action Buttons: Status + Edit + Delete */}
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <button
                                        onClick={() => cycleElectiveStatus(elective.code)}
                                        title="Click to cycle status: Planned -> Selected -> Completed"
                                        className={`px-2 py-1 rounded-md text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                                          currentStatus === 'completed'
                                            ? 'bg-emerald-600 text-white border-emerald-700'
                                            : currentStatus === 'selected'
                                            ? 'bg-indigo-600 text-white border-indigo-700'
                                            : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                                        }`}
                                      >
                                        {currentStatus === 'completed' && <Check className="w-3 h-3" />}
                                        <span className="capitalize">{currentStatus}</span>
                                      </button>

                                      <button
                                        onClick={(e) => handleOpenEditElective(sem.semesterNumber, elective, e)}
                                        className="p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 rounded transition-colors cursor-pointer"
                                        title="Edit this elective"
                                      >
                                        <Edit3 className="w-3.5 h-3.5" />
                                      </button>

                                      <button
                                        onClick={(e) => handleDeleteElective(sem.semesterNumber, elective.code, e)}
                                        className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                                        title="Delete this elective"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>

                                  <p className="text-xs text-neutral-600 leading-relaxed">
                                    {elective.reason}
                                  </p>
                                </div>

                                <div className="pt-2 border-t border-neutral-200/70 space-y-1">
                                  <div className="text-[11px] font-bold text-neutral-700">Expected Learning:</div>
                                  <ul className="space-y-0.5 text-[11px] text-neutral-600 list-disc pl-4">
                                    {elective.expectedLearning.map((item, idx) => (
                                      <li key={idx}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Milestone Skills for this semester */}
                      <div className="pt-2">
                        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                            Key Semester Technical Milestones:
                          </div>
                          <button
                            onClick={() => handleOpenAddMilestone(sem.semesterNumber)}
                            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Milestone to Sem {sem.semesterNumber}</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {sem.timelineSkills.map(sk => {
                            const isDone = nitProgress[sk.id] || false;
                            return (
                              <div
                                key={sk.id}
                                className={`p-3 rounded-lg border text-xs transition-all flex items-start justify-between gap-2.5 group ${
                                  isDone 
                                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                                }`}
                              >
                                <div 
                                  onClick={() => toggleSkill(sk.id)}
                                  className="flex items-start gap-2.5 cursor-pointer flex-1"
                                >
                                  <div className="mt-0.5">
                                    {isDone ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-neutral-400" />
                                    )}
                                  </div>
                                  <div>
                                    <div className={`font-bold ${isDone ? 'text-emerald-900 line-through' : 'text-neutral-900'}`}>
                                      {sk.title}
                                    </div>
                                    <div className="text-[11px] text-neutral-500 mt-0.5">
                                      {sk.description}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => handleOpenEditMilestone(sem.semesterNumber, sk, e)}
                                    className="p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
                                    title="Edit milestone"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => handleDeleteMilestone(sem.semesterNumber, sk.id, e)}
                                    className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                                    title="Delete milestone"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: 4-Phase Skill Timeline (Section 5) */}
      {activeTab === 'timeline' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h4 className="text-sm font-bold text-neutral-900">
                5. 18-Month Execution Gantt &amp; Skill Timeline (Jan 2026 &rarr; June 2027)
              </h4>
              <p className="text-xs text-neutral-500">
                Detailed monthly roadmap synchronized with NIT Goa semesters, summer internship windows, and full-time placement cycles.
              </p>
            </div>
            <div className="text-xs font-bold text-neutral-700 font-mono">
              Skills Check: {completedTimelineSkills} / {totalTimelineSkills} ({timelinePercent}%)
            </div>
          </div>

          {/* Interactive 18-Month Chronological Execution Gantt */}
          <NitGoaTimelineGantt />

          <div className="pt-3 border-t border-neutral-200">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Phase-by-Phase Skill &amp; Deliverable Checklist:
            </h5>
          </div>

          <div className="space-y-4">
            {NIT_GOA_VLSI_STRATEGY_DATA.timelinePhases.map((phase, idx) => {
              const phaseDoneCount = phase.skills.filter(s => nitProgress[s.id]).length;
              const phaseTotal = phase.skills.length;
              const phasePct = Math.round((phaseDoneCount / phaseTotal) * 100);

              return (
                <div 
                  key={phase.phaseId}
                  className="rounded-xl border border-neutral-200 p-4 bg-neutral-50/40 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h5 className="text-sm font-bold text-neutral-900">
                          {phase.phaseName}
                        </h5>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          phase.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : phase.status === 'Active'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-neutral-200 text-neutral-700'
                        }`}>
                          {phase.status}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">{phase.timing}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-neutral-800">
                        {phaseDoneCount}/{phaseTotal} ({phasePct}%)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {phase.skills.map(skill => {
                      const isDone = nitProgress[skill.id] || false;
                      return (
                        <div
                          key={skill.id}
                          onClick={() => toggleSkill(skill.id)}
                          className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                            isDone
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                              : 'bg-white border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <div className="mt-0.5">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Circle className="w-4 h-4 text-neutral-400" />
                            )}
                          </div>
                          <div>
                            <div className={`font-bold ${isDone ? 'text-emerald-900 line-through' : 'text-neutral-900'}`}>
                              {skill.name}
                            </div>
                            <div className="text-[11px] text-neutral-600 mt-0.5">
                              {skill.detail}
                            </div>
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
      )}

      {/* Tab: EEE Advantage vs ECE Dilemma & Campus Lab Infrastructure */}
      {activeTab === 'eee_advantage' && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-neutral-200 pb-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>6. EEE Competitive Advantage &amp; Campus Lab Inventory</span>
              </div>
              <h4 className="text-base font-bold text-neutral-900 mt-0.5">
                Overcoming the ECE Bias &bull; Leveraging EEE Core Physics for VLSI
              </h4>
              <p className="text-xs text-neutral-500">
                How to convert traditional Electrical coursework into high-impact answers in Qualcomm, Texas Instruments, and Intel interviews.
              </p>
            </div>
          </div>

          {/* Section A: NIT Goa Physical Labs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                <CircuitBoard className="w-4 h-4 text-indigo-600" />
                <span>A. NIT Goa On-Campus Silicon Lab Facilities &amp; EDA Tooling</span>
              </h5>
              <span className="text-[11px] text-neutral-500 font-medium">
                Cuncolim Campus Hardware Inventory
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {NIT_GOA_LAB_FACILITIES.map((lab, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-all flex flex-col justify-between space-y-3 shadow-2xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h6 className="text-xs font-bold text-neutral-900">
                          {lab.name}
                        </h6>
                        <span className="text-[10px] text-neutral-500">
                          {lab.location}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        Campus Lab
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {lab.relevanceToVLSI}
                    </p>

                    <div className="p-2 rounded bg-neutral-50 border border-neutral-200/80 space-y-1">
                      <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                        Equipment &amp; Hardware Kits:
                      </span>
                      <ul className="space-y-0.5 text-[11px] text-neutral-700">
                        {lab.equipment.map((eq, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-indigo-500 font-bold">&bull;</span>
                            <span>{eq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Licensed EDA Toolchains:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {lab.edaLicenses.map((lic, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                          {lic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: 5-Point EEE Advantage Matrix */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>B. 5-Point EEE Subject Conversion Matrix (Interview Storylines)</span>
              </h5>
              <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
                Differentiates You from Pure CS/ECE Candidates
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {EEE_ADVANTAGE_MATRIX.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-all space-y-3 shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div>
                      <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        {item.subject} &bull; <span className="text-indigo-600 font-semibold">{item.semesterInNITGoa}</span>
                      </div>
                      <h6 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5 mt-0.5">
                        <span>&rarr;</span>
                        <span className="text-indigo-700">{item.semiconductorSpecialty}</span>
                      </h6>
                    </div>

                    <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                      {item.howToPitchInInterview}
                    </p>

                    {/* Example Interview Question */}
                    <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                        Interviewer Challenge Question:
                      </span>
                      <p className="text-[11px] font-medium leading-relaxed italic">
                        "{item.interviewerQuestionExample}"
                      </p>
                    </div>

                    {/* Model Answer Snippet */}
                    <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 block">
                        Model Answer &amp; Mathematical Rigor:
                      </span>
                      <div className="text-[11px] text-neutral-800 leading-relaxed bg-white/90 p-2 rounded border border-indigo-100">
                        {item.modelAnswerSnippet}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: B.Tech Capstone Project Advisor */}
      {activeTab === 'capstone' && (
        <div className="p-4 sm:p-6">
          <NitGoaCapstoneAdvisor />
        </div>
      )}

      {/* Tab: Semiconductor Whiteboard Interview Drills */}
      {activeTab === 'whiteboard' && (
        <div className="p-4 sm:p-6">
          <NitGoaWhiteboardDrill />
        </div>
      )}

      {/* Tab 3: Elective Decision Matrix & Specialization Tracks (Section 7) */}
      {activeTab === 'decision_matrix' && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Section 7 Specialization Formulas Header */}
          <div className="space-y-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                7. Elective Decision Matrix &amp; Career Specialization Formulas
              </div>
              <h4 className="text-base font-bold text-neutral-900 mt-0.5">
                Specialization Track Formulas
              </h4>
              <p className="text-xs text-neutral-500">
                The exact formula combinations from the NIT Goa career strategy report:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {NIT_GOA_VLSI_STRATEGY_DATA.specializationTracks.map(track => {
                const isSelected = selectedSpecialization === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => setSelectedSpecialization(isSelected ? 'all' : track.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-500 shadow-sm ring-1 ring-indigo-500'
                        : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-neutral-900">{track.name}</span>
                        {isSelected && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">Active Focus</span>}
                      </div>

                      <div className="mt-2 p-2 rounded bg-neutral-100 font-mono text-xs font-bold text-indigo-950 border border-neutral-200">
                        = {track.formula}
                      </div>

                      <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                        {track.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-neutral-200 space-y-1 text-[11px]">
                      <div>
                        <strong className="text-neutral-700">Target Roles:</strong> {track.targetRoles.join(', ')}
                      </div>
                      <div className="text-indigo-700 font-medium">
                        <strong>Top MNCs:</strong> {track.targetCompanies.join(', ')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contingency Decision Matrix (Situation -> Decision) */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Situation &rarr; Decision Rules:
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {NIT_GOA_VLSI_STRATEGY_DATA.electiveDecisionMatrix.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:border-neutral-300 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-xs text-neutral-900">
                      <span className="text-neutral-400 mr-1.5 font-mono">Case {idx + 1}:</span>
                      {item.situation}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-indigo-950 text-xs font-semibold">
                    &rarr; <strong>Decision:</strong> {item.decision}
                  </div>

                  <div className="text-xs text-neutral-600 space-y-1">
                    <div><strong>Impact:</strong> {item.impact}</div>
                    <div className="text-neutral-700"><strong>Action Plan:</strong> {item.actionPlan}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recovery Plan Visual Box (Section 3) */}
          <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-3">
            <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Full 3-Step FPGA Recovery Plan:</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {NIT_GOA_VLSI_STRATEGY_DATA.embeddedAnalysis.recoveryPlan.map((step, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="font-bold text-neutral-900 mb-1">Step {idx + 1}:</div>
                  <p className="text-neutral-600 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Semiconductor Company Skill Mapping & Full Placement Playbook */}
      {activeTab === 'companies' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                10. Semiconductor Recruitment Playbook &bull; 15 Key Employers
              </div>
              <h4 className="text-sm sm:text-base font-bold text-neutral-900">
                Semiconductor MNC &amp; Services Placement Profiles for NIT Goa EEE
              </h4>
              <p className="text-xs text-neutral-500">
                CGPA cutoffs, India CTC ranges (₹ LPA), interview round structures, and required project portfolios.
              </p>
            </div>

            {onNavigateToCompanies && (
              <button
                onClick={onNavigateToCompanies}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Explore Full 80+ Company Database</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Companies (15)' },
              { id: 'Tier-1 Semiconductor MNC', label: 'Tier-1 MNCs (8)' },
              { id: 'VLSI Design Services & Indian Fabless', label: 'Design Services & Fabless (5)' },
              { id: 'Automotive & Industrial Embedded', label: 'Automotive & Embedded (2)' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCompanyDirectoryCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  companyDirectoryCategory === cat.id
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Extended Company Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXTENDED_NIT_GOA_COMPANIES
              .filter(c => companyDirectoryCategory === 'all' || c.category === companyDirectoryCategory)
              .map((comp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-2xs transition-all flex flex-col justify-between space-y-3.5"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="text-base font-bold text-neutral-900">
                          {comp.company}
                        </h5>
                        <span className="text-[10px] text-neutral-500 font-medium">
                          {comp.locationHiring}
                        </span>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {comp.category.includes('Tier-1') ? 'Tier 1 MNC' : 'Core Recruiter'}
                      </span>
                    </div>

                    {/* Compensation & CGPA Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        CTC: {comp.compensationIndia}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                        CGPA: {comp.cgpaCutoff}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700">
                        {comp.hiringMode}
                      </span>
                    </div>

                    {/* Roles Recruited */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        Primary Roles Recruited:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {comp.typicalRoles.map((r, i) => (
                          <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-800">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Technical Testing Syllabus */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        Key Technical Focus &amp; Syllabus:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {comp.keyTechnicalFocus.map((top, i) => (
                          <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 border border-indigo-100">
                            {top}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interview Stages Outline */}
                    <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200/80 text-[11px] text-neutral-700 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block">
                        Interview Pipeline &amp; Process:
                      </span>
                      <p className="text-[11px] leading-relaxed text-neutral-800">
                        {comp.interviewProcess}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Section 8 Skill Mappings from Official Strategy Report */}
          <div className="pt-4 border-t border-neutral-200 space-y-4">
            <div>
              <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Official Report Curriculum Alignment (7 Target MNCs)
              </h5>
              <p className="text-xs text-neutral-500 mt-0.5">
                Exact curriculum cross-mapping from the transcribed academic plan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {NIT_GOA_VLSI_STRATEGY_DATA.companySkillMappings.map(comp => (
                <div 
                  key={comp.company}
                  className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-2xs transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="text-base font-bold text-neutral-900">
                          {comp.company}
                        </h5>
                        <span className="text-[11px] text-neutral-500">
                          {comp.tickerOrTier}
                        </span>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-700">
                        Tier 1 Target
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-1 flex-wrap">
                      {comp.focusAreas.map((f, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-medium">
                          {f}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-neutral-100 space-y-1.5">
                      <div className="text-[11px] font-bold text-neutral-700">Hiring Skills Tested:</div>
                      <div className="flex flex-wrap gap-1">
                        {comp.keySkills.map((sk, idx) => (
                          <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-900 font-bold border border-indigo-200">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-600">
                    <div className="italic">&bull; {comp.relevanceToNITGoa}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Full 9-Section Verbatim Report */}
      {activeTab === 'final_roadmap' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                Official Document Viewer
              </div>
              <h4 className="text-base font-bold text-neutral-900">
                Complete NIT Goa EEE &rarr; VLSI Career Strategy Report
              </h4>
              <p className="text-xs text-neutral-500">
                Verbatim 9-section report transcribed from the official academic plan.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {onNavigateToReport && (
                <button
                  onClick={onNavigateToReport}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                  title="Open Dedicated Full Page Academic Report View & Export"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full Screen Report View &amp; Export</span>
                </button>
              )}
              <button
                onClick={handleCopyReport}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                {hasCopiedReport ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{hasCopiedReport ? 'Report Copied!' : 'Copy Markdown'}</span>
              </button>
              <button
                onClick={handleDownloadReport}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                <Download className="w-4 h-4" />
                <span>Export .md</span>
              </button>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 text-neutral-800 text-xs sm:text-sm font-sans space-y-6 max-h-[600px] overflow-y-auto scrollbar-thin">
            {/* Section 1 */}
            <div className="space-y-1.5">
              <h5 className="font-bold text-neutral-900 text-sm">1. Source References</h5>
              <p className="text-neutral-600">Official NIT Goa academic information sources used:</p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                <li>
                  <strong>NIT Goa Academic Handbook / Curriculum:</strong>{' '}
                  <a href="https://www.nitgoa.ac.in/academics/rules_and_regulations.html" target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                    https://www.nitgoa.ac.in/academics/rules_and_regulations.html
                  </a>
                </li>
                <li>
                  <strong>NIT Goa Syllabus Portal:</strong>{' '}
                  <a href="https://www.nitgoa.ac.in/syllabus.html" target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                    https://www.nitgoa.ac.in/syllabus.html
                  </a>
                </li>
              </ul>
              <p className="text-neutral-500 italic text-xs">These sources contain UG curriculum structure, elective information, and academic rules. (Page numbers may vary between handbook revisions).</p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2 pt-3 border-t border-neutral-200">
              <h5 className="font-bold text-neutral-900 text-sm">2. Current Academic Progress (Till 5th Semester)</h5>
              <p><strong>Branch:</strong> B.Tech Electrical and Electronics Engineering (EEE), NIT Goa</p>
              <div>
                <strong>Completed Foundation (1st&ndash;4th Semester):</strong>
                <ul className="list-disc pl-5 space-y-0.5 text-neutral-700 mt-1">
                  <li>Mathematics and engineering fundamentals</li>
                  <li>Electrical engineering fundamentals</li>
                  <li>Electronics fundamentals</li>
                  <li>Digital Electronics</li>
                  <li>Programming foundation</li>
                  <li>Circuit and control concepts</li>
                </ul>
              </div>
              <div>
                <strong>Important VLSI-related completed areas:</strong>
                <ul className="list-disc pl-5 space-y-0.5 text-neutral-700 mt-1">
                  <li>Digital Electronics</li>
                  <li>Analog Electronics</li>
                  <li>Microprocessors and Microcontrollers</li>
                  <li>Microprocessor Laboratory</li>
                  <li><strong>Embedded Systems Design (5th Semester elective)</strong></li>
                </ul>
              </div>
              <p><strong>Current Technical Direction:</strong> EEE + Embedded Systems + Verilog/SystemVerilog self-learning</p>
              <p className="text-emerald-700 font-medium"><strong>Assessment:</strong> The foundation is suitable for moving toward: RTL Design, SoC Design, Design Verification, FPGA Engineering.</p>
            </div>

            {/* Section 3 */}
            <div className="space-y-2 pt-3 border-t border-neutral-200">
              <h5 className="font-bold text-neutral-900 text-sm">3. EE541 Embedded Systems Design Selection Analysis</h5>
              <p><strong>Originally considered:</strong> EE545 FPGA Based Digital Design | <strong>Selected:</strong> EE541 Embedded Systems Design</p>
              <div>
                <strong>Advantages:</strong> Strong SoC relevance, Processor and peripheral understanding, Hardware/software interaction, Embedded semiconductor applications.
              </div>
              <div>
                <strong>Missing area:</strong> FPGA implementation flow, RTL-to-hardware experience.
              </div>
              <div>
                <strong>Recovery plan:</strong> Take FPGA-related elective later if available; Complete Vivado projects; Build RTL portfolio.
              </div>
            </div>

            {/* Section 4 */}
            <div className="space-y-2 pt-3 border-t border-neutral-200">
              <h5 className="font-bold text-neutral-900 text-sm">4. 6th Semester Onwards Plan</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg border border-neutral-200">
                  <strong className="text-neutral-900">6th Semester:</strong>
                  <div className="text-neutral-600 mt-1">&bull; Mandatory: Indian Knowledge System (IKS)</div>
                  <div className="text-indigo-700 font-bold mt-1">&bull; Top Elective: EE545 FPGA Based Digital Design</div>
                  <p className="text-[11px] text-neutral-500 mt-1">Learning: Verilog/SV RTL, FPGA architecture, synthesis, timing constraints, hardware implementation.</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-neutral-200">
                  <strong className="text-neutral-900">7th Semester:</strong>
                  <div className="text-neutral-600 mt-1 space-y-0.5">
                    <div>1. EE560 VLSI Technology</div>
                    <div>2. EE542 Embedded Control System</div>
                    <div>3. EE556 Cyber Physical Systems</div>
                    <div>4. EE543 Digital Signal Processing</div>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-neutral-200">
                  <strong className="text-neutral-900">8th Semester:</strong>
                  <div className="text-neutral-600 mt-1 space-y-0.5">
                    <div>1. Computer Architecture OE</div>
                    <div>2. AI/ML related OE</div>
                    <div>3. Additional VLSI/hardware elective</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="space-y-2 pt-3 border-t border-neutral-200">
              <h5 className="font-bold text-neutral-900 text-sm">5. Skill Development Timeline</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-white rounded border border-neutral-200">
                  <strong>Before 6th Sem:</strong> Verilog basics, digital revision, simulation workflow, small RTL modules.
                </div>
                <div className="p-2.5 bg-white rounded border border-neutral-200">
                  <strong>During 6th Sem:</strong> FPGA flow using Vivado, RTL projects, FSM design, UART/SPI/I2C projects.
                </div>
                <div className="p-2.5 bg-white rounded border border-neutral-200">
                  <strong>During 7th Sem:</strong> CMOS and VLSI fundamentals, SoC concepts, DSP hardware blocks, embedded projects.
                </div>
                <div className="p-2.5 bg-white rounded border border-neutral-200">
                  <strong>During 8th Sem:</strong> RISC-V CPU project, AXI/SoC project, verification learning, internship prep.
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="space-y-1.5 pt-3 border-t border-neutral-200">
              <h5 className="font-bold text-neutral-900 text-sm">6. Final VLSI Skill Stack Goal</h5>
              <p className="font-semibold text-indigo-900">
                EEE Foundation + Embedded Systems Design + FPGA Design + VLSI Technology + Computer Architecture + SystemVerilog + RTL Projects + Verification Basics
              </p>
              <p><strong>Target roles:</strong> RTL Design Engineer &bull; SoC Engineer &bull; FPGA Engineer &bull; Design Verification Engineer</p>
            </div>

            {/* Section 7 */}
            <div className="space-y-1.5 pt-3 border-t border-neutral-200">
              <h5 className="font-bold text-neutral-900 text-sm">7. Elective Decision Matrix &amp; Formulas</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2 bg-white rounded border">
                  <strong>RTL Design:</strong> FPGA + VLSI + Architecture
                </div>
                <div className="p-2 bg-white rounded border">
                  <strong>Verification:</strong> FPGA + Architecture + Embedded + SystemVerilog/UVM
                </div>
                <div className="p-2 bg-white rounded border">
                  <strong>Physical Design:</strong> VLSI Technology + CMOS + Timing
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div className="space-y-1.5 pt-3 border-t border-neutral-200">
              <h5 className="font-bold text-neutral-900 text-sm">8. Semiconductor Company Skill Mapping</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="p-2 bg-white rounded border"><strong>Qualcomm:</strong> SoC architecture, RTL, SystemVerilog, Verification</div>
                <div className="p-2 bg-white rounded border"><strong>NVIDIA:</strong> Computer Architecture, RTL, Hardware accelerators</div>
                <div className="p-2 bg-white rounded border"><strong>AMD:</strong> FPGA, RTL, Timing</div>
                <div className="p-2 bg-white rounded border"><strong>Intel:</strong> RTL, Verification, Architecture</div>
                <div className="p-2 bg-white rounded border"><strong>Synopsys:</strong> RTL, Synthesis, STA, Verification</div>
                <div className="p-2 bg-white rounded border"><strong>Cadence:</strong> IC design, Simulation, Verification</div>
                <div className="p-2 bg-white rounded border"><strong>Siemens EDA:</strong> Questa, SystemVerilog, UVM, Verification</div>
              </div>
            </div>

            {/* Section 9 */}
            <div className="space-y-1.5 pt-3 border-t border-neutral-200">
              <h5 className="font-bold text-neutral-900 text-sm">9. Final Roadmap</h5>
              <p><strong>Current position:</strong> EEE + Embedded Systems Design</p>
              <p><strong>Next:</strong> FPGA + VLSI Technology</p>
              <p><strong>Then:</strong> Architecture + Verification + RTL Projects</p>
              <p className="text-emerald-700 font-bold"><strong>Final outcome:</strong> A strong EEE-to-VLSI profile aligned with semiconductor industry requirements.</p>
            </div>
          </div>
        </div>
      )}

      {/* Universal College Selector Modal */}
      <UniversalCollegeSelectorModal
        isOpen={isCollegeSelectorOpen}
        onClose={() => setIsCollegeSelectorOpen(false)}
        currentProfile={studentProfile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Nit Goa Elective Add/Edit Modal */}
      <NitGoaElectiveModal
        isOpen={isElectiveModalOpen}
        onClose={() => {
          setIsElectiveModalOpen(false);
          setEditingElective(null);
        }}
        onSave={handleSaveElective}
        initialSemester={selectedElectiveSem}
        initialData={editingElective}
        availableSemesters={availableSemesters}
      />

      {/* Nit Goa Milestone Add/Edit Modal */}
      <NitGoaMilestoneModal
        isOpen={isMilestoneModalOpen}
        onClose={() => {
          setIsMilestoneModalOpen(false);
          setEditingMilestone(null);
        }}
        onSave={handleSaveMilestone}
        initialSemester={selectedMilestoneSem}
        initialData={editingMilestone}
        availableSemesters={availableSemesters}
      />

      {/* Nit Goa Targets Modal */}
      <NitGoaTargetsModal
        isOpen={isTargetsModalOpen}
        onClose={() => setIsTargetsModalOpen(false)}
        onSave={handleSaveTargets}
        initialSkills={targetSkills}
        initialRoles={targetRoles}
      />
    </div>
  );
};

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
