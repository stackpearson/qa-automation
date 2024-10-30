import { $ } from '@wdio/globals'
import Page from '../page';

class TabPage extends Page {
    //selectors
    public get createTabButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnCreateTab"]');
    };


    //methods

    public async tapCreateTab () {
        await this.createTabButton.click();
    };
}

export default new TabPage();