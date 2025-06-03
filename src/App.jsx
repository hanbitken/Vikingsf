import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './assets/Components/home'
import Header from './assets/Components/Header'
import Footer from './assets/Components/Footer'
import Login from './assets/Components/Login'


import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div>
    <Header/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Tambahkan route lain jika perlu */}
        <Route path="/login" element={<Login />} />
        {/* Tambahkan route lain jika perlu */}
      </Routes>
    </Router>
    <Footer/>
    </div>
  );
}

export default App;
