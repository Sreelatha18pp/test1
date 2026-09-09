import { expect, type Locator, type Page } from '@playwright/test';
import { routes } from '../utils/routes';

export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.errorMessage = page.locator('h3').filter({ hasText: 'Error:' });
  }

  async expectInformationStep(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.checkoutInformation.replace('.', '\\.')}$`));
    await expect(this.page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }

  async expectOverview(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.checkoutOverview.replace('.', '\\.')}$`));
    await expect(this.page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
  }

  async expectComplete(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.checkoutComplete.replace('.', '\\.')}$`));
    await expect(this.page.getByText('Checkout: Complete!', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
  }
}
