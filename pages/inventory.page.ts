import { expect, type Locator, type Page } from '@playwright/test';
import { routes } from '../utils/routes';

export class InventoryPage {
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly productsHeading: Locator;
  readonly productItems: Locator;
  readonly sortSelect: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.productsHeading = page.getByText('Products', { exact: true });
    this.productItems = page.locator('.inventory_item');
    this.sortSelect = page.getByRole('combobox');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.inventory.replace('.', '\\.')}$`));
    await expect(this.productsHeading).toBeVisible();
    await expect(this.productItems).toHaveCount(6);
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  product(name: string): Locator {
    return this.productItems.filter({ hasText: name });
  }

  async addProduct(name: string): Promise<void> {
    await this.product(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openProduct(name: string): Promise<void> {
    await this.product(name).getByRole('link', { name }).last().click();
  }

  async resetAppState(): Promise<void> {
    await this.menuButton.click();
    await this.page.getByRole('link', { name: 'Reset App State' }).click();
    await this.page.reload();
  }
}
