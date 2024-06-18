import React, { useEffect, useState } from 'react';

interface WeatherData {
  coord: {
    lat: number;
    lon: number;
  };
}

interface ForecastData {
  list: {
    dt: number;
    pop: number;
  }[];
}

interface ChartData {
  time: string;
  value: number;
}

const WeatherChart: React.FC<{ weatherData: WeatherData | null }> = ({ weatherData }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

  useEffect(() => {
    const fetchHourlyData = async () => {
      if (!weatherData) return;
      const { coord } = weatherData;
      const { lat, lon } = coord;

      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data: ForecastData = await res.json();

        if (data.cod !== '200') {
          console.error('Error fetching weather data:', data.message);
          return;
        }

        const hourlyData = data.list.slice(0, 6).map(item => ({
          time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
          value: item.pop * 100,
        }));

        setChartData(hourlyData);
      } catch (err) {
        console.error('Error fetching weather data:', err);
      }
    };

    fetchHourlyData();
  }, [weatherData, apiKey]);

  return (
    <>
      <h1 className='text-2xl text-white'>Chance of rain</h1>
      <div className="max-w-md mx-auto mt-12 relative">
        <div className="flex justify-center space-x-4">
          <div className="flex flex-col justify-between text-gray-500 text-base h-32 mr-2">
            <span>Heavy</span>
            <span>Sunny</span>
            <span>Rainy</span>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {chartData.map((item, index) => (
              <div key={index} className="relative w-full flex flex-col items-center">
                <div className="relative w-2 h-32 flex flex-col justify-end bg-gray-700 rounded-md overflow-hidden mt-10">
                  <div
                    className="bg-[#BBD7EC]"
                    style={{ height: `${item.value}%` }}
                  ></div>
                </div>
                <span className="text-gray-500 text-xs mt-2">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute left-14 right-0 bottom-[4.5rem] flex flex-col justify-between h-28">
          <div className="border-t border-dashed border-gray-500"></div>
          <div className="border-t border-dashed border-gray-500"></div>
          <div className="border-t border-dashed border-gray-500"></div>
        </div>
      </div>
    </>
  );
};

export default WeatherChart;







