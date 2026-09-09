import { test, expect } from '../../fixture/test';
import { users } from '../../testdata/users';

 test.describe('Authentication and Session Management', () => {
  test('Valid standard-user login', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.expectVisible();
    await loginPage.login(users.standard);

    await inventoryPage.expectLoaded();
    await expect(page).toHaveTitle('Swag Labs');
  });
});
