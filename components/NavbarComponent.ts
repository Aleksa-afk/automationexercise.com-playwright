import { Page, Locator } from '@playwright/test';

export class NavbarComponent {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }
}
