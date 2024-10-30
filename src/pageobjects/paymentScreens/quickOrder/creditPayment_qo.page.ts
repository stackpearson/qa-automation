import { $, browser } from '@wdio/globals'
import Page from '../../page';

class CreditPaymentQO extends Page {
    //selectors
    public get chargeAmountField () {
        return $('//android.widget.EditText[@resource-id="tenfore.birdie:id/frpcr7_etPayAmount"]');
    };

    public get loadingSpinner () {
        return $('//android.view.ViewGroup[@resource-id="tenfore.birdie:id/progressBarHolder"]');
    };

    //methods
    public async enterChargeAmount(amount: string) {
        await this.chargeAmountField.waitForEnabled()
        await this.chargeAmountField.setValue(amount);
    }

    public async waitForCardReader() {
        await this.loadingSpinner.waitForDisplayed({ timeout: 5000, reverse: false})
        .catch(() => console.log('Loading Spinner did not appear within 5 seconds'));

        await browser.waitUntil(
            async () => !(await this.loadingSpinner.isDisplayed()),
            {
                timeout: 20000,
                timeoutMsg: 'Loading element still active after 20s'
            }
        )
    }



}

export default new CreditPaymentQO();