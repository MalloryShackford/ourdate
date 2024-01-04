import React, { useEffect,useState } from 'react';
import Basics from './Basics';
import Details from './Details';
import Preferences from './Preferences';
import Confirm from './Confirm';
import { useFormData, FormDataProvider } from './FormDataContext'
import dateplanService from '../../shared/services/dateplan.service';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import checkmark from '../../assets/green-checkmark.svg';
import BurgerMenu from '../header/nav/HamburgerMenu'
import { getProfileData } from '../../pages/profile/profileData';

const FormContent = () => {
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sectionCompletion, setSectionCompletion] = useState({
    basics: false,
    details: false,
    preferences: false,
    confirm: false,
});
  const [profileData, setProfileData] = useState(getProfileData());
  const { formData, updateFormData } = useFormData();
  const navigate = useNavigate();

  if (!localStorage.getItem('accessToken')) {
    navigate('/login');
    return;
}

  const handleChange = (event) => {
  const { name, value } = event.target;
  updateFormData(prevData => ({ ...prevData, [name]: value }));
};

const nextPage = () => setCurrentPage(currentPage + 1);
const prevPage = () => setCurrentPage(currentPage - 1);

const handleConfirmClick = () => {
  setIsModalVisible(true);  
  handleSubmit();
};

const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    const response = await dateplanService.submitDatePlanInfo(formData, profileData);
    
    setIsModalVisible(true);
    console.log('Submission Response:', response);
    const uuid = response.uuid; 
    localStorage.setItem('datePlanUUID', uuid);
    
  } catch (error) {
    console.error("Error submitting form:", error);
  }
  setIsSubmitting(false);
};

const updateFormProgress = () => {
  const isBasicsComplete = sectionCompletion.basics;
  const isDetailsComplete = sectionCompletion.details;
  const isPreferencesComplete = sectionCompletion.preferences;

  let progressPercentage = 0;
  const sectionContribution = 100 / 3; 
  if (isBasicsComplete) {
    progressPercentage += sectionContribution;
  }
  if (isDetailsComplete) {
    progressPercentage += sectionContribution;
  }
  if (isPreferencesComplete) {
    progressPercentage += sectionContribution;
  }

  if (isBasicsComplete && isDetailsComplete && isPreferencesComplete) {
    progressPercentage = 100;
  }
  setProgress(progressPercentage);
};

useEffect(() => {
  updateFormProgress();
}, [sectionCompletion]);

  return (
    // <FormDataProvider>
    <div>
<BurgerMenu/>
      {currentPage <= 2 && (
        <Basics
          formData={formData}
          setFormData={updateFormData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          updateProgress={setProgress} 
          nextPage={nextPage} 
          prevPage={prevPage}
          sectionCompletion={sectionCompletion} 
          setSectionCompletion={setSectionCompletion}
        />
      )}
      {currentPage > 2 && currentPage <5 && (
      <Details 
        formData={formData}
        setFormData={updateFormData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        updateProgress={setProgress} 
        nextPage={nextPage}
        prevPage={prevPage}
        sectionCompletion={sectionCompletion} 
        setSectionCompletion={setSectionCompletion}
        />
      )}
      {currentPage >= 5 && currentPage <=6 && ( 
      <Preferences 
        formData={formData}
        setFormData={updateFormData}
        updateProgress={setProgress} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        sectionCompletion={sectionCompletion} 
        setSectionCompletion={setSectionCompletion}
      />
      )}
      {currentPage === 7 &&
      <Confirm
        formData={formData}
        setFormData={updateFormData}
        prevPage={prevPage} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        submitForm={handleConfirmClick}
        editForm={handleChange}
        sectionCompletion={sectionCompletion} 
        setSectionCompletion={setSectionCompletion}
        />
      }
      {isModalVisible && (
      <div className="confirm-modal">
        <div className="confirm-modal-content">
          <div className="h1-container">
          <img className="checkmark-img" src={checkmark} alt="checkmark"/>
          <h1 className="yayH1">Yay!</h1>
          </div>
          <p className="submit-p">Thanks for submitting! Your personalized plan will be ready within the next <span className="confirm-span">24 hours.</span></p>
          <p>Stay posted! We&apos;ll notify you through <span className="confirm-span">email</span> once it&apos;s ready.</p>
          <button 
              className="confirm-button" 
              onClick={() => { setIsModalVisible(false)
              navigate('/');
              }}>
              Continue
          </button>
        </div>
      </div>
    )}
    </div>
    // </FormDataProvider>
  );
}

export default function Form() {
  return (
    <FormDataProvider>
      <FormContent />
    </FormDataProvider>
  );
}