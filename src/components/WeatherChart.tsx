import React from 'react';

const data = [
  { time: '10AM', value: 30 },
  { time: '11AM', value: 60 },
  { time: '12AM', value: 90 },
  { time: '01PM', value: 50 },
  { time: '02PM', value: 70 },
  { time: '03PM', value: 50 },
];

const WeatherChart: React.FC = () => {
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
            {data.map((item, index) => (
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





