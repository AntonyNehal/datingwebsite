import React from 'react';

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to CECINDER</h1>
        <p className="text-gray-600 text-lg mb-8">Find your match today!</p>
        <a href="/register" className="bg-blue-500 text-white py-2 px-4 rounded">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Home;

