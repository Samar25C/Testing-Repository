import { test, expect } from '../../src/fixtures/test-fixtures';
import { users } from '../../src/data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('standard user can log in successfully @smoke', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.errorMessage).toContainText('this user has been locked out');
  });

  test('invalid password shows an error', async ({ loginPage }) => {
    await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);
    await expect(loginPage.errorMessage).toContainText('do not match any user');
  });

  test('empty username shows a required error', async ({ loginPage }) => {
    await loginPage.login('', users.standard.password);
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('empty password shows a required error', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, '');
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });
});
