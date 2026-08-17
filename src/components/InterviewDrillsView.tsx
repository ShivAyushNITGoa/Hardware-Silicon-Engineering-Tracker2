import React, { useState, useMemo } from 'react';
import { InterviewQuestion, InterviewQuestionCategory } from '../types';
import { 
  getStoredInterviewQuestions, 
  saveStoredInterviewQuestions, 
  resetStoredInterviewQuestions, 
  getInterviewQuestionsStatus, 
  saveInterviewQuestionsStatus 
} from '../utils/storage';
import { 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Code, 
  Sparkles, 
  Layers, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Terminal,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  RotateCcw
} from 'lucide-react';

const CATEGORIES: string[] = [
  'All',
  'STA & Timing',
  'SystemVerilog RTL',
  'ASIC Verification & UVM',
  'RISC-V Architecture',
  'Embedded C & FreeRTOS',
  'Protocols & Buses',
  'Embedded Linux & Kernel',
  'Physical Design & Backend',
  'Hardware PCB & Signal Integrity',
  'DFT & Silicon Test'
];

const BLANK_QUESTION: InterviewQuestion = {
  id: '',
  category: 'STA & Timing',
  title: '',
  difficulty: 'Crucial',
  companies: ['Qualcomm', 'Texas Instruments'],
  question: '',
  answer: '',
  codeSnippet: '',
  formulaOrDiagram: '',
  keyTakeaway: ''
};

