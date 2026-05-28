import { BasePage } from './BasePage';
import { URLS } from '../infrastructure/constants';
import { NewUser } from '../test-data/userFactory';

// Two-step flow: (1) submit name+email -> account-info form, (2) fill details -> /account_created.
// Locators are grouped by step to keep this large form readable.
export class SignupPage extends BasePage {
  readonly signup = {
    nameInput: this.page.getByTestId('signup-name'),
    emailInput: this.page.getByTestId('signup-email'),
    button: this.page.getByRole('button', { name: /Signup/i }),
  };

  readonly accountDetails = {
    // Carried over from step 1: name is pre-filled & editable, email is pre-filled & disabled.
    name: this.page.getByTestId('name'),
    email: this.page.getByTestId('email'),
    password: this.page.getByTestId('password'),
    firstName: this.page.getByTestId('first_name'),
    lastName: this.page.getByTestId('last_name'),
    address: this.page.getByTestId('address'),
    country: this.page.getByTestId('country'),
    state: this.page.getByTestId('state'),
    city: this.page.getByTestId('city'),
    zipcode: this.page.getByTestId('zipcode'),
    mobileNumber: this.page.getByTestId('mobile_number'),
    createButton: this.page.getByRole('button', { name: /Create Account/i }),
  };

  async navigate() {
    await this.page.goto(URLS.signup);
  }

  /** Step 1: submit name + email to reach the account-information form. */
  async signUp(name: string, email: string) {
    await this.signup.nameInput.fill(name);
    await this.signup.emailInput.fill(email);
    await this.signup.button.click();
  }

  /** Step 2: fill the account-information form and submit to create the account. */
  async submitAccountDetails(details: NewUser) {
    const f = this.accountDetails;
    await f.password.fill(details.password);
    await f.firstName.fill(details.firstName);
    await f.lastName.fill(details.lastName);
    await f.address.fill(details.address);
    await f.country.selectOption(details.country);
    await f.state.fill(details.state);
    await f.city.fill(details.city);
    await f.zipcode.fill(details.zipcode);
    await f.mobileNumber.fill(details.mobileNumber);
    await f.createButton.click();
  }
}
