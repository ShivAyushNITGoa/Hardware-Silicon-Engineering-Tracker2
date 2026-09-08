/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
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
  HelpCircle, 
  Send, 
  Calendar, 
  FileText,
  Zap,
  GraduationCap,
  Download,
  WifiOff,
  RefreshCw,
  Cpu,
  Library,
  CheckCircle2,
  Flame,
  Grid,
  Briefcase
} from 'lucide-react';

import { usePWA } from './hooks/usePWA';
import { PWAInstallModal } from './components/PWAInstallModal';
import { DashboardOverview } from './components/DashboardOverview';
import { CurriculumView } from './components/CurriculumView';
import { CareerPrepRoadmapView } from './components/CareerPrepRoadmapView';
import { EceEeeCareersView } from './components/EceEeeCareersView';
import { EceEeePrepTracksView } from './components/EceEeePrepTracksView';
import { NitGoaStrategySection } from './components/NitGoaStrategySection';
import { NitGoaReportExportView } from './components/NitGoaReportExportView';
import { ClassificationMatrixSection } from './components/ClassificationMatrixSection';
import { EncyclopediaView } from './components/EncyclopediaView';
import { CompaniesPipelineView } from './components/CompaniesPipelineView';
import { InstitutionsResearchView } from './components/InstitutionsResearchView';
import { ToolsMasterView } from './components/ToolsMasterView';
import { FlagshipProjectsView } from './components/FlagshipProjectsView';
import { HabitsRulesView } from './components/HabitsRulesView';
import { InterviewDrillsView } from './components/InterviewDrillsView';
import { EcosystemOutreachView } from './components/EcosystemOutreachView';
import { WeeklyPlannerView } from './components/WeeklyPlannerView';
import { ResumePortfolioGenerator } from './components/ResumePortfolioGenerator';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { BrandLogo, GDevelopersIcon } from './components/BrandLogo';
import { getCheckedSubtopics, getStudiedEncyclopediaDocs, getCheckedToolSkills } from './utils/storage';
import { initialCurriculum } from './data/curriculumData';
import { flatEncyclopediaDocs } from './data/encyclopediaData';

export type Tab = 
  | 'dashboard' 
  | 'career_prep'
  | 'ece_eee_careers'
  | 'ece_eee_prep'
  | 'classification'
  | 'nit_goa_strategy'
  | 'nit_goa_report'
  | 'encyclopedia' 
  | 'curriculum' 
  | 'planner'
  | 'projects' 
  | 'tools' 
  | 'interviews'
  | 'institutions'
  | 'companies' 
  | 'outreach'
  | 'resume'
  | 'habits_rules';

