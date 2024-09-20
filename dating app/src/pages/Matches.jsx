import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await axios.get('/api/matches');
      setMatches(res.data);
    };

    fetchMatches();
  }, []);

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Your Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {matches.map((match) => (
          <div key={match.id} className="bg-white shadow-md p-4 rounded-lg">
            <img
              src={match.profilePicture}
              alt={match.name}
              className="rounded-full w-24 h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center">{match.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
