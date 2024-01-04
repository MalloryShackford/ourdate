import React from 'react';
import PropTypes from 'prop-types';

export default function ProgressBar ({ progress }) {
    const progressBarStyle = {
      width: `${progress}%`,
      backgroundColor: 'purple',
      height: '20px',
      color: 'white'
    };
  
    return (
      <div style={{ width: '80%'}}>
        <div style={progressBarStyle}>
        {progress.toFixed(0)}%
        </div>
      </div>
    );
  };

  ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired
};
  