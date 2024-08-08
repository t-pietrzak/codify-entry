import { useEffect, useState } from 'react';
import './App.css'
import { useFetchApi } from './hooks/useFetchApi'
import type { EChartsOption } from "echarts";
import { TransactionChart } from './components/TransactionChart';
import { MenuItem, Select } from '@mui/material';

const EMPTY_OPTIONS = {
  title: {},
  tooltip: {},
  xAxis: {},
  yAxis: {},
  series: []
}

function App() {
  // empty options were provided in order to prevent chart form runtime errors
  const [options, setOptions] = useState<EChartsOption>(EMPTY_OPTIONS);

  const [refetchInterval, setRefetchInterval] = useState<number>();
  const [symbol, setSymbol] = useState<string>('BTCUSDT');
  // Binance api allow us to use WS endpoint but in this case I wanted to keep things simple. Probalby in live project WS should be used.
  const {data, error, isLoading} = useFetchApi(symbol, refetchInterval);

  useEffect(() => {
    if(data) {
      setOptions({
        title: {
          text: 'Trade prices - historical data'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: data.map(dataElement => dataElement.T),
          name: 'Time'
        },
        yAxis: {
          name: 'Values'
        },
        series: [{
          name: 'Price',
          type: 'bar',
          data: data.map(dataElement => dataElement.p)
      }]
      })
    } else {
      setOptions(EMPTY_OPTIONS)
    }
  }, [data])


  // in perfect world react portal should be use to create modal with information about api error
  if (error) {return <div>Api error</div>}

  return (
    <>
      <div>
        {/* for onChange functions we should exctract it to separate functions since it is very simple implementation I've done it inline*/}
        <Select
          labelId="symbol-simple-select-label"
          id="symbol-simple-select"
          value={symbol}
          label="Symbol"
          onChange={(e) => {setSymbol(e.target.value)}}
          placeholder='symbol'
        >
          <MenuItem value={'BTCUSDT'}>BTCUSDT</MenuItem>
        </Select>
        <Select
          labelId="refetchInterval-simple-select-label"
          id="refetchInterval-simple-select"
          value={refetchInterval}
          label="Refetch Interval"
          onChange={(e) => {setRefetchInterval(e.target.value)}}
          placeholder='Refetch Interval'
        >
          <MenuItem value={undefined}>No Interval</MenuItem>
          <MenuItem value={1000}>1s</MenuItem>
          <MenuItem value={2000}>2s</MenuItem>
          <MenuItem value={3000}>3s</MenuItem>
        </Select>
      </div>
      <div style={{height: "900px", width: "900px"}}>
        <TransactionChart option={options} loading={isLoading}/>
      </div>
    </>
  )
}

export default App
