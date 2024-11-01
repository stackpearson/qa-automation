import { $, browser } from '@wdio/globals'
import Page from '../page';

class GuestCountModalPage extends Page {
    //selectors
    public guestCountButton(guestCount: string) {
        return $(`//android.widget.Button[@resource-id="tenfore.birdie:id/btnGuestCount" and @text="${guestCount}"]`);
    }

    public get saveButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnSaveGuests"]')
    }

    //methods

    public async selectNumberOfGuests(guestCount: string) {
        const guestCountButtonToPress = this.guestCountButton(guestCount);
        await guestCountButtonToPress.isEnabled();
        await guestCountButtonToPress.click();
        await this.saveButton.click()
    }


}

export default new GuestCountModalPage();