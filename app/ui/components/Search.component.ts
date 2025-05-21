import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class SearchComponent extends BaseComponent {
  private readonly input: Locator;
  readonly suggestion: Locator;

  constructor(page: Page) {
    super(page);
    this.input = page.locator('[aria-label="Search"]');
    this.suggestion = page.locator(".ui-menu-item");
  }

  async type(searchValue: string): Promise<void> {
    await this.input.waitFor({ state: "visible" });
    await this.input.fill(searchValue);
  }

  async search(item: string): Promise<void> {
    await this.type(item);
    await this.page.keyboard.press("Enter");
  }
}
