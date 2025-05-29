import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class OrderConfirmation extends BaseComponent {
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator(".h1.card-title");
  }
}
