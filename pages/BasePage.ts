import { Page } from '@playwright/test';
import { NavbarComponent } from '../components/NavbarComponent';

/** Shared base for page objects. Holds `page` + the site-wide navbar; never instantiated directly. */
export abstract class BasePage {
  readonly page: Page;
  readonly navbar: NavbarComponent;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarComponent(page);
  }
}
