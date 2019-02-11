import { observer } from "mobx-react";
import React from "react";
import { Redirect } from "react-router-dom";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import CardHolder from "../components/CardHolder.jsx";

const MijnProjecten = ({ store }) => {
  const displayMijnProjecten = () => {
    if (store.user) {
      return (
        <div>
          <section className="highLightedSection">
            <header>
              <h2 className="mainHeader">Updates</h2>
              <CardHolder
                store={store}
                content={store.allProjects}
                counter={store.projectUpdatesCounter}
                counterName={`projectUpdatesCounter`}
              />
            </header>
          </section>
          <section className="lastSection mijnProjectenSection">
            <header>
              <h2>Mijn projecten</h2>
            </header>
            <CardHolder store={store} content={store.allProjects} />
          </section>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  };

  return <DefaultPageHolder store={store} main={displayMijnProjecten()} />;
};

export default observer(MijnProjecten);
