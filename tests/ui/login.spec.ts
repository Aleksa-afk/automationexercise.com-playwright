import { test, expect } from '../../fixtures/test-fixtures';
import { TEST_USERS } from '../../test-data/users';
import { uniqueEmail } from '../../test-data/identity';

test('valid credentials redirect to homepage', { tag: '@smoke' }, async ({ loginPage }) => {
  // Arrange
  const { email, password } = TEST_USERS.standard;

  // Act
  await loginPage.navigate();
  await loginPage.login(email, password);

  // Assert
  await expect(loginPage.page).toHaveURL('/');
});

test('user navigates from homepage via navbar and logs in', { tag: '@regression' }, async ({ homePage, loginPage }) => {
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

test('invalid credentials display an error and stay on the login page', { tag: '@regression' }, async ({ loginPage }) => {
  // Arrange — a guaranteed-unknown account, so this test needs no real credentials
  const email = uniqueEmail();

  // Act
  await loginPage.navigate();
  await loginPage.login(email, 'wrong-password');

  // Assert
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.page).toHaveURL(/login/);
});
