import { expect, type Locator, type Page } from '@playwright/test';
import { routes } from '../utils/routes';

export class CartPage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async open(): Promise<void> {
    await this.page.locator('.shopping_cart_link').click();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.cart.replace('.', '\\.')}$`));
    await expect(this.page.getByText('Your Cart', { exact: true })).toBeVisible();
  }

  async expectItem(name: string, price: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: name });
    await expect(item).toHaveCount(1);
    await expect(item).toContainText(price);
  }

  async removeItem(name: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: name });
    await item.getByRole('button', { name: 'Remove' }).click();
  }
}
