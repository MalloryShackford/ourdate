import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { BsClock, BsPeople } from 'react-icons/bs';
import { MdOutlineFavoriteBorder, MdOutlineSubscriptions } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';
import { BiHelpCircle } from 'react-icons/bi';

import theme from '../../styles/theme';
import '../../styles/pages/profile.css';
import OurdateIcon from '../../assets/ourdate-icon.svg';
import { useAuth } from '../../context/authContext';
import { getCurrentUser } from '../../shared/utils/user';

const UserProfile = () => {
  const { isLoggedIn, setIsLoggedIn, logoutUser, userDetails, setUserDetails } = useAuth();

  useEffect(() => {
    const user = getCurrentUser();
    setUserDetails(user);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
  };

  const userName = userDetails ? userDetails.username : 'Username';
  const firstLetter = userName && userName.length > 0 ? userName[0].toUpperCase() : '?';

  const buttonStyle = {
    borderRadius: theme.layout.inputBorderRadius,
    fontFamily: theme.fonts.fontFamily
  };
  const hrStyle = {
    background: theme.colors.blue0
  };

  return (
    <div className="account-settings-container">
      <div className="close-button">
        <button>
          <RxCross1 />
        </button>
      </div>
      <div className="user-avatar">
        <div className="circle-icon">{firstLetter}</div>
        <h2 className="user-name">{userName}</h2>
      </div>
      <div className="account-details">
        <ul>
          <li>
            <Link className="link" to="/favorites-history" state={{ tab: 'favorites' }}>
              <MdOutlineFavoriteBorder /> Favorites
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link className="link" to="/favorites-history" state={{ tab: 'history' }}>
                <BsClock /> History
              </Link>
            </li>
          )}
          <li>
            <Link to="/settings" className="link">
              <FiSettings /> Account Settings
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/subscription" className="link">
                <MdOutlineSubscriptions /> Subscription
              </Link>
            </li>
          )}
        </ul>
        <hr style={hrStyle} />
      </div>
      <div className="footer">
        <ul>
          <li>
            <Link to="/about" className="link">
              <img src={OurdateIcon} />
              About
            </Link>
          </li>
          <li>
            <Link to="/partners" className="link">
              <BsPeople /> Partnership
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link">
              <BiHelpCircle /> Help
            </Link>
          </li>
        </ul>
      </div>
      <div className="social-icons">
        <a href="#">
          <FaInstagram />
        </a>
        <a href="#">
          <FaFacebook />
        </a>
        <a href="#">
          <FaLinkedin />
        </a>
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={buttonStyle} className="logout-button">
            Log out
          </button>
        ) : (
          <>
            <Link to="/login" state={{ from: location.pathname }} className="login">
              <button style={buttonStyle} className="login-button">
                Log in
              </button>
            </Link>
            <p className="signup">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="signup-link">
                <u>Sign Up</u>
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default UserProfile;