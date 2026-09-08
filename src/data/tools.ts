import { ToolSkill } from '../types';

export const toolSkills: ToolSkill[] = [
  // ===================== VLSI EDA TOOLS =====================
  {
    id: 'tool-synopsys-vcs',
    name: 'Synopsys VCS & Verdi',
    discipline: 'vlsi',
    category: 'ASIC Simulation & Debugging',
    vendor: 'Synopsys',
    license: 'Commercial EDA',
    purpose: 'Industry-standard high-performance SystemVerilog/Verilog/VHDL simulator with Verdi advanced waveform & schematic debug environment.',
    standardIndustryUsage: 'Primary simulation engine at NVIDIA, Qualcomm, Intel, Broadcom for UVM regression runs and gate-level simulations.',
    commandsOrWorkflow: [
      'vcs -sverilog -ntb_opts uvm-1.2 -kdb -debug_access+all tb_top.sv dut.v -l comp.log',
      './simv -ucli -do run.do +ntb_random_seed=12345 +UVM_TESTNAME=my_test -l sim.log',
      'verdi -dbdir simv.daidir -ssf novas.fsdb &'
    ],
    relevanceByField: [
      { field: 'ASIC Verification (DV)', note: 'Critical for running UVM testbenches, generating FSDB waveform dumps, and tracing transactions.' },
      { field: 'RTL Design', note: 'Used to inspect gate-level simulations and debug race conditions using Verdi schematic tracing.' }
    ]
  },
  {
    id: 'tool-synopsys-dc',
    name: 'Synopsys Design Compiler (DC)',
    discipline: 'vlsi',
    category: 'Logic Synthesis',
    vendor: 'Synopsys',
    license: 'Commercial EDA',
    purpose: 'Translates RTL code into optimized gate-level netlists mapped to target semiconductor standard cell libraries (.db/.lib).',
    standardIndustryUsage: 'Gold standard synthesis tool across all major fabless and IDM semiconductor companies.',
    commandsOrWorkflow: [
      'dc_shell -f run_synth.tcl',
      'read_verilog -rtl {core.v alu.v}',
      'create_clock -period 4.0 [get_ports clk]',
      'compile_ultra -gate_clock',
      'report_timing -delay max; report_area; report_power'
    ],
    relevanceByField: [
      { field: 'RTL Design', note: 'Used to check if written RTL synthesizes without latches and meets initial timing constraints.' },
      { field: 'STA & Synthesis', note: 'Primary tool for clock gating insertion, boundary optimization, and generating gate-level netlists.' }
    ]
  },
  {
    id: 'tool-cadence-innovus',
    name: 'Cadence Innovus',
    discipline: 'vlsi',
    category: 'Place & Route (P&R)',
    vendor: 'Cadence Design Systems',
    license: 'Commercial EDA',
    purpose: 'Physical implementation system that performs floorplanning, power planning, placement, CTS, and detailed routing for nanometer SoCs.',
    standardIndustryUsage: 'Standard P&R software at Qualcomm, Apple, AMD, MediaTek for modern FinFET and GAA nodes (5nm, 3nm, 2nm).',
    commandsOrWorkflow: [
      'innovus -init run_pnr.tcl',
      'floorPlan -site core -r 1.0 0.50 15 15 15 15',
      'addRing -nets {VDD VSS} -width 5 -spacing 2 -layer {M6 M7}',
      'place_opt_design',
      'ccopt_design; routeDesign'
    ],
    relevanceByField: [
      { field: 'Physical Design (PD)', note: 'Every PD engineer must master Innovus TCL commands for floorplanning, placement, and clock tree synthesis.' }
    ]
  },
  {
    id: 'tool-openlane-sky130',
    name: 'OpenLane & Yosys Flow',
    discipline: 'vlsi',
    category: 'Open-Source ASIC Flow',
    vendor: 'Efabless & The Open-Source EDA Community',
    license: 'Open Source',
    purpose: 'Automated RTL-to-GDSII flow based on several open-source tools: Yosys (Synthesis), OpenROAD (P&R), Magic/Netgen (DRC/LVS), OpenSTA (Timing).',
    standardIndustryUsage: 'Widely used in research institutions, university tapeouts, and RISC-V startups participating in Google/Efabless shuttle runs.',
    commandsOrWorkflow: [
      './flow.tcl -design my_design -tag run1',
      'klayout -e my_design/runs/run1/results/final/gds/my_design.gds',
      'make mount (Inside Docker container)'
    ],
    relevanceByField: [
      { field: 'Physical Design & Tapeout', note: 'Provides hands-on tapeout experience from home on SkyWater 130nm or GlobalFoundries 180nm PDKs.' }
    ]
  },

  // ===================== EMBEDDED & FIRMWARE TOOLCHAINS =====================
  {
    id: 'tool-gnu-arm-gcc',
    name: 'GNU Arm Embedded Toolchain (arm-none-eabi-gcc)',
    discipline: 'embedded',
    category: 'Cross-Compiler & Build System',
    vendor: 'Arm Ltd / GNU Project',
    license: 'Open Source',
    purpose: 'Cross-compiles C and C++ source code into machine binaries (ELF, HEX, BIN) targeting 32-bit ARM Cortex-M and Cortex-R processors.',
    standardIndustryUsage: 'Universal compiler toolchain used across embedded automotive, medical, industrial, and consumer electronics.',
    commandsOrWorkflow: [
      'arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb -mfloat-abi=hard -mfpu=fpv4-sp-d16 -O2 -Wall -c main.c -o main.o',
      'arm-none-eabi-ld -T linker.ld main.o startup.o -o firmware.elf -Map=firmware.map',
      'arm-none-eabi-objcopy -O binary firmware.elf firmware.bin',
      'arm-none-eabi-size firmware.elf'
    ],
    relevanceByField: [
      { field: 'Bare-Metal Firmware', note: 'Essential for understanding cross-compilation flags, linker scripts, map files, and binary generation.' },
      { field: 'RTOS Systems', note: 'Used to compile FreeRTOS/Zephyr kernels with hardware floating-point unit (FPU) support.' }
    ]
  },
  {
    id: 'tool-gdb-openocd',
    name: 'GDB & OpenOCD (Open On-Chip Debugger)',
    discipline: 'embedded',
    category: 'JTAG/SWD Debugger & Flasher',
    vendor: 'Open-Source Community',
    license: 'Open Source',
    purpose: 'Interfaces between host computer and on-chip hardware debug blocks (ARM CoreSight / RISC-V Debug Module) over JTAG/SWD adapters (ST-Link, J-Link, CMSIS-DAP).',
    standardIndustryUsage: 'Standard command-line and automated CI/CD hardware-in-the-loop (HIL) flashing and debugging tool.',
    commandsOrWorkflow: [
      'openocd -f interface/stlink.cfg -f target/stm32f4x.cfg',
      'arm-none-eabi-gdb firmware.elf',
      '(gdb) target extended-remote :3333',
      '(gdb) load; monitor reset halt; b main; c',
      '(gdb) print /x *0x40020000 (Read physical register address)'
    ],
    relevanceByField: [
      { field: 'Bare-Metal & Firmware', note: 'Allows setting hardware breakpoints, examining memory-mapped registers, and inspecting stack frames on real silicon.' }
    ]
  },
  {
    id: 'tool-saleae-logic',
    name: 'Saleae Logic Pro Analyzer',
    discipline: 'embedded',
    category: 'Hardware Bus Protocol Analyzer',
    vendor: 'Saleae',
    license: 'Commercial EDA',
    purpose: 'High-speed digital and analog logic analyzer capturing bus waveforms and decoding protocols (I2C, SPI, UART, CAN, USB, AXI-Stream) in real time.',
    standardIndustryUsage: 'The indispensible daily bench tool of every firmware engineer for verifying register reads and debugging bus timing.',
    commandsOrWorkflow: [
      'Connect Ch 0 (SCL), Ch 1 (SDA) -> Select I2C Protocol Decoder -> Sample at 25 MS/s',
      'Filter by ACK / NACK error packets and export CSV/JSON decode traces',
      'Measure SCL rise-time and fall-time against I2C bus capacitance limits'
    ],
    relevanceByField: [
      { field: 'Device Drivers & Peripherals', note: 'Directly validates whether hardware is responding with ACK, catches framing errors on UART, and verifies SPI clock phases.' }
    ]
  },
  {
    id: 'tool-yocto-project',
    name: 'Yocto Project & BitBake',
    discipline: 'embedded',
    category: 'Embedded Linux Build System',
    vendor: 'Linux Foundation',
    license: 'Open Source',
    purpose: 'Builds custom, reproducible Linux distributions, toolchains, bootloaders, and kernel packages tailored for embedded SoCs (i.MX8, STM32MP1, Zynq, Sitara).',
    standardIndustryUsage: 'Automotive digital cockpits, industrial automation, medical equipment, and high-end networking gateways.',
    commandsOrWorkflow: [
      'source oe-init-build-env build/',
      'bitbake-layers add-layer ../meta-custom-bsp',
      'bitbake core-image-minimal',
      'bitbake -c menuconfig virtual/kernel'
    ],
    relevanceByField: [
      { field: 'Embedded Linux & BSP', note: 'Every senior embedded Linux engineer must know how to write BitBake recipes (.bb), configure machine files, and compile custom images.' }
    ]
  }
];
