import React, { useState } from 'react';
import { ecosystemInsights } from '../data/outreachData';
import { ColdOutreachTemplate } from '../types';
import { 
  getStoredOutreachTemplates, 
  saveStoredOutreachTemplates, 
  resetStoredOutreachTemplates 
} from '../utils/storage';
import { 
  Building2, 
  Send, 
  Copy, 
  Check, 
  DollarSign, 
  Calendar, 
  Sparkles, 
  Lightbulb, 
  ExternalLink, 
  FileText, 
  TrendingUp, 
  Briefcase,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  RotateCcw
} from 'lucide-react';

const BLANK_TEMPLATE: ColdOutreachTemplate = {
  id: '',
  targetCategory: 'Silicon Startup / Direct Hiring Lead',
  roleTarget: 'Design Verification Lead / Hiring Manager',
  subject: 'Ayush Sharma | Verification Engineer Candidate (RISC-V & SVA Testbench Portfolio)',
  body: `Hi [Manager Name],\n\nI am writing to express my strong interest in the Silicon Engineering team at [Company Name]. Over the last 5 months, I have built synthesizable RTL IP cores and automated verification suites for [specific product/chip].\n\nKey Highlights of my Silicon Portfolio:\n1. 5-Stage RISC-V RV32I Core with hazard detection and branch prediction\n2. Dual-Clock Asynchronous FIFO with Gray-code pointers and SystemVerilog Assertions (SVA)\n3. Automated Python-based UVM-style verification using cocotb & pytest\n\nGitHub Repo: https://github.com/ayush/silicon-portfolio\n\nI would welcome 10 minutes to discuss how my hands-on RTL skills can contribute to [Company Name]'s taped-out silicon milestones.\n\nBest regards,\nAyush Sharma`,
  customizationTips: [
    'Always hyperlink your specific testbench file in the GitHub repo',
    'Quote exact timing frequency or branch misprediction penalty numbers',
    'Follow up exactly 4 business days later on the same email thread'
  ]
};

