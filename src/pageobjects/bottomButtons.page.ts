import { $ } from '@wdio/globals'
import Page from './page';

class BottomButtonsPage extends Page {
    //selectors
    public combosButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnCombos"]')
    }

    public customerButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnPlayerSearch"]');
    }

    public orderNotesButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/apsp7_btnOrderNotes"]');
    }

    public payButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnApplyPayment"]')
    } 

    public popButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnPopTill"]');
    }

    public proShopButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/apsp7_btnProShop"]');
    }

    public resetButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnResetOrder"]');
    }

    public teeSheetButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnTeeSheet"]');
    }

    //methods
    public async tapCombosButton() {
        const button = this.combosButton();
        button.click();
    }

    public async tapCustomerButton() {
        const button = this.customerButton();
        button.click();
    }

    public async tapOrderNotesButton() {
        const button = this.orderNotesButton();
        button.click();
    }

    public async tapPayButton() {
        const button = this.payButton();
        button.click();
    }

    public async tapProShopButton() {
        const button = this.proShopButton();
        button.click()
    }

    public async tapResetButton() {
        const button = this.resetButton();
        button.click();
    }

    public async tapTeeSheetButton() {
        const button = this.teeSheetButton();
        button.click();
    }

}

export default new BottomButtonsPage();