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
  RuleItem,
  SubdomainDetail
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
import { enrichCurriculumTrack, enrichCareerPrepTrack } from '../data/domainsData';
import { StudentCollegeProfile } from '../data/universalCollegeData';
import { ECE_EEE_CAREER_FIELDS, EceEeeCareerField } from '../data/eceEeeCareersData';
import { ECE_EEE_PREP_TRACKS, EceEeeFieldPrepTrack } from '../data/eceEeePrepData';
import { ALL_SUBDOMAINS } from '../data/classificationData';
import { NIT_GOA_VLSI_STRATEGY_DATA, AcademicSemesterPlan } from '../data/nitGoaRoadmapData';

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
  CUSTOM_CAREER_PREP_TRACKS: 'ayush_tracker_custom_career_prep_tracks_v1',
  ENCYCLOPEDIA_STUDIED: 'ayush_tracker_encyclopedia_studied_v1',
  ENCYCLOPEDIA_BOOKMARKS: 'ayush_tracker_encyclopedia_bookmarks_v1',
  NIT_GOA_PROGRESS: 'ayush_tracker_nit_goa_progress_v1',
  NIT_GOA_ELECTIVES: 'ayush_tracker_nit_goa_electives_v1',
  COLLEGE_PROFILE: 'ayush_tracker_universal_college_profile_v1',
  ECE_EEE_PREP_PROGRESS: 'ayush_tracker_ece_eee_prep_progress_v1',
  ECE_EEE_PREP_BOOKMARKS: 'ayush_tracker_ece_eee_prep_bookmarks_v1',
  ECE_EEE_PREP_NOTES: 'ayush_tracker_ece_eee_prep_notes_v1',
  ECE_EEE_SELECTED_FIELD: 'ayush_tracker_ece_eee_selected_field_v1',
  CUSTOM_ECE_EEE_CAREERS: 'ayush_tracker_custom_ece_eee_careers_v1',
  CUSTOM_ECE_EEE_TRACKS: 'ayush_tracker_custom_ece_eee_prep_tracks_v1',
  CUSTOM_ENCYCLOPEDIA_DOCS: 'ayush_tracker_custom_encyclopedia_docs_v1',
  CUSTOM_ENCYCLOPEDIA_NOTES: 'ayush_tracker_custom_encyclopedia_notes_v1',
  CUSTOM_SUBDOMAINS: 'ayush_tracker_custom_subdomains_v1',
  CUSTOM_NIT_GOA_SEMESTERS: 'ayush_tracker_custom_nit_goa_semesters_v1',
  CUSTOM_NIT_GOA_TARGET_SKILLS: 'ayush_tracker_custom_nit_goa_target_skills_v1',
  CUSTOM_NIT_GOA_TARGET_ROLES: 'ayush_tracker_custom_nit_goa_target_roles_v1'
};

export const DEFAULT_STUDENT_PROFILE: StudentCollegeProfile = {
  collegeTierId: 'nit-goa',
  collegeName: 'National Institute of Technology Goa (NIT Goa)',
  department: 'eee',
  semester: '6th',
  labAccessTier: 'standard-hardware',
  targetCareerGoal: 'Tier-1 Silicon MNC',
  notes: 'Preserved official NIT Goa handbook & EE545 FPGA elective plan'
};

export function notifyStorageChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tracker_storage_updated'));
  }
}

export function getStudentCollegeProfile(): StudentCollegeProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COLLEGE_PROFILE);
    return raw ? JSON.parse(raw) : DEFAULT_STUDENT_PROFILE;
  } catch (e) {
    return DEFAULT_STUDENT_PROFILE;
  }
}

export function saveStudentCollegeProfile(profile: StudentCollegeProfile) {
  try {
    localStorage.setItem(STORAGE_KEYS.COLLEGE_PROFILE, JSON.stringify(profile));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save student college profile', e);
  }
}

// --- Checkboxes & Micro Progress Trackers ---

export function getNitGoaProgress(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NIT_GOA_PROGRESS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveNitGoaProgress(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEYS.NIT_GOA_PROGRESS, JSON.stringify(data));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save NIT Goa progress', e);
  }
}

