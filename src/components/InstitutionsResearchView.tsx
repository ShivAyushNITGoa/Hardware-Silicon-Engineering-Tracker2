import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Building,
  Calendar,
  IndianRupee,
  MapPin,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Mail,
  Copy,
  Check,
  Award,
  BookOpen,
  Cpu,
  Layers,
  Clock,
  ShieldCheck,
  Send,
  FileText,
  UserCheck,
  Microscope,
  Compass,
  ArrowRight,
  TrendingUp,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  RotateCcw
} from 'lucide-react';
import { InstitutionInternship, InstitutionType, InstitutionalDomain, ApplicationStatus } from '../types';
import { academicColdEmailTemplates, sopWritingGuidelines } from '../data/institutionsData';
import { 
  getStoredInstitutions, 
  saveStoredInstitutions, 
  resetStoredInstitutions, 
  getInstitutionsOverrides, 
  saveInstitutionsOverrides 
} from '../utils/storage';

const TYPE_OPTIONS: (InstitutionType | 'All')[] = [
  'All',
  'IIT',
  'IISc & Premier Research',
  'IIIT',
  'NIT',
  'BITS & Premier Universities',
  'National R&D Lab / CSIR',
  'National Academy Fellowship'
];

const DOMAIN_OPTIONS: (InstitutionalDomain | 'All Domains')[] = [
  'All Domains',
  'VLSI & RTL Design',
  'RISC-V & Processor Architecture',
  'Nanoelectronics & Device Physics',
  'Embedded Systems & IoT',
  'EDA Tools & Open-Source Silicon',
  'Hardware Security & Cryptography',
  'Neuromorphic & Edge AI',
  'Silicon Photonics & MEMS'
];

const STATUS_CHOICES: ApplicationStatus[] = [
  'Wishlist',
  'Resume Ready',
  'Applied',
  'Online Assessment',
  'Technical Interview',
  'Offer',
  'Rejected'
];

const BLANK_INSTITUTION: InstitutionInternship = {
  id: '',
  instituteName: '',
  shortName: '',
  type: 'IIT',
  location: '',
  programName: '',
  stipend: '₹10,000 - ₹15,000 / month',
  duration: '8 - 10 Weeks (May - July)',
  applicationWindow: 'Jan - March',
  deadlineDescription: 'Typical deadline between mid-February and late-March annually',
  eligibility: '3rd year B.Tech / Pre-final year students with CGPA ≥ 8.0',
  minCgpaOrRank: 'CGPA ≥ 8.0',
  selectionProcess: 'Online application with research statement and academic transcript review.',
  domains: ['VLSI & RTL Design', 'RISC-V & Processor Architecture'],
  overview: '',
  officialPortalUrl: 'https://',
  keyHighlights: [
    'Cleanroom & EDA Tool access',
    'Faculty mentorship on funded national microelectronics projects'
  ],
  notableFacultyAndLabs: [
    {
      name: 'Dr. Lead Faculty',
      designation: 'Professor, Dept. of EE / CSE',
      labOrGroup: 'Advanced VLSI & Silicon Systems Lab',
      researchArea: 'Digital IC Design, RISC-V SoC Architecture'
    }
  ],
  deliverablesAndOutcomes: [
    'IEEE/ACM workshop paper submission or RTL IP core release',
    'Official Certificate of Research Fellowship and Letter of Recommendation'
  ],
  applicationStrategyTips: [
    'Tailor SOP to specific faculty publications and cite ongoing lab testchips'
  ],
  status: 'Wishlist',
  userNotes: ''
};

