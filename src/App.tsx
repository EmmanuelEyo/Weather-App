import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Map from './components/Map'
import WeatherForecast from './components/WeatherForecast'
import { WeatherData } from './types'

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  return (
    <>
      <div>
        <Header setWeatherData={setWeatherData} />
        {weatherData && <WeatherForecast weatherData={weatherData} />}
        {/* <WeatherForecast /> */}
        <Map weatherData={weatherData} />
      </div>
    </>
  )
}

export default App
