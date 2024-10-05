import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './background.css';
import { useDispatch,useSelector } from 'react-redux';
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const{loading,error:errorMessage}=useSelector(state=>state.user);
  const dispatch = useDispatch()


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'));
    }

    try {
        dispatch(signInStart());
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data.message));
      }
      console.log('Registration successful:', data);
      if(res.ok){
      dispatch(signInSuccess(data));
      navigate('/additionaldetails');
      }
    } catch (err) {
      dispatch(signInFailure(error.message));
      console.error('Error registering:', err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
    <div className="animated-background absolute inset-0"></div> {/* Animated Background */}
    <form onSubmit={handleRegister} className="relative z-10 bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg transform transition-transform hover:scale-105 duration-300">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-700 animate-bounce">Register</h2>
      <div className="space-y-4">
        <input
          type="text"
          id="username"
          placeholder="Name"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
        <input
          type="email"
          id="email"
          placeholder="name@gmail.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
      </div>
      <button 
        type="submit"
        className={`w-full bg-indigo-600 text-white p-3 mt-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner size="sm" />
            <span className="pl-3">Registering...</span>
          </>
        ) : (
          'Register'
        )}
      </button>
      <OAuth/>
      {/* Error Message */}
      {errorMessage && (
        <div className="w-full max-w-lg mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        </div>
      )}
    </form>
  </div>
);
};

export default Register;

// TailwindCSS Spinner Component
const Spinner = ({ size = 'md' }) => {
const sizeClass = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6';
return (
  <svg className={`${sizeClass} animate-spin text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    ></path>
  </svg>
);
};

