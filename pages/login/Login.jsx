import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import classes from '../../styles/pages/Login.module.css';
import { useAuth } from '../../context/authContext';
import GoogleLogin from '../../components/google/GoogleLogin';
import PropTypes from 'prop-types'
import logo from '../../assets/logo.svg';
import ourdateLogo from '../../assets/ourdate-logo.svg';
import tableCouple from '../../assets/table-couple.svg';
import waveImg from '../../assets/wave.svg';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
});

const LoginForm = (props) => {
  const navigate = useNavigate(); // For the automatic navigation
  const [errorMessage, setErrorMessage] = useState('');
  // const { setIsLoggedIn } = useAuth();
  const { setIsLoggedIn, loginUser } = useAuth();

  const handleLogin = async (values, actions) => {
    try {
      console.log(values)
      const loginResult = await loginUser(values);
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


  const handleGoogleSignUpSuccess = (response) => {
    const idToken = response.credential;
    localStorage.setItem('token', idToken);
    // localStorage.setItem('refreshToken', idToken)
  };
  return (
    <>
    <div className={classes.waveContainer}>
    <div className={classes.parentDiv}>
    <div className={classes.loginImage}>
       <h1 className={classes.signupH1}>Welcome back.</h1>
      <p className={classes.signupP}>Sign in to access a curated selection of date ideas tailored to your preferences.</p>
      <img className={classes.signupImg} src={tableCouple} alt="couple on bike"/>
    </div>
    <div className={classes.loginField}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div>
        <img className={classes.ourdateLogo} src={ourdateLogo} alt="ourdate-logo" />
        <h1 className={classes.loginName}>Login</h1>
        <img className={classes.logo} src={logo} alt="ourdate-logo"/>
        {/* <p className={classes.signupSubtitle}>Welcome back! Log in to generate a date plan</p> */}
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
              <Field type="email" name="email"className={classes.input} />

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
                  className={classes.input}
                />
                <span className={classes.eye} onClick={props.togglePassword}>
                  <i id="toggler" className="far fa-eye"></i>
                </span>
              </div>

              <div className={classes.error}>
                <ErrorMessage name="password" component="div" className={classes.error_message} />
              </div>
              {/* <label className={classes.terms} htmlFor="rememberMe">
                <input
                  type={'checkbox'}
                  name="rememberMe"
                  className={classes.checkbox}
                  id="rememberMe"
                />
                <div className={classes.checkbox_input}></div>
                Remember me
              </label> */}
              {/* <div className={classes.buttonDiv}>
                {errorMessage && <div className={classes.error_message}>{errorMessage}</div>}
              </div>
              <div className={classes.error}>
                <ErrorMessage name="password" component="div" className={classes.error_message} />
              </div> */}

              <div className={classes.buttonDiv}>
                <button type="submit" className={classes.button} disabled={isSubmitting}>
                  Sign in
                </button>
              </div>
              <div
                className="classes.orSection"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'center',
                  margin: 'auto',
                  marginBottom: '1.3rem',
                  color: '#A0A0A0',
                }}>
                <hr style={{ flex: 1, borderTop: '1px solid #A0A0A0', margin: '0 10px' }} />
                <span>or</span>
                <hr style={{ flex: 1, borderTop: '1px solid #A0A0A0', margin: '0 10px' }} />
              </div>
              <GoogleLogin onSuccess={handleGoogleSignUpSuccess} />
              {/* <GoogleLoginButton onSuccess={handleGoogleSignUpSuccess}/> */}
              <div>
                <NavLink to="/signup">
                  <div className={classes.already}>
                    Don&apos;t have an account? <span className={classes.underline}>Sign up</span>
                  </div>
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/* )} */}
    </div>
    </div>
    <img className={classes.waveImg} src={waveImg} alt="wave"/>
    </div>
    </>
  );
};

LoginForm.propTypes = {
  togglePassword: PropTypes.func.isRequired,
}
export default LoginForm;
