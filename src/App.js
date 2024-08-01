import './App.css';
import CoinList from './components/CoinList';
import Header from './components/Header';
import MainBody from './components/MainBody';
import { useEffect, useRef, useState } from 'react';


function App({coinList}) {


  const socket = useRef(null)
  // const [openPrice, setOpenPrice] = useState("")
  // const [highPrice, setHighPrice] = useState("")
  // const [lowPrice, setLowPrice] = useState("")
  // const [curretPrice, setCurrentPrice] = useState("")
  const [coinInfo, setcoinInfo] = useState()

  const [isInitialMount, setIsInitialMount] = useState(true); // 추가: 초기 마운트 상태를 추적하는 상태

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return; // 초기 마운트 시에는 더 이상 진행하지 않음
    }
    const _socket = new WebSocket('wss://api.upbit.com/websocket/v1');
    socket.current = _socket;

    _socket.onopen = () => {
      console.log('WebSocket connection established');


      // 구독 메시지 전송
      const subscriptionMessage = [
        { ticket: "unique_ticket_id" },
        { type: "ticker", codes: coinList, isOnlyRealtime: true }
      ];
      _socket.send(JSON.stringify(subscriptionMessage));
    };

    _socket.onmessage = (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        const message = JSON.parse(reader.result);
        console.log('Message from server', message);
        
        // 여기서 필요한 데이터 state에 update

        // 여기 아래부터 다 지워도됨
        
        // console.log(message.opening_price)
        // setOpenPrice(message.opening_price)

        // console.log(message.high_price)
        // setHighPrice(message.high_price)

        // setLowPrice(message.low_price)
        // setCurrentPrice(message.trade_price)

        // console.log("openPrice", openPrice)
        // console.log("highPirce", highPrice)

        setcoinInfo(message)
        
      
      };
      reader.readAsText(event.data);
    };

    _socket.onerror = (error) => {
      console.error('WebSocket error:', error.message);
    };  

    _socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      _socket.close();
    };
  }, [coinList]);

 
  return (
    <div className="App">
      {/* 원하는 데이터 props로 전달 */}
      <Header />
<<<<<<< HEAD
      <MainBody />
      <CoinList coinInfo={coinInfo} />
=======
      <MainBody openPrice={openPrice} highPrice={highPrice} lowPrice={lowPrice} currentPrice={currentPrice}/>
      <CoinList price={currentPrice} name={lowPrice} />
>>>>>>> main
    </div>
  );
}

export default App;
