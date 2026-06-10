import { renderDemoSection } from "./demo/ui";
import { renderLanding } from "./landing";

let selectedLeadId: number | null = null;

function selectLead(id: number): void {
  selectedLeadId = id;
  renderDemoSection(selectedLeadId, selectLead);
}

function render(): void {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    ${renderLanding()}
    <section id="demo" class="demo-section" aria-label="Pipeline demo">
      <div id="demo-root"></div>
    </section>
    <footer class="site-footer">
      <p>MoneyPrinter door <a href="https://github.com/ApiCentraal">ApiCentraal / FectionLabs</a></p>
      <p>Deze site toont uitsluitend fictieve data. De operationele stack draait in een private repository.</p>
    </footer>
  `;

  renderDemoSection(selectedLeadId, selectLead);
}

render();
