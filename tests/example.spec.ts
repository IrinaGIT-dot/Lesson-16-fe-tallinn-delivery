import { test, expect } from '@playwright/test';
import path from "path";

test.beforeEach(async ({ page }) => {
await page.goto(process.env.URL)
  }
)

test('Check submit button is enabled', async ({ page }) => {
  const submitButton = await page.getByTestId('signIn-button')
  await expect(submitButton).toBeEnabled();
});

test('Click submit button without login data shows pop-up', async ({ page }) => {
  const userNameField = await page.getByTestId("username-input")
  const passwordField = await page.getByTestId("password-input")
  await userNameField.fill("test")
  const submitButton = page.getByTestId('signin-button')
  await expect(submitButton).toBeEnabled();
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
