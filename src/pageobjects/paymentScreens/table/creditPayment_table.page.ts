import { $, browser } from '@wdio/globals'
import Page from '../../page';

class CreditPaymentTable extends Page {
    //selectors
    public get chargeAmountField () {
        return $('//android.widget.EditText[@resource-id="tenfore.birdie:id/frtpcr7_etPayAmount"]');
    };

    public get loadingSpinner () {
        return $('//android.view.ViewGroup[@resource-id="tenfore.birdie:id/progressBarHolder"]');
    };

    public seatOption (seatNumber: string) {
        return $(`//android.widget.ToggleButton[@resource-id="tenfore.birdie:id/tbPayBySeat" and starts-with(@text, "Seat ${seatNumber}")]`);
    }

    //methods
    public async enterChargeAmount(amount: string) {
        await this.chargeAmountField.waitForEnabled()
        await this.chargeAmountField.setValue(amount);
    }

    public async selectSeat(seatNumber: string) {
        const seatToSelect = this.seatOption(seatNumber)
        await seatToSelect.isEnabled();
        seatToSelect.click();
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

export default new CreditPaymentTable();