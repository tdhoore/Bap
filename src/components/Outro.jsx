// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";

const Outro = ({ store, infoText }) => {
  const handleClickOurtro = e => {
    //display outro
    document.querySelector(`.cssOutroVid`).classList.toggle(`cssOutroVidShow`);
  };

  return (
    <div className="track outroTrack" onClick={e => handleClickOurtro(e)}>
      <p className="extraText">{infoText}</p>
      <p>{store.message}</p>
    </div>
  );
};

export default observer(Outro);
