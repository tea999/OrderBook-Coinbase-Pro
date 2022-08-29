import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
// promtp want to display current price on y axis and time on x axis
//TODO - get the line graph to render data points
function LineChartDisplay(props){

    console.log(props.data)
    return (
        <div>
            <LineChart width={400} height={400} data={props.data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="1" />
                <XAxis dataKey='time' />
                <YAxis  />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='askPrice' stroke="#82ca9d" />
                <Line type='monotone' dataKey='bidPrice' stroke="#8884d8" />
                
            </LineChart>
        </div>
    )
}

export default LineChartDisplay;

//{bidPrice: '20263.06', askPrice: '20265.01', time: '12:37:24'}