import React from 'react'
import '../css/Header.css'

const Header = () => {
  return (
    <div className='header'>
       <div className='name'>Crypto App.</div>
        <div className='navBar'>
          <div className='nav'>거래소</div>
          <div className='nav'>입출금</div>
          <div className='nav'>투자내역</div>
          <div className='nav'>코인동향</div>
        </div>
    </div>
  )
}

export default Header