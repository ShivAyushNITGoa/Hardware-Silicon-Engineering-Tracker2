import React, { useState } from 'react';
import { Cpu, Calculator, Activity, Layers, ArrowRight, CheckCircle, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export const InteractiveToolsSuite: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'sta' | 'qformat' | 'gray' | 'rtos'>('sta');

  // STA Calculator State
  const [tClk, setTClk] = useState<number>(10.0); // ns (100MHz)
  const [tCq, setTCq] = useState<number>(1.2); // ns
  const [tComb, setTComb] = useState<number>(6.5); // ns
  const [tSetup, setTSetup] = useState<number>(0.8); // ns
  const [tHold, setTHold] = useState<number>(0.4); // ns
  const [tSkew, setTSkew] = useState<number>(0.3); // ns (positive skew)
  const [tJitter, setTJitter] = useState<number>(0.1); // ns

  // STA Calculations
  const dataArrivalSetup = tCq + tComb;
  const dataRequiredSetup = tClk + tSkew - tSetup - tJitter;
  const setupSlack = dataRequiredSetup - dataArrivalSetup;
  const maxFmax = (1000 / (tCq + tComb + tSetup - tSkew + tJitter)).toFixed(1);

  const dataArrivalHold = tCq + tComb;
  const dataRequiredHold = tHold + tSkew + tJitter;
  const holdSlack = dataArrivalHold - dataRequiredHold;

  // Q-Format State
  const [qIntBits, setQIntBits] = useState<number>(4); // m
  const [qFracBits, setQFracBits] = useState<number>(12); // n (Q4.12)
  const [floatInput, setFloatInput] = useState<number>(3.14159265);

  const totalBits = qIntBits + qFracBits;
  const scalingFactor = Math.pow(2, qFracBits);
  const qResolution = 1 / scalingFactor;
  const qMinVal = -Math.pow(2, qIntBits - 1);
  const qMaxVal = Math.pow(2, qIntBits - 1) - qResolution;

  const quantizedInt = Math.round(floatInput * scalingFactor);
  const quantizedFloat = quantizedInt / scalingFactor;
  const quantizationError = Math.abs(floatInput - quantizedFloat);
  const hexRepresentation = (quantizedInt >>> 0).toString(16).toUpperCase().padStart(Math.ceil(totalBits / 4), '0');
  const binRepresentation = (quantizedInt >>> 0).toString(2).padStart(totalBits, '0').slice(-totalBits);

  // Gray Code State
  const [binaryVal, setBinaryVal] = useState<number>(5);
  const [bitWidth, setBitWidth] = useState<number>(4);
  const grayVal = binaryVal ^ (binaryVal >> 1);
  const binStr = binaryVal.toString(2).padStart(bitWidth, '0');
  const grayStr = grayVal.toString(2).padStart(bitWidth, '0');

  // FreeRTOS Memory State
  const [taskCount, setTaskCount] = useState<number>(3);
  const [avgStackWords, setAvgStackWords] = useState<number>(512); // 512 words = 2048 bytes
  const [queueCount, setQueueCount] = useState<number>(2);
  const [queueItemBytes, setQueueItemBytes] = useState<number>(64);
  const [queueDepth, setQueueDepth] = useState<number>(16);

  const tcbBytes = taskCount * 84; // Approx TCB size in FreeRTOS 32-bit
  const stackBytes = taskCount * avgStackWords * 4;
  const queueBytes = queueCount * (80 + queueItemBytes * queueDepth); // 80 bytes control block + storage
  const totalHeapRequired = tcbBytes + stackBytes + queueBytes;

  return (
    <div className="space-y-6" id="interactive-tools-suite-container">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-sm" id="tools-header-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm font-semibold mb-1">
              <Cpu className="w-4 h-4" />
              <span>SILICON & HARDWARE ENGINEERING TOOLCHAIN</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Interactive Silicon Calculators & Models</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Live mathematical models for Static Timing Analysis (STA), Q-format Fixed-Point conversions, Gray-code CDC validation, and FreeRTOS heap budgeting.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" id="tool-tabs-bar">
            <button
              id="tab-sta"
              onClick={() => setActiveTool('sta')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTool === 'sta'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>STA Timing Slack</span>
            </button>
            <button
              id="tab-qformat"
              onClick={() => setActiveTool('qformat')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTool === 'qformat'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Q-Format Fixed-Point</span>
            </button>
            <button
              id="tab-gray"
              onClick={() => setActiveTool('gray')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTool === 'gray'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Gray Code CDC</span>
            </button>
            <button
              id="tab-rtos"
              onClick={() => setActiveTool('rtos')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTool === 'rtos'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>FreeRTOS Memory</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tool 1: STA Timing Slack Analyzer */}
      {activeTool === 'sta' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="sta-analyzer-section">
          {/* Controls */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              <span>Timing Path Parameters (ns)</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Target Clock Period (T_clk):</span>
                  <span className="font-mono text-indigo-600">{tClk.toFixed(2)} ns ({(1000/tClk).toFixed(1)} MHz)</span>
                </div>
                <input
                  id="input-tclk"
                  type="range"
                  min="2"
                  max="25"
                  step="0.2"
                  value={tClk}
                  onChange={(e) => setTClk(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg accent-indigo-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Clock-to-Q Delay (T_cq):</span>
                  <span className="font-mono text-slate-900">{tCq.toFixed(2)} ns</span>
                </div>
                <input
                  id="input-tcq"
                  type="range"
                  min="0.2"
                  max="4.0"
                  step="0.1"
                  value={tCq}
                  onChange={(e) => setTCq(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg accent-indigo-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Combinational Data Delay (T_comb):</span>
                  <span className="font-mono text-slate-900">{tComb.toFixed(2)} ns</span>
                </div>
                <input
                  id="input-tcomb"
                  type="range"
                  min="0.5"
                  max="15.0"
                  step="0.1"
                  value={tComb}
                  onChange={(e) => setTComb(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Setup Time (T_setup):</label>
                  <input
                    id="input-tsetup"
                    type="number"
                    step="0.1"
                    value={tSetup}
                    onChange={(e) => setTSetup(parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Hold Time (T_hold):</label>
                  <input
                    id="input-thold"
                    type="number"
                    step="0.1"
                    value={tHold}
                    onChange={(e) => setTHold(parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Clock Skew (T_skew):</label>
                  <input
                    id="input-tskew"
                    type="number"
                    step="0.05"
                    value={tSkew}
                    onChange={(e) => setTSkew(parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Clock Jitter (T_jitter):</label>
                  <input
                    id="input-tjitter"
                    type="number"
                    step="0.05"
                    value={tJitter}
                    onChange={(e) => setTJitter(parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Setup Slack Card */}
              <div className={`p-4 rounded-xl border ${
                setupSlack >= 0 ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Setup Slack (T_setup_slack)</span>
                  {setupSlack >= 0 ? (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> MET
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> VIOLATED
                    </span>
                  )}
                </div>
                <div className="mt-2 text-2xl font-black font-mono">
                  <span className={setupSlack >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
                    {setupSlack >= 0 ? '+' : ''}{setupSlack.toFixed(2)} ns
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Required: {(dataRequiredSetup).toFixed(2)}ns | Arrival: {(dataArrivalSetup).toFixed(2)}ns
                </p>
              </div>

              {/* Hold Slack Card */}
              <div className={`p-4 rounded-xl border ${
                holdSlack >= 0 ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Hold Slack (T_hold_slack)</span>
                  {holdSlack >= 0 ? (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> MET
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> VIOLATED
                    </span>
                  )}
                </div>
                <div className="mt-2 text-2xl font-black font-mono">
                  <span className={holdSlack >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
                    {holdSlack >= 0 ? '+' : ''}{holdSlack.toFixed(2)} ns
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Arrival: {(dataArrivalHold).toFixed(2)}ns | Required: {(dataRequiredHold).toFixed(2)}ns
                </p>
              </div>
            </div>

            {/* Timing Equations & Synthesis Insight */}
            <div className="bg-slate-900 rounded-xl p-4 text-slate-200 font-mono text-xs space-y-2 border border-slate-800">
              <div className="text-indigo-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>STATIC TIMING ANALYSIS EQUATIONS & CLOSURE METRICS</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[11px]">
                <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700/60">
                  <div className="text-slate-400 font-bold mb-1">Max Achievable Frequency (F_max):</div>
                  <div className="text-emerald-400 font-bold text-sm">{maxFmax} MHz</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Min Clock Period: {(tCq + tComb + tSetup - tSkew + tJitter).toFixed(2)} ns</div>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700/60">
                  <div className="text-slate-400 font-bold mb-1">Timing Action Required:</div>
                  <div className="text-slate-300">
                    {setupSlack < 0
                      ? '⚠️ Insert pipeline stages or upsize driver cells to cut T_comb.'
                      : holdSlack < 0
                      ? '⚠️ Insert delay buffers in data path (frequency independent).'
                      : '✅ Timing closed. Zero setup/hold violations.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tool 2: Q-Format Fixed-Point Converter */}
      {activeTool === 'qformat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="qformat-section">
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span>Q-Format Specification (Q_m.n)</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Integer Bits (m, signed):</label>
                  <input
                    id="input-qint"
                    type="number"
                    min="1"
                    max="16"
                    value={qIntBits}
                    onChange={(e) => setQIntBits(parseInt(e.target.value) || 1)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Fractional Bits (n):</label>
                  <input
                    id="input-qfrac"
                    type="number"
                    min="1"
                    max="24"
                    value={qFracBits}
                    onChange={(e) => setQFracBits(parseInt(e.target.value) || 1)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Floating-Point Value to Quantize:</label>
                <input
                  id="input-float-val"
                  type="number"
                  step="0.0001"
                  value={floatInput}
                  onChange={(e) => setFloatInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-sm text-slate-900"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600 space-y-1">
                <div className="flex justify-between font-mono">
                  <span>Total Word Width:</span>
                  <span className="font-bold text-slate-900">{totalBits} bits</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Resolution (Step Size 2^-n):</span>
                  <span className="font-bold text-slate-900">{qResolution.toFixed(8)}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Dynamic Range:</span>
                  <span className="font-bold text-slate-900">[{qMinVal.toFixed(2)}, {qMaxVal.toFixed(4)}]</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>Bit-Exact Hardware Representation</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 text-slate-200 p-3.5 rounded-lg font-mono">
                <div className="text-slate-400 text-[11px]">Hexadecimal Value (Verilog/C)</div>
                <div className="text-lg font-bold text-amber-400 mt-1">{totalBits}'h{hexRepresentation}</div>
                <div className="text-[10px] text-slate-400 mt-1">Integer Raw: {quantizedInt}</div>
              </div>

              <div className="bg-slate-900 text-slate-200 p-3.5 rounded-lg font-mono">
                <div className="text-slate-400 text-[11px]">Reconstructed Float & Error</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">{quantizedFloat.toFixed(6)}</div>
                <div className="text-[10px] text-rose-300 mt-1">Quantization Loss: {quantizationError.toExponential(4)}</div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-200 p-3.5 rounded-lg font-mono text-xs">
              <div className="text-slate-400 text-[11px] mb-1">Binary Bitstream ({totalBits} bits: {qIntBits} Int | {qFracBits} Frac):</div>
              <div className="text-sm font-bold text-indigo-400 tracking-widest break-all">
                <span className="text-amber-300">{binRepresentation.slice(0, qIntBits)}</span>
                <span className="text-slate-500">.</span>
                <span className="text-emerald-300">{binRepresentation.slice(qIntBits)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tool 3: Gray Code CDC Converter */}
      {activeTool === 'gray' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="gray-cdc-section">
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Binary to Gray Pointer Generator</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Bit Width (N bits):</label>
                <select
                  id="select-bitwidth"
                  value={bitWidth}
                  onChange={(e) => setBitWidth(parseInt(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-xs text-slate-900"
                >
                  <option value={3}>3 bits (0-7)</option>
                  <option value={4}>4 bits (0-15)</option>
                  <option value={5}>5 bits (0-31)</option>
                  <option value={8}>8 bits (0-255)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Binary Counter State:</span>
                  <span className="font-mono text-indigo-600 font-bold">{binaryVal} (0x{binaryVal.toString(16).toUpperCase()})</span>
                </div>
                <input
                  id="input-binary-val"
                  type="range"
                  min="0"
                  max={Math.pow(2, bitWidth) - 1}
                  value={binaryVal}
                  onChange={(e) => setBinaryVal(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <div className="text-slate-700 font-semibold">SystemVerilog RTL Formula:</div>
                <code className="block bg-slate-900 text-indigo-300 p-2 rounded text-[11px] font-mono">
                  assign gray_ptr = bin_ptr ^ (bin_ptr &gt;&gt; 1);
                </code>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Gray Code Sequence Table (Single-Bit Transition Proof)</h2>
            <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-lg">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Decimal</th>
                    <th className="py-2 px-3">Binary (bin_ptr)</th>
                    <th className="py-2 px-3">Gray Code (gray_ptr)</th>
                    <th className="py-2 px-3">Hamming Dist vs Prior</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {Array.from({ length: Math.min(Math.pow(2, bitWidth), 16) }).map((_, idx) => {
                    const bStr = idx.toString(2).padStart(bitWidth, '0');
                    const g = idx ^ (idx >> 1);
                    const gStr = g.toString(2).padStart(bitWidth, '0');
                    const isCurrent = idx === binaryVal;

                    return (
                      <tr key={idx} className={isCurrent ? 'bg-indigo-50 font-bold text-indigo-900' : 'hover:bg-slate-50'}>
                        <td className="py-1.5 px-3">{idx}</td>
                        <td className="py-1.5 px-3 text-slate-600">{bStr}</td>
                        <td className="py-1.5 px-3 text-emerald-700">{gStr}</td>
                        <td className="py-1.5 px-3 text-slate-500">
                          {idx === 0 ? '-' : '1 bit only (CDC safe)'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tool 4: FreeRTOS Memory Estimator */}
      {activeTool === 'rtos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="rtos-memory-section">
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Kernel Configuration</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Number of Concurrent Tasks:</label>
                <input
                  id="input-task-count"
                  type="number"
                  min="1"
                  max="16"
                  value={taskCount}
                  onChange={(e) => setTaskCount(parseInt(e.target.value) || 1)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Average Task Stack Size (Words, 1 word = 4 bytes):</label>
                <input
                  id="input-stack-words"
                  type="number"
                  step="128"
                  min="256"
                  max="4096"
                  value={avgStackWords}
                  onChange={(e) => setAvgStackWords(parseInt(e.target.value) || 256)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Queues / Semaphores:</label>
                  <input
                    id="input-queue-count"
                    type="number"
                    min="0"
                    max="10"
                    value={queueCount}
                    onChange={(e) => setQueueCount(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Queue Depth (Items):</label>
                  <input
                    id="input-queue-depth"
                    type="number"
                    min="1"
                    max="64"
                    value={queueDepth}
                    onChange={(e) => setQueueDepth(parseInt(e.target.value) || 1)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Estimated Heap Allocation (heap_4)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500">TCB Structures</span>
                <div className="text-lg font-bold font-mono text-slate-900 mt-1">{tcbBytes} Bytes</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500">Task Stacks</span>
                <div className="text-lg font-bold font-mono text-slate-900 mt-1">{(stackBytes / 1024).toFixed(1)} KB</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500">Queue Storage</span>
                <div className="text-lg font-bold font-mono text-slate-900 mt-1">{queueBytes} Bytes</div>
              </div>
            </div>

            <div className="bg-indigo-900 text-white p-4 rounded-xl font-mono text-xs">
              <div className="text-indigo-300 text-[11px] font-bold">MINIMUM RECOMMENDED configTOTAL_HEAP_SIZE:</div>
              <div className="text-2xl font-black text-amber-300 mt-1">
                {(totalHeapRequired * 1.3 / 1024).toFixed(1)} KB <span className="text-xs font-normal text-indigo-200">(includes 30% watermark safety margin)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
