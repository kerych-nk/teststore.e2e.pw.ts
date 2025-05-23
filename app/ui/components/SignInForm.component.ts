import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class SignInForm extends BaseComponent {
  private createAccountLink: Locator;

  constructor(page: Page) {
    super(page);
    this.createAccountLink = page.locator(".no-account a");
  }

  async goToRegistration() {
    await expect(this.createAccountLink).toBeVisible();
    await this.createAccountLink.click();
  }
}
