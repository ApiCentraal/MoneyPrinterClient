import type { DemoLead, PipelineStage } from "./types";

export const STAGE_ORDER: PipelineStage[] = [
  "discovered",
  "enriched",
  "scanned",
  "qualified",
  "outreach_pending",
  "contacted",
  "replied",
  "meeting",
  "won",
  "lost",
  "nurture",
];

export const STAGE_LABELS: Record<PipelineStage, string> = {
  discovered: "Discovered",
  enriched: "Enriched",
  scanned: "Scanned",
  qualified: "Qualified",
  outreach_pending: "Outreach",
  contacted: "Contacted",
  replied: "Replied",
  meeting: "Meeting",
  won: "Won",
  lost: "Lost",
  nurture: "Nurture",
};

export function groupLeadsByStage(leads: DemoLead[]): Map<PipelineStage, DemoLead[]> {
  const groups = new Map<PipelineStage, DemoLead[]>();
  for (const stage of STAGE_ORDER) {
    groups.set(stage, []);
  }
  for (const lead of leads) {
    groups.get(lead.stage)?.push(lead);
  }
  return groups;
}

export function formatStageLabel(stage: PipelineStage): string {
  return STAGE_LABELS[stage] ?? stage;
}
