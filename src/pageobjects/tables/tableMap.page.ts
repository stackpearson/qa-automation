import { $, browser } from '@wdio/globals'
import Page from '../page';

type Coordinates = {x: number; y: number}
type TableMap = {
    [courseName: string]: {
        [tableNumber: string]: Coordinates
    }
};

class TableMapPage extends Page {
    //selectors
    public quickOrderButton() {
        return $('//android.widget.Button[@resource-id="tenfore.birdie:id/artbls_btnQuickOrder"]');
    }


    

    //methods

    public async tapTable(courseName: 'schuleOaks' | 'dunes', tableNumber: number) {
        const tableCoordinates: TableMap = {

            'schuleOaks': {
                11 : {x: 405, y: 315},
                12: {x:581, y:319}
            },

            'dunes' : {
                1: {x: 100, y: 100}
            }
        }
        
        const coordinates = tableCoordinates[courseName]?.[tableNumber]
        await this.quickOrderButton().isEnabled();

        if(!coordinates) {
            throw new Error(`Coordinates for ${courseName} = ${tableNumber} are not found.`)
        }

        await (browser as any).action('pointer', {
            parameters: { pointerType: 'touch'},
        })
            .move({ x: coordinates.x, y: coordinates.y})
            .down()
            .pause(100)
            .up()
            .perform();
    }


}

export default new TableMapPage();