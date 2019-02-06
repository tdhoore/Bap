/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";
import BodySelector from "./BodySelector.jsx";

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
    <article className="">
      <header>
        <h2>registreer</h2>
      </header>
      <form className="">
        <p>Klik op het lichaamsdeel die jouw specialisatie omvat</p>
        <BodySelector store={store} />
        <button onClick={e => handlePreviousPage(e)}>Vorige</button>
        <button onClick={e => handleNextPage(e)}>Volgende</button>
      </form>
    </article>
  );
};

export default observer(RegisterErgoStep1);
