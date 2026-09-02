import React, { useState, useEffect, useMemo, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Copy,
  Check,
  ExternalLink,
  Clock,
  BookOpen,
  FileText,
  Star,
  CheckCircle2,
  Download,
  Search,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  List,
  Type,
  Sun,
  Moon,
  Coffee,
  Info,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  Minimize2,
  ChevronRight,
  Sparkles,
  Hash,
  Share2,
  Cpu,
  X,
  Layers,
  HelpCircle,
  Tag,
  Brain,
  Zap,
  Loader2
} from 'lucide-react';
import { EncyclopediaFlatDoc } from '../data/encyclopediaData';
import { generateDeepExplanationForDoc } from '../data/deepEncyclopediaExplanations';

export interface MarkdownDocReaderProps {
  markdownContent: string;
  isLoading: boolean;
  currentDoc: EncyclopediaFlatDoc;
  isStudied: boolean;
  isBookmarked: boolean;
  onToggleStudied: () => void;
  onToggleBookmark: () => void;
  prevDoc: EncyclopediaFlatDoc | null;
  nextDoc: EncyclopediaFlatDoc | null;
  onNavigateDoc: (doc: EncyclopediaFlatDoc) => void;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Comprehensive formula sanitizer: converts raw LaTeX and complex symbols into human-readable math
export function cleanFormulaString(raw: string): string {
  if (!raw) return '';
  let s = raw.trim();

  // Strip wrapping $$ or $
  s = s.replace(/^\$\$|\$\$$/g, '').replace(/^\$|\$$/g, '').trim();

  // Temperature and degree ranges: e.g. -40,^\circ\text{C} -> -40°C
  s = s.replace(/(-?\+?[0-9]+(?:\.[0-9]+)?)\s*[,\\ ]*\^\\?circ\s*(?:\\text\{C\}|C|\{C\})?/g, '$1°C');
  s = s.replace(/\^\\?circ/g, '°');

  // Common semiconductor chemicals and units
  s = s.replace(/\\text\{SiO\}_2|SiO_2|SiO\_2/g, 'SiO₂');
  s = s.replace(/\\text\{CO\}_2|CO_2|CO\_2/g, 'CO₂');
  s = s.replace(/\\text\{La\}_2\\text\{O\}_3|La_2O_3/g, 'La₂O₃');
  s = s.replace(/\\text\{Al\}_2\\text\{O\}_3|Al_2O_3/g, 'Al₂O₃');
  s = s.replace(/\\text\{HfO\}_2|HfO_2/g, 'HfO₂');
  s = s.replace(/\\text\{Si\}_3\\text\{N\}_4|Si_3N_4/g, 'Si₃N₄');
  s = s.replace(/\\text\{A\/cm\}\^2|A\/cm\^2|A\/cm\^\{2\}|A\/cm²|\bA\/cm\^2\b/g, 'A/cm²');
  s = s.replace(/\\text\{cm\}\^\{-3\}|cm\^\{-3\}|cm\^-3/g, 'cm⁻³');
  s = s.replace(/\\text\{cm\}\^\{-2\}|cm\^\{-2\}|cm\^-2/g, 'cm⁻²');

  // Unpack nested \text{...}, \mathrm{...}, \mathit{...}, \mathbf{...}, \bm{...}
  for (let i = 0; i < 5; i++) {
    s = s.replace(/\\(?:text|mathrm|mathit|mathbf|bm)\{([^{}]*)\}/g, '$1');
  }

  // Common fraction expressions: \frac{A}{B} or \dfrac{A}{B} -> (A / B)
  for (let i = 0; i < 5; i++) {
    s = s.replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1 / $2)');
  }

  // Square roots: \sqrt[n]{A} -> ⁿ√(A), \sqrt{A} -> √(A)
  s = s.replace(/\\sqrt\[([^\]]*)\]\{([^{}]*)\}/g, '$1√($2)');
  s = s.replace(/\\sqrt\{([^{}]*)\}/g, '√($1)');

  // Brackets & delimiters
  s = s.replace(/\\left\(/g, '(').replace(/\\right\)/g, ')');
  s = s.replace(/\\left\[/g, '[').replace(/\\right\]/g, ']');
  s = s.replace(/\\left\|/g, '|').replace(/\\right\|/g, '|');
  s = s.replace(/\\left\\\{/g, '{').replace(/\\right\\\}/g, '}');

  // Sums, Products, Integrals
  s = s.replace(/\\sum_\{([^{}]*)\}/g, '∑_$1');
  s = s.replace(/\\sum(?![a-zA-Z])/g, '∑');
  s = s.replace(/\\prod_\{([^{}]*)\}/g, '∏_$1');
  s = s.replace(/\\prod(?![a-zA-Z])/g, '∏');
  s = s.replace(/\\int_\{([^{}]*)\}\^\{([^{}]*)\}/g, '∫[$1→$2]');
  s = s.replace(/\\int(?![a-zA-Z])/g, '∫');

  // Operators & physical constants
  s = s.replace(/\\partial/g, '∂');
  s = s.replace(/\\nabla/g, '∇');
  s = s.replace(/\\propto/g, '∝');
  s = s.replace(/\\infty/g, '∞');
  s = s.replace(/\\hbar/g, 'ħ');
  s = s.replace(/\\approx/g, '≈');
  s = s.replace(/\\le(?:q)?(?![a-zA-Z])/g, '≤');
  s = s.replace(/\\ge(?:q)?(?![a-zA-Z])/g, '≥');
  s = s.replace(/\\ll(?![a-zA-Z])/g, '≪');
  s = s.replace(/\\gg(?![a-zA-Z])/g, '≫');
  s = s.replace(/\\pm/g, '±');
  s = s.replace(/\\mp/g, '∓');
  s = s.replace(/\\times/g, '×');
  s = s.replace(/\\cdot/g, '·');
  s = s.replace(/\\quad/g, '   ');
  s = s.replace(/\\qquad/g, '      ');
  s = s.replace(/\\,/g, ' ');

  // Greek letters
  const greek: Record<string, string> = {
    alpha: 'α', beta: 'β', gamma: 'γ', Gamma: 'Γ', delta: 'δ', Delta: 'Δ',
    epsilon: 'ε', varepsilon: 'ε', zeta: 'ζ', eta: 'η', theta: 'θ', Theta: 'Θ',
    kappa: 'κ', lambda: 'λ', Lambda: 'Λ', mu: 'μ', nu: 'ν', xi: 'ξ', Xi: 'Ξ',
    pi: 'π', Pi: 'Π', rho: 'ρ', sigma: 'σ', Sigma: 'Σ', tau: 'τ', phi: 'ϕ',
    Phi: 'Φ', varphi: 'ϕ', chi: 'χ', psi: 'ψ', Psi: 'Ψ', omega: 'ω', Omega: 'Ω'
  };
  for (const [k, v] of Object.entries(greek)) {
    s = s.replace(new RegExp('\\\\' + k + '(?![a-zA-Z])', 'g'), v);
  }
  s = s.replace(/\\mathcal\{E\}|\\vec\{\\mathcal\{E\}\}/g, 'E');
  s = s.replace(/\\vec\{([^{}]+)\}/g, '$1');

  // Superscripts
  s = s.replace(/\^2(?![0-9])/g, '²');
  s = s.replace(/\^3(?![0-9])/g, '³');
  s = s.replace(/\^0(?![0-9])/g, '⁰');
  s = s.replace(/\^1(?![0-9])/g, '¹');
  s = s.replace(/\^4(?![0-9])/g, '⁴');
  s = s.replace(/\^\{-1\}|\^-1(?![0-9])/g, '⁻¹');
  s = s.replace(/\^\{-2\}|\^-2(?![0-9])/g, '⁻²');
  s = s.replace(/\^\{-3\}|\^-3(?![0-9])/g, '⁻³');
  s = s.replace(/\^\{1\/2\}|\^1\/2/g, '¹/²');
  s = s.replace(/\^\{3\/2\}|\^3\/2/g, '³/²');
  s = s.replace(/\^\{([^{}]*)\}/g, '^$1');

  // Subscripts: _{...} -> _...
  s = s.replace(/_\{([^{}]*)\}/g, '_$1');

  // Strip remaining backslashes, braces, carats and dollar signs
  s = s.replace(/[{}]/g, '');
  s = s.replace(/\\/g, '');
  s = s.replace(/\$/g, '');

  return s.replace(/ {3,}/g, '   ').trim();
}

