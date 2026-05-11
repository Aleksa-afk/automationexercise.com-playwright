import { test, expect } from '@playwright/test';
import { poll } from './poll';

test('creates an order and verifies it', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Bug 3 fixed: wait for the page to be ready rather than sleeping blindly.
  await page.waitForLoadState('networkidle');

  // Bug 1 fixed: await the request so response is an APIResponse, not a Promise.
  const response = await page.request.post('/api/orders', {
    data: {
      product: 'TEST-ITEM',
      quantity: 1,
    },
  });

  // Bug 2 fixed: the assertion was broken because response was a Promise — fixing bug 1 fixes this too
  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.id).toBeDefined();
  const orderId = body.id;

  // Bug 4 fixed: wait for the order row to appear instead of sleeping blindly.
  await expect(page.locator(`[data-order-id="${orderId}"]`))
  .toBeVisible({ timeout: 5000 });

  // Bug 5 + 6 fixed: target the specific order by its id attribute and use
  // Playwright's locator assertion, which auto-waits and retries until the
  // text matches or the timeout is reached.
  const statusLocator = page.locator(`[data-order-id="${orderId}"] .order-status`);
  await expect(statusLocator).toHaveText('confirmed');
});
