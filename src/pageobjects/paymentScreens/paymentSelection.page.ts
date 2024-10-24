import { $ } from '@wdio/globals'
import Page from '../page';

class PaymentSelectionPage extends Page {
    //selectors
    public cashButton () {
        return $('//android.widget.ToggleButton[@resource-id="tenfore.birdie:id/fpn_tbCash"]');
    }

    public checkButton () {
        return $('//android.widget.ToggleButton[@resource-id="tenfore.birdie:id/fpn_tbCheck"]');
    }

    public creditButton () {
        return $('//android.widget.ToggleButton[@resource-id="tenfore.birdie:id/fpn_tbCredit"]'); 
    }

    public customerChargeButton () {
        return $('//android.widget.ToggleButton[@resource-id="tenfore.birdie:id/fpn_tbCustomerCharge"]');
    }

    public giftCardButton () {
        return $('//android.widget.ToggleButton[@resource-id="tenfore.birdie:id/fpn_tbGiftCard"]');
    }

    public rainCheckButton () {
        return $('//android.widget.ToggleButton[@resource-id="tenfore.birdie:id/fpn_tbRainCheck"]');
    }

    //methods

/**
 * Selects a payment type by clicking the appropriate button.
 * 
 * @param paymentType - The type of payment to select. Must be one of 'credit', 'cash', 'giftcard', 'raincheck', 'check', or 'customercharge'.
 * @throws Will throw an error if an invalid payment type is provided.
 * 
 * @example
 * // Select the cash payment option
 * await PaymentSelectionPage.selectPaymentType('cash');
 */
    public async selectPaymentType (paymentType: 'credit' | 'cash' | 'giftcard' | 'raincheck' | 'check' | 'customercharge') {
        const paymentButtons = {
            credit: this.creditButton,
            cash: this.cashButton,
            giftcard: this.giftCardButton,
            raincheck: this.rainCheckButton,
            check: this.checkButton,
            customercharge: this.customerChargeButton,
        };

        const buttonToSelect = paymentButtons[paymentType];
        if (buttonToSelect) {
            const element = buttonToSelect.call(this);
            await element.click();
        } else {
            throw new Error(`invald payment type: ${paymentType}`);
        }
    }


}

export default new PaymentSelectionPage();