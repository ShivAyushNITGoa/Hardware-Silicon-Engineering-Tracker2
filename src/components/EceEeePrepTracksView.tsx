import React, { useState, useMemo, useRef } from 'react';
import {
  Radio,
  Eye,
  Zap,
  Bot,
  Sun,
  CircuitBoard,
  CheckCircle2,
  Circle,
  Wrench,
  BookOpen,
  FolderGit2,
  HelpCircle,
  Copy,
  Check,
  Download,
  Terminal,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  Tag,
  Briefcase,
  SlidersHorizontal,
  Bookmark,
  BookmarkCheck,
  Search,
  Database,
  Upload,
  RotateCcw,
  FileJson,
  FileText,
  Save,
  Trash2,
  X,
  Cloud,
  Plus,
  Edit2
} from 'lucide-react';
import {
  ECE_EEE_PREP_TRACKS,
  EceEeeFieldPrepTrack,
  EceEeePrepPhase,
  EceEeeToolProfile,
  EceEeeInterviewDrill
} from '../data/eceEeePrepData';
import {
  getEceEeePrepProgress,
  saveEceEeePrepProgress,
  getEceEeePrepBookmarks,
  saveEceEeePrepBookmarks,
  getEceEeePrepNotes,
  saveEceEeePrepNotes,
  getEceEeeSelectedField,
  saveEceEeeSelectedField,
  exportAllUniversalUserData,
  importUniversalUserData,
  getStoredEceEeeTracks,
  saveStoredEceEeeTracks,
  resetStoredEceEeeTracks
} from '../utils/storage';

interface PhaseFormData {
  phaseNumber: number;
  title: string;
  durationWeeks: string;
  focusArea: string;
  primaryTools: string;
  keyConcepts: string;
  deliverable: string;
  handsOnMilestones: string;
}

const BLANK_PHASE_FORM: PhaseFormData = {
  phaseNumber: 1,
  title: '',
  durationWeeks: 'Weeks 1-4',
  focusArea: '',
  primaryTools: 'GNU Radio, Python, Wireshark',
  keyConcepts: 'Concept 1, Concept 2, Concept 3',
  deliverable: 'Functional simulation testbench with baseline report',
  handsOnMilestones: 'Milestone 1: Setup toolchain\nMilestone 2: Simulate initial waveform'
};

interface TrackFormData {
  fieldTitle: string;
  department: 'ECE' | 'EEE' | 'Both';
  weeklyCommitment: string;
  tagline: string;
}

const BLANK_TRACK_FORM: TrackFormData = {
  fieldTitle: '',
  department: 'ECE',
  weeklyCommitment: '12-15 hrs/week',
  tagline: ''
};

interface EceEeePrepTracksViewProps {
  initialFieldId?: string;
  onNavigateToCareers?: (fieldId?: string) => void;
  onNavigateToTools?: () => void;
  onGoBack?: () => void;
  onSyncToCloud?: () => void;
  isAdmin?: boolean;
}

