import "../css/CoinChart.css"
import CandleVolumeChart from "./CandleChart"

const CoinChart = () => {
  return (
    <>
      <div className="coin_chart">
        <p>여기가 CoinChart</p>
        <CandleVolumeChart />
      </div>
    </>
  )
}

export default CoinChart