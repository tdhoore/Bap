// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";

const BodySelector = ({ store }) => {
  const handleSelectBodyPart = e => {
    const input = e.currentTarget;

    //check if there is somthing in this part of the filter
    if (store.filter[input.name] === undefined) {
      store.filter[input.name] = {};
    }

    //save filter
    store.filter[input.name][input.value] = input.checked;
  };

  return (
    <div className="bodyPartSelector">
      <label htmlFor="armL" className="bodyPart">
        <input
          type="checkbox"
          name="bodyParts"
          id="armL"
          value="armL"
          onChange={e => handleSelectBodyPart(e)}
        />
        <span className="selectedBox" />
      </label>
    </div>
  );
};

export default observer(BodySelector);
