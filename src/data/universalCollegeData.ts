// Universal College & Academic Roadmap Architecture
// Supports NIT Goa students alongside students from IITs, premier NITs, IIITs, BITS, 
// State Universities, Autonomous Colleges, and Affiliated Tier-2/3 Institutions across all branches.

export type CollegeTierId = 
  | 'nit-goa'
  | 'tier1-iit'
  | 'tier1-nit-bits'
  | 'tier1-iiit'
  | 'tier2-autonomous'
  | 'tier3-affiliated'
  | 'custom';

export type EngineeringBranchId =
  | 'eee'
  | 'ece'
  | 'eie'
  | 'cse-hardware'
  | 'mechatronics'
  | 'telecom'
  | 'custom';

export type LabAccessTierId =
  | 'full-commercial'
  | 'standard-hardware'
  | 'open-source-zero-cost';

export type SemesterStageId = '3rd' | '4th' | '5th' | '6th' | '7th' | '8th' | 'graduate';

export interface StudentCollegeProfile {
  collegeTierId: CollegeTierId;
  collegeName: string;
  department: EngineeringBranchId;
  customDepartmentName?: string;
  semester: SemesterStageId;
  labAccessTier: LabAccessTierId;
  targetCareerGoal: 'Tier-1 Silicon MNC' | 'ASIC Design Services' | 'Embedded & Automotive' | 'Higher Studies (GATE/MS)' | 'Open-Source Hardware Startup';
  notes?: string;
}

export interface UniversalCollegeTierInfo {
  id: CollegeTierId;
  name: string;
  badge: string;
  tagline: string;
  representativeInstitutes: string[];
  onCampusFootfall: 'Day-1 MNC Presence' | 'Selective MNCs + Pooled Drives' | 'Design Services & Regional Drives' | 'Primarily Off-Campus & Contests';
  edaLabInfrastructure: string;
  strategicAdvantage: string[];
  potentialPitfalls: string[];
  provenPlaybook: string[];
  primaryHiringAvenues: string[];
}

export interface UniversalElectiveMapping {
  category: 'Core Digital / Microarchitecture' | 'Verification & UVM' | 'Analog & Mixed-Signal' | 'Embedded Systems & Firmware' | 'FPGA & Acceleration' | 'Interconnects & SoC';
  courseName: string;
  recommendedSemester: string;
  aicteUniversalCode: string;
  nitGoaEquivalentCode: string;
  priority: 'Must Take' | 'High Value' | 'Good Secondary' | 'Audit / Self-Study';
  industryTestingFocus: string;
  freeOnlineEquivalent: string;
  labWorkloadRecommendation: string;
}

export interface BranchPivotStrategy {
  branchId: EngineeringBranchId;
  name: string;
  inherentSuperpowers: string[];
  criticalSkillGaps: string[];
  threeStepBridgePlan: Array<{
    stepNumber: number;
    title: string;
    action: string;
    freeResource: string;
  }>;
  resumeBulletAngle: string;
}

export interface LabAdaptationStack {
  tierId: LabAccessTierId;
  title: string;
  costRange: string;
  hardwareTools: string[];
  edaAndSimulators: string[];
  workflowOverview: string;
  suitableProjects: string[];
  industryEquivalence: string;
}

export interface UniversalContestGuide {
  contestName: string;
  organizer: string;
  seasonMonth: string;
  eligibility: string;
  rewardOrPPO: string;
  winningStrategy: string;
  url: string;
}

// =========================================================================
// 1. PRESET COLLEGE TIER PROFILES
// =========================================================================

