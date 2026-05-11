import { test, expect } from '@playwright/test';

// In a real project these would come from .env / test-data
const EMAIL = 'Alex123@mail.com';
const PASSWORD = 'Alex123';

test('valid credentials redirect to homepage', async ({ page }) => {
  // Arrange
  await page.goto('https://automationexercise.com/login');

  // Act
  await page.locator('[data-qa="login-email"]').fill(EMAIL);
  await page.locator('[data-qa="login-password"]').fill(PASSWORD);
  await page.locator('[data-qa="login-button"]').click();

  // Assert
  await expect(page).toHaveURL('https://automationexercise.com/');
});
