import React, { useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';

const App = ({ onSuccess }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
        client_id: '128261348367-1hrj09s6822obkmeaec0o138968loaqo.apps.googleusercontent.com',
        callback: handleCredentialResponse,
        auto_select: true,
        access_type: 'offline',
        prompt: 'consent',
      });
        window.google.accounts.id.prompt();
        window.google.accounts.id.renderButton(
                document.getElementById('buttonDiv'),
                { theme: 'outline', size: 'large' }
        );

        window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    // also display the One Tap dialog
                }
            });
        }
    }, []);
    

    const handleCredentialResponse = async (response) => {
      const idToken = response.credential;
      const decodedToken = jwtDecode(idToken);
      const userName = decodedToken.name;
      localStorage.setItem('userName', userName);

      const apiUrl = 'https://api.gurufox.ai' || 'http://localhost:8000';
      
      try {
          const result = await axios.post(`${apiUrl}/google_auth/`, {
              id_token: idToken
          });
  
          const accessToken = result.data.access_token;
          const refreshToken = result.data.refresh_token;
          const user = result.data.user;
  
          if (accessToken) {
              localStorage.setItem('access_token', accessToken);
              localStorage.setItem('refresh_token', refreshToken);
              localStorage.setItem('userData', JSON.stringify(user));
              axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
              axios.defaults.headers.common['Content-Type'] = 'application/json';
          } else {
              throw new Error("No access token received from backend.");
          }
  
      } catch (error) {
          console.error("Error during authentication:", error);
      }
      if (onSuccess) {
        onSuccess(response);
    }
    window.location.href = "/";
  };

  return <div id="buttonDiv"></div>
}
App.propTypes = {
    onSuccess: PropTypes.func,
}

export default App;