export const UNIVERSAL_COLLEGE_TIERS: UniversalCollegeTierInfo[] = [
  {
    id: 'nit-goa',
    name: 'National Institute of Technology Goa (NIT Goa)',
    badge: 'Autonomous Institute of National Importance',
    tagline: 'Preserved Official EEE Curriculum, Handbook Rules, Basys3 Lab & 6th Sem Roadmap',
    representativeInstitutes: [
      'NIT Goa (Cuncolim Campus - Electrical & Electronics Engineering Department)'
    ],
    onCampusFootfall: 'Selective MNCs + Pooled Drives',
    edaLabInfrastructure: 'Cadence Virtuoso Lab (60 licenses), Xilinx Basys3 FPGA Dev Boards, Keil Embedded Lab, dSPACE Power Lab',
    strategicAdvantage: [
      'Premier INI degree recognition with verified strong foundational EEE curriculum',
      'Direct faculty expertise in Power Electronics, Control, and Digital Signal Processing (EE543)',
      'Dedicated Basys3 FPGA hardware lab enabling actual hardware bitstream programming',
      'Active regional semiconductor recruitment pool (Goa, Bangalore, Pune, Hyderabad)'
    ],
    potentialPitfalls: [
      'Missing EE541 Embedded Systems in 5th sem requires immediate self-directed lab catch-up',
      'Fewer direct Day-1 visits compared to older NITs (Trichy/Surathkal), requiring aggressive pooled drive & referral readiness',
      'Curriculum gap in IEEE 1800.2 UVM and Clock Domain Crossing (CDC) testing'
    ],
    provenPlaybook: [
      'Enroll in EE545 FPGA-based Digital Design elective in 6th semester immediately',
      'Build 2 synthesis-clean RTL projects verified in Xilinx Vivado on physical Basys3 hardware',
      'Submit capstone project bridging DSP/Motor Control with FPGA acceleration or RISC-V SoC',
      'Leverage NIT alumni network across Texas Instruments, Intel, AMD, and Synopsys Bangalore'
    ],
    primaryHiringAvenues: [
      'On-Campus Placement Cell drives (TI, Microchip, Qualcomm pooled)',
      'Western Region & Bangalore pooled university recruitment drives',
      'Employee referral channels via alumni network',
      'National contests: TI India Innovation Challenge & Cadence Design Contest'
    ]
  },
  {
    id: 'tier1-iit',
    name: 'Indian Institutes of Technology (IITs)',
    badge: 'Premier Tier-1 Global Research Institutes',
    tagline: 'Day-1 Semiconductor Giants, Deep Academic R&D & Multi-Million Dollar EDA Suites',
    representativeInstitutes: [
      'IIT Bombay', 'IIT Madras', 'IIT Delhi', 'IIT Kharagpur', 'IIT Kanpur', 'IIT Roorkee', 'IIT Guwahati', 'IIT Hyderabad'
    ],
    onCampusFootfall: 'Day-1 MNC Presence',
    edaLabInfrastructure: 'Full Synopsys (DC/ICC2/PrimeTime), Cadence (Virtuoso/Innovus/Xcelium), Siemens EDA (Questa/Calibre), High-end FPGA clusters (Zynq UltraScale+, Virtex-7)',
    strategicAdvantage: [
      'Top-tier MNCs (Apple, Nvidia, Qualcomm, Intel, TI, Google Silicon) hire on Day 1/2',
      'Access to full foundry PDKs (TSMC 16nm/28nm, SCL 180nm) and MPW tapeout runs',
      'World-class faculty mentors and active research groups (e.g. SHAKTI at IIT Madras)',
      'Significant peer culture pushing open-source silicon, RISC-V extensions, and taped-out testchips'
    ],
    potentialPitfalls: [
      'Fierce internal competition among batchmates for top 10 silicon slots',
      'Interview bar is extremely rigorous: candidates tested on sub-micron physical effects, custom memory layout, and complex SVA assertions',
      'Over-reliance on brand name leading to neglecting fundamental digital whiteboard derivations'
    ],
    provenPlaybook: [
      'Aim for a complete tapeout or silicon-proven design (e.g. TSMC/SCL shuttle or Tiny Tapeout)',
      'Publish or contribute to an open-source RISC-V peripheral or UVM testbench suite',
      'Master cycle-accurate C++ simulators (gem5) and multi-core cache coherence (MESI/MOESI)',
      'Target high-impact 6-month pre-final year internships that convert to pre-placement offers (PPO)'
    ],
    primaryHiringAvenues: [
      'Day-1 / Day-2 On-Campus Placements',
      'Pre-Placement Offers (PPOs) via pre-final year summer internships',
      'Research Fellowship & Direct Industry Sponsored R&D Labs'
    ]
  },
  {
    id: 'tier1-nit-bits',
    name: 'Premier NITs & BITS Pilani',
    badge: 'Tier-1 Engineering Institutes',
    tagline: 'Heavy Core Semiconductor Hiring, Strong Alumni Base & Industry Practice School (BITS PS-II)',
    representativeInstitutes: [
      'NIT Trichy', 'NIT Surathkal', 'NIT Warangal', 'NIT Calicut', 'NIT Rourkela', 'VNIT Nagpur', 'BITS Pilani (Pilani, Goa, Hyderabad Campuses)'
    ],
    onCampusFootfall: 'Day-1 MNC Presence',
    edaLabInfrastructure: 'Cadence EDA Bundles, Synopsys University Program, Xilinx Vivado System Edition, DSP Dev Boards',
    strategicAdvantage: [
      'Regular on-campus visits by Qualcomm, TI, AMD, NXP, Microchip, MediaTek, and Analog Devices',
      'BITS Practice School (PS-II) provides guaranteed 6-month corporate internship in Bangalore/Hyderabad',
      'Extensive alumni network across Indian semiconductor leadership positions',
      'Strong student technical clubs dedicated to robotics, embedded systems, and silicon architecture'
    ],
    potentialPitfalls: [
      'Strict academic grading in core electrical disciplines impacting overall CGPA cutoffs (e.g. 7.5+ or 8.0+ filter)',
      'Balancing high-volume software placement prep with specialized hardware interview drills',
      'Lack of formal UVM verification courses in standard university syllabus'
    ],
    provenPlaybook: [
      'Maintain CGPA above 8.0 to guarantee eligibility for every semiconductor shortlist',
      'Complete a full SystemVerilog + UVM verification testbench with constrained random stimulus and functional coverage',
      'Build physical FPGA demonstrators on Xilinx or Intel Altera boards',
      'Target corporate summer internships early (3rd year 5th sem selection drives)'
    ],
    primaryHiringAvenues: [
      'On-Campus Core Placement Weeks (TI, Qualcomm, AMD, NXP, Sandisk/Western Digital)',
      'BITS Practice School (PS-II) Direct Conversions',
      'Alumni-driven internal referrals across top semiconductor firms'
    ]
  },
  {
    id: 'tier1-iiit',
    name: 'Premier IIITs (Hyderabad, Bangalore, Delhi)',
    badge: 'Advanced Computing & VLSI Centers',
    tagline: 'Heavy Focus on Computer Architecture, RTL Synthesis, Machine Learning Hardware & System-on-Chip',
    representativeInstitutes: [
      'IIIT Hyderabad', 'IIIT Bangalore', 'IIIT Delhi', 'IIIT Allahabad'
    ],
    onCampusFootfall: 'Day-1 MNC Presence',
    edaLabInfrastructure: 'State-of-the-art EDA labs, Cadence Virtuoso/Innovus, Synopsys VCS, high-throughput GPU/FPGA clusters',
    strategicAdvantage: [
      'Curriculum deeply integrates hardware with modern computer science, C++, and Linux OS',
      'Unmatched expertise in Deep Learning accelerators (TPU-like systolic arrays) and RISC-V SoC architectures',
      'Elite competitive programming and algorithmic rigor, giving candidates an edge in digital logic coding rounds',
      'Direct research labs funded by Intel, Qualcomm, and Samsung Semiconductor'
    ],
    potentialPitfalls: [
      'Heavy software/AI recruitment can divert focus away from silicon physical design and analog electronics',
      'Intense academic workload with continuous research and lab deliverables'
    ],
    provenPlaybook: [
      'Combine C++ algorithmic mastery with synthesizable SystemVerilog (e.g. GEMM tensor engine on FPGA)',
      'Master modern verification methodologies (cocotb, SystemC, UVM)',
      'Target high-frequency trading (HFT) FPGA hardware developer roles alongside semiconductor MNCs'
    ],
    primaryHiringAvenues: [
      'On-Campus Hardware & Silicon Placement Drives',
      'High-Frequency Trading (HFT) FPGA Developer Recruitment (Tower Research, Graviton, Jane Street)',
      'Direct industry research laboratory sponsorships'
    ]
  },
  {
    id: 'tier2-autonomous',
    name: 'Top State Universities & Autonomous Colleges',
    badge: 'Tier-2 Autonomous Engineering Centers',
    tagline: 'Autonomous Curriculum Flexibility, Regional Tech Hub Proximity & High Ambition',
    representativeInstitutes: [
      'DTU Delhi', 'NSUT Delhi', 'RVCE Bangalore', 'BMSCE Bangalore', 'COEP Pune', 'VJTI Mumbai', 
      'CEG Anna University Chennai', 'PSG Tech Coimbatore', 'Thapar University', 'Manipal Institute of Technology (MIT)'
    ],
    onCampusFootfall: 'Selective MNCs + Pooled Drives',
    edaLabInfrastructure: 'Mixed: Cadence/Mentor University bundle, Spartan/Artix FPGA kits, Keil ARM development boards',
    strategicAdvantage: [
      'Geographical proximity to tech hubs (Bangalore, NCR, Pune, Chennai, Hyderabad)',
      'Autonomous academic council can update electives to include modern VLSI, Verilog, and RTOS',
      'Strong local alumni presence across Tier-1 ASIC services and startup ecosystems',
      'Active student chapters participating in international competitions (Formula Student, Robocon)'
    ],
    potentialPitfalls: [
      'Tier-1 MNCs often restrict on-campus hiring to single-digit offers, filtering heavily by CGPA (8.5+)',
      'Commercial EDA licenses may be limited in seat count, leading to lab bottlenecks before submission deadlines'
    ],
    provenPlaybook: [
      'Supplement college lab with personal open-source toolchain (Icarus, Verilator, Yosys, GTKWave)',
      'Compete in national design challenges (Texas Instruments IICDC, Cadence Design Contest, RISC-V Student Contest)',
      'Secure off-cycle 6-month internships in Bangalore or Hyderabad during 7th/8th semester',
      'Build a public GitHub portfolio showcasing verified RTL modules and cocotb regression scripts'
    ],
    primaryHiringAvenues: [
      'On-campus visits by Tier-1 MNCs (Texas Instruments, Microchip, NXP, Schneider Electric)',
      'Top-tier ASIC Design Services (Wipro VLSI, HCL, Tata Elxsi, L&T Semiconductor)',
      'Bangalore / Pune regional pooled hiring drives and off-campus referrals'
    ]
  },
  {
    id: 'tier3-affiliated',
    name: 'Affiliated & Regional Engineering Colleges',
    badge: 'Affiliated State Colleges (VTU, AKTU, JNTU, KTU, CSVTU, etc.)',
    tagline: 'The Open-Source Silicon Revolution: Overcoming Outdated Syllabi via OpenLane, Tiny Tapeout & GitHub Proof-of-Work',
    representativeInstitutes: [
      'VTU Affiliated Colleges (Karnataka)', 'AKTU Affiliated Colleges (UP)', 'JNTU Affiliated Colleges (Telangana/AP)',
      'KTU Affiliated Colleges (Kerala)', 'Anna University Affiliated Colleges (TN)', 'CSVTU / RTU / BPUT Affiliated Colleges'
    ],
    onCampusFootfall: 'Primarily Off-Campus & Contests',
    edaLabInfrastructure: 'Usually limited to basic simulator freeware (ModelSim Student / Proteus), 8051/8086 kits, or basic Xilinx ISE. Minimal or no commercial Synopsys/Cadence seats.',
    strategicAdvantage: [
      'Huge hunger and motivation to break out of service-company mass recruitment',
      'Complete freedom to embrace modern open-source silicon tools (SkyWater 130nm, OpenLane, Tiny Tapeout) without institutional legacy constraints',
      'Equal access to online platforms: EDA Playground, GitHub, LinkedIn networking, and NPTEL Swayam certification',
      'Opportunity to stand out dramatically: an affiliated college student with a taped-out SkyWater chip gets instant attention from senior engineers!'
    ],
    potentialPitfalls: [
      'Outdated university curriculum (still teaching 8085/8051 or Verilog-1995 gate-level syntax)',
      'No core semiconductor MNCs visiting campus; mass recruitment drives focus purely on generic IT services',
      'Lack of local faculty expertise in sub-micron ASIC design and modern verification methodologies'
    ],
    provenPlaybook: [
      'DO NOT depend on college syllabus for VLSI interviews; treat university exams purely as a CGPA threshold (maintain 7.5+)',
      'Adopt the 100% Free Open-Source Silicon Stack on your personal laptop: Icarus Verilog, GTKWave, Verilator, cocotb, and OpenLane',
      'Submit a real design to Tiny Tapeout (₹8,000–₹12,000 shuttle fee, or sponsored by Efabless/IEEE) to get real silicon fabricated on SkyWater 130nm',
      'Target ASIC Design Service firms (Tessolve, Mirafra, SmartSoC, Cyient, Ineda) as the ultimate 2-year stepping stone to Intel/Qualcomm',
      'Alternatively, prepare for GATE ECE to secure M.Tech Microelectronics/VLSI at IISc or top IITs'
    ],
    primaryHiringAvenues: [
      'ASIC Design Services & Specialized VLSI Service Companies (Tessolve, Mirafra, Sankalp, SmartSoC, HCL Tech)',
      'National Hackathons & Contests with PPO awards (TI IICDC, Cadence Contest, RISC-V Contest)',
      'Direct cold outreach on LinkedIn with verified GitHub repositories and waveform demonstrations',
      'GATE ECE / M.Tech route to IISc Bangalore, IIT Bombay, IIT Madras, IIT Delhi'
    ]
  },
  {
    id: 'custom',
    name: 'Custom University / Institution Profile',
    badge: 'Personalized Academic Strategy',
    tagline: 'Customized Roadmap Tailored to Your Specific College, Branch, Semester, and Available Lab Resources',
    representativeInstitutes: [
      'Customized for Your University'
    ],
    onCampusFootfall: 'Selective MNCs + Pooled Drives',
    edaLabInfrastructure: 'User configured: Custom mix of commercial EDA, FPGA development kits, and open-source simulators.',
    strategicAdvantage: [
      'Tailored precisely to your specific campus calendar, semester rules, and lab capabilities',
      'Customizable targets based on your dream companies (Intel, Qualcomm, Texas Instruments, Apple, AMD, or Startups)'
    ],
    potentialPitfalls: [
      'Requires proactive goal setting and discipline to adhere to self-imposed milestones'
    ],
    provenPlaybook: [
      'Follow the 20-week execution planner and weekly milestones',
      'Complete the 10 domain classification stages from Architecture to Signoff',
      'Leverage both open-source tools and hardware kits to build portfolio projects'
    ],
    primaryHiringAvenues: [
      'Tailored mix of on-campus, pooled, referral, and contest pathways'
    ]
  }
];

