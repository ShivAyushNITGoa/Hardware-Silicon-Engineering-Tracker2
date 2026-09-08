import { EngineeringDomain, EngineeringDomainId, SuperDomain, SuperDomainId } from '../types';

export const SUPER_DOMAINS: SuperDomain[] = [
  {
    id: 'vlsi',
    name: 'VLSI & Silicon Design',
    shortName: 'VLSI Silicon',
    tagline: 'Frontend RTL, SystemVerilog Verification, Physical Design & FPGA Prototyping',
    description: 'Encompasses all ASIC frontend, verification, backend GDSII, and FPGA silicon emulation disciplines.',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    borderColor: 'border-indigo-500',
    bgLightColor: 'bg-indigo-50/40',
    iconName: 'Cpu',
    subdomainIds: ['digital-vlsi', 'verification-dft', 'physical-design', 'fpga-hardware']
  },
  {
    id: 'embedded',
    name: 'Embedded Systems & Firmware',
    shortName: 'Embedded & Firmware',
    tagline: 'Bare-Metal C, FreeRTOS Concurrency, Linux Kernel Drivers & Edge AI / IoT Hardware',
    description: 'Bridges hardware registers with low-level software, real-time operating systems, and edge intelligence.',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    borderColor: 'border-cyan-500',
    bgLightColor: 'bg-cyan-50/40',
    iconName: 'Terminal',
    subdomainIds: ['embedded-firmware']
  },
  {
    id: 'career-strategy',
    name: 'Academic Strategy & Interview Prep',
    shortName: 'Academic & Career',
    tagline: 'NIT Goa EEE→VLSI Roadmap (6th Sem Onwards), Whiteboard Defense & Semiconductor Companies',
    description: 'Strategic academic planning, elective decisions, semester milestones, and industrial technical interview preparation.',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    borderColor: 'border-amber-500',
    bgLightColor: 'bg-amber-50/40',
    iconName: 'Briefcase',
    subdomainIds: ['career-interview']
  }
];

