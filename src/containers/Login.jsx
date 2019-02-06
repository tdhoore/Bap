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
      <main>
        <section className="loginHolder">
          <header>
            <h2>Inloggen</h2>
          </header>
          <div className="colorBg colorBgTop lastSection">
            <article>
              <header>
                <h3 className="hide">login</h3>
              </header>
              <form onSubmit={e => handleLogin(e)}>
                <label htmlFor="emailaddress">
                  <span>E-mail</span>
                  <input
                    type="email"
                    name="email"
                    id="emailaddress"
                    placeholder="naam@mail.com"
                  />
                </label>
                <label htmlFor="passwordinput">
                  <span>Wachtwoord</span>
                  <input
                    type="password"
                    name="password"
                    id="passwordinput"
                    placeholder="wachtwoord"
                  />
                </label>
                <Link to="/register" className="ww-vergeten">
                  Wachtwoord vergeten?
                </Link>
                <button type="submit" className="btn loginBtn">
                  Inloggen
                </button>
              </form>
            </article>
            <article className="registerHolder">
              <header>
                <h3 className="vraag">Nog geen account?</h3>
              </header>
              <Link to="/register" className="ghostBtn">
                Registreer
              </Link>
            </article>
          </div>
        </section>
      </main>
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
