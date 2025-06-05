import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/home'
import Header from './Components/header'
import Footer from './Components/footer'
import Login from './Components/Login'
import GameInfo from './Pages/GameInfo/gameinfo'
import ServerInfo from './Pages/GameInfo/serverinfo'
import QuestInfo from './Pages/GameInfo/questinfo'
import Rules from './Pages/GameInfo/rules'
import MapInfo from './Pages/GameInfo/mapinfo'

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
