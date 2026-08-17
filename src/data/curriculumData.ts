import { CurriculumTrack } from '../types';

export const initialCurriculum: CurriculumTrack[] = [
  {
    id: 'embedded-firmware',
    name: 'Track 1: Embedded C & Firmware Architecture',
    category: 'Firmware & MCUs',
    description: 'Master pointers, memory layouts, peripheral register maps, interrupt safety, RTOS concurrency, power management, and clean layered architecture.',
    priority: 'Critical',
    plannedHours: 70,
    currentFocus: 'Drivers, modular C, debugging, FreeRTOS',
    nextGate: 'Finish hardware driver + unit test suite on real hardware',
    evidence: 'FireGuard v2 firmware codebase with clean HAL',
    topics: [
      {
        id: 'ec-1',
        stage: 1,
        title: 'C for Embedded Systems',
        whatToLearn: 'Pointers, pointer arithmetic, struct memory alignment, bitwise operations, memory maps, const vs volatile, enums, macros, compilation/linking.',
        whyItMatters: 'Firmware correctness and reliability depend on deep understanding of memory, registers, and volatile compiler optimization.',
        practiceExercise: 'Rewrite small FireGuard modules using warning-free, standard C (GCC -Wall -Wextra).',
        buildDeliverable: 'Driver utility library (bit manipulation macros, ring buffers, safe register read/modify/write helpers).',
        howToTest: 'Run automated host unit tests with address sanitizer + enforce 0 compiler warnings.',
        exitCriteria: 'Can explain memory/register behavior clearly on a whiteboard and write warning-clean C without IDE help.',
        priority: 'Critical',
        week: 'W1',
        subtopics: [
          { id: 'ec-1-1', title: 'Pointers & Memory Addresses', detail: 'Pointer dereferencing, casting integer addresses to volatile register pointers.' },
          { id: 'ec-1-2', title: 'Bitwise Masking & Bit Shifts', detail: 'Set, clear, toggle, and test specific register bitfields without side effects.' },
          { id: 'ec-1-3', title: 'Volatile Keyword Semantics', detail: 'Prevent compiler optimization on memory-mapped hardware I/O and shared ISR variables.' },
          { id: 'ec-1-4', title: 'Struct Packing & Memory Alignment', detail: 'Prevent compiler padding issues when mapping telemetry packet buffers.' },
          { id: 'ec-1-5', title: 'Exit Gate: C Memory & Bitwise Test', detail: 'Pass the timed C memory manipulation exam.', isExitGate: true }
        ]
      },
      {
        id: 'ec-2',
        stage: 2,
        title: 'Microcontroller Peripherals & Drivers',
        whatToLearn: 'GPIO, Hardware Timers, PWM generation, ADC sampling, UART, SPI, I2C; Polling vs Interrupt-driven modes.',
        whyItMatters: 'These peripherals form the physical interface layer between firmware and external electronics/sensors.',
        practiceExercise: 'Implement one peripheral driver at a time from register datasheet specifications.',
        buildDeliverable: 'ESP32/MCU driver modules for UART, SPI sensor, and PWM LED indicator.',
        howToTest: 'Perform hardware loopback tests, logic analyzer captures, and sensor read verification.',
        exitCriteria: 'Can choose and implement the correct peripheral architecture for any given sensor payload.',
        priority: 'Critical',
        week: 'W1-2',
        subtopics: [
          { id: 'ec-2-1', title: 'GPIO Configuration & Edge Triggers', detail: 'Configure input/output, pull-up/pull-down, open-drain, and edge interrupts.' },
          { id: 'ec-2-2', title: 'Hardware Timers & PWM Channels', detail: 'Configure prescalers, period registers, and duty cycles for actuators and precise timebases.' },
          { id: 'ec-2-3', title: 'ADC Sampling & Calibration', detail: 'Understand reference voltage, resolution, attenuation, and sampling non-linearities.' },
          { id: 'ec-2-4', title: 'Serial Interfaces: UART, SPI & I2C', detail: 'Implement master SPI transactions and I2C address/acknowledgement timing.' },
          { id: 'ec-2-5', title: 'Exit Gate: Multi-Peripheral Driver Suite', detail: 'Loopback and verify all 4 peripherals simultaneously.', isExitGate: true }
        ]
      },
      {
        id: 'ec-3',
        stage: 3,
        title: 'Interrupts, Timing & Race Conditions',
        whatToLearn: 'ISR rules, interrupt latency, context switching, debouncing, hardware watchdogs, race conditions, critical sections.',
        whyItMatters: 'Real embedded systems must respond predictably and deterministically without locking up or corrupting memory.',
        practiceExercise: 'Create a timer-driven sensor acquisition pipeline using ISR flags.',
        buildDeliverable: 'Interrupt-based sensor sampler with atomic ring buffer.',
        howToTest: 'Measure ISR execution time on oscilloscope; verify zero missed events during high-frequency stress.',
        exitCriteria: 'Can explain and debug interrupt priority, nested ISRs, and atomic access behavior.',
        priority: 'Critical',
        week: 'W2',
        subtopics: [
          { id: 'ec-3-1', title: 'ISR Safety Rules', detail: 'Keep ISRs minimal: no blocking delays, no dynamic allocation, no heavy I/O.' },
          { id: 'ec-3-2', title: 'Atomic Operations & Critical Sections', detail: 'Protect shared multi-byte variables using interrupt disable/enable masks.' },
          { id: 'ec-3-3', title: 'Hardware Watchdog Timer (WDT)', detail: 'Configure task and windowed watchdogs to recover cleanly from infinite loops.' },
          { id: 'ec-3-4', title: 'Exit Gate: Oscilloscope ISR Timing Proof', detail: 'Demonstrate <5us ISR latency on an oscilloscope or logic analyzer.', isExitGate: true }
        ]
      },
      {
        id: 'ec-4',
        stage: 4,
        title: 'Layered Firmware Architecture & State Machines',
        whatToLearn: 'Hardware Abstraction Layer (HAL), driver isolation, service layers, hierarchical state machines (FSMs), error recovery.',
        whyItMatters: 'Moves code from a fragile student prototype toward commercial, maintainable, modular firmware.',
        practiceExercise: 'Refactor monolithic code into clean HAL, Driver, Service, and Application layers.',
        buildDeliverable: 'FireGuard v2 modular firmware architecture.',
        howToTest: 'Static code review + fault injection testing across software layers.',
        exitCriteria: 'Can add a brand-new sensor or communication protocol without modifying existing application logic.',
        priority: 'High',
        week: 'W3',
        subtopics: [
          { id: 'ec-4-1', title: 'HAL & Driver Separation', detail: 'Decouple low-level chip register access from high-level sensor business logic.' },
          { id: 'ec-4-2', title: 'Table-Driven State Machines in C', detail: 'Implement state tables with function pointers for deterministic state transitions.' },
          { id: 'ec-4-3', title: 'Graceful Error Handling Enums', detail: 'Return descriptive status codes instead of silent magic numbers.' },
          { id: 'ec-4-4', title: 'Exit Gate: Modular Refactor Verification', detail: 'Swap physical sensor pins with zero application code changes.', isExitGate: true }
        ]
      },
      {
        id: 'ec-5',
        stage: 5,
        title: 'Systematic Firmware Debugging & Fault Isolation',
        whatToLearn: 'GDB commands, OpenOCD, serial logging levels, assert() verification, stack overflow detection, core dumps.',
        whyItMatters: 'Debugging speed and systematic root-cause analysis is the greatest multiplier for a firmware engineer.',
        practiceExercise: 'Inject 5 intentional pointer and memory faults and locate them via GDB/logs.',
        buildDeliverable: 'Fault-debug lab notes with stack trace analysis.',
        howToTest: 'Reproduce and systematically fix 5 simulated hard-fault crashes.',
        exitCriteria: 'Can diagnose a memory corruption or hard fault systematically using register dumps and backtraces.',
        priority: 'High',
        week: 'W3',
        subtopics: [
          { id: 'ec-5-1', title: 'GDB & Breakpoint Navigation', detail: 'Set hardware watchpoints, step into disassembly, and inspect memory addresses.' },
          { id: 'ec-5-2', title: 'HardFault Handler Analysis', detail: 'Read Link Register (LR), Program Counter (PC), and Configurable Fault Status (CFSR).' },
          { id: 'ec-5-3', title: 'Structured Log Levels', detail: 'Implement compile-time adjustable DEBUG, INFO, WARN, and ERROR log streams.' },
          { id: 'ec-5-4', title: 'Exit Gate: HardFault Root Cause Report', detail: 'Analyze and document a crash log with exact faulting line identification.', isExitGate: true }
        ]
      },
      {
        id: 'ec-6',
        stage: 6,
        title: 'RTOS Fundamentals (FreeRTOS)',
        whatToLearn: 'Tasks, priorities, preemptive scheduling, queues, semaphores, mutexes, priority inversion, thread safety.',
        whyItMatters: 'Modern IoT, automotive, and robotics edge systems rely on RTOS for concurrent multi-sensor acquisition and cloud streaming.',
        practiceExercise: 'Create a 3-task concurrent system (sensor sampling, data processing, telemetry streaming).',
        buildDeliverable: 'FreeRTOS mini-system on ESP32-S3 / ARM Cortex-M.',
        howToTest: 'Measure task execution times, queue high-water marks, and prove zero priority inversion deadlocks.',
        exitCriteria: 'Can accurately decide when to use an RTOS vs bare-metal superloop with quantitative rationale.',
        priority: 'High',
        week: 'W4',
        subtopics: [
          { id: 'ec-6-1', title: 'Task Creation & Priority Sizing', detail: 'Configure stack size, priorities, and vTaskDelayUntil for deterministic periods.' },
          { id: 'ec-6-2', title: 'Inter-Task Communication via Queues', detail: 'Pass data structures safely between producer and consumer tasks without globals.' },
          { id: 'ec-6-3', title: 'Mutexes & Priority Inheritance', detail: 'Protect shared I2C/SPI buses from priority inversion bugs.' },
          { id: 'ec-6-4', title: 'Exit Gate: 3-Task Concurrent FreeRTOS Build', detail: 'Run 24-hour test with zero stack overflows and zero task starvations.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'digital-rtl',
    name: 'Track 2: Digital Electronics & Synthesizable RTL',
    category: 'Digital Design & RTL',
    description: 'Hardware concurrency mental model, clean synthesizable SystemVerilog, state machine design, FIFO buffering, clock domain crossing (CDC), and timing-aware coding.',
    priority: 'Critical',
    plannedHours: 65,
    currentFocus: 'RTL thinking + SystemVerilog synthesis fundamentals',
    nextGate: 'Pass RTL fundamentals exit gate with synthesizable UART/FIFO/SPI IP',
    evidence: 'Flagship synthesizable SystemVerilog IP repository with testbenches',
    topics: [
      {
        id: 'rtl-1',
        stage: 1,
        title: 'RTL Mental Model & Concurrency',
        whatToLearn: 'Hardware concurrency execution; Registers vs combinational logic; Clock edges; Blocking (=) vs non-blocking (<=) assignments.',
        whyItMatters: 'Prevents writing software-like procedural RTL that infers unwanted latches, feedback loops, or inefficient silicon.',
        practiceExercise: 'Translate 10 software algorithms into clean concurrent hardware block diagrams.',
        buildDeliverable: 'RTL design notes and architecture diagrams.',
        howToTest: 'Simulate with ModelSim/Verilator; inspect generated synthesis netlist schematic.',
        exitCriteria: 'Can instantly identify combinational vs sequential logic in any code snippet without hesitation.',
        priority: 'Critical',
        week: 'W1',
        subtopics: [
          { id: 'rtl-1-1', title: 'Spatial Concurrency vs Sequential Flow', detail: 'Understand that all hardware always blocks evaluate simultaneously in parallel.' },
          { id: 'rtl-1-2', title: 'Flip-Flops vs Latches', detail: 'Avoid incomplete case/if statements that infer dangerous transparent latches.' },
          { id: 'rtl-1-3', title: 'Assignment Rules (= vs <=)', detail: 'Strict rule: use <= in clocked sequential blocks, = in pure combinational blocks.' },
          { id: 'rtl-1-4', title: 'Exit Gate: Zero-Latch Synthesis Proof', detail: 'Synthesize 5 modules and verify 0 inferred latches in synthesis log.', isExitGate: true }
        ]
      },
      {
        id: 'rtl-2',
        stage: 2,
        title: 'SystemVerilog for Synthesizable RTL',
        whatToLearn: 'always_comb, always_ff, always_latch, logic data type, typedef enums, package definitions, generate blocks, parameterized modules.',
        whyItMatters: 'SystemVerilog (IEEE 1800) is the global standard for modern RTL design and ASIC/FPGA production code.',
        practiceExercise: 'Implement a comprehensive suite of parameterized counters, decoders, priority encoders, and arithmetic ALUs.',
        buildDeliverable: 'Synthesizable SystemVerilog building blocks library.',
        howToTest: 'Run automated lint (Verilator --lint-only) and unit simulations.',
        exitCriteria: 'Writes warning-free synthesizable SystemVerilog adhering to industry style guides.',
        priority: 'Critical',
        week: 'W1',
        subtopics: [
          { id: 'rtl-2-1', title: 'always_comb and always_ff Enforcements', detail: 'Compiler guarantees simulation-synthesis consistency by checking sensitivity lists.' },
          { id: 'rtl-2-2', title: 'Typedef Enums for Hardware States', detail: 'Define explicit state names and encoding (one-hot, gray, binary).' },
          { id: 'rtl-2-3', title: 'Parameterized Modules (generics)', detail: 'Create bit-width agile arithmetic and register modules.' },
          { id: 'rtl-2-4', title: 'Exit Gate: Clean Lint & Test Suite', detail: 'Pass Verilator lint checks with zero warnings across 10 modules.', isExitGate: true }
        ]
      },
      {
        id: 'rtl-3',
        stage: 3,
        title: 'Finite State Machines (FSMs)',
        whatToLearn: 'Moore vs Mealy architectures, 2-process vs 3-process FSM coding style, safe default states, glitch-free registered outputs, state encoding.',
        whyItMatters: 'Control logic across microprocessors, bus arbiters, and network controllers is implemented as hardware FSMs.',
        practiceExercise: 'Design protocol FSMs for UART transmitter/receiver and SPI master controller.',
        buildDeliverable: 'Synthesizable UART and SPI controller FSM modules.',
        howToTest: 'Run directed and corner-case simulations; verify transition coverage with GTKWave waveforms.',
        exitCriteria: 'FSM passes all corner cases (aborted frames, noise glitch, reset in middle of transmission).',
        priority: 'Critical',
        week: 'W1-2',
        subtopics: [
          { id: 'rtl-3-1', title: 'Moore vs Mealy Output Timing', detail: 'Understand 1-cycle latency vs zero-cycle combinational glitch risks.' },
          { id: 'rtl-3-2', title: '3-Always Block FSM Template', detail: 'State register, next-state logic, and registered output logic cleanly decoupled.' },
          { id: 'rtl-3-3', title: 'One-Hot vs Binary Encoding Tradeoffs', detail: 'Optimize for FPGA LUT resources vs high-frequency ASIC timing.' },
          { id: 'rtl-3-4', title: 'Exit Gate: Glitch-Free Protocol FSM', detail: 'Simulate UART FSM and prove glitch-free registered output waveforms.', isExitGate: true }
        ]
      },
      {
        id: 'rtl-4',
        stage: 4,
        title: 'Synchronous FIFO & Stream Buffering',
        whatToLearn: 'Circular ring buffers in RTL, read/write pointers, full/empty flags, almost_full/almost_empty thresholds, backpressure signaling.',
        whyItMatters: 'FIFOs are the fundamental building blocks of streaming architectures, DSP pipelines, and CPU peripherals.',
        practiceExercise: 'Design a parameterized synchronous FIFO with dual-port RAM inference.',
        buildDeliverable: 'Reusable Synchronous FIFO IP module with valid/ready interface.',
        howToTest: 'Boundary stress tests: write while full, read while empty, simultaneous read+write.',
        exitCriteria: 'Zero overflow, underflow, or corrupted data under sustained burst transactions.',
        priority: 'Critical',
        week: 'W2',
        subtopics: [
          { id: 'rtl-4-1', title: 'Pointer Rollover & MSB Wrap Bit', detail: 'Use extra MSB bit to distinguish full from empty conditions cleanly.' },
          { id: 'rtl-4-2', title: 'Ready/Valid Handshake Protocol', detail: 'Implement standard AXI-Stream compatible backpressure flow control.' },
          { id: 'rtl-4-3', title: 'Watermark Thresholds', detail: 'Generate programmable almost_full flag for flow control pacing.' },
          { id: 'rtl-4-4', title: 'Exit Gate: Full FIFO Testbench Pass', detail: 'Run 100,000 random write/read cycles with zero transaction errors.', isExitGate: true }
        ]
      },
      {
        id: 'rtl-5',
        stage: 5,
        title: 'Clocking, Resets & Clock Domain Crossing (CDC)',
        whatToLearn: 'Synchronous vs asynchronous resets, reset synchronizers, metastability, MTBF, 2-FF synchronizer, Gray code pointers for Asynchronous FIFOs.',
        whyItMatters: 'Bad clock/reset and unhandled CDC causes intermittent, catastrophic, and hard-to-reproduce silicon failures.',
        practiceExercise: 'Analyze reset deassertion hazards and build a 2-FF reset synchronizer + Gray code async synchronizer.',
        buildDeliverable: 'CDC synchronizer library with synthesis timing directives.',
        howToTest: 'Simulate timing jitter and metastability; perform static CDC analysis.',
        exitCriteria: 'Can identify CDC hazards and correctly choose between 2-FF, handshake, or Async FIFO solutions.',
        priority: 'High',
        week: 'W3',
        subtopics: [
          { id: 'rtl-5-1', title: 'Reset Removal & Recovery Violations', detail: 'Implement a reset bridge (async assert, sync deassert).' },
          { id: 'rtl-5-2', title: 'Metastability & 2-FF Synchronizer', detail: 'Synchronize 1-bit control signals safely across asynchronous clock domains.' },
          { id: 'rtl-5-3', title: 'Gray Code Pointers for Async FIFOs', detail: 'Ensure only 1 bit flips per clock cycle across multi-bit domain crossings.' },
          { id: 'rtl-5-4', title: 'Exit Gate: Async FIFO Silicon Proof', detail: 'Simulate cross-clock transactions with mismatched clock frequencies (e.g. 50MHz to 148.5MHz).', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'fpga-toolflow',
    name: 'Track 3: FPGA Architecture & Vivado Toolflow',
    category: 'FPGA & Silicon Tools',
    description: 'Xilinx Vivado flow, LUT/FF/BRAM/DSP primitives, XDC physical/timing constraints, Static Timing Analysis (STA), Integrated Logic Analyzer (ILA), and AXI interfaces.',
    priority: 'Critical',
    plannedHours: 90,
    currentFocus: 'FPGA architecture, Vivado toolchain, bitstream bring-up',
    nextGate: 'Generate and debug first bitstream on physical FPGA board',
    evidence: 'FPGA lab repository with XDC constraints, timing reports, and ILA traces',
    topics: [
      {
        id: 'fpga-1',
        stage: 1,
        title: 'FPGA Architecture Primitives',
        whatToLearn: 'Lookup Tables (LUT6), Flip-Flops, CLB slices (SLICEL/SLICEM), Block RAM (BRAM36K), UltraRAM, DSP48E2 slices, Clock routing networks (BUFG).',
        whyItMatters: 'Understanding what hardware resources RTL actually maps to in silicon allows designing optimal, high-speed architectures.',
        practiceExercise: 'Inspect target FPGA datasheet and Vivado Device View; map simple RTL constructs to primitives.',
        buildDeliverable: 'Architecture mapping report comparing LUT vs DSP vs BRAM utilization.',
        howToTest: 'Synthesize module and inspect Vivado Utilization Report and Netlist Viewer.',
        exitCriteria: 'Can explain every primitive in a hardware slice and predict resource usage before running synthesis.',
        priority: 'Critical',
        week: 'W4',
        subtopics: [
          { id: 'fpga-1-1', title: 'LUT6 as 64-bit ROM / Function Table', detail: 'Understand how any 6-input boolean equation maps to 1 physical LUT.' },
          { id: 'fpga-1-2', title: 'Dedicated Carry Chains (CARRY8)', detail: 'Understand high-speed hardware fast carry lookahead logic for adders/comparators.' },
          { id: 'fpga-1-3', title: 'Dedicated Clock Buffers & PLLs', detail: 'Use MMCME4 / PLLE4 primitives for low-jitter clock synthesis and phase alignment.' },
          { id: 'fpga-1-4', title: 'Exit Gate: Primitive Mapping Verification', detail: 'Map a 32-bit counter and predict slice count within 5% accuracy.', isExitGate: true }
        ]
      },
      {
        id: 'fpga-2',
        stage: 2,
        title: 'Vivado Project & Synthesis Flow',
        whatToLearn: 'Vivado GUI and Tcl scripting, simulation, synthesis strategies, implementation (place & route), bitstream generation (.bit).',
        whyItMatters: 'A professional hardware engineer needs a deterministic, reproducible command-line and GUI build flow.',
        practiceExercise: 'Create a complete Vivado project from scratch for UART loopback.',
        buildDeliverable: 'First complete Vivado project with clean build logs.',
        howToTest: 'Generate bitstream without critical warnings; inspect implementation summary.',
        exitCriteria: 'Can go from raw RTL files to a working FPGA bitstream without consulting a tutorial or guide.',
        priority: 'Critical',
        week: 'W4',
        subtopics: [
          { id: 'fpga-2-1', title: 'Project vs Non-Project Batch Tcl Mode', detail: 'Run vivado -mode batch -source build.tcl for automated CI/CD.' },
          { id: 'fpga-2-2', title: 'Synthesis Strategies', detail: 'Compare AreaOptimized, Flow_PerfOptimized, and RuntimeOptimized.' },
          { id: 'fpga-2-3', title: 'Implementation & Routing Stages', detail: 'Understand opt_design, place_design, phys_opt_design, and route_design.' },
          { id: 'fpga-2-4', title: 'Exit Gate: Clean Bitstream Generation', detail: 'Produce a 0-critical-warning bitstream for an FPGA board.', isExitGate: true }
        ]
      },
      {
        id: 'fpga-3',
        stage: 3,
        title: 'Physical & Timing Constraints (XDC / SDC)',
        whatToLearn: 'Pin constraints (PACKAGE_PIN, IOSTANDARD like LVCMOS33), create_clock, set_input_delay, set_output_delay, false paths, multicycle paths.',
        whyItMatters: 'Without accurate constraints, hardware timing will fail randomly in physical silicon despite passing simulation.',
        practiceExercise: 'Write complete XDC constraint file for board clock, pushbuttons, LEDs, and UART header pins.',
        buildDeliverable: 'Production-ready XDC constraint file.',
        howToTest: 'Check Vivado Timing Summary report for 0 unconstrained endpoints and 0 setup/hold violations.',
        exitCriteria: 'Can write accurate physical and clock constraints for any target board and peripheral interface.',
        priority: 'Critical',
        week: 'W5',
        subtopics: [
          { id: 'fpga-3-1', title: 'Primary Clock Constraints', detail: 'Define create_clock -period 10.000 [get_ports sys_clk] with duty cycle.' },
          { id: 'fpga-3-2', title: 'I/O Pin Standard & Slew Rate', detail: 'Set IOSTANDARD LVCMOS33, DRIVE 8, SLEW FAST on output ports.' },
          { id: 'fpga-3-3', title: 'Timing Exceptions', detail: 'Apply set_false_path to asynchronous button inputs and static config pins.' },
          { id: 'fpga-3-4', title: 'Exit Gate: Timing Clean Implementation', detail: 'Achieve Worst Negative Slack (WNS) >= 0.000ns at target clock frequency.', isExitGate: true }
        ]
      },
      {
        id: 'fpga-4',
        stage: 4,
        title: 'Static Timing Analysis (STA) & Timing Closure',
        whatToLearn: 'Setup time (Tsu), hold time (Th), clock skew (Tskew), clock jitter, Worst Negative Slack (WNS), Total Negative Slack (TNS), critical path pipelining.',
        whyItMatters: 'Digital circuits must satisfy setup and hold inequalities across all process, voltage, and temperature (PVT) corners.',
        practiceExercise: 'Create a slow multi-stage combinational path, observe timing violation, and fix it using pipeline registers.',
        buildDeliverable: 'Before-and-after timing closure lab report.',
        howToTest: 'Compare Vivado Timing Report slack numbers before and after pipelining.',
        exitCriteria: 'Can clearly explain setup/hold slack equations and fix failing timing paths in silicon.',
        priority: 'Critical',
        week: 'W6',
        subtopics: [
          { id: 'fpga-4-1', title: 'Setup Time Inequality', detail: 'Tclk >= Tcq + Tcomb + Tsu - Tskew + Jitter.' },
          { id: 'fpga-4-2', title: 'Hold Time Inequality', detail: 'Tcq + Tcomb >= Th + Tskew (Hold violations are fatal and cannot be fixed by lowering clock frequency).' },
          { id: 'fpga-4-3', title: 'Critical Path Retiming', detail: 'Move flip-flop boundaries to balance combinational delays across pipeline stages.' },
          { id: 'fpga-4-4', title: 'Exit Gate: 100MHz+ Timing Closure Pass', detail: 'Close timing on a complex ALU datapath at 150MHz with positive slack.', isExitGate: true }
        ]
      },
      {
        id: 'fpga-5',
        stage: 5,
        title: 'Integrated Logic Analyzer (ILA) Real-Time Debugging',
        whatToLearn: 'ILA core insertion, trigger conditions, storage qualifiers, capture depth, sampling clock rules, debugging internal state on live FPGA.',
        whyItMatters: 'ILA is the embedded logic analyzer inside FPGA fabric—essential for catching hardware bugs that only appear on physical silicon.',
        practiceExercise: 'Debug an intermittent state machine bug in a UART/SPI transaction using ILA hardware triggers.',
        buildDeliverable: 'ILA debug trace report showing trigger sequence capture.',
        howToTest: 'Trigger on protocol error condition in Vivado Hardware Manager.',
        exitCriteria: 'Can locate and isolate a transient hardware bug from internal ILA waveform traces.',
        priority: 'High',
        week: 'W6',
        subtopics: [
          { id: 'fpga-5-1', title: 'ILA Core Parameterization', detail: 'Set probe widths, data depth (1024 to 8192 samples), and sample clock.' },
          { id: 'fpga-5-2', title: 'Complex Trigger Equations', detail: 'Trigger on state == ERROR && rx_valid == 1.' },
          { id: 'fpga-5-3', title: 'Hardware Session Debugging', detail: 'Capture and inspect waveforms in Vivado Hardware Manager over JTAG.' },
          { id: 'fpga-5-4', title: 'Exit Gate: Physical Silicon Bug Isolation', detail: 'Capture and document a live hardware trace of an error state.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'riscv-architecture',
    name: 'Track 4: Computer Architecture & RISC-V CPU Design',
    category: 'Processors & SoC',
    description: 'RV32I instruction set architecture, single-cycle datapath, 5-stage pipelined CPU (IF/ID/EX/MEM/WB), hazard detection, forwarding units, memory-mapped I/O (MMIO), and C-to-assembly toolchains.',
    priority: 'Critical',
    plannedHours: 70,
    currentFocus: 'RV32I ISA, datapath integration, pipelined CPU',
    nextGate: 'Complete functional RV32I CPU passing official RISC-V assembly tests',
    evidence: 'RV32I CPU core repository with instruction decoder, memory subsystem, and C test programs',
    topics: [
      {
        id: 'ca-1',
        stage: 1,
        title: 'RV32I Instruction Set Architecture (ISA)',
        whatToLearn: '32-bit RISC-V Base Integer ISA: R-type, I-type, S-type, B-type, U-type, J-type formats, opcodes, register file (x0-x31), PC logic.',
        whyItMatters: 'ISA is the fundamental mathematical contract between software compilers and physical silicon hardware.',
        practiceExercise: 'Manually decode sample 32-bit machine hex instructions into assembly mnemonics.',
        buildDeliverable: 'RV32I instruction decoder module and reference cheat-sheet.',
        howToTest: 'Run automated instruction decoder unit testbench across all 37 RV32I instructions.',
        exitCriteria: 'Can explain instruction bitfield encoding/decoding on a whiteboard without reference materials.',
        priority: 'Critical',
        week: 'W9',
        subtopics: [
          { id: 'ca-1-1', title: 'Instruction Formats & Immediate Generators', detail: 'Decode sign-extended 12-bit and 20-bit immediates for ALU, branches, and jumps.' },
          { id: 'ca-1-2', title: '32x32-bit Dual-Read Single-Write Register File', detail: 'Implement zero-hardwired x0 register and dual asynchronous read ports.' },
          { id: 'ca-1-3', title: 'Arithmetic Logic Unit (ALU)', detail: 'Implement ADD, SUB, SLT, SLTU, XOR, OR, AND, SLL, SRL, SRA operations.' },
          { id: 'ca-1-4', title: 'Exit Gate: Decoder Testbench 100% Pass', detail: 'Decode all 37 RV32I opcodes with 100% testbench coverage.', isExitGate: true }
        ]
      },
      {
        id: 'ca-2',
        stage: 2,
        title: 'Single-Cycle RV32I Processor Core',
        whatToLearn: 'Datapath and control logic integration; Program Counter update logic; Instruction memory & data memory interfaces; Branch decision logic.',
        whyItMatters: 'Building a working single-cycle CPU establishes the concrete foundation for all advanced processor pipelines and caches.',
        practiceExercise: 'Implement full single-cycle datapath executing arithmetic, load/store, and branching instructions.',
        buildDeliverable: 'RV32I single-cycle processor core.',
        howToTest: 'Execute assembly test programs (Fibonacci, GCD, array sorting) in simulation.',
        exitCriteria: 'Passes the defined standard RISC-V test assembly instruction suite.',
        priority: 'Critical',
        week: 'W10',
        subtopics: [
          { id: 'ca-2-1', title: 'Control Unit Decoder Logic', detail: 'Generate RegWrite, ALUSrc, MemWrite, MemRead, Branch, Jump control signals.' },
          { id: 'ca-2-2', title: 'Byte/Halfword/Word Load-Store Unit', detail: 'Handle sign-extension for LB/LBU/LH/LHU and alignment masks for SB/SH/SW.' },
          { id: 'ca-2-3', title: 'Branch & Jump Target Calculation', detail: 'Calculate PC-relative offsets for BEQ, BNE, BLT, BGE and JAL/JALR.' },
          { id: 'ca-2-4', title: 'Exit Gate: Assembly Test Suite Pass', detail: 'Run complete assembly test suite and verify final register values.', isExitGate: true }
        ]
      },
      {
        id: 'ca-3',
        stage: 3,
        title: '5-Stage Pipelined CPU (IF/ID/EX/MEM/WB)',
        whatToLearn: 'Pipelining concepts, pipeline registers, Structural hazards, Data hazards (Read-After-Write), Forwarding unit, Hazard detection & stalling, Branch prediction/flushing.',
        whyItMatters: 'Shows how modern processors achieve high clock frequencies and 1 instruction per cycle (IPC) throughput.',
        practiceExercise: 'Add pipeline registers and build the hazard detection + operand forwarding bypass network.',
        buildDeliverable: '5-Stage pipelined RV32I CPU core.',
        howToTest: 'Test code sequences with tight data dependencies (e.g. ADD x1, x2, x3 followed immediately by SUB x4, x1, x5).',
        exitCriteria: 'Can explain every pipeline hazard and demonstrate hardware forwarding without software NOPs.',
        priority: 'High',
        week: 'W11',
        subtopics: [
          { id: 'ca-3-1', title: 'Data Forwarding (EX->EX, MEM->EX)', detail: 'Bypass computed results directly into ALU inputs to eliminate stalls.' },
          { id: 'ca-3-2', title: 'Load-Use Hazard Stalling', detail: 'Insert a 1-cycle bubble when an instruction immediately depends on a preceding LOAD.' },
          { id: 'ca-3-3', title: 'Control Hazard Branch Flushing', detail: 'Flush IF/ID pipeline registers when a branch is taken (2-cycle branch penalty).' },
          { id: 'ca-3-4', title: 'Exit Gate: Hazard Verification Suite', detail: 'Execute hazard-heavy assembly program without corruption or unexpected stalls.', isExitGate: true }
        ]
      },
      {
        id: 'ca-4',
        stage: 4,
        title: 'Memory-Mapped I/O (MMIO) & SoC Integration',
        whatToLearn: 'Memory map decoding, peripheral address space, connecting custom UART, Timer, and GPIO peripherals to CPU bus.',
        whyItMatters: 'A processor core is useless in isolation; MMIO enables software to control physical actuators, sensors, and accelerators.',
        practiceExercise: 'Attach UART and LED controller to CPU memory bus; write C program to print "Hello World".',
        buildDeliverable: 'RV32I Microcontroller SoC.',
        howToTest: 'Compile C program with riscv32-unknown-elf-gcc, load hex into memory, observe UART output.',
        exitCriteria: 'Can add a custom memory-mapped accelerator to a CPU and write C code to control it.',
        priority: 'High',
        week: 'W10-12',
        subtopics: [
          { id: 'ca-4-1', title: 'Address Bus Decoder', detail: 'Route memory access to RAM (0x0000_0000) or Peripherals (0x8000_0000).' },
          { id: 'ca-4-2', title: 'C Runtime & Linker Script (.ld)', detail: 'Define stack pointer, text/data sections, and entry point reset vector.' },
          { id: 'ca-4-3', title: 'Hardware Peripheral C Header Drivers', detail: 'Define struct pointer wrappers: #define UART ((volatile uart_t*)0x80000000).' },
          { id: 'ca-4-4', title: 'Exit Gate: C Code Running on Custom Silicon', detail: 'Execute compiled C binary on simulated CPU and verify UART character transmission.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'digital-verification',
    name: 'Track 5: Digital Verification (UVM, SystemVerilog & cocotb)',
    category: 'Verification & QA',
    description: 'Modern verification methodologies: SystemVerilog Assertions (SVA), constrained-random testbenches, Python-driven HDL simulation with cocotb, and Universal Verification Methodology (UVM).',
    priority: 'High',
    plannedHours: 55,
    currentFocus: 'Testbenches, cocotb, UVM concepts, assertions',
    nextGate: 'Run automated regression test suite on CPU and FIFO cores with coverage metrics',
    evidence: 'Practical functional verification repository with CI regression workflows',
    topics: [
      {
        id: 'ver-1',
        stage: 1,
        title: 'Self-Checking Testbenches & Assertions (SVA)',
        whatToLearn: 'Stimulus generators, Device Under Test (DUT), golden models, automatic checking, immediate vs concurrent assertions ($assert, property).',
        whyItMatters: 'A design cannot be trusted without automated self-checking testbenches; assertions catch protocol bugs instantly.',
        practiceExercise: 'Write comprehensive assertions for FIFO full/empty rules and UART start/stop bit timings.',
        buildDeliverable: 'SystemVerilog self-checking testbench and assertion suite.',
        howToTest: 'Inject intentional RTL bugs; verify that assertions immediately flag the exact cycle of failure.',
        exitCriteria: 'Can build automated self-checking simulations that fail immediately upon protocol violation.',
        priority: 'Critical',
        week: 'W2-3',
        subtopics: [
          { id: 'ver-1-1', title: 'Immediate vs Concurrent Assertions', detail: 'Use assert property (@(posedge clk) disable iff (!rst_n) req |-> ##[1:5] ack).' },
          { id: 'ver-1-2', title: 'Golden Reference Checking', detail: 'Compare DUT output against a simple software queue model every cycle.' },
          { id: 'ver-1-3', title: 'Fault Injection Verification', detail: 'Inject 5 intentional bugs and prove 100% detection rate.' },
          { id: 'ver-1-4', title: 'Exit Gate: Injected Fault Catch Rate 100%', detail: 'Catch all 5 injected bugs in simulation with zero false positives.', isExitGate: true }
        ]
      },
      {
        id: 'ver-2',
        stage: 2,
        title: 'Python-Driven Verification with cocotb',
        whatToLearn: 'cocotb framework, async/await coroutines, Clock generator, driving and monitoring pin values, transactions, Python reference models.',
        whyItMatters: 'cocotb allows rapid, powerful hardware verification using Python libraries (NumPy, SciPy, PyTorch) without slow manual HDL coding.',
        practiceExercise: 'Build a cocotb testbench for UART, FIFO, and FIR filter modules.',
        buildDeliverable: 'cocotb automated regression test suite.',
        howToTest: 'Run pytest / make in terminal; view automated pass/fail results.',
        exitCriteria: 'Can test complex RTL modules using Python coroutines and automated test runners.',
        priority: 'High',
        week: 'W4',
        subtopics: [
          { id: 'ver-2-1', title: 'cocotb Coroutines & Clocks', detail: 'Use Timer, RisingEdge, and Clock(dut.clk, 10, units="ns").start().' },
          { id: 'ver-2-2', title: 'Driver & Monitor Classes in Python', detail: 'Decouple transaction generation from signal-level pin wiggling.' },
          { id: 'ver-2-3', title: 'NumPy Golden Model Comparison', detail: 'Compare hardware FIR filter output against scipy.signal.lfilter in floating point.' },
          { id: 'ver-2-4', title: 'Exit Gate: Python Regression Pass', detail: 'Run 1,000 randomized transaction packets through DUT with zero errors.', isExitGate: true }
        ]
      },
      {
        id: 'ver-3',
        stage: 3,
        title: 'Universal Verification Methodology (UVM) & PyUVM',
        whatToLearn: 'UVM architecture: Driver, Monitor, Sequencer, Sequence, Agent, Scoreboard, Environment; Transaction-Level Modeling (TLM); Functional coverage.',
        whyItMatters: 'UVM is the global industry-standard verification architecture used across all major semiconductor companies (Intel, Qualcomm, NVIDIA).',
        practiceExercise: 'Build a minimal PyUVM verification environment for a parameterized FIFO or ALU.',
        buildDeliverable: 'PyUVM modular verification environment.',
        howToTest: 'Run regression suite and generate functional coverage report.',
        exitCriteria: 'Can clearly explain the UVM phase mechanism and transaction pipeline in technical interviews.',
        priority: 'High',
        week: 'W11',
        subtopics: [
          { id: 'ver-3-1', title: 'UVM Component Hierarchy', detail: 'Understand uvm_driver, uvm_monitor, uvm_scoreboard, and uvm_env.' },
          { id: 'ver-3-2', title: 'TLM Analysis Ports & FIFOs', detail: 'Broadcast monitored transactions to scoreboards without tight coupling.' },
          { id: 'ver-3-3', title: 'Functional Coverage (Covergroups & Coverpoints)', detail: 'Track which corner cases and state combinations were actually exercised.' },
          { id: 'ver-3-4', title: 'Exit Gate: Functional Coverage Report', detail: 'Achieve >90% functional coverage on target FIFO/ALU block.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'dsp-fixedpoint',
    name: 'Track 6: DSP, Fixed-Point Math & Hardware Acceleration',
    category: 'DSP & Acceleration',
    description: 'Digital Signal Processing fundamentals, discrete convolution, FIR/FFT architectures, Q-format fixed-point quantization, LUT approximation of nonlinear functions, and streaming pipelines.',
    priority: 'High',
    plannedHours: 65,
    currentFocus: 'Sampling, FIR filters, fixed-point math, LUT accelerators',
    nextGate: 'Implement FIR filter baseline & LUT-based nonlinear function accelerator',
    evidence: 'FPGA fixed-point DSP repository with MATLAB/Python floating-point reference models',
    topics: [
      {
        id: 'dsp-1',
        stage: 1,
        title: 'Sampling Theory & Discrete Filters',
        whatToLearn: 'Nyquist-Shannon sampling theorem, aliasing, ADC quantization noise, discrete convolution, FIR filter delay lines, impulse response.',
        whyItMatters: 'Essential for processing sensor telemetry, audio, biomedical signals, and radar data in real time.',
        practiceExercise: 'Compute convolution and design a low-pass FIR filter in Python/MATLAB.',
        buildDeliverable: 'Python DSP reference notebook and coefficient generator.',
        howToTest: 'Verify frequency response and attenuation in Python plots.',
        exitCriteria: 'Can choose a safe sampling rate and calculate FIR filter coefficients for given specs.',
        priority: 'High',
        week: 'W6-8',
        subtopics: [
          { id: 'dsp-1-1', title: 'Sampling Rate & Anti-Aliasing', detail: 'Understand Fs >= 2 * Fmax and analog front-end low-pass requirements.' },
          { id: 'dsp-1-2', title: 'Direct-Form vs Transposed-Form FIR', detail: 'Compare critical path and DSP slice mapping in FPGA fabric.' },
          { id: 'dsp-1-3', title: 'Windowed Sinc Filter Design', detail: 'Generate Hamming/Hann windowed coefficients for sharp cutoff.' },
          { id: 'dsp-1-4', title: 'Exit Gate: Filter Reference Model Pass', detail: 'Generate 16-tap low-pass filter and prove >40dB stopband attenuation.', isExitGate: true }
        ]
      },
      {
        id: 'dsp-2',
        stage: 2,
        title: 'Fixed-Point Math & Q-Format Quantization',
        whatToLearn: 'Q-format notation (e.g. Q4.12, Q1.15), two\'s complement arithmetic, fixed-point multiplication bit growth, scaling, truncation vs rounding, saturation arithmetic.',
        whyItMatters: 'Floating-point hardware is massive and slow; fixed-point enables high-speed, low-power FPGA/ASIC math execution.',
        practiceExercise: 'Convert floating-point FIR filter and neural network activations to Q-format in SystemVerilog.',
        buildDeliverable: 'Fixed-point arithmetic module library (add, mult, sat, quantize).',
        howToTest: 'Compare fixed-point hardware output against double-precision floating-point; calculate Signal-to-Quantization-Noise Ratio (SQNR).',
        exitCriteria: 'Can bound and explain fixed-point quantization error mathematically.',
        priority: 'Critical',
        week: 'W14-15',
        subtopics: [
          { id: 'dsp-2-1', title: 'Q-Format Representation & Bit Shifts', detail: 'Multiply two Q4.12 numbers to get Q8.24, then scale back to Q4.12.' },
          { id: 'dsp-2-2', title: 'Hardware Saturation Logic', detail: 'Prevent catastrophic overflow wrap-around by clamping to MAX_INT / MIN_INT.' },
          { id: 'dsp-2-3', title: 'Quantization Error Analysis', detail: 'Quantify mean squared error (MSE) across dynamic range.' },
          { id: 'dsp-2-4', title: 'Exit Gate: SQNR Metric Proof', detail: 'Demonstrate <0.5% error relative to floating-point reference.', isExitGate: true }
        ]
      },
      {
        id: 'dsp-3',
        stage: 3,
        title: 'LUT-Based Nonlinear Function Acceleration',
        whatToLearn: 'Lookup Table (LUT) approximation of expensive functions (GELU, Sigmoid, Exp, Sqrt, Sine/Cosine), linear interpolation, BRAM vs Distributed RAM tradeoffs.',
        whyItMatters: 'Enables real-time evaluation of transcendental functions in AI models and signal processing without heavy arithmetic hardware.',
        practiceExercise: 'Generate a 256-entry lookup table for GELU/Sigmoid activation with hardware linear interpolation.',
        buildDeliverable: 'LUT-based ML Activation Accelerator IP.',
        howToTest: 'Run automated error sweep across entire input domain [-8.0 to +8.0].',
        exitCriteria: 'Approximation accuracy meets target error specification with 10x throughput speedup over CPU software.',
        priority: 'High',
        week: 'W15',
        subtopics: [
          { id: 'dsp-3-1', title: 'ROM Table Generation Script (Python)', detail: 'Generate synthesizable SystemVerilog initial memory file (.mem / .coe).' },
          { id: 'dsp-3-2', title: 'Linear Interpolator Hardware', detail: 'Y = Y0 + (X - X0) * Slope to achieve high precision with compact table.' },
          { id: 'dsp-3-3', title: 'Pipeline Latency & Throughput Optimization', detail: 'Achieve 1 result per clock cycle initiation interval.' },
          { id: 'dsp-3-4', title: 'Exit Gate: Activation Accelerator Benchmark', detail: 'Pass maximum absolute error < 0.01 across full test range.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'edge-ai-codesign',
    name: 'Track 7: Edge AI & Hardware/Software Co-Design',
    category: 'Edge AI & Acceleration',
    description: 'Machine learning model quantization (INT8/FP8), systolic MAC arrays, AXI4-Lite/AXI4-Stream protocols, ARM PS to FPGA PL data movement, and end-to-end Edge AI capstone.',
    priority: 'High',
    plannedHours: 55,
    currentFocus: 'Model quantization, AXI control registers, CPU/FPGA data movement',
    nextGate: 'Complete integrated Edge-AI Capstone with live hardware demo',
    evidence: 'Flagship Edge-AI FPGA accelerator repository with measured latency and speedup benchmarks',
    topics: [
      {
        id: 'ai-1',
        stage: 1,
        title: 'Sensor Machine Learning & Quantization',
        whatToLearn: 'Time-series feature extraction (FFT energy, variance, zero-crossing), tiny classifiers, Post-Training Quantization (PTQ), weight & activation scaling.',
        whyItMatters: 'Edge devices have limited memory and power; models must be optimized before mapping to silicon.',
        practiceExercise: 'Train a baseline anomaly/classification model on sensor data; quantize to INT8.',
        buildDeliverable: 'Quantized neural network weights and reference software inference model.',
        howToTest: 'Evaluate accuracy on holdout test dataset before and after quantization.',
        exitCriteria: 'Can quantify accuracy tradeoff vs compute savings and explain model limits.',
        priority: 'High',
        week: 'W13-15',
        subtopics: [
          { id: 'ai-1-1', title: 'Time-Series Feature Extraction', detail: 'Extract mean, variance, peak-to-peak, and spectral energy features.' },
          { id: 'ai-1-2', title: 'Post-Training INT8 Quantization', detail: 'Map 32-bit float weights and biases to 8-bit integers with zero-point scaling.' },
          { id: 'ai-1-3', title: 'Confusion Matrix & Error Analysis', detail: 'Evaluate false positive / false negative rates on edge test cases.' },
          { id: 'ai-1-4', title: 'Exit Gate: Quantized Model Accuracy Pass', detail: 'Preserve >95% of floating-point baseline accuracy in INT8.', isExitGate: true }
        ]
      },
      {
        id: 'ai-2',
        stage: 2,
        title: 'Hardware/Software Partitioning & AXI Protocols',
        whatToLearn: 'Deciding what belongs in software (CPU) vs hardware (FPGA); AMBA AXI4-Lite (memory-mapped registers) and AXI4-Stream (high-bandwidth DMA pipelines).',
        whyItMatters: 'Hardware/software co-design is the key differentiator for high-value silicon architecture roles.',
        practiceExercise: 'Wrap custom hardware accelerator in an AXI-Lite control register interface.',
        buildDeliverable: 'AXI-controlled hardware accelerator IP.',
        howToTest: 'Host software writes configuration registers, triggers start bit, and polls done flag.',
        exitCriteria: 'Can explain AXI-Lite and AXI-Stream handshakes and justify architectural partitioning with numbers.',
        priority: 'Critical',
        week: 'W16-18',
        subtopics: [
          { id: 'ai-2-1', title: 'AXI-Lite 5-Channel Architecture', detail: 'Read Address (AR), Read Data (R), Write Address (AW), Write Data (W), Write Response (B).' },
          { id: 'ai-2-2', title: 'AXI-Stream Valid/Ready Handshaking', detail: 'Transfer streaming packets without address overhead for maximum throughput.' },
          { id: 'ai-2-3', title: 'Hardware/Software Partitioning Analysis', detail: 'Calculate memory bandwidth and PCIe/AXI transfer latency vs compute speedup.' },
          { id: 'ai-2-4', title: 'Exit Gate: AXI Register Interface Pass', detail: 'C program on CPU successfully configures and reads accelerator registers.', isExitGate: true }
        ]
      },
      {
        id: 'ai-3',
        stage: 3,
        title: 'Flagship Edge-AI Capstone Integration',
        whatToLearn: 'End-to-end integration: Sensor -> MCU/CPU -> AXI Data Movement -> FPGA Accelerator -> Decision -> Cloud Dashboard.',
        whyItMatters: 'Combines Ayush’s existing embedded/IoT strengths with new FPGA/RTL skills to create an unbeatable portfolio proof.',
        practiceExercise: 'Connect physical sensor to host MCU, stream data into FPGA accelerator, and publish telemetry.',
        buildDeliverable: 'Flagship Edge-AI Hardware/Software Co-Design Capstone.',
        howToTest: 'Run 5 consecutive end-to-end physical demos with latency and power measurements.',
        exitCriteria: 'Repeatable, reproducible 1-command demo with measured 5x+ hardware speedup over pure software.',
        priority: 'Critical',
        week: 'W19-21',
        subtopics: [
          { id: 'ai-3-1', title: 'End-to-End System Pipeline', detail: 'Live sensor data stream processed by FPGA accelerator in real time.' },
          { id: 'ai-3-2', title: 'Quantified Speedup & Power Metrics', detail: 'Measure execution time in microseconds: CPU software vs FPGA hardware.' },
          { id: 'ai-3-3', title: 'Technical Architecture Report & Video', detail: 'Record 2-minute clear technical demo video explaining architecture and results.' },
          { id: 'ai-3-4', title: 'Exit Gate: 5/5 Successful Live Demo Runs', detail: 'Complete 5 live physical runs without glitches or crashes.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'iot-telemetry',
    name: 'Track 8: IoT Systems & Production Telemetry',
    category: 'IoT & Cloud Telemetry',
    description: 'MQTT protocols, TLS encryption, packet serialization, OTA firmware updates, power profiling, and cloud dashboard synchronization (FireGuard evolution).',
    priority: 'High',
    plannedHours: 45,
    currentFocus: 'ESP32-S3, MQTT QoS, packet serialization, deep sleep',
    nextGate: 'Complete reliable 48-hour continuous telemetry stream with zero dropped packets',
    evidence: 'Production IoT telemetry firmware with automated reconnection and failover',
    topics: [
      {
        id: 'iot-1',
        stage: 1,
        title: 'Network Protocols & Secure Telemetry (MQTT/TLS)',
        whatToLearn: 'MQTT QoS 0/1/2, Keep-Alive, Last Will and Testament (LWT), TLS 1.3 certificate validation, binary serialization (Protocol Buffers / compact JSON).',
        whyItMatters: 'Industrial and commercial IoT systems require bulletproof network reconnect logic and tamper-proof telemetry streams.',
        practiceExercise: 'Implement exponential backoff reconnect logic with persistent local flash buffering during WiFi outages.',
        buildDeliverable: 'Resilient MQTT telemetry client library.',
        howToTest: 'Inject random network drops and verify zero lost sensor packets upon reconnection.',
        exitCriteria: 'System withstands router reboots and network loss without losing data or locking up.',
        priority: 'High',
        week: 'W3-4',
        subtopics: [
          { id: 'iot-1-1', title: 'MQTT QoS Levels & Retries', detail: 'Choose QoS 1 for critical alarm packets and QoS 0 for high-rate sensor streams.' },
          { id: 'iot-1-2', title: 'Local Ring-Buffer Flash Storage', detail: 'Spool telemetry to SPI Flash when internet is disconnected.' },
          { id: 'iot-1-3', title: 'TLS Hardware Acceleration on ESP32-S3', detail: 'Use internal cryptographic engine for low-latency TLS handshakes.' },
          { id: 'iot-1-4', title: 'Exit Gate: 1,000 Packet Stress Drop Test', detail: 'Verify 0 dropped packets during 10 forced network disconnections.', isExitGate: true }
        ]
      },
      {
        id: 'iot-2',
        stage: 2,
        title: 'Power Optimization & Deep Sleep Modes',
        whatToLearn: 'ESP32/MCU power domains, Light Sleep vs Deep Sleep, ULP coprocessor, RTC memory retention, wakeup sources (Timer, GPIO, Touch).',
        whyItMatters: 'Extends battery life from hours to months in remote sensing and battery-powered hardware products.',
        practiceExercise: 'Optimize sensor node to draw <50uA in sleep and wake up periodically to sample and transmit.',
        buildDeliverable: 'Ultra-low-power firmware profile.',
        howToTest: 'Measure sleep current using a digital multimeter or Nordic Power Profiler Kit.',
        exitCriteria: 'Meets sleep current budget with clean wake-up and fast transmission cycles.',
        priority: 'Medium',
        week: 'W5',
        subtopics: [
          { id: 'iot-2-1', title: 'Peripheral Power Gate Controls', detail: 'Disable unused internal oscillators, radios, and external sensor pull-ups.' },
          { id: 'iot-2-2', title: 'RTC Fast/Slow Memory Preservation', detail: 'Store rolling calibration parameters across deep sleep wakeups.' },
          { id: 'iot-2-3', title: 'Exit Gate: <50uA Sleep Current Verification', detail: 'Confirm current draw with bench multimeter in sleep state.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'power-electronics',
    name: 'Track 9: Power Electronics, Gate Drivers & Simulation',
    category: 'Hardware & Power',
    description: 'MOSFET switching characteristics, gate driver design, buck/boost converters, thermal dissipation, feedback control loops, and LTspice circuit simulation.',
    priority: 'Medium',
    plannedHours: 40,
    currentFocus: 'MOSFET switching, gate charge (Qg), buck converter design in LTspice',
    nextGate: 'Complete LTspice simulation of synchronous buck converter with closed-loop regulation',
    evidence: 'LTspice simulation models, schematic library, and design calculations',
    topics: [
      {
        id: 'pwr-1',
        stage: 1,
        title: 'MOSFET Switching & Gate Driver Design',
        whatToLearn: 'Rds(on), Gate Charge (Qg), Miller plateau, switching losses vs conduction losses, high-side vs low-side gate drivers, bootstrap circuits.',
        whyItMatters: 'Essential for power converters, motor drives, EV powertrains, and hardware interface protection.',
        practiceExercise: 'Calculate switching times, gate resistor values, and power dissipation for a power MOSFET stage.',
        buildDeliverable: 'Gate driver design calculation sheet and schematic.',
        howToTest: 'Simulate gate voltage rise/fall waveforms in LTspice; verify zero shoot-through.',
        exitCriteria: 'Can size gate resistors, calculate power losses, and explain bootstrap capacitor sizing on a whiteboard.',
        priority: 'High',
        week: 'W7-8',
        subtopics: [
          { id: 'pwr-1-1', title: 'Gate Charge (Qg) & Peak Current Math', detail: 'I_peak = V_gate / (R_driver + R_gate_internal + R_gate_ext).' },
          { id: 'pwr-1-2', title: 'Dead-Time Insertion', detail: 'Prevent catastrophic shoot-through current in half-bridge configurations.' },
          { id: 'pwr-1-3', title: 'Bootstrap Diode & Capacitor Sizing', detail: 'Ensure high-side gate driver maintains Vgs > Vth during continuous high duty cycles.' },
          { id: 'pwr-1-4', title: 'Exit Gate: LTspice Half-Bridge Simulation', detail: 'Demonstrate clean switching with zero shoot-through current spikes.', isExitGate: true }
        ]
      },
      {
        id: 'pwr-2',
        stage: 2,
        title: 'DC-DC Converters & Feedback Control',
        whatToLearn: 'Buck, Boost, Buck-Boost topologies, Continuous Conduction Mode (CCM) vs DCM, inductor ripple current, output capacitor ESR, voltage feedback loop.',
        whyItMatters: 'Power supplies are in every hardware product; understanding stability and ripple prevents noisy silicon malfunctions.',
        practiceExercise: 'Design and simulate a 12V to 3.3V / 3A synchronous buck converter in LTspice.',
        buildDeliverable: 'Complete LTspice buck converter model with transient response analysis.',
        howToTest: 'Simulate step-load response (0.5A to 2.5A step); verify voltage undershoot < 5% and stable phase margin.',
        exitCriteria: 'Can size inductor, capacitor, and feedback resistors from first principles equations.',
        priority: 'Medium',
        week: 'W9',
        subtopics: [
          { id: 'pwr-2-1', title: 'Inductor & Output Cap Sizing Equations', detail: 'L = (Vin - Vout) * Vout / (Vin * Fsw * Delta_I).' },
          { id: 'pwr-2-2', title: 'Transient Step-Load Analysis', detail: 'Measure output voltage recovery time during sudden current jumps.' },
          { id: 'pwr-2-3', title: 'Exit Gate: LTspice Step-Load Pass', detail: 'Achieve <50mV output ripple at 3A load with fast settling time.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'engineering-hygiene',
    name: 'Track 10: Engineering Hygiene, GitHub & Documentation',
    category: 'Engineering Best Practices',
    description: 'Git branch workflows, automated CI/CD for hardware/firmware, professional README standards, architecture block diagrams, and reproducible build scripts.',
    priority: 'Critical',
    plannedHours: 30,
    currentFocus: 'Clean Git repos, architecture diagrams, video demos, reproducibility',
    nextGate: 'All 3 flagship repositories have polished READMEs, architecture diagrams, and 1-command build scripts',
    evidence: 'GitHub repositories with automated GitHub Actions CI and clean release artifacts',
    topics: [
      {
        id: 'hyg-1',
        stage: 1,
        title: 'Repository Architecture & Reproducibility',
        whatToLearn: 'Clean directory structure (/rtl, /tb, /fw, /docs, /scripts), .gitignore for EDA/IDE artifacts, Makefile / CMake build automation.',
        whyItMatters: 'Recruiters and hiring managers spend 60 seconds reviewing a repository; clean structure signals senior engineering maturity.',
        practiceExercise: 'Standardize all project repositories with single-command make test and make sim targets.',
        buildDeliverable: 'Standard repository template and automated build scripts.',
        howToTest: 'Clone repo onto a fresh Linux container and execute build with zero manual interventions.',
        exitCriteria: 'Anyone can clone the repository and run the test suite in one command without missing dependencies.',
        priority: 'Critical',
        week: 'W1-2',
        subtopics: [
          { id: 'hyg-1-1', title: 'EDA Artifact .gitignore Rules', detail: 'Filter out .jou, .log, .wdb, .vcd, and vivado transient folders.' },
          { id: 'hyg-1-2', title: 'Unified Makefile / Tcl Scripts', detail: 'Implement make sim, make synth, make lint commands.' },
          { id: 'hyg-1-3', title: 'Professional README Architecture Diagrams', detail: 'Create clean datapath block diagrams using Draw.io / Mermaid.' },
          { id: 'hyg-1-4', title: 'Exit Gate: 1-Command Clean Build Proof', detail: 'Clone repo in fresh directory and verify single-command test execution.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'interview-prep',
    name: 'Track 11: Core Interview Prep & Whiteboard Defense',
    category: 'Interview Mastery',
    description: 'Whiteboard RTL design, setup/hold timing derivations, C pointer puzzles, RTOS concurrency questions, architecture tradeoffs, and project defense.',
    priority: 'Critical',
    plannedHours: 50,
    currentFocus: 'Timed problem-solving, whiteboard design, crisp project explanations',
    nextGate: 'Complete 10 mock technical interviews covering Digital, Embedded, and System Architecture',
    evidence: 'Comprehensive technical interview answer book and solved problem sets',
    topics: [
      {
        id: 'int-1',
        stage: 1,
        title: 'RTL & Digital Design Interview Drills',
        whatToLearn: 'FSM design on whiteboard, sequence detectors, FIFO depth calculation, Gray code conversions, setup/hold timing equations, metastability.',
        whyItMatters: 'Standard technical screen for RTL Design, ASIC Verification, and FPGA roles at Qualcomm, Intel, NVIDIA, and startups.',
        practiceExercise: 'Solve 30 classic digital design interview problems under timed conditions (15 mins each).',
        buildDeliverable: 'Digital Design Interview Playbook with hand-drawn solutions.',
        howToTest: 'Record mock interview sessions and critique explanations for clarity and technical precision.',
        exitCriteria: 'Can solve and explain any standard digital design question cleanly on a whiteboard in under 12 minutes.',
        priority: 'Critical',
        week: 'W8-12',
        subtopics: [
          { id: 'int-1-1', title: 'FIFO Depth Calculation Formula', detail: 'Calculate required depth given burst length, write rate, read rate, and read delays.' },
          { id: 'int-1-2', title: 'Setup & Hold Time Whiteboard Derivation', detail: 'Derive maximum operating frequency and minimum combinational delay equations.' },
          { id: 'int-1-3', title: 'Overlapping Sequence Detector FSM', detail: 'Design Moore and Mealy state diagrams for patterns like 1011 or 1101.' },
          { id: 'int-1-4', title: 'Exit Gate: 15-Minute Timed Mock Screen', detail: 'Solve 3 unfamiliar digital questions with zero errors under time pressure.', isExitGate: true }
        ]
      },
      {
        id: 'int-2',
        stage: 2,
        title: 'Embedded Systems & C Interview Drills',
        whatToLearn: 'Bitwise tricks, struct alignment calculation, volatile keyword, ISR rules, memory leak isolation, circular buffer implementation in C.',
        whyItMatters: 'Core technical questions asked in every firmware, MCU, and low-level software interview.',
        practiceExercise: 'Implement circular buffer, reverse bits, count set bits, and malloc-free ring buffer in live code.',
        buildDeliverable: 'Embedded C Interview Solution Set.',
        howToTest: 'Compile and run edge-case unit tests against all implemented solutions.',
        exitCriteria: 'Writes bug-free, warning-clean embedded C code on a blank sheet or plain text editor.',
        priority: 'Critical',
        week: 'W6-10',
        subtopics: [
          { id: 'int-2-1', title: 'Memory-Safe Circular Buffer in C', detail: 'Write atomic push/pop functions handling wrap-around and overflow flags.' },
          { id: 'int-2-2', title: 'Bitwise Optimization Algorithms', detail: 'Count set bits in O(k), reverse endianness, check power of two in one line.' },
          { id: 'int-2-3', title: 'Volatile & Const Qualifier Scenarios', detail: 'Explain const volatile uint32_t * const reg (read-only hardware status register).' },
          { id: 'int-2-4', title: 'Exit Gate: Live Coding Screen Pass', detail: 'Solve 3 embedded C challenges in a plain text editor with 0 compilation bugs.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'embedded-linux-bsp',
    name: 'Track 12: Embedded Linux, Board Support Packages (BSP) & Kernel Drivers',
    category: 'Embedded Linux & BSP',
    description: 'U-Boot bootloader sequence, Linux kernel architecture, Device Tree (.dts/.dtsi) bindings, Char device drivers (file_operations), Platform drivers, I2C/SPI subsystem drivers, and Yocto/Buildroot OS images.',
    priority: 'Critical',
    plannedHours: 65,
    currentFocus: 'Device Tree, Linux kernel modules, Char drivers, Platform bus',
    nextGate: 'Develop and test a custom Linux kernel character driver with Device Tree node matching on ARM/QEMU',
    evidence: 'Linux kernel driver module repository with Device Tree overlays and userspace C test application',
    topics: [
      {
        id: 'lin-1',
        stage: 1,
        title: 'Linux Boot Sequence & Device Tree Architecture',
        whatToLearn: 'ROM bootloader -> U-Boot (SPL & U-Boot proper) -> Linux Kernel (zImage/uImage) -> Root Filesystem (init/systemd); Device Tree Source (.dts), Device Tree Blob (.dtb), and Device Tree Overlays (.dtbo).',
        whyItMatters: 'ARM and RISC-V embedded Linux platforms do not have PC-style ACPI/PCI auto-discovery; the kernel relies entirely on Device Trees to discover hardware addresses and IRQs.',
        practiceExercise: 'Write a custom .dts overlay defining a memory-mapped peripheral, I2C sensor node, and GPIO interrupt line.',
        buildDeliverable: 'Compiled .dtb device tree blob with verified sysfs node exposure.',
        howToTest: 'Boot Linux on QEMU / BeagleBone / Raspberry Pi and verify /proc/device-tree/ node properties.',
        exitCriteria: 'Can explain every stage of the embedded Linux boot sequence and write custom device tree nodes without error.',
        priority: 'Critical',
        week: 'W12',
        subtopics: [
          { id: 'lin-1-1', title: 'U-Boot Environment & Bootcmd', detail: 'Configure bootargs (console, root=/dev/mmcblk0p2, earlyprintk) and load kernel from eMMC/TFTP.' },
          { id: 'lin-1-2', title: 'Device Tree Node Properties', detail: 'Specify compatible strings, reg addresses, interrupts, and clocks.' },
          { id: 'lin-1-3', title: 'Device Tree Overlays (DTBO)', detail: 'Dynamically modify the live device tree to attach hardware capes and add-on sensor boards.' },
          { id: 'lin-1-4', title: 'Exit Gate: Device Tree Hardware Binding', detail: 'Compile custom DTB and verify successful driver binding via compatible string.', isExitGate: true }
        ]
      },
      {
        id: 'lin-2',
        stage: 2,
        title: 'Linux Kernel Modules & Character Device Drivers',
        whatToLearn: 'Kernel space vs User space memory separation, module_init() / module_exit(), major/minor numbers, alloc_chrdev_region(), struct file_operations (open, read, write, unlocked_ioctl, release), copy_to_user / copy_from_user.',
        whyItMatters: 'Kernel drivers provide safe, memory-protected access between userspace applications and physical hardware registers.',
        practiceExercise: 'Write an in-tree or out-of-tree kernel module implementing a character driver with circular kernel buffer and ioctl controls.',
        buildDeliverable: 'Production-ready Linux kernel module (.ko) and userspace C test client.',
        howToTest: 'Insert module using insmod, verify /dev/mydev creation, and execute read/write tests with dmesg monitoring.',
        exitCriteria: 'Can write, build, and debug kernel modules with zero kernel panics and clean memory cleanup upon rmmod.',
        priority: 'Critical',
        week: 'W13',
        subtopics: [
          { id: 'lin-2-1', title: 'Kernel vs User Space Context', detail: 'Safely transfer data using copy_to_user() and copy_from_user() with pointer validation.' },
          { id: 'lin-2-2', title: 'Struct file_operations Implementation', detail: 'Implement non-blocking read(), write(), and unlocked_ioctl() system call handlers.' },
          { id: 'lin-2-3', title: 'Kernel Concurrency & Spinlocks / Mutexes', detail: 'Protect shared kernel data structures from race conditions during concurrent user access.' },
          { id: 'lin-2-4', title: 'Exit Gate: Zero-Panic Stress Test', detail: 'Run 100,000 continuous concurrent read/write ioctl operations without kernel crash.', isExitGate: true }
        ]
      },
      {
        id: 'lin-3',
        stage: 3,
        title: 'Platform Drivers, I2C/SPI Subsystems & Interrupts in Kernel',
        whatToLearn: 'Platform bus model (struct platform_driver, probe(), remove()), platform_get_resource(), devm_request_threaded_irq(), I2C/SPI bus client drivers, sysfs attribute creation (DEVICE_ATTR_RW).',
        whyItMatters: 'Modern SoC hardware peripherals and bus-connected chips are architected as platform and bus subsystem drivers in the upstream Linux kernel.',
        practiceExercise: 'Implement a platform driver that maps memory registers from device tree and handles hardware interrupts via bottom-half tasklets/workqueues.',
        buildDeliverable: 'Custom platform sensor driver with sysfs telemetry readout.',
        howToTest: 'Read /sys/class/sensor/sensor0/telemetry and verify bottom-half interrupt servicing under stress.',
        exitCriteria: 'Can explain probe/remove lifecycle and design interrupt-driven drivers using threaded IRQs or workqueues.',
        priority: 'High',
        week: 'W14',
        subtopics: [
          { id: 'lin-3-1', title: 'Platform Driver Probe & Resource Mapping', detail: 'Extract IORESOURCE_MEM and map via devm_ioremap_resource() safely.' },
          { id: 'lin-3-2', title: 'Threaded IRQ & Bottom-Half Handlers', detail: 'Keep top-half minimal; delegate heavy SPI/I2C transfers to threaded interrupt handler.' },
          { id: 'lin-3-3', title: 'Sysfs & Class Device Attributes', detail: 'Expose runtime hardware configuration and status via /sys interface.' },
          { id: 'lin-3-4', title: 'Exit Gate: Sysfs Sensor Driver Pass', detail: 'Demonstrate driver probe matching and sysfs data logging in live Linux session.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'physical-design-asic',
    name: 'Track 13: ASIC Backend Physical Design (PD), Synthesis & OpenLane Flow',
    category: 'Physical Design & Silicon Flow',
    description: 'ASIC RTL-to-GDSII flow, Logic Synthesis (Yosys / Design Compiler), Floorplanning & IO pad placement, Power Distribution Network (PDN), Standard Cell Placement, Clock Tree Synthesis (CTS), Detailed Routing, and Signoff STA & DRC/LVS.',
    priority: 'High',
    plannedHours: 60,
    currentFocus: 'Synthesis, Floorplanning, CTS, OpenLane / SkyWater 130nm GDSII tape-out',
    nextGate: 'Complete full RTL-to-GDSII physical design run with 0 DRC/LVS violations and positive setup/hold slack',
    evidence: 'Complete GDSII layout, DEF/LEF files, and signoff timing/power reports for a RISC-V core or accelerator',
    topics: [
      {
        id: 'pd-1',
        stage: 1,
        title: 'ASIC Backend Flow & Logic Synthesis',
        whatToLearn: 'RTL to Gate-Level Netlist translation, Standard Cell Libraries (.lib / Liberty format), Technology mapping, Area vs Delay vs Power tradeoffs, Synthesis constraints (SDC).',
        whyItMatters: 'Synthesis transforms behavioral SystemVerilog RTL into physical logic gates (AND, OR, DFF, MUX) tailored to target foundry process technology.',
        practiceExercise: 'Synthesize a 32-bit RISC-V CPU or FIFO block using Yosys / Synopsys DC; generate Gate-Level Netlist and cell count reports.',
        buildDeliverable: 'Synthesized Gate-Level Verilog netlist and timing/area optimization report.',
        howToTest: 'Run Gate-Level Simulation (GLS) with SDF back-annotation to confirm functional parity with RTL.',
        exitCriteria: 'Can interpret standard cell timing arcs and optimize logic synthesis for strict area and clock targets.',
        priority: 'High',
        week: 'W13-14',
        subtopics: [
          { id: 'pd-1-1', title: 'Liberty (.lib) Timing & Power Characterization', detail: 'Understand input transition, output load capacitance, and Non-Linear Delay Models (NLDM).' },
          { id: 'pd-1-2', title: 'Technology Mapping & Gate Optimization', detail: 'Map generic RTL expressions to target foundry standard cells (e.g. sky130_fd_sc_hd).' },
          { id: 'pd-1-3', title: 'Area vs Timing Pareto Tradeoffs', detail: 'Analyze cell count and maximum frequency under varying synthesis effort.' },
          { id: 'pd-1-4', title: 'Exit Gate: Gate-Level Netlist Verification', detail: 'Pass 100% of testbench vectors in Gate-Level Simulation with 0 timing mismatches.', isExitGate: true }
        ]
      },
      {
        id: 'pd-2',
        stage: 2,
        title: 'Floorplanning, Power Grid (PDN) & Standard Cell Placement',
        whatToLearn: 'Die area sizing, core-to-die margin, aspect ratio, IO pin placement, Macro placement & halos, Power rings and power stripes (VDD/VSS PDN calculation), Global & Detailed Placement, Decap/Tap cell insertion.',
        whyItMatters: 'A poor floorplan creates fatal routing congestion and IR-drop voltage sag that no downstream tool can recover.',
        practiceExercise: 'Configure core utilization, place IO pins around the die perimeter, build VDD/VSS power grid, and run cell placement.',
        buildDeliverable: 'Floorplanned and placed DEF (Design Exchange Format) layout.',
        howToTest: 'Inspect layout density, wirelength estimates, and verify 0 cell overlaps or tap cell spacing violations.',
        exitCriteria: 'Can construct a robust power distribution grid and place macros to minimize critical wirelength.',
        priority: 'High',
        week: 'W15',
        subtopics: [
          { id: 'pd-2-1', title: 'Core Utilization & Aspect Ratio', detail: 'Set target density (typically 50-65% for unrouted designs to avoid congestion).' },
          { id: 'pd-2-2', title: 'Power Grid (PDN) Sizing & IR Drop', detail: 'Calculate metal layer width and pitch to keep static and dynamic IR drop < 3% of VDD.' },
          { id: 'pd-2-3', title: 'Well-Tap and Decoupling Capacitor Insertion', detail: 'Prevent CMOS latch-up with periodic tap cells and suppress voltage ripple with decap cells.' },
          { id: 'pd-2-4', title: 'Exit Gate: DRC-Clean Floorplan DEF', detail: 'Achieve 0 placement violations and verified PDN continuity in OpenLane / Innovus.', isExitGate: true }
        ]
      },
      {
        id: 'pd-3',
        stage: 3,
        title: 'Clock Tree Synthesis (CTS), Routing & Signoff (DRC/LVS)',
        whatToLearn: 'Clock Tree Synthesis (CTS) algorithms (H-tree, mesh, balance), Clock skew & latency minimization, Global & Detailed Routing (metal layer assignment, via insertion), Static Timing Analysis (STA) at signoff corners, Design Rule Check (DRC), Layout Versus Schematic (LVS), GDSII export.',
        whyItMatters: 'This is the final silicon tape-out stage: transforming abstract routing into physical geometric lithography masks ready for foundry manufacturing.',
        practiceExercise: 'Run CTS and detailed routing on target core; perform post-route STA timing closure and DRC/LVS verification.',
        buildDeliverable: 'Clean GDSII layout stream file ready for semiconductor fabrication.',
        howToTest: 'Run Magic / KLayout DRC and Netgen LVS; verify 0 DRC errors, 0 LVS mismatches, and positive WNS/TNS.',
        exitCriteria: 'Can take RTL through the entire automated ASIC flow to a tape-out ready, DRC/LVS clean GDSII file.',
        priority: 'High',
        week: 'W16',
        subtopics: [
          { id: 'pd-3-1', title: 'Clock Tree Synthesis & Buffer Sizing', detail: 'Insert clock buffers/inverters to balance insertion delay and keep clock skew < 100ps.' },
          { id: 'pd-3-2', title: 'Detailed Routing & Antenna Rule Fixes', detail: 'Route metal tracks (Met1 to Met5) and insert antenna diodes to protect gate oxides.' },
          { id: 'pd-3-3', title: 'Physical Verification: DRC & LVS Signoff', detail: 'Verify spacing/width rules and exact electrical equivalence between layout and netlist.' },
          { id: 'pd-3-4', title: 'Exit Gate: Tape-Out Ready GDSII Proof', detail: 'Export GDSII with 0 DRC errors, 0 LVS errors, and 0 timing violations.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'high-speed-pcb-hw',
    name: 'Track 14: High-Speed Hardware Design, Signal Integrity & Multi-Layer PCB',
    category: 'Hardware Design & PCB',
    description: 'Schematic capture, component derating, 4-to-6 layer stackup design, controlled impedance routing (50Ω / 90Ω / 100Ω diff pairs), return path continuity, decoupling capacitor networks, EMI/EMC shielding, and DFM/DFA manufacturing signoff.',
    priority: 'Critical',
    plannedHours: 55,
    currentFocus: 'High-speed schematic capture, 4-layer stackup, differential pair routing, Altium/KiCad layout',
    nextGate: 'Complete 4-layer production PCB layout for ARM/ESP32-S3 board with controlled impedance and complete manufacturing Gerber package',
    evidence: 'KiCad/Altium hardware design repository with schematics, PCB layout, 3D render, BOM, and Gerber files',
    topics: [
      {
        id: 'pcb-1',
        stage: 1,
        title: 'Schematic Capture & Component Engineering',
        whatToLearn: 'Hierarchical schematics, power tree budgeting, component voltage/thermal derating, passive component tolerances (X7R vs Y5V), protection circuits (TVS diodes, PTC resettable fuses, reverse polarity protection).',
        whyItMatters: 'Flaws in schematic design and component selection lead to hardware smoke, intermittent resets, and costly board respins.',
        practiceExercise: 'Design schematic for an industrial IoT sensor node featuring ESP32-S3, power regulators, USB-C ESD protection, and sensor interfaces.',
        buildDeliverable: 'Complete hierarchical schematic with electrical rule checks (ERC) passed.',
        howToTest: 'Run ERC in KiCad/Altium; inspect power dissipation calculations under maximum load.',
        exitCriteria: 'Can design production-grade schematics with comprehensive circuit protection and accurate component ratings.',
        priority: 'Critical',
        week: 'W5-6',
        subtopics: [
          { id: 'pcb-1-1', title: 'Power Tree & Thermal Budgeting', detail: 'Design multi-rail power sequencing (e.g. 12V -> 5V -> 3.3V -> 1.8V) with LDO and Buck efficiency calculations.' },
          { id: 'pcb-1-2', title: 'ESD Protection & Input Clamping', detail: 'Place TVS diode arrays on USB and external connector data lines close to entry points.' },
          { id: 'pcb-1-3', title: 'Decoupling Capacitor Network Sizing', detail: 'Place 0.1uF, 1uF, and 10uF ceramic capacitors with low ESR/ESL at every MCU power pin.' },
          { id: 'pcb-1-4', title: 'Exit Gate: 100% Clean ERC Schematic', detail: 'Pass ERC with 0 errors, 0 unconnected pins, and complete component annotations.', isExitGate: true }
        ]
      },
      {
        id: 'pcb-2',
        stage: 2,
        title: 'Multi-Layer PCB Stackup & Controlled Impedance',
        whatToLearn: '4-layer and 6-layer stackup configurations (Signal-GND-PWR-Signal), dielectric constant (Er), prepreg vs core, single-ended 50Ω microstrip, 90Ω differential (USB), 100Ω differential (Ethernet/PCIe), coplanar waveguides.',
        whyItMatters: 'At high signal edge rates (>1ns), PCB traces act as transmission lines; impedance mismatches cause signal reflections and data corruption.',
        practiceExercise: 'Calculate trace widths and spacing for 50Ω single-ended and 90Ω differential pairs using PCB stackup calculator.',
        buildDeliverable: 'PCB stackup definition table and impedance routing rules configured in EDA tool.',
        howToTest: 'Verify impedance calculations with field solver equations (e.g. Saturn PCB Toolkit).',
        exitCriteria: 'Can specify standard factory layer stackups and accurately calculate trace geometry for target impedances.',
        priority: 'Critical',
        week: 'W7',
        subtopics: [
          { id: 'pcb-2-1', title: 'Layer Stackup & Ground Reference Planes', detail: 'Ensure continuous, unbroken ground reference planes directly adjacent to high-speed signal layers.' },
          { id: 'pcb-2-2', title: 'Differential Pair Length Matching', detail: 'Tune serpentine meanders to match skew within +/- 5 mils for high-speed USB/Ethernet.' },
          { id: 'pcb-2-3', title: 'Via Parasitics & Via Stubs', detail: 'Minimize capacitance and inductance by placing ground return stitching vias near signal layer transitions.' },
          { id: 'pcb-2-4', title: 'Exit Gate: Impedance-Clean Routing Proof', detail: 'Complete length-matched routing of differential pairs adhering to 90Ω design rules.', isExitGate: true }
        ]
      },
      {
        id: 'pcb-3',
        stage: 3,
        title: 'Signal Integrity, Return Paths & DFM Manufacturing Signoff',
        whatToLearn: 'High-frequency return current paths (following path of lowest inductance), avoiding split plane crossings, 3W trace separation rule for crosstalk suppression, ground stitching, copper pour thermals, DRC rule decks, Gerber RS-274X, Excellon drill files, Pick & Place centroid data, BOM generation.',
        whyItMatters: 'Ensures the PCB layout transitions seamlessly from CAD screen to physical high-yield surface-mount (SMT) factory assembly.',
        practiceExercise: 'Complete board layout, pour ground planes, run design rule checks (DRC), and generate complete Gerber/BOM fabrication pack.',
        buildDeliverable: 'Complete manufacturing fabrication package (Gerbers, Drill files, BOM, CPL Pick & Place).',
        howToTest: 'Inspect Gerbers in online DFM viewer (JLCPCB / PCBWay); verify 0 DRC violations.',
        exitCriteria: 'Can export and validate complete production manufacturing packages ready for turnkey SMT factory assembly.',
        priority: 'High',
        week: 'W8',
        subtopics: [
          { id: 'pcb-3-1', title: 'Return Path Discontinuity Prevention', detail: 'Never route high-speed traces across plane splits or slot voids to avoid massive EMI radiation.' },
          { id: 'pcb-3-2', title: 'Crosstalk Suppression & Guard Traces', detail: 'Apply 3W spacing rule between aggressive clock signals and sensitive analog lines.' },
          { id: 'pcb-3-3', title: 'Design for Manufacturing (DFM) Signoff', detail: 'Enforce minimum annular ring, trace spacing, solder mask clearance, and silkscreen readability.' },
          { id: 'pcb-3-4', title: 'Exit Gate: SMT-Ready Manufacturing Pack', detail: 'Generate complete Gerber, Drill, BOM, and CPL files validated in Gerber viewer.', isExitGate: true }
        ]
      }
    ]
  },
  {
    id: 'dft-low-power-vlsi',
    name: 'Track 15: Design for Testability (DFT), Scan Chains & Low-Power VLSI (UPF)',
    category: 'DFT & Low-Power VLSI',
    description: 'Silicon testability engineering: Stuck-at and transition fault models, Scan flip-flops, Scan chain insertion, ATPG pattern generation, Built-In Self-Test (BIST), IEEE 1149.1 JTAG TAP controller, and IEEE 1801 UPF multi-voltage power gating.',
    priority: 'High',
    plannedHours: 45,
    currentFocus: 'Scan chains, ATPG test coverage, JTAG TAP FSM, Clock gating, UPF power domains',
    nextGate: 'Implement JTAG TAP controller and run ATPG fault simulation achieving >95% stuck-at coverage',
    evidence: 'DFT verification repository with synthesizable JTAG TAP controller, scan insertion script, and UPF power intent specification',
    topics: [
      {
        id: 'dft-1',
        stage: 1,
        title: 'Design for Testability (DFT), Scan Chains & ATPG',
        whatToLearn: 'Manufacturing defects vs design bugs, Fault modeling (Stuck-At-0, Stuck-At-1, Transition delay), Scan flip-flops (Mux-D FF), Scan Chain stitching, Shift mode vs Capture mode, Automatic Test Pattern Generation (ATPG), Test Coverage metric.',
        whyItMatters: 'Every fabricated silicon chip must be tested in seconds on Automated Test Equipment (ATE); DFT enables detecting microscopic silicon defects with minimal test time.',
        practiceExercise: 'Convert standard RTL registers into scan flip-flops, stitch scan chains, and generate ATPG patterns.',
        buildDeliverable: 'Scan-inserted gate-level netlist and ATPG test vector suite.',
        howToTest: 'Run fault simulator and verify test coverage percentage and un-testable fault reports.',
        exitCriteria: 'Can explain scan architecture, calculate test coverage, and diagnose untestable logic redundancies.',
        priority: 'High',
        week: 'W15',
        subtopics: [
          { id: 'dft-1-1', title: 'Scan Flip-Flop Architecture (Mux-D)', detail: 'Understand Scan-In (SI), Scan-Enable (SE), and Scan-Out (SO) pin multiplexing.' },
          { id: 'dft-1-2', title: 'Shift vs Capture Test Cycles', detail: 'Shift in test vector through scan chain, pulse system clock for 1 capture cycle, shift out response.' },
          { id: 'dft-1-3', title: 'ATPG Algorithms (D-Algorithm / PODEM)', detail: 'Generate sensitized path vectors that propagate internal gate faults to observable scan outputs.' },
          { id: 'dft-1-4', title: 'Exit Gate: >95% ATPG Fault Coverage', detail: 'Generate test pattern suite achieving >95% stuck-at fault coverage on target ALU/CPU core.', isExitGate: true }
        ]
      },
      {
        id: 'dft-2',
        stage: 2,
        title: 'Boundary Scan (IEEE 1149.1 JTAG) & TAP Controller',
        whatToLearn: 'JTAG standard architecture: Test Access Port (TCK, TMS, TDI, TDO, TRST*), 16-state TAP Controller Finite State Machine, Instruction Register (IR), Data Registers (DR), Boundary Scan Register (BSR), EXTEST, INTEST, SAMPLE/PRELOAD instructions.',
        whyItMatters: 'JTAG boundary scan allows testing board-level solder interconnects between chips without physical needle bed probes, and provides silicon hardware debug access.',
        practiceExercise: 'Implement synthesizable 16-state JTAG TAP controller FSM in SystemVerilog.',
        buildDeliverable: 'Synthesizable IEEE 1149.1 JTAG TAP Controller IP module.',
        howToTest: 'Simulate JTAG instruction loading and boundary scan shift sequences via testbench.',
        exitCriteria: 'Can draw and explain the 16-state JTAG TAP FSM from memory and write synthesizable TAP control logic.',
        priority: 'High',
        week: 'W16',
        subtopics: [
          { id: 'dft-2-1', title: '16-State TAP Controller FSM', detail: 'Navigate Test-Logic-Reset, Run-Test/Idle, Select-DR-Scan, Capture-DR, Shift-DR, Exit1-DR, Update-DR.' },
          { id: 'dft-2-2', title: 'Instruction & Data Register Decoding', detail: 'Implement BYPASS, IDCODE, and custom USER1 scan registers.' },
          { id: 'dft-2-3', title: 'Boundary Scan Cell Architecture', detail: 'Isolate internal core logic from physical package pins for board interconnect testing.' },
          { id: 'dft-2-4', title: 'Exit Gate: JTAG TAP Verification Pass', detail: 'Verify TAP FSM transitions and IDCODE readout in simulation.', isExitGate: true }
        ]
      },
      {
        id: 'dft-3',
        stage: 3,
        title: 'Low-Power VLSI Architecture & Unified Power Format (UPF)',
        whatToLearn: 'Dynamic power (P = a * C * V^2 * f) vs Static leakage power, Architectural clock gating (ICG cells), Multi-voltage domains, Power gating (sleep transistors), Retention flip-flops, Level shifters, Isolation cells, IEEE 1801 UPF / CPF specification.',
        whyItMatters: 'Battery-powered smartphones, wearables, and edge AI chips demand aggressive power reduction techniques across silicon domains.',
        practiceExercise: 'Write a UPF power intent specification defining power domains, isolation rules, level shifters, and power state tables.',
        buildDeliverable: 'UPF power intent file and low-power simulation testbench.',
        howToTest: 'Run power-aware simulation (UPF simulation) to verify isolation cell behavior when power domain is switched off.',
        exitCriteria: 'Can specify multi-domain power architectures and explain level shifter and isolation cell requirements on a whiteboard.',
        priority: 'High',
        week: 'W17',
        subtopics: [
          { id: 'dft-3-1', title: 'Integrated Clock Gating (ICG) Cells', detail: 'Disable clock tree distribution to idle registers using glitch-free latch-based clock gates.' },
          { id: 'dft-3-2', title: 'Power Gating, Isolation & Level Shifters', detail: 'Clamp floating signals to safe logic levels (0/1) when crossing from powered-down to active domain.' },
          { id: 'dft-3-3', title: 'UPF Power Intent Specification', detail: 'Write create_power_domain, set_isolation, set_level_shifter, and create_power_switch commands.' },
          { id: 'dft-3-4', title: 'Exit Gate: Power-Aware Simulation Pass', detail: 'Simulate power domain shutoff and verify proper isolation clamp without logic corruption.', isExitGate: true }
        ]
      }
    ]
  }
];

