import { observer } from "mobx-react";
import React from "react";
import { Redirect } from "react-router-dom";


const Loading = ({ store, link }) => {
    const showTitle = () => {
        const username = store.user.doc.name.split(" ")[0];
        return username;
      };
    
    if(store.loading){
        return (
            <div>
                loading...
            </div>
        );
    } else if (store.loadingReady){
        return (
            <Redirect to={link}></Redirect>
        )
    }
    
}
export default observer(Loading);