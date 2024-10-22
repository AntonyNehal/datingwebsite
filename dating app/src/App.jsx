// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import About from './pages/About.jsx';
// import Matches from './pages/Matches';
// import Messages from './pages/Messages';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Header from './components/Header';
// import Home from './pages/Home.jsx';
// import FooterCom from './components/Footer.jsx';
// import Hobbies from './pages/Hobbies.jsx';
// import AdditionalDetails from './pages/AdditionalDetails.jsx';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'flowbite/dist/flowbite.css';
// import Dashboard from './pages/Dashboard.jsx';
// import PrivateRoute from './components/PrivateRoute.jsx';
// import SearchBar from './components/Search.jsx';

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen"> {/* Flex container for full height */}
//         <Header />
//         {/* <Navbar /> Navbar stays at the top */}

//         <div className="flex flex-grow"> {/* Main content area with sidebar and search */}
       

//           <div className="flex-grow p-4"> {/* Main content area where routes will be rendered */}
//             <Routes>
//               <Route path="/" element={<About />} />
//               <Route path="/matches" element={<Matches />} />
//               <Route path="/messages" element={<Messages />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/home" element={<Home />} />
//               <Route path="/hobbies" element={<Hobbies />} />
//               <Route path="/additionaldetails" element={<AdditionalDetails />} />
              
//               <Route element={<PrivateRoute />}>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/search" element={<SearchBar />} />

//               </Route>
//             </Routes>
//           </div>
//         </div>

//         <FooterCom /> {/* Footer at the bottom */}
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import About from './pages/About.jsx';
import Matches from './pages/Matches';
import Messages from './pages/Messages';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './pages/Home.jsx';
import FooterCom from './components/Footer.jsx';
import Hobbies from './pages/Hobbies.jsx';
import AdditionalDetails from './pages/AdditionalDetails.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import SearchBar from './components/Search.jsx';
import './index.css'; // Import Tailwind CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'flowbite/dist/flowbite.css';

function App() {
  const { theme } = useSelector((state) => state.theme);

  // Apply the theme class to the HTML element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen"> {/* Flex container for full height */}
        <Header />

        <div className="flex-grow p-4"> {/* Main content area */}
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hobbies" element={<Hobbies />} />
            <Route path="/additionaldetails" element={<AdditionalDetails />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/search" element={<SearchBar />} />
            </Route>
          </Routes>
        </div>

        <FooterCom />
      </div>
    </Router>
  );
}

export default App;
