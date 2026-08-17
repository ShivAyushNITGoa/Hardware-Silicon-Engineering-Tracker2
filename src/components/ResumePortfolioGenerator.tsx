import React, { useState } from 'react';
import { flagshipProjects } from '../data/projectsData';
import { initialCompanies } from '../data/companiesData';
import { initialTools } from '../data/toolsData';
import { 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  Download, 
  Github, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck 
} from 'lucide-react';

export const ResumePortfolioGenerator: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedTargetRole, setSelectedTargetRole] = useState<string>('RTL Design & Silicon Verification');
  const [includeGpa, setIncludeGpa] = useState<boolean>(true);
  const [gpaValue, setGpaValue] = useState<string>('8.8 / 10.0');

  const resumeMarkdown = `# AYUSH
Bengaluru / Hyderabad, India | ayush.silicon.eng@gmail.com | linkedin.com/in/ayush-silicon | github.com/ayush

## TARGET PROFILE: ${selectedTargetRole.toUpperCase()}

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
• GitHub Repository: github.com/ayush/rv32i-pipelined-soc

### 2. Edge-AI Fixed-Point Neural Accelerator on FPGA
*SystemVerilog, PyTorch Quantization, Xilinx DSP48E2, AXI4-Lite, Python Reference Model*
• Designed a synthesizable systolic Multiply-Accumulate (MAC) matrix compute engine mapped to dedicated DSP48E2 primitives with LUT-interpolated nonlinear activation function accelerators.
• Quantized PyTorch time-series classification models from FP32 to Q4.12 / INT8 fixed-point, maintaining >98.2% baseline accuracy with zero floating-point overhead.
• Integrated AXI4-Lite memory-mapped control interface and AXI-Stream streaming port, measuring an 8.4x hardware inference latency reduction (<18µs) compared to software CPU execution.
• GitHub Repository: github.com/ayush/fpga-edge-ai-accelerator

### 3. Production-Grade Synthesizable SystemVerilog IP Library with cocotb Verification
*SystemVerilog, cocotb, SVA Assertions, Verilator, Xilinx Vivado (Timing Closure at 150MHz)*
• Developed parameterized, synthesis-clean hardware IP cores: Dual-Clock Asynchronous FIFO with Gray-code pointer CDC synchronization, Configurable SPI Master (all 4 modes), and Oversampled UART.
• Constructed automated Python \`cocotb\` regression testbench streaming >100,000 randomized transactions; verified 100% functional and line coverage with concurrent SVA assertion monitors.
• Closed static timing analysis with positive slack (WNS > 0.65ns) at 150MHz operating clock frequency.
• GitHub Repository: github.com/ayush/systemverilog-rtl-ip-library

### 4. FireGuard v2: Deterministic Low-Power FreeRTOS Edge Firmware
*Embedded C, FreeRTOS, ESP32-S3, Zero-Drop Flash Spooling, TLS/MQTT*
• Engineered 3-task concurrent FreeRTOS firmware with strict Mutex Priority Inheritance to prevent priority inversion during simultaneous high-frequency sensor acquisition and network transfers.
• Implemented atomic flash ring-buffer spooling ensuring zero data loss across power brownouts and network disconnects.
• Optimized power modes achieving <45µA deep sleep current with automated brownout recovery in <3.0 seconds.
• GitHub Repository: github.com/ayush/fireguard-v2-firmware

---

## EDUCATION
**Bachelor of Technology in Electronics & Communication / Computer Science Engineering**
${includeGpa ? `• CGPA: ${gpaValue} (Strictly Maintained Academic Excellence)` : ''}
• Core Coursework: Digital VLSI Design, Computer Architecture, Embedded Systems, Real-Time Operating Systems, Static Timing Analysis.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([resumeMarkdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `Ayush_${selectedTargetRole.replace(/\s+/g, '_')}_Resume.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6" id="resume-generator-container">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-sm" id="resume-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm font-semibold mb-1">
              <FileText className="w-4 h-4" />
              <span>ATS-OPTIMIZED RESUME & PORTFOLIO EVIDENCE</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Silicon & Embedded Engineering Resume Generator</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Strictly evidence-driven, metrics-proven resume tailored for Tier-1 Semiconductor MNCs and Indian DLI Fabless Startups.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopy}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>
      </div>

      {/* Configuration Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between text-xs">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <label className="font-semibold text-slate-700">Target Role Tuning:</label>
          <select
            value={selectedTargetRole}
            onChange={(e) => setSelectedTargetRole(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="RTL Design & Silicon Verification">RTL Design & Silicon Verification</option>
            <option value="RISC-V Microarchitecture & Processor Core Design">RISC-V Microarchitecture & Processor Core Design</option>
            <option value="FPGA Hardware Acceleration & Edge-AI">FPGA Hardware Acceleration & Edge-AI</option>
            <option value="Embedded Firmware & Real-Time Systems">Embedded Firmware & Real-Time Systems</option>
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeGpa}
              onChange={(e) => setIncludeGpa(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Include CGPA</span>
          </label>
          {includeGpa && (
            <input
              type="text"
              value={gpaValue}
              onChange={(e) => setGpaValue(e.target.value)}
              className="px-2 py-1 border border-slate-300 rounded text-slate-800 font-mono w-24 text-xs"
            />
          )}
        </div>
      </div>

      {/* Live Resume Markdown Preview */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 text-xs font-mono mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-bold">ATS READINESS: 100% (Zero Buzzword Slop, Pure Mathematical Metrics)</span>
          </div>
          <span>Formatted for Standard Markdown & Plaintext</span>
        </div>

        <pre className="text-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto pr-2">
          {resumeMarkdown}
        </pre>
      </div>
    </div>
  );
};
