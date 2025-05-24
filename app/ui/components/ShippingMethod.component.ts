import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class ShippingMethod extends BaseComponent {
  private continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.continueButton = page.locator("#js-delivery button");
  }

  async confirmAndContinue() {
    await expect(this.continueButton).toBeEnabled();
    await this.continueButton.click();
  }
}
