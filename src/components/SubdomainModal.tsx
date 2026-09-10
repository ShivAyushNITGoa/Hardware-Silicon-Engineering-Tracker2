import React, { useState, useEffect } from 'react';
import { X, Save, Layers, Briefcase, Wrench, BookOpen, AlertCircle, Plus } from 'lucide-react';
import { SubdomainDetail, JobProfileClassification, SkillProfileClassification, KnowledgeProfileClassification } from '../types';

interface SubdomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subdomain: SubdomainDetail) => void;
  initialSubdomain?: SubdomainDetail | null;
}

interface FormState {
  name: string;
  domainId: 'vlsi' | 'embedded' | 'career-strategy';
  tagline: string;
  description: string;
  // Job
  jobTitle: string;
  jobTier: 'Entry / Intern' | 'Junior (1-3 Yrs)' | 'Mid / Senior';
  jobCompanies: string;
  jobSalaryIndia: string;
  jobSalaryUS: string;
  jobResponsibilities: string;
  // Skill
  skillName: string;
  skillLevel: 'Foundational' | 'Core Industrial' | 'Advanced Signoff';
  skillTools: string;
  skillRelevance: string;
  skillProjectEvidence: string;
  // Knowledge
  knowledgeConcept: string;
  knowledgeDepth: 'Theoretical Foundation' | 'Architectural Concept' | 'Tapeout / Signoff Reality';
  knowledgeWhyCrucial: string;
  knowledgeQuestions: string;
}

const DEFAULT_FORM: FormState = {
  name: '',
  domainId: 'vlsi',
  tagline: '',
  description: '',
  jobTitle: '',
  jobTier: 'Entry / Intern',
  jobCompanies: 'NVIDIA, Intel, Qualcomm, AMD, Apple, Texas Instruments',
  jobSalaryIndia: '₹14L - ₹24L CTC',
  jobSalaryUS: '$110,000 - $145,000 Base',
  jobResponsibilities: 'Microarchitecture specification and RTL design\nLinting, CDC analysis, and formal verification\nSynthesis timing closure and gate-level debugging',
  skillName: '',
  skillLevel: 'Core Industrial',
  skillTools: 'Synopsys Design Compiler, Cadence Genus, Verilator, QuestaSim',
  skillRelevance: 'Industry prerequisite for sub-micron digital ASIC timing closure',
  skillProjectEvidence: 'Developed pipelined hardware accelerator with complete assertion test suite',
  knowledgeConcept: '',
  knowledgeDepth: 'Architectural Concept',
  knowledgeWhyCrucial: 'Directly dictates silicon area, static leakage, and dynamic frequency scaling',
  knowledgeQuestions: 'Explain setup and hold timing margins and recovery techniques.\nHow do multi-cycle and false paths affect STA signoff?'
};

