import React, { useEffect, useState } from 'react';
import DatePlanService from '../../shared/services/dateplan.service';
import PropTypes from 'prop-types';

const MostRecentPlan = ({ plan }) => {
    
    const {
        cityState,
        date,
      } = plan;
    console.log('plan prop', plan)

    const [mostRecentPlan, setMostRecentPlan] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      try {
        const userPlans = await DatePlanService.getDatePlans();
        if (userPlans) {
          const filteredPlans = userPlans.filter(plan => plan.status === "VE");
          setMostRecentPlan(filteredPlans);
        } else {
          console.log("No user plans available");
        }
      } catch (error) {
        console.error('Error fetching user plans:', error);
      }
    };
    
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (dateString == null || isNaN(new Date(dateString).getTime())) {
      return "Invalid date";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  };  

const renderMostRecentPlan = () => {
    if (mostRecentPlan.length > 0) {
      const item = mostRecentPlan[0];
      return (
        <li key={item.uuid} className="list-icons">
          <div className="dateplan-date-container">
            <div className="start-time-container">
              <h2 className="time-h2">
                {formatDate(item.plan.date)}
              </h2>
            </div>
            <div className="recent-plan-container">
              <h2>
                Date in {item.plan.cityState}
              </h2>
            </div>
          </div>
        </li>
      );
    }
    return null;
  };
  return (
    <div>
      {mostRecentPlan.length > 0 && (
        <ul>
          <li key={mostRecentPlan[0].uuid} className="list-icons">
            <div className="dateplan-date-container">
              <div className="start-time-container">
                <h2 className="time-h2">
                  {formatDate(mostRecentPlan[0].plan.date)}
                </h2>
              </div>
              <div className="recent-plan-container">
                <h2>
                  Date in {mostRecentPlan[0].plan.cityState}
                </h2>
              </div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};
MostRecentPlan.propTypes = {
    plan: PropTypes.object.isRequired,
  };
export default MostRecentPlan;