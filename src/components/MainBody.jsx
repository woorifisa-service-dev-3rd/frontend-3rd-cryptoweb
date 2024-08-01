import '../css/MainBody.css';
import CandleVolumeChart from './CandleChart';
import CoinChart from './CoinChart'
import MainHeader from './MainHeader';

const MainBody = () => {
  
  return (
    <div className='main'>
      <MainHeader />
      <CoinChart />
    </div>
  );
};

export default MainBody;