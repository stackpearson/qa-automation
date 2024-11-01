import { $ } from '@wdio/globals'
import Page from '../../page';

class ProshopCategoryPage extends Page {
    //selectors
    public async categoryTileByName (name: string) {
        return await $(`//android.widget.TextView[@resource-id="tenfore.birdie:id/gipg_tvLine1" and @text="${name}"]`);
    }

    public async loadingSpinner() {
        return $('//android.widget.ImageView[@resource-id="tenfore.birdie:id/logo"]')
    }

    //methods
    public async selectCategory(name: string) {
        const tile = await this.categoryTileByName(name);
        tile.click();
    }

}

export default new ProshopCategoryPage();