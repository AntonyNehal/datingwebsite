import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectGender, setGender } from '../redux/user/genderSlice';

function AdditionalDetails() {
  const [firstName, setFirstName] = useState('');
  const [birthday, setBirthday] = useState(null);
  const selectedGender = useSelector(selectGender);
  const dispatch = useDispatch();
  const [selectedHeight, setSelectedHeight] = useState(164);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    'Horror', 'Vegetarian', 'City breaks', 'Cats', 'Art', 'Skiing', 'Music', 'Traveling', 'Gaming', 'Cooking'
  ];

  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleHeightChange = (e) => {
    setSelectedHeight(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('First Name:', firstName);
    console.log('Birthday:', birthday);
  };

  const handleGenderChange = (event) => {
    dispatch(setGender(event.target.value));
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-700 mb-4 text-center">Oh hey! Let's start with an intro.</h1>
        <p className="text-gray-600 mb-8 text-center">It’s never too early to get ready for love!</p>

        <form onSubmit={handleSubmit} className="flex flex-wrap justify-between space-y-6">
          {/* Name and Birthday Section */}
          <div className="w-full md:w-1/2 px-2">
        <label className="block text-left font-semibold text-gray-700 mb-2">Your first name</label>
        <input
         type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
         placeholder="First Name"
         className="w-full p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        </div>

          <div className="w-full md:w-1/2 px-2">
            <label className="block text-left font-semibold text-gray-700 mb-2">Your birthday</label>
            <DatePicker
              selected={birthday}
              onChange={(date) => setBirthday(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select your birthday"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Gender Selection */}
          <div className="w-full md:w-1/2 px-2">
            <h2 className="text-left text-gray-700 font-semibold mb-2">Which gender best describes you?</h2>
            <div className="flex justify-between text-gray-600">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Woman"
                  checked={selectedGender === 'Woman'}
                  onChange={handleGenderChange}
                  className="text-indigo-600"
                />
                <span>Woman</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Man"
                  checked={selectedGender === 'Man'}
                  onChange={handleGenderChange}
                  className="text-indigo-600"
                />
                <span>Man</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Nonbinary"
                  checked={selectedGender === 'Nonbinary'}
                  onChange={handleGenderChange}
                  className="text-indigo-600"
                />
                <span>Nonbinary</span>
              </label>
            </div>
          </div>

          {/* Height Slider */}
          <div className="w-full md:w-1/2 px-2">
            <h2 className="text-left text-gray-700 font-semibold mb-2">Your height</h2>
            <div className="flex items-center">
              <input
                type="range"
                min="150"
                max="220"
                value={selectedHeight}
                onChange={handleHeightChange}
                className="slider w-full"
              />
              <span className="ml-4 text-gray-800 font-semibold">{selectedHeight}cm</span>
            </div>
          </div>

          {/* Interest Selection */}
          <div className="w-full px-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Choose 5 things you're really into</h2>
            <p className="text-gray-600 mb-6 text-center">Proud foodie or big on bouldering? Add interests to your profile to help you match with people who love them too.</p>
            
            <div className="interest-options grid grid-cols-2 sm:grid-cols-3 gap-4">
              {interests.filter(interest => selectedInterests.includes(interest)).map(interest => (
                <div
                  key={interest}
                  className="interest-item bg-indigo-500 text-white p-3 rounded-lg cursor-pointer"
                  onClick={() => handleInterestClick(interest)}
                >
                  {interest}
                </div>
              ))}
              {interests.filter(interest => !selectedInterests.includes(interest)).map(interest => (
                <div
                  key={interest}
                  className="interest-item bg-gray-200 text-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-300"
                  onClick={() => handleInterestClick(interest)}
                >
                  {interest}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-700">{selectedInterests.length}/5 selected</p>
            </div>
          </div>

          {/* Next Button */}
          <div className="w-full mt-auto">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdditionalDetails;
