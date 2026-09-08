import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Wrench, 
  BookOpen, 
  Layers, 
  Cpu, 
  Terminal, 
  CircuitBoard, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Filter,
  Sparkles,
  Zap,
  X,
  TrendingUp,
  Banknote,
  Clock,
  AlertTriangle,
  ShieldAlert,
  ArrowRightLeft,
  FileSpreadsheet,
  GitFork,
  Download,
  Copy,
  Check,
  CheckCheck,
  Table,
  LayoutGrid
} from 'lucide-react';
import { MASTER_SUBDOMAINS, getSubdomainsBySuperDomain, ALL_SUBDOMAINS } from '../data/classificationData';
import { ClassificationType, SubdomainDetail, JobProfileClassification, SkillProfileClassification, KnowledgeProfileClassification } from '../types';
import { SUBDOMAIN_DOSSIERS } from '../data/subdomains/dossierData';
import { ClassificationDossierModal } from './ClassificationDossierModal';
import { SubdomainComparatorModal } from './SubdomainComparatorModal';

interface ClassificationMatrixSectionProps {
  onNavigateToCurriculum?: () => void;
  onNavigateToCareerPrep?: () => void;
  onNavigateToEncyclopedia?: () => void;
  onNavigateToTools?: () => void;
  compactMode?: boolean;
}

