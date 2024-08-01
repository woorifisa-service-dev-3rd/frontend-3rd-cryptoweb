import React from 'react'
import '../css/CoinList.css'

const CoinList = () => {
  return (
    <div className='coinList'>
        {/* <div className='search'>
            <input placeholder='코인명/심볼검색'></input>
            <div></div>
        </div> */}
        

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
                <tr>
                    <td className='twoDiv'><div className='coinName_korean'>리플</div> <div>xrp/krw</div></td>
                    <td className='price'><div className="coinIncrease bold">905.0</div></td>
                    <td className='twoDiv_two'><div className="coinIncrease">+2.89%</div><span className='coinIncrease'>34.5</span></td>
                    <td className='transactionVolume'>433,474백만</td>
                </tr>
              

            </tbody>
        </table>
    </div>
  )
}

export default CoinList