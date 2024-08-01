import "../css/MainHeader.css"

const MainHeader = () => {
  return (
    <div className="main_header">
       <div className="custom-select">
            <div className="select-selected">
                <img src="https://static.coinpaprika.com/coin/btc-bitcoin/logo.png"/>
                <div>비트코인</div>
                <div>BTC/USDT</div>
            </div>
       </div>
    </div>
  )
}

export default MainHeader


/*
  <div class="custom-select">
        <div class="select-selected">Select an option</div>
        <div class="select-items select-hide">
            <div><img src="path/to/image1.jpg" alt="Image 1"> Option 1</div>
            <div><img src="path/to/image2.jpg" alt="Image 2"> Option 2</div>
            <div><img src="path/to/image3.jpg" alt="Image 3"> Option 3</div>
        </div>
    </div>
*/
