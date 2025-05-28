import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class Search extends BaseComponent {
  readonly searchInput: Locator;
  readonly suggestionItems: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('[aria-label="Search"]');
    this.suggestionItems = page.locator(".ui-menu-item");
  }

  async type(searchValue: string) {
    await this.searchInput.waitFor({ state: "visible" });
    await this.searchInput.fill(searchValue);
  }

  async searchItem(item: string) {
    await this.type(item);
    await this.page.keyboard.press("Enter");
  }
}
