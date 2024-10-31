import { $ } from '@wdio/globals'
import Page from '../../page';

class TabReceiptPage extends Page {
    //selectors
    public orderCompleteHeader () {
        return $('//android.widget.TextView[@text="Order Complete"]')
    }
    public tabButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnBackToTabs"]');
    }

    public quickOrderButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnBackToQuickOrder"]')
    }
   

    //methods
    public async tapReceiptButton(button: 'tabs' | 'quickorder') {
        const navButtons = {
            tabs: this.tabButton,
            quickorder: this.quickOrderButton,
        }

        const buttonToSelect = navButtons[button];
        if (buttonToSelect) {
            const element = buttonToSelect.call(this);
            await element.waitForEnabled();
            await element.click();
        }
    }
}

export default new TabReceiptPage();