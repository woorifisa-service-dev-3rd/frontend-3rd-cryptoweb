import { useState, useEffect } from 'react';
import '../css/CoinList.css';
import { marketToKoreanName } from '../constant/CoinKoreanName';

const CoinList = ({ coinInfo }) => {
  const [coinInfoList, setCoinInfoList] = useState([]);
  const [filteredCoinList, setFilteredCoinList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (!isFiltered && coinInfo) {
      setCoinInfoList(prevCoinInfoList => {
        const newCoinInfoList = [...prevCoinInfoList];
        const coinIndex = newCoinInfoList.findIndex(item => item.code === coinInfo.code);

        if (coinIndex !== -1) {
          newCoinInfoList[coinIndex] = coinInfo;
        } else {
          newCoinInfoList.push(coinInfo);
        }

        if (!isFiltered) {
          setFilteredCoinList(newCoinInfoList); 
        }

        return newCoinInfoList;
      });
    }
  }, [coinInfo, isFiltered]);

  const handleSearch = () => {
    if (searchTerm) {
      setIsFiltered(true);
      const filteredList = coinInfoList.filter(coin => {
        const codeMatch = coin.code && coin.code.toLowerCase().includes(searchTerm.toLowerCase());
        const nameMatch = marketToKoreanName[coin.code] && marketToKoreanName[coin.code].toLowerCase().includes(searchTerm.toLowerCase());
        return codeMatch || nameMatch;
      });
      setFilteredCoinList(filteredList);
    } else {
      setIsFiltered(false);
      setFilteredCoinList(coinInfoList);
    }
  };

  return (
    <div className='coinList'>
      <div className='search'>
        <input 
          placeholder='코인명/심볼검색'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <table>
        <thead>
          <tr>
            <th className='coinName'>코인명</th>
            <th className='price'>현재가</th>
            <th className='changeRate'>전일대비</th>
            <th className='transactionVolume'>거래대금</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoinList.map((info) => (
            <tr key={info.code}>
              <td className='twoDiv'>
                <div className='coinName_korean'>
                  {marketToKoreanName[info.code] ? marketToKoreanName[info.code] : info.code}
                </div>
                <div>{info.code}</div>
              </td>
              <td className='price bold'>{info.trade_price}</td>
              <td className='twoDiv_two'>
                <div className={`coinIncrease ${info.change === "FALL" ? 'coinDecrease' : 'coinIncrease'}`}>
                  {info.change === "FALL" ? -(info.change_rate * 100).toFixed(3) + "%" : (info.change_rate * 100).toFixed(3) + "%"}
                </div>
                <span className={`coinIncrease ${info.change === "FALL" ? 'coinDecrease' : 'coinIncrease'}`}>
                  {info.change === "FALL" ? -(info.change_price).toFixed(3) : info.change_price.toFixed(3)}
                </span>
              </td>
              <td className='transactionVolume'>
                {info.acc_trade_price_24h / 1000000 > 1 ? (info.acc_trade_price_24h / 1000000).toFixed(3) + "백만" : info.acc_trade_price_24h.toFixed(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
