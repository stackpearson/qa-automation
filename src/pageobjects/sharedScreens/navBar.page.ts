import { $ } from '@wdio/globals'
import Page from '../page';

class NavBarPage extends Page {
    //selectors
    public get logoutButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/menu_item_log_out"]');
    }

    public get navDrawer () {
        return $('//android.widget.ImageButton[@content-desc="Open navigation drawer"]');
    }
    
    public get proShopTitle () {
        return $('//android.widget.TextView[@text="Pro Shop Order"]');
    }

    public get threeDotsButton() {
        return $('//android.widget.ImageView[@content-desc="More options"]');
    }

    public get userName () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/menu_item_username"]');
    }

    //methods
    public async logOut () {
        await this.logoutButton.click();
    }

    public async tapThreeDots () {
        await this.threeDotsButton.click();
    }

    public async openNav () {
        await this.navDrawer.click();
    }

}

export default new NavBarPage();