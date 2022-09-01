import './CurrencyDropDown.css';
function CurrencyDropDown(props){

    return (
        <div >
            <label for="currency">
                Select a Currency Pair:
            </label>
            <select className="currencydropdown-selection" value={props.currency} onChange={props.handleChange}>
                <option value="BTC-USD">BTC-USD</option>
                <option value="ETH-USD">ETH-USD</option>
                <option value="LTC-USD">LTC-USD</option>
                <option value="BCH-USD">BCH-USD</option>
            </select>
        </div>
    )
}
export default CurrencyDropDown;