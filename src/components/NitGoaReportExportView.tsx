import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Copy, 
  Download, 
  CheckCheck, 
  Printer, 
  ExternalLink, 
  Eye, 
  Code, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Share2,
  Bookmark,
  Sparkles,
  BookOpen,
  Building2,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { FULL_NIT_GOA_STRATEGY_REPORT_MD } from '../data/nitGoaRoadmapData';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getStudentCollegeProfile } from '../utils/storage';
import { 
  StudentCollegeProfile, 
  generateUniversalStrategyReportMd,
  BRANCH_PIVOT_STRATEGIES,
  UNIVERSAL_LAB_STACKS
} from '../data/universalCollegeData';

interface NitGoaReportExportViewProps {
  onBackToStrategy?: () => void;
  onNavigateToCompanies?: () => void;
}

export const NitGoaReportExportView: React.FC<NitGoaReportExportViewProps> = ({
  onBackToStrategy,
  onNavigateToCompanies
}) => {
  const [studentProfile] = useState<StudentCollegeProfile>(() => getStudentCollegeProfile());
  const [reportSource, setReportSource] = useState<'universal' | 'nit_goa'>(() => {
    return studentProfile.collegeTierId === 'nit-goa' ? 'nit_goa' : 'universal';
  });
  const [viewMode, setViewMode] = useState<'formatted' | 'markdown'>('formatted');
  const [hasCopied, setHasCopied] = useState(false);
  const [copyStatusMsg, setCopyStatusMsg] = useState<string | null>(null);
  const [downloadFailed, setDownloadFailed] = useState(false);
  const rawTextareaRef = useRef<HTMLTextAreaElement>(null);

  const activeBranch = BRANCH_PIVOT_STRATEGIES.find(b => b.branchId === studentProfile.department) || BRANCH_PIVOT_STRATEGIES[0];
  const activeLab = UNIVERSAL_LAB_STACKS.find(l => l.tierId === studentProfile.labAccessTier) || UNIVERSAL_LAB_STACKS[1];

  const activeReportMd = reportSource === 'nit_goa'
    ? FULL_NIT_GOA_STRATEGY_REPORT_MD
    : generateUniversalStrategyReportMd(studentProfile);

  const reportFileName = reportSource === 'nit_goa'
    ? 'NIT_Goa_EEE_VLSI_Career_Strategy_Report.md'
    : `${studentProfile.collegeName.replace(/[^a-zA-Z0-9]/g, '_')}_Semiconductor_Strategy_Report.md`;

  // Bulletproof copy function supporting iframes and sandbox restrictions
  const handleCopyReport = async () => {
    let success = false;
    
    // Method 1: Try modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(activeReportMd);
        success = true;
      } catch (err) {
        console.warn('Navigator clipboard failed, falling back to textarea execCommand', err);
      }
    }

    // Method 2: Fallback using temporary textarea
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
        success = false;
      }
    }

    if (success) {
      setHasCopied(true);
      setCopyStatusMsg('✓ Full Markdown copied to clipboard! Paste into Obsidian, Notion, or VS Code.');
      setTimeout(() => {
        setHasCopied(false);
        setCopyStatusMsg(null);
      }, 4000);
    } else {
      // If both copy methods fail (e.g. strict sandbox), switch to raw markdown mode and select text
      setViewMode('markdown');
      setCopyStatusMsg('⚠️ Clipboard access restricted in iframe. The text is displayed below for manual selection (Ctrl+A / Ctrl+C).');
      setTimeout(() => {
        if (rawTextareaRef.current) {
          rawTextareaRef.current.select();
        }
      }, 100);
    }
  };

  // Safe file download with error detection for sandboxed iframes
  const handleDownloadReport = () => {
    try {
      const blob = new Blob([activeReportMd], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = reportFileName;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (err) {
      console.warn('Automatic download could not complete in current iframe sandbox', err);
      setDownloadFailed(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSelectAllMarkdown = () => {
    if (rawTextareaRef.current) {
      rawTextareaRef.current.focus();
      rawTextareaRef.current.select();
      document.execCommand('copy');
      setHasCopied(true);
      setCopyStatusMsg('✓ All text selected and copied!');
      setTimeout(() => {
        setHasCopied(false);
        setCopyStatusMsg(null);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Notification */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-neutral-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          {onBackToStrategy && (
            <button
              onClick={onBackToStrategy}
              className="font-bold text-neutral-800 hover:text-indigo-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Interactive Plan</span>
            </button>
          )}
          {onBackToStrategy && <span>&bull;</span>}
          <span className="font-semibold text-neutral-700">Official Strategy Document</span>
          <span>&bull;</span>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Verbatim 9 Sections
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-neutral-100 p-1 rounded-lg border border-neutral-200/80 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('formatted')}
            className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'formatted' 
                ? 'bg-white text-neutral-900 shadow-xs' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Formatted Document</span>
          </button>
          <button
            onClick={() => setViewMode('markdown')}
            className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'markdown' 
                ? 'bg-white text-neutral-900 shadow-xs' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Raw Markdown (.md)</span>
          </button>
        </div>
      </div>

      {/* Copy Notification Toast / Alert */}
      {copyStatusMsg && (
        <div className="p-3 bg-emerald-900 text-emerald-100 rounded-xl text-xs font-medium flex items-center justify-between border border-emerald-700 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{copyStatusMsg}</span>
          </div>
          <button 
            onClick={() => setCopyStatusMsg(null)}
            className="text-emerald-300 hover:text-white text-xs underline cursor-pointer ml-3"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Primary Action Hero Card */}
      <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-950 rounded-2xl p-6 text-white border border-neutral-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>NIT Goa EEE &bull; Official Career Strategy Report</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Academic Transition Strategy &bull; 6th Semester Onwards
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Complete, authoritative 9-section report transcribed verbatim from the NIT Goa academic plan. 
              Provides exact elective justifications, semester-by-semester milestones, specialization formulas, 
              and top tier semiconductor recruitment alignments.
            </p>
          </div>

          {/* Action Buttons Box */}
          <div className="flex flex-wrap items-center gap-2.5 p-3 bg-neutral-900/90 rounded-xl border border-neutral-700/80 shrink-0">
            <button
              onClick={handleCopyReport}
              className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
              title="Copy the entire Markdown text to clipboard"
            >
              {hasCopied ? <CheckCheck className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
              <span>{hasCopied ? 'Markdown Copied!' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadReport}
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
              title="Download as NIT_Goa_EEE_VLSI_Career_Strategy_Report.md"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Export .md File</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors border border-neutral-700"
              title="Print formatted document or save to PDF"
            >
              <Printer className="w-4 h-4 text-neutral-400" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Sandbox Note */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400 flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Document includes: Handbook URLs, EE541 recovery analysis, EE545 priorities, 4-tier formulas & 7 MNC skill alignments.</span>
          </div>
          <div className="text-neutral-500">
            Format: CommonMark Standard (.md) &bull; 688 lines &bull; Ready for Obsidian / GitHub
          </div>
        </div>
      </div>

      {/* Quick Section Navigator Pills */}
      {reportSource === 'nit_goa' ? (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-xs">
          <span className="text-neutral-400 font-bold px-1 whitespace-nowrap text-[11px] uppercase tracking-wider">
            Jump to:
          </span>
          {[
            { id: 'sec-1', label: '1. References' },
            { id: 'sec-2', label: '2. Progress (Sem 1-5)' },
            { id: 'sec-3', label: '3. EE541 Analysis' },
            { id: 'sec-4', label: '4. Sem 6-8 Plan' },
            { id: 'sec-5', label: '5. Skill Timeline' },
            { id: 'sec-6', label: '6. Skill Stack Goal' },
            { id: 'sec-7', label: '7. Formulas & Matrix' },
            { id: 'sec-8', label: '8. MNC Skill Maps' },
            { id: 'sec-9', label: '9. Final Roadmap' },
          ].map(pill => (
            <a
              key={pill.id}
              href={`#${pill.id}`}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-indigo-50 border border-neutral-200 hover:border-indigo-300 text-neutral-700 hover:text-indigo-700 whitespace-nowrap font-medium transition-colors shadow-2xs"
            >
              {pill.label}
            </a>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-xs">
          <span className="text-neutral-400 font-bold px-1 whitespace-nowrap text-[11px] uppercase tracking-wider">
            Sections:
          </span>
          {[
            '1. Institutional Context',
            '2. Branch Pivot Defense',
            '3. Zero-Cost Silicon Lab',
            '4. Contests & Hackathons',
            '5. Capstone Matrix',
            '6. MNC Verification Gates',
            '7. Semester Milestones'
          ].map((title, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-700 whitespace-nowrap font-medium shadow-2xs"
            >
              {title}
            </span>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      {viewMode === 'formatted' ? (
        reportSource === 'universal' ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-2xs space-y-6 text-neutral-900 font-sans leading-relaxed">
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-indigo-700" />
                  <span>Customized for {studentProfile.collegeName}</span>
                </span>
                <p className="text-indigo-900/80 mt-0.5">
                  Branch: <strong>{activeBranch.name}</strong> &bull; Semester: <strong>{studentProfile.semester.toUpperCase()}</strong> &bull; Lab Tier: <strong>{activeLab.title.split(':')[0]}</strong>
                </p>
              </div>
              <button
                onClick={() => setViewMode('markdown')}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shrink-0 cursor-pointer transition-colors shadow-xs"
              >
                View Markdown Source
              </button>
            </div>

            <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-950 prose-h1:text-2xl prose-h2:text-xl prose-h2:border-b prose-h2:border-neutral-200 prose-h2:pb-2 prose-h3:text-base prose-p:text-neutral-700 prose-li:text-neutral-700 prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-code:text-indigo-700">
              <Markdown remarkPlugins={[remarkGfm]}>{activeReportMd}</Markdown>
            </div>
          </div>
        ) : (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-2xs space-y-10 text-neutral-900 font-sans leading-relaxed">
          
          {/* Section 1 */}
          <section id="sec-1" className="space-y-3 scroll-mt-20">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">1</span>
              <h2 className="text-lg font-bold text-neutral-900">Source References</h2>
            </div>
            <p className="text-sm text-neutral-600">
              Official NIT Goa academic information sources used:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://www.nitgoa.ac.in/academics/rules_and_regulations.html"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-200 transition-colors flex items-start justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-indigo-600 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>NIT Goa Academic Handbook / Curriculum</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1 font-mono break-all">
                    nitgoa.ac.in/academics/rules_and_regulations.html
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-indigo-600 shrink-0 ml-2" />
              </a>

              <a
                href="https://www.nitgoa.ac.in/syllabus.html"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-200 transition-colors flex items-start justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-indigo-600 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                    <span>NIT Goa Syllabus Portal</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1 font-mono break-all">
                    nitgoa.ac.in/syllabus.html
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-indigo-600 shrink-0 ml-2" />
              </a>
            </div>
            <p className="text-xs text-neutral-500 italic bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              * Note: These sources contain UG curriculum structure, elective information, and academic rules. Page numbers may vary between handbook revisions.
            </p>
          </section>

          {/* Section 2 */}
          <section id="sec-2" className="space-y-4 scroll-mt-20 border-t border-neutral-200 pt-8">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">2</span>
              <h2 className="text-lg font-bold text-neutral-900">Current Academic Progress (Till 5th Semester)</h2>
            </div>
            <div className="p-3.5 bg-neutral-100/70 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800">
              Branch: B.Tech Electrical and Electronics Engineering (EEE), NIT Goa
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider text-indigo-700">
                  Completed Foundation (1st&ndash;4th Semester):
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-700">
                  <li>Mathematics and engineering fundamentals</li>
                  <li>Electrical engineering fundamentals</li>
                  <li>Electronics fundamentals</li>
                  <li>Digital Electronics</li>
                  <li>Programming foundation</li>
                  <li>Circuit and control concepts</li>
                </ul>
              </div>

              <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider text-indigo-700">
                  Important VLSI-Related Completed Areas:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-700">
                  <li>Digital Electronics</li>
                  <li>Analog Electronics</li>
                  <li>Microprocessors and Microcontrollers</li>
                  <li>Microprocessor Laboratory</li>
                  <li><strong className="text-indigo-900">Embedded Systems Design (5th Semester elective)</strong></li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-indigo-50/80 rounded-xl border border-indigo-200 space-y-1.5">
              <div className="text-xs font-bold text-indigo-950">Current Technical Direction:</div>
              <p className="text-xs text-indigo-900 font-medium">
                EEE + Embedded Systems + Verilog/SystemVerilog self-learning
              </p>
              <div className="text-xs font-bold text-emerald-800 pt-1">
                Assessment: The foundation is suitable for moving toward: RTL Design, SoC Design, Design Verification, FPGA Engineering.
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="sec-3" className="space-y-4 scroll-mt-20 border-t border-neutral-200 pt-8">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">3</span>
              <h2 className="text-lg font-bold text-neutral-900">EE541 Embedded Systems Design Selection Analysis</h2>
            </div>
            <div className="text-xs font-medium text-neutral-600">
              <span className="font-bold text-neutral-800">Originally considered:</span> EE545 FPGA Based Digital Design &bull; <span className="font-bold text-neutral-800">Selected:</span> EE541 Embedded Systems Design
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1.5">
                <div className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Advantages</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-emerald-900">
                  <li>Strong SoC relevance</li>
                  <li>Processor and peripheral understanding</li>
                  <li>Hardware/software interaction</li>
                  <li>Embedded semiconductor applications</li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-1.5">
                <div className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Missing Area</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-amber-900">
                  <li>FPGA implementation flow</li>
                  <li>RTL-to-hardware experience</li>
                </ul>
              </div>

              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 space-y-1.5">
                <div className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Recovery Plan</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-indigo-900">
                  <li>Take FPGA-related elective later if available</li>
                  <li>Complete Vivado projects</li>
                  <li>Build RTL portfolio</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="sec-4" className="space-y-4 scroll-mt-20 border-t border-neutral-200 pt-8">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">4</span>
              <h2 className="text-lg font-bold text-neutral-900">6th Semester Onwards Plan</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 6th Sem */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-300/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">6th Semester</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">Immediate</span>
                </div>
                <div className="text-xs space-y-1 text-neutral-700">
                  <div className="font-semibold text-neutral-900">&bull; Mandatory: Indian Knowledge System (IKS)</div>
                  <div className="p-2.5 bg-indigo-50 rounded-lg border border-indigo-200 text-indigo-950 font-bold">
                    &bull; Main Elective Priority: EE545 FPGA Based Digital Design
                  </div>
                  <p className="text-[11px] text-neutral-600 pt-1">
                    <strong>Reason:</strong> This is the most important missing component.
                  </p>
                  <p className="text-[11px] text-neutral-600">
                    <strong>Expected Learning:</strong> Verilog/SystemVerilog RTL, FPGA architecture, synthesis, timing constraints, hardware implementation.
                  </p>
                </div>
              </div>

              {/* 7th Sem */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-300/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">7th Semester</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-200 text-neutral-800">4 Electives</span>
                </div>
                <div className="text-xs space-y-1.5 text-neutral-700">
                  <div className="font-bold text-neutral-900">Recommended Four Electives:</div>
                  <ol className="list-decimal pl-4 space-y-1 text-neutral-800 font-medium">
                    <li><strong className="text-indigo-900">EE560 VLSI Technology</strong> (Top Priority)</li>
                    <li>EE542 Embedded Control System</li>
                    <li>EE556 Cyber Physical Systems</li>
                    <li>EE543 Digital Signal Processing</li>
                  </ol>
                </div>
              </div>

              {/* 8th Sem */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-300/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">8th Semester</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-200 text-neutral-800">3 Electives</span>
                </div>
                <div className="text-xs space-y-1.5 text-neutral-700">
                  <div className="font-bold text-neutral-900">Recommended Three Electives:</div>
                  <ol className="list-decimal pl-4 space-y-1 text-neutral-800 font-medium">
                    <li><strong className="text-indigo-900">Computer Architecture OE</strong> (Top OE Priority)</li>
                    <li>AI/ML related OE</li>
                    <li>Additional VLSI/hardware elective available</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="sec-5" className="space-y-4 scroll-mt-20 border-t border-neutral-200 pt-8">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">5</span>
              <h2 className="text-lg font-bold text-neutral-900">Skill Development Timeline</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider text-neutral-600">
                  Before 6th Semester:
                </h4>
                <p className="text-neutral-700">
                  Complete Verilog basics &bull; Digital design revision &bull; Learn simulation workflow &bull; Build small RTL modules.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider text-indigo-700">
                  During 6th Semester:
                </h4>
                <p className="text-neutral-700">
                  FPGA flow using Vivado &bull; RTL projects &bull; FSM design &bull; UART/SPI/I2C projects.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider text-neutral-600">
                  During 7th Semester:
                </h4>
                <p className="text-neutral-700">
                  CMOS and VLSI fundamentals &bull; SoC concepts &bull; DSP hardware blocks &bull; Embedded hardware projects.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider text-neutral-600">
                  During 8th Semester:
                </h4>
                <p className="text-neutral-700">
                  RISC-V CPU project &bull; AXI/SoC project &bull; Verification learning &bull; Internship preparation.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="sec-6" className="space-y-4 scroll-mt-20 border-t border-neutral-200 pt-8">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">6</span>
              <h2 className="text-lg font-bold text-neutral-900">Final VLSI Skill Stack Goal</h2>
            </div>

            <div className="p-5 bg-gradient-to-r from-indigo-900 to-neutral-900 text-white rounded-xl space-y-3">
              <div className="text-xs uppercase tracking-wider text-indigo-300 font-bold">
                Target Graduation Profile:
              </div>
              <div className="text-sm sm:text-base font-bold text-white leading-snug">
                EEE Foundation + Embedded Systems Design + FPGA Design + VLSI Technology + Computer Architecture + SystemVerilog + RTL Projects + Verification Basics
              </div>
              <div className="pt-2 border-t border-indigo-800 flex items-center gap-2 flex-wrap text-xs">
                <span className="text-neutral-300 font-medium">Target Roles:</span>
                <span className="px-2 py-0.5 rounded bg-indigo-700/80 text-white font-semibold">RTL Design Engineer</span>
                <span className="px-2 py-0.5 rounded bg-indigo-700/80 text-white font-semibold">SoC Engineer</span>
                <span className="px-2 py-0.5 rounded bg-indigo-700/80 text-white font-semibold">FPGA Engineer</span>
                <span className="px-2 py-0.5 rounded bg-indigo-700/80 text-white font-semibold">Design Verification Engineer</span>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="sec-7" className="space-y-4 scroll-mt-20 border-t border-neutral-200 pt-8">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">7</span>
              <h2 className="text-lg font-bold text-neutral-900">Elective Decision Matrix &amp; Formulas</h2>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Situation &rarr; Decision:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-white rounded-lg border border-neutral-200">
                  <strong className="text-neutral-900">&bull; EE545 FPGA available:</strong> Take immediately.
                </div>
                <div className="p-3 bg-white rounded-lg border border-neutral-200">
                  <strong className="text-neutral-900">&bull; EE545 unavailable:</strong> Take EE560 VLSI Technology and self-learn FPGA.
                </div>
                <div className="p-3 bg-white rounded-lg border border-neutral-200">
                  <strong className="text-neutral-900">&bull; Computer Architecture OE available:</strong> Highest priority OE.
                </div>
                <div className="p-3 bg-white rounded-lg border border-neutral-200">
                  <strong className="text-neutral-900">&bull; AI/ML OE available:</strong> Second OE priority.
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700">Specialization Formulas:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                  <span className="font-bold text-neutral-900">RTL Design interest:</span>
                  <div className="font-mono text-indigo-700 font-semibold text-xs">
                    FPGA + VLSI + Architecture
                  </div>
                </div>
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                  <span className="font-bold text-neutral-900">Verification interest:</span>
                  <div className="font-mono text-indigo-700 font-semibold text-xs">
                    FPGA + Architecture + Embedded + SystemVerilog/UVM
                  </div>
                </div>
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                  <span className="font-bold text-neutral-900">Physical Design interest:</span>
                  <div className="font-mono text-indigo-700 font-semibold text-xs">
                    VLSI Technology + CMOS + Timing
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section id="sec-8" className="space-y-4 scroll-mt-20 border-t border-neutral-200 pt-8">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">8</span>
              <h2 className="text-lg font-bold text-neutral-900">Semiconductor Company Skill Mapping</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {[
                { name: 'Qualcomm', skills: ['SoC architecture', 'RTL', 'SystemVerilog', 'Verification'] },
                { name: 'NVIDIA', skills: ['Computer Architecture', 'RTL', 'Hardware accelerators'] },
                { name: 'AMD', skills: ['FPGA', 'RTL', 'Timing'] },
                { name: 'Intel', skills: ['RTL', 'Verification', 'Architecture'] },
                { name: 'Synopsys', skills: ['RTL', 'Synthesis', 'STA', 'Verification'] },
                { name: 'Cadence', skills: ['IC design', 'Simulation', 'Verification'] },
                { name: 'Siemens EDA', skills: ['Questa', 'SystemVerilog', 'UVM', 'Verification'] },
              ].map(c => (
                <div key={c.name} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5">
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{c.name}</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-neutral-700 text-[11px]">
                    {c.skills.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section 9 */}
          <section id="sec-9" className="space-y-4 scroll-mt-20 border-t border-neutral-200 pt-8">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">9</span>
              <h2 className="text-lg font-bold text-neutral-900">Final Roadmap</h2>
            </div>

            <div className="p-5 bg-neutral-900 text-white rounded-xl space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">1. Current Position</span>
                  <span className="font-bold text-white mt-1 block">EEE + Embedded Systems Design</span>
                </div>
                <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                  <span className="text-amber-400 block text-[10px] uppercase font-bold">2. Next Step</span>
                  <span className="font-bold text-white mt-1 block">FPGA + VLSI Technology</span>
                </div>
                <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                  <span className="text-indigo-400 block text-[10px] uppercase font-bold">3. Then</span>
                  <span className="font-bold text-white mt-1 block">Architecture + Verification + RTL Projects</span>
                </div>
              </div>
              <div className="p-3 bg-emerald-950/80 rounded-lg border border-emerald-700/80 text-emerald-200 text-xs font-semibold">
                Final Outcome: A strong EEE-to-VLSI profile aligned with semiconductor industry requirements.
              </div>
            </div>
          </section>

        </div>
        )
      ) : (
        /* Raw Markdown View Mode */
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-600" />
                <span>Raw Markdown Document (CommonMark)</span>
              </h3>
              <p className="text-xs text-neutral-500">
                You can directly edit, copy, or save this raw text into your personal notes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSelectAllMarkdown}
                className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold cursor-pointer transition-colors border border-neutral-300"
              >
                Select &amp; Copy All
              </button>
              <button
                onClick={handleCopyReport}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                {hasCopied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              ref={rawTextareaRef}
              readOnly
              value={activeReportMd}
              rows={28}
              className="w-full p-4 font-mono text-xs sm:text-sm bg-neutral-900 text-neutral-100 rounded-xl border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed"
            />
          </div>
        </div>
      )}
    </div>
  );
};
