import { Page } from "@playwright/test";
import { MainPage } from "./MainPage";
import { CartPage } from "./CartPage";
import { CategoryPage } from "./CategoryPage";
import { OrderPage } from "./OrderPage";
import { ProductPage } from "./ProductPage";
import { SignInPage } from "./SignInPage";
import { SignUpPage } from "./SignUpPage";

export class AllPages {
  private page: Page;
  readonly main: MainPage;
  readonly cart: CartPage;
  readonly category: CategoryPage;
  readonly order: OrderPage;
  readonly product: ProductPage;
  readonly signin: SignInPage;
  readonly signup: SignUpPage;

  constructor(page: Page) {
    this.page = page;
    this.main = new MainPage(page);
    this.cart = new CartPage(page);
    this.category = new CategoryPage(page);
    this.order = new OrderPage(page);
    this.product = new ProductPage(page);
    this.signin = new SignInPage(page);
    this.signup = new SignUpPage(page);
  }
}
