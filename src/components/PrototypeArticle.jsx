// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const PrototypeArticle = ({ store, prototype }) => {
  return (
    <Link className="card protoTypeCard" to={`/`}>
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
      </article>
    </Link>
  );
};

export default observer(PrototypeArticle);
