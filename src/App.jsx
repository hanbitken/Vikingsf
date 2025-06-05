import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/home";
import Header from "./Components/header";
import Footer from "./Components/footer";
import Login from "./Components/Login";
import Register from "./Components/Register"; // ✅ Tambahkan ini
import "./App.css";

// Layout utama dengan Header, Footer, dan konten halaman
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
        {/* Halaman Login & Register berdiri sendiri, tanpa Header/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ✅ Tambahkan ini */}

        {/* Halaman utama dengan layout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
