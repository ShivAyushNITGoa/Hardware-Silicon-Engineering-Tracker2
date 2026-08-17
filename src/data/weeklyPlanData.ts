import { WeeklyMilestoneItem } from '../types';

export const weeklyMilestones: WeeklyMilestoneItem[] = [
  // Month 1: Hardware & Embedded Firmware Mastery (Weeks 1-4)
  {
    week: 1,
    month: 1,
    title: 'C Pointers, Memory Mapping, and FreeRTOS Task Scheduling',
    phase: 'Phase 1: Embedded & Hardware Core',
    targetHours: 18,
    coreGoals: [
      'Master pointer arithmetic, function pointers, and volatile hardware register bit-masks.',
      'Configure FreeRTOS preemptive scheduler, tasks, queues, and binary semaphores.',
      'Implement Hardware Abstraction Layer (HAL) for GPIO, Timers, and I2C sensors.'
    ],
    deliverable: 'FreeRTOS multi-task skeleton on ESP32/ARM with isolated sensor acquisition queue.',
    exitGate: 'Zero memory leaks, deterministic task switching verified on logic analyzer / terminal.'
  },
  {
    week: 2,
    month: 1,
    title: 'DMA, Interrupt Service Routines (ISRs), and Mutex Concurrency',
    phase: 'Phase 1: Embedded & Hardware Core',
    targetHours: 20,
    coreGoals: [
      'Implement deferred interrupt handling with FreeRTOS FromISR APIs.',
      'Enforce Mutex Priority Inheritance to eliminate priority inversion risks.',
      'Build circular ring buffer with atomic head/tail pointers for flash storage.'
    ],
    deliverable: 'Flash spooling ring buffer driver with automated power-loss recovery tests.',
    exitGate: 'Passes 10,000 continuous simulated packet write/read test with 0 corruptions.'
  },
  {
    week: 3,
    month: 1,
    title: 'FireGuard v2 Architecture Refactor & Low-Power Profiling',
    phase: 'Phase 1: Embedded & Hardware Core',
    targetHours: 22,
    coreGoals: [
      'Refactor monolithic firmware into HAL, Driver, Service, and App layers.',
      'Configure ULP coprocessor and Light/Deep Sleep modes on ESP32-S3.',
      'Integrate TLS/MQTT client with automated network disconnect recovery.'
    ],
    deliverable: 'FireGuard v2 firmware running 3 concurrent FreeRTOS tasks with power profiling.',
    exitGate: 'Sleep current measured <45uA; WiFi reconnect recovery <3.0 seconds.'
  },
  {
    week: 4,
    month: 1,
    title: '48-Hour Continuous Stress Test & GitHub Documentation Polish',
    phase: 'Phase 1: Embedded & Hardware Core',
    targetHours: 18,
    coreGoals: [
      'Run 48-hour continuous stress test on physical hardware bench with 0 packet drops.',
      'Generate Doxygen API documentation and clean architectural block diagrams.',
      'Record 3-minute physical bench demo video showing fault recovery.'
    ],
    deliverable: 'Public GitHub repo github.com/ayush/fireguard-v2-firmware with demo GIF and test logs.',
    exitGate: 'Sunday Gate: Flagship #1 officially SHIPPED and locked.'
  },

  // Month 2: Synthesizable SystemVerilog & RTL IP Library (Weeks 5-8)
  {
    week: 5,
    month: 2,
    title: 'SystemVerilog Synthesizable RTL, FSMs, and SDC Constraints',
    phase: 'Phase 2: RTL & IP Design',
    targetHours: 20,
    coreGoals: [
      'Master always_ff, always_comb, non-blocking assignments, and latch avoidance.',
      'Design Moore and Mealy State Machines with one-hot and binary encodings.',
      'Write parameterized UART Transmitter and Receiver with parity and 16x oversampling.'
    ],
    deliverable: 'Parameterized UART SystemVerilog IP core with self-checking testbench in Verilator.',
    exitGate: '100% clean Verilator lint with 0 inferred latches.'
  },
  {
    week: 6,
    month: 2,
    title: 'SPI Master Controller & Synchronous FIFO with Watermarks',
    phase: 'Phase 2: RTL & IP Design',
    targetHours: 22,
    coreGoals: [
      'Design configurable SPI Master controller supporting all 4 modes (CPOL/CPHA 0-3).',
      'Implement Synchronous FIFO with programmable almost_full and almost_empty flags.',
      'Set up cocotb Python verification environment with randomized stimulus.'
    ],
    deliverable: 'cocotb test suite streaming 50,000 transactions to SPI & Sync FIFO.',
    exitGate: '100% assertion pass in cocotb with GTKWave trace verification.'
  },
  {
    week: 7,
    month: 2,
    title: 'Clock Domain Crossing (CDC) & Asynchronous Dual-Clock FIFO',
    phase: 'Phase 2: RTL & IP Design',
    targetHours: 24,
    coreGoals: [
      'Master metastability, MTBF calculations, and multi-flop synchronizers.',
      'Design Dual-Clock Async FIFO with Gray code pointer conversion and CDC safety.',
      'Synthesize design in Xilinx Vivado and analyze Static Timing Analysis (STA) reports.'
    ],
    deliverable: 'Complete synthesizable Async FIFO meeting timing closure at 150MHz on Artix-7.',
    exitGate: 'Zero CDC violations and positive Worst Negative Slack (WNS > 0.5ns).'
  },
  {
    week: 8,
    month: 2,
    title: 'RTL IP Library Suite Polish, SVA Assertions & Regression Script',
    phase: 'Phase 2: RTL & IP Design',
    targetHours: 20,
    coreGoals: [
      'Add concurrent SystemVerilog Assertions (SVA) for all interface handshakes.',
      'Write Makefile for single-command regression test across all IPs.',
      'Publish github.com/ayush/systemverilog-rtl-ip-library with timing and utilization tables.'
    ],
    deliverable: 'Automated 1-command cocotb regression running 100,000 transactions.',
    exitGate: 'Sunday Gate: Flagship #2 officially SHIPPED and locked.'
  },

  // Month 3: 5-Stage Pipelined RV32I Processor SoC (Weeks 9-13)
  {
    week: 9,
    month: 3,
    title: 'RISC-V RV32I Base ISA Decoder & Single-Cycle Datapath',
    phase: 'Phase 3: Silicon & Processor Architecture',
    targetHours: 22,
    coreGoals: [
      'Decode all 37 RV32I base instructions (R, I, S, B, U, J format).',
      'Implement 32-bit ALU supporting ADD, SUB, SLT, AND, OR, XOR, SLL, SRL, SRA.',
      'Build single-cycle datapath and register file with 32 registers (x0 hardwired to 0).'
    ],
    deliverable: 'Single-cycle RV32I core running basic assembly test programs in simulation.',
    exitGate: 'Executes ADD, LUI, BEQ, JAL assembly tests accurately.'
  },
  {
    week: 10,
    month: 3,
    title: '5-Stage Pipeline Registers (IF, ID, EX, MEM, WB)',
    phase: 'Phase 3: Silicon & Processor Architecture',
    targetHours: 24,
    coreGoals: [
      'Split datapath into 5 distinct pipeline stages with clocked pipeline registers.',
      'Propagate control signals, PC, instruction metadata, and destination registers.',
      'Analyze cycle-by-cycle instruction flow and pipeline latency.'
    ],
    deliverable: '5-stage pipelined RV32I core executing NOP-padded assembly instructions.',
    exitGate: 'Simulates without register uninitialized X-propagation.'
  },
  {
    week: 11,
    month: 3,
    title: 'Hazard Detection, Forwarding Bypass Network & Branch Flushing',
    phase: 'Phase 3: Silicon & Processor Architecture',
    targetHours: 26,
    coreGoals: [
      'Implement ALU-to-ALU forwarding multiplexers for EX-hazard and MEM-hazard.',
      'Build Hazard Detection Unit to stall 1 cycle for Load-Use dependencies.',
      'Implement branch resolution and 1-cycle pipeline flush on branch taken.'
    ],
    deliverable: 'Fully bypassed RV32I core running real unpadded C programs with zero hazards.',
    exitGate: 'Passes 100% official RISC-V architectural compliance test suite (riscv-tests).'
  },
  {
    week: 12,
    month: 3,
    title: 'Memory-Mapped I/O (MMIO) Subsystem, UART & Timer Peripherals',
    phase: 'Phase 3: Silicon & Processor Architecture',
    targetHours: 24,
    coreGoals: [
      'Design bus address decoder mapping SRAM (0x0000_0000) and MMIO (0x1000_0000).',
      'Integrate custom UART Transmitter/Receiver and 64-bit Hardware Timer.',
      'Write bare-metal C linker script and crt0 bootloader assembly.'
    ],
    deliverable: 'Complete SoC executing C Fibonacci and Hello World printing over UART.',
    exitGate: 'Bare-metal C code compiled with riscv32-unknown-elf-gcc executes successfully on SoC.'
  },
  {
    week: 13,
    month: 3,
    title: 'FPGA Bitstream Synthesis, Timing Closure & Benchmark Video',
    phase: 'Phase 3: Silicon & Processor Architecture',
    targetHours: 20,
    coreGoals: [
      'Synthesize RV32I SoC on Xilinx Artix-7 / Basys 3 FPGA fabric.',
      'Close static timing at 100MHz operating frequency.',
      'Record hardware demo video showing terminal output over USB-UART.'
    ],
    deliverable: 'Published github.com/ayush/rv32i-pipelined-soc with architectural block diagram.',
    exitGate: 'Sunday Gate: Flagship #3 officially SHIPPED and locked.'
  },

  // Month 4: Edge-AI Fixed-Point Hardware Accelerator on FPGA (Weeks 14-17)
  {
    week: 14,
    month: 4,
    title: 'Q-Format Fixed-Point Math & Model Quantization in PyTorch',
    phase: 'Phase 4: Silicon Acceleration & AI',
    targetHours: 20,
    coreGoals: [
      'Master Q4.12 and INT8 fixed-point arithmetic, overflow saturation, and truncation.',
      'Train time-series sensor anomaly classifier in PyTorch and export quantized weights.',
      'Write bit-exact Python golden reference model to verify hardware outputs.'
    ],
    deliverable: 'Quantized INT8 model retaining >98% accuracy vs FP32 baseline.',
    exitGate: 'Python fixed-point model matches theoretical mathematical limits.'
  },
  {
    week: 15,
    month: 4,
    title: 'Systolic Pipelined MAC Array & Xilinx DSP48 Primitives',
    phase: 'Phase 4: Silicon Acceleration & AI',
    targetHours: 24,
    coreGoals: [
      'Design pipelined Multiply-Accumulate (MAC) engine in SystemVerilog.',
      'Map arithmetic directly to FPGA DSP48E2 slices for high Fmax.',
      'Build LUT-interpolated nonlinear activation function accelerator (GELU/Sigmoid).'
    ],
    deliverable: 'Synthesizable MAC array accelerator tested with 50,000 test vectors.',
    exitGate: '100% bit-exact match against Python fixed-point model.'
  },
  {
    week: 16,
    month: 4,
    title: 'AXI4-Lite Control Interface & DMA Stream Streaming Subsystem',
    phase: 'Phase 4: Silicon Acceleration & AI',
    targetHours: 24,
    coreGoals: [
      'Wrap MAC datapath in AXI4-Lite slave register interface for CPU control.',
      'Implement AXI4-Stream slave/master interface for high-throughput batch inference.',
      'Measure inference latency (<18us) and compare against ARM Cortex-M4 CPU.'
    ],
    deliverable: 'Complete AXI-connected Edge-AI accelerator IP core.',
    exitGate: 'Measured 8.4x hardware speedup over CPU software execution.'
  },
  {
    week: 17,
    month: 4,
    title: 'Hardware Accelerator Signoff, Benchmark Docs & Repo Polish',
    phase: 'Phase 4: Silicon Acceleration & AI',
    targetHours: 20,
    coreGoals: [
      'Synthesize complete FPGA design and close timing at 125MHz.',
      'Record side-by-side oscilloscope comparison video showing latency speedup.',
      'Publish github.com/ayush/fpga-edge-ai-accelerator with benchmark plots.'
    ],
    deliverable: 'Public GitHub repo with latency, area, and power benchmark sheets.',
    exitGate: 'Sunday Gate: Flagship #4 officially SHIPPED and locked.'
  },

  // Month 5: Internship Applications, Outreach & Technical Mock Drills (Weeks 18-20)
  {
    week: 18,
    month: 5,
    title: 'ATS Resume Synchronization & Indian DLI Startup Cold Outreach',
    phase: 'Phase 5: Applications & Offer Conversion',
    targetHours: 20,
    coreGoals: [
      'Sync all 4 flagship project bullets and measured metrics onto 1-page ATS resume.',
      'Send personalized cold emails to Founders and Engineering Leads at Mindgrove, InCore, Netrasemi, Morphing Machines.',
      'Submit applications to Qualcomm, TI, NVIDIA, and Intel internship portals.'
    ],
    deliverable: '30+ targeted outreach emails/applications sent with GitHub portfolio links.',
    exitGate: 'All 4 GitHub repos verified with live README demo GIFs and clean build scripts.'
  },
  {
    week: 19,
    month: 5,
    title: 'Technical Interview Drills (STA, SVA, SystemVerilog, FreeRTOS)',
    phase: 'Phase 5: Applications & Offer Conversion',
    targetHours: 22,
    coreGoals: [
      'Solve 30+ whiteboard STA setup/hold, Gray counter, and FIFO interview problems.',
      'Conduct timed FreeRTOS and Embedded C pointer whiteboard coding drills.',
      'Practice deep architectural walkthroughs of RV32I hazard forwarding and Edge-AI MAC array.'
    ],
    deliverable: 'Flawless 10-minute technical pitch and whiteboard explanation of all 4 projects.',
    exitGate: 'Score 100% on core technical interview bank.'
  },
  {
    week: 20,
    month: 5,
    title: 'Final Gate: Technical Interviews, On-site Rounds & Offer Signoff',
    phase: 'Phase 5: Applications & Offer Conversion',
    targetHours: 20,
    coreGoals: [
      'Complete Online Assessments (OA) and technical interview rounds.',
      'Present live hardware demos and simulation waveforms to hiring managers.',
      'Secure Tier-1 Semiconductor MNC or Indian Fabless Silicon Engineering Internship Offer.'
    ],
    deliverable: 'Signed Semiconductor / Embedded Engineering Internship Offer.',
    exitGate: 'Final Goal Achieved: Undeniable Silicon Engineering Career Launch.'
  }
];
