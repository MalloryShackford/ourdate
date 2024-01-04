import React, { useEffect, useState } from 'react';
// import dateplanService from '../../shared/services/dateplan.service';
import ProgressBar from './ProgressBar';
import PropTypes from 'prop-types';
import './Basics.css';
import { useFormData } from './FormDataContext';
import chevronLeft from '../../assets/chevron-left.svg';
import chevronRight from '../../assets/chevron-right.svg';
import calendar from '../../assets/calendar.svg';
import about from '../../assets/about.svg';
import dining from '../../assets/dining.svg';
import generate from '../../assets/generate.svg';
import checkmark from '../../assets/sm-green-checkmark.svg';
import arrow from '../../assets/arrow.svg';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

export default function Basics({ currentPage, setCurrentPage, nextPage, prevPage, sectionCompletion, setSectionCompletion }) {
    // const [setCurrentPage] = useState(1)
    const [progress, setProgress] = useState(0);
    const [isDateAnytime, setIsDateAnytime] = useState(false);
    const [isStartTimeAnytime, setIsStartTimeAnytime] = useState(false);
    const [isEndTimeAnytime, setIsEndTimeAnytime] = useState(false);
    const [unit, setUnit] = useState('mi')
    const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedStartPeriod, setSelectedStartPeriod] = useState(null);
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [selectedEndPeriod, setSelectedEndPeriod] = useState(null);
    const { formData, updateFormData } = useFormData();
    const navigate = useNavigate();

    // useEffect(() => {
    //     updateFormProgress();
    // }, [formData]);   

    const handleNavigate = () => {
        navigate('/');
      };

    useEffect(() => {
        console.log('Current formData:', formData);
    }, [formData]);
    
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

    const handleChange = (e) => {
        updateFormData({ [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (name) => {
        updateFormData({ [name]: !formData[name] });
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
            basics: true
          }));
        }
      useEffect(() => {
        const isDateComplete = formData.isDateAnytime || formData.date;
        const isStartTimeComplete = formData.isStartTimeAnytime || formData.startTime;
        const isEndTimeComplete = formData.isEndTimeAnytime || formData.endTime;
    
        if (isDateComplete && isStartTimeComplete && isEndTimeComplete && formData.location && formData.budget) {
            markSectionAsCompleted('basics');
        }
    }, [formData.date, 
        formData.isDateAnytime, 
        formData.startTime, 
        formData.isStartTimeAnytime, 
        formData.endTime, 
        formData.isEndTimeAnytime, 
        formData.location, 
        formData.budget
        ]);
    const isEverySectionComplete = sectionCompletion.basics && sectionCompletion.details && sectionCompletion.preferences;
    
    const timeOptions = [];
        for (let i = 1; i < 12; i++) {
        const hour = `${i < 10 ? '0' : ''}${i}`;
              timeOptions.push({ value: `${hour}:00`, label: `${hour}:00` });
              timeOptions.push({ value: `${hour}:30`, label: `${hour}:30` });
        }

    const periodOptions = [
        { value: 'AM', label: 'AM', name: 'period' },
        { value: 'PM', label: 'PM', name: 'period' },
    ];
    
    const handleStartTimeChange = selectedOption => {
        setSelectedStartTime(selectedOption);
        const formattedStartTime = selectedOption ? `${selectedOption.value} ${selectedStartPeriod ? selectedStartPeriod.value : ''}` : '';
        updateFormData({ ...formData, startTime: formattedStartTime });
      };
    
      const handleStartPeriodChange = selectedOption => {
        setSelectedStartPeriod(selectedOption);
        const formattedStartTime = selectedStartTime ? `${selectedStartTime.value} ${selectedOption ? selectedOption.value : ''}` : '';
        updateFormData({ ...formData, startTime: formattedStartTime });
      };
    
      const handleEndTimeChange = selectedOption => {
        setSelectedEndTime(selectedOption);
        const formattedEndTime = selectedOption ? `${selectedOption.value} ${selectedEndPeriod ? selectedEndPeriod.value : ''}` : '';
        updateFormData({ ...formData, endTime: formattedEndTime });
      };
    
      const handleEndPeriodChange = selectedOption => {
        setSelectedEndPeriod(selectedOption);
        const formattedEndTime = selectedEndTime ? `${selectedEndTime.value} ${selectedOption ? selectedOption.value : ''}` : '';
        updateFormData({ ...formData, endTime: formattedEndTime });
      };
    const borderStyle = {
        control: (provided) => ({
            ...provided,
            borderColor: '#b0e7ef',
            borderWidth: '1px',
            padding: '0 4px',
        })
    }

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
        {currentPage === 1 && (
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
                            <img src={about} alt="calendar" style={{height: 16, width: 16, marginRight: 10}}/>Details</li>
                        <li className={currentPage === 5 ? 'active' : ''}
                            onClick={() => setCurrentPage(5)}>
                            <img src={dining} alt="calendar" style={{height: 16, width: 16, marginRight: 10}}/>Preferences</li>
                    </ul>
                </nav>
                </div>
            </div>
        </div>
            <div className="form-container">
                <img src={calendar} alt="calendar" style={{ width: 24, height: 24, marginBottom: 12}}/>
                <h2 className="h2-date">Basics</h2>
                <p className="p-date">When is the date?</p>
                    <input
                        // style={inputStyle}
                        className="input input-date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        disabled={formData.isDateAnytime}
                        required={!isDateAnytime}
                    />
                    <label className="input-anyday">
                        <input
                          className="input-anyday checkbox-label"
                          type="checkbox"
                          name="isDateAnytime"
                          checked={formData.isDateAnytime || false}
                          value={formData.isDateAnytime || false}
                          onChange={() => handleCheckboxChange('isDateAnytime')}
                        />
                        Any day
                    </label>
                <div className="time-container">
                <p className="time-label">When does the date start and end?</p>
                <div className="time-input">
                <label className="start-time">
                    Start
                    <div className="time-input-container">
                    <Select 
                        className="input-time-change"
                        styles={borderStyle}
                        options={timeOptions}
                        onChange={handleStartTimeChange}
                        placeholder="00:00"
                        name="startTime"
                        value={selectedStartTime}
                        disabled={formData.isStartTimeAnytime}
                        required={!isStartTimeAnytime}
                    />
                    <div className="am-pm-container">
                    <Select 
                        className="input-time am-pm"
                        styles={borderStyle}
                        options={periodOptions}
                        onChange={handleStartPeriodChange}
                        placeholder="AM"
                        name="periodOptions"
                        value={selectedStartPeriod}
                    />
                    </div>
                </div>
                <label className="input-anytime">
                    <input
                        className="input-anytime checkbox-label"
                        type="checkbox"
                        name="startTimeCheck"
                        checked={formData.isStartTimeAnytime}
                        onChange={() => handleCheckboxChange('isStartTimeAnytime')}
                    />
                    Anytime
                </label>
                </label>
                <label className="end-time">
                    End
                <div className="time-input-container">
                    <Select 
                        className="input-time-change"
                        styles={borderStyle}
                        options={timeOptions}
                        onChange={handleEndTimeChange}
                        placeholder="00:00"
                        name="startTime"
                        value={selectedEndTime}
                        disabled={formData.isEndTimeAnytime}
                        required={!isEndTimeAnytime}
                    />
                    <div className="am-pm-container">
                    <Select 
                        className="input-time am-pm"
                        styles={borderStyle}
                        options={periodOptions}
                        onChange={handleEndPeriodChange}
                        placeholder="AM"
                        name="periodOptions"
                        value={selectedEndPeriod}
                    />
                    </div>
                </div>
                <label className="input-anytime">
                    <input
                        className="input-anytime checkbox-label"
                        type="checkbox"
                        name="endTimeCheck"
                        checked={formData.isEndTimeAnytime}
                        onChange={() => handleCheckboxChange('isEndTimeAnytime')}
                    />
                    Anytime
                </label>    
                </label>
                </div>
                </div>
                <div className="next-btn-container">
                <button id="next-btn" type="button" onClick={nextPage}>Next
                <img id="chevron" src={chevronRight} alt="chevron-right"style={{ width: 16, height: 16}} />
                </button>
                </div>
            </div>
            </section>
        )}
        {currentPage === 2 && (
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
            <img src={calendar} alt="calendar" style={{ width: 24, height: 24, marginBottom: 12}}/>
                <h2 className="h2-location">Basics</h2>
                <p className="p-location">Where is your date happening?</p>
                <label className="location">
                    <input
                        // style={inputStyle}
                        className="input input-location"
                        type="text"
                        placeholder="City, State, or Zip"
                        value={formData.location}
                        name="location"
                        onChange={handleChange}
                        required
                    />
                </label>
                <div className="slider-container">
                <span className="radius-span">within </span><span className="radius-integer">{formData.radius}</span>
                {/* {formData.radius ? (
                    <u className="unit-underline">{formData.radius}</u>) : ( '')} */}
                <label className="radius">
                    <input
                        className="input input-radius"
                        type="range"
                        min="0"
                        max="100"
                        value={formData.radius}
                        name="radius"
                        onChange={handleChange}
                    />
                </label>
                {/* </div>
                <div className="dropdown-container"> */}
                    <select 
                        className="input input-dropdown"
                        value={formData.unit || unit}
                        name="unit"
                        onChange={handleChange}
                    >
                    <option value="mi">mi</option>
                    <option value="km">km</option>
                    </select>
                </div>
            <div>
                <p className="p-budget">What is your budget?<span className="per-person">(per person)</span> </p>
                <div className="budget-container">
                    <input 
                        id="budgetUnder30"
                        className="input input-budget"
                        type="radio"
                        name="budget"
                        value="<30"
                        checked={formData.budget === "<30"}
                        onChange={handleChange}
                    />
                    <label htmlFor="budgetUnder30" className="budget radio-label">
                        $ (&lt; $30)
                    </label>
                    <input 
                        id="budget30to50"
                        className="input input-budget"
                        type="radio"
                        name="budget"
                        value="30-50"
                        checked={formData.budget === "30-50"}
                        onChange={handleChange}
                    />
                    <label htmlFor="budget30to50" className="budget radio-label">
                        $$ ($30 - $50)
                    </label>
                    <input 
                        id="budget50to100"
                        className="input input-budget"
                        type="radio"
                        name="budget"
                        value="50-100"
                        checked={formData.budget === "50-100"}
                        onChange={handleChange}
                    />
                    <label htmlFor="budget50to100" className="budget radio-label">
                        $$$ ($50 - $100)
                    </label>
                    <input 
                        id="budgetOver100"
                        className="input input-budget"
                        type="radio"
                        name="budget"
                        value=">100"
                        checked={formData.budget === ">100"}
                        onChange={handleChange}
                        />
                    <label htmlFor="budgetOver100" className="budget radio-label">
                        $$$$ (&gt; $100)
                    </label>
                </div>
                <div className="flexibility-container">
                    <label>
                        <input 
                            className="budget-flexibility"
                            type="radio"
                            name="budgetFlexibility"
                            value="strict"
                            checked={formData.budgetFlexibility === "strict"}
                            onChange={handleChange}
                        />
                        Strict
                    </label>
                    <label>
                        <input 
                            className="budget-flexibility"
                            type="radio"
                            name="budgetFlexibility"
                            value="flexible"
                            checked={formData.budgetFlexibility === "flexible"}
                            onChange={handleChange}
                        />
                        Flexible
                    </label>
                </div>
                <div className="button-container">
                <button id="prev-btn" type="button" onClick={prevPage}>
                    <img id="chevron" src={chevronLeft} alt="chevron-left" />
                Previous</button>
                <button id="next-btn" type="button" onClick={nextPage}>Next
                <img id="chevron" src={chevronRight} alt="chevron-right"style={{ width: 16, height: 16 }} />
                </button>
                </div>
            </div>
            </div>
        </section>
          )}
          
        </form>
        </main>
        
        
    </div>
    )
}
Basics.propTypes = {
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
    setSectionCompletion: PropTypes.func.isRequired
}
