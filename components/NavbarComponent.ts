import { Page, Locator } from '@playwright/test';

/** Reusable top navigation, shared across pages. Composed into page objects — it has no navigate(). */
export class NavbarComponent {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loggedInAs: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
    // "Logged in as <username>" — a reliable signal that authentication succeeded.
    this.loggedInAs = page.getByText(/logged in as/i);
  }

  async logout() {
    await this.logoutLink.click();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }
}
