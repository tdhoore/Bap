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
        <div className="">
          <label htmlFor="piano">Piano</label>
          <input
            type="checkbox"
            name="hobby"
            id="piano"
            value="piano"
            onChange={e => handleMakerHobby(e)}
          />
        </div>
        <div className="">
          <label htmlFor="tennis">Tennis</label>
          <input
            type="checkbox"
            name="hobby"
            id="tennis"
            value="tennis"
            onChange={e => handleMakerHobby(e)}
          />
        </div>
        <div className="">
          <label htmlFor="pottenbakken">Pottenbakken</label>
          <input
            type="checkbox"
            name="hobby"
            id="pottenbakken"
            value="pottenbakken"
            onChange={e => handleMakerHobby(e)}
          />
        </div>
        <div className="">
          <label htmlFor="gitaar">Gitaar</label>
          <input
            type="checkbox"
            name="hobby"
            id="gitaar"
            value="gitaar"
            onChange={e => handleMakerHobby(e)}
          />
        </div>

        <div className="">
          <label htmlFor="andereCheckbox">Andere:</label>
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
        </div>
        <button onClick={e => handlePreviousPage(e)}>Vorige</button>
        <button onClick={e => handleNextPage(e)}>Volgende</button>
      </form>
    </article>
  );
};

export default observer(RegisterMakerStep2);
