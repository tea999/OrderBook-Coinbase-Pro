import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianAxis } from "recharts";
// promtp want to display current price on y axis and time on x axis
//TODO - get the line graph to render data points
function LineChartDisplay(props){
    let min = Math.min(props.data.bidPrice, props.data.askPrice);
    let max = Math.min(props.data.bidPrice, props.data.askPrice)

    function tick(time){
        //hh:mm:ss

    }
    return (
        <div id='linechart'>
            <LineChart width={1000} height={500} data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianAxis strokeDasharray="3 3" />
                <XAxis dataKey='time' 
                />
                <YAxis  type='number' domain={[min - min/2, max + max/2]} />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='askPrice' stroke="#FF0000" />
                <Line type='monotone' dataKey='bidPrice' stroke="#008000" />
            </LineChart>
        </div>
    )
}
export default LineChartDisplay;

