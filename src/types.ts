/**
 * Tech Atlas Studio - Type Definitions
 */

export type TechType =
  | 'Language'
  | 'Framework'
  | 'Library'
  | 'Runtime'
  | 'Database'
  | 'Build Tool'
  | 'Package Manager'
  | 'Protocol'
  | 'Platform'
  | 'Service'
  | 'Tool'
  | 'Storage'
  | 'Hosting';

export type TechRole =
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'mobile'
  | 'desktop'
  | 'ai'
  | 'database'
  | 'infra'
  | 'tooling'
  | 'security'
  | 'graphics'
  | 'service';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface TechRecord {
  id: string;
  name: string;
  aliases: string[];
  type: TechType;
  category: string;
  categoryCode: string; // "A" through "P"
  subcategory: string;
  shortDescription: string;
  detailedExplanation: string;
  mainPurpose: string;
  typicalUseCases: string[];
  relatedLanguages: string[];
  dependencies: string[];
  runtimeRequirements: string;
  buildRequirements: string;
  compatibility: {
    browser?: string;
    os?: string;
    offlineCapable: boolean;
  };
  role: TechRole;
  relations: {
    database?: string[];
    api?: string[];
    complementary: string[];
    alternatives: string[];
  };
  hostingOptions: string[];
  learningDifficulty: DifficultyLevel; // 1=Introductory, 2=Moderate, 3=Intermediate, 4=Advanced, 5=Specialized
  advantages: string[];
  limitations: string[];
  knownConstraints: string[];
  securityNotes: string;
  docsUrl: string;
  repoUrl: string;
  license: string;
  verifiedDate: string;
  catalogVersion: string;
  isVerified: boolean;
}

export type Severity = 'error' | 'warning' | 'info';
export type EvidenceStatus = 'verified' | 'plausible' | 'unknown';

export interface CompatibilityFinding {
  ruleId: string;
  title: string;
  severity: Severity;
  affectedTechIds: string[];
  affectedTechNames: string[];
  reason: string;
  suggestedResolution: string;
  evidenceStatus: EvidenceStatus;
}

export interface CompatibilityRule {
  id: string;
  title: string;
  severity: Severity;
  evidenceStatus: EvidenceStatus;
  check: (selectedIds: string[], catalog: Map<string, TechRecord>) => CompatibilityFinding | null;
}

export interface StackSelection {
  language?: string;
  frontend?: string;
  backend?: string;
  runtime?: string;
  buildTool?: string;
  database?: string;
  apiProtocol?: string;
  authStrategy?: string;
  hosting?: string;
  testing?: string;
  monitoring?: string;
  aiIntegration?: string;
}

export interface ProjectRecord {
  id: string;
  name: string;
  description: string;
  stack: StackSelection;
  notes: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  fingerprint?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface GlossaryTerm {
  id: string;
  termEn: string;
  termFa: string;
  definitionEn: string;
  definitionFa: string;
  example: string;
  relatedTechIds: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface AdvisorAnswers {
  appType: string;
  audience: string;
  formFactor: string;
  offlineReq: string;
  dataArchitecture: string;
  hosting: string;
  devEnv: string;
  budget: string;
  buildTolerance: string;
  projectOrigin: string;
}

export interface AdvisorRecommendation {
  presetNameEn: string;
  presetNameFa: string;
  stack: StackSelection;
  matchScore: number;
  reasoningEn: string[];
  reasoningFa: string[];
  alternativesEn: string[];
  alternativesFa: string[];
  setupCommands: string[];
  serverlessFeasibility: string;
  deploymentStepsEn: string[];
  deploymentStepsFa: string[];
  paidVsFreeBreakdown: string;
  risksAndLimitationsEn: string[];
  risksAndLimitationsFa: string[];
}
