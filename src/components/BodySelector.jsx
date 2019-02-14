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

    //update correct select box
    const boxes = [...document.querySelectorAll(`.selectedBox`)];

    boxes.forEach(box => {
      if (box.getAttribute(`data-id`) === input.id && input.checked) {
        box.classList.add(`activeBox`);
      } else {
        box.classList.remove(`activeBox`);
      }
    });
  };

  return (
    <div className="bodyPartSelector">
      <label htmlFor="handL" className="bodyPart">
        <input
          type="checkbox"
          name="bodyParts"
          id="handL"
          value="handL"
          onChange={e => handleSelectBodyPart(e)}
        />
      </label>
      <div className="selectedBox" data-id="handL" />
      <label htmlFor="handR" className="bodyPart">
        <input
          type="checkbox"
          name="bodyParts"
          id="handR"
          value="handR"
          onChange={e => handleSelectBodyPart(e)}
        />
      </label>
      <div className="selectedBox" data-id="handR" />
      <label htmlFor="hoofd" className="bodyPart">
        <input
          type="checkbox"
          name="bodyParts"
          id="hoofd"
          value="hoofd"
          onChange={e => handleSelectBodyPart(e)}
        />
      </label>
      <div className="selectedBox" data-id="hoofd" />
    </div>
  );
};

export default observer(BodySelector);
