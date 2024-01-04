import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import '../styles/pages/showcase.css';

import Plan from '../components/plan/Plan';
import dateplanService from '../shared/services/dateplan.service';
import HamburgerMenu from '../components/header/nav/HamburgerMenu';
// import MostRecentPlan from '../pages/profile/mostRecentPlan';

export default function Showcase() {
  const [plans, setPlans] = useState([]);
  const { uuid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await dateplanService.getDatePlansById(uuid);
            setPlans(data.results); 
            console.log('setPlans:', data.results)
        } catch (error) {
            console.error('Error fetching date plan:', error);
        }
    };

    if (uuid) {
        fetchData();
    }
}, [uuid]);

  return (
    <div>
      <HamburgerMenu />
      {/* <MostRecentPlan /> */}
      <div className="showcase-container">
        {plans && (
          <>
            <div>
              {plans.map((plan, idx) => (
                <Plan key={plan.id || idx} option={idx + 1} plan={plan.plan} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
