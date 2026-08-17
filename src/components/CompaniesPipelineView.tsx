import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  ExternalLink, 
  Briefcase, 
  Search, 
  Filter, 
  Sparkles, 
  FileText, 
  Edit3,
  ChevronDown,
  Download,
  Copy,
  Check,
  Zap,
  Globe2,
  Cpu,
  Layers,
  GraduationCap,
  Share2,
  Tag,
  Plus,
  Trash2,
  RotateCcw,
  X,
  Save,
  User,
  Phone
} from 'lucide-react';
import { Company, ApplicationStatus, PriorityLevel } from '../types';
import { 
  getStoredCompanies, 
  saveStoredCompanies, 
  resetStoredCompanies 
} from '../utils/storage';

const STATUS_OPTIONS: ApplicationStatus[] = [
  'Wishlist',
  'Resume Ready',
  'Applied',
  'Online Assessment',
  'Technical Interview',
  'Offer',
  'Rejected'
];

const TIER_OPTIONS = [
  'All Tiers',
  'Indian RISC-V & Fabless Startup',
  'MNC Semiconductor',
  'EDA & IP Giant',
  'VLSI Design Services',
  'Embedded & Edge Robotics'
];

const LOCATION_OPTIONS = [
  'All Locations',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Noida',
  'Gurugram',
  'Pune',
  'Navi Mumbai',
  'New Delhi',
  'Sanand (Gujarat)',
  'Ahmedabad',
  'Kochi',
  'Thiruvananthapuram',
  'Mysuru',
  'Mohali (Punjab)',
  'Coimbatore',
  'Dehradun'
];

const PLATFORM_OPTIONS = [
  'All Platforms',
  'LinkedIn',
  'Internshala',
  'Wellfound',
  'Unstop',
  'Naukri',
  'Company Portal'
];

const BLANK_COMPANY: Company = {
  id: '',
  name: '',
  tier: 'Indian RISC-V & Fabless Startup',
  locations: ['Bengaluru'],
  roles: ['RTL Design Intern', 'Silicon Verification Intern'],
  requirements: ['SystemVerilog', 'Digital Design', 'Python'],
  keyHighlights: '',
  careerUrl: 'https://',
  directApplyUrl: '',
  websiteUrl: 'https://',
  priority: 'Critical',
  status: 'Wishlist',
  hiringPlatforms: ['LinkedIn', 'Company Portal'],
  internshipProgramName: 'Direct Engineering Intern',
  notes: '',
  contactPerson: ''
};

