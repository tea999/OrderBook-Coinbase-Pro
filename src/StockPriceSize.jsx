import { useState, useEffect } from 'react';
// this will eventuallly accept a prop that will have product_ids
function SockPriceSize(props){
    const [bestBidPrice, setBestBidPrice] = useState("");
    const [bestBidQty, setBestBidQty] = useState("");
    const [bestAskPrice, setBestAskPrice] = useState("");
    const [bestAskQty, setBestAskQty] = useState("");
    const [bidsArr, setBidsArr] = useState([]);
    const [asksArr, setAsksArr] = useState([]);

    
    const webSocket = new WebSocket("wss://ws-feed.exchange.coinbase.com")
    useEffect(() => {
    // TO DO: this will eventuallly accept a prop that will have product_ids
        const request = {
            "type" : "subscribe",
            "product_ids" : [
                "ETH-USD"
            ],
            "channels" : ["level2"]
        }

        webSocket.onopen = (e) => {
            webSocket.send(JSON.stringify(request))
        };

        webSocket.onmessage = (e) => {
            const msg = JSON.parse(e.data)
            console.log(msg);
            // setPrice(msg.time)
        }

        webSocket.onerror = (e) => {
            console.log('Websocket error:', e)
        }

        // DO we need to close websocket??? Maybe when we change the request or close the window

        // TO DO access the prices from the response
        
    })

    return(
        <div>
            Price 
            Size 
        </div>
    );
}
export default SockPriceSize;