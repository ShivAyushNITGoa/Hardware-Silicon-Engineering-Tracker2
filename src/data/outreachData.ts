import { OutreachTemplate } from "../types";

export const coldOutreachTemplates: OutreachTemplate[] = [
  {
    "id": "startup-founder",
    "targetCategory": "Indian Fabless Startups & Founders / CXOs",
    "roleTarget": "RTL Design / RISC-V Core & Accelerator Intern",
    "subject": "[Your Name] — RTL & RISC-V Synthesizable Core IP / Proof of Verilator & cocotb Testbenches",
    "body": "Hi [Founder/Lead Name],\n\nI have been closely following [Company Name]'s incredible work on [specific product/chip, e.g., the Mindgrove Vision SoC / InCore Dolomite RISC-V core / Netrasemi AI accelerator]. \n\nI am an engineering student specializing in SystemVerilog RTL design and hardware verification. Rather than generic coursework, I have engineered and benchmarked real synthesizable silicon architectures:\n\n1. 5-Stage Pipelined RV32I Processor SoC:\n   • Complete hazard detection & ALU-to-ALU forwarding bypassing network.\n   • Passed 100% official RISC-V architectural compliance test suite.\n   • Booted bare-metal C applications over custom MMIO UART peripheral at 100MHz on FPGA.\n   • Code & Waveforms: github.com/[your-github-username]/rv32i-pipelined-soc\n\n2. Synthesizable RTL IP Library & cocotb Verification:\n   • Parameterized UART, SPI Master (all 4 modes), and CDC-safe Asynchronous Dual-Clock FIFO with Gray code pointers.\n   • 100,000 randomized transaction automated Python cocotb testbench with zero CDC violations.\n   • Repository: github.com/[your-github-username]/systemverilog-rtl-ip-library\n\nI would love to contribute to [Company Name]'s RTL development or IP verification pipeline as an engineering intern. \n\nAre you open for a brief 10-minute technical chat this week? I have attached my 1-page resume and waveform reports.\n\nBest regards,\n[Your Name]\n[LinkedIn Profile Link] | [GitHub Profile Link] | [Phone Number]",
    "customizationTips": [
      "Mention their exact chip or DLI milestone (e.g. Netrasemi NETRA A2000, Mindgrove Secure IoT SoC).",
      "Always link directly to the GitHub repo with visible VCD waveform GIFs and clean test outputs.",
      "Send via LinkedIn InMail or Email on Tuesday–Thursday mornings (8:30 AM - 10:00 AM IST)."
    ]
  },
  {
    "id": "mnc-tech-lead",
    "targetCategory": "MNC Technical Leads / Engineering Managers (Qualcomm, TI, NVIDIA)",
    "roleTarget": "Hardware Design Verification / Embedded Firmware Intern",
    "subject": "Engineering Internship Inquiry: FreeRTOS Firmware & SystemVerilog UVM / Assertion Verification — [Your Name]",
    "body": "Dear [Manager Name],\n\nI noticed your team at [Company Name] is pioneering [specific domain, e.g., low-power wireless SoCs / high-speed automotive interfaces / GPU subsystem verification].\n\nI am reaching out to explore potential internship opportunities in Hardware Design Verification or Embedded Systems within your division.\n\nMy technical foundation matches your team's production requirements:\n• SystemVerilog & SVA: Designed parameterized IP cores verified with concurrent SVA properties, covergroups, and cocotb regression testbenches with 100% line & branch coverage.\n• Embedded Systems & FreeRTOS: Architected multi-threaded production firmware on ESP32-S3 / ARM Cortex with isolated HAL drivers, zero-drop flash ring-buffer spooling, and power-profiled sleep states (<45uA).\n• Hardware Architecture: Designed a 5-stage pipelined RV32I processor with hazard forwarding and MMIO subsystems.\n\nAll design files, testbenches, and measured timing/power reports are documented with reproducible build scripts at github.com/[your-github-username].\n\nCould we schedule a short conversation to discuss how I can support your team's upcoming verification and design milestones?\n\nThank you for your time and consideration.\n\nWarm regards,\n[Your Name]\n[LinkedIn Link] | [GitHub Link] | [Phone Number]",
    "customizationTips": [
      "Find the Engineering Manager or Verification Lead on LinkedIn using search query: `\"<Company>\" \"Engineering Manager\" OR \"Design Verification Lead\" Bangalore/Hyderabad`",
      "Highlight concrete metrics: <45uA sleep power, 100k randomized transactions, 100MHz Fmax.",
      "Attach a PDF resume named: [YourName]_Hardware_Design_Resume.pdf"
    ]
  },
  {
    "id": "embedded-firmware-lead",
    "targetCategory": "Edge IoT, Robotics & Automotive OEMs (Ather, Tonbo, CynLr)",
    "roleTarget": "Embedded Systems & Driver Development Intern",
    "subject": "Embedded C / FreeRTOS Firmware & Low-Power Hardware Architecture — [Your Name]",
    "body": "Hi [Lead/Recruiter Name],\n\nI am an embedded systems engineer deeply passionate about deterministic hardware-software co-design and low-latency motor/sensor systems like the ones powering [Company Name]'s platform.\n\nKey highlights of my recent engineering builds:\n• Production-grade FreeRTOS firmware with 3-task concurrent pipeline, mutex priority inheritance, and DMA-backed SPI/I2C sensor acquisitions.\n• Atomic flash ring-buffer spooling ensuring zero data loss across power brownouts and network reconnects.\n• Direct oscilloscope and logic analyzer hardware validation (<5us ISR latency).\n\nI would love to bring this hands-on firmware and digital design expertise to [Company Name] as an Embedded Engineering Intern.\n\nPlease let me know if you are open for a quick introductory conversation.\n\nBest regards,\n[Your Name]\n[GitHub / Portfolio Link] | [LinkedIn Link]",
    "customizationTips": [
      "Focus heavily on real-time deterministic constraints, ISR safety, and oscilloscope timing proofs.",
      "Mention specific microcontrollers (ESP32-S3, STM32, ARM Cortex-M4) and hardware buses."
    ]
  }
];
