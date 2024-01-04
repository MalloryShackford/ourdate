import React from 'react';
import classes from '../../styles/pages/Login.module.css';
import Signup from './Signup';
import PropTypes from 'prop-types'

const SignupContainer = (props) => {
  const togglePassword = () => {
    const x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };

  // const toggleConfirmPassword = () => {
  //   const x = document.getElementById('confirmation');
  //   if (x.type === 'password') {
  //     x.type = 'text';
  //   } else {
  //     x.type = 'password';
  //   }
  // };

  return (
    <div className={classes.login} onSubmit={props.handleSignup}>
      <Signup togglePassword={togglePassword} 
      // toggleConfirmPassword={toggleConfirmPassword} 
      />
    </div>
  );
};

SignupContainer.propTypes = {
  handleSignup: PropTypes.func.isRequired,
}

export default SignupContainer;
