import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  GraduationCap, 
  Award,
  Sparkles,
  RotateCcw
} from 'lucide-react';

const RESUME_PROFILE_STORAGE_KEY = 'silicon_tracker_user_resume_profile_v1';

interface UserResumeProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  degree: string;
  college: string;
  gpa: string;
  targetRole: string;
  includeGithub: boolean;
}

const DEFAULT_PROFILE: UserResumeProfile = {
  fullName: 'Your Full Name',
  email: 'your.email@example.com',
  phone: '+91 98765 43210',
  location: 'Bengaluru / Hyderabad / Remote, India',
  linkedin: 'linkedin.com/in/your-profile',
  github: 'your-username',
  degree: 'B.Tech in Electronics & Communication / Electrical Engineering',
  college: 'National Institute of Technology / Engineering College',
  gpa: '8.8 / 10.0',
  targetRole: 'RTL Design & Silicon Verification',
  includeGithub: true
};

export const ResumePortfolioGenerator: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserResumeProfile>(() => {
    try {
      const saved = localStorage.getItem(RESUME_PROFILE_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load user resume profile', e);
    }
    return DEFAULT_PROFILE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(RESUME_PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save user resume profile', e);
    }
  }, [profile]);

  const updateField = <K extends keyof UserResumeProfile>(field: K, value: UserResumeProfile[K]) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleResetProfile = () => {
    setProfile(DEFAULT_PROFILE);
  };

  const cleanGithubUser = profile.github.replace(/^https?:\/\/(www\.)?github\.com\/?/i, '').replace(/\/$/, '') || 'your-username';

  const resumeMarkdown = `# ${profile.fullName.toUpperCase()}
${profile.location} | ${profile.email} | ${profile.phone} | ${profile.linkedin} | github.com/${cleanGithubUser}

## TARGET PROFILE: ${profile.targetRole.toUpperCase()}

---

## TECHNICAL SKILLS SUMMARY
• **Hardware Description & Modeling**: SystemVerilog (IEEE 1800-2017), Verilog HDL, SVA (SystemVerilog Assertions), SystemC, Bluespec HDL
• **Verification & Simulation**: UVM 1.2, cocotb (Python), Verilator, QuestaSim / ModelSim, GTKWave, Constrained-Random Verification
• **FPGA & Synthesis**: Xilinx Vivado, Intel Quartus Prime, OpenROAD / Yosys, Static Timing Analysis (STA), SDC Constraints, CDC Safety
• **Embedded Firmware & RTOS**: Embedded C (C99/C11), FreeRTOS Kernel, ARM Cortex-M4/M7, RISC-V RV32I, ESP32-S3, Bare-Metal Driver Development
• **Protocols & Hardware Interfaces**: AXI4 / AXI-Lite / AXI-Stream, APB, AHB, SPI (Modes 0-3), I2C, UART, CAN 2.0B, DMA Controllers

---

## CORE SILICON & HARDWARE FLAGSHIP PROJECTS

### 1. 5-Stage Pipelined RV32I Processor SoC with Hazard Forwarding & MMIO
*SystemVerilog, Verilator, cocotb, RISC-V GNU Toolchain, Xilinx Vivado, Artix-7 FPGA*
• Architected a 5-stage pipelined RV32I processor supporting all 37 base ISA integer instructions with complete hazard detection and ALU-to-ALU forwarding networks, eliminating data hazard stalls.
• Passed 100% of the official RISC-V architectural compliance test suite (riscv-tests) with zero instruction decoding or branch penalty discrepancies.
• Built bus-mapped MMIO address decoder for UART transmitter/receiver and hardware timer, booting bare-metal C applications compiled with \`riscv32-unknown-elf-gcc\` at 100MHz on Xilinx Artix-7 FPGA.
${profile.includeGithub ? `• GitHub Repository: github.com/${cleanGithubUser}/rv32i-pipelined-soc` : ''}

### 2. Edge-AI Fixed-Point Neural Accelerator on FPGA
*SystemVerilog, PyTorch Quantization, Xilinx DSP48E2, AXI4-Lite, Python Reference Model*
• Designed a synthesizable systolic Multiply-Accumulate (MAC) matrix compute engine mapped to dedicated DSP48E2 primitives with LUT-interpolated nonlinear activation function accelerators.
• Quantized PyTorch time-series classification models from FP32 to Q4.12 / INT8 fixed-point, maintaining >98.2% baseline accuracy with zero floating-point overhead.
• Integrated AXI4-Lite memory-mapped control interface and AXI-Stream streaming port, closing timing at 250MHz on Vivado with >85% DSP block utilization.
${profile.includeGithub ? `• GitHub Repository: github.com/${cleanGithubUser}/fpga-neural-accelerator` : ''}

### 3. Dual-Clock Asynchronous FIFO with Gray-Code CDC & Formal Assertions
*SystemVerilog, IEEE 1800 Assertions, QuestaSim, Cadence JasperGold / SymbiYosys*
• Designed a dual-clock asynchronous FIFO with Gray-code synchronized read and write pointers using 2-flop synchronizer networks and registered memory arrays.
• Formally verified 100% absence of overflow, underflow, and pointer collision under arbitrary asynchronous clock phase relationships using bounded model checking.
• Authored comprehensive SVA assertion modules and achieved 100% functional and branch coverage with randomized burst transactions.
${profile.includeGithub ? `• GitHub Repository: github.com/${cleanGithubUser}/async-fifo-cdc` : ''}

### 4. Hard Real-Time Predictive Telemetry Node on FreeRTOS & ARM Cortex-M4
*Embedded C, FreeRTOS Kernel, STM32F4, DMA, SPI/I2C Protocols, Logic Analyzer*
• Engineered preemptive multi-tasking telemetry firmware running on FreeRTOS with strict rate-monotonic scheduling and sub-50µs jitter bounds.
• Implemented zero-copy circular DMA drivers for dual SPI IMU sensors and I2C hardware peripherals, cutting CPU utilization from 42% to <7%.
• Verified task stack watermarks and integrated software watchdog timer routines preventing deadlocks across critical hardware ISR boundaries.
${profile.includeGithub ? `• GitHub Repository: github.com/${cleanGithubUser}/freertos-telemetry-node` : ''}

---

## EDUCATION
**${profile.degree}**
*${profile.college}*
• **Cumulative CGPA**: ${profile.gpa}
• **Key Coursework**: VLSI System Design, Digital CMOS ICs, Microprocessors & Microcontrollers, Computer Architecture, Embedded Systems, Signals & Systems.
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resumeMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([resumeMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = profile.fullName.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'Candidate';
    const safeRole = profile.targetRole.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'Silicon';
    a.href = url;
    a.download = `${safeName}_${safeRole}_Resume.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Universal ATS Silicon Resume Generator</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
              Ready for Any Candidate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            ATS Silicon Resume &amp; Proof-of-Work Generator
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Personalize your proven silicon milestones into an industry-grade, keyword-dense Markdown resume engineered for Tier-1 semiconductor MNC screening systems.
          </p>
          <div className="text-[11px] text-neutral-400 pt-1">
            Resume Framework &amp; Technical Architecture Curated by <span className="font-semibold text-neutral-200">Ayush Kumar</span>
          </div>
        </div>
      </div>

      {/* Candidate Profile Customization Card */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-neutral-900">
              Personalize Your Identity &amp; Contact Information
            </h2>
          </div>
          <button
            onClick={handleResetProfile}
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
            title="Reset to default placeholder sample"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          {/* Full Name */}
          <div>
            <label className="flex items-center gap-1 font-semibold text-neutral-700 mb-1">
              <User className="w-3 h-3 text-neutral-400" />
              Full Name
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-1 font-semibold text-neutral-700 mb-1">
              <Mail className="w-3 h-3 text-neutral-400" />
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="e.g. rahul.sharma@example.com"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-1 font-semibold text-neutral-700 mb-1">
              <Phone className="w-3 h-3 text-neutral-400" />
              Phone / WhatsApp
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
            />
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-1 font-semibold text-neutral-700 mb-1">
              <MapPin className="w-3 h-3 text-neutral-400" />
              Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="e.g. Bengaluru / Hyderabad / Remote, India"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
            />
          </div>

          {/* LinkedIn URL */}
          <div>
            <label className="flex items-center gap-1 font-semibold text-neutral-700 mb-1">
              <Linkedin className="w-3 h-3 text-neutral-400" />
              LinkedIn Profile
            </label>
            <input
              type="text"
              value={profile.linkedin}
              onChange={(e) => updateField('linkedin', e.target.value)}
              placeholder="e.g. linkedin.com/in/rahul-sharma"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
            />
          </div>

          {/* GitHub Username */}
          <div>
            <label className="flex items-center gap-1 font-semibold text-neutral-700 mb-1">
              <Github className="w-3 h-3 text-neutral-400" />
              GitHub Username
            </label>
            <input
              type="text"
              value={profile.github}
              onChange={(e) => updateField('github', e.target.value)}
              placeholder="e.g. rahul-sharma-eng"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
            />
          </div>

          {/* College / Institution */}
          <div>
            <label className="flex items-center gap-1 font-semibold text-neutral-700 mb-1">
              <GraduationCap className="w-3 h-3 text-neutral-400" />
              College / University
            </label>
            <input
              type="text"
              value={profile.college}
              onChange={(e) => updateField('college', e.target.value)}
              placeholder="e.g. National Institute of Technology Goa"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
            />
          </div>

          {/* Degree & Major */}
          <div>
            <label className="flex items-center gap-1 font-semibold text-neutral-700 mb-1">
              <Award className="w-3 h-3 text-neutral-400" />
              Degree &amp; Major
            </label>
            <input
              type="text"
              value={profile.degree}
              onChange={(e) => updateField('degree', e.target.value)}
              placeholder="e.g. B.Tech in Electronics & Communication Engineering"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
            />
          </div>

          {/* CGPA */}
          <div>
            <label className="flex items-center gap-1 font-semibold text-neutral-700 mb-1">
              <Sparkles className="w-3 h-3 text-neutral-400" />
              Cumulative CGPA
            </label>
            <input
              type="text"
              value={profile.gpa}
              onChange={(e) => updateField('gpa', e.target.value)}
              placeholder="e.g. 8.8 / 10.0"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all font-mono"
            />
          </div>
        </div>
      </div>

      {/* Control Configuration Bar */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div>
            <label className="block font-bold text-neutral-700 mb-1">
              Target Silicon Role:
            </label>
            <select
              value={profile.targetRole}
              onChange={(e) => updateField('targetRole', e.target.value)}
              className="bg-neutral-50 border border-neutral-200 rounded-lg p-2 font-medium text-neutral-900 cursor-pointer focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="RTL Design & Silicon Verification">RTL Design &amp; Silicon Verification</option>
              <option value="Embedded Firmware & RTOS Engineer">Embedded Firmware &amp; RTOS Engineer</option>
              <option value="FPGA & Hardware Accelerator Architect">FPGA &amp; Hardware Accelerator Architect</option>
              <option value="Physical Design & STA Engineer">Physical Design &amp; STA Engineer</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <input
              type="checkbox"
              id="include-github"
              checked={profile.includeGithub}
              onChange={(e) => updateField('includeGithub', e.target.checked)}
              className="rounded text-neutral-900 focus:ring-neutral-900 cursor-pointer"
            />
            <label htmlFor="include-github" className="text-xs text-neutral-700 font-medium cursor-pointer select-none">
              Include GitHub Repo URLs in Projects
            </label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>

          <button
            onClick={downloadFile}
            className="flex items-center gap-1.5 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {/* Live Formatted Output Preview */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="border-b border-neutral-100 pb-4 mb-4 flex items-center justify-between">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Live Markdown Resume Output
          </span>
          <span className="text-xs font-mono text-neutral-500">
            {resumeMarkdown.length} characters • Tailored for {profile.fullName || 'Candidate'}
          </span>
        </div>

        <pre className="p-4 sm:p-6 bg-neutral-950 text-neutral-100 rounded-xl overflow-x-auto text-xs font-mono leading-relaxed whitespace-pre-wrap selection:bg-neutral-800">
          {resumeMarkdown}
        </pre>
      </div>
    </div>
  );
};

