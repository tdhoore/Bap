// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";

const Outro = ({ store }) => {
  const handleClickOurtro = e => {
    //display outro
    document.querySelector(`.cssOutroVid`).classList.toggle(`cssOutroVidShow`);
  };

  return (
    <div className="track outroTrack" onClick={e => handleClickOurtro(e)}>
      <p>{store.message}</p>
    </div>
  );
};

export default observer(Outro);
