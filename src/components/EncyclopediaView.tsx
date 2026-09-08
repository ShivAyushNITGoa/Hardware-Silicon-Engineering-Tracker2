import React, { useState, useEffect, useMemo } from 'react';
import { 
  Library, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Star, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft,
  FileText, 
  Folder, 
  FolderOpen,
  ExternalLink,
  Sparkles,
  BookMarked,
  Filter,
  X
} from 'lucide-react';
import { flatEncyclopediaDocs } from '../data/encyclopediaData';
import { 
  getStudiedEncyclopediaDocs, 
  saveStudiedEncyclopediaDocs, 
  getBookmarkedEncyclopediaDocs, 
  saveBookmarkedEncyclopediaDocs 
} from '../utils/storage';

interface FlattenedDoc {
  title: string;
  fileName: string;
  path: string;
  volumeId: string;
  volumeName: string;
}

export const EncyclopediaView: React.FC = () => {
  // Flatten all documents from tree
  const allDocs = useMemo<FlattenedDoc[]>(() => {
    const list: FlattenedDoc[] = [];

    function traverse(item: any, volId: string, volName: string) {
      if (item.isFile || item.type === 'file') {
        list.push({
          title: item.title || item.name || item.fileName || 'Document',
          fileName: item.name || item.fileName || 'README.md',
          path: item.path,
          volumeId: volId,
          volumeName: volName
        });
      }
      if (item.children && Array.isArray(item.children)) {
        item.children.forEach((c: any) => traverse(c, volId, volName));
      }
      if (item.items && Array.isArray(item.items)) {
        item.items.forEach((c: any) => traverse(c, volId, volName));
      }
    }

    flatEncyclopediaDocs.forEach((vol) => {
      const volId = vol.id || vol.folder || 'root';
      const volName = vol.name || vol.id || 'Root Volume';
      traverse(vol, volId, volName);
    });

    return list;
  }, []);

  const volumes = useMemo(() => {
    return flatEncyclopediaDocs.map((v) => ({
      id: v.id,
      name: v.name,
      folder: v.folder,
      isFile: v.isFile,
      path: v.path
    }));
  }, []);

  const [selectedVolumeId, setSelectedVolumeId] = useState<string>('Volume_01_Fundamentals');
  const [selectedDoc, setSelectedDoc] = useState<FlattenedDoc>(() => {
    return (
      allDocs.find((d) => d.volumeId === 'Volume_01_Fundamentals' && d.fileName.toLowerCase().includes('readme')) ||
      allDocs[0]
    );
  });

  const [docContent, setDocContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [studiedDocs, setStudiedDocs] = useState<Record<string, boolean>>(() => getStudiedEncyclopediaDocs());
  const [bookmarkedDocs, setBookmarkedDocs] = useState<Record<string, boolean>>(() => getBookmarkedEncyclopediaDocs());
  const [filterType, setFilterType] = useState<'all' | 'studied' | 'unstudied' | 'bookmarked'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Toggle studied status
  const toggleStudied = (docPath: string) => {
    const updated = { ...studiedDocs, [docPath]: !studiedDocs[docPath] };
    setStudiedDocs(updated);
    saveStudiedEncyclopediaDocs(updated);
  };

  // Toggle bookmark status
  const toggleBookmark = (docPath: string) => {
    const updated = { ...bookmarkedDocs, [docPath]: !bookmarkedDocs[docPath] };
    setBookmarkedDocs(updated);
    saveBookmarkedEncyclopediaDocs(updated);
  };

  // Fetch document content
  useEffect(() => {
    if (!selectedDoc) return;
    let isCancelled = false;
    setIsLoading(true);

    const targetUrl = `/encyclopedia/${selectedDoc.path}`;

    fetch(targetUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!isCancelled) {
          setDocContent(text);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error('Failed to load markdown doc', err);
          setDocContent(
            `# ${selectedDoc.title}\n\n*Document Path:* \`${selectedDoc.path}\`\n\n### Overview\nThis module covers essential principles in semiconductor physics, VLSI design architectures, and hardware verification.\n\n*Review the local markdown file under \`/Complete_Semiconductor_Engineering_Encyclopedia/${selectedDoc.path}\`.*`
          );
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedDoc]);

  // Overall Stats
  const overallStats = useMemo(() => {
    const total = allDocs.length;
    const studied = allDocs.filter((d) => studiedDocs[d.path]).length;
    const bookmarked = allDocs.filter((d) => bookmarkedDocs[d.path]).length;
    const percent = total > 0 ? Math.round((studied / total) * 100) : 0;
    return { total, studied, bookmarked, percent };
  }, [allDocs, studiedDocs, bookmarkedDocs]);

  // Current volume docs
  const currentVolumeDocs = useMemo(() => {
    return allDocs.filter((d) => d.volumeId === selectedVolumeId);
  }, [allDocs, selectedVolumeId]);

  // Filtered docs in current volume or search
  const visibleDocs = useMemo(() => {
    let list = currentVolumeDocs;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = allDocs.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.fileName.toLowerCase().includes(q) ||
          d.path.toLowerCase().includes(q) ||
          d.volumeName.toLowerCase().includes(q)
      );
    }

    if (filterType === 'studied') {
      return list.filter((d) => studiedDocs[d.path]);
    }
    if (filterType === 'unstudied') {
      return list.filter((d) => !studiedDocs[d.path]);
    }
    if (filterType === 'bookmarked') {
      return list.filter((d) => bookmarkedDocs[d.path]);
    }
    return list;
  }, [currentVolumeDocs, allDocs, searchQuery, filterType, studiedDocs, bookmarkedDocs]);

  // Next / Previous
  const currentIndex = allDocs.findIndex((d) => d.path === selectedDoc.path);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  const copyDocPath = () => {
    navigator.clipboard.writeText(selectedDoc.path);
    setCopiedCodeId('path');
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
              <Library className="w-3.5 h-3.5 text-cyan-400" />
              <span>Semiconductor Engineering Encyclopedia</span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
                18 Vols • 336 Modules
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{overallStats.studied} / {overallStats.total} Studied ({overallStats.percent}%)</span>
            </div>
            {overallStats.bookmarked > 0 && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{overallStats.bookmarked} Bookmarked</span>
              </div>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Complete Semiconductor &amp; VLSI Encyclopedia
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Exhaustive reference handbook across device physics, digital logic, Verilog/SystemVerilog, UVM testbench architectures, physical design tapeout, and research papers.
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 relative z-10 bg-neutral-800/80 rounded-xl p-3 border border-neutral-700/50">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-neutral-300">Overall Syllabus Mastery</span>
            <span className="text-cyan-400 font-mono">{overallStats.percent}% Complete</span>
          </div>
          <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${overallStats.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Document Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Volumes & Document List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Volume Dropdown / Selector */}
          <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-xs">
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Select Encyclopedia Volume
            </label>
            <select
              value={selectedVolumeId}
              onChange={(e) => {
                setSelectedVolumeId(e.target.value);
                setSearchQuery('');
              }}
              className="w-full bg-neutral-50 border border-neutral-300 text-xs font-semibold text-neutral-800 rounded-lg p-2.5 focus:ring-2 focus:ring-neutral-900 focus:outline-none cursor-pointer"
            >
              {volumes.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search across all 336 documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-700 p-0.5 rounded cursor-pointer transition-colors"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {(['all', 'studied', 'unstudied', 'bookmarked'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilterType(mode)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    filterType === mode
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-neutral-500 font-medium">
              Showing {visibleDocs.length} modules
            </div>
          </div>

          {/* Documents List */}
          <div className="bg-white border border-neutral-200 rounded-xl p-2 shadow-xs max-h-[600px] overflow-y-auto space-y-1">
            {visibleDocs.length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-400">
                No matching documents found.
              </div>
            ) : (
              visibleDocs.map((doc) => {
                const isSelected = selectedDoc.path === doc.path;
                const isDone = !!studiedDocs[doc.path];
                const isFav = !!bookmarkedDocs[doc.path];

                return (
                  <div
                    key={doc.path}
                    onClick={() => setSelectedDoc(doc)}
                    className={`group flex items-center justify-between p-2.5 rounded-lg text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-neutral-900 text-white font-medium shadow-xs'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <FileText className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-cyan-400' : isDone ? 'text-emerald-500' : 'text-neutral-400'
                      }`} />
                      <div className="min-w-0">
                        <div className="truncate font-semibold">{doc.title}</div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-neutral-400' : 'text-neutral-400'}`}>
                          {doc.fileName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isFav && (
                        <Star className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-amber-500'} fill-amber-400`} />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStudied(doc.path);
                        }}
                        title={isDone ? 'Mark as Unstudied' : 'Mark as Studied'}
                        className={`p-1 rounded cursor-pointer ${
                          isSelected ? 'hover:bg-neutral-800 text-neutral-300' : 'hover:bg-neutral-200 text-neutral-400'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-neutral-400 opacity-60 group-hover:opacity-100" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Document Viewer (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Doc Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="space-y-1 max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                {selectedDoc.volumeName}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                {selectedDoc.title}
              </h2>
              <p className="text-xs text-neutral-500 font-mono flex items-center gap-1">
                <span>{selectedDoc.path}</span>
                <button
                  onClick={copyDocPath}
                  className="p-1 hover:bg-neutral-100 rounded text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  title="Copy Path"
                >
                  {copiedCodeId === 'path' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(selectedDoc.path)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  bookmarkedDocs[selectedDoc.path]
                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${bookmarkedDocs[selectedDoc.path] ? 'fill-amber-400 text-amber-500' : ''}`} />
                <span>{bookmarkedDocs[selectedDoc.path] ? 'Bookmarked' : 'Bookmark'}</span>
              </button>

              <button
                onClick={() => toggleStudied(selectedDoc.path)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  studiedDocs[selectedDoc.path]
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{studiedDocs[selectedDoc.path] ? 'Studied' : 'Mark as Studied'}</span>
              </button>
            </div>
          </div>

          {/* Doc Content / Reader */}
          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="py-20 text-center text-neutral-400 text-sm space-y-2">
                <div className="animate-spin w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full mx-auto" />
                <div>Loading documentation module...</div>
              </div>
            ) : (
              <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans space-y-4">
                <pre className="p-4 bg-neutral-900 text-neutral-100 rounded-xl overflow-x-auto text-xs font-mono leading-relaxed whitespace-pre-wrap">
                  {docContent}
                </pre>
              </div>
            )}
          </div>

          {/* Next / Previous Navigation Footer */}
          <div className="flex items-center justify-between border-t border-neutral-100 pt-5 text-xs">
            {prevDoc ? (
              <button
                onClick={() => setSelectedDoc(prevDoc)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev: {prevDoc.title}</span>
              </button>
            ) : <div />}

            {nextDoc && (
              <button
                onClick={() => setSelectedDoc(nextDoc)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold cursor-pointer"
              >
                <span>Next: {nextDoc.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
