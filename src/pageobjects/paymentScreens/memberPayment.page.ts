import { $, browser } from '@wdio/globals'
import Page from '../page';

class MemberPicker extends Page {
    public get memberSearchField () {
        return $('//android.widget.AutoCompleteTextView[@resource-id="tenfore.birdie:id/fpspc_etCustomerLookup"]');
    };

    //methods

    public async searcMembers (memberIdentifier: string) {
        await this.memberSearchField.click();
        await this.memberSearchField.setValue(memberIdentifier);
    };

    public async selectFirstMemberResult() {
        await (browser as any).action('pointer', {
            parameters: { pointerType: 'touch'},
        })
            .move({ x: 1000, y: 550 })
            .down()
            .pause(100)
            .up()
            .perform();
    }


}

export default new MemberPicker();