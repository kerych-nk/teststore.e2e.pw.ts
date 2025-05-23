import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class DeliveryAddressForm extends BaseComponent {
  private continueBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.continueBtn = page.locator("#delivery-address .continue.btn");
  }

  async submit() {
    await expect(this.continueBtn).toBeVisible();
    await this.continueBtn.click();
  }
}
