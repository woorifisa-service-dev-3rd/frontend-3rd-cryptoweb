import { useEffect, useState } from "react"
import "../css/CoinChart.css"
import CandleVolumeChart from "./CandleVolumeChart";

const CoinChart = ({coinname}) => {
  const [volume, setVolume] = useState(true);

  return (
    <>
      <div className="coin_chart">
        <div className="chart_select_options">
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
        <CandleVolumeChart volume={volume} coinname= {coinname}/>
      </div>
    </>
  )
}

export default CoinChart