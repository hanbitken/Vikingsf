import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Components & Pages
import Home from "./Pages/home";
import Header from "./Components/header";
import Footer from "./Components/footer";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Forgot from "./Components/forgot";
import ResetPassword from "./Components/ResetPassword";
import ServerInfo from "./Pages/GameInfo/serverinfo";
import QuestInfo from "./Pages/GameInfo/questinfo";
import Rules from "./Pages/GameInfo/rules";
import MapInfo from "./Pages/GameInfo/mapinfo";

// Layout utama dengan Header dan Footer
function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Login, Register, dan Forgot tidak memakai layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Halaman utama dan GameInfo dibungkus layout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/gameinfo/server"
          element={
            <MainLayout>
              <ServerInfo />
            </MainLayout>
          }
        />
        <Route
          path="/gameinfo/quest"
          element={
            <MainLayout>
              <QuestInfo />
            </MainLayout>
          }
        />
        <Route
          path="/gameinfo/map"
          element={
            <MainLayout>
              <MapInfo />
            </MainLayout>
          }
        />
        <Route
          path="/gameinfo/rules"
          element={
            <MainLayout>
              <Rules />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
