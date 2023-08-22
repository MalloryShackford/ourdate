import React, { useEffect } from 'react';
import './GoogleSignUp.css'

const googleSignUp = () => {

   useEffect(() => {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.initialize({
      client_id: '128261348367-1hrj09s6822obkmeaec0o138968loaqo.apps.googleusercontent.com',
      callback: handleCredentialResponse,
      redirect_uri: 'https://ourdate.gurufox.ai/accounts/google/login/callback',
    });
    window.google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large', text: 'signup' } // customization attributes
    );
    window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) { // also display the One Tap dialog
  }
});
}
}, []);

const handleCredentialResponse = (response) => {
         console.log("Encoded JWT ID token: " + response.credential);
        }

  return (
    <div>
        <div id="buttonDiv"></div>
        {/* <div className="g-signin2" data-onsuccess="onSignUp"></div> */}


    </div>
  )
}

export default googleSignUp
