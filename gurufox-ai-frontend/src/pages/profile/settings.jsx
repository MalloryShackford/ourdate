import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';
import '../../styles/pages/settings.css';
import { FiChevronLeft } from 'react-icons/fi';
import { getCurrentUser } from '../../shared/utils/user';

const BackButton = () => {
  return (
    <Link to="/profile" className="back-button">
      <FiChevronLeft className="chevron-left" />
    </Link>
  );
};

const Settings = () => {
  const [userData, setUserData] = useState({
    email: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState(userData.email);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.email) {
      setUserData(user);
      setNewEmail('');
    }
  }, []);

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    // Password matching validation
    if (newPassword !== confirmPassword) {
      setError('The password you entered does not match.');
      return;
    }

    console.log('Updated Email:', newEmail);
    console.log('New Password:', newPassword);
    console.log('Confirmed Password:', confirmPassword);

    setUserData((prevUserData) => ({
      ...prevUserData,
      email: newEmail
    }));

    if (newPassword) {
      setSuccessMessage('Your password has been changed successfully.');
    }

    setIsEditing(false);
  };
  const inputStyle = {
    borderRadius: theme.layout.inputBorderRadius,
    fontFamily: theme.fonts.fontFamily
  };
  const buttonStyle = {
    borderRadius: theme.layout.inputBorderRadius,
    background: theme.colors.blue0,
    fontFamily: theme.fonts.fontFamily
  };
  const hrStyle = {
    background: theme.colors.blue0
  };

  return (
    <div className="user-profile">
      <BackButton />
      <h2>Account Settings</h2>
      <p className="change-email">Change Email</p>
      <div>
        <p>Current Email: {userData.email}</p>
        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            placeholder="Enter new email"
            type="email"
            name="email"
            value={newEmail}
            onChange={handleEmailChange}
          />
          <button
            style={buttonStyle}
            className="button"
            onClick={() => setIsEditing(true)}
            type="submit">
            Change Email
          </button>
        </form>
      </div>
      <hr style={hrStyle} />
      <p className="change-password">Change Password</p>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Enter new password</p>
          <input
            style={inputStyle}
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <p className="confirm-password">Confirm new password</p>
          <input
            style={inputStyle}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button style={buttonStyle} className="button" type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Settings;
