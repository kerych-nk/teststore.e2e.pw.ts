import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class Loader extends BaseComponent {
  private spinner: Locator;

  constructor(page: Page) {
    super(page);
    this.spinner = this.page.locator(".overlay__content");
  }

  async disappear() {
    if (await this.spinner.isVisible())
      await this.spinner.waitFor({ state: "detached" });
  }
}
