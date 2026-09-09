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
  Award,
  Save
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

interface HabitFormData {
  name: string;
  targetTime: string;
  description: string;
  category: string;
}

const BLANK_HABIT_FORM: HabitFormData = {
  name: '',
  targetTime: '90 mins / day',
  description: '',
  category: 'Coding'
};

interface RuleFormData {
  id: string;
  rule: string;
  rationale: string;
  enforcement: string;
}

const BLANK_RULE_FORM: RuleFormData = {
  id: '',
  rule: '',
  rationale: '',
  enforcement: ''
};

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

  // Habit Modal State
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [habitFormData, setHabitFormData] = useState<HabitFormData>(BLANK_HABIT_FORM);

  // Rule Modal State
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [ruleFormData, setRuleFormData] = useState<RuleFormData>(BLANK_RULE_FORM);

  const toggleHabit = (id: string) => {
    const updated = { ...habitChecks, [id]: !habitChecks[id] };
    setHabitChecks(updated);
    try {
      localStorage.setItem('ayush_tracker_daily_habits_checked', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Habit Handlers
  const handleOpenAddHabit = () => {
    setEditingHabitId(null);
    setHabitFormData(BLANK_HABIT_FORM);
    setIsHabitModalOpen(true);
  };

  const handleOpenEditHabit = (habit: Habit, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingHabitId(habit.id);
    setHabitFormData({
      name: habit.name,
      targetTime: habit.targetTime || '60 mins',
      description: habit.description || '',
      category: habit.category || 'General'
    });
    setIsHabitModalOpen(true);
  };

  const handleDeleteHabit = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete habit "${name}"?`)) {
      const updated = habits.filter(h => h.id !== id);
      setHabits(updated);
      saveStoredHabits(updated);
    }
  };

  const handleSaveHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitFormData.name.trim() || !habitFormData.description.trim()) {
      alert('Please fill in Habit Name and Description.');
      return;
    }

    let updatedList: Habit[];
    if (editingHabitId) {
      updatedList = habits.map(h => {
        if (h.id === editingHabitId) {
          return {
            ...h,
            name: habitFormData.name.trim(),
            targetTime: habitFormData.targetTime.trim(),
            description: habitFormData.description.trim(),
            category: habitFormData.category.trim()
          };
        }
        return h;
      });
    } else {
      const newHabit: Habit = {
        id: `custom-habit-${Date.now()}`,
        name: habitFormData.name.trim(),
        targetTime: habitFormData.targetTime.trim(),
        description: habitFormData.description.trim(),
        category: habitFormData.category.trim()
      };
      updatedList = [...habits, newHabit];
    }

    setHabits(updatedList);
    saveStoredHabits(updatedList);
    setIsHabitModalOpen(false);
  };

  // Rule Handlers
  const handleOpenAddRule = () => {
    setEditingRuleId(null);
    const nextNum = String(rules.length + 1).padStart(2, '0');
    setRuleFormData({
      id: `Rule ${nextNum}`,
      rule: '',
      rationale: '',
      enforcement: ''
    });
    setIsRuleModalOpen(true);
  };

  const handleOpenEditRule = (rule: GoldenRule, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRuleId(rule.id);
    setRuleFormData({
      id: rule.id,
      rule: rule.rule,
      rationale: rule.rationale || '',
      enforcement: rule.enforcement || ''
    });
    setIsRuleModalOpen(true);
  };

  const handleDeleteRule = (id: string, ruleText: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete rule "${ruleText}"?`)) {
      const updated = rules.filter(r => r.id !== id);
      setRules(updated);
      saveStoredRules(updated);
    }
  };

  const handleSaveRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleFormData.rule.trim() || !ruleFormData.rationale.trim()) {
      alert('Please fill in Rule Name and Rationale.');
      return;
    }

    let updatedList: GoldenRule[];
    if (editingRuleId) {
      updatedList = rules.map(r => {
        if (r.id === editingRuleId) {
          return {
            ...r,
            rule: ruleFormData.rule.trim(),
            rationale: ruleFormData.rationale.trim(),
            enforcement: ruleFormData.enforcement.trim()
          };
        }
        return r;
      });
    } else {
      const newRule: GoldenRule = {
        id: ruleFormData.id.trim() || `Rule ${rules.length + 1}`,
        rule: ruleFormData.rule.trim(),
        rationale: ruleFormData.rationale.trim(),
        enforcement: ruleFormData.enforcement.trim()
      };
      updatedList = [...rules, newRule];
    }

    setRules(updatedList);
    saveStoredRules(updatedList);
    setIsRuleModalOpen(false);
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
              Daily Habits &amp; Golden Rules
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Daily Habits &amp; Execution Discipline
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            The mathematical standards of execution. Zero excuses, daily deliberate practice, verified git commits, and uncompromising Sunday audit gates. Fully editable and customizable for your personal engineering goals.
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

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleOpenAddHabit}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Habit</span>
            </button>
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
                className={`p-4 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-3 group relative ${
                  isDone 
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' 
                    : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <button className="mt-0.5 shrink-0 cursor-pointer">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-neutral-400" />
                    )}
                  </button>
                  <div className="min-w-0 pr-12">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-bold text-sm ${isDone ? 'line-through text-emerald-900' : 'text-neutral-900'}`}>
                        {habit.name}
                      </span>
                      {habit.targetTime && (
                        <span className="text-[10px] font-mono bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">
                          {habit.targetTime}
                        </span>
                      )}
                      {habit.category && (
                        <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded">
                          {habit.category}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${isDone ? 'text-emerald-800' : 'text-neutral-500'}`}>
                      {habit.description}
                    </p>
                  </div>
                </div>

                {/* Edit & Delete Actions */}
                <div className="absolute top-3 right-3 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleOpenEditHabit(habit, e)}
                    className="p-1 rounded text-neutral-400 hover:text-indigo-600 hover:bg-neutral-100 transition-colors"
                    title="Edit habit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteHabit(habit.id, habit.name, e)}
                    className="p-1 rounded text-neutral-400 hover:text-rose-600 hover:bg-neutral-100 transition-colors"
                    title="Delete habit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
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
              <span>Golden Non-Negotiable Silicon Execution Rules</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Read these every morning before opening terminal. Adhere with absolute academic and engineering integrity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleOpenAddRule}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Rule</span>
            </button>
            <button
              onClick={handleResetRules}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Default Rules</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule) => {
            return (
              <div
                key={rule.id}
                className="bg-neutral-50/70 border border-neutral-200 rounded-xl p-5 space-y-2.5 hover:border-neutral-300 transition-all relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    {rule.id}
                  </span>
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleOpenEditRule(rule, e)}
                      className="p-1 rounded text-neutral-400 hover:text-indigo-600 hover:bg-white transition-colors cursor-pointer"
                      title="Edit rule"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteRule(rule.id, rule.rule, e)}
                      className="p-1 rounded text-neutral-400 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer"
                      title="Delete rule"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
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

      {/* Habit Add/Edit Modal */}
      {isHabitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-600" />
                <span>{editingHabitId ? 'Edit Engineering Habit' : 'Add Daily Habit'}</span>
              </h3>
              <button 
                onClick={() => setIsHabitModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHabit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Habit Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Write Synthesizable RTL Daily"
                  value={habitFormData.name}
                  onChange={e => setHabitFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Target Time / Frequency</label>
                  <input
                    type="text"
                    placeholder="e.g. 90 mins / day"
                    value={habitFormData.targetTime}
                    onChange={e => setHabitFormData(prev => ({ ...prev, targetTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Coding, Hardware, Verification"
                    value={habitFormData.category}
                    onChange={e => setHabitFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Description &amp; Action Plan *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why this habit is non-negotiable and what specific actions are completed..."
                  value={habitFormData.description}
                  onChange={e => setHabitFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsHabitModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingHabitId ? 'Update Habit' : 'Save Habit'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rule Add/Edit Modal */}
      {isRuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>{editingRuleId ? 'Edit Execution Rule' : 'Add Golden Rule'}</span>
              </h3>
              <button 
                onClick={() => setIsRuleModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRule} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Rule Identifier / Code</label>
                <input
                  type="text"
                  placeholder="e.g. Rule 11 or Rule-P1"
                  value={ruleFormData.id}
                  onChange={e => setRuleFormData(prev => ({ ...prev, id: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Rule Statement / Mandate *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Never use asynchronous reset without formal synchronizer tree"
                  value={ruleFormData.rule}
                  onChange={e => setRuleFormData(prev => ({ ...prev, rule: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Engineering Rationale *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Why this rule is essential in real silicon production..."
                  value={ruleFormData.rationale}
                  onChange={e => setRuleFormData(prev => ({ ...prev, rationale: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Enforcement Standard / Proof Required</label>
                <input
                  type="text"
                  placeholder="e.g. Verilator lint pass with zero warnings before Git commit"
                  value={ruleFormData.enforcement}
                  onChange={e => setRuleFormData(prev => ({ ...prev, enforcement: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsRuleModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingRuleId ? 'Update Rule' : 'Save Rule'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
