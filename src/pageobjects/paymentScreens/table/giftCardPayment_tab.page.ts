import { $, browser } from '@wdio/globals'
import Page from '../../page';

class GiftCardPickerTable extends Page {
    public get giftCardAmountField() {
        return $('//android.widget.EditText[@resource-id="tenfore.birdie:id/frtpgft_etPayAmount"]');
    };

    public get giftCardSearchField () {
        return $('//android.widget.AutoCompleteTextView[@resource-id="tenfore.birdie:id/frtpgft_etGiftCardLookup"]');
        
    };

    public seatOption (seatNumber: string) {
        return $(`//android.widget.ToggleButton[@resource-id="tenfore.birdie:id/tbPayBySeat" and starts-with(@text, "Seat ${seatNumber}")]`);
    };
    //methods

    public async enterGiftAmount(amount: string) {
        await this.giftCardAmountField.waitForClickable();
        await this.giftCardAmountField.setValue(amount)
    };

    public async searchGiftCard (gcIdentifier: string) {
        await this.giftCardSearchField.click();
        await this.giftCardSearchField.setValue(gcIdentifier);
    };

    public async selectSeat(seatNumber: string) {
        const seatToSelect = this.seatOption(seatNumber)
        await seatToSelect.isEnabled();
        seatToSelect.click();
    };

    
    
    /**
 * Needs improvement, this is a hardcoded tap that requires we use a UPC in the gift card search and the same device.
 * 
 */
    public async tapGiftCardResult() {
        await (browser as any).action('pointer', {
            parameters: { pointerType: 'touch'},
        })
            .move({ x: 1600, y: 450})
            .down()
            .pause(100)
            .up()
            .perform();
    }

}

export default new GiftCardPickerTable();