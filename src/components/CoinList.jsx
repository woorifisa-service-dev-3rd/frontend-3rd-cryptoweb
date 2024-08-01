import { useState, useEffect } from 'react';
import '../css/CoinList.css'

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
                                <div className='coinName_korean'>{info.code}</div><div>xrp/krw</div></td>
                        <td className='price' className="coinIncrease bold">{info.trade_price}</td>
                        <td className='twoDiv_two'>
                            <div className="coinIncrease">
                                {info.change_rate}
                                </div>
                            <span className='coinIncrease'>
                                {info.change_price}
                                </span>
                        </td>
                        <td className='transactionVolume'>{info.acc_trade_volume}</td>
                        </tr>

                    ))}
                    
                

                

                </tbody>
            </table>
        </div>
    )
}

export default CoinList