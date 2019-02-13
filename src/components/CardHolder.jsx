import { observer } from "mobx-react";
import React from "react";
import Card from "./Card.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const CardHolder = ({ store, content = [], counter = 0, counterName = "" }) => {
  const handleMoveCounter = (e, count) => {
    store.updateCounter(counterName, count);
  };

  const enableLeftBtn = () => {
    return (
      (counter === 0 && store.sliderAmount < content.length) ||
      counterName === ""
    );
  };

  const enableRightBtn = () => {
    return (
      !(counter * store.sliderAmount < content.length - 1) || counterName === ""
    );
  };

  const removeBtns = isActive => {
    if (counterName === "") {
      return "hide";
    }

    return "";
  };

  return (
    <div className="cardHolderBtns">
      <button
        onClick={e => handleMoveCounter(e, -1)}
        className={`sliderBtn sliderBtnLeft ${removeBtns()}`}
        disabled={enableLeftBtn()}
      />
      <TransitionGroup className="cardHolder">
        {store.setVisibleCards(counterName, counter, content).map(cardData => {
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
        className={`sliderBtn ${removeBtns()}`}
        disabled={enableRightBtn()}
      />
    </div>
  );
};

export default observer(CardHolder);
