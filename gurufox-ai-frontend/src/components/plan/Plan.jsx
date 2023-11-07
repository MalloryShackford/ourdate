import React, { useEffect, useState } from 'react';
import { BsBookmark, BsClock } from 'react-icons/bs';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { SlLocationPin } from 'react-icons/sl';
import PropTypes from 'prop-types';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import { useLocation } from 'react-router-dom';

import './plan.css';

import tenorGif from '../../assets/confused_fox.gif';

const Plan = ({ option, plan }) => {
  const {
    place,
    address,
    cityState,
    description,
    approximatedCost,
    openDateAndTime,
    googlePlacePhotoRef,
    googlePlaceId
  } = plan;

  const maxLength = 175;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoritedItems, setFavoritedItems] = useState([]);
  const [items, setItems] = useState([]);
  const apiKey = import.meta.env.VITE_REACT_GOOGLE_MAPS_API;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedDate = searchParams.get('selected_date');

  useEffect(() => {
    const fetchPlacePhoto = async () => {
      if (googlePlacePhotoRef && apiKey) {
        try {
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?key=${apiKey}&photoreference=${googlePlacePhotoRef}&maxwidth=400&maxheight=300`;
          setPhotoUrl(photoUrl);
        } catch (error) {
          console.error('Error fetching the photo:', error);
          setPhotoUrl('');
        }
      }
    };

    fetchPlacePhoto();
  }, [googlePlacePhotoRef, apiKey]);

  useEffect(() => {
    if (!googlePlaceId) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [googlePlaceId]);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const truncateDescription = (string, maxLength) => {
    return string.length <= maxLength ? string : string.slice(0, maxLength) + '...';
  };

  const handleFavoriteClick = (uuid) => {
    if (favoritedItems.includes(uuid)) {
      setFavoritedItems(favoritedItems.filter((item) => item !== uuid));
      console.log("Is unfavorited:", favoritedItems);
    } else {
      setFavoritedItems([...favoritedItems, uuid]);
    }
  };
  useEffect(() => {
    console.log("Is Favorited:", favoritedItems);
  }, [favoritedItems]);

  //   const handleFavoriteClick = async (id) => {
  //   const currentUser = localStorage.getItem('userId');

  //   if (favoritedItems.includes(id)) {
  //     // Remove favorite
  //     try {
  //       await userService.removeFavorite(currentUser, id);
  //       setFavoritedItems(favoritedItems.filter(item => item !== id));
  //     } catch (error) {
  //       console.error("Failed to remove favorite:", error);
  //     }
  //   } else {
  //     // Add favorite
  //     try {
  //       await userService.addFavorite(currentUser, id);
  //       setFavoritedItems([...favoritedItems, id]);
  //     } catch (error) {
  //       console.error("Failed to add favorite:", error);
  //     }
  //   }
  // };
  return (
    <div className="plan-content">
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="plan-heading">Option {option}</h3>
            <p>GuruFox is on a Vision Quest. This place should exist, but oops, it might not!</p>
            <img src={tenorGif} alt="Gif from Tenor" className="modal-gif" />
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {!isModalOpen && (
        <>
          <h3 className="plan-heading">Option {option}</h3>
          <div className="top-plan-content">
            <h3 className="plan-place">{place}</h3>
            {photoUrl ? (
              <img src={photoUrl} alt="Place Photo" className="plan-image" />
            ) : (
              <p>No photo available</p>
            )}
            <button
              className="favorited"
              onClick={() => handleFavoriteClick(googlePlaceId)}>
              {' '}
              {favoritedItems.includes(googlePlaceId) ? (
                <MdOutlineFavorite className="favorited-icon" />
              ) : (
                <MdOutlineFavoriteBorder className="favorited-icon" />
              )}
            </button>
          </div>
          <div className="middle-plan-content">
            <div className="plan-location">
              <SlLocationPin />
              <p className="plan-address">
                {address.split(',')[0]}, {cityState.split(',')[0]}
              </p>
            </div>
            <div className="plan-time">
              <BsClock />
              <span className="plan-openDataAndTime">
                <p>{openDateAndTime}</p>
              </span>
            </div>
            <span className="plan-approximatedCost">
              <p>{approximatedCost}</p>
            </span>
          </div>
          <div className="bottom-plan-content">
            {showFullDescription ? (
              <p className="plan-description">{description}</p>
            ) : (
              <p className="plan-description">{truncateDescription(description, maxLength)}</p>
            )}

            {description.length > maxLength && (
              <button onClick={toggleDescription} className="show">
                {showFullDescription ? 'Show Less' : 'Show More'}
              </button>
            )}

            <AddToCalendarButton
              name={place}
              options={['Apple', 'Google', 'Outlook.com']}
              location={`${address.split(',')[0]}, ${cityState.split(',')[0]}`}
              startDate={selectedDate}
              timeZone={tz}>
              Add to Calendar
            </AddToCalendarButton>
          </div>
        </>
      )}
    </div>
  );
};

Plan.propTypes = {
  plan: PropTypes.object.isRequired,
  option: PropTypes.number.isRequired
};

export default Plan;