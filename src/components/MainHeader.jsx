import "../css/MainHeader.css"
import { FaCaretDown } from "react-icons/fa";

const MainHeader = () => {
  return (
    <div className="main_header">
       <div className="custom_select_container">
            <div className="custom_select">
                <div className="select_selected">
                    <img className="coinImg" src="https://static.coinpaprika.com/coin/btc-bitcoin/logo.png"/>
                    <div className="coin_name_kr">비트코인</div>
                    <div className="coin_name_en">BTC/USDT</div>
                    <FaCaretDown className="down_icon" />
                </div>
               
          
            </div>
           
       </div>
    </div>
  )
}

export default MainHeader



