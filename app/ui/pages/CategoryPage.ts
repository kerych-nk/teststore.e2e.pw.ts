import { expect, Locator, Page } from "@playwright/test";
import { FilterSections } from "../components/FilterSections.component";
import { ProductDescription } from "../components/ProductDescription.component";
import { BasePage } from "./BasePage";
import { step } from "@decorator/step";

export class CategoryPage extends BasePage {
  private readonly pageUrl: string = "?id_category=2&controller=category";
  private productDescription: ProductDescription;
  private filterSections: FilterSections;
  private readonly filterUpdateRequestUrlPart: string =
    "module=productcomments&controller=CommentGrade";

  constructor(page: Page) {
    super(page);
    this.productDescription = new ProductDescription(page);
    this.filterSections = new FilterSections(page);
  }

  @step("Open category page")
  async navigateTo() {
    await this.page.goto(this.pageUrl);
    await this.waitForLoaderToDisappear();
  }

  @step("Opening product details page from list")
  async openItem(itemOrder: number = 0) {
    const itemLink = this.productDescription.titlePreview.nth(itemOrder);
    await expect(itemLink).toBeVisible({ timeout: 10000 });
    await itemLink.click();
    await this.waitForLoaderToDisappear();
  }

  async getItemTitle(itemOrder: number = 0) {
    const titleElement = this.productDescription.titlePreview.nth(itemOrder);
    await expect(titleElement).toBeVisible();
    return this.helpers.getElementText(titleElement);
  }

  @step("Get all item title locators")
  async getAllItemTitleLocators() {
    await expect(this.productDescription.titlePreview.last()).toBeVisible();
    return this.productDescription.titlePreview.all();
  }

  @step("Click in the filter")
  async setFilter(filterToActivate: Locator) {
    await filterToActivate.click();
  }

  @step("Get item count from filter")
  async getItemCountFromFilter(filterElementLocator: Locator) {
    await expect(filterElementLocator.first()).toBeVisible();
    const countBadgeLocator =
      this.filterSections.countBadge(filterElementLocator);
    const productsAmountOnFilterText = await this.helpers.getElementText(
      countBadgeLocator
    );
    return this.helpers.extractNumberFromStr(productsAmountOnFilterText);
  }

  @step("Applying each filter and verifying item count")
  async applyEachFilterAndVerifyCount(filterOptionLocators: Locator[]) {
    for (const filterOption of filterOptionLocators) {
      await expect(filterOption).toBeVisible({ timeout: 10000 });

      const filterCheckbox = this.filterSections.checkbox(filterOption);
      await this.page.waitForLoadState("load");
      await filterOption.waitFor();

      const waitResponse = this.helpers.responseWaiter(
        this.filterUpdateRequestUrlPart
      );
      await filterCheckbox.click();
      await expect(filterCheckbox).toBeChecked({ timeout: 20_000 });
      await waitResponse;
      await this.waitForLoaderToDisappear();

      const itemsForFilter = await this.getItemCountFromFilter(filterOption);

      const allItems = await this.getAllItemTitleLocators();
      const exactAmountOfProducts = allItems ? allItems.length : 0;
      expect(itemsForFilter).toBe(exactAmountOfProducts);

      const waitTillNeededResponseClear = this.helpers.responseWaiter(
        this.filterUpdateRequestUrlPart
      );
      await filterCheckbox.click(); //Second click to deactivate
      try {
        await waitTillNeededResponseClear; //Wait for Promise which return responseWaiter
      } catch (error) {
        console.warn(
          `API response for filter deactivation not received or timed out. Error: ${error}`
        );
      }
      await this.waitForLoaderToDisappear();
      await this.page.waitForLoadState("load");
    }
  }
  @step("Get all 'Composition' filter locators")
  async getAllCompositionFilterLocators() {
    return this.helpers.returnAllLocators(
      this.filterSections.compositionSection
    );
  }
}
