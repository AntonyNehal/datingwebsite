// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaMoon, FaSun } from 'react-icons/fa';
// import { Avatar, Button, Dropdown, Sidebar } from 'flowbite-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleTheme } from '../redux/theme/themeSlice';

// const Navbar = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const { theme } = useSelector((state) => state.theme);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const closeSidebar = () => setIsSidebarOpen(false);

//   return (
//     <nav className={`shadow-md p-4 ${theme === 'light' ? 'bg-white text-gray-700' : 'bg-gray-800 text-gray-200'}`}>
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={toggleSidebar}
//             className="p-2 text-gray-500 bg-transparent hover:text-indigo-500 focus:outline-none transition-transform transform hover:scale-110"
//           >
//             <span className="text-2xl">☰</span> {/* Hamburger icon */}
//           </button>

//           <Link to="/" className="text-xl font-bold text-indigo-500">
//             Dating Website
//           </Link>
//         </div>

//         {/* Theme Toggle and Navigation Links */}
//         <div className="ml-auto flex space-x-4 items-center">
//           <Button className="w-12 h-10" color="gray" pill onClick={() => dispatch(toggleTheme())}>
//             {theme === 'light' ? <FaSun /> : <FaMoon />}
//           </Button>

//           {currentUser ? (
//             <>
//               <Link to="/home" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>
//                 Home
//               </Link>
//               <Link to="/messages" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>
//                 Messages
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>
//                 Login
//               </Link>
//               <Link to="/register" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>
//                 Signup
//               </Link>
//             </>
//           )}

//           {currentUser && (
//             <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}>
//               <Dropdown.Header>
//                 <span className="block text-sm">@{currentUser.username}</span>
//                 <span className="block text-sm font-medium truncate">{currentUser.email}</span>
//               </Dropdown.Header>
//               <Dropdown.Item as={Link} to="/dashboard?tab=profile" onClick={closeSidebar}>
//                 Profile
//               </Dropdown.Item>
//               <Dropdown.Divider />
//               <Dropdown.Item>Sign Out</Dropdown.Item>
//             </Dropdown>
//                 )}
//         </div>
//       </div>
      
//       {currentUser && (
//       {/* Sidebar */}
//       <Sidebar
//         className={`fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-gray-200'}`}
//       >
//         <Sidebar.Items>
//           <Sidebar.ItemGroup>
//             <div className={`flex justify-between items-center p-4 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-900'}`}>
//               <h2 className="text-lg font-semibold">Menu</h2>
//               <button onClick={closeSidebar} className="text-gray-500 hover:text-indigo-500">
//                 <span className="text-2xl">☰</span>
//               </button>
//             </div>

//             {/* Sidebar Links */}
//             <Sidebar.Item
//               as={Link}
//               to="/dashboard?tab=profile"
//               onClick={closeSidebar}
//               className={`${theme === 'light' ? 'hover:bg-gray-300 text-gray-800' : 'hover:bg-gray-200 text-gray-900'}`}
//             >
//               Profile
//             </Sidebar.Item>

//             <Sidebar.Item
//               as={Link}
//               to="/home"
//               onClick={closeSidebar}
//               className={`${theme === 'light' ? 'hover:bg-gray-300 text-gray-800' : 'hover:bg-gray-200 text-gray-900'}`}
//             >
//               Home
//             </Sidebar.Item>

//             <Sidebar.Item
//               as={Link}
//               to="/messages"
//               onClick={closeSidebar}
//               className={`${theme === 'light' ? 'hover:bg-gray-300 text-gray-800' : 'hover:bg-gray-200 text-gray-900'}`}
//             >
//               Messages
//             </Sidebar.Item>

//             <Sidebar.Item
//               onClick={() => alert('Sign Out clicked!')}
//               className={`${theme === 'light' ? 'hover:bg-gray-300 text-gray-800' : 'hover:bg-gray-200 text-gray-900'}`}
//             >
//               Sign Out
//             </Sidebar.Item>
//           </Sidebar.ItemGroup>
//         </Sidebar.Items>
//       </Sidebar>
//        )}

//     </nav>

//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Avatar, Button, Dropdown, Sidebar } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <nav className={`shadow-md p-4 ${theme === 'light' ? 'bg-white text-gray-700' : 'bg-gray-800 text-gray-200'}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Hamburger */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-500 bg-transparent hover:text-indigo-500 focus:outline-none transition-transform transform hover:scale-110"
          >
            <span className="text-2xl">☰</span> {/* Hamburger Icon */}
          </button>

          <Link to="/" className="text-xl font-bold text-indigo-500">
            Dating Website
          </Link>
        </div>

        {/* Theme Toggle and User Links */}
        <div className="ml-auto flex space-x-4 items-center">
          <Button className="w-12 h-10" color="gray" pill onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaSun /> : <FaMoon />}
          </Button>

          {currentUser ? (
            <>
              <Link to="/home" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>
                Home
              </Link>
              <Link to="/messages" className={`hover:${theme === 'light' ? 'text-indigo-500' : 'text-indigo-300'}`}>
                Messages
              </Link>
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

          {currentUser && (
            <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}>
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">{currentUser.email}</span>
              </Dropdown.Header>
              <Dropdown.Item as={Link} to="/dashboard?tab=profile" onClick={closeSidebar}>
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => alert('Sign Out clicked!')}>Sign Out</Dropdown.Item>
            </Dropdown>
          )}
        </div>
      </div>

      {/* Sidebar */}
      {currentUser && (
        <Sidebar
          className={`fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-gray-200'}`}
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <div
                className={`flex justify-between items-center p-4 ${
                  theme === 'light' ? 'bg-gray-200' : 'bg-gray-900'
                }`}
              >
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={closeSidebar} className="text-gray-500 hover:text-indigo-500">
                  <span className="text-2xl">☰</span>
                </button>
              </div>

              {/* Sidebar Links */}
              <Sidebar.Item
                as={Link}
                to="/dashboard?tab=profile"
                onClick={closeSidebar}
                className={`${
                  theme === 'light' ? 'hover:bg-gray-300 text-gray-800' : 'hover:bg-gray-200 text-gray-900'
                }`}
              >
                Profile
              </Sidebar.Item>

              <Sidebar.Item
                as={Link}
                to="/home"
                onClick={closeSidebar}
                className={`${
                  theme === 'light' ? 'hover:bg-gray-300 text-gray-800' : 'hover:bg-gray-200 text-gray-900'
                }`}
              >
                Home
              </Sidebar.Item>

              <Sidebar.Item
                as={Link}
                to="/messages"
                onClick={closeSidebar}
                className={`${
                  theme === 'light' ? 'hover:bg-gray-300 text-gray-800' : 'hover:bg-gray-200 text-gray-900'
                }`}
              >
                Messages
              </Sidebar.Item>

              <Sidebar.Item
                onClick={() => alert('Sign Out clicked!')}
                className={`${
                  theme === 'light' ? 'hover:bg-gray-300 text-gray-800' : 'hover:bg-gray-200 text-gray-900'
                }`}
              >
                Sign Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
    </nav>
  );
};

export default Navbar;
