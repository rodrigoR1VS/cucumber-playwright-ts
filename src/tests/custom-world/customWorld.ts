import { Browser, Page, chromium, BrowserContext } from "playwright";
import * as messages from "@cucumber/messages";
import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}
export interface ICustomWorld extends World {
  feature?: messages.Pickle;
  context?: BrowserContext;
  page?: Page;
  testName?: string;
  starTime?: Date;
}
export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
}
setWorldConstructor(CustomWorld);
