import { APIRequestContext } from '@playwright/test';
import { UserClient } from '../api/clients/UserClient';
import { generateApiUser, ApiUser } from '../test-data/apiUserFactory';

/** Domain helper for creating test users via the API — fast, reliable test-data setup. */
export class UserHelper {
  private client: UserClient;

  constructor(request: APIRequestContext) {
    this.client = new UserClient(request);
  }

  /** Creates a user and returns it. Throws if setup fails, so a broken arrange never masquerades as a test failure. */
  async createUser(overrides: Partial<ApiUser> = {}): Promise<ApiUser> {
    const user = generateApiUser(overrides);
    const response = await this.client.createAccount(user);
    const body = await response.json();
    if (body.responseCode !== 201) {
      throw new Error(`Failed to create test user: ${body.message ?? response.status()}`);
    }
    return user;
  }
}
