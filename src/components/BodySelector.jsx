// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";

const BodySelector = ({ store }) => {
  const bodyPartSelectorRef = React.createRef();
  let bodyPartsElems = [];

  const handleSelectBodyPart = e => {
    //set all the elements
    setBodyParts();

    //set active body part
    bodyPartsElems.forEach(part => {
      if (e.currentTarget === part) {
        //add the chosen body part to the filter of choice
        if (part.classList.contains(`activeBodyPart`)) {
          //send reset
          console.log(`nothing`);
        } else {
          //send part
          console.log(part.getAttribute(`data-part`));
        }

        //is active
        part.classList.toggle(`activeBodyPart`);
      } else {
        //is other elem
        part.classList.remove(`activeBodyPart`);
      }
    });
  };

  const setBodyParts = () => {
    if (bodyPartsElems.length === 0) {
      bodyPartsElems = [
        ...bodyPartSelectorRef.current.querySelectorAll(`.bodyPart`)
      ];
    }
  };

  return (
    <div className="bodyPartSelector" ref={bodyPartSelectorRef}>
      <div
        className="bodyPart"
        data-part="armLeft"
        onClick={e => handleSelectBodyPart(e)}
      />
      <div
        className="bodyPart"
        data-part="armRight"
        onClick={e => handleSelectBodyPart(e)}
      />
      <div
        className="bodyPart"
        data-part="legRight"
        onClick={e => handleSelectBodyPart(e)}
      />
      <div
        className="bodyPart"
        data-part="legLeft"
        onClick={e => handleSelectBodyPart(e)}
      />
    </div>
  );
};

export default observer(BodySelector);
