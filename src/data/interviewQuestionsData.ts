import { InterviewQuestion } from "../types";

export const interviewQuestions: InterviewQuestion[] = [
  {
    "id": "sta-1",
    "title": "Setup & Hold Time Fundamental Equation and Violation Resolution",
    "category": "STA & Timing",
    "difficulty": "Core",
    "companies": [
      "Qualcomm",
      "Texas Instruments",
      "Intel",
      "NVIDIA"
    ],
    "question": "Define Setup and Hold time. Write down the timing check inequality for setup and hold at the destination flip-flop. How do you fix a setup violation versus a hold violation?",
    "formulaOrDiagram": "Setup Condition: T_clk >= T_cq + T_comb + T_setup - T_skew + T_jitter\nSetup Slack = (T_clk + T_skew) - (T_cq + T_comb + T_setup + T_jitter)\nHold Condition: T_cq + T_comb >= T_hold + T_skew + T_jitter\nHold Slack = (T_cq + T_comb) - (T_hold + T_skew + T_jitter)",
    "answer": "• Setup Time (T_setup): Minimum time data must be stable BEFORE the active clock edge.\n• Hold Time (T_hold): Minimum time data must remain stable AFTER the active clock edge.\n\nFixing Setup Violation (Data path is too slow):\n1. Decrease combinational logic delay (restructure logic, pipe-lining, logic duplication).\n2. Upsize driving cells to reduce cell propagation delay.\n3. Increase clock period (lower frequency) if permissible.\n4. Useful clock skew (delay clock to capture flip-flop).\n\nFixing Hold Violation (Data path is too fast):\n1. Insert delay buffers in the data path (cannot fix hold by changing clock frequency! Hold is frequency independent).\n2. Downsize driving cells or restructure clock tree.",
    "keyTakeaway": "Hold violations are frequency-independent and must be fixed by adding delay buffers to data paths."
  },
  {
    "id": "sta-2",
    "title": "Clock Skew vs Clock Jitter and Positive/Negative Skew Impact",
    "category": "STA & Timing",
    "difficulty": "Advanced",
    "companies": [
      "Texas Instruments",
      "Qualcomm",
      "AMD"
    ],
    "question": "What is the difference between clock skew and clock jitter? Does positive clock skew help or hurt setup time and hold time?",
    "formulaOrDiagram": "T_skew = T_clk_capture - T_clk_launch\nPositive Skew: Capture edge arrives later than Launch edge.",
    "answer": "• Clock Skew: Spatial variation in arrival time of clock edge at different flip-flops due to interconnect RC differences. Deterministic.\n• Clock Jitter: Temporal variation in clock edge arrival time at the same node across successive cycles due to PLL noise and power supply ripple. Random/stochastic.\n\nImpact of Positive Skew (T_clk_capture > T_clk_launch):\n• Helps Setup Time: Provides extra time for combinational data propagation (Setup Slack increases by +T_skew).\n• Hurts Hold Time: Capture flip-flop samples later, so previous data must remain stable longer, increasing the likelihood of hold violation.",
    "keyTakeaway": "Positive skew improves setup margin but eats into hold margin."
  },
  {
    "id": "sta-3",
    "title": "Metastability, MTBF Calculation & Multi-Flop Synchronizer",
    "category": "STA & Timing",
    "difficulty": "Crucial",
    "companies": [
      "Qualcomm",
      "Intel",
      "NVIDIA",
      "InCore"
    ],
    "question": "What is metastability? Derive the MTBF (Mean Time Between Failures) formula and explain why a single 2-FF synchronizer cannot be used for multi-bit buses.",
    "formulaOrDiagram": "MTBF = exp(T_res / tau) / (C1 * f_clk * f_data)\nWhere T_res = resolution time (slack between flops), tau = settling time constant.",
    "answer": "• Metastability occurs when an asynchronous signal violates setup or hold time at a flip-flop, causing the output voltage to linger at an indeterminate logic level (between VIL and VIH) for an unpredictable duration.\n• 2-FF Synchronizer provides a full clock cycle of resolution time (T_res = T_clk - T_setup) for the bistable multivibrator to settle to a valid 0 or 1.\n• Why not for Multi-Bit Buses: Individual flip-flops have varying propagation delays and routing skews. Individual bits can be sampled on different clock cycles (e.g. transitioning from 0111 to 1000 can sample intermediate states like 1111 or 0000). Use an Asynchronous FIFO with Gray code pointers or a 2-phase/4-phase handshake instead.",
    "keyTakeaway": "Never use 2-FF synchronizers on multi-bit vectors; use Gray-coded Async FIFOs or Mux-recirculating synchronizers."
  },
  {
    "id": "sta-4",
    "title": "False Paths and Multi-Cycle Paths in STA Constraints",
    "category": "STA & Timing",
    "difficulty": "Advanced",
    "companies": [
      "Synopsys",
      "Cadence",
      "Qualcomm"
    ],
    "question": "Explain what False Paths and Multi-Cycle Paths are in SDC (Synopsys Design Constraints). Give concrete hardware examples.",
    "answer": "• False Path (`set_false_path`): A timing path that physically exists in RTL but is logically impossible to activate during normal operational modes (e.g., test/scan mode mux select signals, static configuration registers written only at boot, asynchronous reset paths already checked for recovery/removal).\n• Multi-Cycle Path (`set_multicycle_path`): A path where combinational logic is explicitly designed to take N clock cycles (N > 1) to propagate from launch flop to capture flop, controlled by an enable signal or state machine (e.g., 32-bit hardware divider taking 4 cycles, or cross-clock domain paths where enable toggles every 2 cycles).",
    "keyTakeaway": "Over-constraining false paths wastes silicon area and routing resources optimizing paths that never toggle in real operation."
  },
  {
    "id": "sv-1",
    "title": "Blocking (=) vs Non-blocking (<=) Assignment Execution Semantics",
    "category": "SystemVerilog RTL",
    "difficulty": "Core",
    "companies": [
      "Texas Instruments",
      "Qualcomm",
      "Intel",
      "AMD"
    ],
    "question": "Explain the IEEE 1364/1800 simulation scheduler regions for blocking vs non-blocking assignments. What hardware bug occurs if you mix them?",
    "codeSnippet": "// Non-blocking (Active -> NBA region):\nalways_ff @(posedge clk) begin\n  q1 <= d;\n  q2 <= q1; // Forms a 2-stage shift register\nend\n\n// Blocking (Active region immediately):\nalways_ff @(posedge clk) begin\n  q1 = d;\n  q2 = q1; // Synthesizes to a single flip-flop (q2=d), race condition!\nend",
    "answer": "• Blocking (`=`): Evaluated and scheduled immediately in the Active region. Blocks execution of subsequent statements in the procedural block until assignment is complete.\n• Non-blocking (`<=`): RHS expressions are evaluated in the Active region using current values, but LHS updates are deferred to the NBA (Non-Blocking Assignment) region at the end of the simulation time step.\n• Golden Rule:\n1. Use non-blocking (`<=`) for sequential logic (`always_ff`).\n2. Use blocking (`=`) for combinational logic (`always_comb`).\n3. Never mix blocking and non-blocking in the same procedural block.",
    "keyTakeaway": "Non-blocking assignments in sequential blocks eliminate simulation-synthesis race mismatches."
  },
  {
    "id": "sv-2",
    "title": "Unintentional Latch Inference and Prevention in always_comb",
    "category": "SystemVerilog RTL",
    "difficulty": "Core",
    "companies": [
      "NVIDIA",
      "Qualcomm",
      "Mindgrove",
      "InCore"
    ],
    "question": "How do synthesis tools infer latches in combinational blocks? Why are latches dangerous in ASIC/FPGA design, and how does SystemVerilog always_comb prevent them?",
    "codeSnippet": "// BAD: Inferred latch for 'out' when sel=2'b11\nalways @(*) begin\n  case(sel)\n    2'b00: out = a;\n    2'b01: out = b;\n    2'b10: out = c;\n  endcase // Missing default!\nend\n\n// GOOD: always_comb with default assignments\nalways_comb begin\n  out = 1'b0; // Default assignment prevents latches\n  unique case(sel)\n    2'b00: out = a;\n    2'b01: out = b;\n    2'b10: out = c;\n    default: out = 1'b0;\n  endcase\nend",
    "answer": "• Cause of Inferred Latch: If an output variable is not assigned in every possible branch of an `if-else` or `case` statement, the synthesis tool must preserve the prior state, synthesizing a level-sensitive D-latch.\n• Dangers:\n1. Timing analysis tools cannot easily calculate STA through transparent latch phases.\n2. Glitches on input signals propagate directly to outputs when latch is transparent.\n3. Massive power consumption and testability (DFT/ATPG) complications.\n• Prevention: Use SystemVerilog `always_comb` (compilers produce a compile-time error/warning if a latch is inferred) and always set a default value at the top of the block.",
    "keyTakeaway": "Always use always_comb and set default values at the top of procedural combinational blocks."
  },
  {
    "id": "sv-3",
    "title": "Asynchronous Dual-Clock FIFO Gray Code Pointer Synchronization",
    "category": "SystemVerilog RTL",
    "difficulty": "Crucial",
    "companies": [
      "NVIDIA",
      "Qualcomm",
      "Intel",
      "InCore"
    ],
    "question": "Why is Gray code strictly required for read and write pointers in an Asynchronous FIFO crossing clock domains? How do you calculate Full and Empty conditions?",
    "formulaOrDiagram": "Binary to Gray: G = B ^ (B >> 1)\nGray to Binary: B[i] = ^(G >> i)\nEmpty: rptr_gray == wptr_gray_sync\nFull: wptr_gray == {~rptr_gray_sync[ADDR_WIDTH:ADDR_WIDTH-1], rptr_gray_sync[ADDR_WIDTH-2:0]}",
    "answer": "• Gray Code Property: Only 1 single bit changes between adjacent states (e.g. 00 -> 01 -> 11 -> 10 -> 00). When synchronized across asynchronous domains via a 2-FF synchronizer, at most 1 bit can be in transition. Even if metastability occurs on that 1 bit, the synchronized value can only resolve to the old valid state or the new valid state—never a corrupted intermediate state.\n• Empty Condition: Occurs in Read Clock Domain when synchronized write pointer equals read pointer (`rptr == sync_wptr`).\n• Full Condition: Occurs in Write Clock Domain when write pointer catches up with read pointer. Using MSB extra bit:\n1. The two MSBs of Gray write pointer are inverted compared to synchronized read pointer.\n2. The remaining lower bits are identical.",
    "keyTakeaway": "Gray code guarantees 1-bit transitions, preventing catastrophic multi-bit synchronization corruption in CDC FIFOs."
  },
  {
    "id": "uvm-1",
    "title": "UVM Phases Order and Difference between Function vs Task Phases",
    "category": "ASIC Verification & UVM",
    "difficulty": "Core",
    "companies": [
      "Synopsys",
      "Cadence",
      "Intel",
      "Qualcomm"
    ],
    "question": "List the major UVM phases in chronological order. What is the fundamental difference between build_phase, connect_phase, and run_phase?",
    "codeSnippet": "// Phase execution snippet\nvirtual function void build_phase(uvm_phase phase);\n  super.build_phase(phase);\n  drv = my_driver::type_id::create(\"drv\", this);\nendfunction\n\nvirtual task run_phase(uvm_phase phase);\n  phase.raise_objection(this);\n  // Time-consuming stimulus loop\n  phase.drop_objection(this);\nendtask",
    "answer": "• Major UVM Phases in Order:\n1. `build_phase` (Top-down execution, function, 0-simulation time)\n2. `connect_phase` (Bottom-up execution, function, connects TLM ports)\n3. `end_of_elaboration_phase` (Bottom-up, function)\n4. `start_of_simulation_phase` (Bottom-up, function)\n5. `run_phase` (Parallel execution across all components, TASK consuming simulation time, runs sub-phases like pre_reset, reset, main, etc.)\n6. `extract_phase`, `check_phase`, `report_phase`, `final_phase` (Bottom-up functions for scoreboard verification and error reporting).\n\n• Key Difference: Function phases (`build`, `connect`) execute in zero simulation time to instantiate and wire the verification hierarchy. Task phase (`run_phase`) consumes simulation time (`#delays`, `@(posedge clk)`) and drives/samples physical signals.",
    "keyTakeaway": "Build phase is Top-Down; Connect and Cleanup phases are Bottom-Up; run_phase is the only time-consuming task phase."
  },
  {
    "id": "uvm-2",
    "title": "SystemVerilog Assertions (SVA) — Immediate vs Concurrent",
    "category": "ASIC Verification & UVM",
    "difficulty": "Advanced",
    "companies": [
      "Qualcomm",
      "Texas Instruments",
      "NVIDIA",
      "AMD"
    ],
    "question": "What is the difference between immediate and concurrent assertions? Write an SVA property verifying that whenever req is asserted, ack must follow within 1 to 3 clock cycles and stay high for 1 cycle.",
    "codeSnippet": "// SVA Handshake Property:\nproperty p_req_ack_handshake;\n  @(posedge clk) disable iff (!rst_n)\n  $rose(req) |-> ##[1:3] ack ##1 !ack;\nendproperty\n\nassert_req_ack: assert property(p_req_ack_handshake)\n  else $error(\"Protocol Violation: ACK did not follow REQ in 1-3 cycles!\");",
    "answer": "• Immediate Assertions (`assert (condition)`): Executed like procedural if-statements in simulation time step. Sensitive to glitches in combinational blocks.\n• Concurrent Assertions (`assert property`): Sampled only on clock edges in the Preponed region (before active clock updates). Evaluated over multi-cycle temporal sequences.\n• SVA Operators:\n`|->` (Overlapping implication: antecedent and consequent evaluate in same cycle).\n`|=>` (Non-overlapping implication: consequent evaluated 1 cycle after antecedent).\n`##[min:max]` (Cycle delay range).\n`$rose()` / `$fell()` (Detecting 0->1 or 1->0 signal transitions).",
    "keyTakeaway": "Concurrent assertions sample in the Preponed simulation region, immune to race conditions and glitch false-positives."
  },
  {
    "id": "uvm-3",
    "title": "Code Coverage vs Functional Coverage in ASIC Signoff",
    "category": "ASIC Verification & UVM",
    "difficulty": "Core",
    "companies": [
      "Cadence",
      "Synopsys",
      "Tessolve",
      "Intel"
    ],
    "question": "Why is 100% Code Coverage insufficient for tapeout signoff? How does Functional Coverage (covergroups, coverpoints, cross coverage) close the verification gap?",
    "answer": "• Code Coverage: Automatically measured by simulator (Line, Branch, Condition, Toggle, FSM state). Measures what code was executed. It DOES NOT know if the design specification was implemented correctly (e.g. if an entire feature or protocol corner-case is missing from the RTL, code coverage can still be 100%!).\n• Functional Coverage: User-defined verification matrix based directly on engineering specs (e.g. sending back-to-back packets with maximum payload, FIFO overflowing during simultaneous read/write, illegal AXI burst lengths).\n• Signoff Requirement: Verification closure requires both 100% Code Coverage AND 100% Functional Coverage with zero assertion failures.",
    "keyTakeaway": "Code coverage verifies what RTL was executed; Functional coverage verifies what architectural requirements were tested."
  },
  {
    "id": "rv-1",
    "title": "5-Stage Pipelined Hazards — Structural, Data, and Control",
    "category": "RISC-V Architecture",
    "difficulty": "Core",
    "companies": [
      "InCore",
      "Mindgrove",
      "NVIDIA",
      "Intel",
      "Qualcomm"
    ],
    "question": "Explain the 3 types of pipeline hazards in a classic 5-stage RISC-V processor (IF, ID, EX, MEM, WB). How is data hazard forwarding logic implemented for RAW (Read-After-Write)?",
    "formulaOrDiagram": "Forwarding Condition 1 (EX Hazard): \nif (EX/MEM.RegWrite and (EX/MEM.RegisterRd != 0) and (EX/MEM.RegisterRd == ID/EX.RegisterRs1)) -> ForwardA = 2'b10\nForwarding Condition 2 (MEM Hazard): \nif (MEM/WB.RegWrite and (MEM/WB.RegisterRd != 0) and (MEM/WB.RegisterRd == ID/EX.RegisterRs1)) -> ForwardA = 2'b01",
    "answer": "• Structural Hazard: Hardware resource conflict (e.g. single memory port trying to fetch instruction and access data simultaneously -> Solved by Harvard architecture / separate I-Cache and D-Cache).\n• Data Hazard (RAW - Read After Write): Instruction depends on result of prior instruction still in pipeline (e.g. `ADD x1, x2, x3` followed by `SUB x4, x1, x5`).\n  - Solution 1: Forwarding/Bypassing (route output of ALU in EX/MEM or MEM/WB register directly back to ALU inputs in EX stage, saving 2 stall cycles).\n  - Solution 2: Load-Use Hazard Stall (when load instruction is followed by dependent instruction, forwarding cannot travel backwards in time; must stall pipeline for 1 cycle using Hazard Detection Unit).\n• Control Hazard: Branch or Jump changes PC. Solved by dynamic branch prediction or 1-cycle pipeline flush on branch misprediction.",
    "keyTakeaway": "Forwarding solves ALU-to-ALU RAW hazards without stalls; Load-Use hazards strictly require a 1-cycle stall."
  },
  {
    "id": "rv-2",
    "title": "RISC-V Memory-Mapped I/O (MMIO) and Memory Barrier Instructions",
    "category": "RISC-V Architecture",
    "difficulty": "Advanced",
    "companies": [
      "InCore",
      "Mindgrove",
      "Western Digital",
      "Tenstorrent"
    ],
    "question": "How does an RV32I core differentiate between RAM access and peripheral (UART/Timer) access? Why are FENCE instructions and volatile keywords necessary for MMIO?",
    "codeSnippet": "// C MMIO Driver mapping for UART Control Register:\n#define UART_BASE 0x10000000\n#define UART_TX_REG  (*(volatile uint32_t*)(UART_BASE + 0x00))\n#define UART_STATUS  (*(volatile uint32_t*)(UART_BASE + 0x04))\n\nvoid uart_putc(char c) {\n  while ((UART_STATUS & 0x01) == 0); // Wait until TX FIFO is not full\n  UART_TX_REG = (uint32_t)c;\n}",
    "answer": "• Address Decoding: The memory bus decoder maps address ranges. E.g., `0x00000000 - 0x0FFFFFFF` routes to main SRAM, while `0x10000000 - 0x10000FFF` routes to the UART peripheral registers.\n• Volatile Qualifier: Tells the C compiler that the hardware register can change state independently of software (or has side effects on write), preventing the compiler from optimizing out repeated reads/writes in a loop.\n• FENCE Instruction: In out-of-order or cached architectures, the CPU may reorder memory operations. `FENCE` enforces strict ordering between device I/O (Device Memory) and normal RAM access.",
    "keyTakeaway": "MMIO routes physical address decoding to peripheral registers; volatile and FENCE prevent compiler/CPU memory reordering."
  },
  {
    "id": "emb-1",
    "title": "Priority Inversion and Priority Inheritance Protocol in FreeRTOS",
    "category": "Embedded C & FreeRTOS",
    "difficulty": "Crucial",
    "companies": [
      "Texas Instruments",
      "Qualcomm",
      "NXP",
      "Ather Energy"
    ],
    "question": "What is Priority Inversion? Describe the classic Mars Pathfinder scenario (Task Low, Medium, High). How does FreeRTOS Mutex with Priority Inheritance solve it?",
    "answer": "• Scenario:\n1. Task L (Low priority) acquires a shared Mutex resource (e.g. telemetry bus).\n2. Task H (High priority) pre-empts and requests the same Mutex, getting blocked.\n3. Task M (Medium priority), which does not need the Mutex, pre-empts Task L because M > L.\n4. Result: Task M runs indefinitely, preventing Task L from releasing the Mutex, which in turn indefinitely starves Task H (Task M effectively has higher priority than Task H!).\n\n• Solution (Priority Inheritance):\nWhen Task H blocks on the Mutex held by Task L, FreeRTOS temporarily boosts Task L's priority to equal Task H until Task L releases the Mutex. This prevents Task M from preempting Task L, allowing Task L to finish and release the Mutex promptly.",
    "keyTakeaway": "Binary Semaphores DO NOT have priority inheritance; always use FreeRTOS Mutexes (xSemaphoreCreateMutex) for shared resource locking."
  },
  {
    "id": "emb-2",
    "title": "ISR Context Safety — What is Forbidden inside an Interrupt Service Routine?",
    "category": "Embedded C & FreeRTOS",
    "difficulty": "Core",
    "companies": [
      "Texas Instruments",
      "NXP",
      "Microchip",
      "Tonbo Imaging"
    ],
    "question": "What operations are strictly forbidden inside an Interrupt Service Routine (ISR) in embedded systems and FreeRTOS? Why?",
    "answer": "Forbidden Operations inside an ISR:\n1. Blocking / Delay calls (e.g. `vTaskDelay()`, `sleep()`, `while(busy)` loops): ISRs run outside task context; blocking will freeze the entire kernel scheduler.\n2. Dynamic memory allocation (`malloc()`, `free()`, `pvPortMalloc()`): Not thread-safe, non-deterministic execution time, prone to heap fragmentation.\n3. Standard non-ISR FreeRTOS APIs: Must ONLY use `...FromISR()` APIs (e.g. `xQueueSendFromISR()`, `xSemaphoreGiveFromISR()`).\n4. Heavy floating-point calculations or slow I/O (e.g. `printf()` over UART).\n\nBest Practice: Defer processing using the \"Deferred Interrupt Handling\" pattern — ISR only clears the interrupt flag, pushes data to a FreeRTOS queue or gives a semaphore, and wakes up a worker task with `portYIELD_FROM_ISR()`.",
    "keyTakeaway": "Keep ISRs minimal: acknowledge hardware, queue raw data, and yield to a task using FromISR API."
  },
  {
    "id": "bus-1",
    "title": "AXI4-Lite Handshake Mechanism and Deadlock Avoidance Rules",
    "category": "Protocols & Buses",
    "difficulty": "Advanced",
    "companies": [
      "Xilinx/AMD",
      "ARM",
      "Qualcomm",
      "Intel"
    ],
    "question": "Explain the VALID and READY handshake rules in ARM AMBA AXI4 protocol. Which signal is allowed to depend on the other to prevent deadlocks?",
    "formulaOrDiagram": "Handshake Condition: Transaction occurs on posedge clk when (VALID == 1 && READY == 1)\nRule 1: Master CANNOT wait for READY to assert VALID.\nRule 2: Slave CAN wait for VALID before asserting READY.",
    "answer": "• Handshake Rule:\n1. The Source asserts `VALID` when data or address is stable. Once `VALID` is asserted, it MUST remain asserted until `READY` is high on a clock edge.\n2. The Destination asserts `READY` when capable of accepting data.\n\n• Deadlock Prevention Rule:\n- The Source CANNOT wait for `READY` to go high before asserting `VALID` (otherwise if Destination waits for `VALID` and Source waits for `READY`, both wait forever -> DEADLOCK).\n- The Destination is permitted to wait for `VALID` before asserting `READY`, or it may assert `READY` default high.",
    "keyTakeaway": "VALID must never depend on READY; READY may depend on VALID."
  },
  {
    "id": "bus-2",
    "title": "SPI 4 Modes (CPOL / CPHA) and I2C Clock Stretching & Arbitration",
    "category": "Protocols & Buses",
    "difficulty": "Core",
    "companies": [
      "Texas Instruments",
      "NXP",
      "Microchip",
      "Saankhya Labs"
    ],
    "question": "Detail the 4 SPI modes based on CPOL and CPHA. In I2C, how does clock stretching work and how is multi-master bus arbitration resolved without data corruption?",
    "answer": "• SPI Modes:\n- Mode 0: CPOL=0 (Clock idle Low), CPHA=0 (Sample on 1st/Rising edge, Shift on 2nd/Falling edge).\n- Mode 1: CPOL=0 (Clock idle Low), CPHA=1 (Sample on 2nd/Falling edge, Shift on 1st/Rising edge).\n- Mode 2: CPOL=1 (Clock idle High), CPHA=0 (Sample on 1st/Falling edge, Shift on 2nd/Rising edge).\n- Mode 3: CPOL=1 (Clock idle High), CPHA=1 (Sample on 2nd/Rising edge, Shift on 1st/Falling edge).\n\n• I2C Clock Stretching: A slow slave pulls SCL line low. Because SCL is open-drain with a pull-up resistor, the line stays low, forcing the master into a wait state until the slave releases SCL.\n• I2C Multi-Master Arbitration: Open-drain bus where logic 0 (pulled low) overrides logic 1 (pulled high). Two masters transmit simultaneously; each reads SDA while driving. The master that transmits 1 but senses 0 detects it lost arbitration and immediately releases SDA without corrupting the winning master's transmission.",
    "keyTakeaway": "Open-drain wired-AND configuration in I2C enables natural collision-free bus arbitration."
  },
  {
    "id": "lin-drv-1",
    "title": "Character Device Driver struct file_operations & copy_to_user Safety",
    "category": "Embedded Linux & Kernel",
    "difficulty": "Crucial",
    "companies": [
      "Qualcomm",
      "NXP",
      "Texas Instruments",
      "Ambarella"
    ],
    "question": "Explain why direct pointer dereferencing of a userspace address inside a Linux kernel driver is dangerous. How do copy_to_user() and copy_from_user() work, and what is the lifecycle of struct file_operations?",
    "codeSnippet": "static ssize_t my_read(struct file *filp, char __user *buf, size_t count, loff_t *f_pos) {\n    if (copy_to_user(buf, kernel_buffer, count)) {\n        return -EFAULT; // Bad address from user\n    }\n    return count;\n}",
    "answer": "• Virtual Memory Isolation: Userspace pointers belong to the user process's virtual MMU address space, which might be swapped out, unmapped, invalid, or point to kernel memory (security attack).\n• copy_to_user() / copy_from_user():\n1. Validates that the destination/source pointer lies within the valid userspace address range (access_ok check).\n2. Handles page faults gracefully without causing a kernel panic (Kernel Oops).\n3. Safely copies bytes between kernel slab memory and user buffer.\n• struct file_operations: Links standard POSIX system calls (open, read, write, unlocked_ioctl, release) from the VFS (Virtual File System) to driver-specific handler functions registered with cdev_add().",
    "keyTakeaway": "Never dereference user pointers directly in kernel space; always use copy_to_user / copy_from_user to prevent kernel panics and security exploits."
  },
  {
    "id": "pd-cts-1",
    "title": "Clock Tree Synthesis (CTS), Insertion Delay, and Clock Skew Balancing",
    "category": "Physical Design & Backend",
    "difficulty": "Advanced",
    "companies": [
      "Synopsys",
      "Cadence",
      "Qualcomm",
      "Tessolve"
    ],
    "question": "What are the main goals of Clock Tree Synthesis (CTS)? Explain the difference between clock latency (insertion delay) and clock skew. Why cannot we simply use a single massive buffer to drive all flip-flops?",
    "formulaOrDiagram": "Global Clock Skew = Max(Insertion Delay) - Min(Insertion Delay)\nTarget: Minimize Skew while bounding total Insertion Delay and Transition Time (Slew).",
    "answer": "• Goals of CTS:\n1. Balance clock arrival times across all sink flip-flops to minimize global and local clock skew.\n2. Control clock transition times (slew rate) to prevent signal degradation and excessive dynamic power.\n3. Minimize total insertion delay (latency) to reduce on-chip variation (OCV) sensitivity.\n\n• Clock Latency (Insertion Delay): Time taken for clock signal to travel from the clock source/pad to the clock pin of a flip-flop.\n• Clock Skew: The difference in clock arrival times between any two flip-flops.\n\n• Why not one giant buffer:\n1. Huge RC interconnect delay and high capacitive load would cause sluggish clock transition (huge rise/fall time), making flops susceptible to noise and setup violations.\n2. Local PVT (Process, Voltage, Temperature) variations would create massive unpredictable delay differences across the die.\n3. CTS uses symmetric H-tree or multi-level balanced buffer trees to distribute capacitive load evenly.",
    "keyTakeaway": "CTS uses balanced buffer trees to keep clock skew low while guarding transition slew against on-chip variations."
  },
  {
    "id": "pcb-si-1",
    "title": "Return Path Discontinuity, Microstrip Controlled Impedance & 3W Rule",
    "category": "Hardware PCB & Signal Integrity",
    "difficulty": "Crucial",
    "companies": [
      "Texas Instruments",
      "IdeaForge",
      "Ather Energy",
      "Keysight"
    ],
    "question": "Why do high-speed digital signals on a PCB travel along the path of lowest INDUCTANCE rather than lowest RESISTANCE? What happens when a high-speed trace crosses a split in the ground plane?",
    "formulaOrDiagram": "Characteristic Impedance (Microstrip): Z0 ≈ (87 / sqrt(Er + 1.41)) * ln(5.98*H / (0.8*W + T))\nWhere H = dielectric height, W = trace width, T = copper thickness, Er = dielectric constant.",
    "answer": "• Return Current Path Physics:\n- At DC / low frequencies (<100 kHz), current follows the path of least resistance (straight line in ground plane).\n- At high frequencies (>100 MHz / fast edge rates <1 ns), electromagnetic fields concentrate directly beneath the signal trace. The return current flows directly under the trace on the reference plane because this minimizes the loop area, thereby minimizing loop INDUCTANCE (Z = R + jwL, where wL dominates).\n\n• Crossing a Split Ground Plane:\n1. If a trace crosses a gap/split in the plane, the return current cannot flow directly beneath the signal and is forced to take a long detour around the slot.\n2. This creates a large current loop that acts as an efficient antenna, causing massive EMI radiation and failing FCC/CE compliance.\n3. It causes a severe localized impedance discontinuity, inducing signal reflections, ringing, and crosstalk.",
    "keyTakeaway": "High-speed return current mirrors the trace on the adjacent reference plane; never cross split planes or slot voids."
  },
  {
    "id": "dft-jtag-1",
    "title": "16-State JTAG TAP Controller FSM & Boundary Scan EXTEST vs INTEST",
    "category": "DFT & Silicon Test",
    "difficulty": "Advanced",
    "companies": [
      "Intel",
      "Qualcomm",
      "AMD",
      "MediaTek"
    ],
    "question": "Draw/explain the 16-state IEEE 1149.1 JTAG Test Access Port (TAP) state machine. What is the difference between EXTEST and INTEST instructions in boundary scan testing?",
    "formulaOrDiagram": "Key TAP States: Test-Logic-Reset -> Run-Test/Idle -> Select-DR-Scan / Select-IR-Scan -> Capture -> Shift -> Exit1 -> Pause -> Exit2 -> Update",
    "answer": "• JTAG TAP Controller:\n- A 16-state synchronous finite state machine controlled by the TMS (Test Mode Select) line on the rising edge of TCK (Test Clock).\n- Dual parallel branches: Data Register (DR) scan path and Instruction Register (IR) scan path.\n- Key sequence: Capture (latches parallel data into scan register) -> Shift (serially shifts data in via TDI and out via TDO) -> Update (latches shifted serial data to parallel output pins on falling TCK).\n- Reset: Holding TMS=1 for 5 consecutive TCK cycles guarantees transition back to `Test-Logic-Reset` from ANY state.\n\n• EXTEST vs INTEST:\n- `EXTEST` (External Test): Boundary scan cells drive test patterns onto the chip's physical external package pins and capture responses from board-level PCB traces. Used to detect solder bridges, open joints, and short circuits between chips on a PCB without physical probes.\n- `INTEST` (Internal Test): Boundary scan cells drive test patterns inward into the on-chip core logic and capture internal core responses, isolating the silicon die from board-level pins.",
    "keyTakeaway": "EXTEST tests board PCB solder connectivity between chips; INTEST tests the internal silicon die core logic."
  }
];
