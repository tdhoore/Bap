import { observer } from "mobx-react";
import React from "react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import { Redirect } from "react-router-dom";
import Branches from "../components/Branches.jsx";

const ProjectDetail = ({ store, props }) => {
  const id = props.match.params.id;

  //set new current project if needed
  store.setCurrentProject(id);

  //get data from selected project
  let data = false;

  store.allProjects.forEach(project => {
    if (project.id === id) {
      data = project.data();
    }
  });

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

  console.log(data);

  const displayProjectDetail = () => {
    return (
      <main>
        <article>
          <header>
            <h2>{data.title}</h2>
            <p>{data.stad}, 4km</p>
          </header>
          <button className="like">like</button>
          <video src={data.mainvid} />
          <p>{data.description}</p>
          <div className="">
            <div className="bobyPart" />
            <ul>
              <li>{data.likes}</li>
              <li>{numbOfX(1)}</li>
              <li>{numbOfX(2)}</li>
            </ul>
          </div>

          <div className="links">
            <a href="#">Delen</a>
            <a href="#">Contacteren</a>
          </div>
        </article>
        {<Branches store={store} />}
      </main>
    );
  };

  const checkId = () => {
    if (data) {
      //id found
      return displayProjectDetail();
    } else {
      //id not found
      return <Redirect to="/" />;
    }
  };

  return <DefaultPageHolder store={store} main={checkId()} />;
};

export default observer(ProjectDetail);
