import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class Loader extends BaseComponent {
  private spinner: Locator = this.page.locator(".overlay__content");

  async disappear() {
    if (await this.spinner.isVisible())
      await this.spinner.waitFor({ state: "detached" });
  }
}
