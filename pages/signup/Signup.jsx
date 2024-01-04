import React, { useState } from 'react';
import { Formik } from 'formik';
import classes from '../../styles/pages/Login.module.css';
import SignupForm from './SignupForm';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import PropTypes from 'prop-types'
import logo from '../../assets/logo.svg'
import ourdateLogo from '../../assets/ourdate-logo.svg';
import bikeCouple from '../../assets/bike-couple.svg';
import waveImg from '../../assets/wave.svg';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
});

const Signup = (props) => {
  const navigate = useNavigate();
  // const [isSignedUp, setIsSignedUp] = useState(localStorage.getItem('token') !== null);
  const { setIsSignedUp, signupUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (values, actions) => {
    try {
      const signupResult = await signupUser(values, navigate);
      if (signupResult) {
        setIsSignedUp(true);
        navigate('/free-trial');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Name is required';
        }
        if (!values.email) {
          errors.email = 'Email is required';
        }
        if (!values.password) {
          errors.password = 'Password is required';
        }
        // if (!values.confirmation) {
        //   errors.confirmation = 'Please confirm your password';
        // }
        // if (values.password !== values.confirmation) {
        //   errors.confirmation = 'Your passwords do not match!';
        // }
        return errors;
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSignup}>
      {({ isSubmitting }) => (
        <>
         <div className={classes.waveContainer}>
         
        <div className={classes.parentDiv}>
        <div className={classes.loginImage}>
           <h1 className={classes.signupH1}>Spark Connection with Personalized Date Ideas</h1>
          <p className={classes.signupP}>Start your journey towards meaningful connections - sign up today and claim your personalized date plan.</p>
          <img className={classes.signupImg} src={bikeCouple} alt="couple on bike"/>
        </div>
        <div className={classes.loginField}>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <img className={classes.ourdateLogo} src={ourdateLogo} alt="ourdate-logo" />
          <h1 className={classes.loginName}>Create account</h1>
          <img className={classes.logo} src={logo} alt="ourdate-logo"/>
          {/* <p className={classes.signupSubtitle}>Create an account to view date plan</p> */}
          <SignupForm togglePassword={props.togglePassword} isSubmitting={isSubmitting} />
          <div className={classes.buttonDiv}>
            {errorMessage && <div className={classes.error_message}>{errorMessage}</div>}
          </div>
        </div>
        </div>
        <img className={classes.waveImg} src={waveImg} alt="wave"/>
        </div>
        </>
      )}
      
    </Formik>
  );
};

Signup.propTypes = {
  togglePassword: PropTypes.func.isRequired,
};
export default Signup;
