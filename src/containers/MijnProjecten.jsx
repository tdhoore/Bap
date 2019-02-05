import { observer } from "mobx-react";
import React from "react";
import { Redirect } from "react-router-dom";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import CardHolder from "../components/CardHolder.jsx";

const MijnProjecten = ({ store, props }) => {
  const displayMijnProjecten = () => {
    /* 
    
    testing
    
    
    */
    if (!store.user) {
      return (
        <div>
          <section>
            <header>
              <h2>Updates</h2>
              <CardHolder store={store} content={store.allProjects} />
            </header>
          </section>
          <section>
            <header>
              <h2>Mijn projecten</h2>
              <CardHolder store={store} content={store.allProjects} />
            </header>
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
