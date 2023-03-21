import { test, expect } from '@playwright/test';
import db from "../../server/src/db"
import { connectToDb, disconnectFromDb, resetDB } from "../dbHelpers";

test.beforeAll(connectToDb);
test.beforeEach(resetDB);
test.afterAll(disconnectFromDb);

test('get login link', async ({ page }) => {
  await page.goto('http://localhost:4000/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});

