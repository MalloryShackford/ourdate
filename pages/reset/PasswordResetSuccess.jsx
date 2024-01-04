import React from 'react'
import classes from '../../styles/pages/Login.module.css';
import { NavLink } from 'react-router-dom';

export default function PasswordResetSuccess() {
  return (
    <div className={classes.loginField}>
      <h1 className={classes.loginName}>Success!</h1>
      <p className={classes.signupSubtitle}>Your password was successfully reset. </p>

      <div className={classes.buttonDiv}>
        <NavLink to="/">
          <button className={classes.button}>
            View date Plan
          </button>
        </NavLink>

        <NavLink to="/">
          <button className={classes.button}>
            Back to home
          </button>
        </NavLink>
      </div>
    </div>
  )
}