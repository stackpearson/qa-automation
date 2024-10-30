import bottomButtonsPage from '../../src/pageobjects/sharedScreens/bottomButtons.page';
import cashPaymentPage from '../../src/pageobjects/paymentScreens/cashPayment.page';
import checkPaymentPage from '../../src/pageobjects/paymentScreens/checkPayment.page';
import creditPaymentPage from '../../src/pageobjects/paymentScreens/creditPayment.page';
import giftCardPaymentPage from '../../src/pageobjects/paymentScreens/giftCardPayment.page';
import memberPayment from '../../src/pageobjects/paymentScreens/memberPayment.page';
import navBar from '../../src/pageobjects/sharedScreens/navBar.page';
import navDrawer from '../../src/pageobjects/sharedScreens/navdrawer.page';
import paymentSelectionPage from '../../src/pageobjects/paymentScreens/paymentSelection.page';
import proShopCartPage from '../../src/pageobjects/checkout/proShopCart.page';
import proshopCategoryPage from '../../src/pageobjects/productScreens/proshopCategory.page';
import proshopProductPage from '../../src/pageobjects/productScreens/proshopProduct.page';
import rainCheck from '../../src/pageobjects/paymentScreens/rainPayment.page';
import receiptPage from '../../src/pageobjects/checkout/receipt.page';
import {expect as wdioExpect } from '@wdio/globals';

describe('Quick Order Payments -', () => {

  const category = 'Domestic Beer';
  const memberEmail = 'sawyer.pearson+saved.card@tenfore.golf';
  const productName = 'PBR';
  const fullGiftCardUPC = '1024225254';
  const randomCheckNumber = Math.floor(100 + Math.random() * 900).toString();
  const rainOnlyUser = 'sawyer.pearson+full.rain@tenfore.golf';
  const partialRainUser = 'sawyer.pearson+partial.rain@tenfore.golf';
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    it('Credit', async () => {
        await navBar.openNav();
        await navDrawer.clickQuickOrderButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('quickorder');
        await paymentSelectionPage.selectPaymentType('credit');
        await bottomButtonsPage.tapPayButton('applyPayment');
        await creditPaymentPage.waitForCardReader();
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.clickQuickOrder();
    });

    // it('Cash', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

    // it('Gift Card', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

    // it('Check', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

    // it('Member', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

    // //split payments

    // it('Split Payment | Cash + Credit', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Cash + Gift Card', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Cash + Check', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Cash + Member', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

    // ////

    // it('Split Payment | Credit + Gift Card', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Credit + Check', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Credit + Member', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

    // ////

    // it('Split Payment | Gift Card + Check', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

    // it('Split Payment | Gift Card + Member', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

})
