import { ToolItem } from "../types";

export const initialTools: ToolItem[] = [
  {
    "id": "vivado",
    "name": "AMD / Xilinx Vivado ML Edition",
    "category": "Synthesis & Implementation",
    "description": "Industry-standard FPGA design suite used for synthesis, physical implementation, timing closure, and ILA hardware debug.",
    "coreConcepts": [
      "RTL Synthesis",
      "Implementation (Place & Route)",
      "XDC Timing Constraints",
      "Integrated Logic Analyzer (ILA)",
      "IP Integrator (Block Design)"
    ],
    "keySkillsToMaster": [
      {
        "id": "vvd-1",
        "name": "Create & Run Non-Project Batch Tcl Scripts",
        "description": "Run Vivado in batch mode: vivado -mode batch -source build.tcl."
      },
      {
        "id": "vvd-2",
        "name": "Write & Verify Physical/Clock XDC Constraints",
        "description": "Write create_clock, IOSTANDARD, and PACKAGE_PIN definitions without critical warnings."
      },
      {
        "id": "vvd-3",
        "name": "Analyze Timing Reports & Fix WNS Violations",
        "description": "Inspect Worst Negative Slack (WNS) setup/hold paths and add pipeline stages."
      },
      {
        "id": "vvd-4",
        "name": "Insert ILA Cores & Trigger on Live Silicon",
        "description": "Mark debug nets, configure sample depth, and trigger on hardware state conditions over JTAG."
      },
      {
        "id": "vvd-5",
        "name": "AXI Interconnect & Block Design (Zynq PS/PL)",
        "description": "Connect ARM Processing System (PS) to FPGA Programmable Logic (PL) using AXI4-Lite."
      }
    ],
    "officialUrl": "https://www.xilinx.com/products/design-tools/vivado.html",
    "installOrRunCommand": "vivado -mode tcl"
  },
  {
    "id": "modelsim-questa",
    "name": "ModelSim / Siemens Questa Sim",
    "category": "Simulation & Verification",
    "description": "Premier RTL simulator for VHDL, Verilog, and SystemVerilog with interactive waveform debugging and code coverage analysis.",
    "coreConcepts": [
      "Event-Driven Simulation",
      "VCD/WLF Waveform Inspection",
      "Testbench Compilation (vlog/vsim)",
      "Code & Statement Coverage",
      "UVM Verification Engine"
    ],
    "keySkillsToMaster": [
      {
        "id": "ms-1",
        "name": "Automated vsim Batch Simulation Scripts",
        "description": "Compile RTL and testbenches using vlog *.sv and run vsim -c -do \"run -all; quit\"."
      },
      {
        "id": "ms-2",
        "name": "Interactive Signal Tracing & Waveform Zooming",
        "description": "Add radix hex/decimal signals, cursor measurements, and bus expansions in GUI."
      },
      {
        "id": "ms-3",
        "name": "Generate Code & Branch Coverage Reports",
        "description": "Run coverage analysis to ensure every line, branch, and toggle state is tested."
      },
      {
        "id": "ms-4",
        "name": "Debugging Race Conditions & Delta Cycles",
        "description": "Identify zero-delay loop oscillations and assignment race conditions in simulation."
      }
    ],
    "officialUrl": "https://eda.sw.siemens.com/en-US/ic/questa/simulation/questa-core-prime/",
    "installOrRunCommand": "vsim -c -do run.do"
  },
  {
    "id": "verilator",
    "name": "Verilator (C++ Cycle-Accurate Simulator & Linter)",
    "category": "Simulation & Verification",
    "description": "Fastest open-source SystemVerilog simulator that compiles synthesizable RTL directly into high-speed C++ cycle-accurate models.",
    "coreConcepts": [
      "RTL Linting",
      "Cycle-Accurate C++ Models",
      "Fuzz Testing & High Throughput",
      "VCD Waveform Dump",
      "Continuous Integration (CI)"
    ],
    "keySkillsToMaster": [
      {
        "id": "vlt-1",
        "name": "Synthesizability Linting & Rule Enforcement",
        "description": "Run verilator --lint-only -Wall to catch latches, width mismatches, and multi-driven nets."
      },
      {
        "id": "vlt-2",
        "name": "Write C++ Cycle-Accurate Testbench Drivers",
        "description": "Instantiate Vtop, toggle clk, evaluate top->eval(), and write stimulus in C++."
      },
      {
        "id": "vlt-3",
        "name": "Generate and View VCD Traces with GTKWave",
        "description": "Enable trace dumping and inspect waveforms in GTKWave."
      },
      {
        "id": "vlt-4",
        "name": "Integrate Verilator into GitHub Actions CI",
        "description": "Run automated regression test suites on every git push."
      }
    ],
    "officialUrl": "https://www.veripool.org/verilator/",
    "installOrRunCommand": "verilator --lint-only -Wall top.sv"
  },
  {
    "id": "cocotb-pyuvm",
    "name": "cocotb & PyUVM",
    "category": "Simulation & Verification",
    "description": "Python-based coroutine verification framework and Python implementation of Universal Verification Methodology.",
    "coreConcepts": [
      "Python Async/Await Coroutines",
      "Transaction Level Modeling (TLM)",
      "NumPy/SciPy Golden Models",
      "Constrained Random Stimulus",
      "Functional Coverage"
    ],
    "keySkillsToMaster": [
      {
        "id": "coco-1",
        "name": "Write Async Testbench Drivers & Monitors",
        "description": "Use @cocotb.test(), Clock(), and RisingEdge() to drive DUT signals cleanly."
      },
      {
        "id": "coco-2",
        "name": "Compare Hardware Output with NumPy Model",
        "description": "Stream 10,000 randomized fixed-point vectors and assert math parity."
      },
      {
        "id": "coco-3",
        "name": "Build PyUVM Driver, Monitor, and Scoreboard",
        "description": "Implement standard UVM component hierarchy in readable Python code."
      }
    ],
    "officialUrl": "https://www.cocotb.org/",
    "installOrRunCommand": "pytest -o log_cli=true"
  },
  {
    "id": "riscv-toolchain",
    "name": "RISC-V GCC & GDB Toolchain",
    "category": "Architecture & Compilers",
    "description": "Cross-compiler suite for compiling bare-metal C/C++ firmware and assembly for RV32I/RV64I target architectures.",
    "coreConcepts": [
      "Cross-Compilation",
      "Linker Scripts (.ld)",
      "C Runtime (crt0.s)",
      "Disassembly (objdump)",
      "ELF to Raw Hex Conversion"
    ],
    "keySkillsToMaster": [
      {
        "id": "rv-1",
        "name": "Compile RV32I Bare-Metal C Programs",
        "description": "Execute riscv32-unknown-elf-gcc -march=rv32i -mabi=ilp32 -nostdlib."
      },
      {
        "id": "rv-2",
        "name": "Write Custom Memory Map Linker Scripts",
        "description": "Map .text to 0x00000000 and .data/.bss to RAM with stack pointer init."
      },
      {
        "id": "rv-3",
        "name": "Inspect Disassembly with objdump",
        "description": "Verify compiler optimization and instruction sequences: riscv32-unknown-elf-objdump -d main.elf."
      },
      {
        "id": "rv-4",
        "name": "Generate Verilog Memory Hex (.hex / .mem)",
        "description": "Convert compiled ELF into hex file loadable via $readmemh in Verilog."
      }
    ],
    "officialUrl": "https://github.com/riscv-collab/riscv-gnu-toolchain",
    "installOrRunCommand": "riscv32-unknown-elf-gcc -march=rv32i"
  },
  {
    "id": "freertos",
    "name": "FreeRTOS & Embedded C Ecosystem",
    "category": "Embedded & RTOS",
    "description": "Market-leading real-time operating system for microcontrollers and small microprocessors.",
    "coreConcepts": [
      "Preemptive Task Scheduling",
      "Queue Buffers & Message Passing",
      "Binary/Counting Semaphores",
      "Mutex with Priority Inheritance",
      "Task Notifications"
    ],
    "keySkillsToMaster": [
      {
        "id": "rtos-1",
        "name": "Deterministic Periodic Task Execution",
        "description": "Use vTaskDelayUntil() to enforce strict periodic sensor sampling rates."
      },
      {
        "id": "rtos-2",
        "name": "Queue-Based Inter-Task Data Flow",
        "description": "Pass sensor structs across tasks without shared global variables."
      },
      {
        "id": "rtos-3",
        "name": "Prevent Priority Inversion with Mutexes",
        "description": "Protect shared SPI/I2C peripheral access using FreeRTOS mutexes."
      },
      {
        "id": "rtos-4",
        "name": "Inspect Stack High Watermark & Memory Usage",
        "description": "Monitor uxTaskGetStackHighWaterMark() to prevent fatal stack overflows."
      }
    ],
    "officialUrl": "https://www.freertos.org/",
    "installOrRunCommand": "#include \"freertos/FreeRTOS.h\""
  },
  {
    "id": "ltspice",
    "name": "Analog Devices LTspice",
    "category": "Modeling & Scripting",
    "description": "High-performance SPICE simulation software for power electronics, gate drivers, filters, and analog circuits.",
    "coreConcepts": [
      "Transient Simulation (.tran)",
      "AC Small-Signal Analysis (.ac)",
      "Step-Load Transient Response",
      "MOSFET Gate Switching Waves",
      "Thermal & Power Dissipation"
    ],
    "keySkillsToMaster": [
      {
        "id": "lt-1",
        "name": "Simulate High-Speed MOSFET Gate Switching",
        "description": "Measure rise time, fall time, and switching losses under capacitive gate loads."
      },
      {
        "id": "lt-2",
        "name": "Model Closed-Loop DC-DC Buck Converters",
        "description": "Simulate inductor current ripple, output voltage ripple, and step response."
      },
      {
        "id": "lt-3",
        "name": "Bode Plot & Phase Margin Stability Analysis",
        "description": "Verify feedback loop stability across load variations in power supplies."
      }
    ],
    "officialUrl": "https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html",
    "installOrRunCommand": "ltspice.exe -b circuit.asc"
  },
  {
    "id": "kicad-altium",
    "name": "KiCad & Altium Designer",
    "category": "Hardware & PCB Design",
    "description": "Premier professional PCB design suites for multi-layer schematics, controlled impedance routing, signal integrity analysis, and manufacturing Gerber generation.",
    "coreConcepts": [
      "Hierarchical Schematics",
      "4/6-Layer Controlled Stackup",
      "Differential Pair Impedance Tuning",
      "Ground Return Continuity",
      "DFM Signoff & Gerber Packages"
    ],
    "keySkillsToMaster": [
      {
        "id": "kicad-1",
        "name": "Hierarchical Schematic Capture & Rule Checks",
        "description": "Design clean multi-sheet schematics with 100% clean Electrical Rules Check (ERC)."
      },
      {
        "id": "kicad-2",
        "name": "Calculate & Route 50Ω / 90Ω / 100Ω Impedance Traces",
        "description": "Configure net classes, dielectric constants, and length-match high-speed differential pairs."
      },
      {
        "id": "kicad-3",
        "name": "Power Plane Decoupling & Ground Stitching",
        "description": "Optimize power decoupling capacitor loops and ground plane stitching vias to eliminate EMI."
      },
      {
        "id": "kicad-4",
        "name": "Generate Complete SMT Manufacturing Packages",
        "description": "Export Gerber RS-274X, Excellon drill files, IPC-D-356 netlists, and Pick & Place centroid data."
      }
    ],
    "officialUrl": "https://www.kicad.org/",
    "installOrRunCommand": "kicad-cli pcb export gerbers board.kicad_pcb"
  },
  {
    "id": "openlane-openroad",
    "name": "OpenLane / OpenROAD (RTL-to-GDSII ASIC Flow)",
    "category": "Physical Design & ASIC",
    "description": "Complete open-source automated RTL-to-GDSII flow supporting SkyWater 130nm and GF180MCU PDKs using Yosys, OpenROAD, Magic, and KLayout.",
    "coreConcepts": [
      "Automated ASIC Backend Flow",
      "Floorplanning & Macro Halos",
      "Power Grid (PDN) Generation",
      "Clock Tree Synthesis (CTS)",
      "Signoff DRC/LVS Verification"
    ],
    "keySkillsToMaster": [
      {
        "id": "opn-1",
        "name": "Configure OpenLane config.json for Custom Silicon IP",
        "description": "Set DIE_AREA, CORE_UTILIZATION, CLOCK_PORT, and target standard cell libraries."
      },
      {
        "id": "opn-2",
        "name": "Execute Automated Synthesis, Floorplan, and CTS",
        "description": "Run ./flow.tcl -design my_design and inspect intermediate reports at each step."
      },
      {
        "id": "opn-3",
        "name": "Analyze OpenROAD Detailed Timing & Slack Reports",
        "description": "Inspect setup/hold slack, skew numbers, and transient transition violations."
      },
      {
        "id": "opn-4",
        "name": "Tape-Out Signoff: Magic DRC & Netgen LVS",
        "description": "Verify 0 DRC errors, 0 antenna violations, and perfect LVS match against gate netlist."
      }
    ],
    "officialUrl": "https://github.com/The-OpenROAD-Project/OpenLane",
    "installOrRunCommand": "./flow.tcl -design <design_name>"
  },
  {
    "id": "embedded-linux-yocto",
    "name": "Embedded Linux, Buildroot & Yocto Project",
    "category": "Embedded & RTOS",
    "description": "Cross-compilation build environments for generating custom Linux kernels, U-Boot bootloaders, device tree blobs, and minimal root filesystems.",
    "coreConcepts": [
      "Kernel Cross-Compilation",
      "Device Tree Source (.dts)",
      "Custom Kernel Modules (.ko)",
      "Yocto BitBake Recipes",
      "Sysfs & Udev Hardware Probing"
    ],
    "keySkillsToMaster": [
      {
        "id": "el-1",
        "name": "Cross-Compile ARM/RISC-V Linux Kernel & DTB",
        "description": "Run make ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu- Image dtbs."
      },
      {
        "id": "el-2",
        "name": "Write & Load Out-of-Tree Character Kernel Modules",
        "description": "Compile .ko against kernel headers and load via insmod with clean file_operations."
      },
      {
        "id": "el-3",
        "name": "Create Device Tree Overlays (DTBO) for Custom Peripherals",
        "description": "Author .dts overlays and compile with dtc -O dtb -o overlay.dtbo overlay.dts."
      },
      {
        "id": "el-4",
        "name": "Build Minimal Embedded Linux RootFS with Buildroot",
        "description": "Configure BusyBox, kernel tools, and C test binaries for fast <2-second booting."
      }
    ],
    "officialUrl": "https://www.yoctoproject.org/",
    "installOrRunCommand": "make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- zImage"
  },
  {
    "id": "synopsys-dc-innovus",
    "name": "Synopsys Design Compiler & Cadence Innovus",
    "category": "Synthesis & Implementation",
    "description": "Global industry standard commercial ASIC synthesis and place-and-route toolchain for advanced node semiconductor tape-outs.",
    "coreConcepts": [
      "Liberty (.lib) Timing Constraints",
      "Gate-Level Netlist Mapping",
      "Clock Tree Synthesis (CTS)",
      "Physical Floorplanning & PDN",
      "PrimeTime STA Signoff"
    ],
    "keySkillsToMaster": [
      {
        "id": "syn-1",
        "name": "Write SDC Synthesis Constraints & Compile Ultra",
        "description": "Define create_clock, set_input_delay, set_output_delay and run compile_ultra."
      },
      {
        "id": "syn-2",
        "name": "Floorplanning & Power Grid Synthesis in Innovus",
        "description": "Define core boundaries, place IO pads/macros, and synthesize low-IR-drop power rings."
      },
      {
        "id": "syn-3",
        "name": "Clock Tree Synthesis & Multi-Corner Multi-Mode (MCMM)",
        "description": "Balance clock skews across Best-Case / Worst-Case PVT corners."
      },
      {
        "id": "syn-4",
        "name": "Signoff Static Timing Analysis with Synopsys PrimeTime",
        "description": "Perform full parasitic extraction (SPEF) and generate signoff timing Slack reports."
      }
    ],
    "officialUrl": "https://www.synopsys.com/implementation-and-signoff/rtl-synthesis-test/design-compiler-graphical.html",
    "installOrRunCommand": "dc_shell -f synthesis.tcl"
  }
];
