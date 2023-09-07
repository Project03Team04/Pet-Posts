import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import Header from '../Header'
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Auth from "../../utils/auth";
import "./Sidebar.css";
import {IconContext} from 'react-icons';

const Sidebar = () => {
  const [sidebar, setSidebar]=useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <>
    <IconContext.Provider value={{color: "black"}}>
      <div >
        <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars  onClick={showSidebar}  />
        </Link>
       
      </div>
      
      </div>
      
      <nav className={sidebar? "nav-menu active":"nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return(
                <li key={index} className={item.cName}  >
                    <Link to={item.path}>
                      {item.icon} <span> {item.title}</span>
                    </Link>
                </li>
            )
          })}
          <li>
            <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn-sidebar" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn-sidebar" to="/login">
                Login
              </Link>
              <Link className="btn-sidebar " to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
          </li>
        </ul>

        
      </nav>
      
      
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
