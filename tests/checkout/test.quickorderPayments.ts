import bottomButtonsPage from '../../src/pageobjects/sharedScreens/bottomButtons.page';
import cashPaymentPage from '../../src/pageobjects/paymentScreens/quickOrder/cashPayment_qo.page';
import checkPaymentQO from '../../src/pageobjects/paymentScreens/quickOrder/checkPayment_qo.page';
import creditPaymentPage from '../../src/pageobjects/paymentScreens/quickOrder/creditPayment_qo.page';
import giftCardPaymentQO from '../../src/pageobjects/paymentScreens/quickOrder/giftCardPayment_qo.page';
import memberPayment from '../../src/pageobjects/paymentScreens/quickOrder/memberPayment_qo.page';
import navBar from '../../src/pageobjects/sharedScreens/navBar.page';
import navDrawer from '../../src/pageobjects/sharedScreens/navdrawer.page';
import paymentSelectionPage from '../../src/pageobjects/paymentScreens/paymentSelection.page';
import cartPage from '../../src/pageobjects/checkout/quickOrder/quickOrderCart.page';
import categoryPage from '../../src/pageobjects/productScreens/quickOrder/quickOrderCategory.page';
import productPage from '../../src/pageobjects/productScreens/quickOrder/quickOrderProduct.page';
import receiptPage from '../../src/pageobjects/checkout/quickOrder/quickOrderReceipt.page';
import {expect as wdioExpect } from '@wdio/globals';

describe('Quick Order Payments -', () => {

  const category = 'Domestic Beer';
  const memberEmail = 'sawyer.pearson+saved.card@tenfore.golf';
  const productName = 'PBR';
  const fullGiftCardUPC = '1024225254';
  const randomCheckNumber = Math.floor(100 + Math.random() * 900).toString();
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    it('Credit', async () => {
        await navBar.openNav();
        await navDrawer.clickQuickOrderButton();
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('quickorder');
        await paymentSelectionPage.selectPaymentType('credit');
        await bottomButtonsPage.tapPayButton('applyPayment');
        await creditPaymentPage.waitForCardReader();
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('quickorder');
    });

    it('Cash', async () => {
        await navBar.openNav();
        await navDrawer.clickQuickOrderButton();
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('quickorder');
        await paymentSelectionPage.selectPaymentType('cash');
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('quickorder');
    });

    it('Gift Card', async () => {
      await navBar.openNav();
      await navDrawer.clickQuickOrderButton();
      await categoryPage.selectCategory(category);
      await productPage.addToCart(productName);
      await bottomButtonsPage.tapPayButton('quickorder');
      await paymentSelectionPage.selectPaymentType('giftcard');
      await giftCardPaymentQO.searchGiftCard(fullGiftCardUPC);
      await sleep(2500);
      await giftCardPaymentQO.tapGiftCardResult();
      await bottomButtonsPage.tapPayButton('applyPayment');
      await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
      await receiptPage.tapReceiptButton('quickorder');
    });

    it('Check', async () => {
      await navBar.openNav();
      await navDrawer.clickQuickOrderButton();
      await categoryPage.selectCategory(category);
      await productPage.addToCart(productName);
      await bottomButtonsPage.tapPayButton('quickorder');
      await paymentSelectionPage.selectPaymentType('check');
      await checkPaymentQO.addCheckNumber(randomCheckNumber);
      await bottomButtonsPage.tapPayButton('applyPayment');
      await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
      await receiptPage.tapReceiptButton('quickorder');
    });

    it('Member', async () => {
        await navBar.openNav();
        await navDrawer.clickQuickOrderButton();
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('quickorder');
        await paymentSelectionPage.selectPaymentType('customercharge');
        await memberPayment.searcMembers(memberEmail);
        await sleep(2500);
        await memberPayment.selectFirstMemberResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('quickorder')
    });

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
