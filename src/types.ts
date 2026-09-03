export type ViewMode = 'landing' | 'portal' | 'webhooks' | 'error_404';

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'trigger' | 'scraper' | 'ai_analysis' | 'integration' | 'action';
  status: 'idle' | 'running' | 'completed' | 'failed' | 'skipped';
  latencyMs: number;
  description: string;
  inputPayload: Record<string, unknown>;
  outputPayload: Record<string, unknown>;
  logs: string[];
  retryCount?: number;
  iconName: string;
}

export interface AutomationPipeline {
  id: string;
  title: string;
  category: string;
  description: string;
  targetPlatform: 'n8n' | 'Make' | 'Custom Webhook';
  active: boolean;
  totalExecutions: number;
  successRate: number;
  avgDurationMs: number;
  lastRunTimestamp: string;
  steps: WorkflowStep[];
}

export interface WebhookEndpoint {
  id: string;
  name: string;
  platform: 'n8n' | 'Make' | 'Zapier' | 'Custom';
  url: string;
  secretKey: string;
  method: 'POST' | 'GET' | 'PUT';
  events: string[];
  isActive: boolean;
  lastPingStatus: 'success' | 'failed' | 'untested';
  lastPingTimestamp?: string;
  latencyMs?: number;
  headers: Record<string, string>;
}

export interface LeadFormData {
  fullName: string;
  businessEmail: string;
  companyName: string;
  monthlyWorkflows: string;
  automationTarget: 'n8n' | 'Make' | 'Custom Webhook' | 'Enterprise Hybrid';
  projectScope: string;
  honeypot: string; // Anti-spam bot trap
  encryptionConsent: boolean;
}

export interface FormValidationErrors {
  fullName?: string;
  businessEmail?: string;
  companyName?: string;
  monthlyWorkflows?: string;
  projectScope?: string;
  encryptionConsent?: string;
  general?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  includedTasks: string;
  concurrency: string;
  sla: string;
  features: string[];
  highlighted?: boolean;
  targetScale: string;
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  pipelineId: string;
  pipelineTitle: string;
  stepId?: string;
  stepName?: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  payloadSummary?: string;
}
