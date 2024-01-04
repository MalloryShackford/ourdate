import React, { useEffect, useState } from 'react';
import { useFormData } from './FormDataContext';
import './Confirm.css';
import PropTypes from 'prop-types';
import calendar from '../../assets/calendar.svg';
import about from '../../assets/about.svg';
import dining from '../../assets/dining.svg';
import generate from '../../assets/generate.svg';
import checkmark from '../../assets/checkmark.svg';
import greenCheckmark from '../../assets/sm-green-checkmark.svg';
import arrow from '../../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';
export default function Confirm ({ currentPage, setCurrentPage, prevPage, submitForm, sectionCompletion, setSectionCompletion }) {
    const [progress, setProgress] = useState(0);
    const { formData, updateFormData } = useFormData();
    const navigate = useNavigate();
    console.log("Form Data:", formData);

    const handleNavigate = () => {
        navigate('/')
    };

    // useEffect(() => {
    //     updateFormProgress();
    // }, [formData]);

    // const updateFormProgress = () => {
    //     const totalFields = 14;
    
    //     let fieldsFilled = Object.keys(formData).filter(key => {
    //         if (key === 'defaultFormData') {
    //             return false;
    //           }
    //         if (key === 'unit') {
    //             return formData[key] !== 'mi';
    //         }
    //         if (key === 'radius') {
    //             return formData[key] !== '0' && formData[key] !== 0;
    //         }
    //         return formData[key];
    //     }).length;
        
    //     const newProgress = (fieldsFilled / totalFields) * 100;
    //     setProgress(newProgress);
    // };
    const updateFormProgress = () => {
        const isBasicsComplete = sectionCompletion.basics;
        const isDetailsComplete = sectionCompletion.details;
        const isPreferencesComplete = sectionCompletion.preferences;
      
        let progressPercentage = 0;
        const sectionContribution = 100 / 4; 
        if (isBasicsComplete) {
          progressPercentage += sectionContribution;
        }
        if (isDetailsComplete) {
          progressPercentage += sectionContribution;
        }
        if (isPreferencesComplete) {
          progressPercentage += sectionContribution;
        }
      
        if (isBasicsComplete && isDetailsComplete && isPreferencesComplete) {
          progressPercentage = 100;
        }
        setProgress(progressPercentage);
      };

      useEffect(() => {
        updateFormProgress();
      }, [sectionCompletion]);

      const formatTime = (timeString) => {
        if (!timeString) return null;
        const date = new Date(`${timeString}:00`);
        if (isNaN(date)) return 'Invalid time';
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      };
      
    const formatDate = (dateString) => {
        if (!dateString || !Date.parse(dateString)) return null;
        dateString = `${dateString}T12:00:00`
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const isEverySectionComplete = sectionCompletion.basics && sectionCompletion.details && sectionCompletion.preferences;


return(
    <div id="container">
    <div id="sidebar">
        <div className="back-home-container">
            <span 
                className="back-home-span"
                onClick={handleNavigate}
            >
            <img 
                className="back-home-img"
                src={arrow} 
                alt="arrow"
            />
                Back to Home
            </span>
        </div>
        <div className="progress-ring">
            <svg
                className="progress-ring"
                width="120"
                height="120">
                <defs>
                    <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="10%" stopColor="rgba(189, 133, 230, 0.8)" />
                        <stop offset="60%" stopColor="rgba(234, 135, 150, 0.8)" />
                    </linearGradient>
                </defs>
                <circle 
                    className="progress-ring__circle-bg"
                    stroke="#f9e5e9b6" 
                    strokeWidth="8"
                    fill="transparent" 
                    r="52" 
                    cx="60" 
                    cy="60"
                    style={{ strokeDasharray: '326.73', strokeDashoffset: '0' }}/>
                <circle
                    className="progress-ring__circle"
                    stroke="url(#gradientStroke)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    r="52"
                    cx="60"
                    cy="60"/>
            </svg>
            <span className="progress-ring__text">{Math.round(progress)}%</span>
                </div>
                <div className="progress-text-container">
                    <span>      
                        {Math.round(progress) === 25 ? ' Things are cooking!' : ''}
                        {Math.round(progress) === 50 ? " We're halfway there!" : ""}
                        {Math.round(progress) === 75 ? " You're almost done!" : ""}
                        {Math.round(progress) === 100 ? " You made it!" : ""}
                    </span>
                    </div>
        <nav className="nav">
            <ul>
                <li className={currentPage >=1 && currentPage <=2 ? 'active' : ''}
                    onClick={() => setCurrentPage(1)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={calendar} alt="calendar" style={{ height: 16, width: 16, marginRight: 10 }}/>
                    Basics
                </div>
                {sectionCompletion.basics && <img src={greenCheckmark} alt="checkmark" className="complete-checkmark"/>}
                </li>
                <li className={currentPage >=3 && currentPage <=4 ? 'active' : ''}
                    onClick={() => setCurrentPage(3)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={about} alt="details" style={{ height: 16, width: 16, marginRight: 10 }}/>
                    Details
                </div>
                {sectionCompletion.details && <img src={greenCheckmark} alt="checkmark" className="complete-checkmark"/>}
                </li>
                <li className={currentPage >=5 && currentPage <=6 ? 'active' : ''}
                    onClick={() => setCurrentPage(5)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={dining} alt="dining" style={{height: 16, width: 16, marginRight: 10}}/>
                    Preferences
                </div>
                {sectionCompletion.preferences && <img src={greenCheckmark} alt="checkmark" className="complete-checkmark"/>}
                </li>
                <li className={currentPage === 7 ? 'active' : ''}
                    onClick={() => setCurrentPage(7)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={generate} alt="generate" style={{height: 16, width: 16, marginRight: 10}}/>
                    Confirm Your Plan
                </div>
                {isEverySectionComplete && <img src={greenCheckmark} alt="checkmark" className="complete-checkmark"/>}
                </li>

            </ul>
        </nav>
        </div>
       
        <main className="form-content">
        {currentPage === 7 && (
        <section className="content">
        <div className="mobile-container">
             <div className="mobile-progress-bar">
                <div className="mobile-progress-bar-inner" 
                     style={{ width: `${progress}%` }}>
                        <span className="mobile-progress-integer">
                            {Math.round(progress)}%
                            {Math.round(progress) === 25 ? ' Things are cooking!' : ''}
                            {Math.round(progress) === 50 ? " We're halfway there!" : ""}
                            {Math.round(progress) === 75 ? " You're almost done!" : ""}
                            {Math.round(progress) === 100 ? " You're almost done, but one last thing!" : ""}
                        </span>
                </div>
                <div className="mobile-progress-bar-outer">
                <nav>
                    <ul>
                        <li className={currentPage >=1 && currentPage <=2 ? 'active' : ''}
                            onClick={() => setCurrentPage(1)}>
                            <img src={calendar} alt="calendar" style={{height: 16, width: 16, marginRight: 10 }}/>Basics</li>
                        <li className={currentPage  >=3 && currentPage <=4 ? 'active' : ''}
                            onClick={() => setCurrentPage(3)}>
                            <img src={about} alt="calendar" style={{height: 16, width: 16, marginRight: 10 }}/>Details</li>
                        <li className={currentPage === 5 ? 'active' : ''}
                            onClick={() => setCurrentPage(5)}>
                            <img src={dining} alt="calendar" style={{height: 16, width: 16, marginRight: 10 }}/>Preferences</li>
                    </ul>
                </nav>
                </div>
            </div>
        </div>
        <div className="form-container"> 
        <img src={checkmark} alt="checkmark" style={{width: 24, height: 24, marginBottom: 6}}/>   
            <h2>Confirm Your Plan</h2>
        <div className="basics-container">
            <h3 className="h3-basics">Basics<span className="edit" onClick={() => setCurrentPage(1)}>Edit</span></h3>
                <div className="date-container">
                    <p className="date">Date</p>
                        <span className="form-data">{formData.isDateAnytime ? 'Any day' : formatDate(formData.date)}</span>
                </div>
            <div className="time-container">
                <div className="time-inputs">
                <p className="p-time-label">Time</p>
                </div>
                    <div className="start-end-times">
                        <p className="start">
                    Start
                    <span className="form-data">{formData.isStartTimeAnytime ? 'Anytime' : formatTime(formData.startTime)}</span>
                    </p>
                    <p className="end">
                    End
                    <span className="form-data">{formData.isEndTimeAnytime ? 'Anytime' : formatTime(formData.endTime)}</span>
                    </p>
                    </div>
            </div>
            <div className="location-container">
             <p className="location">Location </p>
                <span className="form-data">{formData.location || 'Not Specified'}</span>
            </div>
                <div className="within-container">
                    <span className="miles-within">within <span className="form-data">{formData.radius} {formData.unit}</span>
                </span>
                </div>
            
            <div className="budgets-container">
            <p className="budget">Budget </p>
            <div className="within-container">
                <span className="within-budget">{formData.budgetFlexibility} {formData.budgetFlexibility === 'flexible' ? 'within ' : ''}
                <span className="form-data">{formData.budget || 'Not Specified'}</span>
                </span>
            </div>
            </div>
          
        </div>
        <div className="detail-container">
            <h3 className="h3-details">Details <span className="edit" onClick={() => setCurrentPage(3)}>Edit</span></h3>
            <div className="occasion-container">
            <p className="occasion">Special Occasion</p>
                <span className="form-data">{formData.otherOccasionText || formData.occasion}</span>
            </div>
            <div className="mood-container">
                <div className="mood-inputs">
                <p className="mood-label">Ambiance</p>
                <div className="mood-energy-container">
                    <p className="p-mood">
                    Mood
                    <span className="form-data">{formData.otherMood || formData.mood}</span>
                    </p>
                    <p className="p-energy">
                    Energy
                    <span className="form-data">{formData.energy}</span>
                </p>
                </div>
                </div>
            </div>
            <div className="activity-container">
            <p className="activity">Specific Activities</p>
                <span className="form-data">{formData.otherActivity || formData.specificActivity}</span>
            </div>
            <div className="preferences-container">
              <h3 className="h3-preferences">Preferences<span className="edit" onClick={() => setCurrentPage(5)}>Edit</span></h3>
              <div className="environ-container">
                <p className="environ">Environment</p>
                    <span className="form-data">{formData.environment}</span>
             </div>
             <div className="audiences-container">
                <p className="audience">Audience</p>
                    <span className="form-data">{formData.audience}</span>
             </div>
             <div className="extra-info-container">
                <p className="other">Anything else we should know </p>
                    <span className="form-data">{formData.extraInfo}</span>
            </div>
            </div>
        </div>
        <div className="button-container">
        {/* <button type="button" onClick={prevPage}>Edit</button> */}
        <button id="confirm-btn" type="confirm" onClick={submitForm}>Confirm</button>
        </div>
        </div>
        </section>
        )}
        </main>
        
    </div>
    
);
}
Confirm.propTypes = {
    updateProgress: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    prevPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.number.isRequired,
    sectionCompletion: PropTypes.shape({
        basics: PropTypes.bool,
        details: PropTypes.bool,
        preferences: PropTypes.bool,
        confirm: PropTypes.bool
    }),
    setSectionCompletion: PropTypes.func.isRequired,
}