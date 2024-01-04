import React, { useEffect } from 'react';
import axios from 'axios';
import API from '../../shared/constants/apis';
import './SubscriptionSuccess.css';
import chevronRight from '../../assets/chevron-right.svg'
import checkmark from '../../assets/green-checkmark2.svg'
import stars from '../../assets/stars.svg'
import { useNavigate } from 'react-router-dom';

const SubscriptionSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const saveSubscription = async () => {
      const searchParams = new URLSearchParams(location.search);
      const session_id = searchParams.get('session_id');
      if (session_id) {
        const response = await axios.get(`${API.SAVE_SUBS}?session_id=${session_id}`);

        if (response.status === 200) {
          console.log('Subscription saved successfully.');
        } else {
          console.error('Subscription not saved.');
        }
      } else {
        console.error('Session ID is missing.');
      }
    };
    saveSubscription();
  }, []);

  return (
    <>
      <section>
        <div>
          <div className="congrats-container">
            <img src={stars} className="success-stars" alt="stars" width="48"/>
            <img src={checkmark} alt="checkmark" width="75"/>
            <h3 className="congrats-h3">Congratulations! Your payment has been confirmed!</h3>
            <div className="success-btn-container">
            <button 
                className="continue-button" 
                onClick={() => navigate('/')}>
                  Continue 
              <img className="success-chevron" src={chevronRight} alt="chevron-right" width="16"/>
            </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SubscriptionSuccess;