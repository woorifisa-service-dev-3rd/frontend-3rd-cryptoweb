import './App.css';
import CoinList from './components/CoinList';
import Header from './components/Header';
import MainBody from './components/MainBody';
import { useEffect, useRef, useState } from 'react';


function App() {
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
        { type: "ticker", codes: ["KRW-BCH"], isOnlyRealtime: true }
      ];
      _socket.send(JSON.stringify(subscriptionMessage));
    };

    _socket.onmessage = (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        const message = JSON.parse(reader.result);
        console.log('Message from server', message);


        // 여기서 필요한 데이터 state에 update
        setPrice(message.prev_closing_price)
        setName(message.code)
        
        
      
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
    <div className="App">
      <Header />
      <MainBody />
      <CoinList price={price} name={name} />
    </div>
  );
}

export default App;
