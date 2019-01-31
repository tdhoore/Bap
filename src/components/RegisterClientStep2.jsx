/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";

const RegisterClientStep2 = ({ store }) => {
    const handleSumbitForm = e => {
    e.preventDefault();
    store.register();
  };

  const handleLocation = (e) => {
    // store.formObject.location = e.target.name.value;
  };

  const handleBirthday = (e) => {
    store.formObject.birthday = e.target.name.value;
  };

  const handlePreviousPage = e => {
    e.preventDefault();
    store.step--;
  };

  return (
    <div className="">
      <form>
        <div className="">
          <label htmlFor="stad">Stad</label>
          <input
            type="text"
            name="stad"
            id="stad"
            placeholder="Stad"
            onChange={e => handleLocation(e)}
          />
        </div>
        <div className="">
          <label htmlFor="birthday">Leeftijd</label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            onChange={e => handleBirthday(e)}
          />
        </div>
        <div className="">
          <label htmlFor="algemenevoorwaarden">Ik ga akkoord met de algemene 
voorwaarden</label>
          <input
            type="checkbox"
            name="algemenevoorwaarden"
            id="algemenevoorwaarden"
          />
        </div>
        <button onClick={e => handlePreviousPage(e)}>Vorige</button>
        <button onClick={e => handleSumbitForm(e)}>Registreer</button>
      </form>
    </div>
  );
};

export default observer(RegisterClientStep2);
