import { useState } from "react";
import "../css/MainHeader.css"
import { FaCaretDown } from "react-icons/fa";
import SelectOption from "./SelectOption";


const MainHeader = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSelectClick = () => {
        setIsOpen(!isOpen)
    }
    
    return (
        <div className="main_header">
        <div className="custom_select_container">
                
                <div className="custom_select">
                    { /* 현재 선택된 옵션 , btc가 default */ }
                    <div className="select_selected">
                        <img className="coinImg" src="https://static.coinpaprika.com/coin/btc-bitcoin/logo.png"/>
                        <div className="coin_name_kr">비트코인</div>
                        <div className="coin_name_en">BTC/USDT</div>
                        <FaCaretDown onClick={handleSelectClick} className="down_icon" style={{flex:0.5}} />
                    </div>

                    { /* 드롭다운 메뉴 */ }
                    {isOpen && (
                          <div className="select_options">
                             <SelectOption />
                             <SelectOption />
                             <SelectOption />
                             <SelectOption />

                             
                          </div>
                  
                    )}
                  
            
                </div>
            
        </div>
        </div>
    )
}

export default MainHeader



