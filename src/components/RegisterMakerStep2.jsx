/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";

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
    <article className="">
      <header>
        <h2>registreer</h2>
      </header>
      <form className="">
        <p className="">Wat zijn jouw hobby's?</p>
        <label htmlFor="piano">
          <span>Piano</span>
          <input
            type="checkbox"
            name="hobby"
            id="piano"
            value="piano"
            onChange={e => handleMakerHobby(e)}
          />
        </label>
        <label htmlFor="tennis">
          <span>Tennis</span>
          <input
            type="checkbox"
            name="hobby"
            id="tennis"
            value="tennis"
            onChange={e => handleMakerHobby(e)}
          />
        </label>
        <label htmlFor="pottenbakken">
          <span>Pottenbakken</span>
          <input
            type="checkbox"
            name="hobby"
            id="pottenbakken"
            value="pottenbakken"
            onChange={e => handleMakerHobby(e)}
          />
        </label>
        <label htmlFor="gitaar">
          <span>Gitaar</span>
          <input
            type="checkbox"
            name="hobby"
            id="gitaar"
            value="gitaar"
            onChange={e => handleMakerHobby(e)}
          />
        </label>
        <label htmlFor="andereCheckbox">
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
        </label>
        <button onClick={e => handlePreviousPage(e)}>Vorige</button>
        <button onClick={e => handleNextPage(e)}>Volgende</button>
      </form>
    </article>
  );
};

export default observer(RegisterMakerStep2);
