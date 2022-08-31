import {useEffect, useState} from 'react';

function LadderViewDisplay(props){
    const [asksRows,setAsksRows] = useState([]);
    const [bidsRows, setBidsRows] = useState([]);
    const [increment, setIncrement] = useState(.50);
    const [spread, setSpread] = useState(0);

    useEffect(() =>{
    //logic for grouping
    function roundToPriceIncrement(price, increment){
        return Math.floor(price/increment) * increment;
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

    // will group level by prices based on increment set
    function groupByIncrement(levelsArr, increment){
        const roundAllPrices = levelsArr.map(level => {
            const roundedPrice = roundToPriceIncrement(level[0], increment)
            // type coercion occurred and roundedPrice aka price is now a number. This is ok. Converted level[1] to a number so it can be added in priceGrouping
            return [(roundedPrice).toFixed(2), +level[1]]
        });
        return priceGrouping(roundAllPrices)
    }

    function makeTableRows(levelsArr, aksOrBids){
        if (aksOrBids === 'asks'){
            levelsArr.reverse();
        }
        return levelsArr.map((level, index) => {
            const price = level[0];
            const size = level[1];
            return(
                <tr key={index.toString()}>
                    <td>{size}</td>
                    <td>{price}</td>
                </tr>
            )
    })

}



        const groupedAsksArr = groupByIncrement(props.asksArr, increment)
        const groupedBidsArr = groupByIncrement(props.bidsArr,increment)        
        const asksRows = makeTableRows(groupedAsksArr.slice(0,10), 'asks');
        const bidsRows = makeTableRows(groupedBidsArr.slice(0,10), 'bids');
        setAsksRows(asksRows);
        setBidsRows(bidsRows);

    },[props.asksArr, props.bidsArr, increment])

    //TO DO - make button for grouping increments 
    // increments - .01, .50, 1, 2.5 
    return (
        <table id="ladderview">
            <thead>
            <tr>
                <th>
                    Market Size
                </th>
                <th>
                    Price (USD)
                </th>
            </tr>
        </thead>
        <tbody id="askrows">
            {asksRows}
        </tbody>
        <thead>
            <tr>
                <th>
                    USD Spread
                </th>
                <th>
                    {spread}
                </th>
            </tr>
        </thead>
        <tbody id="bidrows">
            {bidsRows}
        </tbody>
        </table>
    )
}

export default LadderViewDisplay;