import React, { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeSwitcher;