export const ClassificationMatrixSection: React.FC<ClassificationMatrixSectionProps> = ({
  onNavigateToCurriculum,
  onNavigateToCareerPrep,
  onNavigateToEncyclopedia,
  onNavigateToTools,
  compactMode = false
}) => {
  const [selectedDomain, setSelectedDomain] = useState<'all' | 'vlsi' | 'embedded'>('all');
  const [selectedSubdomainId, setSelectedSubdomainId] = useState<string>('frontend');
  const [activeClassification, setActiveClassification] = useState<ClassificationType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // View mode: Cards vs Dense Matrix Table vs Silicon Lifecycle Flow
  const [viewMode, setViewMode] = useState<'cards' | 'matrix_table' | 'silicon_flow'>('cards');

  // Modals
  const [inspectDossierId, setInspectDossierId] = useState<string | null>(null);
  const [isComparatorOpen, setIsComparatorOpen] = useState<boolean>(false);
  const [hasCopiedMatrix, setHasCopiedMatrix] = useState<boolean>(false);

  // Filter available subdomains based on domain
  const availableSubdomains = useMemo(() => {
    return getSubdomainsBySuperDomain(selectedDomain);
  }, [selectedDomain]);

  // Ensure selected subdomain is valid
  const currentSubdomain: SubdomainDetail = useMemo(() => {
    const found = availableSubdomains.find(s => s.id === selectedSubdomainId);
    if (found) return found;
    return availableSubdomains[0] || MASTER_SUBDOMAINS[0];
  }, [availableSubdomains, selectedSubdomainId]);

  // Filtered jobs, skills, knowledge matching search
  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return currentSubdomain.jobs;
    const q = searchQuery.toLowerCase();
    return currentSubdomain.jobs.filter(j => 
      j.title.toLowerCase().includes(q) ||
      j.description.toLowerCase().includes(q) ||
      j.targetCompanies.some(c => c.toLowerCase().includes(q)) ||
      j.interviewTopics.some(t => t.toLowerCase().includes(q)) ||
      (j.salaryIndiaCTC && j.salaryIndiaCTC.toLowerCase().includes(q)) ||
      (j.salaryUSRange && j.salaryUSRange.toLowerCase().includes(q)) ||
      (j.industryDemandLevel && j.industryDemandLevel.toLowerCase().includes(q)) ||
      (j.standardProcessNodes && j.standardProcessNodes.some(p => p.toLowerCase().includes(q)))
    );
  }, [currentSubdomain, searchQuery]);

  const filteredSkills = useMemo(() => {
    if (!searchQuery.trim()) return currentSubdomain.skills;
    const q = searchQuery.toLowerCase();
    return currentSubdomain.skills.filter(s => 
      s.name.toLowerCase().includes(q) ||
      s.industryRelevance.toLowerCase().includes(q) ||
      s.tools.some(t => t.toLowerCase().includes(q)) ||
      s.practicalProjectEvidence.toLowerCase().includes(q) ||
      (s.standardsCompliance && s.standardsCompliance.some(sc => sc.toLowerCase().includes(q))) ||
      (s.industrialBenchmark && s.industrialBenchmark.toLowerCase().includes(q))
    );
  }, [currentSubdomain, searchQuery]);

  const filteredKnowledge = useMemo(() => {
    if (!searchQuery.trim()) return currentSubdomain.knowledge;
    const q = searchQuery.toLowerCase();
    return currentSubdomain.knowledge.filter(k => 
      k.concept.toLowerCase().includes(q) ||
      k.whyCrucial.toLowerCase().includes(q) ||
      k.keyQuestions.some(qn => qn.toLowerCase().includes(q)) ||
      (k.whiteboardFormulas && k.whiteboardFormulas.some(f => f.toLowerCase().includes(q))) ||
      (k.deepAnalysisExplanation && k.deepAnalysisExplanation.toLowerCase().includes(q)) ||
      (k.siliconImpact && k.siliconImpact.toLowerCase().includes(q)) ||
      (k.mitigationTechniques && k.mitigationTechniques.some(m => m.toLowerCase().includes(q)))
    );
  }, [currentSubdomain, searchQuery]);

  // Silicon lifecycle 10-stage pipeline data
  const siliconLifecycleStages = [
    { num: '01', title: 'Architecture & Spec', subdomainId: 'frontend', role: 'SoC Architect', desc: 'Define ISA, AMBA interconnects, and microarchitecture block boundaries.' },
    { num: '02', title: 'RTL Microarchitecture', subdomainId: 'frontend', role: 'RTL Design Engineer', desc: 'FSMs, synthesizable SystemVerilog, datapath pipelining, and clock gating.' },
    { num: '03', title: 'Pre-Silicon Verification', subdomainId: 'frontend', role: 'Design Verification Engineer', desc: 'UVM testbenches, constrained-random stimulus, assertions (SVA), 100% coverage.' },
    { num: '04', title: 'Analog / Mixed-Signal', subdomainId: 'analog-mixed-signal', role: 'AMS IC Designer', desc: 'Transistor-level schematics in Cadence Virtuoso, Bandgaps, PLLs, ADCs, and LDOs.' },
    { num: '05', title: 'Logic Synthesis & STA', subdomainId: 'backend', role: 'Synthesis / STA Engineer', desc: 'RTL to gate-level netlist in Synopsys Design Compiler with SDC timing constraints.' },
    { num: '06', title: 'P&R / CTS / Routing', subdomainId: 'backend', role: 'Physical Design Engineer', desc: 'Floorplanning, clock tree synthesis (CTS), power grid routing in Innovus/ICC2.' },
    { num: '07', title: 'Physical Signoff & Tapeout', subdomainId: 'backend', role: 'Signoff Engineer', desc: 'Calibre DRC/LVS, dummy metal fill, Antenna signoff, and GDSII generation.' },
    { num: '08', title: 'Silicon Bringup & ATE', subdomainId: 'post-silicon-validation', role: 'Validation / ATE Engineer', desc: 'Wafer probe test patterns, lab oscilloscopes, thermal chambers, and silicon bug hunting.' },
    { num: '09', title: 'Board Support Package (BSP)', subdomainId: 'embedded-baremetal', role: 'Baremetal / BSP Engineer', desc: 'Bootloaders, peripheral register maps, interrupt controllers, and hardware bringup.' },
    { num: '10', title: 'Embedded RTOS & Safety', subdomainId: 'embedded-automotive-safety', role: 'Embedded Systems Engineer', desc: 'FreeRTOS/Zephyr, ISO 26262 ASIL-D fault mitigation, MISRA-C compliance.' }
  ];

  // Quick export matrix as markdown
  const handleCopyMatrixMarkdown = () => {
    let md = `# Semiconductor Subdomain Taxonomy Matrix\n\n`;
    md += `| Subdomain | Domain | Top Role | India CTC (Entry - Lead) | US Base | Tapeout Risk / Failure |\n`;
    md += `|---|---|---|---|---|---|\n`;
    ALL_SUBDOMAINS.forEach(sub => {
      const d = SUBDOMAIN_DOSSIERS[sub.id];
      const entryCtc = d ? d.compensationLadder[0].indiaCTC : '₹12L - ₹20L';
      const leadCtc = d ? d.compensationLadder[2].indiaCTC : '₹35L - ₹65L';
      const usBase = d ? d.compensationLadder[0].usRange : '$105k - $140k';
      const risk = d ? d.siliconFailureCaseStudy.failureMode : 'Timing & functional bugs';
      md += `| ${sub.name} | ${sub.domainName} | ${sub.jobs[0]?.title || 'Hardware Engineer'} | ${entryCtc} to ${leadCtc} | ${usBase} | ${risk} |\n`;
    });

    navigator.clipboard.writeText(md);
    setHasCopiedMatrix(true);
    setTimeout(() => setHasCopiedMatrix(false), 2000);
  };

  return (
    <div id="domain-classification-matrix" className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 shadow-2xs space-y-5">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Industrial Taxonomy Matrix &bull; {MASTER_SUBDOMAINS.length} Subdomains Active</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
            Engineering Domain &amp; Subdomain Classification
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            Deeply researched breakdown of VLSI and Embedded engineering tracks categorized by real-world Job Profiles (India ₹ CTC / US Ranges), Technical Competencies (Signoff Benchmarks), and Core Engineering Knowledge (Physical Reality &amp; Failure Modes).
          </p>
        </div>

        {/* Global Controls & Search */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Compare Button */}
          <button
            onClick={() => setIsComparatorOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Open side-by-side subdomain comparator"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-600" />
            <span>Head-to-Head Compare</span>
          </button>

          {/* Search inside Matrix with Clear Button */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search roles, salaries, tools, physics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all text-neutral-800 placeholder-neutral-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5 rounded-full hover:bg-neutral-200 transition-all cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced View Mode Toggle Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-neutral-50 p-2 rounded-xl border border-neutral-200">
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider px-2">
            View:
          </span>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
              viewMode === 'cards'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Detailed Cards</span>
          </button>

          <button
            onClick={() => setViewMode('matrix_table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
              viewMode === 'matrix_table'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Industry Table Grid (8 Subdomains)</span>
          </button>

          <button
            onClick={() => setViewMode('silicon_flow')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
              viewMode === 'silicon_flow'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Silicon Lifecycle Flow (10 Stages)</span>
          </button>
        </div>

        {/* Technical Dossier Quick Access Trigger */}
        <button
          onClick={() => setInspectDossierId(currentSubdomain.id)}
          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors self-start sm:self-auto shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Inspect {currentSubdomain.name.split(' ')[0]} Dossier</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE 1: MATRIX TABLE (ALL 8 SUBDOMAINS COMPARISON) */}
      {/* ========================================================================= */}
      {viewMode === 'matrix_table' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <Table className="w-4 h-4 text-indigo-600" />
                <span>Semiconductor Industry Cross-Subdomain Benchmark Grid</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Head-to-head comparison across starting CTCs, signoff standards, EDA suites, and failure physics.
              </p>
            </div>

            <button
              onClick={handleCopyMatrixMarkdown}
              className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Copy Table as Markdown"
            >
              {hasCopiedMatrix ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{hasCopiedMatrix ? 'Copied Markdown' : 'Export Table (.md)'}</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-neutral-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="p-3 font-semibold">Subdomain</th>
                  <th className="p-3 font-semibold">Domain</th>
                  <th className="p-3 font-semibold">Flagship Role</th>
                  <th className="p-3 font-semibold">India CTC (0-2y &rarr; Lead)</th>
                  <th className="p-3 font-semibold">US Base</th>
                  <th className="p-3 font-semibold">Industry Signoff Standard</th>
                  <th className="p-3 font-semibold">Core EDA Toolchain</th>
                  <th className="p-3 font-semibold">Tapeout Risk</th>
                  <th className="p-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {ALL_SUBDOMAINS.map((sub, idx) => {
                  const dossier = SUBDOMAIN_DOSSIERS[sub.id];
                  return (
                    <tr key={sub.id} className={idx % 2 === 0 ? 'bg-white hover:bg-neutral-50' : 'bg-neutral-50/60 hover:bg-neutral-100/60'}>
                      <td className="p-3 font-bold text-neutral-900 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedSubdomainId(sub.id);
                            setViewMode('cards');
                          }}
                          className="text-indigo-600 hover:text-indigo-900 hover:underline cursor-pointer text-left"
                        >
                          {sub.name}
                        </button>
                      </td>
                      <td className="p-3 text-neutral-600 whitespace-nowrap font-medium">
                        {sub.domainName}
                      </td>
                      <td className="p-3 font-semibold text-neutral-800 whitespace-nowrap">
                        {sub.jobs[0]?.title || 'Hardware Engineer'}
                      </td>
                      <td className="p-3 font-mono font-bold text-emerald-800 whitespace-nowrap">
                        {dossier ? `${dossier.compensationLadder[0].indiaCTC} &rarr; ${dossier.compensationLadder[2].indiaCTC}` : '₹12L - ₹45L'}
                      </td>
                      <td className="p-3 font-mono text-indigo-700 whitespace-nowrap">
                        {dossier ? dossier.compensationLadder[0].usRange : '$110k+'}
                      </td>
                      <td className="p-3 text-neutral-600 max-w-[200px] truncate" title={sub.skills[0]?.standardsCompliance?.join(', ')}>
                        {sub.skills[0]?.standardsCompliance?.join(', ') || 'IEEE 1800, AMBA AXI'}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-neutral-700 max-w-[180px] truncate" title={sub.skills[0]?.tools?.join(', ')}>
                        {sub.skills[0]?.tools?.join(', ')}
                      </td>
                      <td className="p-3 text-rose-800 font-medium max-w-[200px] truncate" title={dossier?.siliconFailureCaseStudy.failureMode}>
                        {dossier ? dossier.siliconFailureCaseStudy.failureMode : 'Timing & functional hazards'}
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => setInspectDossierId(sub.id)}
                          className="px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-semibold cursor-pointer transition-colors"
                        >
                          Dossier
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2: SILICON LIFECYCLE 10-STAGE PIPELINE */}
      {/* ========================================================================= */}
      {viewMode === 'silicon_flow' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <GitFork className="w-4 h-4 text-indigo-600" />
                <span>End-to-End Silicon Lifecycle Flowchart (10 Core Stages)</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                From architectural spec definition to foundry tapeout and post-silicon firmware bringup. Click any stage to inspect its subdomain.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {siliconLifecycleStages.map((stage) => {
              const isCurrent = currentSubdomain.id === stage.subdomainId;

              return (
                <div
                  key={stage.num}
                  onClick={() => {
                    setSelectedSubdomainId(stage.subdomainId);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-500/20'
                      : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-2xs'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-indigo-600 px-1.5 py-0.2 rounded bg-indigo-100">
                        {stage.num}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-neutral-400">
                        Stage
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-neutral-900 pt-1">
                      {stage.title}
                    </h4>

                    <div className="text-[11px] font-semibold text-indigo-700">
                      {stage.role}
                    </div>

                    <p className="text-[11px] text-neutral-600 leading-relaxed pt-1">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-500">
                    <span>Inspect Subdomain</span>
                    <ArrowRight className="w-3 h-3 text-indigo-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 3: DETAILED CARDS & MATRIX BREAKDOWN */}
      {/* ========================================================================= */}
      {viewMode === 'cards' && (
        <>
          {/* Level 1: Domain Selector (VLSI vs Embedded vs All) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider mr-1">
              1. Domain:
            </span>
            <button
              onClick={() => {
                setSelectedDomain('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedDomain === 'all'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70 hover:text-neutral-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Domains ({MASTER_SUBDOMAINS.length})</span>
            </button>

            <button
              onClick={() => {
                setSelectedDomain('vlsi');
                if (currentSubdomain.domainId !== 'vlsi') {
                  setSelectedSubdomainId('frontend');
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedDomain === 'vlsi'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100/70'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>VLSI &amp; Silicon Design (5 Subdomains)</span>
            </button>

            <button
              onClick={() => {
                setSelectedDomain('embedded');
                if (currentSubdomain.domainId !== 'embedded') {
                  setSelectedSubdomainId('embedded-baremetal');
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedDomain === 'embedded'
                  ? 'bg-cyan-600 text-white shadow-2xs'
                  : 'bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100/70'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Embedded Systems &amp; Firmware (3 Subdomains)</span>
            </button>
          </div>

          {/* Level 2: Subdomain Tabs */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
              2. Subdomain:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5">
              {availableSubdomains.map(sub => {
                const isSelected = sub.id === currentSubdomain.id;
                let IconComponent = Cpu;
                if (sub.id === 'backend') IconComponent = Layers;
                if (sub.id === 'analog-mixed-signal') IconComponent = Sparkles;
                if (sub.id === 'fpga-emulation') IconComponent = CircuitBoard;
                if (sub.id === 'post-silicon-validation') IconComponent = ShieldCheck;
                if (sub.id === 'embedded-baremetal') IconComponent = Terminal;
                if (sub.id === 'embedded-rtos-linux') IconComponent = Zap;
                if (sub.id === 'embedded-automotive-safety') IconComponent = ShieldAlert;

                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubdomainId(sub.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-white hover:border-neutral-300'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                    <span>{sub.name.split(' (')[0]}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {sub.jobs.length + sub.skills.length + sub.knowledge.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subdomain Active Banner */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-neutral-900">{currentSubdomain.name}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-neutral-200 text-neutral-600">
                  {currentSubdomain.domainName}
                </span>
                <span className="text-[10px] text-neutral-500 font-medium italic">
                  "{currentSubdomain.tagline}"
                </span>
              </div>
              <p className="text-xs text-neutral-600 mt-1 max-w-3xl">
                {currentSubdomain.description}
              </p>
            </div>

            {/* Level 3: Classification Selector (All | Job | Skill | Knowledge) */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-neutral-200 shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setActiveClassification('all')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  activeClassification === 'all'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All Matrix
              </button>
              <button
                onClick={() => setActiveClassification('job')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  activeClassification === 'job'
                    ? 'bg-indigo-600 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Briefcase className="w-3 h-3" />
                <span>Jobs ({currentSubdomain.jobs.length})</span>
              </button>
              <button
                onClick={() => setActiveClassification('skill')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  activeClassification === 'skill'
                    ? 'bg-amber-600 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Wrench className="w-3 h-3" />
                <span>Skills ({currentSubdomain.skills.length})</span>
              </button>
              <button
                onClick={() => setActiveClassification('knowledge')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  activeClassification === 'knowledge'
                    ? 'bg-emerald-600 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>Knowledge ({currentSubdomain.knowledge.length})</span>
              </button>
            </div>
          </div>

          {/* CLASSIFICATION CONTENT DISPLAY */}
          <div className="space-y-6 pt-1">
            {/* ========================================================================= */}
            {/* 1. CLASSIFICATION BASED ON JOB ROLES */}
            {/* ========================================================================= */}
            {(activeClassification === 'all' || activeClassification === 'job') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                      Classification Based on Job Roles ({filteredJobs.length} Targeted Roles)
                    </h3>
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">
                    Roles &bull; Compensation &bull; Interview Rounds &bull; Deliverables
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredJobs.map((job) => (
                    <div 
                      key={job.id}
                      className="rounded-xl border border-neutral-200 p-4 bg-white hover:border-neutral-300 transition-all space-y-3.5 flex flex-col justify-between shadow-2xs"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                              {job.title}
                            </h4>
                            <p className="text-xs text-neutral-500 mt-0.5">
                              {job.description}
                            </p>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 whitespace-nowrap shrink-0">
                            {job.experienceTier}
                          </span>
                        </div>

                        {/* Real Industry Compensation & Demand Badges */}
                        {(job.salaryIndiaCTC || job.salaryUSRange || job.industryDemandLevel) && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            {job.salaryIndiaCTC && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                                <Banknote className="w-3 h-3 text-emerald-600" />
                                <span>India: {job.salaryIndiaCTC}</span>
                              </span>
                            )}
                            {job.salaryUSRange && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
                                <span>US: {job.salaryUSRange}</span>
                              </span>
                            )}
                            {job.industryDemandLevel && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                                job.industryDemandLevel === 'Surging'
                                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}>
                                <TrendingUp className="w-3 h-3" />
                                <span>Demand: {job.industryDemandLevel}</span>
                              </span>
                            )}
                          </div>
                        )}

                        {/* Standard Process Nodes */}
                        {job.standardProcessNodes && job.standardProcessNodes.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                              Standard Foundry Nodes:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {job.standardProcessNodes.map((node, i) => (
                                <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-700 font-mono">
                                  {node}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Key Responsibilities */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                            Key Responsibilities:
                          </span>
                          <ul className="space-y-1 text-xs text-neutral-700">
                            {(job.keyResponsibilities || []).map((resp, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-indigo-600 font-bold">&bull;</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Target Companies */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                            Active Employers:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {job.targetCompanies.map((c, i) => (
                              <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Interview Topics */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                            Core Interview Evaluation:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {job.interviewTopics.map((topic, i) => (
                              <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-indigo-50/70 border border-indigo-100 text-indigo-800">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-neutral-500">
                          {job.primaryDeliverables ? job.primaryDeliverables.join(', ') : 'RTL/Verification signoff'}
                        </span>
                        <button
                          onClick={() => setInspectDossierId(currentSubdomain.id)}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                        >
                          <span>Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 2. CLASSIFICATION BASED ON TECHNICAL SKILLS */}
            {/* ========================================================================= */}
            {(activeClassification === 'all' || activeClassification === 'skill') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Wrench className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                      Classification Based on Technical Competencies ({filteredSkills.length} Core Skills)
                    </h3>
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">
                    Tools &bull; Standards &bull; Signoff Benchmarks &bull; Proof-of-Work
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredSkills.map((skill) => (
                    <div 
                      key={skill.id}
                      className="rounded-xl border border-neutral-200 p-4 bg-white hover:border-neutral-300 transition-all space-y-3 flex flex-col justify-between shadow-2xs"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-neutral-900">
                            {skill.name}
                          </h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            skill.proficiencyLevel === 'Foundational'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : skill.proficiencyLevel === 'Core Industrial'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}>
                            {skill.proficiencyLevel}
                          </span>
                        </div>

                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {skill.industryRelevance}
                        </p>

                        {/* Industrial Signoff Benchmark */}
                        {skill.industrialBenchmark && (
                          <div className="p-2.5 rounded-lg bg-neutral-900 text-white space-y-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block font-bold">
                              Production Signoff Benchmark:
                            </span>
                            <p className="text-xs font-mono text-neutral-200 leading-snug">
                              {skill.industrialBenchmark}
                            </p>
                          </div>
                        )}

                        {/* Standards Compliance */}
                        {skill.standardsCompliance && skill.standardsCompliance.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                              IEEE &amp; Industrial Standards:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {skill.standardsCompliance.map((std, i) => (
                                <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                                  {std}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tools */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                            Associated Industrial Tools:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {skill.tools.map((tool, i) => (
                              <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-800">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Practical Project Evidence */}
                        <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/80 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block">
                            Candidate Proof-of-Work Deliverable:
                          </span>
                          <p className="text-xs text-neutral-700 font-medium leading-relaxed">
                            {skill.practicalProjectEvidence}
                          </p>
                        </div>
                      </div>

                      {/* Proficiency Progression Footer */}
                      <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] font-bold uppercase text-neutral-400">
                          Mastery Criteria:
                        </span>
                        <span className="text-[11px] font-mono text-neutral-600">
                          {skill.masteryCriteria}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 3. CLASSIFICATION BASED ON CORE KNOWLEDGE */}
            {/* ========================================================================= */}
            {(activeClassification === 'all' || activeClassification === 'knowledge') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                      Classification Based on Core Engineering Knowledge ({filteredKnowledge.length} Concepts)
                    </h3>
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">
                    First-Principles &bull; Silicon Failure Modes &bull; Whiteboard Equations
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredKnowledge.map((know) => (
                    <div 
                      key={know.id}
                      className="rounded-xl border border-neutral-200 p-4 bg-white hover:border-neutral-300 transition-all space-y-3 flex flex-col justify-between shadow-2xs"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-neutral-900">
                            {know.concept}
                          </h4>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Engineering Physics
                          </span>
                        </div>

                        <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                          {know.whyCrucial}
                        </p>

                        {/* Mathematical Whiteboard Formulas */}
                        {know.whiteboardFormulas && know.whiteboardFormulas.length > 0 && (
                          <div className="p-2.5 rounded-lg bg-neutral-950 text-white font-mono space-y-1">
                            <span className="text-[10px] uppercase font-bold text-indigo-400 block tracking-wider">
                              Whiteboard Formula / Invariant:
                            </span>
                            <div className="space-y-0.5">
                              {know.whiteboardFormulas.map((f, i) => (
                                <div key={i} className="text-xs text-amber-300 overflow-x-auto py-0.5">
                                  {f}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Silicon Failure Impact & Physics */}
                        {know.siliconImpact && (
                          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200/80 space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                              <span>Silicon Failure Impact:</span>
                            </span>
                            <p className="text-xs text-rose-900 leading-relaxed">
                              {know.siliconImpact}
                            </p>
                          </div>
                        )}

                        {/* Key Viva / Interview Questions */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider">
                            Key Conceptual Interview Questions:
                          </span>
                          <ul className="space-y-1">
                            {know.keyQuestions.map((q, i) => (
                              <li key={i} className="text-xs text-neutral-700 flex items-start gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                <span>{q}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Interview Emphasis Footer */}
                      <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] font-bold uppercase text-neutral-400">
                          Evaluation Focus:
                        </span>
                        <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                          {know.interviewEmphasis}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Quick Routing Action Bar */}
      <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-neutral-500 font-medium">
          Integrated into Curriculum Tracks, Career Prep, and Interview Drills across the application.
        </span>

        <div className="flex items-center gap-2">
          {onNavigateToCurriculum && (
            <button
              onClick={onNavigateToCurriculum}
              className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Open Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {onNavigateToCareerPrep && (
            <button
              onClick={onNavigateToCareerPrep}
              className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Open Career Prep</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Slide-Over Dossier Modal */}
      {inspectDossierId && (
        <ClassificationDossierModal
          subdomainId={inspectDossierId}
          onClose={() => setInspectDossierId(null)}
          onNavigateToTools={onNavigateToTools}
          onNavigateToCurriculum={onNavigateToCurriculum}
          onNavigateToEncyclopedia={onNavigateToEncyclopedia}
        />
      )}

      {/* Subdomain Comparator Modal */}
      {isComparatorOpen && (
        <SubdomainComparatorModal
          initialLeftId={currentSubdomain.id}
          initialRightId={currentSubdomain.id === 'frontend' ? 'backend' : 'frontend'}
          onClose={() => setIsComparatorOpen(false)}
          onSelectDossier={(id) => {
            setIsComparatorOpen(false);
            setInspectDossierId(id);
          }}
        />
      )}
    </div>
  );
};
