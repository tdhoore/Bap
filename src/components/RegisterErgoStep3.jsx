/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";

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
    <article className="">
      <header>
        <h2>registreer</h2>
      </header>
      <form className="">
        <p>Welke leeftijd van klant vergt je voorkeur?</p>
        <div className="">
          <label htmlFor="kinderen">Kinderen (0 - 12 jaar)</label>
          <input
            type="radio"
            name="ageCategory"
            id="kinderen"
            value="kinderen"
            onChange={e => handleErgoClientAge(e)}
          />
        </div>
        <div className="">
          <label htmlFor="jongeren">Jongeren (13 - 17 jaar)</label>
          <input
            type="radio"
            name="ageCategory"
            id="jongeren"
            value="jongeren"
            onChange={e => handleErgoClientAge(e)}
          />
        </div>
        <div className="">
          <label htmlFor="volwassenen">Volwassenen (18 - 60 jaar)</label>
          <input
            type="radio"
            name="ageCategory"
            id="volwassenen"
            value="volwassenen"
            onChange={e => handleErgoClientAge(e)}
          />
        </div>
        <div className="">
          <label htmlFor="ouderen">Ouderen (60+ jaar)</label>
          <input
            type="radio"
            name="ageCategory"
            id="ouderen"
            value="ouderen"
            onChange={e => handleErgoClientAge(e)}
          />
        </div>
        <button onClick={e => handlePreviousPage(e)}>Vorige</button>
        <button onClick={e => handleNextPage(e)}>Volgende</button>
      </form>
    </article>
  );
};

export default observer(RegisterErgoStep3);
