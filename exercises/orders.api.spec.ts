// Importing from fixtures/api instead of @playwright/test gives us the custom
// authedRequest fixture alongside all of Playwright's built-in fixtures.
import { test, expect } from './api';

// One shared baseline payload defined at the top of the file.
// Each test either spreads it directly or destructures from it.
// This avoids repeating the same object and makes it obvious when
// a test deliberately changes something.
const BASE_ORDER = {
  product: 'TEST-ITEM',
  quantity: 2,
  countryCode: 'US',
};

// The outer describe groups all tests under the endpoint name.
// The inner describes group by scenario, producing readable hierarchical
// output in the test runner — you can see which scenario failed at a glance.
test.describe('POST /api/orders', () => {

  test.describe('successful creation', () => {
    test('returns 201 with a fully-shaped order body', async ({ authedRequest }) => {
      // Arrange
      const payload = { ...BASE_ORDER };

      // Act
      const response = await authedRequest.post('/api/orders', { data: payload });
      const body = await response.json();

      // Assert — status code first, then the full response contract.
      // Checking only the status code would miss a broken field name or wrong type.
      expect(response.status()).toBe(201);

      // id is server-generated so we can't know the value — check the type instead.
      expect(typeof body.id).toBe('string');
      expect(body.status).toBe('pending');
      // Echo back the values we sent to confirm the API stored them correctly.
      expect(body.product).toBe(payload.product);
      expect(body.quantity).toBe(payload.quantity);
      expect(body.countryCode).toBe(payload.countryCode);
      // First confirm createdAt is a string, then confirm it's actually a valid
      // date — new Date('hello').toString() produces 'Invalid Date', catching
      // cases where the field exists but contains garbage.
      expect(typeof body.createdAt).toBe('string');
      expect(new Date(body.createdAt).toString()).not.toBe('Invalid Date');
    });
  });

  test.describe('missing required field', () => {
    test('returns 400 when product is omitted', async ({ authedRequest }) => {
      // Arrange — destructuring pulls product out into _omitted (the underscore
      // signals intentionally unused) and collects the rest into payload.
      // The result is a valid object with quantity and countryCode but no product.
      const { product: _omitted, ...payload } = BASE_ORDER;

      // Act
      const response = await authedRequest.post('/api/orders', { data: payload });
      const body = await response.json();

      // Assert — a well-behaved API returns 400 and an error message that tells
      // the caller what was wrong, not just that something was wrong.
      expect(response.status()).toBe(400);
      expect(body.error).toBeDefined();
      expect(typeof body.error).toBe('string');
    });
  });

  test.describe('unauthorized request', () => {
    // Using the built-in request fixture here instead of authedRequest.
    // request carries no headers, which is exactly the point — this test is
    // deliberately sending a call with no credentials to verify the API
    // rejects it. Swapping authedRequest in would defeat the purpose.
    test('returns 401 when Authorization header is absent', async ({ request }) => {
      // Arrange — plain request fixture carries no auth header
      const payload = { ...BASE_ORDER };

      // Act — baseURL is only configured on authedRequest, so the full URL
      // must be written out manually here.
      const response = await request.post(
        `${process.env.BASE_URL ?? 'http://localhost:3000'}/api/orders`,
        { data: payload }
      );
      const body = await response.json();

      // Assert
      expect(response.status()).toBe(401);
      expect(body.error).toBeDefined();
    });
  });

});
