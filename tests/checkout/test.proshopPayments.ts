import bottomButtonsPage from '../../src/pageobjects/sharedScreens/bottomButtons.page';
import cashPaymentPage from '../../src/pageobjects/paymentScreens/proShop/cashPayment.page';
import checkPaymentPage from '../../src/pageobjects/paymentScreens/proShop/checkPayment.page';
import creditPaymentPage from '../../src/pageobjects/paymentScreens/proShop/creditPayment.page';
import giftCardPaymentPage from '../../src/pageobjects/paymentScreens/proShop/giftCardPayment.page';
import memberPayment from '../../src/pageobjects/paymentScreens/proShop/memberPayment.page';
import navBar from '../../src/pageobjects/sharedScreens/navBar.page';
import navDrawer from '../../src/pageobjects/sharedScreens/navdrawer.page';
import paymentSelectionPage from '../../src/pageobjects/paymentScreens/paymentSelection.page';
import proShopCartPage from '../../src/pageobjects/checkout/proShop/proShopCart.page';
import proshopCategoryPage from '../../src/pageobjects/productScreens/proShop/proshopCategory.page';
import proshopProductPage from '../../src/pageobjects/productScreens/proShop/proshopProduct.page';
import rainCheck from '../../src/pageobjects/paymentScreens/proShop/rainPayment.page';
import receiptPage from '../../src/pageobjects/checkout/proShop/receipt.page';
import {expect as wdioExpect } from '@wdio/globals';

describe('Proshop Payments', () => {

    const category = 'Shirts - SO';
    const memberEmail = 'sawyer.pearson+saved.card@tenfore.golf';
    const productName = 'Nike Shirt';
    const fullGiftCardUPC = '1024225254';
    const randomCheckNumber = Math.floor(100 + Math.random() * 900).toString();
    const rainOnlyUser = 'sawyer.pearson+full.rain@tenfore.golf';
    const partialRainUser = 'sawyer.pearson+partial.rain@tenfore.golf';
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    it('Credit', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('credit');
        await bottomButtonsPage.tapPayButton('applyPayment');
        await creditPaymentPage.waitForCardReader();
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop')
    });

    it('Cash', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('cash');
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop')

    });

// todo find a way to interact with the GC drop down, the modal is not accessible via wdio/appium and doesn't show in the inspector
    it('Gift Card', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('giftcard');
        await giftCardPaymentPage.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPaymentPage.tapGiftCardResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop')
    });

// todo improve rain check methods, same issue as GCs
    it('Rain Check', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('raincheck');
        await rainCheck.searcRainChecks(rainOnlyUser);
        await sleep(2500);
        await rainCheck.selectFirstRainResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop')
    });

    it('Check', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('check');
        await checkPaymentPage.addCheckNumber(randomCheckNumber);
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop')
    });

// //todo find a way to interact with the member drop down
    it('Member', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('customercharge');
        await memberPayment.searcMembers(memberEmail);
        await sleep(2500);
        await memberPayment.selectFirstMemberResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop')
    });