// =========================================================================
// 2. UNIVERSAL AICTE & UGC CURRICULUM TO SEMICONDUCTOR GAP-BRIDGING MAP
// =========================================================================

export const UNIVERSAL_ELECTIVES_MAPPING: UniversalElectiveMapping[] = [
  {
    category: 'Core Digital / Microarchitecture',
    courseName: 'Digital System Design using SystemVerilog & FSM Architectures',
    recommendedSemester: '5th / 6th Semester',
    aicteUniversalCode: 'EC401 / EE501 Digital Systems',
    nitGoaEquivalentCode: 'EE545 FPGA Based Digital Design',
    priority: 'Must Take',
    industryTestingFocus: 'Synthesizable SystemVerilog, Moore/Mealy FSMs, Datapath Pipelining, Setup/Hold time equation derivations, Clock Gating, and CDC synchronizers.',
    freeOnlineEquivalent: 'MIT 6.004 Computation Structures (edX/MIT OCW) & NPTEL Digital System Design with FPGA (Prof. Supreeti Roy)',
    labWorkloadRecommendation: 'Write synthesizable RTL for an AXI4-Lite Slave peripheral and verify timing closure at >100MHz.'
  },
  {
    category: 'Verification & UVM',
    courseName: 'Advanced ASIC Verification with SystemVerilog OOP & UVM',
    recommendedSemester: '6th / 7th Semester',
    aicteUniversalCode: 'PE-EC04 Advanced VLSI Verification',
    nitGoaEquivalentCode: 'EE545 Lab / Self-Study Bridge',
    priority: 'Must Take',
    industryTestingFocus: 'SystemVerilog OOP (Polymorphism, Inheritance), UVM Phases, Sequence Items, Drivers, Monitors, Scoreboards, SVA Assertions, and 100% Functional Coverage.',
    freeOnlineEquivalent: 'Verification Academy (Siemens EDA free registration) & Ray Salemi UVM Primer tutorial videos',
    labWorkloadRecommendation: 'Build a complete UVM testbench verifying an asynchronous FIFO with constrained random stimulus and scoreboard data checks.'
  },
  {
    category: 'Interconnects & SoC',
    courseName: 'Computer Organization & RISC-V SoC Architecture',
    recommendedSemester: '5th / 6th Semester',
    aicteUniversalCode: 'CS402 / EC502 Computer Architecture',
    nitGoaEquivalentCode: 'Open Elective / CompArch',
    priority: 'Must Take',
    industryTestingFocus: '5-Stage RISC-V Pipeline hazards (Data/Control/Structural), Branch Prediction, Cache hierarchies (Direct-mapped vs Set-Associative), AMBA AXI/AHB protocols.',
    freeOnlineEquivalent: 'Prof. Onur Mutlu (ETH Zurich / CMU) Computer Architecture Lectures on YouTube & UC Berkeley CS61C',
    labWorkloadRecommendation: 'Implement a 5-stage pipelined RV32I core supporting basic integer arithmetic and forward hazard units.'
  },
  {
    category: 'Embedded Systems & Firmware',
    courseName: 'Embedded Microcontroller Systems, Hardware Drivers & RTOS',
    recommendedSemester: '5th / 6th Semester',
    aicteUniversalCode: 'EC601 / EE502 Microcontrollers & Embedded Systems',
    nitGoaEquivalentCode: 'EE541 Embedded Systems (Crucial Recovery Subject)',
    priority: 'Must Take',
    industryTestingFocus: 'ARM Cortex-M architecture, baremetal C memory-mapped I/O registers, NVIC interrupt latency, FreeRTOS task scheduling, priority inversion mitigation, and SPI/I2C/UART timing.',
    freeOnlineEquivalent: 'FastBit Embedded Brain Academy (Miro Samek state machine series) & Texas Instruments Embedded Systems EdX',
    labWorkloadRecommendation: 'Write a baremetal register-level driver for an I2C OLED display or SPI sensor on STM32 or RP2040 without using auto-generated HAL libraries.'
  },
  {
    category: 'Analog & Mixed-Signal',
    courseName: 'CMOS Analog Integrated Circuit Design & Power Management',
    recommendedSemester: '6th / 7th Semester',
    aicteUniversalCode: 'EC602 Analog IC Design',
    nitGoaEquivalentCode: 'EE560 Power Electronics & Drives (Mixed-Signal Bridge)',
    priority: 'High Value',
    industryTestingFocus: 'MOSFET small-signal models (gm, rds), Common Source/Drain/Gate amplifiers, Bandgap voltage references, Current mirrors, Op-Amp frequency compensation, and LDO regulators.',
    freeOnlineEquivalent: 'Prof. Behzad Razavi (UCLA) Analog CMOS Design Lectures on YouTube & NPTEL CMOS Analog VLSI Design',
    labWorkloadRecommendation: 'Design a two-stage Miller-compensated Op-Amp in Cadence Virtuoso or open-source ngspice, simulating phase margin and CMRR across PVT corners.'
  },
  {
    category: 'FPGA & Acceleration',
    courseName: 'FPGA Architecture, High-Speed DSP & Hardware Acceleration',
    recommendedSemester: '6th / 7th Semester',
    aicteUniversalCode: 'EC701 Digital Signal Processing with FPGA',
    nitGoaEquivalentCode: 'EE543 DSP + EE545 FPGA Joint Application',
    priority: 'High Value',
    industryTestingFocus: 'DSP48 slices, Block RAM (BRAM) dual-port timing, fixed-point Q-format arithmetic, FFT/FIR digital filtering, and high-speed AXI-Stream interfaces.',
    freeOnlineEquivalent: 'Xilinx University Program Vivado tutorials & Prof. Adam Taylor MicroZed Chronicles',
    labWorkloadRecommendation: 'Implement a 16-point streaming FFT or CNN convolution engine on Basys3, measuring throughput and DSP block utilization.'
  }
];

