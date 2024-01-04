import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Details.css';
import { useFormData } from './FormDataContext';
import chevronLeft from '../../assets/chevron-left.svg';
import chevronRight from '../../assets/chevron-right.svg';
import calendar from '../../assets/calendar.svg';
import about from '../../assets/about.svg';
import dining from '../../assets/dining.svg';
import generate from '../../assets/generate.svg';
import birthday from '../../assets/occasion/birthday.svg';
import anniversary from '../../assets/occasion/anniversary.svg';
import vacation from '../../assets/occasion/vacation.svg';
import valentines from '../../assets/occasion/valentines.svg';
import concert from '../../assets/activity/concerts.svg';
import museum from '../../assets/activity/museum.svg';
import bar from '../../assets/activity/bar.svg';
import coffee from '../../assets/activity/coffee.svg';
import noOccasion from '../../assets/no-occasion.svg';
import other from '../../assets/other.svg';
import active from '../../assets/energy/active.svg';
import chill from '../../assets/energy/chill.svg';
import lively from '../../assets/energy/lively.svg';
import adventurous from '../../assets/mood/adventurous.svg';
import casual from '../../assets/mood/casual.svg';
import fancy from '../../assets/mood/fancy.svg';
import fun from '../../assets/mood/fun.svg';
import romantic from '../../assets/mood/romantic.svg';
import checkmark from '../../assets/sm-green-checkmark.svg';
import arrow from '../../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';

