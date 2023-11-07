import React, { useState } from 'react';
import { Formik } from 'formik';
import classes from '../../styles/pages/Login.module.css';
import SignupForm from './SignupForm';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
});

const Signup = (props) => {
  const navigate = useNavigate();
  // const [isSignedUp, setIsSignedUp] = useState(localStorage.getItem('token') !== null);
  const { isSignedUp, setIsSignedUp, signupUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (values, actions) => {
    try {
      const signupResult = await signupUser(values, navigate);
      if (signupResult) {
        setIsSignedUp(true);
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', confirmation: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Username is required';
        }
        if (!values.email) {
          errors.email = 'Email is required';
        }
        if (!values.password) {
          errors.password = 'Password is required';
        }
        if (!values.confirmation) {
          errors.confirmation = 'Please confirm your password';
        }
        if (values.password !== values.confirmation) {
          errors.confirmation = 'Your passwords do not match!';
        }
        return errors;
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSignup}>
      {({ isSubmitting }) => (
        <div className={classes.loginField}>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <h1 className={classes.loginName}>Sign Up</h1>
          <p className={classes.signupSubtitle}>Create an account to view date plan</p>
          <SignupForm togglePassword={props.togglePassword} isSubmitting={isSubmitting} />
          <div className={classes.buttonDiv}>
            {errorMessage && <div className={classes.error_message}>{errorMessage}</div>}
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Signup;
