import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class CartCount extends BaseComponent {
  private btn: Locator;
  counter: Locator;

  constructor(page: Page) {
    super(page);
    this.btn = page.locator("#_desktop_cart");
    this.counter = page.locator(".header .cart-products-count");
  }

  async clickOnBtn() {
    await expect(this.btn).toBeVisible();
    await this.btn.click();
    await this.page.waitForURL("**/controller=cart");
  }
}
