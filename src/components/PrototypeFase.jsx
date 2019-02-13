// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PrototypeArticle from "./PrototypeArticle.jsx";

const PrototypeFase = ({ store, faseKey }) => {
  // console.log("prototypes", faseKey);

  const getIndexActive = () => {
    const array = store.prototypeLevels[faseKey];
    let activeIndex = 0;

    if (array !== undefined) {
      array.map((proto, index) => {
        if (proto.isActive) {
          activeIndex = index;
        }
      });
    }

    return activeIndex;
  };

  const getContent = () => {
    const input = store.prototypeLevels[faseKey];
    //get active index
    const activeIndex = getIndexActive();
    let content = ["", "", ""];

    if (store.sliderAmount > 1) {
      input.map((proto, index) => {
        //get prev elem if exist
        if (index === activeIndex - 1) {
          if (activeIndex > 0) {
            content[0] = proto;
          } else {
            content[0] = "";
          }
        }

        //set the active elem
        if (index === activeIndex) {
          content[1] = proto;
        }

        //get next elem if exist
        if (index === activeIndex + 1) {
          if (activeIndex < store.prototypeLevels[faseKey].length) {
            content[2] = proto;
          } else {
            content[2] = "";
          }
        }
      });
    } else {
      content = [];

      input.map((proto, index) => {
        //set the active elem
        if (index === activeIndex) {
          content.push(proto);
        }
      });
    }

    return content;
  };

  return (
    <section className="prototypeFase">
      <header>
        <h3>Protoypes fase {faseKey}</h3>
      </header>
      <div className="prototypeArticleHolder">
        {getContent().map((prototype, index) => {
          if (prototype !== "") {
            return (
              <PrototypeArticle
                store={store}
                prototype={prototype}
                key={`individualPrototypes${prototype.id}${index}`}
                level={faseKey}
              />
            );
          } else if (index === 0) {
            return <div key={`individualPrototypes${prototype.id}${index}`} />;
          } else {
            //is link btn
            return (
              <Link
                to={`/createprototype/${store.currentProjectId}/${faseKey}`}
                className="addPrototypeBtn btn"
                key={`individualPrototypes${prototype.id}${index}`}
              >
                prototype toevoegen
              </Link>
            );
          }
        })}
      </div>
    </section>
  );
};

export default observer(PrototypeFase);
