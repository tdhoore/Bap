/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";

const RegisterErgoStep2 = ({ store }) => {
  const andereInputRef = React.createRef();
  const handleErgoSpecialisation = (e) => {
    if(e.currentTarget.name === "andereCheckbox"){
      if(e.currentTarget.checked){
        andereInputRef.current.disabled = false;
      } else {
        andereInputRef.current.disabled = true;
      }
    } else {
      if(store.formObject.specialisation === undefined){
        store.formObject.specialisation = [];
      }
      store.formObject.specialisation.push(e.currentTarget.value);
    }
    
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
          <p>Wat houdt je specialisatie in?</p>
          <div className=''>
        <label htmlFor='amputatie'>Amputatie</label>
          <input 
            type='checkbox' 
            name='amputatie' 
            id='amputatie' 
            onChange={e => handleErgoSpecialisation(e)}/> 
        </div>
        <div className=''>
        <label htmlFor='parkinson'>Ziekte van Parkinson</label>
          <input 
            type='checkbox' 
            name='parkinson' 
            id='parkinson' 
            onChange={e => handleErgoSpecialisation(e)}/> 
        </div>
        <div className=''>
        <label htmlFor='als'>ALS</label>
          <input 
            type='checkbox' 
            name='als' 
            id='als' 
            onChange={e => handleErgoSpecialisation(e)}/> 
        </div>
        <div className=''>
        <label htmlFor='spierdystrofie'>Spierdystrofie</label>
          <input 
            type='checkbox' 
            name='spierdystrofie' 
            id='spierdystrofie' 
            onChange={e => handleErgoSpecialisation(e)}/> 
        </div>

        {/* <div className=''>
        <label htmlFor='naam'>Andere:</label>
          <input 
            type='checkbox' 
            name='metaalbewerking' 
            id='metaalbewerking' 
            onChange={e => handleErgoSpecialisation(e)}/> 
          <input 
          type="text"
          name="andere"
          onChange={e => handleMakerSkills(e)}
          />
        </div> */}
        </div>
        <button onClick={e => handlePreviousPage(e)}>Vorige</button>
        <button onClick={e => handleNextPage(e)}>Volgende</button>
    </div>
  );
};

export default observer(RegisterErgoStep2);
