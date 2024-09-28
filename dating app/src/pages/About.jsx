import React from 'react';
import { useSelector } from 'react-redux';

const About = () => {
  const { theme } = useSelector((state) => state.theme); // Get the current theme from Redux

  return (
    <div className={`flex justify-center items-center h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <div className="text-center">
        <h1 className={`text-5xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'} mb-4`}>
          Welcome to CECINDER
        </h1>
        <p className={`text-lg mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          Find your match today!
        </p>
        <a
          href="/register"
          className={`py-2 px-4 rounded ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-blue-700 text-white'}`}
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default About;
