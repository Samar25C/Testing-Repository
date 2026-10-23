import { test, expect } from '../../src/fixtures/test-fixtures';
import { products } from '../../src/data/users';

test.describe('Cart', () => {
  test('adding an item updates the cart badge @smoke', async ({ loggedInInventory }) => {
    await loggedInInventory.addToCart(products.backpack);
    await expect(loggedInInventory.cartBadge).toHaveText('1');
  });

  test('adding multiple items shows the correct count', async ({ loggedInInventory }) => {
    await loggedInInventory.addToCart(products.backpack);
    await loggedInInventory.addToCart(products.bikeLight);
    await expect(loggedInInventory.cartBadge).toHaveText('2');
  });

  test('cart page lists the added item', async ({ loggedInInventory, cartPage }) => {
    await loggedInInventory.addToCart(products.backpack);
    await loggedInInventory.openCart();
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.itemNames).toHaveText('Sauce Labs Backpack');
  });

  test('removing an item empties the cart', async ({ loggedInInventory, cartPage }) => {
    await loggedInInventory.addToCart(products.backpack);
    await loggedInInventory.openCart();
    await cartPage.removeItem(products.backpack);
    await expect(cartPage.items).toHaveCount(0);
  });
});
