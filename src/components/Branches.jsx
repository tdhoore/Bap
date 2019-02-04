// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";

const Branches = ({ store }) => {
  store.getProjectBranches();

  const createMovie = e => {
    //store.createAfterMovie();
  };

  return (
    <div>
      <button onClick={e => createMovie(e)}>createMov</button>
    </div>
  );
};

export default observer(Branches);
