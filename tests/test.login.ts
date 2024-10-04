import loginPage from '../src/pageobjects/login.page';
import proshopPage from '../src/pageobjects/proshop.page';

const userPins = {
    "admin": 2785,
    "employee": 2788,
    "manager": 2789,
};

describe('Basic login & logout', () => {
    it('should login with valid credentials, display correct user name & logout succesfully', async () => {
        await proshopPage.proShopTitle.isDisplayed();
        const userText = await proshopPage.userName.getText();
        expect(userText).toBe('OAKS MANAGER'); //if this fails, make sure to check which user is logging in in wdio.conf.ts before method
    })
})