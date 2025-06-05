import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './assets/Components/home'
import Header from './assets/Components/header'
import Footer from './assets/Components/footer'
import Login from './assets/Components/Login'
import GameInfo from './assets/Pages/GameInfo/gameinfo'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Tambahkan route lain jika perlu */}
          <Route path="/login" element={<Login />} />
          <Route path="/gameinfo" element={<GameInfo />} />
          {/* Tambahkan route lain jika perlu */}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
