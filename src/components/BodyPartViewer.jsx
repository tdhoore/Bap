// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";

const bodyPartViewer = ({ store, content }) => {
  const displayBodyParts = () => {
    if (content !== undefined) {
      //display parts
      return content.map(partName => {
        return <div className="selectedBox activeBox" data-id={partName} />;
      });
    }
  };

  return (
    <div className="bodyPartSelector bodyPartViewer">{displayBodyParts()}</div>
  );
};

export default observer(bodyPartViewer);
