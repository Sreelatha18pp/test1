import { test, expect } from '../../fixture/test';
import { users } from '../../testdata/users';

 test.describe('Authentication and Session Management', () => {
  test('Logout and protected-page access', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.expectLoaded();

    await inventoryPage.logout();
    await loginPage.expectVisible();

    await page.goBack();
    await expect(page).not.toHaveURL(/inventory\.html$/);
    await expect(page.locator('.inventory_list')).toHaveCount(0);
  });
});
