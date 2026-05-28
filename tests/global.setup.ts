import { test as setup, expect } from '@playwright/test';
import { AuthHelper } from '../helpers/AuthHelper';
import { HomePage } from '../pages/HomePage';
import { TEST_USERS } from '../test-data/users';
import { AUTH_FILE, URLS } from '../infrastructure/constants';

// Logs in once and saves the session so UI tests can reuse it instead of logging in each time.
setup('authenticate as standard user', async ({ page }) => {
  const auth = new AuthHelper(page);
  const home = new HomePage(page);

  await auth.loginAs(TEST_USERS.standard.email, TEST_USERS.standard.password);

  // Guard: only persist the session once we've confirmed authentication really succeeded.
  await page.waitForURL(URLS.home);
  await expect(home.navbar.loggedInAs).toBeVisible();

  await page.context().storageState({ path: AUTH_FILE });
});
