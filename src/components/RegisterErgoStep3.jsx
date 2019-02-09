/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";
import StepCounter from "./StepCounter.jsx";

const RegisterErgoStep3 = ({ store }) => {
  const handleErgoClientAge = e => {
    store.formObject.ageCategory = e.currentTarget.value;
  };

  const handleNextPage = e => {
    e.preventDefault();
    store.step++;
  };

  const handlePreviousPage = e => {
    e.preventDefault();
    store.step--;
  };

  return (
    <article className="mainRegisterHolder">
      <header>
        <h2>registreer</h2>
      </header>
      <form className="colorBg colorBgTop lastSection">
        <div className="formContentHolder withAge">
          <legend>Welke leeftijd van klant vergt je voorkeur?</legend>
          <div className="leeftijdHolder">
            <label htmlFor="kinderen">
              <span>
                Kinderen <br />0 - 12
              </span>
              <input
                type="checkbox"
                name="ageCategory"
                id="kinderen"
                value="kinderen"
                onChange={e => handleErgoClientAge(e)}
              />
              <span className="leeftijdCheckbox" />
            </label>
            <label htmlFor="jongeren">
              <span>
                Jongeren
                <br />
                13 - 17
              </span>
              <input
                type="checkbox"
                name="ageCategory"
                id="jongeren"
                value="jongeren"
                onChange={e => handleErgoClientAge(e)}
              />
              <span className="leeftijdCheckbox" />
            </label>
            <label htmlFor="volwassenen">
              <span>
                Volwassenen
                <br />
                18 - 60
              </span>
              <input
                type="checkbox"
                name="ageCategory"
                id="volwassenen"
                value="volwassenen"
                onChange={e => handleErgoClientAge(e)}
              />
              <span className="leeftijdCheckbox" />
            </label>
            <label htmlFor="ouderen">
              <span>
                Ouderen
                <br />
                60+
              </span>
              <input
                type="checkbox"
                name="ageCategory"
                id="ouderen"
                value="ouderen"
                onChange={e => handleErgoClientAge(e)}
              />
              <span className="leeftijdCheckbox" />
            </label>
          </div>
        </div>
        <StepCounter store={store} />
        <div className="prevAndNextHolder">
          <button onClick={e => handlePreviousPage(e)} className="ghostBtn">
            Vorige
          </button>
          <button onClick={e => handleNextPage(e)} className="btn">
            Volgende
          </button>
        </div>
      </form>
    </article>
  );
};

export default observer(RegisterErgoStep3);
