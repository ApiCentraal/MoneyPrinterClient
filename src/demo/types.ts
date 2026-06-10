export type PipelineStage =
  | "discovered"
  | "enriched"
  | "scanned"
  | "qualified"
  | "outreach_pending"
  | "contacted"
  | "replied"
  | "meeting"
  | "won"
  | "lost"
  | "nurture";

export interface DemoLead {
  id: number;
  company_name: string;
  domain: string;
  contact_email: string | null;
  stage: PipelineStage;
  score: number;
}

export interface DemoScan {
  scan_type: string;
  score: number;
  summary: string;
  findings: { title: string; detail: string; severity: string }[];
}

export interface DemoEvent {
  from_stage: PipelineStage | null;
  to_stage: PipelineStage;
  reason: string;
}

export interface DemoOutreach {
  sequence_step: number;
  status: string;
  subject: string;
  preview: string;
}

export interface DemoLeadDetail {
  lead: DemoLead;
  scans: DemoScan[];
  events: DemoEvent[];
  outreach: DemoOutreach[];
}
