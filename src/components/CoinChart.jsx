import { useEffect, useState } from "react"
import "../css/CoinChart.css"
import CandleVolumeChart from "./CandleVolumeChart"

const CoinChart = () => {
  const [volume, setVolume] = useState(true);
  const [candleData, setCandleData] = useState([])

  // Fetch historical data using REST API
  useEffect(() => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch('https://api.upbit.com/v1/candles/days?market=KRW-BCH&count=100', options)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);

        // Convert the fetched data to the format needed for the chart
        const formattedData = data.map(candle => ({
          x: new Date(candle.candle_date_time_kst),
          y: [candle.opening_price, candle.high_price, candle.low_price, candle.trade_price]
        }));

        setCandleData(formattedData);
        console.log('formamtted:', formattedData);

        // Optionally, set initial prices from the most recent candle
        // if (data.length > 0) {
        //   const latestCandle = data[0];
        //   setOpenPrice(latestCandle.opening_price);
        //   setHighPrice(latestCandle.high_price);
        //   setLowPrice(latestCandle.low_price);
        //   setCurrentPrice(latestCandle.trade_price);
        // }
      })
      .catch(err => console.error('REST API error:', err));
  }, []);

  return (
    <>
      <div className="coin_chart">
        <p>여기가 CoinChart</p>
        <div className="select_options">
          <div className="date_select">
            <select className="datetime" id="datetime">
              <option value="one_day">1일</option>
              <option value="one_week">1주</option>
              <option value="one_month">한 달</option>
            </select>
          </div>
          <div className="chart_select">
            <select className="chart" id="chart">
              <option value="candle_chart">캔들</option>
              <option value="">선</option>
            </select>
          </div>
          <button onClick={() => setVolume(!volume)}>{volume ? "숨기기" : "보이기"}</button>
        </div>
        <CandleVolumeChart volume={volume} candleData={candleData}/>
      </div>
    </>
  )
}

export default CoinChart