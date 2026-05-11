import { test as base, APIRequestContext, request } from '@playwright/test';
import { getAuthToken } from './auth';

// A fixture is something Playwright sets up before a test and tears down after.
// This file creates a custom fixture called authedRequest — a pre-authenticated
// HTTP client — so every test that needs it gets one automatically without
// repeating the setup.

// ApiFixtures declares the shape of the new fixture so TypeScript knows that
// authedRequest is an APIRequestContext (Playwright's HTTP client type).
type ApiFixtures = {
  authedRequest: APIRequestContext;
};

// base.extend adds the new fixture on top of Playwright's built-in test object.
// The result is exported as test so importing from this file is all a test
// needs — it gets both the built-in fixtures (page, request, etc.) and ours.
export const test = base.extend<ApiFixtures>({
  authedRequest: async ({}, use) => {
    // request.newContext creates a standalone HTTP client with no browser.
    // baseURL means tests can write '/api/orders' instead of the full URL.
    // extraHTTPHeaders attaches Authorization to every request automatically,
    // so individual tests never have to think about auth headers.
    const context = await request.newContext({
      baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
      extraHTTPHeaders: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });

    // use() is the dividing line between setup and teardown.
    // Everything before it runs before the test.
    // Calling use(context) hands the client to the test and waits for it to finish.
    // Everything after it runs after the test — dispose() closes the HTTP client
    // and releases any connections it held open.
    await use(context);
    await context.dispose();
  },
});

// Re-export expect from the same file so tests only need one import line
// to get both test and expect.
export { expect } from '@playwright/test';
