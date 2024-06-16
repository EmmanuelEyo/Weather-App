import React, { useEffect, useState } from 'react';
import { FaBell, FaSun, FaMoon, FaUserCircle, FaTh, FaSearch } from 'react-icons/fa';

const Header: React.FC = () => {
    const [currentLocation, setCurrentLocation] = useState('Loading location...')
    const [searchInput, setSearchInput] = useState('')

    const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }

    const handleSearchSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearchInput('')
        console.log('Searching for:', searchInput)
    }
    

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords
                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                    .then(res => res.json())
                    .then(data => setCurrentLocation(data.city || 'Location not found'))
                    .catch(() => setCurrentLocation('Location not found'))
            }, () => {
                setCurrentLocation('Geolocation not supported')
            })
        } else {
            setCurrentLocation('Geolocation not supported')
        }
    }, [])

  return (
    <header className="bg-transparent text-white flex items-center justify-around p-8">
        <div className="flex items-center space-x-4">
            <div className="bg-zinc-800 rounded-full px-4 py-4">
                <FaTh size={15} />
            </div>
            <div className='bg-zinc-800 rounded-full px-4 py-4'>
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
