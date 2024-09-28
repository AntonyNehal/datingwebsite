// import React from 'react'
// import { useSelector } from 'react-redux'
// export default function ThemeProvider({children}) {
//     const {theme}=useSelector(state=>state.theme)
//   return (
//     <div className={theme}>
//         <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)]'>{children}</div>
//     </div>
//   )
// }
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
