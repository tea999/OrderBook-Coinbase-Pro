import { useState } from 'react';
import StockPriceSize from './StockPriceSize';

function CurrencyDropDown(){
    const [currency, setCurrency] = useState("BTC-USD");

    // changes currency to currency selected
    function handleChange(e){
        setCurrency(e.target.value);
    }

    return (
        <div>
            <label>
                Select a Currency Pair:
                <select value={currency} onChange={handleChange}>
                    <option value="BTC-USD">BTC-USD</option>
                    <option value="ETH-USD">ETH-USD</option>
                    <option value="LTC-USD">LTC-USD</option>
                    <option value="BCH-USD">BCH-USD</option>
                </select>
            </label>
            <div id='stockprices'>
            <StockPriceSize currency={currency}/>
            </div>
        </div>
    )
}
export default CurrencyDropDown;