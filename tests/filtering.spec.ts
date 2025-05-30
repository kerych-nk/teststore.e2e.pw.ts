import test, { expect } from "@playwright/test";
import { guest } from "fixtures/fixtures";

test.describe("Product Filtering Functionality", () => {
  guest(
    "MyStore-003: Verify 'Composition' filter item counts match displayed products",
    async ({ pages }) => {
      await pages.category.navigateTo();
      //await pages.category.waitForLoaderToDisappear();

      const filterLocators =
        await pages.category.getAllCompositionFilterLocators();
      expect(filterLocators.length).toBeGreaterThan(0);

      await pages.category.applyEachFilterAndVerifyCount(filterLocators);
    }
  );
});
