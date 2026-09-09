import { test, expect } from '../../fixture/test';
import { users } from '../../testdata/users';
import { products } from '../../testdata/products';

test.describe('Catalog and Product Interaction', () => {
  test('Inventory content and product details', async ({ loginPage, inventoryPage, productDetailPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.expectLoaded();

    await expect(inventoryPage.productItems).toHaveCount(6);
    await expect(page.locator('.inventory_item_name')).toHaveCount(6);
    await inventoryPage.openProduct(products.backpack.name);
    await productDetailPage.expectProduct(products.backpack.name, products.backpack.price);

    await productDetailPage.backToProductsButton.click();
    await inventoryPage.expectLoaded();
  });
});
