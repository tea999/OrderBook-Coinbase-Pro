import './CurrencyDropDown.css';
function CurrencyDropDown(props){

    return (
        <div className='currencydropdown-box'>
           <div id="currencydropdown-currency">
                Select a Currency Pair
            </div>
            <div>
                <select className="currencydropdown-selection" value={props.currency} onChange={props.handleChange}>
                    <option value="BTC-USD">BTC-USD</option>
                    <option value="ETH-USD">ETH-USD</option>
                    <option value="LTC-USD">LTC-USD</option>
                    <option value="BCH-USD">BCH-USD</option>
                </select>
            </div>
        </div>
    )
}
export default CurrencyDropDown;