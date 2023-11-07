import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api'
import './App.css';
import { AuthProvider } from './context/authContext';
// import './config/axiosConfig';

import ToggleDarkModeButton from './components/buttons/ToggleDarkModeButton';
import Nav from './components/header/nav/nav.jsx';
import GlobalStyle from './styles/GlobalStyle.jsx';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // The following will set the google api places script head tag with the places library and API key
  /*
    Generating a Google API key will need to be done from the Cloud Dashboard panel
    The Javascript Maps API, Geocoding, and Places API will all need to be activated
  */
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_GOOGLE_PLACES_API,
    libraries: ['places']
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="App">
      <AuthProvider>
        <Nav />
        <Outlet />
        <GlobalStyle isDarkMode={isDarkMode} />
        <ToggleDarkModeButton isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
      </AuthProvider>
      {/* <button className="toggle-btn" onClick={toggleDarkMode}>Toggle</button> */}
    </div>
  );
}

export default App;