import { AllPages } from "@app/ui/pages/AllPages";
import test from "@playwright/test";
import { getNewUserStorageStateViaAPI } from "@utils/helpers/apiAuthHelpers";

type TestFixtures = {
  pages: AllPages;
};

export const guest = test.extend<TestFixtures>({
  pages: async ({ page }, use) => {
    const pages = new AllPages(page);

    await pages.main.navigateTo();
    await page.waitForLoadState();

    await use(pages);
  },
});

export const loginUser = test.extend<TestFixtures>({
  pages: async ({ browser }, use) => {
    const savedStorageState = await getNewUserStorageStateViaAPI();

    const context = await browser.newContext({
      storageState: savedStorageState,
    });
    const page = await context.newPage();
    const pages = new AllPages(page);

    await pages.main.navigateTo();
    await page.waitForLoadState();

    await use(pages);
  },
});
