import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./components/News";
import NewsDetail from "./components/NewsDetail";
import Admin from "./Page/Admin";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route
          path="/news"
          element={
            <>
              <News />
            </>
          }
        />
        <Route
          path="/Admin"
          element={
            <>
              <Admin />
            </>
          }
        />
        <Route
          path="/newsdetail"
          element={
            <>
              <NewsDetail />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
