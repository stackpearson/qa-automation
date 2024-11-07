import { $ } from '@wdio/globals'
import Page from '../page';

class NavDrawer extends Page {
    public get courtSheetButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_court_sheet"]');
    };

    public get customerSearchButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_customer_search"]');
    };

    public get eosButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_pro_shop_end_of_shift"]');
    };

    public get eventsButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_events"]')
    };

    public get giftCardButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_gift_cards"]');
    };

    public get inventoryButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_inventory"]');
    };

    public get logoutButton () {
        return $('id:tenfore.birdie:id/nav_log_out');
    };

    public get orderLookupButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_order_lookup"]');
    };

    public get ordersAndTipsButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_tips"]');
    };

    public get proshopButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_pro_shop"]');
    };

    public get quickOrderButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_quick_order"]');
    };

    public get reservationButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_restaurant_reservations"]');
    };

    public get settingsButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_settings"]');
    };

    public get tabButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_tabs"]');
    };

    public get tableButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_tables"]');
    };

    public get tableChartButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_table_setup"]');
    };

    public get teeSheetButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_tee_sheet"]');
    };

    public get timeClockButton () {
        return $('//androidx.appcompat.widget.LinearLayoutCompat[@resource-id="tenfore.birdie:id/nav_timeclock"]');
    };

    //methods

    public async clickProshopButton () {
        await this.proshopButton.click();
    };

    public async clickQuickOrderButton() {
        await this.quickOrderButton.click();
    }

    public async clickTabButton() {
        await this.tabButton.click();
    }

    public async clickTableButton() {
        await this.tableButton.click();
    }

    public async clickTeeSheetButton() {
        await this.teeSheetButton.click();
    }

    public async logout () {
        this.scrollToElement('accessibility id', 'tenfore.birdie:id/nav_log_out')
        await this.logoutButton.click();
    };

}

export default new NavDrawer();