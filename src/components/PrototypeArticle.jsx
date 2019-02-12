// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

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
    console.log(prototype);
    if (prototype.isActive) {
      return "card protoTypeCard";
    } else {
      return "card protoTypeCard inActiveCard";
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
      store.getProjectBranches(parseInt(level) + 1, prototype.id);
    }
  };

  return (
    <Link
      className={isActiveClass()}
      to={`/prototype/${prototype.doc.prototype_id}`}
      onClick={e => handleClickLink(e)}
    >
      <article>
        <header>
          <h4>{displayData(`title`)}</h4>
          <img src={displayData(`profilepic`)} alt="maker profiel foto" />
        </header>
        <div className="cardVideoHolder">
          <video src={displayData(`video`)} />
        </div>
        <div className="difficulty">
          <p>Moeilijkheid</p>
          <ul>
            {displayDifficulty().map((a, index) => {
              return (
                <li
                  className={a}
                  key={`difficultyHolder${prototype.doc.prototype_id}${index}`}
                />
              );
            })}
          </ul>
        </div>
        <button className="verifieerBtn">verifieer</button>
      </article>
    </Link>
  );
};

export default observer(PrototypeArticle);
