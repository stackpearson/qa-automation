import loginPage from '../src/pageobjects/login.page';

const users = {
    "admin": 2785,
    "employee": 2786,
    "manager": 2789,
};

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await loginPage.pinField.isDisplayed();
        console.log('see pin field')

        await loginPage.signInButton.isDisplayed();
        console.log('see sign in button')

        await loginPage.login(users.admin);
    })
})