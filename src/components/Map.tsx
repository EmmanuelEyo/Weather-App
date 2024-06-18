import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSun, FaCloudSun, FaCloudRain, FaCloud } from 'react-icons/fa';

const weatherIcons = {
  sunny: L.icon({
    iconUrl: '/location.png',
    iconSize: [35, 41],
    iconAnchor: [12, 41],
  }),
  rainy: L.icon({
    iconUrl: '/icons/rainy.png',
    iconSize: [35, 41],
    iconAnchor: [12, 41],
  }),
  cloudy: L.icon({
    iconUrl: '/icons/cloudy.png',
    iconSize: [35, 41],
    iconAnchor: [12, 41],
  }),
};

interface WeatherData {
  coord: {
    lat: number
    lon: number
  }
  name: string
}

interface City {
  country: string
  city: string
  weather: string
  temp: number
  icon: JSX.Element
}

interface MapProps {
  weatherData: WeatherData | null
}

const largeCities = [
  { country: "US", city: "California", weather: "Mostly Sunny", temp: 29, icon: <FaCloudSun size={35} color='yellow' /> },
  { country: "China", city: "Beijing", weather: "Cloudy", temp: 19, icon: <FaCloudRain size={35} color='yellow' /> },
  { country: "Israel", city: "Jerusalem", weather: "Sunny", temp: 31, icon: <FaSun size={35} color='yellow' /> },
  { country: "UK", city: "London", weather: "Cloudy", temp: 15, icon: <FaCloud size={35} color='gray' /> },
  { country: "France", city: "Paris", weather: "Rainy", temp: 18, icon: <FaCloudRain size={35} color='blue' /> },
  { country: "Japan", city: "Tokyo", weather: "Sunny", temp: 27, icon: <FaSun size={35} color='orange' /> },
];

const ChangeMapView:React.FC<{ coords: [number, number] }> = ({ coords }) => {
  const map = useMap()
  map.setView(coords, map.getZoom())
  return null
}

const Map: React.FC<MapProps> = ({ weatherData }) => {
  const [coords, setCoords] = useState<[number, number]>([20, 0])
  const [displayedCities, setDisplayedCities] = useState<City[]>([])
  const citiesRef = useRef(largeCities)

  useEffect(() => {
    if(weatherData) {
      const { coord: { lat, lon } } = weatherData
      setCoords([lat, lon])
    }
  }, [weatherData])

  useEffect(() => {
    const updateCities = () => {
      const shuffledCities = [...citiesRef.current].sort(() => 0.5 - Math.random())
      setDisplayedCities(shuffledCities.slice(0, 3))
    }

    updateCities()
    const interval = setInterval(updateCities, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex lg:flex-row flex-col-reverse">
      <div className="relative flex-1 mx-5 lg:mx-28">
        <div className='flex justify-between mb-6'>
          <div>
            <h1 className='text-white text-2xl'>Global map</h1>
          </div>
          <div className='bg-zinc-800 rounded-full px-5 py-1.5 text-white'>
            <button className='flex gap-x-3 items-center justify-center'>View wide <span><BsStars color='yellow' /></span></button>
          </div>
        </div>
        <MapContainer 
          center={coords} 
          zoom={2} 
          className="lg:h-[80%] h-[50vh] z-0 lg:w-full w-screen rounded-3xl overflow-hidden"
          style={{ backgroundColor: '#1c1c1c' }}
        >
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {weatherData && (
            <Marker position={[weatherData?.coord.lat, weatherData?.coord.lon]} icon={weatherIcons.sunny}>
              <Popup>{weatherData?.name}</Popup>
            </Marker>
          )}
          <ChangeMapView coords={coords} />
        </MapContainer>
        <div className="absolute top-36 left-4 bg-white w-64 h-64 bg-opacity-90 p-6 rounded-3xl shadow-md z-10">
          <p className="text-base font-semibold text-center">Explore global map of wind, weather and oceans condition.</p>
          <img src="/stormy-weather.jpg" alt="Global weather" className="w-full h-20 rounded-2xl my-2"/>
          <button className="px-16 py-2 bg-purple-500 text-black rounded-2xl">Get started</button>
        </div>
      </div>
      <div className="w-full lg:w-1/4 h-full flex -mt-4 flex-col space-y-4 p-4 mx-5 bg-transparent">
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-white text-xl'>Other large cities</h1>
          </div>
          <div className='text-white'>
            <button className='flex gap-x-3 items-center justify-center text-gray-500'>Show All <span><MdOutlineKeyboardArrowRight size={20} /></span></button>
          </div>
        </div>
        {displayedCities.map((city, index) => (
          <div key={index} className="bg-zinc-800 p-4 rounded-3xl text-white flex justify-around items-center space-x-4">
            <div>
              <p className="text-sm">{city.country}</p>
              <p className="text-lg font-semibold">{city.city}</p>
              <p className="text-sm">{city.weather}</p>
            </div>
            <div className='flex flex-col items-center justify-center space-y-2'>
              {city.icon}
              <p className="text-xl font-bold">{city.temp}°</p>
            </div>
          </div>
        ))}
        {/* <div className="bg-zinc-800 p-4 rounded-3xl text-white flex justify-around items-center space-x-4">
          <div>
            <p className="text-sm">China</p>
            <p className="text-lg font-semibold">Beijing</p>
            <p className="text-sm">Cloudy</p>
          </div>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <FaCloudRain size={35} color='yellow' />
            <p className="text-xl font-bold">19°</p>
          </div>
        </div>
        <div className="bg-zinc-800 p-4 rounded-3xl text-white flex justify-around items-center space-x-4">
          <div>
            <p className="text-sm">Israel</p>
            <p className="text-lg font-semibold">Jerusalem</p>
            <p className="text-sm">Sunny</p>
          </div>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <FaSun size={35} color='yellow' />
            <p className="text-xl font-bold">31°</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Map;







