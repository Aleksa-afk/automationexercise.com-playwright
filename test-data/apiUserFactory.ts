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

export function generateApiUser(overrides: Partial<ApiUser> = {}): ApiUser {
  const id = Date.now();
  return {
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
    ...overrides,
  };
}