// split payments

    it('Split Payment | Cash + Credit', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('cash');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(2);
        await cashPaymentPage.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('applyPayment');
        await paymentSelectionPage.selectPaymentType('credit');
        await bottomButtonsPage.tapPayButton('applyPayment');
        await creditPaymentPage.waitForCardReader();
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');


    });

    it('Split Payment | Cash + Gift Card', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('cash');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(2);
        await cashPaymentPage.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('applyPayment');
        await paymentSelectionPage.selectPaymentType('giftcard');
        await giftCardPaymentPage.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPaymentPage.tapGiftCardResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

    it('Split Payment | Cash + Rain', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('cash');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(6);
        await cashPaymentPage.enterCashAmount(splitOrderAmounts.newAmount2);
        await bottomButtonsPage.tapPayButton('applyPayment');
        await paymentSelectionPage.selectPaymentType('raincheck');
        await rainCheck.searcRainChecks(rainOnlyUser);
        await sleep(2500);
        await rainCheck.selectFirstRainResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

    it('Split Payment | Cash + Check', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('cash');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(2);
        await cashPaymentPage.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('applyPayment');
        await paymentSelectionPage.selectPaymentType('check');
        await checkPaymentPage.addCheckNumber(randomCheckNumber);
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

    it('Split Payment | Cash + Member', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('cash');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(2);
        await cashPaymentPage.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('applyPayment');
        await paymentSelectionPage.selectPaymentType('customercharge');
        await memberPayment.searcMembers(memberEmail);
        await sleep(2500);
        await memberPayment.selectFirstMemberResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

    it('Split Payment | Credit + Gift Card', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(6);
        await paymentSelectionPage.selectPaymentType('credit');
        await creditPaymentPage.enterChargeAmount(splitOrderAmounts.newAmount2);
        await bottomButtonsPage.tapPayButton('applyPayment');
        await creditPaymentPage.waitForCardReader();
        //have to toggle to another payment method to dismiss success message
        await paymentSelectionPage.selectPaymentType('cash');
        await paymentSelectionPage.selectPaymentType('giftcard');
        await giftCardPaymentPage.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPaymentPage.tapGiftCardResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

    it('Split Payment | Credit + Rain', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(6);
        await paymentSelectionPage.selectPaymentType('credit');
        await creditPaymentPage.enterChargeAmount(splitOrderAmounts.newAmount2);
        await bottomButtonsPage.tapPayButton('applyPayment');
        await creditPaymentPage.waitForCardReader();
        //have to toggle to another payment method to dismiss success message
        await paymentSelectionPage.selectPaymentType('cash');
        await paymentSelectionPage.selectPaymentType('raincheck');
        await rainCheck.searcRainChecks(rainOnlyUser);
        await sleep(2500);
        await rainCheck.selectFirstRainResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

    it('Split Payment | Credit + Check', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(6);
        await paymentSelectionPage.selectPaymentType('credit');
        await creditPaymentPage.enterChargeAmount(splitOrderAmounts.newAmount2);
        await bottomButtonsPage.tapPayButton('applyPayment');
        await creditPaymentPage.waitForCardReader();
        //have to toggle to another payment method to dismiss success message
        await paymentSelectionPage.selectPaymentType('cash');
        await paymentSelectionPage.selectPaymentType('check');
        await checkPaymentPage.addCheckNumber(randomCheckNumber);
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

    it('Split Payment | Credit + Member', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(6);
        await paymentSelectionPage.selectPaymentType('credit');
        await creditPaymentPage.enterChargeAmount(splitOrderAmounts.newAmount2);
        await bottomButtonsPage.tapPayButton('applyPayment');
        await creditPaymentPage.waitForCardReader();
        //have to toggle to another payment method to dismiss success message
        await paymentSelectionPage.selectPaymentType('cash');
        await paymentSelectionPage.selectPaymentType('customercharge');
        await memberPayment.searcMembers(memberEmail);
        await sleep(2500);
        await memberPayment.selectFirstMemberResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

    it('Split Payment | Gift Card + Rain', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('raincheck');
        await rainCheck.searcRainChecks(partialRainUser);
        await sleep(2500);
        await rainCheck.selectFirstRainResult();
        await bottomButtonsPage.tapPayButton('applyPayment');

        await paymentSelectionPage.selectPaymentType('cash');
        await paymentSelectionPage.selectPaymentType('giftcard');
        await giftCardPaymentPage.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPaymentPage.tapGiftCardResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

    it('Split Payment | Gift Card + Check', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(6);
        await paymentSelectionPage.selectPaymentType('check');
        await checkPaymentPage.enterCheckAmount(splitOrderAmounts.newAmount1);
        await checkPaymentPage.addCheckNumber(randomCheckNumber);
        await bottomButtonsPage.tapPayButton('applyPayment');

        await paymentSelectionPage.selectPaymentType('cash');
        await paymentSelectionPage.selectPaymentType('giftcard');
        await giftCardPaymentPage.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPaymentPage.tapGiftCardResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

    it('Split Payment | Gift Card + Member', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(6);
        await paymentSelectionPage.selectPaymentType('customercharge');
        await memberPayment.searcMembers(memberEmail);
        await sleep(1500);
        await memberPayment.selectFirstMemberResult();
        await memberPayment.enterMemberChargeAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('applyPayment');

        await paymentSelectionPage.selectPaymentType('cash');
        await paymentSelectionPage.selectPaymentType('giftcard');
        await giftCardPaymentPage.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPaymentPage.tapGiftCardResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

    it('Split Payment | Rain + Check', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        await paymentSelectionPage.selectPaymentType('check');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(2);
        await checkPaymentPage.enterCheckAmount(splitOrderAmounts.newAmount2);
        await checkPaymentPage.addCheckNumber(randomCheckNumber);
        await bottomButtonsPage.tapPayButton('applyPayment');

        await paymentSelectionPage.selectPaymentType('raincheck');
        await rainCheck.searcRainChecks(rainOnlyUser);
        await sleep(2500);
        await rainCheck.selectFirstRainResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

    it('Split Payment | Rain + Member', async () => {
        await navBar.openNav();
        await navDrawer.clickProshopButton();
        await proshopCategoryPage.selectCategory(category);
        await proshopProductPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('proshop');
        const splitOrderAmounts = await proShopCartPage.splitOrderAmount(6);
        await paymentSelectionPage.selectPaymentType('customercharge');
        await memberPayment.searcMembers(memberEmail);
        await sleep(1500);
        await memberPayment.selectFirstMemberResult();
        await memberPayment.enterMemberChargeAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('applyPayment');

        await paymentSelectionPage.selectPaymentType('raincheck');
        await rainCheck.searcRainChecks(rainOnlyUser);
        await sleep(2500);
        await rainCheck.selectFirstRainResult();
        await bottomButtonsPage.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('proshop');
    });

})
