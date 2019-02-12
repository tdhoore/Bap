// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const PrototypeArticle = ({ store, prototype }) => { 
  const displayDifficulty = () => {
    const array = [];
    for(let i = 0; i < 3; i++){
      if(i <= displayData(`difficulty`)){
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

  console.log(prototype);
  return (
    <Link
      className="card protoTypeCard"
      to={`/prototype/${prototype.doc.prototype_id}`}
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
            return <li className={a} key={`difficultyHolder${prototype.doc.prototype_id}${index}`}></li>
          })}
          </ul>
        </div>
        <button className="verifieerBtn">verifieer</button>
      </article>
    </Link>
  );
};

export default observer(PrototypeArticle);
