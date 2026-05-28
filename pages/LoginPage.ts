import { BasePage } from './BasePage';
import { URLS } from '../infrastructure/constants';

// Locators are defined as field initializers — concise, and Playwright locators are lazy anyway.
export class LoginPage extends BasePage {
  readonly emailInput = this.page.getByTestId('login-email');
  readonly passwordInput = this.page.getByTestId('login-password');
  readonly loginButton = this.page.getByRole('button', { name: /Login/i });
  // Shown on failed login: "Your email or password is incorrect!"
  readonly errorMessage = this.page.getByText(/email or password is incorrect/i);

  async navigate() {
    await this.page.goto(URLS.login);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
