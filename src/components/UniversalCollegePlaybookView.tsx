import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Cpu, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Wrench, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Trophy, 
  BookOpen, 
  Terminal, 
  Code,
  Zap,
  Clock,
  Compass,
  FileText
} from 'lucide-react';
import { 
  StudentCollegeProfile, 
  UNIVERSAL_COLLEGE_TIERS, 
  UNIVERSAL_ELECTIVES_MAPPING, 
  BRANCH_PIVOT_STRATEGIES, 
  UNIVERSAL_LAB_STACKS, 
  UNIVERSAL_NATIONAL_CONTESTS,
  CollegeTierId,
  EngineeringBranchId
} from '../data/universalCollegeData';
import { BrandLogo } from './BrandLogo';

interface UniversalCollegePlaybookViewProps {
  currentProfile: StudentCollegeProfile;
  onOpenSelector: () => void;
  onNavigateToReport?: () => void;
  onNavigateToCurriculum?: () => void;
  onNavigateToTools?: () => void;
}

export const UniversalCollegePlaybookView: React.FC<UniversalCollegePlaybookViewProps> = ({
  currentProfile,
  onOpenSelector,
  onNavigateToReport,
  onNavigateToCurriculum,
  onNavigateToTools
}) => {
  const [selectedTierTab, setSelectedTierTab] = useState<CollegeTierId>(currentProfile.collegeTierId);
  const [selectedBranchTab, setSelectedBranchTab] = useState<EngineeringBranchId>(currentProfile.department);
  const [activeSection, setActiveSection] = useState<'tiers' | 'branches' | 'opensource_stack' | 'contests' | 'electives'>('tiers');

  const activeTier = UNIVERSAL_COLLEGE_TIERS.find(t => t.id === selectedTierTab) || UNIVERSAL_COLLEGE_TIERS[0];
  const activeBranch = BRANCH_PIVOT_STRATEGIES.find(b => b.branchId === selectedBranchTab) || BRANCH_PIVOT_STRATEGIES[0];
  const activeLab = UNIVERSAL_LAB_STACKS.find(l => l.tierId === currentProfile.labAccessTier) || UNIVERSAL_LAB_STACKS[1];
  const isNitGoaActive = currentProfile.collegeTierId === 'nit-goa';

  return (
    <div className="space-y-6">
      {/* Dynamic Institution Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-900 via-neutral-900 to-indigo-950 text-white shadow-xs border border-indigo-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-bold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Active Profile: {currentProfile.collegeName}</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-400/30">
                {currentProfile.semester.toUpperCase()} Semester
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-semibold border border-amber-400/30">
                {currentProfile.customDepartmentName || activeBranch.name.split(' (')[0]}
              </span>
            </div>

            <div className="pt-0.5">
              <BrandLogo size="sm" theme="dark" variant="full" subtitle="Universal Academic & Recruitment Engine" />
            </div>

            <p className="text-xs text-neutral-300 max-w-3xl leading-relaxed">
              Designed for <strong className="text-white">NIT Goa</strong> students following the official academic handbook, alongside students from <strong className="text-indigo-200">IITs, Premier NITs, BITS, IIITs, State Universities &amp; Affiliated Colleges</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              type="button"
              id="switch-college-profile-btn"
              onClick={onOpenSelector}
              className="px-3.5 py-2 rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Change College Profile</span>
            </button>

            {onNavigateToReport && (
              <button
                type="button"
                id="generate-custom-report-btn"
                onClick={onNavigateToReport}
                className="px-3 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 border border-indigo-400/40 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-200" />
                <span>Export Report</span>
              </button>
            )}
          </div>
        </div>

        {/* Current Lab Tier Quick Badge */}
        <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Target Track:</span>
            <strong className="text-white">{currentProfile.targetCareerGoal}</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Configured Lab:</span>
            <span className="font-mono text-[11px] text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30">
              {activeLab.title}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 border-b border-neutral-200 overflow-x-auto pb-2 text-xs">
        <button
          type="button"
          onClick={() => setActiveSection('tiers')}
          className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
            activeSection === 'tiers'
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>College Tier Playbooks</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('opensource_stack')}
          className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
            activeSection === 'opensource_stack'
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Zero-Cost Open-Source Silicon Stack</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('branches')}
          className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
            activeSection === 'branches'
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-indigo-500" />
          <span>Branch Pivot Guides (EEE, ECE, CSE...)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('electives')}
          className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
            activeSection === 'electives'
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
          <span>AICTE &amp; NIT Goa Elective Bridge</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('contests')}
          className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
            activeSection === 'contests'
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-rose-500" />
          <span>National Contests &amp; PPO Fast-Tracks</span>
        </button>
      </div>

      {/* SECTION 1: COLLEGE TIERS & STRATEGY */}
      {activeSection === 'tiers' && (
        <div className="space-y-4">
          {/* Tier Selector Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {UNIVERSAL_COLLEGE_TIERS.map((tier) => {
              const isSelected = selectedTierTab === tier.id;
              const isNit = tier.id === 'nit-goa';

              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTierTab(tier.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/90 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-neutral-900 text-xs truncate">
                      {tier.name.split(' (')[0]}
                    </span>
                    {isNit && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" title="NIT Goa Preserved" />
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-500 font-medium line-clamp-1">
                    {tier.onCampusFootfall}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tier Detailed Playbook Card */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-base font-bold text-neutral-900">
                    {activeTier.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold text-[11px]">
                    {activeTier.badge}
                  </span>
                </div>
                <p className="text-xs text-neutral-600">
                  {activeTier.tagline}
                </p>
              </div>

              <div className="text-left sm:text-right text-xs">
                <div className="text-neutral-500">Recruitment Landscape:</div>
                <div className="font-bold text-indigo-700">{activeTier.onCampusFootfall}</div>
              </div>
            </div>

            {/* 3-Column Strategy Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Column 1: Strategic Advantages */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Strategic Core Advantages</span>
                </div>
                <ul className="space-y-1.5 text-neutral-700 leading-relaxed text-[11px]">
                  {activeTier.strategicAdvantage.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold mt-0.5">&bull;</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Potential Pitfalls to Avoid */}
              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-rose-900 uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Critical Pitfalls &amp; Gaps</span>
                </div>
                <ul className="space-y-1.5 text-neutral-700 leading-relaxed text-[11px]">
                  {activeTier.potentialPitfalls.map((pit, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold mt-0.5">&bull;</span>
                      <span>{pit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: EDA & Lab Reality */}
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-indigo-900 uppercase tracking-wide">
                  <Wrench className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>EDA &amp; Lab Infrastructure</span>
                </div>
                <p className="text-[11px] text-neutral-700 leading-relaxed">
                  {activeTier.edaLabInfrastructure}
                </p>
                <div className="pt-2 border-t border-indigo-200/60">
                  <span className="text-[10px] font-bold uppercase text-indigo-800 block mb-1">
                    Representative Institutes:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activeTier.representativeInstitutes.map((inst, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 bg-white border border-indigo-200 text-indigo-900 text-[10px] rounded font-medium">
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Proven Step-by-Step Playbook */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-neutral-900 text-xs uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Proven Playbook for {activeTier.name.split(' (')[0]} Students</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeTier.provenPlaybook.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-white border border-neutral-200 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-[11px] text-neutral-800 leading-relaxed font-medium">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Hiring Avenues */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-neutral-800">Primary Recruitment Channels:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTier.primaryHiringAvenues.map((ch, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 font-medium text-[11px] border border-neutral-200">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {activeTier.id !== currentProfile.collegeTierId && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenSelector();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs shrink-0 cursor-pointer"
                >
                  Adopt This Tier Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ZERO-COST OPEN-SOURCE SILICON STACK */}
      {activeSection === 'opensource_stack' && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
              <Flame className="w-4 h-4 text-amber-600 shrink-0" />
              <span>The Great Silicon Equalizer: Zero-Cost Open-Source EDA</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              If your college lacks ₹50-Lakh commercial Synopsys or Cadence licenses, you do <strong>not</strong> need to be at a disadvantage. 
              The global open-source hardware movement (Google Silicon, SkyWater 130nm, Tiny Tapeout, Efabless) allows any student with a basic laptop to write RTL, run UVM-grade verification, run automated ASIC Place &amp; Route, and manufacture physical chips!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {UNIVERSAL_LAB_STACKS.map((stack) => {
              const isSelected = currentProfile.labAccessTier === stack.tierId;

              return (
                <div
                  key={stack.tierId}
                  className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'border-neutral-200 bg-white'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-neutral-900 text-xs">
                        {stack.title}
                      </h4>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold">
                          Active
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] text-neutral-500 font-mono block">
                      {stack.costRange}
                    </span>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-neutral-700 block">
                        Core Software / EDA:
                      </span>
                      <ul className="text-[11px] text-neutral-600 space-y-1">
                        {stack.edaAndSimulators.map((eda, idx) => (
                          <li key={idx} className="line-clamp-2">
                            &bull; {eda}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1 pt-1 border-t border-neutral-100">
                      <span className="text-[11px] font-bold text-neutral-700 block">
                        Production Workflow:
                      </span>
                      <p className="text-[11px] text-neutral-600 leading-relaxed">
                        {stack.workflowOverview}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-200">
                    <span className="text-[10px] font-semibold text-emerald-700 block">
                      Industry Match:
                    </span>
                    <p className="text-[11px] text-neutral-700">
                      {stack.industryEquivalence}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Start Commands for Open-Source Silicon */}
          <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-amber-400 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>5-Minute Open-Source EDA Setup on Linux / WSL2</span>
              </span>
              <span className="text-[11px] text-neutral-400">100% Free &amp; Open-Source</span>
            </div>

            <div className="space-y-2 text-xs font-mono bg-black/60 p-3 rounded-lg border border-neutral-800 overflow-x-auto text-neutral-200">
              <div className="text-neutral-400"># 1. Install Icarus Verilog, GTKWave &amp; Verilator</div>
              <div className="text-emerald-400">sudo apt update &amp;&amp; sudo apt install -y iverilog gtkwave verilator yosys</div>
              <div className="text-neutral-400 pt-1"># 2. Install cocotb for Python-based testbenches</div>
              <div className="text-emerald-400">pip install cocotb pytest cocotb-test</div>
              <div className="text-neutral-400 pt-1"># 3. Simulate your SystemVerilog module</div>
              <div className="text-emerald-400">iverilog -g2012 -o sim.out my_module.sv tb_my_module.sv &amp;&amp; vvp sim.out</div>
              <div className="text-neutral-400 pt-1"># 4. Inspect waveforms in GTKWave</div>
              <div className="text-emerald-400">gtkwave dump.vcd &amp;</div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: BRANCH PIVOT GUIDES */}
      {activeSection === 'branches' && (
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {BRANCH_PIVOT_STRATEGIES.map((branch) => {
              const isSelected = selectedBranchTab === branch.branchId;

              return (
                <button
                  key={branch.branchId}
                  type="button"
                  onClick={() => setSelectedBranchTab(branch.branchId)}
                  className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {branch.name.split(' (')[0]}
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200">
              <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <span>{activeBranch.name} &rarr; Silicon Strategy</span>
              </h4>
              <span className="text-xs text-neutral-500">
                Department Transition Guide
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-900 uppercase tracking-wide block">
                  Inherent Superpowers in Interviews:
                </span>
                <ul className="space-y-1.5 text-neutral-700 leading-relaxed text-[11px]">
                  {activeBranch.inherentSuperpowers.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold mt-0.5">&bull;</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
                <span className="font-bold text-rose-900 uppercase tracking-wide block">
                  Critical Gaps Tested by Recruiters:
                </span>
                <ul className="space-y-1.5 text-neutral-700 leading-relaxed text-[11px]">
                  {activeBranch.criticalSkillGaps.map((g, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold mt-0.5">&bull;</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3-Step Bridge Plan */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-neutral-900 uppercase tracking-wide block">
                3-Step Bridge Plan for {activeBranch.name}:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {activeBranch.threeStepBridgePlan.map((step) => (
                  <div key={step.stepNumber} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <span className="font-bold text-neutral-900 text-xs">
                        {step.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      {step.action}
                    </p>
                    <div className="pt-2 border-t border-neutral-200 text-[10px] text-indigo-700 font-medium">
                      Resource: {step.freeResource}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Golden Resume Bullet Example */}
            <div className="p-3.5 rounded-xl bg-neutral-900 text-neutral-200 text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400">
                Recommended Resume Bullet Formulation:
              </span>
              <p className="font-mono text-[11px] text-neutral-100">
                &quot;{activeBranch.resumeBulletAngle}&quot;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: ELECTIVES & AICTE BRIDGE */}
      {activeSection === 'electives' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
            <span className="font-bold text-neutral-900">
              Universal AICTE / Autonomous Syllabus to Semiconductor Industry Bridge
            </span>
            <p className="text-neutral-600 leading-relaxed">
              Standard Indian engineering curricula often teach outdated 8051 assembly or Verilog-95 gate-level modeling. 
              The table below maps standard university course codes to what Tier-1 semiconductor MNCs (Qualcomm, Intel, TI, AMD) actually test during technical interview rounds.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-100/90 border-b border-neutral-200 text-neutral-700 font-bold text-[11px]">
                  <th className="p-3">Priority</th>
                  <th className="p-3">Course / Domain</th>
                  <th className="p-3">AICTE Code</th>
                  <th className="p-3">{isNitGoaActive ? 'NIT Goa Code' : 'Universal Focus'}</th>
                  <th className="p-3">Testing Focus in Interviews</th>
                  <th className="p-3">Free Online Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-[11px]">
                {UNIVERSAL_ELECTIVES_MAPPING.map((el, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/70">
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        el.priority === 'Must Take'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {el.priority}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-neutral-900">
                      {el.courseName}
                    </td>
                    <td className="p-3 font-mono text-neutral-600">
                      {el.aicteUniversalCode}
                    </td>
                    <td className="p-3 font-mono text-indigo-700 font-semibold">
                      {isNitGoaActive ? el.nitGoaEquivalentCode : el.category}
                    </td>
                    <td className="p-3 text-neutral-700 max-w-xs leading-relaxed">
                      {el.industryTestingFocus}
                    </td>
                    <td className="p-3 text-neutral-600 max-w-xs leading-relaxed">
                      {el.freeOnlineEquivalent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 5: NATIONAL CONTESTS & PPOS */}
      {activeSection === 'contests' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 text-xs space-y-1">
            <span className="font-bold text-amber-950 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Direct Pre-Placement Offers (PPOs) via National Contests</span>
            </span>
            <p className="text-amber-900 leading-relaxed">
              If your college is not on Day-1 campus placement schedules, winning or reaching the finals of these official industry competitions is the fastest route to bypass campus placement filters and receive direct ₹18–₹35 LPA offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UNIVERSAL_NATIONAL_CONTESTS.map((contest, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-white shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-neutral-900 text-xs leading-snug">
                      {contest.contestName}
                    </h4>
                    <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-mono text-[10px] shrink-0 font-medium">
                      {contest.seasonMonth}
                    </span>
                  </div>

                  <div className="text-[11px] text-neutral-500">
                    Organizer: <span className="font-semibold text-neutral-800">{contest.organizer}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[11px] text-emerald-900">
                    <strong>Career Reward / PPO:</strong> {contest.rewardOrPPO}
                  </div>

                  <div className="text-[11px] text-neutral-600 leading-relaxed">
                    <strong>Winning Strategy:</strong> {contest.winningStrategy}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500">
                    Eligibility: {contest.eligibility}
                  </span>
                  <a
                    href={contest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
