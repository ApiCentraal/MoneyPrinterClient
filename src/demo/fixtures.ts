import type { DemoLead, DemoLeadDetail, PipelineStage } from "./types";

export const DEMO_LEADS: DemoLead[] = [
  {
    id: 1,
    company_name: "NovaWeb Studio",
    domain: "novaweb-demo.example",
    contact_email: "hello@novaweb-demo.example",
    stage: "qualified",
    score: 78,
  },
  {
    id: 2,
    company_name: "Brick & Mortar IT",
    domain: "brickit-demo.example",
    contact_email: "info@brickit-demo.example",
    stage: "contacted",
    score: 71,
  },
  {
    id: 3,
    company_name: "GreenHost BV",
    domain: "greenhost-demo.example",
    contact_email: null,
    stage: "enriched",
    score: 52,
  },
  {
    id: 4,
    company_name: "FastCart Shop",
    domain: "fastcart-demo.example",
    contact_email: "support@fastcart-demo.example",
    stage: "replied",
    score: 84,
  },
  {
    id: 5,
    company_name: "Legacy Pages",
    domain: "legacypages-demo.example",
    contact_email: "team@legacypages-demo.example",
    stage: "scanned",
    score: 44,
  },
  {
    id: 6,
    company_name: "CloudNine Apps",
    domain: "cloudnine-demo.example",
    contact_email: "sales@cloudnine-demo.example",
    stage: "outreach_pending",
    score: 66,
  },
];

export const STAGE_COUNTS: Record<PipelineStage, number> = {
  discovered: 2,
  enriched: 3,
  scanned: 4,
  qualified: 2,
  outreach_pending: 1,
  contacted: 3,
  replied: 1,
  meeting: 0,
  won: 1,
  lost: 0,
  nurture: 1,
};

const DETAILS: Record<number, DemoLeadDetail> = {
  1: {
    lead: DEMO_LEADS[0],
    scans: [
      {
        scan_type: "endpoints",
        score: 62,
        summary: "Homepage bereikbaar; /api/health ontbreekt.",
        findings: [
          { title: "Geen health endpoint", detail: "Geen 200 op /health of /api/health", severity: "medium" },
          { title: "HTTPS actief", detail: "TLS certificaat geldig", severity: "info" },
        ],
      },
      {
        scan_type: "security",
        score: 55,
        summary: "Ontbrekende security headers op marketing site.",
        findings: [
          { title: "Geen CSP", detail: "Content-Security-Policy header ontbreekt", severity: "high" },
        ],
      },
    ],
    events: [
      { from_stage: "discovered", to_stage: "enriched", reason: "Contact e-mail gevonden" },
      { from_stage: "enriched", to_stage: "scanned", reason: "Scan batch voltooid" },
      { from_stage: "scanned", to_stage: "qualified", reason: "Score 78 — klaar voor outreach" },
    ],
    outreach: [],
  },
  2: {
    lead: DEMO_LEADS[1],
    scans: [
      {
        scan_type: "brand",
        score: 48,
        summary: "Verouderde huisstijl en inconsistente typografie.",
        findings: [
          { title: "Geen favicon", detail: "Browser tab toont generiek icoon", severity: "low" },
        ],
      },
    ],
    events: [
      { from_stage: "qualified", to_stage: "outreach_pending", reason: "In wachtrij outreach" },
      { from_stage: "outreach_pending", to_stage: "contacted", reason: "Sequence stap 1 verstuurd" },
    ],
    outreach: [
      {
        sequence_step: 1,
        status: "sent",
        subject: "Korte scan van brickit-demo.example",
        preview:
          "Hoi,\n\nWe hebben jullie site bekeken en zagen o.a. ontbrekende security headers en geen health endpoint. Zullen we een kort gesprek plannen?\n\n— FectionLabs",
      },
    ],
  },
  4: {
    lead: DEMO_LEADS[3],
    scans: [
      {
        scan_type: "endpoints",
        score: 88,
        summary: "Sterke uptime en health-check aanwezig.",
        findings: [],
      },
    ],
    events: [
      { from_stage: "contacted", to_stage: "replied", reason: "Positieve reply via IMAP monitor" },
    ],
    outreach: [
      {
        sequence_step: 1,
        status: "replied",
        subject: "Scan-resultaten fastcart-demo.example",
        preview: "Bedankt voor je mail — laten we volgende week bellen.",
      },
    ],
  },
};

export function getDemoLeadDetail(leadId: number): DemoLeadDetail | null {
  if (DETAILS[leadId]) return DETAILS[leadId];
  const lead = DEMO_LEADS.find((item) => item.id === leadId);
  if (!lead) return null;
  return {
    lead,
    scans: [
      {
        scan_type: "endpoints",
        score: lead.score,
        summary: "Demo scan — fictieve bevindingen voor portfolio.",
        findings: [
          { title: "Demo data", detail: "Dit is geen echte scan", severity: "info" },
        ],
      },
    ],
    events: [{ from_stage: "discovered", to_stage: lead.stage, reason: "Demo pipeline positie" }],
    outreach: [],
  };
}
