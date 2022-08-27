import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
// promtp want to display current price on y axis and time on x axis
function LineChartDisplay(props){
    const [data, setData] = useState([]);



    // useEffect(() =>{
    //         const webSocket = new WebSocket("wss://ws-feed.exchange.coinbase.com")
    //         const request = {
    //         "type" : "subscribe",
    //         "product_ids" : [
    //             props.currency
    //         ],
    //         "channels" : ["level2"]
    //     }
    //     webSocket.onopen = (e) => {
    //         webSocket.send(JSON.stringify(request))
    //     };

    //     webSocket.onmessage = (e) => {
    //         const msg = JSON.parse(e.data);
    //         if (msg.type === 'l2update'){
    //             // grab the time and the price and buy or sell               
    //                 for (let i = 0; i < msg.changes.length; i++){
    //                    const dataObj = {
    //                     transactionType: "",
    //                     price: 0,
    //                     time: 0
    //                 } ;
    //                 dataObj.transactionType = msg.changes[i][0];
    //                 dataObj.price = msg.changes[i][1];
    //                 //converting date string to a timestamp
    //                 dataObj.time = Date.parse(msg.time);
    //                 //add each obj to the array
    //                 setData(data => [...data, dataObj])
    //             }   
    //             }
    //     }
    // })


    return (
        <div>
            <LineChart 
                width={400}
                height={400}
                // data to be determined
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="1" />
                <XAxis dataKey="time" />
                <YAxis dataKey="price"/>
                <Tooltip />
                <Legend />
                <Line name="Bids" type="monotone" dataKey="buy" stroke="#8884d8" />
                <Line name="Asks" type="monotone" dataKey="sell" stroke="#82ca9d" />
            </LineChart>
        </div>
    )
}

export default LineChartDisplay;