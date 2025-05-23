import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class ProductDescription extends BaseComponent {
  private titleMain: Locator;
  private titlePreview: Locator;
  private titleInOrder: Locator;

  constructor(page: Page) {
    super(page);
    this.titleMain = page.locator("h1");
    this.titlePreview = page.locator(".product-description a");
    this.titleInOrder = page.locator(".order-line.row");
  }

  async main() {
    return this.titleMain.textContent();
  }

  async preview() {
    return this.titlePreview.textContent();
  }

  async inOrder() {
    return this.titleInOrder.textContent();
  }
}
