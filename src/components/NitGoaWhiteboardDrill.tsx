import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Calculator,
  Flame,
  ArrowRight
} from 'lucide-react';
import { EEE_WHITEBOARD_QUESTIONS, WhiteboardDrillQuestion } from '../data/nitGoaAdvancedData';

export const NitGoaWhiteboardDrill: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(EEE_WHITEBOARD_QUESTIONS[0].id);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({
    [EEE_WHITEBOARD_QUESTIONS[0].id]: true
  });

  // Interactive calculator for Setup/Hold Slack test
  const [tClk, setTClk] = useState<number>(5.0);
  const [tCq, setTCq] = useState<number>(0.8);
  const [tSetup, setTSetup] = useState<number>(0.5);
  const [tHold, setTHold] = useState<number>(0.3);
  const [tSkew, setTSkew] = useState<number>(0.5);

  const selectedQuestion: WhiteboardDrillQuestion = 
    EEE_WHITEBOARD_QUESTIONS.find(q => q.id === selectedId) || EEE_WHITEBOARD_QUESTIONS[0];

  const isRevealed = !!revealedSolutions[selectedQuestion.id];

  const toggleReveal = (id: string) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Calculations for the live interactive sandbox
  const maxLogicDelay = Math.max(0, (tClk + tSkew) - (tCq + tSetup));
  const minLogicDelay = Math.max(0, (tHold + tSkew) - tCq);

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>Technical Whiteboard Drill &bull; Hardware Technical Interviews</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
            Semiconductor Whiteboard Problem Solver
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            Real-world whiteboard problems asked in technical rounds at Qualcomm, Intel, AMD, and TI specifically designed to test circuit timing, CDC, and Verilog semantics.
          </p>
        </div>
      </div>

      {/* Problem Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5">
        {EEE_WHITEBOARD_QUESTIONS.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => setSelectedId(q.id)}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
              selectedId === q.id
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-white hover:border-neutral-300'
            }`}
          >
            <span>Q{idx + 1}: {q.topic.split(' (')[0]}</span>
          </button>
        ))}
      </div>

      {/* Active Problem View */}
      <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-extrabold text-indigo-700 font-mono">
            Focus Topic: {selectedQuestion.topic}
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            Target Companies: {selectedQuestion.companyTarget}
          </span>
        </div>

        {/* Question Statement */}
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Interview Question Prompt:
          </div>
          <p className="text-xs sm:text-sm text-neutral-900 font-medium leading-relaxed">
            {selectedQuestion.question}
          </p>
        </div>

        {/* Governing Equation Box */}
        <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950 text-white space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
            Governing Equation / Hardware Invariant:
          </div>
          <div className="font-mono text-xs sm:text-sm text-amber-300 overflow-x-auto py-1">
            {selectedQuestion.equationOrCircuit}
          </div>
        </div>

        {/* Reveal / Hide Button */}
        <div className="flex justify-between items-center pt-1">
          <button
            onClick={() => toggleReveal(selectedQuestion.id)}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>{isRevealed ? 'Hide Whiteboard Solution' : 'Reveal Step-by-Step Derivation'}</span>
            {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Derivation Steps (Conditionally revealed) */}
        {isRevealed && (
          <div className="space-y-3 pt-3 border-t border-neutral-200 animate-in fade-in duration-200">
            <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2.5 shadow-xs">
              <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Step-by-Step Whiteboard Derivation:
              </h5>
              <ol className="space-y-2 text-xs text-neutral-700 list-decimal pl-4 leading-relaxed">
                {selectedQuestion.stepByStepDerivation.map((step, idx) => (
                  <li key={idx} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Candidate Trap */}
            <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-950 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Interviewer Rejection Trap:</span>
              </div>
              <p className="text-rose-900 leading-relaxed">
                {selectedQuestion.candidateTrap}
              </p>
            </div>

            {/* Key Takeaway */}
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-950 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Key Silicon Takeaway:</span>
              </div>
              <p className="text-emerald-900 leading-relaxed">
                {selectedQuestion.keyTakeaway}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Timing Calculator Sandbox */}
      <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-white space-y-4 shadow-2xs">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-indigo-600" />
          <h4 className="text-sm font-bold text-neutral-900">
            Interactive Setup &amp; Hold Slack Sandbox (Try Custom Skew &amp; Delay Values)
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-neutral-600 mb-1">T_clk (ns)</label>
            <input
              type="number"
              step="0.1"
              value={tClk}
              onChange={(e) => setTClk(parseFloat(e.target.value) || 0)}
              className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono text-neutral-900"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-neutral-600 mb-1">T_cq (ns)</label>
            <input
              type="number"
              step="0.1"
              value={tCq}
              onChange={(e) => setTCq(parseFloat(e.target.value) || 0)}
              className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono text-neutral-900"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-neutral-600 mb-1">T_setup (ns)</label>
            <input
              type="number"
              step="0.1"
              value={tSetup}
              onChange={(e) => setTSetup(parseFloat(e.target.value) || 0)}
              className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono text-neutral-900"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-neutral-600 mb-1">T_hold (ns)</label>
            <input
              type="number"
              step="0.1"
              value={tHold}
              onChange={(e) => setTHold(parseFloat(e.target.value) || 0)}
              className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono text-neutral-900"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-neutral-600 mb-1">T_skew (ns)</label>
            <input
              type="number"
              step="0.1"
              value={tSkew}
              onChange={(e) => setTSkew(parseFloat(e.target.value) || 0)}
              className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono text-neutral-900"
            />
          </div>
        </div>

        {/* Calculated Result */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs">
            <span className="font-bold text-indigo-950 block">Max Allowable Combinational Delay (Setup):</span>
            <div className="text-base font-extrabold text-indigo-700 font-mono mt-1">
              T_comb ≤ {maxLogicDelay.toFixed(2)} ns
            </div>
            <span className="text-[10px] text-indigo-800">Formula: (T_clk + T_skew) - (T_cq + T_setup)</span>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
            <span className="font-bold text-amber-950 block">Min Allowable Combinational Delay (Hold):</span>
            <div className="text-base font-extrabold text-amber-800 font-mono mt-1">
              T_comb ≥ {minLogicDelay.toFixed(2)} ns
            </div>
            <span className="text-[10px] text-amber-800">Formula: (T_hold + T_skew) - T_cq</span>
          </div>
        </div>
      </div>
    </div>
  );
};
