import { useEffect } from "react";

function AggregationDropDrown(props){

    // aggregations - .01, .50, 1, 2.5 
    useEffect(() =>{
        props.resetAgg()
    }, [props.currency])

    return (
        
            <label for="aggregation">
                Aggregation:
                <div >
                    <select className="aggdropdown-selection" value={props.aggregation}
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
            </label>
       
    )
}

export default AggregationDropDrown;