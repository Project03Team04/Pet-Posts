import React, { useState } from "react";
//import { IconContext } from "react-icons";
import {useTheme} from "../../utils/ThemeContext";

const themes=[
    { theme: 'light',
      value: 'light'
    },
    { theme: 'dark',
    value: 'dark'
  },
  { theme: 'halloween',
  value: 'halloween'
},
]
const ThemeSwitcher=() => {
    const {theme, changeTheme } = useTheme('');
    //const [newTheme, setNewTheme]=useState('')
    return(
        <> 
        
      <select
                onChange={(event)=>changeTheme(event.target.value)}
               
              >
                <option>Choose theme...</option>
                {themes.map((item) => (
                  <option key={item.theme} value={item.value}>
                    {item.theme}
                  </option>
                ))}
         </select>
      
    </>
    )
};
export default ThemeSwitcher;