// =========================================================================
// 3. BRANCH PIVOT STRATEGIES: HOW TO ENTER VLSI FROM ANY BACKGROUND
// =========================================================================

export const BRANCH_PIVOT_STRATEGIES: BranchPivotStrategy[] = [
  {
    branchId: 'eee',
    name: 'Electrical & Electronics Engineering (EEE)',
    inherentSuperpowers: [
      'Superior intuition for circuit physics, voltage drops (IR drop), and electromagnetic induction',
      'Deep mastery of power electronics, DC-DC buck/boost converters, and gate drivers—crucial for Power Management ICs (PMIC)',
      'Thorough grounding in control theory, state-space representations, and motor drive algorithms',
      'Natural advantage in Physical Design, Power Delivery Networks (PDN), and Analog/Mixed-Signal design'
    ],
    criticalSkillGaps: [
      'Less exposure to complex software OOP concepts required for SystemVerilog UVM testbenches',
      'Standard university syllabi often omit Computer Architecture, Cache Coherence, and AMBA protocols',
      'Need to transition from legacy 8051 assembly to modern ARM Cortex-M and synthesizable SystemVerilog'
    ],
    threeStepBridgePlan: [
      {
        stepNumber: 1,
        title: 'Master Synthesizable SystemVerilog & FSMs',
        action: 'Drop gate-level schematics; learn synthesizable RTL (always_ff, always_comb) and write clean state machines.',
        freeResource: 'Asic-World SystemVerilog Verilog Tutorials & EDA Playground exercises'
      },
      {
        stepNumber: 2,
        title: 'Acquire Computer Architecture Fundamentals',
        action: 'Study 5-stage RISC-V pipelining, hazards, and memory hierarchies to match ECE/CSE graduates.',
        freeResource: 'Computer Organization and Design (Patterson & Hennessy RISC-V Edition) / Onur Mutlu YouTube lectures'
      },
      {
        stepNumber: 3,
        title: 'Pitch the "Silicon Physics & Power Advantage"',
        action: 'Highlight your understanding of thermal throttling, dynamic power (CV²f), and voltage droop in Physical Design and Power Management interviews.',
        freeResource: 'Synthesize a DC-DC digital PWM controller or Battery Management RTL block on FPGA'
      }
    ],
    resumeBulletAngle: 'Engineered synthesizable SystemVerilog digital power PWM controller with programmable dead-band logic, verifying 98.2% duty-cycle precision on FPGA.'
  },
  {
    branchId: 'ece',
    name: 'Electronics & Communication Engineering (ECE)',
    inherentSuperpowers: [
      'Direct alignment with digital logic design, microprocessors, and semiconductor physics',
      'Familiarity with signals, modulation, communication protocols (SPI, I2C, UART, PCIe), and DSP',
      'Standard curriculum includes basic VLSI design, CMOS technology, and HDL programming'
    ],
    criticalSkillGaps: [
      'University VLSI courses rarely cover production UVM testbenches, SVA assertions, or Constrained Random Verification (CRV)',
      'Static Timing Analysis (STA) is frequently taught qualitatively without calculating real setup/hold equations with clock skew, jitter, and OCV derates',
      'Lack of hands-on physical tapeout experience using real PDKs'
    ],
    threeStepBridgePlan: [
      {
        stepNumber: 1,
        title: 'Elevate RTL from Verilog-95 to SystemVerilog-2017',
        action: 'Replace raw reg/wire types with logic, structs, enums, interfaces, and clocking blocks.',
        freeResource: 'Stuart Sutherland SystemVerilog for Design Handbook & EDA Playground'
      },
      {
        stepNumber: 2,
        title: 'Build a Full Verification Environment (UVM / cocotb)',
        action: 'Create a testbench with automated randomized stimulus, golden scoreboard, and functional coverage model.',
        freeResource: 'Verification Academy Basic UVM course & cocotb Python verification framework'
      },
      {
        stepNumber: 3,
        title: 'Master Static Timing Analysis (STA) Math',
        action: 'Derive setup and hold margins for launch and capture flops under both positive and negative clock skew.',
        freeResource: 'Static Timing Analysis for Nanometer Designs (J. Bhasker & R. Chadha)'
      }
    ],
    resumeBulletAngle: 'Developed full UVM 1.2 constrained-random testbench for AXI4-to-APB bridge, achieving 100% functional covergroup closure and zero transaction data mismatches across 50,000 randomized packets.'
  },
  {
    branchId: 'cse-hardware',
    name: 'Computer Science with Hardware / Architecture Focus',
    inherentSuperpowers: [
      'Elite programming proficiency in C++, Python, Linux shells, and Git version control',
      'Native understanding of Object-Oriented Programming (OOP), design patterns, and data structures',
      'Strong grasp of operating system kernels, virtual memory management, and compiler optimization',
      'Exceptional candidate profile for Design Verification (DV), Emulation, and High-Level Synthesis (HLS)'
    ],
    criticalSkillGaps: [
      'Lack of hardware concurrency mindset: thinking in sequential software loops instead of parallel hardware clocks',
      'Little exposure to semiconductor transistor physics, CMOS logic gates, and gate delays',
      'Unfamiliarity with clock domain crossings (CDC) and physical metastability'
    ],
    threeStepBridgePlan: [
      {
        stepNumber: 1,
        title: 'Internalize Hardware Concurrency & Clock Cycles',
        action: 'Understand that every non-blocking assignment (<=) executes concurrently at the rising clock edge.',
        freeResource: 'Nand to Tetris Part 1 (Hardware Construction) & Digital Design (Morris Mano)'
      },
      {
        stepNumber: 2,
        title: 'Target Design Verification (DV) & Emulation Engineering',
        action: 'Leverage your C++/OOP strengths into UVM testbenches and cocotb Python verification environments.',
        freeResource: 'C++ to SystemVerilog OOP Transition Guide & cocotb documentation'
      },
      {
        stepNumber: 3,
        title: 'Build Cycle-Accurate CompArch Simulators or HLS Accelerators',
        action: 'Implement a cycle-accurate C++ RISC-V simulator or design a hardware neural network accelerator in SystemC / Vivado HLS.',
        freeResource: 'gem5 architectural simulator tutorial & RISC-V ISA manual'
      }
    ],
    resumeBulletAngle: 'Built Python-based cocotb verification framework with automated coverage metrics, simulating 10,000 cycle regressions for an out-of-order RISC-V load/store queue with zero pipeline deadlock.'
  },
  {
    branchId: 'eie',
    name: 'Electronics & Instrumentation / ICE',
    inherentSuperpowers: [
      'Deep understanding of sensors, analog signal conditioning, Op-Amps, and ADC/DAC converters',
      'Practical knowledge of industrial communication protocols (Modbus, CAN bus, 4-20mA current loops)',
      'Direct relevance to Mixed-Signal IC design and Automotive Embedded Silicon'
    ],
    criticalSkillGaps: [
      'Limited exposure to high-speed digital architecture and HDL synthesis',
      'Need to upgrade microcontrollers from basic 8-bit to 32-bit ARM Cortex-M / RISC-V'
    ],
    threeStepBridgePlan: [
      {
        stepNumber: 1,
        title: 'Bridge Analog Sensors with Modern 32-Bit Microcontrollers',
        action: 'Write baremetal DMA drivers for high-speed SPI ADCs and UART logging on ARM Cortex-M.',
        freeResource: 'STM32 baremetal programming series on YouTube & ARM CMSIS documentation'
      },
      {
        stepNumber: 2,
        title: 'Learn Synthesizable Digital Logic on FPGA',
        action: 'Implement digital filtering (FIR/IIR) on FPGA to replace traditional analog filters.',
        freeResource: 'NPTEL Digital Signal Processing with FPGA & Xilinx DSP tutorials'
      },
      {
        stepNumber: 3,
        title: 'Target Automotive Silicon MNCs (NXP, TI, Infineon, Microchip)',
        action: 'Pitch your instrumentation background for automotive sensor interfaces, CAN FD controllers, and functional safety (ISO 26262).',
        freeResource: 'Vector CANoe & FreeRTOS automotive application notes'
      }
    ],
    resumeBulletAngle: 'Designed high-speed SPI ADC controller in Verilog on FPGA with 1MSPS throughput, routing filtered sensor data via custom DMA channel with sub-microsecond latency.'
  },
  {
    branchId: 'mechatronics',
    name: 'Mechatronics & Robotics Engineering',
    inherentSuperpowers: [
      'Multi-disciplinary intuition connecting mechanical dynamics, motors, sensors, and firmware',
      'Hands-on debugging experience with real hardware, oscilloscopes, and logic analyzers',
      'Natural fit for Robotics Edge Silicon, BLDC motor control ICs, and Embedded Systems'
    ],
    criticalSkillGaps: [
      'Needs formal coursework in digital IC design, setup/hold timing analysis, and ASIC flow'
    ],
    threeStepBridgePlan: [
      {
        stepNumber: 1,
        title: 'Master Hard Real-Time Firmware & Motor Control',
        action: 'Implement Field-Oriented Control (FOC) for BLDC motors using baremetal C and timer interrupts.',
        freeResource: 'Texas Instruments InstaSPIN FOC guide & FreeRTOS documentation'
      },
      {
        stepNumber: 2,
        title: 'Implement Robotics Hardware Accelerators on FPGA',
        action: 'Offload inverse kinematics or LIDAR point-cloud filtering to synthesizable Verilog modules.',
        freeResource: 'ROS2 Hardware Acceleration Working Group tutorials & Vivado HLS'
      },
      {
        stepNumber: 3,
        title: 'Target Industrial Silicon & Embedded Robotics Firms',
        action: 'Interview for embedded hardware roles at Texas Instruments, Analog Devices, STMicroelectronics, and Tesla.',
        freeResource: 'Automotive and Robotics embedded case studies'
      }
    ],
    resumeBulletAngle: 'Architected hardware-accelerated FOC motor controller in Verilog on FPGA, executing Park and Clarke vector transformations in 4 clock cycles at 100MHz.'
  },
  {
    branchId: 'telecom',
    name: 'Telecommunication Engineering',
    inherentSuperpowers: [
      'Expertise in RF, wireless modulation schemes (QAM, OFDM), high-speed serial links, and 5G basebands',
      'Strong mathematical foundation in Fourier analysis, spectral density, and Shannon capacity',
      'Direct relevance to High-Speed SerDes, RFIC, and 5G modem chip design at Qualcomm, MediaTek, and Broadcom'
    ],
    criticalSkillGaps: [
      'Need to translate abstract communication mathematics into synthesizable digital pipelines and hardware DSP blocks'
    ],
    threeStepBridgePlan: [
      {
        stepNumber: 1,
        title: 'Synthesize Wireless Modulation & Coding Blocks',
        action: 'Implement Viterbi decoder, QAM-64 mapper, or digital down-converter (DDC) in SystemVerilog.',
        freeResource: 'Digital Communications by John Proakis & Xilinx Telecom IP user guides'
      },
      {
        stepNumber: 2,
        title: 'Master High-Speed SerDes & Timing Concepts',
        action: 'Study clock and data recovery (CDR), eye diagrams, jitter analysis, and PCIe/Ethernet PHY standards.',
        freeResource: 'Design of High-Speed CMOS Circuits (Behzad Razavi) & Cadence SerDes webinars'
      },
      {
        stepNumber: 3,
        title: 'Target Wireless Semiconductor Giants',
        action: 'Apply to Qualcomm, Broadcom, MediaTek, and Marvell for Modem DSP and SerDes physical layer roles.',
        freeResource: 'Qualcomm & Broadcom interview drill archives'
      }
    ],
    resumeBulletAngle: 'Implemented pipelined 64-QAM digital demodulator in synthesizable SystemVerilog on FPGA, validating constellation eye opening and zero bit error rate at 250 Mbps.'
  },
  {
    branchId: 'custom',
    name: 'Interdisciplinary / Applied Engineering',
    inherentSuperpowers: [
      'Unique perspective bridging adjacent domains with semiconductor engineering',
      'High adaptability and self-driven initiative to learn specialized silicon tooling'
    ],
    criticalSkillGaps: [
      'Requires verified proof-of-work to overcome non-traditional branch screening'
    ],
    threeStepBridgePlan: [
      {
        stepNumber: 1,
        title: 'Build Public Proof-of-Work on GitHub',
        action: 'Publish clean, lint-checked RTL code with comprehensive waveform documentation.',
        freeResource: 'Open-source silicon community guides'
      },
      {
        stepNumber: 2,
        title: 'Obtain Recognized Industry Certifications',
        action: 'Complete verified courses in SystemVerilog, UVM, or Linux embedded systems.',
        freeResource: 'NPTEL, Siemens Verification Academy, Linux Foundation'
      },
      {
        stepNumber: 3,
        title: 'Network Directly with Engineering Hiring Managers',
        action: 'Share technical project write-ups and timing closure reports on LinkedIn.',
        freeResource: 'Semiconductor engineering community forums'
      }
    ],
    resumeBulletAngle: 'Designed and verified synthesizable digital peripheral with documented waveform simulations and 100% statement coverage.'
  }
];

