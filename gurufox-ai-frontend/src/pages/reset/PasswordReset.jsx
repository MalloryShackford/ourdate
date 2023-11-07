import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import classes from '../../styles/pages/Login.module.css';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [resetRequested, setResetRequested] = useState(false);
  const [error, setError] = useState(null);
  const auth = useAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await auth.resetPassword(email);
      setResetRequested(true);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={classes.loginField}>
      {!resetRequested && (
        <div>
          <h1 className={classes.loginName}>Forgot password?</h1>
          <p className={classes.signupSubtitle}>
            No worries! Enter the email linked to your account and we’ll send you a link to reset your password.
          </p>
        </div>
      )}

      {!resetRequested && (
        <p className={classes.label}>Email</p>
      )}

      {resetRequested ? (
        <p className={classes.signupSubtitle}>Check your email for password reset instructions.</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={classes.buttonDiv}>
            <button type="submit" className={classes.button}>Send link</button>
          </div>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}

