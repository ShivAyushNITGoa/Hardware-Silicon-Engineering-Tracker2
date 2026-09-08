import { InterviewDrill } from '../types';

export const interviewDrills: InterviewDrill[] = [
  // ===================== VLSI INTERVIEW DRILLS =====================
  {
    id: 'vlsi-setup-hold-slack',
    discipline: 'vlsi',
    field: 'sta_synthesis',
    targetRole: 'RTL Design Engineer / Physical Design Engineer / STA Engineer',
    title: 'Setup & Hold Slack Calculations with Clock Skew and Jitter',
    category: 'Static Timing Analysis (STA)',
    difficulty: 'Fundamental',
    frequency: 'Must-Know (90%+ Interviews)',
    question: 'Given Launch FF (T_clk-q = 0.5ns, T_setup = 0.3ns, T_hold = 0.2ns), Capture FF (T_setup = 0.3ns, T_hold = 0.2ns), Data Combinational Path Delay T_comb = 2.8ns, Clock Period T_clk = 4.0ns (250MHz), Clock Skew = +0.4ns (Capture clock arrives 0.4ns later than Launch clock), and Clock Jitter = 0.1ns. Calculate Setup Slack and Hold Slack. Is there a timing violation?',
    conceptSummary: 'Setup timing checks if data arrives early enough before the next active capture clock edge. Positive clock skew helps setup time because the capture clock edge is delayed. Hold timing checks if new data does not corrupt the currently latched data on the same active clock edge. Positive clock skew hurts hold time. Clock jitter always reduces timing margin on both setup and hold.',
    asciiDiagram: `
     LAUNCH CLOCK (FF1)
      __|~~~~|____|~~~~|____|~~~~|____
             ^ (Launch Edge at t=0)
             |--> T_clk_q (0.5ns) + T_comb (2.8ns) = Data arrives at t=3.3ns
     
     CAPTURE CLOCK (FF2) with +0.4ns Skew & 0.1ns Jitter
      ____|~~~~|____|~~~~|____|~~~~|__
                    ^ (Capture Edge at t = T_clk + Skew - Jitter = 4.0 + 0.4 - 0.1 = 4.3ns)
                    |<- T_setup (0.3ns) ->|
                    Required Time = 4.3 - 0.3 = 4.0ns
                    Setup Slack = 4.0 - 3.3 = +0.7ns (PASS)
    `,
    codeSnippet: {
      language: 'verilog',
      caption: 'SystemVerilog SDC Constraints Equivalent',
      code: `// PrimeTime / SDC Constraints
create_clock -name CLK -period 4.0 [get_ports clk]
set_clock_uncertainty 0.1 [get_clocks CLK]
set_clock_latency -source 0.4 [get_pins reg_capture/CLK]

# Setup Equation:
# T_arrival = T_clk_q + T_comb_max
# T_required = T_clk + T_skew - T_setup - T_jitter
# Setup_Slack = T_required - T_arrival

# Hold Equation:
# T_arrival = T_clk_q + T_comb_min
# T_required = T_skew + T_hold + T_jitter
# Hold_Slack = T_arrival - T_required`
    },
    keyTakeaways: [
      'Setup Slack = (T_clk + T_skew - T_jitter - T_setup) - (T_clk_q + T_comb_max) = (4.0 + 0.4 - 0.1 - 0.3) - (0.5 + 2.8) = 4.0 - 3.3 = +0.70ns (PASS).',
      'Hold Slack = (T_clk_q + T_comb_min) - (T_skew + T_jitter + T_hold) = (0.5 + 2.8) - (0.4 + 0.1 + 0.2) = 3.3 - 0.7 = +2.60ns (PASS).',
      'Positive clock skew (capture arrives later) helps setup time but degrades hold time.',
      'Clock frequency has ZERO impact on hold timing checks because hold is verified on the SAME clock edge (cycle 0).'
    ],
    commonMistakes: [
      'Including Clock Period T_clk in the hold slack equation (Hold is independent of frequency!).',
      'Subtracting positive skew from setup required time instead of adding it.',
      'Forgetting that clock jitter/uncertainty always subtracts from margin.'
    ]
  },
  {
    id: 'vlsi-cdc-fifo-gray-code',
    discipline: 'vlsi',
    field: 'rtl_design',
    targetRole: 'RTL Design Engineer / SoC Integration Engineer',
    title: 'Clock Domain Crossing (CDC) & Asynchronous FIFO with Gray Pointers',
    category: 'Clock Domain Crossing & Multi-Clock Design',
    difficulty: 'Intermediate',
    frequency: 'Must-Know (90%+ Interviews)',
    question: 'Why can binary counters NOT be passed directly across asynchronous clock domains using 2-FF synchronizers? Explain how Gray code pointers solve this, and show the exact Gray-to-Binary and Binary-to-Gray conversion logic.',
    conceptSummary: 'When a multi-bit binary counter transitions (e.g. from 3 [0011] to 4 [0100]), multiple bits change simultaneously. Due to physical wire delay differences, the destination clock domain may sample an intermediate transient state (e.g., 0111 or 0000), causing massive data corruption. Gray code guarantees that only exactly ONE bit changes between any two consecutive values. If metastability occurs on that single changing bit, the destination domain samples either the old valid value or the new valid value—never a corrupt intermediate state.',
    asciiDiagram: `
       WRITE DOMAIN (clk_w)                 READ DOMAIN (clk_r)
      +------------------+                 +------------------+
      | Binary Counter   |                 |                  |
      |   [3 -> 4]       |                 |                  |
      | 0011 -> 0100     |                 |                  |
      +--------+---------+                 +------------------+
               | (3 bits flip!)                     ^
               v                                    |
      +--------+---------+                 +--------+---------+
      | Binary to Gray   |      2-FF Sync  | 2-FF Synchronizer|
      |   [3 -> 4]       |====> [FF]->[FF] | (Samples Gray)   |
      | 0010 -> 0110     | (Only 1 bit     +--------+---------+
      +------------------+  flips: bit 2!)          v
                                           +--------+---------+
                                           | Gray to Binary   |
                                           +------------------+
    `,
    codeSnippet: {
      language: 'systemverilog',
      caption: 'Binary to Gray and Gray to Binary in SystemVerilog',
      code: `// Binary to Gray conversion (Single line XOR)
assign gray_ptr = bin_ptr ^ (bin_ptr >> 1);

// Gray to Binary conversion (Combinational XOR prefix tree)
always_comb begin
  bin_ptr[PTR_WIDTH] = gray_ptr[PTR_WIDTH];
  for (int i = PTR_WIDTH-1; i >= 0; i--) begin
    bin_ptr[i] = bin_ptr[i+1] ^ gray_ptr[i];
  end
end

// Synchronizer Chain (2-stage flip-flop)
always_ff @(posedge dest_clk or negedge dest_rst_n) begin
  if (!dest_rst_n) begin
    sync_stage1 <= '0;
    sync_stage2 <= '0;
  end else begin
    sync_stage1 <= async_gray_in;
    sync_stage2 <= sync_stage1;
  end
end`
    },
    keyTakeaways: [
      'Binary counting introduces multi-bit transitions leading to bus sampling glitches.',
      'Gray codes change exactly 1 bit per increment: Hamming distance = 1.',
      'In an Async FIFO, full condition is checked in the write domain: (wptr_gray == {~rptr_gray[MSB:MSB-1], rptr_gray[MSB-2:0]}).',
      'Empty condition is checked in the read domain: (rptr_gray == wptr_gray).'
    ],
    commonMistakes: [
      'Using a 2-FF synchronizer on a multi-bit binary data bus (must use handshake or FIFO!).',
      'Checking FIFO full condition in the read clock domain or empty in the write domain.'
    ]
  },
  {
    id: 'vlsi-uvm-phases-factory',
    discipline: 'vlsi',
    field: 'verification',
    targetRole: 'ASIC / SoC Verification Engineer (DV)',
    title: 'UVM Testbench Architecture, Phases & Factory Overrides',
    category: 'Universal Verification Methodology (UVM)',
    difficulty: 'Intermediate',
    frequency: 'Must-Know (90%+ Interviews)',
    question: 'Name all 9 standard UVM common phases in chronological order. Which phases are functions and which are tasks? Explain why the "build_phase" executes top-down while the "connect_phase" executes bottom-up. How does the UVM factory override mechanism work?',
    conceptSummary: 'UVM uses a phased execution mechanism to coordinate all components in a testbench. Common phases are: build -> connect -> end_of_elaboration -> start_of_simulation -> run (TASK, consumes simulation time) -> extract -> check -> report -> final. All phases except run_phase are non-time-consuming void functions. build_phase executes top-down so parent components can instantiate children and configure them via uvm_config_db before children build themselves. connect_phase executes bottom-up so leaf subcomponents have their TLM ports ready to bind.',
    asciiDiagram: `
     UVM PHASE TIMELINE:
      [build_phase]             -> Function (Top-down): Creates component hierarchy
            v
      [connect_phase]           -> Function (Bottom-up): Binds TLM ports and exports
            v
      [end_of_elaboration]      -> Function (Bottom-up): Final topology checks
            v
      [start_of_simulation]    -> Function (Bottom-up): Banner display, file opens
            v
      [run_phase]               -> TASK (Time-consuming): Stimulus generation, scoreboards
            |                     (phase.raise_objection / drop_objection)
            v
      [extract_phase]           -> Function: Pull data from scoreboards & monitors
            v
      [check_phase]             -> Function: Compare DUT outputs vs Golden model
            v
      [report_phase]            -> Function: Print pass/fail summary & coverage %
            v
      [final_phase]             -> Function: Close log files, cleanup
    `,
    codeSnippet: {
      language: 'systemverilog',
      caption: 'UVM Factory Registration & Override Example',
      code: `class base_driver extends uvm_driver #(packet);
  \`uvm_component_utils(base_driver)
  // ...
endclass

class error_inject_driver extends base_driver;
  \`uvm_component_utils(error_inject_driver)
  // Overrides send_packet to inject CRC corruptions
endclass

// In the top-level test:
function void my_test::build_phase(uvm_phase phase);
  super.build_phase(phase);
  
  // Factory Type Override: replaces ALL base_driver instances with error_inject_driver
  base_driver::type_id::set_type_override(error_inject_driver::get_type());
  
  // Or Instance Override for specific hierarchical path:
  // base_driver::type_id::set_inst_override(error_inject_driver::get_type(), "env.agent0.driver");
endfunction`
    },
    keyTakeaways: [
      'Only `run_phase` is a task (consumes time). All others are functions executed in 0 simulation time.',
      'Objections (`phase.raise_objection` / `phase.drop_objection`) must be used inside `run_phase` to prevent premature simulation termination.',
      'Factory overrides allow altering testbench behavior from the test class without modifying a single line of the underlying agent/env RTL verification code.',
      'TLM ports are connected in `connect_phase` using `.connect()` method.'
    ],
    commonMistakes: [
      'Forgetting to call `super.build_phase(phase)` inside derived classes.',
      'Raising objections inside a function phase like `build_phase` (objections are only for time-consuming task phases).',
      'Assuming `connect_phase` runs top-down (it runs bottom-up).'
    ]
  },
  {
    id: 'vlsi-dft-scan-chains-atpg',
    discipline: 'vlsi',
    field: 'dft',
    targetRole: 'DFT Engineer / Silicon Product Engineer',
    title: 'Scan Chain Architecture & ATPG Fault Models (Stuck-At vs. At-Speed)',
    category: 'Design for Testability (DFT)',
    difficulty: 'Intermediate',
    frequency: 'High Frequency (70%)',
    question: 'How is a standard D-Flip-Flop modified into a Scan Flip-Flop? Describe the test operational modes (Shift vs. Capture). Explain the difference between Stuck-At-0/1 fault testing and At-Speed (Transition Delay) fault testing.',
    conceptSummary: 'DFT transforms internal sequential storage elements (flip-flops) into a giant shift register during test mode. A 2:1 multiplexer is added in front of each flip-flop D-input, controlled by a Scan Enable (SE) pin. When SE=1 (Shift Mode), test vectors generated by ATPG are shifted in serially at a low frequency. When SE=0 (Capture Mode), one functional clock pulse is applied to capture the combinational logic response into the flip-flops, followed by shifting the results out for comparison.',
    asciiDiagram: `
     STANDARD SCAN FLIP-FLOP (MUX-DFF):
     
     Functional Data (D) ----[0] |\\
                                 | >---[ D-Flip-Flop ]---> Q (To logic & next SI)
     Scan In (SI) -----------[1] |/          ^
                                  |          |
     Scan Enable (SE) ------------+         CLK
     
     ATPG MODES:
     1. SHIFT: SE=1, clock N cycles to load vector into all FFs
     2. CAPTURE: SE=0, pulse clock to latch combinational cloud output
     3. SHIFT OUT: SE=1, shift out responses while shifting in next vector
    `,
    codeSnippet: {
      language: 'verilog',
      caption: 'Verilog Structural View of Scan-Inserted Cell',
      code: `module scan_dff (
  input  wire clk,
  input  wire rst_n,
  input  wire d,           // Normal functional data
  input  wire si,          // Scan in (from previous FF)
  input  wire se,          // Scan enable (test mode control)
  output reg  q
);

  wire d_muxed = se ? si : d;

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
      q <= 1'b0;
    else
      q <= d_muxed;
  end

endmodule`
    },
    keyTakeaways: [
      'Stuck-At Faults (SA0/SA1): Models static open/short defects where a node stays permanently at 0 or 1. Tested at low frequency.',
      'Transition Delay Faults (TDF): Models slow-to-rise or slow-to-fall defects. Tested at full rated chip frequency (At-Speed) using two pulses (Launch and Capture).',
      'Launch-off-Shift (LOS) pulses capture on the immediate cycle after shift. Launch-off-Capture (LOC) launches using a functional cycle.',
      'Scan coverage target is typically >99% for stuck-at faults in commercial silicon.'
    ],
    commonMistakes: [
      'Confusing Scan Enable (SE) with Scan In (SI).',
      'Assuming stuck-at testing catches timing defects (at-speed delay fault testing is required for timing/resistive shorts).'
    ]
  },

  // ===================== EMBEDDED & FIRMWARE INTERVIEW DRILLS =====================
  {
    id: 'emb-volatile-keyword-registers',
    discipline: 'embedded',
    field: 'bare_metal',
    targetRole: 'Bare-Metal Firmware Developer / Embedded Software Engineer',
    title: 'The "volatile" Keyword & Memory-Mapped Peripheral Registers in C',
    category: 'Embedded C & Memory Systems',
    difficulty: 'Fundamental',
    frequency: 'Must-Know (90%+ Interviews)',
    question: 'What does the "volatile" keyword tell the C compiler? Give the 3 classic scenarios where "volatile" is strictly required in embedded systems. What happens if you omit "volatile" when polling a hardware register in an optimizing compiler (-O2/-O3)?',
    conceptSummary: 'The `volatile` type qualifier tells the C compiler that the value of the variable may be changed by external factors outside the knowledge of the current program thread (such as hardware peripheral updates, an interrupt service routine, or another concurrent thread). The compiler is therefore FORBIDDEN from caching the value in a CPU register or optimizing away read/write operations to that memory address.',
    asciiDiagram: `
     WITHOUT VOLATILE (Compiler Optimizes):
     while (*(uint32_t*)0x40020010 == 0); 
     Compiled Assembly:
       LDR  R0, =0x40020010
       LDR  R1, [R0]           <-- Read once into CPU register R1
     loop:
       CMP  R1, #0             <-- Test cached CPU register R1!
       BEQ  loop               <-- INFINITE LOOP! Never re-reads hardware bus!
     
     WITH VOLATILE (Compiler Must Re-read Every Access):
     while (*(volatile uint32_t*)0x40020010 == 0);
     Compiled Assembly:
     loop:
       LDR  R0, =0x40020010
       LDR  R1, [R0]           <-- Re-reads physical hardware register EVERY iteration!
       CMP  R1, #0
       BEQ  loop
    `,
    codeSnippet: {
      language: 'c',
      caption: 'Correct Peripheral Register Pointer Macro in C',
      code: `// Correct definition of a memory-mapped 32-bit hardware status register
#define USART1_SR_ADDR    (0x40013800UL)
#define USART1_SR         (*(volatile uint32_t *)(USART1_SR_ADDR))

#define USART_SR_RXNE     (1U << 5) // Read data register not empty flag

// Wait for incoming byte from hardware
uint8_t uart_read_byte(void) {
  // MUST be volatile: hardware changes RXNE bit asynchronously
  while (!(USART1_SR & USART_SR_RXNE)) {
    // Wait for hardware to set bit
  }
  return (uint8_t)(*(volatile uint32_t*)(USART1_SR_ADDR + 0x04));
}

// 3 Required Scenarios:
// 1. Memory-mapped peripheral registers (hardware updates state)
// 2. Global variables shared between an ISR and background main() loop
// 3. Global variables shared between concurrent RTOS tasks`
    },
    keyTakeaways: [
      'Volatile prevents register caching: every read and write emits a physical bus transaction (LDR/STR).',
      'Volatile prevents loop optimization: empty delay loops `for(volatile int i=0; i<1000; i++);` will not be stripped by -O3.',
      'CRITICAL: `volatile` DOES NOT guarantee atomicity or thread safety! It only guarantees memory visibility.',
      'A pointer to a volatile register is defined as `volatile uint32_t *reg`.'
    ],
    commonMistakes: [
      'Assuming `volatile` makes an increment operation (`g_counter++`) atomic (it still compiles to read-modify-write, creating race conditions without disable-interrupts or mutexes).',
      'Confusing `const volatile` (valid for a read-only hardware register like a button input or status register).'
    ]
  },
  {
    id: 'emb-priority-inversion-rtos',
    discipline: 'embedded',
    field: 'rtos_firmware',
    targetRole: 'RTOS Systems Engineer / Embedded Firmware Architect',
    title: 'Priority Inversion & Mutex vs. Semaphore in FreeRTOS',
    category: 'Real-Time Operating Systems (RTOS)',
    difficulty: 'Intermediate',
    frequency: 'Must-Know (90%+ Interviews)',
    question: 'Explain the famous Mars Pathfinder Priority Inversion bug involving Low, Medium, and High priority tasks. How does Priority Inheritance solve this? What is the fundamental design difference between a Mutex and a Binary Semaphore in FreeRTOS?',
    conceptSummary: 'Priority Inversion occurs when a high-priority task (H) is blocked waiting for a shared resource held by a low-priority task (L), but an unrelated medium-priority task (M) preempts L because M has higher priority than L. As a result, M starves L from completing its critical section, indirectly preventing the high-priority task H from running indefinitely. Priority Inheritance solves this: when task H blocks on a mutex held by L, the RTOS temporarily elevates the priority of L to match H until L releases the mutex.',
    asciiDiagram: `
     PRIORITY INVERSION TIMELINE:
     
     Priority: High (H) > Medium (M) > Low (L)
     
     Task L : --[Takes Mutex]--------(preempted!)----------------[Releases Mutex]--->
                                            ^
     Task M : --------------------[Runs, preempts L!]-------------->
                                            ^
     Task H : ------------[Needs Mutex! BLOCKS on L]........................[Runs]--->
                          ^
                          Unbounded delay: M prevents L from releasing mutex, so H is blocked!
     
     WITH PRIORITY INHERITANCE:
     When H blocks on mutex, L is boosted to Priority HIGH!
     Task M cannot preempt L. L quickly releases mutex, drops back to LOW, and H executes immediately.
    `,
    codeSnippet: {
      language: 'c',
      caption: 'Mutex with Priority Inheritance vs Semaphore in FreeRTOS',
      code: `// MUTEX: Has ownership & priority inheritance. Used for RESOURCE PROTECTION.
SemaphoreHandle_t xI2CMutex = xSemaphoreCreateMutex();

void vTaskHigh(void *pvParameters) {
  // Takes mutex. If Low has it, Low gets elevated to HIGH priority automatically!
  if (xSemaphoreTake(xI2CMutex, portMAX_DELAY) == pdTRUE) {
    read_sensor_i2c();
    xSemaphoreGive(xI2CMutex); // Drops Low back to original priority
  }
}

// BINARY SEMAPHORE: NO ownership, NO priority inheritance. Used for SIGNALING/SYNC.
SemaphoreHandle_t xDataReadySem = xSemaphoreCreateBinary();

// ISR signals task that DMA transfer is complete
void DMA1_Stream0_IRQHandler(void) {
  BaseType_t xHigherPriorityTaskWoken = pdFALSE;
  // Give from ISR: Wakes up waiting processing task
  xSemaphoreGiveFromISR(xDataReadySem, &xHigherPriorityTaskWoken);
  portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
}`
    },
    keyTakeaways: [
      'A Mutex has OWNERSHIP: only the task that acquired the mutex can release it. It supports Priority Inheritance.',
      'A Binary Semaphore has NO OWNERSHIP: one entity (e.g. an ISR) can signal/give it, while another task takes it. Semaphores DO NOT support priority inheritance.',
      'NEVER use a Mutex inside an Interrupt Service Routine (ISR) because mutexes can block/sleep and ISRs have no task context.',
      'FreeRTOS provides `xSemaphoreCreateMutex()` for resource locking and `xSemaphoreCreateBinary()` for event synchronization.'
    ],
    commonMistakes: [
      'Using a binary semaphore for shared memory protection instead of a mutex (leaves system vulnerable to unbounded priority inversion).',
      'Calling `xSemaphoreTake()` with a timeout from inside an interrupt handler.'
    ]
  },
  {
    id: 'emb-bit-manipulation-c',
    discipline: 'embedded',
    field: 'bare_metal',
    targetRole: 'Embedded Firmware Developer / Low-Level C Programmer',
    title: 'Atomic Bit Manipulation, Bitmasks & Register Operations in C',
    category: 'Embedded C Fundamentals',
    difficulty: 'Fundamental',
    frequency: 'Must-Know (90%+ Interviews)',
    question: 'Write C preprocessor macros to: 1) Set bit n in register REG, 2) Clear bit n, 3) Toggle bit n, 4) Test if bit n is set, 5) Replace a 4-bit field (bits 4 to 7) with a new value without affecting other bits. Explain why read-modify-write operations can cause race conditions.',
    conceptSummary: 'Embedded microcontrollers configure peripherals through memory-mapped 32-bit registers where individual bits or bitfields control clocks, pin modes, baud rates, and interrupts. Bit manipulation must preserve unaffected bits. Read-Modify-Write (RMW) instructions (read reg, modify bit, write back) are non-atomic: if an interrupt occurs between the read and write and modifies another bit in the same register, that modification will be overwritten and lost when the main code writes back.',
    asciiDiagram: `
     REGISTER BITFIELD MODIFICATION (Bits [7:4] = Field):
     
     Step 1: Read current register value
             REG = [1 0 1 1   X X X X   0 1 0 1]
     
     Step 2: Clear target bits [7:4] using inverted mask (~(0x0F << 4))
             REG &= ~(0xF << 4)
             REG = [1 0 1 1   0 0 0 0   0 1 0 1]
     
     Step 3: OR in the new value (e.g., Value = 0b1001) shifted into position
             REG |= ((0x9 & 0xF) << 4)
             REG = [1 0 1 1   1 0 0 1   0 1 0 1]  <-- Clean atomic-style field update!
    `,
    codeSnippet: {
      language: 'c',
      caption: 'Embedded C Standard Bitmask Macros',
      code: `// Standard Bit Manipulation Macros
#define BIT_SET(reg, bit)       ((reg) |= (1UL << (bit)))
#define BIT_CLEAR(reg, bit)     ((reg) &= ~(1UL << (bit)))
#define BIT_TOGGLE(reg, bit)    ((reg) ^= (1UL << (bit)))
#define BIT_CHECK(reg, bit)     (!!((reg) & (1UL << (bit))))

// Modify a multi-bit field: bits [pos + width - 1 : pos]
#define FIELD_MODIFY(reg, val, pos, width) \\
  ((reg) = ((reg) & ~(((1UL << (width)) - 1UL) << (pos))) | (((val) & ((1UL << (width)) - 1UL)) << (pos)))

// Example: Configure GPIO Pin 5 Mode (bits [11:10]) to Alternate Function (0b10)
void gpio_set_af_mode(volatile uint32_t *moder, uint8_t pin) {
  // Pin 5 -> position 10, width 2
  FIELD_MODIFY(*moder, 0x2, pin * 2, 2);
}`
    },
    keyTakeaways: [
      'Use `1UL` instead of `1` to avoid undefined behavior when shifting beyond 15/31 bits.',
      'Cortex-M microcontrollers provide Bit-Band alias memory regions or Set/Reset registers (e.g. GPIO BSRR) that allow single-cycle hardware ATOMIC bit set and clear without read-modify-write cycles.',
      'Always mask input values before shifting into bitfields to prevent overflow into adjacent register fields.'
    ],
    commonMistakes: [
      'Using `1 << 31` with signed 32-bit integers, causing undefined signed integer overflow (must use `1UL << 31`).',
      'Forgetting parentheses around macro parameters, leading to operator precedence bugs.'
    ]
  },
  {
    id: 'emb-linux-char-driver-ops',
    discipline: 'embedded',
    field: 'device_drivers',
    targetRole: 'Linux Kernel Developer / BSP Engineer',
    title: 'Linux Character Device Driver Lifecycle & File Operations',
    category: 'Embedded Linux & Kernel Subsystems',
    difficulty: 'Intermediate',
    frequency: 'High Frequency (70%)',
    question: 'Describe the complete lifecycle of a Linux character device driver from insmod to rmmod. Implement `struct file_operations` with open, release, read, and write functions. Why must you use `copy_to_user()` and `copy_from_user()` instead of `memcpy()`?',
    conceptSummary: 'A Linux character device treats hardware as an unbuffered stream of bytes, accessed through `/dev` nodes. The driver registers major/minor numbers, initializes a `cdev` structure with `file_operations` function pointers, and creates a device class for udev automatic node generation. In kernel space, you CANNOT directly dereference user-space pointers with `memcpy()` because: 1) User pointers may be invalid/malicious, causing a kernel crash (Oops/Panic), 2) User pages may be swapped out or unmapped, requiring page-fault handling that `copy_to_user` safely catches without crashing the kernel.',
    asciiDiagram: `
     USER SPACE                  KERNEL SPACE                      HARDWARE
     
     app: open("/dev/mydev") --> sys_open() --> my_driver_open()
     
     app: read(fd, buf, len) --> sys_read() --> my_driver_read()
                                                 |
                                            copy_to_user(buf, kbuf, len) --> DMA/FIFO
     
     app: write(fd, buf,len) --> sys_write() -> my_driver_write()
                                                 |
                                            copy_from_user(kbuf, buf, len) -> Reg write
    `,
    codeSnippet: {
      language: 'c',
      caption: 'Linux Character Driver Skeleton (C99 Kernel Style)',
      code: `#include <linux/module.h>
#include <linux/fs.h>
#include <linux/cdev.h>
#include <linux/uaccess.h>

#define DEVICE_NAME "custom_sensor"
static dev_t dev_num;
static struct cdev my_cdev;

static ssize_t dev_read(struct file *f, char __user *buf, size_t count, loff_t *offset) {
  char kbuf[32] = "TEMP: 24.5C\\n";
  size_t len = strlen(kbuf);
  if (*offset >= len) return 0; // EOF
  if (count > len - *offset) count = len - *offset;
  
  // Safe transfer to user memory: handles invalid pointers & page faults
  if (copy_to_user(buf, kbuf + *offset, count) != 0) {
    return -EFAULT;
  }
  *offset += count;
  return count;
}

static struct file_operations fops = {
  .owner   = THIS_MODULE,
  .open    = NULL,
  .release = NULL,
  .read    = dev_read,
};

static int __init my_driver_init(void) {
  alloc_chrdev_region(&dev_num, 0, 1, DEVICE_NAME);
  cdev_init(&my_cdev, &fops);
  cdev_add(&my_cdev, dev_num, 1);
  return 0;
}

static void __exit my_driver_exit(void) {
  cdev_del(&my_cdev);
  unregister_chrdev_region(dev_num, 1);
}

module_init(my_driver_init);
module_exit(my_driver_exit);
MODULE_LICENSE("GPL");`
    },
    keyTakeaways: [
      '`copy_to_user()` and `copy_from_user()` return the number of bytes that could NOT be copied (0 means complete success).',
      'Never sleep or call `copy_to_user()` inside an interrupt handler or while holding a spinlock.',
      'Major number identifies the driver; Minor number identifies the specific device or channel instance.',
      '`ioctl()` is used for out-of-band hardware control commands (e.g. setting baud rate, resetting sensor).'
    ],
    commonMistakes: [
      'Returning negative error codes incorrectly (e.g. returning -1 instead of `-EFAULT` or `-EINVAL`).',
      'Using direct pointer dereferencing `*buf = kbuf[0]` in kernel space (huge security vulnerability).'
    ]
  },
  {
    id: 'emb-bus-protocols-mechanics',
    discipline: 'embedded',
    field: 'bare_metal',
    targetRole: 'Hardware-Software Interface Engineer / Firmware Developer',
    title: 'Hardware Peripheral Bus Protocols: I2C vs. SPI vs. UART vs. CAN',
    category: 'Hardware Communication Protocols',
    difficulty: 'Fundamental',
    frequency: 'Must-Know (90%+ Interviews)',
    question: 'Compare I2C, SPI, UART, and CAN on: wire count, master-slave vs multi-master, clocking, open-drain vs push-pull, pull-up resistors, ACK/NACK signaling, and arbitration. Why does I2C need pull-up resistors, and what happens if the pull-up resistor value is too high or too low?',
    conceptSummary: 'Peripheral buses connect microcontrollers to sensors, memory, and controllers. I2C uses 2 open-drain wires (SDA/SCL) requiring pull-ups, allowing multi-master arbitration and clock stretching. SPI uses 4 push-pull wires (SCLK, MOSI, MISO, CS), is full-duplex and much faster (50MHz+ vs I2C 400kHz/3.4MHz), but requires a dedicated CS line per slave. UART is asynchronous (no clock line), full-duplex (TX/RX), requiring matched baud rates. CAN uses a differential pair (CAN_H/CAN_L) with non-destructive bitwise arbitration for noisy automotive environments.',
    asciiDiagram: `
     I2C OPEN-DRAIN BUS (Requires VDD Pull-up Resistors Rp):
     
            VDD
             |
          +--+--+
          |  Rp | (e.g., 2.2k - 4.7k ohm)
          +--+--+
             |
     SDA ----+-------+--------------------+-------- (Data Wire)
             |       |                    |
            ===     ===                  ===
           [FET]   [FET] (Master)       [FET] (Slave 1)
           Master  Slave 1              Slave 2
     
     * Devices only pull line LOW to ground (0).
     * The pull-up resistor passively pulls line HIGH to VDD (1).
     * If Rp too high -> RC time constant too slow, rounded edges, timing violation!
     * If Rp too low -> excessive current drawn when FET pulls down, V_OL exceeds 0.4V!
    `,
    codeSnippet: {
      language: 'c',
      caption: 'I2C Pull-Up Resistor Sizing Equations',
      code: `// Maximum Pull-up Resistor (Limited by Bus Capacitance Cb and Rise Time tr):
// tr_max = 1000ns (Standard Mode 100kHz), 300ns (Fast Mode 400kHz)
// Rp_max = tr_max / (0.8473 * Cb)

// Example: Cb = 100pF, Fast Mode (tr_max = 300ns):
// Rp_max = 300e-9 / (0.8473 * 100e-12) = 3540 ohms (~3.3k ohm)

// Minimum Pull-up Resistor (Limited by Supply VDD and max sink current I_OL = 3mA):
// Rp_min = (VDD - V_OL_max) / I_OL
// For VDD = 3.3V, V_OL_max = 0.4V, I_OL = 3mA:
// Rp_min = (3.3 - 0.4) / 0.003 = 966 ohms (~1k ohm)`
    },
    keyTakeaways: [
      'I2C: 2 wires (SDA, SCL), Open-Drain, Address-based slave select (7 or 10-bit), Hardware ACK/NACK after every 8-bit byte.',
      'SPI: 4 wires (SCLK, MOSI, MISO, CS), Push-Pull, High speed (20-100MHz), CPOL (idle clock polarity) and CPHA (sampling clock phase) config.',
      'UART: 2 wires (TX, RX), Asynchronous (Start bit, 5-9 data bits, optional Parity bit, 1-2 Stop bits). Framing error occurs if Stop bit is sampled as 0.',
      'CAN: 2 wires (CAN_H, CAN_L), 120-ohm termination at ends. Dominant bit (0) overwrites Recessive bit (1), enabling non-destructive arbitration.'
    ],
    commonMistakes: [
      'Saying I2C uses push-pull drivers (push-pull would cause a short-circuit during clock stretching or arbitration).',
      'Forgetting that SPI has no standard acknowledgement mechanism (software protocol must handle errors).'
    ]
  }
];
