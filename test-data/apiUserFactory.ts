import { uniqueEmail, uniqueId } from './identity';

/** Shape of the /api/createAccount payload (note the API's snake_case field names). */
export type ApiUser = {
  name: string;
  email: string;
  password: string;
  title: 'Mr' | 'Mrs' | 'Miss';
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
};

/** Builds a valid API user with sensible defaults; pass `overrides` to vary a single field per test. */
export function generateApiUser(overrides: Partial<ApiUser> = {}): ApiUser {
  return {
    name: `Test User ${uniqueId()}`,
    email: uniqueEmail(),
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
    ...overrides,
  };
}
