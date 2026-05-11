import { test, expect } from '../../fixtures/test-fixtures';
import { generateNewUser } from '../../test-data/userFactory';
import { NavbarComponent } from '../../components/NavbarComponent';

test.afterEach(async ({ page }) => {
  const navbar = new NavbarComponent(page);
  if (await navbar.deleteAccountLink.isVisible()) {
    await navbar.deleteAccount();
  }
});

test('new user can register with valid details', async ({ signupPage }) => {
  // Arrange
  const user = generateNewUser();

  // Act
  await signupPage.navigate();
  await signupPage.signUp(user.name, user.email);

  // Assert (pre-filled data carried over from step 1)
  await expect(signupPage.nameInput).toHaveValue(user.name);
  await expect(signupPage.emailInput).toHaveValue(user.email);
  await expect(signupPage.emailInput).toBeDisabled();

  // Act (complete account details)
  await signupPage.fillAccountDetails(user);

  // Assert
  await expect(signupPage.page).toHaveURL('/account_created');
});
