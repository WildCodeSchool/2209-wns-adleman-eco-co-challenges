"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const dbHelpers_1 = require("../dbHelpers");
test_1.test.beforeAll(dbHelpers_1.connectToDb);
test_1.test.beforeEach(dbHelpers_1.resetDB);
test_1.test.afterAll(dbHelpers_1.disconnectFromDb);
(0, test_1.test)('get login link', async ({ page }) => {
    await page.goto('http://localhost:4000/');
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();
    // Expects the URL to contain intro.
    await (0, test_1.expect)(page).toHaveURL(/.*intro/);
});
//# sourceMappingURL=users.spec.js.map