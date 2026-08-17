/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
  BookOpen, 
  Rocket, 
  Building2, 
  Wrench, 
  ShieldAlert,
  Sparkles,
  Layers,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Maximize2,
  Minimize2,
  ChevronRight,
  Calculator, 
  HelpCircle, 
  Send, 
  Calendar, 
  FileText,
  Zap,
  GraduationCap,
  Download,
  WifiOff,
  RefreshCw
} from 'lucide-react';

import { usePWA } from './hooks/usePWA';
import { PWAInstallModal } from './components/PWAInstallModal';
import { DashboardOverview } from './components/DashboardOverview';
import { CurriculumView } from './components/CurriculumView';
import { CompaniesPipelineView } from './components/CompaniesPipelineView';
import { InstitutionsResearchView } from './components/InstitutionsResearchView';
import { ToolsMasterView } from './components/ToolsMasterView';
import { FlagshipProjectsView } from './components/FlagshipProjectsView';
import { HabitsRulesView } from './components/HabitsRulesView';
import { InteractiveToolsSuite } from './components/InteractiveToolsSuite';
import { InterviewDrillsView } from './components/InterviewDrillsView';
import { EcosystemOutreachView } from './components/EcosystemOutreachView';
import { WeeklyPlannerView } from './components/WeeklyPlannerView';
import { ResumePortfolioGenerator } from './components/ResumePortfolioGenerator';
import { CommandPaletteModal } from './components/CommandPaletteModal';

export type Tab = 
  | 'dashboard' 
  | 'curriculum' 
  | 'planner'
  | 'projects' 
  | 'tools' 
  | 'calculators'
  | 'interviews'
  | 'institutions'
  | 'companies' 
  | 'outreach'
  | 'resume'
  | 'habits_rules';

