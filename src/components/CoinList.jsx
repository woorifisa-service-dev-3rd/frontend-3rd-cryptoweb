import React, { useState } from 'react'
import '../css/CoinList.css'
import { useEffect, useRef } from 'react'
import Practice from './Practice'

const CoinList = () => {
    const socket = useRef(null)
    const [price, setPrice] = useState("");
    const [name,setName] = useState("")

    useEffect(() => {
        const _socket = new WebSocket('wss://api.upbit.com/websocket/v1');
        socket.current = _socket;
    
        _socket.onopen = () => {
          console.log('WebSocket connection established');
    
          // 구독 메시지 전송
          const subscriptionMessage = [
            { ticket: "unique_ticket_id" },
            { type: "ticker", codes: ["KRW-BTC", "KRW-ETH","KRW-BCH"], isOnlyRealtime: true }
          ];
          _socket.send(JSON.stringify(subscriptionMessage));
        };
    
        _socket.onmessage = (event) => {
          const reader = new FileReader();
          reader.onload = () => {
            const message = JSON.parse(reader.result);
            console.log('Message from server', message);
            setPrice(parseFloat(message.acc_ask_volume.toFixed(4)))
            setName(message.code)
            
            // 여기서 수신한 데이터를 처리하거나 Redux 상태에 업데이트할 수 있습니다.
          
          };
          reader.readAsText(event.data);
        };
    
        _socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
    
        _socket.onclose = () => {
          console.log('WebSocket connection closed');
        };
    
        // 컴포넌트 언마운트 시 WebSocket 연결 종료
        return () => {
          _socket.close();
        };
      }, []);

   
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
                        <td className='twoDiv'><div className='coinName_korean'>{name}</div> <div>xrp/krw</div></td>
                        <td className='price' className="coinIncrease bold">905.0</td>
                        <td className='twoDiv_two'><div className="coinIncrease">+2.89%</div><span className='coinIncrease'>34.5</span></td>
                        <td className='transactionVolume'>{price}</td>
                    </tr>
                    <tr>
                        <td className='twoDiv'><div className='coinName_korean'>리플</div> <div>xrp/krw</div></td>
                        <td className='price' className="coinIncrease bold">905.0</td>
                        <td className='twoDiv_two'><div className="coinIncrease">+2.89%</div><span className='coinIncrease'>34.5</span></td>
                        <td className='transactionVolume'>433,474백만</td>
                    </tr>
                    <tr>
                        <td className='twoDiv'><div className='coinName_korean'>리플</div> <div>xrp/krw</div></td>
                        <td className='price' className="coinIncrease bold">905.0</td>
                        <td className='twoDiv_two'><div className="coinIncrease">+2.89%</div><span className='coinIncrease'>34.5</span></td>
                        <td className='transactionVolume'>433,474백만</td>
                    </tr>
                    <tr>
                        <td className='twoDiv'><div className='coinName_korean'>리플</div> <div>xrp/krw</div></td>
                        <td className='price' className="coinIncrease bold">905.0</td>
                        <td className='twoDiv_two'><div className="coinIncrease">+2.89%</div><span className='coinIncrease'>34.5</span></td>
                        <td className='transactionVolume'>433,474백만</td>
                    </tr>
                    <tr>
                        <td className='twoDiv'><div className='coinName_korean'>리플</div> <div>xrp/krw</div></td>
                        <td className='price' className="coinIncrease bold">905.0</td>
                        <td className='twoDiv_two'><div className="coinIncrease">+2.89%</div><span className='coinIncrease'>34.5</span></td>
                        <td className='transactionVolume'>433,474백만</td>
                    </tr>

                

                </tbody>
            </table>
            <Practice name={name} price={price} />
        </div>
    )
}

export default CoinList