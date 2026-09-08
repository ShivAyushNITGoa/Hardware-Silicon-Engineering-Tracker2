import { CurriculumTopic } from '../types';

export const curriculumTracks: CurriculumTopic[] = [
  // ===================== VLSI CURRICULUM TRACKS =====================
  {
    id: 'curr-vlsi-digital-logic',
    discipline: 'vlsi',
    field: 'rtl_design',
    number: 1,
    title: 'Digital Logic Foundations & Synchronous State Machines',
    tagline: 'Boolean minimization, combinational building blocks, latches vs. flip-flops, and glitch-free FSMs.',
    targetRoles: ['Digital Design Engineer', 'RTL Engineer', 'FPGA Engineer'],
    estimatedHours: 45,
    whyItMatters: 'Every digital chip in existence, from simple microcontrollers to 80-billion transistor GPUs, is built from these core primitives.',
    coreConcepts: [
      'Binary Arithmetic, 2s Complement, Sign Extension & Overflow Detection',
      'Boolean Algebra Theorems, De Morgans Laws, Karnaugh Maps (K-Maps)',
      'Combinational Blocks: MUX, Decoders, Priority Encoders, Ripple-Carry & Carry-Lookahead Adders',
      'Sequential Storage: SR Latch, D-Latch transparency vs D-Flip-Flop edge-triggering',
      'Finite State Machines: Moore vs Mealy, One-Hot vs Binary vs Gray encoding, output glitch elimination'
    ],
    practiceExercise: 'Design and synthesize a 4-floor elevator controller FSM in Verilog with door sensors, priority requests, and timeout counters.',
    deliverable: 'Synthesizable Verilog module with testbench and waveform simulation proof in GTKWave.',
    documentationPath: '/encyclopedia/Volume_01_Fundamentals/README.md'
  },
  {
    id: 'curr-vlsi-rtl-verilog',
    discipline: 'vlsi',
    field: 'rtl_design',
    number: 2,
    title: 'Synthesizable Verilog & SystemVerilog RTL Modeling',
    tagline: 'Coding styles, blocking vs non-blocking assignments, parameterized modules, and synthesis traps.',
    targetRoles: ['RTL Design Engineer', 'ASIC Designer', 'SoC IP Developer'],
    estimatedHours: 60,
    whyItMatters: 'Writing code that simulates correctly is easy; writing code that synthesizes into clean, area-efficient, timing-clean gates is the hallmark of a true silicon engineer.',
    coreConcepts: [
      'IEEE 1364/1800 Standards: wire vs reg vs logic, always_comb vs always_ff vs always_latch',
      'Blocking (=) vs Non-Blocking (<=) Assignment Golden Rules (preventing race conditions)',
      'Inferred Latches: Missing else branches, incomplete case statements, and parallel_case traps',
      'Parameterized Architectures: generate blocks, for loops, and package definitions',
      'Pipelining Strategies: Forwarding logic, pipeline stalls, bubble insertion, and hazard management'
    ],
    practiceExercise: 'Implement a 4-stage pipelined 32-bit Multiply-Accumulate (MAC) unit with clock gating enable and overflow flags.',
    deliverable: 'Synthesizable SystemVerilog MAC unit passing Yosys synthesis with zero inferred latches.',
    documentationPath: '/encyclopedia/Volume_03_IC_Design/README.md'
  },
  {
    id: 'curr-vlsi-uvm-verification',
    discipline: 'vlsi',
    field: 'verification',
    number: 3,
    title: 'Design Verification with SystemVerilog & UVM',
    tagline: 'Constrained-random testbenches, OOP principles, UVM factory, TLM ports, scoreboards, and SVA.',
    targetRoles: ['ASIC Verification Engineer (DV)', 'Pre-Silicon DV Lead', 'UVM Consultant'],
    estimatedHours: 85,
    whyItMatters: 'Over 70% of engineering effort in modern ASIC programs is dedicated to verification. Mastering UVM is the fastest pathway to high-paying silicon jobs.',
    coreConcepts: [
      'SystemVerilog OOP: Classes, polymorphism, virtual interfaces, deep vs shallow copy',
      'Constrained-Random Verification: rand/randc, constraint blocks, solve-before, dist operators',
      'SystemVerilog Assertions (SVA): Immediate vs Concurrent, implication (|->, |=>), sequence repetition',
      'UVM Component Architecture: uvm_sequence, uvm_sequencer, uvm_driver, uvm_monitor, uvm_agent, uvm_env',
      'UVM Phasing: Top-down build vs Bottom-up connect, Phase Objections, Factory Type/Instance Overrides',
      'Functional Coverage: Covergroups, coverpoints, cross-coverage, binning strategies, coverage closure'
    ],
    practiceExercise: 'Build a complete UVM 1.2 testbench for a dual-port synchronous FIFO with scoreboard, coverage collector, and error injection sequences.',
    deliverable: 'UVM testbench achieving 100% functional and code coverage on Synopsys VCS or Siemens Questa.',
    documentationPath: '/encyclopedia/Volume_06_Design_Methodologies/verification_methodology.md'
  },
  {
    id: 'curr-vlsi-physical-design',
    discipline: 'vlsi',
    field: 'physical_design',
    number: 4,
    title: 'Physical Design, ASIC Flow & OpenLane Tapeout',
    tagline: 'From gate-level netlist to GDSII layout: Floorplanning, Power Distribution, Placement, CTS, and Routing.',
    targetRoles: ['Physical Design Engineer (PD)', 'ASIC Backend Specialist', 'Layout Engineer'],
    estimatedHours: 75,
    whyItMatters: 'Physical design bridges abstract boolean equations with physical nanometer silicon reality. It dictates the final chip frequency, battery consumption, and manufacturing yield.',
    coreConcepts: [
      'ASIC Backend Flow: Synthesis netlist (.v) -> Floorplan -> Placement -> CTS -> Route -> DRC/LVS -> GDSII',
      'Floorplanning: Die size estimation, core utilization, aspect ratio, macro placement, IO pad ring',
      'Power Grid Planning: Core rings, power straps, static/dynamic IR drop estimation, decoupling capacitors',
      'Placement & Optimization: Global placement, legalizer, high-fanout net synthesis (HFNS), congestion maps',
      'Clock Tree Synthesis (CTS): H-Tree, clock mesh, CTS skew budget, buffer insertion, and latency minimization',
      'Signoff DRC/LVS: Design rule checks, layout vs schematic, antenna violations, metal fill'
    ],
    practiceExercise: 'Run complete OpenLane tapeout flow for a RISC-V RV32I core on SkyWater 130nm PDK and inspect GDSII in KLayout.',
    deliverable: 'GDSII layout file with clean DRC and LVS reports and zero setup/hold timing violations.',
    documentationPath: '/encyclopedia/Volume_04_Semiconductor_Fabrication/README.md'
  },
  {
    id: 'curr-vlsi-sta-constraints',
    discipline: 'vlsi',
    field: 'sta_synthesis',
    number: 5,
    title: 'Static Timing Analysis (STA) & SDC Constraints',
    tagline: 'Clock definitions, timing exceptions, multicycle paths, false paths, and multi-corner signoff.',
    targetRoles: ['STA Engineer', 'Synthesis Specialist', 'Timing Closure Lead'],
    estimatedHours: 50,
    whyItMatters: 'Timing closure is the final gatekeeper for silicon tapeout. A single unconstrained path or missed clock domain crossing can ruin a multi-million-dollar wafer run.',
    coreConcepts: [
      'Setup and Hold Timing Equations with Skew, Jitter, and On-Chip Variation (OCV)',
      'Synopsys Design Constraints (SDC): create_clock, create_generated_clock, set_clock_uncertainty',
      'Timing Exceptions: set_false_path (asynchronous signals), set_multicycle_path, set_max_delay',
      'Delay Models: Non-Linear Delay Model (NLDM) vs Composite Current Source (CCS), .lib parsing',
      'Multi-Corner Multi-Mode (MCMM): Process (Slow-Slow, Typical, Fast-Fast), Voltage, and Temperature corners',
      'Fixing Timing Violations: Gate sizing, buffer insertion, VT-swapping (LVT/SVT/HVT), and useful skew'
    ],
    practiceExercise: 'Author an SDC file for a multi-clock SoC with source-synchronous DDR memory interface and run PrimeTime timing analysis.',
    deliverable: 'SDC constraint deck with zero unconstrained endpoints and detailed timing report analysis.',
    documentationPath: '/encyclopedia/Volume_05_EDA_Tools/synopsys_tools.md'
  },

  // ===================== EMBEDDED & FIRMWARE CURRICULUM TRACKS =====================
  {
    id: 'curr-emb-c-pointers',
    discipline: 'embedded',
    field: 'bare_metal',
    number: 6,
    title: 'Advanced Embedded C, Memory Models & Pointer Mechanics',
    tagline: 'Pointers, pointer arithmetic, memory alignment, bitfields, volatile, const, and hardware registers.',
    targetRoles: ['Bare-Metal Firmware Developer', 'Embedded Software Engineer', 'Firmware Trainee'],
    estimatedHours: 50,
    whyItMatters: 'C is the lingua franca of embedded systems. Understanding raw byte layouts, memory-mapped I/O, and compiler optimizations separates amateurs from professional firmware developers.',
    coreConcepts: [
      'Pointers, Double Pointers, Function Pointers (Callback architectures, state machine dispatch tables)',
      'Memory Layout of a C Program: .text (Flash), .rodata, .data (RAM), .bss (RAM), Stack, Heap',
      'The `volatile` Qualifier: MMIO registers, ISR variables, multi-threaded flags, compiler barrier semantics',
      'Struct Packing, Member Padding, Data Alignment (__attribute__((packed)), sizeof vs offsetof)',
      'Bit Manipulation: Bitwise AND/OR/XOR/NOT, bitmasks, atomic Bit-Banding, bitfields vs portable masks',
      'Preprocessor Mastery: Token pasting (##), stringification (#), multi-statement macros (do { } while(0))'
    ],
    practiceExercise: 'Build a generic, lock-free circular ring buffer (FIFO) in C with head/tail pointers and overflow protection.',
    deliverable: 'MISRA-C compliant circular buffer library with comprehensive unit tests in Unity/CMock.',
    documentationPath: '/encyclopedia/Volume_07_Industry_Preparation/semiconductor_job_roles.md'
  },
  {
    id: 'curr-emb-mcu-bare-metal',
    discipline: 'embedded',
    field: 'bare_metal',
    number: 7,
    title: 'ARM Cortex-M & RISC-V Microcontroller Architecture',
    tagline: 'Cortex-M programmer model, NVIC interrupt controller, SysTick, linker scripts, and startup code.',
    targetRoles: ['MCU Firmware Engineer', 'Bare-Metal Developer', 'Embedded Systems Specialist'],
    estimatedHours: 65,
    whyItMatters: 'Knowing what happens between the reset vector and `main()` gives you the superpower to debug hard faults, configure interrupts, and write bare-metal drivers without vendor bloat.',
    coreConcepts: [
      'ARM Cortex-M Core: Registers (R0-R12, SP/MSP/PSP, LR, PC, PSR), Thread vs Handler mode, Privileged vs Unprivileged',
      'Nested Vectored Interrupt Controller (NVIC): Priority grouping, preemption priority vs subpriority, vector table relocation',
      'Startup Code & Runtime Initialization: Reset handler, copying initialized .data from Flash to RAM, zeroing .bss',
      'Linker Scripts (.ld): Memory regions (FLASH, SRAM), section placement (.text, .data, .bss), symbol export',
      'SysTick Timer: Periodic tick generation, microsecond delay loops, system timing base',
      'Hard Fault Exception Handling: Stacking on exception entry, extracting stacked PC and LR, fault status registers (CFSR, HFSR)'
    ],
    practiceExercise: 'Write a complete C startup file and GNU linker script for an ARM Cortex-M4 (STM32F4) from scratch without CMSIS startup.',
    deliverable: 'Blinking LED bare-metal project built using `arm-none-eabi-gcc` and flashed with OpenOCD.',
    documentationPath: '/encyclopedia/Volume_08_Semiconductor_Glossary/README.md'
  },
  {
    id: 'curr-emb-peripheral-drivers',
    discipline: 'embedded',
    field: 'bare_metal',
    number: 8,
    title: 'Bare-Metal Hardware Peripheral Drivers (UART, SPI, I2C, Timers, DMA)',
    tagline: 'Register-level peripheral configuration, state machines, interrupt-driven I/O, and circular DMA.',
    targetRoles: ['Peripheral Driver Developer', 'Hardware Bring-up Engineer', 'Firmware Engineer'],
    estimatedHours: 70,
    whyItMatters: 'Writing drivers directly from hardware silicon datasheets and reference manuals is the core daily activity of embedded firmware engineers.',
    coreConcepts: [
      'General Purpose I/O (GPIO): Push-pull vs Open-drain, internal pull-up/pull-down, alternate function multiplexing',
      'Universal Asynchronous Receiver-Transmitter (UART): Baud rate divisor calculation, framing, parity, FIFO interrupts',
      'Serial Peripheral Interface (SPI): Master/slave, clock polarity (CPOL) and phase (CPHA), high-speed multi-byte streaming',
      'Inter-Integrated Circuit (I2C): Start/Stop conditions, 7-bit addressing, ACK/NACK, pull-up resistor sizing, clock stretching',
      'General Purpose Hardware Timers: Prescaler, auto-reload register (ARR), PWM generation, input capture for frequency measurement',
      'Direct Memory Access (DMA): Peripheral-to-memory, memory-to-peripheral, circular mode, double buffering, DMA transfer complete interrupts'
    ],
    practiceExercise: 'Write a register-level I2C sensor driver for a digital temperature sensor (e.g. BMP280/MPU6050) using interrupt-driven state machines.',
    deliverable: 'C driver library without HAL dependencies, verified with a Saleae logic analyzer trace.',
    documentationPath: '/encyclopedia/Volume_09_Practical_Engineering_Labs/README.md'
  },
  {
    id: 'curr-emb-rtos-concurrency',
    discipline: 'embedded',
    field: 'rtos_firmware',
    number: 9,
    title: 'Real-Time Operating Systems (FreeRTOS) & Concurrency Architecture',
    tagline: 'Preemptive multitasking, task priorities, synchronization primitives, queues, and priority inversion.',
    targetRoles: ['RTOS Systems Engineer', 'Embedded Software Architect', 'Firmware Engineer'],
    estimatedHours: 75,
    whyItMatters: 'As embedded systems scale in complexity (IoT nodes, medical monitors, automotive ECUs), managing multiple asynchronous events requires deterministic real-time scheduling.',
    coreConcepts: [
      'RTOS Fundamentals: Determinism, Hard vs Soft real-time, Preemptive vs Cooperative scheduling, Tick interrupt',
      'Task Lifecycle & State Machine: Running, Ready, Blocked, Suspended states, `vTaskDelay` vs busy waiting',
      'Synchronization: Mutex (resource sharing, ownership, priority inheritance) vs Binary Semaphore (event signaling)',
      'Inter-Task Communication: Message Queues, Ring Buffers, Event Groups, Direct-to-Task Notifications (lightweight IPC)',
      'Concurrency Hazards: Race conditions, Deadlocks, Priority Inversion (Pathfinder bug), Resource starvation',
      'Memory Management: Heap_1 to Heap_5 allocation models, static task allocation (zero dynamic memory), stack overflow hook'
    ],
    practiceExercise: 'Build a multi-tasking data logger in FreeRTOS: Task 1 reads sensor, Task 2 logs to SD card, Task 3 runs CLI on UART, all communicating via queues.',
    deliverable: 'FreeRTOS firmware project running on hardware or QEMU with Segger SystemView execution tracing.',
    documentationPath: '/encyclopedia/Volume_10_Semiconductor_Resources/README.md'
  },
  {
    id: 'curr-emb-linux-bsp',
    discipline: 'embedded',
    field: 'embedded_linux_bsp',
    number: 10,
    title: 'Embedded Linux, Devicetree & Yocto Board Support Package (BSP)',
    tagline: 'Bootloader (U-Boot), Linux kernel configuration, Devicetree bindings, and custom Yocto distributions.',
    targetRoles: ['Embedded Linux Engineer', 'BSP Developer', 'Platform Software Engineer'],
    estimatedHours: 80,
    whyItMatters: 'High-end embedded devices (networking gateways, infotainment, smart cameras, robotics) run embedded Linux. BSP engineers bridge silicon boards to Linux user space.',
    coreConcepts: [
      'Embedded Linux Boot Chain: On-chip ROM bootloader -> Secondary Program Loader (SPL) -> U-Boot -> Kernel -> init/systemd',
      'U-Boot Mechanics: Environment variables, bootargs, TFTP/NFS network booting, FIT images (Flattened Image Tree)',
      'Devicetree Source (DTS/DTSI): Syntax, nodes, properties, reg, interrupts, clocks, pin-mux pinctrl bindings',
      'Linux Kernel Compilation: Cross-toolchains, `make menuconfig`, kernel modules (.ko), initramfs',
      'Yocto Project & OpenEmbedded: BitBake, metadata layers, recipes (.bb), machine configuration, building minimal images',
      'Root Filesystems: eMMC, NAND flash partitioning, ext4, UBIFS, SquashFS read-only systems'
    ],
    practiceExercise: 'Create a custom Yocto meta-layer for a BeagleBone Black or Raspberry Pi with custom kernel configuration and systemd service.',
    deliverable: 'Bootable custom Linux image created from scratch with custom Devicetree node for an external SPI display.',
    documentationPath: '/encyclopedia/Volume_11_Industry_Deep_Dive/README.md'
  }
];
