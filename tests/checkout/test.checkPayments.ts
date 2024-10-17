import proshopCategoryPage from '../../src/pageobjects/productScreens/proshopCategory.page';
import proshopProductPage from '../../src/pageobjects/productScreens/proshopProduct.page';
import bottomButtonsPage from '../../src/pageobjects/sharedScreens/bottomButtons.page';
import paymentSelectionPage from '../../src/pageobjects/paymentScreens/paymentSelection.page';
import checkPaymentPage from '../../src/pageobjects/paymentScreens/checkPayment.page';
import receiptPage from '../../src/pageobjects/checkout/receipt.page';
import navBarPage from '../../src/pageobjects/sharedScreens/navBar.page'
import navDrawerPage from '../../src/pageobjects/sharedScreens/navdrawer.page';
import proshopSideCartPage from '../../src/pageobjects/productScreens/proshopSideCart.page';
import {expect as wdioExpect } from '@wdio/globals';

describe('Proshop - Checkout with check', () => {

    it('should be able to complete an order with a check', async () => {
        const category = 'Shirts - SO';
        const productName = 'Nike Shirt';

        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton();
        await paymentSelectionPage.selectPaymentType('check');
        //enter random 3 digit check #
        await checkPaymentPage.addCheckNumber(Math.floor(100 + Math.random() * 900).toString());
        await bottomButtonsPage.tapPayButton();
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.clickProShop();
    });

    it('should show an error message if no check number is supplied', async () => {
        const category = 'Shirts - SO';
        const productName = 'Nike Shirt';

        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton();
        await paymentSelectionPage.selectPaymentType('check');
        await bottomButtonsPage.tapPayButton();
        await expect(checkPaymentPage.errorDialog().getText()).resolves.toBe('You must provide a check number!');
        await checkPaymentPage.dismissError();
        await proshopSideCartPage.modifyCartItem(productName, 'Delete');
        await bottomButtonsPage.tapProShopButton();
    });

    it('should be able to split payment between check and cash', async () => {
        const category = 'Shirts - SO';
        const productName = 'Nike Shirt';

        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton();
        await paymentSelectionPage.selectPaymentType('check');
        //split the order total
        const { newAmount1, newAmount2 } = await checkPaymentPage.splitCheckAmount(2)
        await checkPaymentPage.checkAmountField.setValue(newAmount1);
        await checkPaymentPage.addCheckNumber(Math.floor(100 + Math.random() * 900).toString());
        await paymentSelectionPage.selectPaymentType('cash');
        await bottomButtonsPage.tapPayButton();
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.clickProShop();
    });
})