export function getNitGoaElectives(): Record<string, 'selected' | 'completed' | 'planned'> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NIT_GOA_ELECTIVES);
    return raw ? JSON.parse(raw) : {
      'EE541': 'completed',
      'EE545': 'selected',
      'EE560': 'planned',
      'EE542': 'planned',
      'EE556': 'planned',
      'EE543': 'planned',
      'OE-ARCH': 'planned',
      'OE-AIML': 'planned'
    };
  } catch (e) {
    return {
      'EE541': 'completed',
      'EE545': 'selected',
      'EE560': 'planned'
    };
  }
}

export function saveNitGoaElectives(data: Record<string, 'selected' | 'completed' | 'planned'>) {
  try {
    localStorage.setItem(STORAGE_KEYS.NIT_GOA_ELECTIVES, JSON.stringify(data));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save NIT Goa electives', e);
  }
}

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
    notifyStorageChange();
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
    notifyStorageChange();
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
    notifyStorageChange();
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
    notifyStorageChange();
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
    notifyStorageChange();
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
    notifyStorageChange();
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
    notifyStorageChange();
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
    notifyStorageChange();
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
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(enrichCurriculumTrack);
      }
    }
  } catch (e) {
    console.error('Failed to read custom curriculum', e);
  }
  return initialCurriculum.map(enrichCurriculumTrack);
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
  return initialCurriculum.map(enrichCurriculumTrack);
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
    notifyStorageChange();
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
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save career prep projects', e);
  }
}

export function getStoredCareerPrepTracks(): CareerPrepTrack[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_CAREER_PREP_TRACKS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(enrichCareerPrepTrack);
      }
    }
  } catch (e) {
    console.error('Failed to read career prep tracks', e);
  }
  return initialCareerPrepTracks.map(enrichCareerPrepTrack);
}

export function saveStoredCareerPrepTracks(list: CareerPrepTrack[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CAREER_PREP_TRACKS, JSON.stringify(list));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save career prep tracks', e);
  }
}

export function resetStoredCareerPrepTracks(): CareerPrepTrack[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_CAREER_PREP_TRACKS);
    notifyStorageChange();
  } catch (e) {}
  return initialCareerPrepTracks.map(enrichCareerPrepTrack);
}

// --- Encyclopedia Study & Bookmark Tracking ---

export function getStudiedEncyclopediaDocs(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENCYCLOPEDIA_STUDIED);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveStudiedEncyclopediaDocs(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEYS.ENCYCLOPEDIA_STUDIED, JSON.stringify(data));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save studied encyclopedia docs', e);
  }
}

export function getBookmarkedEncyclopediaDocs(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENCYCLOPEDIA_BOOKMARKS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveBookmarkedEncyclopediaDocs(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEYS.ENCYCLOPEDIA_BOOKMARKS, JSON.stringify(data));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save bookmarked encyclopedia docs', e);
  }
}

// Aliases for seamless component compatibility
export const getStoredInterviews = getStoredInterviewQuestions;
export const saveStoredInterviews = saveStoredInterviewQuestions;
export const resetStoredInterviews = resetStoredInterviewQuestions;

export const getStoredOutreach = getStoredOutreachTemplates;
export const saveStoredOutreach = saveStoredOutreachTemplates;
export const resetStoredOutreach = resetStoredOutreachTemplates;

// --- ECE & EEE Preparation Tracks & Tool Progress ---

export function getEceEeePrepProgress(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ECE_EEE_PREP_PROGRESS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveEceEeePrepProgress(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEYS.ECE_EEE_PREP_PROGRESS, JSON.stringify(data));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save ECE/EEE prep progress', e);
  }
}

export function getEceEeePrepBookmarks(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ECE_EEE_PREP_BOOKMARKS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveEceEeePrepBookmarks(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEYS.ECE_EEE_PREP_BOOKMARKS, JSON.stringify(data));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save ECE/EEE prep bookmarks', e);
  }
}

export function getEceEeePrepNotes(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ECE_EEE_PREP_NOTES);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveEceEeePrepNotes(notes: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEYS.ECE_EEE_PREP_NOTES, JSON.stringify(notes));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save ECE/EEE prep notes', e);
  }
}

export function getEceEeeSelectedField(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ECE_EEE_SELECTED_FIELD);
    return raw || 'telecom-wireless';
  } catch (e) {
    return 'telecom-wireless';
  }
}

