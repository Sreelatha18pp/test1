import { test } from '../../fixture/test';
import { users } from '../../testdata/users';
import { products } from '../../testdata/products';

test.describe('Cart and Checkout', () => {
  test('Checkout information validation', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.addProduct(products.backpack.name);
    await cartPage.open();
    await cartPage.checkoutButton.click();
    await checkoutPage.expectInformationStep();

    await checkoutPage.continueButton.click();
    await checkoutPage.expectError('First Name is required');
    await checkoutPage.fillInformation('Ada', '', '10001');
    await checkoutPage.continueButton.click();
    await checkoutPage.expectError('Last Name is required');
    await checkoutPage.fillInformation('Ada', 'Lovelace', '');
    await checkoutPage.continueButton.click();
    await checkoutPage.expectError('Postal Code is required');
  });
});
