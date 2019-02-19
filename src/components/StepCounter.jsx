/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { observer } from "mobx-react";

const StepCounter = ({ store }) => {
  const steps = [];

  //create array of elents to render
  for (let i = 1; i <= store.maxSteps; i++) {
    //add steps
    //check if the step is active or not
    steps.push(i === store.step);
  }

  const displaySteps = () => {};

  return (
    <ol className="stepCounter">
      {steps.map((step, index) => {
        if (step) {
          return <li className="activeStep" key={`stepCounterLi${index}`} />;
        } else {
          return <li key={`stepCounterLi${index}`} />;
        }
      })}
    </ol>
  );
};

export default observer(StepCounter);
