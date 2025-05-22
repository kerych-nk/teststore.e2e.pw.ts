import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class CartInfo extends BaseComponent {
  private checkoutBtn: Locator;
  private removeItemBtn: Locator;
  private addedItem: Locator;
  private productQuantity: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutBtn = page.locator(".checkout .btn");
    this.removeItemBtn = page.locator(".remove-from-cart .material-icons");
    this.addedItem = page.locator('[name="product-quantity-spin"]');
    this.productQuantity = page.locator("li.cart-item");
  }

  async removeItem(itemOrder = 0) {
    await this.removeItemBtn.nth(itemOrder).click();
  }

  async proceedToCheckoutBtn() {
    await this.checkoutBtn.click();
  }
}
