import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/en";
import { configDotenv } from "dotenv";

configDotenv();

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.APP_URL);
});

test("Check submit button is enabled", async ({ page }) => {
  await expect(page.getByTestId("signIn-button")).toBeEnabled();
});

test("Check authorization error with fake login and password", async ({
  page,
}) => {
  await page.getByTestId("username-input").fill(faker.internet.username());
  await page.getByTestId("password-input").fill(faker.internet.password());
  const submitButton = page.getByTestId("signIn-button");
  await submitButton.click();
  await expect(page.getByTestId("authorizationError-popup")).toBeVisible();
});

test("Check submit button is disabled with login and short password", async ({
  page,
}) => {
  await page.getByTestId("username-input").fill(faker.internet.username());
  await page.getByTestId("password-input").fill("rtete");
  await expect(page.getByTestId("signIn-button")).toBeDisabled();
});
