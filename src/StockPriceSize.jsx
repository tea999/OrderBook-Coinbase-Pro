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

    // to open websocket and send requst
    setInterval(
    useEffect(() => {
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
    ,5000)


    // to handle the incoming messages 
    // setInterval(
    useEffect(() => {
        if (!webSocket.current) return;
        webSocket.current.onmessage = (e) => {
            if (isPaused) {
                return
            };
            const msg = JSON.parse(e.data);
            // every 15 sec get data get a snapshot or data update
            if (msg.type === 'snapshot'){
                const bestBidPrice = msg.bids[0][0]
                const bestBidQty = msg.bids[0][1];
                const bestAskPrice = msg.asks[0][0];
                const bestAskQty = msg.asks[0][1];
                const time = new Date();
                const [hour, minutes, seconds] = [time.getHours(), time.getMinutes(), time.getSeconds()]
                const bidData = {
                    transactionType: "bid",
                    price: bestBidPrice,
                    time: `${hour}:${minutes}:${seconds}`
                };
                const askData = {
                    transactionType: "ask",
                    price: bestAskPrice,
                    time: `${hour}:${minutes}:${seconds}`
                };
                setBestBidPrice(bestBidPrice);
                setBestBidQty(bestBidQty);
                setBestAskPrice(bestAskPrice);
                setBestAskQty(bestAskQty);
                setData(prevData => [...prevData, bidData, askData])
            } 
            
        }
    },[isPaused, props.currency])
    // ,5000)


        
    

    console.log(data)
    return( 
        <div>
            <button onClick={() => setIsPaused(!isPaused)}>
                {isPaused ? "Continue Data Feed" : "Stop Data Feed"}
            </button>
            <div>
                <ul>Best Bid price {bestBidPrice}</ul>
                <ul>Best Bid Qty {bestBidQty}</ul>
                <ul>Best Ask Price {bestAskPrice}</ul>
                <ul>Best Ask Qty {bestAskQty}</ul>
            </div>
            <div>
                {/* <LineChartDisplay currency={props.currency} data={data}/> */}
            </div>
        </div>
    );
}
export default SockPriceSize;