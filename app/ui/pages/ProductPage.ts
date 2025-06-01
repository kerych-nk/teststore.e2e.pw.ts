import { expect, Page } from "@playwright/test";
import { AddedItem } from "../components/AddedItem.component";
import { AddToCart } from "../components/AddToCart.component";
import { BreadCrumbs } from "../components/BreadCrumbs.component";
import { QuantityControl } from "../components/QuantityControl.component";
import { BasePage } from "./BasePage";
import { step } from "@decorator/step";
import { ProductDescription } from "../components/ProductDescription.component";

export class ProductPage extends BasePage {
  private addToCartComp: AddToCart;
  private breadCrumbComp: BreadCrumbs;
  private productDescriptionComp: ProductDescription;
  private addedItemComp: AddedItem;
  private quantityControlComp: QuantityControl;
  private expectedModalRequestPart: string = "controller";
  private pageUrl: string =
    "?id_product=4&id_product_attribute=16&rewrite=the-adventure-begins-framed-poster&controller=product#";

  constructor(page: Page) {
    super(page);
    this.addToCartComp = new AddToCart(page);
    this.breadCrumbComp = new BreadCrumbs(page);
    this.productDescriptionComp = new ProductDescription(page);
    this.addedItemComp = new AddedItem(page);
    this.quantityControlComp = new QuantityControl(page);
  }

  @step("Open product page")
  async navigateTo(): Promise<void> {
    await this.page.goto(this.pageUrl);
  }

  @step("Add product to cart")
  async addProductToCart() {
    await this.page.waitForLoadState("load");
    const waitForModalResponse = this.helpers.responseWaiter(
      this.expectedModalRequestPart
    );
    await this.addToCartComp.clickOn();
    await waitForModalResponse;
    await this.page.waitForLoadState("load");
  }

  @step("Close 'Added to cart' confirmation modal")
  async closeAddedToCartModal() {
    await this.addedItemComp.clickOnClose();
    await this.addedItemComp.title.waitFor({ state: "hidden" });
  }

  @step("Change product quantity on page")
  async changeProductQuantity(action: "+" | "-") {
    if (action === "+") {
      await this.quantityControlComp.increase();
    } else {
      await this.quantityControlComp.decrease();
    }
    await this.waitForLoaderToDisappear();
  }

  @step("Get breadcrumbs locator")
  async getBreadcrumbsLocator() {
    await expect(this.breadCrumbComp.body).toBeVisible();
    return this.breadCrumbComp.body;
  }

  @step("Get product title")
  async getProductPageTitle() {
    const titleLocator = this.productDescriptionComp.titleMain;
    await expect(titleLocator).toBeVisible();
    return titleLocator;
  }
}
