import { GrowthBook } from '@growthbook/growthbook-react';
import React, { useEffect } from 'react';
import { GrowthBookProvider } from '@growthbook/growthbook-react';
import NavBarFeatures from './nav/navbar_features';
import PropTypes from 'prop-types';

const growthbook = new GrowthBook({
  apiHost: import.meta.env.VITE_REACT_APP_API_HOST,
  clientKey: import.meta.env.VITE_REACT_APP_CLIENT_KEY,
  enableDevMode: Number(import.meta.env.VITE_REACT_APP_ENABLE_DEVMODE),
  trackingCallback: (experiment, result) => {
    // TODO: Use your real analytics tracking system
    console.log('Viewed Experiment', {
      experimentId: experiment.key,
      variationId: result.key
    });
  }
});

export default function MyApp(props) {
  useEffect(() => {
    growthbook.loadFeatures();
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <NavBarFeatures isLoggedIn={props.isLoggedIn} />
    </GrowthBookProvider>
  );
}
MyApp.propTypes ={
  isLoggedIn: PropTypes.bool.isRequired,
};
