import datePicker from '../../src/pageobjects/teeSheets/datePicker.page';
import navDrawer from '../../src/pageobjects/sharedScreens/navdrawer.page';
import navBar from '../../src/pageobjects/sharedScreens/navBar.page';
import receiptPage from '../../src/pageobjects/checkout/tab/tabReceipt.page';
import tabPage from '../../src/pageobjects/tabs/tabs.page';
import landingPage from '../../src/pageobjects/teeSheets/teeSheetLanding.page';
import {expect as wdioExpect } from '@wdio/globals';

describe('TeeSheets -', () => {

    const generateRandomDay = Math.floor(Math.random() * 29 + 1).toString();
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    it('verify page', async () => {
        await navBar.openNav();
        await navDrawer.clickTeeSheetButton();
        await landingPage.verifyPage();
    });

    it('verify views', async () => {
        await navBar.openNav();
        await navDrawer.clickTeeSheetButton();
        await landingPage.tapViewButton('grid');
        await wdioExpect(landingPage.gridViewContainer()).toBeDisplayed();
        await landingPage.tapViewButton('list');
        await wdioExpect(landingPage.listViewContainer()).toBeDisplayed();
        await landingPage.tapViewButton('multi');
        await wdioExpect(landingPage.multiViewContainer()).toBeDisplayed();
        await landingPage.tapViewButton('grid');
    });
    
    it('select a new date with the date picker', async () => {
        await navBar.openNav();
        await navDrawer.clickTeeSheetButton();
        await landingPage.openDatePicker();
        const randomDay = generateRandomDay;
        await datePicker.tapDay(randomDay);
        const dateCorrect = await landingPage.verifyDate(randomDay);
        expect (dateCorrect).toBe(true);
    });

    it('select a new date with arrows', async () => {
        await navBar.openNav();
        await navDrawer.clickTeeSheetButton();
        const startDay = landingPage.extractDay(await landingPage.getTodaysDate());
        const nextDayExpected = landingPage.getAdjacentDays(startDay);

        landingPage.tapNextDay();
        await sleep(1000);
        const nextDayActual = landingPage.extractDay(await landingPage.getTodaysDate());
        expect (nextDayActual).toBe(nextDayExpected);

        landingPage.tapPreviousDay();
        await sleep(1000);
        const previousDay = landingPage.extractDay(await landingPage.getTodaysDate());
        console.log('previousDay: ', previousDay);
        expect (previousDay).toBe(startDay);
    });


})