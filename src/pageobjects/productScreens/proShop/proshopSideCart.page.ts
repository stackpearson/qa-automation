import { $, driver } from '@wdio/globals'
import Page from '../../page';
import { touchAction } from 'webdriverio/build/commands/browser';


class ProshopSideCartPage extends Page {
    //selectors
    public emptyCartDialog () {
        return $('//android.widget.TextView[@text="No items in order."]');
    }
    public async productByName (name: string) {
        return $(`//android.widget.TextView[@resource-id="tenfore.birdie:id/tvProductName" and @text="${name}"]`);
        //android.widget.TextView[@resource-id="tenfore.birdie:id/tvProductName"]
        
    }

    //methods
    public async addToCart(name: string) {
       const itemToAdd = await this.productByName(name);
       itemToAdd.click();
    }

    public async modifyCartItem(name: string, action: 'Discount' | 'Edit' | 'Reward!' | 'Delete') {
        const itemToModify = await this.productByName(name);
        await itemToModify.waitForDisplayed({timeout: 5000});

        await driver.action('pointer', {
            parameters: {pointerType: 'touch'}
        })
        .move({origin: itemToModify})
        .down()
        .pause(2000)
        .up()
        .perform();

        const optionSelector = `//android.widget.TextView[@resource-id="android:id/title" and @text="${action}"]`;
        const optionToSelect = $(optionSelector);
        await optionToSelect.click();
    }

}

export default new ProshopSideCartPage();