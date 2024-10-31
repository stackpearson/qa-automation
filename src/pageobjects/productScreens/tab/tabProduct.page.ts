import { $ } from '@wdio/globals'
import Page from '../../page';

class TabProductPage extends Page {
    //selectors
    public async productTileByName (name: string) {
        return $(`//android.widget.TextView[@resource-id="tenfore.birdie:id/gip_tvProductTitle" and @text="${name}"]`);
    }

    //methods
    public async addToCart(name: string) {
       const itemToAdd = await this.productTileByName(name);
       await itemToAdd.isEnabled();
       itemToAdd.click();
    }


}

export default new TabProductPage();