import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
// promtp want to display current price on y axis and time on x axis
//TODO - get the line graph to render data points
function LineChartDisplay(props){

    console.log(props.data)
    return (
        <div>
            <LineChart 
                width={1000}
                height={1000}
                // data to be determined
                data={props.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="5" />
                <XAxis dataKey="time" />
                <YAxis dataKey="price"/>
                <Tooltip />
                <Legend />
                <Line name="bid" type="monotone" dataKey="bid" stroke="#000000" />
                <Line name="ask" type="monotone" dataKey="ask" stroke="#82ca9d" />
            </LineChart>
        </div>
    )
}

export default LineChartDisplay;