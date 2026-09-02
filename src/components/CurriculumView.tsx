import React, { useState, useMemo } from 'react';
import { 
  CheckSquare, 
  Square, 
  Search, 
  Filter, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Flame, 
  RotateCcw,
  CheckCircle2,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  Layers,
  FileText,
  CheckCheck
} from 'lucide-react';
import { CurriculumTrack, ConceptTopic, SubTopic, PriorityLevel } from '../types';
import { 
  getCheckedSubtopics, 
  saveCheckedSubtopics, 
  getStoredCurriculum, 
  saveStoredCurriculum, 
  resetStoredCurriculum 
} from '../utils/storage';

const BLANK_SUBTOPIC: SubTopic = {
  id: '',
  title: '',
  detail: '',
  isExitGate: false
};

const BLANK_TOPIC: ConceptTopic = {
  id: '',
  stage: 1,
  title: '',
  whatToLearn: '',
  whyItMatters: '',
  practiceExercise: '',
  buildDeliverable: '',
  howToTest: '',
  exitCriteria: '',
  priority: 'Critical',
  week: 'Week 1',
  subtopics: []
};

const BLANK_TRACK: CurriculumTrack = {
  id: '',
  name: '',
  category: 'Silicon & Architecture Track',
  description: '',
  priority: 'Critical',
  plannedHours: 25,
  currentFocus: 'Foundation & Synthesis',
  nextGate: 'Zero-warning synthesizable build',
  evidence: 'GitHub repo with waveform & assertions',
  topics: []
};

