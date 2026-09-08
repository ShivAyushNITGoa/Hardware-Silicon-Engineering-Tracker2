import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Layers, 
  Cpu, 
  RotateCcw,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const NitGoaElectiveCalculator: React.FC = () => {
  // State for elective choices
  const [sem6Choice, setSem6Choice] = useState<'EE545' | 'ALTERNATE'>('EE545');
  const [sem7Choice, setSem7Choice] = useState<'EE560' | 'EE542' | 'EE543' | 'EE556'>('EE560');
  const [sem8Choice, setSem8Choice] = useState<'OE_ARCH' | 'OE_AIML' | 'OE_OTHER'>('OE_ARCH');
  const [capstoneChoice, setCapstoneChoice] = useState<'RTL_CPU' | 'VERIF_UVM' | 'EDGE_AI' | 'ASIC_OPENLANE' | 'EMBED_CAN' | 'AMS_SVPWM'>('RTL_CPU');

  // Calculate dynamic readiness scores
  const readinessScores = useMemo(() => {
    let rtlScore = 40; // baseline from completed foundation (Digital Electronics + Microprocessors)
    let dvScore = 35;
    let pdScore = 30;
    let embedScore = 65; // high baseline because EE541 Embedded Systems completed in 5th Sem!

    // 6th Sem influence
    if (sem6Choice === 'EE545') {
      rtlScore += 25;
      dvScore += 20;
      pdScore += 15;
      embedScore += 10;
    } else {
      embedScore += 15;
    }

    // 7th Sem influence
    if (sem7Choice === 'EE560') {
      pdScore += 30;
      rtlScore += 15;
      dvScore += 10;
    } else if (sem7Choice === 'EE542') {
      embedScore += 20;
      rtlScore += 5;
    } else if (sem7Choice === 'EE543') {
      rtlScore += 15;
      embedScore += 10;
    } else if (sem7Choice === 'EE556') {
      embedScore += 18;
    }

    // 8th Sem Open Elective influence
    if (sem8Choice === 'OE_ARCH') {
      rtlScore += 15;
      dvScore += 20;
      embedScore += 5;
    } else if (sem8Choice === 'OE_AIML') {
      rtlScore += 10;
      embedScore += 10;
    }

    // Capstone Project influence
    if (capstoneChoice === 'RTL_CPU') {
      rtlScore += 15;
      dvScore += 10;
    } else if (capstoneChoice === 'VERIF_UVM') {
      dvScore += 25;
      rtlScore += 10;
    } else if (capstoneChoice === 'ASIC_OPENLANE') {
      pdScore += 30;
      rtlScore += 10;
    } else if (capstoneChoice === 'EDGE_AI') {
      rtlScore += 15;
      embedScore += 10;
    } else if (capstoneChoice === 'EMBED_CAN') {
      embedScore += 20;
      rtlScore += 10;
    } else if (capstoneChoice === 'AMS_SVPWM') {
      pdScore += 15;
      embedScore += 15;
    }

    return {
      rtl: Math.min(100, rtlScore),
      dv: Math.min(100, dvScore),
      pd: Math.min(100, pdScore),
      embed: Math.min(100, embedScore)
    };
  }, [sem6Choice, sem7Choice, sem8Choice, capstoneChoice]);

  const handleReset = () => {
    setSem6Choice('EE545');
    setSem7Choice('EE560');
    setSem8Choice('OE_ARCH');
    setCapstoneChoice('RTL_CPU');
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 shadow-2xs space-y-6">
      {/* Title & Concept */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 mb-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Academic Simulator</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
            NIT Goa EEE Elective Basket &amp; Career Readiness Calculator
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            Configure your elective options across 6th, 7th, and 8th semester to see your real-time placement readiness percentage across 4 semiconductor specialization disciplines.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto transition-colors"
          title="Reset to recommended default path"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Recommended</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Step 1: Select Your Semester Elective Basket
          </div>

          {/* 6th Sem Choice */}
          <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>6th Semester Department Elective (3 Credits)</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                Immediate Action
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setSem6Choice('EE545')}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  sem6Choice === 'EE545'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-neutral-900 font-bold">EE545: FPGA Digital Design</strong>
                  {sem6Choice === 'EE545' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  ⭐ Recommended. Recovers missing RTL-to-hardware hands-on flow.
                </div>
              </button>

              <button
                onClick={() => setSem6Choice('ALTERNATE')}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  sem6Choice === 'ALTERNATE'
                    ? 'border-neutral-800 bg-neutral-100 ring-1 ring-neutral-400'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-neutral-900 font-bold">Alternate EEE Elective</strong>
                  {sem6Choice === 'ALTERNATE' && <CheckCircle2 className="w-3.5 h-3.5 text-neutral-700" />}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  Power/Machines/Renewable elective (Requires self-taught FPGA).
                </div>
              </button>
            </div>
          </div>

          {/* 7th Sem Choice */}
          <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-2">
            <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>7th Semester Department Elective (3 Credits)</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setSem7Choice('EE560')}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  sem7Choice === 'EE560'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-neutral-900 font-bold">EE560: VLSI Technology</strong>
                  {sem7Choice === 'EE560' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  ⭐ Top Priority. CMOS physics, inverter delay, fabrication &amp; DRC.
                </div>
              </button>

              <button
                onClick={() => setSem7Choice('EE543')}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  sem7Choice === 'EE543'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-neutral-900 font-bold">EE543: Digital Signal Processing</strong>
                  {sem7Choice === 'EE543' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  MAC units, fixed-point math, FIR filters for edge accelerators.
                </div>
              </button>

              <button
                onClick={() => setSem7Choice('EE542')}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  sem7Choice === 'EE542'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-neutral-900 font-bold">EE542: Embedded Control System</strong>
                  {sem7Choice === 'EE542' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  Discrete state-space, PID on ARM, motor control algorithms.
                </div>
              </button>

              <button
                onClick={() => setSem7Choice('EE556')}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  sem7Choice === 'EE556'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-neutral-900 font-bold">EE556: Cyber Physical Systems</strong>
                  {sem7Choice === 'EE556' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  Automotive CAN/TSN networks, safety timing, hardware trust.
                </div>
              </button>
            </div>
          </div>

          {/* 8th Sem Open Elective (OE) */}
          <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-2">
            <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>8th Semester Open Elective (OE) (3 Credits)</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setSem8Choice('OE_ARCH')}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  sem8Choice === 'OE_ARCH'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <strong className="text-xs text-neutral-900 block font-bold">Computer Architecture</strong>
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  ⭐ #1 Priority. Pipelining, caches, superscalar.
                </span>
              </button>

              <button
                onClick={() => setSem8Choice('OE_AIML')}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  sem8Choice === 'OE_AIML'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <strong className="text-xs text-neutral-900 block font-bold">AI / Edge ML</strong>
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Tensor operations, INT8 quantization, NPU design.
                </span>
              </button>

              <button
                onClick={() => setSem8Choice('OE_OTHER')}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  sem8Choice === 'OE_OTHER'
                    ? 'border-neutral-800 bg-neutral-100 ring-1 ring-neutral-400'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <strong className="text-xs text-neutral-900 block font-bold">Other / General OE</strong>
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Renewable / Power / Management elective.
                </span>
              </button>
            </div>
          </div>

          {/* B.Tech Major Capstone Track */}
          <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-2">
            <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              <span>Final Year B.Tech Capstone Project Track (6 Credits)</span>
            </span>

            <select
              value={capstoneChoice}
              onChange={(e) => setCapstoneChoice(e.target.value as any)}
              className="w-full text-xs font-semibold bg-white border border-neutral-300 rounded-lg p-2.5 text-neutral-900 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="RTL_CPU">1. 5-Stage Pipelined RV32I RISC-V CPU on FPGA (RTL Design Track)</option>
              <option value="VERIF_UVM">2. Asynchronous CDC FIFO with Industrial UVM Suite (Verification Track)</option>
              <option value="ASIC_OPENLANE">3. OpenLane 130nm ASIC RTL-to-GDSII Implementation (Physical Design Track)</option>
              <option value="EDGE_AI">4. Hardware-Accelerated INT8 Convolution Engine on Zynq (Edge AI Track)</option>
              <option value="EMBED_CAN">5. ISO 11898-1 CAN-FD Controller with Fault Confinement (Automotive Track)</option>
              <option value="AMS_SVPWM">6. FPGA Space Vector PWM Inverter for BLDC Motor (EEE + AMS Track)</option>
            </select>
          </div>
        </div>

        {/* Right: Dynamic Readiness Radar & Evaluation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Step 2: Real-Time Career Readiness Scores
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-neutral-900 text-white shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Semiconductor MNC Readiness</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-400">
                Avg: {Math.round((readinessScores.rtl + readinessScores.dv + readinessScores.pd + readinessScores.embed) / 4)}%
              </span>
            </div>

            {/* Score Bars */}
            <div className="space-y-3">
              {/* RTL Design */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-neutral-200 flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-indigo-400" />
                    <span>RTL Design &amp; Microarchitecture</span>
                  </span>
                  <span className="font-mono font-bold text-indigo-400">{readinessScores.rtl}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${readinessScores.rtl}%` }}
                  />
                </div>
              </div>

              {/* Design Verification */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-neutral-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Design Verification (DV &amp; UVM)</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">{readinessScores.dv}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${readinessScores.dv}%` }}
                  />
                </div>
              </div>

              {/* Physical Design */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-neutral-200 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-amber-400" />
                    <span>Physical Design (PD &amp; STA Signoff)</span>
                  </span>
                  <span className="font-mono font-bold text-amber-400">{readinessScores.pd}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${readinessScores.pd}%` }}
                  />
                </div>
              </div>

              {/* Embedded Systems */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-neutral-200 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span>Embedded Systems &amp; Firmware</span>
                  </span>
                  <span className="font-mono font-bold text-cyan-400">{readinessScores.embed}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                    style={{ width: `${readinessScores.embed}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Assessment Outcome */}
            <div className="pt-3 border-t border-neutral-800 text-xs space-y-1.5">
              <span className="font-bold text-neutral-300 block">Assessment Verdict:</span>
              {readinessScores.rtl >= 85 ? (
                <p className="text-emerald-300 leading-relaxed">
                  ✓ <strong>Prime RTL Design Profile:</strong> You meet the exact profile sought by Qualcomm, AMD, Intel, and NVIDIA for Day 1 on-campus hiring!
                </p>
              ) : sem6Choice !== 'EE545' ? (
                <p className="text-amber-300 leading-relaxed flex items-start gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Critical Warning:</strong> Skipping EE545 FPGA in 6th Sem creates an RTL hardware deficit. You must compensate with 80+ hours on Vivado using Digilent Basys3 kits.</span>
                </p>
              ) : (
                <p className="text-indigo-200 leading-relaxed">
                  Balanced profile combining solid embedded foundations with synthesizable digital design.
                </p>
              )}
            </div>
          </div>

          {/* Quick Guidance Box */}
          <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/70 text-indigo-950 text-xs space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-700" />
              <span>NIT Goa Faculty Coordination Advice:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-indigo-900">
              When submitting elective selection slips to the EEE departmental office, prioritize <strong>EE545</strong> as 1st preference. For your B.Tech Capstone Project, request faculty working in the VLSI/Embedded lab early (April 2026) to reserve hardware FPGA boards and EDA licenses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
