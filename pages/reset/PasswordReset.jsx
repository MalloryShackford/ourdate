import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import '../../styles/pages/ResetPassword.css';

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
    <div className="linked-container">
      {!resetRequested && (
        <div>
          <p>
            Enter the email linked to your account and we&apos;ll send you a link to reset your password.
          </p>
        </div>
      )}

      {!resetRequested && (
        <p className="change-email-p">Email</p>
      )}

      {resetRequested ? (
        <p>Check your email for password reset instructions.</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <button type="submit" className="send-button">Send link</button>
          </div>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}

