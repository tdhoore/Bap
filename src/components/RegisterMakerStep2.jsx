/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";

const RegisterMakerStep2 = ({ store }) => {

  // if(store.formObject.skills === undefined){
  //       store.formObject.skills = [];
  //     }
  //     store.formObject.skills.push(e.currentTarget.name);
  //   }
  const handleMakerHobby = e => {
    store.formObject.hobby = e.currentTarget.name;
  };

  const handleNextPage = e => {
    store.step++;
  };

  const handlePreviousPage = e => {
    store.step--;
  };

  return (
    <div className="">
      <p className="">Wat zijn jouw hobby's?</p>
      <div className="">
        <label htmlFor="piano">Piano</label>
        <input
          type="checkbox"
          name="piano"
          id="piano"
          onChange={e => handleMakerHobby(e)}
        />
      </div>
      <div className="">
        <label htmlFor="tennis">Tennis</label>
        <input
          type="checkbox"
          name="tennis"
          id="tennis"
          onChange={e => handleMakerHobby(e)}
        />
      </div>
      <div className="">
        <label htmlFor="pottenbakken">Pottenbakken</label>
        <input
          type="checkbox"
          name="pottenbakken"
          id="pottenbakken"
          onChange={e => handleMakerHobby(e)}
        />
      </div>
      <div className="">
        <label htmlFor="gitaar">Gitaar</label>
        <input
          type="checkbox"
          name="gitaar"
          id="gitaar"
          onChange={e => handleMakerHobby(e)}
        />
      </div>

      {/* <div className=''>
        <label htmlFor='naam'>Andere:</label>
          <input 
            type='checkbox' 
            name='anderecheckbox' 
            id='andere' 
            onChange={e => handleMakerHobby(e)}/> 
          <input 
          type="text"
          name="anderetext"
          onChange={e => handleMakerHobby(e)}
          />
        </div> */}
      <button onClick={e => handlePreviousPage(e)}>Vorige</button>
      <button onClick={e => handleNextPage(e)}>Volgende</button>
    </div>
  );
};

export default observer(RegisterMakerStep2);
