import proshopCategoryPage from '../../src/pageobjects/productScreens/proshopCategory.page';
import proshopProductPage from '../../src/pageobjects/productScreens/proshopProduct.page';
import bottomButtonsPage from '../../src/pageobjects/sharedScreens/bottomButtons.page';
import paymentSelectionPage from '../../src/pageobjects/paymentScreens/paymentSelection.page';
import cashPaymentPage from '../../src/pageobjects/paymentScreens/cashPayment.page';
import receiptPage from '../../src/pageobjects/checkout/receipt.page';
import navBar from '../../src/pageobjects/sharedScreens/navBar.page';
import navDrawer from '../../src/pageobjects/sharedScreens/navdrawer.page';
import giftCardPaymentPage from '../../src/pageobjects/paymentScreens/giftCardPayment.page';
import checkPaymentPage from '../../src/pageobjects/paymentScreens/checkPayment.page';
import {expect as wdioExpect } from '@wdio/globals';

describe('Proshop Payments -', () => {

    const category = 'Shirts - SO';
    const productName = 'Nike Shirt';
    const fullGiftCardUPC = '1024225254';

    // it('Credit', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    //     await paymentSelectionPage.selectPaymentType('credit');
    //     await bottomButtonsPage.tapPayButton();
    //     await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
    //     await receiptPage.clickProShop();
    // });

    // it('Cash', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    //     await paymentSelectionPage.selectPaymentType('cash');
    //     await bottomButtonsPage.tapPayButton();
    //     await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
    //     await receiptPage.clickProShop();

    // });

    //todo start with GC & continue moving down the list of cases

    it('Gift Card', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton();
        await paymentSelectionPage.selectPaymentType('giftcard');
        await giftCardPaymentPage.selectGiftCard(fullGiftCardUPC);

    });

    // it('Rain', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // it('Check', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // it('Member', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // //split payments

    // it('Split Payment | Cash + Credit', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Cash + Gift Card', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Cash + Rain', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Cash + Check', async () => {
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    //     await paymentSelectionPage.selectPaymentType('check');
    //     //split the order total
    //     const { newAmount1, newAmount2 } = await checkPaymentPage.splitCheckAmount(2)
    //     await checkPaymentPage.checkAmountField.setValue(newAmount1);
    //     await checkPaymentPage.addCheckNumber(Math.floor(100 + Math.random() * 900).toString());
    //     await paymentSelectionPage.selectPaymentType('cash');
    //     await bottomButtonsPage.tapPayButton();
    //     await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
    //     await receiptPage.clickProShop();
    // });

    // it('Split Payment | Cash + Member', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // ////

    // it('Split Payment | Credit + Gift Card', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Credit + Rain', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Credit + Check', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Credit + Member', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // ////

    // it('Split Payment | Gift Card + Rain', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Gift Card + Check', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Gift Card + Member', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // //

    // it('Split Payment | Gift Card + Rain', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Rain + Check', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Rain + Member', async () => {
        // await navBar.openNav();
        // await navDrawer.clickProshopButton();
        // await proshopCategoryPage.selectCategory(category);
        // await proshopProductPage.addToCart(productName);
        // await bottomButtonsPage.tapPayButton();
    // });

})