export const MASTER_ENGINEERING_DOMAINS: EngineeringDomain[] = [
  {
    id: 'digital-vlsi',
    superDomainId: 'vlsi',
    name: 'Digital VLSI & Silicon Architecture',
    shortName: 'Digital VLSI',
    tagline: 'RTL Design, RISC-V Processors, Computer Architecture & Fixed-Point DSP Acceleration',
    description: 'Master frontend digital design from gate-level logic to pipelined RV32I microarchitectures, synthesizable SystemVerilog, and mathematical hardware accelerators.',
    iconName: 'Cpu',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    borderColor: 'border-indigo-500',
    bgLightColor: 'bg-indigo-50/50',
    curriculumTrackIds: ['digital-electronics', 'computer-arch', 'dsp-math'],
    careerTrackIds: ['track-digital-design', 'track-rtl-design', 'track-processor-arch', 'track-networking-asic'],
    jobSpecificRoles: [
      'RTL Design Engineer',
      'ASIC Frontend Microarchitect',
      'RISC-V Core Architect',
      'DSP & Hardware Acceleration Engineer',
      'Networking Protocol ASIC Engineer'
    ],
    subParts: [
      'Digital Logic & Boolean Synthesis',
      'Pipelined CPU Architecture (5-Stage RV32I)',
      'Hardware DSP & Math Compute Engines',
      'Bus Interconnects & Protocol Engines (AXI/AHB)'
    ]
  },
  {
    id: 'verification-dft',
    superDomainId: 'vlsi',
    name: 'Verification, DFT & Silicon Testing',
    shortName: 'Verification & DFT',
    tagline: 'SystemVerilog UVM Testbenches, Formal Assertions, Scan Chains & Low-Power UPF',
    description: 'Build industrial constrained-random verification environments, SystemVerilog Assertions (SVA), coverage closure models, and DFT scan chain insertion.',
    iconName: 'ShieldCheck',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderColor: 'border-emerald-500',
    bgLightColor: 'bg-emerald-50/50',
    curriculumTrackIds: ['verification-uvm', 'dft-low-power'],
    careerTrackIds: ['track-soc-verification'],
    jobSpecificRoles: [
      'SoC Verification Engineer (UVM)',
      'SystemVerilog & SVA Assertion Specialist',
      'Design for Test (DFT) & ATPG Engineer',
      'Pre-Silicon Emulation Engineer',
      'Formal Verification Engineer'
    ],
    subParts: [
      'SystemVerilog OOP & Constrained-Random Stimulus',
      'UVM Testbench Architecture (Agent, Driver, Scoreboard)',
      'SVA Assertions & Functional Coverage Metrics',
      'DFT Scan Insertion, ATPG & IEEE 1801 Low-Power UPF'
    ]
  },
  {
    id: 'physical-design',
    superDomainId: 'vlsi',
    name: 'Physical Design, ASIC Backend & EDA',
    shortName: 'Physical Design',
    tagline: 'RTL-to-GDSII OpenLane Flow, Floorplanning, CTS, STA Signoff & Analog AMS',
    description: 'Transform verified RTL into manufacturable silicon masks using automated P&R flows, clock tree synthesis, Static Timing Analysis (STA), and analog SPICE layout.',
    iconName: 'Layers',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    borderColor: 'border-amber-500',
    bgLightColor: 'bg-amber-50/50',
    curriculumTrackIds: ['physical-design'],
    careerTrackIds: ['track-analog-mixed-signal', 'track-eda-tools'],
    jobSpecificRoles: [
      'Physical Design (PD) Engineer',
      'Static Timing Analysis (STA) Signoff Specialist',
      'Physical Verification (DRC/LVS) Engineer',
      'Analog / Mixed-Signal IC Layout Engineer',
      'EDA Methodology & Silicon Flow Automation Engineer'
    ],
    subParts: [
      'Floorplanning & Power Grid Network (PDN)',
      'Standard Cell Placement & Clock Tree Synthesis (CTS)',
      'Detail Routing & DRC/LVS Physical Verification',
      'Static Timing Analysis (STA) Signoff & Analog SPICE Layout'
    ]
  },
  {
    id: 'fpga-hardware',
    superDomainId: 'vlsi',
    name: 'FPGA Prototyping, Hardware & PCB Systems',
    shortName: 'FPGA & Emulation',
    tagline: 'Vivado Toolflows, High-Speed Multi-Layer PCB, SI/PI & Automotive Hardware',
    description: 'Design robust physical hardware from Xilinx/AMD FPGA prototyping to high-speed controlled impedance PCBs, power electronics converters, and automotive ISO 26262 systems.',
    iconName: 'CircuitBoard',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    borderColor: 'border-rose-500',
    bgLightColor: 'bg-rose-50/50',
    curriculumTrackIds: ['fpga-vivado', 'high-speed-pcb', 'power-electronics'],
    careerTrackIds: ['track-fpga-engineer', 'track-automotive-semi'],
    jobSpecificRoles: [
      'FPGA Design & Emulation Engineer',
      'High-Speed PCB & Hardware Board Designer',
      'Signal Integrity (SI/PI) Engineer',
      'Automotive Semiconductor / ECU Hardware Engineer',
      'Power Electronics & PMIC Applications Engineer'
    ],
    subParts: [
      'FPGA Architecture (LUTs, BRAM, DSP, Vivado XDC)',
      'High-Speed Multi-Layer PCB Stackup & Controlled Impedance',
      'Signal Integrity (SI/PI) & Eye-Diagram Analysis',
      'Automotive ECU Safety (ISO 26262) & Switched-Mode Power'
    ]
  },
  {
    id: 'embedded-firmware',
    superDomainId: 'embedded',
    name: 'Embedded Systems, Firmware & Linux',
    shortName: 'Embedded & RTOS',
    tagline: 'Bare-Metal C, FreeRTOS Concurrency, Linux Kernel Drivers & Edge AI TinyML',
    description: 'Bridge software with silicon hardware through bare-metal register drivers, RTOS task concurrency, Linux Board Support Packages (BSP), and on-device machine learning inference.',
    iconName: 'Terminal',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    borderColor: 'border-cyan-500',
    bgLightColor: 'bg-cyan-50/50',
    curriculumTrackIds: ['embedded-firmware', 'embedded-linux', 'edge-ai', 'iot-systems'],
    careerTrackIds: ['track-embedded-systems'],
    jobSpecificRoles: [
      'Embedded Firmware Engineer',
      'Embedded Linux Kernel & BSP Engineer',
      'Edge AI & TinyML Silicon Systems Developer',
      'Embedded RTOS & Concurrency Architect',
      'IoT Systems & Wireless Hardware Engineer'
    ],
    subParts: [
      'Bare-Metal C Architecture, Memory Maps & DMA',
      'RTOS Concurrency, Queues & ISR Synchronization',
      'Embedded Linux U-Boot, Device Trees & Kernel Drivers',
      'Edge-AI Quantization, TinyML & Production Telemetry'
    ]
  },
  {
    id: 'career-interview',
    superDomainId: 'career-strategy',
    name: 'Professional Engineering & Interview Defense',
    shortName: 'Interview & Defense',
    tagline: 'Engineering Hygiene, Git/CI-CD Workflows, STA Defense & Technical Drills',
    description: 'Hone professional engineering discipline with reproducible Git workflows, hardware documentation, whiteboard timing defense, and semiconductor technical problem solving.',
    iconName: 'Briefcase',
    badgeColor: 'bg-slate-50 text-slate-700 border-slate-200',
    borderColor: 'border-slate-500',
    bgLightColor: 'bg-slate-50/50',
    curriculumTrackIds: ['engineering-hygiene', 'interview-prep'],
    careerTrackIds: [],
    jobSpecificRoles: [
      'Technical Whiteboard Candidate',
      'Systems Engineering Project Lead',
      'Hardware Quality Assurance & Silicon CI/CD Specialist'
    ],
    subParts: [
      'Git Version Control & Hardware CI/CD Linting',
      'STA Whiteboard Setup & Hold Slack Equations',
      'CDC Clock Domain Crossing Synchronizer Drills',
      'Technical Architecture Defense & Case Studies'
    ]
  }
];

