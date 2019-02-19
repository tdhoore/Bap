/* eslint-disable no-unused-vars */
import React from "react";
import { observer } from "mobx-react";
import StepCounter from "./StepCounter.jsx";

const UserTypeSelector = ({ store }) => {
  const handleUserType = e => {
    const value = parseInt(e.currentTarget.value);
    store.formObject.type = value;

    //update stepCounter
    if (value === 0) {
      //klant
      store.maxSteps = 3;
    } else if (value === 1) {
      //maker
      store.maxSteps = 5;
    } else {
      //ergo
      store.maxSteps = 8;
    }
  };

  const handleNextPage = e => {
    e.preventDefault();
    store.step++;
  };

  return (
    <article className="mainRegisterHolder userSelector">
      <header>
        <h2>Registreer</h2>
      </header>
      <form className="colorBg colorBgTop lastSection">
        <legend>Wat voor gebruiker ben je?</legend>
        <div className="typeHolder">
          <label htmlFor="klant">
            <span>Klant</span>
            <input
              type="radio"
              id="klant"
              value="0"
              name="usertype"
              onChange={e => handleUserType(e)}
            />
            <span className="selectedType klantType" />
          </label>
          <label htmlFor="maker">
            <span>maker</span>
            <input
              type="radio"
              id="maker"
              value="1"
              name="usertype"
              onChange={e => handleUserType(e)}
            />
            <span className="selectedType makerType" />
          </label>
          <label htmlFor="ergo">
            <span>ergo</span>
            <input
              type="radio"
              id="ergo"
              value="2"
              name="usertype"
              onChange={e => handleUserType(e)}
            />
            <span className="selectedType ergoType" />
          </label>
        </div>
        <StepCounter store={store} />
        <button onClick={e => handleNextPage(e)} className="btn">
          Volgende
        </button>
      </form>
    </article>
  );
};

export default observer(UserTypeSelector);
