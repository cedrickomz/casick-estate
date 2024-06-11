import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement your search logic here
    console.log('Search term:', searchTerm);
  };

  return (
    <header className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/path/to/your/logo.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-3xl text-white font-extrabold">
            <span>Casick Estate</span>
          </h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
          <Link to="/about" className=" text-gray-300 hover:text-white transition duration-300">About</Link>
          <Link to="/sign-in" className=" text-gray-300 hover:text-white transition duration-300">Sign In</Link>
          <Link to="/profile" className="hidden sm:inline text-gray-300 hover:text-white transition duration-300">Profile</Link>
          <Link to="/sign-up" className= "hidden sm:inline text-gray-300 hover:text-white transition duration-300">Sign Up</Link>
        </nav>
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 bg-gray-800 rounded-full px-3 py-1">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none"
            placeholder="Search..."
          />
          <button type="submit" className="text-gray-300 hover:text-white transition duration-300">
            <FaSearch />
          </button>
        </form>
      </div>
    </header>
  );
}
