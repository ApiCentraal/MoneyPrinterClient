import { DEMO_LEADS, getDemoLeadDetail, STAGE_COUNTS } from "./fixtures";
import { formatStageLabel, groupLeadsByStage, STAGE_ORDER } from "./pipeline";
import type { DemoLeadDetail } from "./types";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderDemoSection(
  selectedLeadId: number | null,
  onSelectLead: (id: number) => void,
): void {
  const root = document.getElementById("demo-root");
  if (!root) return;

  const groups = groupLeadsByStage(DEMO_LEADS);
  const columns = STAGE_ORDER.map((stage) => {
    const leads = groups.get(stage) ?? [];
    const cards = leads
      .map(
        (lead) => `
        <button type="button" class="lead-card${lead.id === selectedLeadId ? " active" : ""}" data-lead-id="${lead.id}">
          <div class="company">${escapeHtml(lead.company_name)}</div>
          <div class="domain">${escapeHtml(lead.domain)}</div>
        </button>`,
      )
      .join("");

    return `
      <div class="pipeline-column">
        <div class="column-header">
          <h3>${formatStageLabel(stage)}</h3>
          <span class="column-count">${STAGE_COUNTS[stage]}</span>
        </div>
        <div class="column-cards">${cards || '<span class="domain">—</span>'}</div>
      </div>`;
  }).join("");

  const detail = selectedLeadId ? renderLeadDetail(getDemoLeadDetail(selectedLeadId)) : "";

  root.innerHTML = `
    <div class="demo-header">
      <h2>Interactieve pipeline-demo</h2>
      <span class="demo-badge">Fictieve data — geen live backend</span>
    </div>
    <div class="pipeline-board">${columns}</div>
    <div id="demo-lead-detail" class="lead-detail${selectedLeadId ? "" : " hidden"}">${detail}</div>
  `;

  root.querySelectorAll("[data-lead-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.getAttribute("data-lead-id"));
      if (!Number.isNaN(id)) onSelectLead(id);
    });
  });
}

function renderLeadDetail(detail: DemoLeadDetail | null): string {
  if (!detail) return "<p>Lead niet gevonden.</p>";
  const { lead, scans, events, outreach } = detail;

  return `
    <h3>${escapeHtml(lead.company_name)}</h3>
    <p class="detail-meta">
      ${escapeHtml(lead.domain)}
      ${lead.contact_email ? ` · ${escapeHtml(lead.contact_email)}` : ""}
      · score ${lead.score}
    </p>
    <h4>Scans</h4>
    ${scans
      .map(
        (scan) => `
      <div class="scan-card">
        <strong>${escapeHtml(scan.scan_type)}</strong> — ${scan.score}
        <div>${escapeHtml(scan.summary)}</div>
      </div>`,
      )
      .join("")}
    <h4>Events</h4>
    ${events
      .map(
        (event) => `
      <div class="event-row">
        ${event.from_stage ? `${escapeHtml(event.from_stage)} → ` : ""}
        <strong>${escapeHtml(event.to_stage)}</strong> — ${escapeHtml(event.reason)}
      </div>`,
      )
      .join("")}
    ${
      outreach.length
        ? `<h4>Outreach preview</h4>
      <div class="preview-box"><strong>${escapeHtml(outreach[0].subject)}</strong>\n\n${escapeHtml(outreach[0].preview)}</div>`
        : ""
    }
  `;
}
