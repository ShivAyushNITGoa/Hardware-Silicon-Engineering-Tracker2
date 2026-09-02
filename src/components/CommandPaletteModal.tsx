import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  BookOpen, 
  Building2, 
  Wrench, 
  Rocket, 
  Calculator, 
  HelpCircle, 
  Calendar, 
  FileText, 
  ShieldAlert, 
  LayoutDashboard,
  ArrowRight,
  Send,
  X,
  Sparkles,
  GraduationCap,
  Cpu
} from 'lucide-react';
import { initialCurriculum } from '../data/curriculumData';
import { initialCompanies } from '../data/companiesData';
import { initialTools } from '../data/toolsData';
import { flagshipProjects } from '../data/projectsData';
import { initialInstitutions } from '../data/institutionsData';
import { initialCareerPrepTracks, initialProjectTrackerItems } from '../data/careerPrepData';
import { Tab } from '../App';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: Tab, payload?: any) => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Tabs' | 'Curriculum Track' | 'Company' | 'EDA Tool' | 'Project' | 'Research Fellowship' | 'Career Prep Track';
  tab: Tab;
  icon: React.ReactNode;
  badge?: string;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Build searchable items list
  const allItems: SearchItem[] = [
    // Tabs
    { id: 'tab-dash', title: 'Command Center Dashboard', subtitle: 'Overall progress, metrics, and sprint status', category: 'Tabs', tab: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" />, badge: 'Overview' },
    { id: 'tab-career', title: 'Semiconductor Career Preparation Dashboard', subtitle: '10 Tracks: ASIC, UVM, FPGA, Embedded, RISC-V, Networking, Auto, Analog', category: 'Tabs', tab: 'career_prep', icon: <Cpu className="w-4 h-4 text-cyan-600" />, badge: '10 Tracks' },
    { id: 'tab-curr', title: 'Curriculum & 15 Subtopic Tracks', subtitle: 'Digital Logic, Verilog, RISC-V, UVM, Embedded Linux, PD', category: 'Tabs', tab: 'curriculum', icon: <BookOpen className="w-4 h-4" />, badge: '15 Tracks' },
    { id: 'tab-plan', title: '20-Week Master Plan & Sunday Gates', subtitle: 'Week-by-week execution roadmap and exit gates', category: 'Tabs', tab: 'planner', icon: <Calendar className="w-4 h-4" />, badge: 'Execution' },
    { id: 'tab-proj', title: 'Flagship Silicon & Embedded Projects', subtitle: 'RISC-V Core, UVM Environment, Telemetry Node, TinyML', category: 'Tabs', tab: 'projects', icon: <Rocket className="w-4 h-4" />, badge: '4 Builds' },
    { id: 'tab-tool', title: 'EDA Toolchains & Mastery Skills', subtitle: 'Verilator, OpenLane, ModelSim, Vivado, Altium, KiCad', category: 'Tabs', tab: 'tools', icon: <Wrench className="w-4 h-4" />, badge: 'Toolchain' },
    { id: 'tab-calc', title: 'Silicon Calculators & STA Estimators', subtitle: 'Setup/Hold Slack, Q-Format, Clock Jitter, Power & IR Drop', category: 'Tabs', tab: 'calculators', icon: <Calculator className="w-4 h-4" />, badge: 'Interactive' },
    { id: 'tab-intv', title: 'Interview Whiteboard & MNC Drills', subtitle: 'Setup/Hold, CDC FIFO, UVM Phase, SPI/I2C, Linux Driver', category: 'Tabs', tab: 'interviews', icon: <HelpCircle className="w-4 h-4" />, badge: 'MNC Prep' },
    { id: 'tab-inst', title: 'IITs, NITs & Research Fellowships', subtitle: 'IIT Madras SFP, IISc ESE/CeNSE, IITB IRCC, IITD SRFP, SPARK, SURE, C-DAC', category: 'Tabs', tab: 'institutions', icon: <GraduationCap className="w-4 h-4" />, badge: '17 Labs' },
    { id: 'tab-comp', title: 'Indian Fabless & MNC Semiconductor Pipeline', subtitle: '60+ firms: Nvidia, Qualcomm, TI, Mindgrove, AGNIT, SCL', category: 'Tabs', tab: 'companies', icon: <Building2 className="w-4 h-4" />, badge: '60+ Firms' },
    { id: 'tab-outr', title: 'DLI & Cold Outreach Playbook', subtitle: 'Direct outreach templates for Founders, Directors, Recruiters', category: 'Tabs', tab: 'outreach', icon: <Send className="w-4 h-4" />, badge: 'Outreach' },
    { id: 'tab-resm', title: 'ATS Resume & GitHub Portfolio Generator', subtitle: 'Generate tailored bullet points and portfolio READMEs', category: 'Tabs', tab: 'resume', icon: <FileText className="w-4 h-4" />, badge: 'Resume' },
    { id: 'tab-rule', title: '10 Non-Negotiable Execution Rules', subtitle: 'Daily habits, Sunday exit gate rigor, and deep work rules', category: 'Tabs', tab: 'habits_rules', icon: <ShieldAlert className="w-4 h-4" />, badge: 'Habits' },

    // Curriculum Tracks
    ...initialCurriculum.map(track => ({
      id: `track-${track.id}`,
      title: track.name,
      subtitle: `${track.category} • ${track.plannedHours}h • ${track.currentFocus}`,
      category: 'Curriculum Track' as const,
      tab: 'curriculum' as Tab,
      icon: <BookOpen className="w-4 h-4 text-sky-600" />,
      badge: track.priority
    })),

    // Career Prep Specialization Tracks
    ...initialCareerPrepTracks.map(track => ({
      id: `career-track-${track.id}`,
      title: `${track.number}. ${track.title}`,
      subtitle: `${track.tagline} • Companies: ${track.companies.slice(0, 3).join(', ')}`,
      category: 'Career Prep Track' as const,
      tab: 'career_prep' as Tab,
      icon: <Cpu className="w-4 h-4 text-cyan-600" />,
      badge: `${track.tasks.length} Checkpoints`
    })),

    // Projects
    ...flagshipProjects.map(project => ({
      id: `proj-${project.id}`,
      title: project.name,
      subtitle: `${project.purpose.slice(0, 70)}... • Target: ${project.targetWeek}`,
      category: 'Project' as const,
      tab: 'projects' as Tab,
      icon: <Rocket className="w-4 h-4 text-emerald-600" />,
      badge: project.targetWeek
    })),

    // Tools
    ...initialTools.map(tool => ({
      id: `tool-${tool.id}`,
      title: tool.name,
      subtitle: `${tool.category} • ${tool.description}`,
      category: 'EDA Tool' as const,
      tab: 'tools' as Tab,
      icon: <Wrench className="w-4 h-4 text-amber-600" />,
      badge: tool.category
    })),

    // Companies
    ...initialCompanies.slice(0, 25).map(company => ({
      id: `comp-${company.id}`,
      title: `${company.name} (${company.locations.join(', ')})`,
      subtitle: `${company.tier} • Roles: ${company.roles.slice(0, 2).join(', ')}`,
      category: 'Company' as const,
      tab: 'companies' as Tab,
      icon: <Building2 className="w-4 h-4 text-purple-600" />,
      badge: company.tier
    })),

    // Institutional Research Fellowships & Labs
    ...initialInstitutions.map(inst => ({
      id: `inst-${inst.id}`,
      title: `${inst.shortName}: ${inst.programName}`,
      subtitle: `${inst.type} • ${inst.stipend} • ${inst.domains.slice(0, 2).join(', ')}`,
      category: 'Research Fellowship' as const,
      tab: 'institutions' as Tab,
      icon: <GraduationCap className="w-4 h-4 text-indigo-600" />,
      badge: inst.type
    }))
  ];

  // Filtered results
  const filteredItems = query.trim() === ''
    ? allItems.slice(0, 10)
    : allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 12);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  const handleSelect = (item: SearchItem) => {
    onNavigate(item.tab);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-3.5 border-b border-neutral-100 flex items-center gap-3 bg-neutral-50/70">
          <Search className="w-5 h-5 text-neutral-400 shrink-0 ml-1" />
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, track, tool, company, or calculator..."
            className="w-full bg-transparent text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-400 bg-white border border-neutral-200 rounded shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-2 overflow-y-auto divide-y divide-neutral-50 flex-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-500">
              <Sparkles className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between transition-colors ${
                    isSelected 
                      ? 'bg-neutral-900 text-white' 
                      : 'hover:bg-neutral-100 text-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isSelected ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate">{item.title}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          isSelected ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-500'
                        }`}>
                          {item.category}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 ${
                        isSelected ? 'text-neutral-300' : 'text-neutral-500'
                      }`}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full hidden sm:inline-block ${
                        isSelected ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-neutral-400'}`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 px-4">
          <div className="flex items-center gap-3">
            <span><kbd className="font-semibold bg-white border px-1 rounded">↑</kbd> <kbd className="font-semibold bg-white border px-1 rounded">↓</kbd> to navigate</span>
            <span><kbd className="font-semibold bg-white border px-1 rounded">↵</kbd> to select</span>
          </div>
          <span className="text-neutral-400">Ayush Silicon Quick Navigator</span>
        </div>
      </div>
    </div>
  );
};
