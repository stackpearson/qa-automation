import bottomButtons from '../../src/pageobjects/sharedScreens/bottomButtons.page';
import cashPayment from '../../src/pageobjects/paymentScreens/tab/cashPayment_tab.page';
import cartPage from '../../src/pageobjects/checkout/tab/tabCart.page';
import categoryPage from '../../src/pageobjects/productScreens/tab/tabCategory.page';
import checkPayment from '../../src/pageobjects/paymentScreens/tab/checkPayment_tab.page';
import createTabPage from '../../src/pageobjects/tabs/createTab.page';
import creditPayment from '../../src/pageobjects/paymentScreens/tab/creditPayment_tab.page';
import giftCardPayment from '../../src/pageobjects/paymentScreens/tab/giftCardPayment_tab.page';
import memberPayment from '../../src/pageobjects/paymentScreens/tab/memberPayment_tab.page';
import paymentSelection from '../../src/pageobjects/paymentScreens/paymentSelection.page';
import productPage from '../../src/pageobjects/productScreens/tab/tabProduct.page';
import navDrawer from '../../src/pageobjects/sharedScreens/navdrawer.page';
import navBar from '../../src/pageobjects/sharedScreens/navBar.page';
import receiptPage from '../../src/pageobjects/checkout/tab/tabReceipt.page';
import tabPage from '../../src/pageobjects/tabs/tabs.page';
import {expect as wdioExpect } from '@wdio/globals';

describe('Tab Payments -', () => {

    const category = 'Domestic Beer';
    const productName = 'Michelob Ultra';
    const customerDetails = {
        email: 'sawyer.pearson+saved.card@tenfore.golf',
        name: 'Sawyer Card'
    }
    const fullGiftCardUPC = '1024225254';
    const randomCheckNumber = Math.floor(100 + Math.random() * 900).toString();
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    it('Credit', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('credit');
        await bottomButtons.tapPayButton('applyPayment');
        await creditPayment.waitForCardReader();
        await wdioExpect(receiptPage.orderCompleteHeader().toBeDisplayed());
        await receiptPage.tapReceiptButton('tabs');
    });

    it('Cash', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('cash');
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader().toBeDisplayed());
        await receiptPage.tapReceiptButton('tabs');
    });

    it('Gift Card', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('giftcard');
        await giftCardPayment.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPayment.tapGiftCardResult();
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tabs');
    });

    it('Check', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('check');
        await checkPayment.addCheckNumber(randomCheckNumber);
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tabs');
    });

    it('Member', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('customercharge');
        await memberPayment.searcMembers(customerDetails.email);
        await sleep(2500);
        await memberPayment.selectFirstMemberResult();
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tabs')
    });

    //split payments

    it('Split Payment | Cash + Credit', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('cash');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await cashPayment.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtons.tapPayButton('applyPayment');

        await paymentSelection.selectPaymentType('credit');
        await bottomButtons.tapPayButton('applyPayment');
        await creditPayment.waitForCardReader();
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tabs');
    });

    it('Split Payment | Cash + Gift Card', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('cash');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await cashPayment.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtons.tapPayButton('applyPayment');

        await paymentSelection.selectPaymentType('giftcard');
        await giftCardPayment.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPayment.tapGiftCardResult();
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tabs');   
    });

    it('Split Payment | Cash + Check', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('cash');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await cashPayment.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtons.tapPayButton('applyPayment');

        await paymentSelection.selectPaymentType('check');
        await checkPayment.addCheckNumber(randomCheckNumber);
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tabs');
    });

    it('Split Payment | Cash + Member', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('cash');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await cashPayment.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtons.tapPayButton('applyPayment');

        await paymentSelection.selectPaymentType('customercharge');
        await memberPayment.searcMembers(customerDetails.email);
        await sleep(2500);
        await memberPayment.selectFirstMemberResult();
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tabs')
    });

    it('Split Payment | Credit + Gift Card', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category)
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('credit');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await creditPayment.enterChargeAmount(splitOrderAmounts.newAmount1)
        await bottomButtons.tapPayButton('applyPayment');
        await creditPayment.waitForCardReader();

        await paymentSelection.selectPaymentType('giftcard');
        await giftCardPayment.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPayment.tapGiftCardResult();
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tabs');
    });

    it('Split Payment | Credit + Check', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category)
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('credit');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await creditPayment.enterChargeAmount(splitOrderAmounts.newAmount1)
        await bottomButtons.tapPayButton('applyPayment');
        await creditPayment.waitForCardReader();

        await paymentSelection.selectPaymentType('check');
        await checkPayment.addCheckNumber(randomCheckNumber);
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tabs');
    });

    it('Split Payment | Credit + Member', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category)
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('credit');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await creditPayment.enterChargeAmount(splitOrderAmounts.newAmount1)
        await bottomButtons.tapPayButton('applyPayment');
        await creditPayment.waitForCardReader();
        
        await paymentSelection.selectPaymentType('customercharge');
        await memberPayment.searcMembers(customerDetails.email);
        await sleep(2500);
        await memberPayment.selectFirstMemberResult();
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tabs')
    });

    it('Split Payment | Gift Card + Check', async () => {
        await navBar.openNav();
        await navDrawer.clickTabButton();
        await tabPage.tapCreateTab();
        await createTabPage.startTab(customerDetails.email, true);
        await tabPage.enterIntoTab(customerDetails.name);
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('tab');
        await paymentSelection.selectPaymentType('check');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await checkPayment.addCheckNumber(randomCheckNumber);
        await checkPayment.enterCheckAmount(splitOrderAmounts.newAmount1);
        await bottomButtons.tapPayButton('applyPayment');

        await paymentSelection.selectPaymentType('giftcard');
        await giftCardPayment.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPayment.tapGiftCardResult();
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tabs');
    });

    //swapping from member pay to GC crashes the app - awaiting fix before uncommenting this test case
    // it('Split Payment | Gift Card + Member', async () => {
    //     await navBar.openNav();
    //     await navDrawer.clickTabButton();
    //     await tabPage.tapCreateTab();
    //     await createTabPage.startTab(customerDetails.email, true);
    //     await tabPage.enterIntoTab(customerDetails.name);
    //     await categoryPage.selectCategory(category)
    //     await productPage.addToCart(productName);
    //     await bottomButtons.tapPayButton('tab');
    //     await paymentSelection.selectPaymentType('customercharge');
    //     const splitOrderAmounts = await cartPage.splitOrderAmount(2);
    //     await memberPayment.searcMembers(customerDetails.email);
    //     await sleep(2500);
    //     await memberPayment.selectFirstMemberResult();
    //     await memberPayment.enterMemberChargeAmount(splitOrderAmounts.newAmount1);
    //     await bottomButtons.tapPayButton('applyPayment');

    //     await paymentSelection.selectPaymentType('giftcard');
    //     await giftCardPayment.searchGiftCard(fullGiftCardUPC);
    //     await sleep(2500);
    //     await giftCardPayment.tapGiftCardResult();
    //     await bottomButtons.tapPayButton('applyPayment');
    //     await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
    //     await receiptPage.tapReceiptButton('tabs');
    // });

})