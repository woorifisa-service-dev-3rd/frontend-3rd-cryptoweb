import { useState } from 'react';
import '../css/MainBody.css';
import CoinChart from './CoinChart'
import MainHeader from './MainHeader';

const MainBody = () => {
  const [coinname, usecoinname] = useState('KRW-BTC')
  return (
    <div className='main'>
      <MainHeader usecoinname={usecoinname} />
      <CoinChart coinname={coinname}/>
    </div>
  );
};

export default MainBody;