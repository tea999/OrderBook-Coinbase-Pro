import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
// promtp want to display current price on y axis and time on x axis
//TODO - get the line graph to render data points
function LineChartDisplay(props){

    // console.log(props.data)
function tick(){

}

    return (
        <div>
            <LineChart width={500} height={300} data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='time' 
                />
                <YAxis  type='number' domain={[props.bidPrice - 50, props.bidPrice + 50]} />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='askPrice' stroke="#82ca9d" />
                <Line type='monotone' dataKey='bidPrice' stroke="#8884d8" />
                
            </LineChart>
        </div>
    )
}

export default LineChartDisplay;

//{bidPrice: 20263.06, askPrice: 20265.01, time: '12:37:24'}