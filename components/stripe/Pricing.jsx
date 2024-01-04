import React, { useState } from 'react';
import ourdateLogo from '../../assets/ourdate-logo.svg';
import stars from '../../assets/stars.svg';
import middot from '../../assets/middot.svg';
import chevronLeft from '../../assets/chevron-left.svg';
import checkmark from '../../assets/ft-checkmark.svg';
import { useNavigate } from 'react-router-dom'
import './Pricing.css';

const Pricing = () => {
  // const [selectedOption, setSelectedOption] = useState('');
  // const [subAmount, setSubAmount] = useState(0);
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setSelectedOption(value);

  //   switch (value) {
  //     case 'annual':
  //       setSubAmount(99);
  //       break;
  //     case 'monthly':
  //       setSubAmount(80);
  //       break;
  //     default:
  //       setSubAmount(0); 
  //   }
  // }
  // const getPaymentUrl = () => {
  //   if (selectedOption === 'monthly') {
  //     return "https://buy.stripe.com/28oeWNgZg8Wo3BK288";
  //   } else if (selectedOption === 'single') {
  //     return "https://buy.stripe.com/3csg0R5gy3C44FO6or";
  //   }
  // };

  return (
    <>
    <div>
      <img 
          className="chevron-img-left" 
          src={chevronLeft} 
          alt="chevron-left" 
          onClick={() => navigate('/free-trial')}
      />
    </div>
    <div className="pricing-container">
      <img src={ourdateLogo} alt="ourdate-logo" height="22px"/>
      <div className="star-container">
        <img src={stars} alt="stars" height="32px"/>
        <h4>Free 1 month trial</h4>
      </div>
      <div className="trial-payment-wrapper">
        <div className="trial-payment-container">
          <p className="renews-p">4 date plans included, renews monthly</p>
        <div className="ft-details-container">
          <span><img className="check-img" src={checkmark} alt="checkmark"/>Up to 4 personalized date plans</span>
          <span><img className="check-img" src={checkmark} alt="checkmark"/>Includes an itinerary for each date plan</span>
          <span><img className="check-img" src={checkmark} alt="checkmark"/>Relationship tips</span>
        </div>
        <div className="ft-btn-container">
          <a 
            href="https://buy.stripe.com/3csg0R5gy3C44FO6or" 
            rel="noopener noreferrer">    
          <button className="ft-btn" type="submit">Start free trial</button></a>
        </div>
        </div>
        </div>
      </div>
      <div className="ft-terms-container">
        <p>After your free trial, you&apos;ll be charged $80.00 every month. By starting a trial, you 
           agree to this recurring charge. You can cancel your trial or membership at any time.</p>
          <div className="spans-container">
            <span style={{textDecoration: 'underline'}}>Terms of use</span>
            <span className="middot"><img src={middot} alt="middot" className="middot"/></span>
            <span style={{textDecoration: 'underline'}}>Privacy policy</span>
          </div>
      </div>
    </>
  );
};

export default Pricing;

