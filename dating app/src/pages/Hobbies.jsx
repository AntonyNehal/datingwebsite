import React, { useState } from 'react';

const Hobbies = ({ onSubmit }) => {
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const hobbiesList = [
    'Reading', 
    'Traveling', 
    'Cooking', 
    'Sports', 
    'Music', 
    'Gaming', 
    'Art',
    'Photography',
    'Writing',
    'Dancing',
  ];

  // Handle checkbox changes
  const handleCheckboxChange = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedHobbies); // Trigger callback to parent component or API
  };

  return (
    <div>
      <h2>Select Your Hobbies</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {hobbiesList.map((hobby) => (
            <div key={hobby}>
              <label>
                <input
                  type="checkbox"
                  value={hobby}
                  onChange={() => handleCheckboxChange(hobby)}
                  checked={selectedHobbies.includes(hobby)}
                />
                {hobby}
              </label>
            </div>
          ))}
        </div>
        <button type="submit">Submit Hobbies</button>
      </form>
    </div>
  );
};

export default Hobbies;
