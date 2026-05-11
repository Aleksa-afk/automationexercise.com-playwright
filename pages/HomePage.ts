import { BasePage } from './BasePage';
import { NavbarComponent } from '../components/NavbarComponent';

export class HomePage extends BasePage {
  readonly navbar: NavbarComponent;

  constructor(page: ConstructorParameters<typeof BasePage>[0]) {
    super(page);
    this.navbar = new NavbarComponent(page);
  }

  async navigate() {
    await this.page.goto('/');
  }
}