export function saveEceEeeSelectedField(fieldId: string) {
  try {
    localStorage.setItem(STORAGE_KEYS.ECE_EEE_SELECTED_FIELD, fieldId);
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save ECE/EEE selected field', e);
  }
}

export function resetEceEeePrepData() {
  try {
    localStorage.removeItem(STORAGE_KEYS.ECE_EEE_PREP_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.ECE_EEE_PREP_BOOKMARKS);
    localStorage.removeItem(STORAGE_KEYS.ECE_EEE_PREP_NOTES);
  } catch (e) {
    console.error('Failed to reset ECE/EEE prep data', e);
  }
}

// --- Universal User Data Backup, Import & Cross-Device Portability ---

export interface UniversalUserDataBackup {
  version: string;
  timestamp: string;
  exportedBy: string;
  studentProfile: StudentCollegeProfile;
  eceEeePrepProgress: Record<string, boolean>;
  eceEeePrepBookmarks: Record<string, boolean>;
  eceEeePrepNotes: Record<string, string>;
  selectedField: string;
  nitGoaProgress: Record<string, boolean>;
  nitGoaElectives: Record<string, string>;
  curriculumTopicsChecked: Record<string, boolean>;
  toolSkillsChecked: Record<string, boolean>;
  encyclopediaStudied: Record<string, boolean>;
  customEceEeeCareers?: EceEeeCareerField[];
  customEceEeeTracks?: EceEeeFieldPrepTrack[];
  customEncyclopediaDocs?: CustomEncyclopediaDoc[];
  customEncyclopediaNotes?: Record<string, string>;
  customSubdomains?: SubdomainDetail[];
  customNitGoaSemesters?: AcademicSemesterPlan[];
  customNitGoaTargetSkills?: string[];
  customNitGoaTargetRoles?: string[];
}

export function exportAllUniversalUserData(): string {
  const backup: UniversalUserDataBackup = {
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    exportedBy: 'Hardware & Silicon Engineering Tracker User',
    studentProfile: getStudentCollegeProfile(),
    eceEeePrepProgress: getEceEeePrepProgress(),
    eceEeePrepBookmarks: getEceEeePrepBookmarks(),
    eceEeePrepNotes: getEceEeePrepNotes(),
    selectedField: getEceEeeSelectedField(),
    nitGoaProgress: getNitGoaProgress(),
    nitGoaElectives: getNitGoaElectives(),
    curriculumTopicsChecked: getCheckedSubtopics(),
    toolSkillsChecked: getCheckedToolSkills(),
    encyclopediaStudied: getStudiedEncyclopediaDocs(),
    customEceEeeCareers: getStoredEceEeeCareers(),
    customEceEeeTracks: getStoredEceEeeTracks(),
    customEncyclopediaDocs: getStoredCustomEncyclopediaDocs(),
    customEncyclopediaNotes: getStoredEncyclopediaDocNotes(),
    customSubdomains: getStoredSubdomains(),
    customNitGoaSemesters: getStoredNitGoaSemesters(),
    customNitGoaTargetSkills: getStoredNitGoaTargetSkills(),
    customNitGoaTargetRoles: getStoredNitGoaTargetRoles()
  };
  return JSON.stringify(backup, null, 2);
}

