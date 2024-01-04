import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './interstitial.css';

import loadingGenerateGif from '../../assets/loading-generate.gif';
import loadingSearchGif from '../../assets/loading-search.gif';
import SEARCHING_TIMEOUT from '../../shared/constants/timeout';

const Interstitial = () => {
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSearching(false);
    }, SEARCHING_TIMEOUT);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isSearching ? (
        <div className="interstitial">
          <h2>Searching...</h2>
          <img src={loadingSearchGif} alt="Searching" />
        </div>
      ) : (
        <div className="interstitial">
          <h2>Generating...</h2>
          <img src={loadingGenerateGif} alt="Generating" />
        </div>
      )}
    </>
  );
};

Interstitial.propTypes = {
  type: PropTypes.string
};

export default Interstitial;
