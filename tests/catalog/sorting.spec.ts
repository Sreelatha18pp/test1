import { test, expect } from '../../fixture/test';
import { users } from '../../testdata/users';

test.describe('Catalog and Product Interaction', () => {
  test('All inventory sort modes', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.expectLoaded();

    await expect(inventoryPage.sortSelect).toHaveValue('az');
    await inventoryPage.sortSelect.selectOption('za');
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
    await inventoryPage.sortSelect.selectOption('lohi');
    await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');
    await inventoryPage.sortSelect.selectOption('hilo');
    await expect(page.locator('.inventory_item_price').first()).toHaveText('$49.99');
    await inventoryPage.sortSelect.selectOption('az');
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
  });
});
