import React from 'react';
import PropTypes from 'prop-types';
import { useFeatureIsOn } from '@growthbook/growthbook-react';

import './ToggleDarkModeButton.css';

const ToggleDarkModeButton = ({ isDarkMode, onToggle }) => {
  const enabled = useFeatureIsOn('dark_theme');
  if (enabled) {
    return (
      <button className={`toggle-btn ${isDarkMode ? 'toggled' : ''}`} onClick={onToggle}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    );
  }
};

ToggleDarkModeButton.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};
export default ToggleDarkModeButton;
