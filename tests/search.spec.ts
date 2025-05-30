import test, { expect } from "@playwright/test";
import { guest } from "fixtures/fixtures";

test.describe("Search Functionality", () => {
  guest(
    "MyStore-001: Found items on search results page should contain the search word",
    async ({ pages }) => {
      const searchRequest = "Mug";

      // Step 1: Perform search
      await pages.main.searchForProduct(searchRequest);
      // Step 2: Get all item titles/description from the search results page
      const allItems = await pages.category.getAllItemTitleLocators();
      //Step 3: Verify each item
      for (const item of allItems) {
        await expect(item).toContainText(searchRequest, { ignoreCase: true });
      }
    }
  );

  guest(
    "MyStore-002: Proposed items in search dropdown should match the request",
    async ({ pages }) => {
      const searchRequest = "frame";
      // Step 1: Fill in search field to trigger suggestions
      await pages.main.fillInSearch(searchRequest);
      // Step 2: Get all search suggestion locators
      const searchProposals = await pages.main.getSearchSuggestionLocators();
      // Step 3: Verify each suggestion
      for (const item of searchProposals) {
        await expect(item).toContainText(searchRequest, { ignoreCase: true });
      }
    }
  );
});
