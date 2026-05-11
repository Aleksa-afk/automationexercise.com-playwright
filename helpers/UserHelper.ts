import { APIRequestContext } from '@playwright/test';
import { UserClient } from '../api/clients/UserClient';
import { generateApiUser, ApiUser } from '../test-data/apiUserFactory';

export class UserHelper {
  private client: UserClient;

  constructor(request: APIRequestContext) {
    this.client = new UserClient(request);
  }

  async createUser(overrides: Partial<ApiUser> = {}): Promise<ApiUser> {
    const user = generateApiUser(overrides);
    await this.client.createAccount(user);
    return user;
  }
}
