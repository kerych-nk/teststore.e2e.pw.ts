import { expect, Page } from "@playwright/test";
import { CheckoutPaymentStep } from "../components/CheckoutPaymentStep.component";
import { OrderConfirmation } from "../components/OrderConfirmation.component";
import { ProductDescription } from "../components/ProductDescription.component";
import { ShippingMethod } from "../components/ShippingMethod.component";
import { BasePage } from "./BasePage";
import { DeliveryAddressForm } from "../components/DeliveryAddressForm.component";
import { step } from "@decorator/step";

export class OrderPage extends BasePage {
  private productDescriptionComp: ProductDescription;
  private deliveryAddressComp: DeliveryAddressForm;
  private orderConfirmationComp: OrderConfirmation;
  private checkoutPaymentComp: CheckoutPaymentStep;
  private shippingMethodComp: ShippingMethod;
  private pageUrl: string = "?controller=order";

  constructor(page: Page) {
    super(page);
    this.productDescriptionComp = new ProductDescription(page);
    this.deliveryAddressComp = new DeliveryAddressForm(page);
    this.orderConfirmationComp = new OrderConfirmation(page);
    this.checkoutPaymentComp = new CheckoutPaymentStep(page);
    this.shippingMethodComp = new ShippingMethod(page);
  }

  @step("Open order page")
  async navigateTo(): Promise<void> {
    await this.page.goto(this.pageUrl);
    await this.waitForLoaderToDisappear();
  }

  @step("Complete order creation process")
  async completeOrderProcess(shippingData: Record<string, string>) {
    // Step 1: Fill in and submitting shipping address
    await this.helpers.fillForm(shippingData);
    await this.deliveryAddressComp.submit();
    await this.waitForLoaderToDisappear();
    // Step 2: Confirming shipping method
    await this.shippingMethodComp.confirmAndContinue();
    // Step 3: Select payment method, accept term and conditions
    await this.checkoutPaymentComp.setPaymentByBank();
    await this.checkoutPaymentComp.acceptTerms();
    await this.checkoutPaymentComp.submitPayment();
    //Step 4: waiting for order confirmation
    await expect(this.orderConfirmationComp.title).toBeVisible({
      timeout: 20_000,
    });
    await this.waitForLoaderToDisappear();
  }

  @step("Get order confirmation title text")
  async getOrderConfText() {
    return this.orderConfirmationComp.title;
  }

  @step("Get ordered item title from confirmation page")
  async getOrderItemTitle() {
    return this.productDescriptionComp.titleInOrder;
  }
}