const TAB_LABELS: Record<Tab, { title: string; category: string }> = {
  dashboard: { title: 'Command Center', category: 'Executive Overview' },
  curriculum: { title: 'Curriculum & 15 Subtopics', category: 'Technical Foundation' },
  planner: { title: '20-Week Master Plan', category: 'Milestones & Sunday Gates' },
  projects: { title: 'Flagship Projects', category: 'Silicon & Embedded Builds' },
  tools: { title: 'EDA & Toolchains', category: 'Hands-on Skill Mastery' },
  calculators: { title: 'Silicon Calculators', category: 'STA, Q-Format, Power' },
  interviews: { title: 'Interview Whiteboard', category: 'MNC Technical Drills' },
  institutions: { title: 'IITs, NITs & Research Labs', category: '37 Premier Fellowships' },
  companies: { title: 'Indian Fabless & MNCs', category: '60+ Firms & Startups' },
  outreach: { title: 'DLI & Cold Outreach', category: 'Direct Hiring Playbook' },
  resume: { title: 'Resume & Portfolio', category: 'ATS Proof of Work' },
  habits_rules: { title: 'Habits & 10 Rules', category: 'Execution Discipline' }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Progressive Web App hook
  const { 
    isInstallable, 
    isInstalled, 
    isOnline, 
    isUpdateAvailable, 
    installApp, 
    updateApp 
  } = usePWA();

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette (Ctrl+K or Cmd+K)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      // Toggle Sidebar (Ctrl+B or Cmd+B)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsDesktopSidebarOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    // Smooth scroll to top of main container
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans flex flex-col">
      {/* Offline Status Warning Bar */}
      {!isOnline && (
        <div className="bg-amber-600 text-white px-4 py-1.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline Mode Active — 100% of study modules, 80+ companies, calculators & notes remain fully accessible.</span>
        </div>
      )}

      {/* SW Update Notification Bar */}
      {isUpdateAvailable && (
        <div className="bg-cyan-700 text-white px-4 py-2 text-xs font-medium flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>A new update is ready for your Silicon Tracker app!</span>
          </div>
          <button
            onClick={updateApp}
            className="px-3 py-1 bg-white text-cyan-900 rounded-lg text-xs font-bold hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Reload to Update
          </button>
        </div>
      )}
      
      {/* Top Global Command Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 px-3 sm:px-5 py-2.5 flex items-center justify-between shadow-2xs">
        {/* Left: Brand Logo & Name + Breadcrumb */}
        <div className="flex items-center gap-3">
          {/* Brand Logo & Name (Compact) */}
          <div 
            onClick={() => handleTabChange('dashboard')} 
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shadow-2xs group-hover:bg-neutral-800 transition-colors">
              H
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold tracking-tight text-neutral-900 group-hover:text-neutral-700">
                Hardware &amp; Silicon Engineering Tracker
              </span>
            </div>
          </div>

          <div className="h-4 w-px bg-neutral-200 hidden sm:block mx-1" />

          {/* Breadcrumb Indicator */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            <span className="hidden md:inline font-medium text-neutral-400">
              {TAB_LABELS[activeTab]?.category || 'Section'}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300 hidden md:inline shrink-0" />
            <span className="font-bold text-neutral-900 truncate">
              {TAB_LABELS[activeTab]?.title || 'Dashboard'}
            </span>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Search Button / Command Palette Trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-600 hover:text-neutral-900 border border-neutral-200/60 text-xs font-medium transition-all shadow-2xs cursor-pointer"
            title="Search anywhere (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden sm:inline">Search tracker...</span>
            <kbd className="text-[10px] font-semibold bg-white px-1.5 py-0.5 rounded border border-neutral-300/80 text-neutral-500 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Quick Shortcuts */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleTabChange('calculators')}
              className={`px-2.5 py-1.2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'calculators' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculators</span>
            </button>
            <button
              onClick={() => handleTabChange('interviews')}
              className={`px-2.5 py-1.2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'interviews' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>MNC Drills</span>
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 border border-transparent hover:border-neutral-200 transition-colors hidden sm:flex items-center justify-center cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex relative overflow-hidden">
        
        {/* Mobile Slide-in Drawer Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-neutral-900/50 z-40 md:hidden backdrop-blur-2xs animate-in fade-in duration-150"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Slide-in Navigation Drawer */}
        <div className={`fixed top-0 bottom-0 left-0 w-72 bg-white z-50 shadow-2xl md:hidden transform transition-transform duration-200 ease-in-out flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                H
              </div>
              <div>
                <h2 className="text-xs font-bold text-neutral-900">Hardware &amp; Silicon</h2>
                <p className="text-[10px] text-neutral-500 font-medium">Engineering Progress &amp; Pipeline Tracker</p>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 flex-1 overflow-y-auto space-y-1">
            {renderNavItems(activeTab, handleTabChange)}
          </div>

          <div className="p-3 border-t border-neutral-100 bg-neutral-50/70 space-y-2">
            {!isInstalled && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsInstallModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold shadow-xs hover:from-cyan-500 hover:to-blue-500 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Install PWA App</span>
              </button>
            )}

            <div className="p-2.5 rounded-xl bg-white border border-neutral-200/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Target Role
              </div>
              <p className="text-[11px] text-neutral-600">
                RTL Design • UVM Verification • FPGA • Embedded Linux
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Collapsible Left Sidebar */}
        <aside className={`hidden md:flex flex-col bg-white border-r border-neutral-200 flex-shrink-0 sticky top-[49px] h-[calc(100vh-49px)] overflow-y-auto z-20 transition-all duration-200 shadow-2xs ${
          isDesktopSidebarOpen ? 'w-64' : 'w-16'
        }`}>
          <div className="p-3 flex flex-col h-full justify-between">
            <div className="space-y-4">
              {/* Sidebar Header & Toggle Button */}
              <div className={`flex items-center ${isDesktopSidebarOpen ? 'justify-between' : 'justify-center'} px-1`}>
                {isDesktopSidebarOpen ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                      Navigation Menu
                    </span>
                  </div>
                ) : null}
                
                <button
                  onClick={() => setIsDesktopSidebarOpen(prev => !prev)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                  title={isDesktopSidebarOpen ? 'Collapse sidebar (Ctrl+B)' : 'Expand sidebar (Ctrl+B)'}
                >
                  {isDesktopSidebarOpen ? (
                    <PanelLeftClose className="w-4 h-4" />
                  ) : (
                    <PanelLeftOpen className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Nav Items */}
              <nav className="space-y-1">
                {renderNavItems(activeTab, handleTabChange, !isDesktopSidebarOpen)}
              </nav>
            </div>

            {/* Bottom Target Card (Visible when expanded) */}
            {isDesktopSidebarOpen ? (
              <div className="pt-4 border-t border-neutral-100">
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Target Role Mission
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-snug">
                    RTL Design &bull; ASIC Verification &bull; FPGA &bull; Embedded Firmware
                  </p>
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-neutral-100 flex justify-center">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500" title="Target: RTL & Verification">
                  <Zap className="w-4 h-4 text-amber-500" />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-6xl mx-auto overflow-y-auto w-full transition-all">
          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in duration-200">
              <DashboardOverview onNavigate={(tab) => handleTabChange(tab as any)} />
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="animate-in fade-in duration-200">
              <CurriculumView />
            </div>
          )}

          {activeTab === 'planner' && (
            <div className="animate-in fade-in duration-200">
              <WeeklyPlannerView />
            </div>
          )}

          {activeTab === 'companies' && (
            <div className="animate-in fade-in duration-200">
              <CompaniesPipelineView />
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="animate-in fade-in duration-200">
              <FlagshipProjectsView />
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="animate-in fade-in duration-200">
              <ToolsMasterView />
            </div>
          )}

          {activeTab === 'calculators' && (
            <div className="animate-in fade-in duration-200">
              <InteractiveToolsSuite />
            </div>
          )}

          {activeTab === 'interviews' && (
            <div className="animate-in fade-in duration-200">
              <InterviewDrillsView />
            </div>
          )}

          {activeTab === 'institutions' && (
            <div className="animate-in fade-in duration-200">
              <InstitutionsResearchView />
            </div>
          )}

          {activeTab === 'outreach' && (
            <div className="animate-in fade-in duration-200">
              <EcosystemOutreachView />
            </div>
          )}

          {activeTab === 'resume' && (
            <div className="animate-in fade-in duration-200">
              <ResumePortfolioGenerator />
            </div>
          )}

          {activeTab === 'habits_rules' && (
            <div className="animate-in fade-in duration-200">
              <HabitsRulesView />
            </div>
          )}
        </main>
      </div>

      {/* Global Command Palette Modal */}
      <CommandPaletteModal 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleTabChange}
      />

      {/* Progressive Web App Install Modal */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        onInstall={installApp}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        isOnline={isOnline}
      />
    </div>
  );
}

// Helper to render navigation items
function renderNavItems(
  activeTab: Tab, 
  onSelect: (tab: Tab) => void, 
  isCompact = false
) {
  const items: Array<{
    id: Tab;
    icon: React.ReactNode;
    label: string;
    badge?: string;
  }> = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-4 h-4 shrink-0" />, label: 'Command Center', badge: 'Overview' },
    { id: 'curriculum', icon: <BookOpen className="w-4 h-4 shrink-0" />, label: 'Curriculum & Subtopics', badge: '15 Tracks' },
    { id: 'planner', icon: <Calendar className="w-4 h-4 shrink-0" />, label: '20-Week Master Plan', badge: 'Sunday Gate' },
    { id: 'projects', icon: <Rocket className="w-4 h-4 shrink-0" />, label: 'Flagship Projects', badge: '4 Builds' },
    { id: 'tools', icon: <Wrench className="w-4 h-4 shrink-0" />, label: 'EDA & Toolchains', badge: 'Tool Skills' },
    { id: 'calculators', icon: <Calculator className="w-4 h-4 shrink-0" />, label: 'Silicon Calculators', badge: 'STA & Q-Format' },
    { id: 'interviews', icon: <HelpCircle className="w-4 h-4 shrink-0" />, label: 'Interview Whiteboard', badge: 'MNC Drills' },
    { id: 'institutions', icon: <GraduationCap className="w-4 h-4 shrink-0" />, label: 'IITs, NITs & Research Labs', badge: '37 Programs' },
    { id: 'companies', icon: <Building2 className="w-4 h-4 shrink-0" />, label: 'Indian Fabless & MNCs', badge: '60+ Firms' },
    { id: 'outreach', icon: <Send className="w-4 h-4 shrink-0" />, label: 'DLI & Cold Outreach', badge: 'Playbook' },
    { id: 'resume', icon: <FileText className="w-4 h-4 shrink-0" />, label: 'Resume & Portfolio', badge: 'ATS Evidence' },
    { id: 'habits_rules', icon: <ShieldAlert className="w-4 h-4 shrink-0" />, label: 'Habits & 10 Rules', badge: 'Execution' }
  ];

  return items.map(item => (
    <NavItem
      key={item.id}
      active={activeTab === item.id}
      onClick={() => onSelect(item.id)}
      icon={item.icon}
      label={item.label}
      badge={item.badge}
      isCompact={isCompact}
    />
  ));
}

interface NavItemProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  isCompact?: boolean;
}

// NavItem Component with Compact Mode support
const NavItem: React.FC<NavItemProps> = ({ 
  active, 
  onClick, 
  icon, 
  label,
  badge,
  isCompact = false
}) => {
  return (
    <button
      onClick={onClick}
      title={isCompact ? label : undefined}
      className={`w-full flex items-center ${isCompact ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2.5'} rounded-xl text-xs font-semibold transition-all ${
        active 
          ? 'bg-neutral-900 text-white shadow-xs' 
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {icon}
        {!isCompact && <span className="truncate">{label}</span>}
      </div>
      {!isCompact && badge && (
        <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ml-1.5 ${
          active ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-500'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

