import { BasePage } from './BasePage';
import { NewUser } from '../test-data/userFactory';

export class SignupPage extends BasePage {
  readonly signup = {
    nameInput:  this.page.getByTestId('signup-name'),
    emailInput: this.page.getByTestId('signup-email'),
    button:     this.page.getByRole('button', { name: /Signup/i }),
  };

  readonly accountDetails = {
    password:     this.page.getByTestId('password'),
    firstName:    this.page.getByTestId('first_name'),
    lastName:     this.page.getByTestId('last_name'),
    address:      this.page.getByTestId('address'),
    country:      this.page.getByTestId('country'),
    state:        this.page.getByTestId('state'),
    city:         this.page.getByTestId('city'),
    zipcode:      this.page.getByTestId('zipcode'),
    mobileNumber: this.page.getByTestId('mobile_number'),
    createButton: this.page.getByRole('button', { name: /Create Account/i }),
  };

  async navigate() {
    await this.page.goto('/signup');
  }

  async signUp(name: string, email: string): Promise<this> {
    await this.signup.nameInput.fill(name);
    await this.signup.emailInput.fill(email);
    await this.signup.button.click();
    return this;
  }

  async fillAccountDetails(details: NewUser): Promise<this> {
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
    return this;
  }
}
