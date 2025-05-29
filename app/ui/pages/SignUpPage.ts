import { Page } from "@playwright/test";
import { RegistrationForm } from "../components/RegistrationForm.component";
import { SignInForm } from "../components/SignInForm.component";
import { UserAuthLinks } from "../components/UserAuthLinks.component";
import { BasePage } from "./BasePage";
import { MainPage } from "./MainPage";
import { step } from "@decorator/step";

export class SignUpPage extends BasePage {
  private signInComp: SignInForm;
  private regFormComp: RegistrationForm;
  private userAuthComp: UserAuthLinks;
  private mainPage: MainPage;
  private formSubmitResponseUrlPart: string = "controller=action";
  private pageUrl: string = "?controller=registration";

  constructor(page: Page) {
    super(page);
    this.signInComp = new SignInForm(page);
    this.regFormComp = new RegistrationForm(page);
    this.userAuthComp = new UserAuthLinks(page);
    this.mainPage = new MainPage(page);
  }

  @step("Navigate to Registration page via URL")
  async navigateTo(): Promise<void> {
    await this.page.goto(this.pageUrl);
  }

  @step("Navigate to Registration Page through UI flow")
  async navigateToRegPage() {
    await this.mainPage.clickSignIn();
    await this.signInComp.goToRegistration();
    await this.page.waitForLoadState();
  }

  @step("Enter registration data")
  async enterRegistrationData(registrationScenarios: {}) {
    await this.helpers.fillForm(registrationScenarios);
  }

  @step("Confirm registration")
  async confirmRegistration() {
    const responsePromise = this.helpers.responseWaiter(
      this.formSubmitResponseUrlPart
    );
    await this.regFormComp.clickSaveBtn();
    await responsePromise;
  }

  @step("Verify user is logged in")
  async userIsLoggedIn() {
    await this.userAuthComp.profileLinkIndicator.waitFor({ state: "visible" });
    return await this.userAuthComp.profileLinkIndicator.innerText();
  }
}
