import React, { useState } from 'react';

const profiles = [
  { id: 1, name: 'Alice', age: 25, image: '/path/to/image1.jpg' },
  { id: 2, name: 'Bob', age: 28, image: '/path/to/image2.jpg' },
  // More profiles
];

const SwipeDeck = () => {
  const [index, setIndex] = useState(0);

  const handleLike = () => {
    setIndex(index + 1);
    // Handle like logic here
  };

  const handleDislike = () => {
    setIndex(index + 1);
    // Handle dislike logic here
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {index < profiles.length ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img src={profiles[index].image} alt={profiles[index].name} className="mb-4" />
          <h2 className="text-xl font-bold">{profiles[index].name}, {profiles[index].age}</h2>
          <div className="flex space-x-4 mt-4">
            <button onClick={handleDislike} className="bg-red-500 text-white px-4 py-2 rounded">Dislike</button>
            <button onClick={handleLike} className="bg-green-500 text-white px-4 py-2 rounded">Like</button>
          </div>
        </div>
      ) : (
        <p>No more profiles</p>
      )}
    </div>
  );
};

export default SwipeDeck;
