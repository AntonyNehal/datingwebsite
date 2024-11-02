import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminPanel from './AdminPanel';

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && !currentUser.isAdmin) {
      fetchProfiles(currentUser.preference);
    }
  }, [currentUser]);

  const fetchProfiles = async (preference) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/user/preference/${preference}`);
      const data = await response.json();
      const filteredProfiles = data.filter(
        (profile) => profile.email !== currentUser.email
      );
      setProfiles(filteredProfiles);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const handleSendRequest = async (receiverId) => {
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

  if (loading) return <p>Loading profiles...</p>;
  if (!currentUser) return <p>Please log in to continue.</p>;

  if (currentUser.isAdmin) {
    return <AdminPanel />;
  }

  if (profiles.length === 0) return <p>No profiles available.</p>;

  const currentProfile = profiles[currentIndex];

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-4xl font-extrabold text-center mb-8">Discover New People</h2>
      <div
        className={`max-w-2xl mx-auto shadow-xl rounded-lg overflow-hidden transition-colors ${
          currentUser.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <div className="relative">
          <img
            src={currentProfile.image}
            alt={`${currentProfile.firstName}'s profile`}
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute top-4 left-4 p-4 bg-black bg-opacity-50 text-white rounded-lg">
            <h3 className="text-2xl font-bold">{currentProfile.firstName}</h3>
            <p className="text-sm">{currentProfile.gender}</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-lg">Height:</p>
              <p>{currentProfile.height} cm</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Interests:</p>
              <p className="break-words">{currentProfile.interests.join(', ')}</p>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={handleNextProfile}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest(currentProfile._id)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
