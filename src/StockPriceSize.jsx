import { useState, useEffect, useRef } from 'react';
import LineChartDisplay from './LineChart';

function SockPriceSize(props){
    const [bestBidPrice, setBestBidPrice] = useState("");
    const [bestBidQty, setBestBidQty] = useState("");
    const [bestAskPrice, setBestAskPrice] = useState("");
    const [bestAskQty, setBestAskQty] = useState("");
    const [data, setData] = useState([]);
    const [isPaused, setIsPaused] = useState(false);
    const webSocket = useRef(null)
    const [bidsArr, setBidsArr] = useState([]);
    const [asksArr, setAsksArr] = useState([]);
    const [delay, setDelay] = useState(5000);

    // to open websocket and send requst 
    useEffect(() => {
        //empty out arrays if there is a currency change
        setBidsArr([])
        setAsksArr([])
        setData([])
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
// if props currency changes empty the arrays and data sets

    // to handle the incoming messagess/grab all data
    useEffect(() => {
        if (!webSocket.current) return;
        webSocket.current.onmessage = (e) => {
            if (isPaused) {
                return;
            };
            const msg = JSON.parse(e.data);
            // is this the first time we are collecting data
            if (msg.type === 'snapshot'){
                setBestBidPrice(msg.bids[0][0]);
                setBestBidQty(msg.bids[0][1]);
                setBestAskPrice(msg.asks[0][0]);
                setBestAskQty(msg.asks[0][1]);
                // since snapshot is first, it will be the baseline of bidsArr,asksArr, and data array
                setBidsArr(msg.bids);
                setAsksArr(msg.asks);
                const time = new Date();
                const [hour, minutes, seconds] = [time.getHours(), time.getMinutes(), time.getSeconds()]
                const dataObj = {
                    bidPrice: msg.bids[0][0],
                    askPrice: msg.asks[0][0],
                    time: `${hour}:${minutes}:${seconds}`
                };
                setData(() => [dataObj])

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
                            setBidsArr(bidsArr.filter(bid => bid[0] !== price))
                        }else {
                            setBidsArr(bids => [...bids, [price, size]])
                        }
                    }else {
                        // you have a "sell"
                        if (size === "0.00000000"){
                            setAsksArr(asksArr.filter(ask => ask[0] !== price))
                        }else {
                            setAsksArr(asks => [...asks, [price,size]])
                        }
                    }
                }
            }
        
        }
    },[isPaused, props.currency])

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
        // sort both arrays based off of highest bid and lowest ask prices     
        bidsArr.sort((a,b) => b[0] - a[0])
        asksArr.sort((a,b) => a[0] - b[0])

        // update best bid and ask states
        setBestBidPrice(bidsArr[0][0]);
        setBestBidQty(bidsArr[0][1]);
        setBestAskPrice(asksArr[0][0]);
        setBestAskQty(asksArr[0][1]);
        // eventually pass best bid, best ask (prices), and time to line graph as data
        //Question - should I use current time or trade time? Also, how do I get this to update like every 15sec starting from 00 to 15 to 30 to 45 or is this a feature of the line graph/rechart library?
        const time = new Date();
        const [hour, minutes, seconds] = [time.getHours(), time.getMinutes(), time.getSeconds()]
        const dataObj = {
            bidPrice: bestBidPrice,
            askPrice: bestAskPrice,
            time: `${hour}:${minutes}:${seconds}`
        };
        setData(prevdata => [...prevdata, dataObj])
        // console.log('bidsArr.length', bidsArr.length)

    }, !isPaused ? delay : null);

    function handlePause(){
        !isPaused ? setIsPaused(true) : setIsPaused(false);
    }

    return( 
        <div>
            <button onClick={handlePause}>
                {isPaused ? "Continue Data Feed" : "Stop Data Feed"}
            </button>
            <div>
                <ul>Best Bid price {bestBidPrice}</ul>
                <ul>Best Bid Qty {bestBidQty}</ul>
                <ul>Best Ask Price {bestAskPrice}</ul>
                <ul>Best Ask Qty {bestAskQty}</ul>
            </div>
            <div>
                <LineChartDisplay currency={props.currency} data={data}/>
            </div>
        </div>
    );
}
export default SockPriceSize;

