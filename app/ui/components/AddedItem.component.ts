import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class AddedItem extends BaseComponent {
  private closeBtn: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator("#blockcart-modal.in");
    this.closeBtn = page.locator("#blockcart-modal .close");
  }

  async clickOnClose() {
    await this.closeBtn.waitFor({ state: "visible" });
    await this.closeBtn.click();
  }
}