export function getSuperDomainById(id: SuperDomainId): SuperDomain | undefined {
  if (id === 'all') return undefined;
  return SUPER_DOMAINS.find(sd => sd.id === id);
}

export function getSuperDomainForDomain(domainId: EngineeringDomainId): SuperDomain {
  const domain = getDomainById(domainId);
  if (domain) {
    const found = SUPER_DOMAINS.find(sd => sd.id === domain.superDomainId);
    if (found) return found;
  }
  return SUPER_DOMAINS[0];
}

export function getDomainById(id: EngineeringDomainId): EngineeringDomain | undefined {
  return MASTER_ENGINEERING_DOMAINS.find(d => d.id === id);
}

export const CURRICULUM_TRACK_METADATA: Record<string, {
  domainId: EngineeringDomainId;
  subParts: string[];
  jobSpecificRoles: string[];
}> = {
  'embedded-firmware': {
    domainId: 'embedded-firmware',
    subParts: ['Bare-Metal Architecture & Pointers', 'RTOS Concurrency & Queues', 'Peripheral Bus Drivers (I2C/SPI)', 'Power Management & Low-Power States'],
    jobSpecificRoles: ['Embedded Firmware Engineer', 'Microcontroller Software Engineer', 'Bare-Metal Systems Developer']
  },
  'digital-electronics': {
    domainId: 'digital-vlsi',
    subParts: ['Boolean Algebra & Minimization', 'Combinational Logic & Adders/ALUs', 'Sequential Logic & Flip-Flops', 'FSM Architectures & Synthesizable RTL'],
    jobSpecificRoles: ['RTL Design Engineer', 'ASIC Frontend Designer', 'Digital Logic Engineer']
  },
  'fpga-vivado': {
    domainId: 'fpga-hardware',
    subParts: ['FPGA Fabric (LUT, BRAM, DSP)', 'Vivado Synthesis & Implementation Flow', 'XDC Timing Constraints & Clocking', 'Hardware In-System Debugging with ILA'],
    jobSpecificRoles: ['FPGA Design Engineer', 'Emulation Hardware Engineer', 'Board Bring-Up Specialist']
  },
  'computer-arch': {
    domainId: 'digital-vlsi',
    subParts: ['5-Stage Pipeline Architecture (IF/ID/EX/MEM/WB)', 'Hazard Detection & Data Forwarding', 'Branch Prediction & Control Hazards', 'Cache Hierarchy & Memory Bus (AXI/AHB)'],
    jobSpecificRoles: ['CPU Architect', 'RISC-V Core Designer', 'Processor Microarchitecture Engineer']
  },
  'verification-uvm': {
    domainId: 'verification-dft',
    subParts: ['SystemVerilog OOP & Randomization', 'SystemVerilog Assertions (SVA)', 'UVM Components (Driver, Monitor, Scoreboard)', 'Functional Coverage Closure & cocotb'],
    jobSpecificRoles: ['SoC Verification Engineer', 'UVM Testbench Architect', 'Formal & Assertion Verification Engineer']
  },
  'dsp-math': {
    domainId: 'digital-vlsi',
    subParts: ['Fixed-Point Arithmetic (Q-Format)', 'Digital Filter Pipelining (FIR/IIR)', 'Hardware FFT & Cordic Accelerators', 'Matrix Multiply Units (Systolic Arrays)'],
    jobSpecificRoles: ['DSP Hardware Engineer', 'AI Silicon Accelerator Engineer', 'Math Engine RTL Specialist']
  },
  'edge-ai': {
    domainId: 'embedded-firmware',
    subParts: ['Quantization & Pruning (INT8/FP16)', 'TinyML Deployment on Cortex-M & NPU', 'Hardware/Software Co-Design & Memory Offload', 'Model Profiling & Latency Optimization'],
    jobSpecificRoles: ['Edge AI Engineer', 'TinyML Systems Specialist', 'AI Silicon Co-Design Engineer']
  },
  'iot-systems': {
    domainId: 'embedded-firmware',
    subParts: ['Sensor Interfacing & Signal Conditioning', 'Wireless Stacks (BLE, Wi-Fi, LoRa, Zigbee)', 'MQTT/CoAP Telemetry & Security', 'OTA Firmware Updates & Power Profiling'],
    jobSpecificRoles: ['IoT Systems Hardware Engineer', 'Wireless Connectivity Engineer', 'Embedded Telemetry Developer']
  },
  'power-electronics': {
    domainId: 'fpga-hardware',
    subParts: ['Buck, Boost & Switched Converters', 'MOSFET/IGBT Gate Drive Circuits', 'SPICE Loop Stability & Compensation', 'Thermal Management & Magnetics Design'],
    jobSpecificRoles: ['Power Electronics Hardware Engineer', 'PMIC Application Engineer', 'Hardware Power Architect']
  },
  'engineering-hygiene': {
    domainId: 'career-interview',
    subParts: ['Git Version Control & Branching Workflow', 'Hardware Documentation & Block Diagrams', 'Automated RTL Linting & CI/CD Pipelines', 'Reproducible Project Packaging & Makefiles'],
    jobSpecificRoles: ['Systems Engineering Lead', 'Silicon DevOps & CI/CD Contributor', 'Hardware QA Specialist']
  },
  'interview-prep': {
    domainId: 'career-interview',
    subParts: ['STA Whiteboard Setup & Hold Equations', 'Clock Domain Crossing (CDC) Synchronizers', 'SystemVerilog/C Coding Puzzles & Bitwise Math', 'System Architecture & Tradeoff Defense'],
    jobSpecificRoles: ['Silicon Interview Candidate', 'Staff Hardware Engineer', 'Technical Interview Whiteboard Specialist']
  },
  'embedded-linux': {
    domainId: 'embedded-firmware',
    subParts: ['U-Boot Bootloader & Device Tree (DTS/DTSI)', 'Linux Kernel Character Drivers & Subsystems', 'Yocto Project & Buildroot Rootfs', 'Kernel Space Memory Management & DMA'],
    jobSpecificRoles: ['Embedded Linux Kernel Engineer', 'Board Support Package (BSP) Engineer', 'Linux Device Driver Developer']
  },
  'physical-design': {
    domainId: 'physical-design',
    subParts: ['RTL-to-GDSII OpenLane Flow', 'Floorplanning, Power Grid Design & Placement', 'Clock Tree Synthesis (CTS) & Routing', 'Static Timing Analysis (STA), DRC/LVS & Tapeout Signoff'],
    jobSpecificRoles: ['Physical Design (PD) Engineer', 'STA Signoff Engineer', 'ASIC Backend Layout Specialist']
  },
  'high-speed-pcb': {
    domainId: 'fpga-hardware',
    subParts: ['Multi-Layer Stackup & Controlled Impedance', 'Differential Pairs, Length Matching & Skew', 'Signal Integrity (SI) & Power Integrity (PI)', 'EMC/EMI Shielding & High-Speed Routing'],
    jobSpecificRoles: ['High-Speed PCB Design Engineer', 'Signal Integrity (SI/PI) Engineer', 'Hardware Board Architect']
  },
  'dft-low-power': {
    domainId: 'verification-dft',
    subParts: ['Scan Insertion & ATPG Patterns', 'BIST (Built-In Self-Test) for Memory & Logic', 'Power Intent Specification (UPF / IEEE 1801)', 'Power Gating, Clock Gating & Multi-Voltage Domains'],
    jobSpecificRoles: ['Design for Test (DFT) Engineer', 'Low-Power VLSI Architect', 'ATPG & Testability Specialist']
  }
};

