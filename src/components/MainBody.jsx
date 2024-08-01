import React from 'react'
import '../css/MainBody.css'
import CandleChart from './CandleChart'
import CandleVolumeChart from './CandleChart'
// import WebSocketComponent from './WebSocket'

const MainBody = () => {
  return (
    <div className='main'>
      <CandleVolumeChart />
    </div>
  )
}

export default MainBody