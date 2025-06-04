import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import News from './Components/News';

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
      </Routes>
    </Router>
  )
}

export default App
