import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';
import '../../styles/pages/subscription.css';

export default function Subscription() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnsubscribedModalOpen, setIsUnsubscribedModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCardSelection = (cardNumber) => {
    setSelectedCard(cardNumber);
    setIsDropdownOpen(false);
    console.log('Selected card:', cardNumber);
  };

  const handleActivate = () => {
    setIsActivated(true);
  };

  const handleDeactivate = () => {
    setIsActivated(false);
    closeModal();
  };

  const handleUnsubscribeConfirmation = () => {
    setIsModalOpen(false);
    setIsUnsubscribedModalOpen(true);
    setIsActivated(false);  // Deactivate the subscription
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeUnsubscribedModal = () => {
    setIsUnsubscribedModalOpen(false);
  };

  const BackButton = () => {
    return (
      <Link to="/profile" className="back-button">
        <FiChevronLeft className="chevron-left" />
      </Link>
    );
  };

  const buttonStyle = {
    borderRadius: theme.layout.inputBorderRadius,
    background: theme.colors.blue0,
    fontFamily: theme.fonts.fontFamily,
    width: '100%',
    borderColor: theme.colors.blue0,
  };
  const dropdownStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.layout.inputBorderRadius,
    fontFamily: theme.fonts.fontFamily,
    width: '100%',
  };
  const newcardStyle = {
    borderRadius: theme.layout.inputBorderRadius,
    fontFamily: theme.fonts.fontFamily,
    width: '100%',
  };
  const hrStyle = {
    background: theme.colors.blue0,
  };
  const hrStyle2 = {
    background: theme.colors.grey2,
  };
  
  const Modal = () => {
    return (
      <div className="modal">
        <p>Are you sure you want to deactivate your plan?</p>
        <div className="modal-buttons">
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleUnsubscribeConfirmation}>Deactivate</button>
        </div>
      </div>
    );
  };

  const UnsubscribedModal = () => {
    return (
      <div className="deactivate-modal">
        <button className="close-btn" onClick={closeUnsubscribedModal}>×</button>
        <p>You have successfully unsubscribed.</p>
        <p>Your premium benefits will end on <strong>August 20, 2023</strong>.</p>
        <br/>
        <p className="sorry-text">We&apos;re sorry to see you go! If you have a moment, please let us know why you unsubscribed:</p>
        <textarea className="textarea"></textarea>
        <div className="modal-buttons">
          <button onClick={closeUnsubscribedModal} style={buttonStyle} className="submit-btn">Submit</button>
        </div>
      </div>
    );
  };

  return (
    <div className="sub-container">
      <BackButton />
      <h2>Subscription</h2>
      <p className="current-plan">
        Your plan is currently <strong>{isActivated ? 'active' : 'inactive'}</strong> {isActivated ? 'and will renew on September 2, 2022' : ''}.
      </p>
      {isActivated ? (
  <button onClick={openModal} style={buttonStyle} className="deactivate">
    Deactivate
  </button>
) : (
  <button onClick={handleActivate} style={buttonStyle}>
    Activate
  </button>
)}

      <p className="payment-method">Payment Methods</p>

      <div className="credit-card-dropdown">
        <button style={dropdownStyle} className="dropdown-toggle" onClick={toggleDropdown}>
          Visa ending in 8629 <FiChevronRight />
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <li onClick={() => handleCardSelection('**** **** **** 1234')}>Card 1 - **** **** **** 1234</li>
            <li onClick={() => handleCardSelection('**** **** **** 5678')}>Card 2 - **** **** **** 5678</li>
          </ul>
        )}
        <button className="add-new" style={newcardStyle}>Add a new card + </button>
      </div>
      <hr className="hr" style={hrStyle} />
      <hr style={hrStyle2} />
      <p className="follow">Follow Us</p>
      <div className="social-icons2">
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaFacebook /></a>
        <a href="#"><FaLinkedin /></a>
      </div>
      <footer>
        <ul className="footer-li">
          <li>About</li>
          <li>Partnership</li>
          <li>Help</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
        <p className="copyright">&copy; 2023 OurDate</p>
        <p className="email">date@ourdate.co</p>
      </footer>
      {isModalOpen && <Modal />}
      {isUnsubscribedModalOpen && <UnsubscribedModal />}
    </div>
  );
}
