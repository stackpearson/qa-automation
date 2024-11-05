import { $ } from '@wdio/globals'
import Page from '../../page';

class TableReceiptPage extends Page {
    //selectors
    public orderCompleteHeader () {
        return $('//android.widget.TextView[@text="Order Complete"]')
    }
    public tabButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnBackToTabs"]');
    }

    public tablesButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnBackToTables"]');
    }

    public quickOrderButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnBackToQuickOrder"]')
    }

    //methods
    public async tapReceiptButton(button: 'tabs' | 'quickorder' | 'tables') {
        const navButtons = {
            tabs: this.tabButton,
            quickorder: this.quickOrderButton,
            tables: this.tablesButton,
        }

        const buttonToSelect = navButtons[button];
        if (buttonToSelect) {
            const element = buttonToSelect.call(this);
            await element.waitForEnabled();
            await element.click();
        }
    }
}

export default new TableReceiptPage();