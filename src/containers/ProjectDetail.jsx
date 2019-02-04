import { observer } from "mobx-react";
import React from "react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import { Redirect } from "react-router-dom";

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

  console.log(data);

  const displayProjectDetail = () => {
    return (
      <main>
        <article>
          <header>
            <h2>{data.title}</h2>
            <p>stad, 4km</p>
          </header>
          <button className="like">like</button>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            saepe et, ipsa nostrum in magni voluptatum nam cum necessitatibus,
            esse laboriosam autem. Sit facilis consequatur laudantium,
            exercitationem iusto voluptatibus illum!
          </p>
          <div className="">
            <div className="bobyPart" />
            <ul>
              <li>17</li>
              <li>2</li>
              <li>1</li>
            </ul>
          </div>

          <div className="links">
            <a href="#">Delen</a>
            <a href="#">Contacteren</a>
          </div>
        </article>
        <section>
          <header>
            <h3>Protoype fase 1</h3>
          </header>
        </section>
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