// Clean raw LaTeX and mathematical notation across entire markdown documents
export function cleanMarkdownMathForHumans(md: string): string {
  if (!md) return '';

  let text = md;

  // 1. Process centered formula blocks $$ ... $$
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_match, inner) => {
    return '\n\n$$' + cleanFormulaString(inner) + '$$\n\n';
  });

  // 2. Temperature ranges in free text
  text = text.replace(/\$?\s*(-?\+?[0-9]+(?:\.[0-9]+)?)\s*[,\\ ]*\^\\?circ\s*(?:\\text\{C\}|C|\{C\})\s*\$?([.,;)]?)/g, '$1°C$2');
  text = text.replace(/\^\\circ\s*C|\^\\circ\s*\\text\{C\}|\^\\circ\s*\{C\}|\^\\circ(?![a-zA-Z])/g, '°');

  // 3. Process inline math $ ... $
  text = text.replace(/(?<!\$)\$([^\$\n]+)\$(?!\$)/g, (_match, inner) => {
    return cleanFormulaString(inner);
  });

  // 4. Clean any residual LaTeX commands in free text
  for (let i = 0; i < 4; i++) {
    text = text.replace(/\\(?:text|mathrm|mathit|mathbf|bm)\{([^{}]*)\}/g, '$1');
  }
  text = text.replace(/_\{([^{}]*)\}/g, '_$1');
  text = text.replace(/\^\{([^{}]*)\}/g, '^$1');
  text = text.replace(/\\approx/g, '≈');
  text = text.replace(/\\le(?:q)?(?![a-zA-Z])/g, '≤');
  text = text.replace(/\\ge(?:q)?(?![a-zA-Z])/g, '≥');
  text = text.replace(/\\ll(?![a-zA-Z])/g, '≪');
  text = text.replace(/\\gg(?![a-zA-Z])/g, '≫');
  text = text.replace(/\\pm/g, '±');
  text = text.replace(/\\cdot/g, '·');
  text = text.replace(/\\times/g, '×');
  text = text.replace(/\\,/g, ' ');
  text = text.replace(/\\quad/g, '  ');
  text = text.replace(/\\qquad/g, '    ');
  text = text.replace(/\\mu(?![a-zA-Z])/g, 'μ');
  text = text.replace(/\\lambda(?![a-zA-Z])/g, 'λ');
  text = text.replace(/\\sigma(?![a-zA-Z])/g, 'σ');
  text = text.replace(/\\Delta(?![a-zA-Z])/g, 'Δ');
  text = text.replace(/\\epsilon(?![a-zA-Z])/g, 'ε');
  text = text.replace(/\\alpha(?![a-zA-Z])/g, 'α');
  text = text.replace(/\\beta(?![a-zA-Z])/g, 'β');
  text = text.replace(/\\kappa(?![a-zA-Z])/g, 'κ');
  text = text.replace(/\\nabla/g, '∇');
  text = text.replace(/\\partial/g, '∂');
  text = text.replace(/\\propto/g, '∝');

  // Remove solitary $ signs not part of $$
  text = text.replace(/(?<!\$)\$(?!\$)/g, '');

  return text;
}

// Generate consistent URL-safe slug for heading navigation
const getHeadingSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

