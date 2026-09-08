export interface CompensationTier {
  level: string;
  yearsExperience: string;
  indiaCTC: string;
  usRange: string;
  bonusEquity: string;
}

export interface SiliconFailureCaseStudy {
  title: string;
  failureMode: string;
  physicalRootCause: string;
  impactAtTapeout: string;
  detectionMethod: string;
  industrialMitigation: string;
}

export interface WhiteboardProblem {
  title: string;
  question: string;
  formulaOrSchematic: string;
  stepByStepSolution: string[];
  interviewerTrap: string;
}

export interface SubdomainDossier {
  subdomainId: string;
  subdomainName: string;
  compensationLadder: CompensationTier[];
  siliconFailureCaseStudy: SiliconFailureCaseStudy;
  edaToolCommands: { tool: string; command: string; explanation: string }[];
  whiteboardProblem: WhiteboardProblem;
  candidateProofOfWork: {
    title: string;
    description: string;
    keyDeliverables: string[];
  }[];
}

export const SUBDOMAIN_DOSSIERS: Record<string, SubdomainDossier> = {
  frontend: {
    subdomainId: 'frontend',
    subdomainName: 'Frontend (RTL Design, Microarchitecture & Pre-Silicon Verification)',
    compensationLadder: [
      {
        level: 'Entry / L1 (Fresher - 2 Yrs)',
        yearsExperience: '0 - 2 Years',
        indiaCTC: '₹14 LPA - ₹26 LPA',
        usRange: '$115,000 - $145,000 Base',
        bonusEquity: '10-15% Annual Bonus + $20k-$35k RSUs over 4 yrs'
      },
      {
        level: 'Mid / L2 (Senior Engineer)',
        yearsExperience: '2 - 5 Years',
        indiaCTC: '₹24 LPA - ₹42 LPA',
        usRange: '$145,000 - $185,000 Base',
        bonusEquity: '15-20% Bonus + $40k-$75k RSUs over 4 yrs'
      },
      {
        level: 'Staff / L3 (Staff / Tech Lead)',
        yearsExperience: '5 - 8+ Years',
        indiaCTC: '₹40 LPA - ₹75 LPA',
        usRange: '$185,000 - $240,000 Base',
        bonusEquity: '20-25% Bonus + $80k-$150k RSUs / yr'
      },
      {
        level: 'Principal / Architect (L4 / Fellow)',
        yearsExperience: '8+ - 15+ Years',
        indiaCTC: '₹75 LPA - ₹1.4+ Cr',
        usRange: '$240,000 - $350,000+ Base',
        bonusEquity: '25-35% Bonus + $150k-$300k+ RSUs / yr'
      }
    ],
    siliconFailureCaseStudy: {
      title: 'Asynchronous Reset Deassertion Glitch & Metastability Race in AXI Bridge',
      failureMode: 'Chip lockup under rapid warm restart or voltage dip',
      physicalRootCause: 'Asynchronous reset was released synchronously to clk_a, but leaked asynchronously across clock domain boundary into clk_b without reset synchronizer tree, violating recovery ($t_{rec}$) and removal ($t_{rem}$) times on flip-flop control pins.',
      impactAtTapeout: 'Silicon deadlock requiring metal layer ECO (Engineering Change Order) or full fab mask re-spin costing $3M - $8M on TSMC 5nm.',
      detectionMethod: 'Synopsys SpyGlass CDC / Questa CDC checking `check_reset_sync` violations + Gate-level simulation with SDF timing delays enabled.',
      industrialMitigation: 'Implement standard Reset Synchronizer: Dual-stage flip-flop chain with asynchronous assert and synchronous deassertion (`always_ff @(posedge clk or negedge rst_n)`), constrained with `set_false_path` on assert only.'
    },
    edaToolCommands: [
      {
        tool: 'Synopsys VCS Simulator',
        command: 'vcs -sverilog +v2k -debug_access+all -kdb -lca -timescale=1ns/1ps -f filelist.f +define+UVM_NO_DEPRECATED +UVM_VERBOSITY=UVM_HIGH',
        explanation: 'Compiles SystemVerilog RTL and UVM testbench with Verdi knowledge database (kdb) debug symbols for cycle-by-cycle waveform dump.'
      },
      {
        tool: 'Synopsys SpyGlass Lint & CDC',
        command: 'sg_shell -64 -f cdc_run.tcl -exec "read_design -verilog {rtl/*.sv}; compile_design; check_cdc -methodology cdc_advanced"',
        explanation: 'Performs static structural clock domain crossing verification, detecting unsynchronized multi-bit signals and reset domains.'
      },
      {
        tool: 'Siemens Questa Sim',
        command: 'vsim -coverage -voptargs="+acc" work.top_tb -do "coverage save -onexit cov.ucdb; run -all; exit"',
        explanation: 'Runs regression simulation with code and functional coverage extraction into Unified Coverage Database (UCDB).'
      }
    ],
    whiteboardProblem: {
      title: 'Asynchronous FIFO Depth Calculation with Burst Transfer',
      question: 'Calculate the minimum FIFO depth required to prevent data overflow given: Write clock $f_w = 200\\text{ MHz}$, Read clock $f_r = 75\\text{ MHz}$. Burst size $B = 80$ words. During burst, writer produces 1 word every clock cycle. Reader can read 1 word every 2 clock cycles continuously. No idle delay between read cycles.',
      formulaOrSchematic: 'Depth \\ge B - \\left( \\frac{B}{f_w} \\times \\frac{f_r}{\\text{read\\_interval}} \\right)',
      stepByStepSolution: [
        'Time required to write entire burst: $T_{write} = \\frac{B}{f_w} = \\frac{80}{200\\times 10^6} = 400\\text{ ns}$.',
        'In $400\\text{ ns}$, number of read clock cycles elapsed: $N_{rc} = T_{write} \\times f_r = 400\\times 10^{-9} \\times 75\\times 10^6 = 30$ cycles.',
        'Reader reads 1 word every 2 cycles, so words read during write burst: $W_{read} = \\lfloor \\frac{30}{2} \\rfloor = 15$ words.',
        'Number of words left accumulating in FIFO: $\\Delta = B - W_{read} = 80 - 15 = 65$ words.',
        'To account for 2-FF synchronizer latency on pointer passing (2 read clock cycles delay = up to 2 extra words written before full flag clears): Safe Minimum Depth = $65 + 2 = 67$ words.',
        'In actual hardware design, round up to next power-of-2 for Gray code counter symmetry: $\\mathbf{Depth = 128}$ or minimum parameterized depth of 68.'
      ],
      interviewerTrap: 'Students often forget the 2-FF pointer synchronization latency across clock domains, leading to an under-dimensioned FIFO that overflows on back-to-back bursts.'
    },
    candidateProofOfWork: [
      {
        title: '5-Stage Pipelined RV32I Core with Hazard Forwarding',
        description: 'Complete synthesizable Verilog implementation of RISC-V 32-bit Integer instruction set architecture with data forwarding unit, stall unit for load-use hazards, and dynamic branch predictor.',
        keyDeliverables: ['Pipeline hazard unit', 'AXI4-Lite master memory interface', 'Verilator C++ testbench running compliance tests']
      },
      {
        title: 'Parameterized Dual-Clock Asynchronous FIFO with Gray-Code Pointers',
        description: 'Industrial CDC-safe FIFO with empty/full flags evaluated using 2-FF synchronizers, Gray pointer arithmetic, and zero metastability escape.',
        keyDeliverables: ['Synthesizable RTL', 'SpyGlass CDC clean rule deck', 'UVM testbench with constrained-random write/read bursts']
      },
      {
        title: 'AXI4-Lite to APB4 Protocol Bridge with Register File Generator',
        description: 'Automated memory-mapped bus converter supporting wait states, byte enables, and error response propagation.',
        keyDeliverables: ['Synthesizable bridge RTL', 'SystemVerilog Assertions (SVA) checking AXI handshakes', 'Python register map generator script']
      }
    ]
  },
  backend: {
    subdomainId: 'backend',
    subdomainName: 'Backend (Physical Design, Static Timing Analysis & Signoff)',
    compensationLadder: [
      {
        level: 'Entry / L1 (Fresher - 2 Yrs)',
        yearsExperience: '0 - 2 Years',
        indiaCTC: '₹15 LPA - ₹30 LPA',
        usRange: '$120,000 - $155,000 Base',
        bonusEquity: '10-15% Bonus + $25k-$40k RSUs'
      },
      {
        level: 'Mid / L2 (Senior PD Engineer)',
        yearsExperience: '2 - 5 Years',
        indiaCTC: '₹26 LPA - ₹48 LPA',
        usRange: '$150,000 - $195,000 Base',
        bonusEquity: '15-20% Bonus + $50k-$90k RSUs'
      },
      {
        level: 'Staff / L3 (Lead / Signoff Authority)',
        yearsExperience: '5 - 8+ Years',
        indiaCTC: '₹45 LPA - ₹85 LPA',
        usRange: '$195,000 - $260,000 Base',
        bonusEquity: '20-25% Bonus + $90k-$180k RSUs / yr'
      },
      {
        level: 'Principal / Fellow (Chief PnR Architect)',
        yearsExperience: '8+ - 15+ Years',
        indiaCTC: '₹80 LPA - ₹1.6+ Cr',
        usRange: '$260,000 - $380,000+ Base',
        bonusEquity: '30-40% Bonus + $180k-$350k+ RSUs / yr'
      }
    ],
    siliconFailureCaseStudy: {
      title: 'Electromigration IR Drop Induced Clock Jitter at Fast-Process Cold-Temperature Corner',
      failureMode: 'High-frequency core resets or computes corrupt checksums under sudden peak compute bursts.',
      physicalRootCause: 'Current density $J$ in lower metal layers (M1-M3) exceeded fab electromigration limit ($J_{max} = 1.5\\text{ mA}/\\mu\\text{m}^2$) during concurrent register switching, causing localized IR drop of 140mV (18% of 0.75V VDD). Clock buffer delay increased by 65ps, flipping positive hold slack into fatal negative hold violation.',
      impactAtTapeout: 'Unrecoverable timing failure in fabricated silicon. Post-silicon yield dropped from 88% to 14%, necessitating an expensive $6M re-tapeout.',
      detectionMethod: 'Ansys RedHawk-SC dynamic vector-based voltage drop analysis paired with Synopsys PrimeTime dynamic clock jitter derating.',
      industrialMitigation: 'Strap dense Power Mesh on thick top metal layers (M7-M9), insert decoupling capacitor (decap) filler cells adjacent to high-toggle clock buffers, and enforce multi-corner multi-mode (MCMM) hold signoff with On-Chip Variation (AOCV/POCV) derates.'
    },
    edaToolCommands: [
      {
        tool: 'Synopsys PrimeTime (STA)',
        command: 'pt_shell -f run_sta.tcl -x "read_verilog post_route.v; link; read_sdc signoff.sdc; report_timing -delay_type max -nworst 10 -path_type full_clock_expanded > setup_viol.rpt"',
        explanation: 'Executes golden signoff Static Timing Analysis extracting setup slack, clock skew, and interconnect RC delay across all PVT corners.'
      },
      {
        tool: 'Cadence Innovus (P&R)',
        command: 'innovus -no_gui -init run_pnr.tcl -files "init_design; floorPlan -r 1.0 0.7 10 10 10 10; place_opt_design; ccopt_design; routeDesign; optDesign -postRoute"',
        explanation: 'Drives the entire place and route execution from floorplan generation to CTS and post-route timing closure.'
      },
      {
        tool: 'Siemens Calibre (DRC/LVS)',
        command: 'calibre -drc -hier -turbo 8 -fx calibre_drc.rule chip_layout.gds',
        explanation: 'Performs hierarchical physical design rule checking ensuring layout shapes comply with foundry minimum spacing, width, and antenna rules.'
      }
    ],
    whiteboardProblem: {
      title: 'Hold Time Violation Calculation Under Clock Skew and Jitter',
      question: 'Consider two consecutive flip-flops $FF_1$ (launch) and $FF_2$ (capture). Clock period $T_{clk} = 2\\text{ ns}$. Parameters: $T_{cq,min} = 0.15\\text{ ns}$, $T_{cq,max} = 0.35\\text{ ns}$. Combinational logic delay: $T_{comb,min} = 0.08\\text{ ns}$, $T_{comb,max} = 0.95\\text{ ns}$. Flip-flop hold requirement: $T_{hold} = 0.12\\text{ ns}$. Clock network delay to $FF_1$: $T_{clk1} = 0.40\\text{ ns}$. Clock network delay to $FF_2$: $T_{clk2} = 0.55\\text{ ns}$. Determine if a hold violation occurs, compute the slack, and specify the exact fix.',
      formulaOrSchematic: '\\text{Hold Slack} = (T_{cq,min} + T_{comb,min}) - (T_{hold} + T_{skew}) \\quad \\text{where } T_{skew} = T_{clk2} - T_{clk1}',
      stepByStepSolution: [
        'Calculate clock skew: $T_{skew} = T_{clk2} - T_{clk1} = 0.55\\text{ ns} - 0.40\\text{ ns} = +0.15\\text{ ns}$ (positive skew, capture clock arrives later).',
        'Calculate data arrival time for hold analysis (fastest path): $T_{arrival} = T_{cq,min} + T_{comb,min} = 0.15\\text{ ns} + 0.08\\text{ ns} = 0.23\\text{ ns}$.',
        'Calculate data required time for hold analysis: $T_{required} = T_{hold} + T_{skew} = 0.12\\text{ ns} + 0.15\\text{ ns} = 0.27\\text{ ns}$.',
        'Calculate hold slack: $\\text{Slack}_{hold} = T_{arrival} - T_{required} = 0.23\\text{ ns} - 0.27\\text{ ns} = \\mathbf{-0.04\\text{ ns} (-40\\text{ ps})}$.',
        'Conclusion: A **Hold Violation (-40 ps)** occurs! Data from $FF_1$ races through and corrupts the previous value in $FF_2$ before it can be held.',
        'Fix: Insert delay buffers (e.g. 2 standard non-inverting buffers adding at least $50\\text{ ps}$ delay) on the data path between $FF_1$ and $FF_2$. Note: Unlike setup violations, hold violations cannot be fixed by lowering clock frequency in the lab!'
      ],
      interviewerTrap: 'Candidates often attempt to fix hold violations by increasing the clock period. Pointing out that $T_{clk}$ does not appear in the hold equation immediately demonstrates industrial competence.'
    },
    candidateProofOfWork: [
      {
        title: 'OpenLane RTL-to-GDSII ASIC Tapeout Flow on SkyWater 130nm',
        description: 'Complete physical design implementation of an SPI/AES peripheral using open-source OpenLane, Yosys, Magic, and KLayout.',
        keyDeliverables: ['GDSII layout file with zero DRC violations', 'Magic extraction LVS report', 'OpenSTA timing slack reports across min/max corners']
      },
      {
        title: 'CMOS Standard Cell Library Characterization & Inverter Sizing Script',
        description: 'TCL and Python automation pipeline simulating standard cell delay and power lookup tables using NGSPICE at varied load capacitances.',
        keyDeliverables: ['Liberty (.lib) format file generation', 'Propagation delay curves vs fanout', 'Power dissipation breakdown']
      },
      {
        title: 'Clock Tree Synthesis (CTS) H-Tree vs Mesh Optimization Case Study',
        description: 'Analysis of clock skew, insertion delay, and power consumption tradeoffs under varying wire widths and buffer sizing.',
        keyDeliverables: ['DEF floorplan with routed clock tree', 'Skew comparison histograms', 'Dynamic power reduction report']
      }
    ]
  },
  'analog-mixed-signal': {
    subdomainId: 'analog-mixed-signal',
    subdomainName: 'Analog & Mixed-Signal (AMS) IC Design',
    compensationLadder: [
      {
        level: 'Entry / L1 (Fresher - 2 Yrs)',
        yearsExperience: '0 - 2 Years',
        indiaCTC: '₹16 LPA - ₹32 LPA',
        usRange: '$125,000 - $160,000 Base',
        bonusEquity: '10-15% Bonus + $25k-$45k RSUs'
      },
      {
        level: 'Mid / L2 (Senior AMS Designer)',
        yearsExperience: '2 - 5 Years',
        indiaCTC: '₹28 LPA - ₹52 LPA',
        usRange: '$155,000 - $205,000 Base',
        bonusEquity: '15-20% Bonus + $55k-$100k RSUs'
      },
      {
        level: 'Staff / L3 (Lead AMS Architect)',
        yearsExperience: '5 - 8+ Years',
        indiaCTC: '₹48 LPA - ₹90 LPA',
        usRange: '$200,000 - $275,000 Base',
        bonusEquity: '20-30% Bonus + $100k-$200k RSUs / yr'
      },
      {
        level: 'Principal / Fellow (Chief Analog Guru)',
        yearsExperience: '8+ - 15+ Years',
        indiaCTC: '₹85 LPA - ₹1.7+ Cr',
        usRange: '$275,000 - $400,000+ Base',
        bonusEquity: '30-50% Bonus + $200k-$400k+ RSUs / yr'
      }
    ],
    siliconFailureCaseStudy: {
      title: 'Substrate Thermal Gradient Induced Bandgap Reference Offset Drift',
      failureMode: 'ADC precision degraded from 14-bit ENOB to 9.2-bit ENOB under heavy digital core activity.',
      physicalRootCause: 'The bandgap voltage reference ($V_{ref} = 1.205\\text{ V}$) was placed adjacent to a multi-core CPU cluster. Thermal dissipation created a $12^\\circ\\text{C}$ gradient across the paired BJT transistors, breaking current mirror ratio matching ($I_1 / I_2 \\neq 1$) and causing a 35mV reference drift.',
      impactAtTapeout: 'Automotive telemetry sensor failed functional temperature qualification between $-40^\\circ\\text{C}$ and $+125^\\circ\\text{C}$.',
      detectionMethod: 'Cadence Spectre electro-thermal coupled co-simulation with 3D substrate thermal mapping.',
      industrialMitigation: 'Layout bandgap BJTs and critical differential pairs in Common-Centroid cross-quad configuration with dummy perimeter devices, shielded by deep N-well guard rings tied to clean analog ground.'
    },
    edaToolCommands: [
      {
        tool: 'Cadence Virtuoso ADE-XL',
        command: 'virtuoso -nograph -replay ams_sim.il',
        explanation: 'Drives Spectre simulation sweeps across Monte Carlo statistical mismatch, temperature (-40C to 125C), and process corners (SS, TT, FF).'
      },
      {
        tool: 'Synopsys FineSim / CustomSim',
        command: 'finesim -spice -np 8 bandgap_tb.sp -o output_dir/',
        explanation: 'Fast-SPICE multi-threaded transistor-level simulation of mixed-signal blocks including DACs, ADCs, and charge pumps.'
      }
    ],
    whiteboardProblem: {
      title: 'Two-Stage Miller-Compensated CMOS Op-Amp Stability & Slew Rate',
      question: 'For a two-stage CMOS op-amp, given load capacitance $C_L = 5\\text{ pF}$, Miller compensation capacitor $C_c = 1.2\\text{ pF}$, and input stage tail bias current $I_{tail} = 40\\;\\mu\\text{A}$. (a) Calculate the Slew Rate ($SR$). (b) Calculate the unity-gain bandwidth ($GBW$) if input transconductance $g_{m1} = 240\\;\\mu\\text{A/V}$.',
      formulaOrSchematic: 'SR = \\frac{I_{tail}}{C_c}, \\quad GBW = \\frac{g_{m1}}{2\\pi C_c}',
      stepByStepSolution: [
        'Calculate Slew Rate: $SR = \\frac{I_{tail}}{C_c} = \\frac{40\\times 10^{-6}\\text{ A}}{1.2\\times 10^{-12}\\text{ F}} = 33.33\\times 10^6\\text{ V/s} = \\mathbf{33.33\\text{ V/}\\mu\\text{s}}$.',
        'Calculate Gain-Bandwidth Product (GBW): $GBW = \\frac{g_{m1}}{2\\pi C_c} = \\frac{240\\times 10^{-6}}{2\\times 3.14159\\times 1.2\\times 10^{-12}} = \\frac{240}{7.54\\times 10^{-6}} = 31.83\\times 10^6\\text{ Hz} = \\mathbf{31.83\\text{ MHz}}$.',
        'Stability Check: Non-dominant pole $p_2 \\approx \\frac{g_{m2}}{C_L}$. To ensure $60^\\circ$ phase margin, we require $p_2 \\ge 2.2\\times GBW = 70\\text{ MHz}$, requiring second stage transconductance $g_{m2} \\ge 2\\pi \\times 70\\text{ MHz} \\times 5\\text{ pF} = 2.2\\text{ mA/V}$.'
      ],
      interviewerTrap: 'Candidates often divide by $C_L$ instead of compensation capacitor $C_c$ when calculating slew rate, forgetting that the input stage saturates and charges $C_c$ directly.'
    },
    candidateProofOfWork: [
      {
        title: 'Folded-Cascode Operational Amplifier with Common-Mode Feedback (CMFB)',
        description: 'Transistor-level design in Cadence Virtuoso / NGSPICE targeting 75dB open-loop gain and >65° phase margin across PVT corners.',
        keyDeliverables: ['Bode plot frequency response', 'Transient settling time curves', 'Monte Carlo mismatch histogram']
      },
      {
        title: 'High-Speed 8-Bit 500MS/s Flash ADC with Resistor Ladder',
        description: 'Comparative study of kickback noise in dynamic regenerative comparators and bubble-error correction encoding.',
        keyDeliverables: ['SPICE netlist', 'DNL and INL linearity plots', 'Eye diagram of reconstructed waveform']
      }
    ]
  },
  'fpga-emulation': {
    subdomainId: 'fpga-emulation',
    subdomainName: 'FPGA Prototyping & Hardware Emulation',
    compensationLadder: [
      {
        level: 'Entry / L1 (Fresher - 2 Yrs)',
        yearsExperience: '0 - 2 Years',
        indiaCTC: '₹14 LPA - ₹28 LPA',
        usRange: '$115,000 - $150,000 Base',
        bonusEquity: '10-15% Bonus + $20k-$35k RSUs'
      },
      {
        level: 'Mid / L2 (Senior Emulation Eng)',
        yearsExperience: '2 - 5 Years',
        indiaCTC: '₹25 LPA - ₹45 LPA',
        usRange: '$145,000 - $190,000 Base',
        bonusEquity: '15-20% Bonus + $45k-$85k RSUs'
      },
      {
        level: 'Staff / L3 (Staff Prototyping Eng)',
        yearsExperience: '5 - 8+ Years',
        indiaCTC: '₹42 LPA - ₹80 LPA',
        usRange: '$190,000 - $250,000 Base',
        bonusEquity: '20-25% Bonus + $85k-$160k RSUs / yr'
      },
      {
        level: 'Principal / Fellow (Head of Silicon Emulation)',
        yearsExperience: '8+ - 15+ Years',
        indiaCTC: '₹75 LPA - ₹1.5+ Cr',
        usRange: '$250,000 - $360,000+ Base',
        bonusEquity: '25-35% Bonus + $160k-$320k+ RSUs / yr'
      }
    ],
    siliconFailureCaseStudy: {
      title: 'Multi-FPGA Inter-Die Partitioning Latency Inducing False Deadlock in PCIe Controller',
      failureMode: 'Emulation model hung during OS Linux boot when negotiating PCIe gen4 link training state machine (LTSSM).',
      physicalRootCause: 'ASIC design exceeded capacity of a single FPGA and was partitioned across 2 Xilinx UltraScale+ FPGAs. The high-speed interconnect between FPGAs introduced 6 clock cycles of serialization/deserialization delay on the credit return path, violating strict timing assumptions in the software protocol stack.',
      impactAtTapeout: 'Pre-silicon firmware validation blocked for 3 weeks; delayed software tape-in milestone.',
      detectionMethod: 'Synopsys ZeBu hardware-assisted emulation trace buffer and transaction-level testbench inspection.',
      industrialMitigation: 'Implement clock ratio stepping: Slow down core emulation clock domain during link negotiation or insert asynchronous credit buffers specifically designed for multi-FPGA partitioned pipelines.'
    },
    edaToolCommands: [
      {
        tool: 'Xilinx Vivado ML Enterprise',
        command: 'vivado -mode batch -source build_bitstream.tcl -tclargs -part xcvu19p-fsva3824-2-e',
        explanation: 'Synthesizes massive million-gate design, manages timing constraints (XDC), and generates programming bitstream for prototyping boards.'
      },
      {
        tool: 'Cadence Palladium / Synopsys ZeBu',
        command: 'zebu_compile -project zebu.prj -target zebu_board -speed_mode fast',
        explanation: 'Compiles RTL netlist for dedicated hardware emulator execution running at 2-10 MHz for full OS booting.'
      }
    ],
    whiteboardProblem: {
      title: 'FPGA Clock Domain Crossing Using Distributed Block RAM (BRAM)',
      question: 'Design an interface connecting a 250 MHz packet generator to a 100 MHz packet processor using a Xilinx True Dual-Port BRAM. (a) What addressing scheme ensures that read and write addresses never access the same memory location simultaneously? (b) What is the consequence if read and write operations hit the same address in the same clock cycle when `WRITE_MODE` is set to `NO_CHANGE`?',
      formulaOrSchematic: '\\text{Collision Condition: } (Addr_A == Addr_B) \\land (EN_A \\land EN_B) \\land (WE_A \\lor WE_B)',
      stepByStepSolution: [
        'Dual-port BRAM has Port A (Write, 250MHz) and Port B (Read, 100MHz).',
        'To prevent memory collision, pointers must be tracked in an asynchronous FIFO wrapper where write pointer is converted to Gray code, synchronized to 100MHz via 2-FF, and compared to read pointer for Full/Almost-Full generation.',
        'If an address collision occurs during a write, the output of the read port enters an undefined state (X-propagation) and stored data in the memory cell may be corrupted due to dual-port bitline fighting.',
        'With `NO_CHANGE` mode, the output latches retain the previous cycle data, but the memory array contents are corrupted unless collision prevention logic inhibits one port.'
      ],
      interviewerTrap: 'Candidates often believe that True Dual-Port BRAM automatically handles asynchronous clock domains. In reality, BRAM contains no internal arbitration logic; avoiding address collisions is 100% the responsibility of the designer!'
    },
    candidateProofOfWork: [
      {
        title: 'AXI4 DMA Engine Flashed and Verified on Digilent Basys3 / PYNQ-Z2',
        description: 'Complete RTL data mover moving streaming packet bursts between DDR memory and hardware filter block.',
        keyDeliverables: ['Vivado XDC timing constraints file', 'Integrated Logic Analyzer (ILA) hardware capture traces', 'Throughput measurement report']
      }
    ]
  },
  'post-silicon-validation': {
    subdomainId: 'post-silicon-validation',
    subdomainName: 'Post-Silicon Validation & Lab Bringup',
    compensationLadder: [
      {
        level: 'Entry / L1 (Fresher - 2 Yrs)',
        yearsExperience: '0 - 2 Years',
        indiaCTC: '₹13 LPA - ₹25 LPA',
        usRange: '$110,000 - $145,000 Base',
        bonusEquity: '10-15% Bonus + $20k-$30k RSUs'
      },
      {
        level: 'Mid / L2 (Senior Silicon Validation)',
        yearsExperience: '2 - 5 Years',
        indiaCTC: '₹22 LPA - ₹42 LPA',
        usRange: '$140,000 - $185,000 Base',
        bonusEquity: '15-20% Bonus + $40k-$75k RSUs'
      },
      {
        level: 'Staff / L3 (Lab Bringup Lead)',
        yearsExperience: '5 - 8+ Years',
        indiaCTC: '₹38 LPA - ₹72 LPA',
        usRange: '$185,000 - $240,000 Base',
        bonusEquity: '20-25% Bonus + $75k-$140k RSUs / yr'
      },
      {
        level: 'Principal / Fellow (Director of Validation)',
        yearsExperience: '8+ - 15+ Years',
        indiaCTC: '₹70 LPA - ₹1.4+ Cr',
        usRange: '$240,000 - $340,000+ Base',
        bonusEquity: '25-35% Bonus + $140k-$280k+ RSUs / yr'
      }
    ],
    siliconFailureCaseStudy: {
      title: 'Power-On Reset (POR) Glitch Due to Voltage Rail Slew-Rate Sensitivity',
      failureMode: 'First batch of wafers returned from fab; 40% of test chips fail to boot on the evaluation board.',
      physicalRootCause: 'On-chip brownout detector and POR circuit assumed a power supply ramp rate of $\\le 1\\text{ ms}$. The lab bench power supply had a fast $150\\;\\mu\\text{s}$ slew rate with a 50mV overshoot ring, causing the internal reference node to latch into an invalid state before reset could deassert.',
      impactAtTapeout: 'Lab bringup stalled for 10 days until root-cause identified using 20GS/s digital storage oscilloscope with active probes.',
      detectionMethod: 'High-bandwidth active FET differential probing of on-die VDD and reset pads.',
      industrialMitigation: 'Immediate lab workaround: Add 470nF external capacitor on the board reset rail. Silicon revision fix: Add hysteresis comparator and bandgap-independent RC delay element to the POR netlist.'
    },
    edaToolCommands: [
      {
        tool: 'Python PyVISA Test Automation',
        command: 'python run_shmoo.py --voltage 0.65:0.95:0.025 --freq 800:2400:50 --temp -40:125:15 --output shmoo_plot.csv',
        explanation: 'Automates thermal chamber, DC power supplies, and signal generators to generate Shmoo plots mapping pass/fail operating boundaries.'
      },
      {
        tool: 'Lauterbach Trace32 / JTAG Debugger',
        command: 't32marm -c system.cpu cortex-a53; core.select 0; break; data.dump 0x40000000',
        explanation: 'Attaches hardware JTAG in-circuit debugger to read silicon CPU core status and inspect memory-mapped hardware registers.'
      }
    ],
    whiteboardProblem: {
      title: 'Interpreting Shmoo Plots & Voltage Margining',
      question: 'During post-silicon characterization of a 3 GHz processor core, a Shmoo plot of Supply Voltage (Y-axis, 0.65V to 1.05V) vs Frequency (X-axis, 1.5 GHz to 3.5 GHz) shows a "wall" at 2.8 GHz where increasing voltage above 0.85V no longer yields higher operating frequency, and chip fails due to timing violation. Explain the physical mechanism causing this anomaly.',
      formulaOrSchematic: 'T_{clk,min} = T_{cq}(V) + T_{comb}(V) + T_{setup}(V) + T_{jitter}(V) + \\Delta T_{thermal}(I \\cdot V)',
      stepByStepSolution: [
        'At moderate voltages (0.65V to 0.85V), gate propagation delay scales inversely with voltage: $t_{pd} \\propto \\frac{C_L V_{dd}}{(V_{dd} - V_{th})^\\alpha}$. Thus frequency increases linearly with voltage.',
        'Above 0.85V, the "frequency wall" indicates one of two physical phenomena:',
        '1. **Dynamic Power Induced Self-Heating & Thermal Inversion**: At deep sub-micron nodes (<7nm), gate delay exhibits Temperature Inversion. Extreme power dissipation ($P = C V^2 f$) elevates die temperature past $110^\\circ\\text{C}$, dropping carrier mobility $\\mu(T) \\propto T^{-1.5}$ and canceling voltage gains.',
        '2. **Hold Time Violation**: As voltage increases, data paths speed up faster than the clock distribution network. If a path had marginal hold slack, increased voltage turns it into a fatal hold violation, stopping circuit operation regardless of clock period!'
      ],
      interviewerTrap: 'Candidates usually guess that the processor is simply "running out of power". The correct answer requires understanding temperature inversion and hold-time race conditions.'
    },
    candidateProofOfWork: [
      {
        title: 'Automated Lab Instrument Automation Framework in Python (PyVISA)',
        description: 'SCPI instrument control suite driving Keysight oscilloscope and Keithley power supply with automated waveform capture and CSV logging.',
        keyDeliverables: ['Python object-oriented driver', 'Automated Shmoo plot generator', 'Jitter eye diagram analysis report']
      }
    ]
  },
  'embedded-baremetal': {
    subdomainId: 'embedded-baremetal',
    subdomainName: 'Bare-Metal Firmware & Board Support Packages (BSP)',
    compensationLadder: [
      {
        level: 'Entry / L1 (Fresher - 2 Yrs)',
        yearsExperience: '0 - 2 Years',
        indiaCTC: '₹8 LPA - ₹18 LPA',
        usRange: '$95,000 - $130,000 Base',
        bonusEquity: '8-12% Bonus + $10k-$20k RSUs'
      },
      {
        level: 'Mid / L2 (Senior Firmware Engineer)',
        yearsExperience: '2 - 5 Years',
        indiaCTC: '₹18 LPA - ₹34 LPA',
        usRange: '$130,000 - $170,000 Base',
        bonusEquity: '12-18% Bonus + $25k-$50k RSUs'
      },
      {
        level: 'Staff / L3 (Lead BSP Architect)',
        yearsExperience: '5 - 8+ Years',
        indiaCTC: '₹32 LPA - ₹60 LPA',
        usRange: '$170,000 - $225,000 Base',
        bonusEquity: '18-25% Bonus + $50k-$100k RSUs / yr'
      },
      {
        level: 'Principal / Fellow (Chief Embedded Architect)',
        yearsExperience: '8+ - 15+ Years',
        indiaCTC: '₹60 LPA - ₹1.2+ Cr',
        usRange: '$225,000 - $310,000+ Base',
        bonusEquity: '25-35% Bonus + $100k-$220k+ RSUs / yr'
      }
    ],
    siliconFailureCaseStudy: {
      title: 'Missing `volatile` Keyword Causing DMA Buffer Corruption Under GCC -O3 Optimization',
      failureMode: 'Network telemetry packets dropped or contain stale zero payloads in release builds, but function perfectly in debug builds (-O0).',
      physicalRootCause: 'The hardware DMA controller wrote incoming Ethernet frames directly into SRAM buffer. The firmware read loop was compiled with GCC -O3. Because the buffer pointer was not declared with `volatile`, the compiler assumed memory was unmodified within the loop and cached the pointer in a CPU register, reading stale zero values.',
      impactAtTapeout: 'Critical industrial gateway failed field trials under high traffic load.',
      detectionMethod: 'Disassembly inspection using `arm-none-eabi-objdump -d` comparing -O0 vs -O3 machine instructions.',
      industrialMitigation: 'Qualify all memory-mapped hardware peripheral registers and DMA buffers with `volatile uint32_t * const`, and enforce D-cache clean and invalidate operations (`SCB_InvalidateDCache_by_Addr`).'
    },
    edaToolCommands: [
      {
        tool: 'GNU ARM Toolchain & GDB',
        command: 'arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb -mfloat-abi=hard -mfpu=fpv4-sp-d16 -O2 -Wall -Wextra -Werror -T linker.ld startup.s main.c -o firmware.elf',
        explanation: 'Compiles firmware for ARM Cortex-M4 with strict warnings, hard floating-point ABI, and custom linker script.'
      },
      {
        tool: 'OpenOCD + GDB Debugger',
        command: 'openocd -f interface/stlink.cfg -f target/stm32f4x.cfg -c "init; reset halt; flash write_image erase firmware.bin 0x08000000; reset run"',
        explanation: 'Programs ARM microcontrollers over SWD/JTAG in-circuit programming dongle and flashes flash memory.'
      }
    ],
    whiteboardProblem: {
      title: 'Circular Ring Buffer Implementation for UART with Atomic Pointer Access',
      question: 'Write a thread-safe circular FIFO buffer in C for UART RX ISR running on an ARM Cortex-M processor. Explain why pointer increment must be handled with power-of-two masking and how to avoid race conditions without disabling all interrupts globally.',
      formulaOrSchematic: 'next\\_head = (head + 1) \\;\\&\\; (BUFFER\\_SIZE - 1) \\quad \\text{where } BUFFER\\_SIZE = 2^N',
      stepByStepSolution: [
        'Define buffer struct: `typedef struct { uint8_t data[256]; volatile uint32_t head; volatile uint32_t tail; } RingBuffer;`.',
        'Use power-of-two size: Masking `& 0xFF` is a single single-cycle assembly instruction (`AND`), whereas modulo `%` operator requires multi-cycle software division or hardware `UDIV`.',
        'Thread safety principle: Only the Interrupt Service Routine (ISR) writes to `head`. Only the main thread writes to `tail`. Both can read each other.',
        'Because write pointer updates are single 32-bit aligned memory writes on Cortex-M (`STR`), they are inherently atomic. Global interrupts do not need to be disabled!'
      ],
      interviewerTrap: 'Candidates often use the modulo `%` operator inside high-speed interrupt service routines, which degrades CPU throughput on chips without hardware dividers.'
    },
    candidateProofOfWork: [
      {
        title: 'Bare-Metal STM32 ARM Cortex-M4 Driver Suite Written from Scratch',
        description: 'Complete memory-mapped peripheral driver library for UART, SPI, I2C, and DMA without using vendor HAL or CubeMX.',
        keyDeliverables: ['Custom Linker script (.ld) and Startup assembly (.s)', 'Vector table definition', 'Oscilloscope verified SPI baud rate waveforms']
      }
    ]
  },
  'embedded-rtos-linux': {
    subdomainId: 'embedded-rtos-linux',
    subdomainName: 'Embedded Linux, RTOS & Real-Time Kernels',
    compensationLadder: [
      {
        level: 'Entry / L1 (Fresher - 2 Yrs)',
        yearsExperience: '0 - 2 Years',
        indiaCTC: '₹10 LPA - ₹22 LPA',
        usRange: '$105,000 - $140,000 Base',
        bonusEquity: '10-15% Bonus + $15k-$30k RSUs'
      },
      {
        level: 'Mid / L2 (Senior Embedded Linux Dev)',
        yearsExperience: '2 - 5 Years',
        indiaCTC: '₹22 LPA - ₹38 LPA',
        usRange: '$140,000 - $180,000 Base',
        bonusEquity: '15-20% Bonus + $35k-$65k RSUs'
      },
      {
        level: 'Staff / L3 (Lead Kernel Architect)',
        yearsExperience: '5 - 8+ Years',
        indiaCTC: '₹36 LPA - ₹68 LPA',
        usRange: '$180,000 - $235,000 Base',
        bonusEquity: '20-25% Bonus + $70k-$130k RSUs / yr'
      },
      {
        level: 'Principal / Fellow (Chief Linux Architect)',
        yearsExperience: '8+ - 15+ Years',
        indiaCTC: '₹68 LPA - ₹1.3+ Cr',
        usRange: '$235,000 - $330,000+ Base',
        bonusEquity: '25-35% Bonus + $130k-$250k+ RSUs / yr'
      }
    ],
    siliconFailureCaseStudy: {
      title: 'Priority Inversion Deadlock in FreeRTOS Mutex Without Inheritance',
      failureMode: 'System watchdog triggers intermittent hard reset under peak network throughput (reproducing the famous Mars Pathfinder bug).',
      physicalRootCause: 'Low priority task $T_L$ held mutex $M$. High priority task $T_H$ requested $M$ and blocked. Medium priority task $T_M$ (not needing $M$) preempted $T_L$. As a result, $T_L$ could never finish to release $M$, indefinitely blocking $T_H$ and starving the system watchdog.',
      impactAtTapeout: 'Unbounded latency in robotic controller causing mechanical collision during stress testing.',
      detectionMethod: 'Percepio Tracealyzer task timeline trace capturing task preemption states.',
      industrialMitigation: 'Use FreeRTOS Mutex with Priority Inheritance enabled (`configUSE_MUTEXES = 1`), which temporarily elevates $T_L$\'s priority to $T_H$\'s priority until $M$ is released.'
    },
    edaToolCommands: [
      {
        tool: 'Yocto Project & BitBake',
        command: 'bitbake core-image-minimal -c populate_sdk',
        explanation: 'Compiles custom Linux kernel, root filesystem, and cross-compilation toolchain for target SoC architecture.'
      },
      {
        tool: 'Linux Device Tree Compiler',
        command: 'dtc -I dts -O dtb -o soc_board.dtb soc_board.dts',
        explanation: 'Compiles human-readable Device Tree Source into binary DTB passed to Linux kernel at U-Boot bootloader stage.'
      }
    ],
    whiteboardProblem: {
      title: 'Linux Character Device Driver Bottom-Half Mechanisms',
      question: 'Compare Linux kernel Interrupt Bottom-Half mechanisms: SoftIRQs, Tasklets, and Workqueues. When handling a 1 Gbps Ethernet controller, which mechanism must be used and why? Can a workqueue handler execute sleeping operations like `kmalloc(..., GFP_KERNEL)` or `msleep()`?',
      formulaOrSchematic: '\\text{Interrupt Flow: HardIRQ (Top-Half) } \\rightarrow \\text{ SoftIRQ / NAPI } \\rightarrow \\text{ User Space Socket}',
      stepByStepSolution: [
        'Top-half (HardIRQ) runs with interrupts disabled; must execute in $<10\\;\\mu\\text{s}$, acknowledge hardware register, and schedule bottom-half.',
        '**SoftIRQs**: Run in interrupt context, highly concurrent (can run on multiple CPUs simultaneously). Used for highest performance paths: Network stack (NET_RX_SOFTIRQ) and block storage.',
        '**Tasklets**: Built on top of SoftIRQs, but serialized (same tasklet cannot run on two CPUs at once). Easier concurrency, but still interrupt context (cannot sleep).',
        '**Workqueues**: Run in kernel thread context (`kworker`). Can sleep, allocate memory, access semaphores, and handle long operations.',
        'For 1 Gbps Ethernet: Must use **SoftIRQs with NAPI polling** to avoid CPU starvation. A workqueue would have too much scheduling latency.',
        'Can Workqueues sleep? **Yes!** Because they run in process context, `msleep()` and `GFP_KERNEL` allocations are fully legal.'
      ],
      interviewerTrap: 'Candidates often claim tasklets can sleep. Calling `msleep()` inside a tasklet or SoftIRQ triggers a fatal kernel panic ("scheduling while atomic")!'
    },
    candidateProofOfWork: [
      {
        title: 'Custom Linux Character Device Driver for FPGA AXI Memory',
        description: 'Kernel module implementing `file_operations` (open, read, write, mmap, ioctl) with interrupt handling and sysfs interface.',
        keyDeliverables: ['C kernel module source', 'Device tree overlay file (.dts)', 'User-space throughput benchmark application']
      }
    ]
  },
  'embedded-automotive-safety': {
    subdomainId: 'embedded-automotive-safety',
    subdomainName: 'Automotive Safety-Critical & Edge AI Systems (ISO 26262)',
    compensationLadder: [
      {
        level: 'Entry / L1 (Fresher - 2 Yrs)',
        yearsExperience: '0 - 2 Years',
        indiaCTC: '₹12 LPA - ₹24 LPA',
        usRange: '$110,000 - $145,000 Base',
        bonusEquity: '10-15% Bonus + $15k-$25k RSUs'
      },
      {
        level: 'Mid / L2 (Senior Functional Safety)',
        yearsExperience: '2 - 5 Years',
        indiaCTC: '₹24 LPA - ₹40 LPA',
        usRange: '$145,000 - $185,000 Base',
        bonusEquity: '15-20% Bonus + $30k-$60k RSUs'
      },
      {
        level: 'Staff / L3 (Lead Safety Assessor)',
        yearsExperience: '5 - 8+ Years',
        indiaCTC: '₹38 LPA - ₹75 LPA',
        usRange: '$185,000 - $245,000 Base',
        bonusEquity: '20-25% Bonus + $60k-$120k RSUs / yr'
      },
      {
        level: 'Principal / Fellow (Chief Safety Officer)',
        yearsExperience: '8+ - 15+ Years',
        indiaCTC: '₹75 LPA - ₹1.4+ Cr',
        usRange: '$245,000 - $340,000+ Base',
        bonusEquity: '25-35% Bonus + $120k-$250k+ RSUs / yr'
      }
    ],
    siliconFailureCaseStudy: {
      title: 'Single-Event Upset (SEU) in Steering Angle Controller Lacking Dual-Core Lockstep',
      failureMode: 'High-altitude autonomous driving test vehicle jerked left without steering input due to atmospheric cosmic ray neutron strike.',
      physicalRootCause: 'A thermal neutron flipped a SRAM cell bit in the register holding target steering angle. The micro-controller lacked dual-core lockstep redundancy and memory ECC, allowing the corrupted angle ($0x0000$ to $0x8000$) to pass directly to the actuator drive.',
      impactAtTapeout: 'Catastrophic ASIL-D failure violating ISO 26262 single-point fault metric (SPFM must be $\\ge 99\\%$).',
      detectionMethod: 'Hardware fault injection test bench using laser pulsing and simulated register bit-flips.',
      industrialMitigation: 'Deploy Dual-Core Lockstep (DCLS) ARM Cortex-R52 / Infineon Aurix with 2-cycle delayed redundant core execution and hardware comparator, plus ECC on all internal SRAM and flash memories.'
    },
    edaToolCommands: [
      {
        tool: 'Vector CAST / Polyspace',
        command: 'polyspace-code-prover -sources motor_control.c -misra-c-2012 all -output-dir results/',
        explanation: 'Performs formal abstract interpretation proving absence of runtime errors (buffer overflow, division by zero) and MISRA C:2012 compliance.'
      },
      {
        tool: 'CANoe / CANalyzer',
        command: 'canoe -config ecu_test.cfg -run -logging on',
        explanation: 'Simulates vehicle network buses (CAN-FD, LIN, Automotive Ethernet) and executes automated hardware-in-the-loop (HIL) test suites.'
      }
    ],
    whiteboardProblem: {
      title: 'ISO 26262 ASIL-D Hardware Architectural Metrics Calculation',
      question: 'An electronic braking ECU has total failure rate $\\lambda = 120\\text{ FIT}$ ($10^{-9}\\text{ failures/hour}$). Failure modes are classified into: Safe faults $\\lambda_s = 40\\text{ FIT}$, Residual dangerous single-point faults $\\lambda_{spf} = 0.8\\text{ FIT}$, Multi-point latent faults $\\lambda_{mpf} = 79.2\\text{ FIT}$. Diagnostic coverage of multi-point faults $K_{mpf} = 92\\%$. (a) Compute the Single-Point Fault Metric (SPFM). (b) Does it satisfy the ISO 26262 ASIL-D requirement?',
      formulaOrSchematic: 'SPFM = 1 - \\frac{\\sum \\lambda_{spf}}{\\sum \\lambda_{total} - \\sum \\lambda_s} = \\frac{\\sum \\lambda_s + \\sum \\lambda_{mpf,det}}{\\sum \\lambda_{total}}',
      stepByStepSolution: [
        'Dangerous faults total: $\\lambda_{dangerous} = \\lambda_{total} - \\lambda_s = 120 - 40 = 80\\text{ FIT}$.',
        'Single-point fault rate is given as $\\lambda_{spf} = 0.8\\text{ FIT}$.',
        'Compute SPFM: $SPFM = 1 - \\frac{\\lambda_{spf}}{\\lambda_{dangerous}} = 1 - \\frac{0.8}{80} = 1 - 0.01 = 0.99 = \\mathbf{99.0\\%}$.',
        'ISO 26262 ASIL-D Requirement Check: ASIL-D mandates $SPFM \\ge 99\\%$. Since calculated $SPFM = 99.0\\%$, it **strictly satisfies** the requirement.',
        'Compute Probabilistic Metric for random Hardware Failures (PMHF): Must be $< 10\\text{ FIT}$ for ASIL-D. Here $\\lambda_{spf} + \\lambda_{mpf,undetected} = 0.8 + (79.2 \\times (1 - 0.92)) = 0.8 + 6.33 = 7.13\\text{ FIT} < 10\\text{ FIT}$. Passes!'
      ],
      interviewerTrap: 'Candidates often mix up Single Point Fault Metric (SPFM) with Latent Fault Metric (LFM). ASIL-D requires both SPFM $\\ge 99\\%$ and LFM $\\ge 90\\%$.'
    },
    candidateProofOfWork: [
      {
        title: 'MISRA C:2012 Compliant CAN-FD Actuator Controller on STM32',
        description: 'Safety-critical state machine for electronic throttle actuator with cyclic redundancy check (CRC-16) and watchdog monitor.',
        keyDeliverables: ['Zero-violation MISRA C compliance report', 'CANoe simulated packet logs', 'FMEA failure modes spreadsheet']
      }
    ]
  }
};
