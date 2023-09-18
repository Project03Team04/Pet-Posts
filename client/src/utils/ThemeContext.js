import React, { useState, useContext, useEffect } from "react";
// Create our theme context using React.CreateContext()
export const ThemeContext = React.createContext();

// Create a custom hook that allows easy access to our ThemeContext values
export const useTheme = () => useContext(ThemeContext);

// Creating our theme provider. Accepts an argument of "props", here we plucking off the "children" object.
export default function ThemeProvider({ children }) {
  
  // Creating our state

 
  
   var startTheme = JSON.parse(localStorage.getItem('theme')) ? JSON.parse(localStorage.getItem('theme')) : "light";

const [theme, setTheme] = useState(startTheme);
  //  const storedTheme=JSON.parse(localStorage.getItem("theme"));

  //   useState(storedTheme);
  
   
  

  // Method to update our state
  const changeTheme = (newTheme) => {
    console.log("inside toggle theme");
    //let curr='light';
    switch (newTheme) {
      case "light":
        return setTheme("light");
      case "dark":
        return setTheme("dark");
      case "halloween":
        return setTheme("halloween");
     
    }
  };
  localStorage.setItem("theme", JSON.stringify(theme));
  // The provider component will wrap all other components inside of it that need access to our global state
  return (
    // Dark theme and toggle theme are getting provided to the child components
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}