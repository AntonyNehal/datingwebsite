import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the DatePicker CSS
import { useSelector, useDispatch } from 'react-redux';
import { selectGender, setGender } from '../redux/user/genderSlice';

function AdditionalDetails() {
  const [firstName, setFirstName] = useState('');
  const [birthday, setBirthday] = useState(null); // Birthday stored as Date object

  const selectedGender = useSelector(selectGender);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to server
    console.log('First Name:', firstName);
    console.log('Birthday:', birthday);
  };

  const handleGenderChange = (event) => {
    dispatch(setGender(event.target.value));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg text-center transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4 animate-fade-in">Oh hey! Let's start with an intro.</h1>
        <p className="text-gray-600 mb-8 animate-slide-up">It’s never too early to get ready for love!</p>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Name and Birthday Section */}
          <div className="flex justify-between mb-6">
            {/* First Name */}
            <div className="w-1/2 pr-2">
              <label className="block text-left font-semibold text-gray-700 mb-2">Your first name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 ease-in-out hover:shadow-lg"
              />
            </div>

            {/* Birthday */}
            <div className="w-1/2 pl-2">
              <label className="block text-left font-semibold text-gray-700 mb-2">Your birthday</label>
              <DatePicker
                selected={birthday}
                onChange={(date) => setBirthday(date)} // Updates state when date is selected
                dateFormat="dd/MM/yyyy" // Display format
                placeholderText="Select your birthday"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 ease-in-out hover:shadow-lg"
              />
            </div>
          </div>

          {/* Gender Selection */}
          <div className="mb-6">
            <h2 className="text-left text-gray-700 font-semibold mb-2">Which gender best describes you?</h2>
            <div className="flex justify-between text-gray-600">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Woman"
                  checked={selectedGender === 'Woman'}
                  onChange={handleGenderChange}
                  className="text-yellow-600"
                />
                <span>Woman</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Man"
                  checked={selectedGender === 'Man'}
                  onChange={handleGenderChange}
                  className="text-yellow-600"
                />
                <span>Man</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Nonbinary"
                  checked={selectedGender === 'Nonbinary'}
                  onChange={handleGenderChange}
                  className="text-yellow-600"
                />
                <span>Nonbinary</span>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">You can always update this later. A note about gender on Bumble.</p>
          </div>

          {/* Button */}
          <div className="mt-auto">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Next
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-500 mt-6 animate-fade-in-delayed">It’s never too early to count down.</p>
      </div>
    </div>
  );
}

export default AdditionalDetails;
