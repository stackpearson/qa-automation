import { $, driver, expect } from '@wdio/globals'
import Page from '../page';
import { touchAction } from 'webdriverio/build/commands/browser';


class TeeSheetLanding extends Page {
    //selectors
    public get currentDateButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnCurrentDate"]');
    };

    public get genericGridTile() {
        return $('//android.view.ViewGroup[@resource-id="tenfore.birdie:id/llContainer"]');
    };

    public gridButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnViewGrid"]');
    };

    public gridViewContainer() {
        return $('//android.widget.GridView[@resource-id="tenfore.birdie:id/ats_gvTeeSheet"]');
    };

    public listButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnViewList"]');
    };

    public listViewContainer() {
        return $('//android.widget.GridView[@resource-id="tenfore.birdie:id/ats_gvListTeeSheet"]');
    };

    public multiButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnViewMulti"]');
    };

    public multiViewContainer() {
        return $('//android.widget.LinearLayout[@resource-id="tenfore.birdie:id/ats_layoutMultipleCourses"]');
    };

    public get nextDayButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnNextDay"]')
    };

    public get previousDayButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnPreviousDay"]');
    };

    public get teeSheetHeader () {
        return $('//android.widget.TextView[@text="Tee Sheet"]');
    };

    //methods
    public extractDay(dateString: string) {
        const match = dateString.match(/\b\d{2}\b/);
        return match ? match[0] : '';
    };

    public getAdjacentDays(day: string) {
        const dayNumber = parseInt(day, 10);
    
        // const currentDay = day;
        const nextDay = (dayNumber + 1).toString().padStart(2, '0');
    
        return nextDay;
    };

    public async getTodaysDate() {
        const dateField = this.currentDateButton;
        const dateText = dateField.getText();
        return dateText
    };

    public async openDatePicker() {
        await this.currentDateButton.click();
    };

    public async tapNextDay() {
        await this.nextDayButton.click();
    };

    public async tapPreviousDay() {
        await this.previousDayButton.click();
    };

    public async tapViewButton(button: 'grid' | 'list' | 'multi' ) {
        const viewButtons = {
            grid: this.gridButton,
            list: this.listButton,
            multi: this.multiButton,
        }

        const buttonToSelect = viewButtons[button];
        if (buttonToSelect) {
            const element = buttonToSelect.call(this);
            await element.waitForEnabled({timeout: 2500});
            await element.click();
        }
    };

    public async verifyDate(date: string): Promise<boolean> {
        const fullDateText = await this.getTodaysDate();
        const dateOnlyText = await this.extractDay(fullDateText);
        return date === dateOnlyText;
    };

    public async verifyPage() {
        await expect(this.teeSheetHeader).toBeDisplayed();
        await expect(this.gridButton()).toBeDisplayed();
        await expect(this.multiButton()).toBeDisplayed();
        await expect(this.listButton()).toBeDisplayed();
    };

}

export default new TeeSheetLanding();