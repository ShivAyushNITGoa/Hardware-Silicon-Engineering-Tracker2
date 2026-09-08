import { FlagshipProject, HabitItem, RuleItem } from "../types";

export const flagshipProjects: FlagshipProject[] = [
  {
    "id": "fireguard-v2",
    "name": "FireGuard v2 — Production Embedded IoT System",
    "purpose": "Upgrade existing IoT prototype into a production-style, multi-threaded embedded system with robust driver isolation and low power profiling.",
    "prerequisites": "C pointers, structs, hardware timers, FreeRTOS, MQTT protocols.",
    "architectureFlow": "Physical Flame/Gas Sensors -> ADC/I2C/SPI -> Layered HAL Driver -> FreeRTOS Acquisition Queue -> Anomaly Detection Service -> Spooling Ring-Buffer -> TLS/MQTT Client -> Cloud Telemetry Dashboard.",
    "steps": [
      "Refactor monolithic firmware into clean HAL, Driver, Service, and App layers.",
      "Implement FreeRTOS 3-task concurrent pipeline (Sensor Polling, Anomaly Logic, Cloud Streaming).",
      "Integrate local flash ring-buffer to prevent data loss during WiFi outages.",
      "Optimize sleep power states using ESP32-S3 Light/Deep Sleep with ULP wakeups.",
      "Write automated unit tests for packet serialization and buffer overflow protection."
    ],
    "validation": "Oscilloscope ISR timing verification (<5us), 48-hour continuous packet stress test with 0 drops.",
    "metrics": "Telemetry Latency: <120ms | WiFi Reconnect: <2.8s | Sleep Current: <45uA | Zero Memory Leaks over 48h.",
    "githubEvidence": "github.com/ayush/fireguard-v2-firmware (Complete with Architecture Diagram, Doxygen API docs, FreeRTOS trace)",
    "demoRequirement": "Live physical bench demonstration with simulated sensor triggers, WiFi drop recovery, and real-time cloud alert dashboard.",
    "resumeBullet": "Architected production-grade multi-threaded FreeRTOS firmware on ESP32-S3 for IoT safety monitoring; implemented atomic ring-buffer spooling to ensure 0% data loss across network disconnects while cutting sleep power by 68%.",
    "targetWeek": "W1-W4",
    "jageshwarComparison": "Jageshwar: Basic Arduino code, no RTOS, no testbench. Ayush: Layered HAL, FreeRTOS, 0-drop spooling, power profile."
  },
  {
    "id": "rtl-ip-library",
    "name": "Synthesizable RTL IP Core Library & Verification Suite",
    "purpose": "Build a production-quality, reusable communication and buffering IP library (UART, SPI, Synchronous/Asynchronous FIFOs) with automated Python cocotb regression.",
    "prerequisites": "SystemVerilog synthesizable coding, FSM state design, CDC metastability theory, cocotb/Verilator.",
    "architectureFlow": "RTL Parameterized IP (SV) -> Clock Domain Crossing / Metastability Filter -> Ready/Valid Flow Control Handshake -> Self-Checking cocotb / SVA Assertion Testbench -> Vivado Synthesis & Timing Closure.",
    "steps": [
      "Design parameterized UART transmitter and receiver with oversampling and parity check.",
      "Design full-duplex SPI Master controller with programmable CPOL/CPHA and clock dividers.",
      "Design Synchronous FIFO with programmable almost_full/almost_empty thresholds.",
      "Design Asynchronous Dual-Clock FIFO with Gray code pointer synchronization and CDC safety.",
      "Build automated cocotb Python regression suite streaming 100,000 randomized transactions."
    ],
    "validation": "Verilator lint clean (0 warnings), 100% SVA assertion pass, timing closed at 150MHz in Vivado.",
    "metrics": "Operating Frequency: 150MHz+ | Inferred Latches: 0 | Test Coverage: 100% line & branch | CDC Violations: 0.",
    "githubEvidence": "github.com/ayush/systemverilog-rtl-ip-library (Includes Makefile, cocotb testbenches, GTKWave scripts, XDC constraints)",
    "demoRequirement": "Terminal script running 1-command regression test with colorful pass metrics + GTKWave waveform capture video.",
    "resumeBullet": "Engineered reusable SystemVerilog IP library (UART, SPI Master, Async Dual-Clock FIFO with Gray pointers); created Python cocotb testbenches running 100k randomized transactions and closed timing at 150MHz on Xilinx Artix-7.",
    "targetWeek": "W4-W8",
    "jageshwarComparison": "Jageshwar: Copies generic Verilog from GitHub without tests. Ayush: Parameterized SV, CDC safe, cocotb regression, 150MHz timing closed."
  },
  {
    "id": "rv32i-soc",
    "name": "5-Stage Pipelined RV32I Processor SoC",
    "purpose": "Design and synthesize a complete 32-bit RISC-V CPU core executing real compiled C programs, with hazard forwarding, branch flushing, and memory-mapped UART/Timer peripherals.",
    "prerequisites": "Computer Architecture, Instruction Decoding, Pipelining hazards, RISC-V GCC cross-compiler.",
    "architectureFlow": "Instruction Fetch (IF) -> Decode (ID) -> Execute ALU (EX) -> Memory (MEM) -> Writeback (WB) -> Forwarding & Hazard Unit -> Memory Bus Decoder -> RAM + MMIO UART/Timer.",
    "steps": [
      "Implement single-cycle RV32I datapath and control unit supporting all 37 base instructions.",
      "Transform into 5-stage pipeline with pipeline registers and forwarding bypass networks.",
      "Implement hazard detection unit for load-use stalls and branch prediction flushing.",
      "Integrate memory-mapped I/O (MMIO) subsystem with custom UART and Timer peripherals.",
      "Write bare-metal C bootloader and applications compiled with riscv32-unknown-elf-gcc."
    ],
    "validation": "Passes official RISC-V architectural compliance test suite; runs Fibonacci, Matrix Multiply, and Hello World over UART.",
    "metrics": "CPI: ~1.15 on arithmetic loops | Fmax: 100MHz on Artix-7 | Compliance: 100% pass on RV32I test suite.",
    "githubEvidence": "github.com/ayush/rv32i-pipelined-soc (Includes ISA compliance test logs, C compiler scripts, memory map linker script, block diagram)",
    "demoRequirement": "Video showing C code compilation, bitstream loading, and real-time execution printing text to serial terminal on FPGA.",
    "resumeBullet": "Designed 5-stage pipelined RV32I processor core with hazard forwarding and MMIO peripherals; passed 100% official RISC-V architectural compliance tests and booted bare-metal C applications at 100MHz on FPGA fabric.",
    "targetWeek": "W9-W13",
    "jageshwarComparison": "Jageshwar: Never built a CPU or understands forwarding. Ayush: Complete 5-stage pipeline with MMIO running real compiled C firmware."
  },
  {
    "id": "edge-ai-accelerator",
    "name": "Edge-AI Fixed-Point Hardware Accelerator on FPGA",
    "purpose": "Accelerate real-time sensor anomaly detection and machine learning inference using custom fixed-point systolic MAC arrays and LUT activation pipelines over AXI4.",
    "prerequisites": "Q-format fixed-point math, DSP48 primitives, AXI4-Lite control registers, model quantization.",
    "architectureFlow": "Raw Sensor Telemetry -> Microcontroller/CPU -> AXI4-Stream -> FPGA Fixed-Point MAC Engine -> LUT-Interpolated Activation -> Decision Comparator -> Interrupt Out.",
    "steps": [
      "Train time-series classification/anomaly model in PyTorch and quantize to INT8 / Q4.12 fixed-point.",
      "Design pipelined Multiply-Accumulate (MAC) array mapped to Xilinx DSP48E2 slices.",
      "Build LUT-based nonlinear activation function accelerator (GELU/Sigmoid) with linear interpolation.",
      "Wrap datapath in AXI4-Lite slave register interface for CPU control and status polling.",
      "Benchmark speedup and energy efficiency against CPU software execution on ARM Cortex."
    ],
    "validation": "Bit-exact verification against Python fixed-point model across 50,000 test vectors.",
    "metrics": "Hardware Speedup: 8.4x over ARM Cortex-M4 | Latency: <18us per inference | Accuracy Retention: >98.2% vs FP32.",
    "githubEvidence": "github.com/ayush/fpga-edge-ai-accelerator (Includes PyTorch quantization scripts, SystemVerilog RTL, AXI testbench, latency benchmark sheet)",
    "demoRequirement": "Live side-by-side execution demo comparing ARM CPU software inference vs FPGA hardware accelerator latency on oscilloscope.",
    "resumeBullet": "Architected AXI4-connected Edge-AI fixed-point hardware accelerator for time-series anomaly inference; achieved 8.4x speedup and 18us latency over Cortex-M4 with 98.2% accuracy retention using custom DSP48 pipelined MAC arrays.",
    "targetWeek": "W14-W20",
    "jageshwarComparison": "Jageshwar: Runs slow Python scripts on Raspberry Pi. Ayush: Custom silicon accelerator with fixed-point DSP math and measured latency speedup."
  }
];

