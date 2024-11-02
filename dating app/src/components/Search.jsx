import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const interests = [
  'Horror', 'Vegetarian', 'City breaks', 'Cats', 'Art',
  'Skiing', 'Music', 'Traveling', 'Gaming', 'Cooking'
];

const SearchPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [query, setQuery] = useState({
    username: '',
    interest: '',
    minAge: '',
    maxAge: '',
    gender: '',
    minHeight: '',
    maxHeight: '',
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/user/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleSendRequest = async (receiverId) => {
    if (!currentUser) {
      alert('Please log in to send friend requests.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/user/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: currentUser._id, receiverId }),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-4 bg-gray-100 dark:bg-gray-800">
        <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          />

          <select
            name="interest"
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            <option value="">Select Interest</option>
            {interests.map((interest, index) => (
              <option key={index} value={interest}>
                {interest}
              </option>
            ))}
          </select>

          <select
            name="gender"
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            type="number"
            name="minAge"
            placeholder="Min Age"
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          />

          <input
            type="number"
            name="maxAge"
            placeholder="Max Age"
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          />

          <input
            type="number"
            name="minHeight"
            placeholder="Min Height (cm)"
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          />

          <input
            type="number"
            name="maxHeight"
            placeholder="Max Height (cm)"
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          />

          <button
            type="submit"
            className="w-full p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Search
          </button>
        </form>
      </div>

      <div className="w-2/3 p-4 overflow-auto">
        {results.length > 0 ? (
          results.map((user) => (
            <div
              key={user._id}
              className="p-4 mb-4 bg-white dark:bg-gray-700 rounded shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold">{user.username}</h3>
              <p>Gender: {user.gender}</p>
              <p>Age: {new Date().getFullYear() - new Date(user.birthday).getFullYear()}</p>
              <p>Height: {user.height} cm</p>
              <p>Interests: {user.interests.join(', ')}</p>
              <button 
                onClick={() => handleSendRequest(user._id)} 
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              >
                Send Request
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
