
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetails, resetDetails } from '../redux/user/additionaldetailsSlice.js';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase'; // Ensure this imports your firebase config
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const interestsList = [
  'Horror', 'Vegetarian', 'City breaks', 'Cats', 'Art', 
  'Skiing', 'Music', 'Traveling', 'Gaming', 'Cooking'
];

const AdditionalDetails = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    birthday: '',
    gender: '',
    height: '',
    interests: [],
    image: '',
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preference, setPreference] = useState(''); // State for user preference

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isSubmitted = useSelector((state) => state.additionalDetails.submitted);

  useEffect(() => {
    const fetchAdditionalDetails = async () => {
      try {
        const encodedEmail = encodeURIComponent(currentUser.email);
        const response = await fetch(`http://localhost:3000/api/auth/additionaldetails/${encodedEmail}`);

        if (response.ok) {
          const data = await response.json();
          setFormData({
            firstName: data.firstName || '',
            birthday: data.birthday || '',
            gender: data.gender || '',
            height: data.height || '',
            interests: data.interests || [],
            image: data.image || '',
          });
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
      setFormData({ ...formData, interests: interests.filter((i) => i !== interest) });
    } else if (interests.length < 5) {
      setFormData({ ...formData, interests: [...interests, interest] });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      uploadImage(file);
    }
  };

  const uploadImage = (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setIsUploading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading image:', error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, image: downloadURL }));
          setIsUploading(false);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/additionaldetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          email: currentUser.email,
          preference, // Include the user preference
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(updateDetails(data));
        dispatch(resetDetails());
        navigate('/home');
      } else {
        console.error('Failed to submit additional details');
      }
    } catch (error) {
      console.error('Error submitting additional details:', error);
    }
  };

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
            value={formData.firstName || ''}
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
            value={formData.birthday || ''}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender || ''}
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
            value={formData.height || ''}
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
                className={`p-2 border rounded ${
                  formData.interests.includes(interest) ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
                onClick={() => handleInterestClick(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Upload Your Photo</h2>
<div className="border-2 border-dashed border-gray-300 w-40 h-40 flex items-center justify-center mb-4 relative">
  {selectedImage ? (
    <img
      src={URL.createObjectURL(selectedImage)}
      alt="Uploaded"
      className="w-full h-full object-cover"
    />
  ) : (
    <label 
      className="flex items-center justify-center cursor-pointer h-full w-full"
    >
      <span className="text-4xl text-gray-400">+</span>
      <input
        type="file"
        className="opacity-0 absolute inset-0 h-full w-full cursor-pointer"
        onChange={handleFileChange}
        accept="image/*"
      />
    </label>
  )}
</div>


        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Who Would You Like to Interact With?</h3>
          <div className="flex space-x-8">
            {['male', 'female', 'both'].map((value) => (
              <label key={value} className="flex items-center space-x-3 text-lg font-medium">
                <input
                  type="radio"
                  name="preference"
                  value={value}
                  onChange={() => setPreference(value)}
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={preference === value}
                />
                <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
        {isUploading && <p className="mt-4">Uploading: {Math.round(uploadProgress)}%</p>}
        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
          disabled={isUploading}
        >
          {isUploading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AdditionalDetails;