// =========================================================================
// 4. LAB ADAPTATION STACK: FROM MULTI-CRORE EDA TO ZERO-COST OPEN SOURCE
// =========================================================================

export const UNIVERSAL_LAB_STACKS: LabAdaptationStack[] = [
  {
    tierId: 'full-commercial',
    title: 'Tier A: Commercial Foundry & Multi-Core EDA Suite',
    costRange: 'Institutes with active Synopsys/Cadence/Siemens University Licensure',
    hardwareTools: [
      'High-end FPGA Workstations (Xilinx Zynq UltraScale+ MPSOC, Altera Stratix 10)',
      'Keysight / Tektronix 4-Channel 1GHz+ Mixed Signal Oscilloscopes',
      'JTAG Hardware Emulators (Lauterbach Trace32, Segger J-Link Ultra+)'
    ],
    edaAndSimulators: [
      'Synopsys Design Compiler (Synthesis), PrimeTime (Signoff STA), IC Compiler II (P&R), VCS (Simulation)',
      'Cadence Virtuoso (Analog IC), Innovus (Physical Implementation), Xcelium (Digital Logic Sim), Genus (Synthesis)',
      'Siemens Questa Advanced Simulator (UVM / SVA), Calibre (DRC/LVS Physical Verification)'
    ],
    workflowOverview: 'Industrial standard flow: RTL elaboration &rarr; Logic Synthesis with target .lib timing libraries &rarr; Floorplanning & CTS in Innovus &rarr; Parasitic extraction (StarRC) &rarr; Calibre signoff DRC/LVS &rarr; GDSII tapeout.',
    suitableProjects: [
      'Multi-core 64-bit RISC-V SoC with AXI5 bus in TSMC 16nm / SCL 180nm',
      'Sub-threshold Phase-Locked Loop (PLL) or 12-bit SAR ADC in Cadence Virtuoso',
      'Full-chip hierarchical floorplanning with power network IR-drop signoff'
    ],
    industryEquivalence: '100% 1:1 match with daily engineering workflows at Intel, Qualcomm, Nvidia, and Apple.'
  },
  {
    tierId: 'standard-hardware',
    title: 'Tier B: Standard College Hardware & FPGA Laboratory',
    costRange: 'Standard Engineering Colleges (₹50,000–₹2,00,000 lab equipment budget)',
    hardwareTools: [
      'Xilinx Basys3 (Artix-7 XC7A35T) or Nexys A7 FPGA Development Boards',
      'Intel Altera DE10-Lite (MAX 10) or DE0-CV FPGA Kits',
      'STM32 Nucleo-64 (ARM Cortex-M4) / NXP LPC1768 development boards',
      'Budget USB Logic Analyzers (Saleae 8-channel clone / Rigol 100MHz Scope)'
    ],
    edaAndSimulators: [
      'AMD Xilinx Vivado ML Standard Edition (Free WebPACK license)',
      'Intel Quartus Prime Lite Edition (Free license for MAX 10 / Cyclone IV)',
      'Siemens ModelSim / Questa Intel FPGA Starter Edition',
      'Keil MDK-ARM uVision (32KB code-size limit) / STM32CubeIDE (Free GCC)'
    ],
    workflowOverview: 'FPGA flow: Synthesizable Verilog/VHDL code &rarr; Pin constraint mapping (.xdc / .qsf) &rarr; Vivado Synthesis & Implementation &rarr; Static Timing Analysis (Report Timing Summary) &rarr; Bitstream generation &rarr; Physical board programming via JTAG &rarr; Logic analyzer verification.',
    suitableProjects: [
      'Pipelined RISC-V RV32I core running on Basys3 with seven-segment display output',
      'Hardware CNN MNIST digit classifier accelerator utilizing BRAM and DSP48 slices',
      'Real-time FreeRTOS sensor fusion node over SPI/I2C with DMA transfers on STM32'
    ],
    industryEquivalence: 'Highly respected for FPGA prototyping, emulation, and embedded firmware engineering roles.'
  },
  {
    tierId: 'open-source-zero-cost',
    title: 'Tier C: 100% Free Open-Source Silicon Stack (Laptop Only)',
    costRange: 'Zero Cost (₹0 software cost; ₹2,000 optional budget hardware)',
    hardwareTools: [
      'Any personal laptop (Windows with WSL2 Ubuntu, macOS, or native Linux)',
      'Optional budget hardware: Raspberry Pi Pico (RP2040 ₹350), STM32 BlackPill (₹300), Tang Nano 9K FPGA (₹2,500), 24MHz USB Logic Analyzer (₹400)'
    ],
    edaAndSimulators: [
      'Icarus Verilog (iverilog) + GTKWave (Fast digital simulation and waveform inspection)',
      'Verilator (Ultra-fast cycle-accurate C++ simulation and linting)',
      'cocotb (Coroutine-based Python testbenches: write UVM-like verification in pure Python!)',
      'Yosys (Open-source synthesis suite) + nextpnr (FPGA place and route)',
      'OpenLane + SkyWater 130nm PDK (Full automated RTL-to-GDSII ASIC flow!)',
      'Tiny Tapeout (Open-source multi-project wafer shuttle fabricating real chips!)',
      'EDA Playground (Cloud browser simulation: free access to commercial EDA simulators)'
    ],
    workflowOverview: 'Write SystemVerilog &rarr; Lint with Verilator &rarr; Simulate with iverilog and cocotb &rarr; Synthesize netlist with Yosys &rarr; Run OpenLane automated P&R targeting SkyWater 130nm standard cells &rarr; Generate DRC-clean GDSII layout file &rarr; Submit to Tiny Tapeout for physical silicon fabrication!',
    suitableProjects: [
      'Real taped-out SkyWater 130nm chip via Tiny Tapeout (Audio synthesizer, ALU, or UART)',
      'Comprehensive cocotb Python verification testbench for an AXI-Stream packet router',
      'Complete cycle-accurate RISC-V emulator in C++ verified against RISC-V compliance suite'
    ],
    industryEquivalence: 'Outstanding differentiator! Demonstrates proactive initiative, modern open-source toolchain fluency, and real silicon tapeout experience that outshines generic college projects.'
  }
];

