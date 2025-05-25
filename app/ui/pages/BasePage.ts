import { Page } from "@playwright/test";
import { Loader } from "../components/Loader.component";
import { FunctionHelpers } from "../../../utils/helpers/FunctionHelpers";
import { step } from "@decorator/step";

export abstract class BasePage {
  protected page: Page;
  protected helpers: FunctionHelpers;
  private loader: Loader;

  abstract navigateTo(): void;

  constructor(page: Page) {
    this.page = page;
    this.helpers = new FunctionHelpers(page);
    this.loader = new Loader(page);
  }

  @step("Waiting for loader to disappear")
  async waitForLoaderToDisappear() {
    await this.loader.disappear();
  }
}