const TAB_LABELS: Record<Tab, { title: string; category: string }> = {
  dashboard: { title: 'Command Center', category: 'Executive Overview' },
  career_prep: { title: 'Career Prep Roadmap', category: '10 Tracks & Free Platforms' },
  ece_eee_careers: { title: 'ECE & EEE Career Report', category: 'Beyond VLSI & Embedded • 6 Core Fields' },
  ece_eee_prep: { title: 'ECE & EEE Prep Tracks', category: '16-Wk Roadmaps, Free EDA, Capstones & Drills' },
  classification: { title: 'Domain Classification', category: 'Frontend / Backend • Jobs, Skills & Knowledge' },
  nit_goa_strategy: { title: 'NIT Goa EEE → VLSI Roadmap', category: '6th Sem Plan & Electives' },
  nit_goa_report: { title: 'Full Academic Strategy Report', category: 'NIT Goa EEE → VLSI • 9 Sections & Export' },
  encyclopedia: { title: 'Semiconductor Encyclopedia', category: '18 Volumes • 336 Docs' },
  curriculum: { title: 'Curriculum & 15 Subtopics', category: 'Technical Foundation' },
  planner: { title: '20-Week Master Plan', category: 'Milestones & Sunday Gates' },
  projects: { title: 'Flagship Projects', category: 'Silicon & Embedded Builds' },
  tools: { title: 'EDA & Toolchains', category: 'Hands-on Skill Mastery' },
  interviews: { title: 'Interview Whiteboard', category: 'MNC Technical Drills' },
  institutions: { title: 'IITs, NITs & Research Labs', category: '37 Premier Fellowships' },
  companies: { title: 'Indian Fabless & MNCs', category: '60+ Firms & Startups' },
  outreach: { title: 'DLI & Cold Outreach', category: 'Direct Hiring Playbook' },
  resume: { title: 'Resume & Portfolio', category: 'ATS Proof of Work' },
  habits_rules: { title: 'Habits & 10 Rules', category: 'Execution Discipline' }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedEceFieldId, setSelectedEceFieldId] = useState<string>('telecom-wireless');
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Progressive Web App hook
  const { 
    isInstallable, 
    isInstalled, 
    isOnline, 
    installApp
  } = usePWA();

  // Study Progress Summary for header stats
  const studyProgress = useMemo(() => {
    const checkedSubs = getCheckedSubtopics();
    const studiedDocs = getStudiedEncyclopediaDocs();
    const checkedTools = getCheckedToolSkills();

    let totalSubs = 0;
    let doneSubs = 0;
    initialCurriculum.forEach(track => {
      track.topics.forEach(tp => {
        tp.subtopics.forEach(st => {
          totalSubs++;
          if (checkedSubs[st.id]) doneSubs++;
        });
      });
    });

    const totalDocs = flatEncyclopediaDocs.length;
    const doneDocs = flatEncyclopediaDocs.filter(d => studiedDocs[d.path]).length;
    const toolsDone = Object.values(checkedTools).filter(Boolean).length;

    return {
      doneSubs,
      totalSubs,
      subsPercent: totalSubs > 0 ? Math.round((doneSubs / totalSubs) * 100) : 0,
      doneDocs,
      totalDocs,
      docsPercent: totalDocs > 0 ? Math.round((doneDocs / totalDocs) * 100) : 0,
      toolsDone
    };
  }, [activeTab]);

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
        setIsSidebarOpen(prev => !prev);
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
    setIsMobileDrawerOpen(false);
    // Smooth scroll to top of main container
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans flex flex-col antialiased">
      {/* Offline Status Warning Bar */}
      {!isOnline && (
        <div className="bg-amber-600 text-white px-4 py-1.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline Mode Active — 100% of study modules, 80+ companies & notes remain fully accessible.</span>
        </div>
      )}
      
      {/* Top Global Command Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 px-3 sm:px-5 py-2.5 flex items-center justify-between shadow-2xs">
        {/* Left: Mobile Menu Toggle, Brand Logo & Breadcrumb */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          {/* Mobile Hamburger Drawer Trigger */}
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo & Name */}
          <div 
            onClick={() => handleTabChange('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          >
            <BrandLogo size="md" variant="full" theme="light" subtitle="Silicon Engineering OS • Ayush Kumar" />
          </div>

          <div className="h-4 w-px bg-neutral-200 hidden sm:block mx-1 shrink-0" />

          {/* Breadcrumb Indicator - hidden on xs phones to guarantee full logo prominence */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 truncate sm:max-w-xs md:max-w-md">
            <span className="hidden md:inline font-medium text-neutral-400">
              {TAB_LABELS[activeTab]?.category || 'Section'}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300 hidden md:inline shrink-0" />
            <span className="font-bold text-neutral-900 truncate">
              {TAB_LABELS[activeTab]?.title || 'Dashboard'}
            </span>
          </div>
        </div>

        {/* Right: Quick Action Controls & Live Study Badges */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Live Progress Pill */}
          <div 
            onClick={() => handleTabChange('encyclopedia')}
            className="hidden xl:flex items-center gap-2 px-2.5 py-1 bg-neutral-50 border border-neutral-200 rounded-lg text-[11px] font-medium text-neutral-700 cursor-pointer hover:bg-neutral-100 transition-colors"
            title="Curriculum & Encyclopedia Study Progress"
          >
            <div className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{studyProgress.doneSubs}/{studyProgress.totalSubs} Subs</span>
            </div>
            <span className="text-neutral-300">&bull;</span>
            <div className="flex items-center gap-1 text-indigo-700 font-semibold">
              <Library className="w-3.5 h-3.5" />
              <span>{studyProgress.doneDocs}/336 Docs</span>
            </div>
          </div>

          {/* Quick Search Button / Command Palette Trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-600 hover:text-neutral-900 border border-neutral-200/60 text-xs font-medium transition-all shadow-2xs cursor-pointer"
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
              onClick={() => handleTabChange('interviews')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
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
        
        {/* Desktop Collapsible Left Navigation Sidebar (Hidden on mobile < md) */}
        <aside className={`hidden md:flex flex-col bg-white border-r border-neutral-200 shrink-0 sticky top-[49px] h-[calc(100vh-49px)] overflow-y-auto z-20 transition-all duration-200 shadow-2xs ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}>
          <div className="p-3 flex flex-col h-full justify-between">
            <div className="space-y-4">
              {/* Sidebar Header & Toggle Button */}
              <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} px-1`}>
                {isSidebarOpen ? (
                  <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                    Navigation
                  </span>
                ) : null}
                
                <button
                  onClick={() => setIsSidebarOpen(prev => !prev)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                  title={isSidebarOpen ? 'Collapse sidebar (Ctrl+B)' : 'Expand sidebar (Ctrl+B)'}
                  aria-label="Toggle navigation sidebar"
                >
                  {isSidebarOpen ? (
                    <PanelLeftClose className="w-4 h-4" />
                  ) : (
                    <PanelLeftOpen className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Nav Items */}
              <nav className="space-y-1">
                {renderNavItems(activeTab, handleTabChange, !isSidebarOpen)}
              </nav>
            </div>

            {/* Bottom Target Card (Visible when expanded) */}
            {isSidebarOpen ? (
              <div className="pt-4 border-t border-neutral-100">
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <BrandLogo size="sm" variant="full" theme="light" />
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-900 border border-cyan-300">OS</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-snug">
                    Curated &amp; Architected by <span className="font-semibold text-neutral-900">Ayush Kumar</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-neutral-100 flex justify-center">
                <div className="p-1 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer" title="The GDevelopers Silicon OS">
                  <GDevelopersIcon className="w-7 h-7" />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Slide-Over Off-Canvas Drawer (Visible when isMobileDrawerOpen is true) */}
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div 
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
            />
            
            {/* Drawer Content */}
            <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-xl flex flex-col justify-between p-4 overflow-y-auto animate-in slide-in-from-left duration-200">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <BrandLogo size="sm" variant="full" theme="light" subtitle="Silicon OS • Ayush Kumar" />
                  <button
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Items */}
                <nav className="space-y-1">
                  {renderNavItems(activeTab, handleTabChange, false)}
                </nav>
              </div>

              {/* Drawer Footer */}
              <div className="pt-4 border-t border-neutral-100">
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-center text-xs text-neutral-600 space-y-1.5">
                  <div className="flex justify-center">
                    <BrandLogo size="xs" variant="full" theme="light" />
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium">Silicon OS Author: Ayush Kumar</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Workspace (padded bottom on mobile to accommodate bottom nav bar) */}
        <main className="flex-1 p-3.5 sm:p-6 md:p-8 lg:p-10 max-w-6xl mx-auto overflow-y-auto w-full transition-all pb-24 md:pb-12">
          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in duration-200">
              <DashboardOverview onNavigate={(tab) => handleTabChange(tab as any)} />
            </div>
          )}

          {activeTab === 'career_prep' && (
            <div className="animate-in fade-in duration-200">
              <CareerPrepRoadmapView />
            </div>
          )}

          {activeTab === 'ece_eee_careers' && (
            <div className="animate-in fade-in duration-200">
              <EceEeeCareersView 
                onNavigateToCareerPrep={() => handleTabChange('career_prep')}
                onNavigateToTools={() => handleTabChange('tools')}
                onNavigateToCurriculum={() => handleTabChange('curriculum')}
                onNavigateToPrep={(fieldId) => {
                  if (fieldId) setSelectedEceFieldId(fieldId);
                  handleTabChange('ece_eee_prep');
                }}
              />
            </div>
          )}

          {activeTab === 'ece_eee_prep' && (
            <div className="animate-in fade-in duration-200">
              <EceEeePrepTracksView
                initialFieldId={selectedEceFieldId}
                onNavigateToCareers={(fieldId) => {
                  handleTabChange('ece_eee_careers');
                }}
                onNavigateToTools={() => handleTabChange('tools')}
              />
            </div>
          )}

          {activeTab === 'classification' && (
            <div className="animate-in fade-in duration-200">
              <ClassificationMatrixSection 
                onNavigateToCurriculum={() => handleTabChange('curriculum')}
                onNavigateToCareerPrep={() => handleTabChange('career_prep')}
                onNavigateToEncyclopedia={() => handleTabChange('encyclopedia')}
                onNavigateToTools={() => handleTabChange('tools')}
              />
            </div>
          )}

          {activeTab === 'nit_goa_strategy' && (
            <div className="animate-in fade-in duration-200">
              <NitGoaStrategySection 
                onNavigateToCurriculum={() => handleTabChange('curriculum')}
                onNavigateToCareerPrep={() => handleTabChange('career_prep')}
                onNavigateToCompanies={() => handleTabChange('companies')}
                onNavigateToTools={() => handleTabChange('tools')}
                onNavigateToInterviews={() => handleTabChange('interviews')}
                onNavigateToReport={() => handleTabChange('nit_goa_report')}
              />
            </div>
          )}

          {activeTab === 'nit_goa_report' && (
            <div className="animate-in fade-in duration-200">
              <NitGoaReportExportView 
                onBackToStrategy={() => handleTabChange('nit_goa_strategy')}
                onNavigateToCompanies={() => handleTabChange('companies')}
              />
            </div>
          )}

          {activeTab === 'encyclopedia' && (
            <div className="animate-in fade-in duration-200">
              <EncyclopediaView />
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

      {/* Mobile Bottom Navigation Bar (Fixed at bottom on phones < md) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-2 py-1.5 flex justify-around items-center shadow-lg">
        <button
          onClick={() => handleTabChange('dashboard')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-lg min-w-[54px] cursor-pointer transition-colors ${
            activeTab === 'dashboard' ? 'text-neutral-900 font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Overview</span>
        </button>

        <button
          onClick={() => handleTabChange('encyclopedia')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-lg min-w-[54px] cursor-pointer transition-colors ${
            activeTab === 'encyclopedia' ? 'text-indigo-600 font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Library className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Library</span>
        </button>

        <button
          onClick={() => handleTabChange('curriculum')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-lg min-w-[54px] cursor-pointer transition-colors ${
            activeTab === 'curriculum' ? 'text-neutral-900 font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Curriculum</span>
        </button>

        <button
          onClick={() => handleTabChange('career_prep')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-lg min-w-[54px] cursor-pointer transition-colors ${
            activeTab === 'career_prep' ? 'text-cyan-600 font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Cpu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Tracks</span>
        </button>

        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex flex-col items-center justify-center p-1.5 rounded-lg min-w-[54px] text-neutral-500 hover:text-neutral-900 cursor-pointer transition-colors"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">More</span>
        </button>
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
    { id: 'career_prep', icon: <Cpu className="w-4 h-4 shrink-0 text-cyan-600" />, label: 'Career Prep Roadmap', badge: '10 Tracks' },
    { id: 'ece_eee_careers', icon: <Briefcase className="w-4 h-4 shrink-0 text-emerald-600" />, label: 'ECE & EEE Career Options', badge: '6 Fields' },
    { id: 'ece_eee_prep', icon: <Sparkles className="w-4 h-4 shrink-0 text-emerald-500" />, label: 'ECE & EEE Prep Tracks', badge: '16 Wks' },
    { id: 'classification', icon: <Layers className="w-4 h-4 shrink-0 text-indigo-600" />, label: 'Domain Classification', badge: 'Job/Skill/Theory' },
    { id: 'nit_goa_strategy', icon: <GraduationCap className="w-4 h-4 shrink-0 text-indigo-600" />, label: 'NIT Goa EEE → VLSI', badge: '6th Sem Plan' },
    { id: 'nit_goa_report', icon: <FileText className="w-4 h-4 shrink-0 text-emerald-600" />, label: 'Academic Report & Export', badge: 'Export .md' },
    { id: 'encyclopedia', icon: <Library className="w-4 h-4 shrink-0 text-indigo-600" />, label: 'Encyclopedia & Docs', badge: '18 Vols' },
    { id: 'curriculum', icon: <BookOpen className="w-4 h-4 shrink-0" />, label: 'Curriculum & Subtopics', badge: '15 Tracks' },
    { id: 'planner', icon: <Calendar className="w-4 h-4 shrink-0" />, label: '20-Week Master Plan', badge: 'Sunday Gate' },
    { id: 'projects', icon: <Rocket className="w-4 h-4 shrink-0" />, label: 'Flagship Projects', badge: '4 Builds' },
    { id: 'tools', icon: <Wrench className="w-4 h-4 shrink-0" />, label: 'EDA & Toolchains', badge: 'Tool Skills' },
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
      title={label}
      aria-label={label}
      className={`w-full flex items-center ${isCompact ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5'} rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
};
