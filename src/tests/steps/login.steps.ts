const { Given, When, Then } = require("@cucumber/cucumber");
import { ICustomWorld } from "../custom-world/customWorld";

Given("user go to trucklercloud page", async function (this: ICustomWorld) {
  await this.page?.goto("http://localhost:3000/login");
  await this.page?.waitForSelector("[id='usernameLogin']");
});

When(
  "user enters correct username and password",
  async function (this: ICustomWorld) {
    const username = this.page?.locator("[id='usernameLogin']");
    username?.click();
    username?.type("rsanchez@r1vs.com");
    await this.page?.waitForSelector("[id='passwordLogin']");
    const password = this.page?.locator("[id='passwordLogin']");
    password?.click();
    password?.type("changeme");
  }
);

Then("page login and loads dashboard", async function (this: ICustomWorld) {
  await this.page?.waitForSelector("[id='passwordLogin']");
});
