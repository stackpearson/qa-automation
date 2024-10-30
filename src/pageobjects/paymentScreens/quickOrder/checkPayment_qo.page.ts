import { $ } from '@wdio/globals'
import Page from '../../page';

class CheckPaymentQO extends Page {
    //selectors
    public get checkAmountField () {
        return $('//android.widget.EditText[@resource-id="tenfore.birdie:id/frpch_etCheckAmount"]')
    }
    public checkNumberTextField () {
        return $('id:tenfore.birdie:id/frpch_etCheckNumber');
    };

    public errorDialog () {
        return $('//android.widget.TextView[@resource-id="tenfore.birdie:id/tvStatusError"]');
    };

    public get closeErrorButton () {
        return $('//android.widget.ImageButton[@resource-id="tenfore.birdie:id/btnCloseError"]');
    }

    //methods
    public async addCheckNumber (checkNumber: string) {
        await this.checkNumberTextField().setValue(checkNumber)
    };

    public async dismissError () {
        await this.closeErrorButton.click();
    }

    public async enterCheckAmount(amount: string) {
        await this.checkAmountField.waitForEnabled();
        await this.checkAmountField.setValue(amount);
    }



}

export default new CheckPaymentQO();