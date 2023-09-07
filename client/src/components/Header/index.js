import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';
import Sidebar from '../Sidebar';


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header  >
        <Sidebar />
        <div className='top'>
        <div>
          <Link className="title" to="/">
            <h1 className="">Pet Posts</h1>
          </Link>
          <p className="">where pets can post </p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn-main" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn-main" to="/login">
                Login
              </Link>
              <Link className="btn-main " to="/signup">
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
