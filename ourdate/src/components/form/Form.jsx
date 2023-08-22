import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Form.css';

import MoodContainer from './MoodContainer';
import generate from '../../assets/generate-icon.svg';
import magGlass from '../../assets/mag-glass.svg';
import dateplanService from '../../shared/services/dateplan.service';
import theme from '../../styles/theme';
import Interstitial from '../interstitial';
import guru from "../../assets/guru-icon.svg"
import '../../styles/pages/home.css';

function Form() {
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vibe, setVibe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, [isLoading]);

  const handleVibeChange = (event) => {
    setVibe(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //check if user is logged in
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    setIsLoading(true);

    const formData = {
      location,
      budget,
      date,
      time,
      vibe
    };

    localStorage.setItem('selectedDate', date);
    localStorage.setItem('selectedTime', time);

    const datePlanInfo = await dateplanService.submitDatePlanInfo(formData);
    navigate(`/showcase/?plan_info=${datePlanInfo.uuid}&selected_date=${date}`);
  };

  const inputStyle = {
    borderRadius: theme.layout.inputBorderRadius,
    fontFamily: theme.fonts.fontFamily,
    '::placeholder': {
      color: theme.colors.placeholderColor
    }
  };
  const buttonStyle = {
    fontFamily: theme.fonts.fontFamily,
    borderRadius: theme.layout.borderRadius,
    color: theme.colors.ourdateWhite
  };

  return (
    <div>
      {isLoading ? (
        <Interstitial />
      ) : (
        <div>
        <div className="home-logo-container">
          <img src={guru} alt="Guru Fox jumping on boxes, logo" />
        </div>   
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <label className="vibes">
              <legend>Please select your preferred vibe:</legend>
              <MoodContainer vibe={vibe} handleVibeChange={handleVibeChange} />
            </label>

            <label className="location">
              Location
              <img className="mag-glass" src={magGlass} alt="search icon" />
              <input
                style={inputStyle}
                className="input input-location"
                type="text"
                placeholder="Search Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
              />
            </label>

            <label className="budget">
              Budget
              <input
                style={inputStyle}
                className="input"
                type="number"
                placeholder="$50 - $100"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                required
              />
            </label>

            <label className="date">
              Date
              <input
                style={inputStyle}
                className="input"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </label>

            <label className="time">
              Time
              <input
                style={inputStyle}
                className="input"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                required
              />
            </label>
            <br />
            <button style={buttonStyle} className="generate-btn btn" type="submit">
              Generate Date Plan
              <img className="generate-img" src={generate} alt="generate image" />
            </button>
          </form>
        </div>
        </div>
      )}
    </div>
  );
}

export default Form;
