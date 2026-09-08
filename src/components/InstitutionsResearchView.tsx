import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  Search, 
  ExternalLink, 
  Calendar, 
  Award, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  RotateCcw,
  Sparkles,
  Mail,
  FileText,
  UserCheck
} from 'lucide-react';
import { ResearchInstitution, ApplicationStatus } from '../types';
import { 
  getStoredInstitutions, 
  saveStoredInstitutions, 
  resetStoredInstitutions,
  getInstitutionsOverrides,
  saveInstitutionsOverrides
} from '../utils/storage';

export const InstitutionsResearchView: React.FC = () => {
  const [institutions, setInstitutions] = useState<ResearchInstitution[]>(() => getStoredInstitutions());
  const [overrides, setOverrides] = useState<Record<string, any>>(() => getInstitutionsOverrides());

  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [stipendFilter, setStipendFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'fellowships' | 'faculty' | 'sop_guide'>('fellowships');

  const toggleBookmark = (id: string) => {
    const current = !!overrides[id]?.bookmarked;
    const updated = {
      ...overrides,
      [id]: {
        ...(overrides[id] || {}),
        bookmarked: !current
      }
    };
    setOverrides(updated);
    saveInstitutionsOverrides(updated);
  };

  const setStatus = (id: string, status: string) => {
    const updated = {
      ...overrides,
      [id]: {
        ...(overrides[id] || {}),
        status
      }
    };
    setOverrides(updated);
    saveInstitutionsOverrides(updated);
  };

  const handleReset = () => {
    if (window.confirm('Reset all institution trackers to default?')) {
      const def = resetStoredInstitutions();
      setInstitutions(def);
      setOverrides({});
      saveInstitutionsOverrides({});
    }
  };

  const filteredInstitutions = useMemo(() => {
    return institutions.filter((inst) => {
      const ovr = overrides[inst.id] || {};
      if (typeFilter !== 'All' && inst.type !== typeFilter) return false;
      if (stipendFilter === 'Funded' && inst.stipend?.toLowerCase().includes('unpaid')) return false;
      if (stipendFilter === 'Bookmarked' && !ovr.bookmarked) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = inst.name.toLowerCase().includes(q) || inst.shortName.toLowerCase().includes(q);
        const matchesProg = inst.programName.toLowerCase().includes(q);
        const matchesDomain = inst.domains.some((d) => d.toLowerCase().includes(q));
        const matchesLoc = inst.location?.toLowerCase().includes(q);
        if (!matchesName && !matchesProg && !matchesDomain && !matchesLoc) return false;
      }
      return true;
    });
  }, [institutions, overrides, typeFilter, stipendFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = institutions.length;
    const bookmarked = institutions.filter((i) => overrides[i.id]?.bookmarked).length;
    const applied = institutions.filter((i) => overrides[i.id]?.status === 'Applied').length;
    return { total, bookmarked, applied };
  }, [institutions, overrides]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Premier Indian Fellowships</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
              37 Research Labs
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            IITs, NITs &amp; National Lab Fellowships
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Direct gateway to prestigious summer research fellowships, funded internships, and semiconductor laboratories across IIT Madras (SFP), IISc CeNSE/DESE, IIT Bombay (IRCC), IIT Roorkee (SPARK), and C-DAC.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-3">
            <span className="text-[11px] text-neutral-400 font-medium">Institutions</span>
            <div className="text-lg font-bold text-white mt-0.5">{stats.total}</div>
          </div>
          <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-3">
            <span className="text-[11px] text-neutral-400 font-medium">Saved / Starred</span>
            <div className="text-lg font-bold text-amber-400 mt-0.5">{stats.bookmarked}</div>
          </div>
          <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-3">
            <span className="text-[11px] text-neutral-400 font-medium">Applied</span>
            <div className="text-lg font-bold text-cyan-400 mt-0.5">{stats.applied}</div>
          </div>
          <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-3">
            <span className="text-[11px] text-neutral-400 font-medium">Standard Stipend</span>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">₹6k - ₹25k / mo</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('fellowships')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
            activeTab === 'fellowships'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Fellowship Portals ({institutions.length})
        </button>
        <button
          onClick={() => setActiveTab('sop_guide')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
            activeTab === 'sop_guide'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          SOP &amp; Cold Emailing Guide
        </button>
      </div>

      {activeTab === 'fellowships' ? (
        <>
          {/* Filters */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by institute name, program, VLSI, or nanoelectronics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Overrides</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 border-t border-neutral-100">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 rounded-lg p-2 focus:ring-1 focus:ring-neutral-900 cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="IIT">IITs</option>
                <option value="IISc">IISc</option>
                <option value="NIT">NITs / IIITs</option>
                <option value="Autonomous Lab / Govt">Autonomous / Govt Labs</option>
              </select>

              <select
                value={stipendFilter}
                onChange={(e) => setStipendFilter(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 rounded-lg p-2 focus:ring-1 focus:ring-neutral-900 cursor-pointer"
              >
                <option value="All">All Stipend Types</option>
                <option value="Funded">Funded / Paid Only</option>
                <option value="Bookmarked">Saved Only</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInstitutions.map((inst) => {
              const ovr = overrides[inst.id] || {};
              const isFav = !!ovr.bookmarked;
              const status = ovr.status || 'Not Applied';

              return (
                <div
                  key={inst.id}
                  className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                            {inst.shortName}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-medium">
                            {inst.type}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-neutral-900 mt-1.5 line-clamp-2">
                          {inst.programName}
                        </h3>
                      </div>

                      <button
                        onClick={() => toggleBookmark(inst.id)}
                        className={`p-1.5 rounded-lg border cursor-pointer ${
                          isFav ? 'bg-amber-50 border-amber-300 text-amber-600' : 'bg-white border-neutral-200 text-neutral-400 hover:text-neutral-700'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>

                    <p className="text-xs text-neutral-600 font-medium">
                      {inst.name}
                    </p>

                    {/* Stipend & Duration */}
                    <div className="bg-neutral-50 rounded-lg p-2.5 space-y-1.5 text-xs text-neutral-700">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Stipend:</span>
                        <span className="font-semibold text-emerald-700">{inst.stipend || 'Provided as per norms'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Duration:</span>
                        <span className="font-medium">{inst.duration || '6 - 10 Weeks'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Window:</span>
                        <span className="font-medium text-amber-700">{inst.deadline || 'Feb - April typical'}</span>
                      </div>
                    </div>

                    {/* Domains */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Focus Domains:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {inst.domains.map((dom, idx) => (
                          <span key={idx} className="text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded">
                            {dom}
                          </span>
                        ))}
                      </div>
                    </div>

                    {inst.eligibility && (
                      <p className="text-[11px] text-neutral-500 line-clamp-2">
                        <strong>Eligibility:</strong> {inst.eligibility}
                      </p>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <select
                      value={status}
                      onChange={(e) => setStatus(inst.id, e.target.value)}
                      className="text-xs font-semibold rounded-lg px-2 py-1 bg-neutral-50 border border-neutral-200 text-neutral-700 cursor-pointer"
                    >
                      <option value="Not Applied">Not Applied</option>
                      <option value="Preparing Docs">Preparing Docs</option>
                      <option value="Applied">Applied</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Selected">Selected</option>
                    </select>

                    <a
                      href={inst.applicationUrl || inst.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Apply Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* SOP Guide Tab */
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-xl font-bold text-neutral-900">
              Professor Cold Email &amp; Statement of Purpose (SOP) Protocol
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              When applying to premier labs at IISc, IIT Madras, and TIFR, standard generic applications are ignored. Here is the verified high-yield strategy for undergraduate researchers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <FileText className="w-4 h-4" />
                <span>The 4-Paragraph Cold Email Architecture</span>
              </div>
              <ul className="text-xs text-neutral-700 space-y-2.5 leading-relaxed list-disc list-inside">
                <li>
                  <strong>Para 1: Exact Anchor:</strong> &quot;I read your IEEE TCAS-I paper on [Paper Title] and was intrigued by your low-swing voltage driver design...&quot;
                </li>
                <li>
                  <strong>Para 2: Concrete Proof of Work:</strong> &quot;I have implemented a 5-stage pipelined RV32I core in SystemVerilog with 100% test coverage using Verilator, available at github.com/...&quot;
                </li>
                <li>
                  <strong>Para 3: Clear Alignment:</strong> &quot;I would love to contribute to your lab's ongoing work in [Specific Topic] for 8-10 weeks during Summer 2026.&quot;
                </li>
                <li>
                  <strong>Para 4: Frictionless Close:</strong> Attach 1-page ATS Resume, link to GitHub portfolio, specify no stipend dependency if sponsored by home institute.
                </li>
              </ul>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Non-Negotiable SOP Checklist</span>
              </div>
              <ul className="text-xs text-neutral-700 space-y-2 text-neutral-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Highlight CGPA (especially 8.0+ in Circuit Theory, Digital Logic, Signals)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Show familiarity with industry tools: ModelSim, Vivado, OpenLane, Cadence Virtuoso</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Demonstrate willingness to learn tapeout and physical silicon fabrication</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Obtain Letter of Recommendation (LOR) from Department HOD early</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
