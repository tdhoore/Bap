/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {observer} from 'mobx-react';

const RegisterMakerStep1 = ({store}) =>  {
  const handleMakerSkills = (e) => {
    store.formObject.skills = e.currentTarget.value;
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
            name='lasercutten' 
            id='lasercutten' 
            onChange={e => handleMakerSkills(e)}/> 
        </div>
        <div className=''>
        <label htmlFor='3dprinten'>3D printen</label>
          <input 
            type='checkbox' 
            name='3dprinten' 
            id='3dprinten' 
            onChange={e => handleMakerSkills(e)}/> 
        </div>
        <div className=''>
        <label htmlFor='houtbewerking'>Houtbewerking</label>
          <input 
            type='checkbox' 
            name='houtbewerking' 
            id='houtbewerking' 
            onChange={e => handleMakerSkills(e)}/> 
        </div>
        <div className=''>
        <label htmlFor='metaalbewerking'>Metaalbewerking</label>
          <input 
            type='checkbox' 
            name='metaalbewerking' 
            id='metaalbewerking' 
            onChange={e => handleMakerSkills(e)}/> 
        </div>

        {/* <div className=''>
        <label htmlFor='naam'>Andere:</label>
          <input 
            type='checkbox' 
            name='metaalbewerking' 
            id='metaalbewerking' 
            onChange={e => handleMakerSkills(e)}/> 
          <input 
          type="text"
          name="andere"
          onChange={e => handleMakerSkills(e)}
          />
        </div> */}

      <button onClick={e => handleNextPage(e)}>Volgende</button>
    </div>
  );
};

export default observer(RegisterMakerStep1);
