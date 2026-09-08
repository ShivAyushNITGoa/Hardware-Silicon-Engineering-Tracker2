import { JobRole } from '../types';

export const jobRoles: JobRole[] = [
  // ===================== VLSI JOB ROLES =====================
  {
    id: 'rtl-design-engineer',
    discipline: 'vlsi',
    field: 'rtl_design',
    title: 'RTL Design Engineer',
    tagline: 'Crafting synthesis-efficient microarchitectures and digital logic in Verilog/SystemVerilog.',
    salaryRangeIndia: '₹14L – ₹35L (Entry-Mid) | ₹40L – ₹80L+ (Senior/Lead)',
    salaryRangeUS: '$120k – $190k (Entry-Mid) | $210k – $320k+ (Senior/Staff)',
    description: 'Responsible for translating architectural specifications into synthesizable Register-Transfer Level (RTL) code. RTL engineers design pipelines, arithmetic units, bus interfaces (AXI, AHB, APB), and FSMs while optimizing for Performance, Power, and Area (PPA).',
    coreSkills: [
      'Synchronous Digital Logic & FSM Design (Mealy vs. Moore)',
      'Clock Domain Crossing (CDC) & Multi-Clock FIFO Architectures',
      'Low-Power Design Techniques (Clock Gating, Power Gating, UPF)',
      'Bus Protocols (AMBA AXI4, AHB-Lite, APB, TileLink, OCP)',
      'Pipelining, Hazard Detection & Forwarding Units',
      'Microarchitecture specification authoring'
    ],
    languages: ['SystemVerilog', 'Verilog', 'Python (Scripting)', 'TCL'],
    toolsAndEda: ['Synopsys Design Compiler', 'Cadence Genus', 'Siemens QuestaSim', 'Verilator', 'SpyGlass CDC/Lint'],
    keyWhiteboardTopics: [
      'Setup & Hold Slack derivations with clock skew and jitter',
      'Design of an asynchronous FIFO with 2-FF Gray code pointer sync',
      'FSM design avoiding combinational glitches on outputs',
      'Static timing path analysis across multicycle paths'
    ],
    sampleDeliverables: [
      'Synthesizable RV32I 5-stage pipelined processor core',
      'Parameterized 4x4 AXI4 Crossbar Switch with round-robin arbitration',
      'High-throughput AES-256 hardware cryptographic coprocessor'
    ],
    typicalInterviewRounds: [
      'Round 1: Digital Logic & Boolean Algebra fundamentals, K-maps, Setup/Hold math',
      'Round 2: Verilog/SystemVerilog RTL coding (CDC FIFO, Sequence detector, Arbiter)',
      'Round 3: Microarchitecture Deep Dive (Pipeline hazards, Cache design, Memory controllers)',
      'Round 4: Synthesis, Static Timing Analysis & PPA trade-offs'
    ],
    topCompanies: ['NVIDIA', 'Qualcomm', 'Intel', 'AMD', 'Apple Silicon', 'Broadcom', 'MediaTek', 'Texas Instruments'],
    dayInTheLife: 'Writing synthesizable SystemVerilog modules, running SpyGlass lint and CDC checks, collaborating with DV engineers on coverage holes, and debugging timing violations with the physical design team.'
  },
  {
    id: 'design-verification-engineer',
    discipline: 'vlsi',
    field: 'verification',
    title: 'ASIC / SoC Verification Engineer (DV)',
    tagline: 'Constrained-random verification, UVM environments, and functional coverage closure.',
    salaryRangeIndia: '₹12L – ₹32L (Entry-Mid) | ₹38L – ₹75L+ (Senior/Lead)',
    salaryRangeUS: '$115k – $185k (Entry-Mid) | $200k – $300k+ (Senior/Staff)',
    description: 'Ensures silicon works before tapeout. DV engineers write object-oriented testbenches using Universal Verification Methodology (UVM), implement constrained-random stimulus, write SystemVerilog Assertions (SVA), and drive code/functional coverage to 100%.',
    coreSkills: [
      'Universal Verification Methodology (UVM) Architecture',
      'SystemVerilog Object-Oriented Programming (OOP) & Polymorphism',
      'Constrained-Random Stimulus Generation & Distribution Tuning',
      'SystemVerilog Assertions (SVA: Immediate & Concurrent properties)',
      'Functional Coverage (Covergroups, Coverpoints, Cross Coverage)',
      'Virtual Sequences & Scoreboards with TLM 2.0 FIFOs'
    ],
    languages: ['SystemVerilog', 'Python (PyUVM / Cocotb)', 'C/C++ (DPI-C)', 'TCL'],
    toolsAndEda: ['Synopsys VCS', 'Cadence Xcelium', 'Siemens Questa', 'Verdi Debugger', 'Cocotb'],
    keyWhiteboardTopics: [
      'Detailed breakdown of UVM Phases (build, connect, end_of_elaboration, run, extract, check, report)',
      'UVM Factory registration and type/instance override mechanics',
      'Writing SVA concurrent assertion with non-consecutive repetitions and implication operators',
      'DPI-C integration for golden C reference models'
    ],
    sampleDeliverables: [
      'Complete UVM testbench for AXI4-Stream switch with scoreboard & predictor',
      'PyUVM verification environment for dual-clock asynchronous FIFO',
      'Comprehensive functional coverage model achieving 100% cross-coverage'
    ],
    typicalInterviewRounds: [
      'Round 1: SystemVerilog OOP (inheritance, virtual methods, shallow vs deep copy)',
      'Round 2: UVM Architecture (agents, drivers, monitors, scoreboards, TLM ports)',
      'Round 3: Assertions (SVA) and Test Plan creation for a complex IP block',
      'Round 4: Debug scenario (Analyzing waveform dumps, tracing protocol violations in Verdi)'
    ],
    topCompanies: ['Qualcomm', 'NVIDIA', 'Intel', 'Broadcom', 'Marvell', 'Synopsys', 'Cadence', 'Mindgrove Technologies'],
    dayInTheLife: 'Authoring test plans from IP specs, coding UVM sequences and scoreboards, running regression test suites on compute farms, and root-causing RTL corner-case bugs in Verdi waveforms.'
  },
  {
    id: 'physical-design-engineer',
    discipline: 'vlsi',
    field: 'physical_design',
    title: 'Physical Design Engineer (PD)',
    tagline: 'Translating netlists to silicon geometry: Floorplanning, Placement, CTS, Routing & DRC/LVS.',
    salaryRangeIndia: '₹14L – ₹36L (Entry-Mid) | ₹42L – ₹85L+ (Senior/Lead)',
    salaryRangeUS: '$125k – $195k (Entry-Mid) | $215k – $330k+ (Senior/Staff)',
    description: 'Transforms the synthesized gate-level netlist into actual physical layout masks (GDSII/OASIS). Physical Design engineers handle chip floorplanning, power grid design, placement, Clock Tree Synthesis (CTS), global/detail routing, and signoff checks (DRC, LVS, Antenna).',
    coreSkills: [
      'Chip Floorplanning, Macro Placement & Core Utilization',
      'Power Grid Planning (PG mesh, IR drop analysis, EM limits)',
      'Clock Tree Synthesis (CTS: H-tree, mesh, skew vs insertion delay)',
      'Place & Route (P&R) optimization and Congestion resolution',
      'Design Rule Checking (DRC) and Layout Versus Schematic (LVS)',
      'Signal Integrity (Crosstalk noise, delta delay)'
    ],
    languages: ['TCL (Tool Command Language)', 'Perl/Python', 'LEF/DEF formats', 'Liberty (.lib)'],
    toolsAndEda: ['Cadence Innovus', 'Synopsys IC Compiler II (ICC2)', 'Siemens Calibre', 'OpenLane', 'Magic / KLayout'],
    keyWhiteboardTopics: [
      'Calculating clock tree insertion delay and useful skew balancing',
      'Resolving routing congestion hot-spots and pin density violations',
      'Steps to resolve setup vs hold violations during pre-CTS vs post-route',
      'IR drop causes (static vs dynamic) and power mesh strap sizing'
    ],
    sampleDeliverables: [
      'SkyWater 130nm ASIC SoC tapeout flow using OpenLane (GDSII output)',
      'Power Distribution Network (PDN) simulation with static IR drop < 3%',
      'Calibre DRC/LVS clean layout for high-speed arithmetic block'
    ],
    typicalInterviewRounds: [
      'Round 1: CMOS physical layout, latch-up, antenna effect, RC extraction',
      'Round 2: P&R flow steps: Synthesis netlist to GDSII, CTS algorithms',
      'Round 3: Timing closure strategies (fixing hold violations without hurting setup)',
      'Round 4: Physical verification (DRC, LVS, ERC) and foundry PDK interaction'
    ],
    topCompanies: ['NVIDIA', 'Intel', 'TSMC', 'Samsung Foundry', 'Texas Instruments', 'AMD', 'Micron', 'SCL (ISRO)'],
    dayInTheLife: 'Writing TCL scripts for Innovus/ICC2, running macro floorplans, evaluating clock tree quality metrics, fixing timing paths, and reviewing Calibre DRC violation markers.'
  },
  {
    id: 'sta-synthesis-engineer',
    discipline: 'vlsi',
    field: 'sta_synthesis',
    title: 'Static Timing Analysis & Synthesis Engineer',
    tagline: 'SDC constraint generation, multi-corner multi-mode (MCMM) timing closure.',
    salaryRangeIndia: '₹14L – ₹34L (Entry-Mid) | ₹40L – ₹80L+ (Senior/Lead)',
    salaryRangeUS: '$120k – $190k (Entry-Mid) | $210k – $320k+ (Senior/Staff)',
    description: 'Specializes in logical synthesis and static timing signoff across all process, voltage, and temperature (PVT) operating corners. Develops complex Synopsys Design Constraints (SDC), false path/multicycle exceptions, and ensures zero timing violations.',
    coreSkills: [
      'Synopsys Design Constraints (SDC) authoring (create_clock, generated_clock)',
      'Multi-Corner Multi-Mode (MCMM) timing signoff',
      'Timing exceptions (set_false_path, set_multicycle_path, set_max_delay)',
      'Logical Synthesis & Optimization (Gate mapping, boundary optimization)',
      'On-Chip Variation (OCV / AOCV / POCV) modeling',
      'Clock jitter, clock latency, and derate factors'
    ],
    languages: ['TCL', 'SDC Syntax', 'Python', 'Perl'],
    toolsAndEda: ['Synopsys PrimeTime', 'Synopsys Design Compiler', 'Cadence Tempus', 'Yosys Open Synthesis'],
    keyWhiteboardTopics: [
      'Writing SDC constraints for source-synchronous DDR interface',
      'Multicycle path setup vs hold relationship calculation',
      'Generated clock division by 2 with 50% duty cycle definition',
      'Calculating worst negative slack (WNS) and total negative slack (TNS)'
    ],
    sampleDeliverables: [
      'Complete SDC constraint deck for multi-clock SoC including asynchronous domains',
      'PrimeTime MCMM signoff report with 0 WNS/TNS across SS, TT, FF corners',
      'Synthesis optimization script achieving 18% area reduction using gate sizing'
    ],
    typicalInterviewRounds: [
      'Round 1: Setup and Hold timing equations, propagation delays, library setup time',
      'Round 2: SDC constraints syntax and generated clock definitions',
      'Round 3: Timing exceptions, false paths, clock domain crossing SDC rules',
      'Round 4: Synthesis optimization, cell delay modeling (.lib NLDM vs CCS)'
    ],
    topCompanies: ['Synopsys', 'Cadence', 'Qualcomm', 'AMD', 'Apple', 'Intel', 'Broadcom'],
    dayInTheLife: 'Authoring and maintaining SDC files, running PrimeTime across 24 PVT corners, analyzing timing violation histograms, and collaborating with RTL and PD engineers to close timing.'
  },
  {
    id: 'dft-engineer',
    discipline: 'vlsi',
    field: 'dft',
    title: 'Design for Testability Engineer (DFT)',
    tagline: 'Scan insertion, ATPG pattern generation, BIST, and manufacturing defect screening.',
    salaryRangeIndia: '₹13L – ₹33L (Entry-Mid) | ₹38L – ₹75L+ (Senior/Lead)',
    salaryRangeUS: '$115k – $185k (Entry-Mid) | $200k – $310k+ (Senior/Staff)',
    description: 'Ensures fabricated silicon dies can be tested for physical manufacturing defects in seconds on Automated Test Equipment (ATE). DFT engineers insert scan chains, generate ATPG test patterns, implement Memory BIST (MBIST), and configure JTAG IEEE 1149.1 boundary scan.',
    coreSkills: [
      'Scan chain insertion (Internal scan, MUX-DFF architecture)',
      'Automatic Test Pattern Generation (ATPG: Stuck-at, Transition delay, At-speed)',
      'Memory Built-In Self-Test (MBIST) and repair algorithms',
      'Boundary Scan (IEEE 1149.1 JTAG, IEEE 1500, IEEE 1687 IJTAG)',
      'Test compression architectures (Synopsys DFTMAX, Tessent TestKompress)',
      'Silicon bring-up & failure analysis on ATE testers'
    ],
    languages: ['Verilog', 'TCL', 'STIL / WGL Test Vector Formats', 'Python'],
    toolsAndEda: ['Siemens Tessent', 'Synopsys DFT Compiler', 'Cadence Modus', 'PrimeTime'],
    keyWhiteboardTopics: [
      'Converting standard D-Flip-Flop to Scan Flip-Flop and chain connection',
      'D-Algorithm and PODEM for single stuck-at fault ATPG',
      'Launch-off-Capture (LOC) vs Launch-off-Shift (LOS) for transition delay testing',
      'JTAG TAP controller state machine transitions (16 states)'
    ],
    sampleDeliverables: [
      'Full scan chain insertion achieving >99.2% stuck-at test coverage on RISC-V SoC',
      'MBIST controller integration for on-chip SRAM caches with self-repair',
      'JTAG TAP controller implementation compliant with IEEE 1149.1'
    ],
    typicalInterviewRounds: [
      'Round 1: Manufacturing defects (bridging, open, stuck-at-0/1) vs functional bugs',
      'Round 2: Scan design rules (clock gating during scan, asynchronous reset control)',
      'Round 3: ATPG algorithms, test compression, and test pattern count minimization',
      'Round 4: Silicon test bring-up, yield analysis, and ATE test time reduction'
    ],
    topCompanies: ['Qualcomm', 'Intel', 'TI', 'NXP Semiconductors', 'Siemens EDA', 'Synopsys', 'MediaTek'],
    dayInTheLife: 'Inserting scan compression logic into synthesized netlists, running Tessent ATPG to maximize fault coverage, writing STIL vectors, and debugging test pattern failures on post-silicon dies.'
  },
  {
    id: 'analog-ic-designer',
    discipline: 'vlsi',
    field: 'analog_ic',
    title: 'Analog & Mixed-Signal IC Designer',
    tagline: 'Transistor-level circuit design: Bandgaps, Op-Amps, PLLs, ADCs, and RF front-ends.',
    salaryRangeIndia: '₹15L – ₹38L (Entry-Mid) | ₹45L – ₹90L+ (Senior/Lead)',
    salaryRangeUS: '$130k – $200k (Entry-Mid) | $220k – $340k+ (Senior/Staff)',
    description: 'Designs transistor-level analog circuits that interface real-world physics with digital processors. Responsibilities include designing low-noise amplifiers, bandgap voltage references, operational amplifiers, PLL frequency synthesizers, and high-speed data converters (ADC/DAC).',
    coreSkills: [
      'MOSFET small-signal modeling (gm, ro, gmb, ft cut-off frequency)',
      'Bandgap Voltage Reference (BGR) design with zero temperature coefficient',
      'Two-stage Operational Amplifier (Op-Amp) design with Miller compensation',
      'Phase-Locked Loops (PLL: PFD, Charge Pump, VCO, Loop Filter)',
      'Analog Layout Matching (Common-centroid, dummy transistors, guard rings)',
      'Noise analysis (Thermal, Flicker 1/f noise, PSRR, CMRR)'
    ],
    languages: ['SPICE / Spectre netlists', 'Verilog-A / Verilog-AMS', 'MATLAB', 'Python'],
    toolsAndEda: ['Cadence Virtuoso', 'Synopsys Custom Compiler', 'Spectre Simulator', 'HSPICE', 'Calibre DRC/LVS'],
    keyWhiteboardTopics: [
      'Deriving voltage gain, input common-mode range (ICMR), and phase margin of a folded-cascode Op-Amp',
      'CTAT vs PTAT current generation in a Brokaw/Kuijk bandgap reference',
      'Miller compensation pole-splitting effect on dominant and non-dominant poles',
      'Common-centroid layout for differential pairs to cancel process gradients'
    ],
    sampleDeliverables: [
      '1.2V low-dropout (LDO) regulator with >60dB PSRR at 100kHz in 180nm CMOS',
      '10-bit 50MS/s Successive Approximation Register (SAR) ADC in Cadence Virtuoso',
      '2.4GHz LC-VCO with low phase noise (-120dBc/Hz at 1MHz offset)'
    ],
    typicalInterviewRounds: [
      'Round 1: Transistor physics, saturation conditions, square-law vs short-channel',
      'Round 2: Single-stage amplifiers (Common-Source, Common-Drain, Cascode gains and impedance)',
      'Round 3: Differential pairs, current mirrors, stability, Nyquist plot, phase margin',
      'Round 4: Layout parasitics, electromigration, matching techniques'
    ],
    topCompanies: ['Texas Instruments', 'Analog Devices (ADI)', 'Cirrus Logic', 'Skyworks', 'Qualcomm', 'Infineon', 'NXP'],
    dayInTheLife: 'Simulating circuits in Cadence Spectre across PVT corners, plotting frequency response and Monte Carlo mismatch distributions, guiding analog layout engineers, and tuning loop stability.'
  },

  // ===================== EMBEDDED & FIRMWARE JOB ROLES =====================
  {
    id: 'bare-metal-firmware-engineer',
    discipline: 'embedded',
    field: 'bare_metal',
    title: 'Bare-Metal & MCU Firmware Developer',
    tagline: 'Register-level C programming, startup code, interrupt vectors, and low-level peripheral drivers.',
    salaryRangeIndia: '₹8L – ₹24L (Entry-Mid) | ₹28L – ₹55L+ (Senior/Lead)',
    salaryRangeUS: '$105k – $170k (Entry-Mid) | $185k – $275k+ (Senior/Staff)',
    description: 'Writes software running directly on microcontrollers without an operating system. Direct register manipulation, writing linker scripts, configuring interrupt service routines, and writing bare-metal drivers for UART, SPI, I2C, Timers, and ADCs with zero OS overhead.',
    coreSkills: [
      'Embedded C Mastery (Pointers, volatile keyword, bitmasks, memory alignment)',
      'Microcontroller Architecture (ARM Cortex-M0/M3/M4/M7, RISC-V RV32EC)',
      'Direct Register Access via Memory-Mapped I/O (MMIO)',
      'Interrupt Vector Table (IVT), NVIC priority grouping, and ISR design',
      'Linker Scripts (.ld), Memory Sections (.text, .rodata, .data, .bss)',
      'Bare-metal Boot Sequence (Reset handler, copying .data, zeroing .bss)'
    ],
    languages: ['Embedded C (C99/C11)', 'ARM / RISC-V Assembly', 'Python (Test scripts)', 'Make / CMake'],
    toolsAndEda: ['GCC Toolchain (arm-none-eabi-gcc)', 'GDB & OpenOCD', 'J-Link / ST-Link', 'Saleae Logic Analyzer', 'STM32CubeIDE'],
    keyWhiteboardTopics: [
      'Explain all three uses of the "volatile" keyword in embedded systems',
      'Write a C macro to atomically set, clear, and toggle specific register bits',
      'Walk through the C startup sequence from reset vector to main()',
      'Diagnose and fix a hard fault exception on an ARM Cortex-M processor'
    ],
    sampleDeliverables: [
      'Bare-metal register driver library for STM32F4 (RCC, GPIO, UART, SPI, SysTick) from scratch',
      'Lightweight bootloader with UART firmware download and flash sector erase/write',
      'Deterministic PID motor controller executing inside a 1kHz hardware timer interrupt'
    ],
    typicalInterviewRounds: [
      'Round 1: C pointers, pointer arithmetic, structures, bitfields, endianness',
      'Round 2: Hardware peripherals (UART framing, SPI clock polarity/phase, I2C ACK/NACK)',
      'Round 3: Interrupts, reentrancy, volatile, race conditions, atomic operations',
      'Round 4: Live hardware debugging session using GDB, oscilloscope, and logic analyzer traces'
    ],
    topCompanies: ['Bosch', 'Continental', 'STMicroelectronics', 'Texas Instruments', 'Microchip', 'Garmin', 'Dyson'],
    dayInTheLife: 'Reading microcontroller reference manuals, writing register-level peripheral drivers in C, flashing firmware via JTAG, and capturing bus signals on a Saleae logic analyzer.'
  },
  {
    id: 'rtos-firmware-engineer',
    discipline: 'embedded',
    field: 'rtos_firmware',
    title: 'RTOS & Real-Time Systems Engineer',
    tagline: 'Multi-threaded firmware, task scheduling, synchronization primitives, and deterministic execution.',
    salaryRangeIndia: '₹10L – ₹28L (Entry-Mid) | ₹32L – ₹65L+ (Senior/Lead)',
    salaryRangeUS: '$115k – $185k (Entry-Mid) | $200k – $290k+ (Senior/Staff)',
    description: 'Designs deterministic, multi-tasking embedded firmware on real-time operating systems like FreeRTOS, Zephyr, and ThreadX. Manages task priorities, mutexes, semaphores, queues, and avoids concurrency pitfalls like priority inversion, deadlocks, and starvation.',
    coreSkills: [
      'Real-Time Operating Systems (FreeRTOS, Zephyr OS, CMSIS-RTOS)',
      'Inter-Process Communication (IPC: Message Queues, Ring Buffers, Event Groups)',
      'Synchronization Primitives (Binary/Counting Semaphores, Recursive Mutexes)',
      'Priority Inversion Prevention (Priority Inheritance protocol)',
      'Preemptive vs Cooperative Task Scheduling, Tick rates, Context Switching',
      'Memory Management in RTOS (Heap_1 to Heap_5, static task allocation)'
    ],
    languages: ['Embedded C', 'Modern C++ (C++14/17 for embedded)', 'Python', 'CMake'],
    toolsAndEda: ['FreeRTOS Kernel', 'Zephyr RTOS / West tool', 'Segger SystemView', 'Percepio Tracealyzer', 'J-Link'],
    keyWhiteboardTopics: [
      'Describe priority inversion scenario with Low, Medium, High tasks and how priority inheritance resolves it',
      'Mutex vs Binary Semaphore: Explain ownership, priority inheritance, and ISR safety',
      'Designing a thread-safe lock-free circular ring buffer for high-speed UART DMA',
      'Calculating task stack depth and detecting stack overflow conditions'
    ],
    sampleDeliverables: [
      'FreeRTOS sensor hub firmware with 4 preemptive tasks communicating via queues and mutexes',
      'Zephyr RTOS application utilizing Devicetree and Kconfig build system with BLE stack',
      'Segger SystemView profiling showing CPU utilization < 25% and zero missed deadlines'
    ],
    typicalInterviewRounds: [
      'Round 1: C/C++ memory models, dynamic memory hazards in safety-critical systems',
      'Round 2: RTOS primitives: queues, semaphores, mutexes, event groups, task notifications',
      'Round 3: Concurrency bugs: race conditions, deadlocks, priority inversion, stack overflow',
      'Round 4: Architecture design: System architecture for a multi-sensor wearable device'
    ],
    topCompanies: ['Qualcomm', 'Apple', 'Tesla', 'Garmin', 'Fitbit / Google', 'Honeywell', 'Schneider Electric'],
    dayInTheLife: 'Architecting multi-tasking state machines, measuring task execution jitter using Segger SystemView, optimizing power consumption with tickless idle mode, and debugging multi-threaded deadlocks.'
  },
  {
    id: 'embedded-linux-bsp-engineer',
    discipline: 'embedded',
    field: 'embedded_linux_bsp',
    title: 'Embedded Linux & Board Support Package (BSP) Engineer',
    tagline: 'Bootloaders, Linux kernel customization, Devicetree configuration, and Yocto build systems.',
    salaryRangeIndia: '₹12L – ₹30L (Entry-Mid) | ₹35L – ₹70L+ (Senior/Lead)',
    salaryRangeUS: '$120k – $190k (Entry-Mid) | $205k – $310k+ (Senior/Staff)',
    description: 'Brings up Linux on custom System-on-Chips (SoCs). Porting and configuring U-Boot bootloaders, customizing Linux kernel configs, authoring Devicetree Source (DTS) files for custom hardware boards, and creating production root filesystems using Yocto Project or Buildroot.',
    coreSkills: [
      'Linux Boot Sequence (ROM code -> SPL -> U-Boot -> Kernel -> init/systemd)',
      'Board Support Package (BSP) Bring-up on ARM Cortex-A & RISC-V',
      'Devicetree (DTS/DTSI) authoring and pin-muxing configuration',
      'Yocto Project (BitBake, Recipes, Layers, Machine configuration)',
      'Cross-compilation toolchains, sysroots, and GDB multiarch remote debugging',
      'Storage partitioning (eMMC, NAND Flash, UBI, SquashFS, ext4)'
    ],
    languages: ['C', 'Bash / Shell Scripting', 'Python', 'Devicetree Source (DTS)', 'BitBake Syntax'],
    toolsAndEda: ['Yocto Project', 'Buildroot', 'U-Boot', 'QEMU Emulator', 'Kbuild / Kconfig', 'GDB Remote'],
    keyWhiteboardTopics: [
      'Step-by-step trace of embedded Linux boot process from power-on to user space prompt',
      'Writing a Devicetree node for an I2C temperature sensor with interrupts and clock specifier',
      'U-Boot environment variables, bootcmd, bootargs, and TFTP network booting',
      'Creating a custom Yocto meta-layer and writing a BitBake recipe'
    ],
    sampleDeliverables: [
      'Custom Yocto BSP layer supporting custom i.MX8 / STM32MP1 board with hardware video acceleration',
      'U-Boot SPL with DDR4 timing calibration and verified secure boot chain',
      'Devicetree binding and configuration for custom FPGA-to-SoC AXI interconnect'
    ],
    typicalInterviewRounds: [
      'Round 1: Linux user space vs kernel space, virtual memory, MMU, system calls',
      'Round 2: Bootloader concepts: U-Boot phases, relocation, device tree passing to kernel',
      'Round 3: Yocto Project mechanics: recipes, layers, BBCLASSEXTEND, package management',
      'Round 4: Board bring-up triage: Diagnosing kernel panic on serial console at boot'
    ],
    topCompanies: ['NXP', 'Texas Instruments', 'Qualcomm', 'Intel', 'Toradex', 'Sony', 'Siemens'],
    dayInTheLife: 'Modifying devicetree nodes to support new hardware board revisions, configuring Yocto BitBake builds, testing bootloader images on physical development boards, and diagnosing kernel crashes over UART.'
  },
  {
    id: 'linux-device-driver-engineer',
    discipline: 'embedded',
    field: 'device_drivers',
    title: 'Linux Kernel & Device Driver Engineer',
    tagline: 'Kernel-space development: Char/block drivers, interrupt bottom-halves, DMA, and subsystem integration.',
    salaryRangeIndia: '₹14L – ₹35L (Entry-Mid) | ₹40L – ₹80L+ (Senior/Lead)',
    salaryRangeUS: '$125k – $195k (Entry-Mid) | $215k – $325k+ (Senior/Staff)',
    description: 'Writes C code executing in Linux kernel space to control hardware peripherals. Implements file operations (`read`, `write`, `ioctl`, `mmap`), manages interrupt handling using threaded IRQs and workqueues, coordinates Direct Memory Access (DMA), and integrates with Linux subsystems.',
    coreSkills: [
      'Linux Kernel Modules (LKM: init_module, cleanup_module, module_param)',
      'Character Device Subsystem (`struct file_operations`, `cdev_add`, `alloc_chrdev_region`)',
      'Kernel Concurrency Primitives (Spinlocks, Mutexes, Semaphores, RCU, Atomic variables)',
      'Interrupt Handling (Top-half fast ISR vs Bottom-half Tasklets / Workqueues)',
      'Memory Management (kmalloc, vmalloc, ioremap, dma_alloc_coherent)',
      'Hardware bus subsystems (Platform driver model, I2C, SPI, PCIe, USB)'
    ],
    languages: ['Kernel C (strict GNU C99 / Linux coding style)', 'Shell', 'Make'],
    toolsAndEda: ['Linux Kernel Tree', 'QEMU Virtual Hardware', 'Ftrace', 'Perf', 'Valgrind / Sparse', 'KGDB'],
    keyWhiteboardTopics: [
      'Explain when to use a Spinlock vs Mutex in Linux kernel code and rules for interrupt context',
      'Implement `ioctl` handler in character driver to pass a structure between user and kernel space using `copy_from_user`',
      'Differentiate top-half interrupt handler from workqueue bottom-half',
      'DMA coherent vs streaming memory mapping and cache coherency implications'
    ],
    sampleDeliverables: [
      'Production-grade Linux character driver for custom FPGA hardware peripheral with interrupt handling and mmap',
      'I2C client driver conforming to modern Linux device model with devicetree matching',
      'Zero-copy high-speed packet streaming driver using ring buffers and circular DMA'
    ],
    typicalInterviewRounds: [
      'Round 1: Linux kernel architecture, user-to-kernel context switch, memory virtual-to-physical mapping',
      'Round 2: Kernel synchronization (spinlocks, read-write locks, seqlocks, RCU) and sleep rules',
      'Round 3: Writing a device driver live: `open`, `read`, `write`, `ioctl` and error handling',
      'Round 4: High-speed peripheral interfacing (PCIe BARs, MSI-X interrupts, DMA engines)'
    ],
    topCompanies: ['NVIDIA', 'Qualcomm', 'Intel', 'Broadcom', 'Western Digital', 'Cisco', 'Samsung Semiconductor'],
    dayInTheLife: 'Developing and optimizing device drivers in C, resolving kernel concurrency race conditions, running Ftrace and Perf to find latency bottlenecks, and submitting patches upstream.'
  },
  {
    id: 'automotive-autosar-engineer',
    discipline: 'embedded',
    field: 'automotive_autosar',
    title: 'Automotive Embedded & AUTOSAR Engineer',
    tagline: 'Safety-critical ECU software, AUTOSAR Classic/Adaptive stacks, CAN/LIN/Ethernet, and ISO 26262.',
    salaryRangeIndia: '₹10L – ₹28L (Entry-Mid) | ₹32L – ₹65L+ (Senior/Lead)',
    salaryRangeUS: '$115k – $180k (Entry-Mid) | $195k – $285k+ (Senior/Staff)',
    description: 'Develops safety-critical software for automotive Electronic Control Units (ECUs) controlling ADAS, braking, powertrain, and chassis. Implements AUTOSAR Classic (BSW, MCAL, RTE) and Adaptive stacks, configures automotive networks (CAN-FD, LIN, Automotive Ethernet), and adheres to ISO 26262 ASIL-D standards.',
    coreSkills: [
      'AUTOSAR Classic Architecture (Microcontroller Abstraction Layer MCAL, BSW, RTE, SWC)',
      'Automotive Communication Protocols (CAN, CAN-FD, LIN, FlexRay, Automotive Ethernet SOME/IP)',
      'ISO 26262 Functional Safety standard (ASIL-A to ASIL-D, Hazard Analysis HARA)',
      'Diagnostics Protocols (UDS ISO 14229, DoIP ISO 13400, OBD-II)',
      'MISRA-C:2012 / CERT C Safety Coding Guidelines',
      'Hardware Security Modules (HSM) & Secure On-Board Communication (SecOC)'
    ],
    languages: ['MISRA-C', 'Embedded C', 'C++ (for AUTOSAR Adaptive)', 'CAPL (Vector CANoe)'],
    toolsAndEda: ['Vector CANoe / CANalyzer', 'EB tresos', 'DaVinci Configurator', 'Lauterbach TRACE32', 'dSPACE'],
    keyWhiteboardTopics: [
      'Explain the layers of AUTOSAR Classic stack from hardware to application software components (SWC)',
      'CAN bus bit-stuffing, arbitration mechanism, dominant vs recessive bits, and error frame handling',
      'ISO 26262 ASIL determination based on Severity (S), Exposure (E), and Controllability (C)',
      'UDS protocol client-server diagnostic request/response flow ($22 ReadDataByIdentifier)'
    ],
    sampleDeliverables: [
      'AUTOSAR BSW MCAL driver configuration for Aurix TC3xx / STM32 CAN-FD controller',
      'Vector CANoe automated test suite in CAPL verifying ECU diagnostic responses',
      'Safety-critical motor control software module achieving MISRA-C compliance and ASIL-B certification'
    ],
    typicalInterviewRounds: [
      'Round 1: C language pointers, MISRA rules, bit manipulation, deterministic execution',
      'Round 2: CAN bus protocol deep dive: arbitration, bit timing, CRC, error states',
      'Round 3: AUTOSAR architecture: MCAL vs BSW vs RTE, SWC runnable entities',
      'Round 4: ISO 26262 functional safety, safety goals, single-point fault metric'
    ],
    topCompanies: ['Bosch', 'Continental', 'ZF Group', 'Valeo', 'Aptiv', 'Tata Elxsi', 'KPIT', 'Tesla'],
    dayInTheLife: 'Configuring AUTOSAR BSW modules using DaVinci/EB tresos, testing ECU communication using Vector CANoe, verifying MISRA-C static analysis warnings, and ensuring ISO 26262 safety traces.'
  },
  {
    id: 'iot-wireless-firmware-engineer',
    discipline: 'embedded',
    field: 'iot_wireless',
    title: 'IoT & Wireless Low-Power Firmware Engineer',
    tagline: 'Ultra-low-power firmware, wireless stacks (BLE, Zigbee, Wi-Fi 6), power profiling, and secure FOTA.',
    salaryRangeIndia: '₹9L – ₹26L (Entry-Mid) | ₹30L – ₹60L+ (Senior/Lead)',
    salaryRangeUS: '$110k – $175k (Entry-Mid) | $190k – $280k+ (Senior/Staff)',
    description: 'Designs battery-operated connected devices that run for years on coin cells. Integrates wireless connectivity stacks (Bluetooth Low Energy GATT/GAP, Zigbee, Thread, Wi-Fi), tunes microcontroller sleep states (Sleep, Deep Sleep, Standby), and implements secure Firmware Over-The-Air (FOTA) updates.',
    coreSkills: [
      'Low-Power Architecture (Sleep modes, wakeup timers, DVFS, current profiling in microamps)',
      'Bluetooth Low Energy (BLE: Generic Access Profile GAP, Generic Attribute Profile GATT, Advertising)',
      'Network Stacks (TCP/IP, MQTT, CoAP, TLS 1.3 encryption, mbedTLS)',
      'Firmware Over-The-Air (FOTA) with dual-bank flash, rollback protection, and cryptographic signing',
      'Sensor Integration (I2C/SPI accelerometer, temperature, IMU with interrupt thresholds)',
      'Hardware Security (Secure Boot, flash encryption, PUF, hardware root of trust)'
    ],
    languages: ['C', 'Modern C++', 'Python (Automation)', 'JavaScript/Node.js (Cloud test)'],
    toolsAndEda: ['ESP-IDF (Espressif)', 'Nordic nRF Connect SDK', 'Otii Arc Power Profiler', 'Wireshark BLE Sniffer', 'Segger J-Link'],
    keyWhiteboardTopics: [
      'Designing a firmware state machine that consumes < 15 microamps average current on a coin cell',
      'BLE GAP advertising packet structure and GATT Service/Characteristic hierarchy',
      'Dual-bank A/B flash partitioning for fail-safe FOTA with cryptographic signature validation',
      'I2C bus pull-up resistor calculation and low-power bus management'
    ],
    sampleDeliverables: [
      'BLE 5.2 asset tracking sensor node running on Nordic nRF52840 achieving 3-year battery life',
      'Secure MQTT telemetry client on ESP32-S3 with TLS 1.3 hardware acceleration and AWS IoT Core connection',
      'Fail-safe MCUboot FOTA implementation with ECDSA-P256 signature verification'
    ],
    typicalInterviewRounds: [
      'Round 1: C data structures, bitwise manipulation, memory footprint minimization',
      'Round 2: Low-power techniques (clock gating, wake-on-interrupt, sensor threshold sampling)',
      'Round 3: Wireless protocols: BLE connection intervals, advertising payloads, MTU negotiation',
      'Round 4: Secure FOTA architecture, flash memory partitioning, anti-rollback mechanisms'
    ],
    topCompanies: ['Nordic Semiconductor', 'Silicon Labs', 'Espressif', 'Apple', 'Fitbit / Google', 'Amazon Lab126', 'Honeywell'],
    dayInTheLife: 'Measuring microamp current consumption on an Otii Arc power analyzer, debugging BLE GATT connection drops with a Wireshark packet sniffer, and testing secure FOTA updates over the air.'
  }
];
