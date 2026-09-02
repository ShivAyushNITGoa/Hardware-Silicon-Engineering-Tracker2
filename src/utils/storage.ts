// LocalStorage state management helpers
import { 
  Company, 
  CurriculumTrack, 
  FlagshipProject, 
  ToolItem, 
  InterviewQuestion, 
  InstitutionInternship, 
  WeeklyMilestoneItem, 
  ColdOutreachTemplate, 
  HabitItem, 
  RuleItem 
} from '../types';

import { initialCompanies } from '../data/companiesData';
import { initialCurriculum } from '../data/curriculumData';
import { flagshipProjects, dailyHabits, goldenRules } from '../data/projectsData';
import { initialTools } from '../data/toolsData';
import { interviewQuestions } from '../data/interviewQuestionsData';
import { initialInstitutions } from '../data/institutionsData';
import { coldOutreachTemplates } from '../data/outreachData';
import { weeklyMilestones } from '../data/weeklyPlanData';
import { CareerPrepTrack, initialCareerPrepTracks } from '../data/careerPrepData';

const STORAGE_KEYS = {
  CHECKED_SUBTOPICS: 'ayush_tracker_checked_subtopics',
  CHECKED_TOOL_SKILLS: 'ayush_tracker_checked_tool_skills',
  COMPANIES_OVERRIDE: 'ayush_tracker_companies_override',
  CUSTOM_COMPANIES: 'ayush_tracker_custom_companies_list_v2',
  CUSTOM_CURRICULUM: 'ayush_tracker_custom_curriculum_v2',
  CUSTOM_PROJECTS: 'ayush_tracker_custom_projects_v2',
  CUSTOM_TOOLS: 'ayush_tracker_custom_tools_v2',
  CUSTOM_INTERVIEWS: 'ayush_tracker_custom_interviews_v2',
  CUSTOM_INSTITUTIONS: 'ayush_tracker_custom_institutions_v2',
  CUSTOM_MILESTONES: 'ayush_tracker_custom_milestones_v2',
  CUSTOM_OUTREACH: 'ayush_tracker_custom_outreach_v2',
  CUSTOM_HABITS: 'ayush_tracker_custom_habits_v2',
  CUSTOM_RULES: 'ayush_tracker_custom_rules_v2',
  PROJECTS_STATUS: 'ayush_tracker_projects_status',
  DAILY_HABITS_LOG: 'ayush_tracker_habits_log',
  USER_NOTES: 'ayush_tracker_user_notes',
  INTERVIEW_STATUS: 'ayush_tracker_interview_status',
  SUNDAY_AUDIT_LOGS: 'ayush_tracker_sunday_audit_logs',
  WEEKLY_MILESTONES: 'ayush_tracker_weekly_milestones',
  INSTITUTIONS_OVERRIDE: 'ayush_tracker_institutions_override',
  CAREER_PREP_TASKS: 'ayush_tracker_career_prep_tasks',
  CAREER_PREP_PROJECTS: 'ayush_tracker_career_prep_projects',
  CUSTOM_CAREER_PREP_TRACKS: 'ayush_tracker_custom_career_prep_tracks_v1'
};

// --- Checkboxes & Micro Progress Trackers ---

export function getCheckedSubtopics(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHECKED_SUBTOPICS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveCheckedSubtopics(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEYS.CHECKED_SUBTOPICS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save checked subtopics', e);
  }
}

export function getCheckedToolSkills(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHECKED_TOOL_SKILLS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveCheckedToolSkills(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEYS.CHECKED_TOOL_SKILLS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save tool skills', e);
  }
}

export function getCompaniesOverrides(): Record<string, any> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPANIES_OVERRIDE);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveCompaniesOverrides(data: Record<string, any>) {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPANIES_OVERRIDE, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save company overrides', e);
  }
}

export function getDailyHabitsLog(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_HABITS_LOG);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveDailyHabitsLog(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_HABITS_LOG, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save daily habits log', e);
  }
}

export function getInterviewQuestionsStatus(): Record<string, 'Mastered' | 'Review' | 'Untested'> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INTERVIEW_STATUS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveInterviewQuestionsStatus(data: Record<string, 'Mastered' | 'Review' | 'Untested'>) {
  try {
    localStorage.setItem(STORAGE_KEYS.INTERVIEW_STATUS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save interview status', e);
  }
}

export function getSundayAuditLogs(): any[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUNDAY_AUDIT_LOGS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveSundayAuditLogs(data: any[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.SUNDAY_AUDIT_LOGS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save sunday audit logs', e);
  }
}

export function getWeeklyMilestoneChecks(): Record<number, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WEEKLY_MILESTONES);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveWeeklyMilestoneChecks(data: Record<number, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEYS.WEEKLY_MILESTONES, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save weekly milestones', e);
  }
}

export function getInstitutionsOverrides(): Record<string, any> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INSTITUTIONS_OVERRIDE);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveInstitutionsOverrides(data: Record<string, any>) {
  try {
    localStorage.setItem(STORAGE_KEYS.INSTITUTIONS_OVERRIDE, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save institutions overrides', e);
  }
}

// --- Full Entity CRUD & Custom Lists ---

// 1. Companies
export function getStoredCompanies(): Company[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_COMPANIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom companies', e);
  }
  return initialCompanies;
}

