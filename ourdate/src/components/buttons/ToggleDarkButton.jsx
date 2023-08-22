import PropTypes from 'prop-types';

import './ToggleDarkModeButton.css';
const ToggleDarkModeButton = ({ isDarkMode, onToggle }) => {
  return (
    <button className={`toggle-btn ${isDarkMode ? 'toggled' : ''}`} onClick={onToggle}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

ToggleDarkModeButton.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};
export default ToggleDarkModeButton;
