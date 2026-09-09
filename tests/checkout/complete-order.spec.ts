import { test, expect } from '../../fixture/test';
import { users } from '../../testdata/users';
import { products } from '../../testdata/products';
import { checkoutData } from '../../testdata/checkout';

test.describe('Cart and Checkout', () => {
  test('Complete order and return home', async ({ loginPage, inventoryPage, cartPage, checkoutPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.addProduct(products.backpack.name);
    await cartPage.open();
    await cartPage.checkoutButton.click();
    await checkoutPage.fillInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
    await checkoutPage.continueButton.click();
    await checkoutPage.finishButton.click();
    await checkoutPage.expectComplete();

    await expect(page.getByText('Your order has been dispatched')).toBeVisible();
    await page.getByRole('button', { name: 'Back Home' }).click();
    await inventoryPage.expectLoaded();
    await expect(inventoryPage.cartLink.locator('.shopping_cart_badge')).toHaveCount(0);
  });
});
