# Playwright Practice Project — Claude Instructions

## Project Context

This is a Playwright TypeScript automation practice project targeting https://automationexercise.com.

The primary goal is interview preparation for a Senior QA Engineer role. Every piece of code written in this project should reflect senior-level thinking: clean architecture, meaningful test coverage, good naming, and maintainable patterns.

The person using this project has:
- 3+ years of Playwright production experience
- Strong API testing background
- Experience with layered framework architecture (test / helper / infrastructure layers)
- ISTQB foundation certification

Do not over-explain basic concepts unless asked. Focus on production-quality output and senior-level reasoning.

---

## Tech Stack

- **Language:** TypeScript
- **Framework:** Playwright (latest)
- **Test runner:** Playwright Test (@playwright/test)
- **Reporting:** Playwright HTML reporter
- **Node version:** LTS

---

## Project Structure

Always follow this structure. Do not deviate unless explicitly asked.

```
project-root/
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts
│   │   ├── signup.spec.ts
│   │   └── ...
│   └── api/
│       ├── user.spec.ts
│       └── ...
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── SignupPage.ts
│   ├── HomePage.ts
│   └── ...
├── components/
│   ├── NavbarComponent.ts
│   └── ...                  (reusable page sections shared across multiple pages)
├── helpers/
│   ├── AuthHelper.ts
│   ├── UserHelper.ts
│   └── ...
├── infrastructure/
│   ├── config.ts
│   ├── constants.ts
│   └── ...
├── fixtures/
│   └── test-fixtures.ts
├── test-data/
│   ├── users.ts
│   ├── userFactory.ts
│   ├── apiUserFactory.ts
│   └── ...
├── api/
│   └── clients/
│       ├── UserClient.ts
│       └── ...              (thin HTTP wrappers — one class per API resource)
├── exercises/               (personal practice files — DO NOT MODIFY)
├── playwright.config.ts
└── CLAUDE.md
```

---

## Layer Responsibilities

### tests/
Contains only test specifications. Tests must be readable as plain English descriptions of behaviour. No implementation logic belongs here. A test reads like a scenario, not like code.

### pages/
Page Object Model classes. One class per page or major component. Responsible for locating elements and performing interactions. Never assert inside page objects — page objects interact, tests assert.

### components/
Reusable page-level components that appear on multiple pages (e.g. NavbarComponent, FooterComponent). Components do not have a `navigate()` method. They are instantiated inside page objects that compose them.

### helpers/
Service or domain-specific helpers. These perform multi-step operations that combine page actions or API calls. Examples: `AuthHelper.loginAs(user)`, `UserHelper.createTestUser()`. Think of these as the "arrange" layer for complex test setups.

### api/clients/
Thin HTTP wrappers around API endpoints, one class per resource (e.g. UserClient). These make raw requests and return the response — no assertions, no business logic. Used directly in API spec files and consumed by helpers for test data setup.

### infrastructure/
Shared framework utilities: configuration, constants, environment handling, logging. Nothing domain-specific lives here.

### fixtures/
Playwright test fixtures that extend the base `test` object. Use fixtures to inject page objects, helpers, or pre-authenticated browser state into tests.

---

## Code Patterns — Always Follow These

### 1. AAA Pattern in every test

Every test must have clearly separated Arrange, Act, Assert sections marked with comments.

```typescript
test('valid login navigates to account page', async ({ loginPage }) => {
  // Arrange
  const user = TEST_USERS.standard;

  // Act
  await loginPage.navigate();
  await loginPage.login(user.email, user.password);

  // Assert
  await expect(loginPage.page).toHaveURL(/account/);
});
```

### 2. Page Object Model — strict rules

- One class per page or major component
- Constructor always accepts `Page` from Playwright
- All locators defined as class properties using `page.locator()` or role-based selectors
- All interactions are async methods
- No assertions inside page objects
- Page objects do not know about other page objects (no chaining between pages inside a POM class)

```typescript
// pages/LoginPage.ts
import { BasePage } from './BasePage';
import { URLS } from '../infrastructure/constants';

export class LoginPage extends BasePage {
  // Field initializers — Playwright locators are lazy, so this is concise and correct
  readonly emailInput = this.page.getByTestId('login-email');
  readonly passwordInput = this.page.getByTestId('login-password');
  readonly loginButton = this.page.getByRole('button', { name: /Login/i });
  readonly errorMessage = this.page.getByText(/email or password is incorrect/i);

  async navigate() {
    await this.page.goto(URLS.login);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### 3. Fixtures for dependency injection

Use Playwright fixtures to inject page objects and helpers into tests. Do not instantiate page objects inside test bodies.

```typescript
// fixtures/test-fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AuthHelper } from '../helpers/AuthHelper';

type Fixtures = {
  loginPage: LoginPage;
  authHelper: AuthHelper;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  authHelper: async ({ request }, use) => {
    await use(new AuthHelper(request));
  },
});

export { expect } from '@playwright/test';
```

Tests then import from fixtures, not from @playwright/test directly:

```typescript
// tests/ui/auth.spec.ts
import { test, expect } from '../../fixtures/test-fixtures';

