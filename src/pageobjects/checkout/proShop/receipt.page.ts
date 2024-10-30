import { $ } from '@wdio/globals'
import Page from '../../page';

class ReceiptPage extends Page {
    //selectors
    public orderCompleteHeader () {
        return $('//android.widget.TextView[@text="Order Complete"]')
    }
    public proShopButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/apsr_btnBackToProShop"]');
    }

    public quickOrderButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnBackToQuickOrder"]')
    }
   

    //methods
    public async tapReceiptButton(button: 'proshop' | 'quickorder') {
        const navButtons = {
            proshop: this.proShopButton,
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

export default new ReceiptPage();