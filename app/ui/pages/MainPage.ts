import { expect, Locator, Page } from "@playwright/test";
import { CartCount } from "../components/CartCount.component";
import { Search } from "../components/Search.component";
import { UserAuthLinks } from "../components/UserAuthLinks.component";
import { BasePage } from "./BasePage";
import { step } from "@decorator/step";

export class MainPage extends BasePage {
  private search: Search;
  private cartCounter: CartCount;
  private userAuthLinks: UserAuthLinks;

  constructor(page: Page) {
    super(page);
    this.search = new Search(page);
    this.cartCounter = new CartCount(page);
    this.userAuthLinks = new UserAuthLinks(page);
  }

  @step("Open main page")
  async navigateTo(): Promise<void> {
    await this.page.goto("/");
    await expect(this.search.searchInput).toBeVisible({ timeout: 10000 });
  }

  @step("Fill in search field")
  async fillInSearch(searchValue: string) {
    await this.search.type(searchValue);
  }

  @step("Search product")
  async searchForProduct(searchValue: string) {
    await this.search.searchItem(searchValue);
  }

  @step("Open cart page")
  async openCart() {
    await this.cartCounter.clickOnBtn();
  }
  getCartCounter(): Locator {
    return this.cartCounter.counter;
  }

  @step("Open login page")
  async clickSignIn() {
    await this.userAuthLinks.clickSignIn();
  }

  @step("Get search suggestion locators")
  async getSearchSuggestionLocators() {
    return this.helpers.returnAllLocators(this.search.suggestionItems);
  }
}
