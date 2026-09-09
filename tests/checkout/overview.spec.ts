import { test, expect } from '../../fixture/test';
import { users } from '../../testdata/users';
import { products } from '../../testdata/products';
import { checkoutData } from '../../testdata/checkout';

test.describe('Cart and Checkout', () => {
  test('Checkout overview accuracy', async ({ loginPage, inventoryPage, cartPage, checkoutPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.addProduct(products.backpack.name);
    await cartPage.open();
    await cartPage.checkoutButton.click();
    await checkoutPage.fillInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
    await checkoutPage.continueButton.click();
    await checkoutPage.expectOverview();

    await expect(page.locator('.cart_item')).toContainText(products.backpack.name);
    await expect(page.locator('.inventory_item_price')).toHaveText(products.backpack.price);
    await expect(page.getByText('Payment Information')).toBeVisible();
    await expect(page.getByText('Shipping Information')).toBeVisible();
    await expect(page.getByText('Item total: $29.99')).toBeVisible();
    await expect(page.getByText('Tax: $2.40')).toBeVisible();
    await expect(page.getByText('Total: $32.39')).toBeVisible();
  });
});
