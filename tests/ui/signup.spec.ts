import { test, expect } from '../../fixtures/test-fixtures';
import { generateNewUser } from '../../test-data/userFactory';

// Clean up the account created during the test so the suite stays isolated and re-runnable.
test.afterEach(async ({ signupPage }) => {
  if (await signupPage.navbar.deleteAccountLink.isVisible()) {
    await signupPage.navbar.deleteAccount();
  }
});

test('new user can register with valid details', { tag: '@smoke' }, async ({ signupPage }) => {
  // Arrange
  const user = generateNewUser();

  await test.step('submit name and email', async () => {
    await signupPage.navigate();
    await signupPage.signUp(user.name, user.email);

    // Data from step 1 is carried into the account-information form; email is locked
    await expect(signupPage.accountDetails.name).toHaveValue(user.name);
    await expect(signupPage.accountDetails.email).toHaveValue(user.email);
    await expect(signupPage.accountDetails.email).toBeDisabled();
  });

  await test.step('complete account details and confirm account created', async () => {
    await signupPage.submitAccountDetails(user);
    await expect(signupPage.page).toHaveURL('/account_created');
  });
});
