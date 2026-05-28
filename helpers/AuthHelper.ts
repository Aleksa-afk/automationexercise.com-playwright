import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/** Domain helper for authentication — the "arrange" step for tests that need a logged-in user. */
export class AuthHelper {
  private loginPage: LoginPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async loginAs(email: string, password: string) {
    await this.loginPage.navigate();
    await this.loginPage.login(email, password);
  }
}
