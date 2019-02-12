import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import React from "react";
import video from "../assets/video/_main.mp4";

const Card = ({ store, cardData }) => {
  const data = cardData.doc;
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

  const displayData = name => {
    if (data) {
      if (data[name] !== undefined) {
        //exists so render
        return data[name];
      }
    }
    return null;
  };

  const displayProfilepic = () => {
    if(data.profilePic === null){
      return 'assets/img/placeholder_profilepic.svg';
    } else {
      return displayData(`profilepic`);
    };
  };


  const displayProfilepicContributor = contributor => {
    if(contributor.profilePic === null || contributor.profilePic === ''){
      return 'assets/img/placeholder_profilepic.svg';
    } else {
      return contributor.profilePic;
    };
  };

  const displayContributors = () => {
    if (data.contributors !== undefined) {
      return data.contributors.map((contributor, index) => {
        return (
          <li key={`contributor${id}${index}`}>
            <img src={displayProfilepicContributor(contributor)} alt="medewerker profiel foto" />
          </li>
        );
      });
    }
  };
  console.log(`profilepic:`, data.profilePic);
  return (
    <Link to={`projectdetail/${id}`} className="card">
      <article>
        <header>
          <h3>{displayData(`title`)}</h3>
          <img src={displayProfilepic()} alt="profiel foto" />
          <p>{calcDistance()}</p>
        </header>
        <div className="cardVideoHolder">
          <video src={video} />
        </div>
        <div className="contributorsData">
          <ul className="contributors">{displayContributors()}</ul>
          <ul className="projectStats">
            <li className="likes">{displayData(`likes`)}</li>
            <li className="numMakers">{numbOfX(1)}</li>
            <li className="numErgo">{numbOfX(2)}</li>
          </ul>
        </div>
      </article>
    </Link>
  );
};

export default observer(Card);
