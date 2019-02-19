/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";
import BodySelector from "./BodySelector.jsx";
import StepCounter from "./StepCounter.jsx";

const RegisterErgoStep1 = ({ store }) => {
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
        <legend>Klik op het lichaamsdeel die jouw specialisatie omvat</legend>
        <div className="formContentHolder formBodyHolder">
          <BodySelector store={store} />
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

export default observer(RegisterErgoStep1);
