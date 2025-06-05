import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import News from './components/News';
import NewsDetail from './components/NewsDetail';
import Download from './components/Download';
import Admin from './components/Admin';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/news" element={
          <>
          <News />
          </>
        } />
         <Route path="/Admin" element={
          <>
          <Admin />
          </>
        } />
        <Route path="/newsdetail" element={
          <>
          <NewsDetail />
          </>
        } />
        <Route path="/download" element={
          <>
          <Download />
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App
