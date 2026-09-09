import { test, expect } from '../../fixture/test';
import { users } from '../../testdata/users';

 test.describe('Authentication and Session Management', () => {
  test('Locked-out account cannot authenticate', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.locked);

    await loginPage.expectError('Sorry, this user has been locked out');
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });
});
