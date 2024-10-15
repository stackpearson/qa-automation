import { browser } from '@wdio/globals';

/**
* main page object containing all methods, selectors, and functionality
* that is shared across all page objects for a mobile app
*/
export default class Page {
    /**
    * Opens the app or navigates to a specific section
    * Mobile apps usually open directly, so you can define navigation by interacting with elements.
    */
    // public open () {
    //     return browser.startActivity({
    //         appPackage: 'com.tenfore.birdie',// Replace with your app's package
    //         appActivity: 'com.tenfore.birdie.ActivityLoginPin', // Replace with your main activity
    //     });
    // }

    /**
    * Sample method to interact with an element in the app
    * @param elementSelector selector for the element to interact with
    */
    public clickElement (elementSelector: string) {
        return $(elementSelector).click(); // Replace with your mobile-specific selector
    }

    public scrollToElement (strategy_text: string, selector_text: string) {
        (browser as any).execute('mobile: scroll', { strategy: `${strategy_text}`, selector: `${selector_text}` });
    }

}




