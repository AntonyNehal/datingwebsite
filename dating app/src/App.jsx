import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Messages from './pages/Messages';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home2 from './pages/Home2.jsx';
function App() {
  return (
    <div>
    <Router>
    <Header/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/home2" element={<Home2 />} />

        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
