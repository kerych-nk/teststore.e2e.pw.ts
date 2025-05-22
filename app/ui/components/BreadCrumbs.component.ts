import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class BreadCrumbs extends BaseComponent {
  private body: Locator;

  constructor(page: Page) {
    super(page);
    this.body = page.locator(".breadcrumb");
  }
}
