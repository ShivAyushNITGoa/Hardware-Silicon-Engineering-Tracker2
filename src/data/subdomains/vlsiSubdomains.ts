import { SubdomainDetail } from '../../types';

export const VLSI_SUBDOMAINS: SubdomainDetail[] = [
  // ==========================================================================
  // 1. FRONTEND: RTL DESIGN, MICROARCHITECTURE & VERIFICATION
  // ==========================================================================
  {
    id: 'frontend',
    name: 'Frontend (RTL Design, Microarchitecture & Pre-Silicon Verification)',
    domainId: 'vlsi',
    domainName: 'VLSI & Silicon Design',
    tagline: 'Translating specifications to synthesizable RTL, verifying with UVM & closing coverage',
    description: 'The frontend discipline focuses on hardware microarchitecture definition, synthesizable SystemVerilog/Verilog coding, pipeline design, bus protocols, and comprehensive pre-silicon verification using UVM and formal assertions.',
    iconName: 'Cpu',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    relatedTrackIds: ['digital-electronics', 'computer-arch', 'verification-uvm', 'dft-low-power'],
    relatedEncyclopediaVolumes: ['vol-02', 'vol-03', 'vol-04', 'vol-05', 'vol-06', 'vol-07', 'vol-08'],
    
    // --- 1. CLASSIFICATION BASED ON JOBS ---
    jobs: [
      {
        id: 'job-rtl-design',
        title: 'RTL Design Engineer',
        experienceTier: 'Entry / Intern',
        description: 'Designs synthesizable digital logic modules, finite state machines, clock/reset distribution schemes, and bus interfaces in SystemVerilog/Verilog.',
        salaryIndiaCTC: '₹14 LPA - ₹28 LPA (Tier-1 MNC), ₹7 LPA - ₹12 LPA (Services/Mid)',
        salaryUSRange: '$115,000 - $155,000 Base + RSUs',
        industryDemandLevel: 'Very High',
        standardProcessNodes: ['TSMC N3E / N5 / N7', 'Intel 18A / 3', 'Samsung 4nm GAA'],
        typicalInterviewRounds: [
          'Online Assessment (Verilog logic coding, digital electronics & aptitude)',
          'Technical Round 1: Flip-flop setup/hold timing, FSM encoding, Gray code counters',
          'Technical Round 2: CDC synchronizers, asynchronous FIFO depth calculation, datapath optimization',
          'Architecture & Low Power: UPF power gating, pipeline hazards, branch prediction',
          'Hiring Manager / Culture Fit & Project Defense'
        ],
        dayInTheLifeSnippet: 'Authoring SystemVerilog RTL modules, running SpyGlass lint and CDC checks, inspecting synthesis netlists for critical paths, and collaborating with verification teams to resolve corner-case simulation mismatches.',
        keyResponsibilities: [
          'Translate architectural micro-specifications into synthesizable Verilog/SystemVerilog RTL',
          'Optimize datapaths for area, timing, and dynamic/leakage power consumption (PPA)',
          'Perform RTL linting (Synopsys SpyGlass / Questa Lint) to eliminate inferred latches, combinational loops, and unclocked paths',
          'Analyze synthesis reports from Design Compiler / Genus to inspect critical timing paths and cell area'
        ],
        primaryDeliverables: [
          'Synthesizable SystemVerilog IP modules with zero lint and zero CDC warnings',
          'Documented microarchitecture specifications (MAS) with cycle-accurate timing waveforms',
          'Local unit testbenches with 100% statement and branch coverage before handoff to DV'
        ],
        interviewTopics: [
          'Blocking (=) vs Non-blocking (<=) assignment execution semantics in Verilog event queue',
          'Two-process vs One-process Moore and Mealy FSM design and output glitch elimination',
          'Setup and Hold time constraints in synchronous flip-flops ($T_{clk} \\ge T_{cq} + T_{comb} + T_{setup} - T_{skew}$)',
          'Handling Clock Domain Crossing (CDC) with 2-FF synchronizers, pulse sync, and Gray-coded asynchronous FIFOs'
        ],
        targetCompanies: ['Texas Instruments', 'Qualcomm', 'Intel', 'AMD', 'NVIDIA', 'Synopsys', 'Western Digital', 'Arm', 'Apple', 'Broadcom']
      },
      {
        id: 'job-soc-verification',
        title: 'SoC / ASIC Design Verification (DV) Engineer',
        experienceTier: 'Entry / Intern',
        description: 'Builds object-oriented SystemVerilog UVM testbenches, writes constrained-random sequences, develops monitors and scoreboards, and drives coverage closure.',
        salaryIndiaCTC: '₹15 LPA - ₹30 LPA (Tier-1 MNC), ₹8 LPA - ₹14 LPA (Services/Consultancies)',
        salaryUSRange: '$120,000 - $160,000 Base + RSUs',
        industryDemandLevel: 'Surging',
        standardProcessNodes: ['TSMC N2 / N3P', 'FinFET 5nm / 7nm', 'FD-SOI 22nm'],
        typicalInterviewRounds: [
          'Online Screening: SystemVerilog OOP, assertions, logic puzzles',
          'Technical Round 1: OOP concepts (Polymorphism, Virtual Methods, Encapsulation) in SystemVerilog',
          'Technical Round 2: UVM Phase execution, TLM FIFOs, Factory overrides, Sequencer-Driver handshakes',
          'Verification Plan & Assertions: SVA temporal operators, functional coverage cross bins, bug triage',
          'Managerial & Behavioral Round'
        ],
        dayInTheLifeSnippet: 'Developing reusable UVM verification components (UVCs), writing constrained-random test sequences for corner-case stimulus, triaging overnight regression failures, and analyzing coverage hole reports.',
        keyResponsibilities: [
          'Develop modular UVM verification environments (Agents, Drivers, Monitors, Scoreboards, Environments)',
          'Create constrained-random stimulus generation sequences targeting corner cases and protocol violations',
          'Author SystemVerilog Assertions (SVA) for protocol checking and temporal safety properties',
          'Analyze functional coverage metrics, code coverage (line, branch, toggle, FSM), and write coverage exclusion waivers'
        ],
        primaryDeliverables: [
          'Layered UVM testbenches integrated into continuous integration (CI) regression test suites',
          'Comprehensive verification plan (vPlan) linked directly to architectural specification features',
          'Automated self-checking scoreboards with 100% functional and >95% code coverage signoff reports'
        ],
        interviewTopics: [
          'UVM testbench phases (build_phase, run_phase, check_phase) and phase execution order',
          'Virtual interfaces, polymorphism, shallow vs deep copy, and factory overrides in SystemVerilog OOP',
          'Writing SVA concurrent assertions with sequence operators (|-> vs |=>, ##, throughout, within)',
          'Difference between code coverage (line, branch, toggle) and functional coverage (covergroups, coverpoints, crosses)'
        ],
        targetCompanies: ['Synopsys', 'Cadence', 'Qualcomm', 'Intel', 'AMD', 'Broadcom', 'Microchip', 'MediaTek', 'Marvell', 'Apple']
      },
      {
        id: 'job-formal-verification',
        title: 'Formal Verification (FV) Engineer',
        experienceTier: 'Junior (1-3 Yrs)',
        description: 'Applies mathematical proof engines and model checking to prove absence of bugs, verify safety properties, and uncover deep state-space corner cases.',
        salaryIndiaCTC: '₹18 LPA - ₹34 LPA (Specialized High-Value Role)',
        salaryUSRange: '$135,000 - $175,000 Base',
        industryDemandLevel: 'Very High',
        standardProcessNodes: ['Sub-5nm High-Performance Computing (HPC) & Server CPUs'],
        typicalInterviewRounds: [
          'Technical Round 1: First-order logic, boolean satisfiability (SAT), Bounded Model Checking',
          'Technical Round 2: Complex SystemVerilog Assertions (SVA), assume vs assert vs cover properties',
          'Technical Round 3: State-space explosion mitigation, abstraction models, helper assertions',
          'Architectural Verification & Protocol Signoff'
        ],
        dayInTheLifeSnippet: 'Formulating formal specifications for cache coherence protocols, arbitration schemes, and security boundaries, proving invariant properties using JasperGold, and resolving state-space explosion through cut-points.',
        keyResponsibilities: [
          'Write formal properties (SVA / PSL) specifying exact mathematical hardware requirements',
          'Run Model Checking engines (Cadence JasperGold, Synopsys VC Formal, Mentor Questa Formal)',
          'Mitigate state-space explosion using compositional reasoning, symmetry reduction, and black-boxing',
          'Execute Formal Equivalence Checking (LEC / Formality) between RTL and synthesized netlists'
        ],
        primaryDeliverables: [
          'Mathematically proven formal signoff reports verifying safety and liveness properties',
          'Exhaustive deadlock-free proofs for bus arbiters, crossbars, and memory controllers',
          'Logical Equivalence Checking (LEC) clean waivers post-scan and clock gating insertion'
        ],
        interviewTopics: [
          'Safety properties (bad thing never happens) vs Liveness properties (good thing eventually happens)',
          'Bounded Model Checking (BMC) vs Full Mathematical Proof (k-induction / Craig Interpolation)',
          'Under-constraining vs Over-constraining hazards in formal assumption models',
          'Handling state-space explosion: cut-points, black-boxing, and inductive invariants'
        ],
        targetCompanies: ['Apple', 'Arm', 'Intel', 'NVIDIA', 'AMD', 'Cadence', 'Synopsys', 'Qualcomm']
      },
      {
        id: 'job-processor-architect',
        title: 'ASIC / RISC-V Microarchitect',
        experienceTier: 'Junior (1-3 Yrs)',
        description: 'Defines processor pipeline stages, instruction decoding logic, register files, ALU datapaths, cache hierarchies, and interconnect crossbars.',
        salaryIndiaCTC: '₹18 LPA - ₹36 LPA (Tier-1 Core CPU/AI Teams)',
        salaryUSRange: '$130,000 - $180,000 Base + RSUs',
        industryDemandLevel: 'Surging',
        standardProcessNodes: ['TSMC N3E / N2', 'Intel 18A GAA', 'GF 12LP+'],
        typicalInterviewRounds: [
          'Technical Round 1: Pipelining fundamentals, structural/data/control hazards, forwarding equations',
          'Technical Round 2: Out-of-Order (OoO) execution, Tomasulo algorithm, Reorder Buffer (ROB), register renaming',
          'Technical Round 3: Cache coherence (MESI/MOESI), virtual memory, TLB organization, branch target buffers',
          'Technical Round 4: RISC-V ISA extensions (RV32IMC / RV64GC) and pipeline datapath defense'
        ],
        dayInTheLifeSnippet: 'Designing microarchitectural state diagrams, tuning pipeline branch predictors to reduce misprediction penalties, sizing L1/L2 caches for IPC throughput, and evaluating cycle-accurate performance traces.',
        keyResponsibilities: [
          'Design 5-stage classic RISC-V pipelined cores (IF, ID, EX, MEM, WB) and superscalar extensions',
          'Implement hazard detection units, data forwarding networks, and dynamic branch prediction logic',
          'Integrate L1 instruction/data caches with write-back/write-through policies and MESI coherence',
          'Implement standard AMBA AXI4/AHB bus master and slave interconnect interfaces'
        ],
        primaryDeliverables: [
          'Cycle-accurate RV32I synthesizable core running compiled C benchmarks (Dhrystone, CoreMark)',
          'Hardware performance counter module (CPI, cache misses, branch mispredictions)',
          'AHB/AXI memory interface bridge with burst transfer and out-of-order response support'
        ],
        interviewTopics: [
          'Data hazard resolution: forwarding paths vs stall bubbles in 5-stage RISC pipelines',
          'Branch penalties: static vs 2-bit saturating counter dynamic branch prediction (BHT / BTB)',
          'Memory hierarchy: direct-mapped vs 2-way/4-way set-associative cache line replacement policies',
          'Bus protocols: AXI4 five independent channels, burst transfers, and valid/ready handshakes'
        ],
        targetCompanies: ['Arm', 'Qualcomm', 'InCore Semiconductors', 'Mindgrove Technologies', 'Intel', 'AMD', 'NVIDIA', 'Apple']
      },
      {
        id: 'job-dft-engineer',
        title: 'Design for Test (DFT) Engineer',
        experienceTier: 'Entry / Intern',
        description: 'Inserts scan chains, Built-In Self-Test (BIST) structures, and generates ATPG patterns to guarantee silicon manufacturing fault coverage.',
        salaryIndiaCTC: '₹12 LPA - ₹24 LPA (Product MNC), ₹6.5 LPA - ₹11 LPA (Services)',
        salaryUSRange: '$110,000 - $145,000 Base',
        industryDemandLevel: 'Very High',
        standardProcessNodes: ['TSMC 5nm / 7nm / 16nm', 'GlobalFoundries 22FDX', 'UMC 28nm'],
        typicalInterviewRounds: [
          'Technical Round 1: Stuck-at fault model, controllability & observability, D-algorithm basics',
          'Technical Round 2: Scan chain insertion, shift vs capture mode, lockup latch physics',
          'Technical Round 3: Memory BIST (MBIST) March algorithms, at-speed transition delay faults (LOC / LOS)',
          'Standards & Debug: IEEE 1149.1 JTAG TAP controller state machine, ATPG pattern compression'
        ],
        dayInTheLifeSnippet: 'Configuring scan compression architecture using Siemens Tessent or Synopsys TestMAX, analyzing ATPG test coverage reports, debugging coverage holes caused by unclocked flip-flops or blackboxes.',
        keyResponsibilities: [
          'Perform scan chain insertion replacing standard flip-flops with multiplexed scan flip-flops',
          'Generate Automatic Test Pattern Generation (ATPG) vectors for stuck-at and at-speed transition faults',
          'Implement Memory BIST (MBIST) controllers for embedded SRAM array defect detection and repair',
          'Verify IEEE 1149.1 JTAG boundary scan architectures and IEEE 1687 IJTAG networks'
        ],
        primaryDeliverables: [
          'DFT scan-inserted netlists achieving >99.0% stuck-at and >92% transition fault coverage',
          'ATPG vector sets formatted for Automated Test Equipment (ATE) with minimal test vector count',
          'JTAG TAP controller module with instruction registers (BYPASS, EXTEST, SAMPLE/PRELOAD)'
        ],
        interviewTopics: [
          'Stuck-at-0 and stuck-at-1 fault models, test pattern generation, and fault collapsing',
          'Scan chain shifting vs capture cycles, and why lockup latches are mandatory between different clock domains',
          'JTAG 16-state TAP controller finite state machine sequencing (Test-Logic-Reset, Shift-DR, Update-DR)',
          'Launch-on-Capture (LOC) vs Launch-on-Shift (LOS) for at-speed transition fault testing'
        ],
        targetCompanies: ['Texas Instruments', 'NXP Semiconductors', 'Synopsys', 'Cadence', 'STMicroelectronics', 'Qualcomm', 'Broadcom', 'Tessolve']
      }
    ],

    // --- 2. CLASSIFICATION BASED ON SKILLS ---
    skills: [
      {
        id: 'skill-systemverilog-rtl',
        name: 'Synthesizable SystemVerilog (IEEE 1800-2017)',
        category: 'HDL & RTL',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['IEEE 1800-2017', 'Synopsys Clean RTL Guidelines'],
        industrialBenchmark: '100% synthesizable RTL with zero inferred latches and zero multi-driven nets',
        industryRelevance: 'Universal standard for commercial digital IC design worldwide. All modern IP blocks at Intel, Qualcomm, and Apple are authored in SystemVerilog.',
        masteryCriteria: 'Deep mastery of always_ff, always_comb, always_latch constructs, parameterized interfaces, generate blocks, packed/unpacked arrays, and synthesis coding styles.',
        tools: ['Synopsys VCS', 'Cadence Xcelium', 'Siemens Questa', 'Icarus Verilog', 'Yosys Open-Source'],
        practicalProjectEvidence: 'Synthesizable RV32I 5-stage processor core with hazard forwarding unit, passing all RISC-V compliance test suites.'
      },
      {
        id: 'skill-uvm-verification',
        name: 'UVM 1.2 / IEEE 1800.2 Verification Methodology',
        category: 'Verification & OOP',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['IEEE 1800.2-2020', 'Accellera UVM 1.2'],
        industrialBenchmark: 'Complete testbench with 100% functional covergroup closure and zero transaction drops',
        industryRelevance: 'De-facto industry standard for ASIC pre-silicon verification. 85%+ of semiconductor verification job descriptions mandate UVM.',
        masteryCriteria: 'Ability to architect UVM components from scratch: uvm_sequence, uvm_sequencer, uvm_driver, uvm_monitor, uvm_scoreboard, TLM analysis ports, and factory type overrides.',
        tools: ['Synopsys VCS / Verdi', 'Cadence Xcelium', 'Siemens QuestaSim'],
        practicalProjectEvidence: 'Production-grade UVM testbench verifying an AXI4-Lite slave memory controller with scoreboard checking and functional coverage groups.'
      },
      {
        id: 'skill-sva-assertions',
        name: 'SystemVerilog Assertions (SVA) & Formal Protocol Checking',
        category: 'Verification & OOP',
        proficiencyLevel: 'Advanced Signoff',
        standardsCompliance: ['IEEE 1800-2017 Section 16 (Assertions)'],
        industrialBenchmark: 'Zero assertion failures across 100M+ regression cycles with full temporal coverage',
        industryRelevance: 'Enables white-box verification, catches bugs at source cycles before propagation to outputs, and provides mathematical proofs in formal verification.',
        masteryCriteria: 'Writing concurrent assertions using sequences, properties, implication operators (|->, |=>), temporal delay ranges (##[1:5]), and formal cover directives.',
        tools: ['Cadence JasperGold', 'Synopsys VC Formal', 'Siemens Questa Formal', 'Synopsys VCS'],
        practicalProjectEvidence: 'Comprehensive SVA protocol checker for an AXI4 bus verifying that valid signals remain asserted until ready handshake occurs without protocol violations.'
      },
      {
        id: 'skill-cdc-synchronization',
        name: 'Clock Domain Crossing (CDC) & Reset Domain Crossing (RDC)',
        category: 'Physical & Timing',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['SpyGlass CDC Rules', 'Accellera CDC Guidelines'],
        industrialBenchmark: 'Zero unsynchronized crossings and 100% Gray-code pointer sequence validation',
        industryRelevance: 'Improper CDC causes silicon metastability, non-deterministic functional lockups, and catastrophic chip failures requiring multi-million dollar respins.',
        masteryCriteria: 'Designing and validating 2-FF synchronizers for single-bit quasi-static control signals, pulse toggle synchronizers for narrow pulses, and dual-clock asynchronous FIFOs using Gray-coded read/write pointers.',
        tools: ['Synopsys SpyGlass CDC', 'Questa CDC', 'Cadence JasperGold CDC'],
        practicalProjectEvidence: 'Full-duplex parameterized Asynchronous FIFO with 2-stage synchronizers, Gray pointer conversion, and verified full/empty flag generation under asynchronous clock ratios.'
      },
      {
        id: 'skill-amba-protocols',
        name: 'AMBA On-Chip Interconnects (AXI5, AXI4-Lite, AHB5, APB4, CHI)',
        category: 'HDL & RTL',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['Arm AMBA AXI and ACE Protocol Specification', 'AMBA CHI Issue E'],
        industrialBenchmark: 'Zero handshake deadlocks, sustained maximum burst throughput, and full out-of-order ID tracking',
        industryRelevance: 'Dominant bus interconnect standard across modern SoCs from mobile smartphones to automotive ECUs and datacenter server chips.',
        masteryCriteria: 'Mastery of 5 independent AXI channels (AW, W, B, AR, R), two-way valid/ready handshaking, burst transactions (INCR, WRAP), response statuses (OKAY, EXOKAY, SLVERR, DECERR), and out-of-order transaction IDs.',
        tools: ['Synopsys CoreConsultant', 'Vivado AXI VIP', 'Questa Verification IP'],
        practicalProjectEvidence: 'AXI4-Lite to APB4 bridge controller with parameterized address decoder and register map generation in synthesizable SystemVerilog.'
      }
    ],

    // --- 3. CLASSIFICATION BASED ON KNOWLEDGE ---
    knowledge: [
      {
        id: 'know-pipeline-hazards',
        concept: 'Pipeline Hazards & Datapath Forwarding Networks',
        theoryDepth: 'Architectural Concept',
        whyCrucial: 'Pipelining increases CPU instruction throughput (clock frequency), but data dependencies and branch control transfers introduce bubbles (stalls) that degrade Cycles Per Instruction (CPI).',
        deepAnalysisExplanation: 'In a 5-stage RISC pipeline (IF, ID, EX, MEM, WB), data hazards occur when instruction j reads a register before instruction i writes it (Read-After-Write, RAW). A data forwarding (bypassing) unit routes intermediate results directly from the EX/MEM or MEM/WB pipeline registers to the ALU input multiplexers, eliminating stalls for ALU-to-ALU operations. However, for a Load-Use hazard (where data is only available after MEM stage), a 1-cycle stall bubble is mathematically unavoidable.',
        siliconImpact: 'Every bubble introduced into a processor pipeline decreases compute IPC, resulting in higher execution time and higher energy consumed per task.',
        mitigationTechniques: ['Data forwarding bypass networks', 'Load-use hazard detection hardware interlocks', 'Dynamic branch prediction (BHT/BTB)', 'Compiler instruction scheduling / loop unrolling'],
        keyQuestions: [
          'What are RAW, WAR, and WAW hazards, and why can only RAW hazards occur in an in-order pipeline?',
          'Why does a Load-Use data dependency require at least one stall cycle even when forwarding paths are implemented?',
          'How does a branch target buffer (BTB) coupled with a 2-bit saturating counter branch predictor reduce branch penalty cycles?'
        ],
        whiteboardFormulas: [
          'CPI_{real} = CPI_{ideal} + (Stall_{data} + Stall_{control} + Stall_{structural})',
          'Speedup_{pipeline} = \\frac{N_{stages} \\cdot T_{unpipelined}}{(N_{stages} + N_{inst} - 1) \\cdot T_{stage}} \\approx N_{stages}'
        ],
        interviewEmphasis: 'Asked in almost every processor microarchitecture interview at Arm, Qualcomm, Intel, and Apple.'
      },
      {
        id: 'know-fsm-synthesis',
        concept: 'Finite State Machine (FSM) Synthesis & Output Glitch Elimination',
        theoryDepth: 'Theoretical Foundation',
        whyCrucial: 'FSMs form the central control logic for every digital chip. Combinational glitches on control signals can accidentally trigger write enables, corrupt memory, or cause asynchronous bus resets.',
        deepAnalysisExplanation: 'Mealy machines generate outputs as a function of both current state and current inputs. If inputs contain combinational glitches, the Mealy output immediately glitches. Moore machines generate outputs solely as a function of the current state registers. To produce completely glitch-free outputs, industrial designs register the FSM outputs (Registered Moore) or use 2-process FSM architectures (sequential state transition in always_ff, combinational next-state/output logic in always_comb).',
        siliconImpact: 'Unregistered Mealy outputs driving asynchronous control pins (such as SRAM write enables or FIFO resets) cause catastrophic silent data corruption on fabricated silicon.',
        mitigationTechniques: ['Registered Moore outputs', 'One-hot encoding for high-speed paths (no decoding logic)', 'Gray encoding for low-power or CDC counters'],
        keyQuestions: [
          'What is the fundamental timing difference between Mealy and Moore state machines in terms of latency and input dependency?',
          'Why does One-Hot encoding synthesize faster than Binary encoding on FPGAs and deep submicron ASICs?',
          'What is a safe state recovery mechanism in synthesizable Verilog for unreachable states in one-hot machines?'
        ],
        whiteboardFormulas: [
          'Mealy: Y(t) = \\lambda(S(t), X(t)) \\quad [Glitch\\text{ }Prone]',
          'Moore: Y(t) = \\lambda(S(t)) \\quad [Glitch\\text{ }Protected\\text{ }when\\text{ }registered]'
        ],
        interviewEmphasis: 'Fundamental screening question for entry and junior RTL design positions.'
      },
      {
        id: 'know-frontend-timing',
        concept: 'Synchronous Flip-Flop Setup/Hold Timing Slack & Metastability MTBF',
        theoryDepth: 'Tapeout / Signoff Reality',
        whyCrucial: 'Setup time violations cause incorrect data to be captured at the target frequency (fixable by lowering clock frequency). Hold time violations cause the chip to fail at ANY frequency, resulting in immediate chip death.',
        deepAnalysisExplanation: 'Setup time (T_setup) is the minimum time data must remain stable before the active clock edge. Hold time (T_hold) is the minimum time data must remain stable after the active clock edge. If data transitions within this setup/hold aperture window, the bistable latch inside the flip-flop can balance metastably at the intermediate threshold voltage (Vdd/2). The Mean Time Between Failures (MTBF) measures the statistical reliability of a 2-FF synchronizer resolving metastability.',
        siliconImpact: 'A single unaddressed hold time violation renders fabricated silicon completely non-functional regardless of operating voltage or clock speed.',
        mitigationTechniques: ['Clock skew budgeting', 'Inserting delay buffer cells on fast data paths (hold fix)', '2-FF or 3-FF synchronizers for asynchronous inputs'],
        keyQuestions: [
          'Why does a hold violation depend only on data path minimum delay and clock skew, but NOT on clock period T_clk?',
          'How does increasing clock frequency affect the MTBF of a 2-FF synchronizer?',
          'What is clock skew, and when does positive clock skew help setup time while hurting hold time?'
        ],
        whiteboardFormulas: [
          'Setup\\text{ }Slack: S_{setup} = T_{clk} - (T_{cq} + T_{comb\\_max} + T_{setup} - T_{skew}) \\ge 0',
          'Hold\\text{ }Slack: S_{hold} = (T_{cq} + T_{comb\\_min} - T_{skew}) - T_{hold} \\ge 0',
          'MTBF = \\frac{e^{\\frac{T_{resolve}}{\\tau}}}{T_0 \\cdot f_{clk} \\cdot f_{data}}'
        ],
        interviewEmphasis: 'Universal question across all VLSI interviews worldwide (RTL, DV, STA, PD).'
      }
    ]
  },

  // ==========================================================================
  // 2. BACKEND: PHYSICAL DESIGN, STA, CTS & TAPEOUT
  // ==========================================================================
  {
    id: 'backend',
    name: 'Backend (Physical Design, STA, CTS, DRC/LVS & Tapeout)',
    domainId: 'vlsi',
    domainName: 'VLSI & Silicon Design',
    tagline: 'Translating gate-level netlists into silicon layout, closing timing & ensuring DRC/LVS clean tapeout',
    description: 'The backend discipline transforms the synthesized gate-level netlist into physical geometric masks through floorplanning, placement, clock tree synthesis, routing, and signoff verification (STA, DRC/LVS, IR-drop, EM).',
    iconName: 'Layers',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    relatedTrackIds: ['cmos-vlsi', 'physical-design-sta', 'dft-low-power'],
    relatedEncyclopediaVolumes: ['vol-09', 'vol-10', 'vol-11', 'vol-12', 'vol-13', 'vol-14', 'vol-15'],
    
    // --- 1. CLASSIFICATION BASED ON JOBS ---
    jobs: [
      {
        id: 'job-pd-engineer',
        title: 'ASIC Physical Design (PnR) Engineer',
        experienceTier: 'Entry / Intern',
        description: 'Executes the full Place and Route (PnR) flow: floorplanning, power grid synthesis, standard cell placement, clock tree synthesis (CTS), and global/detailed routing.',
        salaryIndiaCTC: '₹14 LPA - ₹26 LPA (Tier-1 MNC), ₹6.5 LPA - ₹12 LPA (Services)',
        salaryUSRange: '$118,000 - $158,000 Base + RSUs',
        industryDemandLevel: 'Very High',
        standardProcessNodes: ['TSMC N3 / N5 / N7 / N12', 'Samsung 3nm / 4nm GAA', 'Intel 18A'],
        typicalInterviewRounds: [
          'Technical Round 1: CMOS inverter characteristics, Elmore delay, setup/hold slack equations',
          'Technical Round 2: Floorplan strategies, macro placement rules, power mesh IR-drop calculation',
          'Technical Round 3: CTS topologies (H-tree, clock mesh), useful skew, routing congestion heatmaps',
          'Signoff Verification: DRC/LVS, antenna ratio rules, electromigration, engineering change orders (ECO)'
        ],
        dayInTheLifeSnippet: 'Running Cadence Innovus or Synopsys ICC2 placement runs, analyzing routing congestion maps, optimizing clock trees to balance insertion delay, and writing ECO scripts to fix setup/hold violations.',
        keyResponsibilities: [
          'Design optimal chip floorplans with macro placement guidelines, channel spacing, and keepout margins',
          'Synthesize low-impedance power distribution networks (PDN) to meet static and dynamic IR-drop targets',
          'Perform standard cell placement, congestion analysis, and high-fanout net synthesis (HFNS)',
          'Execute Clock Tree Synthesis (CTS) balancing clock insertion delay, clock skew, and clock transition times',
          'Perform detailed routing (Nanoroute / Zroute) and close design rule checking (DRC) violations'
        ],
        primaryDeliverables: [
          'GDSII / OASIS layout database clean of DRC, LVS, ERC, and Antenna violations',
          'Signoff Static Timing Analysis (STA) reports with Worst Negative Slack (WNS) >= 0 ps across all PVT corners',
          'Power Integrity Signoff reports demonstrating <5% dynamic IR-drop and acceptable electromigration (EM)'
        ],
        interviewTopics: [
          'Floorplanning considerations: aspect ratio, core utilization, macro halo spacing, flyline analysis',
          'Clock Tree Synthesis algorithms: H-Tree vs Fishbone vs Clock Mesh and Useful Skew optimization',
          'Addressing routing congestion: local pin density, global route track blockage, cell padding',
          'Fixing hold violations on post-route netlists using delay cell insertion and datapath sizing'
        ],
        targetCompanies: ['Qualcomm', 'Intel', 'AMD', 'NVIDIA', 'Broadcom', 'Apple', 'Texas Instruments', 'Synopsys', 'Cadence', 'Wipro VLSI', 'Tessolve']
      },
      {
        id: 'job-sta-specialist',
        title: 'Static Timing Analysis (STA) & Signoff Specialist',
        experienceTier: 'Junior (1-3 Yrs)',
        description: 'Performs multi-corner multi-mode (MCMM) timing signoff using PrimeTime or Tempus, budgets timing constraints, and executes post-route timing ECOs.',
        salaryIndiaCTC: '₹16 LPA - ₹30 LPA (High-Precision Signoff Domain)',
        salaryUSRange: '$125,000 - $165,000 Base',
        industryDemandLevel: 'Very High',
        standardProcessNodes: ['Advanced FinFET nodes (3nm / 5nm / 7nm) with POCV/LVF'],
        typicalInterviewRounds: [
          'Technical Round 1: SDC constraints (create_clock, set_input_delay, multicycle paths, false paths)',
          'Technical Round 2: On-Chip Variation (OCV), Advanced OCV (AOCV), and Liberty Variation Format (LVF)',
          'Technical Round 3: Crosstalk noise (glitch) and Delta-delay calculation, Miller capacitance effect',
          'Timing ECO closure strategies across 100+ multi-mode multi-corner (MCMM) views'
        ],
        dayInTheLifeSnippet: 'Setting up PrimeTime MCMM scripts, generating timing slack histograms, analyzing crosstalk delta-delay induced violations, and generating automated ECO TCL scripts for cell resizing and buffer insertion.',
        keyResponsibilities: [
          'Define and audit Synopsys Design Constraints (SDC) for all functional, test, and scan modes',
          'Configure Multi-Corner Multi-Mode (MCMM) scenarios encompassing Process (SS, TT, FF), Voltage, and Temperature (-40°C to 125°C)',
          'Perform SI-aware STA accounting for crosstalk noise, victim-aggressor coupling, and delta delay',
          'Generate automated Engineering Change Order (ECO) scripts for timing closure and buffer insertion'
        ],
        primaryDeliverables: [
          'Signoff timing matrix demonstrating zero setup, hold, recovery, removal, and min-pulse-width violations',
          'Validated SDC constraints with zero unconstrained paths or undefined clocks',
          'Automated ECO TCL scripts verified against logical equivalence checkers (LEC)'
        ],
        interviewTopics: [
          'SDC: set_input_delay and set_output_delay calculations relative to virtual clocks',
          'Exceptions: set_false_path vs set_multicycle_path -setup / -hold cycle relationships',
          'Crosstalk impact: Miller capacitance effect on transition time and delta delay (same vs opposite direction)',
          'On-Chip Variation (OCV): flat derate vs stage-based AOCV vs statistical Parametric OCV (POCV)'
        ],
        targetCompanies: ['Synopsys', 'Cadence', 'Qualcomm', 'Intel', 'AMD', 'NVIDIA', 'MediaTek', 'Samsung Foundry']
      },
      {
        id: 'job-physical-verification',
        title: 'Physical Verification & DRC/LVS Specialist',
        experienceTier: 'Entry / Intern',
        description: 'Runs layout physical verification rule decks (Calibre / IC Validator) to ensure full compliance with semiconductor foundry design manuals.',
        salaryIndiaCTC: '₹12 LPA - ₹22 LPA',
        salaryUSRange: '$110,000 - $145,000 Base',
        industryDemandLevel: 'High',
        standardProcessNodes: ['TSMC N3E / N5 / N7', 'GlobalFoundries 22FDX', 'Tower Semi 65nm BCD'],
        typicalInterviewRounds: [
          'Technical Round 1: Semiconductor fabrication lithography, photolithography pitch, double/quad patterning',
          'Technical Round 2: Design Rule Checking (DRC), spacing, enclosure, width rules',
          'Technical Round 3: Layout Versus Schematic (LVS) device extraction, text shorts, soft checks',
          'Antenna ratio rule violations, dummy metal fill insertion, and CMP planarization'
        ],
        dayInTheLifeSnippet: 'Executing Siemens Calibre nmDRC and Calibre LVS runs, isolating power-to-ground layout shorts in Calibre RVE, debugging antenna ratio violations, and verifying metal density fill rules.',
        keyResponsibilities: [
          'Run and debug Design Rule Checking (DRC) including advanced multi-patterning coloring rules',
          'Execute Layout Versus Schematic (LVS) comparison to ensure physical layout matches the electrical netlist',
          'Resolve Electrical Rule Checking (ERC) violations, well proximity effects, and soft substrate connections',
          'Insert dummy metal fill patterns to meet chemical mechanical planarization (CMP) density rules'
        ],
        primaryDeliverables: [
          'Clean Calibre DRC log with zero fatal design rule violations',
          'Clean Calibre LVS report with zero text shorts, zero open nets, and zero parameter mismatches',
          'Antenna-clean layout verified with antenna diode insertion and metal layer jumpers'
        ],
        interviewTopics: [
          'DRC: Minimum width, minimum spacing, enclosure, and end-of-line spacing rules',
          'LVS errors: How to debug an LVS short when the tool highlights 500 connected nets',
          'Antenna effect: Plasma-induced gate oxide breakdown physics and diode/jumper fixes',
          'Why dummy metal fill is mandatory for Chemical Mechanical Planarization (CMP) uniform thickness'
        ],
        targetCompanies: ['TSMC', 'Intel Foundry Services', 'GlobalFoundries', 'Cadence', 'Synopsys', 'Mentor/Siemens EDA', 'Texas Instruments']
      }
    ],

    // --- 2. CLASSIFICATION BASED ON SKILLS ---
    skills: [
      {
        id: 'skill-floorplanning',
        name: 'Macro Placement, Floorplanning & Power Grid Synthesis (PGN)',
        category: 'Physical & Timing',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['Foundry PDK Guidelines', 'TSMC / GF Design Manuals'],
        industrialBenchmark: 'Core utilization 65-75%, IR drop < 35mV across core, zero macro flyline crossings',
        industryRelevance: 'The floorplan determines 80% of final chip quality. A flawed floorplan can never close timing or route cleanly downstream.',
        masteryCriteria: 'Calculating core dimensions based on standard cell area and routing tracks, macro placement against boundaries, channel spacing, power mesh layer pitch, and decoupling capacitor placement.',
        tools: ['Cadence Innovus', 'Synopsys ICC2 / Fusion Compiler', 'OpenROAD'],
        practicalProjectEvidence: 'Complete floorplan for an open-source RISC-V SoC with dual SRAM macros, power ring and strap synthesis meeting 70% utilization.'
      },
      {
        id: 'skill-cts',
        name: 'Clock Tree Synthesis (CTS) & Useful Skew Scheduling',
        category: 'Physical & Timing',
        proficiencyLevel: 'Advanced Signoff',
        standardsCompliance: ['Foundry CTS Guidelines', 'IEEE Standard Delay Format (SDF)'],
        industrialBenchmark: 'Clock skew < 50 ps, max clock transition < 100 ps across all corners',
        industryRelevance: 'Clock distribution consumes up to 40% of dynamic power in digital SoCs. High clock skew eats directly into cycle time.',
        masteryCriteria: 'Configuring clock tree synthesis targets (max latency, max skew, max transition), buffer/inverter cell selection, clock routing NDRs (Non-Default Rules: 2W2S), and applying intentional useful skew to resolve critical path violations.',
        tools: ['Cadence Innovus CCOpt', 'Synopsys ICC2 ClockOpt'],
        practicalProjectEvidence: 'Synthesized symmetric clock tree on a pipelined datapath with CTS insertion delay < 400 ps and skew < 35 ps verified in Innovus.'
      },
      {
        id: 'skill-sdc-constraints',
        name: 'Synopsys Design Constraints (SDC 2.1) & Timing Budgeting',
        category: 'Physical & Timing',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['SDC 2.1 Specification', 'IEEE Standard for SDC'],
        industrialBenchmark: '100% constrained pins, zero unconstrained paths in check_timing reports',
        industryRelevance: 'SDC is the universal language for timing intent across synthesis, place & route, and static timing analysis.',
        masteryCriteria: 'Defining primary clocks, generated clocks with divide/multiply factors, clock uncertainty, clock latency, set_input_delay / set_output_delay with external board budgets, multicycle paths, and false paths.',
        tools: ['Synopsys PrimeTime', 'Cadence Tempus', 'Synopsys Design Compiler'],
        practicalProjectEvidence: 'Complete SDC constraint file for a SPI/UART peripheral chip with asynchronous clock domains, false paths, and external I/O delay budgets.'
      },
      {
        id: 'skill-eda-tcl-scripting',
        name: 'EDA Toolchain TCL & Python Scripting Automation',
        category: 'EDA Scripting',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['Tcl 8.6 Standards', 'EDA Tool API Reference'],
        industrialBenchmark: 'Full automated batch execution from RTL to signoff GDSII without GUI intervention',
        industryRelevance: 'All industrial EDA tools (Synopsys, Cadence, Siemens) are controlled via command-line TCL scripts. Manual GUI operations do not scale in production.',
        masteryCriteria: 'Scripting collections, iterating through design objects (cells, pins, nets), parsing timing reports, generating custom ECO scripts, and automating regression runs via Makefiles and Python.',
        tools: ['Tcl/Tk', 'Python 3', 'Linux Bash', 'Makefile', 'PrimeTime TCL API'],
        practicalProjectEvidence: 'Automated TCL script for PrimeTime that parses timing slack histograms and outputs an ECO buffer insertion script to fix hold violations.'
      }
    ],

    // --- 3. CLASSIFICATION BASED ON KNOWLEDGE ---
    knowledge: [
      {
        id: 'know-ocv-derate',
        concept: 'On-Chip Variation (OCV), AOCV & Liberty Variation Format (LVF / POCV)',
        theoryDepth: 'Tapeout / Signoff Reality',
        whyCrucial: 'Transistors on the same silicon die experience physical variation due to doping fluctuations, oxide thickness, and channel length variations. Ignoring OCV causes post-silicon timing failures.',
        deepAnalysisExplanation: 'Flat OCV applies a fixed pessimistic margin (e.g. +8% on late path, -8% on early path). Because longer logic paths average out random fluctuations (law of large numbers), flat OCV is overly pessimistic. Advanced OCV (AOCV) introduces depth-dependent derating based on path logic depth and bounding box distance. At sub-7nm FinFET nodes, Parametric OCV (POCV) uses Gaussian distribution standard deviations (sigma) stored in Liberty Variation Format (LVF) libraries to compute statistical timing slack (mean +/- 3*sigma).',
        siliconImpact: 'Flat OCV over-constrains advanced node chips, leading to unnecessary buffer insertion, excessive power dissipation, and routing congestion.',
        mitigationTechniques: ['AOCV table derating', 'POCV / LVF statistical timing analysis', 'Common Path Pessimism Removal (CPPR)'],
        keyQuestions: [
          'What is Common Path Pessimism Removal (CPPR) and why is it essential to avoid artificial hold violations on the common clock tree?',
          'Why does hold analysis derate the launch clock and data path as FAST (early) and the capture clock path as SLOW (late)?',
          'How does Liberty Variation Format (LVF) model early/late statistical delays at 3nm FinFET nodes?'
        ],
        whiteboardFormulas: [
          'T_{early} = T_{nominal} \\cdot (1 - Derate_{early})',
          'T_{late} = T_{nominal} \\cdot (1 + Derate_{late})',
          'POCV\\text{ }Delay = \\mu_{nominal} \\pm 3 \\cdot \\sigma_{LVF}'
        ],
        interviewEmphasis: 'Distinguishes junior engineers from experienced signoff specialists in STA interviews.'
      },
      {
        id: 'know-ir-drop-em',
        concept: 'Dynamic IR Drop, L*di/dt Voltage Droop & Electromigration (Black\'s Equation)',
        theoryDepth: 'Tapeout / Signoff Reality',
        whyCrucial: 'When millions of transistors switch simultaneously, instantaneous current draw (I) through the power grid resistance (R) causes supply voltage to droop. Lower supply voltage slows down logic gates, creating unexpected setup timing violations in silicon.',
        deepAnalysisExplanation: 'Static IR drop is caused by average DC current flowing through wire resistance. Dynamic IR drop is caused by instantaneous peak switching currents (high di/dt) during active clock edges. Packaging and bond-wire parasitic inductances (L) create inductive voltage bounce (L*di/dt). Furthermore, high current density causes Electromigration (EM), where momentum transfer from moving electrons physically displaces metal atoms, creating voids (open circuits) and hillocks (short circuits) over time.',
        siliconImpact: 'Dynamic IR drop causes unexpected clock jitter and path delay expansion that cannot be caught by static STA, causing random chip resets during compute bursts.',
        mitigationTechniques: ['Decoupling capacitor (decap) insertion', 'Multi-layer mesh power grid with low resistance', 'Clock skew scheduling to disperse switching times'],
        keyQuestions: [
          'What is the difference between static IR drop and dynamic IR drop in modern multi-gigahertz processors?',
          'Why are decoupling capacitors (decaps) placed near high-switching standard cells and macros?',
          'How does Black\'s equation model the Mean Time to Failure (MTTF) of an interconnect wire subjected to electromigration?'
        ],
        whiteboardFormulas: [
          'V_{droop} = I_{peak} \\cdot R_{grid} + L_{pkg} \\cdot \\frac{di}{dt}',
          'MTTF = \\frac{A}{J^n} \\cdot e^{\\frac{E_a}{k \\cdot T}} \\quad [\\text{Black\'s Equation for Electromigration}]'
        ],
        interviewEmphasis: 'Core topic in Physical Design and Power Integrity interviews at Qualcomm, Intel, and NVIDIA.'
      },
      {
        id: 'know-antenna-effect',
        concept: 'Antenna Effect (Plasma Induced Damage) & Protection Diodes',
        theoryDepth: 'Tapeout / Signoff Reality',
        whyCrucial: 'During fabrication reactive ion etching (RIE), long metal wires act as antennas collecting electrostatic charge from plasma. If this charge discharges through a thin MOS gate dielectric, it permanently punctures the gate oxide, destroying the transistor before the chip is completed.',
        deepAnalysisExplanation: 'The Antenna Ratio is defined as the area of exposed metal wire connected to a gate divided by the gate area (A_metal / A_gate). If this ratio exceeds the foundry limit (e.g. 200:1), plasma charge builds up to high voltages, exceeding the breakdown dielectric field of the ultra-thin SiO2 / High-k gate dielectric. Fixes include inserting reverse-biased antenna diodes near the gate to safely shunt charge to the substrate, or cutting long metal lines and routing them up to a higher metal layer (jumper routing).',
        siliconImpact: 'Failure to pass antenna rule checks results in zero-yield wafers with permanently shorted transistors directly out of the fab.',
        mitigationTechniques: ['Metal jumper routing up to higher metal layers', 'Reverse-biased antenna diode insertion connected to ground/substrate'],
        keyQuestions: [
          'Why does routing a metal wire up to Metal 4 and then back down to Metal 2 eliminate an antenna violation on Metal 2?',
          'How does an antenna diode protect the gate oxide during fabrication without interfering with active functional operation?',
          'Why do antenna rules become exponentially stricter at advanced FinFET nodes (sub-7nm)?'
        ],
        whiteboardFormulas: [
          'Antenna\\text{ }Ratio = \\frac{\\text{Exposed Metal Wire Area}}{\\text{Connected Gate Oxide Area}} \\le \\text{Foundry Limit}'
        ],
        interviewEmphasis: 'High-frequency question in Physical Verification and Layout interviews.'
      }
    ]
  },

  // ==========================================================================
  // 3. ANALOG, MIXED-SIGNAL (AMS) & CUSTOM IC DESIGN
  // ==========================================================================
  {
    id: 'analog-mixed-signal',
    name: 'Analog, Mixed-Signal (AMS) & Custom IC Design',
    domainId: 'vlsi',
    domainName: 'VLSI & Silicon Design',
    tagline: 'Transistor-level custom circuit design: Bandgaps, LDOs, PLLs, ADCs, SerDes & FinFET Custom Layout',
    description: 'Analog and Mixed-Signal engineering operates at the physical transistor level, designing precision voltage references, continuous-time filters, data converters (ADC/DAC), Phase-Locked Loops (PLL), high-speed SerDes I/O, and custom matching layouts.',
    iconName: 'Sparkles',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    relatedTrackIds: ['cmos-vlsi', 'digital-electronics'],
    relatedEncyclopediaVolumes: ['vol-01', 'vol-09', 'vol-10', 'vol-15'],
    
    // --- 1. CLASSIFICATION BASED ON JOBS ---
    jobs: [
      {
        id: 'job-ams-ic-designer',
        title: 'Analog & Mixed-Signal IC Design Engineer',
        experienceTier: 'Entry / Intern',
        description: 'Designs transistor-level analog hard macros: bandgap voltage references, low-dropout regulators (LDO), operational transconductance amplifiers (OTA), and SAR ADCs.',
        salaryIndiaCTC: '₹14 LPA - ₹28 LPA (Tier-1 Analog: TI, ADI, NXP), ₹7 LPA - ₹12 LPA (Services)',
        salaryUSRange: '$120,000 - $160,000 Base',
        industryDemandLevel: 'Very High',
        standardProcessNodes: ['TSMC 16nm / 28nm / 40nm BCD', 'Tower Semi 65nm / 180nm', 'GF 22FDX'],
        typicalInterviewRounds: [
          'Technical Round 1: Small-signal MOSFET model ($g_m, r_o, C_{gs}, C_{gd}$), single-stage amplifiers (CS, CD, CG)',
          'Technical Round 2: Differential pairs, current mirrors, cascode stages, frequency response & Miller effect',
          'Technical Round 3: Negative feedback stability, phase margin, gain margin, pole-zero compensation',
          'Macro Design: Bandgap curvature correction, LDO dropout voltage & PSRR, SAR ADC capacitor DAC matching'
        ],
        dayInTheLifeSnippet: 'Simulating differential operational amplifiers in Cadence Spectre across PVT corners and Monte Carlo mismatch runs, tuning compensation capacitors for 65° phase margin, and checking open-loop gain.',
        keyResponsibilities: [
          'Design schematic-level analog circuits meeting specification for gain, bandwidth, noise, and power consumption',
          'Execute multi-corner AC, Transient, DC, and Monte Carlo mismatch SPICE simulations',
          'Perform stability analysis (Bode plots, Nyquist criterion) and design frequency compensation networks',
          'Collaborate with custom mask layout designers to ensure common-centroid matching and low parasitic capacitance'
        ],
        primaryDeliverables: [
          'Transistor schematics meeting all electrical specifications across PVT corners (-40°C to 125°C, +/- 10% Vdd)',
          'Post-layout parasitic extracted (PEX) SPICE netlist simulation verification reports',
          'Detailed analog behavioral models (Verilog-A) for top-level SoC digital verification integration'
        ],
        interviewTopics: [
          'Small-signal gain ($A_v = -g_m (r_o \\parallel R_L)$) and output resistance of cascode current sources',
          'Brokaw bandgap reference: cancellation of CTAT diode voltage with PTAT thermal voltage ($V_{bg} \\approx 1.25V$)',
          'Two-stage Miller op-amp frequency compensation and right-half-plane (RHP) zero elimination with nulling resistor',
          'Power Supply Rejection Ratio (PSRR) and Common Mode Rejection Ratio (CMRR) derivation'
        ],
        targetCompanies: ['Texas Instruments', 'Analog Devices (ADI)', 'NXP Semiconductors', 'Microchip', 'Infineon', 'STMicroelectronics', 'Qualcomm', 'Cirrus Logic']
      },
      {
        id: 'job-serdes-pll-engineer',
        title: 'High-Speed SerDes & Clocking (PLL) Architect',
        experienceTier: 'Junior (1-3 Yrs)',
        description: 'Designs gigabit serial communication links (PCIe Gen5/6, Ethernet 112G PAM4, USB4) including Phase-Locked Loops (PLL), CDRs, and equalization stages.',
        salaryIndiaCTC: '₹18 LPA - ₹36 LPA (Elite Domain)',
        salaryUSRange: '$135,000 - $185,000 Base + RSUs',
        industryDemandLevel: 'Surging',
        standardProcessNodes: ['TSMC N3E / N5 / N7', 'Intel 18A / 3', 'Samsung 4nm'],
        typicalInterviewRounds: [
          'Technical Round 1: High-speed transmission line physics, channel loss, skin effect, dielectric loss ($S_{21}$)',
          'Technical Round 2: Phase-Locked Loop (PLL) dynamics, phase frequency detector (PFD), charge pump, LC-VCO, jitter',
          'Technical Round 3: Clock and Data Recovery (CDR) architectures (Alexander / Hogge phase detectors)',
          'Equalization: Continuous-Time Linear Equalizer (CTLE), Feed-Forward Equalizer (FFE), Decision Feedback Equalizer (DFE)'
        ],
        dayInTheLifeSnippet: 'Simulating 112Gbps PAM4 Eye diagrams in Cadence Spectre RF, budgeting deterministic and random jitter components, and tuning DFE tap weights to open the receiver eye margin.',
        keyResponsibilities: [
          'Architect low-jitter charge-pump and LC-VCO Phase-Locked Loops for high-speed clock generation',
          'Design adaptive transmitter FFE and receiver CTLE / DFE equalization circuits to overcome high-frequency channel attenuation',
          'Perform eye-diagram closure, bit error rate (BER < 10^-12) verification, and jitter decomposition (RJ, DJ, TJ)',
          'Participate in silicon bringup and characterization using 50GHz+ sampling oscilloscopes and BERTs'
        ],
        primaryDeliverables: [
          'Complete SerDes PHY macro meeting IEEE 802.3 / PCIe specification electrical masks',
          'PLL phase noise and jitter budget spreadsheet verified against Spectre RF Pnoise simulations',
          'Adaptive calibration algorithm specification for automatic CTLE/DFE tap tuning'
        ],
        interviewTopics: [
          'NRZ vs PAM4 signaling trade-offs: 2x throughput vs 9.54 dB SNR penalty at the same Nyquist frequency',
          'Type-II 4th-order charge pump PLL loop dynamics: damping factor, natural frequency, and phase margin',
          'Why DFE cancels post-cursor Intersymbol Interference (ISI) without boosting high-frequency channel noise',
          'Phase noise to jitter conversion: integrating phase noise profile $\\mathcal{L}(f)$ to calculate RMS jitter'
        ],
        targetCompanies: ['Marvell', 'Broadcom', 'NVIDIA', 'Qualcomm', 'Intel', 'AMD', 'Synopsys (DesignWare IP)', 'Cadence (IP Group)', 'Credo Semiconductor']
      },
      {
        id: 'job-custom-layout-mask',
        title: 'Custom IC Mask & Analog Layout Specialist',
        experienceTier: 'Entry / Intern',
        description: 'Implements precision physical layouts for analog circuits using Cadence Virtuoso, ensuring matching, common-centroid geometries, and isolation.',
        salaryIndiaCTC: '₹8 LPA - ₹16 LPA',
        salaryUSRange: '$95,000 - $135,000 Base',
        industryDemandLevel: 'High',
        standardProcessNodes: ['Planar CMOS (180nm - 28nm)', 'FinFET (16nm - 3nm)'],
        typicalInterviewRounds: [
          'Technical Round 1: CMOS fabrication mask layers, diffusion, poly, metal stackup',
          'Technical Round 2: Matching techniques (Common-centroid, interdigitation, dummy transistors)',
          'Technical Round 3: Parasitic resistance/capacitance extraction, guard rings, substrate noise coupling',
          'FinFET specific layout rules: discrete fin quantization, oxide diffusion (OD) spacing, well proximity effect'
        ],
        dayInTheLifeSnippet: 'Drawing common-centroid differential transistor pairs in Cadence Virtuoso Layout XL, placing substrate guard rings, and executing Calibre DRC/LVS runs to ensure zero layout errors.',
        keyResponsibilities: [
          'Create polygon-level custom IC layouts for op-amps, bandgaps, PLLs, and high-speed I/O pads',
          'Apply layout matching techniques: interdigitation, cross-quad common-centroid, dummy strips, and identical orientations',
          'Minimize parasitic RC on sensitive analog nodes and ensure symmetrical differential routing',
          'Run and debug Mentor Calibre nmDRC, LVS, and PEX extraction decks'
        ],
        primaryDeliverables: [
          'DRC/LVS clean Virtuoso layout database with zero soft-check or antenna errors',
          'Extracted Calibre PEX parasitic netlist for post-layout circuit simulation',
          'Guard ring isolation documentation verifying substrate noise immunity from digital switching noise'
        ],
        interviewTopics: [
          'Why dummy transistors are placed at the ends of differential pairs (preventing etching boundary non-uniformity)',
          'Common-centroid layout for 1-D and 2-D gradient cancellation (cancelling temperature and oxide thickness gradients)',
          'Latch-up physics in bulk CMOS: parasitic PNPN thyristor structure and guard ring prevention',
          'Electromigration rules for wide power lines: calculating maximum DC and RMS current limits per micron of metal width'
        ],
        targetCompanies: ['Texas Instruments', 'Analog Devices', 'NXP', 'Qualcomm', 'Intel', 'Synopsys', 'Tessolve', 'Cerium Systems']
      }
    ],

    // --- 2. CLASSIFICATION BASED ON SKILLS ---
    skills: [
      {
        id: 'skill-virtuoso-spectre',
        name: 'Cadence Virtuoso & Spectre SPICE Multi-Corner Simulation',
        category: 'Analog & Mixed Signal',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['PDK Design Manuals', 'Cadence Virtuoso ICADVM'],
        industrialBenchmark: 'Full PVT signoff (-40°C to 125°C, +/- 10% Vdd) with 1000-run Monte Carlo mismatch pass rate',
        industryRelevance: 'The absolute gold standard EDA platform for analog, mixed-signal, and RF circuit design worldwide.',
        masteryCriteria: 'Performing DC operating point analysis ($g_m, r_o, V_{dsat}$), AC open-loop gain/phase margin sweeps, transient settling time, periodic steady state (PSS) and periodic noise (Pnoise), and Monte Carlo statistical mismatch.',
        tools: ['Cadence Virtuoso Schematic Editor', 'Cadence Spectre', 'Synopsys HSPICE', 'Mentor Eldo'],
        practicalProjectEvidence: 'Designed and simulated a folded-cascode op-amp achieving >75dB DC gain and 65° phase margin across all process corners.'
      },
      {
        id: 'skill-verilog-ams',
        name: 'Mixed-Signal Behavioral Modeling (Verilog-A / SystemVerilog-AMS)',
        category: 'Analog & Mixed Signal',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['IEEE 1800-2017 Real-Number Modeling (RNM)', 'Verilog-AMS 2.4'],
        industrialBenchmark: '100x simulation speedup over SPICE while preserving voltage step and frequency accuracy within 2%',
        industryRelevance: 'Full-chip SoCs cannot simulate transistor-level SPICE due to prohibitive runtime. Behavioral modeling enables top-level digital-analog co-simulation.',
        masteryCriteria: 'Writing conservative and non-conservative Verilog-A behavioral models, SystemVerilog Real-Number Modeling (SV-RNM) using user-defined net types (nettype), and connecting analog modules to UVM digital testbenches.',
        tools: ['Cadence Xcelium Mixed-Signal', 'Synopsys VCS AMS', 'Spectre AMS Designer'],
        practicalProjectEvidence: 'Behavioral Verilog-A model of a 12-bit SAR ADC with non-ideal offset, DNL/INL quantization error, and thermal noise.'
      },
      {
        id: 'skill-custom-matching-layout',
        name: 'FinFET & CMOS Custom Analog Layout & DRC/LVS Verification',
        category: 'Analog & Mixed Signal',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['Foundry PDK Layout Rules', 'Siemens Calibre SVRF Rules'],
        industrialBenchmark: 'Zero DRC/LVS errors, parasitic capacitance on differential nets matched within 1.5%',
        industryRelevance: 'An analog circuit is only as good as its physical layout. Symmetrical parasitic routing is mandatory for differential noise rejection.',
        masteryCriteria: 'Drawing common-centroid layouts, routing differential pairs with shielding, inserting substrate guard rings, and debugging parasitic extraction (PEX) reports.',
        tools: ['Cadence Virtuoso Layout XL', 'Siemens Calibre nmDRC/LVS', 'Synopsys StarRC'],
        practicalProjectEvidence: 'Full custom layout of a bandgap voltage reference in 180nm / 28nm with common-centroid current mirrors and guard ring isolation.'
      }
    ],

    // --- 3. CLASSIFICATION BASED ON KNOWLEDGE ---
    knowledge: [
      {
        id: 'know-barkhausen-stability',
        concept: 'Barkhausen Stability Criterion & Phase Margin in Negative Feedback Amplifiers',
        theoryDepth: 'Theoretical Foundation',
        whyCrucial: 'Negative feedback stabilizes amplifier gain, widens bandwidth, and reduces distortion. However, if phase shift through the loop reaches 180° while loop gain is >= 1, negative feedback turns into positive feedback, causing uncontrolled oscillation.',
        deepAnalysisExplanation: 'The loop gain is defined as $T(s) = A(s)\\beta$. The Barkhausen criterion for oscillation states that $|T(j\\omega_{osc})| = 1$ and $\\angle T(j\\omega_{osc}) = -180^\\circ$. To guarantee stability with well-damped transient response, amplifiers are designed with a Phase Margin (PM) of at least 60°: $PM = 180^\\circ + \\angle T(j\\omega_{unity})$, where $\\omega_{unity}$ is the unity-gain frequency where $|T(j\\omega)| = 1$. Miller compensation inserts a small capacitor ($C_c$) across the high-gain stage, splitting the dominant and non-dominant poles to achieve stability.',
        siliconImpact: 'Insufficient phase margin causes fabricated op-amps, regulators, and PLLs to oscillate uncontrollably, burning excessive power and corrupting output signals.',
        mitigationTechniques: ['Miller pole-splitting compensation', 'Lead-lag compensation', 'Nulling resistor in series with Miller capacitor to eliminate RHP zero'],
        keyQuestions: [
          'Why does a Phase Margin of 45° result in ~16% transient overshoot, and why is 60° preferred for critically damped settling?',
          'What is the origin of the Right-Half-Plane (RHP) zero created by Miller compensation, and how does a nulling resistor push it to infinity?',
          'How does Gain Margin (GM) complement Phase Margin in guaranteeing closed-loop stability?'
        ],
        whiteboardFormulas: [
          'Loop\\text{ }Gain: T(s) = A(s) \\cdot \\beta',
          'Phase\\text{ }Margin: PM = 180^\\circ + \\angle T(j\\omega_{unity}) \\ge 60^\\circ',
          'Miller\\text{ }Dominant\\text{ }Pole: \\omega_{p1} \\approx \\frac{1}{R_1 \\cdot (1 + g_{m2} R_2) \\cdot C_c}'
        ],
        interviewEmphasis: 'Asked in every single analog circuit design interview worldwide.'
      },
      {
        id: 'know-thermal-flicker-noise',
        concept: 'Thermal Noise ($4kTR$) and 1/f Flicker Noise Physics in MOSFETs',
        theoryDepth: 'Theoretical Foundation',
        whyCrucial: 'Noise sets the fundamental lower limit on the smallest signal an analog circuit can detect (dynamic range). In deep submicron nodes, noise determines ADC resolution and SerDes receiver sensitivity.',
        deepAnalysisExplanation: 'Thermal noise in a resistor or MOSFET channel is caused by random Brownian motion of charge carriers in thermal equilibrium. Its Power Spectral Density (PSD) is white (flat across frequency): $S_v(f) = 4kTR$ or $S_i(f) = 4kT\\gamma g_m$. Flicker (1/f) noise is caused by random trapping and de-trapping of carriers in surface oxide states at the silicon-dielectric interface. Its PSD is inversely proportional to frequency: $S_v(f) \\propto \\frac{1}{W \\cdot L \\cdot C_{ox} \\cdot f}$. The corner frequency $f_c$ is where flicker noise equals thermal noise.',
        siliconImpact: 'Excessive flicker noise in VCO transistors gets upconverted into close-in phase noise, degrading PLL jitter and wireless receiver signal-to-noise ratio.',
        mitigationTechniques: ['Increasing gate area $W \\cdot L$ to minimize $1/f$ noise', 'Correlated Double Sampling (CDS) and Chopper Stabilization'],
        keyQuestions: [
          'Why does increasing transistor width and length ($W \\times L$) decrease $1/f$ noise without changing transistor $W/L$ aspect ratio?',
          'What is Chopper Stabilization and how does it modulate $1/f$ noise out of the baseband frequency spectrum?',
          'How does input-referred noise voltage relate to output noise in a common-source amplifier?'
        ],
        whiteboardFormulas: [
          'Thermal\\text{ }Noise\\text{ }Current: \\overline{i_n^2} = 4 k T \\cdot \\gamma g_m \\cdot \\Delta f',
          'Flicker\\text{ }Noise\\text{ }Voltage: \\overline{v_n^2} = \\frac{K}{C_{ox} W L \\cdot f} \\cdot \\Delta f'
        ],
        interviewEmphasis: 'Core screening topic for analog designers and RF engineers.'
      },
      {
        id: 'know-finfet-layout-effects',
        concept: 'FinFET Discrete Width Quantization & Layout Dependent Effects (LDE / WPE / STI)',
        theoryDepth: 'Tapeout / Signoff Reality',
        whyCrucial: 'In planar CMOS, transistor width $W$ was continuous. In FinFET technology (sub-16nm), the channel wraps around 3D vertical fins, meaning transistor width is discrete ($W = N_{fins} \\cdot W_{eff}$). Furthermore, physical distance to well edges and isolation trenches dramatically alters threshold voltage.',
        deepAnalysisExplanation: 'In FinFETs, effective width is quantized: $W_{eff} = N_{fin} \\cdot (2H_{fin} + T_{fin})$. Designers cannot choose arbitrary widths, which affects current ratio matching in current mirrors. Furthermore, Shallow Trench Isolation (STI) mechanical stress and Well Proximity Effect (WPE) cause ion scattering during implantation, shifting threshold voltage ($V_{th}$) by up to 30mV based on how close a transistor is placed to well boundaries.',
        siliconImpact: 'Failing to account for FinFET discrete fin pitch and well proximity stress shifts bias currents by up to 25%, causing analog circuit malfunction.',
        mitigationTechniques: ['Quantized fin budgeting ($N_{fin}$ multiples)', 'Inserting dummy fins and dummy gate fingers (PO over OD) at array edges', 'Uniform orientation of all matched transistors'],
        keyQuestions: [
          'Why can current mirrors in FinFET nodes only match in integer ratios of fins (e.g. 2 fins, 4 fins, 8 fins)?',
          'What is the Well Proximity Effect (WPE) and why must matched differential pairs be placed equidistant from N-well edges?',
          'Why do FinFETs exhibit significantly higher self-heating compared to planar transistors?'
        ],
        whiteboardFormulas: [
          'W_{effective} = N_{fins} \\cdot (2 \\cdot H_{fin} + T_{fin})',
          '\\Delta V_{th} \\propto \\frac{1}{SCA + SCB + SCC} \\quad [\\text{Well Proximity Effect Distance Factors}]'
        ],
        interviewEmphasis: 'Crucial for advanced node (TSMC 7nm/5nm/3nm) custom analog and layout interviews.'
      }
    ]
  },

  // ==========================================================================
  // 4. FPGA PROTOTYPING, EMULATION & HARDWARE BOARD DESIGN
  // ==========================================================================
  {
    id: 'fpga-emulation',
    name: 'FPGA Prototyping, Emulation & Hardware Board Design',
    domainId: 'vlsi',
    domainName: 'VLSI & Silicon Design',
    tagline: 'Hardware validation on real silicon boards before multimillion-dollar ASIC tapeout',
    description: 'Prototyping synthesizable RTL on commercial FPGA fabrics (AMD Xilinx, Intel FPGA) and designing custom multilayer high-speed PCBs with controlled impedance to validate chip systems at full clock speeds.',
    iconName: 'CircuitBoard',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    relatedTrackIds: ['fpga-prototyping', 'digital-electronics'],
    relatedEncyclopediaVolumes: ['vol-04', 'vol-05', 'vol-14'],
    
    // --- 1. CLASSIFICATION BASED ON JOBS ---
    jobs: [
      {
        id: 'job-fpga-engineer',
        title: 'FPGA Design & Systems Engineer',
        experienceTier: 'Entry / Intern',
        description: 'Implements, synthesizes, and debugs digital logic systems on AMD Xilinx / Intel FPGA platforms with timing closure, I/O pin planning, and hardware transceivers.',
        salaryIndiaCTC: '₹9 LPA - ₹18 LPA (Tier-1 MNC / Aerospace), ₹5 LPA - ₹9 LPA (Services)',
        salaryUSRange: '$105,000 - $145,000 Base',
        industryDemandLevel: 'Very High',
        standardProcessNodes: ['Xilinx UltraScale+ 16nm', 'Versal ACAP 7nm', 'Intel Agilex 7/10nm'],
        typicalInterviewRounds: [
          'Technical Round 1: FPGA architecture (LUTs, CLBs, BRAM, DSP48, PLL/MMCM, Carry Chains)',
          'Technical Round 2: XDC / SDC timing constraints (create_clock, set_input_delay, false paths)',
          'Technical Round 3: High-speed transceivers (GTX/GTY), AXI interconnects, and Vivado ILA debugging',
          'Board-level bring-up, bitstream generation, and power estimation'
        ],
        dayInTheLifeSnippet: 'Writing synthesis XDC constraints in Vivado, optimizing logic levels to meet 250 MHz timing closure on an UltraScale+ FPGA, and setting up Integrated Logic Analyzer (ILA) cores to capture in-system bus transactions.',
        keyResponsibilities: [
          'Target RTL designs to FPGA architectures (AMD Xilinx Vivado, Intel Quartus Prime)',
          'Map algorithms efficiently to dedicated DSP48 slices and Block RAMs (BRAM)',
          'Write Xilinx Design Constraints (XDC) for board-level clocking and peripheral pinouts',
          'Perform in-system hardware debugging using Integrated Logic Analyzer (ILA / ChipScope)'
        ],
        primaryDeliverables: [
          'Bitstream files (.bit / .pdi) closing timing with zero Worst Negative Slack (WNS >= 0)',
          'Integrated Logic Analyzer (ILA) debug dashboards capturing real-time bus transactions',
          'Documented peripheral driver interfaces (UART, SPI, PCIe DMA, Gigabit Ethernet)'
        ],
        interviewTopics: [
          'Difference between FPGA synthesis (mapping to LUTs/BRAM) vs ASIC synthesis (mapping to standard cells)',
          'How a 6-input LUT can implement any 6-variable boolean function or two 5-variable functions',
          'Block RAM (BRAM) dual-port write collision modes: WRITE_FIRST, READ_FIRST, NO_CHANGE',
          'Dedicated DSP48 slices: Pipelined Multiply-Accumulate ($P = A \\cdot B + C$)'
        ],
        targetCompanies: ['AMD (Xilinx)', 'Intel (Altera)', 'Lockheed Martin', 'ISRO / DRDO', 'Qualcomm', 'Honeywell', 'Collins Aerospace', 'National Instruments']
      },
      {
        id: 'job-hardware-board-engineer',
        title: 'High-Speed Hardware Board & PCB Design Engineer',
        experienceTier: 'Entry / Intern',
        description: 'Designs multi-layer high-speed printed circuit boards (PCBs) with impedance control, differential pairs, power integrity, and signal integrity.',
        salaryIndiaCTC: '₹8 LPA - ₹16 LPA',
        salaryUSRange: '$95,000 - $135,000 Base',
        industryDemandLevel: 'High',
        standardProcessNodes: ['FR4 / Rogers High-Frequency Dielectrics', '6 to 16 Layer Stackups'],
        typicalInterviewRounds: [
          'Technical Round 1: PCB stackup design, microstrip vs stripline trace impedance ($Z_0 = 50\\Omega$)',
          'Technical Round 2: Signal integrity: reflections, termination schemes, crosstalk, ground planes',
          'Technical Round 3: Power Distribution Network (PDN), decoupling capacitor selection, thermal design',
          'Schematic capture, Altium / Allegro layout rules, and Gerber manufacturing handoff'
        ],
        dayInTheLifeSnippet: 'Routing length-matched DDR4/DDR5 differential memory traces in Altium Designer, tuning decoupling capacitor placement under a BGA package, and running thermal simulations.',
        keyResponsibilities: [
          'Design multi-layer PCB schematics and layouts (6 to 16 layers) using Altium Designer or Cadence Allegro',
          'Calculate controlled impedance traces (50 ohm single-ended, 100 ohm differential)',
          'Perform length-matching and skew tuning on high-speed DDR memory and PCIe channels',
          'Validate board power rails, ripple voltages, and thermal dissipation in lab bringup'
        ],
        primaryDeliverables: [
          'Manufacturing-ready Gerber RS-274X and ODB++ fabrication packages',
          'Bill of Materials (BOM) with active lifecycle and supply-chain second sources',
          'Signal Integrity eye diagram simulation reports demonstrating jitter compliance'
        ],
        interviewTopics: [
          'Microstrip vs Stripline characteristic impedance calculation ($Z_0 \\approx \\frac{87}{\\sqrt{\\epsilon_r + 1.41}} \\ln(\\frac{5.98h}{0.8w + t})$)',
          'Why split ground planes under high-speed traces cause severe EMI radiation and signal distortion',
          'Differential pair routing: length matching, phase skew, and intra-pair spacing',
          'Decoupling capacitor loop inductance: why mounting inductance dominates high-frequency impedance'
        ],
        targetCompanies: ['Texas Instruments', 'Qualcomm', 'Cisco', 'NVIDIA', 'Intel', 'Apple', 'Schneider Electric', 'VVDN Technologies']
      }
    ],

    // --- 2. CLASSIFICATION BASED ON SKILLS ---
    skills: [
      {
        id: 'skill-vivado-toolflow',
        name: 'AMD Xilinx Vivado Synthesis, Implementation & XDC Timing Closure',
        category: 'HDL & RTL',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['Vivado Design Suite User Guide', 'Xilinx XDC Standards'],
        industrialBenchmark: 'Timing closed at 250 MHz with zero setup/hold slack violations across all I/O interfaces',
        industryRelevance: 'Dominant FPGA toolchain in industrial automation, aerospace, automotive, and ASIC emulation.',
        masteryCriteria: 'Running complete flow from RTL elaboration to bitstream generation, floorplanning with Pblocks, writing physical pin and clock constraints in XDC, and analyzing synthesis utilization reports.',
        tools: ['AMD Xilinx Vivado ML', 'Vitis HLS', 'Intel Quartus Prime'],
        practicalProjectEvidence: 'Full implementation of a RISC-V SoC with UART, SPI, and timer on an AMD Artix-7 / UltraScale+ board closing timing at 150 MHz.'
      },
      {
        id: 'skill-kicad-altium',
        name: 'High-Speed PCB Design & Signal Integrity (Altium Designer / KiCad)',
        category: 'Board Hardware',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['IPC-2221 Generic Standard on Printed Board Design', 'IPC-7351'],
        industrialBenchmark: 'Controlled impedance within +/-5%, length matching on differential pairs within 5 mils',
        industryRelevance: 'Hardware engineers must design their own prototype and carrier boards to validate silicon chips.',
        masteryCriteria: 'Schematic capture, layer stackup definition (signal, ground, power planes), routing differential pairs with serpentine length tuning, BGA fanout escape routing, and thermal via placement.',
        tools: ['Altium Designer', 'KiCad 8.0', 'Cadence Allegro', 'Ansys SIwave'],
        practicalProjectEvidence: 'Designed a 4-layer microcontroller carrier board with high-speed USB-C, SPI flash, low-noise LDO regulator, and 50-ohm RF trace.'
      }
    ],

    // --- 3. CLASSIFICATION BASED ON KNOWLEDGE ---
    knowledge: [
      {
        id: 'know-fpga-fabric',
        concept: 'FPGA Architecture: LUTs, Dedicated Carry Chains, BRAM & DSP Slices',
        theoryDepth: 'Architectural Concept',
        whyCrucial: 'Writing efficient FPGA RTL requires designing with the physical silicon architecture in mind. Naive code synthesizes into thousands of slow cascaded LUTs instead of fast dedicated hardware slices.',
        deepAnalysisExplanation: 'Modern FPGAs consist of Configurable Logic Blocks (CLBs). A CLB contains 6-input Look-Up Tables (LUT6), flip-flops, and dedicated carry chains (CARRY4/CARRY8) that compute arithmetic carry logic in picoseconds via dedicated hardwired silicon lines rather than general routing fabrics. Block RAMs (BRAM) provide dense on-chip dual-port memory, and DSP48 slices compute high-speed multiplication ($A \\cdot B + C$) with input/output pipelining registers.',
        siliconImpact: 'Inferring arithmetic adders without utilizing dedicated carry chains degrades maximum clock frequency by up to 4x.',
        mitigationTechniques: ['Coding RTL in inference-friendly styles that tools map directly to DSP48 and BRAM', 'Pipelining DSP inputs/outputs'],
        keyQuestions: [
          'How does a 6-LUT implement any 6-input Boolean function using SRAM configuration memory?',
          'Why does inferring an asynchronous read on a memory block force Vivado to use distributed LUT RAM instead of Block RAM (BRAM)?',
          'How do dedicated carry lookahead chains bypass general routing switches to accelerate wide arithmetic additions?'
        ],
        whiteboardFormulas: [
          '2^6 = 64\\text{ }\\text{bits of SRAM configuration memory per 6-input LUT}',
          'DSP48\\text{ }Output: P = (A \\times B) + C \\quad [\\text{Operates up to 750 MHz in silicon}]'
        ],
        interviewEmphasis: 'Fundamental screening question for all FPGA engineering positions.'
      },
      {
        id: 'know-signal-integrity',
        concept: 'High-Speed Signal Integrity: Characteristic Impedance (Z0) & Transmission Line Reflections',
        theoryDepth: 'Theoretical Foundation',
        whyCrucial: 'When signal rise time ($t_r$) is less than twice the propagation delay through a PCB trace ($t_r < 2 \\cdot t_{prop}$), the trace ceases to behave as a simple lumped wire and behaves as a distributed transmission line subject to reflections, ringing, and crosstalk.',
        deepAnalysisExplanation: 'A transmission line has a characteristic impedance $Z_0 = \\sqrt{\\frac{L}{C}}$. When a propagating voltage wave encounters an impedance discontinuity (such as an unterminated IC pin with high input impedance $Z_L \\gg Z_0$), energy is reflected back toward the source according to the reflection coefficient $\\Gamma = \\frac{Z_L - Z_0}{Z_L + Z_0}$. If an open-circuit is encountered ($\\Gamma = +1$), the voltage wave doubles in amplitude, exceeding maximum input voltage ratings and causing severe signal ringing that triggers false clock edges.',
        siliconImpact: 'Signal reflections cause ringing, false double-clocking on edge-triggered flip-flops, and severe eye diagram closure in high-speed interfaces.',
        mitigationTechniques: ['Source series termination ($R_S = Z_0 - R_{driver}$)', 'Parallel termination ($R_T = Z_0$ to ground or Vtt)', 'Continuous reference ground plane under high-speed traces'],
        keyQuestions: [
          'When does a PCB wire transition from a lumped circuit to a distributed transmission line?',
          'What is the reflection coefficient for an open circuit (\\Gamma = +1), short circuit (\\Gamma = -1), and matched termination (\\Gamma = 0)?',
          'Why does a return current path always follow the path of least inductance directly beneath a high-speed trace on the reference ground plane?'
        ],
        whiteboardFormulas: [
          'Z_0 = \\sqrt{\\frac{L_0}{C_0}} \\approx 50\\Omega \\quad [\\text{Standard Single-Ended Microstrip}]',
          '\\Gamma = \\frac{Z_L - Z_0}{Z_L + Z_0} \\quad [\\text{Reflection Coefficient}]',
          't_{prop} = \\frac{l}{v} = \\frac{l \\cdot \\sqrt{\\epsilon_r}}{c} \\approx 160\\text{ }ps/inch\\text{ in FR4}'
        ],
        interviewEmphasis: 'Primary whiteboard question in board design, hardware engineering, and high-speed I/O interviews.'
      }
    ]
  },

  // ==========================================================================
  // 5. POST-SILICON VALIDATION, BRING-UP & TEST (ATE / PRODUCT ENGINEERING)
  // ==========================================================================
  {
    id: 'post-silicon-validation',
    name: 'Post-Silicon Validation, Bring-Up & Test (ATE / Product Engineering)',
    domainId: 'vlsi',
    domainName: 'VLSI & Silicon Design',
    tagline: 'First-silicon power-on, lab characterization, automated ATE production testing & yield ramp',
    description: 'Bridges pre-silicon digital models and physical manufactured silicon. Executes first-silicon power-on in cleanrooms, characterization across voltage/frequency corners, Automated Test Equipment (ATE) test program development, and yield defect debugging.',
    iconName: 'ShieldCheck',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    relatedTrackIds: ['dft-low-power', 'physical-design-sta'],
    relatedEncyclopediaVolumes: ['vol-12', 'vol-13', 'vol-14', 'vol-15'],
    
    // --- 1. CLASSIFICATION BASED ON JOBS ---
    jobs: [
      {
        id: 'job-silicon-bringup',
        title: 'Post-Silicon Validation & Silicon Bring-Up Engineer',
        experienceTier: 'Entry / Intern',
        description: 'Brings up newly fabricated ICs in the laboratory: validates power sequencing, locks clock PLLs, establishes JTAG/I2C communication, and executes automated PVT characterization sweeps.',
        salaryIndiaCTC: '₹12 LPA - ₹24 LPA (Tier-1 MNC)',
        salaryUSRange: '$115,000 - $155,000 Base',
        industryDemandLevel: 'Surging',
        standardProcessNodes: ['TSMC N3E / N5 / N7', 'Intel 18A', 'Samsung 4nm'],
        typicalInterviewRounds: [
          'Technical Round 1: Lab bench instruments (high-bandwidth oscilloscopes, logic analyzers, spectrum analyzers, power supplies)',
          'Technical Round 2: Automated testing with Python (PyVISA, SCPI, instrument drivers, multithreaded logging)',
          'Technical Round 3: Post-silicon debug methodologies: isolating silicon bug vs board bug vs firmware bug',
          'Voltage/frequency corner Shmoo characterization and root-cause failure analysis'
        ],
        dayInTheLifeSnippet: 'Working in the silicon validation lab with thermal forcing units (Thermostream), probing high-speed clock pins with active differential probes, running automated Python PVT sweeps, and filing silicon errata bug reports.',
        keyResponsibilities: [
          'Lead first-silicon power-on in the lab, verifying regulated rails, crystal oscillators, and reset deassertion',
          'Develop automated Python test frameworks (PyVISA / SCPI) to control laboratory instruments and thermal chambers',
          'Execute characterization across Process, Voltage (0.65V - 1.1V), and Temperature (-40°C to 125°C) corners',
          'Debug complex hardware bugs, race conditions, and signal integrity anomalies that escaped pre-silicon simulation'
        ],
        primaryDeliverables: [
          'Silicon bringup log documenting power-on sequencing, register sanity, and errata workarounds',
          'Automated Python characterization suites generating automated voltage-frequency Shmoo plots',
          'Root-cause failure analysis reports distinguishing silicon design bugs from PCB and firmware defects'
        ],
        interviewTopics: [
          'How to debug a chip that powers on but fails to respond on the JTAG scan chain',
          'Thermal chamber testing: Why cold temperatures (-40°C) worsen hold time violations while hot temperatures (+125°C) worsen setup time',
          'Oscilloscope probing: active vs passive probes, ground lead loop inductance, and bandwidth limits ($BW \\ge 3 \\times f_{max}$)',
          'Automated instrument control using SCPI over VISA (GPIB, USB-TMC, TCP/IP sockets)'
        ],
        targetCompanies: ['Qualcomm', 'Intel', 'AMD', 'NVIDIA', 'Apple', 'Texas Instruments', 'Broadcom', 'NXP Semiconductors', 'Western Digital']
      },
      {
        id: 'job-ate-product-engineer',
        title: 'Semiconductor Product & ATE Test Engineer',
        experienceTier: 'Junior (1-3 Yrs)',
        description: 'Develops mass-production test programs for Automated Test Equipment (ATE: Teradyne UltraFLEX, Advantest V93000) for wafer sort (CP) and packaged final test (FT).',
        salaryIndiaCTC: '₹11 LPA - ₹22 LPA',
        salaryUSRange: '$110,000 - $145,000 Base',
        industryDemandLevel: 'Very High',
        standardProcessNodes: ['All Commercial Foundry Nodes (3nm to 180nm)'],
        typicalInterviewRounds: [
          'Technical Round 1: ATE test systems, pin electronics, parametric measurement units (PMU), load boards',
          'Technical Round 2: Wafer sort (Circuit Probe - CP) vs Final Test (FT), probe cards, contact resistance',
          'Technical Round 3: Test time reduction, multisite testing, pattern conversion from WGL/STIL to ATE formats',
          'Statistical Process Control (SPC), Cp/Cpk metrics, yield enhancement, and Shmoo plotting'
        ],
        dayInTheLifeSnippet: 'Converting DFT ATPG patterns into ATE binary vectors, debugging test program timing on a Teradyne UltraFLEX tester, optimizing test time per die from 8 seconds down to 3.2 seconds, and analyzing wafer defect density.',
        keyResponsibilities: [
          'Develop C++ / Java test programs on commercial ATE platforms (Teradyne UltraFLEX, Advantest V93000)',
          'Perform DC parametric testing: continuity, leakage current, threshold voltages, quiescent current (IDDQ)',
          'Execute AC functional testing: at-speed ATPG scan, Memory BIST, and high-speed loopback testing',
          'Analyze wafer yield statistics and drive yield ramp by identifying systematic defect mechanisms'
        ],
        primaryDeliverables: [
          'Production-certified ATE test program with multisite parallel testing capability',
          'Wafer probe (CP) and packaged final test (FT) yield Pareto charts and defect classification reports',
          'Test time optimization report demonstrating reduced cost of test (CoT) per good die'
        ],
        interviewTopics: [
          'IDDQ testing: measuring quiescent supply current to detect bridge faults and gate oxide punch-through',
          'Open/Short continuity testing using protective ESD diodes and negative current injection',
          'Process capability metrics: difference between $C_p$ (process potential) and $C_{pk}$ (process centering)',
          'Wafer map analysis: radial defect clusters vs edge die yield roll-off causes'
        ],
        targetCompanies: ['Teradyne', 'Advantest', 'Texas Instruments', 'Qualcomm', 'Tessolve', 'Intel', 'NXP', 'GlobalFoundries', 'Amkor Technology', 'ASE Group']
      }
    ],

    // --- 2. CLASSIFICATION BASED ON SKILLS ---
    skills: [
      {
        id: 'skill-python-pyvisa-automation',
        name: 'Automated Test Bench Scripting with Python & PyVISA',
        category: 'Post-Silicon Validation',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['VISA (Virtual Instrument Software Architecture) Specification', 'SCPI-99 Standards'],
        industrialBenchmark: 'Continuous 72-hour unattended PVT regression suite logging >100,000 data points without crash',
        industryRelevance: 'Lab automation is non-negotiable. Modern semiconductor validation demands automated instrument sweeps over thousands of operating points.',
        masteryCriteria: 'Using PyVISA to control multimeters, oscilloscopes, arbitrary waveform generators, and temperature controllers over GPIB, USB, and Ethernet. Writing robust multithreaded logging and error handling frameworks.',
        tools: ['Python 3 (PyVISA, NumPy, Pandas, Matplotlib)', 'Keysight Command Expert', 'National Instruments VISA'],
        practicalProjectEvidence: 'Developed an automated Python lab testbench that swept Vdd from 0.7V to 1.2V and frequency from 100MHz to 1GHz, plotting a full 2D Shmoo plot.'
      },
      {
        id: 'skill-highspeed-oscilloscope-bert',
        name: 'High-Speed Signal Characterization (Oscilloscopes & BERTs)',
        category: 'Post-Silicon Validation',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['IEEE 802.3 Physical Layer Test Standards', 'PCI-SIG Compliance Spec'],
        industrialBenchmark: 'Accurate eye diagram jitter decomposition (RJ < 1 ps RMS, TJ @ BER 10^-12)',
        industryRelevance: 'Physical silicon must be proved compliant with industry eye masks before commercial shipping.',
        masteryCriteria: 'Operating 25GHz+ real-time oscilloscopes, calibrating differential probes, configuring Bit Error Rate Testers (BERT), de-embedding cable fixtures with S-parameters, and measuring eye height/width margins.',
        tools: ['Tektronix / Keysight Real-Time Digital Phosphor Oscilloscopes', 'Anritsu / Keysight BERTs', 'Time-Domain Reflectometry (TDR)'],
        practicalProjectEvidence: 'Measured and documented PCIe / high-speed serial Eye diagrams, extracting random and deterministic jitter under varying supply noise.'
      }
    ],

    // --- 3. CLASSIFICATION BASED ON KNOWLEDGE ---
    knowledge: [
      {
        id: 'know-pre-vs-post-silicon-gap',
        concept: 'Pre-Silicon Simulation vs Post-Silicon Physical Reality Gap',
        theoryDepth: 'Tapeout / Signoff Reality',
        whyCrucial: 'Pre-silicon simulation runs in idealized mathematical models. Physical silicon operates in a real environment with power supply impedance, thermal dissipation, packaging parasitics, and true board-level asynchronous events.',
        deepAnalysisExplanation: 'Pre-silicon simulations are slow (simulating 1 second of real silicon activity in gate-level simulation would take months). As a result, simulations only cover thousands of clock cycles, whereas real silicon executes billions of cycles per second. Crucially, board-level power supply noise, package bond wire inductance ($L \\frac{di}{dt}$), thermal gradients, and asynchronous clock drift only manifest on physical silicon.',
        siliconImpact: 'Silicon that passes 100% of pre-silicon verification can fail instantly on lab power-on due to package inductance voltage bounce or unmodeled board crosstalk.',
        mitigationTechniques: ['Hardware emulation (Palladium, Zebu) running OS boots pre-silicon', 'Co-simulation with package and board S-parameter models', 'Extensive on-chip telemetry sensors (temperature, voltage droop monitors)'],
        keyQuestions: [
          'Why does a bug that takes 10 billion cycles to trigger never appear in pre-silicon simulation but appears in 2 seconds on real silicon?',
          'How does package bond wire inductance cause ground bounce ($V = L \\cdot \\frac{di}{dt}$) during simultaneous output switching (SSO)?',
          'What are on-chip PVT monitors and how are they read via JTAG or I2C during silicon characterization?'
        ],
        whiteboardFormulas: [
          'V_{bounce} = N_{drivers} \\cdot L_{pin} \\cdot \\frac{di}{dt}',
          '\\text{Simulation Speed: } \\sim 10\\text{ Hz (RTL Simulation)} \\ll 1\\text{ MHz (Emulation)} \\ll 2\\text{ GHz (Real Silicon)}'
        ],
        interviewEmphasis: 'Primary topic in validation and product engineering interviews.'
      },
      {
        id: 'know-silicon-aging-mechanisms',
        concept: 'Silicon Transistor Aging Mechanisms (NBTI, PBTI, HCI & TDDB)',
        theoryDepth: 'Tapeout / Signoff Reality',
        whyCrucial: 'Transistors degrade over their operating lifetime. Chips designed for automotive or datacenter use must operate reliably for 10-15 years under high temperatures and voltages without functional failure.',
        deepAnalysisExplanation: 'Negative Bias Temperature Instability (NBTI) occurs in PMOS transistors under negative gate bias and high temperature, breaking Si-H bonds at the gate oxide interface and shifting threshold voltage ($|V_{th}|$ increases, slowing the transistor down). Hot Carrier Injection (HCI) occurs when high electric fields accelerate electrons into the gate dielectric, causing permanent damage. Time-Dependent Dielectric Breakdown (TDDB) occurs when electrical stress forms conductive defect percolation paths through the gate oxide, eventually creating a catastrophic short circuit.',
        siliconImpact: 'A chip that passes timing closure at Day 1 can develop setup timing violations and crash at Year 3 due to NBTI-induced transistor delay degradation.',
        mitigationTechniques: ['Aging-aware guardband derating in Static Timing Analysis', 'Dynamic Voltage and Frequency Scaling (DVFS) margin budgeting', 'Burn-in High Temperature Operating Life (HTOL) screening'],
        keyQuestions: [
          'What is the physical mechanism of NBTI in PMOS transistors and why does it partially recover when negative bias is removed?',
          'How does High Temperature Operating Life (HTOL) burn-in accelerate transistor aging using the Arrhenius equation to weed out infant mortality defects?',
          'Why do advanced FinFET nodes (sub-7nm) suffer from PBTI (Positive Bias Temperature Instability) in addition to NBTI?'
        ],
        whiteboardFormulas: [
          '\\Delta V_{th}(t) \\propto e^{-\\frac{E_a}{k T}} \\cdot t^n \\quad [\\text{NBTI Degradation Power Law}]',
          'AF = e^{\\frac{E_a}{k} \\cdot (\\frac{1}{T_{use}} - \\frac{1}{T_{stress}})} \\cdot e^{\\gamma \\cdot (V_{stress} - V_{use})} \\quad [\\text{HTOL Acceleration Factor}]'
        ],
        interviewEmphasis: 'Distinguishes senior validation and reliability engineers from novices.'
      }
    ]
  }
];
