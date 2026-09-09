import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  Building2, 
  UserCheck, 
  RotateCcw, 
  HelpCircle,
  FileText,
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  X,
  Save
} from 'lucide-react';
import { OutreachTemplate } from '../types';
import { getStoredOutreach, saveStoredOutreach, resetStoredOutreach } from '../utils/storage';

interface OutreachFormData {
  roleTarget: string;
  targetCategory: string;
  subject: string;
  body: string;
  customizationTips: string;
}

const BLANK_OUTREACH_FORM: OutreachFormData = {
  roleTarget: '',
  targetCategory: 'Direct Outreach',
  subject: '',
  body: '',
  customizationTips: 'Keep it under 150 words.\nReference a specific paper, commit or chip line.\nInclude 1 direct link to GitHub demo.'
};

export const EcosystemOutreachView: React.FC = () => {
  const [templates, setTemplates] = useState<OutreachTemplate[]>(() => getStoredOutreach());
  const [selectedId, setSelectedId] = useState<string>(() => templates[0]?.id || '');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Dynamic placeholders
  const [recipientName, setRecipientName] = useState<string>('Dr. Neel Gala / Shashwath TR');
  const [companyName, setCompanyName] = useState<string>('InCore Semiconductors');
  const [productIp, setProductIp] = useState<string>('Dolomite RISC-V Vector Core');

  // Add/Edit Template Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [formData, setFormData] = useState<OutreachFormData>(BLANK_OUTREACH_FORM);

  const currentTemplate = templates.find((t) => t.id === selectedId) || templates[0];

  const processedBody = (currentTemplate?.body || '')
    .replace(/\[Founder\/Lead Name\]/g, recipientName || '[Founder/Lead Name]')
    .replace(/\[Manager Name\]/g, recipientName || '[Manager Name]')
    .replace(/\[Lead\/Recruiter Name\]/g, recipientName || '[Lead/Recruiter Name]')
    .replace(/\[Professor Name\]/g, recipientName || '[Professor Name]')
    .replace(/\[Company Name\]/g, companyName || '[Company Name]')
    .replace(/\[Lab Name\]/g, companyName || '[Lab Name]')
    .replace(/\[specific product\/chip.*?\]/g, productIp || 'silicon IP')
    .replace(/\[Specific Product\/IP\]/g, productIp || 'silicon IP');

  const handleCopy = () => {
    if (!currentTemplate) return;
    const fullText = `Subject: ${currentTemplate.subject}\n\n${processedBody}`;
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleOpenAdd = () => {
    setEditingTemplateId(null);
    setFormData(BLANK_OUTREACH_FORM);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tpl: OutreachTemplate, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingTemplateId(tpl.id);
    setFormData({
      roleTarget: tpl.roleTarget,
      targetCategory: tpl.targetCategory || 'Direct Outreach',
      subject: tpl.subject,
      body: tpl.body,
      customizationTips: (tpl.customizationTips || []).join('\n')
    });
    setIsModalOpen(true);
  };

  const handleDeleteTemplate = (id: string, name: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (templates.length <= 1) {
      alert('You must keep at least one outreach template.');
      return;
    }
    if (window.confirm(`Delete outreach template "${name}"?`)) {
      const updated = templates.filter(t => t.id !== id);
      setTemplates(updated);
      saveStoredOutreach(updated);
      if (selectedId === id) {
        setSelectedId(updated[0]?.id || '');
      }
    }
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.roleTarget.trim() || !formData.subject.trim() || !formData.body.trim()) {
      alert('Please fill in Role Target, Subject, and Email Body.');
      return;
    }

    const tipsArray = formData.customizationTips
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    let updatedList: OutreachTemplate[];
    if (editingTemplateId) {
      updatedList = templates.map(t => {
        if (t.id === editingTemplateId) {
          return {
            ...t,
            roleTarget: formData.roleTarget.trim(),
            targetCategory: formData.targetCategory.trim(),
            subject: formData.subject.trim(),
            body: formData.body.trim(),
            customizationTips: tipsArray
          };
        }
        return t;
      });
    } else {
      const newTemplate: OutreachTemplate = {
        id: `custom-outreach-${Date.now()}`,
        roleTarget: formData.roleTarget.trim(),
        targetCategory: formData.targetCategory.trim(),
        subject: formData.subject.trim(),
        body: formData.body.trim(),
        customizationTips: tipsArray
      };
      updatedList = [...templates, newTemplate];
      setSelectedId(newTemplate.id);
    }

    setTemplates(updatedList);
    saveStoredOutreach(updatedList);
    setIsModalOpen(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset outreach templates to default hiring templates?')) {
      const def = resetStoredOutreach();
      setTemplates(def);
      if (def.length > 0) setSelectedId(def[0].id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>Outreach Playbook</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
              High-Conversion Templates
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Ecosystem Intelligence &amp; Cold Outreach Generator
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Battle-tested communication templates for reaching Indian Fabless Founders, MNC Engineering Directors, and IIT/IISc Research PIs with authentic proof of work. Fully editable and expandable.
          </p>
        </div>
      </div>

      {/* Main Grid: Template Selector & Customizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Template List & Variable Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-neutral-900">
                Target Personas ({templates.length})
              </h2>
              <button
                onClick={handleOpenAdd}
                className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Template</span>
              </button>
            </div>

            <div className="space-y-2">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedId(tpl.id)}
                  className={`group relative w-full text-left p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedId === tpl.id
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 pr-12">
                    <div>
                      <div className="font-bold">{tpl.roleTarget}</div>
                      <div className={`text-[11px] truncate mt-0.5 ${
                        selectedId === tpl.id ? 'text-neutral-300' : 'text-neutral-500'
                      }`}>
                        {tpl.subject}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleOpenEdit(tpl, e)}
                      className={`p-1 rounded transition-colors ${
                        selectedId === tpl.id
                          ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                          : 'text-neutral-400 hover:text-indigo-600 hover:bg-neutral-200'
                      }`}
                      title="Edit template"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteTemplate(tpl.id, tpl.roleTarget, e)}
                      className={`p-1 rounded transition-colors ${
                        selectedId === tpl.id
                          ? 'text-neutral-400 hover:text-rose-300 hover:bg-neutral-800'
                          : 'text-neutral-400 hover:text-rose-600 hover:bg-neutral-200'
                      }`}
                      title="Delete template"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-100 flex justify-end">
              <button
                onClick={handleReset}
                className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Templates</span>
              </button>
            </div>
          </div>

          {/* Variable Injection Form */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-neutral-900">
              Personalization Variables
            </h3>

            <div>
              <label className="block font-medium text-neutral-600 mb-1">
                Recipient Name / Title
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Dr. Neel Gala / Shashwath TR"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-600 mb-1">
                Target Company / Lab Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. InCore Semiconductors / CeNSE IISc"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-600 mb-1">
                Specific Chip / IP / Research Paper
              </label>
              <input
                type="text"
                value={productIp}
                onChange={(e) => setProductIp(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Dolomite RISC-V Vector Core"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Email Preview (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                Live Formatted Preview
              </span>
              <h2 className="text-lg font-bold text-neutral-900 mt-1">
                {currentTemplate?.roleTarget}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {currentTemplate && (
                <button
                  onClick={() => handleOpenEdit(currentTemplate)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  title="Edit this template text"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Content</span>
                </button>
              )}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Subject Bar */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs">
            <span className="font-bold text-neutral-500 mr-2">Subject:</span>
            <span className="font-semibold text-neutral-900">{currentTemplate?.subject}</span>
          </div>

          {/* Email Body */}
          <div className="bg-neutral-50/50 border border-neutral-200 rounded-xl p-5 text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans whitespace-pre-wrap">
            {processedBody}
          </div>

          {/* Customization Tips */}
          {currentTemplate?.customizationTips && currentTemplate.customizationTips.length > 0 && (
            <div className="bg-cyan-50/60 border border-cyan-200/60 rounded-xl p-4 space-y-2 text-xs">
              <span className="font-bold text-cyan-950 uppercase tracking-wider text-[10px]">
                High-Conversion Execution Tips:
              </span>
              <ul className="space-y-1 list-disc list-inside text-cyan-900">
                {currentTemplate.customizationTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Template Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-600" />
                <span>{editingTemplateId ? 'Edit Outreach Template' : 'Add New Outreach Template'}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTemplate} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Target Persona / Role Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design Verification Lead at MNC"
                  value={formData.roleTarget}
                  onChange={e => setFormData(prev => ({ ...prev, roleTarget: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Target Category</label>
                <input
                  type="text"
                  placeholder="e.g. Indian Fabless Startup, Tier-1 MNC, Academic PI"
                  value={formData.targetCategory}
                  onChange={e => setFormData(prev => ({ ...prev, targetCategory: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Email Subject Line *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RV32I Core & cocotb Verification Proof — Ayush Kumar"
                  value={formData.subject}
                  onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-neutral-700">Email Body *</label>
                  <span className="text-[11px] text-neutral-500 font-normal">
                    Supported tags: [Founder/Lead Name], [Company Name], [Specific Product/IP]
                  </span>
                </div>
                <textarea
                  rows={8}
                  required
                  placeholder="Dear [Founder/Lead Name],\n\nI have followed your team's work on [Specific Product/IP] at [Company Name]..."
                  value={formData.body}
                  onChange={e => setFormData(prev => ({ ...prev, body: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Execution / Customization Tips (one per line)</label>
                <textarea
                  rows={3}
                  placeholder="Reference their latest silicon tapeout.\nAttach 1 high-resolution architecture diagram."
                  value={formData.customizationTips}
                  onChange={e => setFormData(prev => ({ ...prev, customizationTips: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingTemplateId ? 'Update Template' : 'Save Template'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
