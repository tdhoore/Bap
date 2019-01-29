/* eslint-disable no-unused-vars */
import React from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';
import Home from './Home.jsx';
import RegisterClientStep1 from '../components/RegisterClientStep1.jsx';
import UserTypeSelector from '../components/UserTypeSelector.jsx';


const Registration = ({store}) =>  {
    switch(store.step){
       case 1:
       return <UserTypeSelector store={store}/> 
       case 2:
        switch(store.formObject.type){
            case 0:
                return <RegisterClientStep1 store={store}/>
            // case 1:
            //     return <RegisterMaker store={store}/>
            // case 2:
            //     return <RegisterErgo store={store}/>
            default:
                return <Home store={store}/>
        }
       case 3:
        switch(store.formObject.type){
            case 0:
                return
            // case 1:
            //     return <RegisterMaker store={store}/>
            // case 2:
            //     return <RegisterErgo store={store}/>
            default:
                return <Home store={store}/>
        }
       default:
       return <Home store={store}/>
    }
};

export default observer(Registration);