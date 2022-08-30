import { useState, useEffect, useRef } from 'react';
import './App.css';
import StockPriceSize from './StockPriceSize';
import CurrencyDropDown from './CurrencyDropDown';
import LineChartDisplay from './LineChart';

function App() {
  // put the state here to make components modular
  const [currency, setCurrency] = useState("BTC-USD");
  const [bestBidPrice, setBestBidPrice] = useState("");
  const [bestBidQty, setBestBidQty] = useState("");
  const [bestAskPrice, setBestAskPrice] = useState("");
  const [bestAskQty, setBestAskQty] = useState("");
  const [graphData, setGraphData] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [bidsArr, setBidsArr] = useState([]);
  const [asksArr, setAsksArr] = useState([]);
  const [delay, setDelay] = useState(1000);

  function handleChange(e){
    setCurrency(e.target.value);
}

function emptyArrays(){
  setBidsArr([]);
  setAsksArr([]);
  setGraphData([]);
}

function handleSnapshotData(msg){
  setBestBidPrice(msg.bids[0][0]);
  setBestBidQty(msg.bids[0][1]);
  setBestAskPrice(msg.asks[0][0]);
  setBestAskQty(msg.asks[0][1]);
  // since snapshot is first, it will be the baseline of bidsArr,asksArr, and data array
  setBidsArr(msg.bids);
  //[[100, 1.0]]
  setAsksArr(msg.asks);
  const time = new Date();
  const [hour, minutes, seconds] = [time.getHours(), time.getMinutes(), time.getSeconds()]
  const dataObj = {
      bidPrice: Number(msg.bids[0][0]),
      askPrice: Number(msg.asks[0][0]),
      time: `${hour}:${minutes}:${seconds}`
  };
  setGraphData(() => [dataObj])
}

function filterBidsArr(price){
  setBidsArr(bidsArr.filter(bid => bid[0] !== price))
}

function pushToBidsArr(price,size){
  setBidsArr(bids => [...bids, [price, size]])
}

function filterAsksArr(price){
  setAsksArr(asksArr.filter(ask => ask[0] !== price))
}

function pushToAsksArr(price,size){
  setAsksArr(asks => [...asks, [price,size]])
}

function setBestAfterSort(){
  setBestBidPrice(bidsArr[0][0]);
  setBestBidQty(bidsArr[0][1]);
  setBestAskPrice(asksArr[0][0]);
  setBestAskQty(asksArr[0][1]); 

}

function setGraphDataAfterSort(dataObj){
  setGraphData(prevdata => [...prevdata, dataObj])
}

function handlePause(){
  !isPaused ? setIsPaused(true) : setIsPaused(false);
}

  return (
    <div className="App">
      <CurrencyDropDown handleChange={handleChange} currency={currency}/>
      <StockPriceSize currency={currency} bestAskPrice={bestAskPrice} bestAskQty={bestAskQty} bestBidPrice={bestBidPrice} bestBidQty={bestBidQty} graphData={graphData} isPaused={isPaused} bidsArr={bidsArr} asksArr={asksArr} delay={delay} emptyArrays={emptyArrays} handleSnapshotData={handleSnapshotData} filterBidsArr={filterBidsArr} pushToBidsArr={pushToBidsArr} filterAsksArr={filterAsksArr} pushToAsksArr={pushToAsksArr} setBestAfterSort={setBestAfterSort} setGraphDataAfterSort={setGraphDataAfterSort} handlePause={handlePause} />
      <LineChartDisplay currency={currency} data={graphData}/>
      
    </div>
  );
}

export default App;

/**
 Advice from Cara D.
 const App(){
return (
<CurrencyDropdown />
<StockPriceSize />
<Line Chart/>
<LadderView />
}

or 
<CurrencyDropdown />
<StockView />
stockView= {
<PriceView />
<LineChart />
<LadderView />

Also add more folders
Dir {CurrencyDropDown}
  > CurrencyDropdown.jsx
  >CurrencyDropdown.css

Make a read me
  how to install and run
  justify what I did or did not have time to do

Use li for ladder view 
 */
