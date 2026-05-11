import { test, expect } from '../../fixtures/test-fixtures';
import { generateApiUser } from '../../test-data/apiUserFactory';
import { TEST_USERS } from '../../test-data/users';

test('POST createAccount with valid details returns 201 and User created!', async ({ userClient }) => {
  // Arrange
  const user = generateApiUser();

  // Act
  const response = await userClient.createAccount(user);
  const body = await response.json();

  // Assert
  expect(body.responseCode).toBe(201);
  expect(body.message).toBe('User created!');
});

test('POST verifyLogin with valid credentials returns 200 and User exists!', async ({ userClient }) => {
  // Arrange
  const { email, password } = TEST_USERS.standard;

  // Act
  const response = await userClient.verifyLogin(email, password);
  const body = await response.json();

  // Assert
  expect(body.responseCode).toBe(200);
  expect(body.message).toBe('User exists!');
});
