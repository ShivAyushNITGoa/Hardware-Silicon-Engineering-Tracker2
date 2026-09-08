import { FlagshipProject } from '../types';

export const flagshipProjects: FlagshipProject[] = [
  // ===================== VLSI PROJECTS =====================
  {
    id: 'proj-vlsi-riscv-core',
    discipline: 'vlsi',
    field: 'rtl_design',
    title: '32-bit Pipelined RISC-V (RV32I) Processor Core with Hazard Resolution',
    badge: 'VLSI RTL Design',
    targetRoles: ['RTL Design Engineer', 'Processor Microarchitect', 'FPGA Engineer'],
    difficulty: 'Advanced',
    summary: 'A synthesizable 5-stage pipelined RV32I base integer instruction set processor core implemented in SystemVerilog. Features full forwarding logic, branch hazard detection with stall insertion, parameterized memory interfaces, and testbench verification with compliance test suites.',
    architectureDetails: [
      '5-Stage Pipeline: IF (Instruction Fetch) -> ID (Decode & Register Read) -> EX (Execute / ALU) -> MEM (Data Memory) -> WB (Write-Back)',
      'Forwarding Unit: EX-to-EX and MEM-to-EX operand forwarding eliminating raw data hazard stalls',
      'Hazard Detection Unit: Load-Use data hazard detection inserting a single-cycle pipeline bubble',
      'Branch Resolution: Static branch prediction with pipeline flush on branch misprediction',
      'Standard Interfaces: Parameterized memory bus interface with byte-enable masking for LB/LH/LW instructions'
    ],
    hardwareSpecs: {
      'ISA': 'RISC-V RV32I Base Integer (37 instructions supported)',
      'Pipeline Depth': '5 Stages (Synchronous clocking with active-low reset)',
      'Frequency': '125 MHz on Xilinx Artix-7 FPGA (500 MHz on TSMC 28nm synthesis)',
      'Area / Resources': '~2,100 LUTs, 1,450 Flip-Flops on Artix-7 XC7A35T',
      'CPI': '1.15 CPI on standard Dhrystone benchmark'
    },
    skillsDemonstrated: [
      'Synthesizable SystemVerilog RTL coding',
      'Data forwarding and pipeline hazard resolution algorithms',
      'RISC-V instruction decoding and sign-extension logic',
      'Simulation & waveform debugging with Verilator and GTKWave'
    ],
    resumeBulletPoints: [
      'Architected and synthesized a 5-stage pipelined RV32I RISC-V processor in SystemVerilog, implementing full operand forwarding to minimize pipeline bubbles.',
      'Designed hazard detection unit resolving load-use stalls and branch misprediction flushes, achieving a 1.15 CPI on the Dhrystone benchmark.',
      'Verified microarchitecture against RISC-V architectural compliance test suites in Verilator and synthesized to Xilinx Artix-7 at 125 MHz.'
    ],
    githubStructure: [
      'rtl/core/ - rv32i_core.sv, if_stage.sv, id_stage.sv, ex_stage.sv, mem_stage.sv, wb_stage.sv',
      'rtl/hazard/ - forwarding_unit.sv, hazard_detection_unit.sv',
      'tb/ - rv32i_core_tb.sv, memory_model.sv',
      'tests/ - riscv-compliance/ test hex files and golden signature comparisons',
      'synth/ - yosys_synth.tcl, openlane/ config.json'
    ]
  },
  {
    id: 'proj-vlsi-uvm-axi-crossbar',
    discipline: 'vlsi',
    field: 'verification',
    title: 'Complete UVM 1.2 Verification Environment for Multi-Port AXI4-Stream Crossbar',
    badge: 'VLSI Verification (DV)',
    targetRoles: ['ASIC Verification Engineer (DV)', 'Pre-Silicon DV Engineer'],
    difficulty: 'Advanced',
    summary: 'An industry-standard Universal Verification Methodology (UVM) testbench verifying a 4x4 AXI4-Stream non-blocking crossbar switch. Includes constrained-random transaction generators, coverage models, SystemVerilog Assertions (SVA) for protocol compliance, and a golden scoreboard using TLM analysis FIFOs.',
    architectureDetails: [
      'UVM Environment: 4 Master Agents (active drivers/sequencers) and 4 Slave Agents (passive monitors and reactive responders)',
      'TLM 2.0 Analysis Hierarchy: Monitors broadcast observed packets through uvm_analysis_port to the scoreboard',
      'Scoreboard & Predictor: In-order and out-of-order packet checking with queue-based expected payload reordering',
      'Functional Coverage: Covergroups sampling destination address distribution, packet lengths, backpressure latency, and multi-port collision scenarios',
      'SystemVerilog Assertions (SVA): Handshake rules (TVALID cannot deassert until TREADY is asserted), TDATA stability during stall'
    ],
    hardwareSpecs: {
      'DUT': '4-Input, 4-Output Parameterized AXI4-Stream Interconnect Switch',
      'Verification Methodology': 'IEEE 1800.2 UVM 1.2 Standard with SystemVerilog',
      'Coverage Closure': '100% Functional Coverage & 99.4% Line/Branch/FSM Code Coverage',
      'Stimulus': 'Constrained-random virtual sequences with weighted burst distributions'
    },
    skillsDemonstrated: [
      'UVM component hierarchy design (Drivers, Monitors, Sequencers, Scoreboards)',
      'SystemVerilog OOP, Polymorphism, and Virtual Interfaces',
      'Concurrent SystemVerilog Assertions (SVA) for bus protocols',
      'Functional coverage model design and regression test plan execution'
    ],
    resumeBulletPoints: [
      'Developed a modular UVM 1.2 verification environment in SystemVerilog for a 4x4 AXI4-Stream crossbar switch with 4 active and 4 reactive agents.',
      'Implemented golden reference scoreboard with TLM analysis FIFOs, verifying zero packet loss across 100,000 randomized burst transactions.',
      'Authored 25+ concurrent SystemVerilog Assertions (SVA) verifying AXI protocol compliance and closed 100% functional and 99.4% code coverage.'
    ],
    githubStructure: [
      'tb/classes/ - axi_packet.sv, axi_driver.sv, axi_monitor.sv, axi_agent.sv, axi_env.sv',
      'tb/sequences/ - axi_base_seq.sv, axi_random_burst_seq.sv, axi_collision_seq.sv',
      'tb/coverage/ - axi_coverage_collector.sv',
      'tb/scoreboard/ - axi_scoreboard.sv',
      'sim/ - Makefile (VCS, Questa, Xcelium targets), run_regression.py'
    ]
  },
  {
    id: 'proj-vlsi-openlane-tapeout',
    discipline: 'vlsi',
    field: 'physical_design',
    title: 'SkyWater 130nm ASIC Tapeout Flow using OpenLane & Efabless Caravel',
    badge: 'VLSI Physical Design',
    targetRoles: ['Physical Design Engineer (PD)', 'ASIC Backend Engineer'],
    difficulty: 'Tapeout Ready',
    summary: 'A complete end-to-end physical design and tapeout flow implementation targeting the SkyWater 130nm open-source PDK. Successfully took an encrypted crypto-accelerator macro through synthesis, floorplanning, placement, clock tree synthesis, routing, and signoff DRC/LVS.',
    architectureDetails: [
      'RTL Synthesis: Gate-level mapping using Yosys with ABC optimization algorithms',
      'Floorplanning & Power Grid: 45% initial core utilization with dual-layer power rings and vertical/horizontal metal straps',
      'Placement & Optimization: RePlAce global placement followed by OpenDP legalizer and CTS buffer insertion via TritonCTS',
      'Detail Routing: FastRoute global routing and TritonRoute detailed routing with zero DRC antenna violations',
      'Physical Signoff: Magic and KLayout DRC checks, Netgen LVS, and static timing signoff using OpenSTA'
    ],
    hardwareSpecs: {
      'Process Node': 'SkyWater 130nm CMOS (1 Poly, 5 Metal layers)',
      'Die Area': '1.2mm x 1.2mm (Macro area within Efabless Caravel harness)',
      'Target Frequency': '50 MHz worst-case SS corner at 1.8V, 105C',
      'Static Slack': 'Setup WNS: +1.42ns | Hold WNS: +0.28ns (Signoff clean)',
      'DRC / LVS': '0 Magic DRC violations, 100% Netgen LVS netlist match'
    },
    skillsDemonstrated: [
      'OpenLane automated ASIC flow configuration and tuning',
      'Power distribution network (PDN) design and IR drop mitigation',
      'Clock tree synthesis (CTS) skew balancing and latency analysis',
      'Physical verification: DRC, LVS, Antenna rule fixes in KLayout'
    ],
    resumeBulletPoints: [
      'Executed complete Physical Design flow for an AES crypto-accelerator using OpenLane targeting SkyWater 130nm PDK, generating tapeout-ready GDSII.',
      'Optimized floorplan and power mesh geometry, achieving <2.1% dynamic IR drop and zero routing congestion across 5 metal layers.',
      'Closed static timing signoff at 50 MHz across all PVT corners with OpenSTA, eliminating all setup/hold violations and passing 100% DRC/LVS.'
    ],
    githubStructure: [
      'openlane/config.json - flow parameter overrides (FP_CORE_UTIL, CTS, ROUTING)',
      'src/ - aes_top.v, sbox.v, key_expansion.v',
      'sdc/ - constraints.sdc',
      'reports/ - opensta_timing.rpt, magic_drc.rpt, netgen_lvs.rpt',
      'gds/ - aes_macro.gds'
    ]
  },

  // ===================== EMBEDDED & FIRMWARE PROJECTS =====================
  {
    id: 'proj-emb-freertos-telemetry',
    discipline: 'embedded',
    field: 'rtos_firmware',
    title: 'FreeRTOS Multi-Tasking IoT Telemetry Node with Low-Power DVFS & Fault Recovery',
    badge: 'Embedded RTOS & Firmware',
    targetRoles: ['RTOS Systems Engineer', 'Firmware Engineer', 'Embedded Software Developer'],
    difficulty: 'Advanced',
    summary: 'A commercial-grade multi-threaded embedded firmware architecture designed for an ARM Cortex-M4 microcontroller running FreeRTOS. Features deterministic sensor sampling, queue-based inter-task communication, mutex-protected flash storage, tickless low-power sleep modes, and an independent watchdog supervisor task.',
    architectureDetails: [
      'Task 1: Sensor Acquisition Task (Preemptive, priority 3) reading I2C accelerometer and SPI temperature at 50Hz',
      'Task 2: Telemetry Processing & JSON Serialization Task (Priority 2) reading packets from FreeRTOS message queues',
      'Task 3: Wireless Uplink Task (Priority 2) transmitting payloads over UART/BLE with exponential backoff retry logic',
      'Task 4: Storage Task (Priority 1) logging time-stamped telemetry to SPI Flash utilizing a mutex-protected circular log file',
      'Task 5: Watchdog Supervisor Task (Highest Priority 4) checking health heartbeats from all tasks before kicking hardware IWDG'
    ],
    hardwareSpecs: {
      'Target MCU': 'STMicroelectronics STM32F401RE (ARM Cortex-M4 @ 84MHz) / ESP32-S3',
      'RTOS Kernel': 'FreeRTOS v10.4.6 with Tickless Idle Low-Power mode',
      'Average Current': '38 microamps in sleep mode | 14 mA during active RF transmission',
      'Memory Footprint': 'Flash: 48KB | RAM: 16KB allocated across static task stacks'
    },
    skillsDemonstrated: [
      'FreeRTOS task scheduling, priority assignment, and stack depth tuning',
      'Inter-process communication using thread-safe Queues and Mutexes',
      'Hardware Independent Watchdog (IWDG) system supervision',
      'Low-power microcontroller sleep mode transitions (Stop mode with RTC wakeup)'
    ],
    resumeBulletPoints: [
      'Architected a 5-task deterministic firmware application on STM32 using FreeRTOS, managing sensor acquisition, flash storage, and wireless telemetry.',
      'Implemented priority-inheritance mutexes and thread-safe queues, eliminating race conditions and avoiding priority inversion across asynchronous tasks.',
      'Integrated FreeRTOS tickless idle low-power mode and RTC alarm wakeups, slashing standby power consumption to 38 microamps.'
    ],
    githubStructure: [
      'Core/Src/ - main.c, freertos.c, stm32f4xx_it.c, syscalls.c',
      'Drivers/BSP/ - bmx160_sensor.c, spi_flash_w25q.c, ble_uart.c',
      'Middlewares/FreeRTOS/ - tasks.c, queue.c, list.c, port.c, heap_4.c',
      'App/ - telemetry_manager.c, storage_manager.c, watchdog_supervisor.c'
    ]
  },
  {
    id: 'proj-emb-linux-char-driver',
    discipline: 'embedded',
    field: 'device_drivers',
    title: 'Linux Kernel Character Device Driver with Interrupts & Circular DMA Ring Buffers',
    badge: 'Embedded Linux & Drivers',
    targetRoles: ['Linux Kernel Developer', 'Device Driver Engineer', 'BSP Engineer'],
    difficulty: 'Advanced',
    summary: 'A production Linux kernel character driver written in GNU C for custom hardware peripheral interfacing. Implements standard file operations (open, release, read, write, ioctl, poll, mmap), top-half/bottom-half interrupt handling using threaded IRQs, wait-queues for blocking I/O, and Devicetree hardware binding.',
    architectureDetails: [
      'Device Model: Character device registration with dynamic major/minor allocation via `alloc_chrdev_region`',
      'Interrupt Handling: Hardware IRQ top-half handles fast hardware acknowledge; threaded IRQ bottom-half copies data into circular ring buffer',
      'Non-blocking & Blocking I/O: Implements `poll` for select/epoll multiplexing and `wait_event_interruptible` for blocking reads',
      'Hardware Configuration via ioctl: Out-of-band commands for setting sampling rates, filter coefficients, and FIFO threshold registers',
      'Devicetree Integration: Compatible string matching (`of_match_table`), extracting IRQ number via `platform_get_irq`, and ioremap for MMIO registers'
    ],
    hardwareSpecs: {
      'Target Platform': 'ARM Cortex-A53 (Raspberry Pi 4 / BeagleBone Black / QEMU ARM)',
      'Kernel Version': 'Linux Kernel 6.1 LTS / 5.15 LTS',
      'Concurrency': 'Spinlock protection for IRQ bottom-half and mutex for user file operations',
      'Throughput': 'Zero-copy mmap achieves >45 MB/s data streaming without CPU load'
    },
    skillsDemonstrated: [
      'Linux kernel module development (LKM) and Makefile Kbuild system',
      'Safe user-to-kernel memory copies (`copy_to_user`, `copy_from_user`)',
      'Kernel concurrency synchronization (Spinlocks vs Mutexes vs Atomic variables)',
      'Devicetree Source (DTS) authoring and platform driver registration'
    ],
    resumeBulletPoints: [
      'Authored a Linux character device driver from scratch for high-speed sensor data capture, implementing open, read, write, ioctl, and poll syscalls.',
      'Engineered threaded interrupt handling and lockless circular ring buffers, ensuring zero packet drops at 10 kHz hardware interrupt rates.',
      'Authored Devicetree binding and platform driver matching in Linux Kernel 6.1 LTS, enabling automated device node instantiation via udev.'
    ],
    githubStructure: [
      'driver/ - sensor_char_dev.c, sensor_ioctl.h, Makefile (Kbuild)',
      'dts/ - custom_sensor_overlay.dts',
      'user_app/ - test_benchmark.c, live_monitor.py',
      'docs/ - driver_architecture.md, ioctl_spec.md'
    ]
  },
  {
    id: 'proj-emb-secure-bootloader',
    discipline: 'embedded',
    field: 'bare_metal',
    targetRoles: ['Bare-Metal Firmware Developer', 'Embedded Security Engineer'],
    title: 'Fail-Safe Bare-Metal Bootloader with Dual-Bank Flash & Cryptographic FOTA',
    badge: 'Bare-Metal & Embedded Security',
    difficulty: 'Advanced',
    summary: 'A bare-metal secondary bootloader for ARM Cortex-M microcontrollers executing directly after reset. Features dual-bank A/B firmware partitioning, SHA-256 integrity verification, vector table relocation to RAM, and fail-safe automated rollback if a new firmware image fails its self-test gate.',
    architectureDetails: [
      'Memory Partitioning: Sector 0: Bootloader (16KB) | Sector 1: Boot Metadata (16KB) | Bank A: Active App (240KB) | Bank B: Update App (240KB)',
      'Integrity & Authenticity: Computes hardware CRC32 and SHA-256 hash of application binary before jumping',
      'Vector Table Relocation: Sets ARM SCB->VTOR to the application base address in Flash before executing the jump sequence',
      'Safe Jump Mechanism: Disables all peripheral interrupts, resets SysTick, extracts initial Main Stack Pointer (MSP) from word 0, and jumps to Reset_Handler in word 1',
      'Fail-Safe Rollback: Boot metadata tracks boot attempt counter. If new firmware crashes or watchdogs 3 times, bootloader automatically reverts to Bank A'
    ],
    hardwareSpecs: {
      'Target Architecture': 'ARM Cortex-M4 (STM32F4) / RISC-V RV32',
      'Flash Footprint': '< 12 KB complete binary size (No vendor HAL bloat)',
      'Boot Overhead': '< 45 milliseconds verification latency at 84 MHz',
      'Communication': 'UART XMODEM-CRC16 / CAN-FD firmware flashing interface'
    },
    skillsDemonstrated: [
      'Microcontroller Flash memory sector unlocking, erasing, and programming in C',
      'ARM Cortex-M SCB->VTOR vector table relocation and MSP stack pointer configuration',
      'Function pointer casting for branching to application entry points',
      'Robust dual-bank fail-safe FOTA state machine design'
    ],
    resumeBulletPoints: [
      'Developed a 12KB bare-metal secondary bootloader in C for ARM Cortex-M4 with dual-bank flash partitioning and automated crash rollback.',
      'Implemented SHA-256 cryptographic image verification and ARM VTOR vector table relocation, booting validated applications in <45ms.',
      'Designed UART XMODEM firmware update protocol with flash write protection, deployed across 500+ field-upgraded microcontroller units.'
    ],
    githubStructure: [
      'bootloader/ - main.c, flash_if.c, sha256.c, jump_to_app.c, startup_stm32f4.s, linker.ld',
      'tools/ - packetizer.py (signs binary, appends header metadata and SHA-256 checksum)',
      'sample_app/ - blinky_app.c, app_linker.ld (offset for bank A/B)'
    ]
  }
];
