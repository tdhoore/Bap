/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";
import defaultPic from "../assets/img/pic.jpg";

const RegisterClientStep1 = ({ store }) => {
  const handleRegister = e => {
    e.preventDefault();
    // store.register({
    //   email: e.target.email.value,
    //   password: e.target.password.value,
    //   feedback: store.feedback
    // });
  };

  const handleClientStep1 = e => {
    const input = e.currentTarget;
    if (input.name === "name") {
      store.formObject.name = input.value;
      console.log(`store.formObject.name:`, input.value);
    } else if (input.name === "email") {
      store.formObject.email = input.value;
    } else if (input.name === "profilepic") {
      const file = input.files[0];
      store.formObject.profilepicfile = file;
      store.formObject.profilepicurl = URL.createObjectURL(file);
      console.log(`PROFILEPICURL:`, store.formObject.profilepicurl);
    } else if (input.name === "password") {
      store.formObject.password = input.value;
    }
  };

  const showPicture = () => {
    if (store.formObject.profilepicurl === undefined) {
      return defaultPic;
    } else {
      return store.formObject.profilepicurl;
    }
  };

  const handleNextPage = e => {
    store.step++;
  };

  const handlePreviousPage = e => {
    store.step--;
  };

  return (
    <article className="">
      <header>
        <h2>registreer</h2>
      </header>
      <form onSubmit={e => handleRegister(e)}>
        <p className="auth-feedback">{store.feedback}</p>
        <div className="">
          <label htmlFor="profilepic" className="hide">
            profilepic
          </label>
          <div className="profilePictureDiv">
            <input
              type="file"
              name="profilepic"
              id="profilepic"
              accept="image/png,image/jpg"
              onChange={e => handleClientStep1(e)}
              required
            />
            <img src={showPicture()} alt="profielfoto" />
          </div>
        </div>
        <label htmlFor="naam">
          <span>Naam</span>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Voornaam Familienaam"
            onChange={e => handleClientStep1(e)}
            required
          />
        </label>
        <div className="">
          <label htmlFor="emailaddress">
            <span>E-mailadres</span>
            <input
              type="email"
              name="email"
              id="emailaddress"
              placeholder="billie@mail.com"
              onChange={e => handleClientStep1(e)}
              required
            />
          </label>
          <p className="">We delen jouw e-mailadres nooit met iemand anders.</p>
        </div>
        <div className="">
          <label htmlFor="passwordinput">
            <span>Wachtwoord</span>
            <input
              type="password"
              name="password"
              className=""
              id="passwordinput"
              placeholder="Wachtwoord"
              onChange={e => handleClientStep1(e)}
              required
            />
          </label>
        </div>
        <button onClick={e => handlePreviousPage(e)}>Vorige</button>
        <button onClick={e => handleNextPage(e)}>Volgende</button>
      </form>
    </article>
  );
};

export default observer(RegisterClientStep1);
