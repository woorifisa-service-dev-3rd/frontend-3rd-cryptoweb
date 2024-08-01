import { marketToKoreanName } from "../constant/CoinKoreanName"


const SelectOption = () => {
  return (
    <div className="select_option">
        <img className="option_coinImg" src="https://static.coinpaprika.com/coin/btc-bitcoin/logo.png"/>
        <div className="coin_name_kr">비트코인</div>
        <div className="coin_name_en">BTC/USDT</div>
    </div>
  )
}

export default SelectOption