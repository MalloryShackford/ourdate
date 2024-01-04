import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './nav.module.css';
import logo from '../../../assets/ourdate-logo.svg';
import MyApp from '../growthbook';
import { ProfileIcon } from '../../../styles/Svg';
import { useAuth } from '../../../context/authContext';

const Nav = () => {
  const { isLoggedIn } = useAuth();

  // const handleLogout = () => {
  //   logoutUser();
  //   setIsLoggedIn(false);
  // };

  return (
    <div className={classes.navbar}>
      <div className={classes.spacer}></div>
      <NavLink className={(navData) => (navData.isActive ? classes.active : classes.item)} to="/">
        <nav className={classes.nav_img_container}>
          <img src={logo} alt="ourdate-logo" className={classes.nav_img} />
        </nav>
      </NavLink>
      <div className={classes.login}>
        {isLoggedIn ? (
          <NavLink to="/profile">
            <div>
              <ProfileIcon />
            </div>
          </NavLink>
        ) : (
          <NavLink to="/login">
            {/* Login */}
            <ProfileIcon/>
          </NavLink>
        )}
      </div>
      <MyApp isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Nav;
