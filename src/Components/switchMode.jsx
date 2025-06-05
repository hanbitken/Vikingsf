import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Cek preferensi dari localStorage
    const theme = localStorage.getItem('theme');
    return theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded"
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
