import { $ } from '@wdio/globals'
import Page from '../../page';

class TabCategoryPage extends Page {
    //selectors
    public async categoryTileByName (name: string) {
        return await $(`//android.widget.TextView[@resource-id="tenfore.birdie:id/gipg_tvLine1" and @text="${name}"]`);
    }

    //methods
    public async selectCategory(name: string) {
        const tile = await this.categoryTileByName(name);
        await tile.isEnabled();
        tile.click();
    }

}

export default new TabCategoryPage();