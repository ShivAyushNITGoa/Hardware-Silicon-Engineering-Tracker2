export type PriorityLevel = 'Dream' | 'Critical' | 'High' | 'Medium';

export type ApplicationStatus = 
  | 'Wishlist' 
  | 'Resume Ready' 
  | 'Applied' 
  | 'Online Assessment' 
  | 'Technical Interview' 
  | 'Offer' 
  | 'Rejected';

export type SuperDomainId = 'all' | 'vlsi' | 'embedded' | 'career-strategy';

export type ClassificationType = 'all' | 'job' | 'skill' | 'knowledge';

export interface JobProfileClassification {
  id: string;
  title: string;
  experienceTier: 'Entry / Intern' | 'Junior (1-3 Yrs)' | 'Mid / Senior';
  description: string;
  keyResponsibilities: string[];
  primaryDeliverables: string[];
  interviewTopics: string[];
  targetCompanies: string[];
  salaryIndiaCTC?: string;
  salaryUSRange?: string;
  industryDemandLevel?: 'Surging' | 'Very High' | 'High' | 'Steady';
  typicalInterviewRounds?: string[];
  standardProcessNodes?: string[];
  dayInTheLifeSnippet?: string;
}

export interface SkillProfileClassification {
  id: string;
  name: string;
  category: 'HDL & RTL' | 'Verification & OOP' | 'Physical & Timing' | 'EDA Scripting' | 'Embedded Firmware' | 'Board Hardware' | 'Analog & Mixed Signal' | 'Post-Silicon Validation' | 'Automotive & Safety' | string;
  proficiencyLevel: 'Foundational' | 'Core Industrial' | 'Advanced Signoff';
  industryRelevance: string;
  masteryCriteria: string;
  tools: string[];
  practicalProjectEvidence: string;
  standardsCompliance?: string[];
  industrialBenchmark?: string;
}

export interface KnowledgeProfileClassification {
  id: string;
  concept: string;
  theoryDepth: 'Theoretical Foundation' | 'Architectural Concept' | 'Tapeout / Signoff Reality';
  whyCrucial: string;
  keyQuestions: string[];
  whiteboardFormulas?: string[];
  interviewEmphasis: string;
  deepAnalysisExplanation?: string;
  siliconImpact?: string;
  mitigationTechniques?: string[];
}

export interface SubdomainDetail {
  id: string;
  name: string;
  domainId: 'vlsi' | 'embedded' | 'career-strategy';
  domainName: string;
  tagline: string;
  description: string;
  iconName: string;
  badgeColor: string;
  jobs: JobProfileClassification[];
  skills: SkillProfileClassification[];
  knowledge: KnowledgeProfileClassification[];
  relatedTrackIds: string[];
  relatedEncyclopediaVolumes: string[];
}

export interface SuperDomain {
  id: 'vlsi' | 'embedded' | 'career-strategy';
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  badgeColor: string;
  borderColor: string;
  bgLightColor: string;
  iconName: string;
  subdomainIds: EngineeringDomainId[];
}

export type EngineeringDomainId = 
  | 'digital-vlsi' 
  | 'verification-dft' 
  | 'physical-design' 
  | 'fpga-hardware' 
  | 'embedded-firmware' 
  | 'career-interview';

export interface EngineeringDomain {
  id: EngineeringDomainId;
  superDomainId: 'vlsi' | 'embedded' | 'career-strategy';
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  badgeColor: string;
  borderColor: string;
  bgLightColor: string;
  curriculumTrackIds: string[];
  careerTrackIds: string[];
  jobSpecificRoles: string[];
  subParts: string[];
}

export interface Company {
  id: string;
  name: string;
  tier: 'MNC Semiconductor' | 'EDA & IP Giant' | 'Indian RISC-V & Fabless Startup' | 'VLSI Design Services' | 'Embedded & Edge Robotics' | string;
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
  subPart?: string;
  jobRole?: string;
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
  domainId?: EngineeringDomainId;
  domainName?: string;
  jobSpecificRoles?: string[];
  subParts?: string[];
}

export type Discipline = 'vlsi' | 'embedded' | 'all';

export interface CurriculumTopic {
  id: string;
  discipline: 'vlsi' | 'embedded';
  field: string;
  number: number;
  title: string;
  tagline: string;
  targetRoles: string[];
  estimatedHours: number;
  whyItMatters: string;
  coreConcepts: string[];
  practiceExercise: string;
  deliverable: string;
  documentationPath?: string;
}

