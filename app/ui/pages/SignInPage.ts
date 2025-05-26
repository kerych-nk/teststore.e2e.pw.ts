import { Page } from "@playwright/test";
import { SignInForm } from "../components/SignInForm.component";
import { BasePage } from "./BasePage";
import { step } from "@decorator/step";

export class SignInPage extends BasePage {
  protected signInFormComponent: SignInForm;
  private readonly pageUrl: string = "?controller=authentication";

  constructor(page: Page) {
    super(page);
    this.signInFormComponent = new SignInForm(page);
  }

  @step("Navigate to Sign In page")
  async navigateTo(): Promise<void> {
    await this.page.goto(this.pageUrl);
    await this.waitForLoaderToDisappear();
  }

  @step("Following link to Registration page")
  async followToRegistrationPage(): Promise<void> {
    await this.signInFormComponent.goToRegistration();
  }
}
