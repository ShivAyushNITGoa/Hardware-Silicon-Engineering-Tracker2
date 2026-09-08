import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  ExternalLink, 
  Edit2, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  MapPin, 
  FileText, 
  Filter, 
  Sparkles,
  ChevronDown,
  X,
  Share2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Company, CompanyTier, ApplicationStatus, Priority } from '../types';
import { getStoredCompanies, saveStoredCompanies, resetStoredCompanies } from '../utils/storage';

const emptyCompany: Company = {
  id: '',
  name: '',
  tier: 'Tier 2 MNC / Mid-tier' as CompanyTier,
  locations: ['Bengaluru'],
  roles: ['VLSI / Embedded Intern'],
  requirements: ['Verilog', 'Digital Design'],
  status: 'Wishlist' as ApplicationStatus,
  priority: 'P1 - High' as Priority,
  websiteUrl: 'https://google.com',
  careerUrl: 'https://linkedin.com',
  keyHighlights: 'Hardware & Silicon engineering team in India'
};

export const CompaniesPipelineView: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(() => getStoredCompanies());
  const [tierFilter, setTierFilter] = useState<string>('All Tiers');
  const [locationFilter, setLocationFilter] = useState<string>('All Locations');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [priorityFilter, setPriorityFilter] = useState<string>('All Priorities');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<Company>(emptyCompany);
  const [formLocations, setFormLocations] = useState<string>('');
  const [formRoles, setFormRoles] = useState<string>('');
  const [formRequirements, setFormRequirements] = useState<string>('');

  const [notesModalCompanyId, setNotesModalCompanyId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState<string>('');

  // Open Create
  const handleOpenCreate = () => {
    const fresh: Company = {
      ...emptyCompany,
      id: `custom-company-${Date.now()}`
    };
    setEditingCompany(null);
    setFormData(fresh);
    setFormLocations(fresh.locations.join(', '));
    setFormRoles(fresh.roles.join(', '));
    setFormRequirements(fresh.requirements.join(', '));
    setIsEditModalOpen(true);
  };

  // Open Edit
  const handleOpenEdit = (c: Company) => {
    setEditingCompany(c);
    setFormData({ ...c });
    setFormLocations(c.locations.join(', '));
    setFormRoles(c.roles.join(', '));
    setFormRequirements(c.requirements.join(', '));
    setIsEditModalOpen(true);
  };

  // Save Form
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const locs = formLocations.split(',').map((s) => s.trim()).filter(Boolean);
    const rols = formRoles.split(',').map((s) => s.trim()).filter(Boolean);
    const reqs = formRequirements.split(',').map((s) => s.trim()).filter(Boolean);

    const saved: Company = {
      ...formData,
      name: formData.name.trim(),
      locations: locs.length > 0 ? locs : ['Bengaluru'],
      roles: rols.length > 0 ? rols : ['VLSI / Embedded Intern'],
      requirements: reqs.length > 0 ? reqs : ['Digital Design'],
      careerUrl: formData.careerUrl.trim() || 'https://linkedin.com',
      websiteUrl: formData.websiteUrl.trim() || 'https://google.com'
    };

    let updated: Company[];
    if (editingCompany) {
      updated = companies.map((c) => (c.id === saved.id ? saved : c));
    } else {
      updated = [saved, ...companies];
    }

    setCompanies(updated);
    saveStoredCompanies(updated);
    setIsEditModalOpen(false);
  };

  // Delete
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from your tracking database?`)) {
      const updated = companies.filter((c) => c.id !== id);
      setCompanies(updated);
      saveStoredCompanies(updated);
    }
  };

  // Reset
  const handleReset = () => {
    if (window.confirm('Reset company database back to default 60+ semiconductor firms?')) {
      const def = resetStoredCompanies();
      setCompanies(def);
    }
  };

  // Change Status
  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    const updated = companies.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setCompanies(updated);
    saveStoredCompanies(updated);
  };

  // Save Notes
  const handleSaveNotes = (id: string) => {
    const updated = companies.map((c) => (c.id === id ? { ...c, notes: notesText } : c));
    setCompanies(updated);
    saveStoredCompanies(updated);
    setNotesModalCompanyId(null);
  };

  // Filters
  const uniqueLocations = useMemo(() => {
    const locs = new Set<string>();
    companies.forEach((c) => c.locations.forEach((l) => locs.add(l)));
    return ['All Locations', ...Array.from(locs).sort()];
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      if (tierFilter !== 'All Tiers' && c.tier !== tierFilter) return false;
      if (locationFilter !== 'All Locations' && !c.locations.some((l) => l.toLowerCase().includes(locationFilter.toLowerCase()))) {
        return false;
      }
      if (statusFilter !== 'All Statuses' && c.status !== statusFilter) return false;
      if (priorityFilter !== 'All Priorities' && c.priority !== priorityFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesRoles = c.roles.some((r) => r.toLowerCase().includes(q));
        const matchesReqs = c.requirements.some((r) => r.toLowerCase().includes(q));
        const matchesLocs = c.locations.some((l) => l.toLowerCase().includes(q));
        const matchesHighlights = c.keyHighlights?.toLowerCase().includes(q);
        if (!matchesName && !matchesRoles && !matchesReqs && !matchesLocs && !matchesHighlights) {
          return false;
        }
      }
      return true;
    });
  }, [companies, tierFilter, locationFilter, statusFilter, priorityFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = companies.length;
    const wishlist = companies.filter((c) => c.status === 'Wishlist').length;
    const applied = companies.filter((c) => c.status === 'Applied').length;
    const interviewing = companies.filter((c) => c.status === 'Technical Interview' || c.status === 'Online Assessment').length;
    const offers = companies.filter((c) => c.status === 'Offer').length;
    return { total, wishlist, applied, interviewing, offers };
  }, [companies]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Indian Semiconductor Pipeline</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
              60+ Firms
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Semiconductor Company Directory &amp; Pipeline
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Targeted tracking of Tier-1 MNCs, Indian Fabless startups under India Semiconductor Mission (ISM/DLI), IP design houses, and testing labs.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-3">
            <span className="text-[11px] text-neutral-400 font-medium">Total Tracked</span>
            <div className="text-lg font-bold text-white mt-0.5">{stats.total}</div>
          </div>
          <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-3">
            <span className="text-[11px] text-neutral-400 font-medium">Wishlist</span>
            <div className="text-lg font-bold text-blue-400 mt-0.5">{stats.wishlist}</div>
          </div>
          <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-3">
            <span className="text-[11px] text-neutral-400 font-medium">Applied</span>
            <div className="text-lg font-bold text-amber-400 mt-0.5">{stats.applied}</div>
          </div>
          <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-3">
            <span className="text-[11px] text-neutral-400 font-medium">In Process</span>
            <div className="text-lg font-bold text-cyan-400 mt-0.5">{stats.interviewing}</div>
          </div>
          <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-3">
            <span className="text-[11px] text-neutral-400 font-medium">Offers</span>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{stats.offers}</div>
          </div>
        </div>
      </div>

      {/* Action Controls & Filters */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search companies by name, role (RTL, DV, PD), location, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-700 p-0.5 rounded cursor-pointer transition-colors"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenCreate}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Company</span>
            </button>
            <button
              onClick={handleReset}
              title="Reset to factory list"
              className="flex items-center gap-1.5 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 border-t border-neutral-100">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 rounded-lg p-2 focus:ring-1 focus:ring-neutral-900 cursor-pointer"
          >
            <option>All Tiers</option>
            <option>Tier 1 Global Giant</option>
            <option>Tier 2 MNC / Mid-tier</option>
            <option>Indian Fabless Startup</option>
            <option>Service / VLSI Design House</option>
            <option>Govt / PSUs / Defense</option>
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 rounded-lg p-2 focus:ring-1 focus:ring-neutral-900 cursor-pointer"
          >
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 rounded-lg p-2 focus:ring-1 focus:ring-neutral-900 cursor-pointer"
          >
            <option>All Statuses</option>
            <option>Wishlist</option>
            <option>Applied</option>
            <option>Online Assessment</option>
            <option>Technical Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 rounded-lg p-2 focus:ring-1 focus:ring-neutral-900 cursor-pointer"
          >
            <option>All Priorities</option>
            <option>P0 - Critical</option>
            <option>P1 - High</option>
            <option>P2 - Medium</option>
          </select>
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-500 pt-1 font-medium">
          <span>Showing {filteredCompanies.length} companies</span>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.length === 0 ? (
          <div className="col-span-full py-16 text-center text-neutral-400 bg-white border border-neutral-200 rounded-2xl">
            No companies matching the selected criteria.
          </div>
        ) : (
          filteredCompanies.map((c) => {
            return (
              <div 
                key={c.id} 
                className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-all"
              >
                <div className="space-y-3">
                  {/* Top line: Name & Tier */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                        {c.name}
                      </h3>
                      <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded mt-1 inline-block">
                        {c.tier}
                      </span>
                    </div>

                    {/* Priority badge */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.priority?.startsWith('P0') 
                        ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                        : c.priority?.startsWith('P1')
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {c.priority || 'P1'}
                    </span>
                  </div>

                  {/* Locations */}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate">{c.locations.join(', ')}</span>
                  </div>

                  {/* Highlights / Description */}
                  {c.keyHighlights && (
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {c.keyHighlights}
                    </p>
                  )}

                  {/* Roles tags */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Target Roles:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {c.roles.slice(0, 3).map((r, i) => (
                        <span key={i} className="text-[11px] bg-cyan-50 text-cyan-800 border border-cyan-200 px-1.5 py-0.5 rounded">
                          {r}
                        </span>
                      ))}
                      {c.roles.length > 3 && (
                        <span className="text-[10px] text-neutral-500 font-medium self-center">
                          +{c.roles.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Requirements / Tech tags */}
                  <div className="flex flex-wrap gap-1">
                    {c.requirements.slice(0, 4).map((req, i) => (
                      <span key={i} className="text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded">
                        {req}
                      </span>
                    ))}
                  </div>

                  {/* Notes snippet */}
                  {c.notes && (
                    <div className="text-[11px] bg-amber-50/70 border border-amber-200/60 rounded-lg p-2 text-amber-900">
                      <strong>Notes:</strong> {c.notes}
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                  {/* Status Selector */}
                  <select
                    value={c.status}
                    onChange={(e) => handleStatusChange(c.id, e.target.value as ApplicationStatus)}
                    className={`text-xs font-semibold rounded-lg px-2 py-1 border cursor-pointer ${
                      c.status === 'Offer' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : c.status === 'Technical Interview' || c.status === 'Online Assessment'
                        ? 'bg-cyan-50 text-cyan-800 border-cyan-300'
                        : c.status === 'Applied'
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                    }`}
                  >
                    <option value="Wishlist">Wishlist</option>
                    <option value="Applied">Applied</option>
                    <option value="Online Assessment">Assessment</option>
                    <option value="Technical Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <div className="flex items-center gap-1.5">
                    {/* Notes button */}
                    <button
                      onClick={() => {
                        setNotesModalCompanyId(c.id);
                        setNotesText(c.notes || '');
                      }}
                      title="Add / Edit Notes"
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>

                    {/* Edit button */}
                    <button
                      onClick={() => handleOpenEdit(c)}
                      title="Edit Company"
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Career link */}
                    <a
                      href={c.careerUrl || c.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-cyan-700 hover:text-cyan-900 hover:bg-cyan-50 cursor-pointer"
                      title="Open Careers Portal"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(c.id, c.name)}
                      title="Delete Company"
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit/Create Modal */}
      {isEditModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-white border border-neutral-200 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="text-base font-bold text-neutral-900">
                {editingCompany ? 'Edit Company Information' : 'Add New Semiconductor Target'}
              </h2>
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  placeholder="e.g. Mindgrove Technologies"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Tier / Category</label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value as CompanyTier })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900"
                  >
                    <option>Tier 1 Global Giant</option>
                    <option>Tier 2 MNC / Mid-tier</option>
                    <option>Indian Fabless Startup</option>
                    <option>Service / VLSI Design House</option>
                    <option>Govt / PSUs / Defense</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900"
                  >
                    <option>P0 - Critical</option>
                    <option>P1 - High</option>
                    <option>P2 - Medium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Locations (comma-separated)</label>
                <input
                  type="text"
                  value={formLocations}
                  onChange={(e) => setFormLocations(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900"
                  placeholder="Bengaluru, Hyderabad, Noida"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Target Roles (comma-separated)</label>
                <input
                  type="text"
                  value={formRoles}
                  onChange={(e) => setFormRoles(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900"
                  placeholder="RTL Design Intern, ASIC DV Intern"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Key Requirements / Skills</label>
                <input
                  type="text"
                  value={formRequirements}
                  onChange={(e) => setFormRequirements(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900"
                  placeholder="Verilog, SystemVerilog, UVM, STA"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Career / Application URL</label>
                <input
                  type="url"
                  value={formData.careerUrl}
                  onChange={(e) => setFormData({ ...formData, careerUrl: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Key Highlights</label>
                <textarea
                  rows={2}
                  value={formData.keyHighlights}
                  onChange={(e) => setFormData({ ...formData, keyHighlights: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900"
                  placeholder="Specialization, tapeout details, notable achievements..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Save Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {notesModalCompanyId && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setNotesModalCompanyId(null)}
        >
          <div 
            className="relative w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-2xl p-5 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="text-sm font-bold text-neutral-900">Application Notes &amp; Contacts</h3>
              <button onClick={() => setNotesModalCompanyId(null)} className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              rows={5}
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="e.g. Connected with Lead Architect on LinkedIn on 12th Jan. Referred by alumni..."
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setNotesModalCompanyId(null)}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveNotes(notesModalCompanyId)}
                className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
