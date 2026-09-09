import { test, expect } from '../../fixture/test';
import { users } from '../../testdata/users';

test.describe('Cart and Checkout', () => {
  test('Cart navigation and empty-cart handling', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.expectLoaded();
    await cartPage.open();
    await cartPage.expectLoaded();
    await expect(cartPage.cartItems).toHaveCount(0);

    await cartPage.continueShoppingButton.click();
    await inventoryPage.expectLoaded();
    await cartPage.open();
    await expect(cartPage.cartItems).toHaveCount(0);
  });
});
