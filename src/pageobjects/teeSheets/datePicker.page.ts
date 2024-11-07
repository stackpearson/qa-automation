import { $ } from '@wdio/globals'
import Page from '../page';

class DatePicker extends Page {
    //selectors

    public dayTile(day: string) {
        return $(`//android.widget.TextView[@text="${day}"]`);
    };

    public get okayButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/confirm_button"]')
    }

    //methods
    public async tapDay (day: string) {
        await this.dayTile(day).click();
        await this.okayButton.isEnabled();
        await this.okayButton.click();
    };

}

export default new DatePicker();