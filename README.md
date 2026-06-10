# MoneyPrinter — Marketing & Demo

Publieke landing page en interactieve pipeline-demo voor [MoneyPrinter](https://github.com/ApiCentraal/MoneyPrinter).

De operationele backend (FastAPI, worker, echte leads en mail) blijft in de **private** MoneyPrinter-repo. Deze repo bevat **alleen fictieve fixture-data** — geen API-keys, geen backend-koppeling.

## Live demo

Deploy naar Vercel of GitHub Pages en link vanuit de private README.

Voorbeeld (na deploy):

`https://moneyprinter-client.vercel.app`

## Lokaal draaien

```bash
npm install
npm run dev
```

Open http://127.0.0.1:5173

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

1. Maak een nieuwe Vercel-project gekoppeld aan deze repo
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`

`vercel.json` is al aanwezig.

## Deploy (GitHub Pages)

```bash
npm run build
# Upload dist/ naar gh-pages branch of gebruik GitHub Actions static deploy
```

## Wat zit erin?

| Onderdeel | Beschrijving |
|-----------|--------------|
| `src/landing.ts` | Hero, features, CTA |
| `src/demo/fixtures.ts` | Fictieve leads, scans, outreach |
| `src/demo/ui.ts` | Read-only pipeline board + lead detail |

## Contact

Vraag een live demo aan: [info@fectionlabs.nl](mailto:info@fectionlabs.nl?subject=MoneyPrinter%20demo)
