import { $, browser } from '@wdio/globals'
import Page from '../../page';

class MemberPickerQO extends Page {
    public get memberSearchField () {
        return $('//android.widget.AutoCompleteTextView[@resource-id="tenfore.birdie:id/frpcus_etCustomerLookup"]');
    };

    public get memberChargeAmount () {
        return $('//android.widget.EditText[@resource-id="tenfore.birdie:id/frpcus_etPayAmount"]')
    }

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
            .move({ x: 950, y: 450 })
            .down()
            .pause(100)
            .up()
            .perform();
    }
}

export default new MemberPickerQO();