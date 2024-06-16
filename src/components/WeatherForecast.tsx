import React, { useState, useEffect } from 'react';
import { FaSun, FaCloudSun, FaCloudRain, FaCloudShowersHeavy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import WeatherChart from './WeatherChart';

const days = [
  { day: "Mon", temp: 16, icon: <FaSun />, details: { feel: 19, wind: "NE 5-8 km/h", pressure: "1000 MB", humidity: "51%", sunrise: "6:02 AM", sunset: "8:18 PM", time: "11:42 PM" } },
  { day: "Tue", temp: 10, icon: <FaCloudShowersHeavy />, details: { feel: 19, wind: "NE 5-8 km/h", pressure: "1000 MB", humidity: "51%", sunrise: "6:02 AM", sunset: "8:18 PM", time: "11:42 PM" } },
  { day: "Wed", temp: 15, icon: <FaCloudRain />, details: { feel: 19, wind: "NE 5-8 km/h", pressure: "1000 MB", humidity: "51%", sunrise: "6:02 AM", sunset: "8:18 PM", time: "11:42 PM" } },
  { day: "Thu", temp: 11, icon: <FaCloudSun />, details: { feel: 19, wind: "NE 5-8 km/h", pressure: "1000 MB", humidity: "51%", sunrise: "6:02 AM", sunset: "8:18 PM", time: "11:42 PM" } },
  { day: "Fri", temp: 18, icon: <FaCloudSun />, details: { feel: 19, wind: "NE 5-8 km/h", pressure: "1000 MB", humidity: "51%", sunrise: "6:02 AM", sunset: "8:18 PM", time: "11:42 PM" } },
  { day: "Sat", temp: 12, icon: <FaCloudShowersHeavy />, details: { feel: 19, wind: "NE 5-8 km/h", pressure: "1000 MB", humidity: "51%", sunrise: "6:02 AM", sunset: "8:18 PM", time: "11:42 PM" } },
  { day: "Sun", temp: 10, icon: <FaCloudRain />, details: { feel: 19, wind: "NE 5-8 km/h", pressure: "1000 MB", humidity: "51%", sunrise: "6:02 AM", sunset: "8:18 PM", time: "11:42 PM" } },
];

const Card = ({ day }: { day: typeof days[0] }) => (
  <div className="flex flex-col h-52 w-full md:w-56 items-center bg-[#BBD7EC] p-4 rounded-3xl relative">
    <div className="absolute top-0 left-0 right-0 text-black bg-[#AECADF] p-2 rounded-t-3xl flex justify-between">
      <div className="text-lg font-semibold mb-2">{day.day}</div>
      <div className="text-lg font-semibold">{day.details?.time}</div>
    </div>
    <div className="flex mt-10 justify-between items-center space-x-32">
      <div className="text-6xl font-bold mb-2 text-black">{day.temp}°</div>
      <div className="flex items-center justify-center text-yellow-300 text-6xl">
        {day.icon}
      </div>
    </div>
    <div className="flex justify-between space-x-20 text-black">
      <div>
        <div className="text-xs font-semibold">Real Feel: {day.details?.feel}°</div>
        <div className="text-xs font-semibold">Wind: {day.details?.wind}</div>
        <div className="text-xs font-semibold">Pressure: {day.details?.pressure}</div>
        <div className="text-xs font-semibold">Humidity: {day.details?.humidity}</div>
      </div>
      <div className='flex flex-col justify-end'>
        <div className="text-xs font-semibold">Sunrise: {day.details?.sunrise}</div>
        <div className="text-xs font-semibold">Sunset: {day.details?.sunset}</div>
      </div>
    </div>
  </div>
);

const CardStack = ({ items, offset = 10, scaleFactor = 0.06 }: { items: typeof days; offset?: number; scaleFactor?: number }) => {
  const [cards, setCards] = useState(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prevCards => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-60 w-full md:h-60 md:w-96">
      {cards.map((card, index) => (
        <motion.div
          key={card.day}
          className="absolute dark:bg-black mt-20 bg-white h-60 w-full md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
          style={{ transformOrigin: "top center" }}
          animate={{ top: index * -offset, scale: 1 - index * scaleFactor, zIndex: cards.length - index }}
        >
          <Card day={card} />
        </motion.div>
      ))}
    </div>
  );
};

const WeatherForecast: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Forecast');
  const [screenSize, setScreenSize] = useState([0, 0])
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(0)

  const handleCardClick = (index: number) => {
    setOpenCardIndex(openCardIndex === index ? null : index)
  }

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize([window.innerWidth, window.innerHeight])
    }
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)

    return () => {
      window.removeEventListener('resize', updateScreenSize)
    }
  }, [])

  let hiddenClass;

  if (screenSize[0] <= 1024) {
    hiddenClass = 'hidden';
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-transparent text-white lg:px-28 lg:py-10 px-2 flex justify-between flex-col lg:flex-row">
      <div className="block md:hidden justify-center mb-4">
        <CardStack items={days} />
      </div>
      <div className="hidden md:block">
        <div className="flex justify-between mb-4">
          <div>
            <button className="text-gray-500 text-2xl px-4 py-2">Today</button>
            <button className="text-gray-500 text-2xl px-4 py-2">Tomorrow</button>
            <button className="text-white text-2xl px-4 py-2">Next 7 days</button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex bg-zinc-800 rounded-full">
              <button onClick={() => handleTabClick('Forecast')} className={`text-white py-1.5 px-7 rounded-full ${activeTab === 'Forecast' ? 'bg-[#BBD7EC] text-zinc-950' : 'text-gray-500'}`}>Forecast</button>
              <button onClick={() => handleTabClick('Air quality')} className={`text-white py-1.5 px-7 rounded-full ${activeTab === 'Air quality' ? 'bg-[#BBD7EC] text-zinc-950' : 'text-gray-500'}`}>Air quality</button>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 mb-4">
          {days.map((day, index) => (
            <div key={index} className={`flex flex-col items-center p-4 rounded-3xl cursor-pointer ${openCardIndex === index ? 'bg-[#bbd7ec] h-52 w-56 relative' : 'bg-zinc-800 h-52 w-20'}`} onClick={() => handleCardClick(index)}>
                {/* <div className="flex justify-between">
                  <div className='text-lg font-semibold mb-2'>{day.day}</div>
                  <div className='text-lg font-semibold'>{day.details?.time}</div>
                </div> */}
              {openCardIndex === index && (
                <>
                  <div className="flex justify-between absolute top-0 right-0 left-0 gap-x-24 bg-[#AECADF] rounded-t-3xl p-2">
                    <div className='text-lg font-semibold mb-2'>{day.day}</div>
                    <div className='text-lg font-semibold'>{day.details?.time}</div>
                  </div>
                  <div className='flex mt-10 justify-between items-center space-x-10'>
                    <div className='text-6xl font-bold mb-2 text-black'>{day.temp}°</div>
                    <div className='flex items-center justify-center text-yellow-300 text-6xl'>
                      {day.icon}
                    </div>
                  </div>
                  <div className='flex justify-between text-black'>
                    <div>
                      <div className="text-xs font-semibold">Real Feel: {day.details?.feel}°</div>
                      <div className="text-xs font-semibold">Wind: {day.details?.wind}</div>
                      <div className="text-xs font-semibold">Pressure: {day.details?.pressure}</div>
                      <div className="text-xs font-semibold">Humidity: {day.details?.humidity}</div>
                    </div>
                    <div className='flex flex-col justify-end'>
                      <div className="text-xs font-semibold">Sunrise: {day.details?.sunrise}</div>
                      <div className="text-xs font-semibold">Sunset: {day.details?.sunset}</div>
                    </div>
                  </div>
                </>
              )}
              {openCardIndex !== index && (
                <>
                  <div className='text-lg mb-2'>{day.day}</div>
                  <hr className='w-10 h-10 text-gray-700' />
                  <div className='flex items-center justify-center mb-5 text-yellow-300 text-4xl'>
                    {day.icon}
                  </div>
                  <div className='text-3xl font-semibold mb-2'>{day.temp}°</div>
                </>
              )}
            </div>
          ))}
          {/* <div className="flex flex-col h-52 w-56 items-center bg-[#BBD7EC] p-4 rounded-3xl relative">
            <div className="absolute top-0 left-0 right-0 text-black bg-[#AECADF] p-2 rounded-t-3xl flex justify-between">
              <div className="text-lg font-semibold mb-2">{days[0].day}</div>
              <div className="text-lg font-semibold">{days[0].details?.time}</div>
            </div>
            <div className="flex mt-10 justify-between items-center space-x-10">
              <div className="text-6xl font-bold mb-2 text-black">{days[0].temp}°</div>
              <div className="flex items-center justify-center text-yellow-300 text-6xl">
                {days[0].icon}
              </div>
            </div>
            <div className="flex justify-between text-black">
              <div>
                <div className="text-xs font-semibold">Real Feel: {days[0].details?.feel}°</div>
                <div className="text-xs font-semibold">Wind: {days[0].details?.wind}</div>
                <div className="text-xs font-semibold">Pressure: {days[0].details?.pressure}</div>
                <div className="text-xs font-semibold">Humidity: {days[0].details?.humidity}</div>
              </div>
              <div className='flex flex-col justify-end'>
                <div className="text-xs font-semibold">Sunrise: {days[0].details?.sunrise}</div>
                <div className="text-xs font-semibold">Sunset: {days[0].details?.sunset}</div>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            {days.slice(1).map((day, index) => (
              <div key={index} className="flex flex-col items-center bg-zinc-800 h-52 w-20 p-4 rounded-3xl">
                <div className="text-lg mb-2">{day.day}</div>
                <hr className='w-10 h-10 text-gray-700' />
                <div className="flex items-center justify-center mb-5 text-yellow-300 text-4xl">
                  {day.icon}
                </div>
                <div className="text-3xl font-semibold mb-2">{day.temp}°</div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      <div className={`xl:block ${hiddenClass}`}>
        <WeatherChart />
      </div>
    </div>
  );
};

export default WeatherForecast;