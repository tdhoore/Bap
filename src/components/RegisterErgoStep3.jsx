/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";

const RegisterErgoStep3 = ({ store }) => {
  const handleErgoClientAge = (e) => {
    store.formObject.ageCategory = e.currentTarget.value;
  };
  
  const handleNextPage = e => {
    store.step++;
  };

  const handlePreviousPage = e => {
    store.step--;
  };


  return (
    <div className="">
        <div className="">
          <p>Welke leeftijd van klant vergt je voorkeur?</p>
          <div className=''>
        <label htmlFor='kinderen'>Kinderen</label>
          <input 
            type='radio' 
            name='kinderen' 
            id='kinderen' 
            onChange={e => handleErgoClientAge(e)}/> 
        </div>
        <div className=''>
        <label htmlFor='jongeren'>Jongeren</label>
          <input 
            type='radio' 
            name='jongeren' 
            id='jongeren' 
            onChange={e => handleErgoClientAge(e)}/> 
        </div>
        <div className=''>
        <label htmlFor='volwassenen'>Volwassenen</label>
          <input 
            type='radio' 
            name='volwassenen' 
            id='volwassenen' 
            onChange={e => handleErgoClientAge(e)}/> 
        </div>
        <div className=''>
        <label htmlFor='ouderen'>Ouderen</label>
          <input 
            type='radio' 
            name='ouderen' 
            id='ouderen' 
            onChange={e => handleErgoClientAge(e)}/> 
        </div>
        </div>
        <button onClick={e => handlePreviousPage(e)}>Vorige</button>
        <button onClick={e => handleNextPage(e)}>Volgende</button>
    </div>
  );
};

export default observer(RegisterErgoStep3);
