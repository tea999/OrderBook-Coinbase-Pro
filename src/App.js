import { useState  } from 'react';
import './App.css';
import StockPriceSize from './StockPriceSize/StockPriceSize';
import CurrencyDropDown from './CurrencyDropDown/CurrencyDropDown';
import LineChartDisplay from './LineChart/LineChart';
import LadderViewDisplay from './LadderViewDisplay/LadderViewDisplay';
import AggregationDropDrown from './AggregationDropDown/AggregationDropDown';

function App() {
  const [currency, setCurrency] = useState("BTC-USD");
  const [bestBidPrice, setBestBidPrice] = useState("");
  const [bestBidQty, setBestBidQty] = useState("");
  const [bestAskPrice, setBestAskPrice] = useState("");
  const [bestAskQty, setBestAskQty] = useState("");
  const [graphData, setGraphData] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [bidsArr, setBidsArr] = useState([]);
  const [asksArr, setAsksArr] = useState([]);
  //adjust how often the order book data comes in by changing delay
  const [delay, setDelay] = useState(5000);
  const [aggregation, setAggregation] = useState(.01);


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
  //msg = [[100, 1.0]]
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
  setBidsArr(prevArr => {
    return prevArr.filter(bid => bid[0] !== price)
  })

}

function updateLevels(newPrice,newSize, transactionType){
  if (transactionType === 'bids'){
    setBidsArr(prevArr =>{
      for (let i = 0; i < prevArr.length; i++){
        const currPrice = prevArr[i][0]
        if (currPrice === newPrice){
          prevArr[i] = [currPrice, newSize]
          return prevArr
        }
      }
      // or pushing to the array
      return [...prevArr, [newPrice,newSize]]
    })    
  }else {
    setAsksArr(prevArr =>{
      for (let i = 0; i < prevArr.length; i++){
        const currPrice = prevArr[i][0]
        if (currPrice === newPrice){
          prevArr[i] = [currPrice, newSize]
          return prevArr
        }
      }
      // or pushing to the array
       return [...prevArr, [newPrice,newSize]]
    })
  }

}

function filterAsksArr(price){
  setAsksArr(prevArr =>{
    return prevArr.filter(ask => ask[0] !== price)
  })
}

function setBestAfterSort(){
  setBidsArr(prevArr => {
    return prevArr.sort((a,b) => b[0] - a[0])
  });
  setAsksArr(prevArr => {
    return prevArr.sort((a,b) =>a[0] - b[0])
  });
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

function changeAgg(e){
  setAggregation(e.target.value)
}

function resetAgg(){
  setAggregation(.01)
}

  return (
    <div className="App">
      <div id="app-heading">Order Book and Chart</div>
      <CurrencyDropDown handleChange={handleChange} currency={currency}/>
      <StockPriceSize currency={currency} bestAskPrice={bestAskPrice} bestAskQty={bestAskQty} bestBidPrice={bestBidPrice} bestBidQty={bestBidQty} graphData={graphData} isPaused={isPaused} bidsArr={bidsArr} asksArr={asksArr} delay={delay} emptyArrays={emptyArrays} handleSnapshotData={handleSnapshotData} filterBidsArr={filterBidsArr} filterAsksArr={filterAsksArr} setBestAfterSort={setBestAfterSort} setGraphDataAfterSort={setGraphDataAfterSort} handlePause={handlePause} updateLevels={updateLevels}/>
      <LineChartDisplay currency={currency} data={graphData}/>
      <AggregationDropDrown aggregation={aggregation} changeAgg={changeAgg} resetAgg={resetAgg} currency={currency}/>
      <LadderViewDisplay asksArr={asksArr} bidsArr={bidsArr} aggregation={aggregation} />
    </div>
  );
}

export default App;


