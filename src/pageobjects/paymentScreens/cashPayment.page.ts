import { $ } from '@wdio/globals'
import Page from '../page';

class PaymentSelectionPage extends Page {
    //selectors
    public get cashAmountField () {
        return $('//android.widget.EditText[@resource-id="tenfore.birdie:id/fpspc_etPayAmount"]');
        //android.widget.EditText[@resource-id="tenfore.birdie:id/fpspc_etPayAmount"]
        //android.widget.EditText[@resource-id="tenfore.birdie:id/fpspc7_etPayAmount"]
    };

    public fastPayExact () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/fpspc_btnCashPay1"]');
    };

    public fastPay2 () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/fpspc_btnCashPay2"]');
    };

    public fastPay3 () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/fpspc_btnCashPay3"]');
    };

    public fastPay4 () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/fpspc_btnCashPay4"]');
    };

    public fastPay5 () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/fpspc_btnCashPay5"]');
    };

    //methods

    /**
 * Selects a payment type by clicking the appropriate button.
 * 
 * @param fastPayOption - The fast pay option you want from left to right (1:exact amount, 2, 3, 4 or 5)
 * @throws Will throw an error if an invalid payment type is provided.
 * 
 * @example
 * // Select the fast payment option
 * await cashPaymentPage.selectFastPayOption(1);
 */
    public async selectFastPayOption (fastPayOption: 1 | 2 | 3 | 4 | 5 ) {
        const fastPayButtons = {
            1: this.fastPayExact,
            2: this.fastPay2,
            3: this.fastPay3,
            4: this.fastPay4,
            5: this.fastPay5,
        };

        const buttonToSelect = fastPayButtons[fastPayOption];
        if (buttonToSelect) {
            const element = buttonToSelect.call(this);
            await element.click();
        } else {
            throw new Error(`invald payment type: ${fastPayOption}`);
        }
    }

    public async enterCashAmount(amount: string) {
        await this.cashAmountField.waitForEnabled();
        await this.cashAmountField.setValue(amount);
    }

    public async waitForCashAmount() {
        await this.cashAmountField.isDisplayed();
    }


} 

export default new PaymentSelectionPage();