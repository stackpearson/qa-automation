import { $ } from '@wdio/globals'
import Page from '../page';

class TabPage extends Page {
    //selectors
    public get createTabButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnCreateTab"]');
    };

    public customerTab (customerName: string) {
        return $(`//android.widget.TextView[@resource-id="tenfore.birdie:id/lirt_tvCustomerName" and @text="${customerName}"]`)
    }

    


    //methods

    public async tapCreateTab () {
        await this.createTabButton.click();
    };

    public async enterIntoTab (customerName: string) {
        await this.customerTab(customerName).isEnabled();
        this.customerTab(customerName).click();
    }

}

export default new TabPage();