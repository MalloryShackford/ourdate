import React, { useEffect, useState } from 'react'
import AddTo from '../../assets/add-to.svg'
import AddToWhite from '../../assets/white-checkmark.svg'
import AddToBlue from '../../assets/add-to-blue.svg'
import '../../styles/pages/profile.css';
import HamburgerMenu from '../../components/header/nav/HamburgerMenu';

const UserProfile = () => {
  
  const initialPartnerName = localStorage.getItem('partnerName') || '';
  const initialRelationshipStatus = localStorage.getItem('relationshipStatus') || '';
  const initialLoveLanguage = localStorage.getItem('loveLanguage') || '';
  const initialPartnerLL = localStorage.getItem('partnerLoveLanguage') || '';
  const initialFavActivities = localStorage.getItem('favActivities') || '';
  const initialAvoidActivity = localStorage.getItem('avoidActivity') || '';
  const initialDietaryNeeds = localStorage.getItem('dietaryNeeds') || '';
  const initialAlcoholPref = localStorage.getItem('alcoholPref') || '';
  let initialRelationshipGoals;

  try {
    const storedGoals = localStorage.getItem('relationshipGoals');
    initialRelationshipGoals = storedGoals ? JSON.parse(storedGoals) : [];
  } catch (error) {
    console.error('Error parsing relationshipGoals from localStorage:', error);
    initialRelationshipGoals = [];
  }
  
  const [isSelected, setIsSelected] = useState({});
  const [isCompleted, setIsCompleted] = useState({});
  const [showTextBox, setShowTextBox] = useState(false);
  const [partnerName, setPartnerName] = useState(initialPartnerName);
  const [showRelationshipDropdown, setShowRelationshipDropdown] = useState(false);
  const [relationshipStatusDropdown, setRelationshipStatusDropdown] = useState(initialRelationshipStatus);
  const [showLoveLanguageDropdown, setShowLoveLanguageDropdown] = useState(false);
  const [loveLanguageStatusDropdown, setLoveLanguageStatusDropdown] = useState(initialLoveLanguage);
  const [showPartnerLoveLanguageDropdown, setShowPartnerLoveLanguageDropdown] = useState(false);
  const [partnerLoveLanguageStatusDropdown, setPartnerLoveLanguageStatusDropdown] = useState(initialPartnerLL);
  const [showGoalsDropdown, setShowGoalsDropdown] = useState(false);
  const [goalsStatus, setGoalsStatus] = useState(initialRelationshipGoals);
  const [otherGoalsInput, setOtherGoalsInput] = useState('');
  const [isDropdownSelected] = useState(true);
  const [isTextboxSelected] = useState(true);
  const [isFavActivityTextboxSelected] = useState(true);
  const [isDislikeActivityTextboxSelected] = useState(true);
  const [isDietaryTextboxSelected] = useState(true);
  const [progress, setProgress] = useState(0)
  const [completedField, setCompletedField] = useState(0);
  const [showFavActivityTextBox, setShowFavActivityTextBox] = useState(false);
  const [favActivity, setFavActivity] = useState(initialFavActivities)
  const [showDislikeActivityTextBox, setShowDislikeActivityTextBox] = useState(false);
  const [avoidActivity, setAvoidActivity] = useState(initialAvoidActivity);
  const [showDietaryTextBox, setShowDietaryTextbox] = useState(false);
  const [dietaryNeeds, setDietaryNeeds] = useState(initialDietaryNeeds);
  const [alcoholPref, setAlcoholPref] = useState(false);
  const [showAlcoholPrefDropdown, setShowAlcoholPrefDropdown] = useState(false);
  const [alcoholPrefStatusDropdown, setAlcoholPrefStatusDropdown] = useState(initialAlcoholPref);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const user = JSON.parse(savedUserData);
      setUserData(user);
  }
  }, []);

  useEffect(() => {
    const savedIsCompleted = JSON.parse(localStorage.getItem('isCompleted'));
    if (savedIsCompleted) {
      setIsCompleted(savedIsCompleted);
    }
  
  }, []);

  useEffect(() => {
    const savedProgress = localStorage.getItem('profileProgress');
    if (savedProgress) {
      setProgress(parseFloat(savedProgress));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('partnerName', partnerName);
    localStorage.setItem('relationshipStatus', relationshipStatusDropdown);
    localStorage.setItem('relationshipGoals', JSON.stringify(goalsStatus));
    localStorage.setItem('loveLanguage', loveLanguageStatusDropdown);
    localStorage.setItem('partnerLoveLanguage', partnerLoveLanguageStatusDropdown);
    localStorage.setItem('favActivities', favActivity);
    localStorage.setItem('avoidActivity', avoidActivity);
    localStorage.setItem('dietaryNeeds', dietaryNeeds);
    localStorage.setItem('alcoholPref', alcoholPrefStatusDropdown);
    localStorage.setItem('profileProgress', progress.toString());

  }, [
      partnerName, 
      relationshipStatusDropdown, 
      goalsStatus, 
      loveLanguageStatusDropdown, 
      partnerLoveLanguageStatusDropdown,
      favActivity,
      avoidActivity,
      dietaryNeeds,
      alcoholPrefStatusDropdown,
      progress
    ]
  );
  const toggleFinalCheck = (itemId) => {
    setIsCompleted(prevItems => {
      const updatedItems = {
        ...prevItems,
        [itemId]: !prevItems[itemId]
      };
      localStorage.setItem('isCompleted', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };
const toggleCheckmark = (itemId) => {
  setIsSelected(prevItems => ({
    ...prevItems,
    [itemId]: !prevItems[itemId]
  }));
};
const toggleTextBox = () => {
  setShowTextBox(!showTextBox);
};
const toggleFavActivityTextBox = () => {
  setShowFavActivityTextBox(!showFavActivityTextBox);
}
const toggleAvoidActivityTextBox = () => {
  setShowDislikeActivityTextBox(!showDislikeActivityTextBox);
}
const toggleDietaryTextBox = () => {
  setShowDietaryTextbox(!showDietaryTextBox);
}
const handleDietaryNeedsChange = (e) => {
  setDietaryNeeds(e.target.value);
}
const handleAvoidActivityChange = (e) => {
  setAvoidActivity(e.target.value);
}
const handleFavActivityChange = (e) => {
  setFavActivity(e.target.value);
}
const handleNameChange = (e) => {
  setPartnerName(e.target.value);
};
const handleDietaryNeedsSave = () => {
  setShowDietaryTextbox(false);
  setIsCompleted(true);
  setCompletedField(completedField + 1);
  updateProgress();
}
const handleAvoidActivitySave = () => {
  setIsCompleted(true);
  setShowDislikeActivityTextBox(false);
  setCompletedField(completedField + 1);
  updateProgress();
}
const handleFavActivitySave = () => {
  setIsCompleted(true);
  setShowFavActivityTextBox(false);
  setCompletedField(completedField + 1);
  updateProgress();
}
const handleSave = () => {
  setShowTextBox(false);
  setCompletedField(completedField + 1);
  updateProgress();
};
const handleStatusSave = () => {
  setShowRelationshipDropdown(false);
  setCompletedField(completedField + 1);
  updateProgress();
}
const handleLLSave = () => {
  setShowLoveLanguageDropdown(false);
  setCompletedField(completedField + 1);
  updateProgress();
}
const handlePartnerLLSave = () => {
  setShowPartnerLoveLanguageDropdown(false);
  setCompletedField(completedField + 1);
  updateProgress();
}
const handleGoalsSave = () => {
  const updatedGoals = goalsStatus.map(goal => {
    if (goal === 'Other') {
      return { value: 'Other', customText: otherGoalsInput };
    }
    return goal;
  });
  localStorage.setItem('relationshipGoals', JSON.stringify(updatedGoals));
  setShowGoalsDropdown(false);
  setCompletedField(completedField + 1);
  updateProgress();
};
const handleAlcoholSave = () => {
  setShowAlcoholPrefDropdown(false);
  setCompletedField(completedField +1);
  updateProgress();
}
// const handleDataSave = async () => {
//   const data = {
//     partnersName: partnerName,
//     relationshipStatus: relationshipStatusDropdown,
//     love_language: loveLanguageStatusDropdown,
//     partnersLoveLanguage: partnerLoveLanguageStatusDropdown,
//     relationshipGoals: goalsStatus,
//     activities_enjoy: favActivity,
//     activities_dislike: avoidActivity,
//     dietary_needs: dietaryNeeds,
//     drink_alcohol: alcoholPref,
//   };

//   try {
//     const response = await axios.post("https://api.gurufox.ai/dateplaninfo/", data);
//     // const response = await dateplanService.submitDatePlanInfo(data);
//     if (response.status === 200) {
//       console.log("Data saved successfully!", data);
//     } else {
//       console.error("Error saving data:", response.data);
//     }
//   } catch (error) {
//     console.error("Error sending request:", error);
//   }
// };

const handleRelationshipDropdownChange = (event) => {
  setRelationshipStatusDropdown(event.target.value);
};
const handleDropdownAddClick = () => {
  setShowRelationshipDropdown(!showRelationshipDropdown);
};
const handleLoveLanguageDropdownChange = (event) => {
  setLoveLanguageStatusDropdown(event.target.value);
};
const handleDropdownClick = () => {
  setShowLoveLanguageDropdown(!showLoveLanguageDropdown);
}
const handlePartnerLoveLanguageDropdownChange = (event) => {
  setPartnerLoveLanguageStatusDropdown(event.target.value);
};
const handlePartnerDropdownClick = () => {
  setShowPartnerLoveLanguageDropdown(!showPartnerLoveLanguageDropdown);
}
const handleGoalsDropdownChange = (event) => {
  const { value, checked } = event.target;
  let newGoalsStatus = [...goalsStatus];

  if (checked) {
    newGoalsStatus = [...newGoalsStatus, value];
  } else {
    newGoalsStatus = newGoalsStatus.filter(item => item !== value); 
  }
  setGoalsStatus(newGoalsStatus);
  localStorage.setItem('relationshipGoals', JSON.stringify(newGoalsStatus));
};
const handleGoalsDropdownClick = () => {
  setShowGoalsDropdown(!showGoalsDropdown);
}
const handleAlcoholPrefDropdownChange = (event) => {
  setAlcoholPrefStatusDropdown(event.target.value)
  setAlcoholPref(event.target.value === 'true');
}
const handleAlcoholPrefDropdownClick = () => {
  setShowAlcoholPrefDropdown(!showAlcoholPrefDropdown);
}

const relationshipDropdownOptions = [
  { value: 'Dating', label: 'Dating' },
  { value: 'In a relationship', label: 'In a relationship' },
  { value: 'Engaged', label: 'Engaged' },
  { value: 'Married', label: 'Married' },
  { value: 'Married, with children', label: 'Married, with children' },
  { value: 'Single parent', label: 'Single parent' },
];

const loveLanguageDropdownOptions = [
  { value: 'Acts of Services', label: 'Acts of Services' },
  { value: 'Words of Affirmation', label: 'Words of Affirmation' },
  { value: 'Physical Touch', label: 'Physical Touch' },
  { value: 'Quality Time', label: 'Quality Time'},
  { value: 'Gifts', label: 'Gifts' },
];

const goalsDropdownOptions = [
  { value: 'Understand my partner more', label: 'Understand my partner more' },
  { value: 'Understand myself more', label: 'Understand myself more' },
  { value: 'Experience something new', label: 'Experience something new' },
  { value: 'Spice things up', label: 'Spice things up' },
  { value: 'Other', label: 'Other' },
]
const alcoholPrefDropdownOptions = [
  { value: 'Drinks alcohol', label: 'Drinks alcohol' },
  { value: 'Does not drink alcohol', label: 'Does not drink alcohol' },
]
const countFilledFields = () => {
  let count = 0;
  if (partnerName) count++;
  if (relationshipStatusDropdown) count++;
  if (goalsStatus.length > 0) count++; 
  if (loveLanguageStatusDropdown) count++;
  if (partnerLoveLanguageStatusDropdown) count++;
  if (favActivity) count++;
  if (avoidActivity) count++;
  if (dietaryNeeds) count++;
  if (alcoholPref) count++; 

  if (goalsStatus.includes('Other') && otherGoalsInput) count++;

  return count;
};
const updateProgress = () => {
  const totalFields = 9; 
  const fieldsFilled = countFilledFields(); 
  const newProgress = (fieldsFilled / totalFields) * 100;
  setProgress(newProgress);
  localStorage.setItem('profileProgress', newProgress)
};

const userNameFromGoogle = localStorage.getItem('userName');
const userNameToDisplay = userNameFromGoogle || userData?.username || 'User';
const firstLetter = userNameToDisplay && userNameToDisplay.length > 0 ? userNameToDisplay[0].toUpperCase() : '?';


  return (
    <div>
      <HamburgerMenu className="burger-menu"/>
      <div className="letter-container">
          <h2 className="avatar-letter">{firstLetter}</h2>
      <div className="profile-info-container">
        <h2 className="profile-info-h2">Profile Information</h2>
        <span className="profile-info-p">Profile {Math.round(progress)}% Complete</span>
      </div>
      </div>
      
      <p className="rel-info">Relationship information</p>
        <div className="rel-info-container"></div>
      <div className="relationship-container">
      <div>
        <div className="status-container">
        <p className="add-to">
          <img 
              onClick={() => {
                toggleTextBox();
                toggleCheckmark('partnerName');
                toggleFinalCheck('partnerName');
              }}
              src={isCompleted['partnerName'] ? AddToBlue : isSelected['partnerName'] ? AddTo : AddToWhite}
              alt="add-to"
              width="24"
          />
          Partner&apos;s name
        </p>
        {isTextboxSelected && (
          <span className="filled-info">{partnerName}</span>
        )}
        </div>
        {showTextBox && (
      <div className="textbox-container">
        <input 
            className="partner-name-input" 
            type="text" 
            value={partnerName}
            placeholder="Type here..." 
            onChange={handleNameChange}
        />
        <button 
            onClick={(e) => {
              handleSave(e); 
              // handleDataSave()
            }} 
            className="save-button">
              Save
        </button>
      </div>
        )}
        </div>
      <div>
        <div className="status-container">
        <p className="add-to">
          <img 
            onClick={() => {
              handleDropdownAddClick();
              toggleCheckmark('relationshipStatusDropdown');
              toggleFinalCheck('relationshipStatusDropdown');
            }}
            src={isCompleted['relationshipStatusDropdown'] ? AddToBlue : isSelected['relationshipStatusDropdown'] ? AddTo : AddToWhite}
            alt="add-to" 
            width="24" 
          />
          Relationship status
      </p>
        {isDropdownSelected && (
          <span className="filled-info">{relationshipStatusDropdown}</span>
        )}
      </div>
      {showRelationshipDropdown && (
        <div className="relationship-dropdown-container">
          <select 
              id="select-relationship" 
              value={relationshipStatusDropdown} 
              onChange={handleRelationshipDropdownChange}
              placeholder="Select here... "
          >
          <option value="">Select here...</option>
          {relationshipDropdownOptions.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
            ))}
          </select>
          <button 
            onClick={() => {
              handleStatusSave(); 
              // handleDataSave();
            }} 
            className="save-button">
              Save
        </button>
        </div>
      )}
    </div>
      <div>
        <div className="status-container">
        <p className="add-to">
          <img 
              onClick={() => {
                handleGoalsDropdownClick();
                toggleCheckmark('goalsStatus');
                toggleFinalCheck('goalsStatus');
              }} 
              src={isCompleted['goalsStatus'] ? AddToBlue : isSelected['goalsStatus'] ? AddTo : AddToWhite}
              alt="add-to"
              width="24"
          />
              Relationship goals
        </p>
        {isDropdownSelected && (
          <div className="filled-info-container">
            {goalsStatus.map((goal, index) => (
              <span className="filled-info" key={index} style={{display:'flex', flexDirection:'column'}}>{goal}</span>
            ))}
          </div>
        )}
        </div>
        {showGoalsDropdown && (
        <div className="goals-dropdown-container">
          {goalsDropdownOptions.map((option) => (
            <div key={option.value} className="checkbox-container">
              <input
                  id={`checkbox-${option.value}`}
                  className="goals-input"
                  type="checkbox"
                  value={option.value}
                  checked={goalsStatus.includes(option.value)}
                  onChange={handleGoalsDropdownChange}
              />
             <label className="goals-label" htmlFor={`checkbox-${option.value}`}>{option.label}</label>
            </div>
          ))}
          {goalsStatus.includes('Other') && (
            <input
              className="other-goals-input"
              type="text"
              value={otherGoalsInput}
              onChange={(e) => setOtherGoalsInput(e.target.value)}
              placeholder="Please specify"
            />
          )}
          <button 
            onClick={() => {
              handleGoalsSave(); 
              // handleDataSave();
            }} 
            className="save-button">
              Save
        </button>
        </div>
      )}
    </div>
        <div>
        <div className="status-container">
        <p className="add-to">
          <img 
            onClick={() => {
              handleDropdownClick();
              toggleCheckmark('loveLanguageStatusDropdown')
              toggleFinalCheck('loveLanguageStatusDropdown');
            }} 
            src={isCompleted['loveLanguageStatusDropdown'] ? AddToBlue : isSelected['loveLanguageStatusDropdown'] ? AddTo : AddToWhite}
            alt="add-to"
            width="24"
          />
            Your love language
        </p>
        {isDropdownSelected && (
          <span className="filled-info">{loveLanguageStatusDropdown}</span>
        )}
        </div>
        {showLoveLanguageDropdown && (
        <div className="ll-dropdown-container">
          <select 
              id="select-ll" 
              value={loveLanguageStatusDropdown} 
              onChange={handleLoveLanguageDropdownChange}
          >
            <option value="">Select here...</option>
            {loveLanguageDropdownOptions.map((option) => (
              <option className="ll-option" key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button 
            onClick={(e) => {
              handleLLSave(e); 
              // handleDataSave();
            }} 
            className="save-button">
              Save
        </button>
        </div>
      )}
    </div>
    <div>
        <div className="status-container">
        <p className="add-to">
          <img 
            onClick={() => {
              handlePartnerDropdownClick();
              toggleCheckmark('partnerLoveLanguageStatusDropdown');
              toggleFinalCheck('partnerLoveLanguageStatusDropdown');
            }} 
            src={isCompleted['partnerLoveLanguageStatusDropdown'] ? AddToBlue : isSelected['partnerLoveLanguageStatusDropdown'] ? AddTo : AddToWhite}
            alt="add-to"
            width="24"
            />
            Your partner&apos;s love language
        </p>
        {isDropdownSelected && (
          <span className="filled-info">{partnerLoveLanguageStatusDropdown}</span>
        )}
        </div>
        {showPartnerLoveLanguageDropdown && (
        <div className="ll-dropdown-container">
          <select 
              id="select-ll" 
              value={partnerLoveLanguageStatusDropdown} 
              onChange={handlePartnerLoveLanguageDropdownChange}
          >
            <option value="">Select here...</option>
            {loveLanguageDropdownOptions.map((option) => (
              <option className="ll-option" key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button 
            onClick={() => {
              handlePartnerLLSave(); 
              // handleDataSave();
            }} 
            className="save-button">
              Save
        </button>
        </div>
      )}
      </div>
    </div>
        <p className="rel-info">Details about you and your partner</p>
      <div className="rel-info-container"></div>
      <div className="relationship-container">
      <div>
        <div className="status-container">
        <p className="add-to">
          <img 
            onClick={() => {
              toggleFavActivityTextBox();
              toggleCheckmark('favActivity');
              toggleFinalCheck('favActivity');

            }} 
            src={isCompleted['favActivity'] ? AddToBlue : isSelected['favActivity'] ? AddTo : AddToWhite}
            alt="add-to"
            width="24"
            />
            Favorite activities
        </p>
        {isFavActivityTextboxSelected && (
          <span className="filled-info">{favActivity}</span>
        )}
        </div>
        {showFavActivityTextBox && (
      <div className="textbox-container">
        <input 
            className="fav-activity-input" 
            type="text" 
            value={favActivity}
            placeholder="Type here..." 
            onChange={handleFavActivityChange}
        />
        <button 
            onClick={(e) => {
              handleFavActivitySave(e); 
              // handleDataSave();
            }} 
            className="save-button">
              Save
        </button>
      </div>
        )}
      </div>
      <div>
        <div className="status-container">
        <p className="add-to">
          <img 
            onClick={() => {
              toggleAvoidActivityTextBox();
              toggleCheckmark('avoidActivity')
              toggleFinalCheck('avoidActivity');
            }} 
            src={isCompleted['avoidActivity'] ? AddToBlue : isSelected['avoidActivity'] ? AddTo : AddToWhite}
            alt="add-to"
            width="24"
          />
          Activities to avoid
        </p>
        {isDislikeActivityTextboxSelected && (
          <span className="filled-info">{avoidActivity}</span>
        )}
        </div>
        {showDislikeActivityTextBox && (
      <div className="textbox-container">
        <input 
            className="avoid-activity-input" 
            type="text" 
            value={avoidActivity}
            placeholder="Type here..." 
            onChange={handleAvoidActivityChange}
        />
        <button 
            onClick={(e) => {
              handleAvoidActivitySave(e); 
              // handleDataSave();
            }} 
            className="save-button">
              Save
        </button>
      </div>
        )}
        </div>
      <div>
        <div className="status-container">
        <p className="add-to">
          <img 
            onClick={() => {
              toggleDietaryTextBox();
              toggleCheckmark('dietaryNeeds');
              toggleFinalCheck('dietaryNeeds');
            }} 
            src={isCompleted['dietaryNeeds'] ? AddToBlue : isSelected['dietaryNeeds'] ? AddTo : AddToWhite}
            alt="add-to"
            width="24"
          />
          Dietary needs
        </p>
        {isDietaryTextboxSelected && (
          <span className="filled-info">{dietaryNeeds}</span>
        )}
        </div>
        {showDietaryTextBox && (
      <div className="textbox-container">
        <input 
            className="dietary-needs-input" 
            type="text" 
            value={dietaryNeeds}
            placeholder="Type here..." 
            onChange={handleDietaryNeedsChange}
        />
        <button 
            onClick={(e) => {
              handleDietaryNeedsSave(e); 
              // handleDataSave();
            }} 
            className="save-button">
              Save
        </button>
      </div>
        )}
      </div>
      <div>
        <div className="status-container">
        <p className="add-to">
          <img 
            onClick={() => {
              handleAlcoholPrefDropdownClick();
              toggleCheckmark('alcoholPrefStatusDropdown');
              toggleFinalCheck('alcoholPrefStatusDropdown');
            }} 
            src={isCompleted['alcoholPrefStatusDropdown'] ? AddToBlue : isSelected['alcoholPrefStatusDropdown'] ? AddTo : AddToWhite}
            alt="add-to"
            width="24"
            />
            Alcohol preference
        </p>
        {isDropdownSelected && (
          <span className="filled-info">{alcoholPrefStatusDropdown}</span>
        )}
        </div>
        {showAlcoholPrefDropdown && (
        <div className="pref-dropdown-container">
          <select 
              id="select-pref"
              value={alcoholPrefStatusDropdown}
              onChange={handleAlcoholPrefDropdownChange}
              placeholder="Select here... "
          >
          <option value="">Select here...</option>
          {alcoholPrefDropdownOptions.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
            ))}
          </select>
          <button 
            onClick={() => {
              handleAlcoholSave(); 
              // handleDataSave();
            }} 
            className="save-button">
              Save
        </button>
        </div>
      )}
      </div>
    </div>
  </div>
  )
}

export default UserProfile