export const CAREER_TRACK_METADATA: Record<string, {
  domainId: EngineeringDomainId;
  subParts: string[];
  jobSpecificRoles: string[];
}> = {
  'track-digital-design': {
    domainId: 'digital-vlsi',
    subParts: ['Number Systems & Boolean Algebra', 'Logic Gates & K-Maps', 'Combinational & Sequential Circuits', 'Flip-Flops, Counters & FSM'],
    jobSpecificRoles: ['Digital Design Engineer', 'RTL Trainee Engineer', 'Silicon Associate']
  },
  'track-rtl-design': {
    domainId: 'digital-vlsi',
    subParts: ['Synthesizable Verilog & SystemVerilog RTL', 'Clock & Reset Architecture', 'Clock Domain Crossing (CDC) & FIFOs', 'AXI/APB Bus Protocols & Synthesis'],
    jobSpecificRoles: ['RTL Design Engineer', 'ASIC Frontend Designer', 'IP Core Developer']
  },
  'track-soc-verification': {
    domainId: 'verification-dft',
    subParts: ['Verification Planning & Testbench Architecture', 'Driver, Monitor & Scoreboard OOP Models', 'SystemVerilog Assertions (SVA) & Functional Coverage', 'UVM Methodology & Regression Closure'],
    jobSpecificRoles: ['Design Verification Engineer', 'SoC Verification Engineer', 'UVM Testbench Specialist']
  },
  'track-fpga-engineer': {
    domainId: 'fpga-hardware',
    subParts: ['FPGA Architecture & Slices', 'Vivado Implementation & XDC Timing', 'High-Speed Memory & SerDes Interfaces', 'Hardware Lab Debugging & Emulation'],
    jobSpecificRoles: ['FPGA Engineer', 'Emulation Hardware Engineer', 'Prototyping Specialist']
  },
  'track-embedded-systems': {
    domainId: 'embedded-firmware',
    subParts: ['ARM Cortex-M Architecture & Memory Maps', 'Interrupt Handlers & Peripheral Drivers', 'Bare-Metal Register Programming', 'RTOS Task Scheduling & Concurrency'],
    jobSpecificRoles: ['Embedded Firmware Engineer', 'BSP Engineer', 'RTOS Engineer']
  },
  'track-processor-arch': {
    domainId: 'digital-vlsi',
    subParts: ['RISC-V ISA (RV32I/RV64I) Execution', '5-Stage Pipelined Datapath & Control', 'Hazard Detection, Forwarding & Branch Prediction', 'Cache Hierarchies & Memory Management'],
    jobSpecificRoles: ['CPU Design Engineer', 'Processor Verification Engineer', 'Microarchitect']
  },
  'track-networking-asic': {
    domainId: 'digital-vlsi',
    subParts: ['Ethernet MAC/PHY Protocols', 'PCIe Protocol Architecture', 'High-Speed Interconnects (AXI/AHB)', 'Packet Parsing & Traffic Management'],
    jobSpecificRoles: ['Network ASIC Engineer', 'Protocol Verification Engineer', 'Interconnect Architect']
  },
  'track-automotive-semi': {
    domainId: 'fpga-hardware',
    subParts: ['CAN & CAN FD Vehicle Networks', 'LIN & Automotive Ethernet', 'AUTOSAR Architecture Basics', 'ISO 26262 Functional Safety & Diagnostics'],
    jobSpecificRoles: ['Automotive Embedded Engineer', 'Functional Safety Engineer', 'ECU Hardware Specialist']
  },
  'track-analog-mixed-signal': {
    domainId: 'physical-design',
    subParts: ['CMOS Basics & Small-Signal Models', 'Operational Amplifiers (Op-Amps) & Bandgaps', 'Data Converters (ADC/DAC Architectures)', 'PLLs, Low-Noise Amplifiers & Physical Layout'],
    jobSpecificRoles: ['Analog IC Designer', 'RF IC Engineer', 'Mixed-Signal Layout Specialist']
  },
  'track-eda-workflow': {
    domainId: 'physical-design',
    subParts: ['ModelSim & QuestaSim Verification Flow', 'Vivado & Quartus Synthesis Flows', 'VCS / Xcelium Industrial Simulators', 'Python, TCL & Bash Semiconductor Automation'],
    jobSpecificRoles: ['EDA Flow Engineer', 'CAD Methodology Engineer', 'Silicon Automation Developer']
  }
};

