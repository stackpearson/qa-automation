import { $, browser } from '@wdio/globals'
import Page from '../../page';

class GiftCardPickerTab extends Page {
    public get giftCardAmountField() {
        return $('//android.widget.EditText[@resource-id="tenfore.birdie:id/etGiftCardAmount"]');
    };

    public get giftCardSearchField () {
        return $('//android.widget.AutoCompleteTextView[@resource-id="tenfore.birdie:id/frpgc_etGiftCardLookup"]');
    };
    //methods

    public async enterGiftAmount(amount: string) {
        await this.giftCardAmountField.waitForClickable();
        await this.giftCardAmountField.setValue(amount)
    }

    public async searchGiftCard (gcIdentifier: string) {
        await this.giftCardSearchField.click();
        await this.giftCardSearchField.setValue(gcIdentifier);
    }

    
    
    /**
 * Needs improvement, this is a hardcoded tap that requires we use a UPC in the gift card search and the same device.
 * 
 */
    public async tapGiftCardResult() {
        await (browser as any).action('pointer', {
            parameters: { pointerType: 'touch'},
        })
            .move({ x: 1200, y: 500})
            .down()
            .pause(100)
            .up()
            .perform();
    }

}

export default new GiftCardPickerTab();