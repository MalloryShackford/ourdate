import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import classes from '../../styles/pages/Login.module.css';
import { useAuth } from '../../context/authContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
});

const LoginForm = (props) => {
  const navigate = useNavigate(); // For the automatic navigation
  const { isLoggedIn, setIsLoggedIn, loginUser, logoutUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogout = () => {
    // Perform logout operations if needed`
    // For example, clearing local storage or removing the token from state
    logoutUser();
    setIsLoggedIn(false);
  };

  const handleLogin = async (values, actions) => {
    try {
      const loginResult = await loginUser(values, navigate);
      if (loginResult) {
        setIsLoggedIn(true);
        // TODO: navigate to where user came from, not always home
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    actions.setSubmitting(false);
  };

  return (
    <div className={classes.loginField}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      {isLoggedIn ? (
        <div className={classes.buttonDiv}>
          <button onClick={handleLogout} className={classes.button}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h1 className={classes.loginName}>Login</h1>
          <p className={classes.signupSubtitle}>Welcome back! Log in to generate a date plan</p>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}>
            {({ isSubmitting }) => (
              <Form>
                <label htmlFor="email" className={classes.label}>
                  Email
                </label>
                <Field type="email" name="email" placeholder="email" className={classes.input} />

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
                    placeholder="password"
                    className={classes.input}
                  />
                  <span className={classes.eye} onClick={props.togglePassword}>
                    <i id="toggler" className="far fa-eye"></i>
                  </span>
                </div>

                <div className={classes.error}>
                  <ErrorMessage name="password" component="div" className={classes.error_message} />
                </div>
                <label className={classes.terms} htmlFor="rememberMe">
                  <input
                    type={'checkbox'}
                    name="rememberMe"
                    className={classes.checkbox}
                    id="rememberMe"
                  />
                  <div className={classes.checkbox_input}></div>
                  <p>
                    <span>Remember me</span>
                    <NavLink to="/reset-password">
                      <span className={classes.forgotPassword}>Forgot password?</span>
                    </NavLink>
                  </p>
                </label>

                <div className={classes.buttonDiv}>
                  {errorMessage && <div className={classes.error_message}>{errorMessage}</div>}
                </div>

                <div className={classes.buttonDiv}>
                  <button type="submit" className={classes.button}>
                    Submit
                  </button>
                </div>
                <div>
                  <NavLink to="/signup">
                    <div className={classes.already}>
                      Don&apos;t have account? <span className={classes.underline}>Sign Up</span>
                    </div>
                  </NavLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