export const InstitutionsResearchView: React.FC = () => {
  const [baseInstitutions, setBaseInstitutions] = useState<InstitutionInternship[]>(() => getStoredInstitutions());
  const [selectedType, setSelectedType] = useState<InstitutionType | 'All'>('All');
  const [selectedDomain, setSelectedDomain] = useState<InstitutionalDomain | 'All Domains'>('All Domains');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'directory' | 'matrix' | 'calendar' | 'outreach' | 'tracker'>('directory');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInst, setEditingInst] = useState<InstitutionInternship | null>(null);
  const [formState, setFormState] = useState<InstitutionInternship>(BLANK_INSTITUTION);
  const [formHighlightsRaw, setFormHighlightsRaw] = useState('');
  const [formFacultyRaw, setFormFacultyRaw] = useState('');

  // Email generator custom fields
  const [emailStudentName, setEmailStudentName] = useState('Ayush');
  const [emailCollege, setEmailCollege] = useState('NIT / University Engineering');
  const [emailCgpa, setEmailCgpa] = useState('9.1');
  const [emailPaperTopic, setEmailPaperTopic] = useState('Fault-Tolerant RISC-V Microarchitectures / Neuromorphic Computing');
  const [emailTargetProf, setEmailTargetProf] = useState('Kamakoti / Shrivastava');
  const [emailTargetLab, setEmailTargetLab] = useState('RISE Lab / MSDLab');
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);

  // Local storage state for tracking user notes & application status
  const [overrides, setOverrides] = useState<Record<string, any>>(() => getInstitutionsOverrides());

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    const updated = {
      ...overrides,
      [id]: {
        ...(overrides[id] || {}),
        status: newStatus,
        lastUpdated: new Date().toISOString()
      }
    };
    setOverrides(updated);
    saveInstitutionsOverrides(updated);
  };

  const handleNotesChange = (id: string, notes: string) => {
    const updated = {
      ...overrides,
      [id]: {
        ...(overrides[id] || {}),
        userNotes: notes
      }
    };
    setOverrides(updated);
    saveInstitutionsOverrides(updated);
  };

  const handleOpenAdd = () => {
    const newInst: InstitutionInternship = {
      ...BLANK_INSTITUTION,
      id: `inst-${Date.now()}`
    };
    setEditingInst(null);
    setFormState(newInst);
    setFormHighlightsRaw(newInst.keyHighlights.join('\n'));
    setFormFacultyRaw(
      newInst.notableFacultyAndLabs
        .map(f => `${f.name} :: ${f.designation} :: ${f.labOrGroup} :: ${f.researchArea}`)
        .join('\n')
    );
    setIsModalOpen(true);
  };

  const handleOpenEdit = (inst: InstitutionInternship, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingInst(inst);
    setFormState({ ...inst });
    setFormHighlightsRaw(inst.keyHighlights.join('\n'));
    setFormFacultyRaw(
      inst.notableFacultyAndLabs
        .map(f => `${f.name} :: ${f.designation} :: ${f.labOrGroup} :: ${f.researchArea}`)
        .join('\n')
    );
    setIsModalOpen(true);
  };

  const handleSaveInstitution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.instituteName.trim() || !formState.programName.trim()) return;

    const parsedHighlights = formHighlightsRaw
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);

    const facultyLines = formFacultyRaw.split('\n').map(l => l.trim()).filter(Boolean);
    const parsedFaculty = facultyLines.map((line, idx) => {
      const parts = line.split('::').map(p => p.trim());
      return {
        name: parts[0] || `Faculty ${idx + 1}`,
        designation: parts[1] || 'Professor',
        labOrGroup: parts[2] || 'Research Lab',
        researchArea: parts[3] || 'Microelectronics'
      };
    });

    const finalized: InstitutionInternship = {
      ...formState,
      instituteName: formState.instituteName.trim(),
      shortName: formState.shortName.trim() || formState.instituteName.split(' ')[0],
      keyHighlights: parsedHighlights.length > 0 ? parsedHighlights : ['Cleanroom and advanced EDA labs access'],
      notableFacultyAndLabs: parsedFaculty.length > 0 ? parsedFaculty : [
        {
          name: 'Principal Investigator',
          designation: 'Professor',
          labOrGroup: 'Microelectronics Lab',
          researchArea: 'VLSI Systems'
        }
      ]
    };

    let updatedList: InstitutionInternship[];
    if (editingInst) {
      updatedList = baseInstitutions.map(i => i.id === finalized.id ? finalized : i);
    } else {
      updatedList = [finalized, ...baseInstitutions];
    }

    setBaseInstitutions(updatedList);
    saveStoredInstitutions(updatedList);
    setIsModalOpen(false);
  };

  const handleDeleteInstitution = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete fellowship / research directory item "${name}"?`)) {
      const updated = baseInstitutions.filter(i => i.id !== id);
      setBaseInstitutions(updated);
      saveStoredInstitutions(updated);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset research fellowship directory to default 37 premier Indian institutions?')) {
      const reset = resetStoredInstitutions();
      setBaseInstitutions(reset);
    }
  };

  // Combine stored dataset with user overrides
  const institutions: InstitutionInternship[] = useMemo(() => {
    return baseInstitutions.map(inst => {
      const override = overrides[inst.id] || {};
      return {
        ...inst,
        status: override.status || inst.status || 'Wishlist',
        userNotes: override.userNotes !== undefined ? override.userNotes : inst.userNotes || '',
        appliedDate: override.appliedDate || inst.appliedDate
      };
    });
  }, [baseInstitutions, overrides]);

  // Filtered dataset
  const filteredInstitutions = useMemo(() => {
    return institutions.filter(inst => {
      const matchesType = selectedType === 'All' || inst.type === selectedType;
      const matchesDomain = selectedDomain === 'All Domains' || inst.domains.includes(selectedDomain);
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        inst.instituteName.toLowerCase().includes(q) ||
        inst.shortName.toLowerCase().includes(q) ||
        inst.programName.toLowerCase().includes(q) ||
        inst.location.toLowerCase().includes(q) ||
        inst.overview.toLowerCase().includes(q) ||
        inst.domains.some(d => d.toLowerCase().includes(q)) ||
        inst.notableFacultyAndLabs.some(f => 
          f.name.toLowerCase().includes(q) || 
          f.labOrGroup.toLowerCase().includes(q) ||
          f.researchArea.toLowerCase().includes(q)
        )
      );

      return matchesType && matchesDomain && matchesSearch;
    });
  }, [institutions, selectedType, selectedDomain, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = institutions.length;
    const iits = institutions.filter(i => i.type === 'IIT').length;
    const nits = institutions.filter(i => i.type === 'NIT').length;
    const iiscAndLabs = institutions.filter(i => i.type === 'IISc & Premier Research' || i.type === 'National R&D Lab / CSIR').length;
    const iiitsAndBits = institutions.filter(i => i.type === 'IIIT' || i.type === 'BITS & Premier Universities').length;
    const appliedOrReady = institutions.filter(i => i.status && ['Applied', 'Resume Ready', 'Technical Interview', 'Offer'].includes(i.status)).length;

    return { total, iits, nits, iiscAndLabs, iiitsAndBits, appliedOrReady };
  }, [institutions]);

  const copyEmailToClipboard = (text: string, id: string) => {
    // Replace placeholders with current student states
    let finalBody = text
      .replace(/\[Your Name\]/g, emailStudentName || 'Ayush')
      .replace(/\[Your College\]/g, emailCollege || 'Engineering College')
      .replace(/\[Your CGPA\]/g, emailCgpa || '9.0')
      .replace(/\[Professor Last Name\]/g, emailTargetProf || 'Professor')
      .replace(/\[Lab Name.*?\]/g, emailTargetLab || 'Research Lab')
      .replace(/\[Mention a specific paper.*?\]/g, emailPaperTopic || 'Recent Publications on RISC-V / Microelectronics')
      .replace(/\[Mention specific topic.*?\]/g, emailPaperTopic || 'Semiconductor Device Reliability & Simulation');

    navigator.clipboard.writeText(finalBody);
    setCopiedTemplateId(id);
    setTimeout(() => setCopiedTemplateId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-400/30 text-indigo-200">
              <Microscope className="w-3.5 h-3.5" />
              National Research Fellowships & Premier Lab Directory
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              IITs, NITs, IISc, IIITs & National Research Labs
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Deep research directory covering summer fellowships, cleanroom fabrication labs, 
              DIR-V RISC-V processor teams, and funded research internships across India's top 37 premier institutions.
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 bg-white/5 backdrop-blur-md p-3.5 rounded-xl border border-white/10 shrink-0">
            <div className="text-center p-1.5">
              <div className="text-2xl font-black text-indigo-300">{stats.total}</div>
              <div className="text-[11px] text-slate-300 font-medium">Premier Institutes</div>
            </div>
            <div className="text-center p-1.5 border-l border-white/10">
              <div className="text-2xl font-black text-amber-300">{stats.iits}</div>
              <div className="text-[11px] text-slate-300 font-medium">IIT Fellowships</div>
            </div>
            <div className="text-center p-1.5 border-l border-white/10">
              <div className="text-2xl font-black text-blue-300">{stats.nits}</div>
              <div className="text-[11px] text-slate-300 font-medium">NIT Fellowships</div>
            </div>
            <div className="text-center p-1.5 border-l border-white/10">
              <div className="text-2xl font-black text-purple-300">{stats.iiscAndLabs}</div>
              <div className="text-[11px] text-slate-300 font-medium">IISc, DRDO & Labs</div>
            </div>
            <div className="text-center p-1.5 border-l border-white/10">
              <div className="text-2xl font-black text-cyan-300">{stats.iiitsAndBits}</div>
              <div className="text-[11px] text-slate-300 font-medium">IIITs & BITS</div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('directory')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'directory'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-white/10 text-slate-200 hover:bg-white/15'
            }`}
          >
            <Building className="w-4 h-4" />
            Institutional Directory ({institutions.length})
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'matrix'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-white/10 text-slate-200 hover:bg-white/15'
            }`}
          >
            <Layers className="w-4 h-4" />
            Comparison Matrix
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'calendar'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-white/10 text-slate-200 hover:bg-white/15'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Annual Timeline & Deadlines
          </button>

          <button
            onClick={() => setActiveTab('outreach')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'outreach'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-white/10 text-slate-200 hover:bg-white/15'
            }`}
          >
            <Mail className="w-4 h-4" />
            Professor Outreach & SOP Builder
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'tracker'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-white/10 text-slate-200 hover:bg-white/15'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            My Research Applications ({stats.appliedOrReady})
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DIRECTORY VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Filters and Search Bar */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search IITs, professors, Shakti, CeNSE, cleanrooms..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Action Buttons & Quick Result Count */}
              <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
                <div className="text-xs text-slate-500 font-medium">
                  Showing <span className="font-bold text-slate-800">{filteredInstitutions.length}</span> of {institutions.length}
                </div>

                <button
                  onClick={handleOpenAdd}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Fellowship</span>
                </button>

                <button
                  onClick={handleResetDefaults}
                  className="inline-flex items-center gap-1 px-2 py-1.5 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 rounded-lg text-xs text-slate-500 transition-all cursor-pointer"
                  title="Reset institutions directory to standard 37 institutes"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Institution Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-500 font-semibold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <Building className="w-3.5 h-3.5" /> Tier:
              </span>
              {TYPE_OPTIONS.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
                    selectedType === type
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Technical Domain Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs pt-1 border-t border-slate-100">
              <span className="text-slate-500 font-semibold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" /> Domain:
              </span>
              {DOMAIN_OPTIONS.map(domain => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
                    selectedDomain === domain
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-indigo-50/70 text-indigo-700 hover:bg-indigo-100'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Institutions Cards List */}
          <div className="space-y-4">
            {filteredInstitutions.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                <Microscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-700">No institutions match your search</h3>
                <p className="text-sm text-slate-500 mt-1">Try resetting the type or domain filters to view all 17 premier institutions.</p>
                <button
                  onClick={() => {
                    setSelectedType('All');
                    setSelectedDomain('All Domains');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredInstitutions.map(inst => {
                const isExpanded = expandedId === inst.id;
                return (
                  <div
                    key={inst.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Main Card Header */}
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Title & Type */}
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                              inst.type === 'IIT'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : inst.type === 'IISc & Premier Research'
                                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                : inst.type === 'National R&D Lab / CSIR'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : inst.type === 'IIIT'
                                ? 'bg-cyan-100 text-cyan-800 border border-cyan-200'
                                : inst.type === 'NIT'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : inst.type === 'BITS & Premier Universities'
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                            }`}>
                              {inst.type}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {inst.location}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                            {inst.instituteName}
                          </h3>
                          <div className="text-sm font-semibold text-indigo-700 flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-indigo-500" />
                            {inst.programName}
                          </div>
                        </div>

                        {/* Top Highlights Pill Bar */}
                        <div className="flex flex-wrap items-center gap-3">
                          {/* Stipend Badge */}
                          <div className="bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-lg text-left">
                            <div className="text-[10px] uppercase font-bold text-emerald-700">Stipend / Support</div>
                            <div className="text-xs font-bold text-emerald-900">{inst.stipend}</div>
                          </div>

                          {/* Duration Badge */}
                          <div className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-left">
                            <div className="text-[10px] uppercase font-bold text-slate-500">Duration</div>
                            <div className="text-xs font-bold text-slate-800">{inst.duration}</div>
                          </div>

                          {/* Status Dropdown */}
                          <div className="relative">
                            <select
                              value={inst.status || 'Wishlist'}
                              onChange={e => handleStatusChange(inst.id, e.target.value as ApplicationStatus)}
                              className={`text-xs font-bold px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 cursor-pointer transition-all ${
                                inst.status === 'Offer'
                                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                                  : inst.status === 'Applied'
                                  ? 'bg-blue-100 border-blue-300 text-blue-800'
                                  : inst.status === 'Resume Ready'
                                  ? 'bg-purple-100 border-purple-300 text-purple-800'
                                  : inst.status === 'Technical Interview'
                                  ? 'bg-amber-100 border-amber-300 text-amber-800'
                                  : 'bg-slate-100 border-slate-300 text-slate-700'
                              }`}
                            >
                              {STATUS_CHOICES.map(status => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Apply Direct Button */}
                          <a
                            href={inst.officialPortalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                          >
                            Apply Official
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={(e) => handleOpenEdit(inst, e)}
                            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit institution details"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={(e) => handleDeleteInstitution(inst.id, inst.instituteName, e)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete institution from directory"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Domain Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100">
                        {inst.domains.map(d => (
                          <span
                            key={d}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* Brief Overview */}
                      <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                        {inst.overview}
                      </p>

                      {/* Toggle Expand Bar */}
                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="text-xs text-slate-500 flex items-center gap-4">
                          <span className="font-semibold text-slate-700">
                            Window: <span className="font-normal text-slate-600">{inst.applicationWindow}</span>
                          </span>
                          <span className="hidden sm:inline font-semibold text-slate-700">
                            Eligibility: <span className="font-normal text-slate-600">{inst.minCgpaOrRank || 'CGPA ≥ 8.0'}</span>
                          </span>
                        </div>

                        <button
                          onClick={() => setExpandedId(isExpanded ? null : inst.id)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              Collapse Details <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              View Labs, Faculty & Strategy <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* ================= Expandable Research Deep-Dive ================= */}
                    {isExpanded && (
                      <div className="bg-slate-50/80 border-t border-slate-200 p-5 sm:p-6 space-y-6">
                        {/* Grid: Key Highlights & Eligibility */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Key Highlights */}
                          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-indigo-600" />
                              Key Research Highlights & Lab Facilities
                            </div>
                            <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
                              {inst.keyHighlights.map((hl, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Eligibility & Selection Process */}
                          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                            <div>
                              <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                Eligibility & Academic Criteria
                              </div>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                {inst.eligibility}
                              </p>
                              {inst.minCgpaOrRank && (
                                <div className="inline-block mt-2 px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded text-xs font-semibold">
                                  Cutoff Benchmark: {inst.minCgpaOrRank}
                                </div>
                              )}
                            </div>

                            <div className="pt-2 border-t border-slate-100">
                              <div className="text-[11px] font-bold text-slate-700">Selection Process:</div>
                              <p className="text-xs text-slate-600 mt-0.5">{inst.selectionProcess}</p>
                            </div>
                          </div>
                        </div>

                        {/* Notable Faculty & Research Labs */}
                        <div className="space-y-3">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4 text-indigo-600" />
                            Target Faculty & Research Groups
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {inst.notableFacultyAndLabs.map((prof, pIdx) => (
                              <div
                                key={pIdx}
                                className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all space-y-1.5"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="font-bold text-xs text-slate-900">{prof.name}</div>
                                  {prof.websiteOrProfile && (
                                    <a
                                      href={prof.websiteOrProfile}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-slate-400 hover:text-indigo-600"
                                      title="Open Faculty Profile"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                </div>
                                <div className="text-[11px] text-indigo-700 font-medium">{prof.designation}</div>
                                <div className="text-[11px] text-slate-500 font-semibold">{prof.labOrGroup}</div>
                                <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                                  <span className="font-medium text-slate-700">Focus:</span> {prof.researchArea}
                                </p>
                                {prof.keyProjectsOrTopics && (
                                  <div className="flex flex-wrap gap-1 pt-1">
                                    {prof.keyProjectsOrTopics.map((topic, tIdx) => (
                                      <span
                                        key={tIdx}
                                        className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono"
                                      >
                                        {topic}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Deliverables & Strategy Tips */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Deliverables */}
                          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              Expected Research Deliverables
                            </div>
                            <ul className="space-y-1 text-xs text-slate-600">
                              {inst.deliverablesAndOutcomes.map((d, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-emerald-600 font-bold">✓</span>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Strategy Tips */}
                          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                              <Compass className="w-4 h-4 text-amber-600" />
                              Application Strategy & Faculty Outreach Tips
                            </div>
                            <ul className="space-y-1 text-xs text-slate-600">
                              {inst.applicationStrategyTips.map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-amber-600 font-bold">→</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* User Personal Notes & Deadline Tracker */}
                        <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                              <FileText className="w-4 h-4 text-indigo-600" />
                              Your Research Notes & Faculty Contact Log ({inst.shortName})
                            </div>
                            <span className="text-[11px] text-indigo-600 font-medium">Auto-saves to browser</span>
                          </div>
                          <textarea
                            value={inst.userNotes || ''}
                            onChange={e => handleNotesChange(inst.id, e.target.value)}
                            placeholder="E.g. Sent cold email to Prof. Kamakoti on 15 Feb referencing his IEEE TCAS Shakti paper; submitted SOP on IITM SFP portal with Ref #2026-918..."
                            rows={2}
                            className="w-full text-xs p-2.5 bg-white border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. COMPARISON MATRIX VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Premier Institutional Research Programs Comparison Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Side-by-side breakdown of stipend, duration, eligibility requirements, and accommodation.
              </p>
            </div>
            <div className="text-xs font-semibold text-indigo-600">
              17 Verified Programs
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-3">Institution & Tier</th>
                  <th className="p-3">Fellowship / Program</th>
                  <th className="p-3">Stipend & Perks</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Application Window</th>
                  <th className="p-3">Min Cutoff / Eligibility</th>
                  <th className="p-3 text-center">Portal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {institutions.map(inst => (
                  <tr key={inst.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{inst.shortName}</div>
                      <span className="text-[10px] text-slate-500 font-medium">{inst.type}</span>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-indigo-700">{inst.programName}</div>
                      <div className="text-[11px] text-slate-500">{inst.location}</div>
                    </td>
                    <td className="p-3">
                      <span className="inline-block font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {inst.stipend}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 font-medium">{inst.duration}</td>
                    <td className="p-3 text-slate-700 font-medium">{inst.applicationWindow}</td>
                    <td className="p-3">
                      <span className="text-slate-700 font-semibold">{inst.minCgpaOrRank || 'CGPA ≥ 8.0'}</span>
                    </td>
                    <td className="p-3 text-center">
                      <a
                        href={inst.officialPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold"
                      >
                        Apply <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ANNUAL CALENDAR & DEADLINES */}
      {/* ========================================================================= */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phase 1: Fall / Pre-Year Cycle */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-800 font-bold text-xs">
                  PHASE 1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Fall Application Season</h4>
                  <div className="text-xs text-slate-500 font-medium">September – November</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                  <div className="font-bold text-xs text-purple-900">IASc-INSA-NASI Fellowship</div>
                  <div className="text-[11px] text-purple-700">Closes strictly mid-November for upcoming summer.</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-xs text-slate-800">IIT Bombay IRCC Winter Cycle</div>
                  <div className="text-[11px] text-slate-600">August – September window for Spring semester co-op.</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-xs text-slate-800">TIFR VSRP Portal</div>
                  <div className="text-[11px] text-slate-600">Opens in December; referee recommendations due in January.</div>
                </div>
              </div>
            </div>

            {/* Phase 2: Spring / Peak IIT Cycle */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-xs">
                  PHASE 2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Spring Peak Fellowship Season</h4>
                  <div className="text-xs text-slate-500 font-medium">January – March</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                  <div className="font-bold text-xs text-indigo-900">IIT Madras SFP & Shakti RISC-V</div>
                  <div className="text-[11px] text-indigo-700">January to early March deadline. ₹15,000/mo stipend.</div>
                </div>
                <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                  <div className="font-bold text-xs text-indigo-900">IIT Roorkee SPARK & IITGN SRIP</div>
                  <div className="text-[11px] text-indigo-700">February to late March window. 5 faculty preferences.</div>
                </div>
                <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                  <div className="font-bold text-xs text-indigo-900">IIT Hyderabad SURE & IIT Delhi SRFP</div>
                  <div className="text-[11px] text-indigo-700">Opens in February; results announced by April.</div>
                </div>
              </div>
            </div>

            {/* Phase 3: Summer Execution */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                  PHASE 3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Summer On-Campus Research</h4>
                  <div className="text-xs text-slate-500 font-medium">May – July (8–10 Weeks)</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <div className="font-bold text-xs text-emerald-900">Full-Time Lab Work & Cleanroom Access</div>
                  <div className="text-[11px] text-emerald-700">40+ hours/week with PhD researchers & faculty mentors.</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-xs text-slate-800">Mid-Term Design Reviews</div>
                  <div className="text-[11px] text-slate-600">Waveform validations, TCAD convergence, or FPGA test runs.</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-xs text-slate-800">Final Symposium & Paper Submission</div>
                  <div className="text-[11px] text-slate-600">Poster showcase, award eligibility, and IEEE drafts.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PROFESSOR OUTREACH & SOP BUILDER */}
      {/* ========================================================================= */}
      {activeTab === 'outreach' && (
        <div className="space-y-6">
          {/* Email Customization Inputs */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-600" />
              Academic Cold Email Generator (IIT / IISc Professors)
            </h3>
            <p className="text-xs text-slate-500">
              Customize your profile parameters below. The email template updates in real-time ready for 1-click clipboard copying.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700">Your Full Name</label>
                <input
                  type="text"
                  value={emailStudentName}
                  onChange={e => setEmailStudentName(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Your College / Institution</label>
                <input
                  type="text"
                  value={emailCollege}
                  onChange={e => setEmailCollege(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Your CGPA</label>
                <input
                  type="text"
                  value={emailCgpa}
                  onChange={e => setEmailCgpa(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Target Professor Last Name</label>
                <input
                  type="text"
                  value={emailTargetProf}
                  onChange={e => setEmailTargetProf(e.target.value)}
                  placeholder="E.g. Kamakoti / Shrivastava / Sarangi"
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Lab or Research Group</label>
                <input
                  type="text"
                  value={emailTargetLab}
                  onChange={e => setEmailTargetLab(e.target.value)}
                  placeholder="E.g. RISE Lab / MSDLab / CeNSE"
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Specific Paper / Topic Citation</label>
                <input
                  type="text"
                  value={emailPaperTopic}
                  onChange={e => setEmailPaperTopic(e.target.value)}
                  placeholder="E.g. Shakti RISC-V Fault Tolerance"
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Template Selector */}
            <div className="flex gap-2 pt-2 border-t border-slate-100">
              {academicColdEmailTemplates.map((tpl, idx) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplateIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedTemplateIndex === idx
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tpl.targetRole}
                </button>
              ))}
            </div>
          </div>

          {/* Rendered Email Template Box */}
          {academicColdEmailTemplates[selectedTemplateIndex] && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-indigo-300">SUBJECT LINE:</div>
                  <div className="text-xs font-mono text-slate-200 mt-0.5">
                    {academicColdEmailTemplates[selectedTemplateIndex].subject
                      .replace(/\[Your Name\]/g, emailStudentName)
                      .replace(/\[Your College\]/g, emailCollege)}
                  </div>
                </div>

                <button
                  onClick={() =>
                    copyEmailToClipboard(
                      academicColdEmailTemplates[selectedTemplateIndex].body,
                      academicColdEmailTemplates[selectedTemplateIndex].id
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition-all shrink-0"
                >
                  {copiedTemplateId === academicColdEmailTemplates[selectedTemplateIndex].id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Email
                    </>
                  )}
                </button>
              </div>

              <div className="p-5 font-mono text-xs text-slate-800 bg-slate-50 leading-relaxed whitespace-pre-line border-b border-slate-200">
                {academicColdEmailTemplates[selectedTemplateIndex].body
                  .replace(/\[Your Name\]/g, emailStudentName)
                  .replace(/\[Your College\]/g, emailCollege)
                  .replace(/\[Your CGPA\]/g, emailCgpa)
                  .replace(/\[Professor Last Name\]/g, emailTargetProf)
                  .replace(/\[Lab Name.*?\]/g, emailTargetLab)
                  .replace(/\[Mention a specific paper.*?\]/g, emailPaperTopic)
                  .replace(/\[Mention specific topic.*?\]/g, emailPaperTopic)}
              </div>

              <div className="p-4 bg-amber-50/50 space-y-1 text-xs text-amber-900">
                <div className="font-bold flex items-center gap-1 text-amber-800">
                  <Sparkles className="w-3.5 h-3.5" /> Outreach Execution Tips:
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                  {academicColdEmailTemplates[selectedTemplateIndex].strategyNotes.map((note, nIdx) => (
                    <li key={nIdx}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Statement of Purpose (SOP) Blueprint */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              {sopWritingGuidelines.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sopWritingGuidelines.structure.map((sec, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-xs text-indigo-900">{sec.section}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{sec.description}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-red-50 rounded-xl border border-red-200 space-y-1">
              <div className="font-bold text-xs text-red-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-600" />
                Critical Mistakes That Lead to SOP Rejection:
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-red-800">
                {sopWritingGuidelines.commonMistakesToAvoid.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MY APPLICATIONS TRACKER */}
      {/* ========================================================================= */}
      {activeTab === 'tracker' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATUS_CHOICES.map(status => {
              const count = institutions.filter(i => (i.status || 'Wishlist') === status).length;
              return (
                <div key={status} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-2xl font-black text-slate-900">{count}</div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">{status}</div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Your Active Institutional Application Pipeline</h3>
            <div className="space-y-3">
              {institutions.map(inst => (
                <div
                  key={inst.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 gap-3"
                >
                  <div>
                    <div className="font-bold text-sm text-slate-900">{inst.instituteName}</div>
                    <div className="text-xs text-indigo-700 font-medium">{inst.programName}</div>
                    {inst.userNotes && (
                      <div className="text-xs text-slate-500 mt-1 italic">
                        Note: "{inst.userNotes}"
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <select
                      value={inst.status || 'Wishlist'}
                      onChange={e => handleStatusChange(inst.id, e.target.value as ApplicationStatus)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500"
                    >
                      {STATUS_CHOICES.map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <a
                      href={inst.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg text-xs font-bold transition-all"
                      title="Open Application Portal"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Add / Edit Institution Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingInst ? 'Edit Research Institution / Fellowship' : 'Add New Premier Research Fellowship'}
                  </h3>
                  <p className="text-xs text-slate-500">Configure lab details, stipend, and faculty contacts</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInstitution} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Institute Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.instituteName}
                    onChange={(e) => setFormState({ ...formState, instituteName: e.target.value })}
                    placeholder="e.g. IIT Madras / IISc Bangalore"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Short Name</label>
                  <input
                    type="text"
                    value={formState.shortName}
                    onChange={(e) => setFormState({ ...formState, shortName: e.target.value })}
                    placeholder="e.g. IITM / IISc"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Tier / Type</label>
                  <select
                    value={formState.type}
                    onChange={(e) => setFormState({ ...formState, type: e.target.value as InstitutionType })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    {TYPE_OPTIONS.filter(t => t !== 'All').map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800">Location</label>
                  <input
                    type="text"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    placeholder="e.g. Chennai, Tamil Nadu"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Program / Fellowship Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.programName}
                    onChange={(e) => setFormState({ ...formState, programName: e.target.value })}
                    placeholder="e.g. Summer Fellowship Programme (SFP)"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Stipend / Support</label>
                  <input
                    type="text"
                    value={formState.stipend}
                    onChange={(e) => setFormState({ ...formState, stipend: e.target.value })}
                    placeholder="e.g. ₹10,000 / month + hostel accommodation"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Duration</label>
                  <input
                    type="text"
                    value={formState.duration}
                    onChange={(e) => setFormState({ ...formState, duration: e.target.value })}
                    placeholder="e.g. 8 - 10 Weeks"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Application Window</label>
                  <input
                    type="text"
                    value={formState.applicationWindow}
                    onChange={(e) => setFormState({ ...formState, applicationWindow: e.target.value })}
                    placeholder="e.g. Jan 15 - Feb 28"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Min Eligibility / Cutoff</label>
                  <input
                    type="text"
                    value={formState.minCgpaOrRank || ''}
                    onChange={(e) => setFormState({ ...formState, minCgpaOrRank: e.target.value })}
                    placeholder="e.g. CGPA ≥ 8.5 / Top 10%"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Overview / Focus</label>
                <textarea
                  rows={2}
                  value={formState.overview}
                  onChange={(e) => setFormState({ ...formState, overview: e.target.value })}
                  placeholder="Summary of research strengths, lab infrastructure, dirty room / cleanroom access..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Official Portal URL</label>
                <input
                  type="url"
                  value={formState.officialPortalUrl}
                  onChange={(e) => setFormState({ ...formState, officialPortalUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Key Research Highlights (1 per line)
                </label>
                <textarea
                  rows={2}
                  value={formHighlightsRaw}
                  onChange={(e) => setFormHighlightsRaw(e.target.value)}
                  placeholder="Access to 180nm SCL PDK & Cadence EDA suite&#10;Mentorship under DIR-V Shakti processor team"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Target Faculty & Labs (1 per line format: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">Prof Name :: Designation :: Lab Name :: Research Area</code>)
                </label>
                <textarea
                  rows={2}
                  value={formFacultyRaw}
                  onChange={(e) => setFormFacultyRaw(e.target.value)}
                  placeholder="Dr. V. Kamakoti :: Professor, Director :: RISE Lab :: RISC-V Shakti, High-Assurance Security&#10;Dr. Nitin Chandrachoodan :: Professor :: VLSI Lab :: Asynchronous Circuits & DSP Architecture"
                  className="w-full text-xs font-mono p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  {editingInst ? 'Save Fellowship' : 'Create Fellowship'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
