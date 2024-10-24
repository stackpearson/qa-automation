import { $ } from '@wdio/globals'
import Page from '../page';

class ReceiptPage extends Page {
    //selectors
    public orderCompleteHeader () {
        return $('//android.widget.TextView[@resource-id="tenfore.birdie:id/tvHeader"]');
    }
    public proShopButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/apsr_btnBackToProShop"]');
    }
   

    //methods
    public async clickProShop() {
        await this.proShopButton().click();
     }
}

export default new ReceiptPage();