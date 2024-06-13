// Header.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice.js';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement your search logic here
    console.log('Search term:', searchTerm);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/sign-in');
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-4 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">
            <span className="text-white">Casick</span>
            <span className="text-yellow-500">Estate</span>
          </h1>
        </div>
        <form onSubmit={handleSearchSubmit} className="relative flex-grow max-w-lg mx-8">
          <div className="flex items-center bg-gray-900 bg-opacity-70 rounded-full px-4 py-2 shadow-inner">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full"
              placeholder="Search properties..."
            />
            <button type="submit" className="text-white hover:text-yellow-500 transition duration-300">
              <FaSearch />
            </button>
          </div>
        </form>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-yellow-500 transition duration-300">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-yellow-500 transition duration-300">About</Link>
          {currentUser ? (
            <>
              <Link to="/profile" className="text-gray-300 hover:text-yellow-500 transition duration-300">Profile</Link>
              <button onClick={handleSignOut} className="text-gray-300 hover:text-yellow-500 transition duration-300">Sign Out</button>
              <img src={currentUser.photoURL || '/path/to/default-avatar.png'} alt="Profile" className="h-10 w-10 rounded-full border-2 border-gray-300" />
            </>
          ) : (
            <Link to="/sign-in" className="text-gray-300 hover:text-yellow-500 transition duration-300">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
