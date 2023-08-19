import { BeforeAll, BeforeStep, Before, AfterAll } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";
import { basePage } from "./basepage";

let browser: Browser;
let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  basePage.page = page;
});

AfterAll(async function () {
  await page.close();
  await browser.close();
});
