import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './MoodContainer.css';

import theme from '../../styles/theme';

const MoodContainer = (props) => {
  const { vibe, handleVibeChange } = props;

  const [clickedButton, setClickedButton] = useState(null);

  const inputStyle = {
    borderRadius: theme.layout.borderRadius,
    fontFamily: theme.fonts.fontFamily
  };

  return (
    <div className="vibe-container">
      <div
        style={inputStyle}
        className={`vibe-btn ${vibe === clickedButton ? 'checked' : 'unChecked'}`}
        onClick={() => setClickedButton(vibe)}>
        <input
          type="radio"
          id="vibeChoice1"
          name="vibe"
          value="intellectual"
          checked={vibe === 'intellectual'}
          onChange={handleVibeChange}
        />
        <label className="vibe-btn-label" htmlFor="vibeChoice1">
          Intellectual
        </label>
      </div>

      <div
        style={inputStyle}
        className={vibe === 'healthy' ? 'checked vibe-btn' : 'unChecked vibe-btn'}>
        <input
          type="radio"
          id="vibeChoice2"
          name="vibe"
          value="healthy"
          checked={vibe === 'healthy'}
          onChange={handleVibeChange}
        />
        <label className="vibe-btn-label" htmlFor="vibeChoice2">
          Healthy
        </label>
      </div>

      <div
        style={inputStyle}
        className={vibe === 'excited' ? 'checked vibe-btn' : 'unChecked vibe-btn'}>
        <input
          type="radio"
          id="vibeChoice3"
          name="vibe"
          value="excited"
          checked={vibe === 'excited'}
          onChange={handleVibeChange}
        />
        <label className="vibe-btn-label" htmlFor="vibeChoice3">
          Excited
        </label>
      </div>

      <div
        style={inputStyle}
        className={vibe === 'casual' ? 'checked vibe-btn' : 'unChecked vibe-btn'}>
        <input
          type="radio"
          id="vibeChoice4"
          name="vibe"
          value="casual"
          checked={vibe === 'casual'}
          onChange={handleVibeChange}
        />
        <label className="vibe-btn-label" htmlFor="vibeChoice4">
          Casual
        </label>
      </div>
      <div
        style={inputStyle}
        className={vibe === 'happy' ? 'checked vibe-btn' : 'unChecked vibe-btn'}>
        <input
          type="radio"
          id="vibeChoice5"
          name="vibe"
          value="happy"
          checked={vibe === 'happy'}
          onChange={handleVibeChange}
        />
        <label className="vibe-btn-label" htmlFor="vibeChoice5">
          Happy
        </label>
      </div>

      <div
        style={inputStyle}
        className={vibe === 'peace' ? 'checked vibe-btn' : 'unChecked vibe-btn'}>
        <input
          type="radio"
          id="vibeChoice6"
          name="vibe"
          value="peace"
          checked={vibe === 'peace'}
          onChange={handleVibeChange}
        />
        <label className="vibe-btn-label" htmlFor="vibeChoice6">
          Peace
        </label>
      </div>

      <div
        style={inputStyle}
        className={vibe === 'romantic' ? 'checked vibe-btn' : 'unChecked vibe-btn'}>
        <input
          type="radio"
          id="vibeChoice7"
          name="vibe"
          value="romantic"
          checked={vibe === 'romantic'}
          onChange={handleVibeChange}
        />
        <label className="vibe-btn-label" htmlFor="vibeChoice7">
          Romantic
        </label>
      </div>

      <div
        style={inputStyle}
        className={vibe === 'formal' ? 'checked vibe-btn' : 'unChecked vibe-btn'}>
        <input
          type="radio"
          id="vibeChoice8"
          name="vibe"
          value="formal"
          checked={vibe === 'formal'}
          onChange={handleVibeChange}
        />
        <label className="vibe-btn-label" htmlFor="vibeChoice8">
          Formal
        </label>
      </div>
    </div>
  );
};

MoodContainer.propTypes = {
  vibe: PropTypes.string,
  handleVibeChange: PropTypes.func
};

export default MoodContainer;
