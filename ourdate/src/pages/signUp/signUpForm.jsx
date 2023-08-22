import React, { useEffect } from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import classes from '../../styles/pages/Login.module.css';
import { NavLink } from 'react-router-dom';
// import google from '../../assets/google.png';
import GoogleSignUp from '../../components/google/GoogleSignUp';



const SignupForm = (props) => {

  const handleGoogleSignInSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log('Full Name:', profile.getName());
    console.log('Email:', profile.getEmail());

    const id_token = googleUser.getAuthResponse().id_token;
    console.log('ID Token:', id_token);
  };

  useEffect(() => {
    window.onGoogleSignIn = handleGoogleSignInSuccess;
    return () => {
      delete window.onGoogleSignIn;
    };
  }, []);
  
  return (
    <Form>
      <label htmlFor="username" className={classes.label}>
        Username
      </label>
      <Field type="text" name="username" placeholder="Username" className={classes.input} />

      <div className={classes.error}>
        <ErrorMessage name="username" component="div" className={classes.error_message} />
      </div>

      <label htmlFor="email" className={classes.label}>
        Email
      </label>
      <Field type="email" name="email" placeholder="gurufox@gmail.com" className={classes.input} />

      <div className={classes.error}>
        <ErrorMessage name="email" component="div" className={classes.error_message} />
      </div>

      <label htmlFor="password" className={classes.label}>
        Password
      </label>
      <div>
        <Field
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className={classes.input}
        />
        <span className={classes.eye} onClick={props.togglePassword}>
          <i id="toggler" className="far fa-eye"></i>
        </span>
      </div>

      <div className={classes.error}>
        <ErrorMessage name="password" component="div" className={classes.error_message} />
      </div>

      <label htmlFor="password" className={classes.label}>
        Confirm your password
      </label>
      <div>
        <Field
          type="password"
          name="confirmation"
          id="confirmation"
          placeholder="Re-enter password"
          className={classes.input}
        />
      </div>

      <div className={classes.error}>
        <ErrorMessage name="confirmation" component="div" className={classes.error_message} />
      </div>

      <label className={classes.terms} htmlFor="terms">
        <input type={'checkbox'} name="terms" className={classes.checkbox} id="terms" />
        <div className={classes.checkbox_input}></div>
        <div className={classes.already}>
          I agree to the <span className={classes.underline}>Terms and Conditions</span>
        </div>
      </label>

      <div className={classes.buttonDiv}>
        <button type="submit" disabled={props.isSubmitting} className={classes.button}>
          Create Account
        </button>
      </div>
      {/* or */}
      <div
        className="classes.orSection"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
          margin: 'auto',
          marginBottom: '1.3rem',
          color: 'var(--blue-2)'
        }}>
        <hr style={{ flex: 1, borderTop: '1px solid var(--blue-2)', margin: '0 10px' }} />
        <span>or</span>
        <hr style={{ flex: 1, borderTop: '1px solid var(--blue-2)', margin: '0 10px' }} />
      </div>
      {/* Google Button */}
      <div>
        <GoogleSignUp onSuccess={handleGoogleSignInSuccess} />
        {/* <button type="submit" disabled={props.isSubmitting} className={classes.googleButton}>
          <span className={classes.googleButtonContent}>
            <img src={google} alt="googleLogo" className={classes.googleLogo} />
            Sign up with Google
          </span>
        </button> */}
      </div>
      <div>
        <NavLink to="/login">
          <div className={classes.already}>
            Already have account? <span className={classes.underline}>Log In</span>
          </div>
        </NavLink>
      </div>
    </Form>
  );
};

export default SignupForm;
