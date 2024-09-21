import loginPage from '../src/pageobjects/login.page';

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await loginPage.pinField.isDisplayed();
        console.log('see pin field')

        await loginPage.signInButton.isDisplayed();
        console.log('see sign in button')

        await loginPage.login(2785);
    })
})