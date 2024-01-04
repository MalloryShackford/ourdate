import React from 'react';
import PropTypes from 'prop-types';

const MostRecentDatePlan = ({ datePlan, onClick}) => {

    if (!datePlan) {
        return <p>No upcoming date plans</p>;
    }
    const formatDate = (dateString) => {
        if (!dateString == null){
          return null;
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())){
          return null;
        }
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return formattedDate.toUpperCase(); 
      };

    return (
        <div className="recent-dateplan-container">
            <ul>
                <li key={datePlan.id} className="list-icons">
                <div className="dateplan-ready-wrapper">
                <div className="dateplan-ready-container" onClick={onClick}>
                    <div className="start-time-container">
                        <h2 className="time-h2">
                         {formatDate(datePlan.plan.datePlanStart)}
                        </h2>
                    </div>
                <div className="recent-plan-container" onClick={onClick}>
                    <h4 className="recent-date-h4">
                        Date in {datePlan.plan.cityState}
                    </h4>
                </div>
                </div>
                </div>
                </li>
            </ul>
        </div>
    );
};

MostRecentDatePlan.propTypes = {
    datePlan: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        plan: PropTypes.shape({
            datePlanStart: PropTypes.string,
            place: PropTypes.string,
            cityState: PropTypes.string,
        }),
    }),
    onClick: PropTypes.func,
};
export default MostRecentDatePlan;
