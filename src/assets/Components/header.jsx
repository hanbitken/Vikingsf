import React from 'react';
import SwitchMode from './switchMode';
export default function Header() {
  return (
    <header className="bg-black/50 w-full p-4 shadow-md px-8 absolute">
      <div className="container mx-auto flex justify-between items-center">
        <SwitchMode />
        <nav className="flex flex-row space-x-4 font-bold font-white font-['Bebas_Neue']">
          <a href="#" className="hover:underline">NEWS</a>
          <a href="#" className="hover:underline">DOWNLOAD</a>
          <div className="relative group">
            <a href="/gameinfo" className="hover:text-yellow-400">Game Info</a>
            <div className="absolute top-full left-0 w-56 bg-black/90 text-white mt-2 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <a href="#" className="block px-4 py-2 hover:bg-yellow-600/20">Server Information</a>
              <a href="#" className="block px-4 py-2 hover:bg-yellow-600/20">Quest Information</a>
              <a href="#" className="block px-4 py-2 hover:bg-yellow-600/20">Map Information</a>
              <a href="#" className="block px-4 py-2 hover:bg-yellow-600/20">Server Rules</a>
            </div>
          </div>
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
