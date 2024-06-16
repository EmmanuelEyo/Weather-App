import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSun, FaCloudSun, FaCloudRain } from 'react-icons/fa';

const weatherIcons = {
  sunny: L.icon({
    iconUrl: '/icons/sunny.png',
    iconSize: [35, 41],
    iconAnchor: [12, 41],
  }),
  rainy: L.icon({
    iconUrl: '/icons/rainy.png',
    iconSize: [35, 41],
    iconAnchor: [12, 41],
  }),
};

const Map: React.FC = () => {
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
          center={[20, 0]} 
          zoom={2} 
          className="lg:h-[80%] h-[50vh] z-0 lg:w-full w-screen rounded-3xl overflow-hidden"
          style={{ backgroundColor: '#1c1c1c' }}
        >
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[47.6062, -122.3321]} icon={weatherIcons.sunny}>
            <Popup>Seattle, WA</Popup>
          </Marker>
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
        <div className="bg-zinc-800 p-4 rounded-3xl text-white flex justify-around items-center space-x-4">
          <div>
            <p className="text-sm">US</p>
            <p className="text-lg font-semibold">California</p>
            <p className="text-sm">Mostly Sunny</p>
          </div>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <FaCloudSun size={35} color='yellow' />
            <p className="text-xl font-bold">29°</p>
          </div>
        </div>
        <div className="bg-zinc-800 p-4 rounded-3xl text-white flex justify-around items-center space-x-4">
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
        </div>
      </div>
    </div>
  );
};

export default Map;







