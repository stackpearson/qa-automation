import proshopCategoryPage from '../../src/pageobjects/productScreens/proshopCategory.page';
import proshopProductPage from '../../src/pageobjects/productScreens/proshopProduct.page';
import bottomButtonsPage from '../../src/pageobjects/sharedScreens/bottomButtons.page';
import paymentSelectionPage from '../../src/pageobjects/paymentScreens/paymentSelection.page';
import cashPaymentPage from '../../src/pageobjects/paymentScreens/cashPayment.page';
import receiptPage from '../../src/pageobjects/checkout/receipt.page';
import navDrawer from '../../src/pageobjects/sharedScreens/navdrawer.page';
import navBar from '../../src/pageobjects/sharedScreens/navBar.page';
import {expect as wdioExpect } from '@wdio/globals';

describe('Quick Order Payments -', () => {

    const category = 'Shirts - SO';
    const productName = 'Nike Shirt';

      //todo: automate all payment scenarios

    // it('Credit', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickProshopButton();
    //     await proshopCategoryPage.selectCategory(category);
    //     await proshopProductPage.addToCart(productName);
    //     await bottomButtonsPage.tapPayButton();
    // });

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
