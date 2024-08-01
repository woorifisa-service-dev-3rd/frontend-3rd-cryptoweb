import { useEffect, useState } from 'react';
import App from './App'

export default function CoinTop50() {

    let [coinList, setcoinList] = useState(null);

    const fetchData = async () => {
        const options = { method: 'GET', headers: { accept: 'application/json' } };

        try {
            const response = await fetch('/v1/market/all', options);
            //vite.config에서 설정 필요.

            let alldata = await response.json();

            console.log(alldata.slice(0,50).map((onecoin) => onecoin.market))
            setcoinList(alldata.slice(0,50).map((onecoin) => onecoin.market))
            //갖고와서, 그 이름으로 정보들 가져와서 보내기 . 

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <App coinList = {coinList}/>
        </div>
    );
}