export function importUniversalUserData(jsonString: string): { success: boolean; message: string } {
  try {
    const data = JSON.parse(jsonString);
    if (!data || typeof data !== 'object') {
      return { success: false, message: 'Invalid JSON format' };
    }

    if (data.studentProfile) saveStudentCollegeProfile(data.studentProfile);
    if (data.eceEeePrepProgress) saveEceEeePrepProgress(data.eceEeePrepProgress);
    if (data.eceEeePrepBookmarks) saveEceEeePrepBookmarks(data.eceEeePrepBookmarks);
    if (data.eceEeePrepNotes) saveEceEeePrepNotes(data.eceEeePrepNotes);
    if (data.selectedField) saveEceEeeSelectedField(data.selectedField);
    if (data.nitGoaProgress) saveNitGoaProgress(data.nitGoaProgress);
    if (data.curriculumTopicsChecked) saveCheckedSubtopics(data.curriculumTopicsChecked);
    if (data.toolSkillsChecked) saveCheckedToolSkills(data.toolSkillsChecked);
    if (data.encyclopediaStudied) saveStudiedEncyclopediaDocs(data.encyclopediaStudied);
    if (data.customEceEeeCareers && Array.isArray(data.customEceEeeCareers)) saveStoredEceEeeCareers(data.customEceEeeCareers);
    if (data.customEceEeeTracks && Array.isArray(data.customEceEeeTracks)) saveStoredEceEeeTracks(data.customEceEeeTracks);
    if (data.customEncyclopediaDocs && Array.isArray(data.customEncyclopediaDocs)) saveStoredCustomEncyclopediaDocs(data.customEncyclopediaDocs);
    if (data.customEncyclopediaNotes) saveStoredEncyclopediaDocNotes(data.customEncyclopediaNotes);
    if (data.customSubdomains && Array.isArray(data.customSubdomains)) saveStoredSubdomains(data.customSubdomains);
    if (data.customNitGoaSemesters && Array.isArray(data.customNitGoaSemesters)) saveStoredNitGoaSemesters(data.customNitGoaSemesters);
    if (data.customNitGoaTargetSkills && Array.isArray(data.customNitGoaTargetSkills)) saveStoredNitGoaTargetSkills(data.customNitGoaTargetSkills);
    if (data.customNitGoaTargetRoles && Array.isArray(data.customNitGoaTargetRoles)) saveStoredNitGoaTargetRoles(data.customNitGoaTargetRoles);

    return { success: true, message: 'Universal user data imported and restored successfully.' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to parse user data backup' };
  }
}

// --- ECE & EEE Careers Persistence ---
export function getStoredEceEeeCareers(): EceEeeCareerField[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_ECE_EEE_CAREERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom ECE/EEE careers', e);
  }
  return ECE_EEE_CAREER_FIELDS;
}

export function saveStoredEceEeeCareers(list: EceEeeCareerField[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ECE_EEE_CAREERS, JSON.stringify(list));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save custom ECE/EEE careers', e);
  }
}

export function resetStoredEceEeeCareers(): EceEeeCareerField[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_ECE_EEE_CAREERS);
    notifyStorageChange();
  } catch (e) {}
  return ECE_EEE_CAREER_FIELDS;
}

// --- ECE & EEE Prep Tracks Persistence ---
export function getStoredEceEeeTracks(): EceEeeFieldPrepTrack[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_ECE_EEE_TRACKS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom ECE/EEE prep tracks', e);
  }
  return ECE_EEE_PREP_TRACKS;
}

export function saveStoredEceEeeTracks(list: EceEeeFieldPrepTrack[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ECE_EEE_TRACKS, JSON.stringify(list));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save custom ECE/EEE prep tracks', e);
  }
}

export function resetStoredEceEeeTracks(): EceEeeFieldPrepTrack[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_ECE_EEE_TRACKS);
    notifyStorageChange();
  } catch (e) {}
  return ECE_EEE_PREP_TRACKS;
}

// --- Custom Encyclopedia Docs & Notes ---
export interface CustomEncyclopediaDoc {
  id: string;
  volumeId: string;
  title: string;
  category: string;
  tags: string[];
  estimatedReadingTime: string;
  summary: string;
  markdownContent: string;
  dateAdded?: string;
}

export function getStoredCustomEncyclopediaDocs(): CustomEncyclopediaDoc[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_ENCYCLOPEDIA_DOCS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveStoredCustomEncyclopediaDocs(docs: CustomEncyclopediaDoc[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ENCYCLOPEDIA_DOCS, JSON.stringify(docs));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save custom encyclopedia docs', e);
  }
}

export function getStoredEncyclopediaDocNotes(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_ENCYCLOPEDIA_NOTES);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveStoredEncyclopediaDocNotes(notes: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ENCYCLOPEDIA_NOTES, JSON.stringify(notes));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save encyclopedia notes', e);
  }
}

