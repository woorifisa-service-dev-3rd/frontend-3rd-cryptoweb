import { useState, useEffect } from 'react';
import '../css/CoinList.css'
import {marketToKoreanName} from '../constant/CoinKoreanName'

const CoinList = ({coinInfo}) => {

    const [coinInfoList, setcoinInfoList] = useState([]);

    useEffect(() => {
        if (coinInfo) {
            const newCoinInfoList = [...coinInfoList];

            // 코인 정보가 이미 존재하는지 확인
            const coinIndex = newCoinInfoList.findIndex(item => item.code === coinInfo.code);

            if (coinIndex !== -1) {
                // 있
                newCoinInfoList[coinIndex] = coinInfo;
            } else {
                //없
                newCoinInfoList.push(coinInfo);
            }

            setcoinInfoList(newCoinInfoList);

            console.log("리스트", coinInfoList)
        }
    }, [coinInfo]);

    return (
        <div className='coinList'>
            {/* <div className='search'>
                <input placeholder='코인명/심볼검색'></input>
                <div></div>
            </div>
             */}

            <table >
                <thead>
                    <tr>
                        <th className='coinName'>코인명</th>
                        <th className='price'>현재가</th>
                        <th className='changeRate'>전일대비</th>
                        <th className='transactionVolume'>거래대금</th>
                    </tr>
                </thead>
                <tbody>
                    {coinInfoList.map((info) =>(
                        <tr key = {info.code}>
                        <td className='twoDiv'>
                                <div className='coinName_korean'>
                                {marketToKoreanName[info.code] ? marketToKoreanName[info.code] : info.code}</div><div>{info.code}</div></td>
                        <td className='price bold'>
                            {info.trade_price}</td>
                        <td className='twoDiv_two'>
                            <div className={`coinIncrease ${info.change === "FALL" ? 'coinDecrease' : 'coinIncrease'}`}>
                            {info.change ==="FALL"? -(info.change_rate*100).toFixed(3)+"%" : info.change_rate.toFixed(3)+"%"}
                                </div>
                            <span className={`coinIncrease ${info.change === "FALL" ? 'coinDecrease' : 'coinIncrease'}`}>
                            {info.change ==="FALL"? -(info.change_price).toFixed(3) : info.change_price.toFixed(3)}
                                </span>
                        </td>
                        <td className='transactionVolume'>
                            {info.acc_trade_price_24h/1000000 > 1 ?(info.acc_trade_price_24h/1000000).toFixed(3)+"백만" : info.acc_trade_price_24h.toFixed(3)}</td>
                        </tr>

                    ))}
                    
                

                

                </tbody>
            </table>
        </div>
    )
}

export default CoinList