export const CurriculumView: React.FC = () => {
  const [curriculumTracks, setCurriculumTracks] = useState<CurriculumTrack[]>(() => getStoredCurriculum());
  const [checkedSubtopics, setCheckedSubtopics] = useState<Record<string, boolean>>(() => getCheckedSubtopics());

  const [activeTrackId, setActiveTrackId] = useState<string>(curriculumTracks[0]?.id || 'track-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'incomplete' | 'completed' | 'exit_gates'>('all');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  // Topic Modal State
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<ConceptTopic | null>(null);
  const [topicForm, setTopicForm] = useState<ConceptTopic>(BLANK_TOPIC);
  const [topicSubtopicsRaw, setTopicSubtopicsRaw] = useState<string>('');

  // Track Modal State
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [trackForm, setTrackForm] = useState<CurriculumTrack>(BLANK_TRACK);

  const toggleSubtopic = (subtopicId: string) => {
    const nextState = {
      ...checkedSubtopics,
      [subtopicId]: !checkedSubtopics[subtopicId]
    };
    setCheckedSubtopics(nextState);
    saveCheckedSubtopics(nextState);
  };

  const toggleTopicExpand = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const toggleExpandCollapseAll = (expand: boolean) => {
    const nextState: Record<string, boolean> = {};
    activeTrack.topics.forEach(tp => {
      nextState[tp.id] = expand;
    });
    setExpandedTopics(nextState);
  };

  const toggleTopicAllSubtopics = (topic: ConceptTopic, shouldCheck: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = { ...checkedSubtopics };
    topic.subtopics.forEach(st => {
      nextState[st.id] = shouldCheck;
    });
    setCheckedSubtopics(nextState);
    saveCheckedSubtopics(nextState);
  };

  // Calculate Overall Statistics
  const overallStats = useMemo(() => {
    let totalSubtopics = 0;
    let completedSubtopics = 0;
    let totalExitGates = 0;
    let completedExitGates = 0;

    curriculumTracks.forEach(track => {
      track.topics.forEach(topic => {
        topic.subtopics.forEach(st => {
          totalSubtopics += 1;
          if (checkedSubtopics[st.id]) {
            completedSubtopics += 1;
          }
          if (st.isExitGate) {
            totalExitGates += 1;
            if (checkedSubtopics[st.id]) {
              completedExitGates += 1;
            }
          }
        });
      });
    });

    const percent = totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;
    return { totalSubtopics, completedSubtopics, percent, totalExitGates, completedExitGates };
  }, [curriculumTracks, checkedSubtopics]);

  // Active track
  const activeTrack = useMemo(() => {
    return curriculumTracks.find(t => t.id === activeTrackId) || curriculumTracks[0] || BLANK_TRACK;
  }, [curriculumTracks, activeTrackId]);

  // Track specific stats
  const trackStats = useMemo(() => {
    let total = 0;
    let completed = 0;
    activeTrack.topics.forEach(topic => {
      topic.subtopics.forEach(st => {
        total += 1;
        if (checkedSubtopics[st.id]) {
          completed += 1;
        }
      });
    });
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent };
  }, [activeTrack, checkedSubtopics]);

  // Mark all in current track
  const handleMarkTrack = (complete: boolean) => {
    const nextState = { ...checkedSubtopics };
    activeTrack.topics.forEach(topic => {
      topic.subtopics.forEach(st => {
        nextState[st.id] = complete;
      });
    });
    setCheckedSubtopics(nextState);
    saveCheckedSubtopics(nextState);
  };

  // Open Topic Modal for Add
  const handleOpenAddTopic = () => {
    const newTopic: ConceptTopic = {
      ...BLANK_TOPIC,
      id: `topic-${Date.now()}`,
      stage: activeTrack.topics.length + 1,
      week: `Week ${activeTrack.topics.length + 1}`,
      subtopics: [
        { id: `st-${Date.now()}-1`, title: 'Core Concept & Architecture', detail: 'Understand theoretical basis & write initial synthesizable RTL.', isExitGate: false },
        { id: `st-${Date.now()}-2`, title: 'Verification & Testbench', detail: 'Run self-checking regression testbench with assertions.', isExitGate: true }
      ]
    };
    setEditingTopic(null);
    setTopicForm(newTopic);
    setTopicSubtopicsRaw(
      newTopic.subtopics.map(s => `${s.title} :: ${s.detail}${s.isExitGate ? ' :: exit' : ''}`).join('\n')
    );
    setIsTopicModalOpen(true);
  };

  // Open Topic Modal for Edit
  const handleOpenEditTopic = (topic: ConceptTopic, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingTopic(topic);
    setTopicForm({ ...topic });
    setTopicSubtopicsRaw(
      topic.subtopics.map(s => `${s.title} :: ${s.detail}${s.isExitGate ? ' :: exit' : ''}`).join('\n')
    );
    setIsTopicModalOpen(true);
  };

  // Save Topic
  const handleSaveTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicForm.title.trim()) return;

    // Parse subtopics
    const lines = topicSubtopicsRaw.split('\n').map(l => l.trim()).filter(Boolean);
    const parsedSubtopics: SubTopic[] = lines.map((line, idx) => {
      const parts = line.split('::').map(p => p.trim());
      const title = parts[0] || `Subtopic ${idx + 1}`;
      const detail = parts[1] || title;
      const isExitGate = parts[2]?.toLowerCase() === 'exit' || parts[2]?.toLowerCase() === 'true';
      return {
        id: editingTopic?.subtopics[idx]?.id || `st-${Date.now()}-${idx}`,
        title,
        detail,
        isExitGate
      };
    });

    const finalizedTopic: ConceptTopic = {
      ...topicForm,
      title: topicForm.title.trim(),
      subtopics: parsedSubtopics.length > 0 ? parsedSubtopics : [
        { id: `st-${Date.now()}-1`, title: 'Core Implementation', detail: 'Complete implementation.', isExitGate: true }
      ]
    };

    const updatedTracks = curriculumTracks.map(track => {
      if (track.id === activeTrack.id) {
        let updatedTopics: ConceptTopic[];
        if (editingTopic) {
          updatedTopics = track.topics.map(tp => tp.id === finalizedTopic.id ? finalizedTopic : tp);
        } else {
          updatedTopics = [...track.topics, finalizedTopic];
        }
        return { ...track, topics: updatedTopics };
      }
      return track;
    });

    setCurriculumTracks(updatedTracks);
    saveStoredCurriculum(updatedTracks);
    setIsTopicModalOpen(false);
  };

  // Delete Topic
  const handleDeleteTopic = (topicId: string, topicTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete topic "${topicTitle}" from this curriculum track?`)) {
      const updatedTracks = curriculumTracks.map(track => {
        if (track.id === activeTrack.id) {
          return {
            ...track,
            topics: track.topics.filter(tp => tp.id !== topicId)
          };
        }
        return track;
      });
      setCurriculumTracks(updatedTracks);
      saveStoredCurriculum(updatedTracks);
    }
  };

  // Open Track Modal
  const handleOpenAddTrack = () => {
    setTrackForm({
      ...BLANK_TRACK,
      id: `track-${Date.now()}`
    });
    setIsTrackModalOpen(true);
  };

  // Save Track
  const handleSaveTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackForm.name.trim()) return;

    const newTrack: CurriculumTrack = {
      ...trackForm,
      name: trackForm.name.trim(),
      topics: []
    };

    const updatedTracks = [...curriculumTracks, newTrack];
    setCurriculumTracks(updatedTracks);
    saveStoredCurriculum(updatedTracks);
    setActiveTrackId(newTrack.id);
    setIsTrackModalOpen(false);
  };

  // Delete Track
  const handleDeleteTrack = (trackId: string, trackName: string) => {
    if (curriculumTracks.length <= 1) {
      alert('You must have at least one curriculum track.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete track "${trackName}" and all its topics?`)) {
      const updated = curriculumTracks.filter(t => t.id !== trackId);
      setCurriculumTracks(updated);
      saveStoredCurriculum(updated);
      setActiveTrackId(updated[0].id);
    }
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset all curriculum tracks & topics to initial 114 semiconductor learning modules?')) {
      const reset = resetStoredCurriculum();
      setCurriculumTracks(reset);
      setActiveTrackId(reset[0].id);
    }
  };

  // Filter topics based on search and status
  const filteredTopics = useMemo(() => {
    return activeTrack.topics.filter(topic => {
      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = topic.title.toLowerCase().includes(q);
        const matchesLearn = topic.whatToLearn.toLowerCase().includes(q);
        const matchesDeliverable = topic.buildDeliverable.toLowerCase().includes(q);
        const matchesSubtopic = topic.subtopics.some(st => 
          st.title.toLowerCase().includes(q) || st.detail.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesLearn && !matchesDeliverable && !matchesSubtopic) {
          return false;
        }
      }

      // Filter Mode check
      if (filterMode === 'incomplete') {
        const hasIncomplete = topic.subtopics.some(st => !checkedSubtopics[st.id]);
        if (!hasIncomplete) return false;
      } else if (filterMode === 'completed') {
        const allCompleted = topic.subtopics.every(st => checkedSubtopics[st.id]);
        if (!allCompleted) return false;
      } else if (filterMode === 'exit_gates') {
        const hasExitGate = topic.subtopics.some(st => st.isExitGate);
        if (!hasExitGate) return false;
      }

      return true;
    });
  }, [activeTrack, searchQuery, filterMode, checkedSubtopics]);

  return (
    <div className="space-y-6">
      {/* Top Header & Global Progress */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-neutral-800" />
              Curriculum & Technical Roadmap Master Checklist
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Complete hardware syllabus covering digital logic, SystemVerilog, UVM, STA, and RISC-V SoC design. Manually create, edit, or customize any track, stage, or subtopic.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleOpenAddTopic}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Topic</span>
            </button>

            <button
              onClick={handleOpenAddTrack}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Track</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-neutral-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-xs text-neutral-500 transition-colors cursor-pointer"
              title="Reset curriculum to factory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="flex items-center gap-4 bg-neutral-50 px-4 py-3 rounded-lg border border-neutral-200">
          <div>
            <div className="text-xs text-neutral-500 font-medium">Overall Roadmap Completion</div>
            <div className="text-xl font-bold text-neutral-900">
              {overallStats.completedSubtopics} / {overallStats.totalSubtopics} Subtopics
              <span className="text-sm font-normal text-neutral-500 ml-1">({overallStats.percent}%)</span>
            </div>
          </div>
          <div className="flex-1 max-w-xs bg-neutral-200 h-2.5 rounded-full overflow-hidden ml-auto">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${overallStats.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Track Selector Horizontal Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {curriculumTracks.map(track => {
          let tTotal = 0;
          let tDone = 0;
          track.topics.forEach(tp => {
            tp.subtopics.forEach(st => {
              tTotal += 1;
              if (checkedSubtopics[st.id]) tDone += 1;
            });
          });
          const tPercent = tTotal > 0 ? Math.round((tDone / tTotal) * 100) : 0;
          const isSelected = track.id === activeTrackId;

          return (
            <div
              key={track.id}
              className={`flex-shrink-0 flex items-center rounded-xl border transition-all ${
                isSelected 
                  ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm' 
                  : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <button
                onClick={() => setActiveTrackId(track.id)}
                className="px-4 py-2.5 text-left cursor-pointer"
              >
                <div className="text-xs font-bold leading-tight line-clamp-1">{track.name}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[11px] font-medium ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {tDone}/{tTotal} Done ({tPercent}%)
                  </span>
                  <div className={`w-12 h-1.5 rounded-full overflow-hidden ${isSelected ? 'bg-neutral-700' : 'bg-neutral-200'}`}>
                    <div 
                      className={`h-full rounded-full ${isSelected ? 'bg-emerald-400' : 'bg-emerald-600'}`} 
                      style={{ width: `${tPercent}%` }} 
                    />
                  </div>
                </div>
              </button>

              {curriculumTracks.length > 1 && (
                <button
                  onClick={() => handleDeleteTrack(track.id, track.name)}
                  className={`px-2 py-2.5 hover:text-rose-400 transition-colors ${isSelected ? 'text-neutral-400' : 'text-neutral-400 hover:text-rose-600'}`}
                  title="Delete Track"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Track Header Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                {activeTrack.category}
              </span>
              <h3 className="text-xl font-bold text-neutral-900">{activeTrack.name}</h3>
            </div>
            <p className="text-xs text-neutral-600 mt-1 max-w-3xl leading-relaxed">
              {activeTrack.description}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => handleMarkTrack(true)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
            >
              Mark Track Complete
            </button>
            <button
              onClick={() => handleMarkTrack(false)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
            >
              Reset Track
            </button>
          </div>
        </div>

        {/* Track Metadata Mini Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-neutral-100 text-xs">
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80">
            <span className="text-neutral-500 font-medium block text-[11px] uppercase">Current Gate Focus</span>
            <span className="font-semibold text-neutral-900 mt-0.5 block">{activeTrack.currentFocus}</span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80">
            <span className="text-neutral-500 font-medium block text-[11px] uppercase">Next Exit Gate</span>
            <span className="font-semibold text-neutral-900 mt-0.5 block">{activeTrack.nextGate}</span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80">
            <span className="text-neutral-500 font-medium block text-[11px] uppercase">Required Artifact Evidence</span>
            <span className="font-semibold text-neutral-900 mt-0.5 block">{activeTrack.evidence}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, concepts, code keywords..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg border border-neutral-200 overflow-x-auto">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                filterMode === 'all' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Topics ({activeTrack.topics.length})
            </button>
            <button
              onClick={() => setFilterMode('incomplete')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                filterMode === 'incomplete' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilterMode('completed')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                filterMode === 'completed' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilterMode('exit_gates')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                filterMode === 'exit_gates' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Exit Gates
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleExpandCollapseAll(true)}
              className="text-[11px] px-2 py-1.5 rounded border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 font-medium cursor-pointer"
              title="Expand all topics"
            >
              Expand All
            </button>
            <button
              onClick={() => toggleExpandCollapseAll(false)}
              className="text-[11px] px-2 py-1.5 rounded border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 font-medium cursor-pointer"
              title="Collapse all topics"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* Topics & Subtopics List */}
      <div className="space-y-4">
        {filteredTopics.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-neutral-200">
            <CheckCircle2 className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-neutral-800">No topics match filter</h3>
            <p className="text-xs text-neutral-500 mt-1">Try clearing your search query or add a new topic to this track.</p>
            <button
              onClick={handleOpenAddTopic}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-bold"
            >
              <Plus className="w-4 h-4" /> Add Topic
            </button>
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const isExpanded = expandedTopics[topic.id] !== false; // default expanded
            const topicCompletedCount = topic.subtopics.filter(st => checkedSubtopics[st.id]).length;
            const topicTotalCount = topic.subtopics.length;
            const isTopicAllDone = topicCompletedCount === topicTotalCount && topicTotalCount > 0;

            return (
              <div
                key={topic.id}
                className={`bg-white rounded-xl border transition-all overflow-hidden ${
                  isTopicAllDone ? 'border-emerald-300 shadow-sm' : 'border-neutral-200 shadow-sm'
                }`}
              >
                {/* Topic Header Bar */}
                <div 
                  onClick={() => toggleTopicExpand(topic.id)}
                  className="p-4.5 bg-neutral-50/70 hover:bg-neutral-100/70 cursor-pointer border-b border-neutral-200/80 flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">
                      S{topic.stage}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-neutral-900 truncate">
                          {topic.title}
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded bg-neutral-200/80 text-neutral-800 font-medium">
                          {topic.week}
                        </span>
                        {isTopicAllDone && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Complete
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 line-clamp-1 mt-0.5">
                        {topic.whatToLearn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                    <span className="text-xs font-semibold text-neutral-700 bg-white px-2.5 py-1 rounded-md border border-neutral-200">
                      {topicCompletedCount}/{topicTotalCount} Subtopics
                    </span>

                    <button
                      onClick={(e) => toggleTopicAllSubtopics(topic, !isTopicAllDone, e)}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold border transition-colors cursor-pointer inline-flex items-center gap-1 ${
                        isTopicAllDone
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                      }`}
                      title={isTopicAllDone ? 'Uncheck all subtopics in this topic' : 'Mark all subtopics in this topic as complete'}
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isTopicAllDone ? 'Reset Topic' : 'Check All'}</span>
                    </button>

                    {/* Edit and Delete Topic buttons */}
                    <button
                      onClick={(e) => handleOpenEditTopic(topic, e)}
                      className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-md transition-colors"
                      title="Edit Topic"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteTopic(topic.id, topic.title, e)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Delete Topic"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-neutral-500 ml-1" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-neutral-500 ml-1" />
                    )}
                  </div>
                </div>

                {/* Topic Body */}
                {isExpanded && (
                  <div className="p-5 space-y-5">
                    {/* Methodological Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-neutral-50/50 p-3.5 rounded-xl border border-neutral-100">
                      <div>
                        <span className="font-semibold text-neutral-900 block mb-0.5">Why it matters:</span>
                        <p className="text-neutral-600 leading-relaxed">{topic.whyItMatters}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-900 block mb-0.5">Practice Exercise:</span>
                        <p className="text-neutral-600 leading-relaxed">{topic.practiceExercise}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-900 block mb-0.5">Build Deliverable:</span>
                        <p className="text-neutral-600 leading-relaxed">{topic.buildDeliverable}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-900 block mb-0.5">How to Test & Verify:</span>
                        <p className="text-neutral-600 leading-relaxed">{topic.howToTest}</p>
                      </div>
                    </div>

                    {/* Checkable Subtopics List */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center justify-between">
                        <span>Checkable Subtopics & Concepts</span>
                        <span className="text-[11px] font-normal text-neutral-400">Click box to toggle completion</span>
                      </div>

                      <div className="divide-y divide-neutral-100 rounded-lg border border-neutral-200 overflow-hidden bg-white">
                        {topic.subtopics.map(st => {
                          const isDone = !!checkedSubtopics[st.id];

                          return (
                            <div
                              key={st.id}
                              onClick={() => toggleSubtopic(st.id)}
                              className={`p-3.5 flex items-start gap-3.5 cursor-pointer transition-colors ${
                                isDone 
                                  ? 'bg-emerald-50/30 hover:bg-emerald-50/50' 
                                  : 'hover:bg-neutral-50'
                              }`}
                            >
                              <div className="pt-0.5 flex-shrink-0">
                                {isDone ? (
                                  <div className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center">
                                    <CheckSquare className="w-4 h-4" />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded border-2 border-neutral-300 text-transparent hover:border-neutral-500" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`text-sm font-semibold ${
                                    isDone ? 'line-through text-neutral-500' : 'text-neutral-900'
                                  }`}>
                                    {st.title}
                                  </span>
                                  {st.isExitGate && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                                      <ShieldCheck className="w-3 h-3" /> Exit Gate
                                    </span>
                                  )}
                                </div>
                                <p className={`text-xs mt-0.5 leading-relaxed ${
                                  isDone ? 'text-neutral-400' : 'text-neutral-600'
                                }`}>
                                  {st.detail}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Topic Modal */}
      {isTopicModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    {editingTopic ? 'Edit Topic Details' : 'Add New Curriculum Topic'}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Track: {activeTrack.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsTopicModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTopic} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Topic Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={topicForm.title}
                    onChange={(e) => setTopicForm({ ...topicForm, title: e.target.value })}
                    placeholder="e.g. Asynchronous FIFO with Gray-Code CDC"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Stage / Sequence</label>
                  <input
                    type="number"
                    min={1}
                    value={topicForm.stage}
                    onChange={(e) => setTopicForm({ ...topicForm, stage: parseInt(e.target.value) || 1 })}
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Target Week</label>
                  <input
                    type="text"
                    value={topicForm.week}
                    onChange={(e) => setTopicForm({ ...topicForm, week: e.target.value })}
                    placeholder="e.g. Week 4 or Month 2"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Priority</label>
                  <select
                    value={topicForm.priority}
                    onChange={(e) => setTopicForm({ ...topicForm, priority: e.target.value as PriorityLevel })}
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  >
                    <option value="Critical">Critical (Non-negotiable)</option>
                    <option value="Dream">Dream (Advanced)</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">What to Learn</label>
                <textarea
                  rows={2}
                  value={topicForm.whatToLearn}
                  onChange={(e) => setTopicForm({ ...topicForm, whatToLearn: e.target.value })}
                  placeholder="Summary of core theoretical concepts and syntax..."
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Why It Matters in Industry</label>
                  <textarea
                    rows={2}
                    value={topicForm.whyItMatters}
                    onChange={(e) => setTopicForm({ ...topicForm, whyItMatters: e.target.value })}
                    placeholder="Why recruiters and interviewers test this..."
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Practice Exercise</label>
                  <textarea
                    rows={2}
                    value={topicForm.practiceExercise}
                    onChange={(e) => setTopicForm({ ...topicForm, practiceExercise: e.target.value })}
                    placeholder="Hands-on coding exercise..."
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Build Deliverable</label>
                  <input
                    type="text"
                    value={topicForm.buildDeliverable}
                    onChange={(e) => setTopicForm({ ...topicForm, buildDeliverable: e.target.value })}
                    placeholder="e.g. Synthesizable Async FIFO IP with SVA assertions"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">How to Test</label>
                  <input
                    type="text"
                    value={topicForm.howToTest}
                    onChange={(e) => setTopicForm({ ...topicForm, howToTest: e.target.value })}
                    placeholder="e.g. Verilator lint + cocotb randomized testbench"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-neutral-800">
                    Subtopics Checklist (1 per line format: <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-700">Title :: Detail :: exit</code>)
                  </label>
                </div>
                <textarea
                  rows={4}
                  value={topicSubtopicsRaw}
                  onChange={(e) => setTopicSubtopicsRaw(e.target.value)}
                  placeholder="Gray Code Pointer Math :: Convert binary read/write pointers to Gray code :: exit&#10;Metastability 2-FF Sync :: Route Gray pointers through 2-flop synchronizer"
                  className="w-full text-xs p-2.5 font-mono border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTopicModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  {editingTopic ? 'Save Topic' : 'Create Topic'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Track Modal */}
      {isTrackModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Create New Curriculum Track</h3>
                  <p className="text-xs text-neutral-500">Define a custom focus domain</p>
                </div>
              </div>
              <button
                onClick={() => setIsTrackModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTrack} className="p-4 sm:p-6 space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">
                  Track Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={trackForm.name}
                  onChange={(e) => setTrackForm({ ...trackForm, name: e.target.value })}
                  placeholder="e.g. Physical Design & Timing Closure"
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">Category Tag</label>
                <input
                  type="text"
                  value={trackForm.category}
                  onChange={(e) => setTrackForm({ ...trackForm, category: e.target.value })}
                  placeholder="e.g. ASIC Backend & Floorplanning"
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">Description</label>
                <textarea
                  rows={2}
                  value={trackForm.description}
                  onChange={(e) => setTrackForm({ ...trackForm, description: e.target.value })}
                  placeholder="Objectives and scope of this learning track..."
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Current Focus</label>
                  <input
                    type="text"
                    value={trackForm.currentFocus}
                    onChange={(e) => setTrackForm({ ...trackForm, currentFocus: e.target.value })}
                    placeholder="e.g. Floorplanning"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">Next Exit Gate</label>
                  <input
                    type="text"
                    value={trackForm.nextGate}
                    onChange={(e) => setTrackForm({ ...trackForm, nextGate: e.target.value })}
                    placeholder="e.g. Clean DRC/LVS report"
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTrackModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  Create Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
