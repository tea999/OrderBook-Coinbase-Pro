import { useState, useEffect, useRef } from 'react';
import LineChartDisplay from './LineChart';

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
// if props currency changes empty the arrays and data sets

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
                            props.pushToBidsArr(price,size);
                        }
                    }else {
                        // you have a "sell"
                        if (size === "0.00000000"){
                            props.filterAsksArr(price);
                        }else {
                            props.pushToAsksArr(price,size)
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
        // sort both arrays based off of highest bid and lowest ask prices     
        props.bidsArr.sort((a,b) => b[0] - a[0]);
        props.asksArr.sort((a,b) => a[0] - b[0]);

        // update best bid and best ask states
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
            <div>
                <ul>Best Bid price {props.bestBidPrice}</ul>
                <ul>Best Bid Qty {props.bestBidQty}</ul>
                <ul>Best Ask Price {props.bestAskPrice}</ul>
                <ul>Best Ask Qty {props.bestAskQty}</ul>
            </div>


        </div>
    );
}
export default StockPriceSize;

//Question - should I use current time or trade time? Also, how do I get this to update like every 15sec starting from 00 to 15 to 30 to 45 or is this a feature of the line graph/rechart library?
