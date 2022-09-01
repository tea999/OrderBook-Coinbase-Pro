import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from "recharts";
import './LineChart.css'


function LineChartDisplay(props){
    let min = Math.min(props.data.bidPrice, props.data.askPrice);
    let max = Math.min(props.data.bidPrice, props.data.askPrice)

    return (
        <div className='linechart'>
            <LineChart width={1200} height={600} data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="1" />
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

