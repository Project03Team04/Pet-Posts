import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from "../../utils/ThemeContext";
import ThemeSwitcher from "../ThemeSwitcher";
const Footer = () => {
  const { theme, changeTheme } = useTheme('');
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="" >
      <ThemeSwitcher onChange={changeTheme} />
      <div className="">
       
        <h6 className='text-grey'>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by the Pet Posts team.
        </h6>
      </div>

    </footer>
  );
};

export default Footer;
