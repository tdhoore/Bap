// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";

const AgeSelect = ({ store }) => {
  const handleOpenDropdown = e => {};

  return (
    <div>
      <p className="selectedOption" onClick={e => handleOpenDropdown}>
        option1
      </p>
      <ul className="optionHolder">
        <li>option 2</li>
        <li>option 3</li>
        <li>option 4</li>
        <li>option 5</li>
        <li>option 6</li>
      </ul>
    </div>
  );
};

export default observer(AgeSelect);
