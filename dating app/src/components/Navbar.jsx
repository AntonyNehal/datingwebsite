import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoon } from 'react-icons/fa';
import { Avatar, Button, Dropdown } from 'flowbite-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-500">Dating App</Link>
        
        <div className="ml-18 flex space-x-4">
          <div>
            <Button className='w-12 h-10' color='gray' pill>
              <FaMoon className="w-6 h-4" />
            </Button>
          </div>
          {currentUser ? (
            <Link to="/home" className="text-gray-700 hover:text-indigo-500">Home</Link>
          ) : (
            <Link to="/" className="text-gray-700 hover:text-indigo-500">Home</Link>
          )}
          
          <Link to="/messages" className="text-gray-700 hover:text-indigo-500">Messages</Link>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.profilePicture}
                  rounded
                />
              }
            >
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
              <Link to="/login" className="text-gray-700 hover:text-indigo-500">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-indigo-500">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
