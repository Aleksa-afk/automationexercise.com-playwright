import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com';
const EMAIL = 'Alex123@mail.com';
const PASSWORD = 'Alex123';

test('POST verifyLogin with valid credentials returns 200 and User exists!', async ({ request }) => {
  // Arrange
  const payload = { email: EMAIL, password: PASSWORD };

  // Act
  const response = await request.post(`${BASE_URL}/api/verifyLogin`, { form: payload });
  const body = await response.json();

  // Assert
  expect(body.responseCode).toBe(200);
  expect(body.message).toBe('User exists!');
});

test('POST createAccount with valid details returns 201 and User created!', async ({ request }) => {
  // Arrange
  const id = Date.now();
  const user = {
    name: `Test User ${id}`,
    email: `testuser${id}@mail.com`,
    password: 'Test@12345',
    title: 'Mr',
    birth_date: '1',
    birth_month: '1',
    birth_year: '1990',
    firstname: 'Test',
    lastname: 'User',
    company: 'Test Company',
    address1: '123 Test Street',
    address2: 'Apt 1',
    country: 'United States',
    zipcode: '90001',
    state: 'California',
    city: 'Los Angeles',
    mobile_number: '5550001234',
  };

  // Act
  const response = await request.post(`${BASE_URL}/api/createAccount`, { form: user });
  const body = await response.json();

  // Assert
  expect(body.responseCode).toBe(201);
  expect(body.message).toBe('User created!');
});
