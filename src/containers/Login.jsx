/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import * as firebase from "firebase";
import { observer } from "mobx-react";

const Login = ({ store }) => {
  const handleLogin = e => {
    e.preventDefault();
    store.login({
      email: e.target.email.value,
      password: e.target.password.value,
      feedback: store.feedback
    });
  };

  if (store.user) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="login-div">
        <h2 className="titleCSS">Inloggen</h2>
        <div className="orange-background">
          <form onSubmit={e => handleLogin(e)} className="login-form">
            <div className="login-field">
              <label htmlFor="emailaddress" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="emailaddress"
                className="form-input"
                placeholder="croissant@baguette.fr"
              />
            </div>
            <div className="login-field">
              <label htmlFor="passwordinput" className="form-label">
                Wachtwoord
              </label>
              <input
                type="password"
                name="password"
                className="form-input"
                id="passwordinput"
                placeholder="wachtwoord"
              />
            </div>
            <span>
              <Link to="/register" className="ww-vergeten">
                Wachtwoord vergeten?
              </Link>
            </span>
            <button type="submit" className="btn">
              Inloggen
            </button>
          </form>
          <div className="redirect-div">
            <p className="vraag">Nog geen account?</p>
            <Link to="/register" className="ghostBtn">
              Registreer
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default observer(Login);
