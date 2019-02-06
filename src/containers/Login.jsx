/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { observer } from "mobx-react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";

const Login = ({ store }) => {
  const handleLogin = e => {
    e.preventDefault();
    store.login({
      email: e.target.email.value,
      password: e.target.password.value,
      feedback: store.feedback
    });
  };

  const displayLogin = () => {
    return (
      <section className="login-div">
        <header>
          <h2 className="titleCSS">Inloggen</h2>
        </header>
        <div className="orange-background">
          <article>
            <header>
              <h3 className="hide">login</h3>
            </header>
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
          </article>
          <article className="redirect-div">
            <header>
              <h3 className="vraag">Nog geen account?</h3>
            </header>
            <Link to="/register" className="ghostBtn">
              Registreer
            </Link>
          </article>
        </div>
      </section>
    );
  };

  if (store.user) {
    return <Redirect to="/" />;
  } else {
    return (
      <DefaultPageHolder
        store={store}
        main={displayLogin()}
        activeLink="/login"
      />
    );
  }
};

export default observer(Login);
