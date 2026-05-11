import { test, expect } from '@playwright/test';

// beforeAll approach — login once, reuse within this file only
// Good for a quick demo; for cross-suite reuse see storageState in playwright.config.ts

test.describe('logged in user flows', () => {
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto('https://automationexercise.com/login');
    await page.locator('[data-qa="login-email"]').fill('Alex123@mail.com');
    await page.locator('[data-qa="login-password"]').fill('Alex123');
    await page.locator('[data-qa="login-button"]').click();
    await page.waitForURL('https://automationexercise.com/');
    await page.context().storageState({ path: 'playwright/.auth/user.json' });
    await page.close();
  });

  test.use({ storageState: 'playwright/.auth/user.json' });

  test('logged in user can see account name', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await expect(page.getByText(/Logged in as/i)).toBeVisible();
  });

  test('logged in user can access cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/view_cart');
    await expect(page).toHaveURL(/view_cart/);
  });
});
