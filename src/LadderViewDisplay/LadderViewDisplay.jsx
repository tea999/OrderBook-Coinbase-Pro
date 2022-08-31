// will take the bidsArr and asksArr after they are sorted. These are the queues

function LadderViewDisplay(props){
    const askArr = props.asksArr;
    const bidsArr = props.bidsArr.slice(0,20);


    // TODO - add bidsRows table

    //logic for grouping
    
    // increments - .01, .50, 1, 2.5 
    function roundToPriceIncrement(price, increment){
        return Math.floor(price/increment) * increment;
    }
    

    function priceGrouping(levelsArr){
       //levelsArr could be  asksArr or bid arr
       const makeLevels = levelsArr.map((level, index) => {
        // level = [price, size]
            const nextLevel = levelsArr[index + 1];
            const prevLevel = levelsArr[index - 1];
            // if prices are the same then combine sizes
            if (nextLevel && level[0] === nextLevel[0]){
                return [level[0], level[1] + nextLevel[1]]
                // if curr price same as prev price then return empty array
            }else if (prevLevel && level[0] === prevLevel[0]){
                return [];
            }else {
                return level;
            }
       })
       // remove the empty arrays
       const filterLevels = makeLevels.filter(element => element.length >0)
       return filterLevels
    }

    function groupByIncrement(levelsArr, increment){
        const roundAllPrices = levelsArr.map(level => {
            const roundedPrice = roundToPriceIncrement(level[0], increment)
            return [roundedPrice, level[1]]
        });
        return priceGrouping(roundAllPrices)
    }

    const groupedAskArr = groupByIncrement(askArr)
    // TODO? slicing here to control length of array


    const askRows = askArr.map((ask, index) => {
        const price = ask[0];
        const size = ask[1];
    return(
        <tr key={index.toString()}>
            <td>{size}</td>
            <td>{price}</td>
        </tr>
    )
    }) 
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
        <tbody>
            {askRows.reverse()}
        </tbody>
        </table>
    )
}

export default LadderViewDisplay;