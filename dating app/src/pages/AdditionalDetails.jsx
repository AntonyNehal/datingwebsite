import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetails, resetDetails } from '../redux/user/additionaldetailsSlice.js';
import { useNavigate } from 'react-router-dom';

const interestsList = [
  'Horror', 'Vegetarian', 'City breaks', 'Cats', 'Art', 'Skiing', 'Music', 'Traveling', 'Gaming', 'Cooking'
];

const AdditionalDetails = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    birthday: '',
    gender: '',
    height: '',
    interests: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isSubmitted = useSelector((state) => state.additionalDetails.submitted); // Get the submitted flag from Redux

  useEffect(() => {
    const fetchAdditionalDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/additionaldetails/${currentUser.email}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            // Update state with fetched data
            setFormData(data);
          }
        } else {
          console.error('Failed to fetch additional details');
        }
      } catch (error) {
        console.error('Error fetching additional details:', error);
      }
    };

    fetchAdditionalDetails();
  }, [currentUser.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterestClick = (interest) => {
    const { interests } = formData;
    if (interests.includes(interest)) {
      setFormData({ ...formData, interests: interests.filter(i => i !== interest) });
    } else if (interests.length < 5) {
      setFormData({ ...formData, interests: [...interests, interest] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/additionaldetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          email: currentUser.email,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(updateDetails(data)); // Update the Redux state
        // Reset form data if you want to allow resubmission later
        dispatch(resetDetails()); // Reset submitted flag
        navigate('/home');
      } else {
        console.error('Failed to submit additional details');
      }
    } catch (error) {
      console.error('Error submitting additional details:', error);
    }
  };

  // If already submitted, show a message instead of the form
  if (isSubmitted) {
    return <div>Your details have already been submitted.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Additional Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Select Interests (Up to 5)</label>
          <div className="grid grid-cols-2 gap-2">
            {interestsList.map((interest) => (
              <button
                key={interest}
                type="button"
                className={`p-2 border rounded ${formData.interests.includes(interest) ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                onClick={() => handleInterestClick(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdditionalDetails;
