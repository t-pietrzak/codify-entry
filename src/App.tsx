import { useState } from 'react';
import './App.css'
import { useFetchApi } from './hooks/useFetchApi'
import type { EChartsOption } from "echarts";
import { TransactionChart } from './components/TransactionChart';

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

  if (error) {return <div>Api error</div>}
  if (isFetching) {return <div>Updating data</div>}
  if (isLoading) {return <div>Loading data</div>}

  if(data) {
    console.log(data)
  }

  return (
    <div style={{height: "900px", width: "900px"}}>
      <TransactionChart option={options}/>
    </div>
  )
}

export default App
