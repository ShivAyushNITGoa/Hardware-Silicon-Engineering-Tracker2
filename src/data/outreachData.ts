import { ColdOutreachTemplate } from '../types';

export interface EcosystemInsight {
  title: string;
  category: string;
  summary: string;
  keyPoints: string[];
}

export const ecosystemInsights: EcosystemInsight[] = [
  {
    title: 'India Semiconductor Mission (ISM) & Design Linked Incentive (DLI)',
    category: 'Government Policy & Subsidies',
    summary: 'The ₹76,000 Crore ($10B) Semicon India program provides up to 50% financial design cost coverage (capped at ₹15 Cr per company) and free access to commercial Synopsys/Cadence/Siemens EDA tools.',
    keyPoints: [
      'Over 23 fabless startups funded with DLI grants to tape out indigenous RISC-V and Edge AI silicon.',
      '72+ companies given access to industry-grade EDA tool licenses via C-DAC/ChipIN Centre.',
      'Massive hiring surge for RTL Design, Physical Design, and ASIC Verification engineers with SystemVerilog/UVM expertise in Bengaluru, Hyderabad, and Chennai.'
    ]
  },
  {
    title: 'Hiring Seasons & Internship Cycles in India',
    category: 'Hiring Timelines',
    summary: 'Understanding the distinct hiring windows between Global MNCs, EDA Giants, and Indian Fabless Startups.',
    keyPoints: [
      'MNC Summer Internships (Qualcomm, TI, Intel, AMD, NVIDIA): Applications open August - November; Online Assessments conducted Sep-Oct; Interviews Oct-Dec for May-July internships.',
      '6-Month / 11-Month Final Year Co-ops: Hiring runs November - February; high conversion to full-time PPO (Pre-Placement Offer).',
      'Startups & DLI Firms (Mindgrove, InCore, Netrasemi, Morphing Machines): Year-round agile hiring via GitHub/Cold Outreach; peak requirements in January - April.'
    ]
  },
  {
    title: 'Stipend & Compensation Benchmarks (2025–2026)',
    category: 'Market Compensation',
    summary: 'Standard monthly internship stipends across tiers for hardware/semiconductor engineering in India.',
    keyPoints: [
      'Tier-1 Semiconductor MNCs (NVIDIA, Qualcomm, TI, AMD): ₹60,000 – ₹1,20,000 / month + relocation/housing allowance.',
      'EDA & IP Giants (ARM, Synopsys, Cadence, Siemens EDA): ₹45,000 – ₹85,000 / month.',
      'Funded Indian Fabless Startups (Mindgrove, InCore, Netrasemi, MosChip): ₹30,000 – ₹60,000 / month + high-impact early silicon exposure.',
      'VLSI Design Services (Tessolve, SmartSoC, Cyient, Wipro VLSI): ₹20,000 – ₹40,000 / month.'
    ]
  }
];

