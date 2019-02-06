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
        <div className="">
          <label htmlFor="specialisatie">Amputatie</label>
          <input
            type="checkbox"
            name="specialisatie"
            id="amputatie"
            value="amputatie"
            onChange={e => handleErgoSpecialisation(e)}
          />
        </div>
        <div className="">
          <label htmlFor="parkinson">Ziekte van Parkinson</label>
          <input
            type="checkbox"
            name="specialisatie"
            id="parkinson"
            value="parkinson"
            onChange={e => handleErgoSpecialisation(e)}
          />
        </div>
        <div className="">
          <label htmlFor="als">ALS</label>
          <input
            type="checkbox"
            name="specialisatie"
            id="als"
            value="als"
            onChange={e => handleErgoSpecialisation(e)}
          />
        </div>
        <div className="">
          <label htmlFor="spierdystrofie">Spierdystrofie</label>
          <input
            type="checkbox"
            name="specialisatie"
            id="spierdystrofie"
            value="spierdystrofie"
            onChange={e => handleErgoSpecialisation(e)}
          />
        </div>

        <div className="">
          <label htmlFor="andereCheckbox">Andere:</label>
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
        </div>

        <button onClick={e => handlePreviousPage(e)}>Vorige</button>
        <button onClick={e => handleNextPage(e)}>Volgende</button>
      </form>
    </article>
  );
};

export default observer(RegisterErgoStep2);
