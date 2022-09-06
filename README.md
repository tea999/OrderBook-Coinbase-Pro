## Order Book

The goal of this application is to consume real-time data from the Coinbase-Pro level 2 channel feed and display a chart and ladder view of the order book.

## How to run the order book

```
git clone https://github.com/can619/OrderBook-CoinRoutes.git
```

```
cd OrderBook-CoinRoutes
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

- Make data update in the order book synchronous with bests prices/size box and chart.

- Implement a formula for the y-axis and x-axis ticks so there is a pattern (i.e. show time tick for every 5sec increment or price tick for every 2k).

- Show an accurate spread based on the highest bid and lowest ask present in the ladder view. 

