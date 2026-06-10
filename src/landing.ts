export function renderLanding(): string {
  return `
    <header class="hero">
      <h1>MoneyPrinter</h1>
      <p class="lead">
        Autonome lead discovery, website scans en compliant outreach —
        gebouwd voor software- en webdiensten die endpoint-checks, huisstijl-scans
        en security audits verkopen.
      </p>
      <div class="hero-actions">
        <a href="#demo" class="btn-primary">Bekijk demo</a>
        <a href="mailto:info@fectionlabs.nl?subject=MoneyPrinter%20demo" class="btn-secondary">Vraag live demo aan</a>
      </div>
    </header>

    <section class="features" aria-label="Features">
      <article class="feature-card">
        <h3>Lead discovery</h3>
        <p>Google Places, website crawl en CSV-import vullen je pipeline automatisch.</p>
      </article>
      <article class="feature-card">
        <h3>Echte HTTP-scans</h3>
        <p>Endpoints, huisstijl en security headers — geen mock-scanners.</p>
      </article>
      <article class="feature-card">
        <h3>Compliant outreach</h3>
        <p>3-staps sequences, unsubscribe links, suppression list en bounce-detectie.</p>
      </article>
      <article class="feature-card">
        <h3>Operator dashboard</h3>
        <p>Pipeline board, lead detail en job-triggers — private backend, publieke demo hieronder.</p>
      </article>
    </section>
  `;
}
