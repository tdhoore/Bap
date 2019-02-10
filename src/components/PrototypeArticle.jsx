// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const PrototypeArticle = ({ store, prototype }) => {
  //console.log(prototype);
  return (
    <Link
      className="card protoTypeCard"
      to={`/prototype/${prototype.doc.prototype_id}`}
    >
      <article>
        <header>
          <h4>tester</h4>
          <img src="" alt="maker profiel foto" />
        </header>
        <div className="cardVideoHolder">
          <video src="" />
        </div>
        <div className="difficulty">
          <p>Moeilijkheid</p>
          <ul>
            <li>Beginner</li>
            <li>Hobbyist</li>
            <li>Expert</li>
          </ul>
        </div>
        <button className="verifieerBtn">verifieer</button>
      </article>
    </Link>
  );
};

export default observer(PrototypeArticle);