// =========================================================================
// 5. NATIONAL CONTESTS & OFF-CAMPUS GATEWAYS FOR ALL COLLEGES
// =========================================================================

export const UNIVERSAL_NATIONAL_CONTESTS: UniversalContestGuide[] = [
  {
    contestName: 'Texas Instruments India Innovation Challenge Design Contest (IICDC)',
    organizer: 'Texas Instruments & Department of Science and Technology (DST) / AICTE',
    seasonMonth: 'July – February annually',
    eligibility: 'All AICTE-approved engineering college undergraduates (NITs, IITs, State & Affiliated)',
    rewardOrPPO: 'Direct interview fast-tracks and Pre-Placement Offers (PPOs) at Texas Instruments Bangalore, cash awards up to ₹25 Lakhs',
    winningStrategy: 'Submit a prototype leveraging TI analog front-ends (ADC/PGA) combined with TI MSP430/C2000 microcontrollers solving an industrial or automotive challenge.',
    url: 'https://e2e.ti.com/group/universityprogram/w/contests'
  },
  {
    contestName: 'Cadence Design Contest for Indian Universities',
    organizer: 'Cadence Design Systems India',
    seasonMonth: 'March – October annually',
    eligibility: 'B.Tech / M.Tech students across Indian universities',
    rewardOrPPO: 'Direct recruitment shortlist for Cadence R&D centers (Bangalore, Noida, Pune, Hyderabad), substantial cash prizes',
    winningStrategy: 'Submit an advanced digital or analog design using Cadence tools (Virtuoso, Genus, Innovus) focusing on low-power optimization (UPF) or high-frequency clocking.',
    url: 'https://www.cadence.com/en_US/home/company/cadence-academic-network.html'
  },
  {
    contestName: 'RISC-V International Student Design Contest & Mentorship',
    organizer: 'RISC-V International & Linux Foundation',
    seasonMonth: 'Rolling cohorts throughout the year',
    eligibility: 'Open globally to all university students',
    rewardOrPPO: 'Global visibility, travel grants to RISC-V Summit, direct mentorship by senior architects at Google, SiFive, Western Digital, and Tenstorrent',
    winningStrategy: 'Contribute a synthesizable custom instruction extension (e.g. cryptography, fixed-point AI) to an open-source core like CV32E40P or SweRV.',
    url: 'https://riscv.org/mentorship/'
  },
  {
    contestName: 'Google Summer of Code (GSoC) with FOSSi Foundation & CHIPS Alliance',
    organizer: 'Google & Free and Open Source Silicon (FOSSi) Foundation',
    seasonMonth: 'Applications open February / March annually',
    eligibility: 'Open to all university students and open-source contributors',
    rewardOrPPO: 'Substantial stipend ($1,500–$3,000 USD), world-class mentorship, immediate resume gold for international semiconductor recruiters',
    winningStrategy: 'Start contributing small PRs to projects like Yosys, Verilator, cocotb, OpenROAD, or FuseSoC in November/December before GSoC organizations are announced.',
    url: 'https://www.fossi-foundation.org/gsoc'
  },
  {
    contestName: 'Efabless Chipalooza / Tiny Tapeout Shuttle',
    organizer: 'Efabless Corporation & Google Silicon / IEEE CASS',
    seasonMonth: 'Runs every 2–3 months',
    eligibility: 'Open to everyone worldwide',
    rewardOrPPO: 'Your physical design manufactured on SkyWater 130nm silicon and delivered to your doorstep in a PCB carrier board!',
    winningStrategy: 'Design a clean digital circuit that fits within the Tiny Tapeout standard cell grid (e.g. 8-bit multiplier, game of life, or SPI peripheral), fully verified in simulation.',
    url: 'https://tinytapeout.com'
  }
];

