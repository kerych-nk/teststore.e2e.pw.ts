import { Page } from "@playwright/test";
import { Loader } from "../components/Loader.components";

export abstract class BasePage {
  protected loader: Loader;

  constructor(protected page: Page) {
    this.loader = new Loader(page);
  }
  async waitLoader() {
    await this.loader.disappear();
  }
}
