import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './assets/Components/home'
import Header from './assets/Components/header'
import Footer from './assets/Components/footer'
import Login from './assets/Components/Login'
import GameInfo from './assets/Pages/GameInfo/gameinfo'
import ServerInfo from './assets/Pages/GameInfo/serverinfo'
import QuestInfo from './assets/Pages/GameInfo/questinfo'
import Rules from './assets/Pages/GameInfo/rules'
import MapInfo from './assets/Pages/GameInfo/mapinfo'

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
          <Route path="/gameinfo/server" element={<ServerInfo />} />
          <Route path="/gameinfo/quest" element={<QuestInfo />} />
          <Route path="/gameinfo/map" element={<MapInfo />} />
          <Route path="/gameinfo/rules" element={<Rules />} />
          {/* Tambahkan route lain jika perlu */}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