export function saveStoredCompanies(list: Company[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_COMPANIES, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save companies', e);
  }
}

export function resetStoredCompanies(): Company[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_COMPANIES);
  } catch (e) {}
  return initialCompanies;
}

// 2. Curriculum
export function getStoredCurriculum(): CurriculumTrack[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_CURRICULUM);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom curriculum', e);
  }
  return initialCurriculum;
}

export function saveStoredCurriculum(list: CurriculumTrack[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CURRICULUM, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save curriculum', e);
  }
}

export function resetStoredCurriculum(): CurriculumTrack[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_CURRICULUM);
  } catch (e) {}
  return initialCurriculum;
}

// 3. Projects
export function getStoredProjects(): FlagshipProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_PROJECTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom projects', e);
  }
  return flagshipProjects;
}

export function saveStoredProjects(list: FlagshipProject[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PROJECTS, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save projects', e);
  }
}

export function resetStoredProjects(): FlagshipProject[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_PROJECTS);
  } catch (e) {}
  return flagshipProjects;
}

// 4. Tools
export function getStoredTools(): ToolItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_TOOLS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom tools', e);
  }
  return initialTools;
}

export function saveStoredTools(list: ToolItem[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_TOOLS, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save tools', e);
  }
}

export function resetStoredTools(): ToolItem[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_TOOLS);
  } catch (e) {}
  return initialTools;
}

// 5. Interview Questions
export function getStoredInterviewQuestions(): InterviewQuestion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_INTERVIEWS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom interviews', e);
  }
  return interviewQuestions;
}

export function saveStoredInterviewQuestions(list: InterviewQuestion[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_INTERVIEWS, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save interview questions', e);
  }
}

export function resetStoredInterviewQuestions(): InterviewQuestion[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_INTERVIEWS);
  } catch (e) {}
  return interviewQuestions;
}

// 6. Institutions
export function getStoredInstitutions(): InstitutionInternship[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_INSTITUTIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom institutions', e);
  }
  return initialInstitutions;
}

export function saveStoredInstitutions(list: InstitutionInternship[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_INSTITUTIONS, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save institutions', e);
  }
}

export function resetStoredInstitutions(): InstitutionInternship[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_INSTITUTIONS);
  } catch (e) {}
  return initialInstitutions;
}

// 7. Weekly Milestones
export function getStoredMilestones(): WeeklyMilestoneItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_MILESTONES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom milestones', e);
  }
  return weeklyMilestones;
}

export function saveStoredMilestones(list: WeeklyMilestoneItem[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_MILESTONES, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save milestones', e);
  }
}

export function resetStoredMilestones(): WeeklyMilestoneItem[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_MILESTONES);
  } catch (e) {}
  return weeklyMilestones;
}

// 8. Outreach Templates
export function getStoredOutreachTemplates(): ColdOutreachTemplate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_OUTREACH);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom outreach', e);
  }
  return coldOutreachTemplates;
}

export function saveStoredOutreachTemplates(list: ColdOutreachTemplate[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_OUTREACH, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save outreach templates', e);
  }
}

export function resetStoredOutreachTemplates(): ColdOutreachTemplate[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_OUTREACH);
  } catch (e) {}
  return coldOutreachTemplates;
}

// 9. Habits
export function getStoredHabits(): HabitItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_HABITS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom habits', e);
  }
  return dailyHabits;
}

export function saveStoredHabits(list: HabitItem[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_HABITS, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save habits', e);
  }
}

export function resetStoredHabits(): HabitItem[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_HABITS);
  } catch (e) {}
  return dailyHabits;
}

// 10. Golden Rules
export function getStoredRules(): RuleItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_RULES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom rules', e);
  }
  return goldenRules;
}

export function saveStoredRules(list: RuleItem[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_RULES, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save rules', e);
  }
}

export function resetStoredRules(): RuleItem[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_RULES);
  } catch (e) {}
  return goldenRules;
}

// 11. Career Prep Tracks & Tasks
export function getCheckedCareerTasks(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CAREER_PREP_TASKS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveCheckedCareerTasks(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEYS.CAREER_PREP_TASKS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save career prep tasks', e);
  }
}

export function getCheckedCareerProjects(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CAREER_PREP_PROJECTS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveCheckedCareerProjects(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEYS.CAREER_PREP_PROJECTS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save career prep projects', e);
  }
}

export function getStoredCareerPrepTracks(): CareerPrepTrack[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_CAREER_PREP_TRACKS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read career prep tracks', e);
  }
  return initialCareerPrepTracks;
}

export function saveStoredCareerPrepTracks(list: CareerPrepTrack[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CAREER_PREP_TRACKS, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save career prep tracks', e);
  }
}

export function resetStoredCareerPrepTracks(): CareerPrepTrack[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_CAREER_PREP_TRACKS);
  } catch (e) {}
  return initialCareerPrepTracks;
}

