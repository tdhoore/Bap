/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";

const RegisterClientStep2 = ({ store }) => {
  const handleSumbitForm = e => {
    e.preventDefault();
    store.register();
  };

  const handleLocation = e => {
    // store.formObject.location = e.target.name.value;
  };

  const handleBirthday = e => {
    store.formObject.birthday = e.target.value;
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
      <form>
        <label htmlFor="stad">
          <span>Stad</span>
          <input
            type="text"
            name="stad"
            id="stad"
            placeholder="Stad"
            onChange={e => handleLocation(e)}
          />
        </label>
        <label htmlFor="birthday">
          <span>Leeftijd</span>
          <input
            type="date"
            name="birthday"
            id="birthday"
            onChange={e => handleBirthday(e)}
          />
        </label>
        <label htmlFor="algemenevoorwaarden">
          <span>Ik ga akkoord met de algemene voorwaarden</span>
          <input
            type="checkbox"
            name="algemenevoorwaarden"
            id="algemenevoorwaarden"
          />
        </label>
        <button onClick={e => handlePreviousPage(e)}>Vorige</button>
        <button onClick={e => handleSumbitForm(e)}>Registreer</button>
      </form>
    </article>
  );
};

export default observer(RegisterClientStep2);
