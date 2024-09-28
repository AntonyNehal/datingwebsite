import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Avatar, Button, Dropdown } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice'; // Ensure you have this import

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  return (
    <nav className={`${theme === 'light' ? 'bg-white text-gray-700' : 'bg-gray-800 text-gray-200'} shadow-md p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-500">Dating App</Link>
        <div className="ml-18 flex space-x-4">
          <Button className='w-12 h-10' color='gray' pill onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaSun /> : <FaMoon />} {/* Corrected here */}
          </Button>
          {currentUser ? (
            <>
              <Link to="/home" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>Home</Link>
              <Link to="/messages" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>Messages</Link>
            </>
          ) : (
            <Link to="/" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>Home</Link>
          )}
          {currentUser ? (
            <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded />} >
              <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <>
              <Link to="/login" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>Login</Link>
              <Link to="/register" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
