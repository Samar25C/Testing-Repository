# Playwright + TypeScript Automation Framework

End-to-end **UI** and **API** test automation using [Playwright](https://playwright.dev) and TypeScript,
with the Page Object Model, custom fixtures, multi-browser runs and GitHub Actions CI.

- **UI app under test:** [SauceDemo](https://www.saucedemo.com) (login, inventory, cart, checkout)
- **API under test:** [JSONPlaceholder](https://jsonplaceholder.typicode.com) (GET / POST / PUT / DELETE)

## Project structure

```
.
├── .github/workflows/playwright.yml   # CI pipeline
├── src
│   ├── data/users.ts                  # Test data
│   ├── fixtures/test-fixtures.ts      # Custom fixtures (page objects, logged-in state)
│   └── pages/                         # Page Object Model classes
├── tests
│   ├── api/posts.spec.ts              # API tests
│   └── ui/                            # UI tests (login, inventory, cart, checkout)
├── playwright.config.ts
└── tsconfig.json
```

## Getting started

```bash
npm install
npx playwright install        # downloads browsers
```

## Running tests

| Command                  | What it does                                   |
| ------------------------ | ---------------------------------------------- |
| `npm test`               | Run everything (UI on 3 browsers + API)        |
| `npm run test:chromium`  | UI tests on Chromium only                      |
| `npm run test:api`       | API tests only                                 |
| `npm run test:headed`    | UI tests with the browser visible              |
| `npm run test:debug`     | Playwright Inspector                           |
| `npm run report`         | Open the last HTML report                      |
| `npm run typecheck`      | TypeScript compile check                       |

Run only smoke tests: `npx playwright test --grep @smoke`

## Configuration

Copy `.env.example` to `.env` or set environment variables to point at another environment:

```
BASE_URL=https://www.saucedemo.com
API_BASE_URL=https://jsonplaceholder.typicode.com
```

## CI

Every push and pull request to `main` runs the suite in GitHub Actions and uploads the
HTML report (and traces/videos on failure) as build artifacts.

## Adding a new test

1. Add a page class in `src/pages/` and register it in `src/fixtures/test-fixtures.ts`.
2. Create a `*.spec.ts` file in `tests/ui/` or `tests/api/`.
3. Use `@smoke` in the test title for tests that should run in quick checks.