export const InterviewDrillsView: React.FC = () => {
  const [questionsList, setQuestionsList] = useState<InterviewQuestion[]>(() => getStoredInterviewQuestions());
  const [statusMap, setStatusMap] = useState<Record<string, 'Mastered' | 'Review' | 'Untested'>>(
    getInterviewQuestionsStatus()
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<InterviewQuestion | null>(null);
  const [formState, setFormState] = useState<InterviewQuestion>(BLANK_QUESTION);
  const [formCompaniesRaw, setFormCompaniesRaw] = useState('');

  const allCompanies = useMemo(() => {
    return Array.from(new Set(questionsList.flatMap(q => q.companies))).sort();
  }, [questionsList]);

  const handleStatusChange = (id: string, status: 'Mastered' | 'Review' | 'Untested') => {
    const updated = { ...statusMap, [id]: status };
    setStatusMap(updated);
    saveInterviewQuestionsStatus(updated);
  };

  const handleOpenAdd = () => {
    const newQ: InterviewQuestion = {
      ...BLANK_QUESTION,
      id: `iq-${Date.now()}`
    };
    setEditingQuestion(null);
    setFormState(newQ);
    setFormCompaniesRaw(newQ.companies.join(', '));
    setIsModalOpen(true);
  };

  const handleOpenEdit = (q: InterviewQuestion, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingQuestion(q);
    setFormState({ ...q });
    setFormCompaniesRaw(q.companies.join(', '));
    setIsModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.question.trim()) return;

    const parsedCompanies = formCompaniesRaw
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const finalized: InterviewQuestion = {
      ...formState,
      title: formState.title.trim(),
      companies: parsedCompanies.length > 0 ? parsedCompanies : ['Qualcomm']
    };

    let updatedList: InterviewQuestion[];
    if (editingQuestion) {
      updatedList = questionsList.map(q => q.id === finalized.id ? finalized : q);
    } else {
      updatedList = [finalized, ...questionsList];
    }

    setQuestionsList(updatedList);
    saveStoredInterviewQuestions(updatedList);
    setIsModalOpen(false);
  };

  const handleDeleteQuestion = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete interview drill question "${title}"?`)) {
      const updated = questionsList.filter(q => q.id !== id);
      setQuestionsList(updated);
      saveStoredInterviewQuestions(updated);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset questions bank to default verified semiconductor interview drills?')) {
      const reset = resetStoredInterviewQuestions();
      setQuestionsList(reset);
    }
  };

  const filteredQuestions = useMemo(() => {
    return questionsList.filter((q) => {
      const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
      const matchesComp = selectedCompany === 'All' || q.companies.includes(selectedCompany);
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesComp && matchesSearch;
    });
  }, [questionsList, selectedCategory, selectedCompany, searchQuery]);

  const masteredCount = Object.values(statusMap).filter((s) => s === 'Mastered').length;
  const reviewCount = Object.values(statusMap).filter((s) => s === 'Review').length;
  const progressPercent = Math.round((masteredCount / (questionsList.length || 1)) * 100);

  return (
    <div className="space-y-6" id="interview-drills-view-container">
      {/* Header card with progress stats */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-sm" id="interview-drills-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm font-semibold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>CORE TECHNICAL INTERVIEW DRILLS</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Silicon & Embedded Whiteboard Bank</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              High-yield technical questions tested at Qualcomm, Texas Instruments, NVIDIA, Intel, and Indian DLI startups.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Readiness Score</div>
                <div className="text-xl font-bold text-emerald-400">{progressPercent}%</div>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Mastered / Review</div>
                <div className="text-sm font-bold font-mono text-slate-200">
                  <span className="text-emerald-400">{masteredCount}</span> / <span className="text-amber-400">{reviewCount}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Drill</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-slate-700 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-700 text-xs text-slate-400 transition-colors cursor-pointer"
              title="Reset drills to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full mt-5 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between" id="interview-search-bar">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            id="input-interview-search"
            type="text"
            placeholder="Search concepts, equations, code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Domain:</span>
          </div>
          <select
            id="select-interview-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1 text-xs text-slate-500 ml-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Company:</span>
          </div>
          <select
            id="select-interview-company"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Companies ({allCompanies.length})</option>
            {allCompanies.map((comp) => (
              <option key={comp} value={comp}>
                {comp}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-3" id="questions-list">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
            <HelpCircle className="w-8 h-8 mx-auto mb-2 text-slate-400" />
            <p className="text-sm font-semibold">No interview questions match your filter criteria.</p>
            <p className="text-xs mt-1">Try searching for other keywords or add your own drill questions.</p>
            <button
              onClick={handleOpenAdd}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-bold"
            >
              <Plus className="w-4 h-4" /> Add Question
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            const currentStatus = statusMap[q.id] || 'Untested';

            return (
              <div
                key={q.id}
                id={`card-interview-${q.id}`}
                className={`bg-white border rounded-xl shadow-xs transition-all overflow-hidden ${
                  currentStatus === 'Mastered'
                    ? 'border-emerald-200/80 bg-emerald-50/10'
                    : currentStatus === 'Review'
                    ? 'border-amber-200/80 bg-amber-50/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {currentStatus === 'Mastered' ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      ) : currentStatus === 'Review' ? (
                        <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                          <HelpCircle className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-slate-900">{q.title}</h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            q.difficulty === 'Hard'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : q.difficulty === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {q.category}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <span>Tested at:</span>
                          <span className="font-semibold text-slate-700">{q.companies.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                    <select
                      id={`select-status-${q.id}`}
                      value={currentStatus}
                      onChange={(e) => handleStatusChange(q.id, e.target.value as any)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg border focus:outline-none transition-colors ${
                        currentStatus === 'Mastered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : currentStatus === 'Review'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-slate-100 text-slate-600 border-slate-300'
                      }`}
                    >
                      <option value="Untested">⚪ Untested</option>
                      <option value="Review">🟡 Needs Review</option>
                      <option value="Mastered">🟢 Mastered</option>
                    </select>

                    <button
                      onClick={(e) => handleOpenEdit(q, e)}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      title="Edit question"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteQuestion(q.id, q.title, e)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="p-1 rounded text-slate-400 hover:text-slate-600"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-200 bg-white space-y-4 text-xs text-slate-700">
                    {/* The Prompt / Question */}
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Interviewer Question / Whiteboard Prompt:
                      </div>
                      <p className="text-sm font-semibold text-slate-900 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                        {q.question}
                      </p>
                    </div>

                    {/* Formula / Timing Diagram if present */}
                    {q.formulaOrDiagram && (
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-1 flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5" />
                          <span>Mathematical Formula / Timing Criteria:</span>
                        </div>
                        <pre className="bg-slate-900 text-indigo-300 p-3.5 rounded-lg font-mono text-[11px] whitespace-pre-wrap leading-relaxed border border-slate-800">
                          {q.formulaOrDiagram}
                        </pre>
                      </div>
                    )}

                    {/* Code Snippet if present */}
                    {q.codeSnippet && (
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1 flex items-center gap-1">
                          <Code className="w-3.5 h-3.5" />
                          <span>RTL / C / SVA Implementation:</span>
                        </div>
                        <pre className="bg-slate-900 text-emerald-300 p-3.5 rounded-lg font-mono text-[11px] whitespace-pre-wrap leading-relaxed border border-slate-800">
                          {q.codeSnippet}
                        </pre>
                      </div>
                    )}

                    {/* Comprehensive Technical Answer */}
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Complete Technical Solution & Architectural Explanation:
                      </div>
                      <div className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200 text-slate-800 space-y-2 whitespace-pre-line leading-relaxed">
                        {q.answer}
                      </div>
                    </div>

                    {/* Key Takeaway Banner */}
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 flex items-start gap-2.5 text-indigo-900">
                      <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Golden Interview Rule: </span>
                        <span>{q.keyTakeaway}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingQuestion ? 'Edit Interview Drill Question' : 'Add New Interview Drill'}
                  </h3>
                  <p className="text-xs text-slate-500">Record core whiteboard question, equations, and code solution</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Question Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    placeholder="e.g. Asynchronous FIFO Gray Code Sizing"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Difficulty</label>
                  <select
                    value={formState.difficulty}
                    onChange={(e) => setFormState({ ...formState, difficulty: e.target.value as any })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="Core">Core</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Crucial">Crucial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Category Domain</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value as InterviewQuestionCategory })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Target Companies (comma separated)</label>
                  <input
                    type="text"
                    value={formCompaniesRaw}
                    onChange={(e) => setFormCompaniesRaw(e.target.value)}
                    placeholder="e.g. Qualcomm, Texas Instruments, Intel"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Question Prompt <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={formState.question}
                  onChange={(e) => setFormState({ ...formState, question: e.target.value })}
                  placeholder="The exact problem statement or whiteboard challenge..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Technical Answer & Explanation</label>
                <textarea
                  rows={4}
                  value={formState.answer}
                  onChange={(e) => setFormState({ ...formState, answer: e.target.value })}
                  placeholder="Detailed derivation, step-by-step reasoning, trade-offs..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Code Snippet (Optional)</label>
                <textarea
                  rows={3}
                  value={formState.codeSnippet || ''}
                  onChange={(e) => setFormState({ ...formState, codeSnippet: e.target.value })}
                  placeholder="// SystemVerilog / C code..."
                  className="w-full text-xs font-mono p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Formula / Timing Criteria (Optional)</label>
                <input
                  type="text"
                  value={formState.formulaOrDiagram || ''}
                  onChange={(e) => setFormState({ ...formState, formulaOrDiagram: e.target.value })}
                  placeholder="e.g. T_setup = T_clk - T_cq - T_comb > 0"
                  className="w-full text-xs font-mono p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Golden Key Takeaway</label>
                <input
                  type="text"
                  value={formState.keyTakeaway}
                  onChange={(e) => setFormState({ ...formState, keyTakeaway: e.target.value })}
                  placeholder="One memorable rule to speak out during whiteboard interviews..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  {editingQuestion ? 'Save Drill' : 'Create Drill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
