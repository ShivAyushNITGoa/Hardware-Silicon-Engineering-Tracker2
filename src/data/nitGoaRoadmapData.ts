export interface AcademicSemesterPlan {
  semester: string;
  semesterNumber: number;
  status: 'Completed' | 'Current / In-Progress' | 'Upcoming' | 'Future';
  mandatoryCourses: string[];
  recommendedElectives: {
    code: string;
    name: string;
    category: 'Department Elective' | 'Open Elective (OE)' | 'Core Lab' | 'Mandatory';
    priority: 'Top Priority' | 'Recommended' | 'Alternative';
    reason: string;
    expectedLearning: string[];
    isCompleted?: boolean;
    isSelected?: boolean;
  }[];
  timelineSkills: {
    id: string;
    title: string;
    description: string;
    category: 'RTL' | 'FPGA' | 'Architecture' | 'Embedded' | 'Verification' | 'Projects';
  }[];
}

export interface CompanySkillMapping {
  company: string;
  tickerOrTier: string;
  logoColor: string;
  focusAreas: string[];
  keySkills: string[];
  relevanceToNITGoa: string;
}

export interface SpecializationTrack {
  id: string;
  name: string;
  formula: string;
  skills: string[];
  description: string;
  recommendedElectives: string[];
  targetRoles: string[];
  targetCompanies: string[];
}

export interface FinalRoadmapStage {
  currentPosition: string;
  next: string;
  then: string;
  finalOutcome: string;
}

export interface ElectiveDecisionItem {
  situation: string;
  decision: string;
  impact: string;
  actionPlan: string;
}

export interface NITGoaProfile {
  institute: string;
  branch: string;
  currentStatus: string;
  targetGraduationProfile: string[];
  targetRoles: string[];
  sourceReferences: {
    title: string;
    url: string;
  }[];
  completedFoundation: {
    semesters: string;
    courses: string[];
  }[];
  embeddedAnalysis: {
    originallyConsidered: string;
    selected: string;
    advantages: string[];
    missingAreas: string[];
    recoveryPlan: string[];
  };
  electiveDecisionMatrix: ElectiveDecisionItem[];
  specializationTracks: SpecializationTrack[];
  companySkillMappings: CompanySkillMapping[];
  timelinePhases: {
    phaseId: string;
    phaseName: string;
    timing: string;
    status: 'Completed' | 'Active' | 'Upcoming';
    skills: { id: string; name: string; detail: string }[];
  }[];
  semesters: AcademicSemesterPlan[];
  finalRoadmap: FinalRoadmapStage;
}

