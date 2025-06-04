import React from 'react';

export default function Header() {
  return (
    <header className="bg-black/50 w-full p-4 shadow-md px-8 absolute">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-lg font-bold font-['Bebas_Neue']">
          Vikings News
        </h2>
        <nav className="space-x-4 font-bold font-white font-['Bebas_Neue']">
          <a href="#" className="hover:underline">NEWS</a>
          <a href="#" className="hover:underline">DOWNLOAD</a>
          <a href="/gameinfo" className="hover:underline">GAME INFO</a>
          <a href="#" className="hover:underline">MEMBERSHIP</a>
          <a href="#" className="hover:underline">DONATION</a>
        </nav>
        <h2 className="font-bold font-['Bebas_Neue']">
          Login/Register
        </h2>
      </div>
    </header>
  );
}
