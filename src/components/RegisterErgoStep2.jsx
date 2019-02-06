/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";

const RegisterErgoStep2 = ({ store }) => {
  const andereInputRef = React.createRef();
  const handleErgoSpecialisation = e => {
    if (e.currentTarget.name === "andereCheckbox") {
      if (e.currentTarget.checked) {
        andereInputRef.current.disabled = false;
      } else {
        andereInputRef.current.disabled = true;
      }
    } else {
      if (store.formObject.specialisation === undefined) {
        store.formObject.specialisation = [];
      }
      store.formObject.specialisation.push(e.currentTarget.value);
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
        <p>Wat houdt je specialisatie in?</p>
        <label htmlFor="specialisatie">
          <span>Amputatie</span>
          <input
            type="checkbox"
            name="specialisatie"
            id="amputatie"
            value="amputatie"
            onChange={e => handleErgoSpecialisation(e)}
          />
        </label>
        <label htmlFor="parkinson">
          <span>Ziekte van Parkinson</span>
          <input
            type="checkbox"
            name="specialisatie"
            id="parkinson"
            value="parkinson"
            onChange={e => handleErgoSpecialisation(e)}
          />
        </label>
        <label htmlFor="als">
          <span>ALS</span>
          <input
            type="checkbox"
            name="specialisatie"
            id="als"
            value="als"
            onChange={e => handleErgoSpecialisation(e)}
          />
        </label>
        <label htmlFor="spierdystrofie">
          <span>Spierdystrofie</span>
          <input
            type="checkbox"
            name="specialisatie"
            id="spierdystrofie"
            value="spierdystrofie"
            onChange={e => handleErgoSpecialisation(e)}
          />
        </label>
        <label htmlFor="andereCheckbox">
          <span>Andere:</span>
          <input
            type="checkbox"
            name="specialisatie"
            id="andereCheckbox"
            onChange={e => handleErgoSpecialisation(e)}
          />
          <input
            type="text"
            name="specialisatie"
            onChange={e => handleErgoSpecialisation(e)}
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

export default observer(RegisterErgoStep2);
