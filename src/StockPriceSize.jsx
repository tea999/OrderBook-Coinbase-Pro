import { useState, useEffect } from 'react';
import LineChartDisplay from './LineChart';

function SockPriceSize(props){
    const [bestBidPrice, setBestBidPrice] = useState("");
    const [bestBidQty, setBestBidQty] = useState("");
    const [bestAskPrice, setBestAskPrice] = useState("");
    const [bestAskQty, setBestAskQty] = useState("");
    const [data, setData] = useState([]);


    
    useEffect(() => {
           const webSocket = new WebSocket("wss://ws-feed.exchange.coinbase.com");

           const request = {
            "type" : "subscribe",
            "product_ids" : [
                props.currency
            ],
            "channels" : ["level2"]
        }
        webSocket.onopen = (e) => {
            webSocket.send(JSON.stringify(request))
        };

        webSocket.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.type === 'snapshot'){
                const bestBidPrice = msg.bids[0][0]
                const bestBidQty = msg.bids[0][1];
                const bestAskPrice = msg.asks[0][0];
                const bestAskQty = msg.asks[0][1];
                setBestBidPrice(bestBidPrice);
                setBestBidQty(bestBidQty);
                setBestAskPrice(bestAskPrice);
                setBestAskQty(bestAskQty);
            } 
            if (msg.type === 'l2update' && msg.product_id === props.currency){
            // grab the time and the price and buy or sell 
                for (let i = 0; i < msg.changes.length; i++){
                   const dataObj = {
                    transactionType: "",
                    price: 0,
                    time: 0
                } ;
                dataObj.transactionType = msg.changes[i][0];
                dataObj.price = msg.changes[i][1];
                //converting date string to a timestamp
                dataObj.time = Date.parse(msg.time)/1000;
                //add each obj to the array
                setData(data => [...data, dataObj])
            }   
            }
        }

        webSocket.onerror = (e) => {
            console.log('Websocket error:', e)
        }

        // DO we need to close websocket??? Maybe when we change the request or close the window
        // return () => {
        //     webSocket.close();
        // }
    },[props.currency])

    return( 
        <div>
            <ul>Best Bid price {bestBidPrice}</ul>
            <ul>Best Bid Qty {bestBidQty}</ul>
            <ul>Best Ask Price {bestAskPrice}</ul>
            <ul>Best Ask Qty {bestAskQty}</ul>
        <div>
            <LineChartDisplay currency={props.currency} data={data}/>
        </div>
        </div>
    );
}
export default SockPriceSize;