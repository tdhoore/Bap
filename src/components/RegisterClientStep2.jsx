/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";

const RegisterClientStep2 = ({ store }) => {
  //   const handleSumbitForm = e => {
  //   e.preventDefault();
  //   store.register({
  //     email: e.target.email.value,
  //     password: e.target.password.value,
  //     feedback: store.feedback
  //   });
  // };

  const handleClientStep2 = (e) => {
    store.formObject.name = e.target.name.value;
    console.log('e target value:', e.target.name.value);
    store.formObject.email = e.target.email.value;
    // store.formObject.profilepic = e.currentTarget.value;
  };

  const handleNextPage = e => {
    store.step++;
  };

  const handlePreviousPage = e => {
    store.step--;
  };

  return (
    <div className="">
      {/* <form onSubmit={e => handleRegister(e)}> */}
        <p className="auth-feedback">{store.feedback}</p>
        <div className="">
          <label htmlFor="stad">Stad</label>
          <input
            type="text"
            name="stad"
            id="stad"
            placeholder="Stad"
            onChange={e => handleClientStep2(e)}
          />
        </div>
        <div className="">
          <label htmlFor="birthday">Leeftijd</label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            onChange={e => handleClientStep2(e)}
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
        {/* <button onClick={e => handleSumbitForm(e)}>Registreer</button> */}
        {/* <button type='submit'>Registreer</button> */}
    </div>
  );
};

export default observer(RegisterClientStep2);
