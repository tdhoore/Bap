/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";
import StepCounter from "./StepCounter.jsx";

const RegisterMakerStep2 = ({ store }) => {
  const andereInputRef = React.createRef();
  const handleMakerHobby = e => {
    if (e.currentTarget.name === "andereCheckbox") {
      if (e.currentTarget.checked) {
        andereInputRef.current.disabled = false;
      } else {
        andereInputRef.current.disabled = true;
      }
    } else {
      if (store.formObject.hobby === undefined) {
        store.formObject.hobby = [];
      }
      store.formObject.hobby.push(e.currentTarget.value);
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
          <legend>Wat zijn jouw hobby's?</legend>
          <label htmlFor="piano" className="labelWithCheckbox">
            <span>Piano</span>
            <input
              type="checkbox"
              name="hobby"
              id="piano"
              value="piano"
              onChange={e => handleMakerHobby(e)}
            />
            <span className="customCheckBox" />
          </label>
          <label htmlFor="tennis" className="labelWithCheckbox">
            <span>Tennis</span>
            <input
              type="checkbox"
              name="hobby"
              id="tennis"
              value="tennis"
              onChange={e => handleMakerHobby(e)}
            />
            <span className="customCheckBox" />
          </label>
          <label htmlFor="pottenbakken" className="labelWithCheckbox">
            <span>Pottenbakken</span>
            <input
              type="checkbox"
              name="hobby"
              id="pottenbakken"
              value="pottenbakken"
              onChange={e => handleMakerHobby(e)}
            />
            <span className="customCheckBox" />
          </label>
          <label htmlFor="gitaar" className="labelWithCheckbox">
            <span>Gitaar</span>
            <input
              type="checkbox"
              name="hobby"
              id="gitaar"
              value="gitaar"
              onChange={e => handleMakerHobby(e)}
            />
            <span className="customCheckBox" />
          </label>
          <label htmlFor="andereCheckbox" className="labelWithCheckbox">
            <span>Andere:</span>
            <input
              type="checkbox"
              name="hobby"
              id="andereCheckbox"
              onChange={e => handleMakerHobby(e)}
            />
            <input
              type="text"
              name="hobby"
              onChange={e => handleMakerHobby(e)}
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

export default observer(RegisterMakerStep2);
