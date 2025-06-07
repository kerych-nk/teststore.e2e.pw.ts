import { expect, Page } from "@playwright/test";
import { CartInfo } from "../components/CartInfo.component";
import { BasePage } from "./BasePage";
import { ProductPage } from "./ProductPage";
import { step } from "@decorator/step";

export class CartPage extends BasePage {
  private productPage: ProductPage;
  private cartInfoComp: CartInfo;
  private pageUrl: string = "/controller=cart&action=show";
  private cartUpdated: string =
    "fc=module&module=ps_shoppingcart&controller=ajax";
  private updatedAmount: string =
    "fc=module&module=ps_shoppingcart&controller=ajax";

  constructor(page: Page) {
    super(page);
    this.productPage = new ProductPage(page);
    this.cartInfoComp = new CartInfo(page);
  }

  @step("Navigate to the Cart page")
  async navigateTo(): Promise<void> {
    await this.page.goto(this.pageUrl);
  }

  @step("Get added items")
  async addedItems() {
    return this.cartInfoComp.cartItems;
  }

  @step("Retrieve all items from cart")
  async getAllCartItems() {
    await this.waitForItemsToAppear();
    return this.helpers.returnAllLocators(this.cartInfoComp.cartItems);
  }

  @step("Check item quantity")
  async getItemQuantity(locatorIndex: number = 0) {
    const quantityInput = this.cartInfoComp.itemQuantityInput.nth(locatorIndex);
    await quantityInput.waitFor();
    return await quantityInput.inputValue();
  }

  @step("Update item quantity")
  async updateItemQuantity(action: "+" | "-") {
    const responsePromise = this.helpers.responseWaiter(this.updatedAmount);
    await this.productPage.changeProductQuantity(action);
    await responsePromise;
  }

  @step("Wait for cart content to load")
  async waitForItemsToAppear(expectedAmount: number = 1) {
    await this.helpers.waitElementsAppearance(
      this.cartInfoComp.cartItems,
      expectedAmount
    );
  }

  @step("Remove item from cart")
  async removeItemFromCart(itemIndex: number = 0) {
    await this.page.waitForLoadState("load");

    const responsePromise = this.helpers.responseWaiter(this.cartUpdated);
    await this.cartInfoComp.removeItem(itemIndex);
    await responsePromise;
    await this.page.reload();
    await this.page.waitForLoadState("load");
  }

  @step("Proceed to checkout")
  async proceedToCheckout() {
    await this.cartInfoComp.proceedToCheckoutBtn();
  }

  @step("Verify that cart is empty")
  async verifyCartIsEmpty() {
    const emptyMessageLocator = this.cartInfoComp.noItemsMessage;
    await expect(emptyMessageLocator).toBeVisible();
    await expect(emptyMessageLocator).toContainText(
      "There are no more items in your cart"
    );
  }
}
