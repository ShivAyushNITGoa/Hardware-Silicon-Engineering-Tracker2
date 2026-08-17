import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  Clock, 
  BookOpen, 
  ExternalLink, 
  Flame, 
  Sparkles, 
  CalendarCheck,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  RotateCcw
} from 'lucide-react';
import { prepResources } from '../data/projectsData';
import { HabitItem, RuleItem } from '../types';
import { 
  getDailyHabitsLog, 
  saveDailyHabitsLog,
  getStoredHabits,
  saveStoredHabits,
  resetStoredHabits,
  getStoredRules,
  saveStoredRules,
  resetStoredRules
} from '../utils/storage';

const BLANK_HABIT: HabitItem = {
  id: '',
  name: '',
  targetTime: '45 mins / day',
  description: 'Targeted deep work practice on Verilog RTL design and waveform debugging.',
  category: 'Coding'
};

const BLANK_RULE: RuleItem = {
  id: 'R11',
  rule: 'Rule Title',
  meaning: 'Clear explanation of why this rule protects engineering execution.',
  action: 'Daily or weekly actionable checkpoint to adhere to.',
  checkFrequency: 'Weekly on Sunday'
};

export const HabitsRulesView: React.FC = () => {
  const [habits, setHabits] = useState<HabitItem[]>(() => getStoredHabits());
  const [rules, setRules] = useState<RuleItem[]>(() => getStoredRules());
  const [habitsLog, setHabitsLog] = useState<Record<string, boolean>>(() => getDailyHabitsLog());

  // Habit Modal State
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<HabitItem | null>(null);
  const [habitFormState, setHabitFormState] = useState<HabitItem>(BLANK_HABIT);

  // Rule Modal State
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<RuleItem | null>(null);
  const [ruleFormState, setRuleFormState] = useState<RuleItem>(BLANK_RULE);

  const toggleHabit = (habitId: string) => {
    const nextState = {
      ...habitsLog,
      [habitId]: !habitsLog[habitId]
    };
    setHabitsLog(nextState);
    saveDailyHabitsLog(nextState);
  };

  // Habit CRUD Handlers
  const handleOpenAddHabit = () => {
    const newHabit: HabitItem = {
      ...BLANK_HABIT,
      id: `habit-${Date.now()}`
    };
    setEditingHabit(null);
    setHabitFormState(newHabit);
    setIsHabitModalOpen(true);
  };

  const handleOpenEditHabit = (h: HabitItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingHabit(h);
    setHabitFormState({ ...h });
    setIsHabitModalOpen(true);
  };

  const handleSaveHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitFormState.name.trim()) return;

    const finalized: HabitItem = {
      ...habitFormState,
      name: habitFormState.name.trim()
    };

    let updated: HabitItem[];
    if (editingHabit) {
      updated = habits.map(h => h.id === finalized.id ? finalized : h);
    } else {
      updated = [...habits, finalized];
    }

    setHabits(updated);
    saveStoredHabits(updated);
    setIsHabitModalOpen(false);
  };

  const handleDeleteHabit = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete habit "${name}"?`)) {
      const updated = habits.filter(h => h.id !== id);
      setHabits(updated);
      saveStoredHabits(updated);
    }
  };

  const handleResetHabits = () => {
    if (window.confirm('Reset habits to standard daily routine?')) {
      const reset = resetStoredHabits();
      setHabits(reset);
    }
  };

  // Rule CRUD Handlers
  const handleOpenAddRule = () => {
    const nextNum = rules.length + 1;
    const newRule: RuleItem = {
      ...BLANK_RULE,
      id: `R${nextNum}`,
      rule: `Rule ${nextNum}: Non-Negotiable Standard`
    };
    setEditingRule(null);
    setRuleFormState(newRule);
    setIsRuleModalOpen(true);
  };

  const handleOpenEditRule = (r: RuleItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRule(r);
    setRuleFormState({ ...r });
    setIsRuleModalOpen(true);
  };

  const handleSaveRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleFormState.rule.trim()) return;

    const finalized: RuleItem = {
      ...ruleFormState,
      rule: ruleFormState.rule.trim()
    };

    let updated: RuleItem[];
    if (editingRule) {
      updated = rules.map(r => r.id === finalized.id ? finalized : r);
    } else {
      updated = [...rules, finalized];
    }

    setRules(updated);
    saveStoredRules(updated);
    setIsRuleModalOpen(false);
  };

  const handleDeleteRule = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete rule "${id}: ${name}"?`)) {
      const updated = rules.filter(r => r.id !== id);
      setRules(updated);
      saveStoredRules(updated);
    }
  };

  const handleResetRules = () => {
    if (window.confirm('Reset rules to default 10 Golden Non-Negotiable Rules?')) {
      const reset = resetStoredRules();
      setRules(reset);
    }
  };

  const doneCount = habits.filter(h => habitsLog[h.id]).length;
  const totalCount = habits.length;
  const percent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Daily Habits Tracker */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-neutral-800" />
              Daily Engineering Habits & Deep Work Checklist
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Maintain consistent daily velocity with target timeboxes across core learning, implementation, testbenches, and interview drills.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-3 bg-neutral-50 px-4 py-2.5 rounded-lg border border-neutral-200">
              <div>
                <div className="text-[11px] text-neutral-500 font-medium uppercase">Today's Habits</div>
                <div className="text-lg font-bold text-neutral-900">{doneCount}/{totalCount} Completed</div>
              </div>
              <div className="w-16 bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: `${percent}%` }} />
              </div>
            </div>

            <button
              onClick={handleOpenAddHabit}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Habit</span>
            </button>

            <button
              onClick={handleResetHabits}
              className="p-2 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-lg transition-colors cursor-pointer"
              title="Reset habits to default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {habits.map(habit => {
            const isDone = !!habitsLog[habit.id];
            return (
              <div
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isDone 
                    ? 'bg-emerald-50/40 border-emerald-300 shadow-xs' 
                    : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="pt-0.5">
                    {isDone ? (
                      <div className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center">
                        <CheckSquare className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded border border-neutral-300 hover:border-neutral-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold ${isDone ? 'line-through text-neutral-500' : 'text-neutral-900'}`}>
                        {habit.name}
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-700">
                        {habit.targetTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 leading-snug">{habit.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 pt-0.5" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={(e) => handleOpenEditHabit(habit, e)}
                    className="p-1 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
                    title="Edit habit"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteHabit(habit.id, habit.name, e)}
                    className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
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

      {/* Golden Non-Negotiable Rules */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              Non-Negotiable Engineering Rules ({rules.length})
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Rules to maintain academic standing, prevent burnout, and guarantee undeniable portfolio evidence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAddRule}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Rule</span>
            </button>

            <button
              onClick={handleResetRules}
              className="p-1.5 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-lg transition-colors cursor-pointer"
              title="Reset rules to default 10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {rules.map(rule => (
            <div key={rule.id} className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm space-y-2 relative group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-neutral-900 text-white font-bold text-xs flex items-center justify-center font-mono">
                    {rule.id}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900">{rule.rule}</h4>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                    {rule.checkFrequency}
                  </span>
                  <button
                    onClick={(e) => handleOpenEditRule(rule, e)}
                    className="p-1 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
                    title="Edit rule"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteRule(rule.id, rule.rule, e)}
                    className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                    title="Delete rule"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">{rule.meaning}</p>
              <div className="bg-neutral-50 p-2 rounded text-[11px] font-medium text-neutral-800 border border-neutral-100">
                <span className="text-neutral-500 font-normal">Action: </span>{rule.action}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prep Resources */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-neutral-800" />
            Verified Technical Reference Resources
          </h3>
          <p className="text-xs text-neutral-600 mt-1">
            High-signal textbooks, official specifications, and practice platforms.
          </p>
        </div>

        <div className="space-y-4">
          {prepResources.map((res, i) => (
            <div key={i} className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
              <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-200 font-bold text-xs text-neutral-800 uppercase tracking-wider">
                {res.category}
              </div>
              <div className="divide-y divide-neutral-100">
                {res.items.map((item, j) => (
                  <div key={j} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-neutral-50/50 transition-colors">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-neutral-900">{item.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-neutral-100 text-neutral-700">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600">{item.use}</p>
                      <div className="text-[11px] text-indigo-700 font-medium">
                        Key Takeaway: {item.keyTakeaways}
                      </div>
                    </div>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium inline-flex items-center gap-1.5 flex-shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Visit Resource
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Habit Add/Edit Modal */}
      {isHabitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {editingHabit ? 'Edit Daily Habit' : 'Add Daily Habit'}
                </h3>
              </div>
              <button
                onClick={() => setIsHabitModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveHabit} className="p-4 sm:p-5 space-y-3 text-xs">
              <div>
                <label className="block text-slate-800 font-bold mb-1">Habit Name *</label>
                <input
                  type="text"
                  required
                  value={habitFormState.name}
                  onChange={e => setHabitFormState({ ...habitFormState, name: e.target.value })}
                  placeholder="e.g. Verilog RTL Implementation"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Category</label>
                <select
                  value={habitFormState.category}
                  onChange={e => setHabitFormState({ ...habitFormState, category: e.target.value as any })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
                >
                  <option value="Coding">Coding</option>
                  <option value="System & Projects">System & Projects</option>
                  <option value="Interview & Revision">Interview & Revision</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Target Time</label>
                <input
                  type="text"
                  value={habitFormState.targetTime}
                  onChange={e => setHabitFormState({ ...habitFormState, targetTime: e.target.value })}
                  placeholder="e.g. 45 mins / day"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={habitFormState.description}
                  onChange={e => setHabitFormState({ ...habitFormState, description: e.target.value })}
                  placeholder="Brief description of daily deliverables or methodology..."
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsHabitModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rule Add/Edit Modal */}
      {isRuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {editingRule ? `Edit Rule ${ruleFormState.id}` : 'Add Non-Negotiable Rule'}
                </h3>
              </div>
              <button
                onClick={() => setIsRuleModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRule} className="p-4 sm:p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">Rule ID *</label>
                  <input
                    type="text"
                    required
                    value={ruleFormState.id}
                    onChange={e => setRuleFormState({ ...ruleFormState, id: e.target.value })}
                    placeholder="e.g. R11"
                    className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-800 font-bold mb-1">Check Frequency</label>
                  <input
                    type="text"
                    value={ruleFormState.checkFrequency}
                    onChange={e => setRuleFormState({ ...ruleFormState, checkFrequency: e.target.value })}
                    placeholder="e.g. Weekly on Sunday"
                    className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Rule Headline *</label>
                <input
                  type="text"
                  required
                  value={ruleFormState.rule}
                  onChange={e => setRuleFormState({ ...ruleFormState, rule: e.target.value })}
                  placeholder="e.g. No Unverified RTL in Master Branch"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                />
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Meaning & Rationale</label>
                <textarea
                  rows={2}
                  value={ruleFormState.meaning}
                  onChange={e => setRuleFormState({ ...ruleFormState, meaning: e.target.value })}
                  placeholder="Why this rule exists and what risk it prevents..."
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                />
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Enforcement Action Checkpoint</label>
                <textarea
                  rows={2}
                  value={ruleFormState.action}
                  onChange={e => setRuleFormState({ ...ruleFormState, action: e.target.value })}
                  placeholder="Specific measurable action taken to enforce this rule..."
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRuleModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
