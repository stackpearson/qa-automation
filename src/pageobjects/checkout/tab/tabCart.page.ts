import { $ } from '@wdio/globals'
import Page from '../../page';

class TabCartPage extends Page {
    //selectors
    public async productByName (name: string) {
        return $(`//android.widget.TextView[@resource-id="tenfore.birdie:id/tvProductName" and @text="${name}"]`);
        
    }

    public get totalOwedText () {
        return $('//android.widget.TextView[@resource-id="tenfore.birdie:id/frpsum_tvAmountOwed"]');
    }

    //methods

    public async splitOrderAmount(divider: number) {
        const initialAmountText = await this.totalOwedText.getText();
        const initialAmount = parseFloat(initialAmountText.replace('$', ''));
    
        // Step 2: Perform the calculations
        const newAmount1 = (initialAmount / divider).toFixed(2);
        const newAmount2 = (initialAmount - parseFloat(newAmount1)).toFixed(2);
    
        // Step 3: Return both new amounts
        return { newAmount1, newAmount2 };
    }


}

export default new TabCartPage();