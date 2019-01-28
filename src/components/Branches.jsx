// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";

const Branches = ({ store }) => {
  store.getProjectBranches();

  return <div />;
};

export default observer(Branches);
