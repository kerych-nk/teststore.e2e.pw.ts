import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class UserAuthLinks extends BaseComponent {
  private signInLink: Locator;
  readonly profileLinkIndicator: Locator;
  readonly signOutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.signInLink = page.locator(".user-info .hidden-sm-down");
    this.profileLinkIndicator = page.locator("#_desktop_user_info");
    this.signOutLink = page.locator(".logout.hidden-sm-down");
  }

  async clickSignIn() {
    await this.signInLink.click();
  }

  async isUserLoggedIn() {
    return this.signOutLink.isVisible();
  }

  async clickSignOut() {
    if (await this.signOutLink.isVisible()) {
      await this.signOutLink.click();
    } else {
      console.warn("Sign out link is not visible. Cannot click.");
    }
  }
}
