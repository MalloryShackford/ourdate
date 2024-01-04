import React from 'react';
import { useEffect } from 'react';
import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react';
import ChildcareFeatures from './ChildcareFeatures';
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
      <ChildcareFeatures isLoggedIn={props.isLoggedIn} />
    </GrowthBookProvider>
  );
}

MyApp.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};