export const MarkdownDocReader: React.FC<MarkdownDocReaderProps> = ({
  markdownContent,
  isLoading,
  currentDoc,
  isStudied,
  isBookmarked,
  onToggleStudied,
  onToggleBookmark,
  prevDoc,
  nextDoc,
  onNavigateDoc,
}) => {
  // Reading preferences
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [themeMode, setThemeMode] = useState<'light' | 'sepia' | 'dark'>('light');
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false);
  const [showTocDrawer, setShowTocDrawer] = useState<boolean>(false);
  const [inDocSearch, setInDocSearch] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  // Selected Text & Floating Action
  const [selectedSnippet, setSelectedSnippet] = useState<string>('');
  const [selectionPos, setSelectionPos] = useState<{ x: number; y: number } | null>(null);

  // Real-Time Pop Page Modal State
  const [isPopPageOpen, setIsPopPageOpen] = useState<boolean>(false);
  const [popPageTitle, setPopPageTitle] = useState<string>('');
  const [popPageText, setPopPageText] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isPopPageFullscreen, setIsPopPageFullscreen] = useState<boolean>(false);
  const [hasCopiedPopPage, setHasCopiedPopPage] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const popPageContentRef = useRef<HTMLDivElement>(null);

  // AI Content Cache (whole doc)
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const [aiContentMap, setAiContentMap] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('semicon_encyclopedia_ai_deep_dives');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Copy & Action feedback
  const [hasCopiedDoc, setHasCopiedDoc] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const readerContainerRef = useRef<HTMLDivElement>(null);
  const articleContentRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Active Markdown content: Always serve the complete, comprehensive masterclass
  const activeMarkdown = useMemo<string>(() => {
    if (aiContentMap[currentDoc.path]) {
      return aiContentMap[currentDoc.path];
    }
    return generateDeepExplanationForDoc(currentDoc, markdownContent);
  }, [currentDoc, markdownContent, aiContentMap]);

  // Clean raw LaTeX, math symbols, and metrics for crystal-clear human readability
  const humanReadableMarkdown = useMemo<string>(() => {
    return cleanMarkdownMathForHumans(activeMarkdown);
  }, [activeMarkdown]);

  const hasAiGenerated = !!aiContentMap[currentDoc.path];

  // Listen to text selection inside the document article ONLY (on mouseup / keyup)
  useEffect(() => {
    const handleDocSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
        setSelectionPos(null);
        return;
      }

      const articleEl = articleContentRef.current;
      if (!articleEl) {
        setSelectionPos(null);
        return;
      }

      let range: Range;
      try {
        range = selection.getRangeAt(0);
      } catch {
        setSelectionPos(null);
        return;
      }

      const anchorNode = selection.anchorNode;
      const focusNode = selection.focusNode;
      if (!anchorNode || !focusNode) {
        setSelectionPos(null);
        return;
      }

      // Check if both anchor/focus and range boundaries are strictly inside the article
      const isAnchorInside = articleEl.contains(anchorNode);
      const isFocusInside = articleEl.contains(focusNode);
      const isRangeStartInside = articleEl.contains(range.startContainer);
      const isRangeEndInside = articleEl.contains(range.endContainer);

      if (!isAnchorInside || !isFocusInside || !isRangeStartInside || !isRangeEndInside) {
        // Selection started or ended outside the actual article reading area
        setSelectionPos(null);
        return;
      }

      const rawText = selection.toString();
      const text = rawText.trim();

      if (text.length >= 2 && text.length <= 350) {
        try {
          const rect = range.getBoundingClientRect();
          if (rect && rect.width > 0 && rect.height > 0) {
            setSelectedSnippet(text);
            setSelectionPos({
              x: Math.max(120, Math.min(window.innerWidth - 120, rect.left + rect.width / 2)),
              y: Math.max(70, rect.top - 12),
            });
            return;
          }
        } catch {
          // ignore
        }
      }
      setSelectionPos(null);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('#floating-selection-pill') || target?.closest('#deep-dive-modal')) {
        return;
      }
      setSelectionPos(null);
    };

    // Use mouseup, keyup, and mousedown on document
    document.addEventListener('mouseup', handleDocSelection);
    document.addEventListener('keyup', handleDocSelection);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mouseup', handleDocSelection);
      document.removeEventListener('keyup', handleDocSelection);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Real-Time Selection Deep Dive with Gemini AI (Streams into Pop Page)
  const handleOpenSelectionDeepDive = async (textToExplore?: string) => {
    const target = (textToExplore || selectedSnippet || currentDoc.title).trim();
    if (!target) return;

    setPopPageTitle(target);
    setPopPageText('');
    setIsStreaming(true);
    setIsPopPageOpen(true);
    setHasCopiedPopPage(false);
    setSelectionPos(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch('/api/encyclopedia/selection-deep-dive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedText: target,
          topicTitle: currentDoc.title,
          volumeName: currentDoc.volumeName,
          context: markdownContent ? markdownContent.slice(0, 500) : '',
        }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error('Stream failed');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const payload = line.slice(6).trim();
            if (payload === '[DONE]') {
              setIsStreaming(false);
              return;
            }
            try {
              const parsed = JSON.parse(payload);
              if (parsed.text) {
                setPopPageText((prev) => prev + parsed.text);
              }
            } catch {
              // ignore non-json line
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setPopPageText((prev) => prev || generateDeepExplanationForDoc(currentDoc, target));
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const handleCopyPopPage = () => {
    if (!popPageText) return;
    navigator.clipboard.writeText(popPageText);
    setHasCopiedPopPage(true);
    setTimeout(() => setHasCopiedPopPage(false), 2000);
  };

  // Close Pop Page with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPopPageOpen) {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        setIsPopPageOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPopPageOpen]);

  // Request full-document AI Deep Dive
  const handleGenerateAiDeepDive = async () => {
    setIsAiLoading(true);
    setAiNotice(null);
    try {
      const res = await fetch('/api/encyclopedia/deep-dive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: currentDoc.title,
          path: currentDoc.path,
          volumeName: currentDoc.volumeName,
          baseContent: markdownContent,
        }),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (data && data.content) {
        const nextMap = { ...aiContentMap, [currentDoc.path]: data.content };
        setAiContentMap(nextMap);
        try {
          localStorage.setItem('semicon_encyclopedia_ai_deep_dives', JSON.stringify(nextMap));
        } catch {
          // Ignore localStorage quota
        }
        setAiNotice('Deep AI Masterclass generated successfully with Gemini AI!');
      } else if (data && data.source === 'fallback_offline') {
        setAiNotice(data.message || 'Gemini demand spike: Loaded comprehensive offline masterclass.');
      } else if (data && data.source === 'no_key') {
        setAiNotice('Offline Deep Engineering Engine active (no server GEMINI_API_KEY required).');
      } else {
        setAiNotice('Offline Deep Engineering Engine active for this topic.');
      }
    } catch {
      setAiNotice('Showing offline Deep Engineering Masterclass.');
    } finally {
      setIsAiLoading(false);
      setTimeout(() => setAiNotice(null), 4000);
    }
  };

  // Parse Table of Contents (Headings) from active markdown
  const tocItems = useMemo<TocItem[]>(() => {
    if (!activeMarkdown) return [];
    const lines = activeMarkdown.split('\n');
    const items: TocItem[] = [];

    lines.forEach((line) => {
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const slug = getHeadingSlug(text);
        const id = `heading-${slug}`;
        items.push({ id, text, level });
      }
    });

    return items;
  }, [activeMarkdown]);

  // In-Document Search match count
  const searchMatchCount = useMemo<number>(() => {
    if (!inDocSearch.trim() || !activeMarkdown) return 0;
    try {
      const regex = new RegExp(inDocSearch.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = activeMarkdown.match(regex);
      return matches ? matches.length : 0;
    } catch {
      return 0;
    }
  }, [inDocSearch, activeMarkdown]);

  // Track scroll position to update reading progress & back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (!readerContainerRef.current) return;
      const rect = readerContainerRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Show back to top if scrolled past top of reader
      setShowBackToTop(elementTop < -180);

      // Calculate progress
      const totalScrollable = elementHeight - viewportHeight;
      if (totalScrollable > 0) {
        const currentScrolled = -elementTop;
        const progress = Math.min(100, Math.max(0, Math.round((currentScrolled / totalScrollable) * 100)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Estimated stats for active markdown
  const docStats = useMemo(() => {
    if (!activeMarkdown) return { words: 0, readTime: 1, chars: 0 };
    const words = activeMarkdown.trim().split(/\s+/).filter(Boolean).length;
    const chars = activeMarkdown.length;
    const readTime = Math.max(1, Math.ceil(words / 190));
    return { words, readTime, chars };
  }, [activeMarkdown]);

  // Copy full document
  const handleCopyDocument = () => {
    if (activeMarkdown) {
      navigator.clipboard.writeText(activeMarkdown);
      setHasCopiedDoc(true);
      setTimeout(() => setHasCopiedDoc(false), 2000);
    }
  };

  // Download markdown file
  const handleDownloadDoc = () => {
    if (!activeMarkdown) return;
    const blob = new Blob([activeMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentDoc.fileName || 'encyclopedia_topic.md'}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Smooth scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveHeadingId(id);
      setShowTocDrawer(false);
    }
  };

  // Jump to section containing key keyword
  const scrollToSectionText = (keyword: string) => {
    const found = tocItems.find((item) => item.text.toLowerCase().includes(keyword.toLowerCase()));
    if (found) {
      scrollToHeading(found.id);
    }
  };

  // Scroll back to top of reader
  const scrollToTop = () => {
    readerContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Theme styling classes
  const themeClasses = {
    light: {
      card: 'bg-white border-slate-200 text-slate-800',
      header: 'bg-slate-50/95 border-slate-200/90',
      body: 'text-slate-800',
      footer: 'bg-slate-50 border-slate-200',
      subtle: 'text-slate-500',
      codeInline: 'bg-slate-100 text-slate-900 border-slate-200',
      blockquote: 'bg-indigo-50/70 border-indigo-500 text-slate-800',
      tableHeader: 'bg-slate-100 text-slate-900 border-slate-200',
      tableBorder: 'border-slate-200',
      tableRowAlt: 'hover:bg-slate-50/80',
      chip: 'bg-slate-100 text-slate-700 border-slate-200',
      tocBg: 'bg-slate-50 border-slate-200',
      tocActive: 'bg-indigo-600 text-white font-bold',
      tocInactive: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    },
    sepia: {
      card: 'bg-[#fcfaf4] border-[#e8dfcf] text-[#2e2b26]',
      header: 'bg-[#f4efe4]/95 border-[#e4dcce]',
      body: 'text-[#2e2b26]',
      footer: 'bg-[#f5efe5] border-[#e4dcce]',
      subtle: 'text-[#7a7267]',
      codeInline: 'bg-[#eae3d5] text-[#2c261e] border-[#d8cfbe]',
      blockquote: 'bg-[#ece5d5]/80 border-[#c49a45] text-[#2e2b26]',
      tableHeader: 'bg-[#ece4d6] text-[#2c261e] border-[#dacfc0]',
      tableBorder: 'border-[#dfd6c6]',
      tableRowAlt: 'hover:bg-[#f5efe3]',
      chip: 'bg-[#eae3d5] text-[#4d4438] border-[#dbd1c0]',
      tocBg: 'bg-[#f4efe4] border-[#e4dcce]',
      tocActive: 'bg-[#8d6e3f] text-white font-bold',
      tocInactive: 'text-[#5a5043] hover:bg-[#eae3d5] hover:text-[#2c261e]'
    },
    dark: {
      card: 'bg-slate-950 border-slate-800 text-slate-200',
      header: 'bg-slate-900/95 border-slate-800',
      body: 'text-slate-200',
      footer: 'bg-slate-900 border-slate-800',
      subtle: 'text-slate-400',
      codeInline: 'bg-slate-900 text-cyan-300 border-slate-700',
      blockquote: 'bg-slate-900/90 border-cyan-500 text-slate-200',
      tableHeader: 'bg-slate-900 text-slate-200 border-slate-700',
      tableBorder: 'border-slate-800',
      tableRowAlt: 'hover:bg-slate-900/60',
      chip: 'bg-slate-900 text-slate-300 border-slate-800',
      tocBg: 'bg-slate-900 border-slate-800',
      tocActive: 'bg-cyan-600 text-white font-bold',
      tocInactive: 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
    }
  }[themeMode];

  const fontSizeClass = {
    sm: 'text-xs sm:text-sm leading-relaxed',
    base: 'text-sm sm:text-base leading-relaxed',
    lg: 'text-base sm:text-lg leading-relaxed'
  }[fontSize];

  // Helper to check if a paragraph represents an engineering process pipeline: "A → B → C"
  const isProcessPipeline = (text: string) => {
    if (!text || typeof text !== 'string') return false;
    const arrowCount = (text.match(/→|->|=>/g) || []).length;
    return arrowCount >= 2 && text.length < 350;
  };

  // Helper to check if paragraph is a specialized hardware section label
  const getSectionLabelMeta = (text: string) => {
    const trimmed = text.trim();
    if (/^Applications:?/i.test(trimmed)) {
      return { label: 'Applications', icon: Layers, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' };
    }
    if (/^Examples:?/i.test(trimmed)) {
      return { label: 'Industry Examples', icon: Sparkles, color: 'text-amber-700 bg-amber-50 border-amber-200' };
    }
    if (/^Related:?/i.test(trimmed)) {
      return { label: 'Related Concepts', icon: Tag, color: 'text-cyan-700 bg-cyan-50 border-cyan-200' };
    }
    if (/^Importance:?/i.test(trimmed) || /^Important for:?/i.test(trimmed)) {
      return { label: 'Engineering Significance', icon: Lightbulb, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    if (/^Mission:?/i.test(trimmed)) {
      return { label: 'Core Objective', icon: BookOpen, color: 'text-blue-700 bg-blue-50 border-blue-200' };
    }
    return null;
  };

  return (
    <div
      ref={readerContainerRef}
      className={`rounded-2xl border shadow-sm overflow-hidden transition-colors relative ${themeClasses.card}`}
      id="encyclopedia-markdown-reader"
    >
      {/* Scroll Progress Bar at the Top */}
      <div className="h-1 w-full bg-slate-200/40 sticky top-0 z-30 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Document Header & Breadcrumbs */}
      <div className={`p-3.5 sm:p-4 md:p-5 border-b backdrop-blur-md sticky top-1 z-20 transition-colors ${themeClasses.header}`}>
        
        {/* Row 1: Breadcrumb Path & Reading Mode Utilities */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-200/60">
          
          {/* Breadcrumbs & Reading Time */}
          <div className="flex items-center gap-2 text-xs font-mono flex-wrap min-w-0">
            <span className="font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/80 whitespace-nowrap shrink-0">
              {currentDoc.volumeName}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className={`font-medium truncate max-w-[220px] sm:max-w-xs shrink-0 ${themeClasses.subtle}`}>
              {currentDoc.fileName}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-200/60 font-sans text-slate-600 flex items-center gap-1.5 whitespace-nowrap shrink-0">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{docStats.readTime} min read</span>
              <span className="text-slate-400">•</span>
              <span>{docStats.words} words</span>
            </span>
          </div>

          {/* Reading Preferences Utilities */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Theme Selector (Light, Sepia, Dark) */}
            <div className="flex items-center bg-slate-200/60 p-0.5 rounded-lg border border-slate-300/60 shrink-0">
              <button
                onClick={() => setThemeMode('light')}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  themeMode === 'light' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Light Paper Theme"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode('sepia')}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  themeMode === 'sepia' ? 'bg-[#ebdcb9] text-[#2c261e] shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Warm Sepia Theme"
              >
                <Coffee className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode('dark')}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  themeMode === 'dark' ? 'bg-slate-900 text-cyan-300 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Night Terminal Theme"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Font Size Selector */}
            <div className="flex items-center bg-slate-200/60 p-0.5 rounded-lg border border-slate-300/60 shrink-0">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 text-[11px] font-bold rounded transition-colors cursor-pointer ${
                  fontSize === 'sm' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Compact font size"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-1.5 py-0.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                  fontSize === 'base' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Standard font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 text-sm font-bold rounded transition-colors cursor-pointer ${
                  fontSize === 'lg' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Comfortable large font size"
              >
                A+
              </button>
            </div>

            {/* Width Mode Toggle */}
            <button
              onClick={() => setIsFullWidth(!isFullWidth)}
              className="p-1.5 rounded-lg border border-slate-300 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 transition-colors cursor-pointer hidden sm:block shrink-0"
              title={isFullWidth ? 'Standard Reading Column (75ch)' : 'Full Width Layout'}
            >
              {isFullWidth ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Copy Markdown */}
            <button
              onClick={handleCopyDocument}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white/80 hover:bg-white text-slate-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title="Copy Raw Markdown"
            >
              {hasCopiedDoc ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 hidden md:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden md:inline">Copy</span>
                </>
              )}
            </button>

            {/* Download Markdown */}
            <button
              onClick={handleDownloadDoc}
              className="p-1.5 rounded-lg border border-slate-300 bg-white/80 hover:bg-white text-slate-700 transition-colors cursor-pointer shrink-0"
              title="Download as Markdown file"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* GitHub Link */}
            <a
              href={`https://github.com/ShivAyushNITGoa/Complete_Semiconductor_Engineering_Encyclopedia/blob/main/${currentDoc.path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg border border-slate-300 bg-white/80 hover:bg-white text-slate-700 transition-colors shrink-0"
              title="View on GitHub"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Row 2: Topic Title & Primary Study Navigation Controls */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
          
          {/* Topic Title & Status Badge */}
          <div className="flex items-center gap-2.5 flex-wrap min-w-0">
            <h2 className={`text-lg sm:text-xl font-black tracking-tight capitalize ${
              themeMode === 'dark' ? 'text-slate-100' : themeMode === 'sepia' ? 'text-[#2c261e]' : 'text-slate-900'
            }`}>
              {currentDoc.title}
            </h2>
            {isStudied && (
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0 whitespace-nowrap">
                <Check className="w-3 h-3 text-emerald-700" />
                Studied
              </span>
            )}
          </div>

          {/* Core Action Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Find in Document Toggle Button */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setTimeout(() => searchInputRef.current?.focus(), 100);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                isSearchOpen
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-2xs'
              }`}
              title="Search within this document"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find</span>
              {inDocSearch && searchMatchCount > 0 && (
                <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                  {searchMatchCount}
                </span>
              )}
            </button>

            {/* TOC Outline Toggle Button */}
            {tocItems.length > 0 && (
              <button
                onClick={() => setShowTocDrawer(!showTocDrawer)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  showTocDrawer
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-2xs'
                }`}
                title="Toggle Table of Contents Outline"
              >
                <List className="w-3.5 h-3.5" />
                <span>Outline ({tocItems.length})</span>
              </button>
            )}

            {/* Bookmark Star Button */}
            <button
              onClick={onToggleBookmark}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-white border-slate-300 text-slate-500 hover:text-slate-900 hover:bg-slate-100 shadow-2xs'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Star/Bookmark this topic'}
            >
              <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-500' : ''}`} />
            </button>

            {/* Study Check / Mark Done Button */}
            <button
              onClick={onToggleStudied}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                isStudied
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs hover:bg-emerald-700'
                  : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border-slate-300 shadow-2xs'
              }`}
              title="Toggle Studied Status"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isStudied ? 'Studied' : 'Mark Done'}</span>
            </button>
          </div>
        </div>

        {/* Row 3: Masterclass Status & Gemini Deep Dive Action Bar */}
        <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2.5">
          {/* Engineering Masterclass Badge & Guidance */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-50 border border-indigo-200/80 text-indigo-900 shadow-2xs">
              <Brain className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Deep Engineering Masterclass</span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              Select text anywhere to trigger real-time AI Deep Dive
            </span>
          </div>

          {/* AI Deep Dive Trigger Button */}
          <div className="flex items-center gap-2 flex-wrap">
            {hasAiGenerated && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-800 bg-cyan-50 border border-cyan-200 px-2.5 py-1 rounded-lg">
                <Sparkles className="w-3 h-3 text-cyan-600" />
                <span>AI Masterclass Cached</span>
              </span>
            )}

            <button
              onClick={() => handleOpenSelectionDeepDive(selectedSnippet || currentDoc.title)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl border border-indigo-600 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap active:scale-95"
              title="Select text and click to open a real-time Gemini AI Deep Dive pop page"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
              <span>
                {selectedSnippet
                  ? `Deep Dive: "${selectedSnippet.slice(0, 18)}${selectedSnippet.length > 18 ? '...' : ''}"`
                  : 'Deep Dive with Gemini AI'}
              </span>
            </button>
          </div>
        </div>

        {/* Temporary Feedback Notification */}
        {aiNotice && (
          <div className="mt-2.5 p-2 rounded-lg bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center gap-2 animate-fadeIn">
            <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>{aiNotice}</span>
          </div>
        )}

        {/* In-Document Search Input Bar */}
        {isSearchOpen && (
          <div className={`mt-3 p-2.5 rounded-xl border flex items-center gap-2 shadow-sm transition-colors ${
            themeMode === 'dark'
              ? 'border-slate-700 bg-slate-900 text-slate-100'
              : themeMode === 'sepia'
              ? 'border-[#dacfc0] bg-[#f5efe3] text-[#2e2b26]'
              : 'border-slate-200 bg-white text-slate-800'
          }`}>
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={inDocSearch}
              onChange={(e) => setInDocSearch(e.target.value)}
              placeholder="Search keyword or concept in this topic (e.g. verilog, latency, setup, latch)..."
              className="w-full text-xs placeholder-slate-400 focus:outline-none bg-transparent"
            />
            {inDocSearch && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  {searchMatchCount} {searchMatchCount === 1 ? 'match' : 'matches'}
                </span>
                <button
                  onClick={() => setInDocSearch('')}
                  className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setInDocSearch('');
              }}
              className="px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* Collapsible Quick Table of Contents / Outline Bar */}
        {showTocDrawer && tocItems.length > 0 && (
          <div className={`mt-3 p-3.5 rounded-xl border transition-all ${themeClasses.tocBg}`}>
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200/70">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                <List className="w-3.5 h-3.5 text-indigo-600" />
                <span>On This Page — Section Navigation</span>
              </div>
              <span className="text-[11px] text-slate-400">{tocItems.length} sections found</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-52 overflow-y-auto pr-1">
              {tocItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToHeading(item.id)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg transition-all text-left truncate max-w-xs cursor-pointer border ${
                    activeHeadingId === item.id
                      ? `${themeClasses.tocActive} border-transparent`
                      : `${themeClasses.tocInactive} border-slate-200/80 bg-white/70`
                  } ${item.level === 1 ? 'font-bold' : item.level === 2 ? 'font-medium' : 'text-[11px] opacity-90'}`}
                  title={item.text}
                >
                  {item.level === 1 ? '• ' : item.level === 2 ? '↳ ' : '  › '}
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Document Reading Area */}
      <div className={`p-5 sm:p-7 md:p-9 ${isFullWidth ? 'w-full' : 'max-w-4xl mx-auto'}`}>
        {isLoading ? (
          <div className="py-20 space-y-6 animate-pulse">
            <div className="h-8 bg-slate-200/60 rounded-md w-3/4" />
            <div className="h-4 bg-slate-200/50 rounded w-full" />
            <div className="h-4 bg-slate-200/50 rounded w-5/6" />
            <div className="h-4 bg-slate-200/50 rounded w-4/6" />
            <div className="h-24 bg-slate-200/40 rounded-xl w-full" />
            <div className="h-4 bg-slate-200/50 rounded w-11/12" />
          </div>
        ) : (
          <div>
            {/* Deep Masterclass Curriculum Jump Bar (Separated from article text so selection is pristine) */}
            <div className="mb-6 p-3.5 rounded-xl bg-gradient-to-r from-indigo-50/90 via-slate-50 to-cyan-50/80 border border-indigo-100 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pb-2.5 mb-2.5 border-b border-indigo-100/70">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Deep Technical Engineering Masterclass Active</span>
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  First Principles • Equations • 3nm/2nm Silicon • RTL/SPICE • Interviews
                </span>
              </div>

              {/* Quick Anchor Navigation */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                <span className="text-slate-400 text-[11px] font-mono mr-1">Direct Jump:</span>
                <button
                  onClick={() => scrollToSectionText('First Principles')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-medium transition-colors cursor-pointer text-xs"
                >
                  🎓 1. First Principles
                </button>
                <button
                  onClick={() => scrollToSectionText('Derivation')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-medium transition-colors cursor-pointer text-xs"
                >
                  📐 2. Math Derivations
                </button>
                <button
                  onClick={() => scrollToSectionText('Silicon')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-medium transition-colors cursor-pointer text-xs"
                >
                  🔬 3. Silicon Mechanics
                </button>
                <button
                  onClick={() => scrollToSectionText('Industrial')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-medium transition-colors cursor-pointer text-xs"
                >
                  🏭 4. 3nm/2nm Nodes
                </button>
                <button
                  onClick={() => scrollToSectionText('Implementation')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-medium transition-colors cursor-pointer text-xs"
                >
                  💻 5. RTL & SPICE
                </button>
                <button
                  onClick={() => scrollToSectionText('Failure')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-medium transition-colors cursor-pointer text-xs"
                >
                  ⚠️ 6. Reliability & Aging
                </button>
                <button
                  onClick={() => scrollToSectionText('Interview')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-medium transition-colors cursor-pointer text-xs"
                >
                  🎯 7. Interview Mastery
                </button>
              </div>
            </div>

            <article
              ref={articleContentRef}
              className={`markdown-reader-content space-y-6 ${fontSizeClass}`}
            >
              <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Enhanced H1
                h1: ({ children }) => {
                  const text = String(children);
                  const slug = getHeadingSlug(text);
                  return (
                    <div className="pb-4 mb-6 border-b border-slate-200/80" id={`heading-${slug}`}>
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full mb-2">
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span>Encyclopedia Module</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 group flex items-center gap-2">
                        <span>{children}</span>
                      </h1>
                    </div>
                  );
                },

                // Enhanced H2: Formatted as distinct hardware concept cards & section dividers
                h2: ({ children }) => {
                  const text = String(children);
                  const slug = getHeadingSlug(text);
                  return (
                    <div className="pt-7 pb-2.5 border-t border-slate-200/80 mt-9 group scroll-mt-20" id={`heading-${slug}`}>
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-br from-indigo-500 to-cyan-500 shrink-0" />
                        <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 flex-1">
                          {children}
                        </h2>
                      </div>
                    </div>
                  );
                },

                // Enhanced H3: Subsection pill
                h3: ({ children }) => {
                  const text = String(children);
                  const slug = getHeadingSlug(text);
                  return (
                    <div className="pt-4 mt-5 scroll-mt-20" id={`heading-${slug}`}>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                        <span className="text-indigo-500 font-mono text-sm">#</span>
                        <span>{children}</span>
                      </h3>
                    </div>
                  );
                },

                // Enhanced H4
                h4: ({ children }) => (
                  <h4 className="text-sm sm:text-base font-bold text-slate-700 pt-2 mt-3">
                    {children}
                  </h4>
                ),

                // Enhanced Paragraph with Process Pipeline, Math Equation & Hardware Metadata Detection
                p: ({ children }) => {
                  const textContent = Array.isArray(children)
                    ? children.map(c => (typeof c === 'string' ? c : '')).join('')
                    : typeof children === 'string' ? children : '';

                  // Check if this paragraph is a centered mathematical formula block: "$$...$$"
                  const trimmedMath = textContent.trim();
                  if (trimmedMath.startsWith('$$') && trimmedMath.endsWith('$$')) {
                    const formula = cleanFormulaString(trimmedMath.replace(/^\$\$|\$\$$/g, ''));
                    return (
                      <div className="my-4 p-4 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner border border-slate-800 flex items-center justify-between gap-3 group">
                        <div className="flex items-center gap-3 overflow-x-auto flex-1">
                          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-bold tracking-wider shrink-0 uppercase">
                            FORMULA
                          </span>
                          <div className="whitespace-pre-wrap font-mono leading-relaxed text-slate-100 font-medium">
                            {formula}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Check if this paragraph is a process pipeline: e.g. "RTL → Synthesis → Physical Design → Signoff → Tapeout"
                  if (isProcessPipeline(textContent)) {
                    const steps = textContent.split(/\s*(?:→|->|=>)\s*/).filter(Boolean);
                    return (
                      <div className="my-5 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 text-white shadow-md border border-slate-800">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Hardware Engineering Process Sequence</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {steps.map((step, idx) => (
                            <React.Fragment key={idx}>
                              <div className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-medium text-white transition-colors flex items-center gap-1.5">
                                <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] flex items-center justify-center font-bold">
                                  {idx + 1}
                                </span>
                                <span>{step}</span>
                              </div>
                              {idx < steps.length - 1 && (
                                <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Check if this paragraph is a specialized hardware section label (e.g. "Applications:", "Importance:")
                  const labelMeta = getSectionLabelMeta(textContent);
                  if (labelMeta && textContent.trim().length <= 25) {
                    const LabelIcon = labelMeta.icon;
                    return (
                      <div className="mt-4 mb-2">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${labelMeta.color}`}>
                          <LabelIcon className="w-3.5 h-3.5" />
                          <span>{labelMeta.label}</span>
                        </span>
                      </div>
                    );
                  }

                  return (
                    <p className={`my-3 leading-relaxed text-slate-700 ${themeClasses.body}`}>
                      {children}
                    </p>
                  );
                },

                // Enhanced Bulleted Lists
                ul: ({ children }) => (
                  <ul className="my-3 space-y-2 pl-1">
                    {children}
                  </ul>
                ),

                // Enhanced Numbered Lists
                ol: ({ children }) => (
                  <ol className="my-3 space-y-2 pl-2 list-decimal list-inside text-slate-700">
                    {children}
                  </ol>
                ),

                // Enhanced List Item with custom marker
                li: ({ children }) => {
                  return (
                    <li className="flex items-start gap-2.5 text-slate-700 text-left">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                      <span className="flex-1 leading-relaxed">{children}</span>
                    </li>
                  );
                },

                // Checkbox input for tasklists
                input: ({ type, checked, ...props }) => {
                  if (type === 'checkbox') {
                    return (
                      <span className="inline-flex items-center mr-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          readOnly
                          className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                          {...props}
                        />
                      </span>
                    );
                  }
                  return <input type={type} {...props} />;
                },

                // Enhanced Blockquote / Callouts
                blockquote: ({ children }) => {
                  return (
                    <blockquote className={`my-5 p-4 rounded-xl border-l-4 shadow-2xs ${themeClasses.blockquote}`}>
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                        <div className="flex-1 text-xs sm:text-sm leading-relaxed italic">
                          {children}
                        </div>
                      </div>
                    </blockquote>
                  );
                },

                // Enhanced Horizontal Rule
                hr: () => (
                  <div className="relative my-8 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative inline-block px-3 bg-white text-slate-400 text-xs font-mono">
                      ✦ ✦ ✦
                    </div>
                  </div>
                ),

                // Enhanced Code and Code Blocks
                code: ({ className, children, ...props }) => {
                  const isInline = !className && !String(children).includes('\n');
                  if (isInline) {
                    return (
                      <code className={`px-1.5 py-0.5 rounded text-xs font-mono font-medium ${themeClasses.codeInline}`}>
                        {children}
                      </code>
                    );
                  }

                  // Multiline Code Block
                  const codeText = String(children).replace(/\n$/, '');
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1].toUpperCase() : 'CODE';

                  return <CodeBlock codeText={codeText} language={language} />;
                },

                // Enhanced Table with horizontal scrolling and crisp typography
                table: ({ children }) => (
                  <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs bg-white/95">
                    <table className="w-full min-w-[660px] text-left border-collapse text-xs sm:text-sm">
                      {children}
                    </table>
                  </div>
                ),

                thead: ({ children }) => (
                  <thead className={`border-b font-bold uppercase tracking-wider text-[11px] ${themeClasses.tableHeader}`}>
                    {children}
                  </thead>
                ),

                tbody: ({ children }) => (
                  <tbody className="divide-y divide-slate-100">
                    {children}
                  </tbody>
                ),

                tr: ({ children }) => (
                  <tr className={`transition-colors ${themeClasses.tableRowAlt}`}>
                    {children}
                  </tr>
                ),

                th: ({ children }) => (
                  <th className={`p-3.5 font-bold tracking-wide border-r last:border-r-0 ${
                    themeMode === 'dark'
                      ? 'text-slate-100 border-slate-700 bg-slate-900/90'
                      : themeMode === 'sepia'
                      ? 'text-[#2c261e] border-[#dacfc0] bg-[#ece4d6]'
                      : 'text-slate-900 border-slate-200 bg-slate-100/90'
                  }`}>
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td className={`p-3.5 leading-relaxed font-normal border-r last:border-r-0 ${
                    themeMode === 'dark'
                      ? 'text-slate-200 border-slate-800'
                      : themeMode === 'sepia'
                      ? 'text-[#38332b] border-[#e8dfcf]'
                      : 'text-slate-800 border-slate-200/70'
                  }`}>
                    {children}
                  </td>
                ),

                // Enhanced Anchor link
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2 transition-colors"
                  >
                    <span>{children}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )
              }}
            >
              {humanReadableMarkdown}
            </Markdown>
          </article>
        </div>
      )}
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900 text-white shadow-xl hover:bg-indigo-600 transition-all cursor-pointer flex items-center justify-center border border-white/20"
          title="Scroll Back to Top of Document"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Document Footer: Next / Previous Module & Status Completion */}
      <div className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${themeClasses.footer}`}>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleStudied}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
              isStudied
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border-slate-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isStudied ? 'Mastered & Completed' : 'Mark Topic as Completed'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          {prevDoc && (
            <button
              onClick={() => onNavigateDoc(prevDoc)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white rounded-lg border border-slate-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span className="truncate max-w-[120px] sm:max-w-[160px]">{prevDoc.title}</span>
            </button>
          )}

          {nextDoc && (
            <button
              onClick={() => onNavigateDoc(nextDoc)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white rounded-lg border border-slate-300 transition-colors cursor-pointer"
            >
              <span className="truncate max-w-[120px] sm:max-w-[160px]">{nextDoc.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          )}
        </div>
      </div>

      {/* Floating Action Pill over Selected Text */}
      {selectionPos && selectedSnippet && (
        <div
          id="floating-selection-pill"
          className="fixed z-40 -translate-x-1/2 -translate-y-full mb-3 pointer-events-auto transition-all duration-150 animate-fadeIn"
          style={{
            left: `${selectionPos.x}px`,
            top: `${selectionPos.y}px`,
          }}
        >
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleOpenSelectionDeepDive(selectedSnippet);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold shadow-2xl border border-indigo-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-sm whitespace-nowrap"
            title="Deep Dive this selected text with Gemini AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
            <span>Deep Dive with Gemini AI</span>
          </button>
        </div>
      )}

      {/* Real-Time Pop Page Modal (Gemini AI Deep Dive) */}
      {isPopPageOpen && (
        <div
          id="deep-dive-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
        >
          <div
            className={`relative flex flex-col bg-white rounded-2xl shadow-2xl border border-indigo-100 transition-all overflow-hidden ${
              isPopPageFullscreen
                ? 'w-full h-full rounded-none'
                : 'w-full max-w-4xl max-h-[90vh]'
            }`}
          >
            {/* Pop Page Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-md shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      Gemini Silicon Deep Dive
                    </h3>
                    {isStreaming ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span>Real-Time Streaming</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Synthesis Complete</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-indigo-200/80 truncate mt-0.5 font-mono">
                    Target Concept: &ldquo;{popPageTitle}&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {/* Copy Markdown */}
                <button
                  onClick={handleCopyPopPage}
                  className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title="Copy Deep Dive markdown"
                >
                  {hasCopiedPopPage ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setIsPopPageFullscreen(!isPopPageFullscreen)}
                  className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer hidden sm:block"
                  title={isPopPageFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isPopPageFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                {/* Close Button */}
                <button
                  onClick={() => {
                    if (abortControllerRef.current) abortControllerRef.current.abort();
                    setIsPopPageOpen(false);
                  }}
                  className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close Deep Dive (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Selected Target Excerpt Bar */}
            <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 shrink-0 gap-3">
              <div className="flex items-center gap-2 truncate min-w-0">
                <span className="font-semibold text-slate-700 shrink-0">Focus:</span>
                <span className="font-mono text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 truncate">
                  {popPageTitle}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {isStreaming ? (
                  <button
                    onClick={() => {
                      if (abortControllerRef.current) abortControllerRef.current.abort();
                      setIsStreaming(false);
                    }}
                    className="text-[11px] font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-0.5 rounded-md cursor-pointer transition-colors"
                  >
                    Stop Streaming
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenSelectionDeepDive(popPageTitle)}
                    className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-0.5 rounded-md cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    <span>Regenerate</span>
                  </button>
                )}
              </div>
            </div>

            {/* Pop Page Content Area */}
            <div
              ref={popPageContentRef}
              className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 bg-white text-slate-900"
            >
              {popPageText ? (
                <div className="markdown-reader-content space-y-4 text-sm sm:text-base leading-relaxed">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-xl sm:text-2xl font-black text-slate-900 pb-3 border-b border-slate-200 mb-4 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                          <span>{children}</span>
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 pt-4 pb-1 border-t border-slate-100 mt-6 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-sm bg-gradient-to-br from-indigo-500 to-cyan-500 shrink-0" />
                          <span>{children}</span>
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-sm sm:text-base font-semibold text-slate-800 pt-2 mt-3 flex items-center gap-1.5">
                          <span className="text-indigo-500 font-mono text-xs">#</span>
                          <span>{children}</span>
                        </h3>
                      ),
                      p: ({ children }) => {
                        const text = Array.isArray(children)
                          ? children.map((c) => (typeof c === 'string' ? c : '')).join('')
                          : typeof children === 'string'
                          ? children
                          : '';
                        const trimmed = text.trim();
                        if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
                          const formula = cleanFormulaString(trimmed.replace(/^\$\$|\$\$$/g, ''));
                          return (
                            <div className="my-3 p-3.5 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner border border-slate-800">
                              <span className="text-[10px] uppercase font-bold text-cyan-500 tracking-wider block mb-1">
                                Formula Derivation
                              </span>
                              <div className="text-slate-100 font-medium whitespace-pre-wrap">{formula}</div>
                            </div>
                          );
                        }
                        return <p className="text-slate-700 leading-relaxed my-2">{children}</p>;
                      },
                      code: ({ className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeString = String(children).replace(/\n$/, '');
                        if (match) {
                          return <CodeBlock codeText={codeString} language={match[1]} />;
                        }
                        return (
                          <code
                            className="px-1.5 py-0.5 rounded font-mono text-xs bg-slate-100 text-indigo-700 border border-slate-200"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      blockquote: ({ children }) => (
                        <blockquote className="my-3 pl-4 border-l-3 border-indigo-500 bg-indigo-50/60 py-2 pr-3 rounded-r-lg text-slate-800 text-sm italic">
                          {children}
                        </blockquote>
                      ),
                      ul: ({ children }) => (
                        <ul className="my-2 space-y-1.5 list-disc list-outside pl-5 text-slate-700">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="my-2 space-y-1.5 list-decimal list-outside pl-5 text-slate-700">
                          {children}
                        </ol>
                      ),
                      table: ({ children }) => (
                        <div className="my-4 overflow-x-auto rounded-xl border border-slate-200">
                          <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-slate-100 text-slate-800 font-bold">{children}</thead>
                      ),
                      tbody: ({ children }) => (
                        <tbody className="divide-y divide-slate-100 bg-white">{children}</tbody>
                      ),
                      th: ({ children }) => (
                        <th className="px-3 py-2 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="px-3 py-2 text-slate-600 whitespace-normal">{children}</td>
                      ),
                    }}
                  >
                    {cleanMarkdownMathForHumans(popPageText)}
                  </Markdown>
                  {isStreaming && (
                    <span className="inline-block w-2 h-4 ml-1 bg-indigo-600 animate-pulse align-middle" />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                  <p className="text-sm font-semibold text-slate-800">
                    Connecting to Gemini Silicon AI Engine...
                  </p>
                  <p className="text-xs text-slate-500 max-w-md">
                    Synthesizing first-principles physics, mathematical derivations, 3nm/2nm GAAFET silicon realities, and interview questions for &ldquo;{popPageTitle}&rdquo;.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal Code Block Component with Copy Code Button and Language Badge
const CodeBlock: React.FC<{ codeText: string; language: string }> = ({ codeText, language }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="my-5 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-md">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono">
        <span className="text-cyan-400 font-bold tracking-wider">{language}</span>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text */}
      <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-200">
        <code>{codeText}</code>
      </pre>
    </div>
  );
};
