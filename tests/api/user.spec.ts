import { test, expect } from '../../fixtures/test-fixtures';
import { generateApiUser } from '../../test-data/apiUserFactory';
import { uniqueEmail } from '../../test-data/identity';
import { TEST_USERS } from '../../test-data/users';

// Note: automationexercise always returns HTTP 200 — the real status lives in body.responseCode.
// So we assert on the response body, not response.status().

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

test('POST verifyLogin with an unknown account returns 404 and User not found!', async ({ userClient }) => {
  // Act
  const response = await userClient.verifyLogin(uniqueEmail(), 'wrong-password');
  const body = await response.json();

  // Assert
  expect(body.responseCode).toBe(404);
  expect(body.message).toBe('User not found!');
});

test('POST verifyLogin with a missing parameter returns 400 Bad request', async ({ request }) => {
  // Act — omit the password field entirely to trigger the API's validation path
  const response = await request.post('/api/verifyLogin', { form: { email: uniqueEmail() } });
  const body = await response.json();

  // Assert
  expect(body.responseCode).toBe(400);
  expect(body.message).toMatch(/bad request/i);
});
