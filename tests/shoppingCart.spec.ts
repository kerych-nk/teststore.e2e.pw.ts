import { test, expect } from "@playwright/test";
import { guest } from "fixtures/fixtures";

test.describe("Shopping Cart Functionality", () => {
  guest(
    "MyStore007: Verify and increase item quantity in cart",
    async ({ pages }) => {
      let itemToOpenIndex = 1;

      await test.step("Add one item to cart", async () => {
        await pages.category.openItem(0);
        await pages.product.addProductToCart();
        await pages.product.closeAddedToCartModal();
        await pages.main.openCart();
        await pages.cart.waitForLoaderToDisappear();
      });

      await test.step("Verify initial item quantity", async () => {
        const amountOfAddedItem = await pages.cart.getItemQuantity();
        expect(amountOfAddedItem).toBe(`${itemToOpenIndex}`);
      });

      await test.step("Increase item quantity in cart", async () => {
        await pages.cart.updateItemQuantity("+");
        await expect(async () => {
          const newAmount = await pages.cart.getItemQuantity();
          expect(newAmount).toBe(`${itemToOpenIndex + 1}`);
        }).toPass({ timeout: 10000 });
      });

      await test.step("Verify quantity was increased to 2", async () => {
        const increaseAmountOfAddedItem = await pages.cart.getItemQuantity();
        itemToOpenIndex += 1;
        expect(increaseAmountOfAddedItem).toBe(`${itemToOpenIndex}`);
      });
    }
  );
  guest("MyStore008: Decrease item quantity", async ({ pages }) => {
    let amountOfItem = 1;

    await test.step("Increase quantity on Product Page before adding to cart", async () => {
      await pages.category.openItem(0);
      await pages.product.changeProductQuantity("+");
      amountOfItem += 1;
    });

    await test.step("Add item with increased quantity to cart", async () => {
      await pages.product.addProductToCart();
      await pages.product.closeAddedToCartModal();
      await pages.main.openCart();
    });

    await test.step("Verify quantity in cart is 2", async () => {
      const amountOfAddedItem = await pages.cart.getItemQuantity();
      expect(amountOfAddedItem).toBe(`${amountOfItem}`);
    });

    await test.step("Decrease item quantity in cart", async () => {
      await pages.cart.updateItemQuantity("-");
      amountOfItem -= 1;
      await expect(async () => {
        const newAmount = await pages.cart.getItemQuantity();
        expect(newAmount).toBe(`${amountOfItem}`);
      }).toPass({ timeout: 10000 });
    });

    await test.step("Verify quantity was decreased to 1", async () => {
      const amountOfAddedItem = await pages.cart.getItemQuantity();
      expect(amountOfAddedItem).toBe(`${amountOfItem}`);
    });
  });
  guest(
    "MyStore009: Verify deleting all added items from cart",
    async ({ pages }) => {
      let expectedAmountItemsInCart = 0;

      await test.step("Add first item", async () => {
        await pages.category.openItem(0);
        await pages.product.addProductToCart();
        await pages.product.closeAddedToCartModal();
        expectedAmountItemsInCart += 1;
      });

      await test.step("Add a second, different item", async () => {
        await pages.category.navigateTo();
        await pages.category.openItem(3);
        await pages.product.addProductToCart();
        await pages.product.closeAddedToCartModal();
        expectedAmountItemsInCart += 1;
      });

      await test.step("Verify there are 2 items in cart", async () => {
        await pages.main.openCart();
        await pages.cart.waitForItemsToAppear(expectedAmountItemsInCart);
        const itemsInCart = await pages.cart.getAllCartItems();
        expect(itemsInCart.length).toBe(expectedAmountItemsInCart);
      });

      await test.step("Remove first item", async () => {
        await pages.cart.removeItemFromCart(0);
        await pages.cart.waitForLoaderToDisappear();
        const currentItemCount = await pages.cart.getAllCartItems();
        expect(currentItemCount.length).toBe(expectedAmountItemsInCart - 1);
      });

      await test.step("Remove second item", async () => {
        await pages.cart.removeItemFromCart(0);
        await pages.cart.waitForLoaderToDisappear();
      });

      await test.step("Verify the cart is empty", async () => {
        await pages.cart.verifyCartIsEmpty();
      });
    }
  );
  guest(
    "MyStore010: Header cart counter updates when adding items",
    async ({ pages }) => {
      const cartCounterLocator = pages.main.getCartCounter();
      let expectedCartCounterValue = 1;

      await test.step("Add first item and verify counter shows (1)", async () => {
        await pages.category.navigateTo();
        await pages.category.openItem(0);
        await pages.product.addProductToCart();
        await pages.product.closeAddedToCartModal();

        await expect(cartCounterLocator).toBeVisible();
        expect(await cartCounterLocator.innerText()).toContain(
          `${expectedCartCounterValue}`
        );
      });

      await test.step("Add the same product again and verify counter updates to (2)", async () => {
        await pages.product.addProductToCart();
        await pages.product.closeAddedToCartModal();
        expectedCartCounterValue += 1;

        expect(await cartCounterLocator.innerText()).toContain(
          `${expectedCartCounterValue}`
        );
      });
    }
  );
});
