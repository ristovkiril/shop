import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export default function AppliedRoute({component: Component, appProps, appUser, appUserCart, appCategories, ...rest}){
    console.log("APPLIED ROUTE");
    return (
        <Route {...rest} render={ (props) => (
            appUser.user !== null && (appUser.user.role !== "CUSTOMER") ?
            <Component {...props} {...appProps} {...appUser} {...appUserCart} {...appCategories}/>
            : <Redirect to={"/login"} appProps={appProps} appUser={appUser} appUserCart={appUserCart} {...appCategories} />)
        }/>
    )
}
