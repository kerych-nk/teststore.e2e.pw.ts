import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class RegistrationForm extends BaseComponent {
  private saveUserBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.saveUserBtn = page.locator('[data-link-action="save-customer"]');
  }

  async clickSaveBtn() {
    await this.saveUserBtn.click();
  }
}
