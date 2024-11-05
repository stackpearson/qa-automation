import { $, browser } from '@wdio/globals'
import Page from '../../page';

class MemberPickerTable extends Page {
    public get memberSearchField () {
        return $('//android.widget.AutoCompleteTextView[@resource-id="tenfore.birdie:id/frtpcus_etCustomerLookup"]');
    };

    public get memberChargeAmount () {
        return $('//android.widget.EditText[@resource-id="tenfore.birdie:id/frtpcus_etPayAmount"]')
    }

    public seatOption (seatNumber: string) {
        return $(`//android.widget.ToggleButton[@resource-id="tenfore.birdie:id/tbPayBySeat" and starts-with(@text, "Seat ${seatNumber}")]`);
    };

    //methods

    public async enterMemberChargeAmount(amount: string){
        await this.memberChargeAmount.isEnabled();
        await this.memberChargeAmount.setValue(amount)
    }

    public async searcMembers (memberIdentifier: string) {
        await this.memberSearchField.click();
        await this.memberSearchField.setValue(memberIdentifier);
    };

    public async selectFirstMemberResult() {
        await (browser as any).action('pointer', {
            parameters: { pointerType: 'touch'},
        })
            .move({ x: 1382, y: 391 })
            .down()
            .pause(100)
            .up()
            .perform();
    };

    public async selectSeat(seatNumber: string) {
        const seatToSelect = this.seatOption(seatNumber)
        await seatToSelect.isEnabled();
        seatToSelect.click();
    }
}

export default new MemberPickerTable();