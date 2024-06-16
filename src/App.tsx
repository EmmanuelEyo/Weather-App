import './App.css'
import Header from './components/Header'
import Map from './components/Map'
import WeatherForecast from './components/WeatherForecast'

function App() {

  return (
    <>
      <div>
        <Header />
        <WeatherForecast />
        <Map />
      </div>
    </>
  )
}

export default App
