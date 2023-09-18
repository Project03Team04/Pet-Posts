import React, {useState} from "react";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion';
import Auth from "../../utils/auth";
import Sidebar from "../Sidebar";
import HeaderImage from "../HeaderImage";
import { useTheme } from "../../utils/ThemeContext";
const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    
  };
  const [move,setMove]=useState(false);
  return (
    <header>
      <Sidebar />
      <div className="top">
        <div className="title-extended flex-row justify-start">
          <div className="title" >
            <Link className="decoration-none" to="/">
              <h1 className="title-lg">Pet Posts</h1>
              <h1 className="title-sm">Pp</h1>
            </Link>
            <p className="">where pets can post </p>
          </div>
          <motion.div animate={{ scale:[0.5,1,0.5,1]}} initial={{scale:0}}
        transition={{ duration:1}}
        onClick={() => setMove(!move)}>
            <HeaderImage />
          </motion.div>
        </div>

        <div>
          {Auth.loggedIn() ? (
            <>
             
              <button className="btn-main btn-block btn-hover " onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn-block btn-main btn-hover " to="/login">
                Login
              </Link>
              <Link className="btn-block btn-main btn-hover " to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;