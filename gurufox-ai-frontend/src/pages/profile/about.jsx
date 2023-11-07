import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import doraHug from '../../assets/dora-hug.svg';
import coupleImg from '../../assets/img-1.svg';

import '../../styles/pages/about.css';

export default function About() {
  
  const BackButton = () => {
    return (
      <Link to="/profile" className="back-button">
        <FiChevronLeft className="chevron-left"/>
      </Link>
    );
  };
  return (
   
    <div className="about-container">
         <BackButton/>
      <h2>Why OurDate?</h2>
      <p className="blurb">We believe you are more than a profile and dating should be engaging and meaningful.</p>
      <p className="blurb">We help you meet your potential match through activities you love to build lasting connections.</p>
      <div className="frame">
      <img className="hug" src={doraHug} alt="dora, ceo" />
      <div className="text">
        <p className="value">We value authentic connections over superficial swipes.</p>
         <span>Dora, Founder of OurDate</span>
      </div>
      </div>
      <img className="img-1" src={coupleImg} alt="couple on a date"/>
    </div>
  );
};