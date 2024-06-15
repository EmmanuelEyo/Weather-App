import React from 'react';
import { FaBell, FaSun, FaMoon, FaUserCircle, FaTh, FaSearch } from 'react-icons/fa';

const Header: React.FC = () => {
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
            <span className="text-xl">📍 Seattle, Australia</span>
            </div>
        </div>
        <div className="relative">
            <input
                type="text"
                placeholder="Search city..."
                className="bg-zinc-800 text-white rounded-full px-40 py-3 pl-10 focus:outline-none"
            />
            <FaSearch size={20} className="absolute left-3 top-4 text-gray-400" />
        </div>
        <div className="flex items-center space-x-4">
            <FaSun className="text-2xl" />
            <FaMoon className="text-2xl" />
            <FaUserCircle className="text-2xl" />
        </div>
    </header>
  );
};

export default Header;
