import React, { useEffect, useState } from 'react';
import '../styles/pages/home.css';
import { useAuth } from '../context/authContext';
import { getCurrentUser } from '../shared/utils/user';
import { useNavigate } from 'react-router-dom';
import calendar from '../assets/calendar.svg';
import generate from '../assets/generate.svg';
import profile from '../assets/burgerMenu/profile.svg';
import '../styles/pages/home.css';
import HamburgerMenu from '../components/header/nav/HamburgerMenu';
import MostRecentDatePlan from '../pages/profile/mostRecentDatePlan';
import DatePlanService from '../shared/services/dateplan.service';

export default function Home() {
  const { setIsLoggedIn, userDetails, setUserDetails } = useAuth();
  const navigate = useNavigate();
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [datePlans, setDatePlans] = useState([]);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      const storedUuid = localStorage.getItem('datePlanUUID');
      
      try {
        const response = await DatePlanService.getDatePlansById(storedUuid);
        if (Array.isArray(response.results)) {
          setDatePlans(response.results);
          console.log('setDatePlans', response.results)
        } else {
          console.error('Expected an array of plans, received:', response.results);
        } 
        
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
      fetchPlans();
  }, []);
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await DatePlanService.getDatePlanByStatus('VE');
        if (data && data.results.some(plan => plan.status === 'VE')) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        console.error('Error fetching status:', error);
        setIsVerified(false);
      }
    };
    fetchStatus();
  }, []);
  

  useEffect(() => {
    const user = getCurrentUser();
    setUserDetails(user);
    if(user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    const savedProgress = parseFloat(localStorage.getItem('profileProgress')) || 0;
    setProfileCompletion(savedProgress);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return null;
  
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); 
  
    if (isNaN(date.getTime())) return null;
  
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return formattedDate.toUpperCase();
  };

  const handleClick = () => {
    if (datePlans && datePlans.length > 0 && datePlans[0].uuid) {
      navigate(`/showcase/${datePlans[0].plan_info}`);
    }
  };
  
  
  const userNameFromGoogle = localStorage.getItem('userName');
  const userNameToDisplay = userNameFromGoogle || userDetails?.username || 'User';
  const firstLetter = userNameToDisplay && userNameToDisplay.length > 0 ? userNameToDisplay[0].toUpperCase() : '?';

  return (
    <div className="welcome-container">
      <div className="navigation-container">
      <div className="burger-container">
        <HamburgerMenu className="hamburger-menu"/>
      </div>
      </div>
      
      <div className="user-container">
        <div className="avatar-container">
          <h2 className="avatar-letter">{firstLetter}</h2>
          <h2 className="welcome-h2">Welcome, {userNameToDisplay}</h2>
        </div>
        <div className="profile-completion-wrapper">
      <div className="profile-completion-container">
        <div className="profile-img-container">
        <img src={profile} alt="profile"/>
        <h2 className="completion-h2">My Profile </h2>
        </div>
        <p className="personalized-p">Complete your profile now to start getting date plans!</p>
        <span className="percentage-span">{profileCompletion.toFixed(0)}% completed</span>
        <div className="mobile-prog-bar">
                <div className="mobile-progress-bar-inner" 
                     style={{ width: `${profileCompletion}%` }}>
                </div>
                </div>
        <p className="profile-p" onClick={() => navigate('/profile')}>Complete my profile</p>
      </div>
      </div>
      <div className="box-shadow-border"></div>
      <div className="date-plan-container">
      <img src={calendar} alt="calendar" width="31"/>
        <h2 className="dateplan-h2">Date Plans</h2>
        </div>
      <div className="upcoming-plans-container">
        {datePlans && isVerified ? (
        <>
        <p>Your date plan is ready!</p>
        <div className="date-ready-container">
          <ul>
            <li key={datePlans.uuid} className="list-icons">
              <div className="dateplan-ready-wrapper">
                <div className="dateplan-ready-container">
                  <div className="start-time-container">
                    <h2 className="time-h2">
                     {formatDate(datePlans[0].plan.dateOf)}
                    </h2>
                  </div>
                 <div className="recent-plan-container">
                    <h3 className="plan-details-h3">
                      Date in {datePlans[0].plan.cityState}
                    </h3>
                    <span>Your date plan is here!</span>
                    <span className="view-span" onClick={handleClick}>Click to view</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
            {/* <MostRecentDatePlan datePlan={datePlans} onClick={handleClick}/> */}
        </>
        ) : (
          <p>You have no upcoming date plans</p>
        )}
      </div>

      <div className="plan-date-btn-container">
      {datePlans ? (
        <p className="my-plans-p" onClick={() => navigate('/dateplan')}>My Date Plans</p>
      ) : (
        <button 
            className="plan-btn"
            onClick={() => navigate('/form')}>
        <img src={generate} alt="generate" width="16"/> Plan my date</button>
      )}
      </div>
      </div>
    </div>
  );
}
