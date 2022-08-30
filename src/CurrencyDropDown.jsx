import { useState } from 'react';
import StockPriceSize from './StockPriceSize';

function CurrencyDropDown(props){

    return (
        <div id="currencydropdown">
            <label>
                Select a Currency Pair:
                <select value={props.currency} onChange={props.handleChange}>
                    <option value="BTC-USD">BTC-USD</option>
                    <option value="ETH-USD">ETH-USD</option>
                    <option value="LTC-USD">LTC-USD</option>
                    <option value="BCH-USD">BCH-USD</option>
                </select>
            </label>
        </div>
    )
}
export default CurrencyDropDown;