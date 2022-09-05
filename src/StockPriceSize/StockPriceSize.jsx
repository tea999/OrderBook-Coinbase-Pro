import { useEffect, useRef } from 'react';
import './StockPriceSize.css';

function StockPriceSize(props){
    const webSocket = useRef(null)

    // to open websocket and send requst 
    useEffect(() => {
        //empty out arrays if there is a currency change
        props.emptyArrays();
        webSocket.current = new WebSocket("wss://ws-feed.exchange.coinbase.com");
        const request = {
            "type" : "subscribe",
            "product_ids" : [
                props.currency
            ],
            "channels" : ["level2"]
        }

        webSocket.current.onopen = () => {
            webSocket.current.send(JSON.stringify(request));
            console.log('webSocket opened');
        }
        webSocket.current.onclose = () => console.log("closed connection")

        webSocket.onerror = (e) => console.log('Websocket error:', e)

        // put the websocket in a new variable for cleanup so it cant be mutated accidentally
        const webSocketCurrent = webSocket.current;
        return () => {
            webSocketCurrent.close()
        }
    }, [props.currency])
    // to handle the incoming messagess/grab all data
    useEffect(() => {
        if (!webSocket.current) return;
        webSocket.current.onmessage = (e) => {
            if (props.isPaused) {
                return;
            };
            const msg = JSON.parse(e.data);
            // is this the first time we are collecting data
            if (msg.type === 'snapshot'){
                props.handleSnapshotData(msg)
            }
            if (msg.type === "l2update"){
                // iterate through changes
                for (let i = 0; i < msg.changes.length; i++){
                    const transactionType = msg.changes[i][0]
                    const price = msg.changes[i][1];
                    const size = msg.changes[i][2];
                    if (transactionType === "buy"){
                        // eliminate trades with size 0
                        if (size === "0.00000000"){
                            // filter out that price,size
                            props.filterBidsArr(price);
                        }else {
                           // will update size or push to bidsArr
                            props.updateLevels(price,size, 'bids')
                        }
                    }else {
                        // you have a "sell"
                        if (size === "0.00000000"){
                            props.filterAsksArr(price);
                        }else {
                            props.updateLevels(price,size, 'asks')
                        }
                    }
                }
            }
        
        }
    },[props.isPaused, props.currency])

    // creating custom callback since setInterval is rendering incorrectly
    function useInterval(callback,delay){
        const savedCallback = useRef();
        useEffect (() => {
            savedCallback.current = callback;
        },[callback]);

        useEffect(() => {
            function sortData(){
                savedCallback.current();
            }
            // if delay is not null ok to setup
            if(delay !== null){
                let id = setInterval(sortData, delay);
                return () => clearInterval(id);
            }
        },[delay])
    }

    useInterval(() => {
        // sort both arrays based off of highest bid and lowest ask prices AND update best bid and best ask states
        props.setBestAfterSort()
        const time = new Date();
        const [hour, minutes, seconds] = [time.getHours(), time.getMinutes(), time.getSeconds()]
        const dataObj = {
            bidPrice: Number(props.bestBidPrice),
            askPrice: Number(props.bestAskPrice),
            time:`${hour}:${minutes}:${seconds}`
        }; 
        props.setGraphDataAfterSort(dataObj);
    }, !props.isPaused ? props.delay : null);


    return( 
        <div>
            <button onClick={props.handlePause}>
                {props.isPaused ? "Continue Data Feed" : "Stop Data Feed"}
            </button>
            <div className='Stockpricesize-container'>
                <div className='Stockpricesize-best-bid'>
                    <div className='Stockpricesize-name'>
                        Best Bid
                    </div> 
                    Price 
                    <div className='Stockpricesize-numbers'>
                    {props.bestBidPrice}
                    </div>
                    Quantity 
                    <div className='Stockpricesize-numbers'>
                        {props.bestBidQty}
                    </div>
                </div>
                <div className='Stockpricesize-best-ask'>
                    <div className='Stockpricesize-name'> 
                        Best Ask
                    </div>
                        Price 
                    <div className='Stockpricesize-numbers'>
                        {props.bestAskPrice}
                    </div>
                    Quantity 
                    <div className='Stockpricesize-numbers'>
                        {props.bestAskQty}
                    </div>
                </div>
            </div>  
        </div>
    );
}
export default StockPriceSize;

//Question - should I use current time or trade time? Also, how do I get this to update like every 15sec starting from 00 to 15 to 30 to 45 or is this a feature of the line graph/rechart library?
