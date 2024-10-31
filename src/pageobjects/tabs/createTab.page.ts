import { $, browser } from '@wdio/globals'
import Page from '../page';

class CreateTabPage extends Page {
    //selectors
    public get authorizeCardButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnAuthorizeCard"]');
    };

    public get customerSearchBar () {
        return $('//android.widget.AutoCompleteTextView[@resource-id="tenfore.birdie:id/etCustomerLookup"]');
    };

    public get searchLoadingSpinner () {
        return $('//android.widget.ProgressBar[@resource-id="tenfore.birdie:id/pb_loading_indicator"]')
    }

    public get useSavedCardButton () {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/btnApplyCredit"]');
    }


    //methods

    /**
     * From the main tabs menu, this function will create a tab for the user you input.
     * 
     * @param customer the exact email for a valid customer whom  you want to create a tab for
     * @param savedCard true if this customer has a saved card on file you want to use, false if you want to scan a card to use
     */

    public async startTab (customerEmail: string, savedCard: boolean) {
        await this.customerSearchBar.click();
        await this.customerSearchBar.setValue(customerEmail);
        await this.searchLoadingSpinner.waitForDisplayed({timeout: 1000})
        await this.searchLoadingSpinner.waitForDisplayed({reverse: true, timeout: 5000})
        await this.tapTabSearchResult();

        if (savedCard) { 
            try {
                await this.useSavedCardButton.waitForEnabled({ timeout: 1000 });
                await this.useSavedCardButton.click();
            } catch (error) {
                console.error('Saved Card not available:', error);
            }
        } else {
            await this.authorizeCardButton.waitForEnabled()
            await this.authorizeCardButton.click();
        }
    };

    public async tapTabSearchResult() {
        await (browser as any).action('pointer', {
            parameters: { pointerType: 'touch'},
        })
            .move({ x: 1000, y: 525})
            .down()
            .pause(100)
            .up()
            .perform();
    }

}

export default new CreateTabPage();