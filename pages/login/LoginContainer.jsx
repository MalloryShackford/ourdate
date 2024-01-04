import React from 'react';
import LoginForm from './Login';
import classes from '../../styles/pages/Login.module.css';
import PropTypes from 'prop-types'

const LoginContainer = (props) => {
  const togglePassword = () => {
    const x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };

  const toggleConfirmPassword = () => {
    const x = document.getElementById('confirmation');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };

  return (
    <div className={classes.login} onSubmit={props.handleSubmit}>
      <LoginForm togglePassword={togglePassword} toggleConfirmPassword={toggleConfirmPassword} />
    </div>
  );
};

LoginContainer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
export default LoginContainer;
