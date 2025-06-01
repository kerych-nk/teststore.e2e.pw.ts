import test, { expect } from "@playwright/test";
import { guest } from "fixtures/fixtures";

test.describe("Product Page Navigation and Title Verification", () => {
  guest(
    "MyStore-004: Product title on category page matches titles on product detail page",
    async ({ pages }) => {
      const productTitle = await pages.category.getItemTitle();

      await pages.category.openItem();

      await expect(await pages.product.getBreadcrumbsLocator()).toContainText(
        productTitle,
        { ignoreCase: true }
      );
      await expect(await pages.product.getProductPageTitle()).toContainText(
        productTitle,
        { ignoreCase: true }
      );
    }
  );
});