export const dailyHabits: HabitItem[] = [
  {
    "id": "h1",
    "name": "Deep Core Learning",
    "targetTime": "60–90 min",
    "description": "Read spec/textbook, analyze architecture diagrams, master new theoretical concept.",
    "category": "Coding"
  },
  {
    "id": "h2",
    "name": "Hardware / RTL Implementation",
    "targetTime": "60–120 min",
    "description": "Write synthesizable SystemVerilog, C firmware drivers, or FPGA constraints.",
    "category": "Coding"
  },
  {
    "id": "h3",
    "name": "Testbench & Verification",
    "targetTime": "30–45 min",
    "description": "Write assertions, run cocotb / ModelSim simulations, inspect waveform traces.",
    "category": "System & Projects"
  },
  {
    "id": "h4",
    "name": "Interview Drills / DSA / Puzzles",
    "targetTime": "30 min",
    "description": "Solve 1-2 whiteboard digital design or embedded C pointer problems under timer.",
    "category": "Interview & Revision"
  },
  {
    "id": "h5",
    "name": "Engineering Hygiene & Git Docs",
    "targetTime": "15–30 min",
    "description": "Commit clean code, update READMEs, document measured latency/utilization numbers.",
    "category": "System & Projects"
  },
  {
    "id": "h6",
    "name": "Daily Review & Exit Gate Check",
    "targetTime": "15 min",
    "description": "Tick completed subtopics, review next day priority, update journal notes.",
    "category": "Interview & Revision"
  }
];

