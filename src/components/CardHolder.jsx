import { observer } from "mobx-react";
import React from "react";
import Card from "./Card.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Swipeable } from "react-touch";

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

  const handleSwipeLeft = () => {
    console.log("left");
    handleMoveCounter(false, 1);
  };

  const handleSwipeRight = () => {
    console.log("right");
    handleMoveCounter(false, -1);
  };

  return (
    <div className="cardHolderBtns">
      <button
        onClick={e => handleMoveCounter(e, -1)}
        className={`sliderBtn sliderBtnLeft ${removeBtns()}`}
        disabled={enableLeftBtn()}
      />
      <Swipeable onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight}>
        <TransitionGroup className="cardHolder">
          {store
            .setVisibleCards(counterName, counter, content)
            .map(cardData => {
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
      </Swipeable>
      <button
        onClick={e => handleMoveCounter(e, 1)}
        className={`sliderBtn ${removeBtns()}`}
        disabled={enableRightBtn()}
      />
    </div>
  );
};

export default observer(CardHolder);
