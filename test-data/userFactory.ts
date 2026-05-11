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

export function generateNewUser(overrides: Partial<NewUser> = {}): NewUser {
  const id = Date.now();
  return {
    name: `Test User ${id}`,
    email: `testuser${id}@mail.com`,
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
