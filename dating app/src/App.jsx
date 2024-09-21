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

        </Routes>
      </div>
      <FooterCom/>
    </Router>
    </div>
  );
}

export default App;
