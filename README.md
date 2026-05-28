# automation-playwright

Playwright + TypeScript practice suite for [automationexercise.com](https://automationexercise.com), covering both UI and API flows. Built as a senior-level reference: layered architecture, Page Object Model, fixtures, and a one-time auth setup.

## Tech stack

- TypeScript
- Playwright Test (`@playwright/test`)
- dotenv for environment configuration

## Prerequisites

- Node.js LTS
- A registered account on automationexercise.com (used by the login and `verifyLogin` tests)

## Setup

```bash
npm ci
npx playwright install --with-deps
cp .env.example .env        # then fill in the values
```

`.env`:

| Variable         | Required | Description                                            |
| ---------------- | -------- | ------------------------------------------------------ |
| `LOGIN_EMAIL`    | yes      | Email of a pre-registered account                      |
| `LOGIN_PASSWORD` | yes      | Password for that account                              |
| `BASE_URL`       | no       | Override the target environment (defaults to the live site) |

## Running tests

```bash
npm test            # everything (headless)
npm run test:ui     # UI suite only
npm run test:api    # API suite only
npm run test:headed # watch in a real browser
npm run test:debug  # Playwright Inspector
npm run report      # open the last HTML report
npm run typecheck   # tsc --noEmit
```

The `ui` project depends on a `setup` project that logs in once and saves the
session to `playwright/.auth/user.json`, so UI tests don't repeat the login.

## Continuous integration

`.github/workflows/playwright.yml` runs the full suite on push/PR. Add
`LOGIN_EMAIL` and `LOGIN_PASSWORD` under **Settings → Secrets and variables →
Actions**, or the login-dependent tests will fail.

## Project structure & conventions

The architecture and coding conventions (layer responsibilities, POM rules,
selector priority, AAA, naming) are documented in [CLAUDE.md](CLAUDE.md).

## Formatting (optional)

A `.prettierrc.json` and `.editorconfig` are included. To format from the CLI:

```bash
npx prettier --write .
```