export const NIT_GOA_VLSI_STRATEGY_DATA: NITGoaProfile = {
  institute: 'National Institute of Technology Goa (NIT Goa)',
  branch: 'B.Tech Electrical & Electronics Engineering (EEE)',
  currentStatus: 'Completed 5th Semester & Transitioning into 6th Semester Onwards',
  targetGraduationProfile: [
    'EEE Electrical & Circuit Foundation',
    'EE541 Embedded Systems Design',
    'EE545 FPGA Based Digital Design',
    'EE560 VLSI Technology & CMOS Fundamentals',
    'Computer Architecture & RISC-V Microarchitecture',
    'Synthesizable SystemVerilog & SVA Assertions',
    'RTL Hardware Accelerators & AXI SoC Projects',
    'ASIC Verification Basics & UVM Architecture'
  ],
  targetRoles: [
    'RTL Design Engineer',
    'SoC Architecture & Integration Engineer',
    'FPGA & Emulation Engineer',
    'Design Verification (DV) Engineer'
  ],
  sourceReferences: [
    {
      title: 'NIT Goa Academic Handbook / Curriculum Rules & Regulations',
      url: 'https://www.nitgoa.ac.in/academics/rules_and_regulations.html'
    },
    {
      title: 'NIT Goa Academic Syllabus Portal',
      url: 'https://www.nitgoa.ac.in/syllabus.html'
    }
  ],
  completedFoundation: [
    {
      semesters: '1st - 4th Semesters',
      courses: [
        'Mathematics & Engineering Fundamentals',
        'Electrical Engineering Fundamentals & Network Theory',
        'Electronics Fundamentals & Semiconductor Devices',
        'Digital Electronics (Boolean Algebra, Combinational/Sequential Logic)',
        'Programming Foundations (C/C++ & Problem Solving)',
        'Circuits & Control Systems Concepts'
      ]
    },
    {
      semesters: '5th Semester (Completed)',
      courses: [
        'Digital Electronics Advanced Logic',
        'Analog Electronics & Op-Amp Circuitry',
        'Microprocessors and Microcontrollers (8051/ARM/x86)',
        'Microprocessor Laboratory',
        'EE541 Embedded Systems Design (5th Semester Department Elective)'
      ]
    }
  ],
  embeddedAnalysis: {
    originallyConsidered: 'EE545 FPGA Based Digital Design',
    selected: 'EE541 Embedded Systems Design',
    advantages: [
      'Strong SoC relevance: Understand processor architectures, buses, and peripheral registers',
      'Processor & peripheral interactions: Direct bare-metal mastery of memory maps, ISRs, and DMA',
      'Hardware/software co-design: Solid foundation bridging high-level firmware to silicon registers',
      'Industrial embedded semiconductor applications in automotive, IoT, and industrial automation'
    ],
    missingAreas: [
      'FPGA implementation flow: Hands-on LUT/BRAM/DSP placement and bitstream generation',
      'RTL-to-hardware hands-on experience: XDC timing constraints, clock management, and in-system ILA debug'
    ],
    recoveryPlan: [
      'Take EE545 FPGA Based Digital Design elective in 6th semester immediately',
      'Complete Vivado hardware projects on physical FPGA boards (Basys3 / PYNQ / Nexys)',
      'Build end-to-end RTL portfolio (UART, SPI, FSM, AXI, RV32I pipelined core) with GitHub waveforms'
    ]
  },
  electiveDecisionMatrix: [
    {
      situation: 'EE545 FPGA Based Digital Design available in 6th Sem',
      decision: 'Take immediately without hesitation',
      impact: 'Critical — fills the single most important missing RTL-to-hardware physical prototyping experience.',
      actionPlan: 'Enrol in EE545, pair with Xilinx Vivado toolchain, complete 4 board implementations.'
    },
    {
      situation: 'EE545 FPGA unavailable in 6th Sem',
      decision: 'Take EE560 VLSI Technology and aggressively self-learn FPGA via Vivado',
      impact: 'Preserves academic VLSI credits while acquiring FPGA competence via open-source or academic board kits.',
      actionPlan: 'Use Vivado WebPACK, follow Digilent Basys3 labs, implement RTL IP cores independently.'
    },
    {
      situation: 'Computer Architecture Open Elective (OE) available in 8th Sem',
      decision: 'Highest Priority Open Elective — enroll immediately',
      impact: 'Essential for CPU/SoC roles at NVIDIA, Intel, Qualcomm, and RISC-V startups.',
      actionPlan: 'Master cache hierarchies, superscalar pipelining, out-of-order execution, and branch predictors.'
    },
    {
      situation: 'AI/ML related Open Elective (OE) available in 8th Sem',
      decision: 'Second Priority Open Elective — enroll as primary alternative',
      impact: 'Directly prepares for NPU, edge accelerator, and TinyML hardware co-design positions.',
      actionPlan: 'Focus on tensor operations, systolic array matrix multipliers, and INT8 fixed-point quantization.'
    },
    {
      situation: 'Career Specialization Interest: RTL Design',
      decision: 'Prioritize: FPGA + VLSI Technology + Computer Architecture',
      impact: 'Direct alignment with Qualcomm, NVIDIA, AMD, and Intel RTL design interviews.',
      actionPlan: 'Build 5-stage RISC-V core with AXI bus and hazard forwarding.'
    },
    {
      situation: 'Career Specialization Interest: Design Verification (DV)',
      decision: 'Prioritize: FPGA + Architecture + Embedded + SystemVerilog/UVM',
      impact: 'High-demand industry niche with huge openings across MNCs and product startups.',
      actionPlan: 'Master SystemVerilog OOP, constrained-random stimulus, SVA assertions, and UVM scoreboards.'
    },
    {
      situation: 'Career Specialization Interest: Physical Design (PD)',
      decision: 'Prioritize: EE560 VLSI Technology + CMOS Fundamentals + STA Timing',
      impact: 'Direct alignment with Synopsys, Cadence, and ASIC backend design service firms.',
      actionPlan: 'Master OpenLane RTL-to-GDSII flow, floorplanning, CTS, and Primetime/OpenSTA slack setup/hold drills.'
    }
  ],
  specializationTracks: [
    {
      id: 'rtl-design',
      name: 'RTL Design Track',
      formula: 'FPGA + VLSI + Architecture',
      skills: ['Verilog/SystemVerilog RTL', 'FPGA Architecture & Vivado Flow', 'Computer Architecture & Pipelining', 'Hardware Accelerators'],
      description: 'Focuses on writing clean, synthesizable microarchitectures, state machines, CPU pipelines, and high-performance hardware compute engines.',
      recommendedElectives: ['EE545 FPGA Based Digital Design (6th Sem)', 'EE560 VLSI Technology (7th Sem)', 'Computer Architecture OE (8th Sem)'],
      targetRoles: ['RTL Design Engineer', 'SoC Design Engineer', 'FPGA Engineer'],
      targetCompanies: ['Qualcomm', 'NVIDIA', 'AMD', 'Intel']
    },
    {
      id: 'design-verification',
      name: 'Design Verification (DV) Track',
      formula: 'FPGA + Architecture + Embedded + SystemVerilog/UVM',
      skills: ['SystemVerilog OOP', 'UVM Testbench Architecture', 'Constrained-Random Verification', 'SVA Assertions & Functional Coverage'],
      description: 'Focuses on pre-silicon verification, writing robust self-checking testbenches, bus functional models (BFMs), and coverage closure.',
      recommendedElectives: ['EE545 FPGA Based Digital Design', 'EE541 Embedded Systems Design (Completed)', 'Computer Architecture OE'],
      targetRoles: ['Design Verification (DV) Engineer', 'Silicon Validation Engineer', 'Emulation Engineer'],
      targetCompanies: ['Qualcomm', 'Intel', 'Synopsys', 'Cadence', 'Siemens EDA']
    },
    {
      id: 'physical-design',
      name: 'Physical Design (PD) Track',
      formula: 'VLSI Technology + CMOS + Timing',
      skills: ['Static Timing Analysis (STA)', 'CMOS Inverter Transfer & Sizing', 'RTL-to-GDSII ASIC Flow', 'Floorplanning & Clock Tree Synthesis (CTS)'],
      description: 'Focuses on silicon fabrication physics, CMOS standard cell libraries, timing closure, power analysis, and DRC/LVS physical signoff.',
      recommendedElectives: ['EE560 VLSI Technology (7th Sem)', 'EE545 FPGA Timing Constraints (6th Sem)', 'Additional VLSI Elective (8th Sem)'],
      targetRoles: ['Physical Design Engineer', 'ASIC Implementation Engineer', 'Timing Signoff Engineer'],
      targetCompanies: ['Synopsys', 'Cadence', 'AMD', 'Semiconductor Foundries']
    }
  ],
  companySkillMappings: [
    {
      company: 'Qualcomm',
      tickerOrTier: 'MNC Semiconductor Giant',
      logoColor: 'text-blue-600 bg-blue-50 border-blue-200',
      focusAreas: ['Snapdragon SoCs', 'Modems & RF', 'NPU Accelerators'],
      keySkills: ['SoC architecture', 'RTL', 'SystemVerilog', 'Verification'],
      relevanceToNITGoa: 'High hiring target in Bangalore/Hyderabad for EEE grads with strong digital logic & SoC fundamentals.'
    },
    {
      company: 'NVIDIA',
      tickerOrTier: 'Global GPU & AI Silicon Leader',
      logoColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      focusAreas: ['GeForce & Tensor Core GPUs', 'Grace Hopper CPUs', 'InfiniBand Networking'],
      keySkills: ['Computer Architecture', 'RTL', 'Hardware accelerators'],
      relevanceToNITGoa: 'Tests pipelining, cache coherence, memory hierarchies, and hardware fixed-point math.'
    },
    {
      company: 'AMD',
      tickerOrTier: 'CPU, GPU & Adaptive FPGA (Xilinx) Titan',
      logoColor: 'text-red-600 bg-red-50 border-red-200',
      focusAreas: ['Zen CPU Cores', 'Radeon GPUs', 'Versal Adaptive SoCs & FPGAs'],
      keySkills: ['FPGA', 'RTL', 'Timing'],
      relevanceToNITGoa: 'EE545 FPGA elective directly unlocks AMD adaptive computing and silicon validation tracks.'
    },
    {
      company: 'Intel',
      tickerOrTier: 'Semiconductor Fabrication & Microprocessor Pioneer',
      logoColor: 'text-blue-700 bg-blue-50 border-blue-200',
      focusAreas: ['Core & Xeon Processors', 'Intel Foundry Services', 'FPGA (Altera)'],
      keySkills: ['RTL', 'Verification', 'Architecture'],
      relevanceToNITGoa: 'Regular hiring through national pool; values EEE graduates with solid logic & microprocessor rigor.'
    },
    {
      company: 'Synopsys',
      tickerOrTier: 'EDA & Silicon IP Global #1',
      logoColor: 'text-purple-600 bg-purple-50 border-purple-200',
      focusAreas: ['Design Compiler', 'PrimeTime STA', 'VCS Simulator', 'DesignWare IP'],
      keySkills: ['RTL', 'Synthesis', 'STA', 'Verification'],
      relevanceToNITGoa: 'Major R&D centers in Bangalore, Hyderabad, and Noida; strong focus on timing analysis and IP development.'
    },
    {
      company: 'Cadence',
      tickerOrTier: 'EDA & Intelligent System Design Pioneer',
      logoColor: 'text-orange-600 bg-orange-50 border-orange-200',
      focusAreas: ['Innovus P&R', 'Xcelium Simulator', 'Virtuoso Analog AMS', 'Tensilica DSPs'],
      keySkills: ['IC design', 'Simulation', 'Verification'],
      relevanceToNITGoa: 'Recruits digital and verification specialists; rewards strong grasp of EDA tool workflows.'
    },
    {
      company: 'Siemens EDA',
      tickerOrTier: 'EDA & IC Verification Powerhouse',
      logoColor: 'text-teal-600 bg-teal-50 border-teal-200',
      focusAreas: ['QuestaSim / ModelSim', 'Calibre DRC/LVS', 'Tessent DFT', 'Catapult HLS'],
      keySkills: ['Questa', 'SystemVerilog', 'UVM', 'Verification'],
      relevanceToNITGoa: 'Strong focus on Questa debug, SystemVerilog OOP, and UVM testbench verification engineers.'
    }
  ],
  timelinePhases: [
    {
      phaseId: 'phase-before-6',
      phaseName: 'Phase 1: Before 6th Semester Foundation',
      timing: 'Winter Break / Pre-6th Sem',
      status: 'Completed',
      skills: [
        { id: 'p1-1', name: 'Complete Verilog Basics', detail: 'Syntax, data types, procedural blocks (always_comb, always_ff), assign statements' },
        { id: 'p1-2', name: 'Digital Design Revision', detail: 'K-Maps, setup & hold slack equations, combinational hazard prevention' },
        { id: 'p1-3', name: 'Simulation Workflow Setup', detail: 'Icarus Verilog + GTKWave / ModelSim testbench simulation environment' },
        { id: 'p1-4', name: 'Build Small RTL Modules', detail: 'ALUs, Priority Encoders, Linear Feedback Shift Registers (LFSR), Barrel Shifters' }
      ]
    },
    {
      phaseId: 'phase-during-6',
      phaseName: 'Phase 2: During 6th Semester (Immediate Execution)',
      timing: '6th Semester (Current Semester)',
      status: 'Active',
      skills: [
        { id: 'p2-1', name: 'FPGA Flow using Xilinx Vivado', detail: 'Synthesis, implementation, bitstream generation, and XDC physical constraints' },
        { id: 'p2-2', name: 'RTL Hardware Projects', detail: 'Multi-cycle execution units, parameterized FIFO buffers with full/empty flags' },
        { id: 'p2-3', name: 'Complex FSM Design', detail: 'Mealy vs Moore machines, glitch-free state encoding (Gray, One-Hot), timeout watchdogs' },
        { id: 'p2-4', name: 'Serial Communication Protocols', detail: 'Full-duplex UART with baud rate generator, SPI Master/Slave with CPOL/CPHA, I2C Controller' }
      ]
    },
    {
      phaseId: 'phase-during-7',
      phaseName: 'Phase 3: During 7th Semester (Specialization & Integration)',
      timing: '7th Semester',
      status: 'Upcoming',
      skills: [
        { id: 'p3-1', name: 'CMOS & VLSI Fundamentals', detail: 'EE560 VLSI Tech: MOS transistor I-V curves, inverter transfer characteristics, static/dynamic power dissipation' },
        { id: 'p3-2', name: 'SoC Architecture Concepts', detail: 'AMBA bus interconnects (AXI4-Lite, APB), address decoding, register banks' },
        { id: 'p3-3', name: 'DSP Hardware Compute Blocks', detail: 'EE543 DSP: Hardware MAC units, Q-Format fixed-point arithmetic, pipelined FIR digital filters' },
        { id: 'p3-4', name: 'Embedded Hardware Systems', detail: 'EE542/EE556: Real-time control loops, sensor fusion, FreeRTOS task scheduling on hardware' }
      ]
    },
    {
      phaseId: 'phase-during-8',
      phaseName: 'Phase 4: During 8th Semester (Capstone & Interview Readiness)',
      timing: '8th Semester',
      status: 'Upcoming',
      skills: [
        { id: 'p4-1', name: '5-Stage Pipelined RISC-V CPU', detail: 'RV32I core with hazard detection, data forwarding, branch prediction, and memory bus' },
        { id: 'p4-2', name: 'AXI4 SoC Integration Project', detail: 'RISC-V master core connected to custom hardware accelerator via AXI bus with DMA engine' },
        { id: 'p4-3', name: 'Advanced Verification Learning', detail: 'SystemVerilog OOP testbenches, SVA assertions, and UVM Agent/Scoreboard architecture' },
        { id: 'p4-4', name: 'Semiconductor Internship & Placement Prep', detail: 'Whiteboard STA timing slack drills, setup/hold problem solving, mock technical interviews' }
      ]
    }
  ],
  semesters: [
    {
      semester: '6th Semester',
      semesterNumber: 6,
      status: 'Current / In-Progress',
      mandatoryCourses: ['Indian Knowledge System (IKS)'],
      recommendedElectives: [
        {
          code: 'EE545',
          name: 'FPGA Based Digital Design',
          category: 'Department Elective',
          priority: 'Top Priority',
          reason: 'The single most important missing component from 5th semester selection. Connects RTL theory to real silicon hardware.',
          expectedLearning: [
            'Synthesizable Verilog and SystemVerilog RTL coding',
            'FPGA architecture: Configurable Logic Blocks (CLBs), LUTs, Block RAM (BRAM), DSP48 slices',
            'RTL synthesis & logic optimization principles',
            'XDC timing constraints (create_clock, set_input_delay, set_output_delay)',
            'Hardware implementation, bitstream flashing, and Integrated Logic Analyzer (ILA) in-system debugging'
          ]
        }
      ],
      timelineSkills: [
        { id: 'sem6-1', title: 'Xilinx Vivado Toolchain Flow', description: 'End-to-end RTL-to-bitstream toolflow on FPGA boards', category: 'FPGA' },
        { id: 'sem6-2', title: 'Synthesizable RTL Protocols', description: 'UART with FIFO, SPI Master/Slave, I2C bus state machine', category: 'RTL' },
        { id: 'sem6-3', title: 'Complex FSM Microarchitectures', description: 'Glitch-free Gray/One-hot encoding with datapath handshaking', category: 'RTL' }
      ]
    },
    {
      semester: '7th Semester',
      semesterNumber: 7,
      status: 'Upcoming',
      mandatoryCourses: [],
      recommendedElectives: [
        {
          code: 'EE560',
          name: 'VLSI Technology',
          category: 'Department Elective',
          priority: 'Top Priority',
          reason: 'Covers physical semiconductor manufacturing, CMOS physics, fabrication steps, and layout rules essential for ASIC/backend roles.',
          expectedLearning: [
            'CMOS inverter characteristics & delay models',
            'Silicon wafer fabrication: lithography, etching, ion implantation, metallization',
            'Interconnect parasitic RC modeling and propagation delays',
            'Layout design rules (DRC) and physical verification fundamentals'
          ]
        },
        {
          code: 'EE542',
          name: 'Embedded Control System',
          category: 'Department Elective',
          priority: 'Recommended',
          reason: 'Bridges EEE control theory with embedded digital microcontrollers; highly valued in automotive semiconductor firms.',
          expectedLearning: [
            'Discrete-time state-space control on embedded processors',
            'Digital PID controller implementation with anti-windup',
            'Actuator PWM drivers, ADC sampling, and hardware feedback loops'
          ]
        },
        {
          code: 'EE556',
          name: 'Cyber Physical Systems',
          category: 'Department Elective',
          priority: 'Recommended',
          reason: 'Teaches distributed networked embedded nodes, IoT gateways, and industrial timing security.',
          expectedLearning: [
            'Real-time communication protocols (CAN, TSN, Modbus)',
            'Embedded security, hardware trust anchors, and cryptographic primitives',
            'Fault tolerance, watchdog timers, and safety-critical system design'
          ]
        },
        {
          code: 'EE543',
          name: 'Digital Signal Processing (DSP)',
          category: 'Department Elective',
          priority: 'Recommended',
          reason: 'Core prerequisite for DSP hardware accelerators, audio/video codecs, and AI tensor silicon.',
          expectedLearning: [
            'Z-transform, DFT/FFT algorithmic architectures',
            'FIR and IIR digital filter design and fixed-point quantization',
            'Hardware pipelining of multiply-accumulate (MAC) units'
          ]
        }
      ],
      timelineSkills: [
        { id: 'sem7-1', title: 'CMOS & VLSI Layout Principles', description: 'Physics of silicon fabrication and layout DRC rules', category: 'Architecture' },
        { id: 'sem7-2', title: 'DSP Fixed-Point Math Engines', description: 'Pipelined FIR filter and Cordic hardware blocks in Verilog', category: 'Projects' },
        { id: 'sem7-3', title: 'SoC AMBA Bus Integration', description: 'Memory-mapped registers and AXI4-Lite peripherals', category: 'Architecture' }
      ]
    },
    {
      semester: '8th Semester',
      semesterNumber: 8,
      status: 'Upcoming',
      mandatoryCourses: [],
      recommendedElectives: [
        {
          code: 'OE-ARCH',
          name: 'Computer Architecture (Open Elective)',
          category: 'Open Elective (OE)',
          priority: 'Top Priority',
          reason: 'The single highest-priority Open Elective. Unlocks CPU microarchitect and SoC designer roles at Intel, AMD, NVIDIA, and Qualcomm.',
          expectedLearning: [
            'Pipelined CPU microarchitecture (Instruction Fetch, Decode, Execute, Memory, Writeback)',
            'Control and data hazard mitigation, forwarding units, branch target buffers',
            'Memory hierarchy: L1/L2 caches, cache coherence (MESI), virtual memory paging',
            'Instruction Level Parallelism (ILP), superscalar, out-of-order scheduling concepts'
          ]
        },
        {
          code: 'OE-AIML',
          name: 'AI / Machine Learning (Open Elective)',
          category: 'Open Elective (OE)',
          priority: 'Recommended',
          reason: 'Crucial for Edge AI accelerator roles and TinyML co-design positions.',
          expectedLearning: [
            'Neural network layer computations and matrix multiplication algorithms',
            'Model compression: Post-training quantization (INT8) and weight pruning',
            'Hardware acceleration architectures: Systolic arrays and processing-in-memory'
          ]
        },
        {
          code: 'OE-SEMI',
          name: 'Additional VLSI / Hardware Elective',
          category: 'Department Elective',
          priority: 'Alternative',
          reason: 'Consolidates advanced verification, testability, or power-efficient design.',
          expectedLearning: [
            'Low-power design techniques (Clock gating, power gating, multi-VDD)',
            'Design for Testability (DFT) and scan insertion',
            'Pre-silicon verification methodologies'
          ]
        }
      ],
      timelineSkills: [
        { id: 'sem8-1', title: '5-Stage Pipelined RISC-V RV32I Core', description: 'Full synthesizable CPU with data hazard forwarding and branch predictor', category: 'Projects' },
        { id: 'sem8-2', title: 'SystemVerilog UVM Testbench Suite', description: 'Constrained-random verification with SVA functional coverage', category: 'Verification' },
        { id: 'sem8-3', title: 'Semiconductor Placement & Interview Drills', description: 'STA timing slack, whiteboard coding, and system architecture defense', category: 'Projects' }
      ]
    }
  ],
  finalRoadmap: {
    currentPosition: 'EEE + Embedded Systems Design',
    next: 'FPGA + VLSI Technology',
    then: 'Architecture + Verification + RTL Projects',
    finalOutcome: 'A strong EEE-to-VLSI profile aligned with semiconductor industry requirements.'
  }
};

