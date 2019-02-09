/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";
import StepCounter from "./StepCounter.jsx";

const RegisterMakerStep1 = ({ store }) => {
  // referentie aangemaakt om inputveld 'andere' aan te spreken en te kunnen disablen of enablen
  const andereInputRef = React.createRef();
  const handleMakerSkills = e => {
    if (e.currentTarget.name === "andereCheckbox") {
      if (e.currentTarget.checked) {
        andereInputRef.current.disabled = false;
      } else {
        andereInputRef.current.disabled = true;
      }
    } else {
      if (store.formObject.skills === undefined) {
        store.formObject.skills = [];
      }
      store.formObject.skills.push(e.currentTarget.value);
    }
  };

  const handlePreviousPage = e => {
    e.preventDefault();
    store.step--;
  };

  const handleNextPage = e => {
    e.preventDefault();
    store.step++;
  };

  return (
    <article className="mainRegisterHolder">
      <header>
        <h2>registreer</h2>
      </header>
      <form className="colorBg colorBgTop lastSection">
        <div className="formContentHolder">
          <legend>Wat zijn jouw vaardigheden?</legend>
          <label htmlFor="lasercutten" className="labelWithCheckbox">
            <span>Lasercutten</span>
            <input
              type="checkbox"
              name="skills"
              id="lasercutten"
              value="lasercutten"
              onChange={e => handleMakerSkills(e)}
            />
            <span className="customCheckBox" />
          </label>
          <label htmlFor="3dprinten" className="labelWithCheckbox">
            <span>3D printen</span>
            <input
              type="checkbox"
              name="skills"
              id="3dprinten"
              value="3dprinten"
              onChange={e => handleMakerSkills(e)}
            />
            <span className="customCheckBox" />
          </label>
          <label htmlFor="houtbewerking" className="labelWithCheckbox">
            <span>Houtbewerking</span>
            <input
              type="checkbox"
              name="skills"
              id="houtbewerking"
              value="houtbewerking"
              onChange={e => handleMakerSkills(e)}
            />
            <span className="customCheckBox" />
          </label>
          <label htmlFor="metaalbewerking" className="labelWithCheckbox">
            <span>Metaalbewerking</span>
            <input
              type="checkbox"
              name="skills"
              id="metaalbewerking"
              value="metaalbewerking"
              onChange={e => handleMakerSkills(e)}
            />
            <span className="customCheckBox" />
          </label>
          <label htmlFor="andereCheckbox" className="labelWithCheckbox">
            <span>Andere:</span>
            <input
              type="checkbox"
              name="skills"
              id="andereCheckbox"
              onChange={e => handleMakerSkills(e)}
            />
            <span className="customCheckBox" />
            <input
              type="text"
              name="skills"
              onChange={e => handleMakerSkills(e)}
              disabled
              ref={andereInputRef}
            />
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

export default observer(RegisterMakerStep1);
