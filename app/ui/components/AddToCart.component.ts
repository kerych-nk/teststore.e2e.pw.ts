import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class AddToCart extends BaseComponent {
  protected root: Locator;
  private body: Locator;

  constructor(page: Page) {
    super(page);
    this.body = page.locator(".product-add-to-cart .add");
  }

  async clickOn() {
    await this.body.waitFor({ state: "visible" });
    await this.body.click();
  }
}
