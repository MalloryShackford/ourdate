import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './nav.module.css';
import logo from '../../../assets/ourdate-logo.png';
import MyApp from '../growthbook';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

const Nav = () => {
  const { isLoggedIn, setIsLoggedIn, logoutUser } = useAuth();
  const location = useLocation(); // Get the current location using useLocation hook

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
  };

  return (
    <div className={classes.navbar}>
      <NavLink className={(navData) => (navData.isActive ? classes.active : classes.item)} to="/">
        <nav className={classes.nav_img_container}>
          <img src={logo} alt="ourdate-logo" className={classes.nav_img} />
        </nav>
        <div className={classes.home}>Home</div>
      </NavLink>
      <div className={classes.login}>
        {isLoggedIn ? (
          <NavLink to={location.pathname} onClick={handleLogout}>
            Logout
          </NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
      <MyApp />
    </div>
  );
};

export default Nav;
