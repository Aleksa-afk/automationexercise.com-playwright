import { uniqueEmail, uniqueId } from './identity';

/** Shape of a user as filled through the signup UI. */
export type NewUser = {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

/** Builds a valid UI user with sensible defaults; pass `overrides` to vary a single field per test. */
export function generateNewUser(overrides: Partial<NewUser> = {}): NewUser {
  return {
    name: `Test User ${uniqueId()}`,
    email: uniqueEmail(),
    password: 'Test@12345',
    firstName: 'Test',
    lastName: 'User',
    address: '123 Test Street',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '5550001234',
    ...overrides,
  };
}
