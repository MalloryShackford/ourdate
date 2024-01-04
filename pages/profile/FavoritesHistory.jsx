import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineCalendar } from 'react-icons/ai';
import { FiChevronLeft, FiShare } from 'react-icons/fi';
import { BsClock } from 'react-icons/bs';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { SlLocationPin } from 'react-icons/sl';
import { Link, useLocation } from 'react-router-dom';
import dateplanService from '../../shared/services/dateplan.service';
import copy from 'copy-to-clipboard';
import Modal from 'react-modal';

import '../../styles/pages/FavoritesHistory.css';
import magGlass from '../../assets/mag-glass.svg';
import theme from '../../styles/theme';
import { getCurrentUser } from '../../shared/utils/user';
import { getHistoryTitle, truncate } from '../../shared/utils/dateplan';

export default function FavoritesHistory() {
  const location = useLocation();
  const { state } = location;
  const [currentTab, setCurrentTab] = useState(state ? state.tab : 'favorites');

  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);

  // const [dateFilter, setDateFilter] = useState('all');
  const [favoritedItems, setFavoritedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [closedPlans, setClosedPlans] = useState([]);

  useEffect(() => {
    const user = getCurrentUser();
    const fetchData = async () => {
      if (user) {
        const fetchedFavorites = await dateplanService.getDatePlans();
        setFavorites(fetchedFavorites);

        const datePlanInfos = await dateplanService.getDatePlanInfos();
        const datePlanInfoPromises = datePlanInfos.map(async (datePlanInfo) => {
          const datePlans = await dateplanService.getDatePlansById(datePlanInfo.uuid);
          if (datePlans.results.every((datePlan) => datePlan.plan !== null)) {
            const historyItem = {
              datePlanInfo: datePlanInfo,
              datePlans: datePlans.results
            };
            // console.log('historyItem', historyItem);
            return historyItem;
          }
        });
        const historyItems = (await Promise.all(datePlanInfoPromises)).filter(Boolean); // Remove null items
        setHistory(historyItems);
      }
    };
    fetchData();
  }, []);

  const BackButton = () => {
    return (
      <Link to="/profile" className="back-button">
        <FiChevronLeft className="chevron-left" />
      </Link>
    );
  };

  useEffect(() => {
    if (keyword) {
      const keywordLower = keyword.toLowerCase();

      setFilteredFavorites(
        filteredFavorites.filter(
          (plan) =>
            plan.plan &&
            Object.values(plan.plan).some((val) => String(val).toLowerCase().includes(keywordLower))
        )
      );
      setFilteredHistory(
        history.filter((plan) =>
          Object.values(plan).some((val) => String(val).toLowerCase().includes(keywordLower))
        )
        // .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    } else {
      setFilteredFavorites(favorites);
      setFilteredHistory(history);
    }
  }, [keyword, favorites, history]);

  const sharePlan = (item) => {
    const planText = `Check out this plan at ${item.place} in ${item.cityState}!`;
    copy(planText);
    console.log('Plan copied to clipboard');

    setIsModalVisible(true);

    setTimeout(() => {
      setIsModalVisible(false);
    }, 3000);
  };

  const shareHistoryPlan = (item) => {
    const planText = `Check out this plan in ${item}!`;
    copy(planText);
    console.log('Plan copied to clipboard');

    setIsModalVisible(true);

    setTimeout(() => {
      setIsModalVisible(false);
    }, 3000);
  };

  const handleFavoriteClick = (id) => {
    if (favoritedItems.includes(id)) {
      // setIsFavorited(!isFavorited);
      setFavoritedItems(favoritedItems.filter((item) => item !== id));
    } else {
      setFavoritedItems([...favoritedItems, id]);
    }
  };
  const handleCloseClick = (id) => {
    console.log('handleCloseClick', id);
    if (!closedPlans.includes(id)) {
      setClosedPlans([...closedPlans, id]);
      console.log('After:', closedPlans);
    }
  };

  const inputStyle = {
    borderRadius: theme.layout.inputBorderRadius,
    fontFamily: theme.fonts.fontFamily,
    background: theme.colors.blue5,
    '::placeholder': {
      color: theme.colors.grey
    }
  };
  const modalStyles = {
    content: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      right: 'auto',
      top: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '100px',
      height: '50px',
      fontSize: '.8rem',
      textAlign: 'center',
      borderRadius: '10px',
      padding: '10px',
      background: '#f0f0f0',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
    },
    overlay: {
      backgroundColor: 'transparent'
    }
  };
  return (
    <div className="favorites-container">
      <BackButton />
      <div className="tabs">
        <button
          className={`tab-link ${currentTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setCurrentTab('favorites')}>
          Favorites
        </button>
        <button
          className={`tab-link ${currentTab === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentTab('history')}>
          History
        </button>
      </div>
      {currentTab === 'favorites' ? (
        <>
          <form>
            <label className="search">
              <img className="mag-glass" src={magGlass} alt="search icon" />
              <input
                style={inputStyle}
                className="input-search"
                type="text"
                placeholder="Search Keyword"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                required
              />
            </label>
          </form>
          <ul>
            {filteredFavorites && filteredFavorites.length ? (
              filteredFavorites
                .filter((item) => item.plan !== null)
                .map((item, index) => {
                  // console.log(item);
                  if (item.plan) {
                    return (
                      <li key={index} className="list-icons">
                        <p className="plan">
                          {item.plan.place}

                          <span className="span-item">
                            <SlLocationPin className="location-pin" />
                            {item.plan.address || 'N/A'}, {item.plan.cityState}
                          </span>
                          <span className="span-item">
                            <BsClock className="clock" /> {item.plan.openDateAndTime}
                          </span>
                          {/* <span className="span-item">
                          <AiOutlineCalendar className="calendar"/> {item.plan.date}
                        </span> */}
                        </p>

                        <div className="icons-container">
                          <button className="shared" onClick={() => sharePlan(item.plan)}>
                            <FiShare className="share" />
                          </button>
                          <Modal
                            isOpen={isModalVisible}
                            style={modalStyles}
                            onRequestClose={() => setIsModalVisible(false)}
                            contentLabel="Notification Modal">
                            <p>Plan copied to clipboard!</p>
                          </Modal>
                          <button
                            className="favorited"
                            onClick={() => handleFavoriteClick(item.uuid)}>
                            {' '}
                            {favoritedItems.includes(item.uuid) ? (
                              <MdOutlineFavorite className="favorite" />
                            ) : (
                              <MdOutlineFavoriteBorder className="favorite" />
                            )}
                          </button>
                        </div>
                      </li>
                    );
                  } else {
                    return (
                      <li key={index}>
                        <p>Plan details are not available</p>
                      </li>
                    );
                  }
                })
            ) : (
              <li>No favorited items</li>
            )}
          </ul>
        </>
      ) : (
        <>
          <form>
            <label className="search">
              <img className="mag-glass" src={magGlass} alt="search icon" />
              <input
                style={inputStyle}
                className="input-search"
                type="text"
                placeholder="Search Keyword"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                required
              />
            </label>
          </form>

          <ul>
            {/* Map through the history state to render each history item */}
            {filteredHistory
              .filter((history) => !closedPlans.includes(history.datePlanInfo.uuid))
              .map((history, index) => {
                const historyTitle = getHistoryTitle(history);
                const truncatedHistoryTitle = truncate(historyTitle, 38);

                return (
                  <div key={index} className="plan-history">
                    <Link
                      to={{
                        pathname: '/showcase',
                        search: `?plan_info=${history.datePlanInfo.uuid}`
                      }}
                      className="show-link">
                      <p>{truncatedHistoryTitle}</p>
                    </Link>
                    <div className="dateplans-container">
                      {history.datePlans.map(
                        (datePlan, idx) =>
                          datePlan.plan && (
                            <div key={idx} className="dateplan-card">
                              <Link
                                to={{
                                  pathname: '/showcase',
                                  search: `?uuid=${datePlan.uuid}`
                                }}
                                className="showcase-link">
                                <p>
                                  Option {idx + 1} {datePlan.plan.place}
                                </p>
                              </Link>
                              <div className="icons-container2">
                                <button
                                  className="shared"
                                  onClick={() => shareHistoryPlan(history.datePlanInfo.location)}>
                                  <FiShare className="share" />
                                </button>
                                <Modal
                                  isOpen={isModalVisible}
                                  style={modalStyles}
                                  onRequestClose={() => setIsModalVisible(false)}
                                  contentLabel="Notification Modal">
                                  <p>Plan copied to clipboard!</p>
                                </Modal>
                                <button
                                  className="closed"
                                  onClick={() => handleCloseClick(history.datePlanInfo.uuid)}>
                                  <AiOutlineClose className="close" />
                                </button>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                );
              })}
          </ul>
        </>
      )}
    </div>
  );
}
