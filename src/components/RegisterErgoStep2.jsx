/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";
import StepCounter from "./StepCounter.jsx";

const RegisterErgoStep2 = ({ store }) => {
  const andereInputRef = React.createRef();
  const handleErgoSpecialisation = e => {
    if (e.currentTarget.name === "andereCheckbox") {
      if (e.currentTarget.checked) {
        andereInputRef.current.disabled = false;
      } else {
        andereInputRef.current.disabled = true;
      }
    } else {
      if (store.formObject.specialisation === undefined) {
        store.formObject.specialisation = [];
      }
      store.formObject.specialisation.push(e.currentTarget.value);
    }
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
        <div className="formContentHolder">
          <legend>Wat houdt je specialisatie in?</legend>
          <label htmlFor="specialisatie" className="labelWithCheckbox">
            <span>Amputatie</span>
            <input
              type="checkbox"
              name="specialisatie"
              id="amputatie"
              value="amputatie"
              onChange={e => handleErgoSpecialisation(e)}
            />
            <span className="customCheckBox" />
          </label>
          <label htmlFor="parkinson" className="labelWithCheckbox">
            <span>Ziekte van Parkinson</span>
            <input
              type="checkbox"
              name="specialisatie"
              id="parkinson"
              value="parkinson"
              onChange={e => handleErgoSpecialisation(e)}
            />
            <span className="customCheckBox" />
          </label>
          <label htmlFor="als" className="labelWithCheckbox">
            <span>ALS</span>
            <input
              type="checkbox"
              name="specialisatie"
              id="als"
              value="als"
              onChange={e => handleErgoSpecialisation(e)}
            />
            <span className="customCheckBox" />
          </label>
          <label htmlFor="spierdystrofie" className="labelWithCheckbox">
            <span>Spierdystrofie</span>
            <input
              type="checkbox"
              name="specialisatie"
              id="spierdystrofie"
              value="spierdystrofie"
              onChange={e => handleErgoSpecialisation(e)}
            />
            <span className="customCheckBox" />
          </label>
          <label htmlFor="andereCheckbox" className="labelWithCheckbox">
            <span>Andere:</span>
            <input
              type="checkbox"
              name="specialisatie"
              id="andereCheckbox"
              onChange={e => handleErgoSpecialisation(e)}
            />
            <input
              type="text"
              name="specialisatie"
              onChange={e => handleErgoSpecialisation(e)}
              disabled
              ref={andereInputRef}
            />
            <span className="customCheckBox" />
          </label>
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

export default observer(RegisterErgoStep2);
