import { $, browser } from '@wdio/globals'
import Page from '../page';

class GiftCardPicker extends Page {
    public get giftCardSearchField () {
        return $('//android.widget.AutoCompleteTextView[@resource-id="tenfore.birdie:id/etGiftCardLookup"]');
    };
    //methods

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
            .move({ x: 1100, y: 250})
            .down()
            .pause(100)
            .up()
            .perform();
    }

}

export default new GiftCardPicker();