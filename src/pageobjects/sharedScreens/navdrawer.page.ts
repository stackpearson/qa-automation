import { $ } from '@wdio/globals'
import Page from './page';

class NavDrawer extends Page {
    public get logoutButton () {
        return $('id:tenfore.birdie:id/nav_log_out');
    };

    public async logout () {
        await this.scrollToElement('accessibility id', 'tenfore.birdie:id/nav_log_out')
        await this.logoutButton.click();
    };

}

export default new NavDrawer();