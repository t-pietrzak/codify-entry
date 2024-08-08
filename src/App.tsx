import { useState } from 'react';
import './App.css'
import { useFetchApi } from './hooks/useFetchApi'
import type { EChartsOption } from "echarts";
import { TransactionChart } from './components/TransactionChart';
import { MenuItem, Select } from '@mui/material';

function App() {
  // empty options were provided in order to prevent chart form runtime errors
  const [options, setOptions] = useState<EChartsOption>({
    title: {},
    tooltip: {},
    xAxis: {},
    yAxis: {},
    series: []
  });

  const [refetchInterval, setRefetchInterval] = useState<number>();
  const [symbol, setSymbol] = useState<string>('BTCUSDT');

  const {data, error, isFetching, isLoading} = useFetchApi(symbol, refetchInterval);


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
          <MenuItem value={1000}>1s</MenuItem>
          <MenuItem value={2000}>2s</MenuItem>
          <MenuItem value={3000}>3s</MenuItem>
        </Select>
      </div>
      <div style={{height: "900px", width: "900px"}}>
        <TransactionChart option={options} loading={isFetching || isLoading}/>
      </div>
    </>
  )
}

export default App