export const FULL_NIT_GOA_STRATEGY_REPORT_MD = `# NIT Goa EEE → VLSI Career Strategy Report with Current Progress & 6th Semester Onwards Roadmap

## 1. Source References
Official NIT Goa academic information sources used:
- **NIT Goa Academic Handbook / Curriculum**: [rules_and_regulations.html](https://www.nitgoa.ac.in/academics/rules_and_regulations.html)
- **NIT Goa Syllabus Portal**: [syllabus.html](https://www.nitgoa.ac.in/syllabus.html)

These sources contain UG curriculum structure, elective information, and academic rules.
*Note: Page numbers may vary between handbook revisions.*

---

## 2. Current Academic Progress (Till 5th Semester)
- **Branch**: B.Tech Electrical and Electronics Engineering (EEE), NIT Goa

### Completed Foundation:
#### 1st-4th Semester:
- Mathematics and engineering fundamentals
- Electrical engineering fundamentals
- Electronics fundamentals
- Digital Electronics
- Programming foundation
- Circuit and control concepts

#### Important VLSI-related completed areas:
- Digital Electronics
- Analog Electronics
- Microprocessors and Microcontrollers
- Microprocessor Laboratory
- Embedded Systems Design (5th Semester elective)

### Current Technical Direction:
**EEE + Embedded Systems + Verilog/SystemVerilog self-learning**

### Assessment:
The foundation is suitable for moving toward:
- RTL Design
- SoC Design
- Design Verification
- FPGA Engineering

---

## 3. EE541 Embedded Systems Design Selection Analysis
- **Originally considered**: EE545 FPGA Based Digital Design
- **Selected**: EE541 Embedded Systems Design

### Evaluation:
#### Advantages:
- Strong SoC relevance
- Processor and peripheral understanding
- Hardware/software interaction
- Embedded semiconductor applications

#### Missing area:
- FPGA implementation flow
- RTL-to-hardware experience

#### Recovery plan:
- Take FPGA-related elective later if available
- Complete Vivado projects
- Build RTL portfolio

---

## 4. 6th Semester Onwards Plan
### 6th Semester:
#### Mandatory:
- Indian Knowledge System (IKS)

#### Main elective priority:
1. **EE545 FPGA Based Digital Design**
   - **Reason**: This is the most important missing component.
   - **Expected learning**:
     - Verilog/SystemVerilog RTL
     - FPGA architecture
     - Synthesis
     - Timing constraints
     - Hardware implementation

### 7th Semester:
#### Recommended four electives:
1. **EE560 VLSI Technology**
2. **EE542 Embedded Control System**
3. **EE556 Cyber Physical Systems**
4. **EE543 Digital Signal Processing**

### 8th Semester:
#### Recommended three electives:
1. **Computer Architecture OE**
2. **AI/ML related OE**
3. **Additional VLSI/hardware elective available**

---

## 5. Skill Development Timeline
### Before 6th Semester:
- Complete Verilog basics
- Digital design revision
- Learn simulation workflow
- Build small RTL modules

### During 6th Semester:
- FPGA flow using Vivado
- RTL projects
- FSM design
- UART/SPI/I2C projects

### During 7th Semester:
- CMOS and VLSI fundamentals
- SoC concepts
- DSP hardware blocks
- Embedded hardware projects

### During 8th Semester:
- RISC-V CPU project
- AXI/SoC project
- Verification learning
- Internship preparation

---

## 6. Final VLSI Skill Stack Goal
### Target graduation profile:
**EEE Foundation + Embedded Systems Design + FPGA Design + VLSI Technology + Computer Architecture + SystemVerilog + RTL Projects + Verification Basics**

### Target roles:
- RTL Design Engineer
- SoC Engineer
- FPGA Engineer
- Design Verification Engineer

---

## 7. Elective Decision Matrix
### Situation → Decision:
- **EE545 FPGA available**: Take immediately.
- **EE545 unavailable**: Take EE560 VLSI Technology and self-learn FPGA.
- **Computer Architecture OE available**: Highest priority OE.
- **AI/ML OE available**: Second OE priority.

### Specialization Formulas:
- **RTL Design interest**: FPGA + VLSI + Architecture.
- **Verification interest**: FPGA + Architecture + Embedded + SystemVerilog/UVM.
- **Physical Design interest**: VLSI Technology + CMOS + Timing.

---

## 8. Semiconductor Company Skill Mapping
- **Qualcomm**:
  - SoC architecture
  - RTL
  - SystemVerilog
  - Verification
- **NVIDIA**:
  - Computer Architecture
  - RTL
  - Hardware accelerators
- **AMD**:
  - FPGA
  - RTL
  - Timing
- **Intel**:
  - RTL
  - Verification
  - Architecture
- **Synopsys**:
  - RTL
  - Synthesis
  - STA
  - Verification
- **Cadence**:
  - IC design
  - Simulation
  - Verification
- **Siemens EDA**:
  - Questa
  - SystemVerilog
  - UVM
  - Verification

---

## 9. Final Roadmap
- **Current position**: EEE + Embedded Systems Design
- **Next**: FPGA + VLSI Technology
- **Then**: Architecture + Verification + RTL Projects
- **Final outcome**: A strong EEE-to-VLSI profile aligned with semiconductor industry requirements.
`;

