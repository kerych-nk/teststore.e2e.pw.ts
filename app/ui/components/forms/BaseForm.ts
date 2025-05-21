import { expect, Locator } from "@playwright/test";
import { BaseComponent } from "../BaseComponent";

export abstract class BaseForm extends BaseComponent {
  protected abstract submitBtn: Locator;
  async expectError(text: string) {
    await expect(this.page.locator(".form-error")).toContainText(text);
  }
  async submit() {
    await this.submitBtn.click();
  }
}
