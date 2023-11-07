import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/showcase.css';

import Plan from '../components/plan/Plan';
import dateplanService from '../shared/services/dateplan.service';

export default function Showcase() {
  const [plans, setPlans] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const uuid = searchParams.get('plan_info') || searchParams.get('uuid');
      let datePlans = null;
      if (searchParams.has('plan_info')) {
        datePlans = await dateplanService.getDatePlansById(uuid);
      } else if (searchParams.has('uuid')) {
        datePlans = await dateplanService.getDatePlanById(uuid);
      }
      if (datePlans === null || datePlans === undefined) {
        navigate('/404');
      } else {
        setPlans(datePlans.results);
      }
    };
    if (location.search) {
      fetchData();
    } else {
      navigate('/404'); // no params
    }
  }, [navigate]);

  return (
    <div className="section">
      <div className="container">
        {plans && (
          <>
            <h2 className="showcase-heading">Guru&apos;s Suggestions</h2>
            <p className="showcase-subheading">Select one option:</p>
            <div className="plan-container">
              {plans.map((plan, idx) => (
                <Plan key={idx} option={idx + 1} plan={plan.plan} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
