import { test, expect } from '../../fixtures/test-fixtures';
import { generateNewUser } from '../../test-data/userFactory';
import { NavbarComponent } from '../../components/NavbarComponent';

// Clean up the account created during the test so the suite stays isolated and re-runnable.
test.afterEach(async ({ page }) => {
  const navbar = new NavbarComponent(page);
  if (await navbar.deleteAccountLink.isVisible()) {
    await navbar.deleteAccount();
  }
});

test('new user can register with valid details', async ({ signupPage }) => {
  // Arrange
  const user = generateNewUser();

  // Act (step 1: name + email)
  await signupPage.navigate();
  await signupPage.signUp(user.name, user.email);

  // Assert (step 1 data carried into the account-information form; email is locked)
  await expect(signupPage.accountDetails.name).toHaveValue(user.name);
  await expect(signupPage.accountDetails.email).toHaveValue(user.email);
  await expect(signupPage.accountDetails.email).toBeDisabled();

  // Act (step 2: account details)
  await signupPage.submitAccountDetails(user);

  // Assert
  await expect(signupPage.page).toHaveURL('/account_created');
});
