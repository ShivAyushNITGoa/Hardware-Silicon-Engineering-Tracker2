import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  Clock, 
  Filter, 
  ArrowRight,
  Flame,
  Check,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { TIMELINE_MILESTONES_18_MONTHS, TimelineMilestoneMonth } from '../data/nitGoaAdvancedData';

const STORAGE_KEY = 'NIT_GOA_TIMELINE_COMPLETED_MILESTONES';

export const NitGoaTimelineGantt: React.FC = () => {
  const [completedMilestones, setCompletedMilestones] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['ms-2026-01']; // default completed
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedMilestones));
    } catch (e) {
      console.error(e);
    }
  }, [completedMilestones]);

  const toggleMilestone = (id: string) => {
    setCompletedMilestones(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const filteredMilestones = TIMELINE_MILESTONES_18_MONTHS.filter(m => {
    if (selectedCategory === 'all') return true;
    return m.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const progressPercent = Math.round(
    (completedMilestones.length / TIMELINE_MILESTONES_18_MONTHS.length) * 100
  );

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>18-Month Execution Gantt &bull; Jan 2026 to June 2027</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
            Chronological B.Tech Milestone Roadmap
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            Structured roadmap tracking your 6th, 7th, and 8th semester sprints, summer vacation project crunch, and August Day 1 placement drives at NIT Goa.
          </p>
        </div>

        {/* Overall Completion Progress */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-neutral-500">Timeline Progress</div>
            <div className="text-sm font-extrabold text-indigo-700 font-mono">
              {completedMilestones.length} of {TIMELINE_MILESTONES_18_MONTHS.length} Done ({progressPercent}%)
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-neutral-200 flex items-center justify-center font-bold text-xs text-neutral-800 relative">
            <span>{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Filter:</span>
        {['all', 'Academics', 'Summer Sprint', 'Placements', 'Projects'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              selectedCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {cat === 'all' ? 'All Milestones (6)' : cat}
          </button>
        ))}
      </div>

      {/* Timeline Gantt Track */}
      <div className="relative border-l-2 border-indigo-200 ml-4 sm:ml-6 pl-4 sm:pl-6 space-y-6">
        {filteredMilestones.map((m) => {
          const isDone = completedMilestones.includes(m.milestoneId);
          const isCritical = m.statusTag === 'Critical Immediate' || m.category === 'Summer Sprint';

          return (
            <div key={m.milestoneId} className="relative group">
              {/* Timeline Marker Node */}
              <button
                onClick={() => toggleMilestone(m.milestoneId)}
                className={`absolute -left-[27px] sm:-left-[35px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 shadow-xs ${
                  isDone 
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' 
                    : isCritical
                    ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                    : 'bg-white border-2 border-neutral-400 text-neutral-400'
                }`}
                title={isDone ? 'Mark as Incomplete' : 'Mark as Completed'}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
              </button>

              {/* Milestone Card */}
              <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isDone 
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : isCritical
                  ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-200 shadow-xs'
                  : 'bg-white border-neutral-200 shadow-2xs hover:border-neutral-300'
              }`}>
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-extrabold text-indigo-700 font-mono px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200">
                      {m.monthYear}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500">
                      &bull; {m.academicStage}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      m.category === 'Summer Sprint'
                        ? 'bg-rose-100 text-rose-800'
                        : m.category === 'Placements'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      {m.category}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleMilestone(m.milestoneId)}
                    className="self-start sm:self-auto text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-neutral-600 hover:text-neutral-900"
                  >
                    {isDone ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-neutral-500 hover:text-neutral-800 flex items-center gap-1">
                        <Circle className="w-4 h-4" />
                        <span>Mark Done</span>
                      </span>
                    )}
                  </button>
                </div>

                <h4 className="text-base font-bold text-neutral-900 mb-2">
                  {m.focusTitle}
                </h4>

                {/* Action Items */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                    Execution Checklist:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {m.actionItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-0.5">&bull;</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
