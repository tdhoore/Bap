// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";

const Outro = ({ store }) => {
  return (
    <div className="track outroTrack">
      <p>{store.message}</p>
    </div>
  );
};

export default observer(Outro);
