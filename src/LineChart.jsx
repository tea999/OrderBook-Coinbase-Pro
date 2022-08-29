import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
// promtp want to display current price on y axis and time on x axis
//TODO - get the line graph to render data points
function LineChartDisplay(props){

    console.log(props.data)
    return (
        <div>
            <LineChart 
                width={400}
                height={400}
                // data to be determined
                data={props.data}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                <CartesianGrid strokeDasharray="5" />
                <Legend />
                <XAxis dataKey='time' />
                <YAxis dataKey='bidPrice' />
                <Tooltip />
                <Line type='monotone' name='bid'  dataKey='bidPrice' stroke="##ff7300" />
                <Line type='monotone' name='ask'  dataKey='askPrice' stroke="##ff7300" strokeWidth={2} />
            </LineChart>
        </div>
    )
}

export default LineChartDisplay;