import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import React from "react";
import video from "../assets/video/_main.mp4";

const Card = ({ store, cardData }) => {
  const data = cardData.data();
  const id = cardData.id;

  const calcDistance = () => {
    if (store.user) {
      //calc distance from user
    }
  };

  const numbOfX = type => {
    if (data.contributors === undefined) {
      //no contributors
      return 0;
    } else {
      //there are contributors
      return data.contributors.filter(contributor => {
        return contributor.type === type;
      }).length;
    }
  };

  return (
    <Link to={`/${data.id}`} className="card">
      <article>
        <header>
          <h3>{data.title}</h3>
          <img src={data.profilepic} alt="profiel foto" />
          <p>{calcDistance()}</p>
        </header>
        <div className="cardVideoHolder">
          <video src={video} />
        </div>
        <div className="contributorsData">
          <ul className="contributors">
            {data.contributors.map((contributor, index) => {
              return (
                <li key={`contributor${id}${index}`}>
                  <img
                    src={contributor.profilePic}
                    alt="medewerker profiel foto"
                  />
                </li>
              );
            })}
          </ul>
          <p className="likes">{data.likes}</p>
          <p className="numMakers">{numbOfX(1)}</p>
          <p className="numErgo">{numbOfX(2)}</p>
        </div>
      </article>
    </Link>
  );
};

export default observer(Card);
