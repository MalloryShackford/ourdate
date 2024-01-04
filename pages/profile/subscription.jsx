import React, { useEffect, useState } from 'react';
import '../../styles/pages/subscription.css';
import HamburgerMenu from '../../components/header/nav/HamburgerMenu';
import chevronRight from '../../assets/chevron-right.svg';
import edit from '../../assets/edit.svg';
// import API from '../../shared/constants/apis';

export default function Subscription() {
  const [setIsActivated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renewalDate, setRenewalDate] = useState('');
  const [isUnsubscribedModalOpen, setIsUnsubscribedModalOpen] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState('Inactive');
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          console.log('user data:', userData)
          setSubscriptionStatus(userData.is_subscribed ? 'Active' : 'Inactive');
        }
    }
  }, []);

const getSubscription = async () => {
  try {
    const response = await fetch('https://api.gurufox.ai/subscription/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching subscription:', error);
    throw error;
  }
};
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      let data = await getSubscription(); 
      console.log("Fetched subs data:", data);
      setSubscription(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const savedUserData = localStorage.getItem('userData');
  if (savedUserData) {
    const user = JSON.parse(savedUserData);
    setUserData(user);
}
}, []);

const memberSince = subscription && subscription.memberSince ? new Date(subscription.memberSince * 1000).toLocaleDateString() : 'Not available';

  const handleClick = () => {
    window.location.href = "https://billing.stripe.com/p/login/6oE8yTf0E7et0P6288";
  }

  const handleCancelClick = () => {
    setIsModalOpen(true);
  }
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const formattedRenewalDate = subscription && subscription.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString() : 'n/a';
  
  const handleDeactivate = () => {
    window.location.href = "https://billing.stripe.com/p/login/6oE8yTf0E7et0P6288";
    setSubscriptionStatus('Inactive')
    if (selectedOption === 'dontCancel'){
      closeModal();
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeUnsubscribedModal = () => {
    setIsUnsubscribedModalOpen(false);
  };
  const options = [
    { label: "Don't Cancel", value: 'dontCancel' },
    { label: "Didn't like the date plans", value: "DidntLikeTheDatePlans"},
    { label: 'Too expensive', value: 'too expensive' },
    { label: 'Other reason', value: 'other reason' },
  ];

  const Modal = () => {
    return (
      <div className="cancel-modal">
        <h3 className="leaving-h3">Share why you&apos;re leaving</h3>
        {options.map((option) => (
      <div className="cancellation-container" key={option.value}>
        <label className="cancellation-label">
        <input 
          className="cancellation-input"
          type="radio"
          name="cancelOption"
          value={option.value}
          checked={selectedOption === option.value}
          onChange={handleOptionChange}
        />
        {option.label}
        </label>
        <div className="cancel-text-container">
        {option.value === 'other reason' && selectedOption === 'other reason' && (
          <input 
            className="cancellation-text"
            type="text"
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            placeholder="Type here... "
          />
        )}
        </div>
      </div>
    ))}
    <div className="modal-buttons">
      <button className="cancellation-btn" onClick={closeModal}>Nevermind</button>
      {selectedOption && selectedOption !== 'dontCancel' && (
        <button className="cancellation-btn" onClick={handleDeactivate}>Confirm Cancellation</button>
      )}
    </div>
      </div>
    );
  };

  const UnsubscribedModal = () => {
    return (
      <div className="deactivate-modal">
        <button className="close-btn" onClick={closeUnsubscribedModal}>×</button>
        <p>You have successfully unsubscribed.</p>
        <br/>
        <p className="sorry-text">We&apos;re sorry to see you go! If you have a moment, please let us know why you unsubscribed:</p>
        <textarea className="textarea"></textarea>
        <div className="modal-buttons">
          <button onClick={closeUnsubscribedModal} className="submit-btn">Submit</button>
        </div>
      </div>
    );
  };
  const userNameFromGoogle = localStorage.getItem('userName');
  const userNameToDisplay = userNameFromGoogle || userData?.username || 'User';
  const firstLetter = userNameToDisplay && userNameToDisplay.length > 0 ? userNameToDisplay[0].toUpperCase() : '?';


  return (
    <div>
      <HamburgerMenu className="burger-menu"/>
      <div className="letter-container">
          <h2 className="avatar-letter">{firstLetter}</h2>
      <div className="settings-container">
        <h2 className="settings-h2">Subscription</h2>
        <span className="settings-p">Profile {profileCompletion.toFixed(0)}% Complete</span>
      </div>
      </div>
      <div>
  <p className="basic-info-p">Membership Details</p>
  <div className="basic-info-container"></div>
    {subscriptionStatus && (
      <div>
        <div className="membership-container">
          <p className="status-p">Status</p>
          <img className="edit-img" src={edit} alt="edit" width="20"/>
          </div>
        <span className="sub-status">{subscriptionStatus || `Renews on ${formattedRenewalDate}`}</span> 
        <div className="membership-container">
          <p className="status-p">Member since</p>
          <img className="edit-img" src={edit} alt="edit" width="20"/>
        </div>
        {/* <span className="sub-status">00/00/00</span> */}
        <span className="sub-status">{memberSince}</span> 
      </div>
    )}
    <p className="payment-details">Payment Details</p>
    <div className="basic-info-container"></div>
    <div className="payment-details-container">
      <p className="status-p">Payment Details</p>
      <img className="edit-img" src={edit} alt="edit" width="20"/>
    </div>
        <span className="pay-status">Your Mastercard ending in 0000 will be charged $80/month.
          Your next charge is on 00/00/00.</span>
      <div className="basic-info-container"></div>
        <div className="payment-details-container">
          <p className="payment-details-p">Change Payment Method</p>
          <img 
              className="chevron-click" 
              onClick={handleClick} 
              src={chevronRight} 
              alt="chevron-right" 
              width="24"/>
        </div>
        <div className="basic-info-container"></div>
        <div className="payment-details-container">
          <p className="payment-details-p">Billing History</p>
          <img 
              className="chevron-click" 
              onClick={handleClick} 
              src={chevronRight} 
              alt="chevron-right" 
              width="24"/>
        </div>
        <div className="basic-info-container"></div>
        <div className="payment-details-container">
          <p className="payment-details-p">Pause Membership</p>
          <img 
              className="chevron-click" 
              onClick={handleClick} 
              src={chevronRight} 
              alt="chevron-right" 
              width="24"/>
        </div>
        <div className="basic-info-container"></div>
        <div className="payment-details-container">
          <p className="payment-details-p">Cancel Membership</p>
          <img 
              className="chevron-click" 
              onClick={handleCancelClick} 
              src={chevronRight} 
              alt="chevron-right" 
              width="24"/>
        </div>
        <div className="basic-info-container"></div>


      {isModalOpen && <Modal />}
      {isUnsubscribedModalOpen && <UnsubscribedModal />}
    </div>
</div>
  );
}
