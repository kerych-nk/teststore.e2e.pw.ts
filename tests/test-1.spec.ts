import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://teststore.automationtesting.co.uk/index.php");
  await page.getByRole("textbox", { name: "Search" }).click();
  await page.getByRole("textbox", { name: "Search" }).fill("humm");
  await page.getByRole("textbox", { name: "Search" }).press("Enter");
  await page
    .getByRole("article")
    .filter({
      hasText:
        " Quick view Hummingbird printed t-shirt $23.90 -20% $19.12 -20% favorite_border",
    })
    .getByLabel("Black")
    .click();
  await page.getByRole("button", { name: " Add to cart" }).click();
  await page.getByRole("button", { name: "Continue shopping" }).click();
  await page.getByLabel("Size").selectOption("2");
  await page.goto(
    "https://teststore.automationtesting.co.uk/index.php?id_product=1&id_product_attribute=4&rewrite=hummingbird-printed-t-shirt&controller=product#/2-size-m/11-color-black"
  );
  await page.getByRole("button", { name: " Add to cart" }).click();
  await page.getByRole("link", { name: " Proceed to checkout" }).click();
  await page
    .getByRole("link", { name: "chevron_left Continue shopping" })
    .click();
  await page
    .locator("#content section")
    .filter({ hasText: "Popular Products  Quick view" })
    .getByLabel("Black")
    .click();
  await page.getByLabel("Size").selectOption("3");
  await page.goto(
    "https://teststore.automationtesting.co.uk/index.php?id_product=1&id_product_attribute=6&rewrite=hummingbird-printed-t-shirt&controller=product#/3-size-l/11-color-black"
  );
  await page.getByRole("button", { name: " Add to cart" }).click();
  await page.getByRole("button", { name: "Continue shopping" }).click();
  await page.getByLabel("Size").selectOption("4");
  await page.goto(
    "https://teststore.automationtesting.co.uk/index.php?id_product=1&id_product_attribute=8&rewrite=hummingbird-printed-t-shirt&controller=product#/4-size-xl/11-color-black"
  );
  await page.getByRole("button", { name: " Add to cart" }).click();
  await page.getByRole("link", { name: " Proceed to checkout" }).click();
  await page.getByRole("link", { name: "delete" }).nth(1).click();
  await page.getByRole("link", { name: "delete" }).nth(2).click();
  await page.getByRole("link", { name: "Proceed to checkout" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
});
