import { useEffect, useState } from "react"
import "../css/CoinChart.css"
import CandleVolumeChart from "./CandleVolumeChart";

const CoinChart = () => {
  const [volume, setVolume] = useState(true);

  return (
    <>
      <div className="coin_chart">
        <p>여기가 CoinChart</p>
        <div className="select_options">
          <button className="volume_btn" onClick={() => setVolume(!volume)}>{volume ? "거래량 숨기기" : "거래량 보기"}</button>
        </div>
        <CandleVolumeChart volume={volume}/>
      </div>
    </>
  )
}

export default CoinChart