export interface InterviewDrill {
  id: string;
  discipline: 'vlsi' | 'embedded';
  field: string;
  targetRole: string;
  title: string;
  category: string;
  difficulty: string;
  frequency: string;
  question: string;
  conceptSummary: string;
  asciiDiagram?: string;
  codeSnippet?: {
    language: string;
    caption: string;
    code: string;
  };
  keyFormulas?: string[];
  modelAnswer?: string;
  gotchasAndPitfalls?: string[];
  interviewTips?: string;
  relatedDocPath?: string;
  keyTakeaways?: string[];
  commonMistakes?: string[];
}

export interface JobRole {
  id: string;
  discipline: 'vlsi' | 'embedded';
  field: string;
  title: string;
  tagline: string;
  salaryRangeIndia: string;
  salaryRangeUS: string;
  description: string;
  coreSkills: string[];
  languages: string[];
  toolsAndEda: string[];
  keyWhiteboardTopics: string[];
  sampleDeliverables: string[];
  typicalInterviewRounds: string[];
  topCompanies: string[];
  dayInTheLife: string;
}

export interface ToolSkill {
  id: string;
  name: string;
  description?: string;
  discipline?: 'vlsi' | 'embedded' | string;
  category?: string;
  vendor?: string;
  license?: string;
  purpose?: string;
  standardIndustryUsage?: string;
  commandsOrWorkflow?: string[];
  relevanceByField?: { field: string; note: string }[];
}

export interface ToolItem {
  id: string;
  name: string;
  category: 'Synthesis & Implementation' | 'Simulation & Verification' | 'Architecture & Compilers' | 'Embedded & RTOS' | 'Modeling & Scripting' | 'Hardware Debugging' | 'Hardware & PCB Design' | 'Physical Design & ASIC' | string;
  description: string;
  coreConcepts?: string[];
  keySkillsToMaster: ToolSkill[];
  officialUrl?: string;
  installOrRunCommand?: string;
  licenseType?: string;
  standardCommand?: string;
  documentationUrl?: string;
}

export interface FlagshipProject {
  id: string;
  name?: string;
  title?: string;
  discipline?: 'vlsi' | 'embedded' | string;
  field?: string;
  badge?: string;
  difficulty?: string;
  targetRoles?: string[];
  summary?: string;
  hardwareSpecs?: Record<string, any>;
  skillsDemonstrated?: string[];
  architectureDetails?: string[];
  resumeBulletPoints?: string[];
  githubStructure?: string[];
  purpose?: string;
  prerequisites?: string;
  architectureFlow?: string;
  steps?: string[];
  validation?: string;
  metrics?: string;
  githubEvidence?: string;
  demoRequirement?: string;
  resumeBullet?: string;
  targetWeek?: string;
  jageshwarComparison?: string;
}

export interface HabitItem {
  id: string;
  name: string;
  targetTime: string;
  description: string;
  category?: 'Coding' | 'System & Projects' | 'Interview & Revision' | string;
  rationale?: string;
}

export interface RuleItem {
  id: string;
  rule: string;
  meaning?: string;
  action?: string;
  checkFrequency?: string;
  rationale?: string;
  enforcement?: string;
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
  name?: string;
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
  deadline?: string;
  eligibility: string;
  minCgpaOrRank?: string;
  officialPortalUrl: string;
  applicationUrl?: string;
  websiteUrl?: string;
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

// Aliases and additional utility types for components
export type CompanyTier = 'Tier-1 MNC' | 'Semiconductor Giant' | 'Pure-Play Fabless / Startup' | 'EDA & IP Vendor' | 'Aerospace / Defense' | string;
export type Priority = PriorityLevel;
export type OutreachTemplate = ColdOutreachTemplate;
export type Project = FlagshipProject;
export type Habit = HabitItem;
export type GoldenRule = RuleItem;
export type ResearchInstitution = InstitutionInternship;
export type InterviewMasteryStatus = 'Mastered' | 'Review' | 'Untested';
export type EDATool = ToolItem;
export type WeeklyMilestone = WeeklyMilestoneItem;
export type SundayAuditLog = SundayAuditEntry;

export interface EncyclopediaItem {
  type?: 'file' | 'directory';
  name: string;
  path: string;
  title?: string;
  children?: EncyclopediaItem[];
}

export interface EncyclopediaDoc {
  id: string;
  name: string;
  folder?: string;
  isFile?: boolean;
  path?: string;
  items?: EncyclopediaItem[];
  title?: string;
  content?: string;
  category?: string;
}
