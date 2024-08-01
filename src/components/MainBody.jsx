import '../css/MainBody.css';
import CoinChart from './CoinChart'
import MainHeader from './MainHeader';

const MainBody = ({ openPrice, highPrice, lowPrice, currentPrice }) => {
  
  return (
    <div className='main'>
      <MainHeader />
      {/* <CoinChart openPrice={openPrice} highPrice={highPrice} lowPrice={lowPrice} curretPrice={currentPrice}/> */}
    </div>
  );
};

export default MainBody;