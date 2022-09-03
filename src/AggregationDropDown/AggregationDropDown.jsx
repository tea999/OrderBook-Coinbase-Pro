import { useEffect } from "react";
import '../LadderViewDisplay/LadderViewDisplay.css'


function AggregationDropDrown(props){

    // aggregations - .01, .50, 1, 2.5 
    useEffect(() =>{
        props.resetAgg()
    }, [props.currency])

    return (
        <div className="ladderviewdisplay-tables">
            <div id="aggregationdropdown-orderbook">
                Order Book
            </div>  
            <div id="aggregationdropdown-label" >
                Aggregation
            </div>
            <div>
                <select id="aggregationdropdown-selection" value={props.aggregation}
                onChange={props.changeAgg}>
                    <option value={.01}>
                        .01
                    </option>
                    <option value={.50}>
                        .50
                    </option>
                    <option value={1}>
                        1
                    </option>
                    <option value={2.5}>
                        2.5
                    </option>
                </select>  
            </div>
        </div>
    )
}

export default AggregationDropDrown;