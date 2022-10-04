## Order Book

Order books are used by financial exchanges to provide information on price, availability, and depth of trades. They keep track of buy orders, sell orders, and order history. This up-to-date information helps investors make informed decisions. 

The goal of this application is to consume real-time data from the Coinbase-Pro level 2 channel feed and display a chart and ladder view of the order book. The data can be adjusted based on the currency pair or the amount of aggregation of prices by setting price increments. 

Website to use the Order Book:
https://orderbook-cbp.vercel.app/ 

## How to run the order book repository (for developers)

```
git clone https://github.com/can619/OrderBook-Coinbase-Pro.git
```

```
cd OrderBook-Coinbase-Pro
```

```
npm install
```

```
npm run start
```

## Technical challenges

- Implementing useInterval inside of a useEffect in React.

- Ensuring the correct data is rendering in all 3 locations at the same time.

## Stretch Goals

- Memoize components by using useMemo to reduce expensive function calls

- Make data update in the order book synchronous with bests prices/size box and chart.

- Implement a formula for the y-axis and x-axis ticks so there is a pattern (i.e. show time tick for every 5sec increment or price tick for every 2k).

- Show an accurate spread based on the highest bid and lowest ask present in the ladder view. 

