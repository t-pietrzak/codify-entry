import './App.css'
import { useFetchApi } from './hooks/useFetchApi'

function App() {
  const {data, error, isFetching, isLoading} = useFetchApi('BTCUSDT');

  if (error) {return <div>Api error</div>}
  if (isFetching) {return <div>Updating data</div>}
  if (isLoading) {return <div>Loading data</div>}

  if(data) {
    console.log(data)
  }

  return (
    <div>
      Data were pulled successfuly
    </div>
  )
}

export default App
