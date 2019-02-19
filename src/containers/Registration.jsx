/* eslint-disable no-unused-vars */
import React from "react";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import Home from "./Home.jsx";
import RegisterClientStep1 from "../components/RegisterClientStep1.jsx";
import RegisterClientStep2 from "../components/RegisterClientStep2.jsx";
import RegisterMakerStep1 from "../components/RegisterMakerStep1.jsx";
import RegisterMakerStep2 from "../components/RegisterMakerStep2.jsx";
import RegisterErgoStep1 from "../components/RegisterErgoStep1.jsx";
import RegisterErgoStep2 from "../components/RegisterErgoStep2.jsx";
import RegisterErgoStep3 from "../components/RegisterErgoStep3.jsx";
import RegisterErgoStep4 from "../components/RegisterErgoStep4.jsx";
import UserTypeSelector from "../components/UserTypeSelector.jsx";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";

const Registration = ({ store }) => {
  const displayRegistration = () => {
    switch (store.step) {
      case 1:
        return <UserTypeSelector store={store} />;
      case 2:
        switch (store.formObject.type) {
          case 0:
            return <RegisterClientStep1 store={store} />;
          case 1:
            return <RegisterMakerStep1 store={store} />;
          case 2:
            return <RegisterErgoStep1 store={store} />;
          default:
            return <Redirect to="/" />;
        }
      case 3:
        switch (store.formObject.type) {
          case 0:
            return <RegisterClientStep2 store={store} />;
          case 1:
            return <RegisterMakerStep2 store={store} />;
          case 2:
            return <RegisterErgoStep2 store={store} />;
          default:
            return <Redirect to="/" />;
        }
      case 4:
        switch (store.formObject.type) {
          case 0:
            return;
          case 1:
            return <RegisterClientStep1 store={store} />;
          case 2:
            return <RegisterErgoStep3 store={store} />;
          default:
            return <Redirect to="/" />;
        }
      case 5:
      switch (store.formObject.type) {
         case 0:
          return;
        case 1:
          return <RegisterClientStep2 store={store} />;
        case 2:
          return <RegisterMakerStep2 store={store} />;
        default:
           return <Redirect to="/" />;
        }
      case 6:
        switch (store.formObject.type) {
          case 0:
            return;
          case 1:
            return;
          case 2:
            return <RegisterErgoStep4 store={store} />;
          default:
            return <Redirect to="/" />;
        }
      case 7:
        switch (store.formObject.type) {
          case 0:
            return;
          case 1:
            return;
          case 2:
            return <RegisterClientStep1 store={store} />;
          default:
            return <Redirect to="/" />;
        }
      case 8:
        switch (store.formObject.type) {
          case 0:
            return;
          case 1:
            return;
          case 2:
            return <RegisterClientStep2 store={store} />;
          default:
            return <Redirect to="/" />;
        }
      default:
        return <Redirect to="/" />;
    }
  };

  return <DefaultPageHolder store={store} main={displayRegistration()} />;
};

export default observer(Registration);
