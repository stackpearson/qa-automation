import { $ } from '@wdio/globals'
import Page from '../page';

class CheckPayment extends Page {
    //selectors
    public get checkAmountField () {
        return $('//android.widget.EditText[@resource-id="tenfore.birdie:id/fpspc_etCheckAmount"]')
    }
    public checkNumberTextField () {
        return $('id:tenfore.birdie:id/fpspc_etCheckNumber');
    };

    public errorDialog () {
        return $('//android.widget.TextView[@resource-id="tenfore.birdie:id/tvStatusError"]');
    };

    public get closeErrorButton () {
        return $('//android.widget.ImageButton[@resource-id="tenfore.birdie:id/btnCloseError"]');
    }

    //methods
    public async addCheckNumber (checkNumber: string) {
        await this.checkNumberTextField().setValue(checkNumber)
    };

    public async dismissError () {
        await this.closeErrorButton.click();
    }

    public async splitCheckAmount(divider: number) {
        const initialAmountText = await this.checkAmountField.getText();
        const initialAmount = parseFloat(initialAmountText.replace('$', ''));
    
        // Step 2: Perform the calculations
        const newAmount1 = (initialAmount / divider).toFixed(2);
        const newAmount2 = (initialAmount - parseFloat(newAmount1)).toFixed(2);
    
        // Step 3: Return both new amounts
        return { newAmount1, newAmount2 };
    }

}

export default new CheckPayment();