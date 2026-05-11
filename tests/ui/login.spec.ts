import { test, expect } from '../../fixtures/test-fixtures';
import { TEST_USERS } from '../../test-data/users';

test('valid credentials redirect to homepage', async ({ loginPage }) => {
  // Arrange
  const { email, password } = TEST_USERS.standard;

  // Act
  await loginPage.navigate();
  await loginPage.login(email, password);

  // Assert
  await expect(loginPage.page).toHaveURL('/');
});

test('user navigates from homepage via navbar and logs in', async ({ homePage, loginPage }) => {
  // Arrange
  const { email, password } = TEST_USERS.standard;

  // Act
  await homePage.navigate();
  await homePage.navbar.loginLink.click();
  await expect(homePage.page).toHaveURL('/login');
  await loginPage.login(email, password);

  // Assert
  await expect(loginPage.page).toHaveURL('/');
});
