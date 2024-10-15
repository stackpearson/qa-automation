import proshopCategoryPage from '../src/pageobjects/proshopCategory.page';
import proshopProductPage from '../src/pageobjects/proshopProduct.page';
import proshopSideCartPage from '../src/pageobjects/proshopSideCart.page';
import bottomButtonsPage from '../src/pageobjects/bottomButtons.page';
import proshopCart from '../src/pageobjects/proShopCart.page';

describe('Core functionality', () => {

    it('should be able to navigate to cateogries & add prodcuts to cart & delete products from cart', async () => {
        const category = 'Domestic Beer';
        const productName = 'Michelob Light';

        //view products in a category
        await proshopCategoryPage.selectCategory(category);
        const item = await proshopProductPage.productTileByName(productName)
        const productShows = await item.waitForDisplayed();
        expect(productShows).toBe(true);

        //add item to cart & confirm it's presence in the side cart
        await proshopProductPage.addToCart('Michelob Light');
        const expectedInSideCart = await proshopSideCartPage.productByName(productName);
        const showsInSideCart = await expectedInSideCart.waitForDisplayed();
        expect(showsInSideCart).toBe(true);

        //navigate to cart and confirm presence there as well
        await bottomButtonsPage.tapPayButton();
        const expectedInCart = await proshopCart.productByName(productName);
        const showsInCart = await expectedInCart.waitForDisplayed();
        expect(showsInCart).toBe(true);

        //remove item from cart & verify cart is empty        
        await proshopSideCartPage.modifyCartItem(productName, 'Delete');
        await bottomButtonsPage.tapProShopButton();
        const emptyExpected = await proshopSideCartPage.emptyCartDialog().waitForDisplayed()
        expect(emptyExpected).toBe(true);
    });
})

