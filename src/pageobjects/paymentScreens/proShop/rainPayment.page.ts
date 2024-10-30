import { $, browser } from '@wdio/globals'
import Page from '../../page';

class RainCheckPicker extends Page {
    public get rainCheckSearchField () {
        return $('//android.widget.AutoCompleteTextView[@resource-id="tenfore.birdie:id/fpspr_etCustomerLookup"]');
    };

    //methods

    public async searcRainChecks (rcIdentifier: string) {
        await this.rainCheckSearchField.click();
        await this.rainCheckSearchField.setValue(rcIdentifier);
    };

    public async selectFirstRainResult() {
        await (browser as any).action('pointer', {
            parameters: { pointerType: 'touch'},
        })
            .move({ x: 1100, y: 100 })
            .down()
            .pause(100)
            .up()
            .perform();
    }


}

export default new RainCheckPicker();