export const EceEeePrepTracksView: React.FC<EceEeePrepTracksViewProps> = ({
  initialFieldId,
  onNavigateToCareers,
  onNavigateToTools,
  onGoBack,
  onSyncToCloud,
  isAdmin = false
}) => {
  // Field selection with persistence fallback
  const [selectedFieldId, setSelectedFieldIdState] = useState<string>(() => {
    return initialFieldId || getEceEeeSelectedField() || 'telecom-wireless';
  });

  const setSelectedFieldId = (id: string) => {
    setSelectedFieldIdState(id);
    saveEceEeeSelectedField(id);
  };

  // Custom Tracks State
  const [tracks, setTracks] = useState<EceEeeFieldPrepTrack[]>(() => getStoredEceEeeTracks());

  // Phase Modal State
  const [isPhaseModalOpen, setIsPhaseModalOpen] = useState(false);
  const [editingPhaseIndex, setEditingPhaseIndex] = useState<number | null>(null);
  const [phaseFormData, setPhaseFormData] = useState<PhaseFormData>(BLANK_PHASE_FORM);

  // Track Modal State
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isAddingNewTrack, setIsAddingNewTrack] = useState(false);
  const [trackFormData, setTrackFormData] = useState<TrackFormData>(BLANK_TRACK_FORM);

  const [activeSubTab, setActiveSubTab] = useState<'phases' | 'tools' | 'capstone' | 'interviews' | 'resume' | 'notes'>('phases');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Progress & Bookmarks state from localStorage
  const [progressState, setProgressState] = useState<Record<string, boolean>>(() => getEceEeePrepProgress());
  const [bookmarksState, setBookmarksState] = useState<Record<string, boolean>>(() => getEceEeePrepBookmarks());

  // Personal Lab Notes state from localStorage (Universal offline storage)
  const [userNotes, setUserNotes] = useState<Record<string, string>>(() => getEceEeePrepNotes());
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Universal Backup & Restore modal state
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeTrack = useMemo(() => {
    return tracks.find(t => t.fieldId === selectedFieldId) || tracks[0];
  }, [tracks, selectedFieldId]);

  // Phase Handlers
  const handleOpenAddPhase = () => {
    setEditingPhaseIndex(null);
    setPhaseFormData({
      ...BLANK_PHASE_FORM,
      phaseNumber: activeTrack.phases.length + 1
    });
    setIsPhaseModalOpen(true);
  };

  const handleOpenEditPhase = (pIdx: number) => {
    const phase = activeTrack.phases[pIdx];
    if (!phase) return;
    setEditingPhaseIndex(pIdx);
    setPhaseFormData({
      phaseNumber: phase.phaseNumber,
      title: phase.title,
      durationWeeks: phase.durationWeeks,
      focusArea: phase.focusArea,
      primaryTools: phase.primaryTools.join(', '),
      keyConcepts: phase.keyConcepts.join(', '),
      deliverable: phase.deliverable || 'Functional simulation testbench with baseline report',
      handsOnMilestones: phase.handsOnMilestones.join('\n')
    });
    setIsPhaseModalOpen(true);
  };

  const handleDeletePhase = (pIdx: number) => {
    if (activeTrack.phases.length <= 1) {
      alert('You must retain at least one phase in the learning path.');
      return;
    }
    if (window.confirm(`Delete Phase ${activeTrack.phases[pIdx].phaseNumber}?`)) {
      const updatedPhases = activeTrack.phases.filter((_, idx) => idx !== pIdx).map((p, idx) => ({ ...p, phaseNumber: idx + 1 }));
      const updatedTracks = tracks.map(t => {
        if (t.fieldId === activeTrack.fieldId) {
          return { ...t, phases: updatedPhases };
        }
        return t;
      });
      setTracks(updatedTracks);
      saveStoredEceEeeTracks(updatedTracks);
    }
  };

  const handleSavePhase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phaseFormData.title.trim()) {
      alert('Please provide a phase title.');
      return;
    }
    const tools = phaseFormData.primaryTools.split(',').map(s => s.trim()).filter(Boolean);
    const concepts = phaseFormData.keyConcepts.split(',').map(s => s.trim()).filter(Boolean);
    const milestones = phaseFormData.handsOnMilestones.split('\n').map(s => s.trim()).filter(Boolean);

    const updatedPhases = [...activeTrack.phases];
    if (editingPhaseIndex !== null && updatedPhases[editingPhaseIndex]) {
      updatedPhases[editingPhaseIndex] = {
        ...updatedPhases[editingPhaseIndex],
        phaseNumber: phaseFormData.phaseNumber,
        title: phaseFormData.title.trim(),
        durationWeeks: phaseFormData.durationWeeks.trim(),
        focusArea: phaseFormData.focusArea.trim(),
        primaryTools: tools.length ? tools : updatedPhases[editingPhaseIndex].primaryTools,
        keyConcepts: concepts.length ? concepts : updatedPhases[editingPhaseIndex].keyConcepts,
        deliverable: phaseFormData.deliverable.trim() || updatedPhases[editingPhaseIndex].deliverable,
        handsOnMilestones: milestones.length ? milestones : updatedPhases[editingPhaseIndex].handsOnMilestones
      };
    } else {
      const newPhase: EceEeePrepPhase = {
        phaseNumber: phaseFormData.phaseNumber || activeTrack.phases.length + 1,
        title: phaseFormData.title.trim(),
        durationWeeks: phaseFormData.durationWeeks.trim(),
        focusArea: phaseFormData.focusArea.trim(),
        primaryTools: tools.length ? tools : ['EDA Tools', 'Lab Equipment'],
        keyConcepts: concepts.length ? concepts : ['Fundamental concepts'],
        deliverable: phaseFormData.deliverable.trim() || 'Laboratory testbench signoff',
        handsOnMilestones: milestones.length ? milestones : ['Milestone 1: Bringup and verification'],
        recommendedResources: [
          { title: 'Standard Technical Handbook', type: 'Book', linkOrAuthor: 'Industry Reference' }
        ]
      };
      updatedPhases.push(newPhase);
    }

    const updatedTracks = tracks.map(t => {
      if (t.fieldId === activeTrack.fieldId) {
        return { ...t, phases: updatedPhases };
      }
      return t;
    });

    setTracks(updatedTracks);
    saveStoredEceEeeTracks(updatedTracks);
    setIsPhaseModalOpen(false);
  };

  // Track Handlers
  const handleOpenEditTrack = () => {
    setIsAddingNewTrack(false);
    setTrackFormData({
      fieldTitle: activeTrack.fieldTitle,
      department: activeTrack.department,
      weeklyCommitment: activeTrack.weeklyCommitment,
      tagline: activeTrack.tagline
    });
    setIsTrackModalOpen(true);
  };

  const handleOpenAddTrack = () => {
    setIsAddingNewTrack(true);
    setTrackFormData(BLANK_TRACK_FORM);
    setIsTrackModalOpen(true);
  };

  const handleSaveTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackFormData.fieldTitle.trim() || !trackFormData.tagline.trim()) {
      alert('Please provide a field title and tagline.');
      return;
    }

    let updatedList: EceEeeFieldPrepTrack[];
    let newFieldId = activeTrack.fieldId;

    if (isAddingNewTrack) {
      newFieldId = `track-${Date.now()}`;
      const newTrack: EceEeeFieldPrepTrack = {
        fieldId: newFieldId,
        fieldTitle: trackFormData.fieldTitle.trim(),
        department: trackFormData.department,
        badgeColor: 'border-emerald-500 text-emerald-700 bg-emerald-50',
        weeklyCommitment: trackFormData.weeklyCommitment.trim(),
        tagline: trackFormData.tagline.trim(),
        prerequisites: ['Basic Electronics', 'Digital Logic', 'C/C++'],
        phases: [
          {
            phaseNumber: 1,
            title: 'Foundations & Mathematical Tooling',
            durationWeeks: 'Weeks 1-4',
            focusArea: 'Core Theory & Basic Setup',
            primaryTools: ['Python', 'EDA Tools'],
            keyConcepts: ['Circuit Analysis', 'Signal Processing'],
            deliverable: 'Foundation simulation workspace and report',
            handsOnMilestones: [
              'Setup toolchain environment and baseline models',
              'Validate numerical equations against textbook benchmarks'
            ],
            recommendedResources: [
              { title: 'Fundamental Electronics & Signals', type: 'Book', linkOrAuthor: 'Standard Textbook' }
            ]
          }
        ],
        toolProfiles: [],
        capstoneBlueprint: {
          title: `${trackFormData.fieldTitle.trim()} Capstone System`,
          hardwareCostEstimate: '₹5,000 / $65',
          estimatedBuildTime: '40-50 hours',
          objective: 'Industrial scale prototype implementing standard domain protocols and hardware.',
          hardwareBOM: ['Development Platform DEV-KIT-01', 'High-speed ADC/DAC Module'],
          softwareStack: ['Python', 'Open Source EDA', 'Embedded C++'],
          gitHubStructure: ['/docs', '/rtl_firmware', '/testbenches', '/schematics'],
          testingAndSignoff: ['Loopback test with zero packet drop', 'Thermal & power consumption measurement']
        },
        interviewDrills: [],
        atsResumeBullets: [
          `Architected and simulated ${trackFormData.fieldTitle} hardware subsystem adhering to industrial specifications.`
        ]
      };
      updatedList = [...tracks, newTrack];
      setSelectedFieldId(newFieldId);
    } else {
      updatedList = tracks.map(t => {
        if (t.fieldId === activeTrack.fieldId) {
          return {
            ...t,
            fieldTitle: trackFormData.fieldTitle.trim(),
            department: trackFormData.department,
            weeklyCommitment: trackFormData.weeklyCommitment.trim(),
            tagline: trackFormData.tagline.trim()
          };
        }
        return t;
      });
    }

    setTracks(updatedList);
    saveStoredEceEeeTracks(updatedList);
    setIsTrackModalOpen(false);
  };

  const handleResetTracks = () => {
    if (window.confirm('Reset all preparation tracks to default curriculum specifications?')) {
      const def = resetStoredEceEeeTracks();
      setTracks(def);
      setSelectedFieldId(def[0].fieldId);
    }
  };

  // Field icons mapping
  const fieldIcons: Record<string, React.ReactNode> = {
    'telecom-wireless': <Radio className="w-5 h-5 text-sky-600" />,
    'signal-image-vision': <Eye className="w-5 h-5 text-indigo-600" />,
    'power-electronics-ev': <Zap className="w-5 h-5 text-amber-500" />,
    'control-robotics-automation': <Bot className="w-5 h-5 text-emerald-600" />,
    'renewable-energy-smart-grids': <Sun className="w-5 h-5 text-orange-500" />,
    'pcb-hardware-engineering': <CircuitBoard className="w-5 h-5 text-rose-600" />
  };

  // Toggle item completion
  const toggleProgressItem = (itemId: string) => {
    setProgressState(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      saveEceEeePrepProgress(next);
      return next;
    });
    onSyncToCloud?.();
  };

  // Toggle bookmark
  const toggleBookmark = (itemId: string) => {
    setBookmarksState(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      saveEceEeePrepBookmarks(next);
      return next;
    });
    onSyncToCloud?.();
  };

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Calculate track progress stats
  const trackStats = useMemo(() => {
    let totalItems = 0;
    let completedItems = 0;

    activeTrack.phases.forEach((phase, pIdx) => {
      phase.keyConcepts.forEach((_, cIdx) => {
        totalItems++;
        if (progressState[`${activeTrack.fieldId}-p${pIdx}-c${cIdx}`]) {
          completedItems++;
        }
      });
      phase.handsOnMilestones.forEach((_, mIdx) => {
        totalItems++;
        if (progressState[`${activeTrack.fieldId}-p${pIdx}-m${mIdx}`]) {
          completedItems++;
        }
      });
    });

    const percent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    return { totalItems, completedItems, percent };
  }, [activeTrack, progressState]);

  // Overall statistics across all tracks
  const globalStats = useMemo(() => {
    let totalConcepts = 0;
    let doneConcepts = 0;

    tracks.forEach(track => {
      track.phases.forEach((phase, pIdx) => {
        phase.keyConcepts.forEach((_, cIdx) => {
          totalConcepts++;
          if (progressState[`${track.fieldId}-p${pIdx}-c${cIdx}`]) doneConcepts++;
        });
        phase.handsOnMilestones.forEach((_, mIdx) => {
          totalConcepts++;
          if (progressState[`${track.fieldId}-p${pIdx}-m${mIdx}`]) doneConcepts++;
        });
      });
    });

    return { totalConcepts, doneConcepts };
  }, [tracks, progressState]);

  // Markdown Export of the full preparation track
  const exportTrackAsMarkdown = () => {
    let md = `# ${activeTrack.fieldTitle} - In-Depth Preparation Track & Tool Dossier\n\n`;
    md += `**Department:** ${activeTrack.department} | **Time Commitment:** ${activeTrack.weeklyCommitment}\n`;
    md += `**Focus:** ${activeTrack.tagline}\n`;
    md += `**Prerequisites:** ${activeTrack.prerequisites.join(', ')}\n\n`;

    md += `## 1. 4-Phase Learning Path\n\n`;
    activeTrack.phases.forEach(phase => {
      md += `### Phase ${phase.phaseNumber}: ${phase.title} (${phase.durationWeeks})\n`;
      md += `**Focus Area:** ${phase.focusArea}\n\n`;
      md += `#### Key Theoretical Concepts:\n`;
      phase.keyConcepts.forEach(c => md += `- [ ] ${c}\n`);
      md += `\n#### Practical Hands-on Milestones:\n`;
      phase.handsOnMilestones.forEach(m => md += `- [ ] ${m}\n`);
      md += `\n**Phase Deliverable:** ${phase.deliverable}\n\n`;
    });

    md += `## 2. Industry Tool Mastery & Lab Workflows\n\n`;
    activeTrack.toolProfiles.forEach(tool => {
      md += `### Tool: ${tool.name} (${tool.category})\n`;
      md += `**License:** ${tool.isFreeOrOpenSource ? 'Free / Open Source' : 'Commercial'} | **Enterprise Counterpart:** ${tool.enterpriseEquivalent || 'N/A'}\n`;
      md += `**Primary Industry Use:** ${tool.primaryUse}\n`;
      md += `**Setup Command:** \`${tool.setupGuide.quickInstallCommand}\`\n\n`;
      md += `#### Industry Workflow:\n`;
      tool.industryWorkflow.forEach((w, idx) => md += `${idx + 1}. ${w}\n`);
      md += `\n#### Hands-on Lab Drill: ${tool.handsOnLabDrill.title}\n`;
      md += `*Objective:* ${tool.handsOnLabDrill.objective}\n`;
      tool.handsOnLabDrill.steps.forEach(s => md += `- ${s}\n`);
      md += `*Signoff Check:* ${tool.handsOnLabDrill.verificationCheck}\n\n`;
    });

    md += `## 3. Flagship Capstone Project Blueprint\n\n`;
    md += `### ${activeTrack.capstoneBlueprint.title}\n`;
    md += `**Cost Estimate:** ${activeTrack.capstoneBlueprint.hardwareCostEstimate} | **Timeline:** ${activeTrack.capstoneBlueprint.estimatedBuildTime}\n`;
    md += `**Objective:** ${activeTrack.capstoneBlueprint.objective}\n\n`;
    md += `#### Hardware Bill of Materials:\n`;
    activeTrack.capstoneBlueprint.hardwareBOM.forEach(b => md += `- ${b}\n`);
    md += `\n#### Software Stack:\n`;
    activeTrack.capstoneBlueprint.softwareStack.forEach(s => md += `- ${s}\n`);
    md += `\n#### GitHub Repository Layout:\n`;
    activeTrack.capstoneBlueprint.gitHubStructure.forEach(g => md += `- \`${g}\`\n`);
    md += `\n#### Verification & Sign-off Criteria:\n`;
    activeTrack.capstoneBlueprint.testingAndSignoff.forEach(t => md += `- [ ] ${t}\n`);

    md += `\n## 4. Technical Interview Drill Whiteboard\n\n`;
    activeTrack.interviewDrills.forEach((drill, idx) => {
      md += `### Q${idx + 1}: ${drill.question}\n`;
      md += `**Topic:** ${drill.topic} | **Target Company:** ${drill.targetCompany} | **Difficulty:** ${drill.difficulty}\n\n`;
      md += `**Model Technical Answer:**\n${drill.technicalAnswer}\n\n`;
      md += `**Key Keywords to Mention:** ${drill.keyKeywordsToMention.join(', ')}\n\n`;
    });

    md += `## 5. ATS Resume Project Bullets\n\n`;
    activeTrack.atsResumeBullets.forEach(bullet => md += `- ${bullet}\n`);

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeTrack.fieldId}_prep_dossier.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-xs relative overflow-hidden">
        {/* Optional Go Back Button */}
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 transition-colors cursor-pointer w-fit mb-3.5 active:scale-95"
            title="Go back to previous section"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-600" />
            <span>Back to Previous Section</span>
          </button>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                ECE &amp; EEE Dedicated Track
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                Separate from VLSI/Embedded Roadmap
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                Local Storage Universal Persistence
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 tracking-tight">
              ECE &amp; EEE Preparation Tracks &amp; Toolchains
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl leading-relaxed">
              Step-by-step 16-week learning curricula, free &amp; open-source EDA tool setup commands, industrial laboratory workflows, flagship capstone blueprints, and MNC interview drills tailored to the 6 core non-VLSI hardware domains.
            </p>
          </div>

          {/* Action CTAs - Stacks responsively on mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full sm:w-auto">
            {onNavigateToCareers && (
              <button
                onClick={() => onNavigateToCareers(selectedFieldId)}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-2xs cursor-pointer active:scale-95"
                title="View Compensation Benchmarks, R&D Labs & Regulatory Standards"
              >
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Career Report &amp; Hubs</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => setShowBackupModal(true)}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer active:scale-95"
                title="Universal Backup: Accessible to Admin only"
              >
                <Database className="w-4 h-4 text-purple-600" />
                <span>Universal Backup (Admin)</span>
              </button>
            )}

            <button
              onClick={exportTrackAsMarkdown}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer active:scale-95"
              title="Download Complete Markdown Dossier"
            >
              <Download className="w-4 h-4 text-neutral-500" />
              <span>Export Dossier (.md)</span>
            </button>
          </div>
        </div>

        {/* Global Progress Summary Strip */}
        <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-neutral-600">
            <span className="font-medium text-neutral-900">
              Active Track: <strong className="text-emerald-700 font-bold">{trackStats.completedItems}/{trackStats.totalItems} ({trackStats.percent}%)</strong>
            </span>
            <span className="text-neutral-300">•</span>
            <span>
              All Domains: <strong className="text-neutral-900">{globalStats.doneConcepts}/{globalStats.totalConcepts}</strong>
            </span>
          </div>

          {/* Quick Filter Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts, tools, commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-neutral-900 text-neutral-800 placeholder-neutral-400"
            />
          </div>
        </div>
      </div>

      {/* Field Selector Grid - Mobile Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
        {tracks.map(track => {
          const isSelected = track.fieldId === selectedFieldId;
          return (
            <button
              key={track.fieldId}
              onClick={() => setSelectedFieldId(track.fieldId)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
                  {fieldIcons[track.fieldId] || <CircuitBoard className="w-5 h-5 text-emerald-600" />}
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                  isSelected ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {track.department}
                </span>
              </div>
              <div>
                <h3 className="text-xs font-bold leading-snug line-clamp-2">{track.fieldTitle}</h3>
                <p className={`text-[11px] mt-1 truncate ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {track.phases.length} Phases • {track.toolProfiles.length} Tools
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Field Hero Banner */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Department: {activeTrack.department}
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                Commitment: {activeTrack.weeklyCommitment}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {activeTrack.fieldTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-3xl leading-relaxed">
              {activeTrack.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleOpenEditTrack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer border border-neutral-200"
              title="Edit track overview"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Track</span>
            </button>
            <button
              onClick={handleOpenAddTrack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors cursor-pointer shadow-2xs"
              title="Add a custom preparation track"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Track</span>
            </button>
            <button
              onClick={handleResetTracks}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors cursor-pointer border border-neutral-200"
              title="Reset tracks to baseline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            {onNavigateToCareers && (
              <button
                onClick={() => onNavigateToCareers(activeTrack.fieldId)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-colors cursor-pointer shrink-0 border border-neutral-200"
              >
                <Briefcase className="w-3.5 h-3.5 text-neutral-600" />
                <span>Career Benchmarks</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Prerequisites Pill List */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-neutral-500 font-medium">Prerequisites:</span>
          {activeTrack.prerequisites.map((req, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-md text-[11px] font-medium">
              {req}
            </span>
          ))}
        </div>
      </div>

      {/* Tab Navigation Controls - Smooth Horizontal Scroll on Mobile */}
      <div className="border-b border-neutral-200 pb-1">
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar scroll-smooth touch-pan-x py-1">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setActiveSubTab('phases')}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                activeSubTab === 'phases'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>4-Phase Learning Path</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeSubTab === 'phases' ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-600'}`}>
                {activeTrack.phases.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('tools')}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                activeSubTab === 'tools'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 shrink-0" />
              <span>Toolchains &amp; Lab Drills</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeSubTab === 'tools' ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-600'}`}>
                {activeTrack.toolProfiles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('capstone')}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                activeSubTab === 'capstone'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5 shrink-0" />
              <span>Capstone Blueprint</span>
            </button>

            <button
              onClick={() => setActiveSubTab('interviews')}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                activeSubTab === 'interviews'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span>MNC Interview Whiteboard</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeSubTab === 'interviews' ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-600'}`}>
                {activeTrack.interviewDrills.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('resume')}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                activeSubTab === 'resume'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <Tag className="w-3.5 h-3.5 shrink-0" />
              <span>ATS Resume Bullets</span>
            </button>

            <button
              onClick={() => setActiveSubTab('notes')}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                activeSubTab === 'notes'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
              <span>Lab Journal &amp; Local Backup</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                Offline
              </span>
            </button>
          </div>

          {copiedText && (
            <div className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
              <Check className="w-3.5 h-3.5" />
              <span>Copied {copiedText}</span>
            </div>
          )}
        </div>
      </div>

      {/* SUBTAB 1: Learning Path */}
      {activeSubTab === 'phases' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white rounded-xl border border-neutral-200 p-3.5 shadow-2xs">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-neutral-900">
                Curriculum Progression ({activeTrack.phases.length} Phases)
              </h3>
              <p className="text-[11px] text-neutral-500">
                Step-by-step milestone learning path. Add custom phases or modify topics as needed.
              </p>
            </div>
            <button
              onClick={handleOpenAddPhase}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Phase</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {activeTrack.phases.map((phase, pIdx) => {
              return (
                <div 
                  key={phase.phaseNumber} 
                  className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-2xs hover:border-neutral-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-neutral-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                        {phase.phaseNumber}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                          Phase {phase.phaseNumber}: {phase.title}
                        </h3>
                        <p className="text-xs text-neutral-500 font-medium">
                          {phase.durationWeeks} • Focus: {phase.focusArea}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg">
                        Tools: {phase.primaryTools.join(', ')}
                      </span>
                      <button
                        onClick={() => handleOpenEditPhase(pIdx)}
                        className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                        title="Edit phase"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePhase(pIdx)}
                        className="p-1.5 rounded-lg border border-neutral-200 hover:bg-rose-50 text-neutral-400 hover:text-rose-600 cursor-pointer"
                        title="Delete phase"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                    {/* Left: Key Theoretical Concepts */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Core Mathematical & Theoretical Concepts</span>
                      </h4>
                      <div className="space-y-2">
                        {phase.keyConcepts.map((concept, cIdx) => {
                          const itemId = `${activeTrack.fieldId}-p${pIdx}-c${cIdx}`;
                          const isDone = progressState[itemId];
                          return (
                            <div
                              key={cIdx}
                              onClick={() => toggleProgressItem(itemId)}
                              className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 cursor-pointer transition-all ${
                                isDone 
                                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
                                  : 'bg-neutral-50/60 border-neutral-200 text-neutral-800 hover:bg-neutral-100/80'
                              }`}
                            >
                              <button className="mt-0.5 shrink-0 text-neutral-500">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <Circle className="w-4 h-4 text-neutral-400" />
                                )}
                              </button>
                              <span className={`leading-relaxed ${isDone ? 'line-through opacity-80' : ''}`}>
                                {concept}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Practical Hands-On Milestones */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Hands-On Engineering Milestones</span>
                      </h4>
                      <div className="space-y-2">
                        {phase.handsOnMilestones.map((milestone, mIdx) => {
                          const itemId = `${activeTrack.fieldId}-p${pIdx}-m${mIdx}`;
                          const isDone = progressState[itemId];
                          return (
                            <div
                              key={mIdx}
                              onClick={() => toggleProgressItem(itemId)}
                              className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 cursor-pointer transition-all ${
                                isDone 
                                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
                                  : 'bg-neutral-50/60 border-neutral-200 text-neutral-800 hover:bg-neutral-100/80'
                              }`}
                            >
                              <button className="mt-0.5 shrink-0 text-neutral-500">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <Circle className="w-4 h-4 text-neutral-400" />
                                )}
                              </button>
                              <span className={`leading-relaxed font-medium ${isDone ? 'line-through opacity-80' : ''}`}>
                                {milestone}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Phase Deliverable and Recommended Resources Footer */}
                  <div className="mt-5 pt-4 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 flex items-start gap-2.5">
                      <FolderGit2 className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-neutral-900">Phase Proof of Work Deliverable:</div>
                        <div className="text-neutral-600 mt-0.5">{phase.deliverable}</div>
                      </div>
                    </div>

                    <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                      <div className="font-semibold text-neutral-900 mb-1">Recommended References:</div>
                      <div className="space-y-1">
                        {phase.recommendedResources.map((res, rIdx) => (
                          <div key={rIdx} className="text-neutral-600 flex items-center justify-between text-[11px]">
                            <span className="font-medium text-neutral-800 truncate max-w-xs">{res.title}</span>
                            <span className="text-neutral-500 shrink-0 ml-1">({res.type} • {res.linkOrAuthor})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: Toolchains & Lab Drills */}
      {activeSubTab === 'tools' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {activeTrack.toolProfiles.map((tool, tIdx) => {
              return (
                <div key={tIdx} className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-neutral-900">{tool.name}</h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                            tool.isFreeOrOpenSource 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-neutral-100 text-neutral-700'
                          }`}>
                            {tool.isFreeOrOpenSource ? 'Open Source / Free' : 'Commercial'}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 font-medium mt-0.5">
                          {tool.category} • Enterprise: {tool.enterpriseEquivalent || 'Industry Standard'}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopy(tool.setupGuide.quickInstallCommand, tool.name)}
                        className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer shrink-0"
                        title="Copy Install Command"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-neutral-700 leading-relaxed mb-4">
                      {tool.primaryUse}
                    </p>

                    {/* Quick Install Snippet */}
                    <div className="bg-neutral-900 text-neutral-100 rounded-xl p-3 text-xs font-mono mb-4 relative group">
                      <div className="text-[10px] text-neutral-400 font-sans mb-1 flex items-center justify-between">
                        <span>Setup Command ({tool.setupGuide.osSupport})</span>
                        <span className="text-emerald-400">bash / CLI</span>
                      </div>
                      <div className="overflow-x-auto text-[11px] select-all py-1">
                        {tool.setupGuide.quickInstallCommand}
                      </div>
                    </div>

                    {/* Industry Workflow Steps */}
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                        Typical Industrial Design Workflow:
                      </h4>
                      <ol className="space-y-1.5 text-xs text-neutral-700">
                        {tool.industryWorkflow.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-neutral-100 text-neutral-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Hands-On Lab Drill Card */}
                    <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-3.5">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs mb-1">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Hands-On Drill: {tool.handsOnLabDrill.title}</span>
                      </div>
                      <p className="text-[11px] text-emerald-950 mb-2 leading-relaxed">
                        {tool.handsOnLabDrill.objective}
                      </p>
                      <div className="text-[11px] text-neutral-700 space-y-1 mb-2">
                        {tool.handsOnLabDrill.steps.map((st, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{st}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-emerald-200 text-[11px] font-semibold text-emerald-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Sign-off: {tool.handsOnLabDrill.verificationCheck}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 3: Capstone Blueprint */}
      {activeSubTab === 'capstone' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-7 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
            <div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Industry-Grade Capstone Blueprint
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                {activeTrack.capstoneBlueprint.title}
              </h3>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                Estimated Build Time: {activeTrack.capstoneBlueprint.estimatedBuildTime} • Hardware Cost: {activeTrack.capstoneBlueprint.hardwareCostEstimate}
              </p>
            </div>

            <button
              onClick={() => handleCopy(JSON.stringify(activeTrack.capstoneBlueprint, null, 2), 'Capstone Blueprint')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Blueprint Spec</span>
            </button>
          </div>

          <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-200">
            <strong className="text-neutral-900 font-semibold block mb-1">Project Technical Objective:</strong>
            {activeTrack.capstoneBlueprint.objective}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Hardware BOM */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                <CircuitBoard className="w-4 h-4 text-rose-600" />
                <span>Hardware Bill of Materials (BOM)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                {activeTrack.capstoneBlueprint.hardwareBOM.map((bom, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-400 font-bold">•</span>
                    <span>{bom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Software Stack */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Software & Firmware Tool Stack</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                {activeTrack.capstoneBlueprint.softwareStack.map((soft, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-400 font-bold">•</span>
                    <span>{soft}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* GitHub Repo Structure */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-neutral-700" />
              <span>Recommended GitHub Repository Layout</span>
            </h4>
            <div className="bg-neutral-900 text-neutral-100 rounded-xl p-4 font-mono text-xs space-y-1">
              {activeTrack.capstoneBlueprint.gitHubStructure.map((dir, idx) => (
                <div key={idx} className="text-neutral-300">
                  📁 {dir}
                </div>
              ))}
            </div>
          </div>

          {/* Verification & Sign-Off Criteria */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Rigorous Lab Verification & Sign-Off Metrics</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-900">
              {activeTrack.capstoneBlueprint.testingAndSignoff.map((test, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{test}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* SUBTAB 4: MNC Interview Whiteboard */}
      {activeSubTab === 'interviews' && (
        <div className="space-y-5">
          {activeTrack.interviewDrills.map((drill, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    Q{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-neutral-600">
                    Topic: {drill.topic}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    drill.difficulty === 'Hard' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {drill.difficulty}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    Asked at: <strong className="text-neutral-800">{drill.targetCompany}</strong>
                  </span>
                </div>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                {drill.question}
              </h4>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs sm:text-sm text-neutral-800 leading-relaxed space-y-2">
                <div className="font-semibold text-neutral-900 flex items-center justify-between">
                  <span>Model Technical Answer:</span>
                  <button
                    onClick={() => handleCopy(drill.technicalAnswer, `Q${idx + 1} Answer`)}
                    className="p-1 text-neutral-500 hover:text-neutral-900 cursor-pointer"
                    title="Copy Answer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-neutral-700 whitespace-pre-line text-xs sm:text-[13px]">
                  {drill.technicalAnswer}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-neutral-500 font-medium text-[11px]">Keywords to hit in interview:</span>
                {drill.keyKeywordsToMention.map((kw, kIdx) => (
                  <span key={kIdx} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-[10px] font-semibold">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 5: ATS Resume Bullets */}
      {activeSubTab === 'resume' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                Action-Oriented ATS Resume Bullets
              </h3>
              <p className="text-xs text-neutral-500 font-medium">
                High-impact, metric-driven phrasing designed to pass Applicant Tracking Systems and impress hardware hiring managers.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {activeTrack.atsResumeBullets.map((bullet, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex items-start justify-between gap-3 text-xs sm:text-sm text-neutral-800"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{bullet}</span>
                </div>
                <button
                  onClick={() => handleCopy(bullet, `Bullet #${idx + 1}`)}
                  className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer shrink-0"
                  title="Copy Resume Bullet"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 leading-relaxed">
            <strong>Pro Tip for Hardware Interviews:</strong> Always quantify metrics in your resume (e.g. latency in microseconds, frequency in MHz/GHz, efficiency in %, and THD in %). Hiring managers look for empirical verification of electrical performance over generic claims.
          </div>
        </div>
      )}

      {/* SUBTAB 6: Lab Journal & Local Backup (Universal Persistence) */}
      {activeSubTab === 'notes' && (
        <div className="space-y-6">
          {/* Notes Workspace Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                    Personal Field Journal &amp; Lab Notes
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Auto-Saved Locally
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">
                  Private engineering scratchpad for {activeTrack.fieldTitle}. Persisted 100% locally in your browser.
                </p>
              </div>

              {saveStatus && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5 self-start sm:self-auto">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{saveStatus}</span>
                </span>
              )}
            </div>

            {/* Quick Note Templates */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-neutral-500 font-medium text-[11px]">Insert quick structure:</span>
              <button
                onClick={() => {
                  const current = userNotes[selectedFieldId] || '';
                  const template = `\n\n### Lab Bench Observation [${new Date().toLocaleDateString()}]\n- Tool / Kit Used:\n- Measured Metric (Frequency/Power/SNR):\n- Anomaly Detected:\n- Resolution / Next Step:`;
                  const updated = { ...userNotes, [selectedFieldId]: (current + template).trim() };
                  setUserNotes(updated);
                  saveEceEeePrepNotes(updated);
                  setSaveStatus('Template inserted & saved');
                  setTimeout(() => setSaveStatus(null), 2000);
                }}
                className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium transition-colors cursor-pointer text-[11px]"
              >
                + Lab Observation
              </button>
              <button
                onClick={() => {
                  const current = userNotes[selectedFieldId] || '';
                  const template = `\n\n### Target Companies & Roles Checklist\n- [ ] Company 1: Target Position | POC / HR:\n- [ ] Company 2: Target Position | Referral:\n- [ ] Key Portfolio Link:`;
                  const updated = { ...userNotes, [selectedFieldId]: (current + template).trim() };
                  setUserNotes(updated);
                  saveEceEeePrepNotes(updated);
                  setSaveStatus('Template inserted & saved');
                  setTimeout(() => setSaveStatus(null), 2000);
                }}
                className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium transition-colors cursor-pointer text-[11px]"
              >
                + Target Companies
              </button>
              <button
                onClick={() => {
                  const current = userNotes[selectedFieldId] || '';
                  const template = `\n\n### Capstone Milestones & Verification Criteria\n- [ ] Simulation Signoff:\n- [ ] Hardware BOM Procured:\n- [ ] Oscilloscope / Analyzer Measured Waveform:\n- [ ] GitHub README & Documentation Published:`;
                  const updated = { ...userNotes, [selectedFieldId]: (current + template).trim() };
                  setUserNotes(updated);
                  saveEceEeePrepNotes(updated);
                  setSaveStatus('Template inserted & saved');
                  setTimeout(() => setSaveStatus(null), 2000);
                }}
                className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium transition-colors cursor-pointer text-[11px]"
              >
                + Capstone Checklist
              </button>
            </div>

            {/* Notes Textarea */}
            <div className="relative">
              <textarea
                value={userNotes[selectedFieldId] || ''}
                onChange={(e) => {
                  const updated = { ...userNotes, [selectedFieldId]: e.target.value };
                  setUserNotes(updated);
                  saveEceEeePrepNotes(updated);
                  setSaveStatus('Saved locally & syncing');
                  setTimeout(() => setSaveStatus(null), 2000);
                  onSyncToCloud?.();
                }}
                placeholder={`Type your study notes, testbench calculations, kit measurements, or interview reminders for ${activeTrack.fieldTitle} here...\nAll text is auto-saved locally in your browser.`}
                rows={10}
                className="w-full p-4 text-xs sm:text-sm font-mono leading-relaxed bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-neutral-900 text-neutral-900 placeholder-neutral-400 resize-y"
              />
            </div>
          </div>

          {/* Universal Data Portability & Backup Section - Strictly visible to Admin */}
          {isAdmin ? (
            <div className="bg-neutral-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-neutral-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-purple-400" />
                    <h3 className="text-base sm:text-lg font-bold">
                      Admin Universal Data &amp; Local Persistence Center
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                    As designated administrator, you can export and inspect full universal backups of student data, checkoffs, and engineering logs.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      const dataStr = exportAllUniversalUserData();
                      const blob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `universal_tracker_backup_${new Date().toISOString().split('T')[0]}.json`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-500 hover:bg-purple-400 text-white transition-colors cursor-pointer active:scale-95 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Universal Backup (.json)</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors cursor-pointer active:scale-95"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import Universal Backup</span>
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const content = ev.target?.result as string;
                        const res = importUniversalUserData(content);
                        setImportStatus(res);
                        if (res.success) {
                          setProgressState(getEceEeePrepProgress());
                          setBookmarksState(getEceEeePrepBookmarks());
                          setUserNotes(getEceEeePrepNotes());
                          setSelectedFieldId(getEceEeeSelectedField() || selectedFieldId);
                        }
                      };
                      reader.readAsText(file);
                    }}
                  />
                </div>
              </div>

              {/* Import Status Alert */}
              {importStatus && (
                <div className={`p-3 rounded-xl text-xs flex items-center justify-between gap-2 border ${
                  importStatus.success 
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
                    : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
                }`}>
                  <span>{importStatus.message}</span>
                  <button 
                    onClick={() => setImportStatus(null)} 
                    className="p-1 hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Danger Zone: Reset Track Data */}
              <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-neutral-400">
                  Reset checkoffs for <strong className="text-neutral-200">{activeTrack.fieldTitle}</strong> without affecting other domains.
                </div>
                <button
                  onClick={() => {
                    if (window.confirm(`Reset progress checkoffs for ${activeTrack.fieldTitle}? Your notes will be preserved.`)) {
                      const updated = { ...progressState };
                      Object.keys(updated).forEach(key => {
                        if (key.startsWith(selectedFieldId)) {
                          delete updated[key];
                        }
                      });
                      setProgressState(updated);
                      saveEceEeePrepProgress(updated);
                      setSaveStatus('Track checkoffs reset');
                      setTimeout(() => setSaveStatus(null), 2000);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 border border-rose-900/50 transition-colors cursor-pointer w-fit self-start sm:self-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset {activeTrack.fieldTitle} Progress</span>
                </button>
              </div>
            </div>
          ) : (
            /* Student Cloud Auto-Sync Status Card */
            <div className="bg-neutral-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-neutral-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base sm:text-lg font-bold">
                      Cloud Progress Synchronization Active
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                    Your milestone checkoffs, engineering notebooks, and track progress automatically sync to the secure cloud. You can switch devices or resume anytime seamlessly.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Cloud Synced</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Universal Backup & Data Portability Modal - Strictly Admin Only */}
      {showBackupModal && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Universal Local Data &amp; Backup</h3>
                  <p className="text-xs text-neutral-500">Offline-first portability across all users &amp; devices</p>
                </div>
              </div>
              <button
                onClick={() => setShowBackupModal(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-600 leading-relaxed">
              <p>
                All your progress checkoffs, saved bookmarks, field notes, and curriculum records are securely saved inside your current browser's <strong className="text-neutral-900 font-semibold">localStorage</strong>.
              </p>
              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 space-y-1.5 text-[11px]">
                <div className="font-semibold text-neutral-900">Universal Compatibility Features:</div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>No login or server connection required</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Portable JSON format can be imported into any machine or browser</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Different students can maintain independent backups</span>
                </div>
              </div>
            </div>

            {importStatus && (
              <div className={`p-3 rounded-xl text-xs flex items-center justify-between gap-2 border ${
                importStatus.success 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}>
                <span>{importStatus.message}</span>
                <button 
                  onClick={() => setImportStatus(null)} 
                  className="p-0.5 hover:opacity-75 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => {
                  const dataStr = exportAllUniversalUserData();
                  const blob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `hardware_silicon_tracker_backup_${new Date().toISOString().split('T')[0]}.json`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors cursor-pointer active:scale-95 shadow-2xs"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export My Backup (.json)</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs border border-neutral-200 transition-colors cursor-pointer active:scale-95"
              >
                <Upload className="w-4 h-4 text-neutral-600" />
                <span>Import Backup File</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phase Add / Edit Modal */}
      {isPhaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>{editingPhaseIndex !== null ? `Edit Phase ${phaseFormData.phaseNumber}` : 'Add Preparation Phase'}</span>
              </h3>
              <button 
                onClick={() => setIsPhaseModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhase} className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Phase No.</label>
                  <input
                    type="number"
                    min="1"
                    value={phaseFormData.phaseNumber}
                    onChange={e => setPhaseFormData(prev => ({ ...prev, phaseNumber: parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold text-neutral-700 mb-1">Duration Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Weeks 1-4"
                    value={phaseFormData.durationWeeks}
                    onChange={e => setPhaseFormData(prev => ({ ...prev, durationWeeks: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Phase Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wireless Propagation, Channel Estimation &amp; GNU Radio"
                  value={phaseFormData.title}
                  onChange={e => setPhaseFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Focus Area</label>
                <input
                  type="text"
                  placeholder="e.g. Mathematical foundations and DSP signal chain"
                  value={phaseFormData.focusArea}
                  onChange={e => setPhaseFormData(prev => ({ ...prev, focusArea: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Primary EDA Tools (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. GNU Radio Companion, Python NumPy, Octave, Wireshark"
                  value={phaseFormData.primaryTools}
                  onChange={e => setPhaseFormData(prev => ({ ...prev, primaryTools: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Key Theoretical Concepts (comma-separated)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Friis transmission equation, Rayleigh fading, QAM constellation mapping"
                  value={phaseFormData.keyConcepts}
                  onChange={e => setPhaseFormData(prev => ({ ...prev, keyConcepts: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Phase Deliverable / Output Requirement *</label>
                <input
                  type="text"
                  placeholder="e.g. Functional SDR transceiver testbench with constellation diagram signoff"
                  value={phaseFormData.deliverable}
                  onChange={e => setPhaseFormData(prev => ({ ...prev, deliverable: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Hands-On Milestones (one per line)</label>
                <textarea
                  rows={3}
                  placeholder="Milestone 1: Configure GNU Radio block diagram and run simulation&#10;Milestone 2: Connect HackRF SDR and capture real RF spectrum"
                  value={phaseFormData.handsOnMilestones}
                  onChange={e => setPhaseFormData(prev => ({ ...prev, handsOnMilestones: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsPhaseModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingPhaseIndex !== null ? 'Update Phase' : 'Save Phase'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Track Add / Edit Modal */}
      {isTrackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <CircuitBoard className="w-4 h-4 text-emerald-600" />
                <span>{isAddingNewTrack ? 'Add Custom Preparation Track' : 'Edit Track Details'}</span>
              </h3>
              <button 
                onClick={() => setIsTrackModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTrack} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Track Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Biomedical Instrumentation &amp; Biosensors"
                  value={trackFormData.fieldTitle}
                  onChange={e => setTrackFormData(prev => ({ ...prev, fieldTitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Department</label>
                  <select
                    value={trackFormData.department}
                    onChange={e => setTrackFormData(prev => ({ ...prev, department: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Weekly Commitment</label>
                  <input
                    type="text"
                    placeholder="e.g. 14-16 hrs/week"
                    value={trackFormData.weeklyCommitment}
                    onChange={e => setTrackFormData(prev => ({ ...prev, weeklyCommitment: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Tagline / Industry Scope *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the learning outcomes, target MNC roles, and core hardware/software toolchain..."
                  value={trackFormData.tagline}
                  onChange={e => setTrackFormData(prev => ({ ...prev, tagline: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsTrackModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{isAddingNewTrack ? 'Create Track' : 'Update Track'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
