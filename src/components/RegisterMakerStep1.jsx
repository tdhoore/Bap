/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {observer} from 'mobx-react';

const RegisterMakerStep1 = ({store}) =>  {
  // referentie aangemaakt om inputveld 'andere' aan te spreken en te kunnen disablen of enablen
  const andereInputRef = React.createRef();
  const handleMakerSkills = (e) => {
    if(e.currentTarget.name === "andereCheckbox"){
      if(e.currentTarget.checked){
        andereInputRef.current.disabled = false;
      } else {
        andereInputRef.current.disabled = true;
      }
    } else {
      if(store.formObject.skills === undefined){
        store.formObject.skills = [];
      }
      store.formObject.skills.push(e.currentTarget.value);
    }
    
  };

  const handleNextPage = e => {
    store.step++;
  };

  return (
    <div className=''>
      <p className="">Wat zijn jouw vaardigheden?</p>
        <div className=''>
        <label htmlFor='lasercutten'>Lasercutten</label>
          <input 
            type='checkbox' 
            name='skills' 
            id='lasercutten' 
            value='lasercutten'
            onChange={e => handleMakerSkills(e)}/> 
        </div>
        <div className=''>
        <label htmlFor='3dprinten'>3D printen</label>
          <input 
            type='checkbox' 
            name='skills' 
            id='3dprinten' 
            value='3dprinten'
            onChange={e => handleMakerSkills(e)}/> 
        </div>
        <div className=''>
        <label htmlFor='houtbewerking'>Houtbewerking</label>
          <input 
            type='checkbox' 
            name='skills' 
            id='houtbewerking'
            value='houtbewerking' 
            onChange={e => handleMakerSkills(e)}/> 
        </div>
        <div className=''>
        <label htmlFor='metaalbewerking'>Metaalbewerking</label>
          <input 
            type='checkbox' 
            name='skills' 
            id='metaalbewerking' 
            value='metaalbewerking' 
            onChange={e => handleMakerSkills(e)}/> 
        </div>

        <div className=''>
        <label htmlFor='andereCheckbox'>Andere:</label>
          <input 
            type='checkbox' 
            name='skills' 
            id='andereCheckbox' 
            onChange={e => handleMakerSkills(e)}/> 
          <input 
          type="text"
          name="skills"
          onChange={e => handleMakerSkills(e)}
          disabled
          ref={andereInputRef}
          />
        </div>

      <button onClick={e => handleNextPage(e)}>Volgende</button>
    </div>
  );
};

export default observer(RegisterMakerStep1);
