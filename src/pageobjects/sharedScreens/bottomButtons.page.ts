import { $ } from '@wdio/globals'
import Page from '../page';

class BottomButtonsPage extends Page {
    //selectors
    public applyPaymentButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnApplyPayment"]');
    }
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

    public async tapPayButton() {
        await this.payButton().waitForEnabled();
        await this.payButton().click();
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