export const EcosystemOutreachView: React.FC = () => {
  const [templates, setTemplates] = useState<ColdOutreachTemplate[]>(() => getStoredOutreachTemplates());
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(() => {
    const list = getStoredOutreachTemplates();
    return list[0]?.id || '';
  });
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);
  const [founderName, setFounderName] = useState<string>('Dr. Kamakoti / Neel Gala');
  const [companyName, setCompanyName] = useState<string>('InCore Semiconductors');
  const [customChip, setCustomChip] = useState<string>('Dolomite RISC-V Vector Core');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ColdOutreachTemplate | null>(null);
  const [formState, setFormState] = useState<ColdOutreachTemplate>(BLANK_TEMPLATE);
  const [formTipsRaw, setFormTipsRaw] = useState('');

  const activeTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0] || BLANK_TEMPLATE;

  const processedBody = (activeTemplate?.body || '')
    .replace(/\[Founder\/Lead Name\]/g, founderName || '[Founder/Lead Name]')
    .replace(/\[Manager Name\]/g, founderName || '[Manager Name]')
    .replace(/\[Lead\/Recruiter Name\]/g, founderName || '[Lead/Recruiter Name]')
    .replace(/\[Company Name\]/g, companyName || '[Company Name]')
    .replace(/\[specific product\/chip.*?\]/g, customChip || 'custom chip IP');

  const handleCopy = () => {
    if (!activeTemplate) return;
    navigator.clipboard.writeText(`Subject: ${activeTemplate.subject}\n\n${processedBody}`);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  const handleOpenAdd = () => {
    const newTemplate: ColdOutreachTemplate = {
      ...BLANK_TEMPLATE,
      id: `outreach-${Date.now()}`
    };
    setEditingTemplate(null);
    setFormState(newTemplate);
    setFormTipsRaw(newTemplate.customizationTips.join('\n'));
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: ColdOutreachTemplate) => {
    setEditingTemplate(t);
    setFormState({ ...t });
    setFormTipsRaw(t.customizationTips.join('\n'));
    setIsModalOpen(true);
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.roleTarget.trim() || !formState.subject.trim()) return;

    const parsedTips = formTipsRaw
      .split('\n')
      .map(t => t.trim())
      .filter(Boolean);

    const finalized: ColdOutreachTemplate = {
      ...formState,
      customizationTips: parsedTips.length > 0 ? parsedTips : ['Personalize the greeting with exact chip names']
    };

    let updated: ColdOutreachTemplate[];
    if (editingTemplate) {
      updated = templates.map(t => t.id === finalized.id ? finalized : t);
    } else {
      updated = [...templates, finalized];
    }

    setTemplates(updated);
    saveStoredOutreachTemplates(updated);
    setSelectedTemplateId(finalized.id);
    setIsModalOpen(false);
  };

  const handleDeleteTemplate = (id: string, role: string) => {
    if (window.confirm(`Delete outreach template for "${role}"?`)) {
      const updated = templates.filter(t => t.id !== id);
      setTemplates(updated);
      saveStoredOutreachTemplates(updated);
      if (selectedTemplateId === id && updated.length > 0) {
        setSelectedTemplateId(updated[0].id);
      }
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset outreach templates to default hiring templates?')) {
      const reset = resetStoredOutreachTemplates();
      setTemplates(reset);
      if (reset.length > 0) setSelectedTemplateId(reset[0].id);
    }
  };

  return (
    <div className="space-y-6" id="ecosystem-outreach-container">
      {/* Hero Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-sm" id="ecosystem-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-semibold mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>INDIAN SEMICONDUCTOR PLAYBOOK & HIRING PIPELINE</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Ecosystem Intelligence & Outreach Generator</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Deep market insights on the India Semiconductor Mission (ISM), DLI fabless startups, stipend benchmarks, and high-conversion cold outreach templates.
            </p>
          </div>
        </div>
      </div>

      {/* Insights Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="insights-grid">
        {ecosystemInsights.map((insight, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              {idx === 0 ? (
                <Building2 className="w-4 h-4 text-indigo-600" />
              ) : idx === 1 ? (
                <Calendar className="w-4 h-4 text-emerald-600" />
              ) : (
                <DollarSign className="w-4 h-4 text-amber-600" />
              )}
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {insight.category}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{insight.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{insight.summary}</p>
            <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
              {insight.keyPoints.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold shrink-0">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Cold Outreach Generator Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6" id="cold-outreach-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Send className="w-5 h-5 text-indigo-600" />
              <span>Cold Email & InMail Direct Outreach Generator</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Evidence-based cold outreach templates citing your GitHub waveform proofs and measured silicon metrics.
            </p>
          </div>

          {/* Action and Template Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplateId(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedTemplateId === t.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.roleTarget.split('/')[0]}
              </button>
            ))}

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Template</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="p-1.5 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-lg transition-colors cursor-pointer"
              title="Reset templates"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Input variables */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <label className="block text-slate-700 font-medium mb-1">Target Person / Title:</label>
            <input
              id="input-founder-name"
              type="text"
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="e.g. Dr. Neel Gala"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-1">Company Name:</label>
            <input
              id="input-company-name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="e.g. InCore Semiconductors"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-1">Product / Silicon Target:</label>
            <input
              id="input-custom-chip"
              type="text"
              value={customChip}
              onChange={(e) => setCustomChip(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="e.g. Dolomite RISC-V Core"
            />
          </div>
        </div>

        {/* Generated Message Box */}
        {activeTemplate && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs font-bold text-slate-700">
                Subject Line: <span className="font-mono text-indigo-700 font-semibold">{activeTemplate.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(activeTemplate)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Template</span>
                </button>

                {templates.length > 1 && (
                  <button
                    onClick={() => handleDeleteTemplate(activeTemplate.id, activeTemplate.roleTarget)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                    title="Delete template"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={handleCopy}
                  id="btn-copy-template"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    copiedTemplate
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTemplate ? 'Copied to Clipboard!' : 'Copy Formatted Email'}</span>
                </button>
              </div>
            </div>

            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-96 overflow-y-auto">
              {processedBody}
            </pre>

            {/* Strategy Tips */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>High-Conversion Outreach Execution Rules</span>
              </div>
              <ul className="space-y-1 text-amber-800 text-[11px] list-disc list-inside">
                {activeTemplate.customizationTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Template Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingTemplate ? 'Edit Outreach Template' : 'Add New Outreach Template'}
                  </h3>
                  <p className="text-xs text-slate-500">Configure email subject, placeholders, and tips</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTemplate} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Target Role / Persona <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formState.roleTarget}
                  onChange={(e) => setFormState({ ...formState, roleTarget: e.target.value })}
                  placeholder="e.g. Design Verification Lead / Hiring Manager"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Target Category</label>
                <input
                  type="text"
                  value={formState.targetCategory}
                  onChange={(e) => setFormState({ ...formState, targetCategory: e.target.value })}
                  placeholder="e.g. Silicon Startup / Direct Hiring Lead"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Email Subject Line <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="e.g. Ayush Sharma | RTL Verification Candidate ([Company Name])"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Email Body (supports [Founder/Lead Name], [Company Name], [specific product/chip] placeholders)
                </label>
                <textarea
                  rows={8}
                  value={formState.body}
                  onChange={(e) => setFormState({ ...formState, body: e.target.value })}
                  className="w-full text-xs font-mono p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Customization Tips (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={formTipsRaw}
                  onChange={(e) => setFormTipsRaw(e.target.value)}
                  placeholder="Attach direct link to wave.vcd waveform viewer&#10;Follow up in 4 business days"
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
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  {editingTemplate ? 'Save Template' : 'Create Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
