import createTabPage from '../../src/pageobjects/tabs/createTab.page';
import navDrawer from '../../src/pageobjects/sharedScreens/navdrawer.page';
import navBar from '../../src/pageobjects/sharedScreens/navBar.page';
import tabPage from '../../src/pageobjects/tabs/tabs.page';
import {expect as wdioExpect } from '@wdio/globals';

describe('Tab Payments -', () => {

    const category = 'Shirts - SO';
    const productName = 'Nike Shirt';
    const tabUser = 'sawyer.pearson+saved.card@tenfore.golf'

    it('Credit', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(tabUser, false);

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