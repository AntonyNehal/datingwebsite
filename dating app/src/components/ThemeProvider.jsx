
import React from 'react';
import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  
  return (
    <div className={`${theme === 'light' ? 'bg-white text-gray-700' : 'bg-gray-800 text-gray-200 min-h-screen'}`}>
      {children}
    </div>
  );
}
