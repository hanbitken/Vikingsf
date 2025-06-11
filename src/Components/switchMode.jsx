// src/components/DarkModeToggle.jsx
import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Anda bisa mendefinisikan SVG sebagai variabel atau langsung di JSX
  const LightModeToggleSvg = (
    <svg width="49" height="26" viewBox="0 0 49 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M43 13.0002H42C42 16.3139 39.3137 19.0002 36 19.0002V20.0002V21.0002C40.4183 21.0002 44 17.4184 44 13.0002H43ZM36 20.0002V19.0002C32.6863 19.0002 30 16.3139 30 13.0002H29H28C28 17.4184 31.5817 21.0002 36 21.0002V20.0002ZM29 13.0002H30C30 9.68645 32.6863 7.00016 36 7.00016V6.00016V5.00016C31.5817 5.00016 28 8.58188 28 13.0002H29ZM36 6.00016V7.00016C39.3137 7.00016 42 9.68645 42 13.0002H43H44C44 8.58188 40.4183 5.00016 36 5.00016V6.00016ZM36 1.3335V2.3335C41.8877 2.3335 46.6667 7.11245 46.6667 13.0002H47.6667H48.6667C48.6667 6.00788 42.9923 0.333496 36 0.333496V1.3335ZM47.6667 13.0002H46.6667C46.6667 18.8879 41.8877 23.6668 36 23.6668V24.6668V25.6668C42.9923 25.6668 48.6667 19.9924 48.6667 13.0002H47.6667ZM36 24.6668V23.6668H12.6667V24.6668V25.6668H36V24.6668ZM12.6667 24.6668V23.6668C6.77895 23.6668 2 18.8879 2 13.0002H1H0C0 19.9924 5.67438 25.6668 12.6667 25.6668V24.6668ZM1 13.0002H2C2 7.11245 6.77895 2.3335 12.6667 2.3335V1.3335V0.333496C5.67438 0.333496 0 6.00788 0 13.0002H1ZM12.6667 1.3335V2.3335H36V1.3335V0.333496H12.6667V1.3335Z" fill="#FFC86E" />
    </svg>

  );

  const DarkModeToggleSvg = (
    <svg width="49" height="26" viewBox="0 0 49 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.833 19.6667C17.699 19.6667 20.833 16.5327 20.833 12.6667C20.833 8.80067 17.699 5.66667 13.833 5.66667C9.96701 5.66667 6.83301 8.80067 6.83301 12.6667C6.83301 16.5327 9.96701 19.6667 13.833 19.6667Z" fill="black" />
      <path d="M13.833 19.6667C17.699 19.6667 20.833 16.5327 20.833 12.6667C20.833 8.80067 17.699 5.66667 13.833 5.66667C9.96701 5.66667 6.83301 8.80067 6.83301 12.6667C6.83301 16.5327 9.96701 19.6667 13.833 19.6667Z" stroke="#B0B0B1" stroke-width="2" />
      <path d="M36 1C42.44 1 47.6667 6.22667 47.6667 12.6667C47.6667 19.1067 42.44 24.3333 36 24.3333H12.6667C6.22667 24.3333 1 19.1067 1 12.6667C1 6.22667 6.22667 1 12.6667 1H36Z" stroke="#B0B0B1" stroke-width="2" />
    </svg>
  );

  return (
    <button
      onClick={toggleTheme}
      // Styling button. Sesuaikan lebar dan tinggi agar SVG pas.
      className="relative w-[49px] h-[26px] flex items-center justify-center rounded-full cursor-pointer 
                 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-200"
      aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Gunakan komponen SVG yang diimpor secara kondisional */}
      {theme === 'dark' ? DarkModeToggleSvg : LightModeToggleSvg}
    </button>
  );
};

export default DarkModeToggle;