import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../shared/constants/apis';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
  const [userDetails, setUserDetails] = useState({});
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [authTokens, setAuthTokens] = useState(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      return { refresh: refreshToken };
    }
    return null;
  });

  const updateToken = async () => {
    try {
      const response = await axios.post(
        API.REFRESH,
        JSON.stringify({ refresh: authTokens?.refresh }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const data = response.data;

      if (response.status === 200) {
        setAuthTokens((prevTokens) => ({
          ...prevTokens,
          access: data.access
        }));

        localStorage.setItem('authTokens', JSON.stringify(data));
      } else {
        setIsLoggedIn(false);
        setAuthTokens(null);
        setUserDetails({});
      }
    } catch (error) {
      setIsLoggedIn(false);
      setAuthTokens(null);
      setUserDetails({});
    }
  };

  const signupUser = async (values) => {
    try {
      const response = await axios.post(API.REGISTER, values);
      localStorage.setItem('refreshToken', response.data.refresh);
      setAuthTokens({
        access: response.data.access,
        refresh: response.data.refresh
      });
      return true;
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        throw new Error('Account with this email address already exists');
      }
      throw new Error('An error occurred while signing up');
    }
  };

  const loginUser = async (values) => {
    try {
      const response = await axios.post(API.LOGIN, values);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      setAuthTokens({
        access: response.data.access,
        refresh: response.data.refresh
      });
      const { id, username, email } = response.data.user; // TODO: include profile once we get it setup
      const simplifiedUser = { id, username, email };
      setUserDetails({ id, username, email });
      localStorage.setItem('user', JSON.stringify(simplifiedUser));
      return true;
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        throw new Error('Your email or password does not match');
      }
      throw new Error('An error occurred while logging in');
    }
  };

  const logoutUser = async () => {
    setIsLoggedIn(false);
    setUserDetails({});
    setAuthTokens(null);
    localStorage.clear();
  };

  const resetPassword = async (email) => {
    try {
      await axios.post(API.PASSWORD_RESET, { email });
      return true;
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        throw new Error('Email not found');
      }
      throw new Error('An error occurred while resetting password');
    }
  };

  const resetPasswordConfirm = async (uid, token, new_password, newPasswordConfirm) => {
    try {
      await axios.post(
        API.PASSWORD_RESET_CONFIRM_URL,
        { uid, token, new_password, newPasswordConfirm },
        { headers: { 'Content-Type': 'application/json' } }
      );
      return true;
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        throw new Error('Email not found');
      }
      throw new Error('An error occurred while resetting password');
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(
        API.PASSWORD_RESET_CONFIRM_URL,
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${storedRefreshToken}` },
        }
      );

      if (response.data.success) {
        // if password change was successful, refresh the token as an added security measure
        await updateToken();

        return true;
      } else {
        throw new Error('An error occurred while changing password');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        throw new Error('Unauthorized: Current password is incorrect');
      }
      throw new Error('An error occurred while changing password');
    }
  };

  useEffect(() => {
    const REFRESH_INTERVAL = 1000 * 60 * 2; // 2 minutes
    const interval = setInterval(() => {
      if (localStorage.getItem('refreshToken')) {
        updateToken();
      }
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    userDetails,
    setUserDetails,
    authTokens,
    setAuthTokens,
    updateToken,
    loginUser,
    logoutUser,
    signupUser,
    isSignedUp,
    setIsSignedUp,
    resetPassword,
    resetPasswordConfirm,
    changePassword,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};