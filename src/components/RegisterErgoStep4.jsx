/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";
import StepCounter from "./StepCounter.jsx";

const RegisterErgoStep3 = ({ store }) => {
  const handleNextPage = e => {
    e.preventDefault();
    store.step++;
  };

  const handlePreviousPage = e => {
    e.preventDefault();
    store.step--;
  };

  return (
    <article className="mainRegisterHolder">
      <header>
        <h2>registreer</h2>
      </header>
      <form className="colorBg colorBgTop lastSection">
        <div className="formContentHolder withAge">
          <legend>Upload je diploma</legend>
          <div className="upload-diploma">
            <img src="assets/img/diploma.svg" alt="upload diploma"/>
            <p className='diploma-uitleg'>We vragen dit voor de credibiliteit van D4E1, zodat niet iedereen zich als ergotherapeut kan profileren.</p>
          </div>
        </div>
        <StepCounter store={store} />
        <div className="prevAndNextHolder">
          <button onClick={e => handlePreviousPage(e)} className="ghostBtn">
            Vorige
          </button>
          <button onClick={e => handleNextPage(e)} className="btn">
            Volgende
          </button>
        </div>
      </form>
    </article>
  );
};

export default observer(RegisterErgoStep3);
