import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Radio,
  Eye,
  Zap,
  Bot,
  Sun,
  CircuitBoard,
  Search,
  CheckCircle2,
  Building2,
  Wrench,
  FolderGit2,
  HelpCircle,
  TrendingUp,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Layers,
  Cpu,
  GraduationCap,
  MapPin,
  BookOpen,
  Wallet,
  FileText
} from 'lucide-react';
import {
  ECE_EEE_CAREER_FIELDS,
  DIRECT_COMPARATIVE_GUIDE,
  INDIAN_TECH_HUBS,
  EceEeeCareerField
} from '../data/eceEeeCareersData';

interface EceEeeCareersViewProps {
  onNavigateToCareerPrep?: () => void;
  onNavigateToTools?: () => void;
  onNavigateToCurriculum?: () => void;
  onNavigateToPrep?: (fieldId?: string) => void;
}

export const EceEeeCareersView: React.FC<EceEeeCareersViewProps> = ({
  onNavigateToCareerPrep,
  onNavigateToTools,
  onNavigateToCurriculum,
  onNavigateToPrep
}) => {
  // Main view modes
  const [activeMainTab, setActiveMainTab] = useState<'fields' | 'salary_explorer' | 'hardware_lab' | 'tech_hubs' | 'standards_library'>('fields');
  
  // Filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<'All' | 'ECE' | 'EEE' | 'Both'>('All');
  const [demandFilter, setDemandFilter] = useState<string>('All');
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState<'Entry (0-2 yrs)' | 'Mid-Level (3-6 yrs)' | 'Senior / Lead (7-11 yrs)' | 'Principal / Architect (12+ yrs)'>('Entry (0-2 yrs)');
  
  // Accordion state
  const [expandedFieldIds, setExpandedFieldIds] = useState<Record<string, boolean>>({
    'telecom-wireless': true,
    'power-electronics-ev': true
  });

  // Card-level active subtabs: Record<fieldId, subTabName>
  const [cardSubTabs, setCardSubTabs] = useState<Record<string, 'overview' | 'salaries' | 'hardware' | 'standards' | 'rd_centers' | 'academics'>>({
    'telecom-wireless': 'overview',
    'signal-image-vision': 'overview',
    'power-electronics-ev': 'overview',
    'control-robotics-automation': 'overview',
    'renewable-energy-smart-grids': 'overview',
    'pcb-hardware-engineering': 'overview'
  });

  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Field icons mapping
  const fieldIcons: Record<string, React.ReactNode> = {
    'telecom-wireless': <Radio className="w-5 h-5 text-sky-600" />,
    'signal-image-vision': <Eye className="w-5 h-5 text-indigo-600" />,
    'power-electronics-ev': <Zap className="w-5 h-5 text-amber-500" />,
    'control-robotics-automation': <Bot className="w-5 h-5 text-emerald-600" />,
    'renewable-energy-smart-grids': <Sun className="w-5 h-5 text-orange-500" />,
    'pcb-hardware-engineering': <CircuitBoard className="w-5 h-5 text-rose-600" />
  };

  const toggleExpand = (id: string) => {
    setExpandedFieldIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    ECE_EEE_CAREER_FIELDS.forEach(f => { all[f.id] = true; });
    setExpandedFieldIds(all);
  };

  const collapseAll = () => {
    setExpandedFieldIds({});
  };

  const setFieldSubTab = (fieldId: string, tab: 'overview' | 'salaries' | 'hardware' | 'standards' | 'rd_centers' | 'academics') => {
    setCardSubTabs(prev => ({ ...prev, [fieldId]: tab }));
  };

  // Filtered fields based on search & tags
  const filteredFields = useMemo(() => {
    return ECE_EEE_CAREER_FIELDS.filter(field => {
      if (departmentFilter !== 'All' && field.departmentFocus !== departmentFilter) {
        return false;
      }
      if (demandFilter !== 'All' && field.marketDemandTier !== demandFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = field.title.toLowerCase().includes(q);
        const matchesFocus = field.engineeringFocusFull.toLowerCase().includes(q);
        const matchesTech = field.keyTechnologies.some(t => t.toLowerCase().includes(q));
        const matchesSkills = field.skillPrerequisites.some(s => s.toLowerCase().includes(q));
        const matchesEmployers = field.majorEmployers.some(e => e.toLowerCase().includes(q));
        const matchesOverview = field.overview.toLowerCase().includes(q);
        const matchesHardware = field.hardwareKits.some(h => h.name.toLowerCase().includes(q) || h.partNumber.toLowerCase().includes(q));
        const matchesStandards = field.industryStandards.some(s => s.code.toLowerCase().includes(q) || s.title.toLowerCase().includes(q));
        const matchesRd = field.indianRdCenters.some(r => r.company.toLowerCase().includes(q) || r.location.toLowerCase().includes(q));
        return matchesTitle || matchesFocus || matchesTech || matchesSkills || matchesEmployers || matchesOverview || matchesHardware || matchesStandards || matchesRd;
      }
      return true;
    });
  }, [departmentFilter, demandFilter, searchQuery]);

  // Aggregate hardware dev kits across all domains
  const allHardwareKits = useMemo(() => {
    return ECE_EEE_CAREER_FIELDS.flatMap(field => 
      field.hardwareKits.map(kit => ({
        ...kit,
        fieldTitle: field.title,
        fieldId: field.id,
        departmentFocus: field.departmentFocus
      }))
    );
  }, []);

  // Aggregate industry standards across all domains
  const allIndustryStandards = useMemo(() => {
    return ECE_EEE_CAREER_FIELDS.flatMap(field => 
      field.industryStandards.map(std => ({
        ...std,
        fieldTitle: field.title,
        fieldId: field.id,
        departmentFocus: field.departmentFocus
      }))
    );
  }, []);

  // Export comprehensive report to Markdown
  const generateMarkdownReport = () => {
    let md = `# Comprehensive Career Options Report for ECE and EEE (Beyond VLSI & Embedded)\n\n`;
    md += `*Real-World Career Intelligence: Verified Salary Benchmarks, Hardware Dev Kits, Industry Standards, and Indian R&D Hubs across 6 Specialized Domains.*\n\n`;
    md += `---\n\n## 1. Direct Comparative Guide\n\n`;
    md += `| Career Field | Department Focus | Primary Engineering Focus | Skill Prerequisites | Market Demand |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- |\n`;
    DIRECT_COMPARATIVE_GUIDE.forEach(item => {
      md += `| **${item.careerField}** | ${item.departmentAlignment} | ${item.primaryEngineeringFocus} | ${item.skillPrerequisites} | ${item.marketDemand} |\n`;
    });

    md += `\n---\n\n## 2. Real Compensation Benchmarks (India LPA & Global USD)\n\n`;
    ECE_EEE_CAREER_FIELDS.forEach(field => {
      md += `### ${field.title}\n`;
      md += `| Experience Tier | India Range (LPA) | India Median (LPA) | Global Range (USD) | Key Compensation Drivers |\n`;
      md += `| :--- | :--- | :--- | :--- | :--- |\n`;
      field.salaryBenchmarks.forEach(sb => {
        md += `| ${sb.experienceLevel} | ${sb.indiaLpaRange} | ${sb.indiaMedianLpa} | ${sb.globalUsdRange} | ${sb.keyDrivers.join(', ')} |\n`;
      });
      md += `\n`;
    });

    md += `---\n\n## 3. Recommended Hardware Development Kits & Bench Equipment\n\n`;
    ECE_EEE_CAREER_FIELDS.forEach(field => {
      md += `### ${field.title}\n`;
      field.hardwareKits.forEach(kit => {
        md += `- **${kit.name}** (\`${kit.partNumber}\`) by ${kit.manufacturer}\n`;
        md += `  - **Category**: ${kit.category} | **Est. Price**: ${kit.approxPriceInr} / ${kit.approxPriceUsd}\n`;
        md += `  - **Significance**: ${kit.significance}\n`;
        md += `  - **Supported Projects**: ${kit.keyProjectsSupported.join(' • ')}\n\n`;
      });
    });

    md += `---\n\n## 4. Key Industry Standards & Compliance Frameworks\n\n`;
    ECE_EEE_CAREER_FIELDS.forEach(field => {
      md += `### ${field.title}\n`;
      field.industryStandards.forEach(std => {
        md += `- **${std.code}**: ${std.title} (*${std.issuingBody}*)\n`;
        md += `  - **Scope**: ${std.scope}\n`;
        md += `  - **Interview Relevance**: ${std.interviewRelevance}\n\n`;
      });
    });

    md += `---\n\n## 5. Indian R&D Centers & Facilities\n\n`;
    ECE_EEE_CAREER_FIELDS.forEach(field => {
      md += `### ${field.title}\n`;
      field.indianRdCenters.forEach(rd => {
        md += `- **${rd.company}** (${rd.location})\n`;
        md += `  - **Lab Focus**: ${rd.labFocus}\n`;
        md += `  - **Active Hiring Profiles**: ${rd.hiringRoles.join(', ')}\n\n`;
      });
    });

    md += `---\n\n## 6. Academic Preparation Pathways\n\n`;
    ECE_EEE_CAREER_FIELDS.forEach(field => {
      md += `### ${field.title}\n`;
      md += `- **Recommended College Electives**: ${field.academicPathway.recommendedElectives.join(', ')}\n`;
      md += `- **Landmark Textbooks**:\n`;
      field.academicPathway.benchmarkTextbooks.forEach(tb => {
        md += `  - *${tb.title}* by ${tb.author} (${tb.focus})\n`;
      });
      md += `- **Curated NPTEL Courses**:\n`;
      field.academicPathway.nptelCourseraCourses.forEach(c => {
        md += `  - ${c.name} by ${c.institutionOrProf} [${c.platform}]\n`;
      });
      md += `\n`;
    });

    return md;
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdownReport();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ECE_EEE_Comprehensive_Career_Options_Report.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdownReport();
    navigator.clipboard.writeText(md);
    setCopiedNotification('Markdown report copied to clipboard!');
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  // Helper styles
  const getDepartmentBadgeClass = (dept: 'ECE' | 'EEE' | 'Both') => {
    switch (dept) {
      case 'ECE':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'EEE':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Both':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  const getDemandBadgeClass = (tier: 'Massive' | 'Very High' | 'High' | 'Stable') => {
    switch (tier) {
      case 'Massive':
        return 'bg-rose-100 text-rose-800 font-bold border-rose-200';
      case 'Very High':
        return 'bg-purple-100 text-purple-800 font-bold border-purple-200';
      case 'High':
        return 'bg-emerald-100 text-emerald-800 font-bold border-emerald-200';
      case 'Stable':
        return 'bg-neutral-100 text-neutral-800 font-medium border-neutral-200';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-neutral-800 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 rounded-3xl p-6 sm:p-8 text-white border border-neutral-800 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 via-sky-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Beyond VLSI &amp; Embedded Systems
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
                Official Engineering Career Intelligence
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Enriched with Real Salary &amp; Lab Data
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Comprehensive Career Options for ECE &amp; EEE Graduates
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Electronics &amp; Communication (ECE) and Electrical &amp; Electronics (EEE) graduates hold versatile foundations extending far beyond microelectronics and firmware. Explore 6 specialized high-growth domains: Telecommunications &amp; 5G/6G, Signal/Image Processing, Power Electronics &amp; EVs, Robotics &amp; Automation, Smart Grids, and PCB/Hardware Engineering—backed by verified Indian compensation benchmarks, authentic hardware evaluation kits, regulatory standards, and tech hub ecosystems.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>6 Specialized Fields</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified INR &amp; USD Salaries</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CircuitBoard className="w-3.5 h-3.5 text-sky-400" />
                <span>18+ Real Hardware Kits</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Indian R&amp;D Hubs</span>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-row md:flex-col gap-2 shrink-0">
            {onNavigateToPrep && (
              <button
                onClick={() => onNavigateToPrep()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-all shadow-sm cursor-pointer whitespace-nowrap"
                title="Open Dedicated 16-Week Prep Tracks, Toolchains & Capstones"
              >
                <Wrench className="w-4 h-4 text-neutral-950" />
                <span>In-Depth Prep Tracks &amp; Tools</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            )}
            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs border border-neutral-700 transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4 text-neutral-300" />
              <span>Export Full .md Report</span>
            </button>
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs border border-neutral-700 transition-all cursor-pointer whitespace-nowrap"
            >
              <Copy className="w-4 h-4 text-neutral-300" />
              <span>Copy Markdown</span>
            </button>
          </div>
        </div>

        {/* Global Key Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-neutral-800">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-xs text-neutral-400 font-medium">Core Disciplines</span>
            <div className="text-xl font-bold text-white mt-0.5">6 Specialized Fields</div>
            <span className="text-[11px] text-neutral-400">Beyond standard silicon/RTOS</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-xs text-neutral-400 font-medium">Entry CTC (India)</span>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">₹6.5 - 16.5 LPA</div>
            <span className="text-[11px] text-neutral-400">Median ₹9.5 - 12.0 LPA</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-xs text-neutral-400 font-medium">Senior / Lead (India)</span>
            <div className="text-xl font-bold text-amber-400 mt-0.5">₹28 - 58+ LPA</div>
            <span className="text-[11px] text-neutral-400">Architects up to ₹98 LPA</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-xs text-neutral-400 font-medium">R&amp;D Ecosystem</span>
            <div className="text-xl font-bold text-sky-400 mt-0.5">5 Major Indian Hubs</div>
            <span className="text-[11px] text-neutral-400">BLR, HYD, PNQ, MAA, NCR</span>
          </div>
        </div>
      </div>

      {/* Main Feature Sub-Navigation Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-neutral-200/90 shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveMainTab('fields')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeMainTab === 'fields'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>6 Specialized Fields (Deep Breakdown)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-semibold ml-1">
              All 6
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab('salary_explorer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeMainTab === 'salary_explorer'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Wallet className="w-4 h-4 text-amber-400" />
            <span>Real Compensation Explorer</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 font-semibold ml-1">
              ₹ LPA vs. $ USD
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab('hardware_lab')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeMainTab === 'hardware_lab'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <CircuitBoard className="w-4 h-4 text-sky-400" />
            <span>Hardware Dev Kits &amp; Lab Guide</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-100 text-sky-800 font-semibold ml-1">
              18+ Boards
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab('tech_hubs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeMainTab === 'tech_hubs'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>Indian R&amp;D Hubs &amp; Tech Parks</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 font-semibold ml-1">
              5 Cities
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab('standards_library')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeMainTab === 'standards_library'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Standards &amp; Regulatory Directory</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-800 font-semibold ml-1">
              ISO/IPC/IEEE
            </span>
          </button>
        </div>
      </div>

      {/* VIEW 1: FIELDS DEEP BREAKDOWN */}
      {activeMainTab === 'fields' && (
        <div className="space-y-6">
          {/* Direct Comparative Guide Matrix */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-neutral-900 text-white text-[11px] font-bold uppercase tracking-wider">
                    Direct Comparative Guide
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">Official 6-Field Matrix (Page 2)</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                  High-level overview mapping engineering departments, primary focus areas, required skill foundations, and global market demand.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={expandAll}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-all cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-all cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-neutral-100/80 border-b border-neutral-200 text-neutral-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Career Field</th>
                    <th className="py-3 px-4">Primary Engineering Focus</th>
                    <th className="py-3 px-4">Skill Prerequisites</th>
                    <th className="py-3 px-4">Market Demand</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {DIRECT_COMPARATIVE_GUIDE.map((item, index) => (
                    <tr
                      key={item.fieldId}
                      className={`hover:bg-neutral-50/80 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/30'
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-neutral-900">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-[11px] font-bold text-neutral-700">
                            {index + 1}
                          </span>
                          <span>{item.careerField}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${getDepartmentBadgeClass(item.departmentAlignment)}`}>
                            {item.departmentAlignment}
                          </span>
                          <span className="text-neutral-700 font-medium">{item.primaryEngineeringFocus}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-md text-xs font-medium border border-neutral-200/80">
                          {item.skillPrerequisites}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-xs border ${getDemandBadgeClass(item.marketDemandTier)}`}>
                          {item.marketDemand}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {onNavigateToPrep && (
                            <button
                              onClick={() => onNavigateToPrep(item.fieldId)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                              title="Open In-Depth Preparation Track & Tools"
                            >
                              <Wrench className="w-3 h-3 text-emerald-600" />
                              <span>Prep Track</span>
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setExpandedFieldIds(prev => ({ ...prev, [item.fieldId]: true }));
                              const el = document.getElementById(item.fieldId);
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technologies, tools (Altium, ROS, ETAP), employers (Tesla, Qualcomm), dev kits (TI C2000), or standards (ISO 26262)..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-neutral-400 hover:text-neutral-600 text-xs absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-neutral-100 p-1 rounded-xl">
                {(['All', 'ECE', 'EEE', 'Both'] as const).map(dept => (
                  <button
                    key={dept}
                    onClick={() => setDepartmentFilter(dept)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      departmentFilter === dept
                        ? 'bg-white text-neutral-900 shadow-2xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {dept === 'All' ? 'All Depts' : dept}
                  </button>
                ))}
              </div>

              <select
                value={demandFilter}
                onChange={(e) => setDemandFilter(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 text-neutral-800 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                <option value="All">All Demand Levels</option>
                <option value="Massive">Massive (EV Boom)</option>
                <option value="Very High">Very High (AI/MedTech)</option>
                <option value="High">High (5G/6G &amp; Automation)</option>
                <option value="Stable">Stable (Consumer/Industrial)</option>
              </select>
            </div>
          </div>

          {/* Deep Field Cards List with Internal Subtabs */}
          <div className="space-y-5">
            {filteredFields.map(field => {
              const isExpanded = !!expandedFieldIds[field.id];
              const currentSubTab = cardSubTabs[field.id] || 'overview';

              return (
                <div
                  key={field.id}
                  id={field.id}
                  className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden transition-all duration-200 hover:border-neutral-300"
                >
                  {/* Field Header / Accordion Trigger */}
                  <div
                    onClick={() => toggleExpand(field.id)}
                    className="p-5 sm:p-6 cursor-pointer select-none bg-neutral-50/40 hover:bg-neutral-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 shadow-2xs flex items-center justify-center shrink-0">
                        {fieldIcons[field.id] || <Briefcase className="w-5 h-5 text-neutral-600" />}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-neutral-400">
                            FIELD 0{field.number}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${getDepartmentBadgeClass(field.departmentFocus)}`}>
                            {field.departmentFocus}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-md text-[11px] border ${getDemandBadgeClass(field.marketDemandTier)}`}>
                            {field.marketDemand}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Entry: {field.salaryBenchmarks[0]?.indiaLpaRange || '₹8-15 LPA'}
                          </span>
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
                          {field.number}. {field.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                          {field.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <span className="text-xs font-semibold text-neutral-500 hidden sm:inline">
                        {isExpanded ? 'Collapse' : 'Explore Real Data & Specs'}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content with Nav Tabs */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-6">
                      {/* Dedicated Prep Track & Tools Callout Bar */}
                      {onNavigateToPrep && (
                        <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-start sm:items-center gap-3">
                            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                              <Wrench className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                                <span>In-Depth 16-Week Preparation Track &amp; Toolchain</span>
                                <span className="px-1.5 py-0.2 rounded-md bg-emerald-200/80 text-emerald-900 text-[10px] uppercase font-bold">
                                  Lab Ready
                                </span>
                              </div>
                              <p className="text-xs text-emerald-800 mt-0.5">
                                Step-by-step 4-phase curriculum, free EDA setup commands, capstone repo layout, and MNC interview whiteboard drills for <strong>{field.title}</strong>.
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => onNavigateToPrep(field.id)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer shrink-0"
                          >
                            <span>Launch Prep Track</span>
                            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                          </button>
                        </div>
                      )}

                      {/* Sub-Tab Navigation Header */}
                      <div className="border-b border-neutral-200 pb-2">
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                          {[
                            { id: 'overview', label: 'Overview & Tools', icon: <Layers className="w-3.5 h-3.5" /> },
                            { id: 'salaries', label: 'Verified Salaries & Roles', icon: <Wallet className="w-3.5 h-3.5 text-amber-500" /> },
                            { id: 'hardware', label: 'Dev Kits & Lab Boards', icon: <CircuitBoard className="w-3.5 h-3.5 text-sky-500" /> },
                            { id: 'standards', label: 'Standards & Compliance', icon: <ShieldCheck className="w-3.5 h-3.5 text-purple-500" /> },
                            { id: 'rd_centers', label: 'Indian R&D Labs & Deliverables', icon: <Building2 className="w-3.5 h-3.5 text-rose-500" /> },
                            { id: 'academics', label: 'Electives & Interview Drills', icon: <GraduationCap className="w-3.5 h-3.5 text-emerald-500" /> }
                          ].map(tab => (
                            <button
                              key={tab.id}
                              onClick={() => setFieldSubTab(field.id, tab.id as any)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                currentSubTab === tab.id
                                  ? 'bg-neutral-900 text-white'
                                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                              }`}
                            >
                              {tab.icon}
                              <span>{tab.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* SUBTAB 1: OVERVIEW & TOOLS */}
                      {currentSubTab === 'overview' && (
                        <div className="space-y-5 animate-in fade-in duration-150">
                          <div className="bg-neutral-50/80 rounded-xl p-4 border border-neutral-200/70">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                              Domain Overview &amp; Strategic Context
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                              {field.overview}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2.5">
                              <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs sm:text-sm">
                                <Layers className="w-4 h-4 text-indigo-600" />
                                <span>Core Areas of Specialization</span>
                              </div>
                              <ul className="space-y-1.5 text-xs text-neutral-700">
                                {field.coreAreas.map((area, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                    <span>{area}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2.5">
                              <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs sm:text-sm">
                                <Cpu className="w-4 h-4 text-emerald-600" />
                                <span>Key Technologies &amp; Standards</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {field.keyTechnologies.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Major Employers */}
                          <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
                            <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs sm:text-sm">
                              <Building2 className="w-4 h-4 text-neutral-700" />
                              <span>Major Global &amp; Indian Employers</span>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {field.majorEmployers.map((emp, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 rounded-full bg-white text-neutral-800 text-xs font-semibold border border-neutral-200 shadow-2xs"
                                >
                                  {emp}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Industry Tools */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs sm:text-sm">
                              <Wrench className="w-4 h-4 text-neutral-700" />
                              <span>Industry EDA Software &amp; Simulation Toolchains</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                              {field.industryTools.map((tool, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-all space-y-1"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-xs text-neutral-900">{tool.name}</span>
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                                      {tool.category}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-600 leading-normal">
                                    {tool.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Curated Projects */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs sm:text-sm">
                              <FolderGit2 className="w-4 h-4 text-indigo-600" />
                              <span>Recommended Hands-On Projects</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {field.curatedProjects.map((proj, idx) => (
                                <div
                                  key={idx}
                                  className="p-3.5 rounded-xl border border-neutral-200 bg-white flex flex-col justify-between space-y-2 hover:shadow-2xs transition-all"
                                >
                                  <div className="space-y-1.5">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                      proj.difficulty === 'Industry-Grade'
                                        ? 'bg-rose-100 text-rose-800'
                                        : proj.difficulty === 'Advanced'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-sky-100 text-sky-800'
                                    }`}>
                                      {proj.difficulty}
                                    </span>
                                    <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                                      {proj.title}
                                    </h4>
                                    <p className="text-[11px] text-neutral-600 leading-normal">
                                      {proj.description}
                                    </p>
                                  </div>
                                  <div className="flex flex-wrap gap-1 pt-1 border-t border-neutral-100">
                                    {proj.technologies.map((t, tidx) => (
                                      <span key={tidx} className="text-[10px] text-neutral-500 font-medium">
                                        #{t}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUBTAB 2: VERIFIED SALARIES & ROLES */}
                      {currentSubTab === 'salaries' && (
                        <div className="space-y-5 animate-in fade-in duration-150">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                            <div>
                              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs sm:text-sm">
                                <Wallet className="w-4 h-4 text-amber-600" />
                                <span>Verified Market Compensation Data</span>
                              </div>
                              <p className="text-xs text-amber-800/90 mt-0.5">
                                Verified compensation ranges aggregated from Indian Tech Parks (Bangalore, Hyderabad, Pune) and US engineering hubs.
                              </p>
                            </div>
                            <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-200/80 text-amber-950 font-bold self-start sm:self-auto">
                              Base + Bonus + Stocks
                            </span>
                          </div>

                          {/* Salary Tiers Table */}
                          <div className="overflow-x-auto rounded-xl border border-neutral-200">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-neutral-100 border-b border-neutral-200 text-neutral-700 font-bold uppercase tracking-wider text-[10px]">
                                  <th className="py-2.5 px-3">Career Level</th>
                                  <th className="py-2.5 px-3">India CTC Range (LPA)</th>
                                  <th className="py-2.5 px-3">India Median</th>
                                  <th className="py-2.5 px-3">US / Global (USD)</th>
                                  <th className="py-2.5 px-3">Key Salary Multipliers &amp; Drivers</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-neutral-200">
                                {field.salaryBenchmarks.map((sb, idx) => (
                                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/40'}>
                                    <td className="py-3 px-3 font-bold text-neutral-900 whitespace-nowrap">
                                      {sb.experienceLevel}
                                    </td>
                                    <td className="py-3 px-3 font-semibold text-emerald-700 whitespace-nowrap">
                                      {sb.indiaLpaRange}
                                    </td>
                                    <td className="py-3 px-3 font-bold text-neutral-800 whitespace-nowrap">
                                      {sb.indiaMedianLpa}
                                    </td>
                                    <td className="py-3 px-3 text-neutral-700 whitespace-nowrap">
                                      {sb.globalUsdRange}
                                    </td>
                                    <td className="py-3 px-3 text-neutral-600 text-[11px]">
                                      <ul className="list-disc list-inside space-y-0.5">
                                        {sb.keyDrivers.map((driver, didx) => (
                                          <li key={didx}>{driver}</li>
                                        ))}
                                      </ul>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Job Title Hierarchy */}
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs sm:text-sm">
                              <TrendingUp className="w-4 h-4 text-emerald-600" />
                              <span>Job Title Progression &amp; Daily Core Focus</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {field.careerProgression.map((cp, idx) => (
                                <div key={idx} className="p-3.5 rounded-xl border border-neutral-200 bg-white space-y-1.5">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                                    Tier {idx + 1}: {cp.level}
                                  </span>
                                  <div className="text-xs font-bold text-neutral-900">
                                    {cp.typicalTitles.join(' • ')}
                                  </div>
                                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                                    {cp.focus}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUBTAB 3: HARDWARE DEV KITS & LAB BOARDS */}
                      {currentSubTab === 'hardware' && (
                        <div className="space-y-4 animate-in fade-in duration-150">
                          <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-200">
                            <div className="flex items-center gap-1.5 text-sky-900 font-bold text-xs sm:text-sm">
                              <CircuitBoard className="w-4 h-4 text-sky-600" />
                              <span>Commercially Available Hardware Kits &amp; Bench Tools</span>
                            </div>
                            <p className="text-xs text-sky-800/90 mt-0.5">
                              Real-world hardware evaluation boards, sensors, and lab instruments required for high-tier industry capability.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {field.hardwareKits.map((kit, idx) => (
                              <div
                                key={idx}
                                className="p-4 rounded-xl border border-neutral-200 bg-white space-y-3 flex flex-col justify-between shadow-2xs hover:border-neutral-300 transition-all"
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700">
                                      {kit.category}
                                    </span>
                                    <span className="text-xs font-bold text-emerald-700">
                                      {kit.approxPriceInr}
                                    </span>
                                  </div>

                                  <div>
                                    <h4 className="text-xs font-bold text-neutral-900">
                                      {kit.name}
                                    </h4>
                                    <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500 mt-0.5">
                                      <span>PN: {kit.partNumber}</span>
                                      <span>•</span>
                                      <span>{kit.manufacturer}</span>
                                    </div>
                                  </div>

                                  <p className="text-[11px] text-neutral-600 leading-normal">
                                    {kit.significance}
                                  </p>
                                </div>

                                <div className="pt-2 border-t border-neutral-100 space-y-1">
                                  <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider block">
                                    Key Lab Projects:
                                  </span>
                                  <div className="flex flex-wrap gap-1">
                                    {kit.keyProjectsSupported.map((proj, pidx) => (
                                      <span
                                        key={pidx}
                                        className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded"
                                      >
                                        {proj}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* SUBTAB 4: STANDARDS & COMPLIANCE */}
                      {currentSubTab === 'standards' && (
                        <div className="space-y-4 animate-in fade-in duration-150">
                          <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-200">
                            <div className="flex items-center gap-1.5 text-purple-900 font-bold text-xs sm:text-sm">
                              <ShieldCheck className="w-4 h-4 text-purple-600" />
                              <span>Key Regulatory Directives &amp; International Standards</span>
                            </div>
                            <p className="text-xs text-purple-800/90 mt-0.5">
                              The official codes tested in technical interviews and required for industrial compliance sign-offs.
                            </p>
                          </div>

                          <div className="space-y-3">
                            {field.industryStandards.map((std, idx) => (
                              <div
                                key={idx}
                                className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2 hover:shadow-2xs transition-all"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-900 font-mono text-xs font-bold border border-purple-200">
                                      {std.code}
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                                      {std.title}
                                    </h4>
                                  </div>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                                    Issuing Body: {std.issuingBody}
                                  </span>
                                </div>

                                <p className="text-xs text-neutral-700 leading-relaxed">
                                  <span className="font-semibold text-neutral-900">Scope: </span>
                                  {std.scope}
                                </p>

                                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/80 text-[11px] text-neutral-800">
                                  <span className="font-bold text-purple-900">Why Interviewers Ask: </span>
                                  <span>{std.interviewRelevance}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* SUBTAB 5: INDIAN R&D LABS & DELIVERABLES */}
                      {currentSubTab === 'rd_centers' && (
                        <div className="space-y-5 animate-in fade-in duration-150">
                          {/* Indian R&D Facilities */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs sm:text-sm">
                              <Building2 className="w-4 h-4 text-rose-600" />
                              <span>Prominent Indian R&amp;D Facilities &amp; Tech Parks</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {field.indianRdCenters.map((rd, idx) => (
                                <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
                                  <div className="flex items-center justify-between gap-2">
                                    <h4 className="text-xs font-bold text-neutral-900">{rd.company}</h4>
                                    <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                                      {rd.location}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-600 leading-normal">
                                    <span className="font-semibold text-neutral-800">Lab Focus: </span>
                                    {rd.labFocus}
                                  </p>
                                  <div className="pt-2 border-t border-neutral-100 flex flex-wrap gap-1">
                                    {rd.hiringRoles.map((role, ridx) => (
                                      <span key={ridx} className="text-[10px] bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-medium border border-rose-200/60">
                                        {role}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Daily Engineering Deliverables */}
                          <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs sm:text-sm">
                              <FileText className="w-4 h-4 text-indigo-600" />
                              <span>Typical Weekly Engineering Deliverables on the Job</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {field.dailyDeliverables.map((deliv, idx) => (
                                <div key={idx} className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-1.5">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-[10px] font-mono font-bold text-neutral-500 bg-white px-2 py-0.5 rounded border border-neutral-200">
                                      {deliv.toolUsed}
                                    </span>
                                    <span className="text-[9px] text-neutral-500">{deliv.frequency}</span>
                                  </div>
                                  <h5 className="text-xs font-bold text-neutral-900">{deliv.name}</h5>
                                  <p className="text-[11px] text-neutral-600 leading-normal">
                                    {deliv.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUBTAB 6: ELECTIVES & INTERVIEW DRILLS */}
                      {currentSubTab === 'academics' && (
                        <div className="space-y-5 animate-in fade-in duration-150">
                          {/* Recommended Electives & Textbooks */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2.5">
                              <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs sm:text-sm">
                                <GraduationCap className="w-4 h-4 text-emerald-600" />
                                <span>Recommended University Electives</span>
                              </div>
                              <ul className="space-y-1.5 text-xs text-neutral-700">
                                {field.academicPathway.recommendedElectives.map((el, idx) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>{el}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2.5">
                              <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs sm:text-sm">
                                <BookOpen className="w-4 h-4 text-indigo-600" />
                                <span>Gold-Standard Textbooks &amp; NPTEL</span>
                              </div>
                              <div className="space-y-2 text-xs">
                                {field.academicPathway.benchmarkTextbooks.map((tb, idx) => (
                                  <div key={idx} className="p-2 rounded-lg bg-neutral-50 border border-neutral-200/80">
                                    <span className="font-bold text-neutral-900">{tb.title}</span>
                                    <span className="text-neutral-500 block text-[11px]">by {tb.author} • {tb.focus}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Technical Whiteboard Drills */}
                          <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2.5">
                            <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs sm:text-sm">
                              <HelpCircle className="w-4 h-4 text-rose-600" />
                              <span>Technical Interview Whiteboard Drills</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                              {field.interviewDrills.map((drill, idx) => (
                                <div
                                  key={idx}
                                  className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/80 flex items-start gap-2"
                                >
                                  <span className="text-neutral-400 font-bold text-[11px] mt-0.5">Q{idx + 1}.</span>
                                  <span className="leading-snug">{drill}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Connection to VLSI & Embedded Systems */}
                          <div className="p-4 rounded-xl border border-indigo-200/80 bg-indigo-50/40 space-y-1.5">
                            <div className="flex items-center gap-2 text-indigo-950 font-bold text-xs sm:text-sm">
                              <Cpu className="w-4 h-4 text-indigo-600" />
                              <span>Intersection with Custom Silicon &amp; Embedded Systems</span>
                            </div>
                            <p className="text-xs text-indigo-900 leading-relaxed">
                              {field.vlsiEmbeddedConnection}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: REAL COMPENSATION EXPLORER */}
      {activeMainTab === 'salary_explorer' && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-neutral-950 text-[11px] font-bold uppercase tracking-wider">
                  Real Compensation Benchmarks
                </span>
                <span className="text-xs text-neutral-500 font-medium">India (INR LPA) vs Global (USD)</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
                Verified Salary Explorer Across All 6 Engineering Domains
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                Compare base pay, typical variable bonuses, and equity compensation across career tiers in leading Indian R&amp;D centers.
              </p>
            </div>

            {/* Experience Level Selector */}
            <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl shrink-0">
              {(['Entry (0-2 yrs)', 'Mid-Level (3-6 yrs)', 'Senior / Lead (7-11 yrs)', 'Principal / Architect (12+ yrs)'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedExperienceLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedExperienceLevel === lvl
                      ? 'bg-white text-neutral-950 shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {lvl.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Comparative Salary Table for the Selected Level */}
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-neutral-100 text-neutral-700 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Domain</th>
                  <th className="py-3 px-4">Department Alignment</th>
                  <th className="py-3 px-4">India CTC Range (LPA)</th>
                  <th className="py-3 px-4">Median India CTC</th>
                  <th className="py-3 px-4">Global Range (USD)</th>
                  <th className="py-3 px-4">High-Paying Skill Multipliers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {ECE_EEE_CAREER_FIELDS.map((field, idx) => {
                  const sb = field.salaryBenchmarks.find(s => s.experienceLevel === selectedExperienceLevel) || field.salaryBenchmarks[0];

                  return (
                    <tr key={field.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/40'}>
                      <td className="py-3.5 px-4 font-bold text-neutral-900">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                            {fieldIcons[field.id]}
                          </span>
                          <span className="truncate">{field.title}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${getDepartmentBadgeClass(field.departmentFocus)}`}>
                          {field.departmentFocus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-700">
                        {sb.indiaLpaRange}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-neutral-900">
                        {sb.indiaMedianLpa}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-700">
                        {sb.globalUsdRange}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600 text-xs">
                        <div className="flex flex-wrap gap-1">
                          {sb.keyDrivers.map((driver, didx) => (
                            <span key={didx} className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded text-[11px]">
                              {driver}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Strategic Insights Callout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Top Compensation Velocity</span>
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Power Electronics &amp; EV</strong> offers the highest wage growth in India due to severe shortage of qualified SiC inverter, motor control, and BMS engineers.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50 space-y-1">
              <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">MNC Baseband Premium</span>
              <p className="text-xs text-sky-800 leading-relaxed">
                <strong>Telecommunications 5G/6G</strong> pays high entry tiers at Qualcomm, Samsung, and Nokia for students skilled in C++, DSP algorithms, and 3GPP specifications.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Universal Evergreen Demand</span>
              <p className="text-xs text-emerald-800 leading-relaxed">
                <strong>PCB &amp; Hardware Engineering</strong> guarantees lifetime employability since every IoT sensor, medical device, and computing board requires physical layout and signal integrity sign-off.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: HARDWARE DEV KITS & LAB GUIDE */}
      {activeMainTab === 'hardware_lab' && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-sky-500 text-white text-[11px] font-bold uppercase tracking-wider">
                  Hardware Dev Kits Directory
                </span>
                <span className="text-xs text-neutral-500 font-medium">18+ Commercially Available Platforms</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
                Student &amp; Professional Hardware Bench Recommendations
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                Authentic part numbers, manufacturer details, realistic prices in INR / USD, and key supported projects.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allHardwareKits.map((kit, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-neutral-200 bg-white space-y-3 flex flex-col justify-between hover:border-sky-300 hover:shadow-2xs transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700">
                      {kit.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      {kit.approxPriceInr} / {kit.approxPriceUsd}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                      {kit.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono mt-0.5">
                      <span>PN: {kit.partNumber}</span>
                      <span>•</span>
                      <span>{kit.manufacturer}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-sky-800 font-semibold bg-sky-50 px-2 py-1 rounded">
                    Field: {kit.fieldTitle}
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {kit.significance}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 space-y-1">
                  <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider block">
                    Supported Lab Projects:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {kit.keyProjectsSupported.map((proj, pidx) => (
                      <span
                        key={pidx}
                        className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: INDIAN R&D HUBS & TECH PARKS */}
      {activeMainTab === 'tech_hubs' && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 shadow-2xs space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-rose-500 text-white text-[11px] font-bold uppercase tracking-wider">
                Indian Engineering Ecosystem
              </span>
              <span className="text-xs text-neutral-500 font-medium">5 Major Tech Clusters</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
              Top Indian R&amp;D Campuses &amp; High-Tech Hiring Clusters
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Specific tech parks, regional specializations, and flagship hardware multinational employers in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INDIAN_TECH_HUBS.map((hub, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-neutral-200 bg-white space-y-3 hover:border-rose-300 hover:shadow-2xs transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-base font-bold text-neutral-900 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      <span>{hub.city}, {hub.state}</span>
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5">{hub.tagline}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Prominent High-Tech Parks
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {hub.prominentParks.map((park, pidx) => (
                      <span key={pidx} className="text-xs bg-neutral-100 text-neutral-800 px-2.5 py-0.5 rounded-md font-medium">
                        {park}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Dominant Hardware Specializations
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {hub.keyFieldsStrong.map((field, fidx) => (
                      <span key={fidx} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Key Global &amp; Indian Employers
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {hub.notableEmployers.map((emp, eidx) => (
                      <span key={eidx} className="text-[11px] bg-white border border-neutral-200 text-neutral-800 px-2.5 py-0.5 rounded-full shadow-2xs font-semibold">
                        {emp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 5: STANDARDS & COMPLIANCE LIBRARY */}
      {activeMainTab === 'standards_library' && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 shadow-2xs space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-purple-500 text-white text-[11px] font-bold uppercase tracking-wider">
                Regulatory Standards Directory
              </span>
              <span className="text-xs text-neutral-500 font-medium">ISO, IEC, IEEE, IPC &amp; 3GPP</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
              Official Industry Compliance Frameworks &amp; Directives
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Engineers must design to strict standards. Review the essential frameworks tested in interviews and required for manufacturing certification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allIndustryStandards.map((std, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2 hover:border-purple-300 hover:shadow-2xs transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-900 font-mono text-xs font-bold border border-purple-200">
                    {std.code}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                    {std.issuingBody}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                  {std.title}
                </h4>

                <div className="text-[11px] text-purple-800 font-semibold">
                  Field: {std.fieldTitle}
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed">
                  <span className="font-semibold text-neutral-900">Scope: </span>
                  {std.scope}
                </p>

                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/80 text-[11px] text-neutral-800">
                  <span className="font-bold text-purple-900">Interview Context: </span>
                  <span>{std.interviewRelevance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cross-Discipline Hardware Synthesis Footer Callout */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-2xl p-6 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Cross-Discipline Hardware Synthesis</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Bridge Beyond-VLSI Specializations with Custom Silicon &amp; RTOS
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Every one of these 6 fields converges back onto custom semiconductor ASICs, high-speed PCBs, PMICs, and embedded firmware. Combine digital logic foundations with specialized domain expertise to maximize your industry leverage.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          {onNavigateToCareerPrep && (
            <button
              onClick={onNavigateToCareerPrep}
              className="px-4 py-2.5 rounded-xl bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-100 transition-all cursor-pointer shadow-sm"
            >
              Open 10 Prep Tracks
            </button>
          )}
          {onNavigateToTools && (
            <button
              onClick={onNavigateToTools}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 text-white text-xs font-bold hover:bg-neutral-700 transition-all cursor-pointer border border-neutral-700"
            >
              Master EDA Tools
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
