import './App.css';
import CoinList from './components/CoinList';
import Header from './components/Header';
import MainBody from './components/MainBody';
import { useEffect, useRef, useState } from 'react';


function App({coinList}) {

  console.log("App에 있는 coinList!!!!",coinList)


  const socket = useRef(null)
  const [coinInfo, setcoinInfo] = useState()

  const [isInitialMount, setIsInitialMount] = useState(true); //최초 랜더링 막아버리기

  

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
      <MainBody />
      <CoinList className="list" coinInfo={coinInfo} />
    </div>
  );
}

export default App;
