import { $ } from '@wdio/globals'
import Page from '../../page';

class CheckPaymentTable extends Page {
    //selectors
    public get checkAmountField () {
        return $('//android.widget.EditText[@resource-id="tenfore.birdie:id/frtpch_etCheckAmount"]')
    }
    public checkNumberTextField () {
        return $('id:tenfore.birdie:id/frtpch_etCheckNumber');
    };

    public errorDialog () {
        return $('//android.widget.TextView[@resource-id="tenfore.birdie:id/tvStatusError"]');
    };

    public get closeErrorButton () {
        return $('//android.widget.ImageButton[@resource-id="tenfore.birdie:id/btnCloseError"]');
    }

    public seatOption (seatNumber: string) {
        return $(`//android.widget.ToggleButton[@resource-id="tenfore.birdie:id/tbPayBySeat" and starts-with(@text, "Seat ${seatNumber}")]`);
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

    public async selectSeat(seatNumber: string) {
        const seatToSelect = this.seatOption(seatNumber)
        await seatToSelect.isEnabled();
        seatToSelect.click();
    }



}

export default new CheckPaymentTable();