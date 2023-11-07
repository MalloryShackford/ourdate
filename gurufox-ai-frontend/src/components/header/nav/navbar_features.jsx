import { NavLink } from 'react-router-dom';
import { useFeatureIsOn } from '@growthbook/growthbook-react';

import classes from './nav.module.css';

const NavBarFeatures = (props) => {
  const enabled = useFeatureIsOn('navbar_features');
  if (enabled) {
    return (
      <div className="nav">
        <div>
          <NavLink>
            <nav className={classes.navbar}></nav>
            <div>Messages</div>
          </NavLink>
        </div>
        <div>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : classes.item)}
            to="/users">
            <nav className={classes.navbar}></nav>
            <div>Users</div>
          </NavLink>
        </div>
        <div>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : classes.item)}
            to="/profile">
            <nav className={classes.navbar}></nav>
            <div>Profile</div>
          </NavLink>
        </div>
        <div>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : classes.item)}
            to="/settings">
            <nav className={classes.navbar}></nav>
            <div>Settings</div>
          </NavLink>
        </div>
      </div>
    );
  } else {
    return null; // TODO: Add login/signup links here?
  }
};

export default NavBarFeatures;
