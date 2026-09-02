import React, { useState, useEffect, useMemo } from 'react';
import { MarkdownDocReader } from './MarkdownDocReader';
import {
  BookOpen,
  Search,
  Folder,
  FolderOpen,
  FileText,
  ExternalLink,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  Layers,
  Cpu,
  ArrowLeft,
  ArrowRight,
  Download,
  FolderGit2,
  Sparkles,
  RefreshCw,
  Library,
  Compass,
  CheckSquare,
  Square,
  Bookmark,
  Star,
  CheckCircle2,
  Clock,
  SlidersHorizontal,
  Menu,
  X,
  Eye,
  BookMarked
} from 'lucide-react';
import {
  encyclopediaVolumes,
  flatEncyclopediaDocs,
  EncyclopediaVolume,
  EncyclopediaFileItem,
  EncyclopediaFlatDoc
} from '../data/encyclopediaData';
import {
  getStudiedEncyclopediaDocs,
  saveStudiedEncyclopediaDocs,
  getBookmarkedEncyclopediaDocs,
  saveBookmarkedEncyclopediaDocs
} from '../utils/storage';

export const EncyclopediaView: React.FC = () => {
  // Currently selected volume
  const [selectedVolumeId, setSelectedVolumeId] = useState<string>('Volume_01_Fundamentals');
  
  // Currently selected document (default to Volume 01 README or first doc)
  const [currentDoc, setCurrentDoc] = useState<EncyclopediaFlatDoc>(() => {
    const defaultDoc = flatEncyclopediaDocs.find(
      d => d.path.includes('Volume_01_Fundamentals') && d.fileName.toLowerCase().includes('readme')
    ) || flatEncyclopediaDocs[0];
    return defaultDoc;
  });

  // Markdown content state
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Study & Tracking states persisted to localStorage
  const [studiedMap, setStudiedMap] = useState<Record<string, boolean>>(() => getStudiedEncyclopediaDocs());
  const [bookmarksMap, setBookmarksMap] = useState<Record<string, boolean>>(() => getBookmarkedEncyclopediaDocs());
  const [filterMode, setFilterMode] = useState<'all' | 'unstudied' | 'studied' | 'bookmarked'>('all');

  // Mobile directory drawer toggle
  const [isMobileDirectoryOpen, setIsMobileDirectoryOpen] = useState<boolean>(false);

  // Search query & expanded folders in tree
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  // Toggle studied status
  const toggleStudied = (docPath: string) => {
    const next = { ...studiedMap, [docPath]: !studiedMap[docPath] };
    setStudiedMap(next);
    saveStudiedEncyclopediaDocs(next);
  };

  // Toggle bookmark status
  const toggleBookmark = (docPath: string) => {
    const next = { ...bookmarksMap, [docPath]: !bookmarksMap[docPath] };
    setBookmarksMap(next);
    saveBookmarkedEncyclopediaDocs(next);
  };

  // Fetch markdown content whenever currentDoc changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    const targetUrl = `/encyclopedia/${currentDoc.path}`;
    fetch(targetUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.text();
      })
      .then(text => {
        if (!isCancelled) {
          setMarkdownContent(text);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (!isCancelled) {
          console.error('Failed to load markdown doc', err);
          setMarkdownContent(`# ${currentDoc.title}\n\n*Unable to load document content directly (${err.message}).*\n\nDocument path: \`Complete_Semiconductor_Engineering_Encyclopedia/${currentDoc.path}\``);
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [currentDoc]);

  // Selected volume object
  const selectedVolume = useMemo(() => {
    return encyclopediaVolumes.find(v => v.id === selectedVolumeId) || encyclopediaVolumes[2];
  }, [selectedVolumeId]);

  // Total and volume stats
  const totalStats = useMemo(() => {
    const total = flatEncyclopediaDocs.length;
    const studied = flatEncyclopediaDocs.filter(d => studiedMap[d.path]).length;
    const bookmarked = flatEncyclopediaDocs.filter(d => bookmarksMap[d.path]).length;
    const percent = total > 0 ? Math.round((studied / total) * 100) : 0;
    return { total, studied, bookmarked, percent };
  }, [studiedMap, bookmarksMap]);

  const volumeDocs = useMemo(() => {
    return flatEncyclopediaDocs.filter(d => d.volumeId === selectedVolume.id);
  }, [selectedVolume]);

  const volumeStats = useMemo(() => {
    const total = volumeDocs.length;
    const studied = volumeDocs.filter(d => studiedMap[d.path]).length;
    const percent = total > 0 ? Math.round((studied / total) * 100) : 0;
    return { total, studied, percent };
  }, [volumeDocs, studiedMap]);

  // Filtered documents in current volume based on study status
  const displayedVolumeDocs = useMemo(() => {
    if (filterMode === 'all') return volumeDocs;
    if (filterMode === 'studied') return volumeDocs.filter(d => studiedMap[d.path]);
    if (filterMode === 'unstudied') return volumeDocs.filter(d => !studiedMap[d.path]);
    if (filterMode === 'bookmarked') return volumeDocs.filter(d => bookmarksMap[d.path]);
    return volumeDocs;
  }, [volumeDocs, filterMode, studiedMap, bookmarksMap]);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return flatEncyclopediaDocs.filter(d => 
      d.title.toLowerCase().includes(q) ||
      d.fileName.toLowerCase().includes(q) ||
      d.path.toLowerCase().includes(q) ||
      d.volumeName.toLowerCase().includes(q)
    ).slice(0, 40);
  }, [searchQuery]);

  // Toggle folder expansion in tree
  const toggleFolder = (folderPath: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderPath]: !prev[folderPath]
    }));
  };

  // Auto-expand folder when navigating to doc
  useEffect(() => {
    if (currentDoc.path) {
      const parts = currentDoc.path.split('/');
      if (parts.length > 2) {
        const parentFolder = parts.slice(0, -1).join('/');
        setExpandedFolders(prev => ({ ...prev, [parentFolder]: true }));
      }
    }
  }, [currentDoc]);

  // Previous and next docs
  const currentIndex = useMemo(() => {
    return flatEncyclopediaDocs.findIndex(d => d.path === currentDoc.path);
  }, [currentDoc]);

  const prevDoc = currentIndex > 0 ? flatEncyclopediaDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < flatEncyclopediaDocs.length - 1 ? flatEncyclopediaDocs[currentIndex + 1] : null;

  // Render tree item recursively with study tracking checkmark & bookmark indicators
  const renderTreeItem = (item: EncyclopediaFileItem) => {
    if (item.type === 'file') {
      const isSelected = currentDoc.path === item.path;
      const isStudied = !!studiedMap[item.path];
      const isBookmarked = !!bookmarksMap[item.path];

      return (
        <div
          key={item.path}
          className={`w-full group flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
            isSelected
              ? 'bg-neutral-900 text-white font-medium shadow-xs'
              : 'text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          <button
            onClick={() => {
              const flat = flatEncyclopediaDocs.find(d => d.path === item.path) || {
                title: item.title || item.name,
                fileName: item.name,
                path: item.path,
                volumeId: selectedVolume.id,
                volumeName: selectedVolume.name
              };
              setCurrentDoc(flat);
              setIsMobileDirectoryOpen(false);
            }}
            className="flex items-center gap-2 min-w-0 flex-1 text-left cursor-pointer"
          >
            <FileText className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-400' : isStudied ? 'text-emerald-500' : 'text-neutral-400'}`} />
            <span className="truncate">{item.title || item.name}</span>
          </button>

          <div className="flex items-center gap-1 shrink-0">
            {isBookmarked && (
              <Star className={`w-3 h-3 ${isSelected ? 'text-amber-300' : 'text-amber-500'} fill-amber-400`} />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleStudied(item.path);
              }}
              title={isStudied ? 'Marked as Studied' : 'Mark as Studied'}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                isSelected 
                  ? 'hover:bg-neutral-800 text-neutral-300' 
                  : 'hover:bg-neutral-200 text-neutral-400'
              }`}
            >
              {isStudied ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
              ) : (
                <Square className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />
              )}
            </button>
          </div>
        </div>
      );
    }

    // Directory
    const isExpanded = !!expandedFolders[item.path];
    return (
      <div key={item.path} className="space-y-0.5">
        <button
          onClick={() => toggleFolder(item.path)}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold text-neutral-800 hover:bg-neutral-100 text-left transition-colors cursor-pointer"
        >
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          )}
          {isExpanded ? (
            <FolderOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          ) : (
            <Folder className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          )}
          <span className="truncate">{item.name}</span>
        </button>

        {isExpanded && item.children && (
          <div className="pl-3.5 ml-2 border-l border-neutral-200 space-y-0.5">
            {item.children.map(child => renderTreeItem(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-16">
      {/* Header Banner with Real-time Study Progress */}
      <div className="bg-neutral-900 text-white rounded-2xl p-5 sm:p-7 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
              <Library className="w-3.5 h-3.5 text-cyan-400" />
              <span>Semiconductor Engineering Encyclopedia</span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-mono">
                18 Vols &bull; 336 Modules
              </span>
            </div>

            {/* Live Progress Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{totalStats.studied}/{totalStats.total} Studied ({totalStats.percent}%)</span>
            </div>

            {totalStats.bookmarked > 0 && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Star className="w-3 h-3 fill-amber-300" />
                <span>{totalStats.bookmarked} Bookmarked</span>
              </div>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Semiconductor &amp; Hardware Technical Encyclopedia
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Directly imported from GitHub repository{' '}
            <a
              href="https://github.com/ShivAyushNITGoa/Complete_Semiconductor_Engineering_Encyclopedia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-1"
            >
              ShivAyushNITGoa/Complete_Semiconductor_Engineering_Encyclopedia
              <ExternalLink className="w-3 h-3" />
            </a>
            . Track your reading, test your concepts, bookmark formulas, and advance from physics fundamentals to ASIC tap-out.
          </p>

          {/* Quick Stats & Path Indicators */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md border border-white/10 text-neutral-300">
              <Cpu className="w-3 h-3 text-cyan-400" />
              Physics &bull; Devices &bull; Circuits &bull; Architecture
            </span>
            <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md border border-white/10 text-neutral-300">
              <Layers className="w-3 h-3 text-indigo-400" />
              RTL &bull; FPGA &bull; ASIC &bull; EDA Tools &bull; Packaging &bull; Systems
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-3">
          <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${totalStats.percent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-semibold text-neutral-300 whitespace-nowrap">
            {totalStats.percent}% Mastered
          </span>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute right-6 -bottom-6 opacity-5 pointer-events-none hidden md:block">
          <Library className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Search & Navigation Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-neutral-200/80 shadow-2xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search across all 336 encyclopedia topics (e.g. carrier concentration, MOSFET, UVM, STA, Vivado, FinFET)..."
            className="w-full pl-9 pr-8 py-2 bg-neutral-50 text-xs border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
            >
              &times;
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="p-2 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1 max-h-60 overflow-y-auto">
            <div className="text-[11px] font-bold text-neutral-500 px-2 py-1">
              Found {searchResults.length} matching documents:
            </div>
            {searchResults.map(result => {
              const isStudied = !!studiedMap[result.path];
              return (
                <button
                  key={result.path}
                  onClick={() => {
                    setCurrentDoc(result);
                    if (result.volumeId !== 'root') {
                      setSelectedVolumeId(result.volumeId);
                    }
                    setSearchQuery('');
                  }}
                  className="w-full flex items-center justify-between gap-2 p-2 rounded-md hover:bg-white text-left transition-colors border border-transparent hover:border-neutral-200 cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 truncate">
                      {isStudied && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      <span>{result.title}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 truncate">
                      {result.volumeName} &bull; {result.fileName}
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                </button>
              );
            })}
          </div>
        )}

        {/* Volumes Horizontal Bar with Study Progress per Volume */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-thin">
          {encyclopediaVolumes.map(vol => {
            const isSelected = selectedVolumeId === vol.id;
            const docsInVol = flatEncyclopediaDocs.filter(d => d.volumeId === vol.id);
            const studiedInVol = docsInVol.filter(d => studiedMap[d.path]).length;
            const volPercent = docsInVol.length > 0 ? Math.round((studiedInVol / docsInVol.length) * 100) : 0;

            return (
              <button
                key={vol.id}
                onClick={() => {
                  setSelectedVolumeId(vol.id);
                  if (vol.isFile) {
                    const doc = flatEncyclopediaDocs.find(d => d.path === vol.path);
                    if (doc) setCurrentDoc(doc);
                  } else {
                    const firstInVolume = flatEncyclopediaDocs.find(d => d.volumeId === vol.id);
                    if (firstInVolume) setCurrentDoc(firstInVolume);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white font-bold shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                }`}
              >
                <span>{vol.name}</span>
                {!vol.isFile && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'
                  }`}>
                    {studiedInVol}/{docsInVol.length} ({volPercent}%)
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Volume Directory Toggle Button (Visible only on < lg) */}
      <div className="lg:hidden flex items-center justify-between bg-white p-3 rounded-xl border border-neutral-200 shadow-2xs">
        <div className="min-w-0">
          <div className="text-[11px] text-neutral-500 font-medium">Current Volume</div>
          <div className="text-xs font-bold text-neutral-900 truncate">{selectedVolume.name}</div>
        </div>
        <button
          onClick={() => setIsMobileDirectoryOpen(!isMobileDirectoryOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold cursor-pointer"
        >
          {isMobileDirectoryOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          <span>{isMobileDirectoryOpen ? 'Close Topics' : 'Browse Topics'}</span>
          <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full">
            {volumeDocs.length}
          </span>
        </button>
      </div>

      {/* Main Two-Panel Content Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Panel: Volume File Tree (Desktop sticky, Mobile collapsible drawer) */}
        <div className={`${
          isMobileDirectoryOpen ? 'block' : 'hidden'
        } lg:block lg:col-span-4 bg-white rounded-xl border border-neutral-200/90 shadow-2xs p-4 space-y-3 sticky top-16`}>
          
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <div className="min-w-0">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Volume Directory
              </h3>
              <p className="text-sm font-bold text-neutral-900 truncate mt-0.5">
                {selectedVolume.name}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md shrink-0">
              {volumeStats.studied}/{volumeStats.total} Studied
            </span>
          </div>

          {/* Volume Study Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-neutral-500 font-medium">
              <span>Volume Completion</span>
              <span>{volumeStats.percent}%</span>
            </div>
            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all"
                style={{ width: `${volumeStats.percent}%` }}
              />
            </div>
          </div>

          {/* Quick Study Filter Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-neutral-100 rounded-lg text-[10px] font-semibold text-neutral-600">
            <button
              onClick={() => setFilterMode('all')}
              className={`py-1 rounded-md transition-colors cursor-pointer ${
                filterMode === 'all' ? 'bg-white text-neutral-900 shadow-2xs' : 'hover:text-neutral-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterMode('unstudied')}
              className={`py-1 rounded-md transition-colors cursor-pointer ${
                filterMode === 'unstudied' ? 'bg-white text-neutral-900 shadow-2xs' : 'hover:text-neutral-900'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterMode('studied')}
              className={`py-1 rounded-md transition-colors cursor-pointer ${
                filterMode === 'studied' ? 'bg-white text-neutral-900 shadow-2xs' : 'hover:text-neutral-900'
              }`}
            >
              Done
            </button>
            <button
              onClick={() => setFilterMode('bookmarked')}
              className={`py-1 rounded-md transition-colors cursor-pointer ${
                filterMode === 'bookmarked' ? 'bg-white text-neutral-900 shadow-2xs' : 'hover:text-neutral-900'
              }`}
            >
              Starred
            </button>
          </div>

          {/* File Tree List */}
          <div className="max-h-[calc(100vh-320px)] overflow-y-auto space-y-1 pr-1">
            {filterMode !== 'all' ? (
              displayedVolumeDocs.length > 0 ? (
                displayedVolumeDocs.map(doc => {
                  const isSelected = currentDoc.path === doc.path;
                  const isStudied = !!studiedMap[doc.path];
                  const isBookmarked = !!bookmarksMap[doc.path];

                  return (
                    <div
                      key={doc.path}
                      className={`w-full group flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                        isSelected
                          ? 'bg-neutral-900 text-white font-medium shadow-xs'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <button
                        onClick={() => {
                          setCurrentDoc(doc);
                          setIsMobileDirectoryOpen(false);
                        }}
                        className="flex items-center gap-2 min-w-0 flex-1 text-left cursor-pointer"
                      >
                        <FileText className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-400' : isStudied ? 'text-emerald-500' : 'text-neutral-400'}`} />
                        <span className="truncate">{doc.title}</span>
                      </button>

                      <div className="flex items-center gap-1 shrink-0">
                        {isBookmarked && (
                          <Star className={`w-3 h-3 ${isSelected ? 'text-amber-300' : 'text-amber-500'} fill-amber-400`} />
                        )}
                        <button
                          onClick={() => toggleStudied(doc.path)}
                          title={isStudied ? 'Marked as Studied' : 'Mark as Studied'}
                          className={`p-1 rounded-md transition-colors cursor-pointer ${
                            isSelected ? 'hover:bg-neutral-800 text-neutral-300' : 'hover:bg-neutral-200 text-neutral-400'
                          }`}
                        >
                          {isStudied ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                          ) : (
                            <Square className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-xs text-neutral-400">
                  No documents match filter "{filterMode}".
                </div>
              )
            ) : selectedVolume.items && selectedVolume.items.length > 0 ? (
              selectedVolume.items.map(item => renderTreeItem(item))
            ) : (
              <div className="p-3 text-center text-xs text-neutral-400">
                Single file volume.
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Rendered Markdown Document */}
        <div className="lg:col-span-8 min-w-0">
          <MarkdownDocReader
            markdownContent={markdownContent}
            isLoading={isLoading}
            currentDoc={currentDoc}
            isStudied={!!studiedMap[currentDoc.path]}
            isBookmarked={!!bookmarksMap[currentDoc.path]}
            onToggleStudied={() => toggleStudied(currentDoc.path)}
            onToggleBookmark={() => toggleBookmark(currentDoc.path)}
            prevDoc={prevDoc}
            nextDoc={nextDoc}
            onNavigateDoc={(doc) => {
              setCurrentDoc(doc);
              if (doc.volumeId !== 'root') setSelectedVolumeId(doc.volumeId);
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
          />
        </div>

      </div>

    </div>
  );
};
