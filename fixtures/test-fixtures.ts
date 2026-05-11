import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { AuthHelper } from '../helpers/AuthHelper';
import { UserHelper } from '../helpers/UserHelper';
import { UserClient } from '../api/clients/UserClient';
import { AUTH_FILE } from '../infrastructure/constants';

type Fixtures = {
  loginPage: LoginPage;
  signupPage: SignupPage;
  homePage: HomePage;
  authHelper: AuthHelper;
  userHelper: UserHelper;
  userClient: UserClient;
  authenticatedPage: Page;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  authHelper: async ({ page }, use) => {
    await use(new AuthHelper(page));
  },
  userHelper: async ({ request }, use) => {
    await use(new UserHelper(request));
  },
  userClient: async ({ request }, use) => {
    await use(new UserClient(request));
  },
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: AUTH_FILE });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';
