import { $ } from '@wdio/globals'
import Page from './page';

class ProshopPage extends Page {
    //selectors
    public get logoutButton () {
        return $('id:tenfore.birdie:id/nav_log_out');
    }

    public get navDrawer () {
        return $('//android.widget.ImageButton[@content-desc="Open navigation drawer"]');
    }

    public productTileByName (name: string) {
        return $(`//android.widget.TextView[@resource-id="tenfore.birdie:id/gipg_tvLine1" and @text="${name}"]`);
    }

    public get proShopTitle () {
        return $('//android.widget.TextView[@text="Pro Shop Order"]');
    }

    public get userName () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/menu_item_username"]');
    }

    //methods
    public async openNav () {
        await this.navDrawer.click();
    }

}

export default new ProshopPage();