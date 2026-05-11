import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TEST_USERS } from '../test-data/users';
import { AUTH_FILE } from '../infrastructure/constants';

setup('authenticate as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(TEST_USERS.standard.email, TEST_USERS.standard.password);

  await page.waitForURL('/');
  await page.context().storageState({ path: AUTH_FILE });
});