// --- Collect complete dataset for cloud synchronization & admin tracking ---
export function getAllUserDataForCloud() {
  const studentProfile = getStudentCollegeProfile();
  const eceEeeProgress = getEceEeePrepProgress();
  const eceEeeBookmarks = getEceEeePrepBookmarks();
  const eceEeeNotes = getEceEeePrepNotes();
  const activeField = getEceEeeSelectedField();
  const curriculumSubs = getCheckedSubtopics();
  const toolSkills = getCheckedToolSkills();
  const studiedDocs = getStudiedEncyclopediaDocs();
  const nitGoaProgress = getNitGoaProgress();
  const nitGoaElectives = getNitGoaElectives();
  const interviewStatus = getInterviewQuestionsStatus();
  const weeklyMilestones = getWeeklyMilestoneChecks();
  const habitsLog = getDailyHabitsLog();

  const eceCompleted = Object.values(eceEeeProgress).filter(Boolean).length;
  const curriculumDone = Object.values(curriculumSubs).filter(Boolean).length;
  const toolSkillsDone = Object.values(toolSkills).filter(Boolean).length;
  const docsDone = Object.values(studiedDocs).filter(Boolean).length;
  const nitGoaDone = Object.values(nitGoaProgress).filter(Boolean).length;
  const notesTotal = Object.keys(eceEeeNotes).length;
  const totalCompleted = eceCompleted + curriculumDone + toolSkillsDone + docsDone + nitGoaDone;
  const ecePercent = Math.min(100, Math.round((eceCompleted / 120) * 100));

  return {
    studentProfile,
    activeField: activeField || 'telecom-wireless',
    eceEeeProgress,
    eceEeeBookmarks,
    eceEeeNotes,
    curriculumSubs,
    toolSkills,
    studiedDocs,
    nitGoaProgress,
    nitGoaElectives,
    interviewStatus,
    weeklyMilestones,
    habitsLog,
    universalDataSnapshot: exportAllUniversalUserData(),
    statsSummary: {
      totalCompleted,
      eceCompleted,
      ecePercent,
      curriculumDone,
      toolSkillsDone,
      nitGoaDone,
      notesTotal,
      lastSynced: new Date().toISOString()
    }
  };
}

export function getStoredSubdomains(): SubdomainDetail[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_SUBDOMAINS);
    if (!raw) return ALL_SUBDOMAINS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ALL_SUBDOMAINS;
  } catch {
    return ALL_SUBDOMAINS;
  }
}

export function saveStoredSubdomains(subdomains: SubdomainDetail[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SUBDOMAINS, JSON.stringify(subdomains));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save subdomains:', e);
  }
}

export function resetStoredSubdomains(): SubdomainDetail[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_SUBDOMAINS);
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to reset subdomains:', e);
  }
  return ALL_SUBDOMAINS;
}

// --- NIT Goa Semesters & Roadmap Targets Persistence ---

export function getStoredNitGoaSemesters(): AcademicSemesterPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_NIT_GOA_SEMESTERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read custom NIT Goa semesters', e);
  }
  return NIT_GOA_VLSI_STRATEGY_DATA.semesters;
}

export function saveStoredNitGoaSemesters(semesters: AcademicSemesterPlan[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_NIT_GOA_SEMESTERS, JSON.stringify(semesters));
    notifyStorageChange();
  } catch (e) {
    console.error('Failed to save custom NIT Goa semesters', e);
  }
}

export function resetStoredNitGoaSemesters(): AcademicSemesterPlan[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_NIT_GOA_SEMESTERS);
    notifyStorageChange();
  } catch (e) {}
  return NIT_GOA_VLSI_STRATEGY_DATA.semesters;
}

export function getStoredNitGoaTargetSkills(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_NIT_GOA_TARGET_SKILLS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return NIT_GOA_VLSI_STRATEGY_DATA.targetGraduationProfile;
}

export function saveStoredNitGoaTargetSkills(skills: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_NIT_GOA_TARGET_SKILLS, JSON.stringify(skills));
    notifyStorageChange();
  } catch (e) {}
}

export function getStoredNitGoaTargetRoles(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_NIT_GOA_TARGET_ROLES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return NIT_GOA_VLSI_STRATEGY_DATA.targetRoles;
}

export function saveStoredNitGoaTargetRoles(roles: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_NIT_GOA_TARGET_ROLES, JSON.stringify(roles));
    notifyStorageChange();
  } catch (e) {}
}

export function resetStoredNitGoaTargets(): { skills: string[]; roles: string[] } {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_NIT_GOA_TARGET_SKILLS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_NIT_GOA_TARGET_ROLES);
    notifyStorageChange();
  } catch (e) {}
  return {
    skills: NIT_GOA_VLSI_STRATEGY_DATA.targetGraduationProfile,
    roles: NIT_GOA_VLSI_STRATEGY_DATA.targetRoles
  };
}



