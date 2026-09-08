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
  Briefcase
} from 'lucide-react';
import { OutreachTemplate } from '../types';
import { getStoredOutreach, saveStoredOutreach, resetStoredOutreach } from '../utils/storage';

export const EcosystemOutreachView: React.FC = () => {
  const [templates, setTemplates] = useState<OutreachTemplate[]>(() => getStoredOutreach());
  const [selectedId, setSelectedId] = useState<string>(() => templates[0]?.id || '');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Dynamic placeholders
  const [recipientName, setRecipientName] = useState<string>('Dr. Neel Gala / Shashwath TR');
  const [companyName, setCompanyName] = useState<string>('InCore Semiconductors');
  const [productIp, setProductIp] = useState<string>('Dolomite RISC-V Vector Core');

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
            Battle-tested communication templates for reaching Indian Fabless Founders, MNC Engineering Directors, and IIT/IISc Research PIs with authentic proof of work.
          </p>
        </div>
      </div>

      {/* Main Grid: Template Selector & Customizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Template List & Variable Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-neutral-900">
              Select Target Persona
            </h2>
            <div className="space-y-1.5">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedId(tpl.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    selectedId === tpl.id
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="font-bold">{tpl.roleTarget}</div>
                  <div className={`text-[11px] font-normal truncate mt-0.5 ${
                    selectedId === tpl.id ? 'text-neutral-300' : 'text-neutral-500'
                  }`}>
                    {tpl.subject}
                  </div>
                </button>
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
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900"
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
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900"
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
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-neutral-900"
                placeholder="e.g. Dolomite RISC-V Vector Core"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Email Preview (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                Live Formatted Preview
              </span>
              <h2 className="text-lg font-bold text-neutral-900 mt-1">
                {currentTemplate?.roleTarget}
              </h2>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Full Email</span>
                </>
              )}
            </button>
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
    </div>
  );
};
