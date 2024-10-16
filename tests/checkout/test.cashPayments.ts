import proshopCategoryPage from '../../src/pageobjects/productScreens/proshopCategory.page';
import proshopProductPage from '../../src/pageobjects/productScreens/proshopProduct.page';
import bottomButtonsPage from '../../src/pageobjects/sharedScreens/bottomButtons.page';
import paymentSelectionPage from '../../src/pageobjects/paymentScreens/paymentSelection.page';
import cashPaymentPage from '../../src/pageobjects/paymentScreens/cashPayment.page';
import receiptPage from '../../src/pageobjects/checkout/receipt.page';
import {expect as wdioExpect } from '@wdio/globals';

describe('Checkout with cash', () => {

    it('should be able to complete an order with cash in the proshop via fast pay', async () => {
        const category = 'Shirts - SO';
        const productName = 'Nike Shirt';

        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton();
        await paymentSelectionPage.selectPaymentType('cash');
        await cashPaymentPage.selectFastPayOption(1);
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.clickProShop();

    });

    it('should be able to complete an order with cash in the proshop via apply cash', async () => {
        const category = 'Shirts - SO';
        const productName = 'Nike Shirt';

        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton();
        await paymentSelectionPage.selectPaymentType('cash');
        await bottomButtonsPage.tapPayButton();
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.clickProShop();

    });
})

