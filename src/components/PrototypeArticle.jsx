// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Swipeable } from "react-touch";

const PrototypeArticle = ({ store, prototype, level }) => {
  const displayDifficulty = () => {
    const array = [];
    for (let i = 0; i < 3; i++) {
      if (i <= displayData(`difficulty`)) {
        array.push(`active_difficulty`);
      } else {
        array.push(``);
      }
    }
    return array;
  };

  const displayData = name => {
    if (prototype.doc) {
      if (prototype.doc[name] !== undefined) {
        //exists so render
        return prototype.doc[name];
      }
    }
    return null;
  };

  const isActiveClass = () => {
    if (prototype.isActive) {
      return "card protoTypeCard";
    } else {
      return "card protoTypeCard inActiveCard";
    }
  };

  const displayProfilepicMaker = () => {
    const pic = displayData(`profilepic`);
    console.log(`PIC`, pic);
    if (pic === null || pic === "") {
      return "http://localhost:8080/assets/img/placeholder_profilepic.svg";
    } else {
      return pic;
    }
  };

  const handleClickLink = e => {
    if (!prototype.isActive) {
      e.preventDefault();

      //update isActive
      store.prototypeLevels[level].map(proto => {
        if (prototype.id === proto.id) {
          proto.isActive = true;
        } else {
          proto.isActive = false;
        }
      });

      //set new active id
      store.selectedPrototypeIds[level] = prototype.id;

      //get new branches
      store.getProjectBranches(parseInt(level) + 1, prototype.id, true);
      console.log(store.prototypeLevels);
    }
  };

  const getIndexOfPrototype = () => {
    let index = 0;

    store.prototypeLevels[level].map((proto, id) => {
      if (prototype.id === proto.id) {
        index = id;
      }
    });

    return index;
  };

  const setNewActive = direction => {
    const index = getIndexOfPrototype();

    if (
      (index > 0 && direction === "right") ||
      (index < store.prototypeLevels[level].length - 1 && direction === "left")
    ) {
      let nextIndex = -5;

      //update isActive
      store.prototypeLevels[level].map((proto, index) => {
        if (prototype.id === proto.id) {
          if (direction === "right") {
            nextIndex = index - 1;
          } else {
            nextIndex = index + 1;
          }
        }
      });

      store.prototypeLevels[level].map((proto, index) => {
        if (nextIndex === index) {
          proto.isActive = true;
        } else {
          proto.isActive = false;
        }
      });

      //set new active id
      store.selectedPrototypeIds[level] = prototype.id;

      //get new branches
      store.getProjectBranches(parseInt(level) + 1, prototype.id, true);
    }
  };

  const handleSwipeLeft = () => {
    console.log("left");
    setNewActive("left");
  };

  const handleSwipeRight = () => {
    console.log("right");
    setNewActive("right");
  };

  return (
    <Swipeable onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight}>
      <Link
        className={isActiveClass()}
        to={`/prototype/${prototype.doc.prototype_id}`}
        onClick={e => handleClickLink(e)}
      >
        <article>
          <header>
            <h4>{displayData(`title`)}</h4>
            <img src={displayProfilepicMaker()} alt="maker profiel foto" />
          </header>
          <div className="cardVideoHolder">
            <video src={`http://localhost:8080/${displayData(`video`)}`} />
          </div>
          <div className="difficulty">
            <p>Moeilijkheid</p>
            <ul>
              {displayDifficulty().map((a, index) => {
                return (
                  <li
                    className={a}
                    key={`difficultyHolder${
                      prototype.doc.prototype_id
                    }${index}`}
                  />
                );
              })}
            </ul>
          </div>
          <button className="verifieerBtn">verifieer</button>
        </article>
      </Link>
    </Swipeable>
  );
};

export default observer(PrototypeArticle);
