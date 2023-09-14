import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="">
      <div className="">
        {location.pathname !== '/' && (
          <button
            className="btn"
            onClick={() => navigate(-1)}
          >
             Go Back
          </button>
        )}
        <h6>
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