import { test, expect, Locator } from "@playwright/test";
import { guest, loginUser } from "fixtures/fixtures";
import { registrationScenarios as testData } from "@utilTestData/registrationScenarios";
import TestDataGenerator from "@utils/testData/testDataGenerator";

test.describe("Core User Flows", () => {
  for (const inputData of testData) {
    guest(
      `MyStore-005: Registration with ${inputData.testTitle} data`,
      async ({ pages }) => {
        await pages.signup.navigateToRegPage();
        await pages.signup.waitForLoaderToDisappear();
        await pages.signup.enterRegistrationData(inputData);
        await pages.signup.confirmRegistration();

        expect(await pages.signup.userIsLoggedIn()).toContain(
          inputData["First name"]
        );
        expect(await pages.signup.userIsLoggedIn()).toContain(
          inputData["Last name"]
        );
      }
    );
  }
  loginUser(
    "MyStore-006: Full order cycle for an authenticated user",
    async ({ pages }) => {
      const successMsgText = "YOUR ORDER IS CONFIRMED";
      const itemOrderIndex = 0;

      await test.step("Navigate to the category and open product", async () => {
        await pages.category.navigateTo();
        await pages.category.openItem(itemOrderIndex);
      });

      const titleOfOrderedItem: Locator =
        await pages.product.getProductPageTitle();

      expect(
        titleOfOrderedItem,
        "Title of the item to be ordered should not be null"
      ).not.toBeNull();

      const assuredTitleOfOrderedItem = titleOfOrderedItem;

      await test.step("Add item to cart", async () => {
        await pages.product.addProductToCart();
        await pages.product.closeAddedToCartModal();
      });

      await test.step("Proceed to checkout from cart", async () => {
        await pages.main.openCart();
        await pages.cart.proceedToCheckout();
        await pages.order.waitForLoaderToDisappear();
      });

      await test.step("Complete order process (address, shipping, payment)", async () => {
        const shippingInfo = TestDataGenerator.getShippingAddress();
        await pages.order.completeOrderProcess(shippingInfo);
      });

      await test.step("Verify order confirmation message", async () => {
        const confirmationText = await pages.order.getOrderConfText();

        await expect(confirmationText).toContainText(successMsgText, {
          ignoreCase: true,
        });
      });

      await test.step("Verify ordered item title on confirmation page", async () => {
        const confirmedItemTitle = await pages.order.getOrderItemTitle();
        await expect(confirmedItemTitle).toContainText(
          assuredTitleOfOrderedItem,
          { ignoreCase: true }
        );
      });
    }
  );
});
