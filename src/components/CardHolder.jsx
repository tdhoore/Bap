import { observer } from "mobx-react";
import React from "react";
import Card from "./Card.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const CardHolder = ({ store, content = [], counter = 0, counterName = "" }) => {
  const amount = 2;

  const setVisibleCards = () => {
    let endIndex = amount;
    const array = [];

    //if bigger than 0
    if (counter > 0) {
      endIndex = amount * counter + amount;
    }

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
    store.updateCounter(counterName, count);
  };

  const enableLeftBtn = () => {
    return counter === 0;
  };

  const enableRightBtn = () => {
    return !(counter * amount < content.length - 1);
  };

  return (
    <div className="cardHolderBtns">
      <button
        onClick={e => handleMoveCounter(e, -1)}
        className="sliderBtn"
        disabled={enableLeftBtn()}
      >
        prev
      </button>
      <TransitionGroup className="cardHolder">
        {setVisibleCards().map(cardData => {
          return (
            <CSSTransition
              key={`projectLink${cardData.id}`}
              timeout={300}
              classNames="fade"
            >
              <Card store={store} cardData={cardData} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      <button
        onClick={e => handleMoveCounter(e, 1)}
        className="sliderBtn"
        disabled={enableRightBtn()}
      >
        prev
      </button>
    </div>
  );
};

export default observer(CardHolder);
