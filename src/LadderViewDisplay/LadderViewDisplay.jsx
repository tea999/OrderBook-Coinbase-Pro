import {useEffect, useState} from 'react';
import './LadderViewDisplay.css'
function LadderViewDisplay(props){
    const [asksRows,setAsksRows] = useState([]);
    const [bidsRows, setBidsRows] = useState([]);
    const [spread, setSpread] = useState(0);

    let aggregation = props.aggregation;

    useEffect(() =>{
    //logic for grouping
    function roundToPriceAggregation(price, aggregation){
        return Math.floor(price/aggregation) * aggregation;
    }
    
    function priceGrouping(levelsArr){
        //levelsArr could be  asksArr or bid arr
        const filteredLevelsObj = {};
        levelsArr.forEach(level => {
            const price = level[0];
            const size = level[1];
            if (filteredLevelsObj.hasOwnProperty(price)){
                let addSizes = filteredLevelsObj[price] + size;
                filteredLevelsObj[price] = Number.parseFloat(addSizes).toFixed(8)
            }else{
                filteredLevelsObj[price] = Number.parseFloat(size).toFixed(8);
            }
        });
        return Object.entries(filteredLevelsObj);
    }

    // will group level by prices based on aggregation set
    function groupByAggregation(levelsArr, aggregation){
        const roundAllPrices = levelsArr.map(level => {
            const roundedPrice = roundToPriceAggregation(level[0], aggregation)
            // type coercion occurred and roundedPrice aka price is now a number. This is ok. Converted level[1] to a number so it can be added in priceGrouping
            return [(roundedPrice).toFixed(2), +level[1]]
        });
        return priceGrouping(roundAllPrices)
    }

    function makeTableRows(levelsArr, transactionType){
        let colored = {color:'green'}
        if (transactionType === 'asks'){
            levelsArr.reverse();
            colored = {color:'red'}
        }
        return levelsArr.map((level, index) => {
            const price = level[0];
            const size = level[1];
            return(
                <tr key={index.toString()}>
                    <td>{size}</td>
                    <td style={colored}>{price}</td>
                </tr>
            )
    })
}

        const groupedAsksArr = groupByAggregation(props.asksArr, aggregation)
        const groupedBidsArr = groupByAggregation(props.bidsArr,aggregation)        
        const asksRows = makeTableRows(groupedAsksArr.slice(0,10), 'asks');
        const bidsRows = makeTableRows(groupedBidsArr.slice(0,10), 'bids');
        setAsksRows(asksRows);
        setBidsRows(bidsRows);

    },[props.asksArr, props.bidsArr, aggregation])

    return (        
        <div className="ladderviewdisplay-tables">
            <table className="ladderviewdisplay-table-box">
                <thead >
                <tr>
                    <th >
                        Market Size
                    </th>
                    <th>
                        Price (USD)
                    </th>
                </tr>
                </thead>
                <tbody >
                    {asksRows}
                </tbody>
                <thead >
                    <tr>
                        <th>
                            USD Spread
                        </th>
                        <th>
                            {spread}
                        </th>
                    </tr>
                </thead>
                <tbody >
                    {bidsRows}
                </tbody>
            </table>
        </div>
    )
}

export default LadderViewDisplay;