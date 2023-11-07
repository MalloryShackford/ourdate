import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import classes from '../../styles/pages/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function PasswordResetConfirm() {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const auth = useAuth();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const uid = urlParams.get('uid');
  const token = urlParams.get('token');

  useEffect(() => {
    if (!uid || !token) {
      return;
    }
  }, [uid, token]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      await auth.resetPasswordConfirm(uid, token, newPassword, newPasswordConfirm);
      setSuccess(true);
      setError(null);
      setNewPassword('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={classes.loginField}>
      <h1 className={classes.loginName}>Reset password</h1>

      {!success && (
        <p className={classes.signupSubtitle}>Create a new password to access your account. Your new password must be different from previously used passwords.</p>
      )}

      {success ? (
        <p>Password changed successfully.</p>
      ) : (
        <form onSubmit={handleChangePassword}>
          <p className={classes.label}>New password*</p>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={classes.input}
          />
          <span className={classes.eye} onClick={togglePassword}>
            <FontAwesomeIcon icon={faEye} />
          </span>

          <p className={classes.label}>Confirm password*</p>
          <input
            id="confirmation"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="password"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            className={classes.input}
          />
          <span className={classes.eye} onClick={toggleConfirmPassword}>
            <FontAwesomeIcon icon={faEye} />
          </span>

          <input name="uid" value={uid} type="hidden" />
          <input name="token" value={token} type="hidden" />
          <div className={classes.buttonDiv}>
            <button type="submit" className={classes.button}>Reset password</button>
          </div>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}
