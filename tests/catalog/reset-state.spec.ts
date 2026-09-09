import { test, expect } from '../../fixture/test';
import { users } from '../../testdata/users';
import { products } from '../../testdata/products';

test.describe('Catalog and Product Interaction', () => {
  test('Reset App State', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.expectLoaded();
    await inventoryPage.addProduct(products.backpack.name);
    await inventoryPage.addProduct(products.bikeLight.name);

    await inventoryPage.resetAppState();
    await expect(inventoryPage.cartLink.locator('.shopping_cart_badge')).toHaveCount(0);
    await expect(inventoryPage.product(products.backpack.name).getByRole('button', { name: 'Add to cart' })).toBeVisible();
    await cartPage.open();
    await expect(cartPage.cartItems).toHaveCount(0);
  });
});
