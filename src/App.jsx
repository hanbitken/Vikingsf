import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import Donation from "./Pages/donation";
import NewsDetail from './Pages/News/NewsDetail';
import News from './Pages/News/News';
import Download from './Pages/Download/Download';
import Admin from './Pages/Admin/main';
import ProtectedRoute from "./Components/ProtectedRoute";
import api from "./assets/logic/api";

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
  const [redirectPath, setRedirectPath] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setRedirectPath("/login");
      setLoading(false);
      return;
    }

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    api.get("/me")
      .then((res) => {
        const role = res.data.role?.toLowerCase();
        if (role === "admin") {
          setRedirectPath("/Admin");
        } else {
          setRedirectPath("/home");
        }
      })
      .catch(() => {
        setRedirectPath("/login");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-white text-center">Loading...</p>;

  return (
    <Router>
      <Routes>
        {/* Redirect dari root path "/" */}
        <Route path="/" element={<Navigate to={redirectPath} replace />} />

        {/* Halaman Home terpisah dari "/" agar redirect bekerja */}
        <Route
          path="/home"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Admin hanya untuk role admin */}
        <Route
          path="/Admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Halaman login, register, dll */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Game Info & lainnya */}
        <Route
          path="/gameinfo/server"
          element={<MainLayout><ServerInfo /></MainLayout>}
        />
        <Route
          path="/gameinfo/quest"
          element={<MainLayout><QuestInfo /></MainLayout>}
        />
        <Route
          path="/gameinfo/map"
          element={<MainLayout><MapInfo /></MainLayout>}
        />
        <Route
          path="/gameinfo/rules"
          element={<MainLayout><Rules /></MainLayout>}
        />
        <Route
          path="/donation"
          element={<MainLayout><Donation /></MainLayout>}
        />
        <Route
          path="/news"
          element={<MainLayout><News /></MainLayout>}
        />
        <Route
          path="/news/:id"
          element={<MainLayout><NewsDetail /></MainLayout>}
        />
        <Route
          path="/download"
          element={<MainLayout><Download /></MainLayout>}
        />
      </Routes>
    </Router>
  );
}

export default App;
