import React, { useState, useContext } from 'react';

// Create our theme context using React.CreateContext()
export const ThemeContext = React.createContext();

// Create a custom hook that allows easy access to our ThemeContext values
export const useTheme = () => useContext(ThemeContext);

// Creating our theme provider. Accepts an argument of "props", here we plucking off the "children" object.
export default function ThemeProvider({ children }) {
  // Creating our state
  const [theme, setTheme] = useState('light');

  // Method to update our state
  const changeTheme = () => {
    console.log('inside toggle theme');
    let curr='light';
    switch (curr){
     case 'light': 
     return setTheme('light');
     case 'dark':
      return setTheme('dark');
     case 'halloween':
      return setTheme('halloween') 
    } 
    // setTheme=(curr) => {

    //  if (curr==='light') {
    //   return 'light' ;
    //  }
    //  if (curr==='dark') {
    //   return 'dark' ;
    //  }
    //   if (curr==='halloween'){
    //     return 'halloween';
    // } 
    //   };
  };

  // The provider component will wrap all other components inside of it that need access to our global state
  return (
    // Dark theme and toggle theme are getting provided to the child components
    <ThemeContext.Provider value={{theme, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}