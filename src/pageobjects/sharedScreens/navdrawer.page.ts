import { $ } from '@wdio/globals'
import Page from '../page';

class NavDrawer extends Page {
    public get logoutButton () {
        return $('id:tenfore.birdie:id/nav_log_out');
    };

    public get proshopButton () {
        return $('//android.widget.CheckedTextView[@resource-id="tenfore.birdie:id/design_menu_item_text" and @text="Pro Shop"]');
    }

    //methods

    public async clickProshopButton () {
        await this.proshopButton.click();
    }

    public async logout () {
        this.scrollToElement('accessibility id', 'tenfore.birdie:id/nav_log_out')
        await this.logoutButton.click();
    };

}

export default new NavDrawer();