/* eslint-disable no-unused-vars */
import { observer } from "mobx-react";
import React from "react";

const Sorter = () => {
  return (
    <ul className="sorter">
      <li>
        <button>Aanbevolen projecten</button>
      </li>
      <li>
        <button>Populaire projecten</button>
      </li>
      <li>
        <button>Nieuwe projecten</button>
      </li>
    </ul>
  );
};

export default observer(Sorter);