// =========================================================================
// 6. DYNAMIC STRATEGY REPORT GENERATOR FOR ANY STUDENT & COLLEGE
// =========================================================================

export function generateUniversalStrategyReportMd(profile: StudentCollegeProfile): string {
  const tierInfo = UNIVERSAL_COLLEGE_TIERS.find(t => t.id === profile.collegeTierId) || UNIVERSAL_COLLEGE_TIERS[0];
  const branchStrategy = BRANCH_PIVOT_STRATEGIES.find(b => b.branchId === profile.department) || BRANCH_PIVOT_STRATEGIES[0];
  const labStack = UNIVERSAL_LAB_STACKS.find(l => l.tierId === profile.labAccessTier) || UNIVERSAL_LAB_STACKS[1];
  const isNitGoa = profile.collegeTierId === 'nit-goa';

  return `# ${profile.collegeName} &bull; ${branchStrategy.name} &rarr; Semiconductor Engineering Strategy Report
**Curated Strategy for: ${profile.collegeName}**
**Branch / Discipline**: ${profile.customDepartmentName || branchStrategy.name}
**Academic Status**: Current ${profile.semester.toUpperCase()} Semester
**Target Industry Track**: ${profile.targetCareerGoal}
**Configured Lab Infrastructure**: ${labStack.title}
**Date of Strategic Baseline**: September 2026

---

## 1. Executive Summary & Institute Positioning

This customized academic and career strategy report provides a systematic roadmap tailored specifically for **${profile.collegeName}** students pursuing high-impact engineering careers in the semiconductor and hardware industry.

### Institutional Profile & Advantage
- **Category**: ${tierInfo.badge}
- **Recruitment Landscape**: ${tierInfo.onCampusFootfall}
- **Configured Lab Access**: ${labStack.costRange}
- **Strategic Core Strength**: ${tierInfo.tagline}

${isNitGoa ? `
> **NIT Goa EEE Official Alignment Note**:
> This report directly cross-references the official NIT Goa Academic Handbook and Syllabus Portal (rules_and_regulations.html & syllabus.html). It integrates core requirements such as **EE541 Embedded Systems** catch-up, the vital **EE545 FPGA Based Digital Design** elective in 6th semester, and physical Basys3 hardware lab utilization.
` : `
> **Universal College Adaptability Note**:
> Whether studying at an IIT, premier NIT, BITS, state university, or an affiliated regional engineering college (VTU, AKTU, JNTU, KTU), this roadmap decouples your career trajectory from campus hiring limitations through targeted open-source tapeouts, national contests, and industry-grade verification.
`}

---

## 2. Inherent Branch Superpowers & Skill-Gap Mitigation

### Superpowers of ${branchStrategy.name}:
${branchStrategy.inherentSuperpowers.map(s => `- **${s}**`).join('\n')}

### Critical Skill Gaps to Bridge:
${branchStrategy.criticalSkillGaps.map(g => `- *Gap*: ${g}`).join('\n')}

### 3-Step Tactical Action Plan:
${branchStrategy.threeStepBridgePlan.map(step => `
${step.stepNumber}. **${step.title}**
   - *Action*: ${step.action}
   - *Recommended Free Resource*: ${step.freeResource}
`).join('')}

---

## 3. Recommended Academic Electives & AICTE Syllabus Mapping

To maximize shortlisting at Qualcomm, Texas Instruments, Intel, AMD, Synopsys, and NXP, your elective selection must prioritize digital microarchitecture and verification:

| Priority | Elective / Subject Area | AICTE / Standard Code | ${isNitGoa ? 'NIT Goa Code' : 'Universal Focus'} | Testing Target in MNC Interviews | Free Online Alternative |
| :--- | :--- | :--- | :--- | :--- | :--- |
${UNIVERSAL_ELECTIVES_MAPPING.map(e => `| **${e.priority}** | ${e.courseName} | \`${e.aicteUniversalCode}\` | \`${isNitGoa ? e.nitGoaEquivalentCode : e.category}\` | ${e.industryTestingFocus} | ${e.freeOnlineEquivalent} |`).join('\n')}

