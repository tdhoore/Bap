// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import BodySelector from "./BodySelector.jsx";

const Filter = ({ store }) => {
  const handleInputSearch = e => {
    const val = e.currentTarget.value;

    if (val.length > 3) {
      console.log(val);
      //add search to filter
      store.filter.search = val;
    }
  };

  const handleInputCity = e => {
    const val = e.currentTarget.value;
    console.log(val);

    //add city to filter
    store.filter.city = val;
  };

  const handleInputCheckBox = e => {
    const input = e.currentTarget;

    //check if there is somthing in this part of the filter
    if (store.filter[input.name] === undefined) {
      store.filter[input.name] = {};
    }

    //update or set from filter
    store.filter[input.name][input.value] = input.checked;
  };

  const handleClearFilters = e => {
    e.preventDefault();
    store.filter = {};
  };

  return (
    <div>
      <form>
        <label htmlFor="search">
          <span>zoeken</span>
          <input
            type="text"
            name="search"
            id="search"
            onInput={e => handleInputSearch(e)}
          />
        </label>
        <label htmlFor="city">
          <span>stad</span>
          <input
            type="text"
            name="city"
            id="city"
            onInput={e => handleInputCity(e)}
          />
        </label>
        <div className="difficultyFilter">
          <label htmlFor="difficulty0">
            <span>makkelijk</span>
            <input
              type="checkbox"
              value="0"
              name="difficulty"
              id="difficulty0"
              onChange={e => handleInputCheckBox(e)}
            />
          </label>
          <label htmlFor="difficulty1">
            <span>medium</span>
            <input
              type="checkbox"
              value="1"
              name="difficulty"
              id="difficulty1"
              onChange={e => handleInputCheckBox(e)}
            />
          </label>
          <label htmlFor="difficulty2">
            <span>moeilijk</span>
            <input
              type="checkbox"
              value="2"
              name="difficulty"
              id="difficulty2"
              onChange={e => handleInputCheckBox(e)}
            />
          </label>
        </div>
        <div className="ageFilter">
          <label htmlFor="kinderen">
            <span>kinderen</span>
            <input
              type="checkbox"
              value="0"
              name="kinderen"
              id="kinderen"
              onChange={e => handleInputCheckBox(e)}
            />
          </label>
          <label htmlFor="tieners">
            <span>tieners</span>
            <input
              type="checkbox"
              value="0"
              name="tieners"
              id="tieners"
              onChange={e => handleInputCheckBox(e)}
            />
          </label>
        </div>
        <BodySelector store={store} />
        <button onClick={e => handleClearFilters(e)}>
          Alle filters wissen
        </button>
      </form>
    </div>
  );
};

export default observer(Filter);
