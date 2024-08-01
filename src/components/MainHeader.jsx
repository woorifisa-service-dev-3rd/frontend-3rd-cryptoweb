import { useState } from "react";
import "../css/MainHeader.css";
import { FaCaretDown } from "react-icons/fa";
import SelectOption from "./SelectOption";
import { marketToKoreanName } from "../constant/CoinKoreanName";

const MainHeader = ({usecoinname}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState("KRW-BTC"); // 기본 선택값

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="main_header">
            <div className="custom_select_container">
                <div className="custom_select">
                    <div className="select_selected" onClick={handleSelectClick}>
                        <img className="coinImg" src={`https://static.coinpaprika.com/coin/${selectedCoin.toLowerCase()}-logo.png`} alt={marketToKoreanName[selectedCoin]}/>
                        <div className="coin_name_kr">{marketToKoreanName[selectedCoin]}</div>
                        <div className="coin_name_en">{selectedCoin}</div>
                        <FaCaretDown className="down_icon" style={{flex:0.5}} />
                    </div>

                    {isOpen && (
                        <div className="select_options">
                            {Object.entries(marketToKoreanName).map(([code, name]) => (
                                <SelectOption
                                    key={code}
                                    code={code}
                                    name={name}
                                    onSelect={() => {
                                        setSelectedCoin(code);
                                        usecoinname(code);
                                        setIsOpen(false);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainHeader;