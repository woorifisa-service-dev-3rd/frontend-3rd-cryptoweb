import { useState } from 'react';
import '../css/MainBody.css';
import CoinChart from './CoinChart'
import MainHeader from './MainHeader';

const MainBody = () => {
  const [selectedCoin, setSelectedCoin] = useState("KRW-BTC");

  return (
    <div className='main'>
      <MainHeader onSelectcoin={setSelectedCoin}/>
      <CoinChart selectedCoin={selectedCoin}/>
    </div>
  );
};

export default MainBody;