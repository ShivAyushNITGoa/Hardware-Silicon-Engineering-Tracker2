import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  Layers, 
  GraduationCap, 
  Library, 
  BookOpen, 
  Calendar, 
  Rocket, 
  Wrench, 
  HelpCircle, 
  Building2, 
  Send, 
  FileText, 
  ShieldAlert, 
  Search, 
  X,
  ChevronRight,
  Sparkles,
  Briefcase,
  ShieldCheck
} from 'lucide-react';
import { Tab } from '../App';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: Tab) => void;
  isAdmin?: boolean;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tab: Tab;
  icon: React.ReactNode;
  badge?: string;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  isAdmin = false
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandItems: CommandItem[] = [
    {
      id: 'tab-dash',
      title: 'Command Center Dashboard',
      subtitle: 'Overall progress, metrics, and sprint status',
      category: 'Navigation',
      tab: 'dashboard',
      icon: <LayoutDashboard className="w-4 h-4 text-neutral-600" />,
      badge: 'Overview'
    },
    ...(isAdmin ? [{
      id: 'tab-admin-panel',
      title: 'Admin Panel (Cohort Tracker & Universal Data)',
      subtitle: 'Real-time multi-user cloud telemetry and universal database oversight',
      category: 'Administration',
      tab: 'admin_tracker' as Tab,
      icon: <ShieldCheck className="w-4 h-4 text-purple-600" />,
      badge: 'Admin Only'
    }] : []),
    {
      id: 'tab-career',
      title: 'Semiconductor Career Preparation Roadmap',
      subtitle: '10 Tracks: ASIC, UVM, FPGA, Embedded, RISC-V, Networking, Auto, Analog',
      category: 'Specializations',
      tab: 'career_prep',
      icon: <Cpu className="w-4 h-4 text-cyan-600" />,
      badge: '10 Tracks'
    },
    {
      id: 'tab-ece-eee-careers',
      title: 'ECE & EEE Career Options Report (Beyond VLSI & Embedded)',
      subtitle: 'Comprehensive 6 fields: 5G/6G Telecom, DSP/CV, Power Electronics & EV, Robotics, Smart Grids, PCB',
      category: 'Specializations',
      tab: 'ece_eee_careers',
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />,
      badge: '6 Fields'
    },
    {
      id: 'tab-ece-eee-prep',
      title: 'ECE & EEE Preparation Tracks & Toolchains (16-Week Roadmaps)',
      subtitle: 'Open-source EDA, lab workflows, capstone blueprints, and interview whiteboards for 6 fields',
      category: 'Specializations',
      tab: 'ece_eee_prep',
      icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
      badge: '16 Wks'
    },
    {
      id: 'tab-ev-power-electronics',
      title: 'Power Electronics & Electric Vehicles (EVs)',
      subtitle: 'Inverters, BMS, Motor Drives, SiC/GaN, Tata Motors, Ola, Tesla, Texas Instruments',
      category: 'Specializations',
      tab: 'ece_eee_careers',
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />,
      badge: 'Massive Demand'
    },
    {
      id: 'tab-telecom-5g-6g',
      title: 'Telecommunications & 5G/6G Wireless Networks',
      subtitle: 'RF Engineering, MIMO, Open RAN, Ericsson, Qualcomm, Nokia, Jio, Airtel',
      category: 'Specializations',
      tab: 'ece_eee_careers',
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />,
      badge: 'Telecom'
    },
    {
      id: 'tab-dsp-vision',
      title: 'Signal & Image Processing / Computer Vision',
      subtitle: 'FFT/Filter design, Edge AI, OpenCV, Audio/Speech, Medical Imaging, Sony, Bosch',
      category: 'Specializations',
      tab: 'ece_eee_careers',
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />,
      badge: 'DSP & CV'
    },
    {
      id: 'tab-robotics-automation',
      title: 'Robotics & Industrial Automation',
      subtitle: 'ROS/ROS2, PLC/SCADA, Kinematics, Control Systems, ABB, KUKA, FANUC, GreyOrange',
      category: 'Specializations',
      tab: 'ece_eee_careers',
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />,
      badge: 'Robotics'
    },
    {
      id: 'tab-smart-grids-renewables',
      title: 'Renewable Energy & Smart Grids',
      subtitle: 'Solar/Wind integration, Grid-tied inverters, SCADA, Microgrids, Schneider, Siemens',
      category: 'Specializations',
      tab: 'ece_eee_careers',
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />,
      badge: 'Green Energy'
    },
    {
      id: 'tab-pcb-hardware-eng',
      title: 'PCB Design & Hardware Engineering',
      subtitle: 'Altium/KiCad, High-speed signal integrity, EMI/EMC, Schematics, Multilayer routing',
      category: 'Specializations',
      tab: 'ece_eee_careers',
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />,
      badge: 'Hardware'
    },
    {
      id: 'tab-classification',
      title: 'Domain Classification Matrix',
      subtitle: 'Frontend vs. Backend VLSI • Job Roles, Required Skills & Theoretical Knowledge',
      category: 'Taxonomy',
      tab: 'classification',
      icon: <Layers className="w-4 h-4 text-indigo-600" />,
      badge: 'Matrix'
    },
    {
      id: 'tab-nitgoa',
      title: 'NIT Goa EEE → VLSI 6th Sem Roadmap',
      subtitle: 'Elective strategy (EE545, EE560, EE542), CGPA defense & lab timeline',
      category: 'College Strategy',
      tab: 'nit_goa_strategy',
      icon: <GraduationCap className="w-4 h-4 text-indigo-600" />,
      badge: 'NIT Goa'
    },
    {
      id: 'tab-nitgoa-report',
      title: 'Full Academic Report Viewer & Export (.md)',
      subtitle: 'Verbatim 9-section NIT Goa strategy document with copy & markdown export',
      category: 'College Strategy',
      tab: 'nit_goa_report',
      icon: <FileText className="w-4 h-4 text-emerald-600" />,
      badge: 'Report & Export'
    },
    {
      id: 'tab-encyclopedia',
      title: 'Complete Semiconductor Engineering Encyclopedia',
      subtitle: '18 Volumes: Fundamentals, Devices, IC Design, Fabrication, EDA Tools, Glossary, Roadmap',
      category: 'Documentation',
      tab: 'encyclopedia',
      icon: <Library className="w-4 h-4 text-indigo-600" />,
      badge: '18 Volumes'
    },
    {
      id: 'tab-curr',
      title: 'Curriculum & 15 Subtopic Tracks',
      subtitle: 'Digital Logic, Verilog, RISC-V, UVM, Embedded Linux, PD',
      category: 'Academics',
      tab: 'curriculum',
      icon: <BookOpen className="w-4 h-4 text-blue-600" />,
      badge: '15 Tracks'
    },
    {
      id: 'tab-plan',
      title: '20-Week Master Plan & Sunday Gates',
      subtitle: 'Week-by-week execution roadmap and exit gates',
      category: 'Execution',
      tab: 'planner',
      icon: <Calendar className="w-4 h-4 text-emerald-600" />,
      badge: '20 Weeks'
    },
    {
      id: 'tab-proj',
      title: 'Flagship Silicon & Embedded Projects',
      subtitle: 'RISC-V Core, UVM Environment, FireGuard RTL, High-Speed DMA',
      category: 'Portfolio',
      tab: 'projects',
      icon: <Rocket className="w-4 h-4 text-orange-600" />,
      badge: '4 Builds'
    },
    {
      id: 'tab-tool',
      title: 'EDA Toolchains & Mastery Skills',
      subtitle: 'Verilator, OpenLane, ModelSim, Vivado, Altium, KiCad',
      category: 'Hands-on',
      tab: 'tools',
      icon: <Wrench className="w-4 h-4 text-neutral-600" />,
      badge: 'Toolchains'
    },
    {
      id: 'tab-intv',
      title: 'Interview Whiteboard & MNC Drills',
      subtitle: 'Setup/Hold, CDC FIFO, UVM Phase, SPI/I2C, Linux Driver',
      category: 'Interviews',
      tab: 'interviews',
      icon: <HelpCircle className="w-4 h-4 text-amber-600" />,
      badge: 'Whiteboard'
    },
    {
      id: 'tab-inst',
      title: 'IITs, NITs & Research Fellowships',
      subtitle: 'IIT Madras SFP, IISc ESE/CeNSE, IITB IRCC, IITD SRFP, SPARK, SURE, C-DAC',
      category: 'Research',
      tab: 'institutions',
      icon: <GraduationCap className="w-4 h-4 text-teal-600" />,
      badge: '37 Programs'
    },
    {
      id: 'tab-comp',
      title: 'Indian Fabless & MNC Semiconductor Pipeline',
      subtitle: '60+ firms: Nvidia, Qualcomm, TI, Mindgrove, AGNIT, SCL',
      category: 'Companies',
      tab: 'companies',
      icon: <Building2 className="w-4 h-4 text-blue-600" />,
      badge: '60+ Firms'
    },
    {
      id: 'tab-outr',
      title: 'DLI & Cold Outreach Playbook',
      subtitle: 'Direct outreach templates for Founders, Directors, Recruiters',
      category: 'Networking',
      tab: 'outreach',
      icon: <Send className="w-4 h-4 text-indigo-600" />,
      badge: 'Playbook'
    },
    {
      id: 'tab-resm',
      title: 'ATS Resume & GitHub Portfolio Generator',
      subtitle: 'Generate tailored bullet points and portfolio READMEs',
      category: 'Career',
      tab: 'resume',
      icon: <FileText className="w-4 h-4 text-cyan-600" />,
      badge: 'Evidence'
    },
    {
      id: 'tab-rules',
      title: 'Habits Tracker & 10 Golden Rules',
      subtitle: 'Execution discipline, daily habits checklist, and academic protection',
      category: 'Discipline',
      tab: 'habits_rules',
      icon: <ShieldAlert className="w-4 h-4 text-rose-600" />,
      badge: 'Discipline'
    }
  ];

  const filteredItems = commandItems.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.badge && item.badge.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        onNavigate(filteredItems[selectedIndex].tab);
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-100 bg-neutral-50/70 gap-2">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a section name, tool, topic, or command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button 
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md cursor-pointer transition-colors"
              title="Clear search text"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            id="close-search-tracker-btn"
            onClick={onClose}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-200/60 hover:bg-neutral-200 rounded-lg cursor-pointer transition-colors shrink-0"
            title="Close Search Tracker (Esc)"
            aria-label="Close Search Tracker"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
            <kbd className="hidden sm:inline-block text-[9px] bg-white border border-neutral-300 text-neutral-500 font-mono px-1 rounded shadow-2xs">
              ESC
            </kbd>
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-neutral-50">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-sm">
              No matching sections found for &quot;{query}&quot;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.tab);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50 text-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs truncate">{item.title}</span>
                        {item.badge && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                            isSelected ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono bg-neutral-200 px-1 py-0.5 rounded-sm">↑</kbd> <kbd className="font-mono bg-neutral-200 px-1 py-0.5 rounded-sm">↓</kbd> to navigate</span>
            <span><kbd className="font-mono bg-neutral-200 px-1 py-0.5 rounded-sm">↵</kbd> to select</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1 font-medium text-neutral-600">
              <Sparkles className="w-3 h-3 text-cyan-600" /> Silicon Command Palette
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer px-2 py-0.5 rounded hover:bg-neutral-200/60 transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Close (Esc)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