export const coldOutreachTemplates: ColdOutreachTemplate[] = [
  {
    id: 'startup-founder',
    targetCategory: 'Indian Fabless Startups & Founders / CXOs',
    roleTarget: 'RTL Design / RISC-V Core & Accelerator Intern',
    subject: 'Ayush — RTL & RISC-V Synthesizable Core IP / Proof of Verilator & cocotb Testbenches',
    body: `Hi [Founder/Lead Name],

I have been closely following [Company Name]'s incredible work on [specific product/chip, e.g., the Mindgrove Vision SoC / InCore Dolomite RISC-V core / Netrasemi AI accelerator]. 

I am an engineering student specializing in SystemVerilog RTL design and hardware verification. Rather than generic coursework, I have engineered and benchmarked real synthesizable silicon architectures:

1. 5-Stage Pipelined RV32I Processor SoC:
   • Complete hazard detection & ALU-to-ALU forwarding bypassing network.
   • Passed 100% official RISC-V architectural compliance test suite.
   • Booted bare-metal C applications over custom MMIO UART peripheral at 100MHz on FPGA.
   • Code & Waveforms: github.com/ayush/rv32i-pipelined-soc

2. Synthesizable RTL IP Library & cocotb Verification:
   • Parameterized UART, SPI Master (all 4 modes), and CDC-safe Asynchronous Dual-Clock FIFO with Gray code pointers.
   • 100,000 randomized transaction automated Python cocotb testbench with zero CDC violations.
   • Repository: github.com/ayush/systemverilog-rtl-ip-library

I would love to contribute to [Company Name]'s RTL development or IP verification pipeline as an engineering intern. 

Are you open for a brief 10-minute technical chat this week? I have attached my 1-page resume and waveform reports.

Best regards,
Ayush
[LinkedIn Profile Link] | [GitHub Profile Link] | [Phone Number]`,
    customizationTips: [
      'Mention their exact chip or DLI milestone (e.g. Netrasemi NETRA A2000, Mindgrove Secure IoT SoC).',
      'Always link directly to the GitHub repo with visible VCD waveform GIFs and clean test outputs.',
      'Send via LinkedIn InMail or Email on Tuesday–Thursday mornings (8:30 AM - 10:00 AM IST).'
    ]
  },
  {
    id: 'mnc-tech-lead',
    targetCategory: 'MNC Technical Leads / Engineering Managers (Qualcomm, TI, NVIDIA)',
    roleTarget: 'Hardware Design Verification / Embedded Firmware Intern',
    subject: 'Engineering Internship Inquiry: FreeRTOS Firmware & SystemVerilog UVM / Assertion Verification — Ayush',
    body: `Dear [Manager Name],

I noticed your team at [Company Name] is pioneering [specific domain, e.g., low-power wireless SoCs / high-speed automotive interfaces / GPU subsystem verification].

I am reaching out to explore potential internship opportunities in Hardware Design Verification or Embedded Systems within your division.

My technical foundation matches your team's production requirements:
• SystemVerilog & SVA: Designed parameterized IP cores verified with concurrent SVA properties, covergroups, and cocotb regression testbenches with 100% line & branch coverage.
• Embedded Systems & FreeRTOS: Architected multi-threaded production firmware on ESP32-S3 / ARM Cortex with isolated HAL drivers, zero-drop flash ring-buffer spooling, and power-profiled sleep states (<45uA).
• Hardware Architecture: Designed a 5-stage pipelined RV32I processor with hazard forwarding and MMIO subsystems.

All design files, testbenches, and measured timing/power reports are documented with reproducible build scripts at github.com/ayush.

Could we schedule a short conversation to discuss how I can support your team's upcoming verification and design milestones?

Thank you for your time and consideration.

Warm regards,
Ayush
[LinkedIn Link] | [GitHub Link] | [Phone Number]`,
    customizationTips: [
      'Find the Engineering Manager or Verification Lead on LinkedIn using search query: `"<Company>" "Engineering Manager" OR "Design Verification Lead" Bangalore/Hyderabad`',
      'Highlight concrete metrics: <45uA sleep power, 100k randomized transactions, 100MHz Fmax.',
      'Attach a PDF resume named: Ayush_Hardware_Design_Resume.pdf'
    ]
  },
  {
    id: 'embedded-firmware-lead',
    targetCategory: 'Edge IoT, Robotics & Automotive OEMs (Ather, Tonbo, CynLr)',
    roleTarget: 'Embedded Systems & Driver Development Intern',
    subject: 'Embedded C / FreeRTOS Firmware & Low-Power Hardware Architecture — Ayush',
    body: `Hi [Lead/Recruiter Name],

I am an embedded systems engineer deeply passionate about deterministic hardware-software co-design and low-latency motor/sensor systems like the ones powering [Company Name]'s platform.

Key highlights of my recent engineering builds:
• Production-grade FreeRTOS firmware with 3-task concurrent pipeline, mutex priority inheritance, and DMA-backed SPI/I2C sensor acquisitions.
• Atomic flash ring-buffer spooling ensuring zero data loss across power brownouts and network reconnects.
• Direct oscilloscope and logic analyzer hardware validation (<5us ISR latency).

I would love to bring this hands-on firmware and digital design expertise to [Company Name] as an Embedded Engineering Intern.

Please let me know if you are open for a quick introductory conversation.

Best regards,
Ayush
[GitHub / Portfolio Link] | [LinkedIn Link]`,
    customizationTips: [
      'Focus heavily on real-time deterministic constraints, ISR safety, and oscilloscope timing proofs.',
      'Mention specific microcontrollers (ESP32-S3, STM32, ARM Cortex-M4) and hardware buses.'
    ]
  }
];