export const SubdomainModal: React.FC<SubdomainModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSubdomain
}) => {
  const [activeTab, setActiveTab] = useState<'basics' | 'job' | 'skill' | 'knowledge'>('basics');
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialSubdomain) {
      const job = initialSubdomain.jobs[0];
      const skill = initialSubdomain.skills[0];
      const knowledge = initialSubdomain.knowledge[0];

      setFormData({
        name: initialSubdomain.name || '',
        domainId: initialSubdomain.domainId || 'vlsi',
        tagline: initialSubdomain.tagline || '',
        description: initialSubdomain.description || '',
        jobTitle: job?.title || '',
        jobTier: job?.experienceTier || 'Entry / Intern',
        jobCompanies: job?.targetCompanies?.join(', ') || '',
        jobSalaryIndia: job?.salaryIndiaCTC || '',
        jobSalaryUS: job?.salaryUSRange || '',
        jobResponsibilities: job?.keyResponsibilities?.join('\n') || '',
        skillName: skill?.name || '',
        skillLevel: skill?.proficiencyLevel || 'Core Industrial',
        skillTools: skill?.tools?.join(', ') || '',
        skillRelevance: skill?.industryRelevance || '',
        skillProjectEvidence: skill?.practicalProjectEvidence || '',
        knowledgeConcept: knowledge?.concept || '',
        knowledgeDepth: knowledge?.theoryDepth || 'Architectural Concept',
        knowledgeWhyCrucial: knowledge?.whyCrucial || '',
        knowledgeQuestions: knowledge?.keyQuestions?.join('\n') || ''
      });
    } else {
      setFormData(DEFAULT_FORM);
    }
    setErrors({});
    setActiveTab('basics');
  }, [initialSubdomain, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Subdomain name is required';
    if (!formData.tagline.trim()) errs.tagline = 'Subdomain tagline is required';
    if (!formData.jobTitle.trim()) errs.jobTitle = 'Primary job title is required';
    if (!formData.skillName.trim()) errs.skillName = 'Primary skill name is required';
    if (!formData.knowledgeConcept.trim()) errs.knowledgeConcept = 'Core physics/theory concept is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      if (errors.name || errors.tagline) setActiveTab('basics');
      else if (errors.jobTitle) setActiveTab('job');
      else if (errors.skillName) setActiveTab('skill');
      else if (errors.knowledgeConcept) setActiveTab('knowledge');
      return;
    }

    const domainName = 
      formData.domainId === 'vlsi' 
        ? 'VLSI & Silicon Engineering' 
        : formData.domainId === 'embedded' 
          ? 'Embedded Systems & Firmware' 
          : 'Hardware Career Strategy';

    const companies = formData.jobCompanies.split(',').map(s => s.trim()).filter(Boolean);
    const responsibilities = formData.jobResponsibilities.split('\n').map(s => s.trim()).filter(Boolean);
    const tools = formData.skillTools.split(',').map(s => s.trim()).filter(Boolean);
    const questions = formData.knowledgeQuestions.split('\n').map(s => s.trim()).filter(Boolean);

    const primaryJob: JobProfileClassification = {
      id: initialSubdomain?.jobs[0]?.id || `job-${Date.now()}`,
      title: formData.jobTitle.trim(),
      experienceTier: formData.jobTier,
      description: `${formData.jobTitle.trim()} focused on ${formData.name.trim()} domain execution.`,
      keyResponsibilities: responsibilities.length > 0 ? responsibilities : ['Hardware design and signoff'],
      primaryDeliverables: ['Verified RTL codebase', 'Timing signoff reports', 'Production documentation'],
      interviewTopics: ['RTL design', 'STA timing closure', 'CDC verification'],
      targetCompanies: companies.length > 0 ? companies : ['NVIDIA', 'Intel', 'Qualcomm'],
      salaryIndiaCTC: formData.jobSalaryIndia.trim() || '₹14L - ₹24L CTC',
      salaryUSRange: formData.jobSalaryUS.trim() || '$110,000 - $145,000 Base',
      industryDemandLevel: 'Very High',
      typicalInterviewRounds: ['Online Screening', 'Technical Design Round', 'Whiteboard Problem Solving', 'HR & Values']
    };

    const primarySkill: SkillProfileClassification = {
      id: initialSubdomain?.skills[0]?.id || `skill-${Date.now()}`,
      name: formData.skillName.trim(),
      category: formData.domainId === 'embedded' ? 'Embedded Firmware' : 'HDL & RTL',
      proficiencyLevel: formData.skillLevel,
      industryRelevance: formData.skillRelevance.trim() || 'Essential industrial skill for tapeout success',
      masteryCriteria: 'Able to write clean, synthesizable code and close timing without violations',
      tools: tools.length > 0 ? tools : ['Verilator', 'Synopsys Design Compiler'],
      practicalProjectEvidence: formData.skillProjectEvidence.trim() || 'Functional RTL design verified in simulation',
      standardsCompliance: ['IEEE 1800-2017', 'AMBA AXI4']
    };

    const primaryKnowledge: KnowledgeProfileClassification = {
      id: initialSubdomain?.knowledge[0]?.id || `know-${Date.now()}`,
      concept: formData.knowledgeConcept.trim(),
      theoryDepth: formData.knowledgeDepth,
      whyCrucial: formData.knowledgeWhyCrucial.trim() || 'Foundational silicon reality affecting chip viability',
      keyQuestions: questions.length > 0 ? questions : ['Explain key failure modes and timing safety margins.'],
      interviewEmphasis: 'High whiteboard frequency in tier-1 silicon interviews',
      siliconImpact: 'Direct impact on clock frequency and power efficiency'
    };

    // Preserve any existing secondary jobs/skills/knowledge if editing
    const otherJobs = initialSubdomain ? initialSubdomain.jobs.slice(1) : [];
    const otherSkills = initialSubdomain ? initialSubdomain.skills.slice(1) : [];
    const otherKnowledge = initialSubdomain ? initialSubdomain.knowledge.slice(1) : [];

    const saved: SubdomainDetail = {
      id: initialSubdomain?.id || `subdomain-custom-${Date.now()}`,
      name: formData.name.trim(),
      domainId: formData.domainId,
      domainName,
      tagline: formData.tagline.trim(),
      description: formData.description.trim() || `${formData.name.trim()} domain specialization in ${domainName}.`,
      iconName: initialSubdomain?.iconName || (formData.domainId === 'embedded' ? 'Terminal' : 'Cpu'),
      badgeColor: initialSubdomain?.badgeColor || (formData.domainId === 'embedded' ? 'bg-cyan-500' : 'bg-indigo-500'),
      jobs: [primaryJob, ...otherJobs],
      skills: [primarySkill, ...otherSkills],
      knowledge: [primaryKnowledge, ...otherKnowledge],
      relatedTrackIds: initialSubdomain?.relatedTrackIds || ['track-digital-design'],
      relatedEncyclopediaVolumes: initialSubdomain?.relatedEncyclopediaVolumes || ['vol-01-digital-rtl']
    };

    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-neutral-200 max-w-3xl w-full flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-neutral-900 text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                {initialSubdomain ? `Edit Subdomain: ${initialSubdomain.name}` : 'Add Custom Engineering Subdomain'}
              </h2>
              <p className="text-xs text-neutral-500">
                Define specialized job profiles, EDA tooling standards, and underlying physics for this subdomain.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 px-4 pt-2 gap-1 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('basics')}
            className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'basics'
                ? 'bg-white text-neutral-900 border-t-2 border-indigo-600 shadow-2xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Subdomain Basics</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('job')}
            className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'job'
                ? 'bg-white text-indigo-700 border-t-2 border-indigo-600 shadow-2xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>2. Primary Job Role</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('skill')}
            className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'skill'
                ? 'bg-white text-amber-700 border-t-2 border-amber-500 shadow-2xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>3. Core Skill &amp; Tools</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('knowledge')}
            className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'knowledge'
                ? 'bg-white text-emerald-700 border-t-2 border-emerald-500 shadow-2xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>4. Foundational Physics &amp; Theory</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: BASICS */}
          {activeTab === 'basics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Subdomain Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Silicon Photonics &amp; Optical Interconnects"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                  {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Discipline / Super-Domain *
                  </label>
                  <select
                    value={formData.domainId}
                    onChange={(e) => setFormData({ ...formData, domainId: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium bg-white"
                  >
                    <option value="vlsi">VLSI &amp; Silicon Engineering</option>
                    <option value="embedded">Embedded Systems &amp; Firmware</option>
                    <option value="career-strategy">Hardware Career Strategy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Tagline (One-sentence industry mission) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Integrated photonic integrated circuits (PIC) for hyperscale interconnects"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
                {errors.tagline && <p className="text-[11px] text-rose-600 mt-1">{errors.tagline}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Full Subdomain Overview &amp; Industrial Context
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the architectural significance, market relevance, and engineering challenges of this domain..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* TAB 2: JOB PROFILE */}
          {activeTab === 'job' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Flagship Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Senior Silicon Photonics Design Engineer"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.jobTitle && <p className="text-[11px] text-rose-600 mt-1">{errors.jobTitle}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Experience Tier
                  </label>
                  <select
                    value={formData.jobTier}
                    onChange={(e) => setFormData({ ...formData, jobTier: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Entry / Intern">Entry / Intern (0-1 yrs)</option>
                    <option value="Junior (1-3 Yrs)">Junior (1-3 Yrs)</option>
                    <option value="Mid / Senior">Mid / Senior (4+ Yrs)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    India Compensation CTC Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ₹14L - ₹28L CTC"
                    value={formData.jobSalaryIndia}
                    onChange={(e) => setFormData({ ...formData, jobSalaryIndia: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    US Base Salary Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., $120,000 - $165,000 Base"
                    value={formData.jobSalaryUS}
                    onChange={(e) => setFormData({ ...formData, jobSalaryUS: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Target Hiring Companies (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="NVIDIA, Intel, Cisco, Broadcom, Ayar Labs"
                  value={formData.jobCompanies}
                  onChange={(e) => setFormData({ ...formData, jobCompanies: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Key Day-to-Day Responsibilities (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Design laser drivers and transimpedance amplifiers&#10;Model optical waveguide dispersion&#10;Sign off electro-optic co-simulation"
                  value={formData.jobResponsibilities}
                  onChange={(e) => setFormData({ ...formData, jobResponsibilities: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS & TOOLS */}
          {activeTab === 'skill' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Primary Core Skill *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Electro-Optic Co-Simulation &amp; PIC Modeling"
                    value={formData.skillName}
                    onChange={(e) => setFormData({ ...formData, skillName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.skillName && <p className="text-[11px] text-rose-600 mt-1">{errors.skillName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Proficiency Expectation
                  </label>
                  <select
                    value={formData.skillLevel}
                    onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Foundational">Foundational</option>
                    <option value="Core Industrial">Core Industrial</option>
                    <option value="Advanced Signoff">Advanced Signoff</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Required EDA Tools &amp; Frameworks (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Lumerical INTERCONNECT, Cadence Virtuoso, Synopsys OptoCompiler, KLayout"
                  value={formData.skillTools}
                  onChange={(e) => setFormData({ ...formData, skillTools: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Industry Relevance &amp; Why It Matters
                </label>
                <input
                  type="text"
                  placeholder="Eliminates copper wire parasitic limits in sub-2nm AI accelerator clusters"
                  value={formData.skillRelevance}
                  onChange={(e) => setFormData({ ...formData, skillRelevance: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Practical Flagship Project Evidence (Resume proof)
                </label>
                <textarea
                  rows={2}
                  placeholder="Designed 100Gbps WDM optical transceiver front-end with eye diagram jitter < 2ps"
                  value={formData.skillProjectEvidence}
                  onChange={(e) => setFormData({ ...formData, skillProjectEvidence: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* TAB 4: KNOWLEDGE & PHYSICS */}
          {activeTab === 'knowledge' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Fundamental Concept / Silicon Physics *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Plasma Dispersion Effect in Silicon Modulators"
                    value={formData.knowledgeConcept}
                    onChange={(e) => setFormData({ ...formData, knowledgeConcept: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.knowledgeConcept && <p className="text-[11px] text-rose-600 mt-1">{errors.knowledgeConcept}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Theory Depth
                  </label>
                  <select
                    value={formData.knowledgeDepth}
                    onChange={(e) => setFormData({ ...formData, knowledgeDepth: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Theoretical Foundation">Theoretical Foundation</option>
                    <option value="Architectural Concept">Architectural Concept</option>
                    <option value="Tapeout / Signoff Reality">Tapeout / Signoff Reality</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Why This Physics Is Crucial to Hardware Engineers
                </label>
                <textarea
                  rows={2}
                  placeholder="Determines Mach-Zehnder modulator extinction ratio, insertion loss, and thermal stabilization tuning."
                  value={formData.knowledgeWhyCrucial}
                  onChange={(e) => setFormData({ ...formData, knowledgeWhyCrucial: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Key Interview &amp; Whiteboard Questions (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Derive carrier-induced refractive index change in silicon.&#10;How do you thermally compensate ring resonator drift?"
                  value={formData.knowledgeQuestions}
                  onChange={(e) => setFormData({ ...formData, knowledgeQuestions: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* Footer controls inside form */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <AlertCircle className="w-4 h-4 text-indigo-500" />
              <span>Saved subdomains persist to local storage and sync with cloud backups.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{initialSubdomain ? 'Update Subdomain' : 'Save Subdomain'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