---

## 4. Laboratory Infrastructure & Execution Strategy

### Current Lab Environment: ${labStack.title}
- **Hardware Resources**: ${labStack.hardwareTools.join(', ')}
- **EDA & Simulators**: ${labStack.edaAndSimulators.join(', ')}
- **Production Flow**: ${labStack.workflowOverview}

### Recommended Flagship Projects for This Lab Tier:
${labStack.suitableProjects.map(p => `1. **${p}**`).join('\n')}

*Industry Equivalence Rating*: ${labStack.industryEquivalence}

---

## 5. Semiconductor Recruitment Playbook & Placement Pathways

### Primary Hiring Channels for ${tierInfo.name}:
${tierInfo.primaryHiringAvenues.map(ch => `- **${ch}**`).join('\n')}

### Key Strategic Rules:
1. **The 8.0 CGPA Shield**: Keep academic CGPA above 8.0 (minimum 7.5) to clear initial automated MNC placement filters.
2. **GitHub Proof-of-Work**: Never submit a resume with just "Verilog project". Link a clean GitHub repo containing documented RTL, automated testbenches, and GTKWave/Vivado waveform screenshots.
3. **Whiteboard Readiness**: Be prepared to derive setup/hold time margins, draw dual-flop synchronizers, and sketch Mealy vs Moore state diagrams on a physical whiteboard in under 5 minutes without consulting notes.

---

## 6. National Contests with Direct PPO & Interview Opportunities

If on-campus core semiconductor visits are competitive or limited, prioritize these annual national design competitions:

${UNIVERSAL_NATIONAL_CONTESTS.map(c => `
### ${c.contestName}
- **Organizer**: ${c.organizer}
- **Schedule**: ${c.seasonMonth}
- **Eligibility**: ${c.eligibility}
- **Prize & Career Opportunity**: ${c.rewardOrPPO}
- **Winning Strategy**: ${c.winningStrategy}
- **Official Portal**: [${c.url}](${c.url})
`).join('\n')}

---

## 7. Semester-by-Semester Milestones (From ${profile.semester.toUpperCase()} Sem to Placement)

- **Immediate 30 Days**: 
  - Validate your elective enrollment. Ensure registration for digital/FPGA and computer architecture electives.
  - Set up a clean Linux/WSL2 development environment with iverilog, GTKWave, and Verilator.
- **Mid-Semester Sprint**:
  - Implement a synthesizable AXI4-Lite peripheral or UART controller in SystemVerilog.
  - Write a self-checking testbench with randomized stimulus and assert statements.
- **Pre-Final Semester**:
  - Secure a 2-month summer internship or complete an intensive open-source ASIC / FPGA capstone project.
  - Drill 50+ digital design whiteboard problems (metastability, FIFO pointer gray coding, clock gating).
- **Final Year Placements**:
  - Execute on-campus tests, pooled national drives, and alumni referrals.

---
*Report generated via Hardware & Silicon Engineering Platform &bull; Universal Engineering Edition*
`;
}
