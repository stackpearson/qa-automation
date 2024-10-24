import { $ } from '@wdio/globals'
import Page from '../page';

class ProshopCartPage extends Page {
    //selectors
    public async productByName (name: string) {
        return $(`//android.widget.TextView[@resource-id="tenfore.birdie:id/tvProductName" and @text="${name}"]`);
        
    }

    //methods


}

export default new ProshopCartPage();