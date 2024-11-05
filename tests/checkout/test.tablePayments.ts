import bottomButtonsPage from '../../src/pageobjects/sharedScreens/bottomButtons.page';
import cartPage from '../../src/pageobjects/checkout/table/tableCart.page';
import cashPayment from '../../src/pageobjects/paymentScreens/table/cashPayment_table.page';
import categoryPage from '../../src/pageobjects/productScreens/table/tableCategory.page';
import checkPayment from '../../src/pageobjects/paymentScreens/table/checkPayment_table.page';
import creditPayment from '../../src/pageobjects/paymentScreens/table/creditPayment_table.page';
import giftCardPayment from '../../src/pageobjects/paymentScreens/table/giftCardPayment_tab.page';
import guestCount from '../../src/pageobjects/tables/guestCountModal.page';
import memberPayment from '../../src/pageobjects/paymentScreens/table/memberPayment_table.page';
import paymentSelectionPage from '../../src/pageobjects/paymentScreens/paymentSelection.page';
import productPage from '../../src/pageobjects/productScreens/table/tableProduct.page';
import receiptPage from '../../src/pageobjects/checkout/table/tableReceipt.page';
import navDrawer from '../../src/pageobjects/sharedScreens/navdrawer.page';
import navBar from '../../src/pageobjects/sharedScreens/navBar.page';
import tableMap from '../../src/pageobjects/tables/tableMap.page';
import {expect as wdioExpect } from '@wdio/globals';
import giftCardPayment_tabPage from '../../src/pageobjects/paymentScreens/table/giftCardPayment_tab.page';

describe('Table Payments -', () => {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    const category = 'Domestic Beer';
    const productName = 'Bud Light';
    const memberEmail = 'sawyer.pearson+saved.card@tenfore.golf';
    const fullGiftCardUPC = '1024225254';
    const randomCheckNumber = Math.floor(100 + Math.random() * 900).toString();

    it('Credit', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table'); //follow up w/ Ayush to see if we can chance this id
        await creditPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await creditPayment.waitForCardReader();
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    it('Cash', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await paymentSelectionPage.selectPaymentType('cash');
        await cashPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    it('Gift Card', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await paymentSelectionPage.selectPaymentType('giftcard');
        await giftCardPayment.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPayment.tapGiftCardResult()
        await giftCardPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    it('Check', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await paymentSelectionPage.selectPaymentType('check');
        await checkPayment.addCheckNumber(randomCheckNumber);
        await checkPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    it('Member', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await paymentSelectionPage.selectPaymentType("customercharge");
        await memberPayment.searcMembers(memberEmail);
        await sleep(2500);
        await memberPayment.selectFirstMemberResult();
        await memberPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    // //split payments

    it('Split Payment | Cash + Credit', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await paymentSelectionPage.selectPaymentType('cash');
        await cashPayment.selectSeat('1');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await cashPayment.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('table');

        await paymentSelectionPage.selectPaymentType('credit');
        await creditPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await creditPayment.waitForCardReader();
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    it('Split Payment | Cash + Gift Card', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await paymentSelectionPage.selectPaymentType('cash');
        await cashPayment.selectSeat('1');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await cashPayment.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('table');

        await paymentSelectionPage.selectPaymentType('giftcard');
        await giftCardPayment.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPayment.tapGiftCardResult()
        await giftCardPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    it('Split Payment | Cash + Check', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await paymentSelectionPage.selectPaymentType('cash');
        await cashPayment.selectSeat('1');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await cashPayment.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('table');

        await paymentSelectionPage.selectPaymentType('check');
        await checkPayment.addCheckNumber(randomCheckNumber);
        await checkPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    it('Split Payment | Cash + Member', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await paymentSelectionPage.selectPaymentType('cash');
        await cashPayment.selectSeat('1');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await cashPayment.enterCashAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('table');

        await paymentSelectionPage.selectPaymentType("customercharge");
        await memberPayment.searcMembers(memberEmail);
        await sleep(2500);
        await memberPayment.selectFirstMemberResult();
        await memberPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    it('Split Payment | Credit + Gift Card', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await creditPayment.selectSeat('1');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await creditPayment.enterChargeAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('table');
        await creditPayment.waitForCardReader();

        await paymentSelectionPage.selectPaymentType('giftcard');
        await giftCardPayment.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPayment.tapGiftCardResult()
        await giftCardPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    it('Split Payment | Credit + Check', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await creditPayment.selectSeat('1');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await creditPayment.enterChargeAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('table');
        await creditPayment.waitForCardReader();

        await paymentSelectionPage.selectPaymentType('check');
        await checkPayment.addCheckNumber(randomCheckNumber);
        await checkPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    it('Split Payment | Credit + Member', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await creditPayment.selectSeat('1');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await creditPayment.enterChargeAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('table');
        await creditPayment.waitForCardReader();

        await paymentSelectionPage.selectPaymentType("customercharge");
        await memberPayment.searcMembers(memberEmail);
        await sleep(2500);
        await memberPayment.selectFirstMemberResult();
        await memberPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    it('Split Payment | Gift Card + Check', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await paymentSelectionPage.selectPaymentType('check');
        await checkPayment.selectSeat('1');
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await checkPayment.enterCheckAmount(splitOrderAmounts.newAmount1)
        await checkPayment.addCheckNumber(randomCheckNumber);
        await bottomButtonsPage.tapPayButton('table');

        await paymentSelectionPage.selectPaymentType('giftcard');
        await giftCardPayment.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPayment.tapGiftCardResult()
        await creditPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

    it('Split Payment | Gift Card + Member', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        await guestCount.selectNumberOfGuests('1');
        await categoryPage.selectCategory(category);
        await productPage.addToCart(productName);
        await bottomButtonsPage.tapPayButton('applyPayment_Table');
        await paymentSelectionPage.selectPaymentType("customercharge");
        await memberPayment.searcMembers(memberEmail);
        await sleep(2500);
        await memberPayment.selectFirstMemberResult();
        await memberPayment.selectSeat('1')
        const splitOrderAmounts = await cartPage.splitOrderAmount(2);
        await memberPayment.enterMemberChargeAmount(splitOrderAmounts.newAmount1);
        await bottomButtonsPage.tapPayButton('table');

        await paymentSelectionPage.selectPaymentType('giftcard');
        await giftCardPayment.searchGiftCard(fullGiftCardUPC);
        await sleep(2500);
        await giftCardPayment.tapGiftCardResult()
        await giftCardPayment.selectSeat('1');
        await bottomButtonsPage.tapPayButton('table');
        await wdioExpect(receiptPage.orderCompleteHeader()).toBeDisplayed();
        await receiptPage.tapReceiptButton('tables')
    });

})