export const CompaniesPipelineView: React.FC = () => {
  const [companiesList, setCompaniesList] = useState<Company[]>(() => getStoredCompanies());
  
  const [selectedTier, setSelectedTier] = useState('All Tiers');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');
  const [selectedPriority, setSelectedPriority] = useState<string>('All Priorities');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeNoteEditId, setActiveNoteEditId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Add / Edit Modal State
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [formState, setFormState] = useState<Company>(BLANK_COMPANY);
  const [formLocationsText, setFormLocationsText] = useState('');
  const [formRolesText, setFormRolesText] = useState('');
  const [formRequirementsText, setFormRequirementsText] = useState('');

  const handleOpenAdd = () => {
    const newBlank = {
      ...BLANK_COMPANY,
      id: `custom-company-${Date.now()}`
    };
    setEditingCompany(null);
    setFormState(newBlank);
    setFormLocationsText(newBlank.locations.join(', '));
    setFormRolesText(newBlank.roles.join(', '));
    setFormRequirementsText(newBlank.requirements.join(', '));
    setIsCompanyModalOpen(true);
  };

  const handleOpenEdit = (comp: Company) => {
    setEditingCompany(comp);
    setFormState({ ...comp });
    setFormLocationsText(comp.locations.join(', '));
    setFormRolesText(comp.roles.join(', '));
    setFormRequirementsText(comp.requirements.join(', '));
    setIsCompanyModalOpen(true);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) return;

    const parsedLocations = formLocationsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const parsedRoles = formRolesText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const parsedRequirements = formRequirementsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const finalizedCompany: Company = {
      ...formState,
      name: formState.name.trim(),
      locations: parsedLocations.length > 0 ? parsedLocations : ['Bengaluru'],
      roles: parsedRoles.length > 0 ? parsedRoles : ['VLSI / Embedded Intern'],
      requirements: parsedRequirements.length > 0 ? parsedRequirements : ['Digital Design'],
      careerUrl: formState.careerUrl.trim() || 'https://linkedin.com',
      websiteUrl: formState.websiteUrl.trim() || 'https://google.com'
    };

    let updatedList: Company[];
    if (editingCompany) {
      updatedList = companiesList.map(c => c.id === finalizedCompany.id ? finalizedCompany : c);
    } else {
      updatedList = [finalizedCompany, ...companiesList];
    }

    setCompaniesList(updatedList);
    saveStoredCompanies(updatedList);
    setIsCompanyModalOpen(false);
  };

  const handleDeleteCompany = (companyId: string, companyName: string) => {
    if (window.confirm(`Are you sure you want to remove "${companyName}" from your tracking database?`)) {
      const updatedList = companiesList.filter(c => c.id !== companyId);
      setCompaniesList(updatedList);
      saveStoredCompanies(updatedList);
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset company database back to factory initial 60+ Semiconductor firms? Any custom additions or edits will be restored to defaults.')) {
      const reset = resetStoredCompanies();
      setCompaniesList(reset);
    }
  };

  const handleStatusChange = (companyId: string, newStatus: ApplicationStatus) => {
    const updatedList = companiesList.map(c => {
      if (c.id === companyId) {
        return { ...c, status: newStatus };
      }
      return c;
    });
    setCompaniesList(updatedList);
    saveStoredCompanies(updatedList);
  };

  const handleSaveNote = (companyId: string) => {
    const updatedList = companiesList.map(c => {
      if (c.id === companyId) {
        return { ...c, notes: tempNoteText };
      }
      return c;
    });
    setCompaniesList(updatedList);
    saveStoredCompanies(updatedList);
    setActiveNoteEditId(null);
  };

  const filteredCompanies = useMemo(() => {
    return companiesList.filter(comp => {
      // Tier match
      if (selectedTier !== 'All Tiers' && comp.tier !== selectedTier) {
        return false;
      }
      // Location match
      if (selectedLocation !== 'All Locations') {
        const matchesLoc = comp.locations.some(loc => 
          loc.toLowerCase().includes(selectedLocation.toLowerCase()) || 
          selectedLocation.toLowerCase().includes(loc.toLowerCase())
        );
        if (!matchesLoc) return false;
      }
      // Platform match
      if (selectedPlatform !== 'All Platforms') {
        const hasPlatform = comp.hiringPlatforms?.includes(selectedPlatform as any);
        if (!hasPlatform) return false;
      }
      // Status match
      if (selectedStatus !== 'All Statuses' && comp.status !== selectedStatus) {
        return false;
      }
      // Priority match
      if (selectedPriority !== 'All Priorities' && comp.priority !== selectedPriority) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = comp.name.toLowerCase().includes(q);
        const matchesLocation = comp.locations.some(loc => loc.toLowerCase().includes(q));
        const matchesRole = comp.roles.some(r => r.toLowerCase().includes(q));
        const matchesReq = comp.requirements.some(req => req.toLowerCase().includes(q));
        const matchesHighlights = comp.keyHighlights.toLowerCase().includes(q);
        const matchesInternship = comp.internshipProgramName?.toLowerCase().includes(q);
        const matchesPlatform = comp.hiringPlatforms?.some(p => p.toLowerCase().includes(q));
        if (!matchesName && !matchesLocation && !matchesRole && !matchesReq && !matchesHighlights && !matchesInternship && !matchesPlatform) {
          return false;
        }
      }
      return true;
    });
  }, [companiesList, selectedTier, selectedLocation, selectedPlatform, selectedStatus, selectedPriority, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = companiesList.length;
    const wishlist = companiesList.filter(c => c.status === 'Wishlist').length;
    const applied = companiesList.filter(c => c.status === 'Applied' || c.status === 'Online Assessment' || c.status === 'Technical Interview' || c.status === 'Offer').length;
    const inInterview = companiesList.filter(c => c.status === 'Technical Interview' || c.status === 'Online Assessment').length;
    const offers = companiesList.filter(c => c.status === 'Offer').length;
    const internshalaCount = companiesList.filter(c => c.hiringPlatforms?.includes('Internshala')).length;
    const wellfoundCount = companiesList.filter(c => c.hiringPlatforms?.includes('Wellfound')).length;
    const linkedinCount = companiesList.filter(c => c.hiringPlatforms?.includes('LinkedIn')).length;
    const startupsCount = companiesList.filter(c => c.tier === 'Indian RISC-V & Fabless Startup').length;
    const mncCount = companiesList.filter(c => c.tier === 'MNC Semiconductor').length;
    return { total, wishlist, applied, inInterview, offers, internshalaCount, wellfoundCount, linkedinCount, startupsCount, mncCount };
  }, [companiesList]);

  const handleExportCSV = () => {
    const headers = ['Company Name', 'Tier', 'Priority', 'Locations', 'Application Status', 'Hiring Platforms', 'Internship Program', 'Typical Roles', 'Key Requirements', 'Career URL', 'My Notes'];
    const rows = filteredCompanies.map(c => [
      `"${c.name}"`,
      `"${c.tier}"`,
      `"${c.priority}"`,
      `"${c.locations.join(', ')}"`,
      `"${c.status}"`,
      `"${(c.hiringPlatforms || []).join(' | ')}"`,
      `"${c.internshipProgramName || 'General Entry'}"`,
      `"${c.roles.join(' | ')}"`,
      `"${c.requirements.join(' | ')}"`,
      `"${c.careerUrl}"`,
      `"${(c.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `semiconductor_internship_pipeline_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySummary = () => {
    const summary = filteredCompanies.map(c => 
      `### ${c.name} (${c.tier})\n- **Locations**: ${c.locations.join(', ')}\n- **Target Roles**: ${c.roles.join(', ')}\n- **Hiring Channels**: ${(c.hiringPlatforms || []).join(', ')}\n- **Internship Program**: ${c.internshipProgramName || 'Direct'}\n- **Status**: ${c.status}\n- **Portal**: ${c.careerUrl}\n- **Notes**: ${c.notes || 'None'}\n`
    ).join('\n');

    navigator.clipboard.writeText(summary);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const getStatusBadgeColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'Wishlist':
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
      case 'Resume Ready':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Applied':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Online Assessment':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Technical Interview':
        return 'bg-purple-50 text-purple-700 border-purple-200 font-semibold animate-pulse';
      case 'Offer':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'Dream':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300"><Sparkles className="w-3 h-3" /> Dream Target</span>;
      case 'Critical':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">High Priority</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200">Core Pipeline</span>;
    }
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'Internshala':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">Internshala</span>;
      case 'Wellfound':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-200">Wellfound (AngelList)</span>;
      case 'LinkedIn':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">LinkedIn Jobs</span>;
      case 'Unstop':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">Unstop / D2C</span>;
      case 'Naukri':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">Naukri</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-200">Company Portal</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Summary */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
                <Building2 className="w-6 h-6 text-neutral-800" />
                Semiconductor & Fabless Internship Pipeline
              </h2>
              <span className="text-xs px-2.5 py-0.5 bg-neutral-900 text-white rounded-full font-mono font-bold">
                {stats.total} Companies
              </span>
            </div>
            <p className="text-sm text-neutral-600 mt-1">
              Direct tracking database covering Indian RISC-V startups, EDA giants, global fabless MNCs, and VLSI design houses. Manually add and edit any company or status.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Company</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-colors"
              title="Export complete pipeline to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-colors"
              title="Copy markdown summary of filtered companies"
            >
              {copiedNotification ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedNotification ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handleResetToDefaults}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-neutral-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-xs text-neutral-500 transition-colors"
              title="Reset company list to factory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Pipeline Quick Metric Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-2">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="text-[11px] text-neutral-500 font-medium uppercase">Wishlist</div>
            <div className="text-lg font-bold text-neutral-800">{stats.wishlist}</div>
          </div>
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200">
            <div className="text-[11px] text-amber-700 font-medium uppercase">Applied / Active</div>
            <div className="text-lg font-bold text-amber-900">{stats.applied}</div>
          </div>
          <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200">
            <div className="text-[11px] text-purple-700 font-medium uppercase">OA & Interviews</div>
            <div className="text-lg font-bold text-purple-900">{stats.inInterview}</div>
          </div>
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
            <div className="text-[11px] text-emerald-700 font-medium uppercase">Offers</div>
            <div className="text-lg font-bold text-emerald-900">{stats.offers}</div>
          </div>
          <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-200">
            <div className="text-[11px] text-sky-700 font-medium uppercase">Internshala / WF</div>
            <div className="text-lg font-bold text-sky-900">{stats.internshalaCount + stats.wellfoundCount}</div>
          </div>
          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200">
            <div className="text-[11px] text-indigo-700 font-medium uppercase">Indian Startups</div>
            <div className="text-lg font-bold text-indigo-900">{stats.startupsCount}</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, roles, skills, locations..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-neutral-400 hover:text-neutral-700 absolute right-3 top-1/2 -translate-y-1/2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Platform Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs text-neutral-500 font-medium flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Platform:
            </span>
            {PLATFORM_OPTIONS.map(plat => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedPlatform === plat 
                    ? 'bg-neutral-900 text-white' 
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-100">
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Company Tier</label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full text-xs py-1.5 px-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              {TIER_OPTIONS.map(tier => (
                <option key={tier} value={tier}>{tier}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full text-xs py-1.5 px-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              {LOCATION_OPTIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs py-1.5 px-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="All Statuses">All Statuses</option>
              {STATUS_OPTIONS.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full text-xs py-1.5 px-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="All Priorities">All Priorities</option>
              <option value="Dream">Dream Target</option>
              <option value="Critical">High Priority</option>
              <option value="High">Core Target</option>
              <option value="Medium">Medium</option>
            </select>
          </div>
        </div>
      </div>

      {/* Companies Results Count */}
      <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
        <span>Showing <strong className="text-neutral-900">{filteredCompanies.length}</strong> of {companiesList.length} companies</span>
        {(selectedTier !== 'All Tiers' || selectedLocation !== 'All Locations' || selectedPlatform !== 'All Platforms' || selectedStatus !== 'All Statuses' || selectedPriority !== 'All Priorities' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedTier('All Tiers');
              setSelectedLocation('All Locations');
              setSelectedPlatform('All Platforms');
              setSelectedStatus('All Statuses');
              setSelectedPriority('All Priorities');
              setSearchQuery('');
            }}
            className="text-indigo-600 hover:underline font-medium"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Companies Cards Grid */}
      <div className="space-y-4">
        {filteredCompanies.length === 0 ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center space-y-3">
            <Building2 className="w-10 h-10 text-neutral-300 mx-auto" />
            <div className="text-base font-bold text-neutral-800">No companies found</div>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try relaxing your filters or add a new custom company to your tracker.
            </p>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-bold"
            >
              <Plus className="w-4 h-4" /> Add Company
            </button>
          </div>
        ) : (
          filteredCompanies.map((company) => (
            <div 
              key={company.id}
              className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs hover:border-neutral-300 transition-all"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                {/* Left info column */}
                <div className="space-y-2.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-1.5">
                      {company.name}
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
                      {company.tier}
                    </span>
                    {getPriorityBadge(company.priority)}
                    {company.internshipProgramName && (
                      <span className="text-[11px] px-2 py-0.5 rounded font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {company.internshipProgramName}
                      </span>
                    )}

                    {/* Action buttons: Edit & Delete */}
                    <div className="ml-auto flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(company)}
                        className="p-1 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 rounded-md transition-colors"
                        title="Edit company details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(company.id, company.name)}
                        className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="Delete company"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Platforms & Locations Row */}
                  <div className="flex items-center gap-4 flex-wrap text-xs text-neutral-600">
                    <div className="flex items-center gap-1 text-neutral-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{company.locations.join(', ')}</span>
                    </div>

                    {company.hiringPlatforms && company.hiringPlatforms.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] text-neutral-400 font-semibold uppercase">Channels:</span>
                        {company.hiringPlatforms.map(p => (
                          <React.Fragment key={p}>
                            {getPlatformBadge(p)}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    <a 
                      href={company.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-neutral-900 hover:underline inline-flex items-center gap-1 text-[11px]"
                    >
                      <Globe2 className="w-3 h-3 text-neutral-400" />
                      Official Website
                    </a>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {company.keyHighlights}
                  </p>

                  {/* Typical Roles */}
                  <div className="space-y-1 pt-1">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> Target Roles & Internships
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {company.roles.map((role, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 rounded bg-neutral-50 text-neutral-800 border border-neutral-200/80 font-medium">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-1 pt-1">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      Key Technical Core Requirements
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {company.requirements.map((req, idx) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50/60 text-indigo-900 border border-indigo-100 font-medium">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right controls: Status, Notes, Career Link */}
                <div className="lg:w-72 flex flex-col justify-between gap-3 pt-3 lg:pt-0 lg:border-l lg:border-neutral-100 lg:pl-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-700 block">
                      Application Status
                    </label>
                    <div className="relative">
                      <select
                        value={company.status}
                        onChange={(e) => handleStatusChange(company.id, e.target.value as ApplicationStatus)}
                        className={`w-full text-xs font-semibold py-2 px-3 pr-8 rounded-lg border focus:outline-none focus:ring-2 focus:ring-neutral-900 cursor-pointer transition-colors ${getStatusBadgeColor(company.status)}`}
                      >
                        {STATUS_OPTIONS.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Application Notes */}
                  <div className="space-y-1.5 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                    <div className="flex items-center justify-between text-[11px] font-medium text-neutral-600">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3 text-neutral-400" />
                        My Notes & Follow-up
                      </span>
                      {activeNoteEditId !== company.id && (
                        <button 
                          onClick={() => {
                            setActiveNoteEditId(company.id);
                            setTempNoteText(company.notes || '');
                          }}
                          className="text-neutral-500 hover:text-neutral-900 flex items-center gap-0.5 text-[10px]"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                      )}
                    </div>

                    {activeNoteEditId === company.id ? (
                      <div className="space-y-1.5">
                        <textarea
                          rows={2}
                          value={tempNoteText}
                          onChange={(e) => setTempNoteText(e.target.value)}
                          placeholder="e.g. Found on Internshala / Connected with recruiter on LinkedIn..."
                          className="w-full text-xs p-1.5 bg-white border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        />
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setActiveNoteEditId(null)}
                            className="text-[10px] px-2 py-0.5 text-neutral-600 hover:bg-neutral-200 rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveNote(company.id)}
                            className="text-[10px] px-2 py-0.5 bg-neutral-900 text-white rounded font-medium cursor-pointer"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-neutral-700 italic">
                        {company.notes || <span className="text-neutral-400 not-italic">No custom notes yet. Click edit to add application details.</span>}
                      </p>
                    )}
                  </div>

                  {/* Career and Direct Apply Links */}
                  <div className="pt-1 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <a
                        href={company.directApplyUrl || company.careerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors text-center shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {company.directApplyUrl ? 'Direct Apply Link' : 'Apply / Career Portal'}
                      </a>
                      <button
                        title="Copy direct application link"
                        onClick={() => {
                          const urlToCopy = company.directApplyUrl || company.careerUrl;
                          navigator.clipboard.writeText(urlToCopy);
                          setCopiedNotification(true);
                          setTimeout(() => setCopiedNotification(false), 2000);
                        }}
                        className="p-2 text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {company.directApplyUrl && company.careerUrl !== company.directApplyUrl && (
                      <a
                        href={company.careerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-center text-neutral-500 hover:text-neutral-900 hover:underline flex items-center justify-center gap-1"
                      >
                        <Globe2 className="w-3 h-3 text-neutral-400" />
                        Explore General Careers Page
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Company Modal */}
      {isCompanyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    {editingCompany ? 'Edit Company Information' : 'Add New Semiconductor Company'}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Manage direct hiring portals, target roles, locations & application status
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCompanyModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSaveCompany} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. InCore Semiconductors / Qualcomm"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                {/* Tier */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Tier / Category</label>
                  <select
                    value={formState.tier}
                    onChange={(e) => setFormState({ ...formState, tier: e.target.value as any })}
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  >
                    <option value="Indian RISC-V & Fabless Startup">Indian RISC-V & Fabless Startup</option>
                    <option value="MNC Semiconductor">MNC Semiconductor</option>
                    <option value="EDA & IP Giant">EDA & IP Giant</option>
                    <option value="VLSI Design Services">VLSI Design Services</option>
                    <option value="Embedded & Edge Robotics">Embedded & Edge Robotics</option>
                  </select>
                </div>

                {/* Priority */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Priority Level</label>
                  <select
                    value={formState.priority}
                    onChange={(e) => setFormState({ ...formState, priority: e.target.value as PriorityLevel })}
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  >
                    <option value="Dream">Dream Target</option>
                    <option value="Critical">High Priority</option>
                    <option value="High">Core Target</option>
                    <option value="Medium">Medium Priority</option>
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Application Status</label>
                  <select
                    value={formState.status}
                    onChange={(e) => setFormState({ ...formState, status: e.target.value as ApplicationStatus })}
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  >
                    {STATUS_OPTIONS.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Locations */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">
                  Locations (comma separated)
                </label>
                <input
                  type="text"
                  value={formLocationsText}
                  onChange={(e) => setFormLocationsText(e.target.value)}
                  placeholder="e.g. Bengaluru, Hyderabad, Chennai, Remote"
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              {/* Roles */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">
                  Target Roles (comma separated)
                </label>
                <input
                  type="text"
                  value={formRolesText}
                  onChange={(e) => setFormRolesText(e.target.value)}
                  placeholder="e.g. RTL Design Intern, ASIC Verification, Firmware Engineer"
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              {/* Requirements */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">
                  Key Requirements (comma separated)
                </label>
                <input
                  type="text"
                  value={formRequirementsText}
                  onChange={(e) => setFormRequirementsText(e.target.value)}
                  placeholder="e.g. SystemVerilog, UVM, STA, RISC-V ISA, Python, C"
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              {/* Key Highlights */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">
                  Overview & Key Highlights
                </label>
                <textarea
                  rows={2}
                  value={formState.keyHighlights}
                  onChange={(e) => setFormState({ ...formState, keyHighlights: e.target.value })}
                  placeholder="Brief note on what makes this company or lab stand out..."
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Career / Application URL</label>
                  <input
                    type="url"
                    value={formState.careerUrl}
                    onChange={(e) => setFormState({ ...formState, careerUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Direct Apply URL (Optional)</label>
                  <input
                    type="url"
                    value={formState.directApplyUrl || ''}
                    onChange={(e) => setFormState({ ...formState, directApplyUrl: e.target.value })}
                    placeholder="https://internshala.com/... or job posting link"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              {/* Internship program & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Internship Program Name</label>
                  <input
                    type="text"
                    value={formState.internshipProgramName || ''}
                    onChange={(e) => setFormState({ ...formState, internshipProgramName: e.target.value })}
                    placeholder="e.g. Qualcomm Summer Intern / Direct Mentorship"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Website URL</label>
                  <input
                    type="url"
                    value={formState.websiteUrl}
                    onChange={(e) => setFormState({ ...formState, websiteUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">Personal Notes & Contacts</label>
                <textarea
                  rows={2}
                  value={formState.notes || ''}
                  onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                  placeholder="e.g. Sent cold DM to engineering manager on LinkedIn on 15th..."
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCompanyModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  {editingCompany ? 'Save Changes' : 'Create Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
