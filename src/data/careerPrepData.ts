export interface CareerPrepTask {
  id: string;
  name: string;
  subPart?: string;
  jobRole?: string;
}

export interface StudyPlatform {
  name: string;
  url?: string;
  description?: string;
}

export interface CareerPrepTrack {
  id: string;
  number: number;
  title: string;
  tagline: string;
  whyLearn: string;
  companies: string[];
  roles: string[];
  tasks: CareerPrepTask[];
  studyPlatforms: StudyPlatform[];
  projects?: string[];
  domainId?: string;
  domainName?: string;
  jobSpecificRoles?: string[];
  subParts?: string[];
}

export interface LearningDirectoryCategory {
  category: string;
  items: Array<{
    name: string;
    description: string;
    url: string;
  }>;
}

export const initialCareerPrepTracks: CareerPrepTrack[] = [
  {
    id: 'track-digital-design',
    number: 1,
    title: 'Digital Design Foundation',
    tagline: 'Fundamental boolean logic, combinational & sequential circuitry, FSM architectures',
    whyLearn: 'Digital design is the foundation of all semiconductor hardware. Every ASIC, FPGA and processor is built using digital logic concepts.',
    companies: ['Qualcomm', 'NVIDIA', 'AMD', 'Intel', 'Broadcom', 'MediaTek'],
    roles: ['Digital Design Engineer', 'RTL Engineer', 'ASIC Engineer'],
    tasks: [
      { id: 'dd-task-1', name: 'Number Systems' },
      { id: 'dd-task-2', name: 'Boolean Algebra' },
      { id: 'dd-task-3', name: 'Logic Gates' },
      { id: 'dd-task-4', name: 'K-Maps' },
      { id: 'dd-task-5', name: 'Combinational Circuits' },
      { id: 'dd-task-6', name: 'Sequential Circuits' },
      { id: 'dd-task-7', name: 'Flip-Flops' },
      { id: 'dd-task-8', name: 'Registers and Counters' },
      { id: 'dd-task-9', name: 'FSM Design (Moore/Mealy)' }
    ],
    studyPlatforms: [
      { name: 'NPTEL Digital Circuits', url: 'https://nptel.ac.in/courses', description: 'Comprehensive university lectures on digital logic' },
      { name: 'Neso Academy Digital Electronics', url: 'https://www.youtube.com/@nesoacademy', description: 'Step-by-step digital electronic design fundamentals' },
      { name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu', description: 'Computation structures & circuit design' }
    ]
  },
  {
    id: 'track-rtl-design',
    number: 2,
    title: 'RTL Design Engineer Track',
    tagline: 'Synthesizable Verilog/SystemVerilog, clock/reset architectures, CDC & bus protocols',
    whyLearn: 'RTL engineers convert hardware architecture into synthesizable designs used inside processors, GPUs, DSPs and SoCs.',
    companies: ['Qualcomm', 'NVIDIA', 'AMD', 'Intel', 'Broadcom'],
    roles: ['RTL Design Engineer', 'ASIC Design Engineer', 'IP Design Engineer'],
    tasks: [
      { id: 'rtl-task-1', name: 'Verilog HDL' },
      { id: 'rtl-task-2', name: 'SystemVerilog RTL' },
      { id: 'rtl-task-3', name: 'Combinational RTL' },
      { id: 'rtl-task-4', name: 'Sequential RTL' },
      { id: 'rtl-task-5', name: 'FSM Coding' },
      { id: 'rtl-task-6', name: 'Clock and Reset Design' },
      { id: 'rtl-task-7', name: 'CDC Basics' },
      { id: 'rtl-task-8', name: 'DFT Basics' },
      { id: 'rtl-task-9', name: 'AXI/APB Interfaces' }
    ],
    studyPlatforms: [
      { name: 'HDLBits - Verilog Practice', url: 'https://hdlbits.01.org', description: 'Interactive browser-based Verilog coding problems' },
      { name: 'EDA Playground - HDL Simulation', url: 'https://www.edaplayground.com', description: 'Free web-based synthesis & simulation environment' },
      { name: 'ChipVerify - RTL Tutorials', url: 'https://www.chipverify.com', description: 'In-depth Verilog and SystemVerilog guides' },
      { name: 'NPTEL VLSI Courses', url: 'https://nptel.ac.in/courses', description: 'VLSI design flow & synthesis principles' }
    ],
    projects: [
      'UART RTL Design',
      'FIFO Design',
      'ALU Design',
      'FSM Controller'
    ]
  },
  {
    id: 'track-soc-verification',
    number: 3,
    title: 'SoC Verification Engineer Track',
    tagline: 'UVM testbench architecture, SystemVerilog assertions, coverage & signoff regressions',
    whyLearn: 'Modern chips contain billions of transistors. Verification ensures hardware works correctly before fabrication.',
    companies: ['Qualcomm', 'NVIDIA', 'AMD', 'Intel', 'Apple', 'Synopsys', 'Cadence'],
    roles: ['Design Verification Engineer', 'SoC Verification Engineer'],
    tasks: [
      { id: 'verif-task-1', name: 'Verification Methodology' },
      { id: 'verif-task-2', name: 'DUT and Testbench Architecture' },
      { id: 'verif-task-3', name: 'Driver' },
      { id: 'verif-task-4', name: 'Monitor' },
      { id: 'verif-task-5', name: 'Scoreboard' },
      { id: 'verif-task-6', name: 'Assertions (SVA)' },
      { id: 'verif-task-7', name: 'Functional Coverage' },
      { id: 'verif-task-8', name: 'Code Coverage' },
      { id: 'verif-task-9', name: 'Regression Testing' },
      { id: 'verif-task-10', name: 'UVM Methodology' }
    ],
    studyPlatforms: [
      { name: 'Verification Academy - UVM', url: 'https://verificationacademy.com', description: 'Industry benchmark UVM methodology courses' },
      { name: 'SystemVerilog Academy', url: 'https://www.systemverilogacademy.com', description: 'Assertions, coverage & verification suites' },
      { name: 'Accellera UVM Standard', url: 'https://www.accellera.org', description: 'Official IEEE 1800.2 standard resources' },
      { name: 'EDA Playground UVM Examples', url: 'https://www.edaplayground.com', description: 'Runnable online UVM testbenches' }
    ]
  },
  {
    id: 'track-fpga-engineer',
    number: 4,
    title: 'FPGA Engineer Track',
    tagline: 'FPGA fabric architecture, Vivado toolflow, timing closure, high-speed interfaces',
    whyLearn: 'FPGAs are used for rapid prototyping, acceleration and hardware validation before ASIC production.',
    companies: ['AMD/Xilinx', 'Intel FPGA', 'Lattice', 'Microchip'],
    roles: ['FPGA Engineer', 'FPGA Verification Engineer'],
    tasks: [
      { id: 'fpga-task-1', name: 'FPGA Architecture' },
      { id: 'fpga-task-2', name: 'LUTs' },
      { id: 'fpga-task-3', name: 'BRAM' },
      { id: 'fpga-task-4', name: 'DSP Blocks' },
      { id: 'fpga-task-5', name: 'Timing Constraints' },
      { id: 'fpga-task-6', name: 'FPGA Implementation Flow' }
    ],
    studyPlatforms: [
      { name: 'AMD Vivado Tutorials', url: 'https://www.amd.com/en/developer/resources/vivado.html', description: 'Official AMD Xilinx Vivado synthesis & layout tutorials' },
      { name: 'AMD Documentation', url: 'https://docs.amd.com', description: '7-Series, UltraScale & Versal design user guides' },
      { name: 'Intel FPGA Resources', url: 'https://www.intel.com/content/www/us/en/developer/topic-technology/fpga.html', description: 'Quartus Prime & Intel FPGA University Program' },
      { name: 'FPGA4student', url: 'https://www.fpga4student.com', description: 'Practical FPGA projects, Verilog code & testbenches' }
    ]
  },
  {
    id: 'track-embedded-systems',
    number: 5,
    title: 'Embedded Systems Engineer Track',
    tagline: 'ARM Cortex-M bare-metal, peripheral drivers (UART/SPI/I2C), RTOS multi-threading',
    whyLearn: 'Semiconductor products require firmware to control processors and hardware peripherals.',
    companies: ['Qualcomm', 'TI', 'NXP', 'ST', 'Bosch', 'Infineon'],
    roles: ['Embedded Firmware Engineer', 'BSP Engineer', 'RTOS Engineer'],
    tasks: [
      { id: 'emb-task-1', name: 'ARM Cortex-M Architecture' },
      { id: 'emb-task-2', name: 'Registers and Memory Map' },
      { id: 'emb-task-3', name: 'Interrupts' },
      { id: 'emb-task-4', name: 'GPIO' },
      { id: 'emb-task-5', name: 'Timers' },
      { id: 'emb-task-6', name: 'UART/SPI/I2C Drivers' },
      { id: 'emb-task-7', name: 'Bare-metal Programming' },
      { id: 'emb-task-8', name: 'RTOS' }
    ],
    studyPlatforms: [
      { name: 'ARM Developer Resources', url: 'https://developer.arm.com', description: 'ARM Architecture Reference Manuals & CMSIS drivers' },
      { name: 'STM32 Education', url: 'https://www.st.com/content/st_com/en/support/learning/stm32-education.html', description: 'Official STMicroelectronics tutorials & labs' },
      { name: 'FreeRTOS Official', url: 'https://www.freertos.org', description: 'Kernel architecture, task scheduling & mutex queues' }
    ]
  },
  {
    id: 'track-processor-arch',
    number: 6,
    title: 'Processor Architecture / RISC-V Track',
    tagline: 'RISC-V ISA (RV32I/RV64I), 5-stage pipeline, hazard resolution, caches & MMU',
    whyLearn: 'Processor knowledge is required for CPU, SoC and verification roles.',
    companies: ['Qualcomm', 'NVIDIA', 'AMD', 'Intel', 'ARM'],
    roles: ['CPU Design Engineer', 'Processor Verification Engineer'],
    tasks: [
      { id: 'proc-task-1', name: 'RISC-V ISA' },
      { id: 'proc-task-2', name: 'Datapath' },
      { id: 'proc-task-3', name: 'Control Unit' },
      { id: 'proc-task-4', name: 'Pipeline' },
      { id: 'proc-task-5', name: 'Hazards' },
      { id: 'proc-task-6', name: 'Forwarding' },
      { id: 'proc-task-7', name: 'Cache' },
      { id: 'proc-task-8', name: 'Memory Hierarchy' },
      { id: 'proc-task-9', name: 'Interrupt Handling' }
    ],
    studyPlatforms: [
      { name: 'RISC-V International', url: 'https://riscv.org', description: 'Official ISA specifications, extensions & compliance suites' },
      { name: 'RISC-V GitHub Projects', url: 'https://github.com/riscv', description: 'Open-source RISC-V cores (Ibex, Rocket, SweRV)' },
      { name: 'NPTEL Computer Architecture', url: 'https://nptel.ac.in/courses', description: 'Pipelining, branch prediction & memory hierarchy' }
    ]
  },
  {
    id: 'track-networking-asic',
    number: 7,
    title: 'Networking ASIC Track',
    tagline: 'High-speed serialized protocols, Ethernet MAC/PHY, PCIe, DDR interfaces',
    whyLearn: 'High-speed communication systems require dedicated ASIC hardware.',
    companies: ['Broadcom', 'Cisco', 'NVIDIA Networking', 'Qualcomm'],
    roles: ['Network ASIC Engineer', 'Protocol Verification Engineer'],
    tasks: [
      { id: 'net-task-1', name: 'Ethernet MAC' },
      { id: 'net-task-2', name: 'PCIe' },
      { id: 'net-task-3', name: 'USB' },
      { id: 'net-task-4', name: 'DDR' },
      { id: 'net-task-5', name: 'AXI/AHB/APB' },
      { id: 'net-task-6', name: 'TCP/IP Basics' }
    ],
    studyPlatforms: [
      { name: 'IEEE Resources', url: 'https://www.ieee.org', description: 'IEEE 802.3 Ethernet standards & technical papers' },
      { name: 'Ethernet Alliance', url: 'https://www.ethernetalliance.org', description: 'Ethernet evolution and protocol roadmaps' },
      { name: 'PCI-SIG', url: 'https://pcisig.com', description: 'PCI Express specifications & electrical compliance' }
    ]
  },
  {
    id: 'track-automotive-semi',
    number: 8,
    title: 'Automotive Semiconductor Track',
    tagline: 'CAN, CAN-FD, LIN, Automotive Ethernet & ISO 26262 functional safety controllers',
    whyLearn: 'Modern vehicles depend on semiconductor controllers for EV, ADAS and safety systems.',
    companies: ['NXP', 'Infineon', 'Renesas', 'Bosch', 'ST'],
    roles: ['Automotive Embedded Engineer', 'Safety Engineer'],
    tasks: [
      { id: 'auto-task-1', name: 'CAN' },
      { id: 'auto-task-2', name: 'CAN FD' },
      { id: 'auto-task-3', name: 'LIN' },
      { id: 'auto-task-4', name: 'Automotive Ethernet' },
      { id: 'auto-task-5', name: 'AUTOSAR Basics' }
    ],
    studyPlatforms: [
      { name: 'AUTOSAR Official', url: 'https://www.autosar.org', description: 'Open and standardized automotive software architecture' },
      { name: 'Vector Automotive Resources', url: 'https://www.vector.com', description: 'CANoe, CANalyzer & automotive network diagnostics' }
    ]
  },
  {
    id: 'track-analog-mixed-signal',
    number: 9,
    title: 'Analog / Mixed Signal IC Track',
    tagline: 'CMOS transistors, Op-Amps, ADC/DAC data converters, PLLs & RF front-ends',
    whyLearn: 'Every digital chip requires analog blocks for communication, power and signal conversion.',
    companies: ['Texas Instruments', 'Analog Devices', 'Qualcomm RF', 'Infineon'],
    roles: ['Analog IC Designer', 'RF IC Engineer'],
    tasks: [
      { id: 'analog-task-1', name: 'CMOS Basics' },
      { id: 'analog-task-2', name: 'MOSFET' },
      { id: 'analog-task-3', name: 'Op-Amps' },
      { id: 'analog-task-4', name: 'ADC/DAC' },
      { id: 'analog-task-5', name: 'PLL' },
      { id: 'analog-task-6', name: 'LNA' },
      { id: 'analog-task-7', name: 'Layout Basics' }
    ],
    studyPlatforms: [
      { name: 'Analog Devices Education', url: 'https://www.analog.com/en/education.html', description: 'Analog circuit design fundamentals & interactive labs' },
      { name: 'NPTEL Analog IC Design', url: 'https://nptel.ac.in/courses', description: 'CMOS analog IC design, noise & frequency response' }
    ]
  },
  {
    id: 'track-eda-workflow',
    number: 10,
    title: 'EDA Tools and Semiconductor Workflow',
    tagline: 'ModelSim, Questa, Vivado, Quartus, commercial simulators & scripting automation',
    whyLearn: 'EDA tools are used by semiconductor companies to design, simulate and verify chips.',
    companies: ['Synopsys', 'Cadence', 'Siemens EDA', 'All major chip companies'],
    roles: ['EDA Engineer', 'Design Engineer', 'Verification Engineer'],
    tasks: [
      { id: 'eda-task-1', name: 'ModelSim' },
      { id: 'eda-task-2', name: 'QuestaSim' },
      { id: 'eda-task-3', name: 'Vivado' },
      { id: 'eda-task-4', name: 'Quartus' },
      { id: 'eda-task-5', name: 'VCS/Xcelium Basics' },
      { id: 'eda-task-6', name: 'Python/TCL/Bash' }
    ],
    studyPlatforms: [
      { name: 'Python Official Tutorials', url: 'https://www.python.org/about/gettingstarted/', description: 'Scripting for automated regression parsing & cocotb' },
      { name: 'TCL Official', url: 'https://www.tcl-lang.org', description: 'EDA synthesis & PnR automation scripting' },
      { name: 'Linux Journey', url: 'https://linuxjourney.com', description: 'Linux command line, SSH & build environment workflows' }
    ]
  }
];

export interface ProjectTrackerItem {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const initialProjectTrackerItems: ProjectTrackerItem[] = [
  { id: 'proj-track-1', name: 'UART RTL + Verification', category: 'Digital / RTL', description: 'Configurable baud rate generator, parity checking, and FIFO buffered TX/RX.' },
  { id: 'proj-track-2', name: 'FIFO RTL + Verification', category: 'Digital / RTL', description: 'Synchronous and Asynchronous CDC Dual-Clock FIFO with Gray code pointers.' },
  { id: 'proj-track-3', name: 'RISC-V CPU', category: 'Processor Arch', description: 'Single-cycle or 5-stage pipelined RV32I processor core with hazard detection.' },
  { id: 'proj-track-4', name: 'UVM Environment', category: 'Verification', description: 'Complete UVM testbench with scoreboard, coverage, sequencer, and driver agents.' },
  { id: 'proj-track-5', name: 'ARM Firmware Project', category: 'Embedded Systems', description: 'Bare-metal peripheral driver suite on ARM Cortex-M with DMA and interrupts.' },
  { id: 'proj-track-6', name: 'RTOS Application', category: 'Embedded Systems', description: 'FreeRTOS preemptive multitasking application with mutexes and event groups.' },
  { id: 'proj-track-7', name: 'FPGA Project', category: 'Hardware Implementation', description: 'Hardware acceleration synthesis on Xilinx Vivado / Intel Quartus with timing closure.' }
];

export const completeLearningDirectory: LearningDirectoryCategory[] = [
  {
    category: 'Digital Design / VLSI Fundamentals',
    items: [
      { name: 'NPTEL Digital Circuits', description: 'Digital Circuits, VLSI, Computer Architecture', url: 'https://nptel.ac.in/courses' },
      { name: 'Neso Academy', description: 'Digital Electronics, Verilog basics', url: 'https://www.youtube.com/@nesoacademy' },
      { name: 'MIT OpenCourseWare', description: 'Computer systems and hardware fundamentals', url: 'https://ocw.mit.edu' }
    ]
  },
  {
    category: 'Verilog / RTL Design Practice',
    items: [
      { name: 'HDLBits', description: 'Interactive Verilog coding problems with online waveform feedback', url: 'https://hdlbits.01.org' },
      { name: 'EDA Playground', description: 'Verilog/SystemVerilog simulation & synthesis practice in browser', url: 'https://www.edaplayground.com' },
      { name: 'ChipVerify', description: 'Verilog, SystemVerilog, RTL, UVM tutorials and syntax references', url: 'https://www.chipverify.com' }
    ]
  },
  {
    category: 'SystemVerilog / SoC Verification / UVM',
    items: [
      { name: 'Verification Academy', description: 'Verification methodology and comprehensive UVM courses', url: 'https://verificationacademy.com' },
      { name: 'SystemVerilog Academy', description: 'SystemVerilog, assertions (SVA), functional coverage, UVM', url: 'https://www.systemverilogacademy.com' },
      { name: 'Accellera', description: 'Official UVM standard resources and documentation', url: 'https://www.accellera.org' },
      { name: 'Doulos', description: 'Professional SystemVerilog/UVM learning resources and guides', url: 'https://www.doulos.com' }
    ]
  },
  {
    category: 'Processor Architecture / RISC-V',
    items: [
      { name: 'RISC-V International', description: 'ISA specifications, architectural test suites, ecosystem resources', url: 'https://riscv.org' },
      { name: 'RISC-V GitHub', description: 'Open-source RISC-V hardware repositories and tools', url: 'https://github.com/riscv' },
      { name: 'NPTEL Computer Architecture', description: 'Advanced computer architecture and superscalar concepts', url: 'https://nptel.ac.in/courses' }
    ]
  },
  {
    category: 'ARM / Embedded Systems / RTOS',
    items: [
      { name: 'ARM Developer', description: 'Cortex-M architecture reference manuals and CMSIS standards', url: 'https://developer.arm.com' },
      { name: 'ARM Education', description: 'Embedded systems development kits and courses', url: 'https://www.arm.com/resources/education' },
      { name: 'STM32 Education', description: 'Official STM32 microcontroller firmware tutorials and video labs', url: 'https://www.st.com/content/st_com/en/support/learning/stm32-education.html' },
      { name: 'FreeRTOS Official', description: 'Real-time operating system kernel concepts and documentation', url: 'https://www.freertos.org' }
    ]
  },
  {
    category: 'FPGA / Hardware Implementation',
    items: [
      { name: 'AMD Vivado Resources', description: 'Vivado Design Suite tutorials, user guides and IP catalogs', url: 'https://www.amd.com/en/developer/resources/vivado.html' },
      { name: 'AMD Documentation', description: 'Complete reference manuals for FPGA architectures', url: 'https://docs.amd.com' },
      { name: 'Intel FPGA Resources', description: 'Quartus Prime tutorials & Intel FPGA University Program', url: 'https://www.intel.com/content/www/us/en/developer/topic-technology/fpga.html' },
      { name: 'FPGA4student', description: 'Hands-on FPGA projects, source code and Verilog tutorials', url: 'https://www.fpga4student.com' }
    ]
  },
  {
    category: 'EDA Tools / Semiconductor Industry',
    items: [
      { name: 'Synopsys', description: 'EDA and semiconductor design resources, DesignWare IP', url: 'https://www.synopsys.com' },
      { name: 'Cadence', description: 'IC design, synthesis and digital verification software resources', url: 'https://www.cadence.com' },
      { name: 'Siemens EDA', description: 'Simulation, emulation and hardware verification tools (Questa)', url: 'https://eda.sw.siemens.com' }
    ]
  },
  {
    category: 'Open Source Projects',
    items: [
      { name: 'OpenCores', description: 'Open-source synthesizable digital IP cores and blocks', url: 'https://opencores.org' },
      { name: 'GitHub Semiconductor Repositories', description: 'Community hardware designs: Verilog, SystemVerilog, UVM, RISC-V', url: 'https://github.com' }
    ]
  }
];
