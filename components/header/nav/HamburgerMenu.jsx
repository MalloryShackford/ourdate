import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { getCurrentUser } from '../../../shared/utils/user';
import './HamburgerMenu.css';
import ourdateLogo from '../../../assets/ourdate-logo.svg';
import home from '../../../assets/burgerMenu/home.svg';
import profile from '../../../assets/burgerMenu/profile.svg';
import history from '../../../assets/burgerMenu/history.svg';
import settings from '../../../assets/burgerMenu/settings.svg';
import subscription from '../../../assets/burgerMenu/subscription.svg';
import dateplan from '../../../assets/burgerMenu/dateplan.svg';
import { useNavigate } from 'react-router-dom';

const HamburgerMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { setIsLoggedIn, userDetails, setUserDetails, logoutUser } = useAuth();
    const [profileCompletion, setProfileCompletion] = useState(0);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
      const user = getCurrentUser();
      setUserDetails(user);
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      const savedProgress = parseFloat(localStorage.getItem('profileProgress')) || 0;
      setProfileCompletion(savedProgress);
    }, []);

    const userNameFromGoogle = localStorage.getItem('userName');
    const userNameToDisplay = userNameFromGoogle || userDetails?.username || 'User';

return (
 <div className="hamburger-menu">
  <div className="od-logo-container">
    <img className="od-logo" src={ourdateLogo} alt="ourdatelogo" width="132" />
  </div>
      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {menuOpen && (
        <div className="menu-content">
          <div className="welcome-user-container">
          <h2 className="welcome-user-h2">Welcome, {userNameToDisplay}</h2>
          <span className="profile-completion-p">Profile {profileCompletion.toFixed(0)}% Complete</span>
          </div>
          <ul>
            <li><Link to="/">
              <img src={home} alt="home"/>Home</Link></li>
            <li><Link to="/profile">
              <img src={profile} alt="profile"/>Profile</Link></li>
            <li><Link to="/history">
              <img src={history} alt="history"/>History</Link></li>
            <li><Link to="/dateplan">
              <img src={dateplan} alt="other"/>Dateplan</Link></li>
            <li><Link to="/subscription">
              <img src={subscription} alt="subscription"/>Subscription</Link></li>
              <li><Link to="/settings">
              <img src={settings} alt="settings"/>Settings</Link></li>
          </ul>
          <div className="logout-container">
            <button className="logout-btn" onClick={() => {logoutUser(); navigate('/login');}}>Log out</button>
          </div>
        </div>
        
      )}
      
    </div>
  );
};
export default HamburgerMenu