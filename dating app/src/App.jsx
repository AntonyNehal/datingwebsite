import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
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
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'flowbite/dist/flowbite.css';
import Dashboard from './pages/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdditionalDetails2 from './pages/AdditionalDetails2.jsx';

function App() {
  return (
    <div>
    <Router>
    <Header/>
      <div className="App">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/hobbies" element={<Hobbies/>} />
          <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
          
          <Route path="/additionaldetails" element={<AdditionalDetails/>} />
          <Route path="/additionaldetails2" element={<AdditionalDetails2/>} />

        </Routes>
      </div>
      <FooterCom/>
    </Router>
    </div>
  );
}

export default App;
