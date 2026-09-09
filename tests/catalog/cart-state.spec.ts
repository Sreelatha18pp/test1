import { test, expect } from '../../fixture/test';
import { users } from '../../testdata/users';
import { products } from '../../testdata/products';

test.describe('Catalog and Product Interaction', () => {
  test('Add, remove, and persist cart contents', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.expectLoaded();

    await inventoryPage.addProduct(products.backpack.name);
    await inventoryPage.addProduct(products.bikeLight.name);
    await expect(inventoryPage.cartLink.locator('.shopping_cart_badge')).toHaveText('2');

    await cartPage.open();
    await cartPage.expectLoaded();
    await cartPage.expectItem(products.backpack.name, products.backpack.price);
    await cartPage.expectItem(products.bikeLight.name, products.bikeLight.price);
    await cartPage.removeItem(products.backpack.name);
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.continueShoppingButton.click();
    await inventoryPage.expectLoaded();
    await cartPage.open();
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.removeItem(products.bikeLight.name);
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(cartPage.cartBadge).toHaveCount(0);
  });
});
