import { Locator, Page } from "@playwright/test";
import { step } from "../../../decorator/step";

export abstract class BaseModal {
  protected page: Page;
  protected abstract root: Locator;
  protected closeSelector = "#blockcart-modal button.close";

  constructor(page: Page) {
    this.page = page;
  }

  async isVisible() {
    return this.root.isVisible();
  }

  @step()
  async closeModal() {
    await this.root.locator(this.closeSelector).click();
  }
}
