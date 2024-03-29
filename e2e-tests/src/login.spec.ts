import { test } from "@playwright/test";
import { clearDB, connect, disconnect } from "./dbHelpers";
import { hash } from "argon2";
import User from "../../server/src/entity/User";
import db from "../../server/src/db";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can log in with correct credentials", async ({ page }) => {
  await page.goto("/login");

  const login = "Bob";
  const password = "Password3";
  const hashedPassword = await hash(password);
  await db.getRepository(User).insert({ nickName: login, hashedPassword });

  await page.goto("/login");
  await page.getByTestId("login-login").type(login);
  await page.getByTestId("login-password").type(password);
  await page.getByRole("button", { name: "Login" }).click();
});