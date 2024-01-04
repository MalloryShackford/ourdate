import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './plan.css';
import DatePlanService from '../../shared/services/dateplan.service';
import Attire from '../../assets/plan/attire.svg'
import Clock from '../../assets/plan/clock.svg'
import Fee from '../../assets/plan/fee.svg'
import LocationPin from '../../assets/plan/locationPin.svg'
import Parking from '../../assets/plan/parking.svg'
import Tips from '../../assets/plan/tips.svg'
import DownNav from '../../assets/plan/chevronDown.svg'
import UpNav from '../../assets/plan/chevronUp.svg'
import UpArrow from '../../assets/plan/upArrow.svg'
import DownArrow from '../../assets/plan/downArrow.svg'


const Plan = ({ option, plan }) => {
 
  const [photoUrl, setPhotoUrl] = useState('');
  const [mostRecentPlan, setMostRecentPlan] = useState([]);
  const [showFullPage, setShowFullPage] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [isUpArrow, setIsUpArrow] = useState(true);
  const apiKey = import.meta.env.VITE_REACT_GOOGLE_MAPS_API;
  // const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const {
    place,
    address,
    cityState,
    dateOf,
    description,
    approximatedCost,
    openDateAndTime,
    googlePlacePhotoRef,
    // googlePlaceId,
    datePlanStart,
    datePlanEnd,
    website, 
    parkingOptions,
    bookingLink,
    reservation,
    attire,
  } = plan;

  function removeTimezoneAbbreviation(dateTimeString) {
    if (!dateTimeString) return "";
    return dateTimeString.split(' ').slice(0, -1).join(' ');
  }

  useEffect(() => {
    const fetchData = async () => {
     try {
       const userPlans = await DatePlanService.getDatePlans();
      if (userPlans) {
        const filteredPlans = userPlans.filter(plan => plan.status === "VE");
        setMostRecentPlan(filteredPlans);
      } else {
        console.log("No user plans available");
      }
    } catch (error) {
      console.error('Error fetching user plans:', error);
    }
  };
  
  fetchData();
}, []);

  useEffect(() => {
    const fetchPlacePhoto = async () => {
      if (googlePlacePhotoRef && apiKey) {
        try {
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?key=${apiKey}&photoreference=${googlePlacePhotoRef}&maxwidth=400&maxheight=300`;
          setPhotoUrl(photoUrl);
        } catch (error) {
          console.error('Error fetching the photo:', error);
          setPhotoUrl('');
        }
      }
    };
    fetchPlacePhoto();
  }, [googlePlacePhotoRef, apiKey]);

  const formatDate = (dateString) => {
    if (!dateString) return null;
  
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); 
  
    if (isNaN(date.getTime())) return null;
  
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return formattedDate.toUpperCase();
  };
  
  const toggleView = () => {
    setShowFullPage(prevShowFullPage => !prevShowFullPage);
  };
  const toggleArrow = () => {
    setIsUpArrow(!isUpArrow);
    setShowActivity(prevShowActivity => !prevShowActivity);
  };
  const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  
  const renderMostRecentPlan = () => {
    if (mostRecentPlan.length > 0) {
      const item = mostRecentPlan[0];
      return (
        <li key={item.uuid} className="list-icons">
          <div className="dateplan-date-container">
            <div className="start-time-container">
              <h2 className="time-h2">
                {formatDate(plan.dateOf)}
              </h2>
            </div>
            <div className="recent-plan-container">
              <h2>
                Date in {plan.cityState}
              </h2>
            </div>
          </div>
        </li>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="center-img-container">
      { showFullPage ? (
      <img 
          className="down-nav" 
          src={DownNav} 
          alt="down-navigation" 
          onClick={toggleView} 
      />
      ) : (
      <img 
          src={UpNav}
          alt="up-navigation"
          onClick={toggleView}
        />
      )}
      </div>
      <ul>
        {renderMostRecentPlan()}
      </ul>
{showFullPage ? (
  <>
    <div className="final-dateplan-container">
      <div className="dateplan-container">
        <h3 className="plan-heading">Option {option}</h3>
        <p className="timeframe">Time frame: {removeTimezoneAbbreviation(datePlanStart)} - {removeTimezoneAbbreviation(datePlanEnd)}</p>
        <p className="total-cost-p">Total Cost: {approximatedCost}</p>
      <div className="plan-content">
      <div className="top-plan-container">
        <span className="activity-span">ACTIVITY {option}</span>
        <h3 className="plan-place">{place}
        {showActivity ? (
        <img src={UpArrow} alt="up-arrow" onClick={toggleArrow} />
      ) : (
        <img src={DownArrow} alt="down-arrow" onClick={toggleArrow} />
      )}
      </h3>
    </div>
    {showActivity && (
      <>   
      <div className="top-plan-content">  
          <img src={photoUrl} alt="Place Photo" className="plan-image" />
          <p className="plan-description">{description}</p>
      </div>
        <div className="middle-plan-content">
            <div className="flex-container">
              <div className="image-container">
                <img src={LocationPin} alt="location-pin"/>
              </div>
              <div className="plan-location">
                <p className="plan-color">Address</p>
                <p>
                <a 
                  className="address-link"
                  href={googleMapsURL} 
                  target="_blank" 
                  rel="noopener noreferrer">
                  {address.split(',')[0]}, {cityState.split(',')[0]}
                  </a>
                </p>
            </div>
            </div>
            <div className="flex-container">
              <div className="image-container">
                <img src={Clock} alt="clock"/>
              </div>
              <div className="plan-time">
                <p className="plan-color">Hours of Operation</p>
                <p className="plan-openDataAndTime">
                  {openDateAndTime}
                </p>
            </div>
            </div>
            <div className="flex-container">
              <div className="image-container">
                <img src={Fee} alt="fee" width="32" height="32"/> 
              </div>
              <div className="fee-cost-container">
                <p className="plan-color">Fee/Cost</p>
                <p className="plan-approximatedCost">
                {approximatedCost}
              </p>
              </div>
            </div>
            <div className="flex-container">
              <div className="image-container">
                <img src={Parking} alt="parking"/>
              </div>
              <div className="parking-container">
                <p className="plan-color">Parking</p>
                <p>{parkingOptions}</p>
              </div>
            </div>
            <div className="flex-container">
              <div className="image-container">
                <img src={Tips} alt="tips"/>
              </div>
              <div className="tips-container">
                <p className="plan-color">Reservation</p>
                <p>
                  {reservation == 'True'
                    ? <a className="reservation-link" href={bookingLink}>Book Now</a>
                    : 'No reservation needed'
                   }
                </p>
              </div>
            </div>
            <div className="flex-container">
              <div className="image-container">
                <img src={Attire} alt="attire"/>
              </div>
              <div className="attire-container">
                <p className="plan-color">Attire Guidance</p>
                <p>{attire}</p>
              </div>
            </div>
            <div className="advice-container">
              <p className="advice-p">Relationship tips or activities</p>
              <p>Ask each other questions about your childhood, 
                your dreams for the future, and your deepest desires.
              </p>
            </div>
          </div>
          <div className="website-container">
              <p className="website-p">
                <a className="website" href={website} target="_blank" rel="noopener noreferrer">
                  {place} Website
                </a>
              </p>
          </div>
        </>
       )}
    </div>
  </div>
</div>
    </>
      ) : (
        <div className="final-dateplan-container">
          <div className="dateplan-container">
            <h3 className="plan-heading" style={{textDecoration: 'underline'}}>Option {option}</h3>
            <div>
            <div className="shortened-container">
              <p className="shortened-p">Activity {option} - {place}</p>
            </div> 
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Plan.propTypes = {
  plan: PropTypes.object.isRequired,
  option: PropTypes.number.isRequired
};

export default Plan;