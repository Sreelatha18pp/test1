import { test, expect } from '../../fixture/test';
import { users } from '../../testdata/users';

 test.describe('Authentication and Session Management', () => {
  test('Keyboard and password accessibility', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.usernameInput.focus();
    await page.keyboard.type(users.standard.username);
    await page.keyboard.press('Tab');
    await page.keyboard.type(users.standard.password);

    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await page.keyboard.press('Enter');
    await inventoryPage.expectLoaded();
  });
});
