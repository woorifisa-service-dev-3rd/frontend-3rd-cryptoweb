import './App.css';
import CoinList from './components/CoinList';
import Header from './components/Header';
import MainBody from './components/MainBody';

function App() {
  return (
    <div className="App">
      <Header />
      <MainBody />
      <CoinList />
    </div>
  );
}

export default App;
