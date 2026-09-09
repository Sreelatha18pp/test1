import { test } from '../../fixture/test';
import { users } from '../../testdata/users';

 test.describe('Authentication and Session Management', () => {
  test('Invalid and incomplete login validation', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login({ username: '', password: '' });
    await loginPage.expectError('Username is required');

    await loginPage.usernameInput.fill(users.standard.username);
    await loginPage.passwordInput.fill('');
    await loginPage.loginButton.click();
    await loginPage.expectError('Password is required');

    await loginPage.login(users.invalid);
    await loginPage.expectError('Username and password do not match');
  });
});