export function getDomainForCurriculumTrack(trackId: string): EngineeringDomain {
  const meta = CURRICULUM_TRACK_METADATA[trackId];
  if (meta) {
    const d = getDomainById(meta.domainId);
    if (d) return d;
  }
  const found = MASTER_ENGINEERING_DOMAINS.find(d => d.curriculumTrackIds.includes(trackId));
  return found || MASTER_ENGINEERING_DOMAINS[0];
}

export function getDomainForCareerTrack(trackId: string): EngineeringDomain {
  const meta = CAREER_TRACK_METADATA[trackId];
  if (meta) {
    const d = getDomainById(meta.domainId);
    if (d) return d;
  }
  const found = MASTER_ENGINEERING_DOMAINS.find(d => d.careerTrackIds.includes(trackId));
  return found || MASTER_ENGINEERING_DOMAINS[0];
}

export const getDomainForCareerPrepTrack = getDomainForCareerTrack;

import type { CurriculumTrack } from '../types';
import type { CareerPrepTrack } from './careerPrepData';

export function enrichCurriculumTrack(track: CurriculumTrack): CurriculumTrack {
  const meta = CURRICULUM_TRACK_METADATA[track.id];
  const domain = getDomainForCurriculumTrack(track.id);

  const subParts = track.subParts && track.subParts.length > 0 
    ? track.subParts 
    : (meta?.subParts || domain.subParts);

  const jobSpecificRoles = track.jobSpecificRoles && track.jobSpecificRoles.length > 0
    ? track.jobSpecificRoles
    : (meta?.jobSpecificRoles || domain.jobSpecificRoles);

  return {
    ...track,
    domainId: track.domainId || (meta?.domainId || domain.id),
    domainName: track.domainName || domain.name,
    subParts,
    jobSpecificRoles,
    topics: track.topics.map((tp, idx) => ({
      ...tp,
      subPart: tp.subPart || subParts[idx % subParts.length] || `Part ${idx + 1}`,
      jobRole: tp.jobRole || jobSpecificRoles[idx % jobSpecificRoles.length] || jobSpecificRoles[0]
    }))
  };
}

export function enrichCareerPrepTrack(track: CareerPrepTrack): CareerPrepTrack {
  const meta = CAREER_TRACK_METADATA[track.id];
  const domain = getDomainForCareerTrack(track.id);

  const subParts = track.subParts && track.subParts.length > 0 
    ? track.subParts 
    : (meta?.subParts || domain.subParts);

  const jobSpecificRoles = track.jobSpecificRoles && track.jobSpecificRoles.length > 0
    ? track.jobSpecificRoles
    : (meta?.jobSpecificRoles || domain.jobSpecificRoles);

  return {
    ...track,
    domainId: track.domainId || (meta?.domainId || domain.id),
    domainName: track.domainName || domain.name,
    subParts,
    jobSpecificRoles,
    tasks: track.tasks.map((task, idx) => ({
      ...task,
      subPart: task.subPart || subParts[idx % subParts.length] || `Sub-Part ${Math.floor(idx / 3) + 1}`,
      jobRole: task.jobRole || jobSpecificRoles[idx % jobSpecificRoles.length] || jobSpecificRoles[0]
    }))
  };
}
