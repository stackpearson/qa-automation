import bottomButtons from '../../src/pageobjects/sharedScreens/bottomButtons.page';
import cashPayment from '../../src/pageobjects/paymentScreens/quickOrder/cashPayment_qo.page';
import checkPayment from '../../src/pageobjects/paymentScreens/quickOrder/checkPayment_qo.page';
import creditPayment from '../../src/pageobjects/paymentScreens/quickOrder/creditPayment_qo.page';
import giftCardPayment from '../../src/pageobjects/paymentScreens/quickOrder/giftCardPayment_qo.page';
import memberPayment from '../../src/pageobjects/paymentScreens/quickOrder/memberPayment_qo.page';
import navBar from '../../src/pageobjects/sharedScreens/navBar.page';
import navDrawer from '../../src/pageobjects/sharedScreens/navdrawer.page';
import paymentSelection from '../../src/pageobjects/paymentScreens/paymentSelection.page';
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
        await bottomButtons.tapPayButton('quickorder');
        await paymentSelection.selectPaymentType('credit');
        await bottomButtons.tapPayButton('applyPayment');
        await creditPayment.waitForCardReader();
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('quickorder');
    });

    it('Cash', async () => {
        await navBar.openNav();
        await navDrawer.clickQuickOrderButton();
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('quickorder');
        await paymentSelection.selectPaymentType('cash');
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('quickorder');
    });

    it('Gift Card', async () => {
      await navBar.openNav();
      await navDrawer.clickQuickOrderButton();
      await categoryPage.selectCategory(category);
      await productPage.addToCart(productName);
      await bottomButtons.tapPayButton('quickorder');
      await paymentSelection.selectPaymentType('giftcard');
      await giftCardPayment.searchGiftCard(fullGiftCardUPC);
      await sleep(2500);
      await giftCardPayment.tapGiftCardResult();
      await bottomButtons.tapPayButton('applyPayment');
      await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
      await receiptPage.tapReceiptButton('quickorder');
    });

    it('Check', async () => {
      await navBar.openNav();
      await navDrawer.clickQuickOrderButton();
      await categoryPage.selectCategory(category);
      await productPage.addToCart(productName);
      await bottomButtons.tapPayButton('quickorder');
      await paymentSelection.selectPaymentType('check');
      await checkPayment.addCheckNumber(randomCheckNumber);
      await bottomButtons.tapPayButton('applyPayment');
      await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
      await receiptPage.tapReceiptButton('quickorder');
    });

    it('Member', async () => {
        await navBar.openNav();
        await navDrawer.clickQuickOrderButton();
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('quickorder');
        await paymentSelection.selectPaymentType('customercharge');
        await memberPayment.searcMembers(memberEmail);
        await sleep(2500);
        await memberPayment.selectFirstMemberResult();
        await bottomButtons.tapPayButton('applyPayment');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('quickorder')
    });

    //split payments

    it('Split Payment | Credit + Cash', async () => {
        await navBar.openNav();
        await navDrawer.clickQuickOrderButton();
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('quickorder');
        await paymentSelection.selectPaymentType('cash');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await cashPayment.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtons.tapPayButton('applyPayment');

        await paymentSelection.selectPaymentType('credit');
        await bottomButtons.tapPayButton('applyPayment');
        await creditPayment.waitForCardReader();
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('quickorder');
    });
    
    it('Split Payment | Credit + Gift Card', async () => {
        await navBar.openNav();
        await navDrawer.clickQuickOrderButton();
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('quickorder');
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
        await receiptPage.tapReceiptButton('quickorder');
    });

    it('Split Payment | Credit + Check', async () => {
      await navBar.openNav();
      await navDrawer.clickQuickOrderButton();
      await categoryPage.selectCategory(category);
      await productPage.addToCart(productName);
      await bottomButtons.tapPayButton('quickorder');
      await paymentSelection.selectPaymentType('credit');
      const splitOrderAmounts = await cartPage.splitOrderAmount(2);
      await creditPayment.enterChargeAmount(splitOrderAmounts.newAmount1)
      await bottomButtons.tapPayButton('applyPayment');
      await creditPayment.waitForCardReader();

      await paymentSelection.selectPaymentType('check');
      await checkPayment.addCheckNumber(randomCheckNumber);
      await bottomButtons.tapPayButton('applyPayment');
      await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
      await receiptPage.tapReceiptButton('quickorder');
    });

    it('Split Payment | Credit + Member', async () => {
      await navBar.openNav();
      await navDrawer.clickQuickOrderButton();
      await categoryPage.selectCategory(category);
      await productPage.addToCart(productName);
      await bottomButtons.tapPayButton('quickorder');
      await paymentSelection.selectPaymentType('credit');
      const splitOrderAmounts = await cartPage.splitOrderAmount(2);
      await creditPayment.enterChargeAmount(splitOrderAmounts.newAmount1)
      await bottomButtons.tapPayButton('applyPayment');
      await creditPayment.waitForCardReader();

      await paymentSelection.selectPaymentType('customercharge');
      await memberPayment.searcMembers(memberEmail);
      await sleep(2500);
      await memberPayment.selectFirstMemberResult();
      await bottomButtons.tapPayButton('applyPayment');
      await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
      await receiptPage.tapReceiptButton('quickorder')
    });

    it('Split Payment | Cash + Gift Card', async () => {
        await navBar.openNav();
        await navDrawer.clickQuickOrderButton();
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtons.tapPayButton('quickorder');
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
        await receiptPage.tapReceiptButton('quickorder');     
    });

    it('Split Payment | Cash + Check', async () => {
      await navBar.openNav();
      await navDrawer.clickQuickOrderButton();
      await categoryPage.selectCategory(category);
      await productPage.addToCart(productName);
      await bottomButtons.tapPayButton('quickorder');
      await paymentSelection.selectPaymentType('cash');
      const splitOrderAmounts = await cartPage.splitOrderAmount(2);
      await cashPayment.enterCashAmount(splitOrderAmounts.newAmount1);
      await bottomButtons.tapPayButton('applyPayment');

      await paymentSelection.selectPaymentType('check');
      await checkPayment.addCheckNumber(randomCheckNumber);
      await bottomButtons.tapPayButton('applyPayment');
      await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
      await receiptPage.tapReceiptButton('quickorder');
    });
    
    it('Split Payment | Cash + Member', async () => {
      await navBar.openNav();
      await navDrawer.clickQuickOrderButton();
      await categoryPage.selectCategory(category);
      await productPage.addToCart(productName);
      await bottomButtons.tapPayButton('quickorder');
      await paymentSelection.selectPaymentType('cash');
      const splitOrderAmounts = await cartPage.splitOrderAmount(2);
      await cashPayment.enterCashAmount(splitOrderAmounts.newAmount1);
      await bottomButtons.tapPayButton('applyPayment');

      await paymentSelection.selectPaymentType('customercharge');
      await memberPayment.searcMembers(memberEmail);
      await sleep(2500);
      await memberPayment.selectFirstMemberResult();
      await bottomButtons.tapPayButton('applyPayment');
      await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
      await receiptPage.tapReceiptButton('quickorder')
    });

    it('Split Payment | Gift Card + Check', async () => {
      await navBar.openNav();
      await navDrawer.clickQuickOrderButton();
      await categoryPage.selectCategory(category);
      await productPage.addToCart(productName);
      await bottomButtons.tapPayButton('quickorder');
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
      await receiptPage.tapReceiptButton('quickorder');
    });

    //swapping from member pay to GC crashes the app - awaiting fix before uncommenting this test case
    // it('Split Payment | Gift Card + Member', async () => {
    //   await navBar.openNav();
    //   await navDrawer.clickQuickOrderButton();
    //   await categoryPage.selectCategory(category);
    //   await productPage.addToCart(productName);
    //   await bottomButtons.tapPayButton('quickorder');
    //   await paymentSelection.selectPaymentType('customercharge');
    //   const splitOrderAmounts = await cartPage.splitOrderAmount(2);
    //   await memberPayment.searcMembers(memberEmail);
    //   await sleep(2500);
    //   await memberPayment.selectFirstMemberResult();
    //   await memberPayment.enterMemberChargeAmount(splitOrderAmounts.newAmount1);
    //   await bottomButtons.tapPayButton('applyPayment');

    //   await paymentSelection.selectPaymentType('giftcard');
    //   await giftCardPayment.searchGiftCard(fullGiftCardUPC);
    //   await sleep(2500);
    //   await giftCardPayment.tapGiftCardResult();
    //   await bottomButtons.tapPayButton('applyPayment');
    //   await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
    //   await receiptPage.tapReceiptButton('quickorder');
    // });

    it('Split Payment | Check + Member', async () => {
      await navBar.openNav();
      await navDrawer.clickQuickOrderButton();
      await categoryPage.selectCategory(category);
      await productPage.addToCart(productName);
      await bottomButtons.tapPayButton('quickorder');
      await paymentSelection.selectPaymentType('check');
      const splitOrderAmounts = await cartPage.splitOrderAmount(2);
      await checkPayment.addCheckNumber(randomCheckNumber);
      await checkPayment.enterCheckAmount(splitOrderAmounts.newAmount1);
      await bottomButtons.tapPayButton('applyPayment');

      await paymentSelection.selectPaymentType('customercharge');
      await memberPayment.searcMembers(memberEmail);
      await sleep(2500);
      await memberPayment.selectFirstMemberResult();
      await bottomButtons.tapPayButton('applyPayment');
      await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
      await receiptPage.tapReceiptButton('quickorder')
    });
})
