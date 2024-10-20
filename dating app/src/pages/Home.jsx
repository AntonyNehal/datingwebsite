import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // To track the currently displayed profile
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchProfiles(currentUser.preference);
    }
  }, [currentUser]);

  const fetchProfiles = async (preference) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/user/preference/${preference}`);
      const data = await response.json();
      // Exclude the current user's profile
      const filteredProfiles = data.filter(profile => profile.email !== currentUser.email);
      setProfiles(filteredProfiles);
      setCurrentIndex(0); // Reset to the first profile when fetching new profiles
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextProfile = () => {
    // Move to the next profile, wrapping around to the start if at the end
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  if (loading) return <p>Loading profiles...</p>;
  if (profiles.length === 0) return <p>No profiles available.</p>;

  const currentProfile = profiles[currentIndex];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="border p-4 rounded-lg mb-4">
        <img src={currentProfile.image} alt={`${currentProfile.firstName}'s profile`} className="w-full h-40 object-cover rounded" />
        <h3 className="text-xl font-bold">{currentProfile.firstName}</h3>
        <p>Gender: {currentProfile.gender}</p>
        <p>Height: {currentProfile.height} cm</p>
        <p>Interests: {currentProfile.interests.join(', ')}</p>
      </div>
      <button 
        onClick={handleNextProfile} 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next Profile
      </button>
    </div>
  );
};

export default Home;

