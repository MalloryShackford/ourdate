import React, { useEffect } from 'react';
import './GoogleSignUp.css';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import API from '../../shared/constants/apis';
import axios from 'axios'


axios.defaults.withCredentials = true;

const generateState = () => {
    return Math.random().toString(36).substring(7);
}

const GoogleSignUp = ({ onSuccess }) => {

    const redirectUri = 'https://ourdate.gurufox.ai/accounts/google/login/callback';
    // const redirectUri = 'accounts/google/login/callback/';
    

    useEffect(() => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
            const stateValue = generateState();
            localStorage.setItem('oauthState', stateValue);
            window.google.accounts.id.initialize({
                client_id: '128261348367-1hrj09s6822obkmeaec0o138968loaqo.apps.googleusercontent.com',
                callback: handleCredentialResponse,
                redirect_uri: `${API}/${redirectUri}`,
                access_type: 'offline',
                response_type: 'code',
                prompt: 'consent',
                state: stateValue,
                scope: [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile'
            ].join(' ')
            });

            window.google.accounts.id.renderButton(
                document.getElementById('buttonDiv'),
                { theme: 'outline', size: 'large', text: 'signup' }
            );

            window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    // also display the One Tap dialog
                }
            });
        }
    }, []);
   
    const sendIdTokenToBackend = async (GoogleIdToken) => {
        const apiUrl = '//api.gurufox.ai/auth/o/google-oauth2/o/token/';
        try {
            const response = await axios.post(apiUrl, {
                id_token: GoogleIdToken
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GoogleIdToken}`
                }
            });
            const tokens = response.data;
            console.log(tokens);
            return tokens;
        } catch (error) {
            console.error("Error sending code to backend", error.response.data.non_field_errors);
        }
    };
    
    const handleCredentialResponse = async (response) => {
        const idToken = response.credential;
        console.log("Google One Tap response:", response);
        const decodedToken = jwtDecode(idToken);
        const userName = decodedToken.name;
        localStorage.setItem('userName', userName);
        localStorage.setItem('googleIdToken', idToken);

        const storedState = localStorage.getItem('oauthState');
        localStorage.setItem('state', storedState);
        const authData = await sendIdTokenToBackend(idToken);
        console.log(authData)

        if (authData && authData.access_token) {
            localStorage.setItem('backendToken', authData.backendToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${authData.backendToken}`;
        }

        if (onSuccess) {
            onSuccess(response);
        }

        window.location.href = "/";
    }

    return (
        <div>
            <div id="buttonDiv"></div>
        </div>
    );
}

GoogleSignUp.propTypes = {
    onSuccess: PropTypes.func
};

export default GoogleSignUp;
