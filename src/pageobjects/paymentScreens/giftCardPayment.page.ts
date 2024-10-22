import { $ } from '@wdio/globals'
import Page from '../page';

class GiftCardPicker extends Page {
    public get giftCardSearchField () {
        return $('//android.widget.AutoCompleteTextView[@resource-id="tenfore.birdie:id/etGiftCardLookup"]');
    };

    //methods

    public async selectGiftCard (gcIdentifier: string) {
        await this.giftCardSearchField.click();
        await this.giftCardSearchField.setValue(gcIdentifier);
    }

}

export default new GiftCardPicker();