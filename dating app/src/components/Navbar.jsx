import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun, FaBell, FaSearch } from 'react-icons/fa';
import { Avatar, Button, Dropdown, Sidebar } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [hasNewRequests, setHasNewRequests] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchFriendRequests();
    }
  }, [currentUser]);

  const fetchFriendRequests = async () => {
    setLoadingRequests(true);
    try {
      const response = await fetch(`http://localhost:3000/api/user/${currentUser._id}/requests`);
      const data = await response.json();
      setFriendRequests(data);
      setHasNewRequests(data.length > 0);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleAcceptRequest = async (senderId) => {
    try {
      const response = await fetch('http://localhost:3000/api/user/accept-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId, receiverId: currentUser._id }),
      });

      const result = await response.json();
      alert(result.message);
      fetchFriendRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  return (
    <nav className={`shadow-md p-4 ${theme === 'light' ? 'bg-white text-gray-700' : 'bg-gray-800 text-gray-200'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-500 bg-transparent hover:text-indigo-500 focus:outline-none transition-transform transform hover:scale-110"
            aria-label="Toggle sidebar"
          >
            <span className="text-2xl">☰</span>
          </button>

          <Link to="/" className="text-xl font-bold text-indigo-500">
            Dating Website
          </Link>
        </div>

        <div className="ml-auto flex space-x-4 items-center">
          {currentUser && (
            <Link to="/search">
              <FaSearch size={24} className="text-gray-500 hover:text-indigo-500 transition" aria-label="Search" />
            </Link>
          )}

          <Button
            className="w-12 h-10"
            color="gray"
            pill
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaSun /> : <FaMoon />}
          </Button>

          {currentUser && (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="relative">
                  <FaBell size={24} aria-label="Friend requests" />
                  {hasNewRequests && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full"></span>
                  )}
                </div>
              }
            >
              <Dropdown.Header className={`${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-200'}`}>
                <span className="font-bold">Friend Requests</span>
              </Dropdown.Header>

              {loadingRequests ? (
                <Dropdown.Item className={`${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-200'}`}>
                  Loading...
                </Dropdown.Item>
              ) : (
                friendRequests.length > 0 ? (
                  friendRequests.map((req) => (
                    <Dropdown.Item key={req._id} className={`${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-200'}`}>
                      <div className="flex justify-between items-center">
                        <span>{req.firstName} sent you a request.</span>
                        <Button size="xs" color="green" onClick={() => handleAcceptRequest(req._id)}>
                          Accept
                        </Button>
                      </div>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item className={`${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-200'}`}>
                    No new requests
                  </Dropdown.Item>
                )
              )}
            </Dropdown>
          )}

          {currentUser ? (
            <>
              <Link to="/home" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>
                Home
              </Link>
              <Link to="/messages" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>
                Messages
              </Link>
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
                className={`${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-200'}`}
              >
                <Dropdown.Header className={`${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-200'}`}>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                </Dropdown.Header>
                <Dropdown.Item
                  as={Link}
                  to="/dashboard?tab=profile"
                  onClick={closeSidebar}
                  className={`${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-200'}`}
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Divider className={`${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`} />
                <Dropdown.Item
                  onClick={handleSignOut}
                  className={`${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-200'}`}
                >
                  Sign Out
                </Dropdown.Item>
              </Dropdown>
            </>
          ) : (
            <>
              <Link to="/login" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>
                Login
              </Link>
              <Link to="/register" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Sidebar */}
      {currentUser && (
        <Sidebar
          className={`fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-gray-200'}`}
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <div className={`flex justify-between items-center p-4 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-900'}`}>
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={closeSidebar} className="text-gray-500 hover:text-indigo-500" aria-label="Close sidebar">
                  <span className="text-2xl">✖</span>
                </button>
              </div>

              <Sidebar.Item as={Link} to="/dashboard?tab=profile" onClick={closeSidebar}>
                Profile
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/home" onClick={closeSidebar}>
                Home
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/messages" onClick={closeSidebar}>
                Messages
              </Sidebar.Item>
              <Sidebar.Item onClick={handleSignOut}>Sign Out</Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
    </nav>
  );
};

export default Navbar;