export default function Details({ currentPage, setCurrentPage, nextPage, prevPage, sectionCompletion, setSectionCompletion }) {
    const [progress, setProgress] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isOtherActivityModalVisible, setIsOtherActivityModalVisible] = useState(false);
    const [isMoodModalVisible, setIsMoodModalVisible] = useState(false);
    const [otherOccasionText, setOtherOccasionText] = useState('');
    const [otherActivityText, setOtherActivityText] = useState('');
    const [otherMoodText, setOtherMoodText] = useState('');
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

    const handleCheckboxChange = (event) => {
        const { name, value } = event.target;
        let updatedArray = formData[name] ? [...formData[name]] : [];
    
        if (updatedArray.includes(value)) {
            updatedArray = updatedArray.filter(item => item !== value);
        } else {
            updatedArray.push(value);
        }
        if (value === 'Other') {
            setIsModalVisible(true); 
        }
    
        updateFormData({ [name]: updatedArray });
    }
    const handleSpecificActivityChange = (event) => {
        const { value, checked } = event.target;
        let updatedArray = formData.specificActivity ? [...formData.specificActivity] : [];
        
        if (value === 'Other Activity' && checked) {
            setIsOtherActivityModalVisible(true);
        } else if (value === 'Other Activity' && !checked) {
            setIsOtherActivityModalVisible(false);
        }
        if (checked) {
            if (updatedArray.length >= 3) {
                alert("You can only select up to 3 activities.");
                // event.target.checked = false;
                return;
            }
            updatedArray.push(value);
        } else {
            updatedArray = updatedArray.filter(item => item !== value);
        }
    
        updateFormData({ specificActivity: updatedArray });
    };
    const handleMoodCheckboxChange = (event) => {
        const { name, value } = event.target;
        let updatedArray = formData[name] ? [...formData[name]] : [];
    
        if (updatedArray.includes(value)) {
            updatedArray = updatedArray.filter(item => item !== value);
        } else {
            updatedArray.push(value);
        }
        if (value === 'Other Mood') {
            setIsMoodModalVisible(true); 
        }
    
        updateFormData({ [name]: updatedArray });
    }
    const handleModalSubmit = () => {
        updateFormData({ ...formData, otherOccasion: otherOccasionText });
        setIsModalVisible(false); 
    };
    const handleOtherActivityModalSubmit = () => {
        updateFormData({ ...formData, otherActivity: otherActivityText });
        setIsOtherActivityModalVisible(false);
    };
    const handleMoodModalSubmit = () => {
        updateFormData({ ...formData, otherMood: otherMoodText });
        setIsMoodModalVisible(false);
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

    const occasionIcon = {
        Birthday: birthday,
        Vacation: vacation,
        Anniversary: anniversary,
        "Valentines Day": valentines,
        "No Occasion": noOccasion,
        Other: other,
      };
    
    const activityIcon = {
        Concert: concert, 
        Museum: museum,
        Bar: bar, 
        Coffee: coffee, 
        "Nothing Specific": noOccasion, 
        "Other Activity": other,
    }
    const moodIcon = {
        Romantic: romantic, 
        Fancy: fancy, 
        Adventurous: adventurous, 
        Casual: casual,
        Fun: fun, 
        "Other Mood": other,
    }
    const energyIcon = {
        Chill: chill, 
        Lively: lively, 
        Active: active,
    }

    const markSectionAsCompleted = () => {
        setSectionCompletion(prevState => ({
            ...prevState,
            details: true
        }));
      };

      useEffect(() => {
        const isOccasionComplete = formData.occasion?.length > 0 && (!formData.occasion.includes('Other') || otherOccasionText.trim() !== '');
        const isActivityComplete = formData.specificActivity?.length > 0 && (!formData.specificActivity.includes('Other Activity') || otherActivityText.trim() !== '');
        const isMoodComplete = formData.mood?.length > 0 && (!formData.mood.includes('Other Mood') || otherMoodText.trim() !== '');
        const isEnergyComplete = formData.energy?.length > 0;
    
        if (isOccasionComplete && isActivityComplete && isMoodComplete && isEnergyComplete) {
            markSectionAsCompleted('details');
        }
    }, [formData, otherOccasionText, otherActivityText, otherMoodText]);

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
            {currentPage === 3 && (
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
                    <img src={about} alt="about" style={{ width: 24, height: 24, marginBottom: 12}}/>
                    <h2 className="h2-details">Details</h2>
                <div className="details-container">
                    <p className="p-details">Are we celebrating something special?
                    <span className="select">(Select all that apply)</span></p>
                </div>
                <div className="options">
                    {[
                    'Birthday', 
                    'Vacation', 
                    'Anniversary', 
                    'Valentines Day', 
                    'No Occasion',
                    'Other'
                    ].map(occasion => (
                        <React.Fragment key={occasion}>
                        <input
                          className="hidden-checkbox"
                          type="checkbox"
                          name="occasion"
                          id={`checkbox-${occasion}`}
                          value={occasion}
                          checked={formData.occasion?.includes(occasion)}
                          onChange={handleCheckboxChange}
                        />
                        <label 
                            className="input-occasion"
                            key={occasion}
                            htmlFor={`checkbox-${occasion}`}
                        >
                        <img 
                            src={occasionIcon[occasion]} 
                            alt="occasion" 
                            style={{ 
                                width: 16, 
                                height: 16, 
                                marginRight: 6, 
                                }} 
                        />
                        {occasion}
                      </label>
                      </React.Fragment>
                  ))}
                 </div>
                 {isModalVisible && (
                <div className="modal">
                    <p>Describe special occasion:</p>
                    <input
                        className="modal-input"
                        type="text"
                        id="otherOccasionText"
                        name="otherOccasionText"
                        value={otherOccasionText}
                        onChange={(e) => setOtherOccasionText(e.target.value)}
                        placeholder="Describe special occasion:"
                    />
                    <div className="modal-btns">
                    <button className="modal-btn cancel-btn" onClick={() => setIsModalVisible(false)}>Cancel</button>
                    <button className="modal-btn save-btn" onClick={handleModalSubmit}>Save</button>
                    </div>
                </div>
            
            )}
            <div className="details-container">
                <p className="p-details">Anything specific you are in the mood for?
                <span className="select">(Select up to 3)</span></p>
            </div>
                <div className="options">
                    {[
                    'Concert', 
                    'Museum', 
                    'Bar', 
                    'Coffee',
                    'Nothing Specific', 
                    'Other Activity'
                    ].map(specificActivity => (
                        <React.Fragment key={specificActivity}>
                        <input
                          className="hidden-checkbox"
                          type="checkbox"
                          name="specificActivity"
                          id={`checkbox-${specificActivity}`}
                          value={specificActivity}
                          checked={formData.specificActivity?.includes(specificActivity)}
                          onChange={handleSpecificActivityChange}
                        />
                        <label 
                            className="input-activity" 
                            key={specificActivity}
                            htmlFor={`checkbox-${specificActivity}`}
                        >
                        <img 
                            src={activityIcon[specificActivity]} 
                            alt="occasion" 
                            style={{ 
                                width: 16, 
                                height: 16, 
                                marginRight: 6,  
                                }} 
                        />
                        {specificActivity}
                      </label>
                      </React.Fragment>
                  ))}
                 </div>
                 {isOtherActivityModalVisible && (
                <div className="modal">
                    <p>Describe other activity:</p>
                    <input
                        type="text"
                        className="modal-input"
                        value={otherActivityText}
                        name="otherActivityText"
                        id="otherActivityText"
                        onChange={(e) => setOtherActivityText(e.target.value)}
                        placeholder="Describe other activity:"
                    />
                    <div className="modal-btns">
                    <button className="modal-btn cancel-btn" onClick={() => setIsOtherActivityModalVisible(false)}>Cancel</button>
                    <button className="modal-btn save-btn" onClick={handleOtherActivityModalSubmit}>Save</button>
                    </div>
                </div>
            
            )}
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
            {currentPage === 4 && (
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
                <img src={about} alt="about" style={{ width: 24, height: 24, marginBottom: 12}}/>
                    <h2 className="h2-details">Details</h2>
                    <div className="details-container">
                        <p className="p-details">Set the scene for us, what are you in the mood for?
                        <span className="select">(Select all that apply)</span></p>
                    </div>
                <div className="options">
                    {[
                    'Romantic', 
                    'Fancy', 
                    'Adventurous', 
                    'Casual',
                    'Fun',
                    'Other Mood'
                    ].map(mood => (
                        <React.Fragment key={mood}>
                        <input
                          className="hidden-checkbox"
                          type="checkbox"
                          id={`checkbox-${mood}`}
                          value={mood}
                          name="mood"
                          checked={formData.mood?.includes(mood)}
                          onChange={handleMoodCheckboxChange}
                        />
                        <label 
                            className="input-occasion" 
                            key={mood}
                            htmlFor={`checkbox-${mood}`}
                        >
                        <img 
                            src={moodIcon[mood]} 
                            alt="mood" 
                            style={{ 
                                width: 16, 
                                height: 16, 
                                marginRight: 6, 
                                }} 
                        />
                        {mood}
                      </label>
                      </React.Fragment>
                  ))}
                  </div>
                  {isMoodModalVisible && (
                <div className="modal">
                    <p>Describe your mood:</p>
                    <input
                        className="modal-input"
                        type="text"
                        value={otherMoodText}
                        name="otherMoodText"
                        id="otherMoodText"
                        onChange={(e) => setOtherMoodText(e.target.value)}
                        placeholder="Describe your mood:"
                    />
                    <div className="modal-btns">
                    <button className="modal-btn cancel-btn" onClick={() => setIsMoodModalVisible(false)}>Cancel</button>
                    <button className="modal-btn save-btn" onClick={handleMoodModalSubmit}>Save</button>
                    </div>
                </div>
            )}
                <div className="details-container">
                  <p className="p-details">What should the energy be like?
                  <span className="select">(Select all that apply)</span></p>
                </div>
                <div className="options">
                    {[
                    'Chill', 
                    'Lively', 
                    'Active', 
                    ].map(energy => (
                        <React.Fragment key={energy}>
                        <input
                          className="hidden-checkbox"
                          type="checkbox"
                          id={`checkbox-${energy}`}
                          value={energy}
                          name="energy"
                          checked={formData.energy?.includes(energy)}
                          onChange={handleCheckboxChange}
                        />
                        <label 
                            className="input-occasion" 
                            key={energy}
                            htmlFor={`checkbox-${energy}`}
                        >
                        <img 
                            src={energyIcon[energy]} 
                            alt="energy" 
                            style={{ 
                                width: 16, 
                                height: 16, 
                                marginRight: 6, 
                                }} 
                        />
                        {energy}
                      </label>
                      </React.Fragment>
                  ))}
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
Details.propTypes = {
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