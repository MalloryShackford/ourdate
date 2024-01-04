import React, { useEffect, useState } from 'react';
import '../../styles/pages/settings.css';
import PasswordReset from '../reset/PasswordReset';
import HamburgerMenu from '../../components/header/nav/HamburgerMenu';
import edit from '../../assets/edit-pencil.svg'

const Settings = () => {
  const [userData, setUserData] = useState({
    email: ''
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(userData.email);
  const [username, setUsername] = useState(userData.username);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const user = JSON.parse(savedUserData);
      setUserData(user);
      setNewEmail(user.email || '');
      setUsername(user.username || '');
  }
    const savedProgress = parseFloat(localStorage.getItem('profileProgress')) || 0;
    setProfileCompletion(savedProgress);
  }, []);

  const handleSaveName = () => {
    setUserData({ ...userData, username });
    localStorage.setItem('userData', JSON.stringify({ ...userData, username }));
    setIsEditingName(false);
  };

  const handleCancelName = () => {
    setUsername(userData.username || '');
    setIsEditingName(false);
  };

  const handleSaveEmail = () => {
    setUserData({ ...userData, email: newEmail });
    localStorage.setItem('userData', JSON.stringify({ ...userData, email: newEmail }));
    setIsEditingEmail(false);
  };

  const handleCancelEmail = () => {
    setNewEmail(userData.email || '');
    setIsEditingEmail(false);
  };
  const handleEditClick = () => {
    setShowPasswordReset(!showPasswordReset);
  }
  const userNameFromGoogle = localStorage.getItem('userName');
  const userNameToDisplay = userNameFromGoogle || userData?.username || 'User';
  const firstLetter = userNameToDisplay && userNameToDisplay.length > 0 ? userNameToDisplay[0].toUpperCase() : '?';


  return (
    <div>
      <HamburgerMenu className="burger-menu"/>
      <div className="letter-container">
          <h2 className="avatar-letter">{firstLetter}</h2>
      <div className="settings-container">
        <h2 className="settings-h2">Settings</h2>
        <span className="settings-p">Profile {profileCompletion.toFixed(0)}% Complete</span>
      </div>
      </div>
      <div>
      <p className="basic-info-p">Basic Information</p>
      <div className="basic-info-container"></div>
        <h3 className="name-h3">Name</h3>
        {isEditingName ? (
          <input
            className="change-name-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        ) : (
          <p className="name-p">{userData.username || 'User'}
            <img src={edit} alt="edit" onClick={() => setIsEditingName(true)}/>
          </p>
          )}
          {isEditingName && (
          <div className="editing-btn-container">
            <button className="save-bttn" onClick={handleSaveName}>Save</button>
            <button className="cancel-bttn" onClick={handleCancelName}>Cancel</button>
          </div>
        )}
        <h3 className="email-h3">Email</h3>
        {isEditingEmail ? (
        <>
          <input
            className="change-email-input"
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <div className="editing-btn-container">
            <button className="save-bttn" onClick={handleSaveEmail}>Save</button>
            <button className="cancel-bttn" onClick={handleCancelEmail}>Cancel</button>
          </div>
        </>
      ) : (
        <p className="email-p">{userData.email || 'email@gmail.com'}
          <img src={edit} alt="edit" onClick={() => setIsEditingEmail(true)}/>
        </p>
      )}
      
      <div className="security-container">
        <p className="basic-info">Login & Security</p>
        <div className="basic-info-container"></div>
          <div className="password-container">
            <h3 className="password-h3">Password</h3>
            <div className="reset-container">
              <img 
                className="edit-img" 
                src={edit} 
                alt="edit" 
                onClick={handleEditClick}
              />
            </div>
          </div>
          {showPasswordReset && <PasswordReset/>}
        </div>
      </div>
    </div>
  );
};

export default Settings;
