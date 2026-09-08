import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  Shuffle, 
  CheckCircle2, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Plus, 
  Edit2, 
  Trash2, 
  Sparkles, 
  Award, 
  Building2, 
  Check, 
  X,
  Code
} from 'lucide-react';
import { InterviewQuestion, InterviewMasteryStatus } from '../types';
import { getStoredInterviews, saveStoredInterviews, resetStoredInterviews } from '../utils/storage';

export const InterviewDrillsView: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>(() => getStoredInterviews());
  
  const [statusMap, setStatusMap] = useState<Record<string, InterviewMasteryStatus>>(() => {
    try {
      const raw = localStorage.getItem('ayush_tracker_interview_status');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [companyFilter, setCompanyFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const setStatus = (id: string, st: InterviewMasteryStatus) => {
    const updated = { ...statusMap, [id]: st };
    setStatusMap(updated);
    try {
      localStorage.setItem('ayush_tracker_interview_status', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleReveal = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRandomDrill = () => {
    const pool = questions.filter((q) => (statusMap[q.id] || 'Untested') !== 'Mastered');
    const targetList = pool.length > 0 ? pool : questions;
    if (targetList.length === 0) return;
    const randomItem = targetList[Math.floor(Math.random() * targetList.length)];

    setRevealedAnswers((prev) => ({ ...prev, [randomItem.id]: false }));
    setTimeout(() => {
      const el = document.getElementById(`drill-card-${randomItem.id}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleReset = () => {
    if (window.confirm('Reset questions bank to default verified semiconductor interview drills?')) {
      const def = resetStoredInterviews();
      setQuestions(def);
      setStatusMap({});
      localStorage.removeItem('ayush_tracker_interview_status');
    }
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    questions.forEach((q) => set.add(q.category));
    return ['All', ...Array.from(set)];
  }, [questions]);

  const companies = useMemo(() => {
    const set = new Set<string>();
    questions.forEach((q) => q.companies?.forEach((c) => set.add(c)));
    return ['All', ...Array.from(set).sort()];
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (categoryFilter !== 'All' && q.category !== categoryFilter) return false;
      if (companyFilter !== 'All' && !q.companies?.includes(companyFilter)) return false;
      const st = statusMap[q.id] || 'Untested';
      if (statusFilter !== 'All' && st !== statusFilter) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = q.title.toLowerCase().includes(query);
        const matchesQuestion = q.question.toLowerCase().includes(query);
        const matchesAnswer = q.answer.toLowerCase().includes(query);
        if (!matchesTitle && !matchesQuestion && !matchesAnswer) return false;
      }
      return true;
    });
  }, [questions, categoryFilter, companyFilter, statusFilter, statusMap, searchQuery]);

  const masteredCount = Object.values(statusMap).filter((s) => s === 'Mastered').length;
  const reviewCount = Object.values(statusMap).filter((s) => s === 'Review').length;
  const totalCount = questions.length;
  const masteryPercent = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Silicon MNC Whiteboard Drills</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
              {questions.length} Verified Questions
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Interview Whiteboard &amp; Core Technical Drills
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Must-solve technical interview questions from Nvidia, Qualcomm, TI, AMD, and Intel covering setup/hold equations, asynchronous FIFO pointer synchronization, UVM sequences, and Verilog RTL race conditions.
          </p>
        </div>

        {/* Global Progress */}
        <div className="mt-5 relative z-10 bg-neutral-800/80 rounded-xl p-3 border border-neutral-700/50 max-w-xl">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-neutral-300">Whiteboard Mastery Score</span>
            <span className="text-cyan-400 font-mono">{masteredCount} / {totalCount} Mastered ({masteryPercent}%)</span>
          </div>
          <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${masteryPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Controls & Filters */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search interview questions, formulas, or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomDrill}
              className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Random Drill</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 border-t border-neutral-100">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 rounded-lg p-2 focus:ring-1 focus:ring-neutral-900 cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
            ))}
          </select>

          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 rounded-lg p-2 focus:ring-1 focus:ring-neutral-900 cursor-pointer"
          >
            {companies.map((c) => (
              <option key={c} value={c}>{c === 'All' ? 'All Companies' : c}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 rounded-lg p-2 focus:ring-1 focus:ring-neutral-900 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Untested">Untested</option>
            <option value="Review">Needs Review</option>
            <option value="Mastered">Mastered</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const st = statusMap[q.id] || 'Untested';
          const isRevealed = !!revealedAnswers[q.id];

          return (
            <div
              key={q.id}
              id={`drill-card-${q.id}`}
              className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-4 hover:border-neutral-300 transition-all"
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 rounded">
                      {q.category}
                    </span>
                    {q.companies?.map((comp, idx) => (
                      <span key={idx} className="text-[10px] bg-cyan-50 text-cyan-800 border border-cyan-200 px-1.5 py-0.5 rounded font-medium">
                        {comp}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                    {q.title}
                  </h3>
                </div>

                {/* Status Switcher */}
                <div className="flex items-center gap-1 shrink-0">
                  {(['Untested', 'Review', 'Mastered'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setStatus(q.id, mode)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        st === mode
                          ? mode === 'Mastered'
                            ? 'bg-emerald-600 text-white'
                            : mode === 'Review'
                            ? 'bg-amber-600 text-white'
                            : 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem Prompt */}
              <div className="bg-neutral-50 rounded-xl p-4 text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans border border-neutral-100">
                <strong>Question:</strong> {q.question}
              </div>

              {/* Reveal Toggle */}
              <div>
                <button
                  onClick={() => toggleReveal(q.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 cursor-pointer"
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Hide Solution &amp; Whiteboard Derivation</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Reveal Solution &amp; Whiteboard Derivation</span>
                    </>
                  )}
                </button>
              </div>

              {/* Answer Content */}
              {isRevealed && (
                <div className="space-y-3 pt-2 border-t border-neutral-100 animate-in fade-in duration-150">
                  <div className="text-xs sm:text-sm text-neutral-800 leading-relaxed space-y-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Mathematical Explanation:
                    </span>
                    <p className="whitespace-pre-line font-sans">
                      {q.answer}
                    </p>
                  </div>

                  {q.codeSnippet && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                        Verilog / Solution Code Snippet:
                      </span>
                      <pre className="p-4 bg-neutral-950 text-neutral-100 rounded-xl overflow-x-auto text-xs font-mono leading-relaxed">
                        {q.codeSnippet}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
