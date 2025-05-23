import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { step } from "../../../decorator/step";

export class QuantityControl extends BaseComponent {
  private plusBtn: Locator;
  private minusBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.plusBtn = page.locator(".bootstrap-touchspin-up");
    this.minusBtn = page.locator(".bootstrap-touchspin-down");
  }

  @step("Amount increased")
  async increase() {
    await this.plusBtn.waitFor({ state: "visible" });
    await this.plusBtn.click();
  }

  @step("Amount decreased")
  async decrease() {
    await this.minusBtn.waitFor({ state: "visible" });
    await this.minusBtn.click();
  }
}
