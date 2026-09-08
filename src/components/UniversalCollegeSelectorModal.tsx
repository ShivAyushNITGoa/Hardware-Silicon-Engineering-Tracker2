import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Cpu, 
  Check, 
  Sparkles, 
  X, 
  Wrench, 
  Target, 
  Layers, 
  Compass,
  AlertCircle
} from 'lucide-react';
import { 
  StudentCollegeProfile, 
  CollegeTierId, 
  EngineeringBranchId, 
  SemesterStageId, 
  LabAccessTierId,
  UNIVERSAL_COLLEGE_TIERS,
  BRANCH_PIVOT_STRATEGIES,
  UNIVERSAL_LAB_STACKS
} from '../data/universalCollegeData';

interface UniversalCollegeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentCollegeProfile;
  onSaveProfile: (profile: StudentCollegeProfile) => void;
}

export const UniversalCollegeSelectorModal: React.FC<UniversalCollegeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile
}) => {
  const [tierId, setTierId] = useState<CollegeTierId>(currentProfile.collegeTierId);
  const [collegeName, setCollegeName] = useState<string>(currentProfile.collegeName);
  const [department, setDepartment] = useState<EngineeringBranchId>(currentProfile.department);
  const [customDept, setCustomDept] = useState<string>(currentProfile.customDepartmentName || '');
  const [semester, setSemester] = useState<SemesterStageId>(currentProfile.semester);
  const [labTier, setLabTier] = useState<LabAccessTierId>(currentProfile.labAccessTier);
  const [targetGoal, setTargetGoal] = useState<StudentCollegeProfile['targetCareerGoal']>(currentProfile.targetCareerGoal);

  if (!isOpen) return null;

  const handleSelectTierPreset = (tier: typeof UNIVERSAL_COLLEGE_TIERS[0]) => {
    setTierId(tier.id);
    if (tier.id === 'nit-goa') {
      setCollegeName('National Institute of Technology Goa (NIT Goa)');
      setDepartment('eee');
      setSemester('6th');
      setLabTier('standard-hardware');
    } else if (tier.id === 'tier1-iit') {
      setCollegeName('Indian Institute of Technology (IIT)');
      setLabTier('full-commercial');
    } else if (tier.id === 'tier1-nit-bits') {
      setCollegeName('Premier NIT / BITS Pilani');
      setLabTier('full-commercial');
    } else if (tier.id === 'tier1-iiit') {
      setCollegeName('IIIT (Hyderabad / Bangalore / Delhi)');
      setLabTier('full-commercial');
    } else if (tier.id === 'tier2-autonomous') {
      setCollegeName('State Autonomous Engineering College (e.g. DTU/RVCE/COEP)');
      setLabTier('standard-hardware');
    } else if (tier.id === 'tier3-affiliated') {
      setCollegeName('Affiliated State Technical University (VTU/AKTU/JNTU/KTU)');
      setLabTier('open-source-zero-cost');
    } else if (tier.id === 'custom') {
      if (collegeName === 'National Institute of Technology Goa (NIT Goa)') {
        setCollegeName('');
      }
    }
  };

  const handleSave = () => {
    const finalCollegeName = collegeName.trim() || (tierId === 'nit-goa' ? 'National Institute of Technology Goa (NIT Goa)' : 'Engineering Institution');
    const updated: StudentCollegeProfile = {
      collegeTierId: tierId,
      collegeName: finalCollegeName,
      department,
      customDepartmentName: department === 'custom' ? customDept.trim() || 'Applied Engineering' : undefined,
      semester,
      labAccessTier: labTier,
      targetCareerGoal: targetGoal,
      notes: tierId === 'nit-goa' 
        ? 'Preserved official NIT Goa handbook & EE545 FPGA elective plan' 
        : `Personalized roadmap for ${finalCollegeName}`
    };
    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-neutral-200 shadow-xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-neutral-900 via-indigo-950 to-neutral-900 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/30 text-indigo-300">
                <GraduationCap className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold tracking-tight">
                Academic &amp; College Profile Setup
              </h3>
            </div>
            <p className="text-xs text-neutral-300">
              Universal strategy engine calibrated for <strong className="text-white">NIT Goa</strong> alongside <strong className="text-indigo-300">IITs, NITs, BITS, IIITs &amp; State Engineering Colleges</strong>.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          {/* STEP 1: Select College Profile Archetype */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wide flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                1. Select Institution Archetype
              </span>
              <span className="text-[11px] font-normal text-neutral-500 lowercase">
                (Click to auto-configure)
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {UNIVERSAL_COLLEGE_TIERS.map((tier) => {
                const isSelected = tierId === tier.id;
                const isNit = tier.id === 'nit-goa';

                return (
                  <div
                    key={tier.id}
                    onClick={() => handleSelectTierPreset(tier)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-1.5 ${
                      isSelected
                        ? isNit
                          ? 'border-indigo-600 bg-indigo-50/90 ring-2 ring-indigo-500/20 shadow-xs'
                          : 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-bold text-neutral-900 leading-snug">
                        {tier.name}
                      </span>
                      {isSelected && (
                        <span className="p-0.5 rounded-full bg-indigo-600 text-white shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div className="text-[10px] text-neutral-500 leading-tight">
                      {tier.badge}
                    </div>

                    <div className="pt-1 text-[11px] text-neutral-600">
                      Footfall: <span className="font-semibold text-neutral-800">{tier.onCampusFootfall}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* College Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700">
              Institution / College Name Display
            </label>
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              placeholder="e.g. NIT Goa, IIT Madras, RVCE Bangalore, BITS Pilani..."
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs font-medium text-neutral-900"
            />
            {tierId === 'nit-goa' && (
              <p className="text-[11px] text-indigo-700 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100 flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  Official NIT Goa syllabus, EE545 FPGA elective, EE541 recovery strategy, and Basys3 lab equipment are 100% active and preserved.
                </span>
              </p>
            )}
          </div>

          {/* STEP 2: Branch & Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
            {/* Branch Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-600" />
                2. Engineering Branch
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as EngineeringBranchId)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-xs bg-white text-neutral-800 font-medium cursor-pointer"
              >
                {BRANCH_PIVOT_STRATEGIES.map((b) => (
                  <option key={b.branchId} value={b.branchId}>
                    {b.name}
                  </option>
                ))}
              </select>
              {department === 'custom' && (
                <input
                  type="text"
                  value={customDept}
                  onChange={(e) => setCustomDept(e.target.value)}
                  placeholder="Enter branch name..."
                  className="w-full mt-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs"
                />
              )}
            </div>

            {/* Semester Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                3. Current Academic Semester
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['3rd', '4th', '5th', '6th', '7th', '8th', 'graduate'] as SemesterStageId[]).map((sem) => (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => setSemester(sem)}
                    className={`py-1.5 px-2 rounded-md font-medium text-center transition-all cursor-pointer ${
                      semester === sem
                        ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {sem === 'graduate' ? 'Grad' : `${sem} Sem`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 3: Lab Infrastructure Access Tier */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-indigo-600" />
              4. College Lab Infrastructure Availability
            </label>

            <div className="space-y-2">
              {UNIVERSAL_LAB_STACKS.map((stack) => {
                const isSelected = labTier === stack.tierId;

                return (
                  <div
                    key={stack.tierId}
                    onClick={() => setLabTier(stack.tierId)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-500/30'
                        : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50'
                    }`}
                  >
                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => setLabTier(stack.tierId)}
                      className="mt-1 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-neutral-900">
                          {stack.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-200 text-neutral-700 font-mono">
                          {stack.costRange}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600 leading-relaxed">
                        {stack.workflowOverview}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Target Career Goal */}
          <div className="space-y-1.5 pt-2 border-t border-neutral-100">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-rose-600" />
              5. Primary Semiconductor Career Target
            </label>
            <select
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value as StudentCollegeProfile['targetCareerGoal'])}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-xs bg-white text-neutral-800 font-medium cursor-pointer"
            >
              <option value="Tier-1 Silicon MNC">Tier-1 Silicon MNC (Intel, Qualcomm, Nvidia, Texas Instruments, Apple, AMD)</option>
              <option value="ASIC Design Services">ASIC Design Services &amp; Indian Fabless (Tessolve, Wipro VLSI, Mirafra, SmartSoC)</option>
              <option value="Embedded & Automotive">Embedded &amp; Automotive Silicon (NXP, Infineon, Microchip, STMicroelectronics, Bosch)</option>
              <option value="Higher Studies (GATE/MS)">Higher Studies &amp; Research (GATE ECE M.Tech at IISc/IITs or MS in US/Europe)</option>
              <option value="Open-Source Hardware Startup">Open-Source Hardware Startup / Tapeout Pioneer (Tiny Tapeout / RISC-V)</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => handleSelectTierPreset(UNIVERSAL_COLLEGE_TIERS[0])}
            className="text-xs font-semibold text-neutral-600 hover:text-indigo-600 cursor-pointer"
          >
            Reset to NIT Goa EEE
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply College Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
