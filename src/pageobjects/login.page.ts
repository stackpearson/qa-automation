import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get pinField () {
        return $('id:tenfore.birdie:id/etPIN');
    }

    public get signInButton () {
        return $('id:tenfore.birdie:id/btnLogIn');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (pin: number) {
        await this.pinField.setValue(pin);
        await this.signInButton.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open();
    }
}

export default new LoginPage();
