import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flame, 
  Plus, 
  RotateCcw, 
  Edit2, 
  Trash2, 
  X,
  Sparkles,
  BookOpen,
  Award
} from 'lucide-react';
import { Habit, GoldenRule } from '../types';
import { 
  getStoredHabits, 
  saveStoredHabits, 
  resetStoredHabits,
  getStoredRules, 
  saveStoredRules, 
  resetStoredRules
} from '../utils/storage';

export const HabitsRulesView: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(() => getStoredHabits());
  const [rules, setRules] = useState<GoldenRule[]>(() => getStoredRules());

  const [habitChecks, setHabitChecks] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem('ayush_tracker_daily_habits_checked');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const toggleHabit = (id: string) => {
    const updated = { ...habitChecks, [id]: !habitChecks[id] };
    setHabitChecks(updated);
    try {
      localStorage.setItem('ayush_tracker_daily_habits_checked', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetHabits = () => {
    if (window.confirm('Reset habits to standard daily routine?')) {
      const def = resetStoredHabits();
      setHabits(def);
      setHabitChecks({});
      localStorage.removeItem('ayush_tracker_daily_habits_checked');
    }
  };

  const handleResetRules = () => {
    if (window.confirm('Reset rules to default 10 Golden Non-Negotiable Rules?')) {
      const def = resetStoredRules();
      setRules(def);
    }
  };

  const completedHabits = habits.filter((h) => habitChecks[h.id]).length;
  const totalHabits = habits.length;
  const habitPercent = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 backdrop-blur-xs border border-white/10">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Execution Protocol</span>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-mono">
              10 Golden Rules
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Daily Habits &amp; 10 Non-Negotiable Execution Rules
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            The mathematical standards of execution. Zero excuses, daily deliberate practice, verified git commits, and uncompromising Sunday audit gates.
          </p>
        </div>

        {/* Habits Progress Bar */}
        <div className="mt-5 relative z-10 bg-neutral-800/80 rounded-xl p-3 border border-neutral-700/50 max-w-xl">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-neutral-300">Today&apos;s Engineering Velocity</span>
            <span className="text-cyan-400 font-mono">{completedHabits} / {totalHabits} Completed ({habitPercent}%)</span>
          </div>
          <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${habitPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Daily Habits Checklist */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-600" />
              <span>Daily Engineering Habits &amp; Deep Work Checklist</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Targeted timeboxes across RTL implementation, testbenches, timing analysis, and interview drills.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetHabits}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Routine</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habits.map((habit) => {
            const isDone = !!habitChecks[habit.id];

            return (
              <div
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`p-4 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isDone 
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' 
                    : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <button className="mt-0.5 shrink-0 cursor-pointer">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-neutral-400" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${isDone ? 'line-through text-emerald-900' : 'text-neutral-900'}`}>
                        {habit.name}
                      </span>
                      {habit.targetTime && (
                        <span className="text-[10px] font-mono bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">
                          {habit.targetTime}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${isDone ? 'text-emerald-800' : 'text-neutral-500'}`}>
                      {habit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 10 Golden Non-Negotiable Rules */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>10 Non-Negotiable Silicon Execution Rules</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Read these every morning before opening terminal. Adhere with absolute academic and engineering integrity.
            </p>
          </div>

          <button
            onClick={handleResetRules}
            className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore 10 Rules</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule) => {
            return (
              <div
                key={rule.id}
                className="bg-neutral-50/70 border border-neutral-200 rounded-xl p-5 space-y-2.5 hover:border-neutral-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    {rule.id}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-neutral-900 tracking-tight leading-snug">
                  {rule.rule}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {rule.rationale}
                </p>

                {rule.enforcement && (
                  <div className="text-[11px] bg-white border border-neutral-200 rounded-lg p-2 text-neutral-700 font-mono">
                    <strong>Standard:</strong> {rule.enforcement}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
