import React, { useState } from 'react';
import { MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate ,Link} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch,useSelector } from 'react-redux';
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const{loading,error:errorMessage}=useSelector(state=>state.user);
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'));
    }

    // setLoading(true);
    // setErrorMessage(null);

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        // setLoading(false);
        dispatch(signInFailure(data.message));
      }

      // setLoading(false);
      console.log('Login successful:', data);
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/home');
        }
 
    } catch (err) {
      // setErrorMessage('Something went wrong, please try again.');
      // setLoading(false);
      dispatch(signInFailure(error.message));
      console.error('Error login:', err);
    }
  };

  return (
    <div className="container mx-auto my-5">
      <div className="flex flex-wrap justify-center items-center min-h-screen">
        
        <div className="w-full md:w-1/2 mb-4">
          <img 
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
            alt="Sample image" 
            className="mx-auto w-full max-w-sm"
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex items-center justify-center mb-4">
            <p className="text-lg font-medium mr-3">Sign in with</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-1">
              <MDBIcon fab icon="facebook-f" />
            </button>
            <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mx-1">
              <MDBIcon fab icon="twitter" />
            </button>
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mx-1">
              <MDBIcon fab icon="linkedin-in" />
            </button>
          </div>

          <div className="flex items-center justify-center mb-4">
            <span className="divider block w-1/4 bg-gray-300 h-px"></span>
            <p className="text-center font-semibold mx-4">Or</p>
            <span className="divider block w-1/4 bg-gray-300 h-px"></span>
          </div>

          <MDBInput 
            wrapperClass="mb-4" 
            label="Username" 
            id="username" 
            type="username" 
            size="lg" 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md" 
          />
          <MDBInput 
            wrapperClass="mb-4" 
            label="Password" 
            id="password" 
            type="password" 
            size="lg" 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md" 
          />

          <div className="flex justify-between items-center mb-4">
            <MDBCheckbox name="flexCheck" id="flexCheckDefault" label="  Remember me" className="text-sm" />
            <a href="#!" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
          </div>

          <div className="text-center md:text-left">
            <button 
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                'Login'
              )}
            </button>
            <OAuth/>
            <p className="text-sm mt-2">
              Don't have an account? 
              <Link to="/register" className="text-red-500 hover:underline"> Register</Link>
            </p>
            {/* Error Message */}
      {errorMessage && (
        <div className="w-full max-w-md mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
}
