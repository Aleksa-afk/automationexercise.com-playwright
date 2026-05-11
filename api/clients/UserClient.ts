import { APIRequestContext } from '@playwright/test';
import { ApiUser } from '../../test-data/apiUserFactory';

export class UserClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createAccount(user: ApiUser) {
    return this.request.post('/api/createAccount', { form: { ...user } });
  }

  async verifyLogin(email: string, password: string) {
    return this.request.post('/api/verifyLogin', { form: { email, password } });
  }
}
