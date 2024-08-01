import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const CandleVolumeChart = ({ volume, candleData }) => {
  // API로부터 가져온 데이터를 저장할 상태
  const [candleChartData, setCandleChartData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);

  useEffect(() => {
    // API로부터 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.upbit.com/v1/candles/days?market=KRW-BCH&count=50', {
          method: 'GET',
          headers: { accept: 'application/json' },
        });
        const data = await response.json();

        console.log('Fetched data:', data);

        // 가져온 데이터를 차트에 맞게 포맷팅
        const formattedCandleData = data.map(candle => ({
          x: new Date(candle.candle_date_time_kst).getTime(), // 타임스탬프로 변환
          y: [candle.opening_price, candle.high_price, candle.low_price, candle.trade_price],
        }));

        const formattedVolumeData = data.map(candle => ({
          x: new Date(candle.candle_date_time_kst).getTime(),
          y: candle.candle_acc_trade_volume, // 거래량
        }));

        setCandleChartData(formattedCandleData);
        setVolumeData(formattedVolumeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 사용하여 컴포넌트 마운트 시 한 번만 실행

  // 데이터가 준비되지 않았을 때 로딩 메시지를 표시
  if (candleChartData.length === 0 || volumeData.length === 0) {
    return <div>Loading chart data...</div>;
  }

  // 거래량 데이터의 시작과 끝 범위를 xaxis에 사용
  const minX = new Date(volumeData[0].x);
  const maxX = new Date(volumeData[volumeData.length - 1].x);

  // 캔들스틱 차트 옵션
  const candleOptions = {
    chart: {
      type: 'candlestick',
      height: 290,
      id: 'candles',
      toolbar: {
        autoSelected: 'pan',
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#3C90EB',
          downward: '#DF7D46',
        },
      },
    },
    xaxis: {
      type: 'datetime',
      min: minX, // 거래량 데이터의 시작
      max: maxX, // 거래량 데이터의 끝
    },
  };

  const candleSeries = [
    {
      name: 'Price',
      data: candleChartData, // API로부터 가져온 캔들 데이터
    },
  ];

  // 거래량 차트 옵션
  const volumeOptions = {
    chart: {
      height: 160,
      type: 'bar',
      brush: {
        enabled: true,
        target: 'candles',
      },
      selection: {
        enabled: true,
        xaxis: {
          min: minX, // 거래량 데이터의 시작
          max: maxX, // 거래량 데이터의 끝
        },
        fill: {
          color: '#ccc',
          opacity: 0.4,
        },
        stroke: {
          color: '#0D47A1',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
        colors: {
          ranges: [
            {
              from: -1000,
              to: 0,
              color: '#F15B46',
            },
            {
              from: 1,
              to: 10000,
              color: '#FEB019',
            },
          ],
        },
      },
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        offsetX: 13,
      },
      min: minX, // 거래량 데이터의 시작
      max: maxX, // 거래량 데이터의 끝
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };

  const volumeSeries = [
    {
      name: 'Volume',
      data: volumeData, // API로부터 가져온 거래량 데이터
    },
  ];

  return (
    <div>
      <div id="chart-candlestick">
        <Chart
          options={candleOptions}
          series={candleSeries}
          type="candlestick"
          height={290}
        />
      </div>
      <div id="chart-bar">
        {volume && (
          <Chart
            options={volumeOptions}
            series={volumeSeries}
            type="bar"
            height={160}
          />
        )}
      </div>
    </div>
  );
};

export default CandleVolumeChart;
