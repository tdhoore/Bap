import { observer } from "mobx-react";
import React from "react";
import Card from "./Card.jsx";

const CardHolder = ({ store, content = [] }) => {
  return (
    <div className="cardHolder">
      {content.map(cardData => {
        return (
          <Card
            store={store}
            cardData={cardData}
            key={`projectLink${cardData.id}`}
          />
        );
      })}
    </div>
  );
};

export default observer(CardHolder);
