const { Given, When, Then } = require("@cucumber/cucumber");
import test, { Browser, Page, chromium } from "@playwright/test";
import { basePage } from "../../hooks/basepage";
import constants from "../constants/elementsIds";

let browser: Browser;

let page: Page;

Given("user go to truckercloud page", async function () {
  await basePage.page.goto("http://localhost:3000/login");
});

When("user enters valid username and password", async function () {
  basePage.page.waitForTimeout(100);
  await basePage.page.waitForSelector(
    "[id='" + constants.LOGIN_PAGE.usernameInput + "']"
  );

  const username = basePage.page.locator(
    "[id='" + constants.LOGIN_PAGE.usernameInput + "']"
  );
  await username.click();
  await username.type(constants.USERNAME);

  await basePage.page.waitForSelector(
    "[id='" + constants.LOGIN_PAGE.passwordInput + "']"
  );
  const password = basePage.page.locator(
    "[id='" + constants.LOGIN_PAGE.passwordInput + "']"
  );
  await password.click();
  await password.type("changeme");
});

When("clicks Login", async function () {
  await basePage.page.waitForSelector(
    "[id='" + constants.LOGIN_PAGE.loginButton + "']"
  );
  const loginButton = await basePage.page.locator(
    "[id='" + constants.LOGIN_PAGE.loginButton + "']"
  );
  await loginButton.click();
});

Then("page login correctly and load dahsboard", async function () {
  await basePage.page.waitForSelector(
    "[id='" + constants.LATERAL_MENU.dashboard + "']"
  );
});
