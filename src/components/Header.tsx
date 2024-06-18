import React, { useEffect, useState } from 'react';
import { FaBell, FaSun, FaMoon, FaUserCircle, FaTh, FaSearch } from 'react-icons/fa';
import { WeatherData } from '../types';


const Header: React.FC<{ setWeatherData: (data: WeatherData) => void }> = ({ setWeatherData }) => {
    const [currentLocation, setCurrentLocation] = useState('Loading location...');
    const [searchInput, setSearchInput] = useState('');
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchInput) {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}`);
                const data = await res.json();
                if (data.cod !== 200) {
                    console.error('Error fetching weather data:', data.message);
                    alert('Error fetching weather data: ' + data.message);
                } else {
                    setWeatherData(data);
                    setCurrentLocation(data.name);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
            setSearchInput(''); 
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
                    const data = await res.json();
                    if (data.cod !== 200) {
                        console.error('Error fetching weather data:', data.message);
                        setCurrentLocation('Location not found');
                    } else {
                        setCurrentLocation(data.name);
                        setWeatherData(data);
                    }
                } catch (error) {
                    setCurrentLocation('Location not found');
                    console.error('Error fetching weather data:', error);
                }
            }, () => {
                setCurrentLocation('Geolocation not supported');
            });
        } else {
            setCurrentLocation('Geolocation not supported');
        }
    }, [apiKey, setWeatherData]);

    return (
        <header className="bg-transparent text-white flex items-center justify-around p-8">
            <div className="flex items-center space-x-4">
                <div className="bg-zinc-800 rounded-full px-4 py-4">
                    <FaTh size={15} />
                </div>
                <div className="bg-zinc-800 rounded-full px-4 py-4">
                    <FaBell size={15} />
                </div>
                <div className="flex items-center space-x-1">
                    <span className="text-xl">📍 {currentLocation}</span>
                </div>
            </div>
            <form className="relative" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchChange}
                    placeholder="Search city..."
                    className="bg-zinc-800 text-white rounded-full px-40 py-3 pl-10 focus:outline-none"
                />
                <FaSearch size={20} className="absolute left-3 top-4 text-gray-400" />
            </form>
            <div className="flex items-center space-x-4">
                <FaSun className="text-2xl" />
                <FaMoon className="text-2xl" />
                <FaUserCircle className="text-2xl" />
            </div>
        </header>
    );
};

export default Header;



