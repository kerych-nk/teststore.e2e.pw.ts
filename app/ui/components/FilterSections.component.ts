import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class FilterSections extends BaseComponent {
  readonly compositionSection: Locator;

  constructor(page: Page) {
    super(page);
    this.compositionSection = page.locator(
      '//*[contains(text(), "Composition")]//following-sibling::ul//li'
    );
  }

  countBadge(li: Locator): Locator {
    return li.locator("//a//span");
  }

  checkbox(li: Locator): Locator {
    return li.locator("//*[@class='custom-checkbox']");
  }
}
