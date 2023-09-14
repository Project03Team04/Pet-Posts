import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
//import Header from '../Header'
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Auth from "../../utils/auth";
//import "./Sidebar.css";
import { IconContext } from "react-icons";
//import ReactSwitch from "react-switch";

import { useTheme } from "../../utils/ThemeContext";
//import ThemeSwitcher from "../ThemeSwitcher";



const Sidebar = () => {
  //const { theme, toggleTheme } = useTheme();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  return (
    <>
      <IconContext.Provider value={{ color: "gray" }}>
        <div>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
        </div>

        <nav className={sidebar ? "nav-menu active " : "nav-menu"}>
          <ul className="nav-menu-items flex-column" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {Auth.loggedIn() ? (
              <>
                <li className="greetings text-grey m-2">
                  <h3>Welcome, {Auth.getProfile().data.username} </h3>
                </li>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon} <span> {item.title}</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <div className="login-sidebar flex-column">
                    <button
                      className="btn-block btn-sidebar btn-hover "
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <h3 className=" m-2">
                    Hey, there! Check the latest Pets' Posts!
                  </h3>
                </li>
                <li>
                  <div className="login-sidebar flex-column">
                    <Link
                      className="btn-block btn-sidebar btn-hover "
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className="btn-block btn-sidebar btn-hover  "
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </div>
                </li>
              </>
            )}
            <li> 
               <div className="themeSwitcher"> 
               
               <h3>Customize:</h3>
               <span>Halloween</span>
            
            <span>Default</span>
          </div>
            </li>
          </ul>
         
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
