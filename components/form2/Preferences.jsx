import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Preferences.css';
import { useFormData } from './FormDataContext';
import chevronLeft from '../../assets/chevron-left.svg';
import chevronRight from '../../assets/chevron-right.svg';
import calendar from '../../assets/calendar.svg';
import about from '../../assets/about.svg';
import dining from '../../assets/dining.svg';
import generate from '../../assets/generate.svg';
import indoor from '../../assets/environment/indoor.svg';
import outdoor from '../../assets/environment/outdoor.svg';
import noPreference from '../../assets/audience/no-preference.svg';
import petFriendly from '../../assets/audience/pet-friendly.svg';
import familyFriendly from '../../assets/audience/family-friendly.svg';
import checkmark from '../../assets/sm-green-checkmark.svg';
import arrow from '../../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';
export default function Preferences({ currentPage, setCurrentPage, nextPage, prevPage, sectionCompletion, setSectionCompletion }) {
    const [progress, setProgress] = useState(0);
    const { formData, updateFormData } = useFormData();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/')
    };

    // useEffect(() => {
    //     updateFormProgress();
    // }, [formData]);

    // useEffect(() => {
    //     console.log('Current formData:', formData);
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
        let progressPercentage = 0;
      
        const sectionContribution = 25;
      
        if (sectionCompletion.basics) {
          progressPercentage += sectionContribution;
        }
        if (sectionCompletion.details) {
          progressPercentage += sectionContribution;
        }
        if (sectionCompletion.preferences) {
          progressPercentage += sectionContribution;
        }
        if (sectionCompletion.confirm) {
          progressPercentage += sectionContribution;
        }
      
        setProgress(progressPercentage);
      };
      useEffect(() => {
        updateFormProgress();
      }, [sectionCompletion]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        updateFormData({ [name]: value });
    };
    useEffect(() => {
        const circle = document.querySelector('.progress-ring__circle');
        if (circle) {
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;

            const offset = circumference - (progress / 100 * circumference);
            circle.style.strokeDashoffset = offset;
        }
    }, [progress]);

    const markSectionAsCompleted = () => {
        setSectionCompletion(prevState => ({
            ...prevState,
            preferences: true
        }));
      };

      useEffect(() => {

        if (formData.audience && formData.environment) {
            markSectionAsCompleted('preferences');
        }
    }, [formData.audience, formData.environment]);
    const isEverySectionComplete = sectionCompletion.basics && sectionCompletion.details && sectionCompletion.preferences;

    return (
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
                        {sectionCompletion.basics && <img src={checkmark} alt="checkmark" className="complete-checkmark"/>}
                        </li>
                        <li className={currentPage >=3 && currentPage <=4 ? 'active' : ''}
                            onClick={() => setCurrentPage(3)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={about} alt="details" style={{ height: 16, width: 16, marginRight: 10 }}/>
                            Details
                        </div>
                        {sectionCompletion.details && <img src={checkmark} alt="checkmark" className="complete-checkmark"/>}
                        </li>
                        <li className={currentPage >=5 && currentPage <=6 ? 'active' : ''}
                            onClick={() => setCurrentPage(5)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={dining} alt="dining" style={{height: 16, width: 16, marginRight: 10}}/>
                            Preferences
                        </div>
                        {sectionCompletion.preferences && <img src={checkmark} alt="checkmark" className="complete-checkmark"/>}
                        </li>
                        <li className={currentPage === 7 ? 'active' : ''}
                            onClick={() => setCurrentPage(7)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                         <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={generate} alt="generate" style={{height: 16, width: 16, marginRight: 10}}/>
                            Confirm Your Plan
                        </div>
                        {isEverySectionComplete && <img src={checkmark} alt="checkmark" className="complete-checkmark"/>}
                        </li>
                    </ul>
                </nav>
            </div>
            <main className="form-content">    
            <form id="form">
            {currentPage === 5 && (
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
                <img src={dining} alt="about" style={{ width: 24, height: 24, marginBottom: 12}}/>
                    <h2 className="h2-environment">Preferences</h2>
                <div className="header-container">
                    <p className="p-environment">Environment
                    <span className="select-one">(Select One)</span></p>
                <div className="options">
                    <input 
                        className="hidden-radio"
                        type="radio"
                        name="environment"
                        value="indoors"
                        id="indoors"
                        onChange={handleChange}
                        checked={formData.environment === "indoors"}
                    />
                    <label className="input-environment" htmlFor="indoors">
                        <img 
                            src={indoor} 
                            alt="indoor"
                            style={{ 
                                width: 16, 
                                height: 16, 
                                marginRight: 6, 
                                }} 
                        />
                        Indoor
                    </label>
                    <input 
                        className="hidden-radio"
                        type="radio"
                        name="environment"
                        value="outdoors"
                        id="outdoors"
                        onChange={handleChange}
                        checked={formData.environment === "outdoors"}
                    />
                    <label className="input-environment" htmlFor="outdoors">
                    <img 
                        src={outdoor} 
                        alt="outdoor"
                        style={{ 
                            width: 16, 
                            height: 16, 
                            marginRight: 6, 
                            }} 
                    />
                        Outdoor
                    </label>
                    <input 
                        className="hidden-radio"
                        type="checkbox"
                        name="environment"
                        value="no-preference"
                        id="no-preference"
                        onChange={handleChange}
                        checked={formData.environment === "no-preference"}
                    />
                        <label className="input-environment" htmlFor="no-preference">
                        <img 
                            src={noPreference} 
                            alt="no-preference"
                            style={{ 
                                width: 16, 
                                height: 16, 
                                marginRight: 6, 
                                }} 
                        />
                        No Preference
                    </label>
                    </div>
                </div>
                <div className="audience-container">
                <div className="header-container">
                <p className="p-audience">Audience
                <span className="select-one">(Select One)</span></p>
                <div className="options">
                    <input 
                        className="hidden-radio"
                        type="radio"
                        name="audience"
                        value="pet-friendly"
                        id="pet-friendly"
                        onChange={handleChange}
                        checked={formData.audience === "pet-friendly"}
                    />
                    <label className="input-audience" htmlFor="pet-friendly">    
                        <img 
                            src={petFriendly}
                            alt="pet-friendly"
                            style={{ 
                                width: 16, 
                                height: 16, 
                                marginRight: 6, 
                                }} 
                        />
                        Pet-Friendly
                    </label>
                    <input 
                        className="hidden-radio"
                        type="radio"
                        name="audience"
                        value="family-friendly"
                        id="family-friendly"
                        onChange={handleChange}
                        checked={formData.audience === "family-friendly"}
                    />
                    <label className="input-audience" htmlFor="family-friendly">
                        <img 
                            src={familyFriendly} 
                            alt="family-friendly"
                            style={{ 
                                width: 16, 
                                height: 16, 
                                marginRight: 6, 
                                }} 
                        />
                        Family-Friendly
                    </label>
                    <input 
                        className="hidden-radio"
                        type="radio"
                        name="audience"
                        value="no preference"
                        id="no preference"
                        onChange={handleChange}
                        checked={formData.audience === "no preference"}
                    />
                    <label className="input-audience" htmlFor="no preference">
                    <img 
                        src={noPreference}  
                        alt="no-preference"
                        style={{ 
                            width: 16, 
                            height: 16, 
                            marginRight: 6, 
                            }} 
                    />
                        No Preference
                    </label>
                    </div>
                </div>
                <div className="button-container">
                <button id="prev-btn" type="button" onClick={prevPage}>
                    <img id="chevron" className="chevron-left" src={chevronLeft} alt="chevron-left"/>
                Previous</button>
                <button id="next-btn" type="button" onClick={nextPage}>Next
                    <img id="chevron" src={chevronRight} alt="chevron-right"style={{ width: 16, height: 16}} />
                </button>
                </div>
                </div>
                </div>
                </section>
                )}
                {currentPage === 6 && (
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
                <img src={dining} alt="about" style={{ width: 24, height: 24, marginBottom: 12}}/>
                <div className="header-container">
                    <h2 className="h2-other">Almost There!</h2>
                    <p className="p-other">Anything else we should know?</p>
                    <input 
                        className="extra-info"
                        type="text"
                        name="extraInfo"
                        placeholder="Start typing..."
                        value={formData.extraInfo || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="button-container">
                <button id="prev-btn" type="button" onClick={prevPage}>
                    <img id="chevron" className="chevron-left" src={chevronLeft} alt="chevron-left"/>
                Previous</button>
                <button id="next-btn" type="button" onClick={nextPage}>Next
                <img id="chevron" src={chevronRight} alt="chevron-right"style={{ width: 16, height: 16}} />
                </button>
                </div>
                </div>
            </section>
            )}
            
           </form>
           </main>
        </div>
        
    );
}
Preferences.propTypes = {
    updateProgress: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
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