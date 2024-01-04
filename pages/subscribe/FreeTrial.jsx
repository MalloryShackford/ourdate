import React from 'react';
import ourdateLogo from '../../assets/logo.svg';
import stars from '../../assets/stars.svg';
import checkmark from '../../assets/blue-checkmark.svg';
import chevronLeft from '../../assets/chevron-left.svg';
import '../../styles/pages/FreeTrial.css';
import { useNavigate } from 'react-router-dom'


const FreeTrial = () => {
    const navigate = useNavigate();

    const handleLaterClick = () => {
        navigate('/profile');
    }
    const handleFreeTrialClick = () => {
        navigate('/pricing');
    }

return (
    <div>
        <img 
            className="chevron-img-left" 
            src={chevronLeft} 
            alt="chevron-left" 
            onClick={() => navigate('/signup')}
        />
    <div className="free-trial-container">
        <img src={ourdateLogo} alt="ourdate-logo" height="35px"/>
        <h2 className="ft-header">Unlock OurDate</h2>
        <p>Ditch the Planning, Embrace Romance</p>
    <div className="stars-container">
        <img src={stars} alt="stars" className="stars-img" height="84rem"/>
    </div>
    <div className="info-container">
        <div className="checkmark-container">
            <img src={checkmark} alt="checkmark" height="20px"/>
            <p><strong>Effortless:</strong> Personalized & curated date ideas, saving you time & stress.</p>
        </div>
        <div className="checkmark-container">
            <img src={checkmark} alt="checkmark" height="20px" />
            <p><strong>Unique:</strong> Discover hidden gems & activities you both will love.</p>
        </div>
        <div className="checkmark-container">
            <img src={checkmark} alt="checkmark" height="20px" />
            <p><strong>Stress-Free:</strong> We make scheduling easy, so you can spend less time planning & more time together.</p>
        </div>
       
    </div>
    <div className="btns-container">
        <button onClick={handleFreeTrialClick} className="ft-btn">Start free trial</button>
        {/* <button onClick={handleLaterClick} className="later-btn">Maybe later</button> */}
    </div>
    </div>
    </div>
    )}



export default FreeTrial;