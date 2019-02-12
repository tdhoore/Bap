import { observer } from "mobx-react";
import React from "react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import { Redirect } from "react-router-dom";
import Branches from "../components/Branches.jsx";
import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer.jsx";

const ProjectDetail = ({ store, props }) => {
  //const id = props.match.params.id;
  const id = "firstproject";
  //set new current project if needed
  store.setCurrentProject(id);

  //get comments from project if needed
  store.getComments();

  //get data from selected project
  let data = false;

  store.allProjects.forEach(project => {
    if (project.id === id) {
      data = project.doc;
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

  const ontmoetingsfase = () => {
    /*if (store.user) {
      if (store.user.id === data.user_id) {
        //user is owner so allow acces to changes
        //security eigelijk op server zelf doen maar geen tijd
        return (
          <section>
            <header>
              <h3>Ontmoetingsfase</h3>
            </header>
            <Link to="/">Ontmoetingsfilmpje</Link>
          </section>
        );
      }
    }*/
  };

  const displayProjectDetail = () => {
    return (
      <section className="projectDetailSection">
        <header>
          <h2>{data.title}</h2>
        </header>
        <article className="projectDetailInfo">
          <div className="headerWithLikes">
            <header>
              <div className="projectDetailTitle">
                <h3>{data.owner}</h3>
                <p>{data.stad}, 4km</p>
              </div>
              <img src={data.profilepic} alt="" />
            </header>
            <button className="like"></button>
          </div>
          <div className="playerHolder">
            <VideoPlayer
              store={store}
              comments={store.commentsCurrentProject}
              video={data.mainvid}
            />
          </div>
          <ul className="projectStats">
            <li className="likes">{data.likes}</li>
            <li className="numMakers">{numbOfX(1)}</li>
            <li className="numErgo">{numbOfX(2)}</li>
          </ul>
          <p>{data.description}</p>
          <div className="bobyPart" />
          <div className="links">
            <a href="#" className="ghostBtn">
              Delen
            </a>
            <a href="#" className="btn">
              Contacteren
            </a>
          </div>
        </article>
        {ontmoetingsfase()}
        {<Branches store={store} />}
      </section>
    );
  };

  const checkId = () => {
    return displayProjectDetail();
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
