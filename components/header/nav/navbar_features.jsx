import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useFeatureIsOn } from '@growthbook/growthbook-react';
import PropTypes from 'prop-types';

import classes from './nav.module.css';
// import { SettingsIcon, UsersIcon } from '../../../styles/Svg';

const NavBarFeatures = (props) => {
  const enabled = useFeatureIsOn('navbar_features');
  if (enabled && props.isLoggedIn) {
    return (
      <div className={classes.nav}>
        {/* <div>
          <NavLink
          className={classes.item}  
          to="/dialogs">
            <nav className={classes.navbar}></nav>
            <MessageIcon />
          </NavLink>
        </div> */}
        {/* <div>
          <NavLink className={classes.item} to="/users">
            <nav className={classes.navbar}></nav>
            <UsersIcon />
          </NavLink>
        </div>
        <div>
          <NavLink className={classes.item} to="/settings">
            <nav className={classes.navbar}></nav>
            <SettingsIcon />
          </NavLink>
        </div> */}
      </div>
    );
  } else {
    return null; // TODO: Add login/signup links here?
  }
};
NavBarFeatures.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NavBarFeatures;
