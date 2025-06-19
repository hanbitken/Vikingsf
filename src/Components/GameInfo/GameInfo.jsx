import React from 'react';
import { Outlet } from 'react-router-dom';

function GameInfo() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Game Information</h2>
      <Outlet />
    </div>
  );
}

export default GameInfo;