export const goldenRules: RuleItem[] = [
  {
    "id": "R1",
    "rule": "Academics is strictly protected",
    "meaning": "Never sacrifice semester exams or GPA for projects. Schedule deep work hours around academic commitments.",
    "action": "Block fixed 2-3 hour high-focus slots daily; pause projects during exam weeks.",
    "checkFrequency": "Daily"
  },
  {
    "id": "R2",
    "rule": "No tutorial-only completion",
    "meaning": "A topic is strictly incomplete until Ayush builds, tests, and validates something in code or silicon.",
    "action": "Every concept requires an accompanying testbench, schematic, or working driver.",
    "checkFrequency": "Every Topic"
  },
  {
    "id": "R3",
    "rule": "One deep build at a time",
    "meaning": "No starting a new flagship project until the current milestone is fully shipped and tested.",
    "action": "Strict work-in-progress limit of 1 active flagship milestone.",
    "checkFrequency": "Weekly"
  },
  {
    "id": "R4",
    "rule": "Evidence over claims",
    "meaning": "Every project bullet on your resume must have tests, waveform traces, measured metrics, and a demo video.",
    "action": "Upload waveform dumps (VCD), timing reports (WNS), and demo GIFs to GitHub.",
    "checkFrequency": "Every Milestone"
  },
  {
    "id": "R5",
    "rule": "Existing strengths stay alive",
    "meaning": "Maintain FireGuard, C/C++ firmware, electronics, and CSE algorithmic foundations while learning FPGA/RTL.",
    "action": "Spend 30-45 mins maintaining and refactoring existing codebases weekly.",
    "checkFrequency": "Weekly"
  },
  {
    "id": "R6",
    "rule": "Weekly Sunday Gate",
    "meaning": "Every Sunday: review hours, update blockers, log progress ticks, and commit next week's exit criteria.",
    "action": "Complete the Sunday Review checklist and commit all Git repositories.",
    "checkFrequency": "Weekly on Sunday"
  },
  {
    "id": "R7",
    "rule": "Month 5 is integration only",
    "meaning": "Do not start random, novel technologies in the final month before internship applications.",
    "action": "Focus 100% on polish, mock interviews, cold outreach, and resume synchronization.",
    "checkFrequency": "Monthly"
  },
  {
    "id": "R8",
    "rule": "Portfolio is part of engineering",
    "meaning": "Clean Git commit history, reproducible READMEs, and single-command build scripts are mandatory.",
    "action": "Write clear commit messages; verify make test works on fresh machines.",
    "checkFrequency": "Every Commit"
  },
  {
    "id": "R9",
    "rule": "Health is a mathematical constraint",
    "meaning": "Burnout guarantees failure. Maintain 7 hours of sleep, regular nutrition, and exercise.",
    "action": "Shutdown work at 11:30 PM; maintain sustainable weekly intensity.",
    "checkFrequency": "Daily"
  },
  {
    "id": "R10",
    "rule": "Target role decides depth",
    "meaning": "Prioritize Silicon, FPGA, RTL, and Embedded firmware roles; do not get distracted by generic web/mobile stacks.",
    "action": "Filter all learning against tier-1 semiconductor and hardware job requirements.",
    "checkFrequency": "Daily"
  }
];
