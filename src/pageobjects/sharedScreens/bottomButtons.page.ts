import { $ } from '@wdio/globals'
import Page from '../page';

class BottomButtonsPage extends Page {
    //selectors
    public combosButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnCombos"]');
    }

    public customerButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnPlayerSearch"]');
    }

    public orderNotesButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/apsp7_btnOrderNotes"]');
    }

    public payButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnApplyPayment"]');
    } 

    public popButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnPopTill"]');
    }

    public proShopButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/apsp7_btnProShop"]');
    }

    public payButtonQuickPay() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/arqo_btnQuickApplyPayment"]')
    }

    public payButtonTab () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnApplyTabPayment"]')
    }

    public resetButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnResetOrder"]');
    }

    public teeSheetButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnTeeSheet"]');
    }

    //methods
    public async tapCombosButton() {
        await this.combosButton().click();
    }

    public async tapCustomerButton() {
        await this.customerButton().click();
    }

    public async tapOrderNotesButton() {
        await this.orderNotesButton().click();
    }

    public async tapPayButton(button: 'applyPayment' | 'proshop' | 'quickorder' | 'tab' ) {
        const navButtons = {
            applyPayment: this.payButton,
            proshop: this.payButton,
            quickorder: this.payButtonQuickPay,
            tab: this.payButtonTab,
        }

        const buttonToSelect = navButtons[button];
        if (buttonToSelect) {
            const element = buttonToSelect.call(this);
            await element.waitForEnabled({timeout: 5000});
            await element.click();
        }
    }

    public async tapProShopButton() {
        await this.proShopButton().click();
    }

    public async tapResetButton() {
        await this.resetButton().click();
    }

    public async tapTeeSheetButton() {
        await this.teeSheetButton().click();
    }

}

export default new BottomButtonsPage();