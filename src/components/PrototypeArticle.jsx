// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const PrototypeArticle = ({ store, prototype, faseKey }) => {
  const createPath = () => {
    let path = ``;

    //create path
    for (let i = 1; i <= faseKey; i++) {
      path += `prototype${i}`;
      if (i !== faseKey) {
        path += `/`;
      }
    }

    return path;
  };

  return (
    <Link className="card protoTypeCard" to={`/prototype/${prototype.id}`}>
      <article>
        <header>
          <h4>tester</h4>
          <img src="" alt="maker profiel foto" />
        </header>
        <div className="cardVideoHolder">
          <video src="" />
        </div>
        <ul className="difficulty">
          <li>Beginner</li>
          <li>Hobbyist</li>
          <li>Expert</li>
        </ul>
        <button>verifieer</button>
      </article>
    </Link>
  );
};

export default observer(PrototypeArticle);
