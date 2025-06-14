import React from 'react';
import { Outlet } from 'react-router-dom';

function GameInfo() {
  return (
    <div className="container">
      <h2>Game Information</h2>
      <Outlet />  
    </div>
  );
}

export default GameInfo;
