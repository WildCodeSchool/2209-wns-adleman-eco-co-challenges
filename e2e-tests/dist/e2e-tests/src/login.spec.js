"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const dbHelpers_1 = require("./dbHelpers");
const argon2_1 = require("argon2");
const User_1 = require("../../server/src/entity/User");
const db_1 = require("../../server/src/db");
test_1.test.beforeAll(dbHelpers_1.connect);
test_1.test.beforeEach(dbHelpers_1.clearDB);
test_1.test.afterAll(dbHelpers_1.disconnect);
(0, test_1.test)("can log in with correct credentials", async ({ page }) => {
    await page.goto("/login");
    const login = "Bob";
    const password = "Password3";
    const hashedPassword = await (0, argon2_1.hash)(password);
    await db_1.default.getRepository(User_1.default).insert({ nickName: login, hashedPassword });
    await page.goto("/login");
    await page.getByTestId("login-login").type(login);
    await page.getByTestId("login-password").type(password);
    await page.getByRole("button", { name: "Login" }).click();
});
(0, test_1.test)("should fail with password lacking an uppercase letter", async ({ page, }) => {
    await page.goto("/login");
    const login = "Bob";
    const password = "password3";
    const hashedPassword = await (0, argon2_1.hash)(password);
    await db_1.default.getRepository(User_1.default).insert({ nickName: login, hashedPassword });
    await page.getByTestId("login-login").type(login);
    await page.getByTestId("login-password").type(password);
    await page.getByRole("button", { name: "Login" }).click();
    const locator = page.locator("#password-error");
    await (0, test_1.expect)(locator).toContainText("uppercase letter");
});
//# sourceMappingURL=login.spec.js.map