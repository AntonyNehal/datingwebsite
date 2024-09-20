import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-500">Dating App</Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-700 hover:text-indigo-500">Home</Link>
          <Link to="/messages" className="text-gray-700 hover:text-indigo-500">Messages</Link>
          <Link to="/login" className="text-gray-700 hover:text-indigo-500">Login</Link>
          <Link to="/register" className="text-gray-700 hover:text-indigo-500">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