test('login with valid credentials', async ({ loginPage }) => {
  // loginPage is injected — no manual instantiation needed
});
```

### 4. Selector priority order

For **automationexercise.com**, `data-qa` attributes are mapped via `testIdAttribute` in `playwright.config.ts`. When they exist, use them first — they are the most stable hook on the page.

1. `getByTestId()` — highest priority when a `data-qa` attribute exists
2. `getByRole()` — for interactive elements without a `data-qa` hook
3. `getByLabel()` — for form fields with associated labels
4. `getByText()` — for text content assertions
5. `locator('css')` — only when nothing above works
6. Never use XPath unless absolutely unavoidable

### 5. API tests use Playwright request context

```typescript
test('login API returns token on valid credentials', async ({ request }) => {
  // Arrange
  const payload = { email: TEST_USERS.standard.email, password: TEST_USERS.standard.password };

  // Act
  const response = await request.post('/api/verifyLogin', { data: payload });
  const body = await response.json();

  // Assert
  expect(response.status()).toBe(200);
  expect(body.message).toMatch(/user exists/i);
});
```

### 6. Test naming convention

Test names describe behaviour, not actions.

```
✅ 'valid credentials navigate to the account dashboard'
✅ 'incorrect password displays an error message to the user'
✅ 'unauthenticated request to account endpoint returns 401'

❌ 'test login'
❌ 'login page test'
❌ 'verify login works'
```

### 7. beforeAll vs beforeEach

- `beforeAll`: one-time setup shared across all tests in a suite (getting an auth token, seeding data once)
- `beforeEach`: setup that must be fresh for every test (navigating to a page, resetting state)
- Never use `beforeAll` for setup that mutates shared state between tests

### 8. No fixed waits

Never use `page.waitForTimeout()`. Always use:
- `page.waitForURL()`
- `page.waitForSelector()`
- `expect(locator).toBeVisible()`
- Playwright's built-in auto-waiting

### 9. Test isolation

Each test must be independently runnable. Tests must not depend on execution order. Use `beforeEach` or fixtures to ensure each test starts in a known state.

### 10. retries: 0 in config

The playwright.config.ts must always have `retries: 0`. A flaky test must be fixed, not retried.

### 11. Use test.step() for multi-step flows

Wrap distinct phases of a multi-step test in `test.step()`. Steps appear as named sections in the HTML report and give precise failure locations.

```typescript
test('new user can register with valid details', { tag: '@smoke' }, async ({ signupPage }) => {
  const user = generateNewUser();

  await test.step('submit name and email', async () => {
    await signupPage.navigate();
    await signupPage.signUp(user.name, user.email);
    await expect(signupPage.accountDetails.email).toBeDisabled();
  });

  await test.step('complete account details and confirm account created', async () => {
    await signupPage.submitAccountDetails(user);
    await expect(signupPage.page).toHaveURL('/account_created');
  });
});
```

Use `test.step()` when a test has two or more distinct Act phases that would otherwise need multiple AAA comment blocks.

### 12. Test tags for suite filtering

Tag every test with `@smoke` or `@regression` using the `{ tag }` option.

```typescript
test('valid credentials redirect to homepage', { tag: '@smoke' }, async ({ loginPage }) => { ... });
test('invalid credentials display an error', { tag: '@regression' }, async ({ loginPage }) => { ... });
```

Run a subset: `npx playwright test --grep @smoke`

- `@smoke`: critical happy-path tests — the minimum set that confirms the build is healthy
- `@regression`: negative cases, edge cases, and secondary flows

---

## Selector Strategy for automationexercise.com

This site has inconsistent attributes. Use these strategies:

- Form inputs: use `getByTestId()` — the site has `data-qa` attributes on all major inputs
- Buttons: use `getByRole('button', { name: /text/i })`
- Navigation links: use `getByRole('link', { name: /text/i })`
- Error messages: use `getByText(/error text/i)` or `.locator('p').filter({ hasText: /error text/i })`
- Social login buttons: avoid — not testable

---

## Test Data Strategy

- Use timestamp-based unique identifiers for anything that creates data: `user_${Date.now()}@test.com`
- Define static test users in `test-data/users.ts` for read-only operations (login, browse)
- Never hardcode credentials inline in test files

```typescript
// test-data/users.ts — credentials come from env via config, never hardcoded
export const TEST_USERS = {
  standard: {
    get email(): string { return config.loginEmail; },
    get password(): string { return config.loginPassword; },
  },
};
```

---

## What to Ask Claude in This Project

### Generating code
- "Write a Page Object for the registration page"
- "Write API tests for the login endpoint covering positive, negative, and auth scenarios"
- "Add a fixture for pre-authenticated page state"
- "Write a helper that creates a test user via the API and returns their credentials"

### Review and improvement
- "Review this page object and suggest improvements"
- "Is this test following AAA correctly?"
- "How should I structure the beforeAll here?"

### Debugging
- "This selector is not working — help me find a better one for [element]"
- "This test is flaky — what could cause it and how do I fix it?"

### Theory and patterns
- "Explain why fixtures are better than beforeEach for page object injection"
- "When should I use beforeAll vs beforeEach?"
- "What is the correct way to handle authentication state in Playwright across tests?"

---

## CI

Tests run inside the official Playwright Docker container. The image tag is pinned to the `@playwright/test` version — **both must be kept in sync**. When upgrading `@playwright/test` in `package.json`, update the container image tag in `.github/workflows/playwright.yml` at the same time.

Current image: `mcr.microsoft.com/playwright:v1.59.1-noble`

---

## Response Style Expected from Claude

- Provide complete, runnable code — not pseudocode or partial snippets unless asked
- Explain structural decisions with inline comments in the code
- Point out senior-level improvements proactively (better selector, better pattern, missing edge case)
- Be direct about anti-patterns — if something is wrong, say so clearly and explain why
- Match the user's level — no over-explaining of basics
