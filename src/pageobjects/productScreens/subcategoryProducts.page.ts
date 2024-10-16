import { $ } from '@wdio/globals'
import Page from '../page';

class SubcategoryProductPage extends Page {
    //selectors
    public async productTileByName (name: string) {
        return $(`//android.widget.TextView[@resource-id="tenfore.birdie:id/gipg_tvLine1" and @text="${name}"]`);
    }

    //methods

}

export default new SubcategoryProductPage();