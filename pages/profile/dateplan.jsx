import React, { useState, useEffect }  from 'react'
import DatePlanService from '../../shared/services/dateplan.service';
import { useNavigate } from 'react-router-dom'
import '../../styles/pages/dateplan.css';
import HamburgerMenu from '../../components/header/nav/HamburgerMenu';

const Dateplan = () => {
    const [datePlans, setDatePlans] = useState([]);
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchPlans = async () => {
        const storedUuid = localStorage.getItem('datePlanUUID');
        
        try {
          // const url = 'https://api.gurufox.ai/dateplan/?plan_info=2e19e125-51f1-4333-8e87-65cbad8c6686'
          // const response = await axios.get(url);
          const response = await DatePlanService.getDatePlansById(storedUuid);
          console.log('Full response:', response);
          if (Array.isArray(response.results)) {
            setDatePlans(response.results);
            console.log('setDatePlans', response.results)
          } else {
            console.error('Expected an array of plans, received:', response.results);
          } 
          
        } catch (error) {
          console.error('Error fetching plans:', error);
        }
      };
      // if (uuid) {
        fetchPlans();
      // }
    }, []);
    
    useEffect(() => {
      const fetchStatus = async () => {
        try {
          const data = await DatePlanService.getDatePlanByStatus('VE');
          if (data && data.results.some(plan => plan.status === 'VE')) {
            setIsVerified(true);
          } else {
            setIsVerified(false);
          }
        } catch (error) {
          console.error('Error fetching status:', error);
          setIsVerified(false);
        }
      };
      fetchStatus();
    }, []);

    // useEffect(() => { 
    //   const fetchData = async () => {
    //     try { 
    //       const userData = localStorage.getItem('userData');
    //       console.log(userData);
    //       const userId = userData.id;
    //       const userPlans = await DatePlanService.getDatePlansByUserId(userId);
    //       setSelectedPlan(userPlans);
    //       console.log("user plans", userPlans)
    //     } catch (error) {
    //       console.error('Error fetching user details', error);
    //       }  
    //   };
    //   fetchData();
    // }, []);

    const formatDate = (dateString) => {
      if (!dateString) return null;
    
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day); 
    
      if (isNaN(date.getTime())) return null;
    
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return formattedDate.toUpperCase();
    };
    
    if (Array.isArray(datePlans)) {
      const validDatePlans = datePlans.filter(plan => {
        const date = new Date(plan.plan.datePlanStart);
        return !isNaN(date.getTime());
    });
      const sortedDatePlans = validDatePlans.slice().sort((a, b) => {
          const dateA = new Date(a.plan.datePlanStart);
          const dateB = new Date(b.plan.datePlanStart);
  
          return dateB - dateA;
      });
  

    const pastPlans = sortedDatePlans.slice(1);
    console.log("past plans", pastPlans)
    console.log("date plans", datePlans);
    
    // const handleClick = () => {
    //   if (datePlans && datePlans.length > 0) {
    //     navigate(`/showcase/${datePlans[0].uuid}`);
    //   }
    // };
    const handleClick = () => {
      if (mostRecentPlan) {
        navigate(`/showcase/${mostRecentPlan.plan_info}`);
      }
    };
    
    const handleViewClick = (uuid) => {
      if (datePlans.plan_info){
        navigate(`/showcase/${uuid}`);
      }
    }
    const mostRecentPlan = datePlans && datePlans.length > 0 ? datePlans[0] : null;
return (
<div>
  <HamburgerMenu/>
  <h1 className="date-plan-h1">My Date Plans</h1>
    {mostRecentPlan && isVerified ? (
      <>
        <h2 className="date-plan-h2">Your date plan is ready!</h2>
        <div className="dateplan-container">
          <ul>
            <li key={mostRecentPlan.uuid} className="list-icons">
              <div className="dateplan-ready-wrapper">
                <div className="dateplan-ready-container">
                  <div className="start-time-container">
                    <h2 className="time-h2">
                     {formatDate(mostRecentPlan.plan.dateOf)}
                    </h2>
                  </div>
                 <div className="recent-plan-container">
                    <h3 className="plan-details-h3">
                      {/* {mostRecentPlan.plan.place} */}
                      Date in {mostRecentPlan.plan.cityState}
                    </h3>
                    <span>Your date plan is here!</span>
                    <span className="view-span" onClick={handleClick}>Click to view</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </>
  ) : (
    <div>
      <h2 className="date-plan-h2">Pending Plans</h2>
      <p className="no-verified-plan-p">No verified date plans available.</p>
    </div>
  )}
      <h2 className="past-plan-h2">Past Plans</h2>
      <div className="past-plan-container">
        <div className="past-plans-container">
          <div className="past-time-container">
        <ul>
          {pastPlans && pastPlans.length > 0 ? (
            pastPlans.map((plan, index) => (
  
              <li key={plan.id || index} className="past-plan-list box-shadow-container">
                { plan.plan.datePlanStart && (
               
                <div className="past-plan-time-container">
                  <h2 className="start-time-h2">
                    {formatDate(plan.plan.datePlanStart)}
                  </h2>
                </div>
                )}
                <div className="past-plan-details-container">
                  { plan && plan.plan && plan.plan.datePlanStart && (
                    <>
                    <div className="view-date-container">
                      <p className="plan-details-p">
                       Date in {plan.plan.cityState}
                      </p>
                      <span className="view-span" onClick={() => handleViewClick(plan.uuid)}>View date plan</span>
                  </div>
                  </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li>No past plans available.</li>
          )}
        </ul>
        </div>
      </div>
     </div>
  </div>

  )
}
}

export default Dateplan