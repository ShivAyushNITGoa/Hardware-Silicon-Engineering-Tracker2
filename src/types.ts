export type PriorityLevel = 'Dream' | 'Critical' | 'High' | 'Medium';

export type ApplicationStatus = 
  | 'Wishlist' 
  | 'Resume Ready' 
  | 'Applied' 
  | 'Online Assessment' 
  | 'Technical Interview' 
  | 'Offer' 
  | 'Rejected';

export interface Company {
  id: string;
  name: string;
  tier: 'MNC Semiconductor' | 'EDA & IP Giant' | 'Indian RISC-V & Fabless Startup' | 'VLSI Design Services' | 'Embedded & Edge Robotics';
  locations: string[];
  roles: string[];
  requirements: string[];
  keyHighlights: string;
  careerUrl: string;
  directApplyUrl?: string;
  websiteUrl: string;
  priority: PriorityLevel;
  status: ApplicationStatus;
  hiringPlatforms?: ('LinkedIn' | 'Internshala' | 'Wellfound' | 'Naukri' | 'Unstop' | 'Company Portal')[];
  internshipProgramName?: string;
  notes?: string;
  appliedDate?: string;
  contactPerson?: string;
}

export interface SubTopic {
  id: string;
  title: string;
  detail: string;
  isExitGate?: boolean;
}

export interface ConceptTopic {
  id: string;
  stage: number;
  title: string;
  whatToLearn: string;
  whyItMatters: string;
  practiceExercise: string;
  buildDeliverable: string;
  howToTest: string;
  exitCriteria: string;
  priority: PriorityLevel;
  week: string;
  subtopics: SubTopic[];
}

export interface CurriculumTrack {
  id: string;
  name: string;
  category: string;
  description: string;
  priority: PriorityLevel;
  plannedHours: number;
  currentFocus: string;
  nextGate: string;
  evidence: string;
  topics: ConceptTopic[];
}

export interface ToolSkill {
  id: string;
  name: string;
  description: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: 'Synthesis & Implementation' | 'Simulation & Verification' | 'Architecture & Compilers' | 'Embedded & RTOS' | 'Modeling & Scripting' | 'Hardware Debugging' | 'Hardware & PCB Design' | 'Physical Design & ASIC';
  description: string;
  coreConcepts: string[];
  keySkillsToMaster: ToolSkill[];
  officialUrl?: string;
  installOrRunCommand?: string;
}

export interface FlagshipProject {
  id: string;
  name: string;
  purpose: string;
  prerequisites: string;
  architectureFlow: string;
  steps: string[];
  validation: string;
  metrics: string;
  githubEvidence: string;
  demoRequirement: string;
  resumeBullet: string;
  targetWeek: string;
  jageshwarComparison: string;
}

export interface HabitItem {
  id: string;
  name: string;
  targetTime: string;
  description: string;
  category: 'Coding' | 'System & Projects' | 'Interview & Revision';
}

export interface RuleItem {
  id: string;
  rule: string;
  meaning: string;
  action: string;
  checkFrequency: string;
}

export interface PrepResource {
  category: string;
  items: {
    title: string;
    type: 'Official Docs' | 'Spec' | 'Tutorials' | 'Textbook' | 'Practice Platform' | 'Community' | 'Video/Course';
    use: string;
    link?: string;
    keyTakeaways: string;
  }[];
}

export type InterviewQuestionCategory = 
  | 'STA & Timing' 
  | 'SystemVerilog RTL' 
  | 'ASIC Verification & UVM' 
  | 'RISC-V Architecture' 
  | 'Embedded C & FreeRTOS' 
  | 'Protocols & Buses'
  | 'Embedded Linux & Kernel'
  | 'Physical Design & Backend'
  | 'Hardware PCB & Signal Integrity'
  | 'DFT & Silicon Test';

export interface InterviewQuestion {
  id: string;
  title: string;
  category: InterviewQuestionCategory;
  difficulty: 'Core' | 'Advanced' | 'Crucial';
  companies: string[];
  question: string;
  answer: string;
  codeSnippet?: string;
  formulaOrDiagram?: string;
  keyTakeaway: string;
}

export interface ColdOutreachTemplate {
  id: string;
  targetCategory: string;
  roleTarget: string;
  subject: string;
  body: string;
  customizationTips: string[];
}

export type InstitutionType = 
  | 'IIT' 
  | 'IISc & Premier Research' 
  | 'NIT' 
  | 'IIIT' 
  | 'BITS & Premier Universities'
  | 'National R&D Lab / CSIR' 
  | 'National Academy Fellowship';

export type InstitutionalDomain = 
  | 'VLSI & RTL Design'
  | 'RISC-V & Processor Architecture'
  | 'Nanoelectronics & Device Physics'
  | 'Embedded Systems & IoT'
  | 'EDA Tools & Open-Source Silicon'
  | 'Hardware Security & Cryptography'
  | 'Neuromorphic & Edge AI'
  | 'Silicon Photonics & MEMS';

export interface NotableProfessorOrLab {
  name: string;
  designation: string;
  researchArea: string;
  labOrGroup: string;
  websiteOrProfile?: string;
  keyProjectsOrTopics?: string[];
}

export interface InstitutionInternship {
  id: string;
  instituteName: string;
  shortName: string;
  type: InstitutionType;
  programName: string;
  location: string;
  domains: InstitutionalDomain[];
  stipend: string;
  stipendAmountNumeric?: number;
  duration: string;
  applicationWindow: string;
  deadlineDescription: string;
  eligibility: string;
  minCgpaOrRank?: string;
  officialPortalUrl: string;
  overview: string;
  keyHighlights: string[];
  selectionProcess: string;
  deliverablesAndOutcomes: string[];
  notableFacultyAndLabs: NotableProfessorOrLab[];
  applicationStrategyTips: string[];
  status?: ApplicationStatus;
  userNotes?: string;
  appliedDate?: string;
}

export interface WeeklyMilestoneItem {
  week: number;
  month: number;
  title: string;
  phase: string;
  targetHours: number;
  coreGoals: string[];
  deliverable: string;
  exitGate: string;
}

export interface SundayAuditEntry {
  id: string;
  date: string;
  week: number;
  hoursLogged: number;
  topicsDone: number;
  repoCommitsUrl: string;
  blockersFaced: string;
  nextWeekCommitment: string;
  status: 'Passed' | 'Action Needed';
}
