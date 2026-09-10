import React, { useState, useEffect } from 'react';
import { X, Save, BookOpen, Calendar, Target as TargetIcon, Plus, Trash2 } from 'lucide-react';

export interface ElectiveFormData {
  code: string;
  name: string;
  category: 'Department Elective' | 'Open Elective (OE)' | 'Core Lab' | 'Mandatory';
  priority: 'Top Priority' | 'Recommended' | 'Alternative';
  reason: string;
  expectedLearningText: string;
}

export interface MilestoneFormData {
  title: string;
  description: string;
  category: 'RTL' | 'FPGA' | 'Architecture' | 'Embedded' | 'Verification' | 'Projects';
}

interface ElectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (semesterNumber: number, data: ElectiveFormData, originalCode?: string) => void;
  initialSemester: number;
  initialData?: {
    code: string;
    name: string;
    category: 'Department Elective' | 'Open Elective (OE)' | 'Core Lab' | 'Mandatory';
    priority: 'Top Priority' | 'Recommended' | 'Alternative';
    reason: string;
    expectedLearning: string[];
  } | null;
  availableSemesters: { number: number; label: string }[];
}

export const NitGoaElectiveModal: React.FC<ElectiveModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSemester,
  initialData,
  availableSemesters
}) => {
  const [semesterNumber, setSemesterNumber] = useState<number>(initialSemester);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Department Elective' | 'Open Elective (OE)' | 'Core Lab' | 'Mandatory'>('Department Elective');
  const [priority, setPriority] = useState<'Top Priority' | 'Recommended' | 'Alternative'>('Top Priority');
  const [reason, setReason] = useState('');
  const [expectedLearningText, setExpectedLearningText] = useState('');

  useEffect(() => {
    if (initialData) {
      setCode(initialData.code);
      setName(initialData.name);
      setCategory(initialData.category);
      setPriority(initialData.priority);
      setReason(initialData.reason);
      setExpectedLearningText(initialData.expectedLearning.join('\n'));
    } else {
      setCode('');
      setName('');
      setCategory('Department Elective');
      setPriority('Top Priority');
      setReason('');
      setExpectedLearningText('');
    }
    setSemesterNumber(initialSemester);
  }, [initialData, initialSemester, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) return;
    onSave(
      semesterNumber,
      {
        code: code.trim().toUpperCase(),
        name: name.trim(),
        category,
        priority,
        reason: reason.trim(),
        expectedLearningText
      },
      initialData?.code
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                {initialData ? 'Edit Semester Elective' : 'Add Semester Elective'}
              </h3>
              <p className="text-xs text-neutral-500">Curriculum recommendation for NIT Goa B.Tech roadmap</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-neutral-800">Target Semester</label>
              <select
                value={semesterNumber}
                onChange={(e) => setSemesterNumber(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
              >
                {availableSemesters.map((s) => (
                  <option key={s.number} value={s.number}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-neutral-800">
                Course Code <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. EE545 or OE-ARCH"
                className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 uppercase font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-800">
              Course Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. FPGA Based Digital System Design"
              className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-neutral-800">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
              >
                <option value="Department Elective">Department Elective</option>
                <option value="Open Elective (OE)">Open Elective (OE)</option>
                <option value="Core Lab">Core Lab</option>
                <option value="Mandatory">Mandatory</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-neutral-800">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
              >
                <option value="Top Priority">Top Priority</option>
                <option value="Recommended">Recommended</option>
                <option value="Alternative">Alternative</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-800">Strategic Rationale & Reason</label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why this course is crucial for VLSI, RTL, or SoC design..."
              className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-800">
              Expected Learning Outcomes <span className="text-neutral-400 font-normal">(1 per line)</span>
            </label>
            <textarea
              rows={3}
              value={expectedLearningText}
              onChange={(e) => setExpectedLearningText(e.target.value)}
              placeholder={"Vivado Synthesis & Bitstream generation\nXilinx Artix-7/Basys3 hardware mapping\nTiming closure on FPGA clock nets"}
              className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono text-[11px]"
            />
          </div>

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              {initialData ? 'Save Changes' : 'Add Elective'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (semesterNumber: number, data: MilestoneFormData, originalId?: string) => void;
  initialSemester: number;
  initialData?: {
    id: string;
    title: string;
    description: string;
    category: 'RTL' | 'FPGA' | 'Architecture' | 'Embedded' | 'Verification' | 'Projects';
  } | null;
  availableSemesters: { number: number; label: string }[];
}

export const NitGoaMilestoneModal: React.FC<MilestoneModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSemester,
  initialData,
  availableSemesters
}) => {
  const [semesterNumber, setSemesterNumber] = useState<number>(initialSemester);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'RTL' | 'FPGA' | 'Architecture' | 'Embedded' | 'Verification' | 'Projects'>('RTL');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setCategory(initialData.category);
    } else {
      setTitle('');
      setDescription('');
      setCategory('RTL');
    }
    setSemesterNumber(initialSemester);
  }, [initialData, initialSemester, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(
      semesterNumber,
      {
        title: title.trim(),
        description: description.trim(),
        category
      },
      initialData?.id
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                {initialData ? 'Edit Milestone Skill' : 'Add Technical Milestone'}
              </h3>
              <p className="text-xs text-neutral-500">Semester milestone requirement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-neutral-800">Target Semester</label>
              <select
                value={semesterNumber}
                onChange={(e) => setSemesterNumber(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
              >
                {availableSemesters.map((s) => (
                  <option key={s.number} value={s.number}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-neutral-800">Domain Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
              >
                <option value="RTL">RTL</option>
                <option value="FPGA">FPGA</option>
                <option value="Architecture">Architecture</option>
                <option value="Embedded">Embedded</option>
                <option value="Verification">Verification</option>
                <option value="Projects">Projects</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-800">
              Milestone Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master Vivado RTL-to-Bitstream Flow"
              className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-800">Description / Deliverable</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Synthesize on Vivado and verify timing closure on Basys3..."
              className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              {initialData ? 'Save Changes' : 'Add Milestone'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface TargetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (skills: string[], roles: string[]) => void;
  initialSkills: string[];
  initialRoles: string[];
}

export const NitGoaTargetsModal: React.FC<TargetsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSkills,
  initialRoles
}) => {
  const [skillsText, setSkillsText] = useState('');
  const [rolesText, setRolesText] = useState('');

  useEffect(() => {
    setSkillsText(initialSkills.join('\n'));
    setRolesText(initialRoles.join('\n'));
  }, [initialSkills, initialRoles, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = skillsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const roles = rolesText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);
    onSave(skills, roles);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <TargetIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Customize Target Profile &amp; Roles</h3>
              <p className="text-xs text-neutral-500">Graduation skill stack and target industry positions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-800">
              Final Skill Stack <span className="text-neutral-400 font-normal">(1 item per line)</span>
            </label>
            <textarea
              rows={4}
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder={"Verilog / SystemVerilog RTL\nUVM Constrained-Random\nSTA & Timing Closure\nFPGA Vivado / Artix-7"}
              className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono text-[11px]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-800">
              Target Job Roles <span className="text-neutral-400 font-normal">(1 role per line)</span>
            </label>
            <textarea
              rows={3}
              value={rolesText}
              onChange={(e) => setRolesText(e.target.value)}
              placeholder={"ASIC RTL Design Engineer\nDesign Verification (DV) Engineer\nFPGA Emulation Engineer\nSoC Architecture Intern"}
              className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono text-[11px]"
            />
          </div>

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              Save Target Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
