import React, { useState, useMemo } from 'react';
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
  Search
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
  saveEceEeePrepBookmarks
} from '../utils/storage';

interface EceEeePrepTracksViewProps {
  initialFieldId?: string;
  onNavigateToCareers?: (fieldId?: string) => void;
  onNavigateToTools?: () => void;
}

export const EceEeePrepTracksView: React.FC<EceEeePrepTracksViewProps> = ({
  initialFieldId = 'telecom-wireless',
  onNavigateToCareers,
  onNavigateToTools
}) => {
  const [selectedFieldId, setSelectedFieldId] = useState<string>(initialFieldId);
  const [activeSubTab, setActiveSubTab] = useState<'phases' | 'tools' | 'capstone' | 'interviews' | 'resume'>('phases');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Progress & Bookmarks state from localStorage
  const [progressState, setProgressState] = useState<Record<string, boolean>>(() => getEceEeePrepProgress());
  const [bookmarksState, setBookmarksState] = useState<Record<string, boolean>>(() => getEceEeePrepBookmarks());

  const activeTrack = useMemo(() => {
    return ECE_EEE_PREP_TRACKS.find(t => t.fieldId === selectedFieldId) || ECE_EEE_PREP_TRACKS[0];
  }, [selectedFieldId]);

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
  };

  // Toggle bookmark
  const toggleBookmark = (itemId: string) => {
    setBookmarksState(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      saveEceEeePrepBookmarks(next);
      return next;
    });
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

  // Overall statistics across all 6 tracks
  const globalStats = useMemo(() => {
    let totalConcepts = 0;
    let doneConcepts = 0;

    ECE_EEE_PREP_TRACKS.forEach(track => {
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
  }, [progressState]);

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
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                ECE & EEE Dedicated Track
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                Separate from VLSI/Embedded Roadmap
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              ECE & EEE Preparation Tracks & Toolchains
            </h1>
            <p className="text-sm text-neutral-600 mt-1 max-w-3xl leading-relaxed">
              Step-by-step 16-week learning curricula, free & open-source EDA tool setup commands, industrial laboratory workflows, flagship capstone blueprints, and MNC interview drills tailored to the 6 core non-VLSI hardware domains.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onNavigateToCareers && (
              <button
                onClick={() => onNavigateToCareers(selectedFieldId)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-2xs cursor-pointer"
                title="View Compensation Benchmarks, R&D Labs & Regulatory Standards"
              >
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>View Career Report & Hubs</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            )}

            <button
              onClick={exportTrackAsMarkdown}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
              title="Download Complete Markdown Dossier"
            >
              <Download className="w-4 h-4 text-neutral-500" />
              <span>Export Dossier (.md)</span>
            </button>
          </div>
        </div>

        {/* Global Progress Summary Strip */}
        <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-neutral-600">
            <span className="font-medium text-neutral-900">
              Active Track Progress: <strong className="text-emerald-700 font-bold">{trackStats.completedItems}/{trackStats.totalItems} ({trackStats.percent}%)</strong>
            </span>
            <span className="hidden sm:inline text-neutral-300">•</span>
            <span className="hidden sm:inline">
              Global Completed Items: <strong className="text-neutral-900">{globalStats.doneConcepts}/{globalStats.totalConcepts}</strong>
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

      {/* Field Selector Grid (6 Core Domains) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {ECE_EEE_PREP_TRACKS.map(track => {
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
                  {fieldIcons[track.fieldId]}
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

          {/* Quick Cross-Navigation Button to Careers */}
          {onNavigateToCareers && (
            <button
              onClick={() => onNavigateToCareers(activeTrack.fieldId)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-colors cursor-pointer shrink-0 border border-neutral-200"
            >
              <Briefcase className="w-3.5 h-3.5 text-neutral-600" />
              <span>Career Benchmarks for this Field</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
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

      {/* Tab Navigation Controls */}
      <div className="flex items-center justify-between border-b border-neutral-200 gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveSubTab('phases')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'phases'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>4-Phase Learning Path</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeSubTab === 'phases' ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-600'}`}>
              {activeTrack.phases.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('tools')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'tools'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Toolchains & Lab Drills</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeSubTab === 'tools' ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-600'}`}>
              {activeTrack.toolProfiles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('capstone')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'capstone'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Capstone Blueprint</span>
          </button>

          <button
            onClick={() => setActiveSubTab('interviews')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'interviews'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>MNC Interview Whiteboard</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeSubTab === 'interviews' ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-600'}`}>
              {activeTrack.interviewDrills.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('resume')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'resume'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>ATS Resume Bullets</span>
          </button>
        </div>

        {copiedText && (
          <div className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
            <Check className="w-3.5 h-3.5" />
            <span>Copied {copiedText}</span>
          </div>
        )}
      </div>

      {/* SUBTAB 1: 4-Phase Learning Path */}
      {activeSubTab === 'phases' && (
        <div className="space-y-6">
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
    </div>
  );
};
