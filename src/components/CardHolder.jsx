import { observer } from "mobx-react";
import React from "react";
import Card from "./Card.jsx";

const CardHolder = ({ store, content = [], counter = 0, counterName = "" }) => {
  const amount = 2;

  const setVisibleCards = () => {
    let endIndex = amount;
    const array = [];

    //if bigger than 0
    if (counter > 0) {
      endIndex = amount * counter + amount;
    }
    console.log("start index", amount * counter);
    console.log("end index", endIndex);

    //for desktop
    for (let i = amount * counter; i < endIndex; i++) {
      //get the correct elements
      //check if exists
      if (i < content.length) {
        array.push(content[i]);
      }
    }

    return array;
  };

  const handleMoveCounter = (e, count) => {
    setVisibleCards();
    store.updateCounter(counterName, count);
  };

  const displayRightBtn = () => {
    if (counter > 0) {
      return <button onClick={e => handleMoveCounter(e, -1)}>prev</button>;
    }
  };

  const displayLeftBtn = () => {
    if (counter * amount < content.length - 1) {
      return <button onClick={e => handleMoveCounter(e, 1)}>next</button>;
    }
  };

  return (
    <div className="cardHolderBtns">
      {displayRightBtn()}
      <div className="cardHolder">
        {setVisibleCards().map(cardData => {
          return (
            <Card
              store={store}
              cardData={cardData}
              key={`projectLink${cardData.id}`}
            />
          );
        })}
      </div>
      {displayLeftBtn()}
    </div>
  );
};

export default observer(CardHolder);
