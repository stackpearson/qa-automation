import proshopCategoryPage from '../src/pageobjects/productScreens/proshopCategory.page';
import proshopProductPage from '../src/pageobjects/productScreens/proshopProduct.page';
import proshopSideCartPage from '../src/pageobjects/productScreens/proshopSideCart.page';
import bottomButtonsPage from '../src/pageobjects/sharedScreens/bottomButtons.page';
import proshopCart from '../src/pageobjects/checkout/proShopCart.page';
import { expect as wdioExpect } from '@wdio/globals';

describe('Core functionality', () => {

    it('should be able to navigate to cateogries & add prodcuts to cart & delete products from cart', async () => {
        const category = 'Domestic Beer';
        const productName = 'Michelob Ultra';

        //view products in a category
        await proshopCategoryPage.selectCategory(category);
        await wdioExpect (await proshopProductPage.productTileByName(productName)).toBeDisplayed();

        //add item to cart & confirm it's presence in the side cart
        await proshopProductPage.addToCart(productName);
        await wdioExpect (await proshopSideCartPage.productByName(productName)).toBeDisplayed();

        //navigate to cart and confirm presence there as well
        await bottomButtonsPage.tapPayButton();
        await wdioExpect (await proshopCart.productByName(productName)).toBeDisplayed();

        //remove item from cart & verify cart is empty        
        await proshopSideCartPage.modifyCartItem(productName, 'Delete');
        await bottomButtonsPage.tapProShopButton();
        await wdioExpect(proshopSideCartPage.emptyCartDialog()).toBeDisplayed();
    });
})

