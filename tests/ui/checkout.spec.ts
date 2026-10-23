import { test, expect } from '../../src/fixtures/test-fixtures';
import { checkoutInfo, products } from '../../src/data/users';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loggedInInventory, cartPage }) => {
    await loggedInInventory.addToCart(products.backpack);
    await loggedInInventory.openCart();
    await cartPage.checkout();
  });

  test('user can complete an order end to end @smoke', async ({ page, checkoutPage }) => {
    await checkoutPage.fillInformation(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode,
    );
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('first name is required', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation('', checkoutInfo.lastName, checkoutInfo.postalCode);
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('last name is required', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation(checkoutInfo.firstName, '', checkoutInfo.postalCode);
    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
  });

  test('postal code is required', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation(checkoutInfo.firstName, checkoutInfo.lastName, '');
    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });
});
