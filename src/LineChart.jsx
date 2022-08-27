import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
// promtp want to display current price on y axis and time on x axis
function LineChartDisplay(props){
    const [data, setData] = useState([]);


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