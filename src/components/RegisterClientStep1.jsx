/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";

const RegisterClientStep1 = ({ store }) => {
  // const handleRegister = e => {
  //   e.preventDefault();
  //   store.register({
  //     email: e.target.email.value,
  //     password: e.target.password.value,
  //     feedback: store.feedback
  //   });
  // };

  const handleClientStep1 = (e) => {
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

  // onSubmit={e => handleRegister(e)}

  return (
    <div className="">
        <p className="auth-feedback">{store.feedback}</p>
        {/* <div className=''>
        <label htmlFor='profilepic' className='hide'>profilepic</label>
          <input 
            type='image' 
            name='profilepic' 
            id='profilepic'
            alt='profilepic'
          /> 
        </div> */}
        <div className="">
          <label htmlFor="naam">Naam</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Voornaam Familienaam"
            onChange={e => handleClientStep1(e)}
          />
        </div>
        <div className="">
          <label htmlFor="emailaddress">E-mailadres</label>
          <input
            type="email"
            name="email"
            id="emailaddress"
            placeholder="billie@mail.com"
            onChange={e => handleClientStep1(e)}
          />
          <p className="">We delen jouw e-mailadres nooit met iemand anders.</p>
        </div>
        <div className="">
          <label htmlFor="passwordinput">Wachtwoord</label>
          <input
            type="password"
            name="password"
            className=""
            id="passwordinput"
            placeholder="Wachtwoord"
          />
        </div>
        <button onClick={e => handlePreviousPage(e)}>Vorige</button>
        <button onClick={e => handleNextPage(e)}>Volgende</button>
    </div>
  );
};

export default observer(RegisterClientStep1);
