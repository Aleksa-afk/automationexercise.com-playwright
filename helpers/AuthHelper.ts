import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

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
