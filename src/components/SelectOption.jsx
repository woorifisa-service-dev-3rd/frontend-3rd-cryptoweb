import { marketToKoreanName } from "../constant/CoinKoreanName"


const SelectOption = ({ code, name, onSelect }) => {
  return (
    <div className="select_option" onClick={onSelect}>
        <img className="option_coinImg" src="https://static.coinpaprika.com/coin/btc-bitcoin/logo.png"/>
        <div className="coin_name_kr">{name}</div>
        <div className="coin_name_en">{code}</div>
    </div>
  )
}

export default SelectOption