import { BasePage } from './BasePage';
import { URLS } from '../infrastructure/constants';

// navbar is inherited from BasePage (it's global to the site).
export class HomePage extends BasePage {
  async navigate() {
    await this.page.goto(URLS.home);
  }
}
