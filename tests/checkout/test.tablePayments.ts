import bottomButtonsPage from '../../src/pageobjects/sharedScreens/bottomButtons.page';
import guestCount from '../../src/pageobjects/tables/guestCountModal.page';
import paymentSelectionPage from '../../src/pageobjects/paymentScreens/paymentSelection.page';
import navDrawer from '../../src/pageobjects/sharedScreens/navdrawer.page';
import navBar from '../../src/pageobjects/sharedScreens/navBar.page';
import tableMap from '../../src/pageobjects/tables/tableMap.page';
import {expect as wdioExpect } from '@wdio/globals';

describe('Table Payments -', () => {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    const category = 'Shirts - SO';
    const productName = 'Nike Shirt';

    it('Credit', async () => {
        await navBar.openNav();
        await navDrawer.clickTableButton();
        await tableMap.tapTable('schuleOaks', 11);
        // await guestCount.selectNumberOfGuests('1');
    });

    // it('Cash', async () => {
    // });

    // it('Gift Card', async () => {
    // });

    // it('Check', async () => {
    // });

    // it('Member', async () => {
    // });

    // //split payments

    // it('Split Payment | Cash + Credit', async () => {
    // });

    // it('Split Payment | Cash + Gift Card', async () => {
    // });

    // it('Split Payment | Cash + Check', async () => {
    // });

    // it('Split Payment | Cash + Member', async () => {
    // });

    // ////

    // it('Split Payment | Credit + Gift Card', async () => {
    // });

    // it('Split Payment | Credit + Check', async () => {
    // });

    // it('Split Payment | Credit + Member', async () => {
    // });

    // ////

    // it('Split Payment | Gift Card + Check', async () => {
    // });

    // it('Split Payment | Gift Card + Member', async () => {
    // });

})