import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class CheckoutPaymentStep extends BaseComponent {
  private readonly payByBankRadioButton: Locator;
  private readonly termsAndConditionsCheckbox: Locator;
  private readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.payByBankRadioButton = page.locator("#payment-option-1");
    this.termsAndConditionsCheckbox = page.locator("#conditions-to-approve");
    this.placeOrderButton = page.locator("#payment-confirmation button");
  }

  async setPaymentByBank() {
    await this.payByBankRadioButton.check();
  }

  async acceptTerms() {
    await this.termsAndConditionsCheckbox.click();
  }

  async submitPayment() {
    await this.placeOrderButton.click();
  }
}
